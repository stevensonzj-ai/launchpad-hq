import type { ToolFacts } from "./types";

/**
 * Outreach: first fact file, stale-facts batch 3 (catalog audit 19),
 * 2026-10-29. Read twice, blind, on the vendor's own pages.
 * outreach.io now redirects to outreach.ai. Pricing is per user plus AI
 * credits, in four Amplify plans; every plan says "Request pricing".
 * No free tier or trial.
 */
export default {
  slug: "outreach",
  lifecycle: "active",
  officialUrl: {
    value: "https://www.outreach.ai",
    note: "outreach.io/pricing returns 301 to outreach.ai/pricing.",
    sourceUrl: "https://www.outreach.ai/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  company: {
    value: "Outreach Corporation",
    sourceUrl: "https://www.outreach.ai/privacy-policy",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: false,
      summary: "No free tier or trial; pricing on request, with a demo.",
    },
    sourceUrl: "https://www.outreach.ai/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Amplify Essentials",
        price: "Request pricing",
        period: "",
        limits: "10,000 AI credits",
      },
      {
        name: "Amplify Core",
        price: "Request pricing",
        period: "",
        limits: "25,000 AI credits",
      },
      {
        name: "Amplify Plus",
        price: "Request pricing",
        period: "",
        limits: "50,000 AI credits",
      },
      {
        name: "Amplify Pro",
        price: "Request pricing",
        period: "",
        limits: "100,000 AI credits",
      },
    ],
    note: "\"Per user pricing. No platform fees. Support included.\" Seat-based access plus consumption-based AI credits, as of 2026-10-29.",
    sourceUrl: "https://www.outreach.ai/pricing",
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
      summary: "First fact file: site moved to outreach.ai; Amplify plans priced per user plus AI credits, on request.",
    },
  ],
} satisfies ToolFacts;
