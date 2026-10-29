import type { ToolFacts } from "./types";

/**
 * Ollama: first fact file, stale-facts batch 2 (catalog audit 18),
 * 2026-10-29. Read twice on ollama.com. The local app stays free and
 * unlimited (MIT). Ollama now sells cloud plans, and cloud models are billed
 * per token on the $0 plan, so the row moves from FREE to FREEMIUM.
 * Per-model token prices were read once and are not recorded.
 */
export default {
  slug: "ollama",
  lifecycle: "active",
  company: {
    value: "Ollama",
    note: "Core software is open source under the MIT license.",
    sourceUrl: "https://github.com/ollama/ollama",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Running models on your own computer is free and unlimited. Cloud models are paid: per token on the $0 Pay as you go plan, or from a paid plan's usage credits.",
    },
    sourceUrl: "https://ollama.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Pay as you go",
        price: "$0",
        period: "",
        limits: "Local use unlimited; cloud models billed per token; 3 concurrent requests",
      },
      {
        name: "Pro",
        price: "$20",
        period: "month",
        limits: "Or $200/year; $60 of usage credits a month; larger Pro models",
      },
      {
        name: "Max",
        price: "$100",
        period: "month",
        limits: "$300 of usage credits a month; early access to new models; 10 concurrent requests",
      },
      {
        name: "Team",
        price: "$500",
        period: "month",
        limits: "Early access; unlimited users; $1,000 of credits a month shared",
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        limits: "Volume pricing, model access controls, cost budgets",
      },
    ],
    note: "\"$\", as of 2026-10-29. Monthly prices; only Pro shows a yearly price.",
    sourceUrl: "https://ollama.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  apiPricing: {
    value: "Cloud models are billed per 1M input / cached input / output tokens at each model's rate, with lower off-peak rates for some models outside 12:00-18:00 UTC on weekdays and all day at weekends.",
    sourceUrl: "https://ollama.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  privacy: {
    value: {
      trainsOnData: false,
      policyUrl: "https://ollama.com/privacy",
    },
    note: "Cloud docs: \"We do not use them to train models.\" Privacy policy: prompts are processed \"transiently\" and Ollama \"never train[s] on it\"; locally, \"We don't see your prompts or data\".",
    sourceUrl: "https://docs.ollama.com/cloud",
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
      summary: "First fact file: free local app; cloud via per-token billing or Pro $20, Max $100, Team $500 a month. Replaces \"Completely free ... all features included\".",
    },
  ],
} satisfies ToolFacts;
