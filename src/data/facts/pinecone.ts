import type { ToolFacts } from "./types";

/**
 * pinecone: first fact file, source-verification batch (catalog audit 25),
 * 2026-10-30. Plans read on the vendor's own pricing page that day and
 * spot-checked against the page HTML.
 */
export default {
  slug: "pinecone",
  lifecycle: "active",
  plans: {
    value: [
      { name: "Starter", price: "$0", period: "month", limits: "Up to 2 GB storage, 5 indexes, 2M write and 1M read units a month" },
      { name: "Builder", price: "$20", period: "month", limits: "Flat" },
      { name: "Standard", price: "$50", period: "month", limits: "Monthly minimum, then pay as you go" },
      { name: "Enterprise", price: "$500", period: "month", limits: "Monthly minimum, then pay as you go" },
    ],
    note: "USD. As of 2026-10-30.",
    sourceUrl: "https://www.pinecone.io/pricing/",
    sourceKind: "plans-page",
    checkedAt: "2026-10-30",
    gatheredBy: "claude-sonnet",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  changelog: [
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://www.pinecone.io/pricing/ and price facts added with source and date." },
  ],
} satisfies ToolFacts;
