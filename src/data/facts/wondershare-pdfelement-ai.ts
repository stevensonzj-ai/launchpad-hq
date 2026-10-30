import type { ToolFacts } from "./types";

/**
 * Wondershare PDFelement AI: first fact file, stale-facts batch 4 (catalog
 * audit 20), 2026-10-29. Read twice, blind, on pdf.wondershare.com. The
 * homepage (V13 released) shows promotional one-time and yearly prices; both
 * readers agree on them. /pricing.html and the privacy policy returned 404, so
 * AI credit or quota limits, trial terms and the training clause are unread.
 * The row's "From $79.99/year" is not on the homepage.
 */
export default {
  slug: "wondershare-pdfelement-ai",
  lifecycle: "active",
  officialUrl: {
    value: "https://pdf.wondershare.com",
    sourceUrl: "https://pdf.wondershare.com/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  plans: {
    value: [
      {
        name: "Personal",
        price: "$129.99",
        period: "",
        limits: "Perpetual licence, 1 user; promotional price (was $159)"
      },
      {
        name: "Team",
        price: "$139",
        period: "",
        limits: "Perpetual licence, 1 user; multi-user options"
      },
      {
        name: "Cross Platform",
        price: "$139.99",
        period: "",
        limits: "Perpetual licence, 1 user; promotional price"
      },
      {
        name: "Education",
        price: "$39.99",
        period: "year",
        limits: "1 user; promotional price"
      }
    ],
    note: "USD, as of 2026-10-29, from the homepage during a release promotion (\"Up to 79% OFF\"). AI credit limits and any separate AI pricing are not stated.",
    sourceUrl: "https://pdf.wondershare.com/",
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  features: {
    value: [
      "PDFelement V13 is released; AI features listed on the homepage include an AI Knowledge Base, Chat with PDF, Contract Review, Smart Redact, Rewrite, and an AI Image Generator."
    ],
    sourceUrl: "https://pdf.wondershare.com/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary: "First fact file: homepage shows perpetual licences ($129.99 to $139.99) and a $39.99 yearly education plan; no \"$79.99/year\"."
    }
  ],
} satisfies ToolFacts;
