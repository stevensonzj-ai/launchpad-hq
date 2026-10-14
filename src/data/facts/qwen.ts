import type { ToolFacts } from "./types";

export default {
  slug: "qwen",
  lifecycle: "active",
  company: {
    value: "Alibaba Cloud",
    note: 'Site footer: "Powered by Alibaba Cloud".',
    sourceUrl: "https://qwen.ai/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "free to use, open to all",
    },
    sourceUrl: "https://qwen.ai/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  apiPricing: {
    value: "Sold separately through Qwen Cloud.",
    sourceUrl: "https://qwen.ai/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  platforms: {
    value: ["Web", "iOS", "Android", "macOS", "Windows"],
    note: 'From the footer "Try Qwen" list.',
    sourceUrl: "https://qwen.ai/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "freeTier",
      summary: "Consumer app is listed as free to use, open to all. API is sold separately through Qwen Cloud.",
    },
  ],
} satisfies ToolFacts;
