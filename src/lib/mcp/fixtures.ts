import type { ToolFacts } from "@/data/facts/types";
import type { CatalogRow, FactsLookup } from "./tools";

/** Test fixtures only: a small catalog and a few fact files. No DB, no network. */

export function row(partial: Partial<CatalogRow> & Pick<CatalogRow, "slug" | "name">): CatalogRow {
  return {
    company: null,
    website: `https://${partial.slug}.example.com`,
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
    updatedAt: "2026-10-01T00:00:00.000Z",
    category: { name: "Meetings & Notes", slug: "meetings-notes" },
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
    ...partial,
  };
}

const MEETINGS = { name: "Meetings & Notes", slug: "meetings-notes" };
const IMAGES = { name: "Image Generation & Editing", slug: "image-generation-editing" };

export const FIXTURE_ROWS: CatalogRow[] = [
  row({
    slug: "notey",
    name: "Notey",
    primaryUse: "Transcribe meetings and write summaries",
    costTier: "PAID",
    currentPricing: "Pro $20/mo",
    directAlternatives: ["Freenote", "Paidnote"],
    category: MEETINGS,
  }),
  row({
    slug: "freenote",
    name: "Freenote",
    primaryUse: "Free meeting transcription",
    costTier: "FREEMIUM",
    category: MEETINGS,
  }),
  row({
    slug: "paidnote",
    name: "Paidnote",
    primaryUse: "Meeting transcription for enterprises",
    costTier: "ENTERPRISE",
    difficultyLevel: "ADVANCED",
    category: MEETINGS,
  }),
  row({
    slug: "budgetscribe",
    name: "BudgetScribe",
    primaryUse: "Cheap transcription of calls",
    costTier: "FREE",
    budgetAlternativeTo: ["notey"],
    category: { name: "Voice & Speech", slug: "voice-speech" },
  }),
  row({
    slug: "proscribe",
    name: "ProScribe",
    primaryUse: "Meeting transcription with speaker analytics",
    costTier: "PAID",
    difficultyLevel: "EXPERT",
    category: MEETINGS,
  }),
  row({
    slug: "verifiedfree",
    name: "VerifiedFree",
    primaryUse: "Meeting notes",
    costTier: "PAID", // catalog says paid, but the verified fact says a free tier exists
    category: MEETINGS,
  }),
  row({
    slug: "deadnote",
    name: "DeadNote",
    primaryUse: "Meeting transcription",
    costTier: "FREE",
    category: MEETINGS,
  }),
  row({
    slug: "pixelpaint",
    name: "PixelPaint",
    primaryUse: "Generate images from text",
    costTier: "FREEMIUM",
    platformType: ["web", "mobile"],
    category: IMAGES,
  }),
  row({
    slug: "desktopdraw",
    name: "DesktopDraw",
    primaryUse: "Generate images on your computer",
    costTier: "FREE",
    difficultyLevel: "INTERMEDIATE",
    platformType: ["desktop"],
    category: IMAGES,
  }),
];

const prov = {
  checkedAt: "2026-10-20",
  gatheredBy: "fixture-gatherer",
  verifiedBy: "fixture-verifier",
  verifiedAt: "2026-10-20",
  status: "verified" as const,
};

export const FIXTURE_FACTS: Record<string, ToolFacts> = {
  notey: {
    slug: "notey",
    lifecycle: "active",
    plans: {
      value: [{ name: "Pro", price: "$20", period: "month", limits: "unlimited" }],
      sourceUrl: "https://notey.example.com/pricing",
      ...prov,
    },
    freeTier: {
      value: { available: false, summary: "No free plan." },
      sourceUrl: "https://notey.example.com/pricing",
      ...prov,
    },
  },
  verifiedfree: {
    slug: "verifiedfree",
    lifecycle: "active",
    freeTier: {
      value: { available: true, summary: "Free: 10 meetings a month." },
      sourceUrl: "https://verifiedfree.example.com/pricing",
      ...prov,
      checkedAt: "2026-10-22",
    },
  },
  deadnote: {
    slug: "deadnote",
    lifecycle: "discontinued",
  },
};

export const fixtureFacts: FactsLookup = (slug) => FIXTURE_FACTS[slug];
