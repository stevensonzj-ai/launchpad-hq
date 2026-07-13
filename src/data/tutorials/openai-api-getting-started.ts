import type { PlatformTutorialData } from "./types";

export const openaiApiTutorial: PlatformTutorialData = {
  slug: "openai-api-getting-started",
  platformSlug: "openai-api",
  title: "Getting Started with the OpenAI API",
  tagline:
    "The developer doorway to OpenAI's models — build your own apps on the same AI behind ChatGPT, billed by usage.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-07-13",
  changelogUrl: "https://platform.openai.com/docs/changelog",
  accessTier: "PREMIUM",

  howItWorks:
    "You create an account, generate an **API key** (a secret credential), and your code sends requests to OpenAI's servers, which return the model's response. Billing is **per token** — you pay for the text going in and the text coming out, at a per-model rate, with output usually costing more than input. There's no monthly subscription on the API; you pay for exactly what you use, which makes cost control (picking cheaper models, setting spend limits) part of the job.",

  whatItIs: [
    "The OpenAI API is how **developers build their own software** on OpenAI's models (text, images, speech-to-text, text-to-speech, embeddings) — the same underlying models as ChatGPT, but called from your own code instead of a chat window. It's for people writing applications: a chatbot, a summarizer, a coding tool. It is **not** the ChatGPT app, and a ChatGPT subscription does **not** include API access — they're separate products with separate billing.",
  ],

  beforeYouStart: [
    "**There's no real free tier for building.** New accounts may get a small one-time trial credit after identity verification; after that it's pay-as-you-go. (There's a fringe \"free daily tokens in exchange for sharing your traffic for training\" program — skip it for anything real; see security.)",
    "**Set a hard spend limit in the billing dashboard before your first project.** Agent-style or high-volume usage can run up a bill fast; a monthly cap is your safety net.",
    "You'll write (or paste) a little code to make your first call — this page assumes you're comfortable with that. If you're not coding yet, start with the ChatGPT app instead.",
  ],

  security: [
    {
      kind: "list",
      label: "Your API key is a password — treat it like one",
      items: [
        "Anyone with your key can spend your money. **Never** commit it to a public repo, paste it into a webpage, or share it in a screenshot.",
        "Store it in an environment variable or a secrets manager, not in your code.",
        "If a key leaks, revoke it immediately in the dashboard and issue a new one.",
      ],
    },
    {
      kind: "text",
      text: "The important data point most beginners get wrong: **standard API traffic is NOT used to train OpenAI's models by default** (unlike the consumer free ChatGPT). The one exception is the opt-in \"free tokens for data-sharing\" program — that route **does** use your inputs and outputs for training, so don't use it for anything sensitive or proprietary.",
    },
    {
      kind: "text",
      text: "You are responsible for what your app produces and for the data you send. Don't send other people's personal or confidential information through the API without the right to do so, and add your own checks on model output before showing it to users.",
    },
  ],

  triad: {
    bestAt: [
      "Building custom apps on OpenAI's models from your own code",
      "Access to a broad toolkit in one place — text, images, speech, embeddings",
      "High-volume or automated tasks where a chat window won't scale",
      "Fine-grained cost control by routing simple work to cheaper models",
    ],
    okayAt: [
      "Predictable flat cost (it's usage-based, so bills vary with traffic)",
      "Beginners who don't code (the ChatGPT app is the better entry point)",
      "A ready-made interface (you build the UI; the API is just the engine)",
    ],
    avoid: [
      "Exposing your API key anywhere public",
      "Running with no spend limit set",
      "The 'free tokens' data-sharing route for anything sensitive",
    ],
  },

  starterActions: [
    {
      title: "Create a key and set a budget",
      whatItDoes:
        "Sign up, generate an API key, and set a monthly hard spend limit in the billing dashboard before you write any code.",
      whyHere: "The budget cap is the single thing that prevents a surprise bill; do it first.",
      tweak: "Also set a lower \"soft\" alert so you get an email before you hit the ceiling.",
    },
    {
      title: "Store the key safely",
      whatItDoes:
        "Put your key in an environment variable (not in your code), so it never ends up in a repo or a screenshot.",
      whyHere: "A leaked key is someone spending your money; this is the habit that prevents it.",
      tweak: "Using GitHub? Add your env file to `.gitignore` immediately.",
    },
    {
      title: "Pick a cheap model to start",
      whatItDoes:
        "For learning and testing, choose one of OpenAI's smaller, low-cost models rather than the flagship — it's plenty for a first project and keeps costs near zero.",
      whyHere:
        "Most simple tasks don't need the most expensive model; starting cheap builds good cost instincts.",
      tweak: "Move up to a bigger model only when a task actually needs it.",
    },
    {
      title: "Your first call",
      prompt:
        "Send a request that asks the model to summarize a short paragraph of text into one sentence, and print the response.",
      whyHere:
        "A single round-trip shows the whole loop — key, request, tokens billed, response — with almost no cost.",
      tweak: "Swap the summarize task for something from a project you have in mind.",
    },
  ],

  pitfalls: [
    "**The API and ChatGPT are separate products.** Your ChatGPT Plus subscription does not include API usage; the API is billed on its own.",
    "**No spend limit = a real risk.** Agent loops and high volume can rack up charges quickly; set a hard cap first.",
    "**\"Free\" here has a catch.** The only ongoing free route trades your data for model training — fine for throwaway tests, wrong for anything sensitive.",
  ],

  whereToNext: [
    { label: "AI APIs & Developer Services", categorySlug: "ai-apis-developer-services" },
    { label: "AI Coding & Development", categorySlug: "ai-coding-development" },
  ],
};
