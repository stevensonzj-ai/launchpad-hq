import type { ToolFacts } from "./types";

/**
 * pika: first fact file, source-verification batch (catalog audit 25),
 * 2026-10-30. Plans read on the vendor's own pricing page that day and
 * spot-checked against the page HTML.
 */
export default {
  slug: "pika",
  lifecycle: "active",
  plans: {
    value: [
      { name: "Free", price: "$0", period: "month", limits: "No monthly credits; credit packs only" },
      { name: "Starter", price: "$10", period: "month", limits: "$8 billed annually; 900 credits a month" },
      { name: "Creator", price: "$35", period: "month", limits: "$28 billed annually; 3,150 credits a month" },
      { name: "Fancy", price: "From $95", period: "month", limits: "Up to $880/month; $76 to $704 billed annually; 8,550+ credits" },
    ],
    note: "USD. As of 2026-10-30.",
    sourceUrl: "https://pika.art/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-30",
    gatheredBy: "claude-sonnet",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  changelog: [
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://pika.art/pricing and price facts added with source and date." },
  ],
} satisfies ToolFacts;
