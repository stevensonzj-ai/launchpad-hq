import type { ToolFacts } from "./types";

export default {
  slug: "captions",
  lifecycle: "active",
  company: {
    value: "NOCAP, Inc",
    note: "Footer: © 2026 NOCAP, Inc.",
    sourceUrl: "https://www.captions.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "1 caption template, no AI credits. Other limits unpublished.",
    },
    sourceUrl: "https://www.captions.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  plans: {
    value: [
      {
        name: "Free",
        price: "Free",
        period: "",
        limits: "1 caption template, no AI credits",
      },
      {
        name: "Max",
        price: "$24.99",
        period: "month",
        limits: "500 credits/mo",
      },
      {
        name: "Frontier",
        price: "$69.99",
        period: "month",
        limits: "1,400 credits",
      },
      {
        name: "2x",
        price: "$139.99",
        period: "month",
        limits: "2,800 credits",
      },
      {
        name: "4x",
        price: "$279.99",
        period: "month",
        limits: "5,600 credits",
      },
      {
        name: "Enterprise",
        price: "Custom pricing",
        period: "",
        limits: "",
      },
    ],
    note: "All prices displayed in USD. Features and prices reflect iOS plans only. Per-account pricing; seats unpublished.",
    sourceUrl: "https://www.captions.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  platforms: {
    value: ["iOS"],
    note: "Implied by the pricing-page note that features and prices reflect iOS plans only.",
    sourceUrl: "https://www.captions.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "plans",
      summary: "Recorded iOS-only USD list prices. Store URLs were not on the pricing page.",
    },
  ],
} satisfies ToolFacts;
