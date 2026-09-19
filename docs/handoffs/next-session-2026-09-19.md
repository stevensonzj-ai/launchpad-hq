# Next session — open tasks and decisions

**Written 2026-09-19.** State: `main` at `fe55bec7` in production (164 tutorial pages).
`tutorials/batch-2026-09` at `995f55b8` is pushed, typecheck clean, preview READY — **not merged.**

---

## 1. Neon tasks — do these in the SQL editor at console.neon.tech

**Why these are database tasks and not code tasks:** a tutorial's text lives in the repo
(`src/data/tutorials/`), but the *product listing* — the thing a visitor browses — lives in the Neon
`platforms` table. Deleting or excluding a tutorial does not take a product off the site. Only
hiding the row does. One of the rows below (`relay-app`) has no tutorial file at all; it exists only
in the database, so nothing done in the repo will ever affect it.

### 1a. Hide four dead products — verified live and browsable on 2026-09-19

All four currently return HTTP 200 at `/platform/<slug>` on production **and appear in the
`/discover` listing**, presented to a beginner as things they can go and use.

| Row | Why it is dead | Verified |
|---|---|---|
| `relay-app` | Shut down. Signups off 2026-07-16, free access ended 2026-08-15, **paid access ended 2026-09-14**. Workspaces and credentials deleted. | Homepage still serves its own shutdown notice; `relay.app/pricing` now 404s |
| `play-ht` | Team acqui-hired by Meta, July 2025. Studio serves an expired TLS certificate. | `play.ht`, `www.play.ht`, `api.play.ht`, `play.ai` all have **no DNS record** as of 2026-09-19; only `app.play.ht` resolves, with a dead certificate |
| `clarifai` | Nebius hired the team and licensed the inference tech, announced 2026-05-12. No shutdown notice ever published. | `api.clarifai.com`, `docs.clarifai.com`, `status.clarifai.com` have **no DNS record**; apex sits on Namecheap registrar parking nameservers serving `namecheap-nginx`; HTTPS dead on apex and www |
| `beatoven-ai` | App host gone. | `beatoven.ai` and `www.beatoven.ai` return 200, but `sync.beatoven.ai` — the actual app — has **no DNS record** |

All verified from two independent networks and both 8.8.8.8 and 1.1.1.1.

**Note the pattern**, because it will recur: in three of these four the marketing domain is healthy
and the *app or API subdomain* is gone. Checking a vendor's homepage tells you nothing.

### 1b. One empty field

`murf-ai`'s row has no `website` value, so that page has no outbound link to the vendor. It is the
only one of the 164 with a tutorial and no website.

### 1c. Two lines to add by hand — repo, not database

`scripts/tutorial-pipeline/exclusions.json` is the list of rows the nightly job is forbidden to
write a tutorial for. Add `play-ht` and `relay-app`. Suggested wording is in
`docs/handoffs/catalog-corrections-2026-09-19.md`.

**This changes nothing a visitor sees.** It only stops the robot writing about them later. The
hiding in 1a is what affects visitors. The pipeline never writes this file itself.

### 1d. No Neon writes are ever made by any pipeline job

Every catalog correction in `docs/handoffs/catalog-corrections-*.md` is applied by hand. Nothing
automated touches the database, by design. Keep it that way.

---

## 2. Decisions

### 2a. DECIDED 2026-09-19 — page length

> "It's fine to have pages be longer if necessary. I don't want to make the pages shorter for the
> sake of being shorter. I just want the information to be clear and easy to follow for the average
> beginner."

Recorded in `scripts/tutorial-pipeline/writing-standard.md` § 1 as an owner's ruling. **No
compression passes. No cutting sourced facts to hit a number.**

Two consequences worth carrying forward:

1. **Verbosity is still a clarity problem even though length is not a defect.** Across the 164
   pages, field *counts* are inside the reference pages' range, but every prose field averages
   ~1.5x the reference length. Same facts, more words. Tightening those sentences serves the
   ruling; deleting what they say does not.
2. **Open sub-question:** the word counter's "over ~1,200" flag now fires on 104 of 164 pages, so
   it carries no information. Either give it a higher number or retire it and let the clarity
   checks be the gate. Not decided — do not guess a number.

### 2b. STILL OPEN — what happens when a product dies

Four products in the catalog are dead and each is being handled differently:

- `kakao-brain-karlo` — **the good example.** Its page opens by saying the Kakao product is gone,
  names both dead domains with a date, and routes the reader to the surviving Hugging Face demo.
- `beatoven-ai` — page admits there is no working way in.
- `clarifai` — **page still says "the site, the docs and signup all work normally today."** False.
- `play-ht` — no page; queued for exclusion.

Pick one policy — an honest "this is gone, use X instead" page, or removal from the site — and apply
it to all four. Products will keep dying, so this decision pays out repeatedly. **This is the one to
make first.**

---

## 3. The nightly routine — every catalog row is now accounted for

```
tutorials written : 164
excluded rows     :   4   (sora-2, canva-magic-studio, runway-for-education, adobe-sensei-firefly-in-cc)
refused as dead   :   2   (play-ht, relay-app)
                    ---
total             : 170   of 170 catalog rows      un-triaged: 0
```

**Nothing is waiting to be written.** The catalog has had no row added since 2026-04-17 and nothing
edited since 2026-05-12, verified against live Neon. The routine will keep firing nightly and
finding nothing, so pause it or add catalog rows.

### Worth considering instead of simply pausing

The nightly job's *writing* work is finished, but the failure that actually cost something this
month was not a missing page — it was **page rot**. `clarifai` went from healthy to dead-and-still-
recommended in four months, and nothing was watching. A liveness sweep is cheap, mechanical, and
catches exactly the class of defect that reading the pages never will.

If the routine is repurposed rather than paused, the sweep must test **the host a reader actually
signs in to**, not the catalog's `website` value. A marketing-domain sweep run on 2026-09-19 over
all 163 pages with a website found only 2 genuine failures — and would have given `beatoven-ai` a
clean bill of health while its app host had no DNS. That means recording the signup/app host per
page, which the catalog does not currently store.

---

## 4. Also open, lower priority

- **Merge `tutorials/batch-2026-09`.** Six commits: five Tier 1 page fixes plus a docs addendum.
  Spot-check the preview first — unlike the previous two merges this changes reader-facing copy on
  49 pages. `git push origin HEAD:main`.
- **Tier 2 of the defect work order** — generic AI caveats in `triad.avoid` (`claude` and
  `microsoft-copilot` each break the one-per-page limit) and two `whyHere` lines. Needs editorial
  judgement, not a rule.
- **`scripts/dedupe-jasper-platforms.ts`** prefers `jasper-ai`; the live catalog and the shipped page
  both use `jasper`. Never been run. As written, running it orphans a live tutorial — delete it or
  change the preference.
- **Promote the audit checks** to `scripts/tutorial-pipeline/` as plain `.mjs` and wire them to
  `npm run audit:tutorials`. Full rationale in the defect work order § 7.
- **`scripts/export-platforms.ts` cannot run in the nightly Linux shell** — `npx tsx` dies because
  `node_modules` holds Windows-native esbuild binaries from Cursor. `tsc` survives because it is pure
  JS. Any pipeline script depending on tsx or esbuild will fail the same way.
- **`/tutorials` returns 404 in production** though `page.tsx` exists (a "coming soon" placeholder).
  Pre-existing, low severity. Tutorials render at `/platform/<slug>`.

---

## Reference

- `docs/handoffs/tutorial-page-defects-2026-09-19.md` — the full defect work order plus the
  post-fix addendum. The Tier 1 / Tier 2 / Tier 3 split and the do-not-touch list are there.
- `docs/handoffs/catalog-corrections-2026-09-19.md` — row-level corrections and exclusion wording.
- `scripts/tutorial-pipeline/writing-standard.md` — binding writing rules, now carrying the length ruling.
