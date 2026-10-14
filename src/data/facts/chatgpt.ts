import type { ToolFacts } from "./types";

export default {
  slug: "chatgpt",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "GPT-6 Luna (unlimited text chats, abuse guardrails apply)",
    },
    sourceUrl: "https://chatgpt.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  models: {
    value: ["GPT-6.1 Sol", "GPT-6 Astra", "GPT-6 Sol", "GPT-6 Luna"],
    label: "GPT-6 family",
    sourceUrl: "https://chatgpt.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-13",
      field: "freeTier",
      summary: "Free tier is GPT-6 Luna, from the official pricing model table.",
    },
  ],
} satisfies ToolFacts;
