import type { ToolFacts } from "./types";

export default {
  slug: "fireflies-ai",
  lifecycle: "active",
  company: {
    value: "Fireflies.ai Corp.",
    note: "Footer: © 2026 Fireflies.ai Corp.",
    sourceUrl: "https://fireflies.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: true,
      summary:
        "$0. Unlimited transcription*, limited AI summaries, 400 mins of storage per team, and 20 AI credits.",
    },
    sourceUrl: "https://fireflies.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  plans: {
    value: [
      {
        name: "Free",
        price: "$0",
        period: "seat/month",
        limits:
          "Unlimited transcription*, limited AI summaries, 400 mins of storage per team, 20 AI credits",
      },
      {
        name: "Pro",
        price: "$18",
        period: "seat/month",
        limits: "$10 billed annually",
      },
      {
        name: "Business",
        price: "$29",
        period: "seat/month",
        limits: "$19 annually",
      },
      {
        name: "Enterprise",
        price: "$39",
        period: "seat, annual only",
        limits: "",
      },
    ],
    note: "USD per seat per month except Enterprise, which is annual only. API access is listed as a feature; no separate API price is published.",
    sourceUrl: "https://fireflies.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  platforms: {
    value: ["Desktop App", "iOS App", "Android App", "Chrome Extension"],
    note: "Joins Zoom, Google Meet and Teams.",
    sourceUrl: "https://fireflies.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  apps: {
    value: {
      ios: "https://apps.apple.com/us/app/fireflies-ai-notetaker/id6463164203",
      android: "https://play.google.com/store/apps/details?id=ai.fireflies.mobile",
    },
    sourceUrl: "https://fireflies.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "plans",
      summary: "Recorded per-seat USD list prices and store links from the pricing page.",
    },
  ],
} satisfies ToolFacts;
