import type { ToolFacts } from "./types";

/**
 * zapier: first fact file, source-verification batch (catalog audit 25),
 * 2026-10-30. Plans read on the vendor's own pricing page that day and
 * spot-checked against the page HTML.
 */
export default {
  slug: "zapier",
  lifecycle: "active",
  plans: {
    value: [
      { name: "Free", price: "$0", period: "month", limits: "100 tasks a month" },
      { name: "Professional", price: "$19.99", period: "month", limits: "Billed annually; 750 tasks" },
      { name: "Team", price: "$69", period: "month", limits: "Billed annually; 2,000 tasks; 25 users" },
      { name: "Enterprise", price: "Custom", period: "", limits: "" },
    ],
    note: "USD, annual billing; monthly-billing prices were not confirmed. As of 2026-10-30.",
    sourceUrl: "https://zapier.com/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-30",
    gatheredBy: "claude-sonnet",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  changelog: [
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://zapier.com/pricing and price facts added with source and date." },
  ],
} satisfies ToolFacts;
