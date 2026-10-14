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
    verifiedBy: "pending",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: true,
      summary:
        "Free Trial, $0, Free for 7 days, no credit card required. This is a 7-day trial, not a permanent free plan.",
    },
    sourceUrl: "https://krisp.ai/pricing/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  plans: {
    value: [
      {
        name: "Core",
        price: "$16",
        period: "mo/user",
        limits: "$8/mo/user on the Annually toggle (Save 50%)",
      },
      {
        name: "Advanced",
        price: "$30",
        period: "mo/user",
        limits: "$15/mo/user on the Annually toggle",
      },
      {
        name: "AI Agent Core",
        price: "$15",
        period: "per agent/mo, billed annually",
        limits: "Call-center plan",
      },
    ],
    note: "USD, per user per month unless noted. Enterprise unpublished.",
    sourceUrl: "https://krisp.ai/pricing/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  apps: {
    value: {
      ios: "https://apps.apple.com/us/app/krisp-ai-meeting-note-taker/id6740535865",
      android: "https://play.google.com/store/apps/details?id=ai.krisp.krispMobile",
    },
    note: "Desktop OS list unpublished (krisp.ai/download/ returned 404). Chrome extension is linked from krisp.ai; store URL unpublished. iOS App Store id6740535865 browser-verified 2026-10-14.",
    sourceUrl: "https://krisp.ai/pricing/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "freeTier",
      summary:
        "Recorded a 7-day Free Trial ($0, no card), not a permanent free plan. Core/Advanced monthly and annual-toggle prices; AI Agent Core $15 per agent/mo billed annually.",
    },
  ],
} satisfies ToolFacts;
