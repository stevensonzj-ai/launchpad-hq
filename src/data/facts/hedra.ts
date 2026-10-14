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
    verifiedBy: "pending",
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
    note: "USD/mo, billed monthly. A Hedra API exists; prices unpublished.",
    sourceUrl: "https://www.hedra.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  platforms: {
    value: ["Web (Creative Studio)", "API"],
    note: "No apps linked.",
    sourceUrl: "https://www.hedra.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "plans",
      summary: "Recorded monthly USD credit plans. Company legal name and API prices unpublished.",
    },
  ],
} satisfies ToolFacts;
