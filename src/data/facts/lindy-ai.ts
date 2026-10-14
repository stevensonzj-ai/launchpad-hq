import type { ToolFacts } from "./types";

export default {
  slug: "lindy-ai",
  lifecycle: "active",
  plans: {
    value: [
      {
        name: "Team",
        price: "from $49.99/mo per active user",
        period: "",
        limits: "5,000 credits each; every active user in the workspace is billed",
      },
      {
        name: "Enterprise",
        price: "custom",
        period: "",
        limits: "",
      },
    ],
    note: 'USD. "$50 in credits for free… Free credits last 7 days" is a 7-day trial, not a permanent free plan, so no free tier is recorded. Company omitted (footer names no legal entity).',
    sourceUrl: "https://www.lindy.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  platforms: {
    value: ["Web", "Chrome Extension"],
    sourceUrl: "https://www.lindy.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  models: {
    value: ["Third-party models"],
    note: '"Choose your model for each task". Names unpublished.',
    sourceUrl: "https://www.lindy.ai/pricing",
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
        "Team from $49.99/mo per active user. Enterprise custom. No free plan (7-day credits). Company omitted.",
    },
  ],
} satisfies ToolFacts;
