import type { PlatformTutorialData } from "./types";

export const cursorTutorial: PlatformTutorialData = {
  slug: "cursor-getting-started",
  platformSlug: "cursor",
  title: "Getting Started with Cursor",
  tagline:
    "An AI-first code editor that understands your whole project and edits across files as you describe what you want.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-10-29",
  changelogUrl: "https://cursor.com/changelog",
  accessTier: "FREE",

  howItWorks:
    "You install Cursor as a desktop app, open a project, and work as you would in VS Code. Alongside the editor you can chat with the codebase, accept suggestions as you type, or describe a change and let the agent edit the files for you — then read what it changed and accept or reject it.",

  whatItIs: [
    "Cursor is a **code editor built around AI** — it's a fork of VS Code, so it looks and works like the editor many developers already know, with AI woven through it. Beyond autocomplete, you can describe a change in plain English and its agent edits across multiple files, and it can reason about your **whole codebase**, not just the file you're in. It's aimed at people who write code regularly; a total beginner can use it, but it assumes you're working in a real project.",
  ],

  beforeYouStart: [
    "The **Free** plan costs nothing and gives limited agent and chat requests — enough to decide whether an AI-first editor fits how you work. Paid plans start with **Plus** and step up through **Premium**, **Super** and **Ultra**, each with a bigger usage pool that refreshes weekly; current prices are on its Launchpad page. Read the small print on Plus: Cursor's pricing page says only Grok models are available on it. Models from Anthropic, OpenAI and Google start at Premium.",
    "**Download and buy Cursor only from `cursor.com`.** Its pricing FAQ says subscriptions are \"only sold directly through X Subscription Corp\", so a \"Cursor subscription\" sold anywhere else is not the real thing.",
    "**The plans bundle more than an editor.** Every paid tier also includes Grok features (xAI's chatbot — chat, voice, images) and X perks such as a Premium checkmark, and Cursor's pricing FAQ says the usage pool is \"shared across Cursor and Grok.\" Heavy Grok use and heavy coding draw on the same allowance.",
    "**Ownership note:** Cursor is now owned by SpaceX. Cursor's blog announced on 14 August 2026 that \"Cursor has officially been acquired by SpaceX\", completing a process that began in April with a partnership with SpaceXAI. The plans above are the result — paid tiers sold through X Subscription Corp under SpaceXSI subscription terms, with Grok built in. Cursor's own terms of service (last updated 3 September 2026) still name its maker, Anysphere, as the company you contract with.",
  ],

  security: [
    {
      kind: "text",
      text: "To help you, Cursor sends the code it's working with to its servers and its AI model providers. On a personal project that's usually fine; on a work codebase, check your employer's policy first.",
    },
    {
      kind: "list",
      label: "Privacy Mode is the control worth setting",
      items: [
        "Cursor has a **Privacy Mode** (in settings, or set by a team admin). Cursor's pricing FAQ says that with it on, \"code data is not used for training by us or our model providers.\" Its terms also say it won't train on your content unless you have explicitly agreed to that.",
        "If your code is sensitive, turn Privacy Mode on **before** you start, not after.",
        "Never paste production secrets, customer data, or private credentials into any AI coding tool, Privacy Mode or not.",
      ],
    },
    {
      kind: "text",
      text: "The AI can be confidently wrong — it will suggest code that looks right and doesn't work, or that carries a subtle bug. You're still the author: read what the agent writes before you accept it, especially on multi-file edits.",
    },
  ],

  triad: {
    bestAt: [
      "Editing across many files from a single plain-English instruction",
      "Understanding and navigating an unfamiliar codebase",
      "Fast refactors, test-writing, and repetitive changes",
      "Feeling like the VS Code you know, with AI built in",
    ],
    okayAt: [
      "Very large agentic tasks (workable, but review closely and mind the credits)",
      "Predictable cost once you use other companies' models (on Premium and up they're billed at API list price from prepaid credit, outside the weekly pool)",
      "Absolute beginners with no coding context (it assumes a real project)",
    ],
    avoid: [
      "Accepting multi-file agent edits without reading them",
      "Pasting secrets or regulated data (turn on Privacy Mode first regardless)",
      "Assuming every model draws from the same pool — Cursor's own and Grok models do; Anthropic, OpenAI and Google models are billed separately",
    ],
  },

  starterActions: [
    {
      title: "Download and open a project",
      whatItDoes:
        "Install Cursor from cursor.com, open an existing project folder (or a fresh one), and sign in. It'll feel like VS Code.",
      whyHere: "Everything depends on this, and the official site is the only safe source.",
      tweak: "Already use VS Code? You can import your settings and extensions.",
    },
    {
      title: "Turn on Privacy Mode",
      whatItDoes:
        "In settings, enable Privacy Mode so your code isn't retained or used for training by the model providers.",
      whyHere: "It's the one setting to decide deliberately before you point it at anything real.",
      tweak: "On a team plan, an admin can enforce this for everyone.",
    },
    {
      title: "Start on the free plan",
      whatItDoes:
        "Use the free tier's limited usage to try the agent and codebase chat before paying.",
      whyHere: "You can judge the AI-first workflow at zero cost.",
      tweak: "If you upgrade, check which models you need first: Plus runs Grok models only, so Claude, GPT or Gemini means Premium.",
    },
    {
      title: "Ask it to explain, then change something",
      prompt:
        "Explain what this file does in plain English. Then add input validation to the main function and write a quick test for it.",
      whyHere:
        "Uses the two things Cursor does best at once — understanding your code and editing it from a description.",
      tweak: "Point it at a small real file you already have.",
    },
  ],

  pitfalls: [
    "**Third-party models bill from the first request.** On Premium and up, Anthropic, OpenAI and Google models are charged at API list price from your prepaid credit, not the weekly pool. Cursor's FAQ says you can set spending caps — set one before you pick those models.",
    "**The pool refreshes weekly, and unused usage doesn't roll over.** One heavy day won't wipe your month, but a quiet week isn't banked for later.",
    "**Buy only from cursor.com.** There are no authorized resellers; anywhere else may be fraudulent.",
  ],

  whereToNext: [
    { label: "AI Coding & Development", categorySlug: "ai-coding-development" },
    { label: "Local & Open-Source AI", categorySlug: "local-open-source-ai" },
  ],
};
