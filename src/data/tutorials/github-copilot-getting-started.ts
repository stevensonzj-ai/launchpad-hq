import type { PlatformTutorialData } from "./types";

export const githubCopilotTutorial: PlatformTutorialData = {
  slug: "github-copilot-getting-started",
  platformSlug: "github-copilot",
  title: "Getting Started with GitHub Copilot",
  tagline:
    "An AI pair-programmer that lives inside your code editor, suggesting lines and answering questions as you work.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-07-13",
  changelogUrl: "https://github.blog/changelog/label/copilot/",
  accessTier: "FREE",

  howItWorks:
    "Copilot watches the code and comments around your cursor and suggests what probably comes next — a line, a whole function, or a block — which you accept with a keystroke. Alongside that, a **chat** feature lets you ask things in plain English (\"what does this function do?\", \"write a test for this\") and get answers grounded in your open code. Two things are worth knowing about the plumbing: inline autocomplete is unlimited on the paid plans and doesn't draw down any usage budget, while the heavier features (chat, \"agent\" mode that edits multiple files, code review) run on a monthly **credit** allowance that heavier use can exhaust.",

  whatItIs: [
    "GitHub Copilot is an AI coding assistant that runs **inside your editor** — it autocompletes code as you type, and answers questions in a chat panel about the file or project you're in. It's built by GitHub with models from several AI labs, and it works in the popular editors (**VS Code, Visual Studio, the JetBrains IDEs, and Vim/Neovim**) rather than being its own separate app. It's aimed at anyone who writes code, from first-project beginners to professionals; you don't need to be an expert to get value from the autocomplete.",
  ],

  beforeYouStart: [
    "There's a genuinely usable **free tier** (a couple thousand autocompletes a month plus limited chat/agent use, no card required) — enough to decide whether it fits how you work before paying. Paid individual plans start at roughly **$10/month**; verified students and popular open-source maintainers can get paid features free.",
    "**Install it from the official source only** — the Copilot extension inside your editor's built-in marketplace, or via github.com. Don't install a \"Copilot\" plugin from an unofficial third-party listing.",
    "You need a GitHub account and one of the supported editors. If you don't already have an editor, **VS Code** is free and the most common starting point.",
  ],

  security: [
    {
      kind: "text",
      text: "Copilot sends the code around your cursor, plus your chat messages, to GitHub's servers to generate suggestions. On a work codebase, check your employer's policy before turning it on.",
    },
    {
      kind: "list",
      label: "The data-training default worth knowing",
      items: [
        "On the **individual plans (Free, Pro, Pro+)**, GitHub may use your interactions — including your **inputs, the suggestions you get, code snippets, and surrounding context** — to train and improve its models **unless you opt out** in settings.",
        "The **Business and Enterprise plans are excluded** from that training by default.",
        "If you're on an individual plan and don't want your code used for training, the opt-out is a settings toggle — flip it before you start on anything sensitive.",
      ],
    },
    {
      kind: "text",
      text: "Suggestions can occasionally mirror public code, and generated code can carry bugs or security flaws. Treat every suggestion as a **draft to review**, not a finished answer — you're still the author on the hook for what ships. (The paid **Business/Enterprise** tiers add IP indemnity; the individual tiers don't.)",
    },
  ],

  triad: {
    bestAt: [
      "Autocompleting boilerplate and repetitive code you'd otherwise type by hand",
      "Explaining unfamiliar code in plain language",
      "Drafting tests, comments, and small functions from a description",
      "Keeping you in flow without tab-switching to a separate chatbot",
    ],
    okayAt: [
      "Larger multi-file changes via agent mode (workable, but review closely)",
      "Niche or less-common languages (quality tracks how much public code exists)",
      "Debugging — it helps, but can confidently suggest wrong fixes",
    ],
    avoid: [
      "Trusting generated code without reading it",
      "Security-critical or licensing-sensitive code without human review",
      "Treating it as a substitute for understanding what your code does",
    ],
  },

  starterActions: [
    {
      title: "Pick your editor and install the extension",
      whatItDoes:
        "Install Copilot from the official marketplace inside VS Code (or your JetBrains IDE / Visual Studio), then sign in with your GitHub account.",
      whyHere:
        "Everything else depends on this; the official in-editor marketplace is the safe source.",
      tweak: "No editor yet? Install VS Code first — it's free.",
    },
    {
      title: "Start on the free tier",
      whatItDoes:
        "Choose Copilot Free to try autocomplete and limited chat with no card on file before deciding on a paid plan.",
      whyHere:
        "You can judge whether it fits your workflow at zero cost and zero commitment.",
      tweak: "Student or OSS maintainer? Check eligibility for free paid-tier access.",
    },
    {
      title: "Set your training preference",
      whatItDoes:
        "In Copilot settings, decide whether GitHub may use your interactions to train its models, and toggle the opt-out if you'd rather it didn't.",
      whyHere:
        "On individual plans this is on by default; setting it deliberately before you code is the one thing not to skip.",
    },
    {
      title: "Try it on real code",
      prompt:
        "Write a function that takes a list of numbers and returns the average. Then write three tests for it.",
      whyHere:
        "Uses both halves of Copilot at once — the autocomplete drafts the function, chat drafts the tests — so you see how it actually feels.",
      tweak: "Swap in a small task from something you're actually working on.",
    },
  ],

  pitfalls: [
    "**Credits ≠ autocomplete.** Inline completions are unlimited on paid plans; only chat/agent/review draw down credits. Heavy agent use is what burns the monthly allowance.",
    "**The free tier is a taste, not a workflow.** Its monthly caps are for evaluating, not for daily reliance.",
    "**The training opt-out is per-account and easy to miss.** If your code is sensitive, set it before your first session, not after.",
  ],

  whereToNext: [
    { label: "AI Coding & Development", categorySlug: "ai-coding-development" },
    { label: "Local & Open-Source AI", categorySlug: "local-open-source-ai" },
  ],
};
