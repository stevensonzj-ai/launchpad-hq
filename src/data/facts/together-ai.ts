import type { ToolFacts } from "./types";

/**
 * together-ai: first fact file, source-verification batch (catalog audit 25),
 * 2026-10-30. Plans read on the vendor's own pricing page that day and
 * spot-checked against the page HTML.
 */
export default {
  slug: "together-ai",
  lifecycle: "active",
  plans: {
    value: [
      { name: "Serverless inference", price: "Pay per token", period: "", limits: "For example gpt-oss-120B $0.15 per 1M input and $0.60 per 1M output tokens; Llama 3 8B Instruct Lite $0.14 per 1M tokens" },
      { name: "Dedicated GPU (HGX H100)", price: "$5.49", period: "hour", limits: "Per GPU-hour" },
    ],
    note: "USD; rates vary by model. As of 2026-10-30.",
    sourceUrl: "https://www.together.ai/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-30",
    gatheredBy: "claude-sonnet",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  changelog: [
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://www.together.ai/pricing and price facts added with source and date." },
  ],
} satisfies ToolFacts;
