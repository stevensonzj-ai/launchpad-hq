# Sponsor booking checklist

Rates, labels, and public booking copy live on `/advertise`. Do not copy prices here.

1. **Assets due** — collect logo, Discover spotlight image (if that slot), and AI of the Week hero (if that slot). Specs are in `src/data/sponsors/types.ts`. Drop files in `public/sponsors/` and use `/sponsors/…` paths.
2. **Manual asset size/dimension check** — confirm logo ≥256×256 and ≤200 KB, spotlight 1200×630 and ≤500 KB, AotW hero 1600×900 and ≤800 KB. Validation does not measure pixels or file size.
3. **Copy / CTA** — non-empty `sponsorName`, `headline`, `blurb`, and `ctaLabel` (not just whitespace). Headline ≤90, blurb ≤200, ≤3 bullets of ≤80 chars, one `https://` CTA. IDs must be unique. AI of the Week also needs a 150–400 word `featureBody` and an editorial `honestTake` written by us, not the sponsor.
4. **`placements.ts` entry** — add one `SponsorPlacement` row. `slot` is `discover` or `ai-of-the-week`. `startDate` / `endDate` are inclusive YYYY-MM-DD in America/Chicago (typically Mon–Sun). Leave the list empty when nothing is sold. Do not import the test fixture. `/advertise` availability is derived from this file.
5. **Validate** — `npm test` (includes `src/data/sponsors/validate.test.ts`) and `npm run prebuild` (same check Vercel runs before `next build`). A live row that breaks limits, duplicates an id, overlaps the same slot, uses a non-https CTA, or points at a missing `/sponsors/` file fails.
6. **Preview** — booked Discover week: labeled banner on `/discover` only, rankings/quiz/workflows unchanged. Booked AI of the Week: `/ai-of-the-week` shows the feature. Empty AI of the Week: empty state + Advertise link, page is noindexed.
