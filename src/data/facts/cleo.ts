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
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
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
    note: "USD per month. There is no free plan. “Without subscribing” refers only to requesting a cash advance, not a free tier. Express fees $4.49–$14.99. Builder $14.99/mo is browser-verified 2026-10-14 on web.meetcleo.com/products/pricing (Plus $5.99 and Pro $8.99 also shown there).",
    sourceUrl: "https://web.meetcleo.com/products/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  platforms: {
    value: ["iOS", "Android"],
    sourceUrl: "https://web.meetcleo.com/products/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
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
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "freeTier",
      summary:
        "RA: no free plan. Removed freeTier. “Without subscribing” refers only to the cash advance.",
    },
  ],
} satisfies ToolFacts;
