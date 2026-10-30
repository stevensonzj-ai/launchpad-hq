import type { ToolFacts } from "./types";

/**
 * Scholarcy: first fact file, catalog audit 21, 2026-10-29. From the Research
 * Analyst's browser check of the batch-4 rows (logged out, US, USD; "RA
 * browser check 2026-10-29"). The batch-4 readers got 403 on every
 * scholarcy.com page, so nothing was readable until then.
 *
 * Pricing page: Free Article Summarizer $0 with a table that says "Limit of 10
 * summaries" while the FAQ says "up to 1 summary per day" - the page
 * conflicts with itself, so no free number is recorded. Plus is "$9.99/month"
 * or "$90.00/year" (shown as a 25% discount) with a "1 week free trial".
 * Features named: summaries, flashcards, Literature Matrix, bibliographies.
 * Privacy policy (updated February 2024): no statement about AI training;
 * data is stored "via secure third party servers within the EEA".
 */
export default {
  slug: "scholarcy",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "A free Article Summarizer with a limited allowance. Scholarcy's pricing table and its FAQ state different limits, so no number is given.",
    },
    note: "The pricing table says \"Limit of 10 summaries\"; the FAQ on the same page says \"up to 1 summary per day\".",
    sourceUrl: "https://www.scholarcy.com/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Free Article Summarizer",
        price: "$0",
        period: "",
        limits: "Limited allowance; the pricing page states it two different ways, so none is given",
      },
      {
        name: "Scholarcy Plus",
        price: "$9.99",
        period: "month",
        limits: "$90 a year (shown as a 25% discount); 1-week free trial; summaries, flashcards, Literature Matrix and bibliographies",
      },
    ],
    note: "USD, logged-out US browser check, 2026-10-29.",
    sourceUrl: "https://www.scholarcy.com/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  privacy: {
    value: {
      retention: "Data is stored via secure third-party servers within the EEA.",
      policyUrl: "https://www.scholarcy.com/privacy-policy",
    },
    note: "The privacy policy (updated February 2024) says nothing about using uploads to train AI models, in either direction; silence is not a promise either way. trainsOnData is left unset.",
    sourceUrl: "https://www.scholarcy.com/privacy-policy",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary: "First fact file (browser check): Plus $9.99 a month or $90 a year with a 1-week trial; free tier limited, number not stated (page conflicts); no AI-training statement in the privacy policy.",
    },
  ],
} satisfies ToolFacts;
