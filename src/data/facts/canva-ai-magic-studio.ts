import type { ToolFacts } from "./types";

const CANVA_AI_PASS_URL = "https://www.canva.com/help/ai-pass/";
const CANVA_PRICING_URL = "https://www.canva.com/pricing/";

/**
 * Plans and free limits: canva.com/pricing (US, USD), read by the RA from the
 * page's embedded plan data on 2026-10-26 (mcp-stress-factcheck-2026-10-26.md,
 * item 2 and follow-up 2). Plan prices owner verified manually in browser
 * 2026-10-26 (Monthly and Yearly toggles): Pro $18/month or $144/year,
 * Business $25/month or $250/year per person. This settles the earlier
 * $144-vs-$180 conflict for Pro's yearly price. Re-checked 2026-10-29 (RA
 * and the page's embedded plan data): still $144, not $180.
 */
export default {
  slug: "canva-ai-magic-studio",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary:
        "Canva Free includes up to 20 AI uses a month, shared across Canva's AI tools, plus 1 Brand Kit and 5 GB of storage; paid plans raise the AI allowance.",
    },
    sourceUrl: CANVA_PRICING_URL,
    checkedAt: "2026-10-29",
    gatheredBy: "ra",
    verifiedBy: "claude",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "", limits: "Up to 20 Standard or Premium AI uses a month; 5 GB storage" },
      { name: "Pro", price: "$18", period: "month", limits: "Billed monthly, or $144/year billed yearly; 1 person; 10x Free's AI; optional AI Pass add-on; 100 GB storage" },
      { name: "Business", price: "$25", period: "person/month", limits: "Billed monthly, or $250/year per person billed yearly; for individuals and teams; 20x Free's AI; AI Pass and AI top-ups available; 500 GB storage" },
      { name: "Enterprise", price: "Contact sales", period: "", limits: "1 TB storage" },
    ],
    note: "USD, US page, as of 2026-10-29. Prices exclude applicable tax. All AI tools draw on one shared monthly allowance, at different rates for Standard, Premium and Ultra AI. Canva Teams is no longer available for new sign-ups or upgrades (Business covers individuals and teams); existing Teams subscribers keep it.",
    sourceUrl: CANVA_PRICING_URL,
    checkedAt: "2026-10-29",
    gatheredBy: "ra",
    // Re-read from the page's embedded plan data 2026-10-29: Pro 14400 / 1800
    // cents (year / month), Business 25000 / 2500. Owner verified the same
    // prices in browser 2026-10-26.
    verifiedBy: "claude",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  features: {
    value: [
      "AI Pass is an optional monthly add-on for Canva Pro and Business (and existing Teams and Nonprofits plans), priced at USD $100 per person per month.",
      "AI Pass gives Canva Pro, Teams and Nonprofits subscribers 40x more AI, and Canva Business subscribers 20x more AI.",
      "The pricing page lists AI top-ups as available on Business, not on Pro.",
      "AI Pass is not available on Canva Free, Education or Enterprise, on free trials or prepaid plans, or on subscriptions managed through the Apple App Store or Google Play.",
    ],
    note: "AI Pass price and availability from the Canva Help Center (2026-10-29); top-ups from the pricing page.",
    sourceUrl: CANVA_AI_PASS_URL,
    checkedAt: "2026-10-29",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary:
        "Re-checked: Free up to 20 Standard or Premium AI uses; Pro $18/mo or $144/yr (10x, optional AI Pass); Business $25/mo or $250/yr per person (20x, AI Pass and top-ups); prices exclude tax; no Teams plan for new sign-ups.",
    },
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
