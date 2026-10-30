import type { ToolFacts } from "./types";

/**
 * synthesia: first fact file, source-verification batch (catalog audit 25),
 * 2026-10-30. Plans read on the vendor's own pricing page that day and
 * spot-checked against the page HTML.
 */
export default {
  slug: "synthesia",
  lifecycle: "active",
  plans: {
    value: [
      { name: "Basic", price: "$0", period: "month", limits: "10 minutes of video and 500 credits a month" },
      { name: "Starter", price: "$19", period: "month", limits: "$14/month billed yearly ($168)" },
      { name: "Pro", price: "$89", period: "month", limits: "$59/month billed yearly ($708)" },
      { name: "Enterprise", price: "Custom", period: "", limits: "" },
    ],
    note: "USD. First-month offers on the page are not recorded. As of 2026-10-30.",
    sourceUrl: "https://www.synthesia.io/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-30",
    gatheredBy: "claude-sonnet",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  changelog: [
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://www.synthesia.io/pricing and price facts added with source and date." },
  ],
} satisfies ToolFacts;
