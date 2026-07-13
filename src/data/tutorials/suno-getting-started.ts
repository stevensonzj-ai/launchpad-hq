import type { PlatformTutorialData } from "./types";

export const sunoTutorial: PlatformTutorialData = {
  slug: "suno-getting-started",
  platformSlug: "suno",
  title: "Getting Started with Suno",
  tagline:
    "Describe a song in words and Suno generates a full track — vocals, lyrics, and instruments — in about a minute.",
  archetype: "prompts",
  lastReviewedAt: "2026-07-13",
  changelogUrl: "https://suno.com/blog",
  accessTier: "FREE",

  howItWorks:
    "You prompt it the way you'd prompt any chatbot, but the output is audio. Under the hood Suno runs on a **credit** system: each generation spends a few credits, and your plan sets how many you get. The prompt is where the craft is — the more specific you are about genre, instruments, vocal style, and structure, the closer the result. You can also paste your own lyrics instead of letting it write them.",

  whatItIs: [
    "Suno is an **AI music generator**. You type a description (a style, a mood, a topic — and optionally your own lyrics) and it produces a complete song with vocals and instrumentation. It's aimed at anyone who wants original music without playing an instrument: content creators needing a soundtrack, hobbyists, people making a birthday song. No musical training required.",
  ],

  beforeYouStart: [
    "The **free plan** gives you a bucket of credits that **refills daily** (enough for a handful of songs a day); credits don't roll over. Paid plans (**Pro around $10/month**, Premier higher) add far more credits, faster generation, and — crucially — commercial rights.",
    "**The rights situation is the thing to understand before you make anything you care about** (below). In short: free-tier songs are for personal use only, and that can't be undone later by upgrading.",
    "Expect to generate several versions before one lands — that's normal, and it's what the credits are for.",
  ],

  security: [
    {
      kind: "list",
      label: "Free vs paid changes what you can do with the song",
      items: [
        "Songs you make on the **free plan are for personal, non-commercial use only** — you can't sell them, put them on Spotify, or use them in monetized videos.",
        "**Upgrading later does not retroactively unlock** the songs you already made on the free plan. If you might want to use a track commercially, make it on a paid plan from the start.",
        "Paid plans grant **commercial-use rights** for songs made while your subscription is active — and those rights persist for already-generated tracks even if you later cancel.",
      ],
    },
    {
      kind: "text",
      text: "Even on a paid plan, read the fine print on ownership: Suno's current terms grant you a **license to use and monetize** the song but stop short of calling you the owner, and note that copyright may not vest in AI-generated audio at all. For casual use this doesn't matter; for anything you're building a business on, it does — and this is a legal question, not one an AI tool can answer for you.",
    },
    {
      kind: "text",
      text: "Anything you submit — your prompts, and especially any **audio or lyrics you upload** — may be used to help train and improve Suno's models. Don't feed it confidential lyrics, an unreleased melody, or a client's material you don't have the rights to.",
    },
  ],

  triad: {
    bestAt: [
      "Generating a full, original song with vocals from a text description",
      "Background music and jingles for videos, podcasts, and social posts",
      "Fast iteration — trying ten directions in the time it'd take to write one",
    ],
    okayAt: [
      "Matching a very specific reference track (it gets the vibe, rarely the exact thing)",
      "Precise lyrical or structural control (better than it was, still imperfect)",
      "Long-form or multi-section compositions",
    ],
    avoid: [
      "Commercial releases made on the free tier (personal use only)",
      "Cloning a real artist's voice or copying a specific copyrighted song",
      "Uploading confidential or client-owned material as input",
    ],
  },

  starterActions: [
    {
      title: "A simple first song",
      prompt:
        "An upbeat acoustic folk song about a road trip with friends, warm male vocals, claps and a catchy chorus, feel-good and bright.",
      whyHere:
        "Genre + mood + instruments + vocal + energy is the recipe for a usable result on the first try.",
      tweak: "Swap the genre and vocal to hear how much they change the whole song.",
    },
    {
      title: "Bring your own lyrics",
      prompt:
        "Lo-fi chill beat, soft female vocals, mellow and late-night. Use these lyrics: [paste two or three lines of your own here]",
      whyHere:
        "Shows the biggest lever most people miss — you can write the words and let Suno handle the music.",
      tweak: "Keep the lyrics short at first; a couple of lines is enough to hear the treatment.",
    },
    {
      title: "Nail a specific use",
      prompt:
        "A 30-second cheerful ukulele instrumental for a cooking video intro, no vocals, light and bouncy, loops cleanly.",
      whyHere:
        "Most real uses are short and functional; specifying length, \"no vocals,\" and the purpose gets you something you can actually drop into a project.",
      tweak: "Change the instrument and tempo to match the mood of your content.",
    },
  ],

  pitfalls: [
    "**Free credits reset daily and don't stockpile.** You can't save up a week of credits for one big session.",
    "**The free/paid commercial line is permanent per song.** A track made free stays non-commercial forever, even after you upgrade.",
    "**\"Commercial rights\" is not the same as \"copyright ownership.\"** Fine for casual use; get real advice before building a business on AI-generated tracks.",
  ],

  whereToNext: [
    { label: "Music Generation", categorySlug: "music-generation" },
    { label: "Video Creation & Editing", categorySlug: "video-creation-editing" },
  ],
};
