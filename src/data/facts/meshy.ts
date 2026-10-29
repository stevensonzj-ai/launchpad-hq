import type { ToolFacts } from "./types";

/**
 * Meshy: first fact file, stale-facts batch 1 (catalog audit 17), 2026-10-29.
 * Plans read twice on meshy.ai/pricing. The page labels the same prices
 * both "billed yearly" and "billed monthly"; the Pro card reads "Billed
 * monthly", so the prices are recorded as monthly and the annual price is
 * on the Browser-check list.
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
      summary: "Free plan, no card: 100 credits a month, resetting on the 1st; up to 10 assets a month; outputs under CC BY 4.0; no API.",
    },
    sourceUrl: "https://www.meshy.ai/pricing",
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
        period: "",
        limits: "100 credits a month; up to 10 assets; CC BY 4.0 outputs; no API",
      },
      { name: "Pro", price: "$20", period: "month", limits: "1,000 credits a month; up to 100 assets" },
      { name: "Premium", price: "$40", period: "month", limits: "3,000 credits a month" },
      { name: "Ultra", price: "$100", period: "month", limits: "8,000 credits a month" },
      { name: "Studio", price: "$70 + $10/seat", period: "month", limits: "5,500 shared credits a month" },
      { name: "Enterprise", price: "Custom", period: "", limits: "Contact sales" },
    ],
    note: "USD, as of 2026-10-29. FAQ: \"20% off on annual plans\"; \"Plan credits reset monthly and do not accumulate.\"",
    sourceUrl: "https://www.meshy.ai/pricing",
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
      summary:
        "First fact file: Free 100 credits/mo (the catalog said 5 a day); Pro $20 with 1,000 credits, Premium $40, Ultra $100, Studio $70 + $10/seat. No Max or unlimited plan.",
    },
  ],
} satisfies ToolFacts;
