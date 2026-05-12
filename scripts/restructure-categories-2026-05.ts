/**
 * Category restructure (2026-05) — idempotent data shuffle.
 *
 * Splits the three superseded categories (Industry-Specific AI,
 * Audio Music & Voice AI, Browser Extensions & Productivi) across
 * 8 new categories + 5 existing destinations, and resets sortOrder
 * across all 20 final categories to the canonical ordering.
 *
 * Does NOT delete the three superseded category rows — that's
 * Migration B's job, which runs only after this script confirms
 * zero platforms remain in any of them.
 *
 * Usage:
 *   npx tsx scripts/restructure-categories-2026-05.ts           (with 5s confirmation countdown)
 *   npx tsx scripts/restructure-categories-2026-05.ts --yes     (skip countdown)
 *
 * Run against Neon branch first via DATABASE_URL override:
 *   $env:DATABASE_URL='<branch-url>'; npx tsx scripts/restructure-categories-2026-05.ts
 *
 * Idempotency: upserts categories by slug; per-platform updates skip rows
 * already pointing at the correct categoryId. Safe to re-run after a
 * partial failure.
 *
 * Exit non-zero if any platform slug is not found in the DB OR if any
 * superseded category still has platforms referencing it. The DELETE in
 * Migration B is guarded against this same condition, so a failure here
 * is the intended early-warning before that step runs.
 */
import "dotenv/config";
import * as fs from "fs";
import * as path from "path";

const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("@prisma/client");

function getDirectUrl(): string {
  const raw = process.env.DATABASE_URL || "";
  if (raw.startsWith("prisma+postgres://")) {
    try {
      const url = new URL(raw);
      const key = url.searchParams.get("api_key") || "";
      const padded = key + "=".repeat((4 - (key.length % 4)) % 4);
      const decoded = JSON.parse(Buffer.from(padded, "base64url").toString());
      return decoded.databaseUrl;
    } catch {
      // fall through
    }
  }
  return raw;
}

function maskedHost(url: string): string {
  try {
    const u = new URL(url);
    return `${u.hostname}${u.pathname || ""}`;
  } catch {
    return "<unparseable URL>";
  }
}

// Canonical post-restructure taxonomy. The 20 categories that should exist
// after the data shuffle, in their final sortOrder.
type CategorySpec = {
  sortOrder: number;
  name: string;
  slug: string;
  icon: string;
  description: string;
};

const FINAL_CATEGORIES: CategorySpec[] = [
  { sortOrder: 1, name: "Text & Conversational AI", slug: "text-conversational-ai", icon: "MessageSquare", description: "Chat assistants, writing tools, and conversational AI" },
  { sortOrder: 2, name: "Image Generation & Editing", slug: "image-generation-editing", icon: "Image", description: "AI image creation, editing, and design tools" },
  { sortOrder: 3, name: "Video Creation & Editing", slug: "video-creation-editing", icon: "Video", description: "AI video generation, editing, and animation" },
  { sortOrder: 4, name: "Music Generation", slug: "music-generation", icon: "Music", description: "AI music creation, composition, and generation tools" },
  { sortOrder: 5, name: "Voice & Speech", slug: "voice-speech", icon: "Mic", description: "AI voice generation, text-to-speech, and speech tools" },
  { sortOrder: 6, name: "Research & Academic Tools", slug: "research-academic-tools", icon: "BookOpen", description: "Research assistants, citation tools, and academic AI" },
  { sortOrder: 7, name: "Document & PDF Processing", slug: "document-pdf-processing", icon: "FileText", description: "Document analysis, PDF tools, and data extraction" },
  { sortOrder: 8, name: "Meetings & Notes", slug: "meetings-notes", icon: "Notebook", description: "AI meeting transcription, note-taking, and knowledge capture" },
  { sortOrder: 9, name: "AI Coding & Development", slug: "ai-coding-development", icon: "Code", description: "Code assistants, IDE plugins, and dev tools" },
  { sortOrder: 10, name: "Workflow & Automation", slug: "workflow-automation", icon: "Zap", description: "No-code automation, workflow builders, and integrations" },
  { sortOrder: 11, name: "AI Plugins for Business Software", slug: "ai-plugins-business-software", icon: "Plug", description: "AI add-ons for Notion, Slack, Salesforce, etc." },
  { sortOrder: 12, name: "Sales, Marketing & SEO AI", slug: "sales-marketing-seo-ai", icon: "Megaphone", description: "AI for sales engagement, marketing copy, and search optimization" },
  { sortOrder: 13, name: "Education & Learning AI", slug: "education-learning-ai", icon: "GraduationCap", description: "AI tutoring, learning aids, and educational tools" },
  { sortOrder: 14, name: "Legal AI", slug: "legal-ai", icon: "Scale", description: "AI tools for legal research, contracts, and case management" },
  { sortOrder: 15, name: "Healthcare AI", slug: "healthcare-ai", icon: "Stethoscope", description: "AI tools for clinical workflows, diagnostics, and healthcare" },
  { sortOrder: 16, name: "Finance & Real Estate AI", slug: "finance-real-estate-ai", icon: "Landmark", description: "AI for financial analysis, accounting, and real estate" },
  { sortOrder: 17, name: "AI APIs & Developer Services", slug: "ai-apis-developer-services", icon: "Terminal", description: "APIs, SDKs, and developer-focused AI services" },
  { sortOrder: 18, name: "Local & Open-Source AI", slug: "local-open-source-ai", icon: "Server", description: "Self-hosted, open-source, and privacy-first AI" },
  { sortOrder: 19, name: "International & Regional AI", slug: "international-regional-ai", icon: "Globe", description: "AI platforms focused on non-English markets" },
  { sortOrder: 20, name: "Gaming & Creative AI", slug: "gaming-creative-ai", icon: "Gamepad", description: "AI for game development, 3D, and creative tools" },
];

// Platform reassignments. All 45 platforms in the three superseded categories
// get a destination here. Order in this array drives logging output; sorting
// by destination category for readability.
type Reassignment = { platformSlug: string; categorySlug: string };

const REASSIGNMENTS: Reassignment[] = [
  // Industry-Specific AI → Legal AI (6)
  { platformSlug: "harvey-ai", categorySlug: "legal-ai" },
  { platformSlug: "casetext-cocounsel", categorySlug: "legal-ai" },
  { platformSlug: "spellbook", categorySlug: "legal-ai" },
  { platformSlug: "luminance", categorySlug: "legal-ai" },
  { platformSlug: "kira-systems", categorySlug: "legal-ai" },
  { platformSlug: "clio-manage", categorySlug: "legal-ai" },

  // Industry-Specific AI → Healthcare AI (4)
  { platformSlug: "dragon-medical-one", categorySlug: "healthcare-ai" },
  { platformSlug: "healthee", categorySlug: "healthcare-ai" },
  { platformSlug: "viz-ai", categorySlug: "healthcare-ai" },
  { platformSlug: "pathai", categorySlug: "healthcare-ai" },

  // Industry-Specific AI → Finance & Real Estate AI (6)
  { platformSlug: "alphasense", categorySlug: "finance-real-estate-ai" },
  { platformSlug: "bloomberg-gpt-terminal-ai", categorySlug: "finance-real-estate-ai" },
  { platformSlug: "ramp-intelligence", categorySlug: "finance-real-estate-ai" },
  { platformSlug: "canopy-tax", categorySlug: "finance-real-estate-ai" },
  { platformSlug: "zillow-ai-zestimate", categorySlug: "finance-real-estate-ai" },
  { platformSlug: "restb-ai", categorySlug: "finance-real-estate-ai" },

  // Industry-Specific AI → Education & Learning AI (5)
  { platformSlug: "khan-academy-khanmigo", categorySlug: "education-learning-ai" },
  { platformSlug: "duolingo-max", categorySlug: "education-learning-ai" },
  { platformSlug: "quizlet-q-chat", categorySlug: "education-learning-ai" },
  { platformSlug: "runway-for-education", categorySlug: "education-learning-ai" },
  { platformSlug: "speak-language-ai", categorySlug: "education-learning-ai" },

  // Industry-Specific AI → Sales, Marketing & SEO AI (5)
  { platformSlug: "gong", categorySlug: "sales-marketing-seo-ai" },
  { platformSlug: "outreach", categorySlug: "sales-marketing-seo-ai" },
  { platformSlug: "surfer-seo", categorySlug: "sales-marketing-seo-ai" },
  { platformSlug: "semrush-ai", categorySlug: "sales-marketing-seo-ai" },
  { platformSlug: "photoroom", categorySlug: "sales-marketing-seo-ai" },

  // Industry-Specific AI → AI APIs & Developer Services (2)
  { platformSlug: "clarifai", categorySlug: "ai-apis-developer-services" },
  { platformSlug: "scale-ai", categorySlug: "ai-apis-developer-services" },

  // Audio, Music & Voice AI → Music Generation (7)
  { platformSlug: "suno", categorySlug: "music-generation" },
  { platformSlug: "udio", categorySlug: "music-generation" },
  { platformSlug: "aiva", categorySlug: "music-generation" },
  { platformSlug: "mubert", categorySlug: "music-generation" },
  { platformSlug: "beatoven-ai", categorySlug: "music-generation" },
  { platformSlug: "google-lyria-3", categorySlug: "music-generation" },
  { platformSlug: "soundraw", categorySlug: "music-generation" },

  // Audio, Music & Voice AI → Voice & Speech (4)
  { platformSlug: "elevenlabs", categorySlug: "voice-speech" },
  { platformSlug: "murf-ai", categorySlug: "voice-speech" },
  { platformSlug: "play-ht", categorySlug: "voice-speech" },
  { platformSlug: "descript", categorySlug: "voice-speech" },

  // Audio, Music & Voice AI → Meetings & Notes (1)
  { platformSlug: "otter-ai", categorySlug: "meetings-notes" },

  // Browser Extensions & Productivi → Meetings & Notes (3)
  { platformSlug: "tactiq", categorySlug: "meetings-notes" },
  { platformSlug: "tl-dv", categorySlug: "meetings-notes" },
  { platformSlug: "mem", categorySlug: "meetings-notes" },

  // Browser Extensions & Productivi → Research & Academic Tools (1)
  { platformSlug: "glasp", categorySlug: "research-academic-tools" },

  // Browser Extensions & Productivi → Text & Conversational AI (1)
  { platformSlug: "writesonic-chatsonic", categorySlug: "text-conversational-ai" },
];

const SUPERSEDED_CATEGORY_SLUGS = [
  "industry-specific-ai",
  "audio-music-voice-ai",
  "browser-extensions-productivi",
];

// Five spot-check pairs (slug → expected destination category slug) verified
// at the end. If any of these end up elsewhere, something is wrong.
const SPOT_CHECKS: Array<[string, string]> = [
  ["harvey-ai", "legal-ai"],
  ["suno", "music-generation"],
  ["elevenlabs", "voice-speech"],
  ["otter-ai", "meetings-notes"],
  ["clarifai", "ai-apis-developer-services"],
];

async function countdown(seconds: number): Promise<void> {
  for (let i = seconds; i > 0; i--) {
    process.stdout.write(`Starting in ${i}s... (Ctrl+C to abort)\r`);
    await new Promise((r) => setTimeout(r, 1000));
  }
  process.stdout.write(" ".repeat(50) + "\r");
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set. Aborting.");
    process.exit(1);
  }

  const directUrl = getDirectUrl();
  const target = maskedHost(directUrl);
  console.log(`Target DB: ${target}`);
  console.log(`Platforms in mapping table: ${REASSIGNMENTS.length}`);
  console.log(`Categories in final taxonomy: ${FINAL_CATEGORIES.length}`);
  console.log("");

  if (!process.argv.includes("--yes")) {
    await countdown(5);
  }

  const adapter = new PrismaPg(directUrl);
  const prisma = new PrismaClient({ adapter }) as any;

  try {
    // -------- 1. Capture before-state for audit log --------
    const beforeRows = await prisma.platform.findMany({
      where: { slug: { in: REASSIGNMENTS.map((r) => r.platformSlug) } },
      select: {
        slug: true,
        name: true,
        categoryId: true,
        category: { select: { name: true, slug: true } },
      },
      orderBy: { slug: "asc" },
    });

    // -------- 2. Upsert all 20 categories --------
    console.log("Upserting categories...");
    const categoryIdBySlug = new Map<string, string>();
    let categoriesCreated = 0;
    let categoriesUpdated = 0;

    for (const c of FINAL_CATEGORIES) {
      const existing = await prisma.category.findUnique({ where: { slug: c.slug } });
      const result = await prisma.category.upsert({
        where: { slug: c.slug },
        update: {
          name: c.name,
          sortOrder: c.sortOrder,
          icon: c.icon,
          description: c.description,
        },
        create: {
          name: c.name,
          slug: c.slug,
          sortOrder: c.sortOrder,
          icon: c.icon,
          description: c.description,
        },
      });
      categoryIdBySlug.set(c.slug, result.id);
      if (existing) {
        categoriesUpdated++;
        console.log(`  ~ ${String(c.sortOrder).padStart(2)}. ${c.slug} (updated)`);
      } else {
        categoriesCreated++;
        console.log(`  + ${String(c.sortOrder).padStart(2)}. ${c.slug} (created)`);
      }
    }
    console.log(`  ${categoriesCreated} created, ${categoriesUpdated} updated.`);
    console.log("");

    // -------- 3. Reassign platforms --------
    console.log("Reassigning platforms...");
    let updated = 0;
    let alreadyCorrect = 0;
    const notFound: string[] = [];

    for (const r of REASSIGNMENTS) {
      const targetCatId = categoryIdBySlug.get(r.categorySlug);
      if (!targetCatId) {
        throw new Error(
          `Internal error: destination category not in upserted set: ${r.categorySlug}`,
        );
      }

      const platform = await prisma.platform.findUnique({
        where: { slug: r.platformSlug },
        select: { id: true, categoryId: true },
      });

      if (!platform) {
        notFound.push(r.platformSlug);
        console.log(`  ✗ ${r.platformSlug} NOT FOUND IN DB`);
        continue;
      }

      if (platform.categoryId === targetCatId) {
        alreadyCorrect++;
        console.log(`  · ${r.platformSlug} already in ${r.categorySlug}`);
        continue;
      }

      await prisma.platform.update({
        where: { id: platform.id },
        data: { categoryId: targetCatId },
      });
      updated++;
      console.log(`  → ${r.platformSlug} → ${r.categorySlug}`);
    }
    console.log("");

    // -------- 4. Verify superseded categories are empty --------
    const orphanRemaining = await prisma.platform.findMany({
      where: { category: { slug: { in: SUPERSEDED_CATEGORY_SLUGS } } },
      select: {
        slug: true,
        name: true,
        category: { select: { slug: true, name: true } },
      },
      orderBy: { slug: "asc" },
    });

    // -------- 5. Per-category platform counts --------
    const allCategories = await prisma.category.findMany({
      orderBy: [{ sortOrder: "asc" }, { slug: "asc" }],
      include: { _count: { select: { platforms: true } } },
    });

    console.log("Per-category counts (post-shuffle):");
    for (const cat of allCategories) {
      const isSuperseded = SUPERSEDED_CATEGORY_SLUGS.includes(cat.slug);
      const marker = isSuperseded ? "  ⚠ SUPERSEDED (delete in Migration B)" : "";
      const order = String(cat.sortOrder).padStart(3);
      console.log(
        `  ${order}  ${cat.name.padEnd(40)} ${String(cat._count.platforms).padStart(3)}${marker}`,
      );
    }
    console.log("");

    // -------- 6. Spot checks --------
    console.log("Spot checks:");
    let spotFailures = 0;
    for (const [pSlug, expectedCatSlug] of SPOT_CHECKS) {
      const row = await prisma.platform.findUnique({
        where: { slug: pSlug },
        select: { category: { select: { slug: true } } },
      });
      const actualCatSlug = row?.category?.slug ?? null;
      const ok = actualCatSlug === expectedCatSlug;
      if (!ok) spotFailures++;
      console.log(
        `  ${ok ? "✓" : "✗"} ${pSlug.padEnd(28)} expected=${expectedCatSlug.padEnd(30)} actual=${actualCatSlug ?? "NOT FOUND"}`,
      );
    }
    console.log("");

    // -------- 7. After-state for audit log --------
    const afterRows = await prisma.platform.findMany({
      where: { slug: { in: REASSIGNMENTS.map((r) => r.platformSlug) } },
      select: {
        slug: true,
        name: true,
        category: { select: { name: true, slug: true } },
      },
      orderBy: { slug: "asc" },
    });

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const auditPath = path.join(
      process.cwd(),
      "tmp",
      `category-restructure-${timestamp}.json`,
    );
    fs.mkdirSync(path.dirname(auditPath), { recursive: true });
    fs.writeFileSync(
      auditPath,
      JSON.stringify(
        {
          target,
          ranAt: new Date().toISOString(),
          summary: {
            platformsTotal: REASSIGNMENTS.length,
            updated,
            alreadyCorrect,
            notFound: notFound.length,
            orphanRemaining: orphanRemaining.length,
            categoriesCreated,
            categoriesUpdated,
          },
          notFound,
          orphanRemaining,
          spotChecks: SPOT_CHECKS.map(([slug, expected]) => ({ slug, expected })),
          before: beforeRows,
          after: afterRows,
          finalCounts: allCategories.map((c: any) => ({
            sortOrder: c.sortOrder,
            slug: c.slug,
            name: c.name,
            platformCount: c._count.platforms,
            superseded: SUPERSEDED_CATEGORY_SLUGS.includes(c.slug),
          })),
        },
        null,
        2,
      ) + "\n",
    );

    console.log("Summary:");
    console.log(`  Target:                       ${target}`);
    console.log(`  Categories created:           ${categoriesCreated}`);
    console.log(`  Categories updated:           ${categoriesUpdated}`);
    console.log(`  Platforms updated:            ${updated}`);
    console.log(`  Platforms already correct:    ${alreadyCorrect}`);
    console.log(`  Platforms NOT FOUND:          ${notFound.length}`);
    console.log(`  Orphans in superseded cats:   ${orphanRemaining.length}`);
    console.log(`  Spot-check failures:          ${spotFailures}`);
    console.log(`  Audit log:                    ${auditPath}`);
    console.log("");

    if (notFound.length > 0) {
      console.log("Platforms not found in DB:");
      for (const s of notFound) console.log(`  - ${s}`);
      console.log("");
    }

    if (orphanRemaining.length > 0) {
      console.log("NOT READY FOR MIGRATION B — platforms still in superseded categories:");
      for (const o of orphanRemaining) {
        console.log(`  - ${o.slug} (in ${o.category?.slug})`);
      }
      console.log("");
    }

    const failed =
      notFound.length > 0 || orphanRemaining.length > 0 || spotFailures > 0;

    if (failed) {
      console.log("✗ Script completed with failures. Do NOT run Migration B yet.");
      process.exit(1);
    }

    console.log("✓ Ready for Migration B (remove superseded category rows).");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
