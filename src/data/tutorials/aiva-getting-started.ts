import type { PlatformTutorialData } from "./types";

export const aivaTutorial: PlatformTutorialData = {
  slug: "aiva-getting-started",
  platformSlug: "aiva",
  title: "Getting Started with AIVA",
  tagline:
    "An AI composer you steer with styles and settings rather than by describing a song.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-15",
  accessTier: "FREE",

  howItWorks:
    "You pick a musical style from a list, set a few things like key, tempo and how long the track should be, then press create. AIVA hands back finished instrumental tracks you can play straight away. You keep the ones you like, adjust them in a built-in editor, and download the file.",

  whatItIs: [
    "AIVA is an AI composer for instrumental background music — soundtrack-style pieces for videos, games and podcasts, rather than songs with singing.",
    "It works differently from the AI music tools that have had the most attention. Instead of describing a song in a sentence, you choose from a library of more than 250 preset styles and adjust musical settings. The one text box it does have takes a **prompt** (the message you type) that shapes the chord progression — the sequence of chords underneath a piece.",
    "What comes back is editable. Tracks open in a built-in editor where you can mute parts, swap instruments and change individual notes, and they download as **MIDI** (the note-by-note score rather than a recording, which you can open in music software and rebuild). Among AI music tools that is unusual, and it is the main reason someone who reads music would pick AIVA.",
    "AIVA has announced a newer engine called Lyra that does take a plain-language description of a whole piece. At the time of writing it is still being offered as a private beta you register for, so treat it as a direction of travel rather than something you can use on signing up.",
  ],

  beforeYouStart: [
    "Free to use after signing up at aiva.ai, and the free plan is listed at €0 with no trial clock attached. What it limits is **downloads** — currently three a month, tracks up to three minutes, MP3 or MIDI files only. No plan currently allows a track longer than five and a half minutes. Whether every creation mode is open on the free plan is not spelled out in AIVA's plan comparison, so you may need to check that once you are signed in.",
    "**Who owns what you make depends on which plan you are on, and that is the first thing to settle.** On the free plan AIVA holds the copyright, use is non-commercial only, and you must credit AIVA with a link to aiva.ai. Standard (currently around €11 a month billed annually, plus VAT; paying month to month costs more) drops the credit requirement and allows monetised use on YouTube, Twitch, TikTok and Instagram only — but the copyright still sits with AIVA. Only Pro (currently around €33 a month billed annually) transfers the copyright to you and lifts the platform restriction. Read that split as the current position rather than a settled one: AIVA's licence agreement carries no effective date of its own and never says which plan maps to which licence, and the helpdesk article explaining the split is dated 2021 — so the live comparison table on AIVA's pricing page is the most current statement of what each plan allows, and it is the one to check before you rely on any of this.",
    "Whether you need to pay is decided by what the music is for, not by how much you earn from it. A school project or a video for friends sits inside the free plan. Anything that promotes a business, or anything you want to hold the rights to, does not.",
  ],

  security: [
    {
      kind: "text",
      text: "AIVA's privacy policy is dated **March 11, 2019** and reads like a standard online-shop policy: cookies, analytics, Stripe for payments. It says nothing about the music you generate, and nothing about the audio or MIDI files you upload as an **influence** (a reference file you give AIVA so it can build something with similar characteristics). That silence, rather than anything the policy says, is what to plan around.",
    },
    {
      kind: "list",
      label: "Think twice before uploading an influence",
      items: [
        "If the reference file is someone else's copyrighted music, uploading it raises a rights question that none of AIVA's plans answers for you.",
        "AIVA's licence bars you from using its compositions as training data for machine learning, and from using them to build a competing service. It makes no matching promise in the other direction about what happens to what you upload.",
        "An unfinished melody of your own is the one thing worth keeping off the platform until the policy says what becomes of it.",
      ],
    },
    {
      kind: "text",
      text: "For ordinary use this is low-stakes: there is no personal information in a chord progression. The gap here is about your material, not about you.",
    },
  ],

  triad: {
    bestAt: [
      "Instrumental background music — the job it was built for",
      "Classical, cinematic and orchestral pieces, where the style library goes deepest",
      "Producing several versions of one idea in a single pass and picking the best",
    ],
    okayAt: [
      "Modern pop, electronic and hip-hop — present in the style library, but not where the tool's reputation sits",
      "Landing the exact arrangement you pictured on the first attempt — expect several passes",
      "Starting from a vague idea with no musical vocabulary — the controls assume you know roughly what a key signature and a tempo are",
    ],
    avoid: [
      "Building a stock-music library on it. AIVA's licence excludes \"large scale licensing of MIDI or Audio compositions\", which stays true on the top plan.",
      "Assuming a company qualifies for Pro's ownership terms. The licence carves out an \"Enterprise\" — a business with three or more employees **and** more than $300k of revenue in the past year — and tells them to contact AIVA rather than subscribe.",
    ],
  },

  starterActions: [
    {
      title: "Make a track from a style",
      whatItDoes:
        "Choose **Create track** then **From a Style**, pick a style from the library, and set the duration and the number of compositions you want. Press create and let it produce a batch rather than a single track.",
      whyHere:
        "A style on AIVA already carries the instruments and the arrangement before you touch a single setting, so learning to shop the style list is the actual skill here — Suno has no style library to shop, only a sentence to write.",
    },
    {
      title: "Steer the chords with a sentence",
      prompt:
        "A cinematic progression in D minor that builds tension slowly, using 7th chords and resolving on a IV chord.",
      whyHere:
        "This box lives inside **Create track** then **From a Chord Progression**, where AIVA calls it Text-to-Harmony. AIVA's own guidance is blunt about its reach: the prompt \"only affects the harmony that will be used to generate your composition. It does not alter other musical elements, like the instruments or the arrangement.\" Mistaking this box for a song description is the most common misunderstanding of the tool, and AIVA also recommends writing in English for best results.",
      tweak:
        "The same field takes a named piece as a reference — try `A progression in the style of Beethoven's Moonlight Sonata`.",
    },
    {
      title: "Upload something you like as an influence",
      whatItDoes:
        "Open **Styles** then **+ Create** to reach the Style Designer, upload an audio or MIDI file as an influence, and let it fill in that style's parameters. Then generate from the style it builds rather than from a preset.",
      whyHere:
        "AIVA's manual describes an uploaded influence as auto-populating the style's parameters, so what carries over is a set of settings you can see and change afterwards — not the recording. Suno's cover feature works on the audio itself, which is why its results are finished and AIVA's are still adjustable.",
      tweak:
        "Upload a MIDI file rather than audio if you have one; MIDI carries the notes themselves rather than a recording of them.",
    },
    {
      title: "Change one instrument in the editor",
      whatItDoes:
        "Open a generated track in AIVA's editor, find the instrument layers, and mute or swap one, then play it back. The manual lists per-note editing, tempo changes and effects such as reverb on the same screen.",
      whyHere:
        "AIVA keeps the layers and the individual notes separate all the way through to the editor, so a change you make edits the score rather than re-rolling the whole track.",
      tweak:
        "Mute every layer but one and listen to it alone; it is the quickest way to hear what a style is actually made of.",
    },
    {
      title: "Rewrite a prompt that missed",
      prompt:
        "A simple, diatonic progression in dorian mode, slow and unhurried, with no key change.",
      whyHere:
        "AIVA publishes preferences for this field that are unusual to find written down at all: name chords in Roman numerals rather than letters, avoid combining contradictory musical ideas in one prompt, and rephrase rather than retry when something misses. Udio publishes no conventions of this kind, so this is a platform you can learn to write for.",
    },
  ],

  pitfalls: [
    "**The licence is decided when you download, not when you create.** AIVA's terms say the licence granted \"will depend on the plan that User is currently subscribed to\" at the point of download — so a track generated today and downloaded next month goes out under next month's plan.",
    "**Upgrading works backwards here, unlike most AI music tools.** AIVA's helpdesk says a Pro subscriber owns the copyright of compositions created before the subscription started as well as during it, and keeps that ownership after cancelling. Worth knowing before you re-make something you already have.",
    "**A MIDI file is notes, not sound.** Open one in other music software and it plays on whatever instruments that software assigns. The orchestral sound you heard on AIVA's site is AIVA's own playback, and it does not travel with the file.",
    "**You cannot get the same track back.** AIVA says the chance of it generating the same composition twice is \"practically impossible\", so a version you liked and clicked away from is gone rather than regenerable.",
  ],

  whereToNext: [
    { label: "Music generators", categorySlug: "music-generation" },
    { label: "Video creation and editing", categorySlug: "video-creation-editing" },
  ],
};
