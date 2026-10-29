import type { ToolFacts } from "./types";

/**
 * Gemini Notebook, formerly NotebookLM (Google blog, 2026-07-16). notebooklm.google redirects to notebook.google.
 * Slug moved from notebooklm (301 in src/lib/catalog-redirects.ts; DB row
 * renamed by scripts/update-catalog-audit-15.ts), guide PR D, 2026-10-29.
 * Catalog accuracy cleanup, 2026-10-20 (docs/planning/2026-10-autonomous-business/
 * claude-handoffs/2026-10-20-catalog-cleanup-brief.md). Sources re-fetched that day.
 */
export default {
  slug: "gemini-notebook",
  lifecycle: "renamed",
  status: {
    value: {
      headline: "Google renamed NotebookLM to Gemini Notebook on July 16, 2026.",
      formerName: "NotebookLM",
      whatToDo: "Nothing to do. Old NotebookLM links redirect to the new address.",
    },
    sourceUrl: "https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  displayName: {
    value: "Gemini Notebook",
    sourceUrl: "https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  officialUrl: {
    value: "https://notebook.google/",
    sourceUrl: "https://notebook.google/",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "slug",
      summary: "Slug moved from notebooklm to gemini-notebook; guide renamed and swept of the old name.",
    },
    {
      date: "2026-10-20",
      field: "displayName",
      summary: "NotebookLM renamed Gemini Notebook; official link now notebook.google.",
    },
  ],
} satisfies ToolFacts;
