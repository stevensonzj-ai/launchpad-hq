import type { ToolFacts } from "./types";

/**
 * Slack AI: first fact file, stale-facts batch 2 (catalog audit 18),
 * 2026-10-29. Read twice on slack.com. There is no separate Slack AI add-on
 * any more: AI is bundled into each plan (Basic AI on Free and Pro, Advanced
 * AI on Business+). The features page says AI is on all paid plans while the
 * pricing page lists Basic AI on Free too; the free tier follows the pricing
 * page.
 */
export default {
  slug: "slack-ai",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "The Free plan lists Basic AI: conversation and file summaries, AI search, daily recaps and workflow generation. Slackbot is a limited trial on Free.",
    },
    sourceUrl: "https://slack.com/pricing",
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
        limits: "Basic AI; limited Slackbot trial",
      },
      {
        name: "Pro",
        price: "$8.75",
        period: "user/month",
        limits: "Paid monthly; $7.25 paid annually; Basic AI",
      },
      {
        name: "Business+",
        price: "$18",
        period: "user/month",
        limits: "Paid monthly; $15 paid annually; Advanced AI including Slackbot",
      },
      {
        name: "Enterprise+",
        price: "Contact sales",
        period: "",
        limits: "Enterprise-grade AI including enterprise search",
      },
    ],
    note: "USD, as of 2026-10-29. Higher Slackbot limits are sold as Flex Credits through sales (no price shown). A 50%-off promotion on monthly plans for new teams was showing.",
    sourceUrl: "https://slack.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  features: {
    value: [
      "No separate Slack AI add-on is listed; AI is bundled into every plan (Basic, Advanced and Enterprise-grade AI).",
    ],
    sourceUrl: "https://slack.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  privacy: {
    value: {
      trainsOnData: false,
      policyUrl: "https://slack.com/trust/data-management/privacy-principles",
    },
    note: "\"Slack will not use Customer Data to train generative AI models unless Customer provides affirmative opt-in consent.\" One reader also saw that Slack's non-generative global models use customer data unless a workspace opts out.",
    sourceUrl: "https://slack.com/trust/data-management/privacy-principles",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary: "First fact file: AI bundled into plans, Free includes Basic AI, Business+ $18 ($15 annually). Replaces \"$10/user/mo add-on\" and \"No free tier for AI features\".",
    },
  ],
} satisfies ToolFacts;
