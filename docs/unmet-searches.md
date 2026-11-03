# Unmet website searches

An aggregate log of website searches that found little or nothing, so we can see which tools and topics visitors look for and the catalog lacks. Website only: the `/mcp` endpoint, its tools and its logging are untouched, and a test fails if any file under `src/lib/mcp` or `src/app/mcp` references this feature.

## What counts as unmet

`UNMET_RESULT_THRESHOLD = 2` in `src/lib/search/unmet.ts`: a search that returns 0, 1 or 2 results is logged; 3 or more is not. The browser skips the beacon above the threshold and the server re-checks it.

Two website surfaces report:

- **Header search box** (`src/components/layout/header.tsx`, backed by `GET /api/search`, which is unchanged). Typing `vid`, `video`, `video up` counts as one search: a query that extends or trims the previous one replaces it. Only the answer to the latest keystroke is considered.
- **Discover** `?q=` (`src/app/(app)/discover/page.tsx`). Only when there is a search and no other filter (category, cost, difficulty, mobile), because with a filter on, few results mean the filter was narrow, not that the catalog lacks the tool.

## What is stored

Table `unmet_searches`, one row per normalized query, and nothing else:

| column | meaning |
| --- | --- |
| `normalizedQuery` (PK) | the search text after normalization |
| `searchCount` | times it was searched |
| `noClickCount` | searches where no result was clicked |
| `lastResultCount` / `minResultCount` | result count last time / lowest ever |
| `firstSeen` / `lastSeen` | dates (no time of day) |

No IP address, user agent, account, device or session identifier, and no timestamp finer than a date.

**Normalization** (`normalizeUnmetQuery`): NFKC, lowercase, every run of characters that are not letters, digits or combining marks becomes one space, trim, cut to 80 characters at a word boundary where possible. Dropped entirely (not stored): raw text over 200 characters; email-, phone- or URL-shaped text (checked on the raw text, before punctuation is stripped); fewer than 2 characters after normalizing; digits only. Combining marks are kept so scripts such as Devanagari are not mangled.

## Click mechanism

No third party, no cookies. After a search with 2 or fewer results, the browser (`src/lib/search/unmet-client.ts`) sends **one** beacon `{q, resultCount, clicked}` with `navigator.sendBeacon` to `POST /api/search/unmet`:

- when a result is clicked (`clicked: true`), or
- when the page is hidden or unloaded (`pagehide` / `visibilitychange`), when the box is cleared, or when a different search starts (`clicked: false`).

It is deduped per query per page view. The browser first honours Do Not Track / Global Privacy Control and asks the cached `GET /api/attribution/eligibility` (same country decision as first-touch attribution); anything but a clear yes sends nothing.

## Server route

`POST /api/search/unmet` (`src/app/api/search/unmet/route.ts`, logic in `src/lib/search/unmet-record.ts`) always answers `204`. In order: body capped at 1KB; DNT / `Sec-GPC` headers and country via `decideForRequest` (EU, EEA, UK, Switzerland and unknown country skip); user agent check in memory only (empty or bot-like agents skip); strict validation; threshold; normalization; an in-memory token bucket of 30 writes per minute per server instance (global, keyed on nothing, no IPs); then at most one `INSERT ... ON CONFLICT ("normalizedQuery") DO UPDATE` with bound parameters. The store is injected so tests need no database.

## Retention

Rows whose `lastSeen` is older than 12 months are deleted. `scripts/attr-retention-cleanup.ts` runs this together with the first-touch cleanup (`CONFIRM_DELETE=1 npm run db:attr-retention-cleanup`, prints only counts); the statement is in `scripts/sql/search-unmet-retention-cleanup.sql`. Nothing runs on a schedule.

## Weekly report

`npm run report:unmet-searches` (add `-- --csv` for CSV) prints the top 50 queries seen in the last 7 days by search count, with searches, searches without a click, last result count, first and last seen. It is a single read-only `SELECT` (`scripts/sql/search-unmet-weekly.sql`). A high `searches` with a high `no_click_searches` and 0 results is a catalog gap worth a look.

## Deploying

Operator steps, not run by the code: apply `prisma/migrations/20261103130000_add_unmet_searches` (or run `scripts/sql/search-unmet-20261103.sql`, one statement per line) on a Neon branch first, then production. Until the table exists the route swallows the error and answers `204`, so nothing breaks.

The privacy page (`/privacy`) describes this log.
