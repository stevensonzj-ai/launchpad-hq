import type { ToolFacts } from "./types";

export default {
  slug: "capcut",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "Free templates; basic editing tools",
    },
    sourceUrl: "https://www.capcut.com/pricing",
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
        limits: "Free templates; basic editing tools",
      },
      {
        name: "Pro",
        price: "$19.99",
        period: "month",
        limits: "1,200 monthly AI credits, 1 TB storage",
      },
      {
        name: "Ultra",
        price: "$79",
        period: "month",
        limits: "8,645 credits",
      },
      {
        name: "Teams",
        price: "$12.49",
        period: "month per seat",
        limits: "Shown for 2 seats",
      },
    ],
    note: "Displayed pricing is for reference only. Sign in to see final pricing.",
    sourceUrl: "https://www.capcut.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  platforms: {
    value: ["Desktop", "Mobile", "Web"],
    sourceUrl: "https://www.capcut.com/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  models: {
    value: ["Seedance 2.5", "Seedance 2.0 Mini"],
    note: "Named on the pricing page for video generation.",
    sourceUrl: "https://www.capcut.com/pricing",
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
        "Recorded Free, Pro, Ultra, and Teams list prices, including the page caveat that displayed pricing is for reference only.",
    },
  ],
} satisfies ToolFacts;
