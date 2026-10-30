import type { ToolFacts } from "./types";

/**
 * AlphaSense: first fact file, stale-facts batch 3 (catalog audit 19),
 * 2026-10-29. Read twice, blind, on the vendor's own pages.
 * Quote-only: two packages, sold as annual subscriptions per seat or
 * enterprise-wide. A free trial is offered; its length is not on the
 * trial page (one reader found "two-week" in a vendor blog post, so the
 * length stays unverified). No price is published, so the row's
 * "$10K+ annually" is dropped.
 */
export default {
  slug: "alphasense",
  lifecycle: "active",
  officialUrl: {
    value: "https://www.alpha-sense.com",
    note: "alpha-sense.com redirects to www.alpha-sense.com.",
    sourceUrl: "https://www.alpha-sense.com/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: false,
      summary: "No free plan. A free trial is offered through a request form; its length is not stated there.",
    },
    note: "One reader found \"AlphaSense offers a free two-week trial of its platform\" in a vendor blog post (alpha-sense.com/resources/product-articles/market-intelligence-tools/); not confirmed by the second reader.",
    sourceUrl: "https://www.alpha-sense.com/trial-request/",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Market Intelligence",
        price: "Contact sales",
        period: "",
        limits: "Annual subscription",
      },
      {
        name: "Enterprise Intelligence",
        price: "Contact sales",
        period: "",
        limits: "Annual subscription",
      },
    ],
    note: "\"We provide annual subscriptions for all team sizes, ranging from enterprise packages to per-seat options.\" No prices published, as of 2026-10-29.",
    sourceUrl: "https://www.alpha-sense.com/pricing/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  privacy: {
    value: {
      trainsOnData: false,
      policyUrl: "https://www.alpha-sense.com/privacy-notice/",
    },
    note: "Privacy notice (last updated June 19, 2026): \"We do not use customer personal data, customer-provided content, or personal data processed on behalf of customers to train generally available generative artificial intelligence models or large language models, except where expressly agreed with the customer.\"",
    sourceUrl: "https://www.alpha-sense.com/privacy-notice/",
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
      summary: "First fact file: quote-only packages on annual subscriptions; free trial (length not stated); no published price.",
    },
  ],
} satisfies ToolFacts;
