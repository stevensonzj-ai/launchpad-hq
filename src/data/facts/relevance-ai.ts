import type { ToolFacts } from "./types";

/**
 * Relevance AI: first fact file, stale-facts batch 1 (catalog audit 17),
 * 2026-10-29. The batch-1 readers read Pro ($29) and Team ($349) on
 * Relevance's pricing docs. The Research Analyst's browser check the same
 * day found that the public pricing page (relevanceai.com/pricing, logged
 * out) shows only Enterprise, with "Talk to sales", custom Actions and
 * custom Vendor Credits; Pro and Team are not shown and no Vendor Credit
 * amounts are stated. The plans fact now records Enterprise only, and audit
 * 18 moves the row to ENTERPRISE with custom pricing.
 */
export default {
  slug: "relevance-ai",
  lifecycle: "active",
  company: {
    value: "Relevance AI",
    note: "Privacy policy names OnSearch Pty Ltd as the legal entity (read once).",
    sourceUrl: "https://relevanceai.com/privacy-policy",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: false,
      summary: "No free plan: \"The Free plan is retired for new signups and existing accounts.\"",
    },
    sourceUrl: "https://relevanceai.com/docs/get-started/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Enterprise", price: "Custom", period: "", limits: "\"Talk to sales\"; custom Actions and custom Vendor Credits" },
    ],
    note: "As of 2026-10-29, browser-verified: the public pricing page shows only Enterprise, \"For companies looking to decouple growth from headcount via an AI Workforce.\" The pricing docs still describe Pro and Team plans; they are not shown on the public page.",
    sourceUrl: "https://relevanceai.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "freeTier",
      summary:
        "First fact file: the Free plan is retired; Pro $29/mo ($19 yearly) and Team $349/mo ($234 yearly), billed in Actions plus Vendor Credits. Replaces the catalog's free 100 credits/day.",
    },
    {
      date: "2026-10-29",
      field: "plans",
      summary:
        "Browser check: the public pricing page shows Enterprise only, custom pricing through sales; Pro and Team are not shown. Row moves to ENTERPRISE (audit 18).",
    },
  ],
} satisfies ToolFacts;
