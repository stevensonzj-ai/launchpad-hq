import type { PlatformTutorialData } from "./types";

export const synthesiaTutorial: PlatformTutorialData = {
  slug: "synthesia-getting-started",
  platformSlug: "synthesia",
  title: "Getting Started with Synthesia",
  tagline:
    "Type a script, pick a presenter, get a finished video — no camera, no crew, no being on screen yourself.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-07",
  changelogUrl: "https://www.synthesia.io/updates",
  accessTier: "FREE",

  howItWorks:
    "You write what you want said, choose an **avatar** (a synthetic presenter — a person-shaped video generated from text, not filmed), and Synthesia renders it speaking your words, lips matched to the audio.",

  whatItIs: [
    "A text-to-video tool built on synthetic presenters: you bring the script, it brings the face, the voice and the visuals. Beginners pick it over filming for unglamorous reasons — no need to be presentable, no editing to learn, and you re-render rather than re-shoot when a policy changes.",
    "It aims squarely at workplace video: onboarding, compliance training, internal explainers, product walkthroughs. Its other strength is localisation — one script, many languages.",
    "Versus HeyGen, also listed here: heavy overlap, both good. Synthesia leans corporate — templates, brand controls, team workspaces, translation for rolling one video across a company. HeyGen leans creator and social.",
  ],

  beforeYouStart: [
    "There is a genuinely free plan, not a time-limited trial: the Basic tier is currently $0, takes no card, and doesn't expire.",
    "Free is small but real: currently around 10 minutes of video a month, a limited set of stock presenters, and a Synthesia **watermark** (a mark identifying output as AI-made) on what you export.",
    "**The mechanism to learn is a monthly allowance that resets and doesn't roll over.** Length is what spends it, and anything unused at period end is gone. If you want the watermark gone or more than a few minutes monthly, paid self-serve currently starts around $18–$30 a month, with the next tier near $90 depending on billing period. Prices move.",
    "First step: sign up free, open a template rather than a blank project, and paste 60 seconds of your own words over the sample script.",
  ],

  security: [
    {
      kind: "text",
      text: "Want an avatar of a specific real person, including yourself? Consent here isn't a checkbox, it's a recorded step: Synthesia requires that person to submit their own footage plus a separate consent video recorded live, reading an on-screen passcode aloud, and checks both show the same person. You cannot upload someone else's video and make an avatar of them. The friction is deliberate.",
    },
    {
      kind: "list",
      label: "What Synthesia refuses, and what you should disclose",
      items: [
        "Impersonating a real person or organisation in a way likely to mislead. Stock avatars are licensed actors — implying one endorses your product, or works at your company, is prohibited.",
        "News, political, election and other polarising content using stock avatars, without written permission.",
        "Stripping the watermark to pass a synthetic video off as filmed is a violation, not a workaround.",
        "Adult content, harassment, hate speech, fraud, and medical or legal advice presented as authoritative — videos are moderated and do get rejected.",
        "Tell your viewers. No law may force you to, but one line saying the presenter is AI prevents the far worse moment where they work it out themselves.",
      ],
    },
    {
      kind: "text",
      text: "Your scripts and uploads sit on Synthesia's servers so it can re-render them, under standard account terms rather than a negotiated contract. Keep unreleased financials, customer names and anything under a confidentiality agreement out of the script box.",
    },
  ],

  triad: {
    bestAt: [
      "Training and compliance video that gets rewritten whenever a policy changes",
      "Turning a document or written procedure into a watchable explainer",
      "Producing one script as video in many languages",
      "Short product walkthroughs and how-tos at volume",
    ],
    okayAt: [
      "Marketing and social video — fine, but reads generic unless the script is good",
      "Talking-head segments inside a larger edited video",
    ],
    avoid: [
      "Anything needing trust that a specific human is speaking — an apology, a crisis message, a condolence, a hard announcement to staff. A synthetic presenter reads as evasion.",
      "Personal-brand work that depends on you being present: podcasts, vlogs, founder stories",
      "Emotional performance and comedy timing. Avatars deliver information well and feeling badly.",
      "Video of anyone who hasn't consented on camera. Hard line, not a preference.",
    ],
  },

  starterActions: [
    {
      title: "Turn one policy into a 60-second explainer",
      prompt:
        "Here is how expense claims work from this month. Submit within thirty days, and attach a photo of the receipt — a bank statement is not enough. Anything over two hundred pounds needs manager approval.",
      whyHere:
        "Synthesia's editor is built around the script box rather than a timeline, so paste-and-generate is the whole workflow — and a template means framing, background and captions are handled.",
    },
    {
      title: "Rebuild the same video in a second language",
      prompt:
        "Welcome to the team. Over the next two weeks you will meet your manager, set up your accounts, and complete three short training modules.",
      whyHere:
        "Its 1-Click Translation currently spans 160+ languages and translates on-screen text as well as the spoken script, so an existing video becomes a second one in seconds, not a second shoot.",
    },
    {
      title: "Write a script that survives being spoken aloud",
      prompt:
        "Three things change on Monday. The old login page stops working, so use the new one linked below. Passwords now expire every ninety days instead of thirty. And update the mobile app, or it signs you out.",
      whyHere:
        "There is no fixing a weak script in the edit here — no performance to salvage, no second take, no cutaway. The text is the ceiling on the video.",
    },
  ],

  pitfalls: [
    "**Writing for the page, not the mouth.** Long clauses and nested parentheses read fine and sound terrible. Read yours aloud first: whatever you stumble over, the avatar will too.",
    "**Burning the allowance on drafts.** It resets without rolling over, and every render spends from it, including ones you delete. Finish the script first.",
  ],

  whereToNext: [
    { label: "More AI video tools", categorySlug: "video-creation-editing" },
    { label: "AI voice and speech tools", categorySlug: "voice-speech" },
  ],
};
