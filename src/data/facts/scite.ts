import type { ToolFacts } from "./types";

const SCITE_PRICING_URL = "https://scite.ai/pricing";

/**
 * Scite: first fact file, guide PR D, 2026-10-29 (RA-verified, re-read on
 * scite.ai/pricing that day). No free plan: Basic and Pro are shown billed
 * yearly only, each with a 7-day free trial. MCP credits are listed on the
 * paid plans only; the trial's allowance is not stated, so none is recorded.
 */
export default {
  slug: "scite",
  lifecycle: "active",
  freeTier: {
    value: {
      available: false,
      summary:
        "No free plan. Basic and Pro each start with a 7-day free trial, after which the plan you chose is billed.",
    },
    sourceUrl: SCITE_PRICING_URL,
    checkedAt: "2026-10-29",
    gatheredBy: "ra",
    verifiedBy: "claude",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Basic", price: "$12", period: "month", limits: "Billed yearly; 250 MCP credits/month; 7-day free trial" },
      { name: "Pro", price: "$40", period: "month", limits: "Billed yearly; 2,500 MCP credits/month; API access; 7-day free trial" },
      { name: "Enterprise", price: "Custom", period: "", limits: "Based on users and usage; unlimited users with pooled usage" },
    ],
    note: "USD, as of 2026-10-29. The pricing page shows yearly billing only and does not print a month-to-month price. Teams buy Pro seats on one bill. The 7-day trial's MCP credits are not stated.",
    sourceUrl: SCITE_PRICING_URL,
    checkedAt: "2026-10-29",
    gatheredBy: "ra",
    verifiedBy: "claude",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary:
        "First fact file: no free plan; Basic $12/mo and Pro $40/mo billed yearly (250 and 2,500 MCP credits/mo; API access on Pro), Enterprise custom, 7-day trial. Replaces the catalog's \"Free tier; Premium $20/mo\".",
    },
  ],
} satisfies ToolFacts;
