import type { ToolFacts } from "./types";

/**
 * Restb.ai: first fact file, stale-facts batch 3 (catalog audit 19),
 * 2026-10-29. Read twice, blind, on the vendor's own pages.
 * Sales-led: the pricing page shows no prices, and no free plan or free
 * API trial is offered, only complimentary proofs of concept on request.
 * The terms list three fee models. The row moves from FREEMIUM to
 * ENTERPRISE. Restb Lens (named in the guide) was not checked.
 *
 * Zach's decision, 2026-10-29 (catalog audit 20): costTier PAID, not
 * ENTERPRISE. The API is sales-only (contracts, no published prices) while
 * Restb Lens, the same company's web tool, has self-serve plans (per the
 * guide; Lens prices were not checked). The note is in the row description.
 */
export default {
  slug: "restb-ai",
  lifecycle: "active",
  freeTier: {
    value: {
      available: false,
      summary: "No free plan or free API trial listed; complimentary proofs of concept are offered on request.",
    },
    note: "FAQ: \"complimentary PoCs\"; the terms also mention \"free evaluation use\" without terms.",
    sourceUrl: "https://restb.ai/faq/",
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "API",
        price: "Contact sales",
        period: "",
        limits: "Billed as a monthly flat rate, monthly volume, or a fixed fee per API request",
      },
    ],
    note: "Terms §16 lists the three fee models; no amounts are published, as of 2026-10-29.",
    sourceUrl: "https://restb.ai/terms-conditions/",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "freeTier",
      summary: "First fact file: no free plan or free API trial (complimentary PoCs only); quote-only pricing. FREEMIUM -> ENTERPRISE.",
    },
    {
      date: "2026-10-29",
      field: "freeTier",
      summary: "Cost tier set to PAID (Zach): the API is sales-only; Restb Lens has self-serve plans.",
    },
  ],
} satisfies ToolFacts;
