import type { ToolFacts } from "./types";

/**
 * Leonardo AI: first fact file, stale-facts batch 2 (catalog audit 18),
 * 2026-10-29. The free 150 tokens a day was read twice (pricing page and
 * help centre). leonardo.ai is behind a bot check, so the batch-2 readers
 * left plans unverified.
 *
 * The Research Analyst's browser check the same day (leonardo.ai/pricing
 * and /privacy-policy, US, logged out) verified the plans: billed monthly,
 * Essential $12, Premium $30, Ultimate $60 a month ex. tax; billed yearly
 * ("Up to 20% off"), $12, $29 and $58 a month (whether yearly is charged up
 * front: not stated); Teams Starter $72 and Growth $144 a month ($24 and $48
 * a seat). 8,500 / 25,000 / 60,000 are monthly fast-token allowances; the
 * Rollover Token Bank caps (25,500 / 75,000 / 180,000) are separate. The
 * privacy policy lets Leonardo train on content unless it is generated
 * privately, which needs a paid plan, so Free-plan content can be used for
 * training. Catalog audit 19 applies this to the row.
 *
 * Zach's decision, 2026-10-29 (catalog audit 20): privacyLevel LOW, because
 * Free-plan content is used for training (only paid plans can generate
 * privately). CLAUDE.md's rubric: LOW is "inputs used for training by default".
 */
export default {
  slug: "leonardo-ai",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "150 fast tokens a day, reset daily; unused daily tokens do not carry over. Content made on the free plan can be used to train Leonardo's models.",
    },
    note: "Also in the help centre: \"Free users get 150 daily tokens.\" (https://intercom.help/leonardo-ai/en/articles/9044700-tokens-frequently-asked-questions). Training: see privacy.",
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
        limits: "Billed monthly ($12 a month billed yearly); 8,500 fast tokens a month; Token Bank up to 25,500",
      },
      {
        name: "Premium",
        price: "$30",
        period: "month",
        limits: "Billed monthly ($29 a month billed yearly); 25,000 fast tokens a month; Token Bank up to 75,000; unlimited relaxed image generation on select models",
      },
      {
        name: "Ultimate",
        price: "$60",
        period: "month",
        limits: "Billed monthly ($58 a month billed yearly); 60,000 fast tokens a month; Token Bank up to 180,000; adds unlimited relaxed video on select models",
      },
      {
        name: "Team Starter",
        price: "$24",
        period: "user/month",
        limits: "$72 a month as shown",
      },
      {
        name: "Team Growth",
        price: "$48",
        period: "user/month",
        limits: "$144 a month as shown",
      },
    ],
    note: "USD, ex. tax, browser check 2026-10-29. Yearly view is labelled \"Up to 20% off\"; whether yearly is billed up front is not stated.",
    sourceUrl: "https://leonardo.ai/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  privacy: {
    value: {
      trainsOnData: true,
      policyUrl: "https://leonardo.ai/privacy-policy",
    },
    note: "Browser check, 2026-10-29: \"We may analyse your Content … to train our algorithms, models, and AI products … If you don't want your Content to be used for machine learning, you can generate Content privately with any paid subscription plan. Private Content … won't be used by Leonardo.Ai for model training.\"",
    sourceUrl: "https://leonardo.ai/privacy-policy",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "privacy",
      summary: "Privacy rated LOW (Zach): Free-plan content is used for training; private generation needs a paid plan.",
    },
    {
      date: "2026-10-29",
      field: "plans",
      summary: "First fact file: free 150 tokens a day confirmed; plans now Essential, Premium, Ultimate and Teams (prices pending a browser check). Replaces \"Pro $28/mo; Professional $56/mo\".",
    },
    {
      date: "2026-10-29",
      field: "plans",
      summary: "Browser check: Essential $12, Premium $30, Ultimate $60 a month (billed monthly); 8,500 / 25,000 / 60,000 monthly fast tokens; Free-plan content can be used for training.",
    },
  ],
} satisfies ToolFacts;
