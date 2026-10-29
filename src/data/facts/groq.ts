import type { ToolFacts } from "./types";

/**
 * Groq: first fact file, stale-facts batch 1 (catalog audit 17), 2026-10-29.
 * Read on Groq's own pages (groq.com newsroom, console.groq.com docs) and
 * re-read by a second reader the same day. The free tier's per-model rate
 * limits are not recorded: the rate-limits page shows Free and Developer
 * tabs and the second reader could not tell which tab the figures came
 * from. Per-token prices were read once (docs/models), so apiPricing stays
 * unverified.
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
      summary: "A free tier with per-model rate limits on requests and tokens. The paid Developer tier is pay as you go and needs a payment method; downgrading returns an account to the Free tier's limits.",
    },
    note: "Billing FAQ: you \"can downgrade to the Free tier at any time\"; Developer needs \"a valid payment method\". Free-tier rate-limit figures are not recorded (see file comment).",
    sourceUrl: "https://console.groq.com/docs/billing-faqs",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  apiPricing: {
    value: "Per 1M tokens, for example openai/gpt-oss-120b $0.15 input / $0.60 output and openai/gpt-oss-20b $0.075 input / $0.30 output (Production Models table).",
    note: "Read once on the models page; groq.com/pricing lists no per-token prices.",
    sourceUrl: "https://console.groq.com/docs/models",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
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
  ],
} satisfies ToolFacts;
