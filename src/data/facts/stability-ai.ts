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
      { name: "Community License", price: "$0", period: "", limits: "Open models; free for individuals and organizations under $1M annual revenue" },
      { name: "Developer Platform API", price: "$0.01", period: "credit", limits: "Pay as you go; 25 free credits for new accounts" },
      { name: "Enterprise License", price: "Custom", period: "", limits: "Over $1M annual revenue" },
    ],
    note: "USD. As of 2026-10-30.",
    sourceUrl: "https://docs.stability.ai/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-30",
    gatheredBy: "claude-sonnet",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  changelog: [
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://docs.stability.ai/pricing and price facts added with source and date." },
  ],
} satisfies ToolFacts;
