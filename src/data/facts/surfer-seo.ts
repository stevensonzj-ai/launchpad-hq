import type { ToolFacts } from "./types";

/**
 * Surfer: joined Group Positive. Surfer's own post says "Surfer remains Surfer", so no rename (the audit's "Positive Surfer" was not confirmed).
 * Catalog accuracy cleanup, 2026-10-20 (docs/planning/2026-10-autonomous-business/
 * claude-handoffs/2026-10-20-catalog-cleanup-brief.md). Sources re-fetched that day.
 */
export default {
  slug: "surfer-seo",
  lifecycle: "acquired",
  status: {
    value: {
      headline: "Surfer has joined Group Positive. Surfer's announcement says the product keeps its name.",
    },
    sourceUrl: "https://surferseo.com/blog/surfer-acquisition",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-20",
      field: "lifecycle",
      summary: "Marked acquired by Group Positive; name unchanged.",
    },
  ],
} satisfies ToolFacts;
