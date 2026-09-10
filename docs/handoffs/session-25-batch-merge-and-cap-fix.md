# Session 25 — The backlog that wasn't; 19 pages reviewed and merged; 69 → 88 live

**2026-09-10.** Cowork session, working directly in the repo on `desktop-340i0l9`.

**Repo state at close:** `origin/main` = `18e19700` = `tutorials/batch-2026-09`.
**88 tutorials live in production.** Backlog against `origin/main`: **0**. No Neon writes.
Production verified via the Vercel API: `dpl_FdwKr6Su5ZvJGzgiy2RYSZeU9ECW`, `state: READY`,
`target: production`, `githubCommitSha` = `18e1970097c8beb2bf19108f82937d22ee2f6a9f`,
`aliasError: null`.

## 1. The 2026-09-10 nightly halt was a false positive

The nightly run reported "59 unmerged pages vs. a cap of 40" and did no work. **The real
backlog was 19.**

    cap check as written  (main..HEAD)         -> 59
    cap check fixed       (origin/main..HEAD)  -> 19
    local main   e78053ef  (frozen since 2026-09-07)
    origin/main  5ef4c1c9

The merge procedure for this mount is `gitx push origin HEAD:main`, which never checks `main`
out, so the local `main` ref can never advance. Measured against it the count only grows.

The 2026-09-09 run report diagnosed this in writing and recommended the one-line fix. **It was
never applied.** Two nights of production lost to a known, documented, unfixed bug.

**Lesson worth keeping: a diagnosis in a handoff is not a fix.** Anything in a run report that
gates the next run should be applied the same day, or the pipeline stalls silently.

## 2. Six of the 19 pages carried blockers

Four parallel reviewers over 17 pages; `khan-academy-khanmigo` and `zoom-ai-companion` read
directly. Both of those — the two flagged as read-first — were the strongest in the batch and
merged unchanged.

| page | blocker |
|---|---|
| `mailchimp-ai` | Said Creative Assistant starts at Essentials. Mailchimp's plan comparison marks "Generative AI Features" not included on **both** Free and Essentials. |
| `squarespace-ai` | AI Visibility described with no availability limit; it is English-only, version 7.1 only. |
| `upstage-solar` | Security section attributed to terms "currently effective 21 September 2026" — eleven days in the future. |
| `reducto` | Unhedged "files are retained" assertion contradicted by its own adjacent bullet. |
| `docsumo`, `nanonets`, `reducto` | 14 starter-action cards rendering as copyable prompts for tools with no chat box — see below. |

All six fixed and merged in `18e19700`. The other 13 were clean.

## 3. The `prompt` / `whatItDoes` render defect — a class error

`src/components/tutorials/platform-tutorials.tsx`:

    {action.prompt ? ( ...monospace block + <CopyPromptButton /> )
                   : ( action.whatItDoes && <p>...</p> )}

**`prompt` renders in monospace with a Copy button, and suppresses `whatItDoes` entirely when
present.** `types.ts` makes both optional (`whatItDoes?`, `prompt?`), so a wrong choice compiles
clean. Three document-parser pages had instructions like "Multiply your monthly page count by
the published rate" sitting in `prompt` — shown to a beginner as text to paste into a product
with no text box.

All 14 cards moved to `whatItDoes`, rewritten imperative to declarative, `archetype` changed
`"prompts"` -> `"pick-and-setup"`. Verified first: **`archetype` drives only `STARTER_HEADING`**,
nothing else reads it.

## 4. Nightly trigger updated (`trig_01X7PpLxPmm8BaZcrYieVoes`)

- **Step 1 cap check** now `gitx fetch origin` then `origin/main..HEAD`, with an explanation of
  why local `main` can never advance, plus a **cross-check** against `queue-status.mjs` that
  stops the run on disagreement rather than picking one number.
- **Step 4** gained three research rules, each traceable to a blocker found this session: check
  plan gating against the vendor's **plan-comparison table** not its feature pages; check
  **availability limits** (language, region, product version); **date every terms citation and
  confirm it is in force today**.
- **Step 5** gained the `prompt`/`whatItDoes` rule with the render behaviour spelled out, plus a
  Step 6 self-audit reporting `PROMPT_FIELD`.

## 5. Open

1. **The length / § 8b question is still unsettled** and now generates most of the review noise.
   HubSpot states credit spend in six places; Nanonets puts the Enterprise-only fact in three.
2. **Swap-test discipline is slipping and pipeline vocabulary is leaking into published copy.**
   `shopify-magic-sidekick` shipped "Swap-tested against Squarespace AI…" in reader-facing
   `whyHere` fields — internal process language on the live site, and the second instance
   inverts the standard's meaning.
3. **Upstage's currently-governing terms (1 Jul – 20 Sep 2026) could not be retrieved.** Four
   routes tried, all 404/401/redirect. The page hedges conservatively. **Note 21 September 2026
   — the new version takes effect and the page should be re-checked then.**
4. `lastReviewedAt` deliberately **not** restamped on the six edited pages.
5. **Catalog corrections from 09-09 still unapplied** — and the `privacyLevel` items matter more
   than the merge did. `src/lib/recommendations-core.ts:125` awards **+8** to HIGH for
   privacy-motivated users, so `figma-ai`, `wix-ai`, `duolingo-max` and `upstage-solar` — all
   rated HIGH, all training on customer content by default — are recommended hardest to the
   readers who care most. Live scoring defect, not metadata tidying.
6. `.claude/` still untracked; wants a `.gitignore` decision.
7. Branch protection on `main` still unconfirmed. Pipeline PAT expires **~2026-12-06**.

## 6. Cadence note

With the cap check fixed, backlog is 0 and the nightly rate is ~20/night against a cap of 40 —
a **two-day review clock**. Options if that chafes: raise the cap, drop the batch size, or make
the cap a batch-size governor (`batch = min(20, cap - backlog)`) so it throttles instead of
stalling.
