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
    verifiedBy: "pending",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Consumer app is free",
    },
    sourceUrl: "https://www.deepseek.com/en",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  apiPricing: {
    value:
      "Per 1M tokens at peak rate (off-peak is half). Flash: input $0.30 (cache miss) / $0.006 (cache hit); output $1.20. V4-Pro: input $1.32 (cache miss) / $0.044 (cache hit); output $3.96. Context window 1M.",
    sourceUrl: "https://api-docs.deepseek.com/quick_start/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  platforms: {
    value: ["Web", "Mobile", "Harness Desktop"],
    sourceUrl: "https://www.deepseek.com/en",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  models: {
    value: ["DeepSeek-V4.1-Flash", "DeepSeek-V4-Pro-0813"],
    note: "DeepSeek-V4.1-Flash (released) and DeepSeek-V4-Pro-0813.",
    sourceUrl: "https://www.deepseek.com/en",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "apiPricing",
      summary: "Recorded Flash and V4-Pro peak API rates per 1M tokens. Consumer app listed as free.",
    },
  ],
} satisfies ToolFacts;
