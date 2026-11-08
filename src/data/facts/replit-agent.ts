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
    checkedAt: "2026-10-30",
    gatheredBy: "claude-sonnet",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  features: {
    value: [
      "Replit Agent can be used from Slack through the Replit workspace bot (mention @Replit), per Replit's Slack docs (as of 2026-11-05).",
    ],
    note: "Replit docs, as of 2026-11-05. Plan requirements for the Slack integration were not checked.",
    sourceUrl: "https://docs.replit.com/features/platforms/slack",
    checkedAt: "2026-11-05",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-11-05",
    status: "verified",
  },
  changelog: [
    { date: "2026-11-05", field: "features", summary: "X-watch: added Replit Agent in Slack (@Replit workspace bot)." },
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://replit.com/pricing and price facts added with source and date." },
  ],
} satisfies ToolFacts;
