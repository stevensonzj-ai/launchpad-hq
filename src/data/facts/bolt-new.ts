import type { ToolFacts } from "./types";

/**
 * bolt-new: first fact file, source-verification batch (catalog audit 25),
 * 2026-10-30. Plans read on the vendor's own pricing page that day and
 * spot-checked against the page HTML.
 */
export default {
  slug: "bolt-new",
  lifecycle: "active",
  plans: {
    value: [
      { name: "Free", price: "$0", period: "month", limits: "1M tokens/month, 300K daily limit; Bolt branding" },
      { name: "Pro", price: "$25", period: "month", limits: "Billed monthly" },
      { name: "Teams", price: "$30", period: "seat_month", limits: "Per member, billed monthly" },
      { name: "Enterprise", price: "Custom", period: "", limits: "" },
    ],
    note: "USD, monthly billing; yearly billing saves up to 28%. As of 2026-10-30.",
    sourceUrl: "https://bolt.new/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-30",
    gatheredBy: "claude-sonnet",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  changelog: [
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://bolt.new/pricing and price facts added with source and date." },
  ],
} satisfies ToolFacts;
