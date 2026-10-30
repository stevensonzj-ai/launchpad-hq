import type { ToolFacts } from "./types";

/**
 * descript: first fact file, source-verification batch (catalog audit 25),
 * 2026-10-30. Plans read on the vendor's own pricing page that day and
 * spot-checked against the page HTML.
 */
export default {
  slug: "descript",
  lifecycle: "active",
  plans: {
    value: [
      { name: "Free", price: "$0", period: "month", limits: "60 media minutes a month; 100 one-time AI credits" },
      { name: "Hobbyist", price: "$24", period: "seat_month", limits: "$16 billed annually" },
      { name: "Creator", price: "$35", period: "seat_month", limits: "$24 billed annually" },
      { name: "Business", price: "$65", period: "seat_month", limits: "$50 billed annually" },
      { name: "Enterprise", price: "Custom", period: "", limits: "" },
    ],
    note: "USD, per person. As of 2026-10-30.",
    sourceUrl: "https://www.descript.com/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-30",
    gatheredBy: "claude-sonnet",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  changelog: [
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://www.descript.com/pricing and price facts added with source and date." },
  ],
} satisfies ToolFacts;
