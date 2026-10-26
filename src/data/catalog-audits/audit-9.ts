/**
 * Catalog audit #9 — patch data and pure diff logic for
 * scripts/update-catalog-audit-9.ts (the DB runner lives there).
 *
 * Search relevance + career tools, 2026-10-26:
 *   - CREATE category `career-job-search` ("Career & Job Search") while
 *     missing; an existing category is never changed.
 *   - CREATE `teal`, `kickresume`, `rezi` in that category, each only while
 *     the slug is missing. Required fields follow audit 8 / the phase-1 seed
 *     (toCreateData), including empty curated arrays. Fact files:
 *     src/data/facts/{teal,kickresume,rezi}.ts. Task tags: task-tags.ts.
 *   - PATCH rows whose text now contradicts the official page (Part 3):
 *     grammarly, perplexity-ai, ideogram (text), notion-ai (text + website
 *     notion.so -> www.notion.com), recraft (costTier FREE -> FREEMIUM).
 *   - #99 follow-ups (Part 4): minimax gains directAlternatives DeepSeek,
 *     Qwen, Kimi, OpenRouter; kimi website www.kimi.com -> www.kimi.ai.
 *
 * Never deletes rows; never changes slug, name or categoryId of an existing
 * row. Text fields change only where they differ; guarded fields (`website`,
 * `costTier`) change only while the row still has the old value;
 * `directAlternatives` only gains missing names. So a re-run reports 0.
 *
 * Kept free of Prisma and dotenv so it typechecks with the app and can be
 * unit-tested (audit-9.test.ts).
 */
import { COST_TIERS, DIFFICULTIES, PRIVACY_LEVELS, type Audit8Create } from "./audit-8";

export { COST_TIERS, DIFFICULTIES, PRIVACY_LEVELS };

export const CHECKED_AT = "2026-10-26";

export type Audit9Category = {
  slug: string;
  name: string;
  description: string;
  /** lucide-react icon name, same convention as scripts/restructure-categories-2026-05.ts. */
  icon: string;
  sortOrder: number;
};

export const CAREER_CATEGORY: Audit9Category = {
  slug: "career-job-search",
  name: "Career & Job Search",
  description: "Resume builders, cover letter writers, and job-search tools",
  icon: "Briefcase",
  // The 20 live categories use sortOrder 1-20.
  sortOrder: 21,
};

export const AUDIT_9_CATEGORIES: Audit9Category[] = [CAREER_CATEGORY];

/**
 * Audit 8's create shape, plus the catalog names to seed `directAlternatives`
 * with (each must be a real row name; the three career rows list each other).
 */
export type Audit9Create = Audit8Create & { directAlternatives?: string[] };

const TEAL_PRICING = "https://www.tealhq.com/pricing";
const TEAL_PRIVACY = "https://www.tealhq.com/privacy-policy";
const KICKRESUME_PRICING = "https://www.kickresume.com/en/pricing/sale/";
const KICKRESUME_PRIVACY = "https://www.kickresume.com/privacy/";
const REZI_PRICING = "https://www.rezi.ai/pricing";
const REZI_LEGAL = "https://www.rezi.ai/legal";

export const AUDIT_9_CREATES: Audit9Create[] = [
  {
    finding: "New listing: Teal (AI resume builder and job tracker)",
    sources: [TEAL_PRICING, TEAL_PRIVACY],
    checkedAt: CHECKED_AT,
    categorySlug: CAREER_CATEGORY.slug,
    directAlternatives: ["Kickresume", "Rezi"],
    row: {
      slug: "teal",
      name: "Teal",
      company: "Teal Labs, Inc.",
      website: "https://www.tealhq.com",
      primaryUse: "AI resume builder and job tracker",
      primaryUseCases:
        "Resume writing and tailoring to a job description; job application tracking; cover letters; LinkedIn profile review",
      description:
        "Teal is a job-search workspace that combines an AI resume builder, a job application tracker and a Chrome extension for saving jobs from job boards. It scores a resume against a job description's keywords and drafts resume bullets, summaries and cover letters with AI. Per its privacy policy (official, as of 2026-10-26), AI features may send content to third-party providers such as OpenAI, and career content may be used in anonymized, aggregated form to improve its AI models.",
      currentPricing:
        "Free Forever $0; Teal+ $13 every 7 days, $29 every 30 days, $79 every 90 days (official, as of 2026-10-26)",
      freeTierFeatures:
        "Unlimited resumes and job tracking; 10 resume templates; top 5 job-description keywords; basic resume analysis; 1 email template per job stage; AI credits: 5 resume bullets, 2 professional summaries, 2 cover letters (official, as of 2026-10-26)",
      costTier: "FREEMIUM",
      difficultyLevel: "BEGINNER",
      privacyLevel: "MEDIUM",
      platformType: ["web", "browser_extension"],
      apiAvailable: false,
      offlineCapable: false,
      idealUserTypes: ["job seekers", "career changers"],
      contentTypes: ["text"],
      outputFormats: ["text"],
    },
  },
  {
    finding: "New listing: Kickresume (AI resume and cover letter builder)",
    sources: [KICKRESUME_PRICING, KICKRESUME_PRIVACY],
    checkedAt: CHECKED_AT,
    categorySlug: CAREER_CATEGORY.slug,
    directAlternatives: ["Teal", "Rezi"],
    row: {
      slug: "kickresume",
      name: "Kickresume",
      company: "Kickresume s.r.o.",
      website: "https://www.kickresume.com",
      primaryUse: "AI resume and cover letter builder",
      primaryUseCases:
        "Resume writing; cover letters; ATS resume checks; personal resume websites; career path suggestions",
      description:
        "Kickresume is a resume and cover letter builder with an AI writer that drafts a resume from a job title and job ad, an ATS resume checker and a personal-website builder. It is based in Slovakia and says it hosts data in the EU under GDPR. Per its privacy policy (official, as of 2026-10-26), AI features send data to providers such as OpenAI and Anthropic, and anonymised user documents may be used to train its systems, with a GDPR right to object.",
      currentPricing:
        "Free with free customization options; Yearly $8/mo, Quarterly $18/mo, Monthly $24/mo regular prices, shown with a limited-time 20% discount (official, as of 2026-10-26)",
      freeTierFeatures:
        "Free as long as you use only free customization options; 4 free resume templates; unlimited downloads; free for students verified via ISIC, ITIC or UNiDAYS (official, as of 2026-10-26)",
      costTier: "FREEMIUM",
      difficultyLevel: "BEGINNER",
      privacyLevel: "MEDIUM",
      platformType: ["web", "mobile"],
      apiAvailable: false,
      offlineCapable: false,
      idealUserTypes: ["job seekers", "students"],
      contentTypes: ["text"],
      outputFormats: ["text"],
    },
  },
  {
    finding: "New listing: Rezi (AI resume builder with ATS scoring)",
    sources: [REZI_PRICING, REZI_LEGAL],
    checkedAt: CHECKED_AT,
    categorySlug: CAREER_CATEGORY.slug,
    directAlternatives: ["Teal", "Kickresume"],
    row: {
      slug: "rezi",
      name: "Rezi",
      company: "Rezi",
      website: "https://www.rezi.ai",
      primaryUse: "AI resume builder with ATS scoring",
      primaryUseCases:
        "Resume writing; resume keyword targeting; cover letters; resignation letters; AI interview practice; job application auto-fill",
      description:
        "Rezi is an AI resume builder that scores a resume on 23 metrics (Rezi Score) and tailors it to a job description's keywords. It also writes cover letters and resignation letters, offers AI interview practice, and has a Chrome extension that auto-fills job applications. Its privacy policy (official, as of 2026-10-26) does not describe how resume content is handled by AI features or whether it is used for training.",
      currentPricing:
        "Free $0; Pro $29/mo; Lifetime $149 one-time; Enterprise $99/mo per 200 users (official, as of 2026-10-26)",
      freeTierFeatures:
        "1 resume; 1 AI interview; 3 PDF downloads; limited keyword targeting and content analysis; AI resume writer and editor; unlimited cover and resignation letters; no card required (official, as of 2026-10-26)",
      costTier: "FREEMIUM",
      difficultyLevel: "BEGINNER",
      // CLAUDE.md rubric: the policy is silent on AI processing and training -> vague -> LOW.
      privacyLevel: "LOW",
      platformType: ["web", "browser_extension", "mobile"],
      apiAvailable: false,
      offlineCapable: false,
      idealUserTypes: ["job seekers", "students"],
      contentTypes: ["text"],
      outputFormats: ["PDF", "DOCX"],
    },
  },
];

// ---------- patches ----------

export type Audit9TextField = "description" | "currentPricing" | "freeTierFeatures" | "primaryUse";
/** Fields that change only while the row still has `from` (a hand edit is left alone). */
export type Audit9GuardedField = "website" | "costTier";

export type Audit9Patch = {
  slug: string;
  finding: string;
  sources: string[];
  checkedAt: string;
  fields?: Partial<Record<Audit9TextField, string>>;
  guarded?: Partial<Record<Audit9GuardedField, { from: string; to: string }>>;
  /** Catalog names appended to directAlternatives when missing (never removed). */
  addDirectAlternatives?: string[];
};

const GRAMMARLY_PLANS = "https://www.grammarly.com/plans";
const GRAMMARLY_PRO = "https://www.grammarly.com/pro";
const PPLX_COMPARE =
  "https://www.perplexity.ai/help-center/en/articles/11187416-which-perplexity-subscription-plan-is-right-for-you";
const PPLX_PRICES = "https://www.perplexity.ai/help-center/en/articles/12167980-using-the-connector-for-slack";
const IDEOGRAM_PLANS = "https://docs.ideogram.ai/plans-and-billing/available-plans";
const NOTION_PRICING = "https://www.notion.com/pricing";
const RECRAFT_PRICING = "https://www.recraft.ai/pricing";

/**
 * Part 3 (row text that contradicts the vendor's page on 2026-10-26; the fact
 * files already override these on every surface, so this keeps the rows
 * themselves from going stale). Minimal: only the contradicted fields.
 */
const PART_3_PATCHES: Audit9Patch[] = [
  {
    slug: "grammarly",
    finding: "Premium and Business are no longer sold; Pro is $12/member/mo billed annually ($30 monthly); Free has 100 AI prompts a month",
    sources: [GRAMMARLY_PLANS, GRAMMARLY_PRO],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing:
        "Free $0 (100 AI prompts a month); Pro $12/member/mo billed annually, $30 billed monthly (2,000 AI prompts a month); Enterprise: contact sales (official, as of 2026-10-26)",
    },
  },
  {
    slug: "perplexity-ai",
    finding: "Free plan has 3 Pro Searches a day (row said 5); Max and Enterprise plans exist",
    sources: [PPLX_COMPARE, PPLX_PRICES],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing:
        "Free $0; Pro $20/mo or $200/yr; Max $200/mo or $2,000/yr; Enterprise Pro $40/seat/mo; Enterprise Max $325/seat/mo (official, as of 2026-10-26)",
      freeTierFeatures:
        "Practically unlimited basic searches; 3 Pro Searches a day; 1 Research query a month; limited basic file uploads (official, as of 2026-10-26)",
    },
  },
  {
    slug: "ideogram",
    finding: "Free is 30 credits a week (row said 40 images/day and 10 generations/day); Plus $20, Pro $60 monthly",
    sources: [IDEOGRAM_PLANS],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing:
        "Free $0 (30 credits a week); Plus $20/mo or $15/mo billed yearly; Pro $60/mo or $42/mo billed yearly; Team $30/user/mo or $20/user/mo billed yearly, 2+ users; Enterprise custom (official, as of 2026-10-26)",
      freeTierFeatures:
        "30 credits a week for accounts that sign in with Google, Apple or Microsoft; everything made on the free plan is public (official, as of 2026-10-26)",
    },
  },
  {
    slug: "notion-ai",
    finding: "Notion AI is no longer a paid add-on: Free and Plus get a trial, Business includes it; notion.so redirects to www.notion.com",
    sources: [NOTION_PRICING],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing:
        "Free $0/seat/mo (trial of Notion AI); Plus $10/seat/mo (trial of Notion AI); Business $20/seat/mo (Notion Agent and AI Meeting Notes included); Enterprise custom; prices with yearly billing (official, as of 2026-10-26)",
    },
    guarded: { website: { from: "https://notion.so", to: "https://www.notion.com" } },
  },
  {
    slug: "recraft",
    finding: "Paid Basic, Pro and Teams plans exist alongside the free plan, so the tier is FREEMIUM, not FREE",
    sources: [RECRAFT_PRICING],
    checkedAt: CHECKED_AT,
    guarded: { costTier: { from: "FREE", to: "FREEMIUM" } },
  },
];

const MINIMAX_SITE = "https://www.minimax.io";
const MINIMAX_BLOG = "https://www.minimax.io/blog/minimax-m31f";
const MOONSHOT_SITE = "https://www.moonshot.ai/";
const KIMI_INTL_SITE = "https://www.kimi.ai/";
const KIMI_PLANS = "https://www.kimi.ai/resources/kimi-k3-1-pro-pricing";

/** Part 4: #99 follow-ups. */
const PART_4_PATCHES: Audit9Patch[] = [
  {
    slug: "minimax",
    finding: "Created by audit 8 with no alternatives; the other low-cost model APIs with open weights or model routing in the catalog",
    sources: [MINIMAX_SITE, MINIMAX_BLOG],
    checkedAt: CHECKED_AT,
    addDirectAlternatives: ["DeepSeek", "Qwen", "Kimi", "OpenRouter"],
  },
  {
    // Both domains serve Kimi (each 200, self-canonical), but Moonshot's own
    // site links only www.kimi.ai, and kimi.com is the mainland-China service
    // (see src/data/tutorials/kimi-getting-started.ts). Source URLs on
    // kimi.com that are real official pages are left alone.
    slug: "kimi",
    finding: "Moonshot's site (moonshot.ai) links Kimi at www.kimi.ai, the international service; the row's website is www.kimi.com",
    sources: [MOONSHOT_SITE, KIMI_INTL_SITE, KIMI_PLANS],
    checkedAt: CHECKED_AT,
    guarded: { website: { from: "https://www.kimi.com", to: "https://www.kimi.ai" } },
  },
];

export const AUDIT_9_PATCHES: Audit9Patch[] = [...PART_3_PATCHES, ...PART_4_PATCHES];

// ---------- pure logic ----------

export type CreatePlan = "create" | "done";

/** Create only while missing. An existing row or category is never overwritten. */
export function planCreate(exists: boolean): CreatePlan {
  return exists ? "done" : "create";
}

/** Prisma `data` for the new category. */
export function audit9CategoryData(category: Audit9Category) {
  return { ...category };
}

/** Prisma `data` for a new platform row (same shape as audit 8 / the phase-1 seed). */
export function audit9CreateData(create: Audit9Create, categoryId: string) {
  return {
    ...create.row,
    categoryId,
    verified: true,
    // Curated fields: empty on create (filled by hand later), except the
    // career rows' alternatives to each other.
    featured: false,
    directAlternatives: [...(create.directAlternatives ?? [])],
    complementaryTools: [] as string[],
    budgetAlternativeTo: [] as string[],
    privacyAlternativeTo: [] as string[],
  };
}

export type Audit9Row = {
  description: string | null;
  currentPricing: string | null;
  freeTierFeatures: string | null;
  primaryUse: string | null;
  website: string | null;
  costTier: string;
  directAlternatives: string[];
};

export type Audit9Diff =
  | { field: Audit9TextField | "website" | "costTier"; to: string }
  | { field: "directAlternatives"; to: string[] };

const TEXT_FIELDS: Audit9TextField[] = ["description", "currentPricing", "freeTierFeatures", "primaryUse"];

/** Fields that differ once the patch is applied. Empty when the row already matches. */
export function diffAudit9(row: Audit9Row, patch: Audit9Patch): Audit9Diff[] {
  const diffs: Audit9Diff[] = [];
  for (const field of TEXT_FIELDS) {
    const to = patch.fields?.[field];
    if (to !== undefined && row[field] !== to) diffs.push({ field, to });
  }
  for (const field of ["website", "costTier"] as const) {
    const guard = patch.guarded?.[field];
    if (guard && row[field] === guard.from && guard.from !== guard.to) diffs.push({ field, to: guard.to });
  }
  const have = new Set(row.directAlternatives.map((n) => n.trim().toLowerCase()));
  const missing = (patch.addDirectAlternatives ?? []).filter((n) => !have.has(n.trim().toLowerCase()));
  if (missing.length) diffs.push({ field: "directAlternatives", to: [...row.directAlternatives, ...missing] });
  return diffs;
}

/** Prisma `data` for an update: only the differing fields. */
export function audit9UpdateData(diffs: readonly Audit9Diff[]): Record<string, string | string[]> {
  return Object.fromEntries(diffs.map((d) => [d.field, d.to]));
}
