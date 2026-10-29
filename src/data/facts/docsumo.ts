import type { ToolFacts } from "./types";

/**
 * Docsumo: first fact file, stale-facts batch 1 (catalog audit 17),
 * 2026-10-29. Read twice on docsumo.com: a 14-day trial, then quoted plans.
 */
export default {
  slug: "docsumo",
  lifecycle: "active",
  company: {
    value: "Docsumo",
    note: "Privacy policy names Docsumo Pte. Ltd.",
    sourceUrl: "https://www.docsumo.com/privacy-policy",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: false,
      summary: "No free plan. A 14-day free trial covers up to 1,000 pages and 10 user licences; after that, plans are quoted.",
    },
    note: "\"Free trial (for 14 days)\", \"Up to 1,000 free pages\", \"10 user licences\".",
    sourceUrl: "https://www.docsumo.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Business",
        price: "Custom",
        period: "",
        limits: "Quoted on volume; unlimited user licences; auto-classification and splitting; audit logging",
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        limits: "Quoted; adds automated workflows, cross-document validations, priority support",
      },
    ],
    note: "As of 2026-10-29. Monthly or annual billing, with a lower annual rate; credits reset monthly and do not roll over; setup fees are extra.",
    sourceUrl: "https://www.docsumo.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  privacy: {
    value: { trainsOnData: false, policyUrl: "https://www.docsumo.com/privacy-policy" },
    note: "Policy last updated 19 October 2026: \"Customer Data is not used to train shared or third-party models.\" The service learns from corrections inside your own account, and that training can be paused.",
    sourceUrl: "https://www.docsumo.com/privacy-policy",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "freeTier",
      summary:
        "First fact file: 14-day trial of up to 1,000 pages, then Business / Enterprise quotes. Replaces the catalog's free 100 pages/mo and Growth tier.",
    },
  ],
} satisfies ToolFacts;
