import type { PlatformTutorialData } from "./types";

export const mistralAiLeChatTutorial: PlatformTutorialData = {
  slug: "mistral-ai-le-chat-getting-started",
  platformSlug: "mistral-ai-le-chat",
  title: "Getting Started with Mistral Vibe (formerly Le Chat)",
  tagline:
    "The French-built assistant that also works through multi-step jobs — from a company that publishes its AI for anyone to run.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-07",
  changelogUrl: "https://docs.mistral.ai/resources/changelogs",
  accessTier: "FREE",

  howItWorks:
    "You type what you want in ordinary language and it writes back, in a browser at `chat.mistral.ai` or its phone and desktop apps. For anything bigger than a question you attach files or point it at tools you already use, and it works through the job a step at a time while you watch.",

  whatItIs: [
    "It drafts, summarises documents you upload, searches the web and makes images — and chains those steps toward one goal rather than answering one message at a time, which makes it an **agent**: AI that takes actions on its own. Chat handles quick questions; Work handles multi-step jobs across your email, calendar, Slack or Drive; Code is for developers.",
    "**Made by a French company, and for some that is the point.** Mistral AI is registered in Paris and is your data controller under **GDPR** — European privacy law governing what companies may do with your data. It also publishes several of its **models** — the AI \"brains\" that do the actual thinking — for anyone to run, Mistral Small 4 under a permissive Apache 2.0 licence. Vibe itself is hosted like any other assistant, but that is an exit.",
    "On everyday questions you won't tell it apart from ChatGPT, Claude or Gemini — pick it for the European story or the open models, a rival for the far bigger pile of beginner tutorials.",
  ],

  beforeYouStart: [
    "Free to start: an email address and two minutes, no card. Before you type anything, open Settings and deal with the privacy toggle below — the one setting that defaults against you.",
    "**The free tier limits you by mechanism, not by a published number.** Messages, web searches, coding sessions and images are capped; hit a cap and you wait for a reset. It is not a trial that expires but a permanent account that slows when you lean on it. Mistral publishes no message count, so treat any daily-limit figure as a guess.",
    "You will feel the ceiling only running multi-step Work tasks daily. The paid tier is currently around fifteen US dollars a month, with a cheaper verified-student rate — check the pricing page, these numbers move.",
  ],

  security: [
    {
      kind: "text",
      text: "Mistral's privacy policy says it prioritises EU providers that adhere to GDPR, attaching the European Commission's Standard Contractual Clauses in the exceptional cases where it uses one outside. Stronger than most assistants offer — but not a promise your data never leaves the EU, and not the data residency sold to Enterprise.",
    },
    {
      kind: "list",
      label: "The setting to change first",
      items: [
        "Mistral's documentation states Vibe users are **not opted out by default** — your conversations may train its models unless you say otherwise. Enterprise customers are opted out; you are not.",
        "On web: Settings, then Vibe under Manage, then Privacy, and disable `Allow your interactions to be used to train our models`.",
        "On iOS or Android: Settings, then Data & Account Controls, then deselect data sharing.",
        "Mistral's separate developer service has its own toggle; turning one off does not turn the other off.",
      ],
    },
    {
      kind: "list",
      label: "What is kept, and what to withhold",
      items: [
        "Conversations are retained until you delete the chat or your account — deleting a chat is a real action, not tidying.",
        "Connectors are the highest-stakes setting: linking email or Drive gives the assistant reach into that whole account. Connect one at a time; disconnect what you stopped using.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Everyday writing: drafting, rewriting, tightening",
      "Answering specific questions about long documents you upload",
      "Multi-step tasks across several sources, where Work mode earns its keep",
      "European-language work, French especially",
    ],
    okayAt: [
      "Web research — it searches and reads pages, but check what matters",
      "Coding help for beginners; Code mode targets developers",
    ],
    avoid: [
      "Assuming your conversations are private — a personal account is opted **in** to model training until you change it, on web and phone",
      "Repeating \"my data stays in Europe\" — the policy prioritises EU providers, it doesn't promise EU-only",
      "Following an older tutorial's clicks — Le Chat became Vibe in May 2026 and the interface those guides describe is gone",
    ],
  },

  starterActions: [
    {
      title: "Make it explain something at your level",
      prompt:
        "Explain how AI writing tools produce text to someone with no technical background. One everyday analogy, under 200 words, ending with one thing people commonly get wrong.",
      whyHere:
        "Chat mode descends directly from Le Chat: fast single answers, nothing spent on the free plan.",
    },
    {
      title: "Upload a document and interrogate it",
      prompt:
        "I am attaching a document. Give me a five-bullet summary, then list every deadline, obligation or number I would regret missing. Flag anything ambiguous rather than guessing.",
      whyHere:
        "Work mode takes documents, spreadsheets, PDFs and images directly, and Libraries holds files you question weekly so you don't re-attach them.",
    },
    {
      title: "Test its honesty before you trust it",
      prompt:
        "What were the three biggest changes in my industry in the last two months? Search the web, cite a link for each claim, and say what you could not verify.",
      whyHere:
        "In Work mode the steps are visible as it runs, so you see which page a claim came from and can redirect it mid-run.",
      tweak: "If you want this weekly, Vibe can re-run it on a schedule instead.",
    },
  ],

  pitfalls: [
    "**The training default runs the wrong way.** Personal Vibe users are not opted out of model training unless they opt out — do it in the first five minutes, on web and mobile.",
    "**The name changed and the internet hasn't caught up.** Le Chat became Vibe in May 2026, but most guides still describe an interface that no longer exists. Your account carried over; the tutorials did not.",
  ],

  whereToNext: [
    {
      label: "Compare it with the other big assistants",
      categorySlug: "text-conversational-ai",
    },
    {
      label: "Explore the open models behind it",
      categorySlug: "local-open-source-ai",
    },
  ],
};
