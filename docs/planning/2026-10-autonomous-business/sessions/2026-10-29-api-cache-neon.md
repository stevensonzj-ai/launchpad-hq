# 2026-10-29 - Cache platform prompts/discussions APIs to cut Neon wakes

Why: prod Neon (free plan, 100 CU-h) was near its cap. Uncached anonymous GETs of /api/platforms/[slug]/prompts and /discussions kept waking the compute.

What:
- Both GETs now use unstable_cache (1h). The key is slug + normalized page/pageSize. Tags are platform-prompts:<slug> / platform-discussions:<slug> + catalog.
- Successful GETs send public, s-maxage=3600, stale-while-revalidate=86400. They read no auth and return APPROVED rows only. POSTs and /api/moderation send private, no-store.
- Approving or rejecting through /api/moderation expires the list tag and platform:<slug>. /api/revalidate with slugs also clears the list tags.
- Tabs skip the client fetch when the cached approved count is 0.
- Each cache miss logs one [db-wake] line (path, method, UA truncated to 80 chars).
- Votes and ratings update counts locally instead of refetching the cached list.

Checks: typecheck clean. Lint 0 errors (2 warnings that were already there). npm test 913/913 pass. No dev server was run and no DB was used. Built by headless Claude Code (opus) in worktree lp-api-cache-1029.

To verify on preview: curl -sI the prompts API twice. Expect x-vercel-cache HIT and no set-cookie (Clerk middleware could add one). Empty-tab state; vote/rate updating in place.

Caveats: up to ~1h of CDN staleness after an approval (revalidateTag does not purge the CDN). Prisma Studio approvals need `npm run cache:revalidate -- <slug>`. docs/caching.md still says the catalog TTL is 1h (it is 24h since #109).
