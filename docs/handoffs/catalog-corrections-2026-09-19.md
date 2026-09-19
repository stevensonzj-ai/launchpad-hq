# Catalog corrections — 2026-09-19

Source: nightly tutorial batch, run 2026-09-19. **No pages were written this run** — the
queue is exhausted and both remaining rows are unobtainable products. Nothing here is
applied to the database by the pipeline; these are for Zach to apply by hand in the Neon
SQL Editor.

This run adds one catalog-level finding that no previous run could make, plus two updates
to the standing `play-ht` / `relay-app` corrections. It does not restate the 2026-09-17 and
2026-09-18 corrections; those still stand as written.

---

## NEW — the catalog itself has not changed since May, verified against live Neon

Every prior run derived `total 170` from `tmp/platforms-export-2026-09-07.json`, a 12-day-old
snapshot. That left open the possibility that the "queue exhausted" verdict was an artifact
of a stale export rather than a fact about the catalog. It is not.

Read directly from production Neon this run (read-only `SELECT`; **no writes**):

- `platforms` live row count: **170** — identical to the export.
- Slugs added since the export: **0**. Slugs removed: **0**. The sets match exactly.
- Most recent `createdAt` in the whole table: **2026-04-17**.
- Most recent `updatedAt` in the whole table: **2026-05-12**.

**The catalog has had no row added, removed or edited in over four months.** The queue is
genuinely exhausted, not apparently exhausted. Pausing the nightly routine is therefore the
correct call and carries no risk of skipping work that already exists.

Corollary for whoever reads this next: refreshing the export will not produce new queue
rows. The constraint is catalog growth, which is a Zach decision, not a pipeline step.

### Blocker found while verifying the above

`scripts/export-platforms.ts` **cannot run in the nightly environment at all.** `npx tsx`
fails with `TransformError` — the repo's `node_modules` holds Windows-native esbuild
binaries (installed from Cursor on Windows) and the nightly shell is Linux. `npm run
typecheck` survives this because `tsc` is pure JS; anything routed through esbuild/tsx does
not.

Worked around this run with a pure-JS read-only equivalent, left on disk for the next run at
`tmp/tutorial-pipeline/scratch/export-read.mjs` (gitignored; uses `pg`, which is pure JS).
Recommendation: promote it to `scripts/tutorial-pipeline/export-platforms.mjs` so export
refresh is available unattended. Not committed this run — adding a script is outside the
nightly remit.

---

## `play-ht` — UPDATE: the marketing site went dark in the last 24 hours

The 2026-09-18 correction called this row "the trap: the storefront looks alive and the
product behind it is not." **That is no longer true, and the change is worth recording
because it removes the only ambiguity in the exclusion case.**

Verified this run from two independent resolvers and network paths (cloud container and the
desktop VM), agreeing exactly:

| host | 2026-09-18 | 2026-09-19 |
|---|---|---|
| `play.ht` | full marketing page, HTTP 200, no shutdown notice | **NO DNS RECORD** |
| `www.play.ht` | — | **NO DNS RECORD** |
| `api.play.ht` | did not resolve | NO DNS RECORD (unchanged) |
| `app.play.ht` | resolves, TLS cert expired | resolves (76.76.21.21, Vercel), TLS cert expired (unchanged) |
| `play.ai` | did not resolve | NO DNS RECORD (unchanged) |

The apex domain's DNS has been pulled. Only the studio subdomain still resolves, and it
still serves an expired certificate.

**Consequence for correction #1 in the 2026-09-18 doc:** that doc says if the row is
retained, "the only working official URL is `https://play.ht`." **Withdraw that.** There is
now no working official URL for this product. Do not set `websiteUrl` to `play.ht` — it
would be a dead link on a live catalog page. Hide the row.

Everything else in the 2026-09-18 `play-ht` correction stands: rebrand to PlayAI, Meta
acqui-hire July 2025, `voice-speech` category correct, ElevenLabs and Murf AI as the honest
redirects.

---

## `relay-app` — UPDATE: the stale pricing page is gone

The 2026-09-18 correction flagged that `relay.app/pricing` "is still served and still lists
live-looking prices — stale collateral, not evidence of obtainability."

As of this run, **`relay.app/pricing` returns HTTP 404.** The stale collateral has been taken
down by the vendor. `relay.app` itself still returns HTTP 200 and still serves the shutdown
notice (body contains "shutting down", "shutdown", "no longer").

This removes the one thing that could have made a reader believe the product was purchasable.
The exclusion case is now unambiguous. Everything else in the 2026-09-18 `relay-app`
correction stands, including the important part: **the row lives in Neon, not in `src/data`,
so adding it to `exclusions.json` will not remove it from the site.** It needs hiding in the
database separately.

---

## `exclusions.json` candidates — unchanged from 2026-09-18, still awaiting Zach

The pipeline never writes this file. Both entries below are re-verified as of this run and
the wording is updated where the facts moved:

    "play-ht": "Product not obtainable (2026-09-17 research; re-verified 2026-09-18 and 2026-09-19). As of 2026-09-19 the apex domain play.ht has NO DNS record — the marketing site that was live on 2026-09-18 is gone. app.play.ht (the studio) still resolves but serves an expired TLS cert; api.play.ht and play.ai do not resolve. Team acquired by Meta July 2025. There is no working official URL; hide the catalog row rather than pointing it anywhere.",
    "relay-app": "Product shut down 2026 (signups off 2026-07-16; free access ended 2026-08-15; paid ended 2026-09-14). Acqui-hire, team to Google Chrome; workspaces and credentials deleted. relay.app still serves its shutdown notice; relay.app/pricing now 404s as of 2026-09-19. Row lives in Neon, not src/data — exclusions.json will NOT remove it from the site."

Adding both takes `excluded` from 4 to 6 and `remaining` to 0, which is the honest state of
the queue.

---

## Carried forward unresolved — verbatim, not resolved by this run

The five items carried forward by the 2026-09-18 run are all still open and are **not**
restated here in full; see `tmp/tutorial-pipeline/runs/2026-09-18.md` § "Carried forward
unresolved". In one line each, so they are not lost:

1. `jasper` vs `jasper-ai` duplicate rows — dedup script prefers `jasper-ai`, shipped page
   uses `jasper`. If dedup runs, that tutorial attaches to a deleted row.
2. `beatoven-ai` shipped a page for a product with no working way in, while `play-ht` is
   being excluded for the same condition. Three runs have now declined to resolve this
   unattended. It needs settling either way.
3. False premise in the `pabbly-connect` task prompt about internal steps not counting as
   tasks — not a Pabbly differentiator. Fix at the source so a later run does not reintroduce it.
4. Activepieces' terms and privacy pages were unreachable, so that page makes **no claim**
   about training on your data. The silence is deliberate and load-bearing.
5. Relay's unused "workflow pauses for human approval" security angle is free for another
   automation platform that genuinely supports approval steps.
