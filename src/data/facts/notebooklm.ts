import type { ToolFacts } from "./types";

/**
 * NotebookLM: renamed Gemini Notebook (Google blog, 2026-07-16). notebooklm.google redirects to notebook.google.
 * Catalog accuracy cleanup, 2026-10-20 (docs/planning/2026-10-autonomous-business/
 * claude-handoffs/2026-10-20-catalog-cleanup-brief.md). Sources re-fetched that day.
 */
export default {
  slug: "notebooklm",
  lifecycle: "renamed",
  status: {
    value: {
      headline: "Google renamed NotebookLM to Gemini Notebook on July 16, 2026.",
      formerName: "NotebookLM",
      whatToDo: "Nothing to do. Old NotebookLM links redirect to the new address, and our getting-started guide still uses the NotebookLM name in places.",
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
      date: "2026-10-20",
      field: "displayName",
      summary: "NotebookLM renamed Gemini Notebook; official link now notebook.google.",
    },
  ],
} satisfies ToolFacts;
