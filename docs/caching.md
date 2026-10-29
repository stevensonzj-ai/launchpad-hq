# Catalog caching (keeping Neon asleep)

Neon bills compute while the production endpoint is awake, and any query wakes it. It suspends after about 5 idle minutes. Public catalog reads therefore go through Next's shared data cache, so crawlers, agents and visitors are served from the cache and Postgres is left asleep.

## How it works

- **`src/lib/catalog-cache.ts`**: `cachedCatalogRead(name, read, slugTags?)` wraps a Prisma read in `unstable_cache`. This app does not enable Cache Components, so `"use cache"` isn't available. Every entry is tagged `catalog`, and per-platform reads also get `platform:<slug>`. `revalidate` is 3600 s; after that, the next read serves the old value and refreshes in the background. Cache keys include `VERCEL_DEPLOYMENT_ID`, so a deploy starts with an empty cache. Dates come back from the JSON round trip as strings, and `reviveDates` turns `createdAt`/`updatedAt` back into Dates.
- **`src/lib/catalog-queries.ts`**: the shared public reads used by the pages: platform page row, related rows, Discover list, category counts, tutorials index and sitemap.
- **`src/lib/mcp/catalog.ts` `loadCatalog`**: one loader for `/mcp`, every `/data/v1` route, `/llms-full.txt`, `/md/*`, guide pages and workflow pages. It has two layers: 5 minutes of per-instance memory in front of the shared cache.
- **`src/lib/community-lists.ts`** (+ `community-cache.ts`, `community-queries.ts`): `GET /api/platforms/<slug>/prompts` and `/discussions`. APPROVED rows only (replies too), same body for every visitor (the GETs read no auth). Data cache for 1 h, keyed by slug + normalized `page`/`pageSize`, tagged `platform-prompts:<slug>` / `platform-discussions:<slug>` (and `catalog`), with the hourly CDN header. Each cache miss logs one `[db-wake] GET <path> ua=<first 80 chars>` line. POST responses and `/api/moderation` pages are `private, no-store`. Approving or rejecting through `/api/moderation` expires the list and `platform:<slug>` (tab counts). Platform pages skip the client list fetch when the cached approved count is 0. Votes and ratings update the list in the browser rather than refetching it.
- **CDN**: `/data/v1/*`, `/llms-full.txt`, `/llms.txt` and the public `/api` GETs (`categories`, `platforms`, `platforms/[slug]`, `search`) send `public, s-maxage=3600, stale-while-revalidate=86400` (`PUBLIC_HOURLY_CACHE` in `src/lib/public-data/http.ts`). Errors are sent `no-store`, and feed 404s are cached for 60 s.

**Never cached:** anything that depends on the visitor. That covers `getOrCreateDbUser`, favorites, `/for-you`, `/onboarding`, `/account`, prompt/discussion posts, votes, rate, report, `/api/user/quiz`, `/api/moderation`, and Stripe checkout, portal and webhook. Pages that show a favorite button still render per request. Only their catalog reads are cached.

## Maximum staleness

| Surface | Without revalidation | After `npm run cache:revalidate` |
|---|---|---|
| Platform, guide, Discover, tutorials, compare, sitemap, /api GETs | ~1 h data cache | next request |
| `/data/v1`, `/llms-full.txt`, public `/api` at the CDN | ~1 h, plus up to 24 h stale-while-revalidate while refreshing | CDN keeps its copy until `s-maxage` runs out (≤ 1 h) |
| `/mcp` and other `loadCatalog` readers | ~1 h + 5 min memory | ≤ 5 min (warm instances' memory) |
| Prompt/discussion counts on platform tabs | ~24 h after a Prisma Studio approval (and a 0 count hides the list) | next request (pass the slug); `/api/moderation` approvals expire it automatically |
| Prompt/discussion lists (`/api/platforms/<slug>/prompts`, `/discussions`) | ~1 h data cache, plus CDN ≤ 1 h + 24 h stale-while-revalidate; votes/ratings by others ~1–2 h | data cache: next request (pass the slug, or approve via `/api/moderation`); CDN keeps its copy until `s-maxage` runs out (≤ 1 h) |
| A brand-new platform URL | may 404 for ~1 h if it was requested before the row existed | next request |

## Revalidating on demand

`POST /api/revalidate` with `Authorization: Bearer <REVALIDATE_SECRET>`.

- No body: expires everything tagged `catalog`. Use this after any catalog-audit `--apply`, seed script or Prisma Studio edit.
- `{"slugs": ["chatgpt"]}`: expires only those platforms' page rows, `/api/platforms/<slug>` and their prompt/discussion lists, for example after approving a prompt in Prisma Studio. Lists (Discover, feed, MCP, sitemap) only carry `catalog`, so for a field edit use the default.
- Responses: 503 if `REVALIDATE_SECRET` is unset on the deployment (nothing happens), 401 for a missing or wrong token, 400 for a bad body, 200 `{"revalidated":true,"tags":[...]}`.

From a shell with `REVALIDATE_SECRET` exported (never from a file in the repo):

```
npm run cache:revalidate                     # everything
npm run cache:revalidate -- chatgpt claude   # just those platforms
```

`REVALIDATE_URL` points the script at a preview instead of production. Catalog audit runners from audit 8 on print this reminder after `--apply`.

## Operator setup

1. Generate a secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.
2. Add it to Vercel as `REVALIDATE_SECRET`, for Production and, if you want, Preview. Exact casing matters (G9). Redeploy so the route sees it.
3. Keep a copy wherever you keep the other operator secrets. Vercel can't show it again.

Until it's set, the route is a harmless 503 and the cache expires on its own every hour.
