import type { ToolFacts } from "./types";

/**
 * flux: first fact file, source-verification batch (catalog audit 25),
 * 2026-10-30. Plans read on the vendor's own pricing page that day and
 * spot-checked against the page HTML.
 */
export default {
  slug: "flux",
  lifecycle: "active",
  plans: {
    value: [
      { name: "API, pay as you go", price: "$0.048", period: "image", limits: "768x768, one image, from the pricing calculator; no subscription" },
      { name: "Professional / Enterprise", price: "Custom", period: "", limits: "Through sales" },
    ],
    note: "USD. Open-weights licensing is priced separately. As of 2026-10-30.",
    sourceUrl: "https://bfl.ai/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-30",
    gatheredBy: "claude-sonnet",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  changelog: [
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://bfl.ai/pricing and price facts added with source and date." },
  ],
} satisfies ToolFacts;
