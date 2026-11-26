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
  features: {
    value: [
      "Aleph Alpha's news post dated 23 November 2026 says Kolibri 1.1 is an open-weight language model, available on Hugging Face under the Apache 2.0 license, with 75 billion total parameters and 3 billion active parameters.",
    ],
    sourceUrl: "https://aleph-alpha.com/en/news/kolibri-1-1-release/",
    sourceKind: "announcement",
    checkedAt: "2026-11-26",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-11-26",
      field: "features",
      summary:
        "X-watch: Kolibri 1.1 is an open-weight model on Hugging Face under the Apache 2.0 license, 75 billion total parameters and 3 billion active. Recorded on this row.",
    },
    {
      date: "2026-10-20",
      field: "status",
      summary: "Added dated note on the pending Cohere deal.",
    },
  ],
} satisfies ToolFacts;
