import type { ToolFacts } from "./types";

export default {
  slug: "anthropic-api",
  lifecycle: "active",
  company: {
    value: "Anthropic PBC",
    note: "© 2026 Anthropic PBC. anthropic.com/pricing redirects to claude.com/pricing.",
    sourceUrl: "https://claude.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  freeTier: {
    value: {
      available: false,
      summary: "No free API tier: you pay per token used. The free Claude chat plan is a separate product (see the Claude listing).",
    },
    note: "The API section of claude.com/pricing lists no free API tier or credits; the Free consumer plan lists no monthly API credits.",
    sourceUrl: "https://claude.com/pricing",
    checkedAt: "2026-10-25",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-10-25",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Claude Haiku 5.5", price: "$0.10 input / $0.50 output per million tokens", period: "", limits: "For prompts up to 100,000 tokens. Prompts over 100,000 tokens: $0.50 input / $2.50 output per million tokens" },
      { name: "Claude Sonnet 5.5", price: "$2 input / $10 output per million tokens", period: "", limits: "" },
      { name: "Claude Opus 5.5", price: "$4 input / $20 output per million tokens", period: "", limits: "Fast mode is 2x standard pricing" },
      { name: "Claude Fable 5.1", price: "$10 input / $50 output per million tokens", period: "", limits: "" },
    ],
    note: "Base input and output token prices (USD) from the model pricing table in Anthropic's detailed pricing docs, linked from claude.com/pricing. Cache writes and hits are priced separately. Batch API: 50% off input and output; US-only inference: 1.1x. Legacy models are listed on the same page. Consumer Claude plans (Pro, Max, Team) belong to the Claude listing, not this one.",
    sourceUrl: "https://platform.claude.com/docs/en/about-claude/pricing",
    checkedAt: "2026-10-25",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-10-25",
    status: "verified",
  },
  apiPricing: {
    value:
      "USD per million tokens, input / output. Claude Fable 5.1: $10 / $50. Claude Opus 5.5: $4 / $20. Claude Sonnet 5.5: $2 / $10. Claude Haiku 5.5: $0.10 / $0.50 for prompts up to 100,000 tokens; $0.50 / $2.50 for prompts over 100,000 tokens.",
    note: "Base input / output prices from the model pricing table. Batch API: 50% off. US-only inference: 1.1x (on Haiku 5.5 also applied to the over-100,000-token prices). Opus 5.5 fast mode: 2x. Cache-write and cache-hit rates are listed per model on the same page.",
    sourceUrl: "https://platform.claude.com/docs/en/about-claude/pricing",
    checkedAt: "2026-10-25",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-10-25",
    status: "verified",
  },
  platforms: {
    value: ["API", "Web", "Desktop", "Mobile"],
    note: "API; Claude chat on web, desktop and mobile.",
    sourceUrl: "https://claude.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  models: {
    value: [
      "Claude Fable 5.1 (in-house)",
      "Claude Opus 5.5 (in-house)",
      "Claude Sonnet 5.5 (in-house)",
      "Claude Haiku 5.5 (in-house)",
    ],
    note: "Legacy models (Opus 5/4.x, Sonnet 5/4.x) are still listed on the API pricing page.",
    sourceUrl: "https://platform.claude.com/docs/en/about-claude/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  features: {
    value: [
      "Claude Models on Google Cloud (Anthropic managed) is generally available as of 2026-10-22: Anthropic operates the service and acts as the data processor, billing goes on a single Google Cloud invoice, and usage draws down an existing Google Cloud commitment.",
    ],
    sourceUrl: "https://claude.com/resources/articles/claude-models-on-google-cloud-anthropic-managed",
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-26",
      field: "features",
      summary: "Added Claude Models on Google Cloud (Anthropic managed), generally available 2026-10-22, as a place to run Claude.",
    },
    {
      date: "2026-10-25",
      field: "plans",
      summary: "Re-checked every API price against the model pricing table on platform.claude.com/docs/en/about-claude/pricing; values unchanged, Haiku 5.5 tier wording now matches the docs (prompts up to / over 100,000 tokens).",
    },
    {
      date: "2026-10-25",
      field: "plans",
      summary: "Replaced consumer Claude plans (wrong listing) with per-token API prices from the API section of claude.com/pricing; no free API tier.",
    },
    {
      date: "2026-10-14",
      field: "apiPricing",
      summary:
        "RA: added Batch API: 50% off. No cache or multiplier details. Consumer plans from claude.com/pricing.",
    },
  ],
} satisfies ToolFacts;
