import type { ToolFacts } from "./types";

/**
 * Consensus: first fact file, stale-facts batch 1 (catalog audit 17),
 * 2026-10-29. Plans read twice on Consensus's help centre (subscription
 * plans article, updated 2026-09-12). consensus.app/pricing renders only in
 * a browser. The Research Analyst's browser check the same day
 * (consensus.app/pricing) matched it to the help article: Pro $20/mo or
 * $144/yr, Deep $65/mo or $540/yr, the same free caps, and $0.05 per API
 * or MCP use past the allowance.
 */
export default {
  slug: "consensus",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "Free: unlimited Papers searches, plus 10 Pro messages, 3 Deep reviews and 10 Study Snapshots a month, and 30 API and MCP calls a month.",
    },
    sourceUrl: "https://intercom.help/consensus-d118a252369c/en/articles/10087865-subscription-plans",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Free",
        price: "$0",
        period: "",
        limits: "Unlimited Papers searches; 10 Pro messages, 3 Deep reviews, 10 Study Snapshots and 30 API & MCP calls a month",
      },
      {
        name: "Pro",
        price: "$20",
        period: "month",
        limits: "Or $144/year; unlimited Pro messages and Study Snapshots; 15 Deep reviews and 500 API & MCP calls a month",
      },
      {
        name: "Deep",
        price: "$65",
        period: "month",
        limits: "Or $540/year; 200 Deep reviews and 2,000 API & MCP calls a month",
      },
      {
        name: "Teams",
        price: "Custom",
        period: "",
        limits: "Priced by team size; 50 Deep reviews per user a month",
      },
      { name: "Enterprise", price: "Custom", period: "", limits: "Quoted, for organizations over 200 users" },
    ],
    note: "USD, as of 2026-10-29, from the help centre article (updated 2026-09-12); the pricing page matches (browser check). API and MCP use past the allowance is $0.05 per use; students, faculty and clinicians get up to 40% off.",
    sourceUrl: "https://intercom.help/consensus-d118a252369c/en/articles/10087865-subscription-plans",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary:
        "First fact file: Pro $20/mo ($144/yr) and Deep $65/mo ($540/yr), free plan with monthly caps on Pro messages and Deep reviews. Replaces \"Premium $8.99/mo\".",
    },
    {
      date: "2026-10-29",
      field: "plans",
      summary:
        "Browser check: consensus.app/pricing matches the help article (Pro $20 / $144 a year, Deep $65 / $540 a year); adds $0.05 per API or MCP use past the allowance.",
    },
  ],
} satisfies ToolFacts;
