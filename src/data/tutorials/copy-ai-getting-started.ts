import type { PlatformTutorialData } from "./types";

export const copyAiTutorial: PlatformTutorialData = {
  slug: "copy-ai-getting-started",
  platformSlug: "copy-ai",
  title: "Getting Started with Copy.ai",
  tagline:
    "An AI writing assistant for marketing copy — ads, emails, social posts, and blog drafts from a prompt or a template.",
  archetype: "prompts",
  lastReviewedAt: "2026-07-13",
  changelogUrl: "https://www.copy.ai/blog",
  accessTier: "FREE",

  howItWorks:
    "You either pick a template (fill in a product and audience, get several variations) or chat with it like a general assistant to draft and refine. Under the hood it routes to top models from a few AI labs, and you can switch depending on the task. The free plan caps you at a **monthly word count**; paid plans unlock unlimited words and the workflow features. The skill is treating it as a **first-draft engine** — it's fast at volume, but the output needs your editing to sound like a person and to be correct.",

  whatItIs: [
    "Copy.ai is an **AI writing tool** built for marketing content. At its core is a chat interface plus a big library of **templates** — ad copy, email subject lines, social captions, product descriptions, blog outlines — and a **Brand Voice** feature that learns your style. (It's since grown into a broader \"go-to-market\" platform with multi-step workflows, but for getting started, it's the chat-and-templates writing assistant.) It runs on **multiple underlying AI models** and is aimed at marketers, small businesses, and creators who produce a lot of short-form copy.",
  ],

  beforeYouStart: [
    "The free plan (no card) gives roughly **2,000 words a month** and the template library — enough to test quality. Paid individual writing plans start higher (Copy.ai has **restructured its pricing** and the range is wide, so check current tiers before committing).",
    "It writes text only — no images, no publishing/scheduling — so it's one piece of a content stack, not the whole thing.",
    "Go in expecting to **edit** everything it produces; the getting-started skill is prompting well and then rewriting, not publishing raw output.",
  ],

  security: [
    {
      kind: "text",
      text: "On data, it's reassuring: Copy.ai states it **does not use your content to train its models**, it's SOC 2 compliant, and it offers data agreements for business accounts. (Free-tier data may be retained a bit longer than paid.)",
    },
    {
      kind: "list",
      label: "The real caution is the output, not the data",
      items: [
        "AI copy can be **generic, off-tone, or factually wrong** — and long-form drafts especially can read as obviously AI-written. **Edit and fact-check everything** before it goes out.",
        "Generated text can sometimes echo published material closely enough to **trip a plagiarism checker** — run originality checks on anything you'll publish under your name.",
        "As with any AI writing, a purely AI-generated piece may not be copyrightable — your edits and creative direction are what make it yours.",
      ],
    },
    {
      kind: "text",
      text: "Don't paste confidential client data, unreleased plans, or personal information into prompts you don't have the rights to use — good practice with any cloud AI tool.",
    },
  ],

  triad: {
    bestAt: [
      "Fast first drafts of short marketing copy — ads, emails, captions",
      "Beating the blank page and generating lots of variations to pick from",
      "Keeping a consistent brand voice across channels once it's trained",
      "Non-writers producing usable marketing content quickly",
    ],
    okayAt: [
      "Long-form articles (drafts can feel generic; need real editing)",
      "Factual accuracy (it can confidently state wrong things — verify)",
      "Originality out of the box (check for plagiarism on published work)",
    ],
    avoid: [
      "Publishing first-draft output without editing and fact-checking",
      "Treating it as a research source (it isn't grounded — verify claims)",
      "Pasting confidential or client-owned material into prompts",
    ],
  },

  starterActions: [
    {
      title: "Generate ad variations",
      prompt:
        "Write 5 short Facebook ad captions for a local yoga studio's beginner class. Warm, welcoming tone, each under 25 words, with a clear call to action.",
      whyHere:
        "Short-form marketing copy in volume is exactly what Copy.ai is fastest and most useful at.",
      tweak: "Swap in your own product and audience; generate, then pick the one closest and rewrite it.",
    },
    {
      title: "Train your brand voice",
      whatItDoes:
        "Paste a few samples of your existing writing so Copy.ai learns your tone, then have it draft in that voice.",
      whyHere:
        "Brand Voice is what stops the output sounding like generic AISpeak — it's the feature worth setting up early.",
      tweak: "Feed it your best-written examples, not your quickest ones.",
    },
    {
      title: "Draft, then edit hard",
      prompt:
        "Write a 150-word intro for a blog post about saving time with meal prep, friendly and practical.",
      whyHere: "Shows the real workflow — a fast draft you then cut, correct, and make human.",
      tweak: "After it drafts, ask it to \"make it more specific and less generic,\" then do a human pass.",
    },
  ],

  pitfalls: [
    "**It's a draft engine, not a publish button.** Edit and fact-check everything; raw output reads as AI-written.",
    "**Watch for accidental plagiarism.** Run originality checks on anything you'll publish under your name.",
    "**Pricing has been restructured and ranges widely.** Confirm the current individual writing tier before you assume a number.",
  ],

  whereToNext: [
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
    { label: "Workflow & Automation", categorySlug: "workflow-automation" },
  ],
};
