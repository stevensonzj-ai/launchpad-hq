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
      { name: "Starter", price: "$29", period: "month", limits: "List price, shown on the page as the struck was-price. A 14-day trial is still mentioned." },
    ],
    note: "Read 2026-11-20. Only Starter's $29 list price was confirmed. The annual offer and the Professional and Teams figures were not confirmed, so they are not recorded.",
    sourceUrl: "https://pictory.ai/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-11-20",
    gatheredBy: "claude-sonnet",
    verifiedBy: "ra-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  changelog: [
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://pictory.ai/pricing and price facts added with source and date." },
  ],
} satisfies ToolFacts;
