import type { PlatformTutorialData } from "./types";

export const perplexityTutorial: PlatformTutorialData = {
  slug: "perplexity-getting-started",
  platformSlug: "perplexity-ai",
  title: "Getting Started with Perplexity",
  tagline:
    "An answer engine: ask a question, and it searches the live web and replies with a written answer plus clickable citations.",
  archetype: "prompts",
  lastReviewedAt: "2026-07-13",
  changelogUrl: "https://www.perplexity.ai/changelog",
  accessTier: "FREE",

  howItWorks:
    "You type a question and Perplexity retrieves relevant pages, reads them, and writes an answer with inline source links. The **citations are the whole point** — they're your way to verify the claim rather than trust the AI. A basic search is fast and unlimited on the free plan; a deeper \"Pro\" search mode does multi-step reasoning across more sources and is limited on free. It's a research specialist — it deliberately doesn't do image generation or coding.",

  whatItIs: [
    "Perplexity is an **answer engine** — a cross between a search engine and a chatbot. You ask a question in plain language; it searches the web in real time, reads multiple sources, and gives you one written answer with **numbered citations** you can click to check. Unlike a general chatbot working from training data, it's grounded in current web results; unlike Google, it hands you a synthesized answer instead of a list of links. It's for anyone who does research or fact-finding — students, journalists, the curious.",
  ],

  beforeYouStart: [
    "The free tier is genuinely capable: **unlimited basic cited searches**, all the focus modes, saved research spaces, on any device. The deeper Pro-search mode is capped on free (a handful every few hours).",
    "**Pro is $20/month** (cheaper annually; students can get a discounted rate) for unlimited deep searches, file uploads, and switching between frontier models.",
    "The one habit to build from day one: **click the citations.** More on why below.",
  ],

  security: [
    {
      kind: "text",
      text: "Perplexity is **citation-transparent, but not always citation-accurate.** It shows you sources, which is a real strength — but independent testing has found meaningful error rates: it can attach a statistic to a source that doesn't actually contain it, or cite the wrong page. Treat it as a **research starting point, not the final word.**",
    },
    {
      kind: "list",
      label: "How to use it without getting burned",
      items: [
        "**Click through the citations on anything that matters** — verify the source actually says what Perplexity claims before you rely on it.",
        "When you write it up, **cite the original source, not \"Perplexity.\"** It's the tool that found the source, not the source itself.",
        "Don't use it for high-stakes decisions (medical, legal, financial) as a primary source — use it to find the real sources, then check those.",
      ],
    },
    {
      kind: "text",
      text: "On data: Perplexity states it doesn't use free searches to train models, and its enterprise tier adds explicit no-training guarantees. As with any web tool, avoid pasting confidential material into your queries.",
    },
  ],

  triad: {
    bestAt: [
      "Answering current, factual questions with sources attached",
      "Fast first-pass research and finding the right sources to read",
      "Replacing a pile of Google tabs with one cited synthesis",
      "Letting you verify every claim in one click",
    ],
    okayAt: [
      "Citation accuracy (transparent, but verify — error rates are real)",
      "Deep judgment calls (it synthesizes whatever ranks highest, not the most considered view)",
      "Niche/technical topics (it may cite a forum post as if authoritative)",
    ],
    avoid: [
      "Creative writing, coding, or image generation (wrong tool)",
      "Trusting a cited number without clicking the source",
      "Citing 'Perplexity' instead of the original source in real work",
    ],
  },

  starterActions: [
    {
      title: "Ask a current factual question",
      prompt:
        "What are the current pros and cons of induction stoves versus gas, and roughly what does an induction range cost right now?",
      whyHere:
        "A question with a moving, factual answer is exactly where Perplexity beats both Google and a plain chatbot — and every claim comes sourced.",
      tweak: "Ask about something you're actually deciding on; then click every citation.",
    },
    {
      title: "Verify a citation",
      whatItDoes: "Open the linked source and confirm it actually says what the answer claimed.",
      whyHere: "This is the single habit that makes Perplexity trustworthy instead of just confident.",
      tweak: "If a source doesn't support the claim, re-ask the question or discount that point.",
    },
    {
      title: "Research a topic you'll write up",
      prompt:
        "Give me an overview of how tariffs affect consumer prices, with sources I can read to go deeper.",
      whyHere:
        "Shows the intended workflow — use it to find and understand sources, then write it yourself citing those sources.",
      tweak: "Ask follow-ups in the same thread to drill into whichever source looks strongest.",
    },
  ],

  pitfalls: [
    "**Transparent isn't the same as accurate.** It shows sources but can misattribute — always click through on anything that matters.",
    "**It's a research tool, not a writing or coding tool.** For creative work or code, use a general assistant instead.",
    "**Cite the source, not the engine.** In real work, trace every claim to the original and cite that.",
  ],

  whereToNext: [
    { label: "Research & Academic Tools", categorySlug: "research-academic-tools" },
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
  ],
};
