/**
 * Catalog audit #35 (2026-11-14): the live fact-file date check failed because
 * freeTier / plans / apiPricing rows last checked on 2026-10-14 were 31 days
 * old (limit 30). Prices below were re-read on the vendor's own page.
 * Rows in AUDIT_35_UNVERIFIED could not be re-read. Their checkedAt stays
 * 2026-10-14 and their status is unverified. The registered-catalog test
 * allows only those stale fields.
 *
 * Guarded SQL for the platform rows whose stored price text is now wrong:
 * scripts/sql/catalog-audit-35-20261114.sql. Not run from here.
 */

export const CHECKED_AT = "2026-11-14";

export type Audit35Field = "freeTier" | "plans" | "apiPricing";

export type Audit35Unverified = {
  slug: string;
  field: Audit35Field;
  source: string;
  reason: string;
};

/** Pages that did not show the recorded price on 2026-11-14. Dates were not moved. */
export const AUDIT_35_UNVERIFIED: Audit35Unverified[] = [
  {
    slug: "deepl",
    field: "apiPricing",
    source: "https://www.deepl.com/en/pro-api",
    reason: "USD Growth prices were not on the API page, and the API plans help article returned 403.",
  },
  {
    slug: "gamma",
    field: "freeTier",
    source: "https://gamma.app/pricing",
    reason: "gamma.app/pricing returned 403.",
  },
  {
    slug: "gamma",
    field: "plans",
    source: "https://gamma.app/pricing",
    reason: "gamma.app/pricing returned 403.",
  },
  {
    slug: "hedra",
    field: "freeTier",
    source: "https://www.hedra.com/play/pricing",
    reason: "Neither Hedra pricing page stated a free plan.",
  },
  {
    slug: "higgsfield",
    field: "freeTier",
    source: "https://higgsfield.ai/pricing",
    reason: "The pricing HTML contained no plan prices.",
  },
  {
    slug: "higgsfield",
    field: "plans",
    source: "https://higgsfield.ai/pricing",
    reason: "The pricing HTML contained no dollar amounts.",
  },
  {
    slug: "jetbrains-ai",
    field: "freeTier",
    source: "https://www.jetbrains.com/store/ai/",
    reason: "The store JSON lists AI Pro and AI Ultimate and does not list AI Free.",
  },
  {
    slug: "perplexity-comet",
    field: "freeTier",
    source: "https://www.perplexity.ai/comet",
    reason: "perplexity.ai/comet returned 403.",
  },
  {
    slug: "perplexity-comet",
    field: "plans",
    source: "https://www.perplexity.ai/pro",
    reason: "perplexity.ai/pro returned 403.",
  },
  {
    slug: "quillbot",
    field: "plans",
    source: "https://quillbot.com/premium",
    reason: "quillbot.com/premium returned 403 and showed no Premium dollar price.",
  },
  {
    slug: "qwen",
    field: "freeTier",
    source: "https://qwen.ai/",
    reason: "The homepage text did not say the product is free or open to all.",
  },
  {
    slug: "wispr-flow",
    field: "freeTier",
    source: "https://wisprflow.ai/pricing",
    reason: "The pricing page did not state the 2,000 or 1,000 word weekly limits.",
  },
];
