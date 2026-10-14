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
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "100 units/day, $0/month.",
    },
    sourceUrl: "https://www.krea.ai/pricing",
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
        limits: "$160/mo billed annually; 80k units/month",
      },
    ],
    note: "USD. Browser-verified 2026-10-14: Monthly Basic $9 / Pro $35 / Max $105 / Business $200; Yearly $5 / $21 / $63 / $160. Business is under “For Teams and Enterprises” with 80k units/month (https://www.krea.ai/pricing). Per-user status unpublished. API prices unpublished.",
    sourceUrl: "https://www.krea.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  platforms: {
    value: ["Web", "iOS"],
    note: "Browser-verified 2026-10-14: Download iOS is in the navigation. No apps.apple.com URL recorded.",
    sourceUrl: "https://www.krea.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  models: {
    value: ["Nano Banana 2 (third-party)", "Seedance 2.0 (third-party)"],
    note: "Examples on the pricing page. In-house models unpublished.",
    sourceUrl: "https://www.krea.ai/pricing",
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
        "RA: Business is 80k units/month under For Teams and Enterprises. Models labeled third-party. Per-user unpublished.",
    },
  ],
} satisfies ToolFacts;
