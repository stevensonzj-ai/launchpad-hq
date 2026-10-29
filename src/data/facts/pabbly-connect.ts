import type { ToolFacts } from "./types";

/**
 * Pabbly Connect: first fact file, stale-facts batch 1 (catalog audit 17),
 * 2026-10-29. Plan names and task limits read twice; the pricing page served
 * only Indian rupee prices to both readers, so the plans fact records INR as
 * shown and stays unverified. USD prices are on the Browser-check list.
 */
export default {
  slug: "pabbly-connect",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "Free plan with 100 tasks, no card; limited to 2 workflows of up to 2 steps each.",
    },
    note: "\"Start for free and get 100 tasks - no credit card required.\" Whether the 100 tasks reset monthly is not stated next to the quote.",
    sourceUrl: "https://www.pabbly.com/connect/pricing/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Free", price: "₹0", period: "", limits: "100 tasks; 2 workflows of up to 2 steps" },
      {
        name: "Standard",
        price: "₹1,138",
        period: "month",
        limits: "10,000 tasks a month (INR as served; billing term unclear)",
      },
      {
        name: "Unlimited",
        price: "₹4,999",
        period: "month",
        limits: "Unlimited tasks a month (INR as served)",
      },
      {
        name: "Standard Lifetime",
        price: "₹32,799",
        period: "one-time",
        limits: "3,000 tasks a month, with feature restrictions",
      },
      { name: "Ultimate Lifetime", price: "₹74,999", period: "one-time", limits: "10,000 tasks a month" },
      {
        name: "Ultimate Plus Lifetime",
        price: "₹1,21,999",
        period: "one-time",
        limits: "20,000 tasks a month",
      },
    ],
    note: "INR, as served to our reader on 2026-10-29; USD prices not confirmed. The buy links point at multi-year plans, so the billing term behind the monthly figures is unclear.",
    sourceUrl: "https://www.pabbly.com/connect/pricing/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "freeTier",
      summary:
        "First fact file: a free plan (100 tasks), not a trial; plans are Free / Standard / Unlimited plus lifetime plans (the catalog's Starter / Rookie / Pro names are gone). USD prices left for a browser check.",
    },
  ],
} satisfies ToolFacts;
