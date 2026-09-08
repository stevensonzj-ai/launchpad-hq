import type { PlatformTutorialData } from "./types";

export const claudeCodeTutorial: PlatformTutorialData = {
  slug: "claude-code-getting-started",
  platformSlug: "claude-code",
  title: "Getting Started with Claude Code",
  tagline:
    "Anthropic's coding agent: point it at a codebase, describe the change, and it reads, edits and runs things.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-07",
  changelogUrl: "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
  accessTier: "PREMIUM",

  howItWorks:
    "You open it inside a project folder on your own computer and describe the change you want in plain English. It reads the files itself, proposes edits, runs commands to check its own work, and asks permission as it goes. You read what it did and say what to fix.",

  whatItIs: [
    "Claude Code is Anthropic's coding **agent** — AI that takes actions on its own rather than only answering. Instead of handing you a snippet to paste, it reads, edits and runs a project's files on your machine, across a whole codebase rather than one file.",
    "It runs in a **terminal** (a text window where you type instructions instead of clicking), in editors like VS Code and JetBrains, and in desktop, browser and phone apps.",
    "Cursor is an editor you work inside; Claude Code is something you hand a task to and check on. GitHub Copilot finishes the line you are typing; this takes the whole change.",
  ],

  beforeYouStart: [
    "This is a developer tool, and the entry requirement is a project of code on your own disk that you already work on. Never used a terminal or version control? A browser assistant like ChatGPT writes and explains code with nothing to install, and is the better place to begin.",
    "You need a paid Claude plan — currently Pro, Max, Team or Enterprise — or an Anthropic Console account billed for what you use. Pro currently runs about $20/month ($17 billed annually) and Max from about $100/month; these move.",
    "Usage runs on rolling windows rather than a credit balance: a limit resetting roughly every five hours, plus a weekly ceiling. Anthropic describes Pro as light work on small repositories, roughly 10-40 prompts per five-hour window. Hit the ceiling and you wait, or turn on paid usage credits. `/usage` shows where you are, and long sessions cost more, because each turn resends the whole conversation.",
  ],

  gettingSetUpSafely: {
    officialSource: "Anthropic's official Claude Code documentation",
    vendorDocsUrl: "https://code.claude.com/docs/en/setup",
    body: [
      "Install only from Anthropic's official installer or package listings — lookalikes exist, and the steps change often enough that blog-post instructions are a bad habit.",
      "Start on a project tracked in version control with nothing unsaved: that tracking is how you see every line it changed, and how you undo it.",
      "Permission prompts offer allow once and allow from now on. The second outlives the task, so grant narrowly and audit with `/permissions`.",
      "On Pro, Max and Team, sessions currently start in auto mode, where a safety model reviews actions instead of you; Shift+Tab switches to manual mode, read-only until it asks. The flag that skips checks entirely is for throwaway containers.",
    ],
  },

  security: [
    {
      kind: "text",
      text: "Your code is sent to Anthropic's models to be processed — how the tool works, not a side effect. On a client's private codebase, make that choice deliberately, and check your contract first.",
    },
    {
      kind: "list",
      label: "Your account type is your data contract",
      items: [
        "On Pro and Max, Anthropic currently trains future models on your data while that setting is on. Turn it off in account settings; retention follows the choice — currently around five years if you allow training, around thirty days if not.",
        "Team, Enterprise and Console use fall under commercial terms, where Anthropic states it does not train on your code by default — the same tool on a different account type is a different deal.",
        "It can change or delete files and run programs, so keep it to one project folder. And read what it proposes to run: a README or an issue it opens can carry instructions aimed at the agent, not you.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Explaining a codebase you have just inherited",
      "Changes touching several files that must stay consistent",
      "The maintenance you keep postponing: tests, tidying, dependency bumps",
    ],
    okayAt: [
      "Brand-new projects, where it builds more than you asked for",
      "Predicting its own cost — usage climbs faster than the work suggests",
    ],
    avoid: [
      "Codebases you are not allowed to send to a third-party service",
      "Learning to code from zero — you need the judgement to spot wrong output",
    ],
  },

  starterActions: [
    {
      title: "Run it read-only on a codebase you do not understand",
      prompt:
        "Walk me through this codebase. What does it do, where does a request enter, and which three files should I read first?",
      whyHere:
        "It reads the actual files instead of reasoning from what you pasted, and manual mode lets you learn the permission prompts while it can change nothing.",
    },
    {
      title: "Give it one small, already-saved task",
      prompt:
        "Add input validation to the login handler, then run the project's tests and fix anything that fails.",
      whyHere:
        "It is judged on the loop, not the snippet — edit, run, see the failure, fix. A pass-or-fail task is the only way to see whether that loop closes on your project.",
    },
    {
      title: "Write a `CLAUDE.md` file for the project",
      whyHere:
        "Claude Code reads that file from the project root at the start of every session, so your test command and never-touch-this rules apply without retyping. Keep it short: a long one eats into every session, relevant or not.",
    },
  ],

  pitfalls: [
    "**Trusting output without reading it.** Fluent, fast, and confidently wrong often enough to matter. Unreviewed code carries your name on the commit.",
    "**Assuming a free Claude account includes it.** It does not, and that catches people out at install time.",
  ],

  whereToNext: [
    { label: "More AI coding tools", categorySlug: "ai-coding-development" },
    { label: "Build with the API directly", categorySlug: "ai-apis-developer-services" },
  ],
};
