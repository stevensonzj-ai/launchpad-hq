import type { ToolFacts } from "./types";

/**
 * Viz.ai: first fact file, stale-facts batch 2 (catalog audit 18),
 * 2026-10-29. Read twice on viz.ai. Sold to hospitals and health systems; no
 * public pricing or free tier. The flagship platform is Viz.ai One, which
 * Viz.ai says has more than 50 FDA-cleared AI algorithms.
 */
export default {
  slug: "viz-ai",
  lifecycle: "active",
  officialUrl: {
    value: "https://www.viz.ai",
    sourceUrl: "https://www.viz.ai",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  company: {
    value: "Viz.ai, Inc.",
    note: "\"© Viz.ai, Inc.\"; no acquisition on its pages.",
    sourceUrl: "https://www.viz.ai",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: false,
      summary: "No free tier or public pricing. Sold to hospital networks and health systems through demo requests.",
    },
    sourceUrl: "https://www.viz.ai",
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  features: {
    value: [
      "The Viz.ai One platform \"features more than 50 FDA-cleared AI algorithms\".",
    ],
    sourceUrl: "https://www.viz.ai",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  privacy: {
    value: {
      policyUrl: "https://www.viz.ai/privacy-policy",
    },
    note: "Effective 2025-08-20. No AI-training statement; de-identified usage data may be used to improve services and for research. Customer data is governed by a separate customer agreement.",
    sourceUrl: "https://www.viz.ai/privacy-policy",
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
      summary: "First fact file: no free tier or public pricing; Viz.ai One with 50+ FDA-cleared algorithms.",
    },
  ],
} satisfies ToolFacts;
