import type { PlatformTutorialData } from "./types";

export const elevenlabsTutorial: PlatformTutorialData = {
  slug: "elevenlabs-getting-started",
  platformSlug: "elevenlabs",
  title: "Getting Started with ElevenLabs",
  tagline:
    "Turn text into remarkably natural speech — and, with permission, clone a specific voice — across dozens of languages.",
  archetype: "prompts",
  lastReviewedAt: "2026-07-13",
  changelogUrl: "https://elevenlabs.io/changelog",
  accessTier: "FREE",

  howItWorks:
    "You paste text, choose a voice — a stock voice, a community one, or one you've cloned — and it generates the audio. Usage is metered in **credits** that roughly track characters of text, with a monthly allowance per plan. Voice cloning comes in two flavors: a quick \"instant\" clone from a short sample, and a higher-quality \"professional\" clone that needs much more audio and a verification step. The quality is high enough that the responsible-use questions below aren't optional reading.",

  whatItIs: [
    "ElevenLabs is an **AI voice platform**. Its core is text-to-speech that sounds convincingly human; it also does voice **cloning** (making a synthetic version of a specific voice from a sample), dubbing, and sound effects. It's used for audiobooks, video narration, podcasts, and voice agents. You mostly drive it by typing the text you want spoken and picking a voice.",
  ],

  beforeYouStart: [
    "The **free tier** gives about 10,000 credits a month (roughly 20 minutes of audio) and lets you try text-to-speech and cloning — but its output is **non-commercial and must credit ElevenLabs**. Commercial use starts on the paid plans (from around **$5–6/month**); the tier commonly recommended for audiobook-style work is higher (~$22/month).",
    "**If you're going to clone a voice, sort out consent first** — this is the single most important thing about the platform (below).",
    "Credits are metered by characters of text and reset monthly; unused credits generally don't carry over.",
  ],

  security: [
    {
      kind: "list",
      label: "Voice cloning: consent is the rule, not a formality",
      items: [
        "You may only clone a voice you **own** (your own) or one you have **explicit, documented permission** to use. Instant cloning asks you to confirm you have that right; professional cloning adds a **verification step** before it will train.",
        "Cloning a **public figure or any third party without consent** is both against ElevenLabs' terms (accounts get suspended) and, increasingly, **against the law**: a dozen-plus US states have voice-likeness laws (Tennessee's ELVIS Act among them), and the EU requires AI-generated media to be labeled.",
        "For anything client-facing, commercial, or persuasive, **keep written consent on file.** Treat a cloned voice like licensed talent, not a free asset.",
      ],
    },
    {
      kind: "text",
      text: "When you upload a voice sample or generate audio, ElevenLabs keeps a broad, long-running license to **use your voice data and content to improve its models.** It commits not to commercialize your voice on its own without permission, but the training use is part of the deal — factor that in before uploading a sensitive or valuable voice.",
    },
    {
      kind: "text",
      text: "On the **free tier**, output is **non-commercial and must attribute ElevenLabs**; commercial rights begin on the paid plans (and persist for audio you already generated, even if you later cancel). Don't build a paid project on free-tier audio.",
    },
  ],

  triad: {
    bestAt: [
      "Natural-sounding narration for videos, audiobooks, and e-learning",
      "Cloning your own voice to scale narration you'd otherwise record by hand",
      "Multilingual speech and dubbing across dozens of languages",
    ],
    okayAt: [
      "Highly emotional or performance-heavy delivery (very good, occasionally uncanny)",
      "Real-time/low-latency voice agents (a specific model/plan territory)",
      "Fine control over pacing and emphasis (improving)",
    ],
    avoid: [
      "Cloning anyone's voice without documented consent",
      "Impersonation, fraud, or anything deceptive (prohibited and often illegal)",
      "Commercial use of free-tier output, which requires attribution and isn't licensed for it",
    ],
  },

  starterActions: [
    {
      title: "Hear a stock voice read your words",
      prompt:
        "Welcome to the show. Today we are talking about something small that changed everything: the humble paperclip.",
      whyHere:
        "The fastest way to judge the quality — pick a built-in voice, paste text, generate, and listen. No cloning, no consent questions.",
      tweak: "Try the same line in two different voices to hear how much the voice choice matters.",
    },
    {
      title: "Clone your OWN voice",
      prompt:
        "[Record or upload a clean sample of your own voice reading a paragraph, then generate this line in your cloned voice:] Thanks for listening - I recorded this without touching a microphone twice.",
      whyHere:
        "Cloning your own voice is the standout feature and the one clone you can make with zero consent worries.",
      tweak: "Use a quiet room and a minute or two of clear audio for a noticeably better clone.",
    },
    {
      title: "Try a short dub",
      prompt:
        "Translate and speak this in Spanish, keeping a warm, friendly tone: \"Hi everyone, thanks so much for being here today.\"",
      whyHere:
        "Shows the multilingual side that makes ElevenLabs useful beyond English narration.",
      tweak: "Swap in a language your audience actually uses.",
    },
  ],

  pitfalls: [
    "**Consent isn't a checkbox to click past.** Cloning someone else's voice without documented permission is a terms violation and, in many places, illegal.",
    "**Free output is watermarked-by-attribution and non-commercial.** You can't quietly ship it in a paid project.",
    "**Credits are character-metered.** Long scripts eat the monthly allowance faster than the \"minutes\" framing suggests.",
  ],

  whereToNext: [
    { label: "Voice & Speech", categorySlug: "voice-speech" },
    { label: "Video Creation & Editing", categorySlug: "video-creation-editing" },
  ],
};
