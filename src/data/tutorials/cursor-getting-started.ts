import type { PlatformTutorialData } from "./types";

export const cursorTutorial: PlatformTutorialData = {
  slug: "cursor-getting-started",
  platformSlug: "cursor",
  title: "Getting Started with Cursor",
  tagline:
    "An AI-first code editor that understands your whole project and edits across files as you describe what you want.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-07-13",
  changelogUrl: "https://cursor.com/changelog",
  accessTier: "FREE",

  howItWorks:
    "You install Cursor as a desktop app, open a project, and work as you would in VS Code — but you can chat with the codebase, accept AI suggestions, or hand the agent a task and let it make the edits. Paid plans run on a **credit pool**: routine work in \"Auto\" mode is effectively unlimited, but manually pointing it at the most powerful frontier models draws down your monthly credits. That distinction is the source of most surprise bills, so it's worth understanding before you lean on the heavy models.",

  whatItIs: [
    "Cursor is a **code editor built around AI** — it's a fork of VS Code, so it looks and works like the editor many developers already know, with AI woven through it. Beyond autocomplete, you can describe a change in plain English and its agent edits across multiple files, and it can reason about your **whole codebase**, not just the file you're in. It's aimed at people who write code regularly; a total beginner can use it, but it assumes you're working in a real project.",
  ],

  beforeYouStart: [
    "The free **Hobby** plan needs no card and includes a short trial of the paid features plus limited ongoing use — enough to decide whether an AI-first editor fits how you work. **Pro is around $20/month.**",
    "**Download Cursor only from `cursor.com`.** Cursor has no authorized resellers; a \"Cursor subscription\" sold anywhere else may be fraudulent and can get the account suspended.",
    "The free tier restricts context to the current file (no whole-codebase indexing or the multi-file agent) — enough to try the editor, not to feel its main advantage.",
    "**Ownership note:** Cursor's maker, Anysphere, agreed in 2026 to be acquired by SpaceX (tying it into the xAI/Grok orbit). As of this review the deal is pending and hasn't changed the product, pricing, or how your data is handled — but if a change of control matters to you, watch for updated terms.",
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
        "Cursor has a **Privacy Mode** (in settings, or set by a team admin). With it on, Cursor guarantees your **code is not stored by its model providers or used for training.**",
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
      "Predictable monthly cost (the credit pool can surprise heavy frontier-model users)",
      "Absolute beginners with no coding context (it assumes a real project)",
    ],
    avoid: [
      "Accepting multi-file agent edits without reading them",
      "Pasting secrets or regulated data (turn on Privacy Mode first regardless)",
      "Assuming Auto mode and frontier-model mode cost the same — they don't",
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
      title: "Start on the free Hobby plan",
      whatItDoes:
        "Use the free tier's trial and limited usage to try the agent and codebase chat before paying.",
      whyHere: "You can judge the AI-first workflow at zero cost.",
      tweak: "Students had a discounted route historically — check current offers before paying.",
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
    "**Auto mode is unlimited; frontier models aren't.** The credit pool only depletes when you manually pick the most powerful models — that's what causes surprise bills.",
    "**The free tier hides the main feature.** Whole-codebase context and the multi-file agent are paid; the free tier is for evaluating the editor.",
    "**Buy only from cursor.com.** There are no authorized resellers; anywhere else may be fraudulent.",
  ],

  whereToNext: [
    { label: "AI Coding & Development", categorySlug: "ai-coding-development" },
    { label: "Local & Open-Source AI", categorySlug: "local-open-source-ai" },
  ],
};
