import type { ToolFacts } from "./types";

/**
 * Gong: first fact file, stale-facts batch 3 (catalog audit 19),
 * 2026-10-29. Read twice, blind, on the vendor's own pages.
 * Quote-only: per-user licences plus a platform fee based on the number
 * of users, by custom proposal. No free tier or trial. "Unlimited call
 * recording" is not stated anywhere and is dropped.
 */
export default {
  slug: "gong",
  lifecycle: "active",
  freeTier: {
    value: {
      available: false,
      summary: "No free tier or trial; pricing by custom proposal.",
    },
    sourceUrl: "https://www.gong.io/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Gong platform",
        price: "Custom proposal",
        period: "",
        limits: "Licences priced per user, plus a platform fee based on the number of users",
      },
    ],
    note: "\"Licenses are priced per user\"; \"There is a platform fee based on the number of users supported.\" No prices published, as of 2026-10-29.",
    sourceUrl: "https://www.gong.io/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary: "First fact file: per-user licences plus a platform fee; no free tier. \"Unlimited call recording\" not stated.",
    },
  ],
} satisfies ToolFacts;
