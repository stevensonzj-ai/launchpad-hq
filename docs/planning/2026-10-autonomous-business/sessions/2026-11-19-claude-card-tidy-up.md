# 2026-11-19 — Claude — Default card tidy-up and Discover name order (Package 2b)

Branch `feat/card-tidy-up`, cut from `origin/main` at `21d023d2`. One draft PR; not merged.

## Decided (Zach, this session)
- `PlatformCard` gets typed, default-variant-only props: `why`, `matchReasons` (`MatchReason[]`), `extraLinks`, and `className` merged onto the `<article>`. The compact branch returns early and never reads them, so Discover's card is unchanged.
- Discover name order: the cached read keeps `orderBy: name asc` (no new cache entries). The page then re-sorts in memory with one shared comparison, `compareDiscoverNames`: `Intl.Collator("en", { sensitivity: "base" })` with slug as the tie-break. The same function drives A–Z, the tail after the Popular list, `sortDiscoverCatalog` and `letterPages`.
- For You favorites and the two tool-page grids were already even (the card is the grid item, grids stretch, "Meet the tool" is `mt-auto`), so they were left alone.

## Changed
- `src/components/platforms/platform-card.tsx`:
  - The default badge row now uses the compact variant's `pillClass` and `diffPillColors` for the cost, difficulty, Advanced and App/Web badges, centred with `items-center`. The unused `diffColors` is removed.
  - The "why" sentence sits under the description at `text-gray-300`. Chips and links sit in the footer above "Meet the tool", and the links use `relative z-10`.
- `src/components/quiz/quiz-match-sections.tsx`:
  - `MatchCard` renders `PlatformCard` directly as the grid item, and Best first pick spans the row via `className`.
  - `ReasonChips` and `CardLinks` are replaced by card props and `matchCardLinks()`.
- `src/lib/discover-filters.ts` (`compareDiscoverNames`, `sortByDiscoverName`; `sortDiscoverCatalog` and `letterPages` use them) and `src/app/(app)/discover/page.tsx` (re-sort after the read).
- Tests: `discover-filters.test.ts` (case-insensitive order, slug tie-break, Popular tail, lowercase-initial names with one heading per letter, letter-to-page mapping) and `platform-card.test.ts` (difficulty pill, extras inside the article, quiz grids hold only cards). The existing compact tests were not touched. `sponsors/ordering.test.ts` passes unchanged.
- `START-HERE.md`: no entry describes the card or the results layout, so it is unchanged.

## Notes
- Why "AIVA" came before "Activepieces": the database's name order compares by character code. That also put llama.cpp, n8n, tl;dv, v0 and vLLM after "Z", so A–Z showed a second L, N, T and V heading at the end. The in-memory sort fixes both.
- No full test run or local build (memory limit). The Vercel preview build is the gate. The preview needs a Vercel login, so the visual check is for Zach.

## Open / for Zach
- On the preview, check:
  - quiz results and For You: even rows, extras inside the cards, tutorial/workflow links clickable;
  - tool-page Alternatives / Works Well With: pills aligned;
  - Discover A–Z: Activepieces before AIVA, no duplicate letter headings.
- Out of scope, so left as is: START-HERE's file-map row still lists `src/app/quiz/results/` outside the `(app)` group. Entry 4.35 says it moved into `(app)`.
