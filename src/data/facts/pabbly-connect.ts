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
 * free plan's 100 tasks reset monthly is not stated.
 */
export default {
  slug: "pabbly-connect",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "Free plan with 100 tasks, no card; limited to 2 workflows of up to 2 steps each. Whether the tasks reset monthly is not stated.",
    },
    note: "\"Start for free and get 100 tasks - no credit card required.\" Browser check, 2026-10-29: the Free card reads \"Get 100 Tasks … $0 /mo … No credit card needed\"; paid plans say \"Every Month\", the Free card does not.",
    sourceUrl: "https://www.pabbly.com/connect/pricing/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
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
