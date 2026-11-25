# 2026-11-25 — cursor — Deals page and promo-code guard

**Decided:** Zach approved this on Nov 25. One draft PR. No schema, database, env, or dependency changes.

**Changed:** Squarespace's free-tier fact no longer names a promo code. `GIMME10` lives in `src/data/deals.ts`. `/deals` lists free trials, student offers, discounts and codes, then verified free plans inside a closed `<details>`. Affiliate status is read from `src/data/affiliates.ts` at render time (Klap's code stays only there). The page revalidates hourly and drops expired, unverified, or stale offers. It is indexed and in the sitemap while the launch gate passes (12 live offers across 3 sections, affiliate cards at most 20% of curated offers). Header and footer both link `/deals`.

**Launch day (2026-11-25):** Free trials 17, student 5, discounts and codes 4, free plans 111. Curated offers 26. Affiliate cards 2 (Klap code, Synthesia free plan), 2/26 of curated. Gate: indexed.

**Squarespace free-tier fact:** "No permanent free plan: a 14-day free trial, no credit card required, cancel anytime. Plan AI credits are Basic 10 (one-time), Core 20 a month, Plus 40 a month, and Advanced 120 a month."

**Tests:** `npm test` — 1690 passed. `npx tsc --noEmit` passed. No dev server.

**Open / Zach:** Review the draft. Jetpack's 50% off hides after 2026-12-02 and Adobe Firefly's sale after 2026-12-06. Klap's code check (2026-10-29) goes stale 30 days later. Developer-only promos (Tencent HY4, Cohere, Murf API) were left out.

Model: Grok 4.7.
