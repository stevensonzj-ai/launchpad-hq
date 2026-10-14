import type { ToolFacts } from "./types";

export default {
  slug: "apollo-io",
  lifecycle: "active",
  company: {
    value: "Apollo.io",
    sourceUrl: "https://www.apollo.io/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "$0 Free plan",
    },
    sourceUrl: "https://www.apollo.io/pricing",
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
        limits: "",
      },
      {
        name: "Basic",
        price: "$49",
        period: "month",
        limits: "",
      },
      {
        name: "Professional",
        price: "$99",
        period: "month",
        limits: "",
      },
      {
        name: "Custom",
        price: "Talk to sales",
        period: "",
        limits: "",
      },
    ],
    note: "USD, billed monthly. Prices from the page's structured data.",
    sourceUrl: "https://www.apollo.io/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  platforms: {
    value: ["Web", "Chrome extension"],
    sourceUrl: "https://www.apollo.io/pricing",
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
      summary: "Recorded Free, Basic, Professional, and Custom from the pricing page structured data.",
    },
  ],
} satisfies ToolFacts;
