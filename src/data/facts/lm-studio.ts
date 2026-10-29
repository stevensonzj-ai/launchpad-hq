import type { ToolFacts } from "./types";

/**
 * LM Studio: first fact file, stale-facts batch 1 (catalog audit 17),
 * 2026-10-29. Read twice on lmstudio.ai. The local app stays free,
 * including for work; paid plans now add cloud features (hosted open
 * models, fuller web search). Usage allowances are relative ("5×"), not
 * published as numbers.
 */
export default {
  slug: "lm-studio",
  lifecycle: "active",
  company: {
    value: "Element Labs",
    note: "App terms: \"Element Labs, Inc.\"; the licence covers \"personal and / or internal business purposes\".",
    sourceUrl: "https://lmstudio.ai/app-terms",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Free: run local models with llama.cpp and MLX, the Bionic agent, offline voice transcription, LM Link for up to 5 devices, and limited web search. Free for work use too.",
    },
    sourceUrl: "https://lmstudio.ai/pricing",
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
        limits: "Local models; Bionic agent; LM Link for up to 5 devices; limited web search",
      },
      {
        name: "Bionic+",
        price: "$20",
        period: "month",
        limits: "US-hosted open models; discounted bulk tokens; web search and page extraction",
      },
      {
        name: "Pro",
        price: "$100",
        period: "month",
        limits: "5x the usage limits; discounted bulk tokens; early access to new features",
      },
    ],
    note: "USD, as of 2026-10-29. No yearly billing shown. Cloud credits cover usage beyond a plan's allowance. Teams: centralized billing with inference credits; team subscriptions \"coming soon\". No Enterprise plan is listed on the pricing page (the footer links \"Enterprise Solutions\").",
    sourceUrl: "https://lmstudio.ai/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  privacy: {
    value: { trainsOnData: false, policyUrl: "https://lmstudio.ai/privacy" },
    note: "Privacy page: local use is saved on your device; for cloud features \"your data is not used for training or any other purpose\". Homepage: \"Our cloud services are Zero Data Retention (ZDR) across the board.\"",
    sourceUrl: "https://lmstudio.ai/privacy",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary:
        "First fact file: free local app plus paid cloud plans Bionic+ $20/mo and Pro $100/mo. The catalog had \"Free, all features included; business licence separate\".",
    },
  ],
} satisfies ToolFacts;
