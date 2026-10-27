# 2026-10-27 — Claude — /mcp 10 s timeout fix

**Brief:** mcp-timeout-1027 (84 POST /mcp "Task timed out after 10 seconds", 10/26 3:42 PM to 10/27 6:33 AM CT).

## Decided / found
- Root cause: the MCP SDK (2.4.0) advertises `tools.listChanged: true` by default. A 2026-07-28 client's `subscriptions/listen` therefore gets an SSE stream that never closes, and the 10 s function limit kills it. Reproduced live: the listen request was held for 10.18 s. GET, DELETE, notifications, initialize and SSE-only Accept all answer in under 1 s.
- Fix: advertise `tools.listChanged: false` (the tool list is fixed per deploy). The SDK then acknowledges the listen request and closes the stream at once. Backstop: the route ends any SSE body at 8 s, below maxDuration.

## Changed (branch `fix/mcp-timeout-2026-10-27`)
- `src/lib/mcp/server.ts`: shared `MCP_HANDLER_OPTIONS`, including the capability fix.
- `src/lib/mcp/stream-cap.ts` (new): `capEventStream`.
- `src/app/mcp/route.ts`: uses both.
- `src/lib/mcp/hang-guard.test.ts` (new, in `npm test`): 12 tests, and the listen test fails on main's config.
- Server version stays 0.1.2. No dependency or env changes.

## Results
typecheck clean · lint 0 errors · 883/883 tests · check:labels 0 offenders.

## Open / for Zach
- Runtime logs were not pulled: no Vercel CLI on this PC, and the Vercel connector wasn't approved this session. Which client sends the listen requests is unconfirmed.
- `gh` isn't logged in (keyring failure), so the draft PR has to be opened by hand. Run `gh auth login` first.
- After deploy, run the listen curl in `REVIEW-SUMMARY-mcp-timeout-1027.md`. It should finish in under 1 s with a `complete` frame, and /mcp timeouts in the logs should stop.
