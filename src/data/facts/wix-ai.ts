import type { ToolFacts } from "./types";

/**
 * Wix AI: first fact file, stale-facts batch 2 (catalog audit 18),
 * 2026-10-29. Read twice on wix.com. Free plan confirmed. Plan prices were
 * served localised (GST-inclusive, USD "for reference only") to both
 * readers, so no plan prices are recorded and the row's pricing text is left
 * alone (Browser-check list). Wix's Generative AI Policy (effective
 * 2026-01-01) lists user content as training data.
 *
 * The Research Analyst's browser check the same day (wix.com/plans, US,
 * logged out) read USD prices: "Displayed prices are for yearly
 * subscriptions, paid in full at the time of purchase" (no monthly-billed
 * prices shown), the per-plan AI credits, and that removing Wix branding
 * needs Core or above. Free-plan storage: not stated. Catalog audit 19
 * applies these to the row. Hidden text aimed at AI agents on wix.com was
 * ignored.
 */
export default {
  slug: "wix-ai",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "Free plan with no card: Wix branding and no custom domain. All plans include AI creation tools.",
    },
    note: "One reader also read 500MB storage, 1GB bandwidth and Wix ads on the free plan (support article); not recorded.",
    sourceUrl: "https://www.wix.com/plans",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "", limits: "Wix branding; storage not stated" },
      { name: "Light", price: "$17", period: "month", limits: "Billed yearly; 2 GB storage; 150 AI credits a month" },
      { name: "Core", price: "$29", period: "month", limits: "Billed yearly; 50 GB storage; 200 AI credits a month; removes Wix branding" },
      { name: "Business", price: "$39", period: "month", limits: "Billed yearly; 100 GB storage; 300 AI credits a month" },
      { name: "Business Elite", price: "$159", period: "month", limits: "Billed yearly; unlimited storage; 1,000 AI credits a month" },
    ],
    note: "USD, browser check 2026-10-29: \"Displayed prices are for yearly subscriptions, paid in full at the time of purchase.\" No monthly-billed prices are shown. AI Phone Agent calls a month: Light 5, Core 100, Business 150, Business Elite 500.",
    sourceUrl: "https://www.wix.com/plans",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  privacy: {
    value: {
      trainsOnData: true,
      policyUrl: "https://support.wix.com/en/article/wixs-generative-ai-policy",
    },
    note: "Effective 2026-01-01: user content may be used for \"developing, improving, and training Wix's software tools, including artificial intelligence and machine learning models\", under the Terms of Use licence.",
    sourceUrl: "https://support.wix.com/en/article/wixs-generative-ai-policy",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "privacy",
      summary: "First fact file: free plan confirmed; Generative AI Policy (2026-01-01) covers training on user content. Prices pending a browser check.",
    },
    {
      date: "2026-10-29",
      field: "plans",
      summary: "Browser check: Light $17, Core $29, Business $39, Business Elite $159 a month, billed yearly; AI credits 150 / 200 / 300 / 1,000 a month.",
    },
  ],
} satisfies ToolFacts;
