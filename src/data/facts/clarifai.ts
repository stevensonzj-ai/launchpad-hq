import type { ToolFacts } from "./types";

/**
 * Clarifai: unpublished (hidden), guide PR D, 2026-10-29. Reversible: delete
 * `visibility` (and "clarifai" from RETIRED_GUIDE_SLUGS, then restore the
 * guide from src/data/tutorials/retired/) if the platform comes back. No
 * database change hides it.
 *
 * Shutdown confirmed by the RA on 2026-10-29: final platform deprecation
 * July 13, 2026; the docs domain no longer resolves. Clarifai's own notice
 * is offline with the rest of its hosts, so that date could not be re-read
 * here (some secondary sources give July 17); it is attributed, not sourced
 * to Clarifai. Nebius's May 12, 2026 release (re-read 2026-10-29) is the
 * primary source for where the team and technology went: the core team
 * joined Nebius, which licenses Clarifai's inference technology and buys
 * its patent portfolio. It did not announce acquiring the company.
 */
export default {
  slug: "clarifai",
  lifecycle: "discontinued",
  visibility: "hidden",
  status: {
    value: {
      headline:
        "Clarifai has shut down its AI platform. Its core engineering and research team, led by founder and CEO Matthew Zeiler, joined Nebius, which announced on May 12, 2026 that it is licensing Clarifai's inference and compute orchestration technology.",
      details: [
        "Nebius also said it would acquire Clarifai's patent portfolio. It did not announce buying Clarifai itself, and the license excludes Clarifai's legacy computer vision models.",
        "Our research puts the platform's final deprecation on July 13, 2026. Clarifai's own notice can no longer be checked: when we looked on October 29, 2026, clarifai.com refused connections and docs.clarifai.com and api.clarifai.com did not resolve.",
      ],
      whatToDo:
        "Clarifai's API no longer answers, so anything built on it needs a new provider. We've taken its getting-started guide down.",
    },
    sourceUrl:
      "https://nebius.com/newsroom/nebius-welcomes-clarifai-s-core-team-and-licenses-inference-ip-to-strengthen-nebius-token-factory",
    checkedAt: "2026-10-29",
    gatheredBy: "ra",
    verifiedBy: "claude",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "lifecycle",
      summary:
        "Shutdown confirmed (final deprecation July 13, 2026, per RA); core team joined Nebius, which licenses Clarifai's inference IP. Marked discontinued; still hidden.",
    },
    {
      date: "2026-10-29",
      field: "visibility",
      summary: "Hidden (noindex, out of sitemap and listings) and guide retired: all Clarifai hosts unreachable, no shutdown notice.",
    },
  ],
} satisfies ToolFacts;
