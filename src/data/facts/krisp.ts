import type { ToolFacts } from "./types";

export default {
  slug: "krisp",
  lifecycle: "active",
  company: {
    value: "Krisp Technologies, Inc.",
    note: "Footer: © 2026 Krisp Technologies, Inc.",
    sourceUrl: "https://krisp.ai/pricing/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  freeTier: {
    value: {
      available: false,
      summary: "No permanent free plan; 7-day free trial, no credit card required",
    },
    note: "Meeting AI pricing, owner-checked on the official page 2026-10-26: the Free Trial is $0 for 7 days with all premium features; there is no permanent free plan.",
    sourceUrl: "https://krisp.ai/pricing/",
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "owner",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Free Trial",
        price: "7-day trial",
        period: "",
        limits: "$0 for 7 days, no credit card required, all premium features; not a permanent free plan",
      },
      {
        name: "Core",
        price: "$16",
        period: "user/month",
        limits: "Billed monthly; $8/user/month billed annually",
      },
      {
        name: "Advanced",
        price: "$30",
        period: "user/month",
        limits: "Billed monthly; $15/user/month billed annually",
      },
      { name: "Enterprise", price: "Custom", period: "", limits: "Custom pricing" },
    ],
    note: "Meeting AI plans, USD, as of 2026-10-26 (owner-checked on the official page). The trial's price cell is written as \"7-day trial\", not $0, so it never reads as a free plan.",
    sourceUrl: "https://krisp.ai/pricing/",
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "owner",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  apps: {
    value: {
      ios: "https://apps.apple.com/us/app/krisp-ai-meeting-note-taker/id6740535865",
      android: "https://play.google.com/store/apps/details?id=ai.krisp.krispMobile",
    },
    note: "Desktop OS list unpublished (krisp.ai/download/ returned 404). Chrome extension is linked from krisp.ai; store URL unpublished.",
    sourceUrl: "https://krisp.ai/pricing/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-26",
      field: "freeTier",
      summary:
        "Owner check of the Meeting AI pricing page: no permanent free plan (7-day free trial, no card), so the free tier is not available and the catalog tier becomes PAID (audit 11). Plans: Core $16 or $8 annual, Advanced $30 or $15 annual, Enterprise custom.",
    },
    {
      date: "2026-10-14",
      field: "freeTier",
      summary:
        "Recorded a 7-day Free Trial ($0, no card), not a permanent free plan. Core/Advanced monthly and annual-toggle prices; AI Agent Core $15 per agent/mo billed annually.",
    },
  ],
} satisfies ToolFacts;
