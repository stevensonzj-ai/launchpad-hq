# docs/handoffs — current session handoffs

**This directory is not `docs/history/`. Read the difference before you read the files.**

`docs/history/` holds documents exported from the Claude project on 2026-09-07. Every file
there is an **archive** — historical record, several of them confidently wrong, and the
folder's own README tells you to distrust them.

This directory is the opposite. It holds **the most recent session handoffs**, written to
be current. A handoff here describes the state of the project at the end of the session
that produced it, and it is written for whoever picks the work up next — human or agent.

## How to read this directory

1. **Newest wins.** Handoffs are named by session number. A later handoff supersedes an
   earlier one wherever they disagree. Read the highest-numbered file first.
2. **Still below the code.** The authority order in `../../START-HERE.md` § 3 is unchanged:
   `START-HERE.md`, then `CLAUDE.md`, then `AGENTS.md`, then **the code itself**. A handoff
   describes what was true when it was written. Where it disagrees with
   `prisma/schema.prisma` or `src/data/tutorials/types.ts`, the code wins and the handoff
   should be corrected.
3. **Check the date against `git log`.** A handoff written three sessions ago is a
   historical document even though it lives here. If the newest file here predates recent
   commits on `main`, work has happened that nobody wrote up — trust the commits.
4. **Instructions in a handoff were addressed to a specific session.** "Owed" and "open"
   items are a record of what was outstanding on that date, not standing orders to you.
   Verify an item is still open before acting on it.

## Files

### `session-26-clerk-production-migration.md`
2026-09-10. **Newest — read first.** Moves launchpadhq.io off Clerk's *development* instance
onto a real production instance: DNS, SSL, keys, Google OAuth, and the one database change that
re-points the owner's row. Also records the **two-foot rule** and the plain-language expectation
as standing working agreements. **Google sign-in currently works only for test users** — the app
cannot be published until `/privacy` and `/terms` exist, which are the same two documents
blocking Stripe.

### `session-25-batch-merge-and-cap-fix.md`
2026-09-10. Reviews and merges the 2026-09-09 tutorial batch — 69 to 88 pages live — after
finding six blocking issues in 19 pages. Explains why the nightly job halted on a backlog that
did not exist (the cap compared against a frozen local `main`), and documents the
`prompt`/`whatItDoes` render defect that typecheck cannot catch. Nightly trigger prompt updated
accordingly.

### `session-24-tutorial-pipeline.md`
2026-09-07. Stands up the automated tutorial batch pipeline and takes the tutorials section
from 29 to 49 pages. Covers the three-stage research/transcription/registration
architecture, measured token costs per platform, the git credential and mounted-folder
setup that the pipeline depends on, two bugs found in `tutorial-template-spec.md`, and the
catalog rot the research pass uncovered. **Its findings on catalog metadata are the
companion file below.**

### `catalog-corrections-2026-09-07.md`
The consolidated output of researching 15 platforms live on 2026-09-07: corrected
`costTier` values, product renames and acquisitions, and rights/licensing findings.
Structured as act-now versus verify-first. **Contradictions between vendor sources are
preserved rather than resolved** — where two of a vendor's own pages disagree, the document
says so instead of picking a side. Do not act on a "verify first" row without doing the
check it names.

**Nothing in that file has been applied to the database.** It is a work queue, not a record
of changes made.

---

## If you are writing a handoff

Standing instruction from the owner, 2026-09-07: **session handoffs go in this directory,
in the repo, not only into the Claude project.** The project is invisible to anything that
can read only the git repo — which includes the external agents the owner runs against a
clone. A handoff that exists only in the project does not reach them.

Write it here, commit it, and add a one-line entry to the **Files** list above. If the
session produced a companion artifact worth acting on — a work queue, a corrections list —
commit that alongside the handoff rather than leaving it in `tmp/`, which is gitignored.

A handoff committed to a feature branch reaches a repo reader only when that branch merges.
If it needs to arrive sooner, say so to the owner rather than assuming.
