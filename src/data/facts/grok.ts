import type { ToolFacts } from "./types";

export default {
  slug: "grok",
  lifecycle: "active",
  company: {
    value: "xAI / SpaceXAI",
    sourceUrl: "https://x.ai/grok",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  platforms: {
    value: ["Web", "iOS", "Android", "Grok on X"],
    sourceUrl: "https://x.ai/grok",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  apps: {
    value: {
      ios: "https://apps.apple.com/app/grok/id6670324846",
      android: "https://play.google.com/store/apps/details?id=ai.x.grok",
    },
    sourceUrl: "https://x.ai/grok",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  models: {
    value: ["grok-4.7"],
    label: "Flagship API model",
    note: "Our flagship model for code and everything else; 500k context.",
    sourceUrl: "https://docs.x.ai/developers/models",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
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
    {
      date: "2026-10-14",
      field: "models",
      summary: "Added company, platforms, store links, and grok-4.7 as the flagship API model. Left subscription plans unchanged.",
    },
  ],
} satisfies ToolFacts;
