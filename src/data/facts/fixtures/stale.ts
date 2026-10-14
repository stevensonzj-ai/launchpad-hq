import type { ToolFacts } from "../types";

export const staleFacts = {
  slug: "fixture-stale",
  lifecycle: "active",
  verdict: {
    value: "Stale non-price fact for the 60-day gate.",
    sourceUrl: "https://example.com/fixture-stale",
    checkedAt: "2026-07-01",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  plans: {
    value: [{ name: "Plus", price: "$20", period: "month", limits: "standard" }],
    sourceUrl: "https://example.com/fixture-stale/pricing",
    checkedAt: "2026-08-20",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
} satisfies ToolFacts;
