import type { ToolFacts } from "./types";

/**
 * Scale AI: first fact file, stale-facts batch 3 (catalog audit 19),
 * 2026-10-29. Read twice, blind, on the vendor's own pages.
 * Sales-led: scale.com/pricing has no prices and leads to a demo. No free
 * tier or self-serve plan. The row's "project-based pricing" is not
 * stated anywhere and is dropped.
 */
export default {
  slug: "scale-ai",
  lifecycle: "active",
  freeTier: {
    value: {
      available: false,
      summary: "No free tier or self-serve plan; the pricing page leads to a demo request.",
    },
    sourceUrl: "https://scale.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  features: {
    value: [
      "Scale sells its data engine (training data and evaluations), a generative AI platform and Scale Donovan, plus public-sector work.",
    ],
    sourceUrl: "https://scale.com/",
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
      summary: "First fact file: no published pricing; demo-led. \"Project-based pricing\" dropped.",
    },
  ],
} satisfies ToolFacts;
