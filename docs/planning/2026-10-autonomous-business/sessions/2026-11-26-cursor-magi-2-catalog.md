# 2026-11-26 cursor: MAGI-2 catalog row

**Decided:** Add one platform row, slug `magi-2`, in Video Creation & Editing. Decart stays out. No other rows change. No Hedra. The only price is the API rate the pricing page states. No free tier and no consumer plan were invented. Open-sourcing stays a promise. Top-up is recorded as a disagreement between the pricing page and the billing page.

**Changed:** `scripts/sql/catalog-magi2-20261126.sql` (one guarded INSERT). Fact file `src/data/facts/magi-2.ts`, registered in `registry.ts`. Tests in `src/data/catalog-audits/magi-2-20261126.test.ts`. SQL was not run. Production was not connected. The category id was read from the launchpad-test database and guarded by the slug `video-creation-editing`.

**Left out:** Decart, until the Amazon agreement closes. A privacy rating. The Vidmuse link, which returned 403. A logo.

**Checks:** `npm test` 1701 pass, 0 fail. `npm run typecheck` passed. Build uses the launchpad-test host only.

**Open:** Zach runs Guarded SQL on the test target (`dry_run` first), then production. `/platform/magi-2` 404s until a redeploy after that production SQL.
