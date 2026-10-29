import type { ToolFacts } from "./types";

/**
 * Wix AI: first fact file, stale-facts batch 2 (catalog audit 18),
 * 2026-10-29. Read twice on wix.com. Free plan confirmed. Plan prices were
 * served localised (GST-inclusive, USD "for reference only") to both
 * readers, so no plan prices are recorded and the row's pricing text is left
 * alone (Browser-check list). Wix's Generative AI Policy (effective
 * 2026-01-01) lists user content as training data.
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
  ],
} satisfies ToolFacts;
