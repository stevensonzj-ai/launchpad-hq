import type { ToolFacts } from "./types";

const PPLX_PLAN_COMPARE_URL =
  "https://www.perplexity.ai/help-center/en/articles/11187416-which-perplexity-subscription-plan-is-right-for-you";
const PPLX_PRICING_URL = "https://www.perplexity.ai/hub/pricing";

/**
 * Plans: Perplexity's pricing hub, re-checked by the RA on 2026-10-26
 * (mcp-stress-factcheck-2026-10-26.md, item 7 and follow-up 3). Perplexity's
 * pages block scripted fetches, so the RA read them as returned by a search
 * index. Pro is stated only as "$17/month when billed annually"; no official
 * page states a monthly-billing Pro price, so none is listed. Comet browser
 * facts live in perplexity-comet.ts.
 */
export default {
  slug: "perplexity-ai",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary:
        "Practically unlimited basic searches, 3 Pro Searches a day, 1 Research query a month and limited basic file uploads; no advanced AI models or image generation.",
    },
    note: "The Free plan is also called Standard. Daily and monthly counts are from the plan comparison table on the same page (as of 2026-10-26).",
    sourceUrl: PPLX_PLAN_COMPARE_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Pro", price: "$17", period: "month", limits: "Billed annually; a monthly-billing price is not stated on Perplexity's pricing pages" },
      {
        name: "Max",
        price: "$200",
        period: "month",
        limits: "Or $2,000/year ($167/month billed annually); annual billing only on the perplexity.ai web app",
      },
      { name: "Education Pro", price: "$10", period: "month", limits: "With student verification (SheerID)" },
      { name: "Enterprise Pro", price: "$40", period: "seat/month", limits: "Or $400/year per seat" },
      { name: "Enterprise Max", price: "$325", period: "seat/month", limits: "Or $3,250/year per seat" },
    ],
    note: "USD, as of 2026-10-26. Max prices: https://www.perplexity.ai/help-center/en/articles/11680686-perplexity-max. Enterprise prices: https://www.perplexity.ai/help-center/en/articles/10352986-enterprise-pricing-and-billing-frequently-asked-questions. Education Pro: the plan-comparison article.",
    sourceUrl: PPLX_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "ra",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  features: {
    value: [
      "Pro and Max subscribers can opt out of data collection in settings; Enterprise Pro and Enterprise Max data is never logged or used for training, per Perplexity's plan comparison (as of 2026-10-26).",
      "The plan comparison table lists Pro Searches at 3 a day on Free, weekly limits on Pro and Max, 400 a week on Enterprise Pro and 4,000 a week on Enterprise Max (as of 2026-10-26).",
    ],
    sourceUrl: PPLX_PLAN_COMPARE_URL,
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
      summary: "Plans source moved from a Slack-connector help article to the official pricing hub. Pro is $17/month billed annually; the unstated $20 monthly figure was removed. Added Education Pro and Max's $167/month annual equivalent.",
    },
    {
      date: "2026-10-26",
      field: "plans",
      summary: "New fact file: Free plan limits (3 Pro Searches a day, 1 Research query a month) and Pro, Max, Enterprise Pro and Enterprise Max prices from Perplexity's Help Center.",
    },
  ],
} satisfies ToolFacts;
