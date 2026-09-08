import type { PlatformTutorialData } from "./types";

export const windsurfTutorial: PlatformTutorialData = {
  slug: "windsurf-getting-started",
  platformSlug: "windsurf",
  title: "Getting Started with Devin Desktop",
  tagline: "The code editor that used to be called Windsurf, with an AI agent built in.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-07",
  changelogUrl: "https://docs.devin.ai/desktop/changelog",
  accessTier: "FREE",

  howItWorks:
    "Devin Desktop is the app formerly called Windsurf. You install it and open a folder of code in it. Describe a job in a side panel and its **agent** — AI that takes actions rather than only answering — proposes edits across the files involved, for you to approve.",

  whatItIs: [
    "**Windsurf, and before that Codeium.** Cognition bought it in July 2025 and renamed it in June 2026 — same editor, same account, same plans, `windsurf.com` now redirecting to `devin.ai`. A tutorial saying Windsurf is still the right one.",
    "It is honestly a developer tool, assuming files and folders. Cursor is the closest comparison; Claude Code runs in a text window with no editor around it. Its own bet is fleet management — one subscription covering the agent on your laptop, agents in the cloud, and a command-line version.",
  ],

  beforeYouStart: [
    "Currently $0: unlimited inline edits and tab completions, a light agent quota, a reduced model list. You need a machine you can install software on (macOS, Windows 10 or later, mainstream Linux) and a folder of code.",
    "Usage is metered in **tokens** — chunks of text, roughly a short word each, how AI usage gets counted — not messages, so a big model on a big file costs far more than a quick question. Budgets refresh daily as well as weekly.",
    "Living off autocomplete you probably will not pay; hand the agent multi-file jobs most days and paid entry currently sits around $20/month. This category reprices often.",
  ],

  gettingSetUpSafely: {
    officialSource: "https://devin.ai/download — Cognition's own download page",
    vendorDocsUrl: "https://docs.devin.ai/desktop/getting-started",
    body: [
      "Download from `devin.ai/download` and nowhere else. The rename left stale \"download Windsurf\" links across blogs and aggregator sites, and a code editor runs with your permissions, on your files.",
      "Pick the download that matches your computer. On a Mac, click the Apple menu then **About This Mac** — it will say either Apple silicon or Intel. On Windows, open Settings then **System** then **About** and read the system type, which will say 64-bit or ARM. Downloading the wrong one is the most common reason the app will not open.",
      "Onboarding imports your settings and keyboard shortcuts from VS Code or Cursor. Check before switching for good: you cannot install extensions from a marketplace here, and other AI-completion extensions are incompatible by design.",
    ],
  },

  security: [
    {
      kind: "text",
      text: "Your code leaves your machine: relevant files go to a cloud model on every request. Normal, not sinister — but think before pointing it at a client's private codebase, anything under a confidentiality agreement, or a project with passwords in it. No offline mode exists.",
    },
    {
      kind: "list",
      label: "Before pointing it at real work",
      items: [
        "By default Cognition may use data processed through the product to train models; the opt-out, which also switches on zero data retention with its providers, is a paid-plan setting. On free, assume your code contributes.",
        "Cognition is independently audited on how it handles customer data (SOC 2 Type II). Enterprise agreements go further: no training without express prior written consent.",
        "Autocomplete only adds text at your cursor; the agent creates, rewrites and deletes files and runs terminal commands project-wide. Keep it in version control and commit before setting it loose.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Multi-file changes — renaming a concept everywhere, wiring in a new page",
      "Explaining a codebase you did not write, from the actual files",
      "Everyday typing speed, via unlimited inline completion",
    ],
    okayAt: [
      "Building from nothing before you know what you want",
      "Very large old codebases — more context costs more quota",
    ],
    avoid: [
      "Work where source code cannot leave your machine",
      "Learning to program from zero — it writes code you do not understand",
      "Being your only copy of anything",
    ],
  },

  starterActions: [
    {
      title: "Tour a codebase you did not write",
      prompt:
        "Read this project and explain what it does and where I would change the homepage.",
      whyHere:
        "A read-only tour barely touches the light agent quota the free plan gives you, and a specific answer confirms it is reading your disk rather than guessing — Cursor's free tier is shaped differently, so this ordering is specific here.",
    },
    {
      title: "Your first agent edit, deliberately tiny",
      prompt:
        "Change the main heading on the homepage to say Hello from my first edit. Change nothing else, then list every file you modified.",
      whyHere:
        "Pre-2026 guides describe an approval flow around an agent called Cascade, since retired, so learn this from the current app. Reviewing before approving is the whole safety model, so keep the change small.",
    },
  ],

  pitfalls: [
    "**Accepting large agent edits without reading them.** The approve button is right there and reading nine files of changes feels like it defeats the purpose. It does not.",
  ],

  whereToNext: [
    { label: "Other AI coding tools", categorySlug: "ai-coding-development" },
    { label: "Run models on your own machine", categorySlug: "local-open-source-ai" },
  ],
};
