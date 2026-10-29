import type { ToolFacts } from "./types";

/**
 * Litmaps: first fact file, stale-facts batch 1 (catalog audit 17),
 * 2026-10-29. The pricing page shows two layouts that disagree (1 or 2
 * Litmaps on Free), and the commercial and monthly Pro prices were read
 * once, from the page's price-switching code. Both are on the
 * Browser-check list, so free tier and plans stay unverified.
 */
export default {
  slug: "litmaps",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "Free: maps of up to 100 articles, searches with up to 20 inputs, and monthly alerts. The page shows 1 Litmap in one layout and 2 in another.",
    },
    sourceUrl: "https://www.litmaps.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  plans: {
    value: [
      {
        name: "Free",
        price: "$0",
        period: "",
        limits: "100 articles per map; 1 or 2 Litmaps (the page disagrees); up to 20 search inputs; monthly alerts",
      },
      {
        name: "Pro (Education)",
        price: "$12.50",
        period: "month",
        limits: "Or $10/mo billed yearly ($120/year); \"requires academic email address\"; unlimited articles and Litmaps; advanced search; no collaboration",
      },
      {
        name: "Pro (Commercial)",
        price: "$50",
        period: "month",
        limits: "Or $40/mo billed yearly ($480/year)",
      },
      { name: "Team", price: "Custom", period: "", limits: "\"Talk to us\"; team collaboration" },
      { name: "Enterprise", price: "Custom", period: "", limits: "Contact sales" },
    ],
    note: "USD, as of 2026-10-29. Both readers saw the education rate ($10/mo billed yearly, $120/year); the monthly and commercial figures come from the page's price-switching code and were read once.",
    sourceUrl: "https://www.litmaps.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary:
        "First fact file, unverified: Free and Pro read, Team and Enterprise added; Pro's commercial price and Free's map count need a browser check.",
    },
  ],
} satisfies ToolFacts;
