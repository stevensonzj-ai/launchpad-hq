/**
 * Public changes to the /data/v1 feed, newest first. Served in
 * /data/v1/index.json (`changelog`), the OpenAPI description and
 * /developers. Add an entry for every change a consumer could notice.
 */
export type FeedChange = { date: string; summary: string };

export const FEED_CHANGELOG: readonly FeedChange[] = [
  {
    date: "2026-10-26",
    summary:
      "Tools (schema_version 1.2): new optional tasks array, curated task tags such as cover-letter, resume, grammar-check and logo-design (null when a tool has none). The MCP connector's search_tools now ranks by these tasks and by whole words and phrases, so searches like \"cover letter\" or \"resume\" find writing tools instead of words that merely contain the letters; \"free\" in a search favors tools with a free plan; \"alternative to X\" returns alternatives rather than X; and tool names such as \"Perplexity\" resolve to their catalog entry.",
  },
  {
    date: "2026-10-26",
    summary:
      "Tools (schema_version 1.1): new optional features array (notable features and dated product changes, sourced like every other fact; null when a tool has none). Catalog batch: Kimi gains K3.1 Pro API prices, membership plans and the K2 retirement plan; new MiniMax record (M3.1 Flash API prices, open weights under MiniMax's own license); Ideogram gains Ideogram Vector API prices; OpenAI API gains the Decisions API (GPT-6 Luna) and its input-only token prices; Claude and Claude Code record the auto-mode default; Anthropic API records Claude Models on Google Cloud (Anthropic managed).",
  },
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
