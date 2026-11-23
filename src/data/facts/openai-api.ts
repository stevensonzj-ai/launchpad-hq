import type { ToolFacts } from "./types";

const DECISIONS_API_URL = "https://openai.com/index/decisions-api";

export default {
  slug: "openai-api",
  lifecycle: "active",
  models: {
    value: [
      "GPT-6 Astra (gpt-6-astra)",
      "GPT-6.1 Sol (gpt-6.1-sol)",
      "GPT-6 Luna (gpt-6-luna)",
    ],
    sourceUrl: "https://developers.openai.com/api/docs/models",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  apiPricing: {
    value:
      "Decisions API (GPT-6 Luna), USD per 1M tokens: $0.10 input, $0.01 cached input. You only pay for input tokens; there are no output-token charges. GPT-Live-1.1 (gpt-live-1.1), read on the model page on 2026-11-23, is billed by session duration: $0.05 per active minute and $0.02 per standby minute. The standby rate applies to WebRTC sessions while inference is paused. Backend model and tool usage is billed separately. The model page does not list a per-token price. The API changelog dates the model to 2026-11-19.",
    note: "Decisions rates were not re-read on 2026-11-23, so checkedAt stays 2026-11-20. GPT-Live-1.1 duration rates were read that day on https://developers.openai.com/api/docs/models/gpt-live-1.1. The changelog entry is https://developers.openai.com/api/docs/changelog.",
    sourceUrl: DECISIONS_API_URL,
    sourceKind: "announcement",
    checkedAt: "2026-11-20",
    gatheredBy: "claude",
    verifiedBy: "ra-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  features: {
    value: [
      "Decisions API: generally available 2026-10-22, runs on GPT-6 Luna via its own Decisions endpoint. It answers questions with bounded answers, returning a probability, a choice or a score, with up to 400 questions per request. Regional processing is available in the US and EU.",
    ],
    sourceUrl: DECISIONS_API_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-11-23",
      field: "apiPricing",
      summary:
        "X-watch: GPT-Live-1.1 is billed at $0.05 per active minute and $0.02 per standby minute. The changelog dates it to 2026-11-19. No per-token price on the model page. Decisions rates were not re-read.",
    },
    {
      date: "2026-10-26",
      field: "features",
      summary: "Added the Decisions API (generally available 2026-10-22, GPT-6 Luna, its own endpoint) and its input-only token prices.",
    },
    {
      date: "2026-10-14",
      field: "models",
      summary:
        "Recorded GPT-6 Astra as the API flagship, GPT-6.1 Sol for balanced cost, and GPT-6 Luna for high-volume work.",
    },
  ],
} satisfies ToolFacts;
