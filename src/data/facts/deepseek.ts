import type { ToolFacts } from "./types";

export default {
  slug: "deepseek",
  lifecycle: "active",
  company: {
    value: "DeepSeek",
    note: "© 2026 DeepSeek; site lists a Zhejiang, China ICP registration.",
    sourceUrl: "https://www.deepseek.com/en",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  apiPricing: {
    value:
      "Per 1M tokens at peak rate (off-peak is half). Flash: input $0.30 (cache miss) / $0.006 (cache hit); output $1.20. V4-Pro: input $1.32 (cache miss) / $0.044 (cache hit); output $3.96. Context window 1M.",
    sourceUrl: "https://api-docs.deepseek.com/quick_start/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  platforms: {
    value: ["Web", "Mobile", "Harness Desktop"],
    sourceUrl: "https://www.deepseek.com/en",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  models: {
    value: ["DeepSeek-V4.1-Flash-1017", "DeepSeek-V4-Pro-0813"],
    note: "DeepSeek-V4-Pro-0813 is named on the API pricing page, not on deepseek.com/en.",
    sourceUrl: "https://api-docs.deepseek.com/updates",
    checkedAt: "2026-10-17",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-17",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-17",
      field: "models",
      summary:
        "V4.1 Flash upgraded to DeepSeek-V4.1-Flash-1017 (api-docs changelog 2026-10-17); API id deepseek-flash and pricing unchanged.",
    },
    {
      date: "2026-10-14",
      field: "models",
      summary:
        "V4-Pro sourced from API pricing. Dropped inferred consumer-app free tier.",
    },
  ],
} satisfies ToolFacts;
