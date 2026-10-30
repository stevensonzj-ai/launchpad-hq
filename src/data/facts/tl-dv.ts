import type { ToolFacts } from "./types";

/**
 * tl-dv: first fact file, source-verification batch (catalog audit 25),
 * 2026-10-30. Plans read on the vendor's own pricing page that day and
 * spot-checked against the page HTML.
 */
export default {
  slug: "tl-dv",
  lifecycle: "active",
  plans: {
    value: [
      { name: "Free", price: "€0", period: "month", limits: "" },
      { name: "Pro", price: "€29", period: "seat_month", limits: "€18/seat/month billed annually" },
      { name: "Business", price: "€39", period: "seat_month", limits: "€29/seat/month billed annually" },
    ],
    note: "EUR, as listed on the page. As of 2026-10-30.",
    sourceUrl: "https://tldv.io/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-30",
    gatheredBy: "claude-sonnet",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  changelog: [
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://tldv.io/pricing and price facts added with source and date." },
  ],
} satisfies ToolFacts;
