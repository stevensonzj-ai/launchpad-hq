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
        "Free plan at $0/month, described as good for limited daily usage. The plan card says access to basic AI models; the FAQ says Free includes access to the top AI models with limited weekly usage. Web answers, file uploads and asset generation are Limited; video generation is not included. Numeric daily or monthly limits are not stated on this page.",
    },
    note: "Hub pricing page, read 2026-11-20. \"$\" with no currency code; region not stated. The plan card and the FAQ disagree on model access, so both wordings are kept.",
    sourceUrl: PPLX_PRICING_URL,
    checkedAt: "2026-11-20",
    gatheredBy: "claude",
    verifiedBy: "ra-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Pro", price: "$17", period: "month", limits: "When billed annually. A monthly-billing price is not on this page." },
      { name: "Max", price: "$167", period: "month", limits: "When billed annually. A monthly price and a yearly total are not on this page." },
      { name: "Enterprise Pro", price: "$34", period: "seat/month", limits: "Per seat when billed annually" },
      { name: "Enterprise Max", price: "$271", period: "seat/month", limits: "Per seat when billed annually. Not stated as a yearly total." },
      { name: "Enterprise", price: "Custom", period: "", limits: "Third column: custom pricing" },
    ],
    note: "Hub pricing page, read 2026-11-20. \"$\" with no currency code; region not stated. Education and monthly-billing prices are not on this page.",
    sourceUrl: PPLX_PRICING_URL,
    checkedAt: "2026-11-20",
    gatheredBy: "claude",
    verifiedBy: "ra-recheck",
    verifiedAt: "2026-11-20",
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
