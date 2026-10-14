import type { ToolFacts } from "./types";

export default {
  slug: "magicschool",
  lifecycle: "active",
  company: {
    value: "Magic School, Inc.",
    note: "Browser-verified 2026-10-14: trademark line “Magic School, Inc.”",
    sourceUrl: "https://www.magicschool.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "$0 Forever Free, for individual teachers exploring AI.",
    },
    sourceUrl: "https://www.magicschool.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  plans: {
    value: [
      {
        name: "Forever Free",
        price: "$0",
        period: "",
        limits: "For individual teachers exploring AI",
      },
      {
        name: "Plus",
        price: "$8.33",
        period: "user/mo billed annually",
        limits: "$99.96 yearly, or $12.99/mo billed monthly",
      },
      {
        name: "Enterprise",
        price: "custom",
        period: "",
        limits: "For schools and districts",
      },
    ],
    note: "Browser-verified 2026-10-14: Plus $12.99 monthly or $8.33/mo billed yearly ($99.96/yr). USD.",
    sourceUrl: "https://www.magicschool.ai/pricing",
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
        "Forever Free $0. Plus $8.33/user/mo billed annually or $12.99 monthly. Company Magic School, Inc. (browser-verified).",
    },
  ],
} satisfies ToolFacts;
