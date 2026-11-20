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
        name: "Perpetual, cross-platform",
        price: "US$695",
        period: "one-time",
        limits: "Struck price on the Windows Individuals store"
      },
      {
        name: "Perpetual, single-platform",
        price: "US$159",
        period: "one-time",
        limits: "Struck price. One-time fee for perpetual access to PDFelement 13"
      },
      {
        name: "Yearly, cross-platform",
        price: "US$305",
        period: "year",
        limits: "Struck price on the Windows Individuals store"
      },
      {
        name: "Yearly, single-platform",
        price: "US$129",
        period: "year",
        limits: "Struck yearly price. The stored US$129.99 perpetual price is not on the page"
      }
    ],
    note: "Read 2026-11-20. The page is an offer view (up to 91% off) and does not state an end date, so the offer prices are not the list price.",
    sourceUrl: "https://pdf.wondershare.com/store/windows-individuals.html",
    sourceKind: "product-page",
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "ra-recheck",
    verifiedAt: "2026-11-20",
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
