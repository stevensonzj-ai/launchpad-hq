> **ARCHIVE — historical record, not current truth.**
> Exported from the LaunchPad HQ Claude project on 2026-09-07.
> Original project path: `session-20-handoff.md`
>
> This document was accurate when written and may since have been superseded.
> Current truth lives in `START-HERE.md`, `CLAUDE.md`, and the code itself
> (`prisma/schema.prisma`, `src/data/tutorials/types.ts`). Where this file
> disagrees with those, they win.

---

# Session 20 Handoff — First real batch shipped (10 tutorials); 19 live; batch method now standard

> **Session type:** Execution (Claude.ai research/planning/review + Claude Code execution in Cursor).
> **Date:** 2026-07-13
> **Repo/DB state at close:** main at **`cb8f407d`** (PR #30, squash from `81b1ac5f`, +1052 lines, 11 files). Production verified live against that exact sha on launchpadhq.io (deployment `dpl_BjXJYQSfudAcEQ1iF9W1KYLKyape`, `target: production`, READY, `aliasError: null`, domains bound). DB untouched — one read-only `findUnique` recon only. Tutorials remain static TS in `src/data/tutorials/*`; dormant DB models still unwired.

---

## What shipped — the first real (10-page) batch

Ten new tutorial pages, built from one two-part rigid brief (`second-batch-brief.md`), reviewed in one sitting, squash-merged as a single PR with full deployment verification. Live on the Tutorials tab of each platform.

| # | Platform | slug | archetype | accessTier | churn |
|---|----------|------|-----------|------------|-------|
| 1 | **Cursor** | `cursor-getting-started` | pick-and-setup | FREE | A · re-check on acquisition close |
| 2 | **OpenAI API** | `openai-api-getting-started` | pick-and-setup | **PREMIUM** | A |
| 3 | **Lovable** | `lovable-getting-started` | prompts | FREE | A |
| 4 | **Perplexity** | `perplexity-getting-started` (platformSlug `perplexity-ai`) | prompts | FREE | A |
| 5 | **NotebookLM** | `notebooklm-getting-started` | prompts | FREE | B |
| 6 | **Adobe Firefly** | `adobe-firefly-getting-started` | prompts | FREE | B |
| 7 | **Canva AI** | `canva-ai-getting-started` (platformSlug `canva-ai-magic-studio`) | prompts | FREE | B |
| 8 | **HeyGen** | `heygen-getting-started` | prompts | FREE | B |
| 9 | **Copy.ai** | `copy-ai-getting-started` | prompts | FREE | B |
| 10 | **Notion AI** | `notion-ai-getting-started` | prompts | **PREMIUM** | B |

**Total live tutorial pages: 19** (4 pilot + 5 proving batch + these 10).

---

## THE headline: the batch method is proven at scale and is now the standard

Session 19 proved the pipeline *works* (5 pages). Session 20 proved it **scales to a real 10-page batch and that Zach's one-sitting review throughput can absorb ten.** That was the open scale question; it's answered with evidence. The batch method is no longer provisional — it's the established way this catalog gets built.

What held at 10×:
- **The rigid brief transcribed with no CC improvisation** across all ten. The only changes were mechanical type-shape fixes CC made correctly (below).
- **The security-varies-by-platform calibration survived at ten**, including two deliberate cross-page contrasts that read as intended on the rendered pages: **Firefly ↔ live Midjourney** (licensed-training + paid indemnity vs. trains-on-your-inputs) and **HeyGen ↔ live ElevenLabs** (consent-to-likeness in video vs. voice). Plus useful pattern-breakers: NotebookLM (grounded/reassuring), Copy.ai (output-trust, not data), Canva (sits *between* Firefly and the anxious pages).
- **Research changed the page 10-for-10 again** — none could have been written from memory. Standouts: the Cursor/SpaceX acquisition (see below), OpenAI-API-doesn't-train-on-standard-traffic-by-default, Notion killing its standalone AI add-on, Firefly's paid-only indemnity, Canva's opt-out-by-default training.

**Method, restated (use for all future batches):** Claude.ai does the live per-platform research pass and hands CC a locked, type-mapped content brief with every field as final content + sources + research-date; CC does mechanical transcription only. For a batch >~5 pages, split the research/brief into clusters within the session (this batch: technical + creative), but hand CC one combined brief.

---

## Notable current-events find (verified this session)

**Cursor's maker Anysphere is being acquired by SpaceX** — $60B all-stock, signed June 16 2026, pending Q3 2026 close, ties Cursor into the xAI/Grok orbit. Confirmed across CNBC/CBS/Forbes/Reuters. The deal is *signed but not closed*, and as of the review date hasn't changed product/pricing/data-handling. The Cursor page handles this mechanism-first and hedged in before-you-start; **Cursor is flagged Tier-A with a re-check-on-close trigger** — revisit its page when the deal closes (Q3 2026), since ownership/branding facts will move. (Zach's instinct surfaced this; Claude's initial skepticism was wrong — the surprising claim was true. Search-when-surprising did its job.)

---

## Type-shape / process notes reaffirmed this session

- **CC caught a real formatting bug Claude introduced:** the brief wrapped pitfall titles in code backticks (`` `**Title.**` ``), which would have rendered every pitfall as a monospace chip with visible `**`. CC correctly read the brief's own type-note, stripped the backticks, kept the bold — all 30 pitfalls. Also converted five stray single-asterisk italics to bold (renderer + prose rule support neither). No wording changed. **Lesson: don't wrap the bold title run in backticks in future briefs — plain `**Title.**` text.**
- **`accessTier` `'FREE' | 'PREMIUM'` (uppercase)** confirmed again; **two PREMIUM pages** (OpenAI API, Notion AI) now established as a pattern — both render "Tutorial · PREMIUM" correctly and read as intentional. Rule of thumb: PREMIUM when there's no usable free tier (API is pay-per-token; Notion AI is Business-plan-gated, Free/Plus give only a ~20-response trial).
- **`pitfalls` `string[]`**, bold-led; **`gettingSetUpSafely` omitted** on all (cloud tools) — both held.
- **`git branch --merged` still lies on squash-merges** — squash-aware verification + `-D` remains the standing rule (unused this session; no branch cleanup needed).
- **Merge ritual held:** `gh pr create --fill` → `gh pr merge --squash`; verified by matching `githubCommitSha` on a real `target: production` deploy polled to READY + `aliasError: null`. Did not assume the webhook.

---

## Watch-items / deferred (new this session)

- **Build time jumped to ~146s** (from the usual ~50–70s) on this deploy. Clean, no error state — most likely the ten new static pages plus Vercel variance. **Not a problem to chase now, but logged as a baseline:** if the next batch pushes build time toward a timeout, this is the trend's start, not a cold surprise. If it snaps back to ~60s next deploy, ignore.
- **Two review-flagged decisions shipped as-is, to revisit at the next bulk review** (Zach's call):
  - **Firefly `changelogUrl` unverifiable** — Adobe bot-blocks automated requests (`curl` returned `000`, not a 404), so CC kept the real changelog URL rather than swap to an unverifiable product page. Zero user-facing impact (set-but-not-rendered; feeds the future maintenance layer only). Spot-check by hand someday.
  - **Second Canva catalog row left unwired** — two rows exist: `canva-ai-magic-studio` (image-gen, "Canva AI (Magic Studio)") which the tutorial correctly wires, and `canva-magic-studio` (business-plugin). Correct call; noted in case the duplicate row wants cleanup later.
- **`whereToNext` category-slug map is now fully known** (verified this session): `ai-apis-developer-services`, `research-academic-tools`, `text-conversational-ai`, `document-pdf-processing`, `ai-plugins-business-software`, `voice-speech`, plus the earlier-confirmed `ai-coding-development`, `local-open-source-ai`, `image-generation-editing`, `video-creation-editing`, `workflow-automation`. **No live "design" or "music-generation-only" category** — audio split is `music-generation` / `voice-speech`; design tools point at `image-generation-editing` + a domain-appropriate 2nd pill.

---

## Carry-forward from prior handoffs (still owed / unchanged)

- **CLAUDE.md convention drift (Tier 3):** filename convention is "matches the tutorial `slug`, not `platformSlug`" — now THREE divergences (Otter, Canva AI, Perplexity: slug ≠ platformSlug). One-line doc fix.
- **Catalog Overview-card metadata is stale** in the way tutorials aren't (e.g. Runway's Overview card said "Gen-3 video" — a volatile version the tutorial format avoids). Freshness pass on overview cards someday; separate workstream.
- **`changelogUrl`** kept set-but-not-rendered (feeds future maintenance signal layer) — do not "clean up."
- **Tier 3 CLAUDE.md lean-down** (optional, gates nothing) — recon pass on strategy prose → pointers; fold in the filename-convention line. Lowest-urgency clean-session pickup.
- Jasper dedup Neon dry-run (script merged, unrun — deliberate hold; footgun: defaults to LIVE, pass `--dry-run`, Neon branch first) · Clerk Production-instance migration (pre-paywall prereq; still dev instance) · LLC → business banking → production Stripe (raw SDK, Clerk auth-only) → paywall enable · For You news feed + Tier 2/3 deep tutorials (post-paywall) · maintenance Cron + suggestion layer (build once ~20+ deep pages exist — currently 19).

---

## Designated first actions next session (in order)

1. **Next real batch — decide size + slate.** Method is proven at 10; sizing is now purely a review-capacity call. This batch's ten-in-one-sitting was absorbable, so 10–15 is the working range. Candidate spread continues cross-archetype, no stacked chat LLMs: a 2nd automation/recipes tool, more verticals (research, design-adjacent, avatar/video, writing), and the still-uncovered **API/dev** siblings (Anthropic API, Hugging Face, Replicate) now that OpenAI API proved the pick-and-setup API page works.
2. **Research pass → rigid brief** for the chosen slate (same method; remember: no backticks around pitfall titles). Get slate blessed before sinking research time.
3. **Tier 3 CLAUDE.md lean-down** (optional) — fold in the filename-convention one-liner; lowest urgency.

Also worth doing soon given 19 pages exist: **plan the maintenance cadence layer** — Tier-A pages (Cursor especially, with its acquisition-close trigger) now have real re-check dates, and the `changelogUrl`-driven staleness detection was pre-provisioned for exactly this. Not urgent, but the corpus is now big enough that maintenance stops being hypothetical.
