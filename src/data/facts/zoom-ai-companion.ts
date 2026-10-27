import type { ToolFacts } from "./types";

const ZOOM_AI_PAGE_URL = "https://www.zoom.com/en/products/ai-assistant/";
const ZOOM_AIC_PRICING_URL = "https://zoom.us/pricing/aic";

/**
 * Zoom AI Companion, now presented as ZoomMate. Checked by the RA on Zoom's
 * own pages on 2026-10-26 (mcp-stress-factcheck-2026-10-26.md, follow-up 8).
 * The slug stays `zoom-ai-companion`. The ZoomMate price was read from
 * zoom.us/pricing/aic as returned by a search index (the product page
 * confirms the 2,200 credits but renders its price in JavaScript). The Custom
 * AI Companion add-on has no current public price, so none is listed.
 */
export default {
  slug: "zoom-ai-companion",
  lifecycle: "renamed",
  status: {
    value: {
      headline: "Zoom now presents its AI assistant as ZoomMate (\"your AI teammate\"); the Launchpad HQ page keeps the Zoom AI Companion address.",
      formerName: "Zoom AI Companion",
      whatToDo: "Nothing to do. Zoom's support pages still use the AI Companion name for some features.",
    },
    sourceUrl: ZOOM_AI_PAGE_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "ra",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  displayName: {
    value: "Zoom AI Companion (now ZoomMate)",
    sourceUrl: ZOOM_AI_PAGE_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "ra",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary:
        "ZoomMate Basic comes free with Zoom Workplace Basic: meeting summaries and in-meeting questions for 3 hosted meetings a month, AI note-taking 3 times a month, 20 AI queries a month and 10 workflow runs a month; free meetings are capped at 40 minutes.",
    },
    sourceUrl: ZOOM_AI_PAGE_URL,
    sourceKind: "product-page",
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "ra",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  plans: {
    value: [
      { name: "ZoomMate Basic", price: "$0", period: "", limits: "With Zoom Workplace Basic; 3 hosted meetings with AI summaries a month; 20 AI queries a month" },
      { name: "Zoom Workplace (paid)", price: "$14.16", period: "user/month", limits: "Billed annually; core AI features included at no extra cost" },
      { name: "ZoomMate", price: "$20", period: "user/month", limits: "Billed monthly; $16.67/user/month billed annually; 2,200 AI credits per user a month" },
    ],
    note: "USD, as of 2026-10-26. The paid Workplace starting price is from https://www.zoom.com/en/compare/zoom-vs-other-ai-tools/. The ZoomMate price was read from Zoom's pricing page as returned by a search index; the product page confirms the 2,200 credits.",
    sourceUrl: ZOOM_AIC_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "ra",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-26",
      field: "status",
      summary:
        "First fact file: Zoom presents the assistant as ZoomMate; free ZoomMate Basic limits; paid Workplace includes core AI from $14.16/user/month; ZoomMate $20/user/month ($16.67 annually).",
    },
  ],
} satisfies ToolFacts;
