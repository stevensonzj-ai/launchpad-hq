import type { ToolFacts } from "./types";

/**
 * Surfer: joined Group Positive. Surfer's own post says "Surfer remains Surfer", so no rename (the audit's "Positive Surfer" was not confirmed).
 * Catalog accuracy cleanup, 2026-10-20 (docs/planning/2026-10-autonomous-business/
 * claude-handoffs/2026-10-20-catalog-cleanup-brief.md). Sources re-fetched that day.
 */
export default {
  slug: "surfer-seo",
  lifecycle: "acquired",
  status: {
    value: {
      headline: "Surfer has joined Group Positive. The product keeps the Surfer name.",
    },
    sourceUrl: "https://positivegroup.com/news/positive-acquires-surfer",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Discovery", price: "$49", period: "month", limits: "Billed yearly" },
      { name: "AI Search Analytics", price: "$82", period: "month", limits: "Billed yearly" },
      { name: "Standard", price: "$99", period: "month", limits: "Billed yearly" },
      { name: "Pro", price: "$182", period: "month", limits: "Billed yearly" },
      { name: "Peace of Mind", price: "$299", period: "month", limits: "Billed yearly" },
      { name: "Enterprise", price: "Custom", period: "", limits: "" },
    ],
    note: "USD, yearly billing. As of 2026-10-30.",
    sourceUrl: "https://surfer.ai/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-30",
    gatheredBy: "claude-sonnet",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  changelog: [
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://surfer.ai/pricing and price facts added with source and date." },
    {
      date: "2026-10-20",
      field: "lifecycle",
      summary: "Marked acquired by Group Positive; name unchanged.",
    },
  ],
} satisfies ToolFacts;
