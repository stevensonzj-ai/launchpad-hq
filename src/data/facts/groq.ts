import type { ToolFacts } from "./types";

/**
 * Groq: first fact file, stale-facts batch 1 (catalog audit 17), 2026-10-29.
 * Read on Groq's own pages (groq.com newsroom, console.groq.com docs) and
 * re-read by a second reader the same day. The batch-1 readers could not
 * tell which rate-limits tab the figures came from, and read per-token
 * prices once. The Research Analyst's browser check the same day read the
 * Free Plan tab of the rate-limits page and the models page; the free-tier
 * limits and per-token prices are now verified.
 */
export default {
  slug: "groq",
  lifecycle: "active",
  company: {
    value: "Groq",
    note: "Groq newsroom, 2025-12-24: Groq \"entered into a non-exclusive licensing agreement with Nvidia\"; Groq's founder and president joined Nvidia, Simon Edwards became CEO, and \"GroqCloud will continue to operate without interruption.\" A licensing deal, not an acquisition.",
    sourceUrl: "https://groq.com/newsroom/groq-and-nvidia-enter-non-exclusive-inference-technology-licensing-agreement-to-accelerate-ai-inference-at-global-scale",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "A free tier with per-model rate limits: GPT OSS 120B, GPT OSS 20B and Qwen3.8-27B each 30 requests a minute, 1,000 a day, 8,000 tokens a minute and 200,000 a day; Whisper large v3 20 requests a minute, 2,000 a day. The paid Developer tier is pay as you go and needs a payment method.",
    },
    note: "Rate limits, Free Plan tab (browser check, 2026-10-29); the docs note \"there may be exceptions to these limits.\" Billing FAQ: you \"can downgrade to the Free tier at any time\"; Developer needs \"a valid payment method\".",
    sourceUrl: "https://console.groq.com/docs/rate-limits",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  apiPricing: {
    value: "Per 1M tokens, input / output: GPT OSS 120B $0.15 / $0.60; GPT OSS 20B $0.075 / $0.30; Qwen3.8-27B $0.80 / $4.00. Llama 3.1 8B and 3.3 70B are Contact Sales / Enterprise.",
    note: "Browser-verified on the models page, 2026-10-29; groq.com/pricing redirects to the homepage.",
    sourceUrl: "https://console.groq.com/docs/models",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  privacy: {
    value: {
      retention: "Inference requests are not retained by default; logs are kept for up to 30 days",
      policyUrl: "https://groq.com/privacy-policy",
    },
    note: "\"By default, Groq does not retain customer data for inference requests.\" Zero Data Retention is available. A statement on training with customer data was not found.",
    sourceUrl: "https://console.groq.com/docs/your-data",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "freeTier",
      summary:
        "First fact file: free tier confirmed, paid tier is Developer (pay as you go), not \"Developer: $0\"; Nvidia licensing deal (2025-12-24) noted. Free-tier rate limits and per-token prices left unverified.",
    },
    {
      date: "2026-10-29",
      field: "freeTier",
      summary:
        "Browser check: free-tier limits (30 requests a minute, 1,000 a day, 8,000 tokens a minute, 200,000 a day on the GPT OSS and Qwen models) and per-token prices verified.",
    },
  ],
} satisfies ToolFacts;
