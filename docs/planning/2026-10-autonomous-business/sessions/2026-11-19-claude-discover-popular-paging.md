# 2026-11-19 — Claude — Discover: Popular order, paging, compact card (Package 2a)

Branch `feat/discover-popular-paging`, cut from `origin/main` at `490a2577`. One draft PR; not merged.

## Decided (Zach, this session)
- "Popular" = editorial list in `src/data/discover-popular.ts` first (approved 2026-11-12), then the rest by name. `featured` no longer affects Discover order. `discoverOrderBy("popular")` is `[{ name: "asc" }]`, so Popular and A–Z share one cache entry; the popular order and the page slice happen in memory.
- 24 per page via `?page=N`; page 1 has no param; bad or out-of-range values clamp. `take: 200` removed.
- A–Z: paged; each strip letter links to the page holding its first tool, with an anchor to its heading.
- SEO: only an unfiltered, unsearched, default-sort `?page=N` (N ≥ 2) is self-canonical, with "page N" in title and description. Everything else keeps the `/discover` canonical. Robots unchanged. Sitemap lists page 1 only (unchanged).
- Unmet-search beacon gets the total match count. `data-unmet-results` kept on both grids.
- The +5 quiz featured boost and `/api/platforms` featured sort are unchanged.

## Changed
- `src/data/discover-popular.ts` (new); `src/lib/discover-filters.ts` (popular order, paging, letter pages, canonical helper, `page` in `buildDiscoverQuery`).
- `src/app/(app)/discover/page.tsx`: paging, pager, "Showing 1–24 of N", letter links, metadata, ItemList JSON-LD, compact cards.
- `src/components/platforms/platform-card.tsx`: `variant="compact"` (Discover only); default card unchanged.
- `src/lib/seo-jsonld.ts`: `buildDiscoverItemListStructuredData`.
- Tests: `discover-filters.test.ts`, `platform-card.test.ts`, `seo-jsonld.test.ts`; `sponsors/ordering.test.ts` (popular exact-value check and sample slugs only).
- `CLAUDE.md`: the stale site-wide noindex line now matches `SITE_IS_PUBLIC = true`.

## Fix in the second commit
- The first commit (`108dc2f5`) missed removing `take: 200` from `getDiscoverPlatforms` in `src/lib/catalog-queries.ts`. On the preview, Discover showed "1–24 of 200" against 215 listed tools. Zapier was also missing from page 1, because the cap cut the name-ordered list before the popular sort ran. Zach caught it in review.
- The second commit removes the cap. It also adds a source-level test in `discover-filters.test.ts` that fails if `getDiscoverPlatforms` has a `take`. I confirmed the test fails with the cap in place. Nothing else relied on the cap: the "first 200" copy was already gone, and no test referenced it.

## Notes
- Slugs checked against the production feed `/data/v1/catalog.json` (222 listed): all 30 present; `gemini-notebook` has lifecycle `renamed` (live).
- The compact cost badge's tooltip uses the generic tier text, not the free-plan summary, so no free-plan copy ships in the card HTML.
- When the result has 24 or fewer tools, the line still reads "Showing N tools".
- A test in `unmet.test.ts` pins the source text `resultCount={platforms.length}`. In the page, `platforms` is now the full match list and `pageTools` is the page slice, so that test stays unchanged and the beacon still gets the total.
- No full test run or local build (memory limit). The Vercel preview build is the gate.

## Open / for Zach
- Check the acceptance numbers on the preview: first 12 cards, iPhone document height, HTML size, every tool reachable by paging.
- Replace the editorial list with outbound-click data when there is enough of it.
