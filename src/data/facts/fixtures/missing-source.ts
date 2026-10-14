import type { ToolFacts } from "../types";

export const missingSourceFacts = {
  slug: "fixture-missing-source",
  lifecycle: "active",
  freeTier: {
    value: { available: true, summary: "Free plan with a daily cap." },
    sourceUrl: "",
    checkedAt: "2026-10-01",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
} satisfies ToolFacts;
