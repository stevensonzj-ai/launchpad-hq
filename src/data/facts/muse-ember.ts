import type { ToolFacts } from "./types";

const POST_URL = "https://dev.meta.ai/resources/blog/build-with-muse-ember";

/**
 * Muse Ember (new catalog row, X-watch 2026-11-12).
 * Gathered 2026-11-12 from Meta's launch post. That post is the product page
 * that states the API price and how to call the model.
 *
 * Pricing is the `apiPricing` block below. The $0.10 / $0.50 rate is only
 * the tier for prompts up to 200,000 input tokens.
 */
export default {
  slug: "muse-ember",
  lifecycle: "active",
  officialUrl: {
    value: POST_URL,
    note: "Launch post, which includes the API price, the model id muse-ember-1.0, and the OpenAI-compatible base URL https://api.meta.ai/v1. API keys are created at dev.meta.ai.",
    sourceUrl: POST_URL,
    checkedAt: "2026-11-12",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-12",
    status: "verified",
  },
  company: {
    value: "Meta",
    sourceUrl: POST_URL,
    checkedAt: "2026-11-12",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-12",
    status: "verified",
  },
  freeTier: {
    value: {
      available: false,
      summary:
        "The launch post does not state a free API tier. Muse Ember is included in all Muse Code subscription plans; those plan prices are not on the post.",
    },
    note: "Meta's launch post, checked 2026-11-12.",
    sourceUrl: POST_URL,
    sourceKind: "announcement",
    checkedAt: "2026-11-12",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-12",
    status: "verified",
  },
  apiPricing: {
    value:
      "Per 1M tokens: $0.10 input and $0.50 output for up to 200,000 input tokens, and $0.30 input and $1.50 output when the prompt is above 200,000 input tokens.",
    note: "Meta's launch post, checked 2026-11-12. The $0.10 / $0.50 rate is the tier up to 200,000 input tokens, not a cap on context. A maximum context window beyond that price break is not stated on the post.",
    sourceUrl: POST_URL,
    sourceKind: "announcement",
    checkedAt: "2026-11-12",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-12",
    status: "verified",
  },
  platforms: {
    value: ["Muse Code", "API (Meta Model API, muse-ember-1.0)"],
    note: "OpenAI-compatible base URL https://api.meta.ai/v1. Checked 2026-11-12.",
    sourceUrl: POST_URL,
    checkedAt: "2026-11-12",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-12",
    status: "verified",
  },
  features: {
    value: [
      "Smallest Muse model on the post, for high-volume coding subtasks, tool calls, and document summarization and extraction.",
      "Accepts text, image, audio, and video.",
      "The post says to pair it with Muse Wonder or Muse Spark when a workflow needs deeper planning.",
    ],
    note: "Meta's launch post, checked 2026-11-12.",
    sourceUrl: POST_URL,
    sourceKind: "announcement",
    checkedAt: "2026-11-12",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-12",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-11-12",
      field: "apiPricing",
      summary:
        "First fact file (new catalog row, X-watch 2026-11-12). $0.10 / $0.50 per 1M up to 200,000 input tokens, and $0.30 / $1.50 above that. No free API tier stated.",
    },
  ],
} satisfies ToolFacts;
