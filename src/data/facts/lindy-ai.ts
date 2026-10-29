import type { ToolFacts } from "./types";

// The pricing page's metadata may still quote an older $29.99 price (RA,
// 2026-10-29); ignore it. The plan table is the source.
export default {
  slug: "lindy-ai",
  lifecycle: "active",
  plans: {
    value: [
      {
        name: "Team",
        price: "from $49.99/mo per active user (5,000 credits each)",
        period: "",
        limits:
          "Every active user in the workspace is billed; credits pool across the team. Credit tiers run up to 1,750,000 credits for $9,999.50; top-ups $10 per 1,000 credits",
      },
      {
        name: "Enterprise",
        price: "custom",
        period: "",
        limits: "Custom credits and billing",
      },
    ],
    note: 'USD. Billed monthly; the pricing page lists no annual plan. "$50 in credits for free… Free credits last 7 days" (no card) is a 7-day trial, not a permanent free plan, so no free tier is recorded. Company omitted (footer names no legal entity).',
    sourceUrl: "https://www.lindy.ai/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  platforms: {
    value: ["Web", "Chrome Extension"],
    sourceUrl: "https://www.lindy.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  models: {
    value: ["Third-party models"],
    note: '"Choose your model for each task". Names unpublished.',
    sourceUrl: "https://www.lindy.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary:
        "RA: Team now from $49.99/mo per active user (5,000 credits each), tiers up to 1,750,000 credits for $9,999.50, top-ups $10 per 1,000. Monthly billing only. Replaces $29.99 / 3,000 credits.",
    },
    {
      date: "2026-10-14",
      field: "plans",
      summary:
        "RA: Team from $29.99/mo per active user (3,000 credits each). Enterprise custom. No free plan (7-day credits).",
    },
  ],
} satisfies ToolFacts;
