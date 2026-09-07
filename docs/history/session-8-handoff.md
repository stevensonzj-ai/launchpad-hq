> **ARCHIVE — historical record, not current truth.**
> Exported from the LaunchPad HQ Claude project on 2026-09-07.
> Original project path: `session-8-handoff.md`
>
> This document was accurate when written and may since have been superseded.
> Current truth lives in `START-HERE.md`, `CLAUDE.md`, and the code itself
> (`prisma/schema.prisma`, `src/data/tutorials/types.ts`). Where this file
> disagrees with those, they win.

---

# Handoff Summary: LaunchpadHQ — Session 8 → Session 9

**Who I am:** Zach Stevenson. Solo dev, first major web project, building LaunchpadHQ — a curated AI platform discovery site for beginners. Live at launchpadhq.io. Paternity leave starting soon. Currently the only active user of the site.

---

## What this session was

Session 8 was the Phase 1 execution session from the Session 7 plan: the category restructure. 9 commits, 2 schema migrations, 1 idempotent data-shuffle script, 45 platform reassignments, all merged via PR #11 with zero production rollbacks.

The site now runs on a 20-category taxonomy (was 15), with the three problem categories — Industry-Specific AI (28 platforms, unbrowsable), Audio Music & Voice AI (12 platforms, three different user needs), Browser Extensions & Productivi (5 platforms, three different destinations) — split into purpose-built categories.

---

## The new taxonomy (20 categories, locked-in sortOrder)

| #  | Category                          | Count | Provenance        |
|----|-----------------------------------|-------|-------------------|
| 1  | Text & Conversational AI          | 12    | existing (+1)     |
| 2  | Image Generation & Editing        | 10    | existing          |
| 3  | Video Creation & Editing          | 9     | existing          |
| 4  | Music Generation                  | 7     | new (from Audio)  |
| 5  | Voice & Speech                    | 4     | new (from Audio)  |
| 6  | Research & Academic Tools         | 14    | existing (+1)     |
| 7  | Document & PDF Processing         | 8     | existing          |
| 8  | Meetings & Notes                  | 4     | new (1 Audio + 3 Browser) |
| 9  | AI Coding & Development           | 15    | existing          |
| 10 | Workflow & Automation             | 12    | existing          |
| 11 | AI Plugins for Business Software  | 12    | existing (renamed from "Softwar") |
| 12 | Sales, Marketing & SEO AI         | 5     | new (from Industry) |
| 13 | Education & Learning AI           | 5     | new (from Industry) |
| 14 | Legal AI                          | 6     | new (from Industry) |
| 15 | Healthcare AI                     | 4     | new (from Industry) |
| 16 | Finance & Real Estate AI          | 6     | new (from Industry) |
| 17 | AI APIs & Developer Services      | 14    | existing (+2: Clarifai, Scale AI) |
| 18 | Local & Open-Source AI            | 10    | existing          |
| 19 | International & Regional AI       | 6     | existing          |
| 20 | Gaming & Creative AI              | 7     | existing          |

170 platforms total. Deleted categories: `industry-specific-ai`, `audio-music-voice-ai`, `browser-extensions-productivi`.

Naming convention now locked in: keep "AI" suffix on the verticals (Legal AI, Healthcare AI, Education & Learning AI) to signal the domain; drop it on the functional categories that are self-evidently AI (Music Generation, Voice & Speech, Meetings & Notes).

---

## What the 9 commits did

| Hash       | Message                                                                    | Why it mattered                                                                                                                                                                                |
|------------|----------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `30c76330` | chore(db): rename Softwar category to Software                             | Migration A. Fixed the Excel-truncation bug from initial import. Slug went `ai-plugins-for-business-softwar` → `ai-plugins-business-software`. Safe-on-rerun because WHERE matches old slug only.|
| `f644cbc8` | feat(scripts): add idempotent category restructure script                  | 442-line script. Upserts 8 new categories, renumbers all 20 sortOrders, reassigns 45 platforms by slug, writes audit log JSON, exits non-zero on any orphan or not-found. Re-runnable safely.   |
| `1d419bc1` | chore(scripts): repoint audio-mapped seeds to Voice & Speech               | `CATEGORY_NAMES.audio` → `voiceSpeech`. Descript/Murf-AI/PlayHT seed rows now reference voice-speech instead of the deleted Audio category. Defensive: keeps `seed-missing-platforms` runnable.   |
| `b5f44c64` | chore(scripts): rename and guard legacy import-platforms script            | `import-platforms.ts` → `import-platforms-legacy.ts` with `--force-legacy-import` guard. Preserves historical record without footgun.                                                            |
| `f320c715` | chore(db): remove superseded category rows                                 | Migration B. Safety-guarded DELETE: `DO $$` block aborts if any platform still references the 3 superseded slugs.                                                                              |
| `8142e70f` | feat(redirects): add 301s for old category slugs                           | 4 redirects across 2 layers. See "Redirect architecture" below — this was the riskiest commit.                                                                                                  |
| `4f19a24e` | feat(home): refresh category tiles and dynamic count for new taxonomy      | 15-tile homepage grid (was 15 stale tiles, now 15 fresh ones), tiles link to filtered `/discover?category=<slug>` URLs, new cached `getCategoryCount()` helper replaces hardcoded "15" in 3 places.|
| `b0583364` | chore(cleanup): remove CATEGORY_DISPLAY_OVERRIDES after DB rename          | Deleted `src/lib/categories.ts` entirely. Three callsites switched from `displayCategoryName(category.name)` to bare `category.name`.                                                          |
| `21cc469`  | fix(home): force explicit space after dynamic category count               | Found at Vercel preview verification. React was stripping JSX trailing whitespace after `{categoryCount}` (the same-line `}` + text pattern triggers it). Fixed with `{categoryCount}{" "}categories`. |

Squash-merged into main as commit `4265832`.

---

## Redirect architecture (worth remembering)

The redirect work split into two layers because of Next.js issue #24949: **`has`-matched query params get passed through to the destination, causing infinite loops when stripping a filter via `redirects()`**.

| Old slug                           | Layer                     | Behavior                                                            |
|------------------------------------|---------------------------|---------------------------------------------------------------------|
| `ai-plugins-for-business-softwar`  | `next.config.ts` redirects | 308 to `ai-plugins-business-software` (different destination value — safe, no loop) |
| `browser-extensions-productivi`    | `next.config.ts` redirects | 308 to `meetings-notes` (different destination value — safe)        |
| `industry-specific-ai`             | `src/proxy.ts` middleware  | 308 to bare `/discover`, preserves other query params, removes `category=`. Middleware-issued redirect doesn't pass-through params, so no loop. |
| `audio-music-voice-ai`             | `src/proxy.ts` middleware  | Same as above.                                                       |

`STRIPPED_CATEGORY_SLUGS = Set(["industry-specific-ai", "audio-music-voice-ai"])` in `src/proxy.ts`. The strip block runs before Clerk's auth check, so signed-out users hitting old URLs get redirected before any auth processing. All four scenarios verified end-to-end on the Vercel preview before merge — no loops, params preserved, `permanent: true` and middleware-issued redirects both emit 308.

**If a future restructure adds new 1-to-many split redirects, they go in `src/proxy.ts`, not `next.config.ts`.**

---

## Decisions locked in this session

These are decisions that came up during planning/execution and shouldn't be re-litigated without good reason:

- **Sort order renumbered 1-20** rather than preserved-and-appended. The renumber was free (single update inside the data-shuffle script) and produces a coherent visual hierarchy.
- **Homepage curates 15 tiles, not 20.** Drops: AI Plugins for Business Software, Sales/Marketing/SEO, AI APIs, International, Gaming, Finance & Real Estate, Voice & Speech alternative. Keeps: the five vertical AI categories (Legal, Healthcare, Education, plus the two consumer-creative ones) to signal breadth, with Open Source as the technical/community tile. The choice was deliberate — homepage tells the story "AI is broader than ChatGPT and Claude" without being a complete catalog index.
- **Tiles link to `/discover?category=<slug>`** instead of generic `/discover`. They're functional entry points now, not decorative.
- **`getCategoryCount()` returns the exact integer**, not rounded. Category counts are small and deliberate; rounding would lose precision (14 → 10 would be misleading).
- **Category metadata writes are no-op on existing rows**: the data-shuffle script's `update` branch writes name/icon/description on every category, but for existing rows those values match the spec, so the writes are no-ops in steady state. Side benefit: one canonical source of truth for category metadata in the script.
- **Legacy import script preserved, not deleted.** Renamed + guarded. Historical record of the original import shape is valuable; the `--force-legacy-import` flag prevents accidental misuse.

---

## What's NOT in scope from this session (still open)

### From Session 7 — Phase 2 and Phase 3 of the catalog work

**Phase 2 — Catalog research, three batches:**

- Batch 1: Text & Conversational AI, Image Generation, Video Creation, Coding, Music Generation, Voice & Speech
- Batch 2: Workflow & Automation, Business Software Plugins, Meetings & Notes, Document & PDF Processing, Research & Academic Tools
- Batch 3: The five new verticals (Legal, Healthcare, Finance & Real Estate, Education, Sales/Marketing/SEO), International, Local & Open-Source, Gaming, AI APIs

Per Session 7 spec, each batch produces: inclusion candidates (with recommended `privacyLevel` + factual disclosure note + source URL) and exclusion holding-doc candidates (with date-stamped observation + primary source). Format is in the Session 7 handoff and is now baked into CLAUDE.md.

**Phase 3 — Excluded Platforms page publication:** Still gated on legal boilerplate review by a small-business attorney. No timeline. The Phase 2 research format will produce holding-doc entries already in legally defensible shape, so no rework when the page is eventually built.

### Carry-forward items still open from Session 6

**Ready to do:**
- Difficulty filter on Discover (~45 min, well-scoped)
- Onboarding quiz investigation (read-only; quiz `goalKeywords` not updated for the new verticals — that's worth investigating as part of this)
- Bookmark coverage audit
- Cross-axis color collisions (1-2 hr, needs design-system thinking)
- Full manual test checklist
- Admin moderation UI

**Strategic/business:**
- LLC formation (~30 days before paywall enable)
- Business email (Google Workspace) — anytime, not LLC-gated
- Premortem (Sessions A + B per Session 6 plan)
- Pricing validation

**Tech debt in CLAUDE.md:**
- Add `typecheck` script to package.json
- react-query installed but unused (decide: adopt consistently, or remove)
- Legacy `Prompt.author` String? column cleanup
- Discover/detail page favoriteIds queries unbounded
- Discover `take: 200` hardcoded
- Cross-tab desync on favorites
- ~~Platform count inconsistency (170/171/168)~~ — substantially resolved: the new dynamic `getCategoryCount()` pattern can be applied similarly to platform count if remaining inconsistency surfaces.

### New from this session

- **Quiz `goalKeywords` doesn't include the new verticals.** The matching engine still references the old "Industry-Specific AI" string. Likely means quiz matches for Legal/Healthcare/Finance/Education/Sales bucket all dump into nothing. Worth a read-only investigation before next session: `src/lib/recommendations-core.ts` and the quiz scoring logic.
- **Vercel preview URLs are reusable across commits in this account's setup.** Each PR keeps the same preview URL (just the hash in the URL stays the same as commits come in). Useful to know: you don't need to re-grab the URL after each push.
- **PowerShell env-var persistence:** `$env:DATABASE_URL='...'` persists for the rest of the terminal session, NOT just the current command. Discipline going forward: always `Remove-Item Env:DATABASE_URL` before transitioning between branch-targeted and production-targeted commands. We hit this once during Session 8 (Step 1.4 first try went against the branch a second time because the env var was still set) — caught it quickly via the Datasource line in the Prisma output.

---

## Editorial principles from Session 7 (still in effect, in CLAUDE.md)

Restating the most relevant ones since Phase 2 catalog research is the next major content workstream:

- **Inclusion bar:** beginner relevance OR high mindshare OR meaningful category completeness.
- **Inclusion-with-disclosure is the default** for higher-concern platforms (China-based, privacy-questionable, etc.). Use `privacyLevel` honestly and write factual disclosure notes in the description. Silent exclusion is worse for users and for legal defensibility than honest inclusion.
- **Exclusion bar:** per-platform observable facts only. Acceptable grounds: privacy (specific clauses), safety (documented incidents), regulatory (documented action), abandoned/inactive, scam signals (specific patterns), not actually AI.
- **`privacyLevel` is a factual signal, not a brand.** LOW is informative and useful, not a death sentence. Don't inflate to HIGH to be polite.

---

## State of the project at end of Session 8

- **Branch:** `main`. Local synced with origin via fast-forward.
- **Working tree:** clean except for `tmp/category-restructure-*.json` audit logs (gitignored).
- **Production:** launchpadhq.io is running the new taxonomy. Verified live.
- **Database:** 170 platforms across 20 categories. Branch `pre-restructure-2026-05-12` deleted from Neon.
- **PRs this session:** #11 (squash-merged, 9 commits, 4265832 on main).
- **Audit logs:**
  - `tmp/category-restructure-2026-05-12T17-33-26-205Z.json` (Neon branch run)
  - `tmp/category-restructure-2026-05-12T18-03-28-451Z.json` (production run)
  Both gitignored, persisted locally for reference.

---

## Starting Session 9

The structural work is done. The next session's job is content — Phase 2 catalog research.

1. `cd C:\Users\Zach\Projects\launchpadhq && git checkout main && git pull origin main`
2. Read this handoff plus the current CLAUDE.md (which now contains both the Session 6 Excluded Platforms rules and the Session 7 editorial principles).
3. **Recommended first task: quiz `goalKeywords` investigation.** Read-only pass on `src/lib/recommendations-core.ts`, the quiz scoring logic, and any seed/import scripts that reference category strings. The new five verticals (Legal AI, Healthcare AI, Finance & Real Estate AI, Education & Learning AI, Sales/Marketing/SEO AI) almost certainly aren't represented in the quiz mapping. Report findings before proposing edits — the goalKeywords surface is probably small but worth understanding fully before changing.
4. **Then:** Phase 2, Batch 1 — research session for Text & Conversational AI + Image Generation + Video Creation + Coding + Music Generation + Voice & Speech. Per-platform inclusion candidates with privacyLevel + disclosure note + source URL. Per Session 7 spec format.
5. **Or alternatively:** any of the Session 6 carry-forward items (difficulty filter, bookmark audit, cross-axis colors, admin moderation UI). All still ready to do.

Per the working-style rules and CLAUDE.md, all execution still goes through Claude Code. This conversation is for strategy, prompt drafting, review, and decision-making.

---

## Working style — unchanged

All Session 6 working-style rules and the Session 7 "pushback on plans, not just execution" addition still apply. Reinforced once more in Session 8:

- **The Vercel preview surfaced a bug** (React JSX whitespace stripping) that would have been invisible in dev. The Pass 1 + Pass 2 verification discipline before merge is real value, not ceremony.
- **Claude Code's pre-write diff review caught the redirect loop risk** before the commit landed. Reviewing diffs before approving file writes is non-negotiable for risky changes.
- **PowerShell env-var hygiene matters.** Always `Remove-Item Env:DATABASE_URL` before transitioning between branch and production runs.
- **Operator-only steps are invisible to Claude Code.** When you come back to Claude Code after an operator step (SQL Editor, prisma migrate deploy in your terminal), give it a one-line status update so it doesn't lose the thread. This is especially important at phase boundaries.

---

## Acknowledgments

Session 8 was a substantive execution session — 9 commits, 2 migrations, 45 platform reassignments, 4 redirect rules across 2 layers, all on a Neon branch first then production, with one minor JSX whitespace bug caught at preview-verification and resolved before merge. No rollbacks. The Session 7 planning paid off: by the time execution started, the only real-time decisions were small editorial ones (homepage curation, sort order strategy, emoji picks). The big decisions were already made.

Next session is content work, not structural. The catalog now has clean buckets to fill.
