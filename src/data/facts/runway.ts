import type { ToolFacts } from "./types";

/**
 * runway: first fact file, source-verification batch (catalog audit 25),
 * 2026-10-30. Plans read on the vendor's own pricing page that day and
 * spot-checked against the page HTML.
 */
export default {
  slug: "runway",
  lifecycle: "active",
  plans: {
    value: [
      { name: "Free", price: "$0", period: "month", limits: "One-time 125 credits that do not expire" },
      { name: "Standard", price: "$15", period: "month", limits: "$12/month billed annually" },
      { name: "Pro", price: "$35", period: "month", limits: "$28/month billed annually" },
      { name: "Max", price: "$95", period: "month", limits: "$76/month billed annually" },
    ],
    note: "USD. As of 2026-10-30.",
    sourceUrl: "https://runway.com/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-30",
    gatheredBy: "claude-sonnet",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  changelog: [
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://runway.com/pricing and price facts added with source and date." },
  ],
} satisfies ToolFacts;
