# Sponsor booking checklist

Rates, labels, and public booking copy live on `/advertise`. Do not copy prices here.

1. **Assets due** — collect logo, Discover spotlight image (if that slot), and AI of the Week hero (if that slot). Specs are in `src/data/sponsors/types.ts`. Drop files in `public/sponsors/` and use `/sponsors/…` paths.
2. **Copy / CTA** — headline ≤90, blurb ≤200, ≤3 bullets of ≤80 chars, one `https://` CTA. AI of the Week also needs a 150–400 word `featureBody` and an editorial `honestTake` written by us, not the sponsor.
3. **`placements.ts` entry** — add one `SponsorPlacement` row. `slot` is `discover` or `ai-of-the-week`. `startDate` / `endDate` are inclusive YYYY-MM-DD in America/Chicago (typically Mon–Sun). Leave the list empty when nothing is sold. Do not import the test fixture. `/advertise` availability is derived from this file.
4. **Validate** — `npm test` (includes `src/data/sponsors/validate.test.ts`). A live row that breaks limits, overlaps the same slot, uses a non-https CTA, or points at a missing `/sponsors/` file fails.
5. **Preview** — booked Discover week: labeled banner on `/discover` only, rankings/quiz/workflows unchanged. Booked AI of the Week: `/ai-of-the-week` shows the feature. Empty AI of the Week: empty state + Advertise link, page is noindexed.
