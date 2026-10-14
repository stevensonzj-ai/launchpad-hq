import type { ToolFacts } from "./types";

export default {
  slug: "kimi",
  lifecycle: "active",
  company: {
    value: "Moonshot AI",
    note: 'Browser-verified 2026-10-14: footer "© 2026 Moonshot AI".',
    sourceUrl: "https://www.kimi.com/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  apiPricing: {
    value:
      "Pay-as-you-go, USD per 1M tokens. kimi-k3: $3 in / $15 out; cached input $0.30; 1M context. kimi-k2.7-code: $0.95 in / $4 out; cache hit $0.19. kimi-k2.7-code-highspeed: $1.90 in / $8 out. kimi-k2.6: $0.95 in / $4 out; cache hit $0.16. K2 models have 262K context.",
    note: "Browser-verified 2026-10-14 on platform.kimi.ai/docs/pricing/chat (per-token tables are JS-rendered). platform.moonshot.ai redirects here. No subscription. Consumer plans, free tier, and store links unpublished.",
    sourceUrl: "https://platform.kimi.ai/docs/pricing/chat",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  models: {
    value: [
      "Kimi K3 (in-house)",
      "Kimi K2.7 Code (in-house)",
      "Kimi K2.7 Code highspeed (in-house)",
      "Kimi K2.6 (in-house)",
    ],
    note: "Browser-verified 2026-10-14 on platform.kimi.ai/docs/pricing/chat. Docs also say “Kimi K3 has launched!”",
    sourceUrl: "https://platform.kimi.ai/docs/pricing/chat",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "apiPricing",
      summary:
        "API pay-as-you-go token prices from platform.kimi.ai (browser-verified). Company Moonshot AI. Consumer plans unpublished.",
    },
  ],
} satisfies ToolFacts;
