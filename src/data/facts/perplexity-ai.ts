import type { ToolFacts } from "./types";

const PPLX_PLAN_COMPARE_URL =
  "https://www.perplexity.ai/help-center/en/articles/11187416-which-perplexity-subscription-plan-is-right-for-you";
const PPLX_PLAN_PRICES_URL =
  "https://www.perplexity.ai/help-center/en/articles/12167980-using-the-connector-for-slack";

/**
 * Perplexity's own pricing pages (perplexity.ai/pro, /enterprise/pricing)
 * return 403 to scripted fetches or render no price text, so prices come from
 * Perplexity's Help Center. Comet browser facts live in perplexity-comet.ts.
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
      { name: "Pro", price: "$20", period: "month", limits: "Or $200/year" },
      {
        name: "Max",
        price: "$200",
        period: "month",
        limits: "Or $2,000/year; annual billing only on the perplexity.ai web app",
      },
      { name: "Enterprise Pro", price: "$40", period: "seat/month", limits: "Or $400/year per seat" },
      { name: "Enterprise Max", price: "$325", period: "seat/month", limits: "Or $3,250/year per seat" },
    ],
    note: "USD, as of 2026-10-26. Prices as listed in Perplexity's Help Center (\"Our plans start at\"). The Max annual-billing limit is from https://www.perplexity.ai/help-center/en/articles/11680686-perplexity-max. Education Pro is listed at $10/mo with SheerID verification on the plan-comparison article.",
    sourceUrl: PPLX_PLAN_PRICES_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
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
      summary: "New fact file: Free plan limits (3 Pro Searches a day, 1 Research query a month) and Pro, Max, Enterprise Pro and Enterprise Max prices from Perplexity's Help Center.",
    },
  ],
} satisfies ToolFacts;
