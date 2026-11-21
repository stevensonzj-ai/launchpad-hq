import type { ToolFacts } from "./types";

/**
 * Hedra: hidden, catalog audit 30 (2026-11-01), at the vendor's request to
 * remove its name and trademark from the site. Lifecycle stays "active":
 * nothing says the product is gone. Reversible: delete `visibility`, remove
 * "hedra" from HIDDEN_PAGE_REDIRECTS and restore the guide from
 * src/data/tutorials/retired/. No database change hides it.
 */
export default {
  slug: "hedra",
  lifecycle: "active",
  visibility: "hidden",
  freeTier: {
    value: {
      available: true,
      summary: "Free Plan, No Credit Card. Credit amount unpublished.",
    },
    note: "Recheck 2026-11-14: hedra.com/pricing is GPU rates and hedra.com/play/pricing does not state a free plan. The free-plan line stays as last recorded on 2026-10-14.",
    sourceUrl: "https://www.hedra.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  plans: {
    value: [
      {
        name: "Basic",
        price: "$20",
        period: "month",
        limits: "2,000 credits",
      },
      {
        name: "Pro",
        price: "$50",
        period: "month",
        limits: "7,200 credits",
      },
      {
        name: "Ultra",
        price: "from $100",
        period: "month",
        limits: "18,000 credits; allowances up to 57,600 credits/month",
      },
      {
        name: "Teams",
        price: "$75",
        period: "month",
        limits: "14,400 credits; per-seat unpublished",
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        limits: "",
      },
    ],
    note: "USD, billed monthly, from hedra.com/play/pricing. Ultra is from $100 and lists allowances up to 57,600 credits/month. hedra.com/pricing itself lists GPU rates, not these credit plans.",
    sourceUrl: "https://www.hedra.com/play/pricing",
    checkedAt: "2026-11-14",
    gatheredBy: "research-analyst",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-14",
    status: "verified",
  },
  platforms: {
    value: ["Web (Creative Studio)", "API"],
    note: "No apps linked.",
    sourceUrl: "https://www.hedra.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  usageLimits: {
    value: {
      creditsExpire:
        "Credit-pack credits do not expire. Monthly subscription credits reset at the start of each billing cycle (they do not carry over).",
      rollover:
        "Monthly subscription credits do not roll over between billing cycles. Unused credit-pack credits roll over between billing cycles.",
    },
    sourceUrl: "https://www.hedra.com/docs/pages/app/billing/how-credits-work",
    checkedAt: "2026-10-17",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-17",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-11-20",
      field: "apiPricing",
      summary: "Removed. The owner decided to drop the Hedra API pricing fact. No other Hedra fact was re-checked.",
    },
    {
      date: "2026-11-14",
      field: "plans",
      summary: "Ultra is from $100/month, with allowances up to 57,600 credits. The free plan was not on the pages checked.",
    },
    {
      date: "2026-10-29",
      field: "apiPricing",
      summary: "hedra.com/pricing now leads with usage-based API rates (prepaid balance, no subscription); Studio subscriptions continue. Added apiPricing and scoped the plans note to Studio.",
    },
    {
      date: "2026-10-14",
      field: "plans",
      summary: "Recorded monthly USD credit plans. Company legal name and API prices unpublished.",
    },
  ],
} satisfies ToolFacts;
