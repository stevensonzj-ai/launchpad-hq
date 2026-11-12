# Content tracker export

`npm run export:content-tracker` builds an Excel workbook showing, per AI platform, what content Launchpad HQ has and what is falling behind.

Catalog rows come from the database, or from a JSON file of the same three result sets.

**Database (default).** Read-only: one transaction with `SET TRANSACTION READ ONLY`, and the three SELECTs in `scripts/sql/readonly/content-tracker-queries.sql`. Needs `DATABASE_URL`. It is never logged or written to the workbook. Prod needs `--confirm-production` plus `CONFIRM_PROD_HOST` (prod guard, src/lib/prod-guard.ts).

**JSON file (`--db-json`).** No database connection. `DATABASE_URL` is not required, and the prod-guard host check does not run. Run those three SELECTs in the Neon SQL editor as `launchpad_ro` (read-only), save the rows as one object, then export:

```bash
npm run export:content-tracker -- --db-json file.json --out docs/planning/launchpad-content-tracker.xlsx
```

```json
{
  "platforms": [
    {
      "id": "…",
      "slug": "…",
      "name": "…",
      "website": null,
      "description": "…",
      "categoryName": "…",
      "categorySlug": "…",
      "costTier": "FREEMIUM",
      "currentPricing": null,
      "apiAvailable": true,
      "verified": true,
      "updatedAt": "2026-03-01T15:04:05.000Z"
    }
  ],
  "prompts": [{ "platformId": "…", "status": "APPROVED", "n": 3 }],
  "discussions": [{ "platformId": "…", "status": "PENDING", "n": 1 }]
}
```

`platforms` uses the aliases from the platforms SELECT (`id`, `slug`, `name`, `website`, `description`, `categoryName`, `categorySlug`, `costTier`, `currentPricing`, `apiAvailable`, `verified`, `updatedAt`). `prompts` and `discussions` each use `platformId`, `status`, and `n`. Counts, booleans and `updatedAt` may be strings (`"3"`, `"true"`, an ISO date); the export normalizes them. The SQL file is documentation the script copies. It is not a Guarded SQL input: it lives under `scripts/sql/readonly/`, and the Guarded SQL workflow only accepts `scripts/sql/<name>.sql`.

- Options: `--out <path>`, `--db-json <file.json>`, `--audit <file.json|file.csv>` (guide-audit results), `--sitemap-url <url>`, `--no-sitemap`.
- Default output: `docs/planning/launchpad-content-tracker-YYYY-MM-DD.xlsx` (gitignored).
- Sheets: Platforms, Content, Summary, Notes. Stale = older than `STALE_DAYS` (90) or no source links. Day-count fills: amber over 60, red over 90.
- Columns the schema can't fill are left blank and listed on the Notes sheet. No values are invented.
- Pure transform and stale logic: `src/lib/content-tracker.ts`, tested in `src/lib/content-tracker.test.ts`.
- Shared row mapping for the database read and `--db-json`: `src/lib/content-tracker-db.ts`, tested in `src/lib/content-tracker-db.test.ts`.
