import type { ToolFacts } from "./types";

export default {
  slug: "gamma",
  lifecycle: "active",
  company: {
    value: "Gamma Tech, Inc.",
    note: 'Browser-verified 2026-10-14: "© 2026 Gamma Tech, Inc."',
    sourceUrl: "https://gamma.app/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "$0. 400 credits at signup, 10 slides per prompt.",
    },
    note: "Browser-verified 2026-10-14 on gamma.app/pricing.",
    sourceUrl: "https://gamma.app/pricing",
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
        period: "",
        limits: "400 credits at signup, 10 slides per prompt",
      },
      {
        name: "Plus",
        price: "$12",
        period: "per seat per month, billed monthly",
        limits: "$9 billed annually; 1,000 credits a month",
      },
      {
        name: "Pro",
        price: "$25",
        period: "per seat per month, billed monthly",
        limits: "$18 billed annually; 4,000 credits a month",
      },
      {
        name: "Ultra",
        price: "$100",
        period: "per seat per month, billed monthly",
        limits: "$90 billed annually; 20,000 credits a month",
      },
    ],
    note: "Browser-verified 2026-10-14 on gamma.app/pricing. USD per seat per month. API on Pro and above, using credits (no dollar API price).",
    sourceUrl: "https://gamma.app/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  apps: {
    value: {
      ios: "https://apps.apple.com/us/app/gamma-ai-slides-design/id6768404578",
      android: "https://play.google.com/store/apps/details?id=app.gamma.mobile",
    },
    note: "Browser-verified 2026-10-14. iOS final URL gamma-ai-slides-design/id6768404578; Play app.gamma.mobile.",
    sourceUrl: "https://gamma.app/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  models: {
    value: [
      "Claude (third-party)",
      "OpenAI (third-party)",
      "Gemini (third-party)",
      "Flux (third-party)",
      "Ideogram (third-party)",
      "Luma (third-party)",
    ],
    note: "Browser-verified 2026-10-14. Models are third-party. Names listed on the pricing page; ellipsis in the source not expanded.",
    sourceUrl: "https://gamma.app/pricing",
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
        "RA: iOS store URL is the final App Store path. Prices and models remain browser-verified.",
    },
  ],
} satisfies ToolFacts;
