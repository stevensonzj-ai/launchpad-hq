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
    checkedAt: "2026-11-20",
    gatheredBy: "claude-sonnet",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  features: {
    value: [
      "Time-limited Black Friday 2026 offer, not the regular price. Ends 30 November 2026 at 23:59:59 Eastern Time (UTC-5). The discount applies to the first billing period only. On the web, the Pro $100 tier is $90 for the first month or $900 for the first year, and the Max $200 tier is $160 for the first month or $1,600 for the first year. Pro tiers at $20, $40, $60, and $80 are not included. After that period the plan renews at the regular price.",
      "Max tiers above $200 receive the same 20% discount on their regular monthly or annual price for the first billing period. Team plans are not included. In the iOS and Android apps, the offer is listed for the Pro $100 and Max $200 tiers, and the store sets the price in local currency, so it can differ from the USD web examples.",
    ],
    note: "The plan prices above are the regular membership list, checked 2026-11-20. This offer is separate and ends at the time in the first sentence. It is not the price after 30 November 2026 at 23:59:59 Eastern Time (UTC-5).",
    sourceUrl: "https://help.manus.im/en/articles/18542127-how-does-the-manus-black-friday-2026-offer-work",
    sourceKind: "announcement",
    checkedAt: "2026-11-26",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-11-26",
      field: "features",
      summary:
        "X-watch: Black Friday 2026 discount, first billing period only, ends 30 November 2026 at 23:59:59 Eastern Time (UTC-5). Web examples: Pro $100 tier $90 then $900, Max $200 tier $160 then $1,600. Not written into the regular plan prices.",
    },
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://help.manus.im/en/articles/11711111-what-is-the-current-membership-pricing-for-manus and price facts added with source and date." },
  ],
} satisfies ToolFacts;
