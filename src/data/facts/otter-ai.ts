import type { ToolFacts } from "./types";

const OTTER_PRICING_URL = "https://otter.ai/pricing";

/**
 * Otter.ai, checked by the RA on otter.ai/pricing (static HTML, USD) on
 * 2026-10-26 (mcp-stress-factcheck-2026-10-26.md, item 1 and follow-up 10).
 * The "$24" shown on Business is a first-time promo on monthly billing (20%
 * off for 3 months), not the annual price, so it is left out.
 */
export default {
  slug: "otter-ai",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary:
        "Basic plan: 300 transcription minutes a month (shared by meetings and imports), up to 30 minutes per conversation, 3 lifetime audio or video file imports and 20 AI Chat queries a month.",
    },
    sourceUrl: OTTER_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "ra",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Basic", price: "$0", period: "", limits: "300 transcription minutes a month; 30 minutes per conversation; 3 lifetime file imports" },
      {
        name: "Pro",
        price: "$16.99",
        period: "user/month",
        limits: "Billed monthly; $8.33/user/month billed annually. 1,200 minutes a month; 90 minutes per conversation; 10 imports a month",
      },
      {
        name: "Business",
        price: "$30",
        period: "user/month",
        limits: "Billed monthly; $19.99/user/month billed annually. Unlimited meetings; 4 hours per conversation; up to 25 billed users",
      },
      { name: "Enterprise", price: "Contact sales", period: "", limits: "Demo or quote; SSO, SCIM and a HIPAA add-on" },
    ],
    note: "USD, as of 2026-10-26. First-time subscribers may see temporary promos (for example Business at $24/month for 3 months); those are not list prices.",
    sourceUrl: OTTER_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "ra",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-26",
      field: "plans",
      summary:
        "First fact file: Business is $30/user/month monthly or $19.99 billed annually (the catalog's \"$24 billed annually\" was a monthly promo); Pro $16.99 monthly or $8.33 annually; Basic free limits.",
    },
  ],
} satisfies ToolFacts;
