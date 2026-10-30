/**
 * Catalog audit #27: the 27 rows audit 25 left catalog_only (unverifiable or
 * not applied), re-read on the vendors' own pages on 2026-10-30 (fetch +
 * logged-out browser visits). UPDATE-only, keyed by slug. Each field is
 * written only while the row still holds the exact old value recorded here,
 * so a re-run reports 0 changes. Never creates or deletes rows.
 *
 * Outcomes (27): verified 8, corrected 6, renamed 2, hidden 3 (sora-2 hidden
 * in this audit; adobe-sensei-firefly-in-cc and canva-magic-studio were
 * already hidden with 301s), still unverifiable 8. Rows with nothing to write
 * are listed in AUDIT_27_NO_CHANGE. Kept free of Prisma and dotenv.
 */

export const CHECKED_AT = "2026-10-30";

export type Audit27Field = "currentPricing" | "freeTierFeatures" | "usageLimits" | "website" | "name";
export type Audit27Outcome = "verified" | "corrected" | "renamed" | "hidden" | "still_unverifiable";

export type Audit27Patch = {
  slug: string;
  outcome: Audit27Outcome;
  source: string;
  fields: Partial<Record<Audit27Field, { from: string | null; to: string }>>;
};

export const AUDIT_27_PATCHES: Audit27Patch[] = [
  {
    slug: "lovable",
    outcome: "verified",
    source: "https://lovable.dev/pricing",
    fields: {
      currentPricing: { from: "Free $0; Pro $25/mo (100 monthly credits, rollover); Business $50/mo (100 monthly credits, SSO); Enterprise volume-based. Yearly billing gives 2 months free; students up to 50% off Pro (as of 2026-10-25)", to: "Free $0; Pro $25/mo billed monthly or $21/mo billed annually (100 monthly credits); Business $50/mo (100 monthly credits); Enterprise volume-based; yearly billing gives 2 months free; student discount available (as of 2026-10-30)" },
      freeTierFeatures: { from: "Free $0, no card: 5 build credits per day (up to 30/month), 20 Cloud credits/month, up to 5 lovable.app domains (official, as of 2026-10-25)", to: "Free $0: 5 build credits per day (up to 30/month), 20 Cloud credits/month, up to 5 lovable.app domains, unlimited collaborators (as of 2026-10-30)" },
      usageLimits: { from: "Free: 5 build credits/day (max 30/month); Pro: 100 monthly credits with rollover; Business: 100 monthly credits; Enterprise: volume-based (official, as of 2026-10-25)", to: "Free: 5 build credits/day (max 30/month); Pro: 100 monthly credits, unlimited lovable.app domains; Business: 100 monthly credits; Enterprise: volume-based (as of 2026-10-30)" },
    },
  },
  {
    slug: "mem",
    outcome: "still_unverifiable",
    source: "https://mem.ai/pricing",
    fields: {
      usageLimits: { from: "Free: limited AI queries/month; Pro $10/mo: unlimited AI; team features", to: "Plan limits not confirmed; the pricing page needs a login (as of 2026-10-30)" },
    },
  },
  {
    slug: "paperpal",
    outcome: "verified",
    source: "https://paperpal.com/pricing",
    fields: {
      currentPricing: { from: "Free; Prime $25/mo and Pro $59/mo billed monthly; annual billing currently on a limited-time discount (as of 2026-10-29)", to: "Free; Prime $25/mo and Pro $59/mo billed monthly; billed annually Prime $8.40/mo ($100.80/yr) and Pro $20.30/mo ($243.60/yr) (as of 2026-10-30)" },
      freeTierFeatures: { from: "Free: 200 grammar edits a month; 5 a day of paraphrase, trim, translate, AI Review and similar; 5 a day of Research Q&A; chat with 5 files a month; 300 MB library (as of 2026-10-29)", to: "Free: 200 grammar edits a month; 5 a day of the writing tools; chat with 5 files a month (as of 2026-10-30)" },
    },
  },
  {
    slug: "nano-banana",
    outcome: "corrected",
    source: "https://ai.google.dev/gemini-api/docs/pricing",
    fields: {
      currentPricing: { from: "Via Gemini; Vertex AI API", to: "Free in the Gemini app (a Google AI plan unlocks more); Gemini API is paid only for image models: Nano Banana 2.1 about $0.034 per 1K image, Nano Banana 2 about $0.067 per 1K image, Nano Banana Pro about $0.134 per 1K/2K image; the original Nano Banana is $0.039 per image and shuts down March 15, 2027 (as of 2026-10-30)" },
      freeTierFeatures: { from: "Available via Gemini free tier (limited); via Vertex AI (pay-per-use)", to: "Free in the Gemini app with limits; no free tier for image models in the Gemini API (as of 2026-10-30)" },
      usageLimits: { from: "Via Gemini: shared rate limits; via Vertex AI: pay-per-image; via ImageFX: free with limits", to: "Gemini app: limits not stated; Gemini API: billed per image; enterprise use via Gemini Enterprise Agent Platform (as of 2026-10-30)" },
    },
  },
  {
    slug: "photoroom",
    outcome: "corrected",
    source: "https://www.photoroom.com/pricing",
    fields: {
      currentPricing: { from: "Pro $7.50/mo billed yearly (8,000 AI credits, 1,000 exports). Max and Ultra are listed as yearly billed plans; their dollar amounts did not render on the fetched page — unverified. Enterprise custom (as of 2026-10-14). Monthly (non-yearly) prices unverified.", to: "Pro $7.50/mo billed yearly (8,000 AI credits); Max $20.99/mo billed yearly (25,000 AI credits); Ultra $82.50/mo billed yearly (75,000 AI credits); Enterprise custom; monthly-billing prices not confirmed (as of 2026-10-30)" },
      freeTierFeatures: { from: "A free path is not priced on the paid-plan cards fetched 2026-10-14; do not quote the old $12.99/mo Pro figure.", to: "Free plan details are not shown on the pricing page (as of 2026-10-30)" },
      usageLimits: { from: "Free: limited exports; Pro: $10/mo unlimited; Enterprise: custom", to: "AI credits per month by plan (billed yearly): Pro 8,000, Max 25,000, Ultra 75,000 (as of 2026-10-30)" },
    },
  },
  {
    slug: "trinka-ai",
    outcome: "corrected",
    source: "https://www.trinka.ai/pricing",
    fields: {
      currentPricing: { from: "Free Basic; Premium $48/yr (shown struck through from $80) and Premium Plus $125/yr; Confidential Data $300/yr (from $500); monthly prices not confirmed (as of 2026-10-29)", to: "Basic $0; Premium $48/yr or $20/mo; Premium Plus $125/yr; Confidential Data $300/yr (as of 2026-10-30)" },
      freeTierFeatures: { from: "Basic (free, never expires, no card): 5,000 words a month, 5 AI writing requests and 4 credits a month (as of 2026-10-29)", to: "Basic (free): 5,000 words a month, 4 proofread files and 5 AI writing requests (as of 2026-10-30)" },
    },
  },
  {
    slug: "wonder-dynamics-wonder-studio",
    outcome: "renamed",
    source: "https://www.autodesk.com/products/flow-studio/overview",
    fields: {
      currentPricing: { from: "Free tier; Pro plans", to: "Start for free; paid plan prices not confirmed (as of 2026-10-30)" },
      freeTierFeatures: { from: "Free: limited credits; basic VFX shots; watermarked", to: "Free to start; free-plan limits not confirmed (as of 2026-10-30)" },
      usageLimits: { from: "Free: limited credits; Pro/Enterprise: higher credits; per-project pricing", to: "Plan limits not confirmed (as of 2026-10-30)" },
    },
  },
  {
    slug: "aleph-alpha-luminous",
    outcome: "renamed",
    source: "https://aleph-alpha.com/",
    fields: {
      name: { from: "Aleph Alpha (Luminous)", to: "Aleph Alpha (Kolibri)" },
    },
  },
  {
    slug: "casetext-cocounsel",
    outcome: "verified",
    source: "https://legal.thomsonreuters.com/en/products/cocounsel-legal/plans",
    fields: {
      usageLimits: { from: "Subscription-based; unlimited searches on paid plan", to: "Subscription-based; plan limits are not stated (as of 2026-10-30)" },
    },
  },
  {
    slug: "gemini-enterprise-agent-platform",
    outcome: "corrected",
    source: "https://cloud.google.com/products/gemini-enterprise-agent-platform",
    fields: {
      freeTierFeatures: { from: "$300 Google Cloud free trial credits; Gemini API free tier via AI Studio (1,500 req/day)", to: "$300 Google Cloud free credits for new customers; Gemini API free tier via Google AI Studio (limited models) (as of 2026-10-30)" },
    },
  },
  {
    slug: "kling-ai",
    outcome: "corrected",
    source: "https://kling.ai/app/membership/membership-plan",
    fields: {
      website: { from: "https://klingai.com", to: "https://kling.ai" },
      currentPricing: { from: "Basic $0; Standard $8.80/mo ($6.99 first month, 660 credits); Pro $32.56/mo; Premier $80.96/mo; Ultra $159.99/mo; $1 = 66 credits (as of 2026-10-14)", to: "Basic free; billed monthly: Standard $8.80/mo (660 credits), Pro $32.56/mo (3,000 credits), Premier $181.99/mo (18,000 credits), Ultra+ $544.99/mo (57,000 credits) (as of 2026-10-30)" },
      freeTierFeatures: { from: "Basic free: no monthly credits; watermark; not for commercial use (official blog / membership, as of 2026-10-14)", to: "Basic free plan; its terms are not shown on the plans page (as of 2026-10-30)" },
    },
  },
  {
    slug: "poe",
    outcome: "still_unverifiable",
    source: "https://poe.com/",
    fields: {
      currentPricing: { from: "Plans from $4.99/mo; higher tiers $19.99 / $49.99 / $99.99 / $249.99 (third-party point tables); free allowance unverified", to: "Free plan and paid subscriptions; prices not confirmed (pricing needs a login) (as of 2026-10-30)" },
    },
  },
  {
    slug: "scispace",
    outcome: "corrected",
    source: "https://scispace.com/pricing",
    fields: {
      currentPricing: { from: "Free tier; Premium $20/mo; Advanced $70/mo", to: "Free tier; billed annually: Premium $12/mo (1,200 credits/mo), Advanced $70/mo, Max $160/mo; billed monthly: Premium $20/mo, Advanced $90/mo (as of 2026-10-30)" },
    },
  },
  {
    slug: "wondershare-pdfelement-ai",
    outcome: "verified",
    source: "https://pdf.wondershare.com/store/windows-individuals.html",
    fields: {
      currentPricing: { from: "Perpetual licences: Personal $129.99, Team $139, Cross Platform $139.99 (one user; promotional homepage prices); Education $39.99 a year (as of 2026-10-29)", to: "Perpetual licence (Windows, one user) $129.99; Team and Education prices not confirmed (as of 2026-10-30)" },
    },
  },
  {
    slug: "lexis-plus-ai",
    outcome: "verified",
    source: "https://www.lexisnexis.com/en-us/products/lexis-plus-protege.page",
    fields: {
      website: { from: "https://www.lexisnexis.com/en-us/products/lexis-plus-ai.page", to: "https://www.lexisnexis.com/en-us/products/lexis-plus-protege.page" },
    },
  },
  {
    slug: "sora-2",
    outcome: "hidden",
    source: "https://help.openai.com/en/articles/20001152-what-to-know-about-the-sora-discontinuation",
    fields: {
      usageLimits: { from: "Plus: 50 videos/mo (720p 5s); Pro: 500 videos/mo (1080p 20s); rate-limited", to: "None: Sora is no longer available (as of 2026-10-30)" },
    },
  },
];

/** Rows checked in this audit with nothing to write to the database. */
export const AUDIT_27_NO_CHANGE: { slug: string; outcome: Audit27Outcome; source: string }[] = [
  { slug: "kira-systems", outcome: "verified", source: "https://www.litera.com/capabilities/review" },
  { slug: "make-integromat", outcome: "verified", source: "https://www.make.com/en/pricing" },
  { slug: "openevidence", outcome: "verified", source: "https://www.openevidence.com/" },
  { slug: "duolingo-max", outcome: "still_unverifiable", source: "https://www.duolingo.com/super" },
  { slug: "speak-language-ai", outcome: "still_unverifiable", source: "https://www.speak.com/" },
  { slug: "zillow-ai-zestimate", outcome: "still_unverifiable", source: "https://www.zillow.com/" },
  { slug: "naver-hyperclova-x-cue", outcome: "still_unverifiable", source: "https://cue.search.naver.com" },
  { slug: "genspark", outcome: "still_unverifiable", source: "https://www.genspark.ai/pricing" },
  { slug: "clarifai", outcome: "still_unverifiable", source: "https://www.clarifai.com/pricing" },
  { slug: "adobe-sensei-firefly-in-cc", outcome: "hidden", source: "https://www.adobe.com/products/firefly/plans.html" },
  { slug: "canva-magic-studio", outcome: "hidden", source: "https://www.canva.com/pricing/" },
];

export type Audit27Row = Partial<Record<Audit27Field, string | null>>;
export type Audit27Plan = { field: Audit27Field; action: "update" | "already" | "differs"; to: string };

/** Per-field plan for one row: write only from the exact old value. */
export function planAudit27(row: Audit27Row, patch: Audit27Patch): Audit27Plan[] {
  return (Object.entries(patch.fields) as [Audit27Field, { from: string | null; to: string }][]).map(([field, { from, to }]) => {
    const current = row[field] ?? null;
    if (current === to) return { field, action: "already", to };
    if (current === from) return { field, action: "update", to };
    return { field, action: "differs", to };
  });
}

/** Prisma `data` for the fields to write; empty when nothing changes. */
export function audit27UpdateData(plans: readonly Audit27Plan[]): Partial<Record<Audit27Field, string>> {
  return Object.fromEntries(plans.filter((p) => p.action === "update").map((p) => [p.field, p.to]));
}

/** Fact-file entries re-read by audit 27 (2026-10-30) that override the row text on the page. */
export const AUDIT_27_FACT_UPDATES: Record<string, readonly string[]> = {
  paperpal: ["freeTier", "plans"],
  "trinka-ai": ["freeTier", "plans"],
  "wondershare-pdfelement-ai": ["plans"],
};
