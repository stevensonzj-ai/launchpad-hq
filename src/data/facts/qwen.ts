import type { ToolFacts } from "./types";

export default {
  slug: "qwen",
  lifecycle: "active",
  company: {
    value: "Powered by Alibaba Cloud",
    sourceUrl: "https://qwen.ai/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "free to use, open to all",
    },
    note: "Recheck 2026-11-14: qwen.ai/ visible text did not state that the product is free to use or open to all. This line stays as last recorded on 2026-10-14.",
    sourceUrl: "https://qwen.ai/",
    sourceKind: "product-page",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  platforms: {
    value: ["Web", "iOS", "Android", "macOS", "Windows"],
    note: 'From the footer "Try Qwen" list.',
    sourceUrl: "https://qwen.ai/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  apiPricing: {
    value:
      "Qwen4-Max (qwen4-max), per 1M tokens, same price in thinking and non-thinking modes, with no input-length tiers. International (Singapore): $1.50 input and $4.50 output; cache read $0.075. Beijing and Global (Frankfurt, Hong Kong, Tokyo, and US Virginia): $1.413 input and $4.24 output; cache read $0.071. The Singapore free quota is 1 million tokens, valid for 90 days from the later of Model Studio activation, model release, or application approval. The pricing page says other regions have no free quota.",
    note: "QwenCloud pricing page, checked 2026-11-16. The model page agrees on the $1.50 / $4.50 and $1.413 / $4.24 rates and says batch inference is not supported. Cache-write prices on the same table were not copied here.",
    sourceUrl: "https://docs.qwencloud.com/developer-guides/getting-started/pricing",
    checkedAt: "2026-11-16",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-16",
    status: "verified",
  },
  features: {
    value: [
      "Qwen4-Max (model id qwen4-max) is the production model. The preview page, re-read 2026-11-16, says it is available and recommended. Context length is 1,000,000 tokens. Input is text, image, and video; output is text. The model page says batch inference is not supported. Recorded on this row, not as a new row.",
      "Qwen4-Max-Preview (model id qwen4-max-preview) is a time-limited preview on Alibaba Cloud Model Studio, Token Plan only. Pay-as-you-go is not supported. The preview runs from 10:00 on 2026-11-11 to 24:00 on 2026-11-25 (UTC+8), and the page says the model is retired after it ends. Context length is 1M tokens. Maximum output is 393,216 tokens, shared by thinking and the final answer. Recorded here, not as a new row, because the preview ends.",
    ],
    note: "Production model page and the preview page, both re-read 2026-11-16. The preview end is still 24:00 on 2026-11-25 (UTC+8). Prices are on apiPricing.",
    sourceUrl: "https://www.alibabacloud.com/help/en/model-studio/qwen4-max",
    sourceKind: "announcement",
    checkedAt: "2026-11-16",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-16",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-11-16",
      field: "apiPricing",
      summary:
        "X-watch: Qwen4-Max is the production model. Singapore $1.50 / $4.50 per 1M, other listed regions $1.413 / $4.24, cache read $0.075 or $0.071. Preview still retires at 24:00 on 2026-11-25 (UTC+8).",
    },
    {
      date: "2026-11-12",
      field: "features",
      summary:
        "X-watch: Qwen4-Max-Preview is Token Plan only from 2026-11-11 10:00 through 2026-11-25 24:00 (UTC+8), then retired. Noted on this row instead of a new row.",
    },
    {
      date: "2026-10-14",
      field: "company",
      summary: 'Quoted footer "Powered by Alibaba Cloud". Dropped inferred Qwen Cloud API pricing.',
    },
  ],
} satisfies ToolFacts;
