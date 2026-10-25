/**
 * Phase 1 batch 2 — upsert 14 catalog platforms by slug.
 *
 * Defer (not in this script): Ada Health, Abridge.
 *
 * OPERATOR ONLY. This script writes to whichever database DATABASE_URL
 * points at. Do not run it from an agent session. Neon branch first.
 *
 * Usage (default is dry-run; writes require --apply):
 *   npx tsx scripts/seed-batch2-platforms.ts
 *   npx tsx scripts/seed-batch2-platforms.ts --dry-run
 *   npx tsx scripts/seed-batch2-platforms.ts --apply
 *
 * Gate G1: parse DATABASE_URL's hostname and refuse if it starts with
 * `ep-odd-mud-ajdk8f99` (covers the compute, `-pooler` variant, and full
 * FQDN). Prints the full target host. Never prints credentials.
 *
 * Gate G3: this file is written for the operator to run. Agents must not
 * execute it.
 */
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, type CostTier, type Difficulty, type PrivacyLevel } from "@prisma/client";

const PRODUCTION_ENDPOINT_ID = "ep-odd-mud-ajdk8f99";

type SeedRow = {
  slug: string;
  name: string;
  company: string;
  website: string;
  categorySlug: string;
  primaryUse: string;
  primaryUseCases: string;
  description: string;
  currentPricing: string;
  freeTierFeatures: string;
  costTier: CostTier;
  difficultyLevel: Difficulty;
  privacyLevel: PrivacyLevel;
  platformType: string[];
  apiAvailable: boolean;
  offlineCapable: boolean;
  idealUserTypes: string[];
  contentTypes: string[];
  outputFormats: string[];
};

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
      /* fall through */
    }
  }
  return raw;
}

function hostnameOnly(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return "<unparseable URL>";
  }
}

async function countdown(seconds: number): Promise<void> {
  for (let i = seconds; i > 0; i--) {
    console.log(`Writes begin in ${i}…`);
    await new Promise((r) => setTimeout(r, 1000));
  }
}

/**
 * Catalog rows from the 2026-10-13 batch-2 brief.
 * Caution notes live in description / currentPricing / freeTierFeatures —
 * existing fields only. Ada Health and Abridge are deferred.
 */
const ROWS: SeedRow[] = [
  {
    slug: "wispr-flow",
    name: "Wispr Flow",
    company: "Wispr",
    website: "https://wisprflow.ai",
    categorySlug: "voice-speech",
    primaryUse: "AI dictation that types into any app",
    primaryUseCases: "Talking instead of typing across desktop apps; voice-to-text for writers and knowledge workers",
    description:
      "Dictation app that inserts transcribed speech into whatever you have focused. As of 2026-10-13, dictation audio is processed in the cloud — review before dictating sensitive or regulated content. Official pricing (wisprflow.ai/pricing): Free plan $0; Pro $15/user/mo ($12 billed annually); Growth $33/user/mo ($26 annual), which adds a notetaker and admin controls. Exact Free-plan usage limits are unverified.",
    currentPricing:
      "Free $0; Pro $15/user/mo ($12 annual); Growth $33/user/mo ($26 annual); Free-plan limits unverified",
    freeTierFeatures: "Free plan $0; exact limits unverified as of 2026-10-13",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "MEDIUM",
    platformType: ["desktop"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["writers", "knowledge workers"],
    contentTypes: ["audio", "speech"],
    outputFormats: ["text"],
  },
  {
    slug: "speechify",
    name: "Speechify",
    company: "Speechify",
    website: "https://speechify.com",
    categorySlug: "voice-speech",
    primaryUse: "Text-to-speech reader for documents and web pages",
    primaryUseCases: "Listening to documents; support for readers with dyslexia or fatigue",
    description:
      "Text-to-speech reader. Official pricing (speechify.com/pricing, as of 2026-10-13): Free includes 10 basic (“robotic”) voices and up to 1.5x speed; Premium $29/mo billed monthly. The site advertises annual billing that “saves 60%”; the exact annual dollar price is unverified. Usual SaaS data-handling.",
    currentPricing: "Premium $29/mo monthly; annual “save 60%” (exact annual price unverified); Free voices/speed as listed",
    freeTierFeatures: "10 basic voices; up to 1.5x speed (official, as of 2026-10-13)",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "MEDIUM",
    platformType: ["web", "mobile", "desktop"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["students", "readers with dyslexia", "commuters"],
    contentTypes: ["text", "documents"],
    outputFormats: ["audio"],
  },
  {
    slug: "sarvam-ai",
    name: "Sarvam AI",
    company: "Sarvam AI",
    website: "https://www.sarvam.ai",
    categorySlug: "international-regional-ai",
    primaryUse: "Indian-language speech, TTS, and chat models (API)",
    primaryUseCases: "Builders targeting Indic languages for speech, voice agents, or chat",
    description:
      "India-based models for Indic-language speech, TTS, and chat. As of 2026-10-13, official API pricing (sarvam.ai/api-pricing) is pay-as-you-go after starter credits. Example: Bulbul V4 Flash TTS ₹2.00 per 1k characters, dropping to ₹1.70 on higher volume tiers. Voice agents are listed “as low as ₹3/min”. Starter credit amount is unverified. Review data-handling for inputs processed in India.",
    currentPricing:
      "Pay-as-you-go (e.g. Bulbul V4 Flash TTS ₹2.00 per 1k chars, ₹1.70 higher tiers); voice agents from ₹3/min; starter credits amount unverified",
    freeTierFeatures: "Free starter credits; amount unverified as of 2026-10-13",
    costTier: "FREEMIUM",
    difficultyLevel: "INTERMEDIATE",
    privacyLevel: "MEDIUM",
    platformType: ["api", "web"],
    apiAvailable: true,
    offlineCapable: false,
    idealUserTypes: ["developers targeting Indic languages"],
    contentTypes: ["text", "audio", "speech"],
    outputFormats: ["text", "audio"],
  },
  {
    slug: "read-ai",
    name: "Read AI",
    company: "Read AI",
    website: "https://www.read.ai",
    categorySlug: "meetings-notes",
    primaryUse: "Meeting notes plus search across past meetings",
    primaryUseCases: "Individuals and teams who want summaries and a searchable meeting archive",
    description:
      "Meeting notes and cross-meeting search. As of 2026-10-13, some US states require all-party consent to record — tell every attendee before recording and follow the law where participants are located. Official pricing (read.ai/pricing): Free 5 meeting transcripts/mo, no card; paid per user per month $19.75 ($15 annual), $29.75 ($22.50 annual), $39.75 ($29.75 annual).",
    currentPricing:
      "Free 5 transcripts/mo; $19.75/user/mo ($15 annual); $29.75 ($22.50 annual); $39.75 ($29.75 annual)",
    freeTierFeatures: "5 meeting transcripts/mo, no credit card (official, as of 2026-10-13)",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "MEDIUM",
    platformType: ["web"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["individuals", "teams"],
    contentTypes: ["audio", "meetings"],
    outputFormats: ["transcripts", "notes"],
  },
  {
    slug: "krisp",
    name: "Krisp",
    company: "Krisp",
    website: "https://krisp.ai",
    categorySlug: "meetings-notes",
    primaryUse: "On-device noise cancellation plus an optional AI notetaker",
    primaryUseCases: "Noisy calls; meeting notes when you also enable the notetaker",
    description:
      "Noise cancellation (on-device) with an optional AI notetaker. Noise cancellation does not require sending meeting audio to the cloud; the notetaker does capture meeting audio. As of 2026-10-13, some US states require all-party consent to record — tell attendees before using notes features and follow the law where participants are located. Official pricing (krisp.ai/pricing): Free trial, no card (exact trial limits unverified); Core $16/user/mo ($8 annual); Advanced $30 ($15 annual); call-center $15/agent/mo annual.",
    currentPricing:
      "Core $16/user/mo ($8 annual); Advanced $30/user/mo ($15 annual); call-center $15/agent/mo annual; free trial limits unverified",
    freeTierFeatures: "Free trial, no credit card; limits unverified as of 2026-10-13",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "MEDIUM",
    platformType: ["desktop"],
    apiAvailable: false,
    offlineCapable: true,
    idealUserTypes: ["remote workers", "call-center agents"],
    contentTypes: ["audio", "meetings"],
    outputFormats: ["audio", "notes"],
  },
  {
    slug: "openevidence",
    name: "OpenEvidence",
    company: "OpenEvidence",
    website: "https://www.openevidence.com",
    categorySlug: "healthcare-ai",
    primaryUse: "Cited clinical answers for verified US clinicians",
    primaryUseCases: "Licensed US clinicians looking up evidence-backed answers; not for patients or self-diagnosis",
    description:
      "Cited clinical Q&A, free for verified US healthcare professionals. Access is gated to licensed clinicians: it is not for patients or self-diagnosis and is not a consumer symptom checker. Its privacy policy (updated September 17, 2026) says it secures protected health information (PHI) in compliance with HIPAA and does not train AI models on PHI. Its security page says HIPAA covered entities may send PHI under its standard Business Associate Agreement (official, as of 2026-10-25). Availability outside the US was not confirmed on the official site.",
    currentPricing: "Free: $0, no paid plans listed (official, as of 2026-10-25)",
    freeTierFeatures: "Yes (official, as of 2026-10-25)",
    costTier: "FREE",
    difficultyLevel: "INTERMEDIATE",
    privacyLevel: "MEDIUM",
    platformType: ["web"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["US clinicians"],
    contentTypes: ["text", "clinical questions"],
    outputFormats: ["text", "citations"],
  },
  {
    slug: "doximity-gpt",
    name: "Doximity GPT",
    company: "Doximity",
    website: "https://www.doximity.com/gpt",
    categorySlug: "healthcare-ai",
    primaryUse: "Clinical writing assistant for verified US clinicians",
    primaryUseCases: "Physicians drafting letters, notes, and similar clinical writing; not patient-facing medical advice",
    description:
      "Writing assistant on Doximity. Official page (doximity.com/gpt, as of 2026-10-13): free for verified US clinicians. Access is gated to licensed clinicians — outputs are not a substitute for clinical judgment or patient medical advice. HIPAA / BAA claims are unverified from the fetched public page.",
    currentPricing: "Free for verified US clinicians (official, as of 2026-10-13); no public paid consumer tier",
    freeTierFeatures: "Free for verified US clinicians (official, as of 2026-10-13); HIPAA/BAA status unverified",
    costTier: "FREE",
    difficultyLevel: "BEGINNER",
    privacyLevel: "MEDIUM",
    platformType: ["web", "mobile"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["US physicians"],
    contentTypes: ["text", "clinical notes"],
    outputFormats: ["text"],
  },
  {
    slug: "clay",
    name: "Clay",
    company: "Clay",
    website: "https://www.clay.com",
    categorySlug: "sales-marketing-seo-ai",
    primaryUse: "Data enrichment and go-to-market workflows",
    primaryUseCases: "Growth and sales operators enriching leads — not a beginner first tool",
    description:
      "Enrichment and GTM workflows over third-party personal data (names, emails, employers, and similar). As of 2026-10-13, GDPR, CAN-SPAM, and similar outreach-law compliance is the user’s responsibility — do not treat enrichment as permission to email. Official pricing (clay.com/pricing): Free 500 actions/mo; Launch listed as “$167/mo, starts at 15,000 actions/mo”. The page also shows $54–$60/mo add-on tiers; the exact billing basis for those figures is unverified.",
    currentPricing:
      "Free 500 actions/mo; Launch from $167/mo (15,000 actions/mo stated); add-on $54–$60/mo shown; billing basis unverified",
    freeTierFeatures: "500 actions/mo (official, as of 2026-10-13)",
    costTier: "FREEMIUM",
    difficultyLevel: "INTERMEDIATE",
    privacyLevel: "LOW",
    platformType: ["web"],
    apiAvailable: true,
    offlineCapable: false,
    idealUserTypes: ["sales operators", "growth teams"],
    contentTypes: ["contacts", "web"],
    outputFormats: ["tables", "enriched records"],
  },
  {
    slug: "apollo-io",
    name: "Apollo.io",
    company: "Apollo.io",
    website: "https://www.apollo.io",
    categorySlug: "sales-marketing-seo-ai",
    primaryUse: "B2B contact database plus outreach sequences",
    primaryUseCases: "Founders and SDRs doing outbound; user is responsible for GDPR/CAN-SPAM on third-party contacts",
    description:
      "B2B contact database and outreach. It processes third-party personal data. As of 2026-10-13, GDPR, CAN-SPAM, and similar outreach-law compliance is the user’s responsibility. Official pricing page (apollo.io/pricing) is JavaScript-rendered; dollar figures below are unverified (third-party pages citing that site in Sep–Oct 2026, not confirmed from the official HTML): Free 900 credits/yr; Basic $49/user/mo annual ($65 monthly); Professional $79 ($99 monthly); Organization $119 annual-only with a 3-seat minimum.",
    currentPricing:
      "Free/paid dollar amounts unverified (official page JS-rendered); third parties cite Free 900 credits/yr, Basic $49 annual / $65 monthly, Pro $79 / $99, Org $119 annual 3-seat min",
    freeTierFeatures: "Free plan reported; credit allotment unverified from official HTML as of 2026-10-13",
    costTier: "FREEMIUM",
    difficultyLevel: "INTERMEDIATE",
    privacyLevel: "LOW",
    platformType: ["web"],
    apiAvailable: true,
    offlineCapable: false,
    idealUserTypes: ["founders", "SDRs"],
    contentTypes: ["contacts"],
    outputFormats: ["sequences", "contact records"],
  },
  {
    slug: "magicschool",
    name: "MagicSchool",
    company: "MagicSchool",
    website: "https://www.magicschool.ai",
    categorySlug: "education-learning-ai",
    primaryUse: "AI toolkit for teachers (lesson plans, feedback, and similar)",
    primaryUseCases: "Individual teachers on the free plan; schools on paid seats",
    description:
      "Teacher toolkit. Tools can handle student work and student data — as of 2026-10-13, check your district privacy policy and FERPA/COPPA obligations before pasting student names, work, or identifiers. Official pricing (magicschool.ai/pricing): Free forever for individual teachers; Plus $12.99/mo or $8.33/mo billed annually; school/district plans available.",
    currentPricing:
      "Free forever for individual teachers; Plus $12.99/mo ($8.33/mo annual); school/district plans available",
    freeTierFeatures: "Free forever for individual teachers (official, as of 2026-10-13)",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "MEDIUM",
    platformType: ["web"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["teachers"],
    contentTypes: ["text", "lesson materials"],
    outputFormats: ["text", "lesson plans"],
  },
  {
    slug: "brisk-teaching",
    name: "Brisk Teaching",
    company: "Brisk Teaching",
    website: "https://www.briskteaching.com",
    categorySlug: "education-learning-ai",
    primaryUse: "Chrome/Edge extension with AI tools inside Google Docs and Classroom",
    primaryUseCases: "Teachers working in-browser on Docs/Classroom; district licenses for Premium",
    description:
      "Browser extension for teachers. Tools can handle student work and student data — as of 2026-10-13, check your district privacy policy and FERPA/COPPA obligations before using it on student identifiers or student work. Official FAQ/plans (as of 2026-10-13): Free Forever includes 20+ tools (new users get a 14-day Premium trial first). Premium and Intelligence are custom, priced per student, sold to schools or districts. Individual Educator Pro is not priced on the official plans page (unverified).",
    currentPricing:
      "Free Forever (20+ tools); school/district Premium and Intelligence custom per-student; Educator Pro individual price unverified",
    freeTierFeatures: "Free Forever, 20+ tools; 14-day Premium trial for new users (official, as of 2026-10-13)",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "MEDIUM",
    platformType: ["browser-extension"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["teachers"],
    contentTypes: ["text", "student work"],
    outputFormats: ["feedback", "text"],
  },
  {
    slug: "lexis-plus-ai",
    // Renamed February 2026 (src/data/facts/lexis-plus-ai.ts); slug unchanged.
    name: "Lexis+ with Protégé",
    company: "LexisNexis",
    website: "https://www.lexisnexis.com/en-us/products/lexis-plus-ai.page",
    categorySlug: "legal-ai",
    primaryUse: "Enterprise legal research AI (quote-based)",
    primaryUseCases: "Law firms and legal teams already in the LexisNexis stack; not a consumer free tool",
    description:
      "Legal research AI from LexisNexis. Official product page (as of 2026-10-13): “Free trial available; pricing varies… contact for a quote.” No public list price. Typical use is enterprise legal data — treat outputs as research assistance, not legal advice, and follow your firm’s confidentiality rules.",
    currentPricing: "Quote only; free trial available (official product page, as of 2026-10-13)",
    freeTierFeatures: "Free trial available; duration and limits contact-sales (official, as of 2026-10-13)",
    costTier: "ENTERPRISE",
    difficultyLevel: "INTERMEDIATE",
    privacyLevel: "HIGH",
    platformType: ["web"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["attorneys", "legal researchers"],
    contentTypes: ["legal research"],
    outputFormats: ["text", "citations"],
  },
  {
    slug: "cleo",
    name: "Cleo",
    company: "Cleo",
    website: "https://web.meetcleo.com",
    categorySlug: "finance-real-estate-ai",
    primaryUse: "AI budgeting chat that can link bank accounts and offer cash advances",
    primaryUseCases: "Young adults wanting budgeting nudges; paid tiers add cash advances — read fees and terms first",
    description:
      "Budgeting chat app. As of 2026-10-13 it can link bank accounts (account aggregation). Paid tiers include cash advances — those products have separate fees and terms; this listing is not an offer of credit. Official FAQ (meetcleo.com FAQs, as of 2026-10-13): Free app; Plus $5.99/mo or $44.99/yr; Pro $8.99/mo; Builder $14.99/mo. Some users pay legacy Plus prices from $1.99.",
    currentPricing:
      "Free app; Plus $5.99/mo ($44.99/yr); Pro $8.99/mo; Builder $14.99/mo; some legacy Plus from $1.99",
    freeTierFeatures: "Free app (official FAQ, as of 2026-10-13); bank linking and cash-advance terms on paid tiers",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "LOW",
    platformType: ["mobile"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["young adults", "budget beginners"],
    contentTypes: ["transactions"],
    outputFormats: ["chat", "budgets"],
  },
  {
    slug: "monarch",
    name: "Monarch",
    company: "Monarch Money",
    website: "https://www.monarch.com",
    categorySlug: "finance-real-estate-ai",
    primaryUse: "Household budgeting and net-worth tracker with AI features",
    primaryUseCases: "Households tracking accounts together; requires linking financial accounts",
    description:
      "Budgeting and net-worth tracker with AI features. As of 2026-10-13 it aggregates linked bank and investment accounts — review who in the household can see those connections. Official pricing (monarch.com/pricing): $14.99/mo or $99.99/yr. A trial is advertised; trial length is unverified.",
    currentPricing: "$14.99/mo or $99.99/yr; trial length unverified",
    freeTierFeatures: "Trial advertised; length unverified as of 2026-10-13",
    costTier: "FREEMIUM",
    difficultyLevel: "BEGINNER",
    privacyLevel: "LOW",
    platformType: ["web", "mobile"],
    apiAvailable: false,
    offlineCapable: false,
    idealUserTypes: ["households", "budgeters"],
    contentTypes: ["transactions"],
    outputFormats: ["budgets", "net worth"],
  },
];

function isFullyConfirmed(row: SeedRow): boolean {
  const blob = [row.description, row.currentPricing, row.freeTierFeatures].join("\n");
  return !/\bunverified\b/i.test(blob);
}

function batch2Content(row: SeedRow, categoryId: string) {
  return {
    name: row.name,
    company: row.company,
    website: row.website,
    categoryId,
    primaryUse: row.primaryUse,
    primaryUseCases: row.primaryUseCases,
    description: row.description,
    currentPricing: row.currentPricing,
    freeTierFeatures: row.freeTierFeatures,
    costTier: row.costTier,
    difficultyLevel: row.difficultyLevel,
    privacyLevel: row.privacyLevel,
    platformType: row.platformType,
    apiAvailable: row.apiAvailable,
    offlineCapable: row.offlineCapable,
    idealUserTypes: row.idealUserTypes,
    contentTypes: row.contentTypes,
    outputFormats: row.outputFormats,
    verified: isFullyConfirmed(row),
  };
}

function toCreateData(row: SeedRow, categoryId: string) {
  return {
    slug: row.slug,
    ...batch2Content(row, categoryId),
    // Curated fields: create defaults only. Updates must not overwrite them.
    featured: false,
    directAlternatives: [] as string[],
    complementaryTools: [] as string[],
    budgetAlternativeTo: [] as string[],
    privacyAlternativeTo: [] as string[],
  };
}

function toUpdateData(row: SeedRow, categoryId: string) {
  return batch2Content(row, categoryId);
}

async function main() {
  const apply = process.argv.includes("--apply");
  const dryRun = !apply || process.argv.includes("--dry-run");

  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set. Aborting.");
    process.exit(1);
  }

  const directUrl = getDirectUrl();
  const host = hostnameOnly(directUrl);
  console.log(`Target database hostname: ${host}`);
  console.log(`Mode: ${dryRun ? "dry-run (no writes)" : "LIVE writes (--apply)"}`);
  console.log(`Rows: ${ROWS.length} (Ada Health and Abridge deferred)`);

  if (host.startsWith(PRODUCTION_ENDPOINT_ID)) {
    console.error(
      `Refusing to run: hostname ${host} starts with ${PRODUCTION_ENDPOINT_ID} (production compute or pooler). Point DATABASE_URL at a Neon branch first.`,
    );
    process.exit(1);
  }

  if (!dryRun) {
    console.log(`About to write. Full target host: ${host}`);
    await countdown(5);
  }

  const adapter = new PrismaPg(directUrl);
  const prisma = new PrismaClient({ adapter });

  try {
    const slugs = [...new Set(ROWS.map((r) => r.categorySlug))];
    const categories = await prisma.category.findMany({
      where: { slug: { in: slugs } },
      select: { id: true, slug: true, name: true },
    });
    const categoryIdBySlug = new Map(categories.map((c) => [c.slug, c.id]));
    const missingCats = slugs.filter((s) => !categoryIdBySlug.has(s));
    if (missingCats.length) {
      throw new Error(`Category slug(s) not found: ${missingCats.join(", ")}`);
    }

    let created = 0;
    let updated = 0;

    for (const row of ROWS) {
      const categoryId = categoryIdBySlug.get(row.categorySlug)!;
      const existing = await prisma.platform.findUnique({
        where: { slug: row.slug },
        select: { id: true, slug: true, name: true },
      });

      const verified = isFullyConfirmed(row);
      if (dryRun) {
        console.log(
          `${existing ? "~ would update" : "+ would create"} ${row.slug} verified=${verified}`,
        );
        continue;
      }

      await prisma.platform.upsert({
        where: { slug: row.slug },
        create: toCreateData(row, categoryId),
        update: toUpdateData(row, categoryId),
      });

      if (existing) {
        updated += 1;
        console.log(`~ updated ${row.slug} verified=${verified}`);
      } else {
        created += 1;
        console.log(`+ created ${row.slug} verified=${verified}`);
      }
    }

    console.log(
      dryRun
        ? "Dry-run complete. No rows written."
        : `Done. created=${created} updated=${updated} total=${ROWS.length}`,
    );
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
