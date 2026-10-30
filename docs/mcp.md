# Launchpad HQ MCP connector (v0.1)

A free, anonymous, **read-only** [Model Context Protocol](https://modelcontextprotocol.io) server that lets AI assistants look up Launchpad HQ's catalog of AI tools.

- **URL:** `https://www.launchpadhq.io/mcp`
- **Transport:** Streamable HTTP (stateless), served by `mcp-handler` 2.1.1 on `@modelcontextprotocol/server` 2.4.0. Modern clients get the 2026-07-28 protocol (`server/discover` advertises it). Older clients that send an `initialize` handshake are negotiated to a 2025 version (2025-11-25 or 2025-06-18). `src/lib/mcp/server.test.ts` checks both.
- **Auth:** none. No accounts, and no writes.
- **Support:** launchpadhq.admin@gmail.com
- **Docs:** [launchpadhq.io/connector](https://www.launchpadhq.io/connector) (plain-English setup guide)

## Tools

| Tool | What it does |
|---|---|
| `search_tools` | Finds catalog tools for a task. Optional filters: budget, skill level, platform. |
| `compare` | Compares 2–4 tools: plans, API pricing, usage limits and platforms. |
| `get_pricing_facts` | Pricing and free tier for one tool. Verified facts come first. |
| `find_free_alternatives` | Free or freemium alternatives to a tool. |

All four tools are annotated `readOnlyHint: true`, `destructiveHint: false`, `idempotentHint: true` and `openWorldHint: false`.

## How to read the results

- **`verification`**
  - `verified`: the fact comes from the vendor's own page (`source_url`) and was checked on `as_of`.
  - `unverified`: the fact is recorded but not yet second-checked.
  - `catalog_only`: unverified catalog text. Its `source_url` is always `null`, and no source is invented.
- **`data_as_of`:** the newest date among the returned items.
- **`sponsored`:** always `false`. Sponsorship never affects ranking, inclusion or ordering. The MCP code does not read sponsor data, and tests enforce this.
- **Excluded:** tools marked discontinued are left out of search and alternatives. `get_pricing_facts` still returns them, with `lifecycle: "discontinued"`.
- **Links:** results link to `https://www.launchpadhq.io/platform/<slug>`.
- **`tasks`:** curated task tags (for example `cover-letter`, `resume`, `grammar-check`, `logo-design`), the same value as the feed's `tasks` field (schema 1.2). `null` when a tool has none.

## How search_tools ranks

Pure and deterministic (`src/lib/mcp/tools.ts`, `searchTools`); every point shows up in `match_reasons`.

- **Task tags** (`src/data/task-tags.ts`): the search's words are mapped to tasks ("cover letter", "job application" and "CV" mean cover-letter / resume; "logo" means logo-design). A tool tagged for a task scores 20 per task (6 for broad ones such as "writing"), so a task match always outranks a stray word match. Tags are curated per tool from its catalog row or official site; clinician-only, legal-only and research-paper tools carry no writing or career tags.
- **Phrases and words:** whole words only ("cover" does not match "discover"), with plural and accent folding ("résumés" = "resume"). A phrase from the search found as a phrase scores 3x the field weight (name 3, category 2, primary use 2, use cases 1, description 1); single words score the field weight. Filler words ("what", "help", "tool") are ignored; ambiguous words ("write", "letter", "free", "alternative") count only when nothing stronger matched, and the note then says the matches are loose.
- **Free and cheap wording:** "free", "for free", "no cost", "without paying" or "$0" in the task (with no `budget`) moves tools with a free plan up and paid-only tools down (±5); "cheap", "budget" or "low cost" favors free and freemium tools. Only `budget: "free"` filters.
- **Named tools:** "free alternative to Grammarly", "like X", "instead of X" and "X alternatives" return alternatives to X, never X: listed direct alternatives (+30), budget alternatives (+25), tools sharing X's tasks (12 per shared task, double for X's main task) and, for untagged tools, the same category (+3).
- **Names** (`compare`, `get_pricing_facts`, `find_free_alternatives`): slug, retired slug (the feed's `aliases`), exact name or display name, then a conservative key that ignores case, punctuation and one trailing "AI"/"app" ("Perplexity" finds Perplexity AI). If that key fits more than one tool, or none, the tool is reported as not found; there is no fuzzy matching.
- **`find_free_alternatives`:** free tier first (a sourced free-tier fact, then the catalog cost tier; the `why` line says whether the fact is verified or still unverified), then relation: direct alternative, budget alternative, shared task, same category. Same-category tools whose tasks share nothing specific with the target are left out (paper finders are not Grammarly alternatives).

## Limits

- **Inputs:** strings are capped at 200 characters. `limit` is at most 10 (default 5). `compare` takes 2–4 tools.
- **Requests:** bodies over 64 KB get 413 (checked before parsing, chunked bodies included). A JSON-RPC batch may hold at most 10 messages; larger batches get a -32600 error. A browser `Origin` must be our own site or a listed AI client (`MCP_ALLOWED_ORIGINS` in `src/lib/mcp/request-guard.ts`); others get 403, and only the origin's host is logged. Requests with no `Origin` (server-side clients such as Claude, ChatGPT and Grok connectors) are allowed.
- **Catalog caching:** the catalog comes from Next's shared data cache (tag `catalog`, 1 hour), with 5 minutes of per-instance memory in front. `/data/v1` reads the same loader. See [caching.md](caching.md).
- **Rate limiting:** No per-IP rate limit is applied yet; Vercel's platform DDoS protection covers abuse, and usage is monitored via logs.

## Privacy

Each tool call writes one log line with these fields only:

| Field | Contents |
|---|---|
| `evt` | Always `mcp_call` |
| `request_id` | Random UUID, new for each call |
| `tool` | Tool name |
| `result_count` | Number of results |
| `latency_ms` | Response time |
| `ok` | Whether the call succeeded |

It does **not** log what was sent to the tool (task text or tool names), the client's name, IP addresses, headers, user agents, cookies or request bodies. Sentry events for `/mcp` have the request body, query string, extras and console breadcrumbs removed (`src/lib/sentry-scrub.ts`). See the [privacy policy](https://www.launchpadhq.io/privacy#mcp).

## Code

- `src/app/mcp/route.ts`: the endpoint
- `src/lib/mcp/`: the server, the pure tool logic, schemas, the catalog loader and logging
- `server.json`: MCP Registry metadata. Registry name: `io.launchpadhq/launchpad-hq` (publishing pending).
