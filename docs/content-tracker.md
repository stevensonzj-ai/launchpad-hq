# Content tracker export

`npm run export:content-tracker` builds an Excel workbook showing, per AI platform, what content Launchpad HQ has and what is falling behind.

- Read-only: one transaction with `SET TRANSACTION READ ONLY`, SELECTs only. Prod needs `--confirm-production` plus `CONFIRM_PROD_HOST` (prod guard, src/lib/prod-guard.ts).
- Needs `DATABASE_URL` in the environment. It is never logged or written to the workbook.
- Options: `--out <path>`, `--audit <file.json|file.csv>` (guide-audit results), `--sitemap-url <url>`, `--no-sitemap`.
- Default output: `docs/planning/launchpad-content-tracker-YYYY-MM-DD.xlsx` (gitignored).
- Sheets: Platforms, Content, Summary, Notes. Stale = older than `STALE_DAYS` (90) or no source links. Day-count fills: amber over 60, red over 90.
- Columns the schema can't fill are left blank and listed on the Notes sheet. No values are invented.
- Pure transform and stale logic: `src/lib/content-tracker.ts`, tested in `src/lib/content-tracker.test.ts`.
