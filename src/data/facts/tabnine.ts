import type { ToolFacts } from "./types";

/**
 * Tabnine: acquired by Tricentis (announced 2026-07-30). tabnine.com redirects to tricentis.com/products.
 * Catalog accuracy cleanup, 2026-10-20 (docs/planning/2026-10-autonomous-business/
 * claude-handoffs/2026-10-20-catalog-cleanup-brief.md). Sources re-fetched that day.
 */
export default {
  slug: "tabnine",
  lifecycle: "acquired",
  status: {
    value: {
      headline: "Tricentis announced on July 30, 2026 that it has acquired Tabnine and will build Tabnine's Enterprise Context Engine into its Agentic Quality Engineering Platform.",
      details: [
        "tabnine.com now redirects to Tricentis's product pages, and Tricentis has not said what happens to the standalone Tabnine coding assistant.",
      ],
      whatToDo: "If you pay for Tabnine, confirm your plan's future with Tabnine or Tricentis before relying on it for new work.",
    },
    sourceUrl: "https://www.tricentis.com/news/tricentis-acquires-tabnine",
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
      summary: "Marked acquired by Tricentis.",
    },
  ],
} satisfies ToolFacts;
