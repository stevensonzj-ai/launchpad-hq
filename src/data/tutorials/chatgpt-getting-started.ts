import type { PlatformTutorialData } from "./types";

export const chatgptTutorial: PlatformTutorialData = {
  slug: "chatgpt-getting-started",
  platformSlug: "chatgpt",
  title: "Getting Started with ChatGPT",
  tagline:
    "A general-purpose AI assistant for questions, writing, coding, and everyday tasks.",
  archetype: "prompts",
  lastReviewedAt: "2026-06-22",
  accessTier: "FREE",
  howItWorks:
    "ChatGPT is a chat-based AI assistant: you type a request in plain language and it replies. Describe what you want in your own words — no special commands needed — and it responds in seconds.",
  whatItIs: [
    "Answer questions and explain concepts",
    "Write, edit, and debug code",
    "Summarize long texts",
    "Brainstorm ideas",
    "Translate languages",
    "Create written content (emails, essays, stories)",
    "Analyze data and documents",
    "Generate images with DALL-E",
  ],
  beforeYouStart: [
    "Create a free account at chat.openai.com — sign up with an email, Google, or Microsoft account, then verify your email.",
    "No phone number is required for the free tier.",
    "The free tier includes unlimited GPT-4o mini, limited GPT-4o access, 3 image generations per day, file uploads (PDFs and docs), web browsing, and the Canvas editor.",
    "Free-tier limits can vary based on demand.",
    "Prices and features change often — check openai.com for the latest details.",
  ],
  security: [
    "TODO: Add security & privacy guidance for ChatGPT — the source tutorial had no security or privacy content to re-slot here.",
  ],
  triad: {
    bestAt: [
      "Coding help and debugging",
      "Explaining complex topics clearly",
      "Quick, conversational answers",
    ],
    okayAt: [
      "Long, multi-topic conversations — it may lose track of earlier context",
      "Questions about recent events — its knowledge has a training cutoff",
    ],
    avoid: [
      "Anything that needs guaranteed factual accuracy — it can hallucinate",
      "Live web lookups on the free tier — it can't browse in real time",
    ],
  },
  starterActions: [
    {
      title: "Explain a hard topic simply",
      whatItDoes:
        'Asks ChatGPT to explain a complex subject in plain, beginner-friendly language. Prompt: "Explain quantum computing to a 10-year-old."',
      whyHere:
        "Shows how ChatGPT adapts depth and tone to your audience — the fastest way to feel its explaining strength.",
      tweak:
        'Swap in any topic you want to learn, and change "a 10-year-old" to "a beginner" or "an expert".',
    },
    {
      title: "Draft a professional email",
      whatItDoes:
        'Turns a one-line intent into a polished message. Prompt: "Write a professional email asking for a meeting."',
      whyHere:
        "Everyday writing help is one of the most common first uses, and it's easy to judge whether the result is good.",
      tweak:
        "Add the recipient, the tone you want, and the meeting's purpose for a sharper draft.",
    },
    {
      title: "Debug your code",
      whatItDoes:
        'Pastes in code and asks ChatGPT to find and fix problems. Prompt: "Help me debug this code: [paste your code]."',
      whyHere:
        "Coding help is one of ChatGPT's strongest areas, so it's a high-confidence first task for developers.",
      tweak:
        "Include the error message and what you expected to happen for a faster fix.",
    },
    {
      title: "Brainstorm ideas",
      whatItDoes:
        'Asks for a list of options around a constraint. Prompt: "Give me 5 recipe ideas using chicken and rice."',
      whyHere:
        "Idea generation is low-stakes and shows how ChatGPT handles open-ended requests.",
      tweak:
        "Replace the ingredients — or the whole topic — with anything you need options for.",
    },
    {
      title: "Summarize a long text",
      whatItDoes:
        'Condenses an article or document into the key points. Prompt: "Summarize this article: [paste text]."',
      whyHere:
        "Summarizing is a quick win that shows ChatGPT working from your own material.",
      tweak: 'Ask for a specific length or format, like "in 3 bullet points".',
    },
  ],
  pitfalls: [
    "TODO: Add common pitfalls — the source tutorial's only caveats were re-slotted into the Best at / Okay at / Avoid triad, leaving no distinct pitfalls content to use without duplicating it.",
  ],
  whereToNext: [
    "Explore GPT-4 with ChatGPT Plus ($20/month) for more capability.",
    "Set Custom Instructions to personalize how ChatGPT responds.",
    "Install the mobile app to use ChatGPT on the go.",
  ],
};
