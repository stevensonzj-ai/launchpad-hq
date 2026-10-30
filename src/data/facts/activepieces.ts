import type { ToolFacts } from "./types";

/**
 * activepieces: first fact file, source-verification batch (catalog audit 25),
 * 2026-10-30. Plans read on the vendor's own pricing page that day and
 * spot-checked against the page HTML.
 */
export default {
  slug: "activepieces",
  lifecycle: "active",
  plans: {
    value: [
      { name: "Free", price: "$0", period: "month", limits: "1,000 credits a month, refreshing daily; up to 5 users" },
      { name: "Plus", price: "$20", period: "month", limits: "10,000 credits/month, then $0.007 per credit" },
      { name: "Team", price: "$200", period: "month", limits: "50,000 credits/month" },
      { name: "Ultimate", price: "Custom", period: "", limits: "Yearly credit pool" },
      { name: "Embed", price: "From $36,000", period: "year", limits: "Embedding in your own product" },
    ],
    note: "USD. As of 2026-10-30.",
    sourceUrl: "https://www.activepieces.com/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-30",
    gatheredBy: "claude-sonnet",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  changelog: [
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://www.activepieces.com/pricing and price facts added with source and date." },
  ],
} satisfies ToolFacts;
