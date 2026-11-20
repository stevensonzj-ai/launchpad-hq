import type { ToolFacts } from "./types";

/**
 * Pabbly Connect: first fact file, stale-facts batch 1 (catalog audit 17),
 * 2026-10-29. Plan names and task limits read twice; the pricing page served
 * only Indian rupee prices to both batch-1 readers. The Research Analyst's
 * browser check the same day (pabbly.com/connect/#pricing; /connect/pricing
 * redirects there) read USD prices but marked the item PARTIAL: the
 * 3-yearly figures were caught mid-animation and the lifetime prices were
 * not read. So the plans fact records the USD figures as unverified, and the
 * row's pricing text names the plans without prices (audit 18). Whether the
 * free plan is 100 tasks a month. Paid USD prices are still unverified.
 */
export default {
  slug: "pabbly-connect",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "Free plan: 100 tasks a month, no card; limited to 2 workflows of up to 2 steps each.",
    },
    note: "Re-read 2026-11-20. The free card says \"Get 100 tasks\", \"100 tasks /mo\", and \"No credit card needed.\" The same page still says you can create up to 2 workflows with up to 2 steps. Paid prices on this fetch were in rupees, so the plans fact was not re-dated.",
    sourceUrl: "https://www.pabbly.com/connect/pricing/",
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "", limits: "100 tasks; 2 workflows of up to 2 steps" },
      {
        name: "Standard",
        price: "$14",
        period: "month",
        limits: "Billed monthly, shown as \"normally $19/mo\"; 10,000 tasks every month; $15/mo billed yearly, $16/mo billed 2-yearly",
      },
      {
        name: "Unlimited",
        price: "$59",
        period: "month",
        limits: "Billed monthly, shown as \"normally $79/mo\"; unlimited tasks; $62/mo billed yearly, $68/mo billed 2-yearly",
      },
      {
        name: "Lifetime plans",
        price: "One-time",
        period: "",
        limits: "3,000, 10,000 or 20,000 tasks a month; USD prices not read",
      },
    ],
    note: "USD, as of 2026-10-29, from the Research Analyst's browser check (marked PARTIAL: 3-yearly prices unreliable, lifetime prices not read). Billing terms: monthly, yearly (save 15%), 2-yearly (save 20%), 3-yearly (save 25%), lifetime. Batch-1 readers were served INR only.",
    sourceUrl: "https://www.pabbly.com/connect/pricing/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-11-20",
      field: "freeTier",
      summary:
        "Pricing page re-read: the free card is 100 tasks a month, with no credit card, and still limits you to 2 workflows of up to 2 steps. Paid prices on this fetch were in rupees, so the plans fact stays unverified.",
    },
    {
      date: "2026-10-29",
      field: "freeTier",
      summary:
        "First fact file: a free plan (100 tasks), not a trial; plans are Free / Standard / Unlimited plus lifetime plans (the catalog's Starter / Rookie / Pro names are gone). USD prices left for a browser check.",
    },
    {
      date: "2026-10-29",
      field: "plans",
      summary:
        "Browser check (partial): USD Standard $14/mo and Unlimited $59/mo billed monthly, recorded unverified; the row's \"From $25/mo\" is dropped and prices left out of the row.",
    },
  ],
} satisfies ToolFacts;
