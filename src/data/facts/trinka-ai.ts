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
 *
 * The Research Analyst's browser check the same day (trinka.ai/pricing,
 * marked PARTIAL) read the annual prices: Premium $48 (struck through from
 * $80), Premium Plus $125, Confidential Data $300 (struck through from
 * $500). Monthly prices were not captured, so the row's "$20/mo" goes.
 * Plans are now verified on the annual figures; catalog audit 19 applies
 * them. Hidden text aimed at AI agents on trinka.ai was ignored.
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
      summary: "Basic plan (free): 5,000 words a month, 4 proofread files and 5 AI writing requests.",
    },
    sourceUrl: "https://www.trinka.ai/pricing",
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Basic",
        price: "Not stated",
        period: "",
        limits: "Writing assistance: 5,000 words a month. A dollar price did not render on this read.",
      },
      {
        name: "Premium",
        price: "Not stated",
        period: "",
        limits: "Named on the page. Dollar amounts did not render.",
      },
      {
        name: "Premium Plus",
        price: "Not stated",
        period: "",
        limits: "Named on the page. Dollar amounts did not render.",
      },
      {
        name: "Confidential Data",
        price: "Not stated",
        period: "",
        limits: "No data storage. No AI training. Dollar amounts did not render.",
      },
    ],
    note: "Read 2026-11-20. Dollar amounts did not render, so the stored $0, $48, $20, $125, and $300 prices are not repeated.",
    sourceUrl: "https://www.trinka.ai/pricing",
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "ra-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  privacy: {
    value: {
      policyUrl: "https://www.trinka.ai/privacypolicy",
    },
    note: "Browser check, 2026-10-29: the privacy policy has no explicit AI-training clause; the closest is \"Improve the algorithms underlying the Services and for quality control purposes.\" Only the Confidential Data plan advertises \"Instant Data Deletion & no AI training\". Whether other plans' content trains models: not stated.",
    sourceUrl: "https://www.trinka.ai/privacypolicy",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-30",
      field: "plans",
      summary:
        "Catalog audit 27 re-read: Premium monthly price ($20) added; Basic free plan is 5,000 words, 4 proofread files and 5 AI writing requests a month.",
    },
    {
      date: "2026-10-29",
      field: "freeTier",
      summary: "First fact file: free Basic plan 5,000 words, 5 AI writing requests and 4 credits a month; paid prices pending a browser check.",
    },
    {
      date: "2026-10-29",
      field: "plans",
      summary: "Browser check: Premium $48/yr (from $80), Premium Plus $125/yr, Confidential Data $300/yr (from $500); monthly prices not captured.",
    },
  ],
} satisfies ToolFacts;
