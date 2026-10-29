import type { ToolFacts } from "./types";

/**
 * llama.cpp: first fact file, stale-facts batch 1 (catalog audit 17),
 * 2026-10-29. The repository moved to ggml-org/llama.cpp (the old
 * ggerganov address redirects), and ggml.ai says it was acquired by Hugging
 * Face in 2026. Read twice. Free, MIT.
 */
export default {
  slug: "llama-cpp",
  lifecycle: "active",
  officialUrl: {
    value: "https://github.com/ggml-org/llama.cpp",
    note: "github.com/ggerganov/llama.cpp redirects here.",
    sourceUrl: "https://github.com/ggml-org/llama.cpp",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  company: {
    value: "ggml.ai (Hugging Face)",
    note: "ggml.ai: \"founded in 2023 by Georgi Gerganov to support the development of ggml\"; \"The company was acquired by Hugging Face in 2026.\" No date or terms given.",
    sourceUrl: "https://ggml.ai/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: { available: true, summary: "Free and open source (MIT). Runs on your own hardware." },
    sourceUrl: "https://github.com/ggml-org/llama.cpp",
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "company",
      summary:
        "First fact file: repository now ggml-org/llama.cpp; ggml.ai acquired by Hugging Face in 2026; still free under MIT.",
    },
  ],
} satisfies ToolFacts;
