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
        name: "Personal (Windows)",
        price: "$129.99",
        period: "",
        limits: "Perpetual licence, 1 user"
      }
    ],
    note: "USD, catalog audit 27 re-read 2026-10-30 on the Windows individuals store page. Team and Education prices not confirmed.",
    sourceUrl: "https://pdf.wondershare.com/store/windows-individuals.html",
    sourceKind: "product-page",
    checkedAt: "2026-10-30",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
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
      date: "2026-10-30",
      field: "plans",
      summary: "Catalog audit 27 re-read: Windows perpetual licence $129.99 kept; unsourced Team, Cross Platform and Education prices removed."
    },
    {
      date: "2026-10-29",
      field: "plans",
      summary: "First fact file: homepage shows perpetual licences ($129.99 to $139.99) and a $39.99 yearly education plan; no \"$79.99/year\"."
    }
  ],
} satisfies ToolFacts;
