import type { ToolFacts } from "./types";

export default {
  slug: "captions",
  lifecycle: "active",
  company: {
    value: "NOCAP, Inc. d/b/a Captions",
    note: "Footer: © 2026 NOCAP, Inc. d/b/a Captions",
    sourceUrl: "https://www.captions.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "1 caption template, no AI credits. Other limits unpublished.",
    },
    sourceUrl: "https://www.captions.ai/pricing",
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
        price: "Free",
        period: "",
        limits: "1 caption template, no AI credits",
      },
      {
        name: "Max",
        price: "$24.99",
        period: "month",
        limits: "500 credits/mo",
      },
      {
        name: "Frontier",
        price: "$69.99",
        period: "month",
        limits: "1,400 credits",
      },
      {
        name: "2x",
        price: "$139.99",
        period: "month",
        limits: "2,800 credits",
      },
      {
        name: "4x",
        price: "$279.99",
        period: "month",
        limits: "5,600 credits",
      },
      {
        name: "Enterprise",
        price: "Custom pricing",
        period: "",
        limits: "",
      },
    ],
    note: "All prices displayed in USD. Features and prices reflect iOS plans only. Per-account pricing; seats unpublished.",
    sourceUrl: "https://www.captions.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  platforms: {
    value: ["iOS", "Android", "Web"],
    note: "Captions is available for iOS and Android. If you prefer to use Captions on web, sign up here. No native desktop app was found: computer means the web app. Captions is made for your phone.",
    sourceUrl: "https://www.captions.ai/download",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  apps: {
    value: {
      ios: "https://apps.apple.com/us/app/id1541407007",
    },
    note: "Android is only a OneLink redirect (https://captions.onelink.me/ZYIj/xvr71573), not a direct Play URL.",
    sourceUrl: "https://www.captions.ai/download",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "platforms",
      summary:
        "RA: platforms iOS, Android, Web from /download. iOS App Store id1541407007. No Android Play URL. Company NOCAP, Inc. d/b/a Captions. Kept iOS plans only on plans.",
    },
  ],
} satisfies ToolFacts;
