import type { ToolFacts } from "./types";

/**
 * stability-ai: first fact file, source-verification batch (catalog audit 25),
 * 2026-10-30. Plans read on the vendor's own pricing page that day and
 * spot-checked against the page HTML.
 */
export default {
  slug: "stability-ai",
  lifecycle: "active",
  plans: {
    value: [
      { name: "Developer Platform API", price: "$0.01", period: "credit", limits: "1 credit equals $0.01. New accounts get 25 free credits." },
    ],
    note: "Read 2026-11-20 on https://docs.stability.ai/pricing. Community License and Enterprise License terms are not on this page.",
    sourceUrl: "https://docs.stability.ai/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-11-20",
    gatheredBy: "claude-sonnet",
    verifiedBy: "ra-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  changelog: [
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://docs.stability.ai/pricing and price facts added with source and date." },
  ],
} satisfies ToolFacts;
