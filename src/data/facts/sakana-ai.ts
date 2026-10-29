import type { ToolFacts } from "./types";

/**
 * Sakana AI: first fact file, stale-facts batch 1 (catalog audit 17),
 * 2026-10-29. Fugu subscriptions and Fugu / Namazu API prices read twice on
 * sakana.ai. Neither page lists a free tier or trial; Sakana Chat's
 * pricing and the privacy policy were not read and are on the
 * Browser-check list, so no free-tier fact is recorded.
 */
export default {
  slug: "sakana-ai",
  lifecycle: "active",
  company: {
    value: "Sakana AI",
    sourceUrl: "https://sakana.ai/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Fugu Standard", price: "$20", period: "month", limits: "Baseline usage" },
      { name: "Fugu Pro", price: "$100", period: "month", limits: "10x Standard usage" },
      { name: "Fugu Max", price: "$200", period: "month", limits: "20x Standard usage" },
    ],
    note: "USD, as of 2026-10-29. Fugu is a model that orchestrates several frontier models, used through an OpenAI-compatible API. \"Not yet available in the EU/EEA.\"",
    sourceUrl: "https://sakana.ai/fugu/",
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  apiPricing: {
    value: "Per 1M tokens: Fugu Ultra $5 input / $30 output ($0.50 cached; higher above 272K context); Fugu Max $2 / $6; Namazu (Japanese-focused) $0.95 / $4.00, with no monthly fee.",
    note: "Namazu is not offered in the EU/EEA, UK or Switzerland.",
    sourceUrl: "https://sakana.ai/namazu/",
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  features: {
    value: [
      "Sakana Fugu: orchestrates several frontier models behind one API, sold as subscriptions or per token.",
      "Sakana Namazu: a Japanese-focused LLM API.",
      "Sakana Chat (chat.sakana.ai): a chat app in Japanese; pricing not checked.",
    ],
    sourceUrl: "https://sakana.ai/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary:
        "First fact file: Fugu subscriptions ($20 / $100 / $200 a month) and Fugu / Namazu API prices. Replaces \"no consumer product yet; API in development\".",
    },
  ],
} satisfies ToolFacts;
