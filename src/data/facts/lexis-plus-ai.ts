import type { ToolFacts } from "./types";

/**
 * Lexis+ AI: renamed Lexis+ with Protégé in February 2026 (LexisNexis FAQ).
 * Catalog accuracy cleanup, 2026-10-20 (docs/planning/2026-10-autonomous-business/
 * claude-handoffs/2026-10-20-catalog-cleanup-brief.md). Sources re-fetched that day.
 */
export default {
  slug: "lexis-plus-ai",
  lifecycle: "renamed",
  status: {
    value: {
      headline: "LexisNexis renamed Lexis+ AI to Lexis+ with Protégé in February 2026.",
      formerName: "Lexis+ AI",
    },
    sourceUrl: "https://www.lexisnexis.com/en-us/products/lexis-plus-ai.page",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  displayName: {
    value: "Lexis+ with Protégé",
    sourceUrl: "https://www.lexisnexis.com/en-us/products/lexis-plus-ai.page",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-20",
      field: "displayName",
      summary: "Lexis+ AI renamed Lexis+ with Protégé.",
    },
  ],
} satisfies ToolFacts;
