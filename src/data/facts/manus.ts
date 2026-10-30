import type { ToolFacts } from "./types";

/**
 * manus: first fact file, source-verification batch (catalog audit 25),
 * 2026-10-30. Plans read on the vendor's own pricing page that day and
 * spot-checked against the page HTML.
 */
export default {
  slug: "manus",
  lifecycle: "active",
  plans: {
    value: [
      { name: "Free", price: "$0", period: "month", limits: "300 credits a day; 1 concurrent task" },
      { name: "Pro", price: "From $20", period: "month", limits: "4,000 credits a month" },
      { name: "Pro (8,000 credits)", price: "From $40", period: "month", limits: "8,000 credits a month; 7-day free trial" },
      { name: "Team", price: "From $20", period: "seat_month", limits: "" },
    ],
    note: "USD; 17% off with annual billing. As of 2026-10-30.",
    sourceUrl: "https://help.manus.im/en/articles/11711111-what-is-the-current-membership-pricing-for-manus",
    sourceKind: "plans-page",
    checkedAt: "2026-10-30",
    gatheredBy: "claude-sonnet",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  changelog: [
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://help.manus.im/en/articles/11711111-what-is-the-current-membership-pricing-for-manus and price facts added with source and date." },
  ],
} satisfies ToolFacts;
