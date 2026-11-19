# 2026-11-19 — Claude — Front-door cleanup (Package 3)

Branch `feat/front-door-cleanup`, cut from `origin/main` at `15a183e5`. Draft PR #179 (not merged). Commit `69f641b0`.

## Decided (Zach, after recon)

- Header: Discover, Guides (`/tutorials`), Compare (`/compare`), Get matched (`/quiz`); "For you" after Get matched for signed-in users only. Sign-in / account controls unchanged.
- Footer: new "Explore" group with Workflows, Models, and Pricing behind `PRO_PLAN_ENABLED`. Advertise stays in the existing group.
- `src/components/layout/nav-links.ts` is the single source for header (desktop + mobile) and footer links.
- `/alternatives` (bare path only) → `/compare`, permanent (308). `/alternatives/*` pages untouched.
- Contact address: `CONTACT_EMAIL` in `src/lib/site-copy.ts` stays the one constant; seven files now import it (import swap only in the two sponsor files).
- 404 and global error pages as proposed. The sign-in redirect on unknown URLs is accepted for this PR.

## What changed

- `src/components/layout/nav-links.ts` (new), `header.tsx`, `footer.tsx`
- `src/data/compare/pages.ts` (`alternativesIndexRedirects()`), `next.config.ts`
- Contact constant: `advertise/page.tsx`, `connector/page.tsx`, `how-we-make-money/page.tsx`, `privacy/page.tsx`, `support/page.tsx`, `terms/page.tsx`, `components/sponsors/advertise-guidelines.tsx`; stale header comment fixed in `site-copy.ts`
- `src/app/not-found.tsx` and `src/components/layout/not-found-content.tsx` (new); `src/app/global-error.tsx` rewritten (imports `globals.css`, inline dark fallback, "Try again", plain links, Sentry kept)
- New tests: `src/lib/catalog/discontinued-names.test.ts` (added to the `npm test` list), `src/components/layout/nav-links.test.ts`, `src/components/layout/not-found-content.test.ts`, `src/lib/contact-email.test.ts`, `src/data/compare/alternatives-redirect.test.ts`
- Existing tests adjusted: `compliance.test.ts` (one check: privacy page uses `CONTACT_EMAIL`), `site-identity.test.ts` (footer hrefs now read from `nav-links.ts`)
- `START-HERE.md`: 4.42 note updated (error pages done); new 4.44 open defect plus a line under Known and accepted defects

## Still open

- **Unknown non-public URLs redirect signed-out browsers to `/sign-in`, not to the 404** (START-HERE 4.44). Production probe 2026-11-19: 307 to sign-in with `X-Clerk-Auth-Status: signed-out`. The fix is a middleware change and needs its own PR.
- The new 404 and error pages were not viewed in a browser; the Vercel preview is the first visual check (light and dark OS settings).
- Only `discontinued-names.test.ts` was added to the `npm test` list (as instructed). The four other new test files run on their own with `npx tsx --test`.

## For the catalog lane

- **Higgsfield guide names "Sora 2"** (`src/data/tutorials/higgsfield-getting-started.ts`, model list in the intro). OpenAI discontinued the Sora API on 2026-09-24, so this is probably stale. It is allowlisted in `discontinued-names.test.ts` with a "re-check pending" reason; re-verify Higgsfield's model list, edit the guide, then delete the allowlist entry (the test fails on a stale entry, so it must go in the same change).
- "Sora-class tools" in the Veo 3.1 guide is allowlisted as generic wording.

## For Zach to decide

- When to schedule the middleware PR for 4.44.
- Whether the other four new test files should join the `npm test` list.
