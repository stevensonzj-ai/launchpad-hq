# 2026-11-01 — Audit 29: unhide Poe

**Decided (Zach):** reverse the poe part of audit 28. Genspark and naver-hyperclova-x-cue stay hidden.

**Changed (branch `catalog/poe-unhide-1101`, local commit, not pushed):**
- `src/data/facts/poe.ts`: `visibility` removed, lifecycle active, changelog "Unhidden (Zach, 2026-11-01)".
- `src/lib/catalog-redirects.ts`: poe 301 removed.
- Guide restored to `src/data/tutorials/poe-getting-started.ts` (pre-audit-28 content, no prices) and re-registered.
- `audit-29.ts` + test, `scripts/update-catalog-audit-29.ts` (operator, not run), `apply-audit-29-to-snapshot.ts`, npm `db:update-catalog-audit-29`.
- Snapshot: poe back in `rows` (216 rows). Audit-28 data/tests no longer list poe as hidden.
- tsc, eslint, `audit:tutorials`, `npm test` (1228) all pass.

**Open / Zach to decide:**
- Run `db:update-catalog-audit-29` (dry-run on a Neon branch first), then production. The live DB still holds audit 27's poe text.
- Poe's `description` (DB + snapshot) still quotes third-party prices ($4.99, $19.99, $49.99, $99.99, $249.99). Not in audit 29's field list. Rewrite it as a follow-up if "price ladder removed" should hold site-wide.
