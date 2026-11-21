import type { ToolFacts } from "./types";

export default {
  slug: "fathom",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "Free plan with unlimited recordings and instant call summaries.",
    },
    sourceUrl: "https://www.fathom.ai/pricing",
    checkedAt: "2026-11-14",
    gatheredBy: "research-analyst",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-14",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Free",
        price: "$0",
        period: "month",
        limits: "Unlimited recordings and transcription",
      },
      {
        name: "Premium",
        price: "$20",
        period: "user/month",
        limits: "$16/user/month billed annually",
      },
      {
        name: "Team",
        price: "$19",
        period: "user/month",
        limits: "$15/user/month billed annually; 2-user minimum",
      },
      {
        name: "Business",
        price: "$34",
        period: "user/month",
        limits: "$25/user/month billed annually; 2-user minimum",
      },
      {
        name: "Enterprise",
        price: "$35",
        period: "user/month",
        limits: "Annual card shows $35*; the same block also prints $34 and $35",
      },
    ],
    note: "USD per user. With Annually selected, Team is $15 (monthly $19) and Business is $25 (monthly $34), both with a 2-user minimum. Premium is $16 annually or $20 monthly. The Enterprise card prints $34, $35, and $35* without defining the asterisk.",
    sourceUrl: "https://www.fathom.ai/pricing",
    checkedAt: "2026-11-14",
    gatheredBy: "research-analyst",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-14",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-11-14",
      field: "plans",
      summary: "Recorded the prices on fathom.ai/pricing: Premium $20 ($16 annually), Team $19 ($15 annually), Business $34 ($25 annually), Enterprise card $35*.",
    },
    {
      date: "2026-10-14",
      field: "platforms",
      summary:
        "RA: dropped platforms. Zoom/Meet/Teams on the pricing page are competitor-comparison or FOR TEAMS labels, not integrations.",
    },
  ],
} satisfies ToolFacts;
