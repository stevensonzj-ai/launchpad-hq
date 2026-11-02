# 2026-11-01 — claude — catalog audit 30 (hedra hidden)

**Decided:** hide the platform "hedra" everywhere public because the vendor asked us to remove its name and trademark. Same pattern as audit 28: hide, never delete. Lifecycle stays "active"; nothing claims the product is gone.

**Changed (branch `audit-30-hedra`, uncommitted, not pushed):**
- `src/data/facts/hedra.ts`: `visibility: "hidden"` plus a header comment. `src/lib/catalog-redirects.ts`: hedra added to `HIDDEN_PAGE_REDIRECTS`, 301 to `/discover?category=video-creation-editing` (no avatar category exists).
- Guide moved to `src/data/tutorials/retired/hedra-getting-started.ts` and unregistered in `tutorials/index.ts`, so `/platform/hedra/guide` does not chain.
- `src/lib/mcp/catalog-snapshot.json`: hedra moved to `hidden_rows` via `scripts/mcp-snapshot/apply-audit-30-to-snapshot.ts` (run). `hidden_rows` is never read at runtime, so no MCP tool returns it.
- Logo entries removed from `catalog-logos.json` and `platform-logo-assets.json`; `public/images/platforms/hedra.png` git-removed.
- New `audit-30.ts` and `audit-30.test.ts` (in the `test` script), operator runner `scripts/update-catalog-audit-30.ts` (not run, no DB patches, reports 0 changes), npm `db:update-catalog-audit-30`.
- Tests: stress-replay A08 now uses heygen/synthesia/captions; golden-top5 A08 drops hedra; snapshot test row count 216 to 215.

**Open / Zach to decide:**
- Deploy, then `npm run cache:revalidate` so the platform row stops showing in DB-backed lists.
- The DB platform row still exists and is hidden through the fact file only.
- `scripts/seed-phase1-batch1-platforms.ts` and `stress-1026/observed-tools.json` still mention the name (not public); `src/data/facts/audit.ts` lists the slug in a cadence set. Say if you want these scrubbed too.
