import type { ToolFacts } from "./types";

/**
 * kiro: first fact file, source-verification batch (catalog audit 25),
 * 2026-10-30. Plans read on the vendor's own pricing page that day and
 * spot-checked against the page HTML.
 */
export default {
  slug: "kiro",
  lifecycle: "active",
  plans: {
    value: [
      { name: "Free", price: "$0", period: "month", limits: "50 credits a month" },
      { name: "Pro", price: "$20", period: "seat_month", limits: "1,000 credits a month" },
      { name: "Pro+", price: "$40", period: "seat_month", limits: "2,000 credits a month" },
      { name: "Pro Max", price: "$100", period: "seat_month", limits: "5,000 credits a month" },
      { name: "Power", price: "$200", period: "seat_month", limits: "10,000 credits a month" },
      { name: "Enterprise", price: "Custom", period: "", limits: "Through AWS" },
    ],
    note: "USD. Extra credits $0.04 each. As of 2026-10-30.",
    sourceUrl: "https://kiro.dev/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-30",
    gatheredBy: "claude-sonnet",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  changelog: [
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://kiro.dev/pricing and price facts added with source and date." },
  ],
} satisfies ToolFacts;
