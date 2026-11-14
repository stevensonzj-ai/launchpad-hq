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
    ],
    note: "USD, iOS plans only. On 2026-11-14 the page listed Free, Max, and Frontier. Frontier 2x ($139.99), Frontier 4x ($279.99), and Enterprise were not on it. The page says to talk to sales about Tesseract for business and does not give that a price. Max includes 2 seats; Frontier includes 3.",
    sourceUrl: "https://www.captions.ai/pricing",
    checkedAt: "2026-11-14",
    gatheredBy: "research-analyst",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-14",
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
      date: "2026-11-14",
      field: "plans",
      summary: "Dropped Frontier 2x, Frontier 4x, and Enterprise: they were not on captions.ai/pricing. Free, Max $24.99, and Frontier $69.99 still match.",
    },
    {
      date: "2026-10-14",
      field: "platforms",
      summary:
        "RA: platforms iOS, Android, Web from /download. iOS App Store id1541407007. No Android Play URL. Company NOCAP, Inc. d/b/a Captions. Kept iOS plans only on plans.",
    },
  ],
} satisfies ToolFacts;
