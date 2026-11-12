# 2026-11-12 — cursor — ChatGPT and Claude catalog copy

**Decided:** Zach approved this on Nov 12 at 1:22 PM CT. ChatGPT `primaryUse` and `upgradeTriggers` drop every Sora and GPT-4o mention. The replacements name no model versions. Claude `difficultyLevel` becomes BEGINNER. ChatGPT `description` stays as it is.

**Changed:** PR #168 (https://github.com/stevensonzj-ai/launchpad-hq/pull/168), branch `catalog/chatgpt-claude-copy-20261112`.

- `scripts/sql/catalog-copyfix-20261112.sql` — three idempotent UPDATEs. A second run changes 0 rows.
- `src/data/catalog-audits/copyfix-20261112.test.ts` — added to `npm test`.
- `package.json` — test script only.

**Copy search:** The card and the meta description are built from the database `primaryUse` (ChatGPT has no verdict overlay), so the SQL covers the page. Left unchanged, under `src/lib/mcp` (this task does not change `/mcp`): the tests-only catalog snapshot (`primaryUse` and `upgradeTriggers`) and `search-fixtures.ts` (`primaryUse`). No other ChatGPT tutorial, fact file, seed, or model-registry string names Sora or GPT-4o. Historical notes on other rows were left alone.

**Checks:** `npm test` 1483 pass, 0 fail. No database connection.

**Open / Zach:** launchpad-test is already clean. Merge to main, snapshot, then run Guarded SQL from main.
