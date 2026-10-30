import type { ToolFacts } from "./types";

/**
 * luma-dream-machine-ray3: first fact file, source-verification batch (catalog audit 25),
 * 2026-10-30. Plans read on the vendor's own pricing page that day and
 * spot-checked against the page HTML.
 */
export default {
  slug: "luma-dream-machine-ray3",
  lifecycle: "active",
  plans: {
    value: [
      { name: "Plus", price: "$30", period: "month", limits: "$25/month billed yearly ($300)" },
      { name: "Pro", price: "$90", period: "month", limits: "$75/month billed yearly ($900)" },
      { name: "Ultra", price: "$300", period: "month", limits: "$250/month billed yearly ($3,000)" },
      { name: "Team / Enterprise", price: "Custom", period: "", limits: "Contact sales" },
    ],
    note: "USD. No free plan listed. As of 2026-10-30.",
    sourceUrl: "https://lumalabs.ai/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-30",
    gatheredBy: "claude-sonnet",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  changelog: [
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://lumalabs.ai/pricing and price facts added with source and date." },
  ],
} satisfies ToolFacts;
