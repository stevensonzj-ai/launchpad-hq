import type { PlatformTutorialData } from "./types";

export const openaiCodexCliTutorial: PlatformTutorialData = {
  slug: "openai-codex-cli-getting-started",
  platformSlug: "openai-codex-cli",
  title: "Getting Started with OpenAI Codex CLI",
  tagline:
    "OpenAI's coding assistant for the command line: your machine, one project folder, paid for by your ChatGPT sign-in.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-08",
  changelogUrl: "https://github.com/openai/codex/releases",
  accessTier: "FREE",

  howItWorks:
    "You open a project folder on your computer and start Codex in a **terminal** (a text window where you type instructions instead of clicking). Describe the change you want in plain English. It reads the files, shows you the edits and commands it proposes, and waits for your approval. You read the result and say what to fix.",

  whatItIs: [
    "Codex CLI is OpenAI's coding **agent** — AI that takes actions on its own rather than only answering — running on your own machine: it opens your real files and runs commands rather than handing you code to paste.",
    "It is one front door onto one product: Codex also lives in the ChatGPT app, a VS Code extension and a desktop app. The CLI is the one you drive where the code sits.",
    "The name is recycled, so older search results mislead: the 2021 \"Codex\" was a model OpenAI sold through its API and retired in March 2023. Today's is a different thing, a coding agent from 2025.",
  ],

  beforeYouStart: [
    "The entry requirement is code already on your disk and comfort opening a command line. Never used one? A browser-based coding assistant is the better first step; this will still be here.",
    "You do not buy Codex; you sign in with a ChatGPT account and your plan pays for it. OpenAI's pricing page lists it on every plan including the free one, while its own CLI documentation still says Plus or above — so expect to need a paid plan (Go around $8/month, Plus around $20). Billing your own OpenAI developer account per use is the other route.",
    "Usage runs as rolling five-hour and weekly windows rather than a balance you can watch, and Plus and Pro can buy extra credits instead of upgrading.",
  ],

  gettingSetUpSafely: {
    officialSource: "OpenAI's official Codex CLI documentation",
    body: [
      "It installs in one command: use OpenAI's installer, the official Homebrew cask or npm package, or the GitHub releases page — lookalikes exist. On Windows the fence that keeps Codex inside your folder behaves most predictably under WSL2.",
      "Open it in a project that is saved and tracked, with nothing uncommitted — that tracking is how you read back and undo every line it changed.",
      "`/permissions` sets what it may do: read-only, a workspace default that edits inside the folder you opened and asks first about anything else, or full access, which removes both the fence and the questions — one keystroke, and it stays granted.",
    ],
    vendorDocsUrl: "https://learn.chatgpt.com/docs/cli",
  },

  security: [
    { kind: 'text', text: "Your code goes to OpenAI's servers to be worked on — the mechanism, not a leak, but the line to check before a client's private project." },
    { kind: 'list', label: 'The setting most people miss', items: [
      "On personal ChatGPT plans OpenAI may train on your Codex content, and its own data-controls FAQ says the opt-out in ChatGPT's settings does not affect Codex's. You turn that off inside Codex.",
      "Everything it reads is input, including text other people wrote: a README can be phrased to steer the agent rather than inform you. The approval prompts are the check on that.",
    ] },
  ],

  triad: {
    bestAt: [
      "A change spanning several files, watched and approved step by step",
      "Getting oriented in a project whose build and test commands nobody wrote down",
      "Chores you can describe precisely: tidying, dependency bumps, filling in missing tests",
    ],
    okayAt: [
      "Predicting your spend, since usage runs as rolling windows rather than a visible balance",
      "Unattended runs: `codex exec` works inside a script, but nobody is approving anything",
    ],
    avoid: [
      "Depending on a particular Codex model staying put — OpenAI shut off its gpt-5-codex and gpt-5.1-codex variants in July 2026",
      "Code you are not permitted to send off your machine",
    ],
  },

  starterActions: [
    {
      title: "Start read-only and make it explain the project back to you",
      prompt:
        "Before changing anything: list the commands this project uses to build, test and run, and name the files you would touch to add one new setting. Do not edit anything.",
      whyHere:
        "Codex picks its opening permissions by checking whether the folder is under version control, so your first session may already be allowed to write. Asking a question with `/permissions` on read-only shows which preset you landed in.",
    },
    {
      title: "Have it write the project's AGENTS.md, then fix the file by hand",
      prompt: "/init",
      whyHere:
        "Codex reads AGENTS.md before doing any work, merging a global one in `~/.codex` with the project's. It is a shared convention with a published spec, not a Codex-only file, so rules you write once travel to other agents.",
      tweak: "It writes a draft — add your exact test command and anything it must never touch.",
    },
    {
      title: "Give it a build task while the internet is still switched off",
      prompt:
        "Add [the feature] using only what is already in this project — do not add a dependency. If you need something that is not here, stop and tell me what and why.",
      whyHere:
        "Codex's fence has network access turned off by default, so this matches what it can actually do: a package it cannot download becomes a question, not an install you find later.",
    },
  ],

  pitfalls: [
    "Following instructions written for a different Codex: the CLI, the ChatGPT app and the editor extension are three front doors onto one product, and anything from before 2025 describes the retired model.",
    "Turning off model training in ChatGPT and believing Codex is covered. It keeps its own setting.",
  ],

  whereToNext: [
    { label: "Other coding agents and assistants", categorySlug: "ai-coding-development" },
    { label: "Developer APIs and services", categorySlug: "ai-apis-developer-services" },
    { label: "Run models on your own machine", categorySlug: "local-open-source-ai" },
  ],
};
