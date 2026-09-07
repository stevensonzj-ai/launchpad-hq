> **ARCHIVE — historical record, not current truth.**
> Exported from the LaunchPad HQ Claude project on 2026-09-07.
> Original project path: `Claude-Fable-5-Session-Handoff.md`
>
> This document was accurate when written and may since have been superseded.
> Current truth lives in `START-HERE.md`, `CLAUDE.md`, and the code itself
> (`prisma/schema.prisma`, `src/data/tutorials/types.ts`). Where this file
> disagrees with those, they win.

---

# Claude Fable 5 Session Handoff

**Date:** June 11, 2026
**Project:** LaunchpadHQ (launchpadhq.io)
**Supersedes for execution purposes:** the merge/quiz sections of the Session 10 handoff (see "What changed since Session 10" below). Session 10 remains the record of the strategy/planning and infra work; this document is the current source of truth for the code-merge state.

---

## TL;DR — where we are

- The Fable 5 autonomous code session ran successfully: **8 tasks, 6 work branches, all clean and on origin, none merged to main.**
- **Nothing is blocked.** Two tasks were honest no-ops on recon (already-done / inverted-premise) — not partial work.
- The one previously-pending quiz item is resolved: the **anon-flow fix is already merged and live in production** (it predates the Fable baseline). The other quiz branch was **superseded and split** by the Fable run.
- What remains is **methodical, human-reviewed merging** of the 6 Fable branches in a fixed order, with one known conflict to hand-resolve, then a quiz re-evaluation once the vertical commit lands.

---

## Confirmed git ground truth (verified this session)

Main is at `5bfc3870`, in sync with origin. Recent history:

```
5bfc3870  chore: trigger production deploy            ← tip of main
b47913b5  Feature/quiz anon flow fix (#14)            ← anon-flow IS merged + live
cae5866d  feat(sentry): Sentry monitoring (#13)       ← Fable branches were cut from HERE
aa6f7255  feat(analytics): Vercel Analytics (#12)
42658327  feat: category restructure (#11)
```

**Critical nuance:** the Fable session branched from `cae5866d` — **one commit below** the anon-flow merge (`b47913b5`). So Fable saw `feature/quiz-anon-flow-fix` as "unmerged" relative to *its* baseline, but relative to *current main* it is already merged and live. This is why its handoff listed an anon-flow "Task 1" and why a `quiz-client.tsx` conflict is now guaranteed (see merge order).

---

## What changed since the Session 10 handoff

Session 10 said two quiz branches existed and one was live. Both are now fully resolved:

| Session 10 item | Status now |
|---|---|
| `feature/quiz-anon-flow-fix` — "DONE, MERGED, LIVE" (`b47913b`) | **Confirmed still true.** It's in current main's history. **Do not re-merge; delete the stale branch.** |
| `feature/quiz-scoring-fixes` — "PARKED, SUPERSEDED" (4 commits) | **Split by Fable.** 3 safe commits → `feature/quiz-scoring-safe`. Vertical commit `9edda0fa` → held (backed up). **Do not merge the original branch directly** — that would pull the vertical commit in prematurely. |

Net: the "two quiz tasks" from Session 10 are accounted for. One is live; the other is split into a safe branch (ready) and a held commit (waits for the difficulty fix). **There is no separate, unmerged quiz work hiding anywhere** — verified via `git branch --no-merged main` and `git log main..feature/quiz-scoring-fixes`.

---

## The 6 Fable branches (all on origin, none merged)

| Branch | Commit(s) | What it does | Notes |
|---|---|---|---|
| `feature/config-fixes` | `0b3e1cc5` | Adds `npm run typecheck` (`tsc --noEmit`). | Sentry "Fix 1" correctly NOT applied — see no-ops below. |
| `feature/quiz-scoring-safe` | 3 commits | Q5 removal; expose automation/education/data_analysis goals + 2-col grid; enterprise-budget FREE/FREEMIUM fix. | **Will conflict with main in `quiz-client.tsx`** (anon-flow is now on main). |
| `feature/quiz-difficulty-filter-fix` | `7e600a55` | Soft difficulty filter (×0.65 penalty + amber "Advanced" badge); 15% min-score → honest empty state with Discover link. | Touches `recommendations-core.ts`, `platform-card.tsx`, `for-you/page.tsx`. |
| `feature/discover-filters` | `adc65176` | Difficulty chip row + "Has free tier" chip on Discover; hardened bad-param handling. | `?difficulty=advanced` now includes EXPERT (flag). |
| `feature/moderation-email` | `9f0f96d8`, `e56b290e` | Resend wiring, HMAC TTL token, `GET /api/moderation`, notification hooks (prompts/discussions/replies). | Needs `MODERATION_SECRET`. GET-mutation-link flag (below). |
| `feature/jasper-dedup` | `e30d1aee` | Runtime-discovery dedup script, `--dry-run`. **Never executed.** | Least-verified artifact (no DB access). |

**Resolved without a branch (honest no-ops, not skipped work):**
- **Task 7** — duplicated sidebar/main bug **doesn't exist**; platform detail page is single-column (earlier redesign fixed it). Field-by-field audit confirmed no duplication. **CLAUDE.md P0 item 5 can be checked off.**
- **Task 8 Fix 1** — Sentry config "fix" correctly **not** applied: on `@sentry/nextjs` v10 the existing `webpack.*` placement is current; the brief's premise was inverted. "Fixing" it would have broken working config.

**Backup ref:** `backup/feature/quiz-scoring-fixes` → `9edda0fa` (the held vertical commit).

---

## The held vertical commit

`9edda0fa` (legal/healthcare/finance/sales-marketing keyword buckets + picker entries) is **deliberately held**. It depends on the difficulty-filter fix being on main first — without it, "Beginner + Legal" returns flat-scored filler (the original problem). Bring it in **last**, on a fresh branch, after the difficulty fix merges → preview → evaluate.

---

## ORDER OF OPERATIONS

### Phase 0 — Prep (read-only)
1. Confirm clean tree on main: `git status` → clean; `git checkout main && git pull origin main`.
2. Delete the stale, already-merged anon-flow branch (optional but tidy):
   `git branch -d feature/quiz-anon-flow-fix` (local) — leave origin copy or delete to taste.

### Phase 1 — Merge the Fable branches (each: review diff → Vercel preview → merge to main)
Order is fixed by dependency and conflict risk:

1. **`feature/config-fixes`** — merge first; gives `npm run typecheck` for the reviews that follow. Lowest risk.
2. **`feature/quiz-scoring-safe`** — **CONFLICT EXPECTED in `quiz-client.tsx`** (`finish()` + header) against the now-merged anon-flow code. Resolution: **keep both sides** — anon-flow's redirect split and scoring's header/Q5 changes are orthogonal. This is the one real human-judgment moment; eyeball it.
3. **`feature/quiz-difficulty-filter-fix`** — `recommendations-core.ts` hunks shouldn't overlap #2's, but verify. Touches `for-you/page.tsx` (empty state) and `platform-card.tsx` (badge).
4. **`feature/discover-filters`** — independent.
5. **`feature/moderation-email`** — **set `MODERATION_SECRET` in Vercel + local first.** Then merge.
6. **`feature/jasper-dedup`** — merging just lands the script; it does nothing until you run it (see Phase 3).

### Phase 2 — Quiz re-evaluation + vertical commit
7. After #2 and #3 are merged, cherry-pick the held `9edda0fa` onto a **fresh** branch off updated main → Vercel preview.
8. **Evaluate "Legal + Beginner" on the preview:** it should now show legal tools with amber "Advanced" badges, not flat-23% filler. This is the decision point that the whole difficulty-filter fix existed to enable.
9. If it looks right, merge. Then **retire** `feature/quiz-scoring-fixes` and `backup/feature/quiz-scoring-fixes` (their content now lives on main + the new branch).

### Phase 3 — Jasper data fix (operator, manual, never autonomous)
10. On a **Neon branch**: run the script with `--dry-run`, read the logged duplicate JSON, confirm the canonical pick.
11. Run live on the Neon branch → verify in Neon SQL editor → only then production. Never skip the dry-run.

### Phase 4 — Follow-ups (not blocking; schedule as time allows)
- **GET → POST moderation interstitial** before driving any public submissions (see flags).
- `/for-you` QuizCta copy: "5 quick questions" → "4" (one-liner).
- 15 pre-existing npm vulnerabilities (xlsx) — eventually.

---

## Env vars

- **`MODERATION_SECRET`** — NEW. Generate yourself: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`. Add to Vercel (Production/Preview as needed) + local **before merging `feature/moderation-email`**. No value was generated by the session.
- `RESEND_API_KEY`, `MODERATION_NOTIFICATION_EMAIL` — already in Vercel; code references both correctly.
- `NEXT_PUBLIC_APP_URL` — pre-existing; now also the fallback origin for email links.
- **Confirm:** email sender constant is `notifications@launchpadhq.io` in `src/lib/email.ts` — verify it matches the Resend-verified domain (Session 9 scoped Resend to `send.launchpadhq.io`) or mail won't send.

---

## Owner verification on preview (per relevant merge)

- **Quiz (after Phase 1 #2–#3):** beginner run shows above-level tools ranked lower with amber "Advanced" badges; 10-option goal picker in 2-col grid; header reads "4 quick questions." (Legal+Beginner check comes in Phase 2.)
- **Discover:** check 320 / 375 / 414px — every filter row wraps, no horizontal scroll. `/discover?category=text-conversational-ai&cost=free-tier&difficulty=beginner&sort=alpha` highlights all four chips, filters correctly, URL shareable.
- **Moderation round-trip:** set `MODERATION_SECRET` in preview → submit a prompt → email arrives (type/platform/preview) → Approve → confirmation + prompt public → Approve again → "Already reviewed" → Reject same email → still "Already reviewed" → repeat for a discussion and a reply → tamper one token char → "Invalid link."
- **Platform detail:** skim one content-rich page; each field appears once (no change made).

---

## Flags carried forward

1. **GET-mutation moderation links** — approve/reject act on GET; email scanners that prefetch could auto-trigger. Softened by idempotency + 24h TTL. **Before driving public submissions, switch to a POST-confirm interstitial** (email link → page → button POSTs). Not a merge-blocker at zero volume.
2. **`?difficulty=advanced` includes EXPERT** in Discover — slightly broader than before. Product call; likely correct for a beginner site (keeps powerful tools reachable). Verify on preview.
3. **Replies trigger moderation notifications too** — remove one hook if unwanted.
4. **`/for-you` QuizCta still says "5 quick questions"** — becomes 4 after merge; one-line follow-up.
5. **15 pre-existing npm vulnerabilities** (xlsx) — unrelated to this work.
6. **No Gmail addresses existed** repo-wide — the Gmail-cleanup sub-task was a no-op.

---

## Session health (Fable run)

Clean run. No material context compression. One trivial self-corrected snag (PowerShell mangled an inline multiline commit message → switched to `git commit -F`). Constraint compliance perfect: no merges/pushes to main, no DB-modifying commands, Jasper script never executed, `.env.local` untouched, only `resend` installed, branch-before-write held throughout. Recon corrected five brief assumptions (Sentry premise, Task 7's nonexistent sidebar, nonexistent Gmail addresses, Discover's already-present filters, the 2-col grid's commit location) — all resolved by evidence, none by guessing.

---

## Working rules (unchanged)

- All execution via Claude Code; this conversation is for planning, review, decisions.
- Read-only recon before edits; diff review before risky writes; **Vercel preview verification before every merge to main.**
- Middleware lives at `src/proxy.ts`, never `middleware.ts`.
- Operator runs all Prisma migrations and data scripts manually in PowerShell, **Neon branch first**, verified in Neon SQL editor before production.
- `Remove-Item Env:DATABASE_URL` before switching between branch-targeted and production-targeted commands.
- **Push freely (backup), merge deliberately (the live gate).**

---

## Note on the raw Fable handoff

The Fable session also wrote `tmp/SESSION-HANDOFF.md` (gitignored) in the repo. This document supersedes it by folding in the Session 10 reconciliation, the confirmed git ground truth, and the corrected merge order. Keep both until the merges are complete if you like, then this one is the keeper.
