import type { ToolFacts } from "./types";

/**
 * Litmaps: first fact file, stale-facts batch 1 (catalog audit 17),
 * 2026-10-29. The batch-1 readers saw two pricing layouts that disagreed
 * (1 or 2 Litmaps on Free) and read the commercial and monthly Pro prices
 * once. The Research Analyst's browser check the same day
 * (litmaps.com/pricing) settled both: Free has 2 Litmaps, and the Pro
 * prices below are as shown. Free tier and plans are now verified; audit 18
 * applies the free-tier text to the row.
 */
export default {
  slug: "litmaps",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "Free: 2 Litmaps of up to 100 articles each, searches with up to 20 inputs, and monthly alerts.",
    },
    note: "Browser check, 2026-10-29: \"2 Litmaps, 100 articles per Map\".",
    sourceUrl: "https://www.litmaps.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Free",
        price: "$0",
        period: "",
        limits: "2 Litmaps; 100 articles per map; up to 20 search inputs; monthly alerts",
      },
      {
        name: "Pro (Education)",
        price: "$12.50",
        period: "month",
        limits: "Or $10/mo billed yearly (discounts by country); \"requires academic email address\"; unlimited articles and Litmaps; advanced search; no collaboration",
      },
      {
        name: "Pro (Commercial)",
        price: "$50",
        period: "month",
        limits: "Or $40/mo billed yearly",
      },
      { name: "Team", price: "Custom", period: "", limits: "No price shown; team collaboration" },
    ],
    note: "USD, as of 2026-10-29, browser-verified. \"*Check discounts for your country\" next to the education rate. There is no separate student tier; Education is the discounted tier.",
    sourceUrl: "https://www.litmaps.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary:
        "First fact file, unverified: Free and Pro read, Team and Enterprise added; Pro's commercial price and Free's map count need a browser check.",
    },
    {
      date: "2026-10-29",
      field: "freeTier",
      summary:
        "Browser check: Free has 2 Litmaps (not 1); Pro Education $12.50/mo ($10 billed yearly), Commercial $50/mo ($40 yearly). Free tier and plans now verified.",
    },
  ],
} satisfies ToolFacts;
