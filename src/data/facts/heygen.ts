import type { ToolFacts } from "./types";

/**
 * heygen: first fact file, source-verification batch (catalog audit 25),
 * 2026-10-30. Plans read on the vendor's own pricing page that day and
 * spot-checked against the page HTML.
 */
export default {
  slug: "heygen",
  lifecycle: "active",
  plans: {
    value: [
      { name: "Free", price: "$0", period: "month", limits: "3 videos a month up to 1 minute, watermarked" },
      { name: "Creator", price: "$29", period: "month", limits: "$24/month billed annually" },
      { name: "Pro", price: "From $49", period: "month", limits: "" },
      { name: "Business", price: "$149", period: "month", limits: "Plus $20 per seat" },
      { name: "Enterprise", price: "Custom", period: "", limits: "" },
    ],
    note: "USD. As of 2026-10-30.",
    sourceUrl: "https://www.heygen.com/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-30",
    gatheredBy: "claude-sonnet",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  changelog: [
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://www.heygen.com/pricing and price facts added with source and date." },
  ],
} satisfies ToolFacts;
