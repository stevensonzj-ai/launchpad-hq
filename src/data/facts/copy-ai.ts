import type { ToolFacts } from "./types";

/**
 * copy-ai: first fact file, source-verification batch (catalog audit 25),
 * 2026-10-30. Plans read on the vendor's own pricing page that day and
 * spot-checked against the page HTML.
 */
export default {
  slug: "copy-ai",
  lifecycle: "active",
  plans: {
    value: [
      { name: "Chat", price: "$29", period: "month", limits: "$24/month billed yearly ($288)" },
      { name: "Growth", price: "$1,000", period: "month", limits: "$12,000 a year" },
      { name: "Expansion", price: "$2,000", period: "month", limits: "$24,000 a year" },
      { name: "Scale", price: "$3,000", period: "month", limits: "$36,000 a year" },
      { name: "Enterprise", price: "Custom", period: "", limits: "" },
    ],
    note: "USD. As of 2026-10-30.",
    sourceUrl: "https://copy.ai/prices",
    sourceKind: "plans-page",
    checkedAt: "2026-10-30",
    gatheredBy: "claude-sonnet",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  changelog: [
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://copy.ai/prices and price facts added with source and date." },
  ],
} satisfies ToolFacts;
