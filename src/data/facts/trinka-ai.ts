import type { ToolFacts } from "./types";

/**
 * Trinka AI: first fact file, stale-facts batch 2 (catalog audit 18),
 * 2026-10-29. Read twice on trinka.ai/pricing. The free Basic plan is
 * confirmed. Premium and Premium Plus prices render only in a browser: one
 * reader took them from Trinka's own pricing API (Premium $20/month,
 * $80/year; Premium Plus $125/year), the other could not see them, so plans
 * stay unverified and the row's prices are left alone (Browser-check list).
 * Both readers saw the Confidential Data plan at $41.67/month billed
 * annually.
 */
export default {
  slug: "trinka-ai",
  lifecycle: "active",
  company: {
    value: "Crimson AI",
    note: "\"© Crimson AI, 2026. Made in India.\"",
    sourceUrl: "https://www.trinka.ai/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Basic plan, free and never expires, no card: 5,000 words a month of writing assistance, 5 AI writing requests and 4 credits a month.",
    },
    sourceUrl: "https://www.trinka.ai/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Basic",
        price: "$0",
        period: "",
        limits: "5,000 words, 5 AI writing requests and 4 credits a month",
      },
      {
        name: "Premium",
        price: "$20",
        period: "month",
        limits: "Or $80/year (read once); full writing access",
      },
      {
        name: "Premium Plus",
        price: "$125",
        period: "year",
        limits: "Read once",
      },
      {
        name: "Confidential Data",
        price: "$41.67",
        period: "month",
        limits: "Billed annually; no data storage and no AI training; for teams",
      },
    ],
    note: "\"$\", as of 2026-10-29. Only Basic and Confidential Data were seen by both readers.",
    sourceUrl: "https://www.trinka.ai/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  privacy: {
    value: {
      policyUrl: "https://www.trinka.ai/privacy-policy",
    },
    note: "Only the Confidential Data plan is described as \"No data storage. No AI training.\" The privacy policy body did not render for either reader.",
    sourceUrl: "https://www.trinka.ai/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "freeTier",
      summary: "First fact file: free Basic plan 5,000 words, 5 AI writing requests and 4 credits a month; paid prices pending a browser check.",
    },
  ],
} satisfies ToolFacts;
