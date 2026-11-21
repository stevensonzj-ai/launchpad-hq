import type { ToolFacts } from "./types";

/**
 * Meshy: first fact file, stale-facts batch 1 (catalog audit 17), 2026-10-29.
 * Plans read twice on meshy.ai/pricing. The page labels the same prices
 * both "billed yearly" and "billed monthly"; the Pro card reads "Billed
 * monthly", so the prices are recorded as monthly. The Research Analyst's
 * browser check the same day confirmed the monthly prices, but the yearly
 * view conflicts with itself: the toggle shows Pro at $16/mo ($192 a year)
 * after a "New User: 20% Off" discount, while the compare table says "$20
 * per month billed yearly". So only monthly prices are recorded, and the
 * row no longer mentions an annual discount (audit 18).
 */
export default {
  slug: "meshy",
  lifecycle: "active",
  company: {
    value: "Meshy",
    note: "Privacy policy names Meshy LLC (read once).",
    sourceUrl: "https://www.meshy.ai/privacy-policy",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Free plan: 100 monthly credits, up to 10 assets, 1 concurrent task, low queue priority, CC BY 4.0 license (commercial use with attribution), API not included, and a 10 Meshy 6 Lite models a month download limit.",
    },
    sourceUrl: "https://www.meshy.ai/pricing",
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
        limits: "100 monthly credits; up to 10 assets; CC BY 4.0; API not included",
      },
      { name: "Pro", price: "$20", period: "month", limits: "1,000 credits" },
      { name: "Premium", price: "$40", period: "month", limits: "3,000 credits" },
      { name: "Ultra", price: "$100", period: "month", limits: "8,000 credits" },
      { name: "Studio", price: "$70", period: "month", limits: "5,500 shared credits. Seats $10/mo per seat." },
      { name: "Enterprise", price: "Custom", period: "", limits: "" },
    ],
    note: "List monthly prices, read 2026-11-20. First-month and new-user yearly discounts are on the page and have no stated end date, so they are not the list price.",
    sourceUrl: "https://www.meshy.ai/pricing",
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
        "First fact file: Free 100 credits/mo (the catalog said 5 a day); Pro $20 with 1,000 credits, Premium $40, Ultra $100, Studio $70 + $10/seat. No Max or unlimited plan.",
    },
    {
      date: "2026-10-29",
      field: "plans",
      summary:
        "Browser check: monthly prices confirmed (Pro $20, Premium $40, Ultra $100, Studio $70); the yearly view conflicts with itself, so the annual discount is dropped from the row.",
    },
  ],
} satisfies ToolFacts;
