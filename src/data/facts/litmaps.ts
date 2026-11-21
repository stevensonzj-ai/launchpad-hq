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
      summary: "The pricing page states both 2 Litmaps with 100 articles per Map, and 100 articles with 1 Litmap. Because those limits conflict, no single free Litmap count is recorded.",
    },
    note: "Read 2026-11-20. Both wordings are on the same page.",
    sourceUrl: "https://www.litmaps.com/pricing",
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "ra-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Free",
        price: "$0",
        period: "",
        limits: "Limit wording conflicts on the page. See the free tier.",
      },
      {
        name: "Paid",
        price: "$10",
        period: "",
        limits: "$10, and $120/year (save 20%). Unlimited articles and unlimited Litmaps. Education and Commercial labels were not uniquely tied to these figures.",
      },
      {
        name: "Enterprise",
        price: "Not stated",
        period: "",
        limits: "Litmaps Enterprise is named. Custom licensing has no price on the page.",
      },
    ],
    note: "Read 2026-11-20. \"$\" with no currency code. Stored education $12.50 and commercial $50 / $40 were not on the page.",
    sourceUrl: "https://www.litmaps.com/pricing",
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "ra-recheck",
    verifiedAt: "2026-11-20",
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
