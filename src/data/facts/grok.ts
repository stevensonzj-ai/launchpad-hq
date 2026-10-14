import type { ToolFacts } from "./types";

export default {
  slug: "grok",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "limited, exact limit not published",
    },
    sourceUrl: "https://docs.x.ai/x-subscription/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Free",
        price: "$0",
        period: "month",
        limits: "limited, exact limit not published",
      },
      {
        name: "Plus",
        price: "$8",
        period: "month",
        limits: "$80/yr, base usage",
      },
      {
        name: "Premium",
        price: "$30",
        period: "month",
        limits: "$300/yr, 4x",
      },
      {
        name: "Super",
        price: "$100",
        period: "month",
        limits: "$1,000/yr, 15x",
      },
      {
        name: "Ultra",
        price: "$200",
        period: "month",
        limits: "$2,000/yr, 50x",
      },
    ],
    sourceUrl: "https://docs.x.ai/x-subscription/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "plans",
      summary:
        "Paid path is The X Subscription Plus, Premium, Super, and Ultra. Removed the retired paid-path label.",
    },
  ],
} satisfies ToolFacts;
