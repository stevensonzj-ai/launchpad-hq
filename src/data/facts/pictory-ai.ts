import type { ToolFacts } from "./types";

/**
 * pictory-ai: first fact file, source-verification batch (catalog audit 25),
 * 2026-10-30. Plans read on the vendor's own pricing page that day and
 * spot-checked against the page HTML.
 */
export default {
  slug: "pictory-ai",
  lifecycle: "active",
  plans: {
    value: [
      { name: "Starter", price: "$29", period: "month", limits: "$25/month billed annually" },
      { name: "Professional", price: "$59", period: "month", limits: "$35/month billed annually" },
      { name: "Teams", price: "$199", period: "month", limits: "$119/month billed annually" },
      { name: "Enterprise", price: "Custom", period: "", limits: "" },
    ],
    note: "USD. No free plan; 14-day free trial. As of 2026-10-30.",
    sourceUrl: "https://pictory.ai/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-30",
    gatheredBy: "claude-sonnet",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  changelog: [
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://pictory.ai/pricing and price facts added with source and date." },
  ],
} satisfies ToolFacts;
