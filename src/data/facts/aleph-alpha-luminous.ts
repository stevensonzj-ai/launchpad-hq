import type { ToolFacts } from "./types";

/**
 * Aleph Alpha: Cohere business-combination agreement (2026-09-16), pending. Luminous/PhariaAI claims NOT confirmed officially, so not stated.
 * Catalog accuracy cleanup, 2026-10-20 (docs/planning/2026-10-autonomous-business/
 * claude-handoffs/2026-10-20-catalog-cleanup-brief.md). Sources re-fetched that day.
 */
export default {
  slug: "aleph-alpha-luminous",
  lifecycle: "active",
  status: {
    value: {
      headline: "On September 16, 2026, Cohere announced a definitive business combination agreement with Aleph Alpha. Cohere says the deal still needs final regulatory approvals and is expected to close later in 2026.",
    },
    sourceUrl: "https://cohere.com/blog/cohere-and-aleph-alpha-sign-agreement",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-20",
      field: "status",
      summary: "Added dated note on the pending Cohere deal.",
    },
  ],
} satisfies ToolFacts;
