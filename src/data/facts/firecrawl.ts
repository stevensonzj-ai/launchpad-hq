import type { ToolFacts } from "./types";

export default {
  slug: "firecrawl",
  lifecycle: "active",
  company: {
    value: "Firecrawl",
    note: "Footer: © 2026 Firecrawl (no legal suffix).",
    sourceUrl: "https://www.firecrawl.dev/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Free plan (credit amount unpublished).",
    },
    sourceUrl: "https://www.firecrawl.dev/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  plans: {
    value: [
      {
        name: "Hobby",
        price: "$16/mo",
        period: "billed annually",
        limits: "5,000 credits/mo",
      },
      {
        name: "Standard",
        price: "$83/mo",
        period: "billed annually",
        limits: "100,000 credits",
      },
      {
        name: "Growth",
        price: "$333/mo",
        period: "billed annually",
        limits: "500,000 credits",
      },
      {
        name: "Scale",
        price: "$599/mo",
        period: "billed annually",
        limits: "1,000,000 credits",
      },
    ],
    note: "USD. Prices shown are per month, billed annually. Monthly-billed prices unpublished. No derived monthly figures.",
    sourceUrl: "https://www.firecrawl.dev/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  platforms: {
    value: ["API"],
    sourceUrl: "https://www.firecrawl.dev/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "plans",
      summary: "Hobby through Scale, billed annually. Free plan recorded without unpublished credit amount.",
    },
  ],
} satisfies ToolFacts;
