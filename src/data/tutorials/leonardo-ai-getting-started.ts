import type { PlatformTutorialData } from "./types";

export const leonardoAiTutorial: PlatformTutorialData = {
  slug: "leonardo-ai-getting-started",
  platformSlug: "leonardo-ai",
  title: "Getting Started with Leonardo.Ai",
  tagline:
    "An image generator with a free allowance that refills every day — built for characters, worlds and concept art.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-07",
  changelogUrl:
    "https://intercom.help/leonardo-ai/en/collections/5295455-feature-releases",
  accessTier: "FREE",

  howItWorks:
    "You type a description of the picture you want — that description is a **prompt**, the message you type — and Leonardo draws it in seconds. You look at what came back, change a few words, and go again, each attempt spending from a balance on screen.",

  whatItIs: [
    "A browser tool at `app.leonardo.ai` — nothing to install, no card to start.",
    "The free plan is why beginners land here: currently around 150 credits a day (Leonardo calls them tokens), a standard image costing roughly one. Midjourney has no free tier; Firefly and Ideogram give a monthly allowance that runs dry and makes you wait. Leonardo's tomorrow brings more.",
    "It leans toward game art and character work, and the controls show it — reference-image slots, character consistency, trainable styles. There are also **Blueprints**: prebuilt setups where you fill in a field or two instead of writing a prompt.",
  ],

  beforeYouStart: [
    "You need an email address and a browser, plus a reference image if you already have a character in mind.",
    "**Free credits reset every 24 hours and do not carry over**, so you cannot save up for something big. Paid plans swap that for a monthly allowance that banks what you don't spend. Costs vary by feature and are shown before you commit.",
    "Learning costs nothing. What pushes people to pay is privacy — free work is public — and video, where one clip can eat a day's allowance. Paid plans currently begin around $12/month, rising to roughly $30 and $60, cheaper annually; prices move.",
    "First step: sign up, open the image generator, type one plain sentence describing a scene, and generate. Don't touch a setting yet.",
  ],

  security: [
    {
      kind: "text",
      text: "Understand this before your first generation: on the free plan, everything you make is public. Others can see, copy and remix your images, and Leonardo's policy states free-tier content is used to improve its models. Private generation needs a paid plan — you pay with visibility, not money.",
    },
    {
      kind: "list",
      label: "What that means in practice",
      items: [
        "Generate nothing on the free plan you'd mind seeing in a public gallery — nothing you agreed to keep confidential, no unreleased designs, no personal photos.",
        "Reference images you upload are content submitted to the service — treat other people's work with public-site caution.",
        "Commercial use is allowed on every tier including free — but on free that is a licence to use your images, not exclusive ownership of them.",
        "On paid plans you keep full ownership and copyright, and that survives if you later downgrade to free.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Characters, creatures and concept art — what the platform was built around",
      "Stylised illustration, fantasy and sci-fi, painterly game-art looks",
      "Cheap, high-volume iteration without watching a meter",
      "Getting a usable result with no prompt-writing skill, via Blueprints",
    ],
    okayAt: [
      "Photorealistic product shots — good, not always best in class",
      "Readable text in an image — newer models are far better, but check every character",
      "Short video clips from a still — capable, but expensive on a free allowance",
    ],
    avoid: [
      "Confidential or client work on the free plan — it all lands in a public gallery",
      "Expecting images to be exclusively yours on free: commercial use is allowed, exclusivity is not",
      "Video on the free daily refill; one clip can swallow the lot",
      "Layout-critical design — logos, exact typography, brand fonts",
    ],
  },

  starterActions: [
    {
      title: "Generate one image with no settings touched",
      prompt:
        "A weathered brass diving helmet on a wooden dock at sunrise, salt crust on the metal, background softly out of focus, low warm light from one side",
      whyHere:
        "Leonardo picks a **model** — the AI \"brain\" doing the drawing — when you don't, so you get a competent result before you know what a model is. At roughly one credit an image against a daily allowance in the low hundreds, you can run it dozens of times for nothing.",
      tweak:
        "Change only the last clause — swap the warm side light for flat overcast light. One variable at a time is how you learn which words do work.",
    },
    {
      title: "Run a Blueprint instead of writing a prompt",
      whyHere:
        "Blueprints are Leonardo's answer to the blank prompt box, and each shows its credit cost before you generate — which matters here, because some cost more than a free user's whole daily allowance.",
    },
    {
      title: "Make a character concept sheet",
      prompt:
        "Character concept sheet for a swamp ranger, front view and side view, muted green leather armour, oversized canvas satchel, weathered boots, flat neutral grey background, painted concept art style",
      whyHere:
        "This is the work Leonardo was shaped around: its models are built and sold for game and concept art rather than photography, which is why the concept-sheet convention — several views, neutral background, painted finish — is the thing to ask it for.",
    },
    {
      title: "Hold one character steady across several images",
      whyHere:
        "Character reference sits in the generation panel as a plain image upload, not behind prompt syntax you must memorise. That is what turns a pile of nice pictures into a set.",
    },
  ],

  pitfalls: [
    "**Free generations are public — that is the actual price.** Others can view and remix them, and free content feeds model training.",
    "**Free credits don't roll over.** Unused ones vanish at reset, so a little most days beats planning a marathon.",
    "**Costs vary enormously by feature.** A plain image is about one credit; video and heavy workflows many times that. Read the number first.",
    "**Much of the advice online points at legacy features.** Alchemy, PhotoReal and Elements still work but are no longer core — if a guide leads with those, check its date.",
  ],

  whereToNext: [
    {
      label: "Compare it with other image tools",
      categorySlug: "image-generation-editing",
    },
    {
      label: "Turn your images into motion",
      categorySlug: "video-creation-editing",
    },
  ],
};
