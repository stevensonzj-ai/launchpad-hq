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
      summary: "Free plan: $0 a month, 100 tasks, unlimited workflows, unlimited team members, no credit card, and 2-step workflows.",
    },
    note: "Browser read 2026-11-20 of https://www.pabbly.com/connect/ #pricing. The free card is unlimited workflows limited to 2 steps, not 2 workflows.",
    sourceUrl: "https://www.pabbly.com/connect/",
    sourceKind: "plans-page",
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "ra-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "month", limits: "100 tasks. Unlimited workflows. Unlimited team members. No credit card. 2-step workflows." },
      {
        name: "Standard",
        price: "$19",
        period: "month",
        limits: "10,000 tasks a month. Yearly $16/mo (save 15%). 2-yearly $15/mo (save 20%). 3-yearly $14/mo (save 25%).",
      },
      {
        name: "Unlimited",
        price: "$79",
        period: "month",
        limits: "Yearly $69/mo. 2-yearly $65/mo. 3-yearly $59/mo.",
      },
      { name: "Standard Lifetime", price: "$684", period: "one-time", limits: "List price shown as normally $684. 3,000 tasks a month." },
      { name: "Ultimate Lifetime", price: "$2,280", period: "one-time", limits: "List price shown as normally $2,280. 10,000 tasks a month." },
      { name: "Ultimate Plus Lifetime", price: "$4,560", period: "one-time", limits: "List price shown as normally $4,560. 20,000 tasks a month." },
    ],
    note: "Read 2026-11-20 at https://www.pabbly.com/connect/ #pricing. Monthly prices are the list price. Longer terms are the price of that commitment. Lifetime discounts have no stated end date, so the normally price is the list price.",
    sourceUrl: "https://www.pabbly.com/connect/",
    sourceKind: "plans-page",
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "ra-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
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
