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
      "Decisions API (GPT-6 Luna), USD per 1M tokens: $0.10 input, $0.01 cached input. You only pay for input tokens; there are no output-token charges. GPT-Live-1.1 (gpt-live-1.1), read on the model page on 2026-11-23, is billed by session duration: $0.05 per active minute and $0.02 per standby minute. The standby rate applies to WebRTC sessions while inference is paused. Backend model and tool usage is billed separately. The model page does not list a per-token price. The API changelog dates the model to 2026-11-19. Healthcare model configurations, read on 2026-11-26: the Help Center article does not list a price. The API pricing page lists Standard rates per 1M tokens of $8.00 input, $40.00 output, and $0.40 cached input for gpt-6.2-astra-healthcare, and $2.00 input, $10.00 output, and $0.10 cached input for gpt-6.2-sol-healthcare. That Standard table's 30m write and 12h write columns list $10.00 and $20.00 for gpt-6.2-astra-healthcare, and $2.50 and $5.00 for gpt-6.2-sol-healthcare. Fast rates on that page are $16.00 input, $80.00 output, and $0.80 cached input for gpt-6.2-astra-healthcare, and $4.00 input, $20.00 output, and $0.20 cached input for gpt-6.2-sol-healthcare. The page says promotional pricing for GPT-6.2 Astra Healthcare and GPT-6.2 Sol Healthcare, among other named models, is available at least through December 31, 2026. It does not say these Standard or Fast rates end on that date.",
    note: "Decisions rates were not re-read on 2026-11-26, so checkedAt stays 2026-11-20. GPT-Live-1.1 duration rates were read on 2026-11-23 at https://developers.openai.com/api/docs/models/gpt-live-1.1. Healthcare rates were read on 2026-11-26 at https://developers.openai.com/api/docs/pricing#healthcare-model-configurations. The help article is https://help.openai.com/en/articles/20001656-healthcare-model-configurations-in-the-openai-api.",
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
      "Healthcare model configurations are available to API organizations. A ChatGPT for Healthcare or ChatGPT Enterprise workspace is not required. The Help Center article says to pass a supported healthcare model ID, for example gpt-6.2-astra-healthcare, in a Responses API request, and that web search must be enabled to use the healthcare search index. The article says access does not by itself authorize protected health information, and that processing it requires an applicable Business Associate Agreement. The article does not name gpt-6.2-sol-healthcare and does not print a calendar date. The API pricing page lists gpt-6.2-sol-healthcare next to gpt-6.2-astra-healthcare. Rates are on the API pricing fact.",
    ],
    note: "The healthcare sentence was read 2026-11-26 at https://help.openai.com/en/articles/20001656-healthcare-model-configurations-in-the-openai-api and https://developers.openai.com/api/docs/pricing#healthcare-model-configurations. The Decisions API sentence was not re-read.",
    sourceUrl: DECISIONS_API_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-11-26",
      field: "apiPricing",
      summary:
        "X-watch: healthcare configurations. The help article names gpt-6.2-astra-healthcare as a Responses API example and does not name gpt-6.2-sol-healthcare or a price. The pricing page lists both IDs. Standard per 1M tokens is $8.00 / $40.00 / $0.40 cached for astra and $2.00 / $10.00 / $0.10 cached for sol. Promotional pricing for those names is available at least through December 31, 2026; the page does not say the listed rates end that day. Decisions and GPT-Live-1.1 rates were not re-read.",
    },
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
