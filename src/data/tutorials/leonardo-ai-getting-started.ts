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
    "You type a description of a picture and Leonardo draws it. That description is a **prompt**, and writing good ones is most of the skill. Different **models** — the engines that draw — suit different jobs, and Leonardo picks one if you don't. Each generation spends **tokens** from a balance on screen, and on the free plan that balance refills daily. A bad prompt costs a minute, not money.",

  whatItIs: [
    "A browser tool at `app.leonardo.ai`. Nothing to install, no card needed to start.",
    "The free plan is why beginners land here: currently around 150 tokens a day, with a standard image costing roughly one token. Midjourney has no free tier; Firefly and Ideogram give a monthly allowance that runs dry and makes you wait. Leonardo's tomorrow always brings more.",
    "It leans toward game art and character work, and the controls show it — reference-image slots, character consistency, trainable styles. Knobs that matter when you're designing a thing, not just making one nice picture.",
    "**Blueprints** are prebuilt workflows where you fill in a field or two instead of writing a prompt.",
  ],

  beforeYouStart: [
    "**Cost:** free to start, genuinely. Paid plans currently begin around $12/month, rising to roughly $30 and $60, cheaper annually. Prices move — check the pricing page.",
    "**What you need:** an email address and a browser. Optionally a reference image, if you have a character in mind.",
    "**The daily token mechanism:** free tokens reset every 24 hours and **do not carry over**, so you can't save up. Paid plans swap this for a monthly allowance that banks what you don't use. Costs vary by feature and are shown before you commit.",
    "**Will you realistically need to pay?** For learning, no. It comes down to two things, neither about volume: privacy (free work is public) and video (one clip can eat a day's allowance).",
    "**First step:** sign up, open the image generator, type one plain sentence describing a scene, and generate. Don't touch a setting yet.",
  ],

  security: [
    {
      kind: "text",
      text: "Understand this before your first generation: on the free plan, everything you make is public. Others can see, copy and remix your images, and Leonardo's policy states free-tier content is used to improve its models. Private generation requires a paid plan. This isn't hidden — it's in their terms. It's the deal: you pay with visibility instead of money.",
    },
    {
      kind: "list",
      label: "What that means in practice",
      items: [
        "Generate nothing on the free plan you'd mind seeing in a public gallery — no work under NDA, no unreleased designs, no personal photos.",
        "Reference images you upload are content submitted to the service. Treat other people's work with public-site caution.",
        "Commercial use is allowed on every tier including free. But on free that's a licence to use your images, not exclusive ownership.",
        "On paid plans you keep full ownership and copyright, and that survives if you later downgrade to free.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Characters, creatures and concept art — what the platform was built around",
      "Stylised illustration, fantasy and sci-fi, painterly and game-art looks",
      "Cheap, high-volume iteration without watching a meter",
      "Getting a usable result with no prompt-writing skill, via Blueprints",
    ],
    okayAt: [
      "Photorealistic product shots — good, not always best in class",
      "Readable text in an image; newer models handle it far better, but check every character",
      "Short video clips from a still — capable, but expensive against a free allowance",
    ],
    avoid: [
      "Layout-critical design — logos, exact typography, brand fonts",
      "Confidential or client work on the free plan",
      "Diagrams, charts or anything that must be factually accurate",
    ],
  },

  starterActions: [
    {
      title: "Generate one image with no settings touched",
      whatItDoes:
        "Makes your first image from a plain sentence, letting Leonardo choose the model.",
      prompt:
        "A weathered brass diving helmet resting on a wooden dock at sunrise, salt crust on the metal, shallow depth of field, warm side lighting",
      whyHere:
        "Leonardo auto-selects a model when you don't pick one, so you get a competent result before you know what a model is. At roughly a token per image against a daily allowance in the low hundreds, you can run it dozens of times today for nothing.",
      tweak:
        "Change only the last clause — swap 'warm side lighting' for 'flat overcast light'. One variable at a time is how you learn which words do work.",
    },
    {
      title: "Run a Blueprint instead of writing a prompt",
      whatItDoes:
        "Uses a prebuilt workflow that bundles model, prompt and settings behind a couple of inputs.",
      whyHere:
        "Blueprints are Leonardo's answer to the blank prompt box, and each shows its token cost before you generate — which matters here because some cost more than a free user's whole daily allowance. Check that number first.",
      tweak:
        "Then try to recreate the result yourself in the normal generator. The gap is your lesson.",
    },
    {
      title: "Make a character concept sheet",
      whatItDoes: "Generates a character from several angles on a clean background.",
      prompt:
        "Character concept sheet for a swamp ranger, front view and side view, muted green leather armour, oversized canvas satchel, weathered boots, flat neutral grey background, painted concept art style",
      whyHere:
        "This is the work Leonardo was shaped around, and its models hold the concept-sheet convention — multiple views, neutral background, painted finish — better than generators tuned mainly for photography.",
    },
    {
      title: "Hold one character steady across several images",
      whatItDoes:
        "Uses an existing image as a reference so the same figure appears in new scenes and poses.",
      whyHere:
        "Leonardo puts character reference in the generation panel as a plain upload, not behind prompt syntax you must memorise. It's what turns a pile of nice pictures into a coherent set.",
      tweak:
        "Reuse one reference across three very different settings and judge how well the likeness survives.",
    },
  ],

  pitfalls: [
    "**Free generations are public — that's the actual price.** Others can view and remix your images, and free content feeds model training. Keep confidential work off the free plan.",
    "**Free tokens don't roll over.** Unused ones vanish at reset, so generating a little most days beats planning a marathon.",
    "**Token costs vary enormously.** A plain image is about one token; video and heavy workflows cost many times that. Read the cost shown before you click.",
    "**Much of the advice online points at legacy features.** Alchemy, PhotoReal and Elements still work but are no longer core. If a guide leads with those names, check its date.",
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
