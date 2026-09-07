import type { PlatformTutorialData } from "./types";

export const claudeCodeTutorial: PlatformTutorialData = {
  slug: "claude-code-getting-started",
  platformSlug: "claude-code",
  title: "Getting Started with Claude Code",
  tagline:
    "Anthropic's coding agent: point it at a codebase, describe the change, and it reads, edits and runs things. Included from Pro upward — not on the free plan.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-07",
  changelogUrl: "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
  accessTier: "PREMIUM",

  howItWorks:
    "You start it inside a project folder — a **repository**, meaning a codebase tracked by version control — and describe what you want in plain language. It reads the relevant files itself, proposes edits, and runs commands like your test suite to check its own work. That is what makes it **agentic**: it acts on your machine rather than handing you a snippet to paste. It runs in a **terminal** (the window where you type commands), in VS Code, Cursor and JetBrains, in a desktop app, in your browser, and on mobile — one engine behind all of them.",

  whatItIs: [
    "A command-line and in-editor agent that works across a whole codebase at once, not one file at a time.",
    "Honestly: this is a developer tool. Never used a terminal or version control? Start elsewhere. Already write or maintain code, even casually? It is very much for you.",
    "Versus Cursor, the difference is shape, not quality: Cursor is an editor you live inside, Claude Code is an agent you hand a task to and check on. Plenty of people run both.",
    "Versus GitHub Copilot, the difference is scope: Copilot completes the line you are typing; Claude Code takes \"change this across the project and run the tests\".",
  ],

  beforeYouStart: [
    "You need a paid Claude plan — currently Pro, Max, Team or Enterprise — or an Anthropic Console account billed per token. The free plan does not include Claude Code.",
    "Prices currently sit around $20/month for Pro (about $17 billed annually) and from around $100/month for Max. Check the pricing page; these move.",
    "Usage runs on rolling windows, not a credit balance: a limit resetting roughly every five hours, plus a weekly ceiling. Hit one and you wait, or turn on paid usage credits.",
    "Will you need to pay more? For hobby work, usually not — Anthropic describes Pro as suited to light work on small repositories, roughly 10-40 prompts per five-hour window. Work in a large codebase all day and you will feel that ceiling.",
    "You need a project on disk, a terminal or supported editor, and ideally Git.",
  ],

  gettingSetUpSafely: {
    officialSource: "Anthropic's official Claude Code documentation",
    vendorDocsUrl: "https://code.claude.com/docs/en/setup",
    body: [
      "Install only from Anthropic's official installer or package listings, documented at the link above. Lookalike packages exist, and the steps change often enough that copying them from a blog post is a bad habit.",
      "Run it the first time on a project under version control with nothing uncommitted. It edits real files on your real disk, and `git diff` is how you see what changed.",
      "Understand the permission prompts before approving anything broadly. Each offers \"allow once\" and \"allow from now on\" — the second is a standing grant that outlives the task. Grant narrowly; review with `/permissions`.",
      "Know which mode you are in. On Pro, Max and Team, sessions currently start in **auto mode**, where a safety model reviews actions instead of you. Manual mode — read-only until it asks — is one keystroke away (Shift+Tab) and is right for sensitive work. Never use the flag that skips checks entirely; it exists for throwaway containers.",
    ],
  },

  security: [
    {
      kind: "text",
      text: "Your code is sent to Anthropic's models to be processed — not a side effect, but how the tool works. On a client's proprietary codebase, that is a decision to make deliberately, and often to check against your contract first.",
    },
    {
      kind: "list",
      label: "What your plan type changes, and what access costs you",
      items: [
        "On Pro and Max, Anthropic currently trains future models on your data while the privacy setting allowing it is on. You can turn it off in account settings.",
        "Retention follows that choice: currently around five years if you allow training, around thirty days if you do not.",
        "Team, Enterprise and API use fall under commercial terms, where Anthropic states it does not train on your code by default. The same tool on a different account type is a different data contract.",
        "Locally, file and command access means it can change or delete files and run programs. **A blast radius you cannot describe is one you have not limited** — keep it in one project directory and keep your work committed.",
        "Content it reads (a README, a dependency, an issue) can carry instructions aimed at the agent rather than at you. Read what it proposes to run.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Explaining a codebase you have just inherited",
      "Changes touching several files that must stay consistent",
      "The maintenance you keep postponing: tests, lint, dependency bumps",
      "Going from a failing test to a fix you can review",
    ],
    okayAt: [
      "Greenfield projects, where it builds more than you asked for",
      "Architecture calls, which it answers confidently and which are still yours",
      "Predicting its own cost — usage climbs faster than the work suggests",
    ],
    avoid: [
      "Anything you would not read before shipping",
      "Codebases you cannot send to a third-party service",
      "Learning to code from zero — you need the judgement to spot wrong output",
      "Unattended runs with permissions off, outside an isolated container",
    ],
  },

  starterActions: [
    {
      title: "Run it read-only on a codebase you do not understand",
      whatItDoes:
        "Starts in Manual mode, where it can read but change nothing, and asks for an explanation.",
      prompt:
        "Walk me through this codebase. What does it do, where does a request enter, and which three files should I read first?",
      whyHere:
        "This is what Claude Code does that a chat window cannot — it reads the actual files instead of reasoning from what you pasted. Read-only first teaches you the permission model while nothing is at stake.",
      tweak: "Ask what surprised it, or what looks unmaintained.",
    },
    {
      title: "Give it one small, already-committed task",
      whatItDoes:
        "A contained change with an obvious success test, on a branch you can throw away.",
      prompt:
        "Add input validation to the login handler, then run the test suite and fix anything that fails.",
      whyHere:
        "Claude Code is judged on the loop, not the snippet — edit, run, see the failure, fix. A pass/fail check is the only way to see whether that loop closes on your project.",
      tweak:
        "Watch which commands it asks to run. That is the clearest picture of what you are approving.",
    },
    {
      title: "Write a CLAUDE.md file for the project",
      whatItDoes:
        "A short markdown file in the project root that Claude Code reads at the start of every session.",
      whyHere:
        "Its most underused feature. Your conventions, your test command, your \"never touch this\" rules — written once, applied every session.",
      tweak: "Keep it short. A long one costs you context in every session, relevant or not.",
    },
    {
      title: "Check `/usage` after a real working session",
      whyHere:
        "Subscription limits are invisible until you hit one mid-task. Looking once tells you whether your plan fits how you work.",
      tweak:
        "Compare one long session against several short ones — long sessions resend the whole conversation each turn.",
    },
  ],

  pitfalls: [
    "**Approving broadly is the mistake that matters.** \"Allow from now on\" is a standing grant that outlives the task.",
    "**Trusting output without reading it.** Fluent, fast, and confidently wrong often enough to matter. Unreviewed code carries your name on the commit.",
    "**Running it on uncommitted work.** Without a clean starting point you cannot tell what changed or roll it back.",
    "**Assuming your free Claude account includes it.** It does not, and this catches people out at install time.",
  ],

  whereToNext: [
    { label: "More AI coding tools", categorySlug: "ai-coding-development" },
    { label: "Build with the API directly", categorySlug: "ai-apis-developer-services" },
  ],
};
