import type { ToolFacts } from "./types";

/**
 * assemblyai: first fact file, source-verification batch (catalog audit 25),
 * 2026-10-30. Plans read on the vendor's own pricing page that day and
 * spot-checked against the page HTML.
 */
export default {
  slug: "assemblyai",
  lifecycle: "active",
  plans: {
    value: [
      { name: "Universal-2 (pre-recorded)", price: "$0.15", period: "hour", limits: "Pay as you go" },
      { name: "Universal-3.5 Pro (pre-recorded)", price: "$0.21", period: "hour", limits: "Pay as you go" },
    ],
    note: "USD. $50 free credit on signup, no card. As of 2026-10-30.",
    sourceUrl: "https://www.assemblyai.com/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-30",
    gatheredBy: "claude-sonnet",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  changelog: [
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://www.assemblyai.com/pricing and price facts added with source and date." },
  ],
} satisfies ToolFacts;
