import type { ToolFacts } from "./types";

export default {
  slug: "krea",
  lifecycle: "active",
  company: {
    value: "Krea",
    note: "Footer: © 2026 Krea (no legal suffix).",
    sourceUrl: "https://www.krea.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "100 units/day, $0/month.",
    },
    sourceUrl: "https://www.krea.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  plans: {
    value: [
      {
        name: "Basic",
        price: "$9",
        period: "month",
        limits: "$5/mo billed annually; 5,000 units/mo",
      },
      {
        name: "Pro",
        price: "$35",
        period: "month",
        limits: "$21/mo billed annually; 20,000 units/mo",
      },
      {
        name: "Max",
        price: "$105",
        period: "month",
        limits: "$63/mo billed annually; 60,000 units/mo",
      },
      {
        name: "Business",
        price: "$200",
        period: "month",
        limits: "$160/mo billed annually",
      },
    ],
    note: "USD. Browser-verified 2026-10-14: Monthly Basic $9 / Pro $35 / Max $105 / Business $200; Yearly $5 / $21 / $63 / $160. Top tier is Business. Per-user status unpublished. Business unit count unpublished. API prices unpublished.",
    sourceUrl: "https://www.krea.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  platforms: {
    value: ["Web", "iOS"],
    note: "Browser-verified 2026-10-14: a Download iOS link is in the footer. No apps.apple.com URL recorded.",
    sourceUrl: "https://www.krea.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  models: {
    value: ["Nano Banana 2 (third-party)", "Seedance 2.0 (third-party)"],
    note: "Examples on the pricing page. In-house models unpublished.",
    sourceUrl: "https://www.krea.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "plans",
      summary:
        "Monthly and yearly-billed list prices (browser-verified). Models labeled third-party. Per-user unpublished.",
    },
  ],
} satisfies ToolFacts;
