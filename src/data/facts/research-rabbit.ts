import type { ToolFacts } from "./types";

/**
 * ResearchRabbit: first fact file, stale-facts batch 1 (catalog audit 17),
 * 2026-10-29. Plans read twice on researchrabbit.ai/pricing. A paid plan
 * (RR+) now exists, so the row is no longer "completely free".
 */
export default {
  slug: "research-rabbit",
  lifecycle: "active",
  company: {
    value: "Litmap Limited",
    note: "Footer: \"Copyright © Litmap Limited. 2016-2026.\"",
    sourceUrl: "https://www.researchrabbit.ai/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Free forever: unlimited searches, library and collections, sharing, and up to 50 seed articles.",
    },
    sourceUrl: "https://www.researchrabbit.ai/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Free",
        price: "$0",
        period: "",
        limits: "Unlimited searches, library and collections; up to 50 seed articles",
      },
      {
        name: "RR+",
        price: "$12.50",
        period: "month",
        limits: "Or $10/mo billed yearly; up to 300 seed articles; advanced search controls; multiple projects; Signals alerts",
      },
      {
        name: "Institution",
        price: "Custom",
        period: "",
        limits: "Contact sales; LibKey integration, user management, usage stats",
      },
    ],
    note: "USD, as of 2026-10-29. Country discount codes are offered.",
    sourceUrl: "https://www.researchrabbit.ai/pricing",
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
      summary:
        "First fact file: Free (50 seed articles) plus RR+ $12.50/mo or $10/mo yearly and Institution. Replaces \"completely free, no limits\".",
    },
  ],
} satisfies ToolFacts;
