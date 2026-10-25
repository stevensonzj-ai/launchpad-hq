/**
 * Public changes to the /data/v1 feed, newest first. Served in
 * /data/v1/index.json (`changelog`), the OpenAPI description and
 * /developers. Add an entry for every change a consumer could notice.
 */
export type FeedChange = { date: string; summary: string };

export const FEED_CHANGELOG: readonly FeedChange[] = [
  {
    date: "2026-10-25",
    summary:
      'Errors: every error body is now { "error": { "code", "message", "resolution" } }. The codes keep the old values ("not_found", "unavailable"), so read error.code instead of comparing error to a string. Methods other than GET and HEAD return a JSON 405, bare /data/v1 redirects (308) to /data/v1/index.json, and unknown /data paths return the JSON 404.',
  },
  {
    date: "2026-10-25",
    summary: "OpenAPI: every operation has a unique operationId and a description. The index gains this changelog.",
  },
  {
    date: "2026-10-25",
    summary:
      'Tools: cost_tier can be "DISCONTINUED" (alongside FREE, FREEMIUM, PAID and ENTERPRISE) for products that have shut down. Those records also have lifecycle "discontinued" and no plans; status says what happened and what to use instead.',
  },
];
