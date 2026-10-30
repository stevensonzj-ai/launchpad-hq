import type { ToolFacts } from "./types";

/**
 * tactiq: first fact file, source-verification batch (catalog audit 25),
 * 2026-10-30. Plans read on the vendor's own pricing page that day and
 * spot-checked against the page HTML.
 */
export default {
  slug: "tactiq",
  lifecycle: "active",
  plans: {
    value: [
      { name: "Free", price: "$0", period: "month", limits: "10 transcripts and 5 AI credits a month" },
      { name: "Pro", price: "$8", period: "seat_month", limits: "Billed annually" },
      { name: "Team", price: "$16.67", period: "seat_month", limits: "Billed annually" },
      { name: "Business", price: "$29.17", period: "seat_month", limits: "Billed annually" },
      { name: "Enterprise", price: "Custom", period: "", limits: "" },
    ],
    note: "USD, annual billing; monthly prices are not shown. As of 2026-10-30.",
    sourceUrl: "https://tactiq.io/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-30",
    gatheredBy: "claude-sonnet",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  changelog: [
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://tactiq.io/pricing and price facts added with source and date." },
  ],
} satisfies ToolFacts;
