import type { PlatformTutorialData } from "./types";

export const tabnineTutorial: PlatformTutorialData = {
  slug: "tabnine-getting-started",
  platformSlug: "tabnine",
  title: "Getting Started with Tabnine",
  tagline:
    "The AI coding assistant built around never touching your code — now sold only to companies.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-08",
  changelogUrl: "https://docs.tabnine.com/main/administering-tabnine/release-notes",
  accessTier: "FREE",

  howItWorks:
    "You work in your normal code editor with Tabnine switched on. As you type, grey suggested text appears ahead of your cursor and you press Tab to accept it or keep typing to ignore it. A side panel lets you select some code, ask a question about it in plain English, and read the answer without leaving the editor.",

  whatItIs: [
    "Tabnine is an AI coding assistant that lives inside an **IDE** (the program a developer writes code in) — it finishes the line you are typing and answers questions about code in a side panel, not a browser tab.",
    "Its selling point is what it does **not** do with your code, backed by models Tabnine trained itself on **open-source** code (code that is public, so anyone can inspect it) under licences that allow reuse.",
    "As of September 2026 it sells to companies only — two quoted plans, no individual sign-up. Tricentis, a software-testing company, bought Tabnine in July 2026 and plans to fold its context technology into its own platform; releases are still shipping.",
  ],

  beforeYouStart: [
    "**There is no free tier, no trial, and no way to buy a single seat.** The two plans run around $39 and $59 per user per month, billed annually, and both buttons say \"Get a quote\" rather than taking a card. You get Tabnine because an employer bought it.",
    "If your workplace already has it, ask whoever runs developer tooling for a sign-in or a private Tabnine server address — that address, not the download, is what unlocks it. It installs into Visual Studio Code, JetBrains editors, Visual Studio or Eclipse.",
    "If you are learning to code on your own, the blocker is not your skill level; Tabnine does not sell to individuals. Our AI coding tools category lists assistants with free tiers you can install today.",
  ],

  security: [
    { kind: 'text', text: "Tabnine's whole pitch is data handling, and its wording is unusually specific for this market: \"Your code is never stored,\" and requests are \"only ephemerally processed to provide coding suggestions and are then immediately discarded.\"" },
    { kind: 'list', label: 'Where that promise stops', items: [
      "It is written around \"our proprietary models.\" Switch to Claude, GPT or Gemini — other companies' **models** (the AI \"brain\" that does the actual thinking) — and Tabnine's own docs say the protection \"may be different.\"",
      "It is a promise to your employer, not to you: the plans include \"advanced governance and analytics,\" so your usage is visible to whoever administers the account.",
    ] },
    { kind: 'text', text: "What the money really buys is where it runs — a company's own servers, or \"fully air-gapped,\" meaning machines with no internet connection at all." },
  ],

  triad: {
    bestAt: [
      "Finishing the line or the whole function you are part-way through typing",
      "Explaining a block of code you have highlighted, without copying it out into a browser",
      "Working somewhere that cannot legally send code to a public AI service — banks, defence, healthcare",
      "Generating tests and documentation for code that already exists",
    ],
    okayAt: [
      "Anything that is not about code — it is aimed at your editor, not at being a general chatbot",
      "Raw capability from its own models, which trade some of it for the licensing guarantee",
    ],
    avoid: [
      "Leaning on the privacy guarantee with an outside model selected — the docs say protection there \"may be different\"",
      "Building a personal workflow on it: there is no individual plan, so the tool leaves when the job does",
      "Assuming the licence checking is on — it ships as a preview, and blocking non-permissive code is a toggle someone has to switch",
    ],
  },

  starterActions: [
    {
      title: "Find out whether you already have it",
      whatItDoes:
        "Ask whoever runs developer tooling for a Tabnine sign-in or a private server address.",
      whyHere:
        "The current extension is \"Tabnine for Enterprise\" and connects to \"your dedicated Tabnine server,\" so an administrator's address is what unlocks it — with GitHub Copilot you just buy a subscription.",
    },
    {
      title: "Check which model is answering you",
      whatItDoes:
        "Open Tabnine's model selector and see whether you are on a Tabnine model or on Claude, GPT or Gemini.",
      whyHere:
        "Tabnine publishes one data promise for its own models and a weaker one for the rest, so the selector changes what protects you — Copilot's terms cover every model it serves.",
    },
    {
      title: "Make it write the test, not the feature",
      prompt:
        "Write tests for the function I've selected. Cover the empty-input case and one failure case, using the test framework this project already uses.",
      whyHere:
        "Tricentis bought Tabnine to feed software-testing tools, so test generation is the part of this product with a stated roadmap behind it — for Copilot it is one feature among many.",
    },
    {
      title: "Ask where a suggestion came from",
      prompt:
        "Where did this code come from? Show me any public project it matches, and that project's licence.",
      whyHere:
        "Tabnine checks chat output \"against the publicly visible code on GitHub\" and names the project and its licence, where Copilot's public-code filter only suppresses a match without saying what it matched.",
    },
  ],

  pitfalls: [
    "Comparison sites still list a free Tabnine plan. They are out of date — the vendor's own pricing page shows two paid tiers and no free or trial option.",
    "The old \"(Legacy) Tabnine\" extension is still in the Visual Studio Code marketplace and still installs, but it says Tabnine \"does not onboard new users to this plugin\" — installing it gets you nothing.",
    "Suggestions are accepted with the Tab key, which is also how you indent. Early on you will accept code you did not want; keep typing to dismiss one rather than reaching for undo.",
  ],

  whereToNext: [
    { label: 'AI coding tools you can start free', categorySlug: 'ai-coding-development' },
    { label: 'Run a model on your own machine', categorySlug: 'local-open-source-ai' },
    { label: 'Chatbots that also help with code', categorySlug: 'text-conversational-ai' },
  ],
};
