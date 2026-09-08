import type { PlatformTutorialData } from "./types";

export const janTutorial: PlatformTutorialData = {
  slug: "jan-getting-started",
  platformSlug: "jan",
  title: "Getting Started with Jan",
  tagline:
    "A free AI chat app that runs on your own computer. Your conversations never leave it.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-07",
  changelogUrl: "https://www.jan.ai/changelog",
  accessTier: "FREE",

  howItWorks:
    "You install Jan like any other desktop app, download a **model** from inside it — the AI \"brain\" that does the thinking — then chat in a window like any other assistant. Answers come from your own machine, so nothing you type is sent anywhere.",

  whatItIs: [
    "A desktop app for Mac, Windows and Linux that runs AI models on your own computer. Its code is public under the Apache 2.0 licence, so anyone can inspect it and it is genuinely free, including for work.",
    "Ollama is built mainly as an engine other tools plug into, handing you plumbing rather than a place to chat; LM Studio is polished but closed. All three run the same engine and model files, so you are choosing an interface and a licence, not a smarter AI.",
  ],

  beforeYouStart: [
    "**Your hardware is the limit, not your ambition.** With a hosted service you rent someone else's giant computer; here the ceiling is the machine on your desk.",
    "**RAM** — your computer's short-term memory, what runs out when too much is open — is the binding constraint. Jan's documentation puts roughly 8GB behind small models, around 16GB behind mid-sized ones and about 32GB behind the largest, plus 10GB of free disk. Check yours in About This Mac, or Windows Settings → System → About.",
    "No account, no subscription, no internet needed once a model is downloaded. What you give up is capability: a laptop model is slower and gets more wrong than a hosted assistant.",
  ],

  gettingSetUpSafely: {
    officialSource: "Jan's official download page",
    vendorDocsUrl: "https://www.jan.ai/docs/desktop/quickstart",
    body: [
      "**Download only from jan.ai or Jan's official GitHub releases.** You are installing an application that can touch anything on your machine, and \"free AI chat download\" results are where tampered installers live.",
      "**Measure the machine against those figures first**; processors older than about 2013 will not run it. Model files land in Jan's data folder — Mac `~/Library/Application Support/Jan/data`, Windows `%APPDATA%/Jan/data`, Linux `~/.local/share/Jan/data` — movable in Settings and worth watching; models you tried once accumulate silently.",
      "**Prove it before you trust it:** ask the starter model something simple, then switch off wi-fi and ask again. An answer with the internet off proves it runs on your machine.",
    ],
  },

  security: [
    {
      kind: "text",
      text: "The usual warning runs backwards. **Jan is the private option:** your conversations are not sent to a company, not stored on a server, not used to train anything. You lose that in three ways, none of them ordinary use.",
    },
    {
      kind: "list",
      label: "The three ways to give that privacy away",
      items: [
        "Installing from an unofficial mirror or a \"cracked\" build; a tampered installer defeats everything else here.",
        "**Pointing Jan at a hosted model from another company.** The interface looks identical, but those chats go to that company under their policies. Check the model selector before pasting anything sensitive.",
        "**Opening Jan's local server to your network** — from \"only this computer\" to \"anything on my wi-fi.\" Jan's docs flag it use-with-caution.",
      ],
    },
    {
      kind: "text",
      text: "Your chats sit on disk as ordinary readable files, with no encryption Jan's documentation mentions. **Device security is now the whole of your data security** — anyone who opens your unlocked laptop reads every one. Use a login password and disk encryption.",
    },
  ],

  triad: {
    bestAt: [
      "Private drafting you'd never paste into a cloud service",
      "Working with no internet at all",
      "Machines with roughly 16GB of RAM or more, where it feels genuinely pleasant",
    ],
    okayAt: [
      "Everyday questions and rewriting on about 8GB — slower and noticeably less sharp",
      "Light coding help with a code-focused model",
    ],
    avoid: [
      "Machines under roughly 8GB of RAM, or processors older than about 2013 — it won't run well, or at all",
      "Anyone who just wants the smartest answer — a hosted frontier model is better",
    ],
  },

  starterActions: [
    {
      title: "Start with whatever Jan downloads for you",
      prompt: "Explain what you are and what you can help me with, in plain language.",
      whyHere:
        "Jan fetches a default model on first launch, so you get a reply before choosing anything. Feel the speed on *your* machine before browsing the library.",
      tweak: "Ask it again with wi-fi off, to see the offline promise for yourself.",
    },
    {
      title: "Read the Fits / May be slow / Won't fit labels first",
      whyHere:
        "Jan's Hub checks each model against your actual hardware and labels it, removing the guesswork that makes people give up. Treat \"May be slow\" as \"no\" for your first week; \"Won't fit\" everywhere is your hardware answering honestly.",
      tweak:
        "Take the recommended file size too. Models come in versions squeezed to fit less memory at some cost to quality; if one feels sluggish, drop to the smaller version of the same model.",
    },
    {
      title: "Do a private task you wouldn't paste into the cloud",
      prompt:
        "Here are my rough notes from a difficult conversation at work. Organise them into what happened, how I feel about it, and what I want to do next.",
      whyHere:
        "Jan documents its own roughly 4-billion-**parameter** model — parameters being a rough measure of size, more being smarter but heavier — as running in about 8GB, in reach on an ordinary laptop. Privacy only pays off on real material.",
    },
  ],

  pitfalls: [
    "**Downloading a model too big for your machine.** Bigger looks better, then Jan crawls or refuses to load it. Believe the \"Fits\" label over your ambition.",
    "**Judging it from the first sixty seconds.** The first reply is slow while the model loads, and your first pick may be the wrong size. Give it one deliberate second attempt.",
  ],

  whereToNext: [
    { label: "More local AI tools", categorySlug: "local-open-source-ai" },
    { label: "Cloud assistants to compare against", categorySlug: "text-conversational-ai" },
  ],
};
