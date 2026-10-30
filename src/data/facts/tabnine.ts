import type { ToolFacts } from "./types";

/**
 * Tabnine: acquired by Tricentis (announced 2026-07-30). tabnine.com and its
 * pricing and blog pages 301 to tricentis.com. No standalone Tabnine plans or
 * prices are published, so since guide PR D (2026-10-29) the page is a
 * "what happened" note: lifecycle "discontinued" (not sold to new users),
 * guide retired (301 to this page, text kept in src/data/tutorials/retired/),
 * and catalog audit 15 removes the row's pricing claims.
 *
 * Sources: Tricentis's release (re-read 2026-10-29). The Tabnine blog post
 * ("existing customers" keep support) was RA-verified on 2026-10-29; it now
 * redirects to tricentis.com/learn, so it is listed but could not be re-read.
 */
export default {
  slug: "tabnine",
  lifecycle: "discontinued",
  visibility: "hidden",
  status: {
    value: {
      headline:
        "Tricentis announced on July 30, 2026 that it has acquired Tabnine, the AI coding assistant, and is building Tabnine's Enterprise Context Engine into the Tricentis Agentic Quality Engineering Platform.",
      details: [
        "Tabnine is no longer sold as a standalone product: tabnine.com now redirects to Tricentis, and no Tabnine plans or prices are published. Tabnine said existing customers would continue to be supported.",
      ],
      whatToDo:
        "If you already pay for Tabnine, contact Tabnine or Tricentis support about your plan. If you're choosing a coding assistant now, pick one that is still sold on its own.",
      alternatives: [
        { slug: "github-copilot", name: "GitHub Copilot" },
        { slug: "cursor", name: "Cursor" },
        { slug: "amazon-q-developer", name: "Amazon Q Developer" },
      ],
      additionalSources: ["https://www.tabnine.com/blog/a-new-chapter-for-tabnine/"],
    },
    sourceUrl: "https://www.tricentis.com/news/tricentis-acquires-tabnine",
    checkedAt: "2026-10-30",
    gatheredBy: "ra",
    verifiedBy: "claude",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-30",
      field: "visibility",
      summary:
        "Hidden (catalog audit 26): tabnine.com and its pricing page redirect to Tricentis (products / contact-us), app.tabnine.com returns 503, and Tricentis sells no standalone Tabnine plan. /platform/tabnine 301s to /compare/cursor-vs-github-copilot.",
    },
    {
      date: "2026-10-29",
      field: "lifecycle",
      summary:
        "No standalone plans since the Tricentis acquisition: marked discontinued (not sold to new users), guide retired, pricing claims removed (audit 15). Existing customers stay supported.",
    },
    {
      date: "2026-10-20",
      field: "lifecycle",
      summary: "Marked acquired by Tricentis.",
    },
  ],
} satisfies ToolFacts;
