import type { ToolFacts } from "./types";

/**
 * Clarifai: unpublished (hidden), guide PR D, 2026-10-29. Reversible: delete
 * `visibility` (and "clarifai" from RETIRED_GUIDE_SLUGS, then restore the
 * guide from src/data/tutorials/retired/) if the platform comes back. The
 * database row is left untouched. No shutdown has been announced, so the
 * lifecycle stays "active" and the notice reports only what we observed.
 */
export default {
  slug: "clarifai",
  lifecycle: "active",
  visibility: "hidden",
  status: {
    value: {
      headline: "Clarifai's website, documentation and API have not been reachable since at least September 19, 2026, and the company has not published a shutdown notice.",
      details: [
        "When we checked on October 29, 2026, clarifai.com and www.clarifai.com refused connections, and docs.clarifai.com and api.clarifai.com did not resolve.",
      ],
      whatToDo: "Don't build on Clarifai until its site and API answer again. We've taken its getting-started guide down and will restore it if the platform returns.",
    },
    sourceUrl: "https://clarifai.com/",
    checkedAt: "2026-10-29",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "visibility",
      summary: "Hidden (noindex, out of sitemap and listings) and guide retired: all Clarifai hosts unreachable, no shutdown notice.",
    },
  ],
} satisfies ToolFacts;
