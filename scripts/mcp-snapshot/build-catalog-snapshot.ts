/**
 * Builds src/lib/mcp/catalog-snapshot.json OFFLINE, for tests only.
 *
 * No database, no network, no /data/v1 or /mcp call. The snapshot is a
 * RECONSTRUCTION of the listed catalog from what the repo already holds,
 * replayed in the order it reached production:
 *
 *   1. data/ai_platforms_enhanced_metadata.xlsx  (the April 2026 import, 168 rows)
 *   2. scripts/seed-missing-platforms.ts         (2026-04-17)
 *   3. scripts/restructure-categories-2026-05.ts (2026-05-12 category moves)
 *   4. scripts/seed-{phase1-batch1,batch2,batch3}-platforms.ts and
 *      scripts/update-catalog-audit-{1,2}.ts     (2026-10-14)
 *   5. a local, read-only export taken by scripts/export-platforms.ts on
 *      2026-10-15 (passed as argv[2]); it supplies the authoritative slug
 *      list, name, company, website, tiers, category and `updatedAt` for
 *      that day. It is not committed (tmp/ is gitignored).
 *   6. catalog audits 3-11 (src/data/catalog-audits/*), each applied with its
 *      own diff function, bumping `updatedAt` to the audit's run date only
 *      when the diff is non-empty, like Prisma's @updatedAt;
 *   7. audit 15's slug renames, guarded name/website fields and name refs
 *      (guide PR D). Audits 12-14 are not replayed (text and category
 *      fields only), as before.
 *
 * Hidden rows (catalog-visibility.ts) are dropped, as loadCatalog does.
 * Prisma Studio hand edits are invisible to this replay; the test that
 * consumes the snapshot checks it against the verbatim feed rows in
 * search-fixtures.ts and the saved stress-test results instead.
 *
 * Usage: npx tsx scripts/mcp-snapshot/build-catalog-snapshot.ts <export-2026-10-15.json>
 */
import * as fs from "fs";
import * as path from "path";
import * as XLSX from "xlsx";
import { REGISTERED_TOOL_FACTS } from "../../src/data/facts/registry";
import { audit3NameRenames, REF_FIELDS, rewriteNameRefs } from "../../src/data/catalog-audits/audit-3-refs";
import { AUDIT_4_PATCHES, audit4UpdateData, diffAudit4Patch } from "../../src/data/catalog-audits/audit-4";
import {
  AUDIT_5_PATCHES,
  AUDIT_5_REF_EDITS,
  AUDIT_5_TEXT_FIXES,
  audit5Slugs,
  audit5UpdateData,
  diffAudit5,
} from "../../src/data/catalog-audits/audit-5";
import {
  AUDIT_6_PATCHES,
  AUDIT_6_SLUG_RENAMES,
  audit6RefUpdates,
  audit6UpdateData,
  diffAudit6,
} from "../../src/data/catalog-audits/audit-6";
import { AUDIT_7_PATCHES, planAudit7 } from "../../src/data/catalog-audits/audit-7";
import { AUDIT_8_CREATES, AUDIT_8_PATCHES, audit8UpdateData, diffAudit8 } from "../../src/data/catalog-audits/audit-8";
import {
  AUDIT_9_CATEGORIES,
  AUDIT_9_CREATES,
  AUDIT_9_PATCHES,
  audit9UpdateData,
  diffAudit9,
} from "../../src/data/catalog-audits/audit-9";
import { audit10Slugs, audit10UpdateData, diffAudit10Row } from "../../src/data/catalog-audits/audit-10";
import { audit11KeepsUpdatedAt, audit11Slugs, audit11UpdateData, diffAudit11Row } from "../../src/data/catalog-audits/audit-11";
import {
  AUDIT_15_RENAMES,
  audit15RefUpdates,
  audit15UpdateData,
  planAudit15Fields,
} from "../../src/data/catalog-audits/audit-15";
import { PLATFORM_REDIRECTS } from "../../src/lib/catalog-redirects";
import { hiddenPlatformSlugs } from "../../src/lib/catalog-visibility";
import type { CatalogRow } from "../../src/lib/mcp/tools";

const ROOT = path.resolve(__dirname, "..", "..");
const OUT = path.join(ROOT, "src", "lib", "mcp", "catalog-snapshot.json");

type Row = CatalogRow & { updatedAt: string };

const CATEGORY_NAMES: Record<string, string> = {
  "text-conversational-ai": "Text & Conversational AI",
  "image-generation-editing": "Image Generation & Editing",
  "video-creation-editing": "Video Creation & Editing",
  "music-generation": "Music Generation",
  "voice-speech": "Voice & Speech",
  "research-academic-tools": "Research & Academic Tools",
  "document-pdf-processing": "Document & PDF Processing",
  "meetings-notes": "Meetings & Notes",
  "ai-coding-development": "AI Coding & Development",
  "workflow-automation": "Workflow & Automation",
  "ai-plugins-business-software": "AI Plugins for Business Software",
  "sales-marketing-seo-ai": "Sales, Marketing & SEO AI",
  "education-learning-ai": "Education & Learning AI",
  "legal-ai": "Legal AI",
  "healthcare-ai": "Healthcare AI",
  "finance-real-estate-ai": "Finance & Real Estate AI",
  "ai-apis-developer-services": "AI APIs & Developer Services",
  "local-open-source-ai": "Local & Open-Source AI",
  "international-regional-ai": "International & Regional AI",
  "gaming-creative-ai": "Gaming & Creative AI",
  ...Object.fromEntries(AUDIT_9_CATEGORIES.map((c) => [c.slug, c.name])),
};

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function blank(slug: string, name: string): Row {
  return {
    slug,
    name,
    company: null,
    website: null,
    description: null,
    primaryUse: null,
    primaryUseCases: null,
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    platformType: ["web"],
    currentPricing: null,
    freeTierFeatures: null,
    usageLimits: null,
    apiAvailable: false,
    directAlternatives: [],
    budgetAlternativeTo: [],
    updatedAt: "2026-04-13",
    category: null,
    idealUserTypes: [],
    contentTypes: [],
    outputFormats: [],
    privacyLevel: "MEDIUM",
    timeToProductivity: null,
    learningCurve: null,
    offlineCapable: false,
    languageSupport: null,
    keyIntegrations: null,
    upgradeTriggers: null,
    complementaryTools: [],
    hasMobileApp: false,
    iosAppUrl: null,
    androidAppUrl: null,
  };
}

// ---------- array literals out of operator scripts (they run main() on import) ----------

function arrayLiteral(file: string, marker: string): unknown[] {
  const src = fs.readFileSync(path.join(ROOT, file), "utf8");
  const start = src.indexOf(marker);
  if (start < 0) throw new Error(`${marker} not found in ${file}`);
  let i = src.indexOf("= [", start) + 2;
  const open = i;
  let depth = 0;
  let quote: string | null = null;
  for (; i < src.length; i++) {
    const ch = src[i];
    if (quote) {
      if (ch === "\\") i++;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") quote = ch;
    else if (ch === "/" && src[i + 1] === "/") i = src.indexOf("\n", i);
    else if (ch === "[") depth++;
    else if (ch === "]" && --depth === 0) break;
  }
  const literal = src
    .slice(open, i + 1)
    .replace(/\s+as\s+(?:const|string\[\]|CostTier)\b/g, "")
    // seed-missing-platforms.ts points at category ids it looked up; the export supplies the category.
    .replace(/categoryId: \w+\.id,/g, "");
  return new Function(`return ${literal};`)() as unknown[];
}

// ---------- 1. xlsx ----------

function parseList(value: unknown): string[] {
  if (!value) return [];
  return String(value).split(/[,;]/).map((s) => s.trim()).filter(Boolean);
}
function tier(value: unknown, map: Record<string, string>, fallback: string): string {
  return map[String(value ?? "").toLowerCase().trim()] ?? fallback;
}

function fromXlsx(rows: Map<string, Row>) {
  const wb = XLSX.readFile(path.join(ROOT, "data", "ai_platforms_enhanced_metadata.xlsx"));
  for (const sheetName of wb.SheetNames) {
    const sheet: (string | null)[][] = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { header: 1, defval: null });
    const headers = (sheet[1] ?? []).map((h) => String(h ?? "").trim());
    const col = (r: (string | null)[], name: string) => {
      const v = r[headers.indexOf(name)];
      return v === null || v === undefined || String(v) === "" ? null : String(v);
    };
    for (const r of sheet.slice(2)) {
      const name = col(r, "Platform Name")?.trim();
      if (!name) continue;
      const row = blank(slugify(name), name);
      Object.assign(row, {
        company: col(r, "Company"),
        website: col(r, "Website"),
        primaryUse: col(r, "Primary Use"),
        currentPricing: col(r, "Current Pricing"),
        costTier: tier(col(r, "Cost Tier"), { free: "FREE", freemium: "FREEMIUM", paid: "PAID", enterprise: "ENTERPRISE" }, "FREEMIUM"),
        difficultyLevel: tier(col(r, "Difficulty Level"), { beginner: "BEGINNER", intermediate: "INTERMEDIATE", advanced: "ADVANCED", expert: "EXPERT" }, "BEGINNER"),
        platformType: col(r, "Platform Type")
          ? col(r, "Platform Type")!.toLowerCase().split(/[,+&]/).map((s) => s.trim().replace(/\s+/g, "_")).filter(Boolean)
          : ["web"],
        freeTierFeatures: col(r, "Free Tier Features"),
        usageLimits: col(r, "Usage Limits"),
        upgradeTriggers: col(r, "Upgrade Triggers"),
        offlineCapable: (col(r, "Offline Capable") ?? "").toLowerCase() === "yes",
        apiAvailable: (col(r, "API Available") ?? "").toLowerCase().startsWith("yes"),
        keyIntegrations: col(r, "Key Integrations"),
        privacyLevel: tier(col(r, "Privacy Level"), { low: "LOW", medium: "MEDIUM", high: "HIGH", maximum: "MAXIMUM", max: "MAXIMUM" }, "MEDIUM"),
        idealUserTypes: parseList(col(r, "Ideal User Types")),
        primaryUseCases: col(r, "Primary Use Cases"),
        timeToProductivity: col(r, "Time to Productivity"),
        learningCurve: col(r, "Learning Curve"),
        directAlternatives: parseList(col(r, "Direct Alternatives")),
        complementaryTools: parseList(col(r, "Complementary Tools")),
        budgetAlternativeTo: parseList(col(r, "Budget Alternative To")),
        contentTypes: parseList(col(r, "Content Types Supported")),
        outputFormats: parseList(col(r, "Output Formats")),
        languageSupport: col(r, "Language Support"),
      });
      rows.set(row.slug, row);
    }
  }
}

// ---------- 2-4. seeds and audits 1-2 ----------

type Seed = Partial<Row> & { slug: string; name?: string; categorySlug?: string };

function applySeed(rows: Map<string, Row>, seed: Seed, date: string) {
  const row = rows.get(seed.slug) ?? blank(seed.slug, seed.name ?? seed.slug);
  const { categorySlug, ...fields } = seed;
  Object.assign(row, fields);
  if (categorySlug) row.category = { slug: categorySlug, name: CATEGORY_NAMES[categorySlug] ?? categorySlug };
  row.updatedAt = date;
  rows.set(row.slug, row);
}

function applyPatches(rows: Map<string, Row>, file: string, date: string) {
  for (const patch of arrayLiteral(file, "const PATCHES: CatalogPatch[] = [") as { slug: string; fields: Partial<Row> }[]) {
    const row = rows.get(patch.slug);
    if (!row) continue;
    Object.assign(row, patch.fields);
    row.updatedAt = date;
  }
}

// ---------- 5. the 2026-10-15 export ----------

type ExportRow = {
  slug: string;
  name: string;
  company: string | null;
  categoryName: string;
  categorySlug: string;
  website: string | null;
  costTier: string;
  difficultyLevel: string;
  privacyLevel: string;
  hasMobileApp: boolean;
  updatedAt: string;
};

function main() {
  const exportPath = process.argv[2];
  if (!exportPath) throw new Error("usage: build-catalog-snapshot.ts <platforms-export-2026-10-15.json>");
  const exported: ExportRow[] = JSON.parse(fs.readFileSync(exportPath, "utf8"));

  const rows = new Map<string, Row>();
  fromXlsx(rows);
  // seed-missing-platforms.ts (2026-04-17); the export below supplies its tiers and category.
  for (const seed of arrayLiteral("scripts/seed-missing-platforms.ts", "const rows: Array<") as Seed[]) {
    // Its `jasper-ai` row is the one that lives under `jasper` (dedupe-jasper-platforms.ts).
    applySeed(rows, seed.slug === "jasper-ai" ? { ...seed, slug: "jasper" } : seed, "2026-04-17");
  }
  // The same script updates the existing `claude` row's description (claudePayload).
  const claude = rows.get("claude");
  if (claude) {
    claude.description = "Anthropic’s assistant for long-context writing, coding, analysis, and reasoning across web and API.";
  }
  for (const seed of arrayLiteral("scripts/seed-phase1-batch1-platforms.ts", "const ROWS: SeedRow[] = [") as Seed[]) applySeed(rows, seed, "2026-10-14");
  for (const seed of arrayLiteral("scripts/seed-batch2-platforms.ts", "const ROWS: SeedRow[] = [") as Seed[]) applySeed(rows, seed, "2026-10-14");
  for (const seed of arrayLiteral("scripts/seed-batch3-platforms.ts", "const ROWS: SeedRow[] = [") as Seed[]) applySeed(rows, seed, "2026-10-14");
  applyPatches(rows, "scripts/update-catalog-audit-1.ts", "2026-10-14");
  applyPatches(rows, "scripts/update-catalog-audit-2.ts", "2026-10-14");

  // The export is the truth for 2026-10-15: drop rows it lacks, add the ones the replay missed.
  const out = new Map<string, Row>();
  const missingText: string[] = [];
  for (const e of exported) {
    const replayed = rows.get(e.slug);
    if (!replayed) missingText.push(e.slug);
    const row = replayed ?? blank(e.slug, e.name);
    Object.assign(row, {
      name: e.name,
      company: e.company,
      website: e.website,
      costTier: e.costTier,
      difficultyLevel: e.difficultyLevel,
      privacyLevel: e.privacyLevel,
      hasMobileApp: e.hasMobileApp,
      category: { slug: e.categorySlug, name: e.categoryName },
      updatedAt: e.updatedAt.slice(0, 10),
    });
    out.set(e.slug, row);
  }

  // ---------- 6. audits 3-10 ----------
  const touch = (row: Row, date: string) => (row.updatedAt = date);
  const AUDIT_3_TO_6 = "2026-10-25";
  const AUDIT_7_TO_10 = "2026-10-26";
  const AUDIT_11 = "2026-10-26";

  // Audit 3: name / website / company synced from fact files, then name refs.
  for (const slug of ["google-antigravity", "runway-for-education", "windsurf", "notebooklm", "wonder-dynamics-wonder-studio", "unriddle", "kira-systems", "casetext-cocounsel", "lexis-plus-ai"]) {
    const row = out.get(slug);
    // notebooklm's fact file moved to gemini-notebook with audit 15.
    const f = REGISTERED_TOOL_FACTS[PLATFORM_REDIRECTS[slug] ?? slug];
    if (!row || !f) continue;
    const next = { name: f.displayName?.value, website: f.officialUrl?.value, company: f.company?.value };
    let changed = false;
    for (const [k, v] of Object.entries(next) as [keyof typeof next, string | undefined][]) {
      if (v !== undefined && row[k] !== v) {
        (row as Record<string, unknown>)[k] = v;
        changed = true;
      }
    }
    if (changed) touch(row, AUDIT_3_TO_6);
  }
  const renames3 = audit3NameRenames();
  for (const row of out.values()) {
    let changed = false;
    for (const field of REF_FIELDS) {
      const current = (row as Record<string, unknown>)[field] as string[] | undefined;
      if (!current) continue;
      const { next, changes } = rewriteNameRefs(current, renames3);
      if (changes.length > 0) {
        (row as Record<string, unknown>)[field] = next;
        changed = true;
      }
    }
    if (changed) touch(row, AUDIT_3_TO_6);
  }

  // Audit 4.
  for (const patch of AUDIT_4_PATCHES) {
    const row = out.get(patch.slug);
    if (!row) continue;
    const diffs = diffAudit4Patch(row as never, patch);
    if (diffs.length) {
      Object.assign(row, audit4UpdateData(diffs));
      touch(row, AUDIT_3_TO_6);
    }
  }
  // Audit 5.
  for (const slug of audit5Slugs()) {
    const row = out.get(slug);
    if (!row) continue;
    const withRefs = { privacyAlternativeTo: [], ...row } as never;
    const diffs = diffAudit5(
      withRefs,
      AUDIT_5_PATCHES.find((p) => p.slug === slug),
      AUDIT_5_REF_EDITS.filter((e) => e.slug === slug),
      AUDIT_5_TEXT_FIXES.filter((f) => f.slug === slug),
    );
    if (diffs.length) {
      Object.assign(row, audit5UpdateData(diffs));
      touch(row, AUDIT_3_TO_6);
    }
  }
  // Audit 6: slug rename, field patches, name refs.
  for (const rename of AUDIT_6_SLUG_RENAMES) {
    const row = out.get(rename.from);
    if (!row || out.has(rename.to)) continue;
    out.delete(rename.from);
    row.slug = rename.to;
    out.set(rename.to, row);
    touch(row, AUDIT_3_TO_6);
  }
  for (const patch of AUDIT_6_PATCHES) {
    const row = out.get(patch.slug);
    if (!row) continue;
    const diffs = diffAudit6(row as never, patch);
    if (diffs.length) {
      Object.assign(row, audit6UpdateData(diffs));
      touch(row, AUDIT_3_TO_6);
    }
  }
  for (const row of out.values()) {
    const refRow = { directAlternatives: row.directAlternatives, complementaryTools: row.complementaryTools, budgetAlternativeTo: row.budgetAlternativeTo, privacyAlternativeTo: [] };
    const updates = audit6RefUpdates(refRow as never);
    for (const u of updates) if (u.field !== "privacyAlternativeTo") (row as Record<string, unknown>)[u.field] = u.to;
    if (updates.some((u) => u.field !== "privacyAlternativeTo")) touch(row, AUDIT_3_TO_6);
  }
  // Audit 7.
  for (const patch of AUDIT_7_PATCHES) {
    const row = out.get(patch.slug);
    if (row && planAudit7(row.costTier, patch) === "update") {
      row.costTier = patch.costTier.to;
      touch(row, AUDIT_7_TO_10);
    }
  }
  // Audit 8 and 9: creates, then patches.
  for (const create of [...AUDIT_8_CREATES, ...AUDIT_9_CREATES]) {
    if (out.has(create.row.slug)) continue;
    const row = blank(create.row.slug, create.row.name);
    Object.assign(row, create.row, {
      directAlternatives: [...(("directAlternatives" in create && create.directAlternatives) || [])],
      category: { slug: create.categorySlug, name: CATEGORY_NAMES[create.categorySlug] ?? create.categorySlug },
      updatedAt: AUDIT_7_TO_10,
    });
    out.set(row.slug, row);
  }
  for (const patch of AUDIT_8_PATCHES) {
    const row = out.get(patch.slug);
    if (!row) continue;
    const diffs = diffAudit8(row as never, patch);
    if (diffs.length) {
      Object.assign(row, audit8UpdateData(diffs));
      touch(row, AUDIT_7_TO_10);
    }
  }
  for (const patch of AUDIT_9_PATCHES) {
    const row = out.get(patch.slug);
    if (!row) continue;
    const diffs = diffAudit9(row as never, patch);
    if (diffs.length) {
      Object.assign(row, audit9UpdateData(diffs));
      touch(row, AUDIT_7_TO_10);
    }
  }

  // Audit 10: field patches and the "official" wording fix (MCP fix plan P1.3).
  for (const slug of audit10Slugs()) {
    const row = out.get(slug);
    if (!row) continue;
    const diffs = diffAudit10Row(slug, row);
    if (diffs.length) {
      Object.assign(row, audit10UpdateData(diffs));
      touch(row, AUDIT_7_TO_10);
    }
  }

  // Audit 11: free labels and Copilot credits (MCP fix plan P1.3c).
  for (const slug of audit11Slugs()) {
    const row = out.get(slug);
    if (!row) continue;
    const diffs = diffAudit11Row(slug, row);
    if (diffs.length) {
      Object.assign(row, audit11UpdateData(diffs));
      if (!audit11KeepsUpdatedAt(slug)) touch(row, AUDIT_11);
    }
  }

  // ---------- 7. audit 15 (guide PR D renames) ----------
  const AUDIT_15 = "2026-10-29";
  for (const rename of AUDIT_15_RENAMES) {
    const row = out.get(rename.from);
    if (!row || out.has(rename.to)) continue;
    out.delete(rename.from);
    row.slug = rename.to;
    out.set(rename.to, row);
    touch(row, AUDIT_15);
  }
  for (const rename of AUDIT_15_RENAMES) {
    const row = out.get(rename.to);
    if (!row) continue;
    const data = audit15UpdateData(planAudit15Fields(row as never, rename));
    if (Object.keys(data).length) {
      Object.assign(row, data);
      touch(row, AUDIT_15);
    }
  }
  for (const row of out.values()) {
    // Some replayed rows lack a reference column; treat it as empty.
    const refs = Object.fromEntries(REF_FIELDS.map((k) => [k, ((row as Record<string, unknown>)[k] as string[] | undefined) ?? []]));
    const updates = audit15RefUpdates(refs as never);
    if (updates.length === 0) continue;
    for (const u of updates) (row as Record<string, unknown>)[u.field] = u.to;
    touch(row, AUDIT_15);
  }

  const hidden = new Set(hiddenPlatformSlugs());
  const listed = [...out.values()].filter((r) => !hidden.has(r.slug)).sort((a, b) => a.slug.localeCompare(b.slug));
  const snapshot = {
    note:
      "TESTS ONLY. Offline reconstruction of the listed catalog (see scripts/mcp-snapshot/build-catalog-snapshot.ts). " +
      "Not a production export; regenerate from a real /data/v1 pull when one is taken.",
    built_from: "xlsx + seed scripts + catalog audits 1-11 + audit 15 renames + local export 2026-10-15",
    db_rows: out.size,
    hidden_rows: [...out.keys()].filter((s) => hidden.has(s)).sort(),
    rows: listed,
  };
  fs.writeFileSync(OUT, `${JSON.stringify(snapshot, null, 1)}\n`);
  console.log(`db rows ${out.size}, listed ${listed.length}, hidden ${snapshot.hidden_rows.join(", ")}`);
  if (missingText.length) console.log(`no replayed text for: ${missingText.join(", ")}`);
}

main();
