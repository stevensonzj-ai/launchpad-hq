# Launchpad HQ MCP connector (v0.1)

A free, anonymous, **read-only** [Model Context Protocol](https://modelcontextprotocol.io) server that lets AI assistants look up Launchpad HQ's catalog of AI tools.

- **URL:** `https://www.launchpadhq.io/mcp`
- **Transport:** Streamable HTTP (stateless), served by `mcp-handler` 2.1.1 on `@modelcontextprotocol/server` 2.4.0. Modern clients get the 2026-07-28 protocol (`server/discover` advertises it). Older clients that send an `initialize` handshake are negotiated to a 2025 version (2025-11-25 or 2025-06-18). `src/lib/mcp/server.test.ts` checks both.
- **Auth:** none. No accounts, and no writes.
- **Support:** launchpadhq.admin@gmail.com

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

## Limits

- **Inputs:** strings are capped at 200 characters. `limit` is at most 10 (default 5). `compare` takes 2–4 tools.
- **Catalog caching:** the catalog is read once per server instance and cached for 10 minutes.
- **Rate limiting:** handled at the edge by a Vercel firewall rule (per IP), not in this code. The rule starts in log-only mode.

## Privacy

Each tool call writes one log line with these fields only:

| Field | Contents |
|---|---|
| `evt` | Always `mcp_call` |
| `ts` | Timestamp |
| `tool` | Tool name |
| `query` | The task or platform input, truncated to 200 characters |
| `result_count` | Number of results |
| `latency_ms` | Response time |
| `ok` | Whether the call succeeded |
| `client` | The MCP client's self-reported name and version, if sent |

It does **not** log IP addresses, headers, user agents, cookies or request bodies. See the [privacy policy](https://www.launchpadhq.io/privacy).

## Code

- `src/app/mcp/route.ts`: the endpoint
- `src/lib/mcp/`: the server, the pure tool logic, schemas, the catalog loader and logging
- `server.json`: MCP Registry metadata. The name is a placeholder and it is **not published**.
