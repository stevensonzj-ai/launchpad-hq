> **ARCHIVE — historical record, not current truth.**
> Exported from the LaunchPad HQ Claude project on 2026-09-07.
> Original project path: `fable5-playbook.md`
>
> This document was accurate when written and may since have been superseded.
> Current truth lives in `START-HERE.md`, `CLAUDE.md`, and the code itself
> (`prisma/schema.prisma`, `src/data/tutorials/types.ts`). Where this file
> disagrees with those, they win.

---

# Fable 5 Autonomous Session Playbook

A reusable reference for running Fable 5 (or any autonomous Claude Code model) on batch/long-running work across projects. Built from hard-won lessons on LaunchpadHQ. Read this before structuring any autonomous session brief.

---

## What Fable 5 is good for, and what it isn't

**Good fit:** large, well-scoped, low-judgment batch work where the output can be reviewed in bulk afterward. Content generation, mechanical refactors, bulk migrations, multi-file changes that follow a clear spec, catalog/research passes.

**Bad fit:** surgical, human-in-the-loop, diff-review-and-preview work; anything needing a judgment call you haven't already made; anything where one wrong decision contaminates everything downstream. For that rhythm, a standard interactive model stays the default.

**The core truth:** capability is rarely the bottleneck. Review time and calendar-bound steps are. An autonomous model writes code fast but cannot deploy, cannot merge, cannot run production migrations, and cannot make the judgment calls you haven't pre-decided. The realistic output of an autonomous session is **a pile of branches/files on your desk for review** — real time savings, but you are still the approver. Size every session against your actual review capacity, not the model's output capacity. Eight branches plus a content batch can already exceed what's reviewable in fragmented time before the work goes stale against main.

---

## The reading-then-working behavior (the "issue")

**What happens:** when you give Fable 5 a brief and an opening message telling it to "read this first," it will read the brief and then frequently **start executing tasks immediately**, without waiting for you to issue a separate goal command or give a go-ahead. It treats a well-structured brief as sufficient instruction to begin.

**Why it's not actually a problem:** if the brief is correctly structured with its safety protocols, the work it does straight away is correct, on-branch, and protocol-compliant. The "wait for my goal command" gate is a nicety, not a safety mechanism. The safety lives in the brief, not in the timing of the goal command.

**What this means for you:**
- Do not assume there will be a clean "I've finished reading, awaiting your goal" pause. There often isn't.
- Because it may start immediately, **the brief must be complete and correct before you submit it.** You cannot rely on a window between "it read the brief" and "it started working" to add the goal or catch a problem.
- If it starts executing before you set a goal, that's usually fine — **do not panic-interrupt a run that's actually working.** Check the branch state first (see "Diagnosing a session" below) before deciding anything is wrong. A partial screenshot of mid-execution can look alarming when the full log shows clean, correct work.
- If it started without a goal, *you* are the completion check rather than the goal evaluator. Watch that it produces the handoff at the end; if it just stops after the last task, prompt for the handoff explicitly.

---

## Order of operations for launching a session

1. **Pre-flight the repo (in a normal terminal, before touching Fable):**
   - `git status` → must be `working tree clean`. If files show as modified, check `git diff` and `git diff --ignore-cr-at-eol` — phantom "modified" files are usually just CRLF/LF line-ending noise with no real content change. Clear with `git checkout -- .` *only after confirming the diffs are empty.*
   - `git checkout main && git pull origin main` → current with origin.
   - `git branch -a` → confirm any branches the session needs already exist locally or on origin.
   - Clear any stale environment variables that could point commands at the wrong target (e.g. a `DATABASE_URL` left set in the shell). An "item does not exist" error when you try to remove it is the *good* outcome — it means nothing stale is set.

2. **Confirm model capacity is available** (especially for newly launched models). Open a throwaway session on the target model with auto mode on, run one trivial shell command (`echo hello` or `git status`). If it executes, capacity is available. If it throws "temporarily unavailable, auto mode cannot determine safety," wait — relaunching into a capacity wall just trips the circuit breaker. New model tiers are most congested in their first days and during peak hours.

3. **Start a genuinely fresh session.** Never resume or reuse a stale/paused session from a prior failed attempt — its context is polluted. Fresh session, correct model selected, auto mode on.

4. **Submit the brief first, then the goal (if using one).** Drag in the brief document with an opening message pointing it at the "How to use this document" section. Let it acknowledge. *Then* the goal. The brief must precede the goal because the goal references it. (But see the reading-then-working note above — it may not wait for the goal. That's acceptable if the brief is sound.)

5. **Watch the first two actions as your proof the protocols are live:**
   - Its first real action should be a `git status` integrity check.
   - It must create a branch *before* writing any file for a task.
   - If you see a file write before a branch exists, interrupt. Otherwise, let it run.

6. **Walk away.** Check in periodically. Resume after any usage-limit pause.

---

## Document, not chat

Always put the brief in a **document** (markdown file), never a wall of pasted chat text. The session re-reads the document when context compresses; it cannot re-read a chat message that's scrolled out of its compressed context. The document is the anti-compression anchor. This is the single most important structural decision.

---

## How to structure a brief

A good autonomous brief has these sections, roughly in this order:

### 1. "How to use this document" (first, always)
- State explicitly that the document is the source of truth for the whole session.
- Instruct it to re-read the relevant sections before *each task*, not just once at the start.
- Tell it *why*: context compresses, the document does not. Models follow instructions better when given the reason.
- Tell it to re-read rather than guess whenever uncertain about scope, a decision, or a constraint.

### 2. Failure handling & safety protocols (cross-cutting, near the top)
These govern unforeseen failures and override task instructions when triggered. The set that earned its place:

- **Branch-creation is a prerequisite for all file writes — no workarounds.** If git/shell is unavailable, do NOT write files as a fallback. Writing without a branch dumps everything onto the current branch and contaminates it. (This is the failure that bit us: when shell was down, the model "helpfully" kept writing files straight onto main.)
- **Circuit breaker.** Same operation fails 3× → stop retrying, mark the task blocked, move on. Shell/git failing across multiple tasks (systemic) → stop the whole session, write the handoff, end. An honest early stop beats burning the session retrying a wall. Retrying has real token/time cost.
- **Working-tree integrity check at start.** Run `git status`, record a clean baseline. If not clean, stop and document. Any file the session didn't create is a stop-and-flag, not a work-around-it.
- **Self-correction with disclosure — never silently work around or destructively "fix."** Investigate read-only first, document the finding and hypothesis, correct only if non-destructive and clearly safe, flag anything uncertain for the owner. **Never discard, overwrite, or delete work you cannot account for. Preserve-then-flag, never destroy-then-proceed.**
- **Periodic goal-vs-state reconciliation.** After each task, re-read the goal/spec and confirm branches and commits actually match. Correct drift before carrying it forward.
- **When in doubt, stop and document — don't improvise.** Unattended sessions have no human to catch a clever workaround going wrong. Default to documenting the blocker.

### 3. Project overview + critical working rules
- Stack, where the live product is, what's at stake.
- Project-specific landmines stated as flat rules: where middleware lives, which files are owner-only, naming conventions, "never create file X."

### 4. Database / external-system safety (if applicable)
- The big one: **assume the local connection string may point at production.** Never run migrations, seeds, pushes, or any data-modifying command. Create migration files only (`--create-only` or hand-written); the owner applies them manually against a branch/staging first. Write data-fix scripts; never execute them. For recon, prefer reading repo files (seed scripts, schema) over querying live data; if a live read is genuinely needed, confirm and document the target first and restrict to read-only.

### 5. Git safety
- Backup ref before any history rewrite (`git branch backup/<name> <name>`).
- `--force-with-lease`, never `--force`.
- Never push to main; never merge to main; produce branches for review only.
- Every branch off current main unless physically impossible; document any stacking.

### 6. Decisions already made (do not re-litigate)
- Every judgment call you've pre-decided, stated flatly. This is what lets a task be safely autonomous — the model implements your decision instead of guessing. If a task still needs a decision you haven't made, either make it before the session or leave the task out.

### 7. Verification standard
- Define what "verified" means for a headless session: typically `npm run build` (or equivalent) passing, plus a reasoned walkthrough in the handoff of why each done-criterion is met. Anything needing visual/manual/browser verification goes on a "requires owner verification" list — the model must not claim visual checks it cannot perform.

### 8. The tasks
- One branch per task. Each task: recon-first instructions, implementation spec, explicit done criteria.
- **Recon before action, always.** "State what you found before writing any code." Read-only pass first.
- **Phrase specs as intent, not prescriptive literal payloads.** This is a repeated lesson: do not hand it exact JSON/token/schema shapes built on assumptions about code you haven't seen. State the *requirement* (e.g. "links must be unforgeable and expire in 24h") and tell it to match existing patterns in the codebase. Prescriptive literal structures built on unverified assumptions are where problems trace back to.
- **Match new schema/code to existing conventions** — tell it to derive field names, ID strategies, and patterns from the existing files rather than imposing shapes from the brief.

### 9. Handoff format
- Specify the exact handoff structure: completed tasks, blocked/partial (with unblock steps), backup refs created, new env vars needed (commands, never actual secret values), suggested merge order, requires-owner-verification list, flags for review.
- **Include a "Session Health Report"**: context compression events, ambiguity events and how resolved, constraint-compliance confirmation, commit pattern, re-read count, stall events, what the brief got wrong, and an honest self-assessment. This is genuinely useful data for improving the next brief.

### 10. "What NOT to do" (explicit, at the end)
- A flat list of prohibitions. Redundant with rules above, deliberately. The repetition is a feature for a compressing context.

---

## The goal command

If you use a `/goal`:

- **Make "blocked" a valid success state in the goal itself**, not just the brief. Phrase it: *every task is either complete on its branch OR explicitly documented as blocked with the reason and unblock steps.* A goal that demands "all tasks complete" with no escape is unsatisfiable when one task is genuinely blocked — and an autonomous loop pointed at an unsatisfiable goal grinds, retries, and eventually erodes the work to make the checker pass on paper. Never build that pressure cooker.
- **Bake safety invariants into the goal** so the completion-checker verifies them, not just the brief: "no merges or pushes to main occurred, no database-modifying commands ran, backup refs exist for history rewrites."
- **Reference the brief in the goal** so the completion evaluator reads the document rather than only the compressed session context.

Note: a session that starts executing from the brief alone (no goal submitted) runs fine — it just means *you* are the completion check. Decide deliberately whether you want the goal mechanism or your own eyes governing completion.

---

## Usage limits and pausing

- Hitting a subscription/usage limit is **safe, not destructive.** The session pauses, shows a reset time, and waits. Anything already committed to a branch is safe on disk.
- **Idle time doesn't consume quota** — only active computation. A paused session sitting overnight costs nothing.
- After the reset time, type `continue` to resume. Glance at where it stopped first (which task, last thing committed) before resuming.
- **The branch-per-task commit discipline is what makes pauses safe** — completed tasks are committed; only the in-progress task is incomplete, and it's isolated on its own branch.
- If a long pause left the context messy and `continue` loses the thread, the fallback is a fresh session pointed at the same brief, told which tasks are already done (`git branch` shows it) and to start from the first incomplete one. The document-as-source-of-truth design makes the session resumable from git state, not dependent on one continuous context.
- **Avoid third-party auto-continue tools** for autonomous runs on a real repo. The manual `continue` when you check in is the right amount of friction — you stay the checkpoint.
- **Stop control:** use the session's interrupt/Escape, not Ctrl-C, to pause mid-response (Ctrl-C exits the whole session). To fully end a bad/stale session, terminate it and start fresh — do not resume it.

---

## Diagnosing a session (before you panic-interrupt)

A mid-execution screenshot can look wrong when the run is actually fine. Before interrupting, check ground truth in a *separate* terminal:

- `git branch` — are there per-task branches, or is everything piling onto main? **This is the critical check.** Per-task branches = working correctly. Files on main = contamination, intervene.
- `git log --oneline -10` — what's committed and where.
- `git status` — what's uncommitted and on which branch.
- Scroll the session log to the start — did it run `git status` first and create branches before writing? Those are the protocol-compliance tells.

If branches are clean and per-task, let it run even if it skipped the goal step or hit a trivial self-correctable snag (a mangled commit message, a retry). Those are not emergencies. Only intervene for: writes landing on main, repeated systemic failures, or it attempting something destructive/out-of-scope.

---

## The recurring lessons, condensed

1. **The document is the anchor.** Chat scrolls away under compression; the re-read-able document doesn't.
2. **Pre-decide every judgment call.** Autonomy is only safe over decisions you've already made.
3. **Branch-per-task is the safety substrate.** It makes pauses safe, contamination visible, and review navigable.
4. **Assume the DB connection points at production.** Create migrations and scripts; never execute them.
5. **Intent over literal payloads.** Don't prescribe shapes built on unseen code; state requirements, match existing patterns.
6. **Make "blocked" a success state.** In both the brief and the goal. Avoid the unsatisfiable-goal pressure cooker.
7. **A clean early stop beats a burned session.** Circuit breakers and honest blockers are the right outcome under failure.
8. **Never destroy work you can't account for.** Preserve-then-flag.
9. **Check branch state before panicking.** A partial view of a working run can look like a failure.
10. **Your review capacity is the real constraint.** Don't stuff a session past what you can review before it goes stale.
