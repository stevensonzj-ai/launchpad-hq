# Catalog corrections — 2026-09-18

Source: nightly tutorial batch, run 2026-09-18. **No pages were written this run** — both
remaining queue rows are unobtainable products. Corrections below are for the catalog only.
As always, nothing here is applied to the database by the pipeline; these are for Zach to
apply by hand in the Neon SQL Editor.

---

## `play-ht` — PlayAI (formerly Play.ht) — `voice-speech`

**Recommended action: hide / mark discontinued, and add to `exclusions.json`.**

Obtainability re-verified independently on 2026-09-18, from a different network than the
2026-09-17 research run, and it reproduces:

- `https://app.play.ht/login` — **TLS certificate expired** (`CERTIFICATE_VERIFY_FAILED:
  certificate has expired`). This is the studio, i.e. the entire self-serve product. A
  beginner hits a full-page browser security interstitial. There is no way to sign up or
  log in.
- `https://play.ht/` — still serves a full marketing page with no shutdown notice, no
  sunset banner, and working-looking "Get Started" buttons. This is the trap: the
  storefront looks alive and the product behind it is not.
- Team acqui-hired by Meta, July 2025 (TechCrunch 2025-07-13, Bloomberg 2025-07-11).
- `play.ht/terms/` still reads "Last Updated: June 1, 2023" — over three years stale.

Corrections:

1. **websiteUrl** — the row is empty. If the row is retained in any form, the only working
   official URL is `https://play.ht`. Do **not** use `play.ai` (the vendor's own rebrand
   target; does not resolve) or `news.play.ht` (unmaintained mirror that contradicts the
   main site's own voice count on the same day).
2. **Display name** — vendor rebranded Play.ht → **PlayAI**. Accurate name is
   "PlayAI (formerly Play.ht)". Name correction only; not the reason for the exclusion.
3. **Status** — hide or mark discontinued. Its current state (no website URL, no tutorial,
   a name three years out of date, pointing at a dead studio) is the worst available option
   for a reader.
4. `category` `voice-speech` — correct, no change.
5. `privacyLevel` `MEDIUM` — moot once hidden. Not wrong historically; the 2023 terms
   carried an unusually strong no-training commitment.
6. Provisional archetype `prompts` — was correct for the live product. Moot.

A reader who lands here is well served by ElevenLabs or Murf AI, both alive and self-serve
as of this run. The row should not simply 404.

---

## `relay-app` — Relay.app — `workflow-automation`

**Recommended action: hide / remove, and add to `exclusions.json`.**

Re-verified 2026-09-18 against the vendor's own homepage: shutdown notice still rendering.
Free access ended **2026-08-15**; paid access ended **2026-09-14** — four days ago. "New
signups and free-to-paid upgrades are now turned off" since 2026-07-16. Acqui-hire; staff
to Google's Chrome team, founder Jacob Bank now VP of Product for Chrome
(TechCrunch 2026-08-17). Workspaces, accounts, credentials and tokens are auto-deleted at
the end of the wind-down.

Corrections:

1. **Hide or remove the row.** Its outbound link (`https://relay.app`) now resolves to a
   tombstone, so the catalog is actively sending beginners to a shutdown notice.
2. **The row is not in the repo.** A grep of `src/data` for `relay` / `relay-app` /
   `relay.app` returns nothing — the row lives in the Neon production database. **The
   `exclusions.json` edit alone will not remove it from the site**; that needs a DB edit.
3. Provisional archetype `recipes` and `privacyLevel` `HIGH` were never tested against the
   product — research stopped at obtainability. Do not treat them as validated.

Note: `relay.app/pricing` is **still being served** and still lists Free / Professional
($9/mo) / Team / Enterprise. It is stale marketing collateral on a dead product and must
not be cited as live pricing anywhere.

---

## Standing item, unchanged from 2026-09-17

`beatoven-ai` shipped a page for a product with no working way in (`www.beatoven.ai`
returns 200, `sync.beatoven.ai` does not resolve), while `play-ht` met the same condition
and is being excluded. The `beatoven-ai` page is honest — it opens by saying there is no
working way in and routes the reader to alternatives — and has been left in place across
two runs because removing it unattended is the larger, less reversible action. **This rule
still needs settling**: either dead products get an honest redirect page, or they get an
exclusion, but not one each.
