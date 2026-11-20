import type { ToolFacts } from "./types";

/**
 * WordPress AI (Jetpack AI): first fact file, stale-facts batch 2 (catalog
 * audit 18), 2026-10-29. Read twice on jetpack.com. The free Jetpack plan
 * now includes Jetpack AI, capped at 20 requests (whether the allowance
 * renews is not stated). Higher capacity comes with the Jetpack AI plan or
 * Complete. Prices are first-year promotional prices, billed yearly.
 */
export default {
  slug: "wordpress-ai-jetpack-ai",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "The free Jetpack plan includes Jetpack AI, up to 20 requests.",
    },
    sourceUrl: "https://jetpack.com/pricing/",
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Free",
        price: "$0",
        period: "",
        limits: "Jetpack AI: 20 requests",
      },
      {
        name: "Pro",
        price: "$29.00",
        period: "month",
        limits: "Regular price, billed yearly. First-year sale is 50% off ($14.50/mo) through Wed, Dec 2, 2026, 11:59 PM UTC. Renews at the regular price. Jetpack AI included.",
      },
      {
        name: "Complete",
        price: "$49.00",
        period: "month",
        limits: "Regular price, billed yearly. First-year sale is 50% off ($24.50/mo) through Wed, Dec 2, 2026, 11:59 PM UTC. Renews at the regular price. High request capacity for Jetpack AI.",
      },
    ],
    note: "Read 2026-11-20. Black Friday sale is 50% off the first year and ends Wed, Dec 2, 2026, 11:59 PM UTC. Jetpack AI agents are free right now. \"$\" with no currency code.",
    sourceUrl: "https://jetpack.com/pricing/",
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "ra-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  features: {
    value: [
      "Jetpack AI is now pitched as running a WordPress site with Claude or ChatGPT; agent access over MCP comes with the Jetpack AI and Complete plans.",
    ],
    sourceUrl: "https://jetpack.com/ai/",
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
      summary: "First fact file: free plan includes 20 Jetpack AI requests; Jetpack AI $4.95/mo first year. Replaces \"AI Assistant requires Jetpack paid plan\".",
    },
  ],
} satisfies ToolFacts;
