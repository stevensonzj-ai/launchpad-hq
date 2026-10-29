import type { ToolFacts } from "./types";

/**
 * Leonardo AI: first fact file, stale-facts batch 2 (catalog audit 18),
 * 2026-10-29. The free 150 tokens a day was read twice (pricing page and
 * help centre). leonardo.ai is behind a bot check: one reader got the
 * pricing page once (Essential $12, Premium $30, Ultimate $60 a month,
 * billing view unlabelled), the other got 403, so plans are unverified and
 * the row's prices are replaced only with the plan names both readers saw
 * (Browser-check list). The two readers read the 8,500 / 25,000 / 60,000
 * figures differently (monthly tokens vs rollover caps), so they are not
 * written.
 */
export default {
  slug: "leonardo-ai",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "150 fast tokens a day, reset daily; unused daily tokens do not carry over.",
    },
    note: "Also in the help centre: \"Free users get 150 daily tokens.\" (https://intercom.help/leonardo-ai/en/articles/9044700-tokens-frequently-asked-questions).",
    sourceUrl: "https://leonardo.ai/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Free",
        price: "$0",
        period: "",
        limits: "150 fast tokens a day",
      },
      {
        name: "Essential",
        price: "$12",
        period: "month",
        limits: "Read once; billing view unlabelled",
      },
      {
        name: "Premium",
        price: "$30",
        period: "month",
        limits: "Read once; unlimited relaxed image generation on select models",
      },
      {
        name: "Ultimate",
        price: "$60",
        period: "month",
        limits: "Read once; adds unlimited relaxed video on select models",
      },
      {
        name: "Team Starter",
        price: "$24",
        period: "user/month",
        limits: "Read once",
      },
      {
        name: "Team Growth",
        price: "$48",
        period: "user/month",
        limits: "Read once",
      },
    ],
    note: "Ex. tax, as of 2026-10-29. Plan names seen by both readers; prices read once.",
    sourceUrl: "https://leonardo.ai/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary: "First fact file: free 150 tokens a day confirmed; plans now Essential, Premium, Ultimate and Teams (prices pending a browser check). Replaces \"Pro $28/mo; Professional $56/mo\".",
    },
  ],
} satisfies ToolFacts;
