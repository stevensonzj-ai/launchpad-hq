> **ARCHIVE — historical record, not current truth.**
> Exported from the LaunchPad HQ Claude project on 2026-09-07.
> Original project path: `session-19-handoff.md`
>
> This document was accurate when written and may since have been superseded.
> Current truth lives in `START-HERE.md`, `CLAUDE.md`, and the code itself
> (`prisma/schema.prisma`, `src/data/tutorials/types.ts`). Where this file
> disagrees with those, they win.

---

# Session 19 Handoff — Proving batch shipped (5 tutorials live); batch pipeline PROVEN

> **Session type:** Execution (Claude.ai planning/research/review + Claude Code execution in Cursor).
> **Date:** 2026-07-13
> **Repo/DB state at close:** main at **`81b1ac5f`** (PR #29, squash from `397a2c6b`). Production verified live against that exact sha on launchpadhq.io (deployment `dpl_8Wwhj3CTa9V3F5q4GVRZK75mGWsF`, `target: production`, READY, `aliasError: null`, aliases launchpadhq.io + www bound). DB untouched — no migrations, no Neon writes (one read-only `findUnique` recon only). Tutorials remain static TS in `src/data/tutorials/*`; dormant `Tutorial`/`UserProgress` models still intentionally unwired.

---

## What shipped this session — the 5-page proving batch

Five new tutorial pages, built from a single rigid content brief, reviewed in one sitting, squash-merged as one chunk with full deployment verification. Live on the Tutorials tab of each platform:

| Platform | slug | archetype | new domain | security spine |
|---|---|---|---|---|
| **GitHub Copilot** | `github-copilot-getting-started` | `pick-and-setup` | coding | trains on Free/Pro/Pro+ interactions (opt-out); Business/Enterprise excluded |
| **Otter AI** | `otter-getting-started` (platformSlug `otter-ai`) | `recipes` | meetings | consent-of-others (bot records everyone); cloud; Meet flagging notetakers (2026) |
| **Suno** | `suno-getting-started` | `prompts` | music | free = non-commercial + non-retroactive; license-not-ownership; trains on inputs |
| **Runway** | `runway-getting-started` | `prompts` | video | commercial + ownership on ALL tiers; watermark + third-party-IP is the risk |
| **ElevenLabs** | `elevenlabs-getting-started` | `prompts` | voice | consent-to-clone (verification); state voice laws/ELVIS Act; trains on your voice |

**Total live tutorial pages: 9** (the prior 4 — chatgpt, midjourney, zapier, ollama — plus these 5).

The planning artifact — `proving-batch-brief.md` — is the reference for how the rigid brief is structured; keep it as the template for future batch briefs.

---

## THE headline: the batch pipeline is proven (this answers the Session 17 method question)

The open decision carried since Session 17 ("hand-build vs. Fable batch") is **settled by evidence, not argument.** The proving batch existed to confirm two things; both held:

1. **The rigid brief transcribed with NO CC hand-holding.** CC invented no connective tissue on any of the 5 pages. The only two changes were mechanical **type-shape** adjustments (see below), not content decisions.
2. **The "security-varies-by-platform" calibration survived batching.** Suno vs. Runway render as genuine opposites on the live pages (Suno: free=non-commercial, license-not-ownership, trains-on-inputs / Runway: commercial+ownership on all tiers, watermark+third-party-IP). A reader comes away with opposite impressions — confirmed in screenshot review, not just in data.

**The proven method (use this for all future batches):** *I* (Claude.ai) do the live per-platform research pass and hand CC a **locked, pre-mapped-to-the-type content brief** with every field as final content + sources + research-date. CC does **mechanical transcription** only. The Midjourney "research changes the page" lesson did NOT break batching — research-that-changes-content happens **upstream in my research pass**, before any TS exists, which is exactly where it belongs. **Research changed the page 5-for-5 again this batch** (Copilot's train-on-code default, Suno's revised ownership language, Runway's Feb-2026 ToS, ElevenLabs' consent/verification rules, Otter's Meet-flagging) — the research pass is load-bearing, never a rubber stamp.

**Consequence:** real 15-page batches are unblocked. Size the next batch to review capacity (5 in one sitting was reviewable; 15 will be a bigger single review session — plan accordingly, or chunk the review). Order by seed signals (mindshare / on-site analytics / editorial), NOT GSC (still `noindex`-dark).

---

## Type contract deltas learned this session (correct these anywhere they persist)

The Session 17 contract had two fields slightly wrong; the live `types.ts` is authoritative:

- **`accessTier` is `'FREE' | 'PREMIUM'` (uppercase union), NOT `'freemium'`.** All 5 new pages set `"FREE"` (they have genuine free tiers), matching `chatgpt.ts` and the hero eyebrow render ("Tutorial · FREE"). The brief's `'freemium'` guess was wrong — corrected at build.
- **`pitfalls` is `string[]`, NOT `{title,text}[]`.** Titled pitfalls are transcribed as single strings with a leading `**bold**` run; renders through `richText()`.
- `StarterAction`, `SecurityBlock`, `WhereNext` matched the Session 17 contract exactly — no change.

**Category taxonomy correction (the audio split):** the old "Audio, Music & Voice AI" category no longer exists — it was split into **`music-generation`** (Suno's home) and **`voice-speech`** (ElevenLabs' home). Display names verbatim from `FINAL_CATEGORIES`: **"Music Generation"**, **"Voice & Speech"**. Also confirmed this session: Copilot's category is **`ai-coding-development`** ("AI Coding & Development"), and **`local-open-source-ai`** ("Local & Open-Source AI") for Copilot's 2nd pill. Pull all future category slugs from `scripts/restructure-categories-2026-05.ts` `FINAL_CATEGORIES`, not memory.

**Confirmed live platformSlugs (DB-verified via `findUnique`):** `github-copilot`, `otter-ai`, `suno`, `runway`, `elevenlabs`. **Cross-wire traps:** `github-copilot` ≠ `microsoft-copilot` (separate row); `runway` ≠ `runway-for-education` (separate row). Alias fallbacks `runway-ml`/`eleven-labs` are NOT real rows — ignore.

---

## Process notes reaffirmed / new

- **`git branch --merged` gives FALSE NEGATIVES on squash-merges.** It only detects fast-forward/true-merge ancestors; a squashed commit has a different sha than the branch tip, so `--merged` reports "not merged" for content that IS fully in main. CC re-verified squash-aware (patch-equivalence via `git cherry` against merge-base) and used `git branch -D` (not `-d`, which reuses the same broken `--merged` logic). **Standing rule for future branch cleanup: verify squash-aware, delete with `-D` only after independent confirmation.**
- **Branch hygiene done:** the 7 batched tutorials/docs branches (5× `tutorials/*` + 2× `docs/claude-md-audit*`) deleted local + origin. **Left untouched:** 6× `backup/*` (deliberate safety nets — leave them), `tutorials/structured-type` (NOT confirmed in main — may hold unmerged work; do not blind-delete). A broader hygiene pass on ~13 remaining stale locals is available later as its own per-branch task.
- **Merge ritual held:** `gh pr create --fill` → `gh pr merge --squash --subject "…"` (no inline multi-line body — the PowerShell here-string trap). Deployment verified by matching `githubCommitSha` on an actual `target: production` deploy and polling to READY + `aliasError: null` — did not assume the webhook fired.

---

## Deferred / tracked (new this session)

- **Catalog Overview-card metadata is stale in the way tutorials aren't.** Runway's Overview "Free Tier" card says "~25 seconds of **Gen-3** video" — a volatile version number the tutorial format deliberately avoids. The overview cards across the catalog likely carry similar stale version/pricing facts. Worth a **freshness pass on overview-card metadata** someday — separate workstream from tutorials, not urgent, but it undercuts the accuracy-is-the-product stance if left indefinitely.
- **CLAUDE.md convention drift (fold into Tier 3):** the filename convention is now "matches the tutorial **`slug`**, not `platformSlug`." Otter is the first divergence (`otter-getting-started.ts` with `platformSlug: otter-ai`) — the prior 4 pages happened to have slug === platformSlug. CLAUDE.md still phrases it as `{platformSlug}-getting-started.ts`. One-line doc fix; slots into the deferred Tier 3 pass.
- **`changelogUrl` still set-but-not-rendered** (kept deliberately — feeds the future maintenance signal-detection layer). Runway's page uses the authorized fallback `runwayml.com/research` (primary URL 400'd). Not dead data; do not "clean up."

---

## Designated first actions next session (in order)

1. **First real batch — decide size + slate.** Pipeline is proven; this is now a scale/capacity call, not a method call. Candidate archetype spread continues cross-archetype, no stacked chat LLMs: a 2nd coding tool, a 2nd meetings/notes, an API/dev service (the deferred `pick-and-setup` #3 — held out of the proving batch as too-advanced for a low-risk selection variable, now fair game), more verticals (writing, design, research, avatar-video). Size the review session honestly against fragmented time — 15 is the playbook target but the review is one sitting; a 10 is legitimate.
2. **Research pass → rigid brief** for the chosen slate (same method as `proving-batch-brief.md`). Get slate blessed before sinking research time.
3. **Tier 3 CLAUDE.md lean-down (optional, gates nothing).** Recon pass on duplicated strategy prose → pointers to reference docs; KEEP the moderation action-route policy and the `privacyLevel`/inclusion-disclosure material pending a read. Fold in the filename-convention one-liner (above). Lowest urgency; clean low-energy-session pickup.

---

## Carry-forward from prior handoffs (unchanged, still owed)

Jasper dedup Neon dry-run (script merged `e3b55d76`, unrun — deliberate hold; **footgun: defaults to LIVE, pass `--dry-run`, Neon branch first**) · held vertical commit `9edda0fa` cherry-pick for Legal+Beginner eval · Clerk Production-instance migration (pre-paywall prereq; still on dev instance) · LLC formation → business banking → production Stripe (raw Stripe SDK, Clerk is auth-only) → paywall enable · For You news feed + Tier 2/3 deep tutorials (post-paywall) · maintenance Cron + suggestion layer (build once ~20+ deep pages exist — currently 9).
