import type { ToolFacts } from "./types";

/**
 * vLLM: first fact file, stale-facts batch 2 (catalog audit 18), 2026-10-29.
 * Read twice on vllm.ai and the official GitHub repository. Free (Apache
 * 2.0). A community project that started at UC Berkeley's Sky Computing Lab
 * and is now maintained by many institutions and companies.
 */
export default {
  slug: "vllm",
  lifecycle: "active",
  officialUrl: {
    value: "https://vllm.ai",
    sourceUrl: "https://github.com/vllm-project/vllm",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  company: {
    value: "vLLM project (open source; started at UC Berkeley)",
    note: "\"Originally developed in the Sky Computing Lab at UC Berkeley\"; maintained by \"many dozens of academic institutions and companies\". vllm.ai links to the PyTorch Foundation without describing the relationship.",
    sourceUrl: "https://github.com/vllm-project/vllm",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Free and open source (Apache 2.0). Self-hosted on your own GPUs.",
    },
    sourceUrl: "https://github.com/vllm-project/vllm",
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
      summary: "First fact file: free, Apache 2.0; maker is the vLLM community project (started at UC Berkeley).",
    },
  ],
} satisfies ToolFacts;
