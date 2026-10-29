import type { ToolFacts } from "./types";

export default {
  slug: "hedra",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "Free Plan, No Credit Card. Credit amount unpublished.",
    },
    sourceUrl: "https://www.hedra.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
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
        price: "$100",
        period: "month",
        limits: "18,000 credits",
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
    note: "USD/mo, billed monthly. These are Hedra Studio subscriptions (the pricing page's own summary, re-read 2026-10-29, says \"Hedra Studio plans from $20/month\"); tier names were not re-read on 2026-10-29 because the Studio tab renders in the browser only. The developer API is billed separately (see apiPricing).",
    sourceUrl: "https://www.hedra.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  apiPricing: {
    value:
      "Developer API: pay per output and per token from a prepaid dollar balance, with no subscription, seats or minimum; for example video generation from 1.13¢/second, avatar lip-sync from 2.5¢/second, image generation from 0.59¢ per image, speech from 5¢ per 1,000 characters. The API wallet is separate from Studio subscription credits.",
    sourceUrl: "https://www.hedra.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-29",
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
