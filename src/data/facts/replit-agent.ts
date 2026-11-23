import type { ToolFacts } from "./types";

/**
 * replit-agent: first fact file, source-verification batch (catalog audit 25),
 * 2026-10-30. Plans read on the vendor's own pricing page that day and
 * spot-checked against the page HTML.
 */
export default {
  slug: "replit-agent",
  lifecycle: "active",
  plans: {
    value: [
      { name: "Core", price: "$20", period: "month", limits: "$18/month billed annually" },
      { name: "Pro", price: "$100", period: "month", limits: "$90/month billed annually; higher usage tiers up to $2,000/month" },
      { name: "Enterprise", price: "Custom", period: "", limits: "" },
    ],
    note: "USD. As of 2026-10-30.",
    sourceUrl: "https://replit.com/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-11-20",
    gatheredBy: "claude-sonnet",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  features: {
    value: [
      "Replit Agent can be used from Slack through the Replit workspace bot (mention @Replit), per Replit's Slack docs (as of 2026-11-05). Source for this item: https://docs.replit.com/features/platforms/slack",
      "Replit Missions, published 2026-11-17 and updated 2026-11-19, has a team set a goal while Replit coordinates a swarm of agents that plan, build, test, and iterate toward it. The Missions agreement sets the spending limit and which actions require approval. The post does not publish a Missions plan price. Spending caps in the post, including $1,000 and $3,000, are examples rather than a list price.",
    ],
    note: "Missions was read on 2026-11-23. The Slack bullet was not re-read that day. Its docs URL is in the bullet. Plan prices are the plans fact, checked 2026-11-20.",
    sourceUrl: "https://replit.com/blog/introducing-replit-missions",
    sourceKind: "announcement",
    checkedAt: "2026-11-23",
    gatheredBy: "grok",
    verifiedBy: "grok",
    verifiedAt: "2026-11-23",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-11-23",
      field: "features",
      summary:
        "X-watch: Replit Missions coordinates an agent swarm toward a goal inside a spending cap and approval rules. The post does not publish a Missions plan price.",
    },
    { date: "2026-11-05", field: "features", summary: "X-watch: added Replit Agent in Slack (@Replit workspace bot)." },
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://replit.com/pricing and price facts added with source and date." },
  ],
} satisfies ToolFacts;
