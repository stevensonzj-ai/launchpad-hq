# 2026-11-08 — cursor — MCP rejected-origin log

**Decided:** Owner-approved privacy fix. A rejected `/mcp` Origin is still a 403 with the same JSON-RPC body. The log line keeps `evt: "mcp_origin_rejected"` and drops `origin_host`. `guardMcpRequest` has no request ID in scope (tool-call IDs are minted later in `log.ts`), so `request_id` is not added. Allowlist, status codes, and the endpoint are unchanged.

**Changed:**
- `src/lib/mcp/request-guard.ts` — log object is `{ evt: "mcp_origin_rejected" }`. Removed unused `originHost`. Comment no longer says the host is logged.
- `src/lib/mcp/request-guard.test.ts` — same 403 body; logged object has no `origin_host` and does not contain the rejected origin or other header values.
- Scan of `src/lib/mcp/` and `src/app/mcp/`: no other production log, `console`, or Sentry call includes origin, user-agent, IP, headers, query text, or client name. `log.ts` / `runTool` still log only `evt`, `request_id`, `tool`, `result_count`, `latency_ms`, `ok`. `stress-replay.test.ts` prints grader notes to the test runner and, on a non-PASS, the first 80 characters of a tool error. That is test stdout, not header logging, and was left as-is. `clientInfo` appears only in test request bodies.

**Checks:** `npm test` 1463 pass, 0 fail. `npm run typecheck` pass. `npm run lint` exit 0 (5 pre-existing warnings in quiz results, discussions, and prompts). `next build` not run; `/privacy` prerender without `DATABASE_URL` is a known failure.

**Open / Zach:** Nothing to decide. Do not merge until you review. PR #165 (https://github.com/stevensonzj-ai/launchpad-hq/pull/165). Privacy change: `4b33462`.
