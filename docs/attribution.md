# First-touch attribution

What it stores: `utm_source`, `utm_medium`, `utm_campaign`, the landing page path and the signup source. No IP, device, user agent, referrer, email or user id.

- **Browser:** saved in localStorage (`lphq_first_touch`) with a `capturedAt` time. An entry older than 365 days is removed and a new first touch may be captured.
- **Nothing is captured** when Do Not Track (`1`/`yes`) or Global Privacy Control is on. The server also refuses (204, no write) when the request carries `DNT: 1` or `Sec-GPC: 1`.
- **Not captured in** the EU, EEA (IS, LI, NO), UK or Switzerland, or when the country is unknown. The list and decision live in `src/lib/attribution/eligibility.ts`, using Vercel's `x-vercel-ip-country` header.
- **Eligibility check:** only a landing URL with UTM tags calls `GET /api/attribution/eligibility` (`Cache-Control: private, no-store`). Pages themselves are not made dynamic. `POST /api/attribution/first-touch` repeats the check and writes nothing if blocked.
- **Database:** one row per signup in `first_touch_attributions`, not linked to the account. Table SQL: `scripts/sql/attr-first-touch-1103.sql`.

## Retention (12 months)

No cron. Run by hand when due (monthly is plenty):

- SQL console: `scripts/sql/attr-retention-cleanup.sql`
- Or `CONFIRM_DELETE=1 npm run db:attr-retention-cleanup` (point `DATABASE_URL` at the right database first; prints only the deleted count; refuses without `CONFIRM_DELETE=1`).
