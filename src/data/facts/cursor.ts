import type { ToolFacts } from "./types";

/**
 * cursor: first fact file, source-verification batch (catalog audit 25),
 * 2026-10-30. Plans read on the vendor's own pricing page that day and
 * spot-checked against the page HTML.
 */
export default {
  slug: "cursor",
  lifecycle: "active",
  plans: {
    value: [
      { name: "Free", price: "$0", period: "month", limits: "Limited AI usage" },
      { name: "Plus", price: "$8", period: "month", limits: "Grok models only" },
      { name: "Premium", price: "$30", period: "month", limits: "4x Plus usage" },
      { name: "Super", price: "$100", period: "month", limits: "15x Plus usage" },
      { name: "Ultra", price: "$200", period: "month", limits: "50x Plus usage" },
      { name: "Teams", price: "From $30", period: "seat_month", limits: "" },
      { name: "Enterprise", price: "Custom", period: "", limits: "" },
    ],
    note: "USD, monthly. Usage refreshes weekly; third-party models are billed separately by usage; sold through X Subscription Corp. As of 2026-10-30.",
    sourceUrl: "https://cursor.com/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-30",
    gatheredBy: "claude-sonnet",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  changelog: [
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://cursor.com/pricing and price facts added with source and date." },
  ],
} satisfies ToolFacts;
