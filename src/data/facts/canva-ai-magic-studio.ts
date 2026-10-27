import type { ToolFacts } from "./types";

const CANVA_AI_PASS_URL = "https://www.canva.com/help/ai-pass/";
const CANVA_PRICING_URL = "https://www.canva.com/pricing/";

/**
 * Plans and free limits: canva.com/pricing (US, USD), read by the RA from the
 * page's embedded plan data on 2026-10-26 (mcp-stress-factcheck-2026-10-26.md,
 * item 2 and follow-up 2). Plan prices owner verified manually in browser
 * 2026-10-26 (Monthly and Yearly toggles): Pro $18/month or $144/year,
 * Business $25/month or $250/year per person. This settles the earlier
 * $144-vs-$180 conflict for Pro's yearly price.
 */
export default {
  slug: "canva-ai-magic-studio",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary:
        "Canva Free includes a monthly AI allowance of up to 20 uses of its AI tools, 1 Brand Kit and 5 GB of storage; paid plans raise the AI allowance.",
    },
    sourceUrl: CANVA_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "ra",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "", limits: "Up to 20 AI uses a month; 5 GB storage" },
      { name: "Pro", price: "$18", period: "month", limits: "Billed monthly, or $144/year billed yearly; 1 person; 10x Free's AI allowance; 100 GB storage" },
      { name: "Business", price: "$25", period: "person/month", limits: "Billed monthly, or $250/year per person billed yearly; 20x Free's AI allowance; 500 GB storage" },
      { name: "Enterprise", price: "Contact sales", period: "", limits: "1 TB storage" },
    ],
    note: "USD, US page, as of 2026-10-26. Canva Teams is no longer available for new sign-ups or upgrades (Business replaces it); existing Teams subscribers keep it.",
    sourceUrl: CANVA_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    // Owner verified manually in browser 2026-10-26 (Monthly and Yearly toggles).
    verifiedBy: "owner",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  features: {
    value: [
      "AI Pass is an optional monthly add-on for Canva Pro, Teams, Business and Nonprofits plans, priced at USD $100 per person per month (as of 2026-10-26).",
      "AI Pass gives Canva Pro, Teams and Nonprofits subscribers 40x more AI, and Canva Business subscribers 20x more AI.",
      "AI Pass is not available on Canva Free, Education or Enterprise, on free trials or prepaid plans, or on subscriptions managed through the Apple App Store or Google Play.",
    ],
    sourceUrl: CANVA_AI_PASS_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-26",
      field: "plans",
      summary: "Pro's yearly price confirmed: $18/month or $144/year (one person). Business $25/month or $250/year per person.",
    },
    {
      date: "2026-10-26",
      field: "plans",
      summary:
        "Plans from canva.com/pricing: Free, Pro $18/month, Business $25/person/month or $250/year, Enterprise; free plan up to 20 AI uses a month. Replaces the catalog's \"from $12.99/mo\".",
    },
    {
      date: "2026-10-26",
      field: "freeTier",
      summary: "First fact file: Canva AI free-plan availability (canva.com/canva-ai) and the AI Pass add-on (Canva Help Center).",
    },
  ],
} satisfies ToolFacts;
