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
    sourceUrl: "https://qwen.ai/",
    sourceKind: "product-page",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
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
  features: {
    value: [
      "Qwen4-Max-Preview (model id qwen4-max-preview) is a time-limited preview on Alibaba Cloud Model Studio, Token Plan only. Pay-as-you-go is not supported. The preview runs from 10:00 on 2026-11-11 to 24:00 on 2026-11-25 (UTC+8), and the page says the model is retired after it ends. Context length is 1M tokens. Maximum output is 393,216 tokens, shared by thinking and the final answer. Recorded here, not as a new row, because the preview ends.",
    ],
    note: "Alibaba Cloud Model Studio page, checked 2026-11-12. The preview end is 24:00 on 2026-11-25 (UTC+8).",
    sourceUrl: "https://www.alibabacloud.com/help/en/model-studio/qwen4-max-preview",
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
