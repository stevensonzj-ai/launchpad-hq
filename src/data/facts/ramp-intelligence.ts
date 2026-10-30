import type { ToolFacts } from "./types";

/**
 * Ramp Intelligence: first fact file, stale-facts batch 3 (catalog audit 19),
 * 2026-10-29. Read twice, blind, on the vendor's own pages.
 * "Ramp Intelligence" is Ramp's name for the AI across its products.
 * Free at $0 per user; Plus is now $15 per user a month plus a platform
 * fee based on team size (20% off with annual billing), not $12. The
 * privacy policy renders only in a browser, so no privacy fact.
 */
export default {
  slug: "ramp-intelligence",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "Ramp Free: $0 per user a month, for smaller teams.",
    },
    sourceUrl: "https://ramp.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Free",
        price: "$0",
        period: "user/month",
        limits: "",
      },
      {
        name: "Plus",
        price: "$15",
        period: "user/month",
        limits: "Plus a platform fee based on team size; save 20% with annual billing; 30-day free trial; AI agents for bill pay (AP Agents)",
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        limits: "Annual billing",
      },
    ],
    note: "USD, as of 2026-10-29.",
    sourceUrl: "https://ramp.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  features: {
    value: [
      "Ramp describes Ramp Intelligence as a layer of AI across its products, centred on AI agents.",
    ],
    sourceUrl: "https://ramp.com/intelligence",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary: "First fact file: Free $0; Plus $15/user/mo plus a platform fee (was $12/user/mo); Enterprise custom.",
    },
  ],
} satisfies ToolFacts;
