# Session 24 — Automated tutorial batch pipeline; tutorials 29 → 49

> **Current handoff as of 2026-09-07.** Not an archive. See `README.md` in this directory
> for how this differs from `docs/history/`, and `../../START-HERE.md` § 3 for the
> authority order — the code still outranks this document.
>
> **Session type:** Claude working directly in the repo folder on the owner's machine,
> through a Linux mount of `C:\Users\Zach\Projects\launchpadhq`.
> **Follows:** Session 23 and its operations addendum, both in `docs/history/`.

---

## State at close

- Branch **`tutorials/batch-2026-09`** at **`98f6a4c0`**, four commits ahead of `main`.
- **`main` unchanged at `57652ab9`. Nothing merged. Production still serves 29 tutorials.**
- **No Neon writes at any point in this session.**
- Typecheck clean. `src/data/tutorials/index.ts`: 49 imports, 49 map entries, 49 files, no duplicates.
- Branch preview verified `READY` via the Vercel API, `aliasError: null`.
- **49 of 170 platforms have tutorials** (was 29). 4 excluded. **118 remaining.**

Run `node scripts/tutorial-pipeline/queue-status.mjs` for live state; it derives from the
filesystem rather than any stored count, so it cannot go stale.

---

## What was built

An automated pipeline that researches, writes, commits and pushes tutorial pages in
batches, designed to run unattended overnight. Twenty pages were produced proving it.
**The pipeline is the deliverable; the pages are the evidence it works.**

### Correction to a Session 23 claim

`START-HERE.md` § 12 says the repository "is not safe for autonomous operation above
Level 1." **The owner has clarified that this was written for a different agent** (his
Grok Bot), not as a blanket ceiling. Do not cite it as one.

The gate that *does* stand, by the owner's agreement: **the nightly job pushes a branch and
never merges to `main`.** He reviews every few days regardless, so auto-merging saves a
click rather than a session, while the branch keeps production behind a human.

### Three stages

**1. Research** — one subagent per platform, in parallel. Live capability pass under gates
G16 and G17. Each **writes its brief to a file on disk** and returns four lines only.

**2. Transcription** — separate subagents read briefs from disk plus `types.ts` plus two
exemplars, and write `{platformSlug}-getting-started.ts`. They are told explicitly **not**
to touch `index.ts`.

**3. Main session** — registers all files in `index.ts` centrally (this is what avoids
write conflicts between parallel agents), typechecks, commits, pushes, verifies the Vercel
preview through the API rather than the dashboard, per gate G7.

### Why briefs go to disk — the load-bearing design decision

The first five platforms were run with briefs returned **in context**: roughly **9k tokens
of orchestration context per platform**. Tolerable at five; about 180k at twenty, which
compacts around platform 15 and destroys the data the run exists to produce.

Writing briefs to disk dropped it to **~200 tokens per platform**. Fifteen platforms cost
~3k of orchestration instead of ~135k.

**Batch size is therefore not bounded by context.** Forty a night would fit. The real
limits are token spend and the owner's review capacity.

Unplanned second benefit: a run that dies at platform 14 leaves 14 usable briefs on disk,
so the next run resumes instead of re-researching.

### Measured cost

**~130k tokens per platform, all-in.** The 15-page batch: 1.47M research (16 agents,
including one re-research), 366k transcription (4 agents), 113k consolidating catalog
findings — **~1.95M total**.

An earlier estimate of 87k was low; research agents go deeper when a platform turns out
messy (two exceeded 125k). **118 remaining ≈ 15M tokens ≈ 6 nights at 20/night.**

Wall clock is not a constraint — 15 platforms researched concurrently in about six minutes.

---

## Machine setup the pipeline depends on

### Git credentials

**The repo is public**, so unauthenticated `git ls-remote` succeeds. This will fool you into
thinking push works. It does not without a credential.

- A fine-grained PAT (scoped to this repo, Contents: read/write) lives at
  `.pipeline-credentials` in the repo root. Created 2026-09-07 with 90-day expiry, so it
  **expires around 2026-12-06** — the pipeline stops pushing that day unless rotated.
- `.gitignore` carries `.pipeline-credentials*` and `tmp/tutorial-pipeline/`.
- `credential.helper` is `store --file=.pipeline-credentials` — a **relative** path,
  deliberately. The Linux mount path contains a per-session id, so an absolute path breaks
  in every future session. **Always `cd` to the repo root before any git command.**
- Fine-grained PATs cannot be scoped to a branch. `Contents: write` permits pushing to
  `main`. A branch protection rule on `main` requiring a PR is the only structural
  guarantee; **it was recommended and is not known to have been added.**

### The mounted folder blocks `unlink` — carry this workaround

In the Linux VM that mounts the Windows folder, **`rename` is permitted but `unlink` is
not.** Git can stage and commit, but leaves a stale `.git/index.lock` that blocks the
*next* operation, plus orphaned `tmp_obj_*` files.

A delete permission can be requested interactively, **but the grant is session-scoped and a
scheduled run cannot obtain one** — the prompt requires a human. So the nightly job must
work without `unlink`:

```bash
gitx() {
  [ -f .git/index.lock ] && mv -f .git/index.lock ".git/index.lock.stale.$$" 2>/dev/null
  git "$@"; local rc=$?
  [ -f .git/index.lock ] && mv -f .git/index.lock ".git/index.lock.stale.$$" 2>/dev/null
  return $rc
}
```

Filter `warning: unable to unlink` from git output; it is expected and harmless.

### A heredoc trap that silently ate a commit

`gitx commit -q -F - 2>&1 | grep -v ... <<'EOF'` binds the heredoc to **`grep`**, not to
`git commit`. The message prints, nothing is committed, no error is raised.
**Write commit messages to a file and use `-F <file>`.**

### Toolchain in the VM

git 2.34, node 22, npm 10, `node_modules` present, working network to github.com and
registry.npmjs.org. The full build pipeline runs there.

---

## New: `scripts/tutorial-pipeline/`

- **`queue-status.mjs`** — derives pipeline state from the filesystem. `DONE` is the set of
  `platformSlug` values actually present in `src/data/tutorials/*.ts`, subtracted from the
  newest `tmp/platforms-export-*.json`. **Deliberately not a checkbox file:** a checklist
  drifts the moment a run aborts mid-batch or a page is rejected in review; derivation
  cannot. Reads the archetype union out of `types.ts` rather than hardcoding it.
- **`exclusions.json`** — rows that must never receive a tutorial, with reasons.
- **`priority.json`** — editorial batch ordering, per the batch playbook's Decision 0
  (GSC demand data does not exist while the site is `noindex`).

### Two bugs this script caught, both of which would have broken batches

1. **The live archetype enum is `pick-and-setup`.** `docs/history/tutorial-template-spec.md`
   § 6 writes it `pick-and-set-up`. Following the spec would have failed typecheck on all
   19 pick-and-setup pages in the queue. **The spec is wrong; `types.ts` is authoritative** —
   which is exactly what `START-HERE.md` § 3 says, demonstrated.
2. **A registration check false-positived on five files.** `index.ts` registers via computed
   key `[xTutorial.platformSlug]`, so the slug string never appears there. Checking for the
   slug flags precisely the five files § 4 records as having a stem shorter than their
   `platformSlug`. The check now verifies the **export binding** is both imported and
   mapped. A nightly check that cries wolf is worse than no check.

---

## Catalog rot is worse than Session 23 projected

Session 23 found three wrong `costTier` values in seven rows. This session researched 15
platforms live: **12 needed a `costTier` correction and 7 had identity changes.**

Full detail in **`catalog-corrections-2026-09-07.md`** in this directory — 30 act-now field
edits, 25 items needing verification. **Nothing has been applied to the database.**

The findings that matter beyond metadata:

- **`windsurf` — the product was renamed.** Cognition acquired it 2025-07-14; it became
  **Devin Desktop** on 2026-06-02 and windsurf.com redirects to devin.ai/desktop. Owner's
  decision: write the page under the current name, keep `platformSlug: "windsurf"` to match
  the existing row, correct the catalog. Re-researching under the new identity also caught
  the first pass making a wrong claim about extension marketplace support.
- **`udio` — the rights position reversed.** The binding ToS, revised after the UMG
  settlement, assigns output ownership to Udio, bars downloads, and limits use to personal
  non-commercial — **while Udio's own help centre still states the opposite.** The page
  leads with this. **A logged-in in-product check is owed before this page merges.**
- **`gumloop`** discontinued its permanent free plan around 2026-07-30.
- **`claude-code`** — the `ENTERPRISE` cost tier Session 23 suspected is **confirmed wrong**;
  correct value is `PAID`.
- **`slack-ai`** is no longer a purchasable add-on; bundled, Business+ gated, admin-enabled.
- **`mistral-ai-le-chat`** was renamed to Vibe on 2026-05-28.
- **`flux`** is a model family, not a product a beginner can sign up for — argues for a
  "model vs app" distinction in the catalog.
- **`google-veo-3-1`** — Google's own pages contradict each other on free-tier access and a
  successor is named in the Gemini app. The row should drop its version number; the page
  copy deliberately avoids version numbers for this reason.
- **`grok` is in the catalog.** The Session 23 addendum lists it as a high-mindshare
  *absence*. That is wrong — gate G18 again: verify a document's pointer before acting on it.

### One claim deliberately kept out of shipped copy

Several research agents independently reported that `x.ai`'s privacy policy is now signed by
a different legal entity, tracing to a corporate change after mid-2026. **That is past the
authoring model's knowledge cutoff and was not written into page copy.** The Grok page says
"the company that also owns X," which holds either way. **Verify before editing any vendor
field.**

---

## `accessTier` is ambiguous in the spec

A research agent caught this unprompted. `accessTier` is **this site's paywall axis** — is
the tutorial free or premium to read — *not* the vendor's own pricing. An agent reading
`tutorial-template-spec.md` § 9 cold will guess wrong. Worth one clarifying sentence there.

---

## Pages added

**Checkpoint batch (cross-archetype, satisfying the batch playbook's Prerequisite 2, "prove
the line at 5 before running 15"):** grok, ideogram, n8n, tl-dv, jan.

**Main batch:** microsoft-copilot, mistral-ai-le-chat, leonardo-ai, flux, recraft,
google-veo-3-1, synthesia, pika, udio, claude-code, windsurf, open-webui, groq, gumloop,
slack-ai.

Research briefs for all 15 of the main batch — every source URL and every flagged
uncertainty, 2,660 lines — are at `tmp/tutorial-pipeline/briefs/`. **Gitignored, so they
exist only on the owner's machine.** They are the review trail: if a page looks wrong, the
brief says where the fact came from.

---

## Open, in order

1. **Owner reviews the 20 pages** on the branch preview. In progress at session close.
   Watch `jan` and `n8n` hardest — pick-and-setup and recipes had only 3 and 3 exemplars
   respectively for the transcriber to learn house voice from.
2. **Verify Udio's download and ownership position while logged in**, before merging it.
3. **Create the scheduled nightly task** — agreed at 10pm CT (`0 3 * * *` UTC), bound to the
   owner's machine, folder `C:\Users\Zach\Projects\launchpadhq`. **Deliberately held until
   after the first review**, because a nightly job producing pages nobody has approved is
   backwards.
4. **Backlog cap in the nightly prompt** — if unreviewed pages on the branch exceed ~40,
   skip the night and report. Production speed is not the bottleneck; review capacity is,
   and a systematic error found at page 100 costs five times one found at page 20.
5. **Branch protection on `main`** requiring a PR.
6. **Apply the catalog corrections** — separate, human-gated Neon pass.
7. **Re-run `scripts/export-platforms.ts` periodically.** The pipeline reads a snapshot, so
   platforms added to Neon after 2026-09-07 are invisible to it until the export refreshes.

### Constraints the nightly job must respect

- **Fresh session, no memory.** The prompt must be complete and standalone. Everything it
  needs is in this repo: `START-HERE.md`, `CLAUDE.md`, `docs/history/tutorial-template-spec.md`,
  `docs/history/batch-production-maintenance-playbook.md`,
  `docs/history/tutorial-reference-pages.md`, `src/data/tutorials/types.ts`, and 49 shipped
  exemplars.
- **The machine must be awake with the desktop app running.** A scheduled run cannot wake a
  sleeping PC. This is the most likely silent failure mode.
- No `unlink` in the mounted folder — carry the `gitx` wrapper above.
- Push the branch; never merge.

---

## Carried forward from Session 23, untouched by this session

SSL warning count verification; Stripe webhook hardening; ToS, privacy policy and footer
(blocks Stripe activation); Jasper dedup run; Clerk Development → Production migration;
production `DATABASE_URL` to the pooled Neon endpoint; two passed dated re-check triggers;
`.env.vercel.production` deletion; and the `sora-2` and `murf-ai` one-off data fixes.

---

# Addendum — revision pass and the nightly task (2026-09-08)

Written after the owner reviewed the 20 pages. **Where this addendum and the body above
disagree, this is newer.**

## The owner's review found the pages readable; two audits found them not beginner-ready

His verdict was "tone and information look fine," with the honest caveat that he doesn't use
these platforms and so couldn't judge accuracy. That is the structural limit of reviewing
content about unfamiliar tools, and it is why the sourced briefs exist as a separate layer.

Two audits against `tutorial-template-spec.md` §§ 2, 3, 5 and 7 found defects his read could
not have caught:

- **Length. Median 1,450 words against a 700-900 spec; worst page 2,373.** Zero of 20 in
  band. (An earlier count reporting gumloop at 676 was wrong — it was 1,196. Three
  hand-counts of the same batch disagreed by up to 40%, which is why
  `scripts/tutorial-pipeline/wordcount.mjs` now exists and is the only authority.)
- **Define-on-first-use was barely happening.** `prompt` glossed on 1 of 20 pages, including
  pages whose entire method is prompting. `model` bare on 7, `API key` on 6, `NDA` on 6 and
  glossed on none. Leonardo called its spending unit "tokens" while three other pages used
  "tokens" to mean units of text.
- **Two templating signals**, which matter most because the format exists to survive the
  March 2026 scaled-content update: `beforeYouStart` ran **exactly five items on all 20
  pages**, thirteen with the same labelled beats in the same order and the literal phrase
  "Will you realistically need to pay?" in 13 files; and the frame "tells you more than any
  review/tutorial/explainer" reached five pages.
- **Two pages ejected the reader** before orienting them — FLUX's "if that meant nothing to
  you, it isn't your starting point yet," addressed to precisely the audience the spec is
  written for, and Claude Code's second bullet.

## The length rule was wrong, not just unenforced

`tutorial-template-spec.md` § 3 sets a flat 700-900 words. **Its own canonical exemplar
breaks it: the Ollama reference page is 1,401 words.** ChatGPT is 952 and Zapier 830 — both
cloud tools with nothing to install. The number was written from the cloud cases and never
revised for pages carrying a setup section or irreducible licensing content.

An unachievable rule gets quietly ignored, which is how a 2,373-word page shipped.
`writing-standard.md` § 1 replaces it with a band — 830-900 for cloud tools, 900-1,000 where
a setup section or rights content exists, 1,200 as the rewrite line — and requires overruns
to be **declared** with what was kept, rather than left silent.

## Result

All 20 revised. **Median 935, max 1,137, min 706**, down from median ~1,450 / max 2,373.
Typecheck clean, preview `READY` at `7b25c129`. No sourced fact was dropped: where a cut
would have cost a price, hedge or rights claim, length gave way and the overrun was declared.

Udio's rights position is untouched and still leads its security section. tl;dv's consent
block and Synthesia's avatar-consent content were protected through compression.

## Three new governing files, which the nightly job reads

- `scripts/tutorial-pipeline/writing-standard.md` — binding rules: length bands, glossing as
  a checked output, the `whyHere` swap test, the `avoid` vendor test, a 60-word
  `howItWorks` cap, a ban on ejecting the reader, and a batch-wide reuse check.
- `scripts/tutorial-pipeline/gloss-bank.md` — one agreed plain-words definition per term,
  plus the standing credits-versus-tokens correction.
- `scripts/tutorial-pipeline/wordcount.mjs` — the authoritative counter.

## The nightly task exists

**`LaunchpadHQ nightly tutorial batch`** — `trig_017V4xaAFCW1wqncBvMriqpG`, `0 3 * * *` UTC
(10pm CT), 20 platforms a night, push-only to `tutorials/batch-2026-09`.

It carries a **backlog cap**: if unmerged pages on the branch exceed 40, the run skips the
night and reports rather than producing pages nobody has reviewed.

**It was created unbound** — "no_signed_approval, this task will run in the cloud only,"
with no folders attached. **Until the owner approves it on the machine itself, its runs
cannot reach the repo and will fail.** That approval is the last open step.

## Still open

1. **Bind the nightly task to the computer** by approving it there. Nothing else works until
   this is done.
2. **Verify Udio's download and ownership position while logged in**, before merging that page.
3. **Merge the branch** after review. 118 platforms remain; at 20 a night that is ~6 nights.
4. **Branch protection on `main`** requiring a PR — makes push-only structural rather than
   instructed.
5. **Apply the catalog corrections** — separate, human-gated Neon pass. None applied.
6. Consider correcting `tutorial-template-spec.md` § 3's word count and § 6's
   `pick-and-set-up` spelling at source, rather than leaving both contradicted by newer files.
