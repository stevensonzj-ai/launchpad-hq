> **ARCHIVE — historical record, not current truth.**
> Exported from the LaunchPad HQ Claude project on 2026-09-07.
> Original project path: `session-22-handoff.md`
>
> This document was accurate when written and may since have been superseded.
> Current truth lives in `START-HERE.md`, `CLAUDE.md`, and the code itself
> (`prisma/schema.prisma`, `src/data/tutorials/types.ts`). Where this file
> disagrees with those, they win.

---

# Session 22 Handoff — LaunchpadHQ

**Date:** 2026-07-27
**Main at close:** `7615a1f3c43d67d720861ceca18f753ef14aeec3`
**Production:** verified READY, `aliasError: null`, sha matches main HEAD (`dpl_8n4jsV83qxekDe6fTydhj5LhGx6E`, region iad1)
**Live tutorial pages:** 29 (was 19)

---

## What shipped

PR #32, squash-merged. Ten new tutorial pages:

| Page | platformSlug | Category | Archetype | Tier |
|---|---|---|---|---|
| Claude | `claude` | text-conversational-ai | prompts | FREE |
| Gemini | `gemini` | text-conversational-ai | prompts | FREE |
| Anthropic API | `anthropic-api` | ai-apis-developer-services | pick-and-setup | PREMIUM |
| Hugging Face | `hugging-face` | local-open-source-ai | pick-and-setup | FREE |
| LM Studio | `lm-studio` | local-open-source-ai | pick-and-setup | FREE |
| Make | `make-integromat` | workflow-automation | recipes | FREE |
| Grammarly | `grammarly` | research-academic-tools | pick-and-setup | FREE |
| Descript | `descript` | voice-speech | pick-and-setup | FREE |
| Elicit | `elicit` | research-academic-tools | prompts | FREE |
| Acrobat AI Assistant | `adobe-acrobat-ai-assistant` | document-pdf-processing | prompts | PREMIUM |

**Two categories got their first tutorial page ever:** `research-academic-tools` and
`document-pdf-processing`. Both breadcrumbs and `whereToNext` pills verified rendering.

**Divergences now total five.** Added `make-getting-started` → `make-integromat` and
`acrobat-ai-getting-started` → `adobe-acrobat-ai-assistant`, joining Otter, Perplexity, and
Canva AI. The CLAUDE.md convention line should say five, not three.

---

## Carry-forward — ranked

### 1. Catalog liveness audit — NEW, and the highest-priority item on this list

**Sora 2 is live in the catalog and the product is discontinued.** OpenAI ended the web and app
experiences on 2026-04-26; the API ends 2026-09-24. A beginner can currently find, filter to, and
click through to a platform that no longer exists.

The same row also carries `costTier: ENTERPRISE`, which is wrong independently of the shutdown.
Two defects on one record, found by accident because it happened to appear in a batch slate.

This reframes what was previously logged as "overview card metadata is stale." The real question
is not whether version numbers are current — it's **whether catalogued platforms still exist**,
and nothing in the system would surface that. With ~170 rows, Sora is unlikely to be the only one.

Scope for the audit: liveness check across the catalog, `costTier` sanity pass, and a decision on
whether dead platforms get removed or marked discontinued. The latter is arguably better content —
"this shut down, here's what replaced it" is useful to a beginner — but it needs a schema field
and a render treatment, so it is a real feature, not a data fix.

### 2. Maintenance cadence layer — now overdue

The batch playbook says build this at ~20+ deep pages. We are at 29. It has been carry-forward
since S20.

It is also the mechanism behind the "everything current at release" goal. The right shape is a
**pre-launch Tier-A re-check sweep** — one batched pass over every Tier-A page immediately before
lifting `noindex`, ranked by `lastReviewedAt` and `changelogUrl` — rather than trying to time
page production so volatile pages land last.

Two hard dated triggers already exist and will fire before launch:
- **2026-08-31** — Anthropic API promotional rate expires. The page states it explicitly, so it
  ages correctly, but the figure should be re-checked on or shortly after that date.
- **Within ~2 months** — Grammarly branding. The Superhuman corporate reorganisation is still
  moving (Coda rebranded 2026-07-08). Highest-churn claim in the batch.

### 3. `/pricing` prerender database contention — NEW

The first local build of the batch failed with `Failed to acquire permit to connect to the
database` while prerendering `/pricing`. Eleven prerender workers contended for Neon connection
permits. A clean retry passed, and CC correctly did not modify config to work around it.

Latent deploy fragility, not a local quirk: Vercel prerenders the same way, so production deploys
can fail intermittently on a database limit unrelated to the code being shipped. It gets worse as
page count grows. Fix is either bounding build-time connection usage or taking `/pricing` off the
database at prerender time. Not urgent; do want it logged before it bites during a launch push.

### 4. Acrobat and Elicit prompt-string gap — NEW, polish

Both pages use archetype `prompts` and head "Starter prompts to try," but only one of four cards
on each carries an actual prompt string. The cards function on "Why this one" and "Tweak," but
one prompt under that heading is light. Claude has three of four, which is what the heading implies.

This is under-specification in the brief, not a transcription error. Merged deliberately — a
polish item should not hold a clean batch. Fix in a later pass.

### 5. Jasper dedup script — still unexecuted

Unchanged across many sessions. Remains a paywall-launch prerequisite.

### 6. Template literal string convention — log in CLAUDE.md

CC used TypeScript template literals for prose values in this batch rather than the
double-quoted-with-escapes style in the earlier tutorial files. Reasoning was sound: apostrophes
and inline double quotes transcribe verbatim with zero escaping, which is the lowest-error path
for long prose. Typecheck passing proves no content contained a stray backtick.

Cost is two string styles across 29 files. The new one is better. Log it as the convention so the
next batch does not introduce a third or revert.

---

## Key learnings

**Research killed a page for the first time.** Every prior batch, live research *changed* pages.
This one removed one. Sora would have been a tutorial for a product that had been dead three
months. The research pass is not quality polish on top of a known-good slate — it is the thing
that establishes whether the slate is valid at all.

**Volatility belongs in maintenance cadence, not production ordering — reconfirmed, with a
caveat.** The instinct to build volatile pages last so they are current at release does not
survive contact: launch has no fixed date, deferred pages deliver nothing while they wait, and
re-checking an existing page is far cheaper than authoring it later. The narrow exception is
*structural* churn, where a product's shape is unsettled enough to need a rewrite rather than a
fact refresh. Sora turned out to be the extreme version of that case — and notably, deferring it
would not have helped. The product would still be dead; we simply would not have known.

**The rigid-brief discipline produced its second real save.** Handed an unresolvable file path,
CC recognised that the only way to produce ten files was to author them from its own knowledge,
and stopped. It ran the recon it could complete without the brief and reported the blocker
cleanly. Fabricated content passed off as sourced transcription is the worst available outcome in
this pipeline, and the constraint held under pressure rather than degrading into helpfulness.

**Archetype is an editorial decision that needs checking against the rendered heading.** Grammarly
and Descript were assigned `recipes` in the brief; their starter actions are nothing like
automations, and the heading would have read "Starter automations to try" over
"Reject a suggestion on purpose." Caught at report review, fixed before preview. The check that
catches this is reading the archetype's heading string against the actual card titles — not
reasoning about which archetype the tool "feels like."

**Cross-page contrast needs verifying against live pages before the brief locks, not after.**
Reading the live ChatGPT `security` block revealed it was already built on a training-toggle
frame plus a never-paste list. Claude's block as originally drafted would have re-taught that with
different vendor names. Rewriting it to lead with the consumer-versus-commercial contract split —
and to lean on the five-year retention figure against ChatGPT's thirty-day baseline — produced
genuine contrast. Cost: one small read before transcription. Doing it after would have meant
rewriting a merged page.

**Cowork was evaluated and declined for now.** The honest read: it only speeds the research phase,
which sits upstream of the actual bottleneck (review capacity), and unsupervised fact-gathering
risks flattening the per-page editorial calibration that makes the catalogue feel authored. Parked
rather than discarded — the maintenance cadence layer is a much better fit for it, since scanning
29 pages for staleness is high-volume, low-judgment work that does not compete with the review gate.

---

## Recommended next session

**Catalog liveness audit, not another tutorial batch.**

Content production is proven — three successive batches, pipeline stable, quality holding. The gap
is now on the other side: there is a known-dead product live on the site, 29 pages with no
re-review mechanism, and a launch checklist that assumes everything is current. Another ten pages
adds inventory to a catalogue whose accuracy is unverified.

Suggested sequence:
1. Liveness pass across the catalog — which platforms still exist
2. Decide the treatment for dead platforms (remove vs. mark discontinued)
3. Fix Sora 2 specifically, whichever way that decision goes
4. Build the maintenance signal layer while the staleness data is fresh

Next tutorial batch after that. Slate candidates already deferred: Replicate, Leonardo AI,
Ideogram, n8n, Microsoft Copilot (cut from this batch as the muddiest page), and a video-generation
platform to replace the Sora slot.

---

## Unchanged context

- Site-wide `noindex` still intentional (friends-and-family pre-launch)
- Paywall prerequisites: LLC formation, Stripe end-to-end with a real card, Clerk Production
  migration (still on dev instance), Jasper dedup executed
- GSC demand data still unavailable for batch ordering until post-launch
- Merge ritual unchanged and working: branch recon → typecheck → build → Vercel preview review →
  squash-merge via PR → production deployment verification
