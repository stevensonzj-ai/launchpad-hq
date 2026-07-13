import type { PlatformTutorialData } from "./types";

export const lovableTutorial: PlatformTutorialData = {
  slug: "lovable-getting-started",
  platformSlug: "lovable",
  title: "Getting Started with Lovable",
  tagline:
    "Describe the app or website you want in plain English and Lovable builds a working, full-stack version you can deploy — no coding required.",
  archetype: "prompts",
  lastReviewedAt: "2026-07-13",
  changelogUrl: "https://docs.lovable.dev/changelog",
  accessTier: "FREE",

  howItWorks:
    "You chat with Lovable the way you'd chat with any assistant, but each message builds or edits your app. It runs on **credits**, and the catch worth understanding up front: credits are spent by **how complex your request is**, not per message — a simple tweak costs a fraction of a credit, a big multi-file feature costs several. Separately, once your app is **live**, running it (hosting, plus any AI features inside it) is billed on usage on top of your subscription. So there are two cost layers: building, and running.",

  whatItIs: [
    "Lovable is an **AI app builder** — the style of tool people call \"vibe coding.\" You describe what you want in plain language and it generates a working web app: a clickable front end, a database behind it, a login flow, and the plumbing that connects them, then deploys it. It's aimed squarely at **non-developers** — founders, product people, hobbyists — who want a real, editable app without writing code. And because you can export the code, it doesn't lock you in.",
  ],

  beforeYouStart: [
    "The free plan is genuinely free (no card, not a time-limited trial): a small daily grant of build credits, unlimited public projects, GitHub integration, and **code export on every plan**. It's enough to build a small prototype; a serious build day will exhaust it.",
    "**Paid starts around $25/month** (Pro) for more credits, private projects, and custom domains.",
    "Know the two cost layers (building credits vs. runtime hosting/AI) before you build something you plan to keep live — a prototype is cheap, a trafficked app is not.",
  ],

  security: [
    {
      kind: "text",
      text: "Good news on rights: **you own what you build** — the app, its code, your customer data, and the AI output — and you can **export the code anytime** (subject to any third-party rights in the underlying AI models). Lovable doesn't hold your project hostage behind a paywall.",
    },
    {
      kind: "list",
      label: "What \"the AI built it\" doesn't mean",
      items: [
        "AI-generated apps can ship with **security holes** — missing access checks, exposed data, weak auth. Don't put a vibe-coded app in front of real users or real customer data without a security review.",
        "Lovable processes your prompts, project context, and generated code on its servers and connects to services like the database and code host it sets up — understand where your app's data lives before you store anything real in it.",
        "The honest ceiling: it gets you most of the way, but complex or production-grade apps usually need a developer to finish and harden them. A common pattern is to build in Lovable, then export and finish in a code editor.",
      ],
    },
    {
      kind: "text",
      text: "Because credits scale with request complexity and runtime is billed separately, an app that gets real traffic has real ongoing cost. Price the \"running it\" layer before you launch, not after.",
    },
  ],

  triad: {
    bestAt: [
      "Turning a plain-English description into a working, deployable web app",
      "Prototypes, landing pages, internal tools, and MVPs, fast",
      "Letting non-coders ship something real without a terminal",
      "Handing you exportable code you actually own",
    ],
    okayAt: [
      "Complex, production-grade SaaS (it gets ~70% there; the rest needs a dev)",
      "Predictable cost (credits scale with complexity; runtime bills separately)",
      "Deep custom backend logic (frontend-first is its strength)",
    ],
    avoid: [
      "Shipping to real users without a security review",
      "Storing real customer data in an unreviewed prototype",
      "Assuming the subscription is the whole cost — running the app is extra",
    ],
  },

  starterActions: [
    {
      title: "Build something small and whole",
      prompt:
        "Build a simple habit tracker: a page where I can add daily habits, check them off, and see a weekly streak. Clean, friendly design.",
      whyHere:
        "A small but complete app shows the whole loop — describe, generate, click through a real working result.",
      tweak: "Swap in an idea you actually want; keep the first version small.",
    },
    {
      title: "Iterate by describing changes",
      prompt: "Add a dark mode toggle in the top corner, and let me give each habit a color.",
      whyHere:
        "The core skill is editing by conversation — small, specific requests cost fewer credits and land more reliably than one giant one.",
      tweak: "Make one change per message so you can see what each does (and what it costs).",
    },
    {
      title: "Export your code",
      prompt: "Connect this project to GitHub so I have the full source code.",
      whyHere:
        "Proves the no-lock-in promise and sets you up to hand the app to a developer later if it grows.",
      tweak: "Even if you never touch the code, exporting is a free backup you own.",
    },
  ],

  pitfalls: [
    "**Credits burn by complexity, not by message.** A single \"add auth and payments\" request can cost as much as a dozen small edits — think in work done, not messages sent.",
    "**The subscription isn't the whole bill.** Building credits and runtime hosting/AI are separate layers; a live, trafficked app has ongoing cost.",
    "**\"The AI built it\" is not \"it's secure.\"** Review a vibe-coded app before real users or real data touch it.",
  ],

  whereToNext: [
    { label: "AI Coding & Development", categorySlug: "ai-coding-development" },
    { label: "Workflow & Automation", categorySlug: "workflow-automation" },
  ],
};
