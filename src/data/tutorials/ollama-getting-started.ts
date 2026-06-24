import type { PlatformTutorialData } from "./types";

export const ollamaTutorial: PlatformTutorialData = {
  slug: "ollama-getting-started",
  platformSlug: "ollama",
  title: "Getting Started with Ollama",
  tagline:
    "Run AI models privately on your own computer — free, offline, and nothing you type leaves your machine.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-06-24",
  changelogUrl: "https://ollama.com/blog",
  accessTier: "FREE",

  howItWorks:
    "You install the Ollama app, pick an AI model to download onto your own computer, and chat with it in a window much like ChatGPT — except everything runs locally, with nothing sent online.",

  whatItIs: [
    "Ollama lets you run AI models directly on your own machine. Nothing you type leaves your computer, there's no monthly bill, and it works offline. It's the most popular on-ramp to 'local AI,' and the opposite trade-off from ChatGPT: you give up some quality and do a little setup, and in return get complete privacy and unlimited free use. It used to be a command-line-only tool, but there's now a proper app — so it's friendlier than its reputation. The real question isn't whether you're technical; it's whether your computer is powerful enough.",
  ],

  beforeYouStart: [
    "The local app is free and open-source (the code is public and free to use) — no account, no card, no usage limits. Running models on your own computer is genuinely unlimited and private, forever.",
    "One thing that'll confuse you the moment you Google it: Ollama now also sells a paid Cloud option (starts around $20/month) for running big models you can't fit on your own machine. That's a separate, optional service — it requires an account and sends your data to their servers. This guide is about the free, private, local path. If you run into 'Ollama Cloud,' that's the paid thing, and you can ignore it to get started.",
    "Your computer does the work, so hardware matters most. Rough floor: about 8 GB of RAM (your computer's short-term working memory — on Windows, check Task Manager; on Mac, 'About This Mac') to run a small-to-mid model smoothly. Underpowered means slow or won't run at all. This — not any setup step — is the main thing deciding whether Ollama feels pleasant or painful.",
    "Friendlier than it used to be. There's now a proper desktop app: install it, open it, pick a model from a menu, and chat — no typing commands required. A command line (a text window where you type instructions instead of clicking) is still handy for housekeeping like listing or removing models, but you don't need it to get going.",
  ],

  gettingSetUpSafely: {
    officialSource:
      "Download only from the official site — ollama.com. This is the one that matters most: don't grab it from a random search result, a bundle site, or a link someone sent you — lookalike sites can bundle malware, and you're installing software on your own machine. (Use Ollama's official install guide for your exact Mac/Windows/Linux steps.)",
    body: [
      "Check your hardware before you install, not after. Confirm roughly 8 GB of RAM free before committing.",
      "Know where the models live. Leave the install location at its default. The thing to watch: downloaded models are several gigabytes each and pile up on your hard drive (a model's size is often shown in 'parameters' — a rough proxy for how big and capable it is; more is smarter but heavier).",
      "Confirm it works. Running one small model and getting a reply back is your 'set up correctly' checkpoint.",
    ],
    vendorDocsUrl: "https://ollama.com/download",
  },

  security: [
    {
      kind: "text",
      text: "Here the usual warning flips. Because the local app runs entirely on your own computer, it's the most private option there is — the 'never paste anything sensitive' rule for cloud chatbots mostly doesn't apply, because nothing you type is sent anywhere. That privacy is real, and it's the whole point of using it.",
    },
    {
      kind: "list",
      label: "Three things keep it that way:",
      items: [
        "Stay local. Leave the defaults. The one way to undo the privacy is exposing it to your network or the internet (see the pitfalls below).",
        "Get models from trusted sources. Stick to the official model library — same instinct as only installing software from sources you trust.",
        "Know that 'Ollama Cloud' is the exception. The paid cloud option DOES send your data to Ollama's servers — that's the trade-off for borrowing their hardware. Ollama is private-by-default only when you run locally. If privacy is why you're here, stay on the local path.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Privacy — prompts and files never leave your machine, which is right for genuinely sensitive material",
      "Free, unlimited use",
      "Working offline",
      "Learning how AI actually works by tinkering",
    ],
    okayAt: [
      "Raw quality — local models are smaller than the giant cloud ones, so they're useful, not magic",
      "Speed, which is entirely down to your hardware",
    ],
    avoid: [
      "Expecting frontier-level answers — if you want the best and don't care about privacy, cloud chatbots win",
      "Running big models on weak hardware — the fastest route to a bad first impression",
      "Reaching for it when you just want to chat and aren't curious about the local angle — start with ChatGPT, come back when privacy or cost is a real reason",
    ],
  },

  starterActions: [
    {
      title: "On a modest computer (~8 GB RAM): a small general model",
      whatItDoes:
        "Pulls a small general-purpose model — around 3–4 billion parameters, like a small Gemma or Llama. It loads fast, runs smoothly, and proves your setup works end to end.",
      whyHere:
        "On 8 GB this is the line between 'works well' and 'too slow to enjoy.' It's also the honest starting point — a tiny model isn't local AI at its best, so don't judge the whole approach by it.",
      tweak:
        "First run of any model is slow — it's loading into memory, not broken. After that it's quick.",
    },
    {
      title: "With more room (16 GB+ RAM): a 7–8B general model",
      whatItDoes:
        "Steps up to a 7–8 billion-parameter general model — the point where local AI starts feeling genuinely useful rather than just a demo.",
      whyHere:
        "This is the tier where most people decide local AI is worth it. It needs the extra memory headroom, which is why it's gated on 16 GB+ rather than being the default first pull.",
    },
    {
      title: "For coding: a code-specific model",
      whatItDoes:
        "Pulls a model tuned for programming — a free, private coding helper running entirely on your machine with no per-token cost.",
      whyHere:
        "A private coding assistant with no metered API bill is one of the most common reasons people install Ollama at all. Worth trying once your hardware can handle a mid-size model.",
    },
  ],

  pitfalls: [
    "Biting off too big a model — the #1 mistake. A model your RAM can't handle makes you wrongly conclude 'local AI is bad.' Start small.",
    "Expecting ChatGPT quality — it's impressive for what it is; calibrate your expectations to the model's size.",
    "Models quietly eating disk — they're gigabytes each. Check what you've got with ollama list and remove ones you don't need with ollama rm.",
    "Accidentally opening it to the network — it defaults to your machine only, which is safe. If a tutorial tells you to expose it to '0.0.0.0' or your network, understand you may be letting other people reach your model — don't, unless you know exactly why.",
  ],

  whereToNext: [
    { label: "Local & Open-Source AI", categorySlug: "local-open-source-ai" },
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
  ],
};
