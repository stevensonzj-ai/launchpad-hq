import type { ToolFacts } from "./types";

export default {
  slug: "cleo",
  lifecycle: "active",
  company: {
    value: "Cleo AI Ltd.",
    note: "Footer: © Cleo AI Ltd. 2026. All Rights Reserved.",
    sourceUrl: "https://web.meetcleo.com/products/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: true,
      summary: 'A cash advance can be requested "without subscribing".',
    },
    note: "Browser-verified 2026-10-14: no free plan listed on the pricing page. A named free app tier is unpublished.",
    sourceUrl: "https://web.meetcleo.com/products/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  plans: {
    value: [
      {
        name: "Plus",
        price: "$5.99",
        period: "month",
        limits: "Cash advances up to $250, subject to eligibility",
      },
      {
        name: "Pro",
        price: "$8.99",
        period: "month",
        limits: "Cash advances up to $250, subject to eligibility",
      },
      {
        name: "Builder",
        price: "$14.99",
        period: "month",
        limits: "Cash advances up to $500, subject to eligibility",
      },
    ],
    note: "USD per month, per account. Express fees $4.49–$14.99. Builder $14.99/mo is browser-verified 2026-10-14 on web.meetcleo.com/products/pricing (Plus $5.99 and Pro $8.99 also shown there).",
    sourceUrl: "https://web.meetcleo.com/products/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  platforms: {
    value: ["iOS", "Android"],
    sourceUrl: "https://web.meetcleo.com/products/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  apps: {
    value: {
      ios: "https://apps.apple.com/us/app/cleo-ai-budget-cash-advance/id1447274646",
      android: "https://play.google.com/store/apps/details?id=com.meetcleo.cleo",
    },
    note: "Direct store URLs on the pricing page. A cleo.onelink.me redirect on the page is omitted.",
    sourceUrl: "https://web.meetcleo.com/products/pricing",
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
        "Plus $5.99/mo, Pro $8.99/mo, Builder $14.99/mo (browser-verified). Cash advance without subscribing; no named free plan.",
    },
  ],
} satisfies ToolFacts;
