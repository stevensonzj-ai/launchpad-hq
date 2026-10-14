import type { ToolFacts } from "../types";

export const retiredTermFacts = {
  slug: "fixture-retired-term",
  lifecycle: "active",
  freeTier: {
    value: { available: true, summary: "Free tier includes GPT-4o mini." },
    sourceUrl: "https://example.com/fixture-retired/pricing",
    checkedAt: "2026-10-01",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
} satisfies ToolFacts;
