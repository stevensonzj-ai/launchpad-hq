import type { ToolFacts } from "./types";

/**
 * ChatPDF: first fact file, stale-facts batch 4 (catalog audit 20),
 * 2026-10-29. Read twice, blind, on chatpdf.com. Both readers agree on the free
 * plan (2 documents a day; no account needed to start; a free account adds
 * saved history and multi-document chats) and that ChatPDF Plus offers
 * "unlimited document analysis, and more advanced features". No price is shown
 * on the homepage and /pricing, /privacy, /privacy-policy and /api/docs all
 * return 404, so the row's "Plus $5/mo", "120 pages/PDF" and "10 questions/day"
 * are unsourced and the training clause is unread. The homepage says documents
 * are SSL-encrypted in transit, encrypted at rest, private by default and
 * deletable (both readers).
 */
export default {
  slug: "chatpdf",
  lifecycle: "active",
  officialUrl: {
    value: "https://www.chatpdf.com",
    sourceUrl: "https://www.chatpdf.com/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  freeTier: {
    value: {
      available: true,
      summary: "Free plan: analyze 2 documents a day, with no account needed to start; a free account adds saved chat history and multi-document chats."
    },
    sourceUrl: "https://www.chatpdf.com/",
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  plans: {
    value: [
      {
        name: "Free",
        price: "$0",
        period: "",
        limits: "2 documents a day; a paid ChatPDF Plus plan adds unlimited document analysis and more advanced features (its price is not shown on the homepage)"
      }
    ],
    note: "As of 2026-10-29. /pricing returns 404.",
    sourceUrl: "https://www.chatpdf.com/",
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  features: {
    value: [
      "ChatPDF Plus: \"unlimited document analysis, and more advanced features\"; its price is not shown on the homepage (/pricing returns 404)."
    ],
    sourceUrl: "https://www.chatpdf.com/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "freeTier",
      summary: "First fact file: free plan is 2 documents a day; Plus price and per-file limits are not published on the pages read."
    }
  ],
} satisfies ToolFacts;
