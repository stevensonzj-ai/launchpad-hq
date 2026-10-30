import type { ToolFacts } from "./types";

/**
 * v0: first fact file, source-verification batch (catalog audit 25),
 * 2026-10-30. Plans read on the vendor's own pricing page that day and
 * spot-checked against the page HTML.
 */
export default {
  slug: "v0",
  lifecycle: "active",
  plans: {
    value: [
      { name: "Free", price: "$0", period: "month", limits: "7 messages a day" },
      { name: "Plus", price: "$30", period: "seat_month", limits: "" },
      { name: "Business", price: "$100", period: "seat_month", limits: "" },
      { name: "Enterprise", price: "Custom", period: "", limits: "" },
    ],
    note: "USD, excluding taxes. As of 2026-10-30.",
    sourceUrl: "https://v0.app/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-30",
    gatheredBy: "claude-sonnet",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  changelog: [
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://v0.app/pricing and price facts added with source and date." },
  ],
} satisfies ToolFacts;
