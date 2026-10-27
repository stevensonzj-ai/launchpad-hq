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
  changelog: [
    {
      date: "2026-10-14",
      field: "company",
      summary: 'Quoted footer "Powered by Alibaba Cloud". Dropped inferred Qwen Cloud API pricing.',
    },
  ],
} satisfies ToolFacts;
