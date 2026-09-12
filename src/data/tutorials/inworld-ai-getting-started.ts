import type { PlatformTutorialData } from "./types";

export const inworldAiTutorial: PlatformTutorialData = {
  slug: "inworld-ai-getting-started",
  platformSlug: "inworld-ai",
  title: "Getting Started with Inworld AI",
  tagline:
    "Type a line, hear it spoken — and invent the voice that speaks it by describing it in a sentence.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-12",
  changelogUrl: "https://inworld.ai/blog",
  accessTier: "FREE",

  howItWorks:
    "You open Inworld's voice playground in a web browser, type or paste the words you want spoken, then either pick a ready-made voice or describe the voice you want in a sentence. Press play and the audio comes back in seconds. You reword the line, adjust the description, and generate again until it sounds right.",

  whatItIs: [
    "Inworld AI turns typed words into spoken audio, and it is good at the part most tools are weakest at: sounding like someone talking rather than someone reading aloud. You write a line, pick or invent a voice, and get back speech for a video, a game or a podcast intro.",
    "If you have read about Inworld before, you probably read about something else. For years it sold a point-and-click studio for building talking game characters, and most of the articles and video tutorials still online describe that. The company now presents itself on its own homepage as \"a research lab and inference provider for realtime AI at consumer scale\" — voices, transcription and model routing, sold to developers. The old `studio.inworld.ai` address redirects to the new developer portal, and the old character guides redirect to a login screen. We found no vendor announcement retiring the character product, so what we can actually show you is the redirect rather than a shutdown notice — but treat anything you find about building Inworld characters as out of date.",
    "What is left that a non-programmer can actually use is the voice playground. Everything else on the platform is an **API** (a way for programs to talk to each other without a person clicking), and needs someone who writes code.",
  ],

  beforeYouStart: [
    "The barrier here is not skill, it is orientation: you are signing into a developer portal, and most of what you see is built for programmers. Go to inworld.ai, sign up free, and head straight for the TTS Playground — \"TTS\" is text-to-speech, the part that turns typed words into spoken audio. That one page is effectively the whole no-code product. Inworld says you can try it instantly, but we could not see whether a sign-in wall stands in front of it, so expect to make the account first.",
    "The free plan is called On-Demand and costs nothing to start. Inworld's plan-comparison table currently lists it as including up to about 70 minutes of speech, a cap of 5 requests running at once, and community-only support. The 70 minutes reads as a one-off welcome allowance rather than a monthly refill — the table says nothing about it renewing, so plan on it not coming back.",
    "Past that allowance you move onto **credits** (the platform's unit of spend — each thing you make costs some), a dollar balance you top up by card. Subscriptions currently start around $25 a month and mostly buy a discount on the per-use rate rather than a different product, so paying is a volume decision rather than a features one.",
    "Inworld's terms of service, in force since 11 June 2025, require you to be at least 18.",
    "If you intend to copy a real person's voice, sort the permission out first — the portal asks you to confirm you hold the rights before it will proceed.",
  ],

  security: [
    {
      kind: "text",
      text: "Inworld's terms say it will not train its generally available models on material that is not publicly available, which is better than the default at several free AI services. What it does do is keep your content: its documentation states that a setting called Zero Data Retention \"stops us retaining content from that point forward\" — and that the setting is available only on Enterprise plans, with the controls visible but disabled on everything below.",
    },
    {
      kind: "list",
      label: "Because what you are handling here is a person's voice, two things follow:",
      items: [
        "Only copy a voice you have permission to copy. Inworld's acceptable use policy, last updated 11 June 2025, prohibits creating or expanding \"facial, voice, or other biometric recognition databases without consent\" and prohibits \"impersonating another individual or organization without consent or legal right.\" The portal's confirmation box is you making a promise, not the system checking one.",
        "Whatever you paste in to be spoken is content sitting on their servers under the retention point above. A script with a real customer's name or an unreleased announcement in it is a bad first test.",
      ],
    },
    {
      kind: "text",
      text: "The good news on rights runs the other way. Inworld's terms assign you \"all of our right, title, and interest in Outputs,\" and the free plan's own column on the pricing table lists a commercial licence — audio you generate on the free tier is yours, including for paid work, which is not true of every free AI voice tool. Those terms also incorporate service-specific terms that we did not read.",
    },
  ],

  triad: {
    bestAt: [
      "Speech that sounds performed rather than read out",
      "Short spoken pieces — a video voiceover, a line of game dialogue, a podcast intro",
      "Ending up with a voice that is yours rather than one picked off a shared list",
      "Working outside English",
    ],
    okayAt: [
      "Long-form narration — the free allowance is a trial, not a workspace, so an audiobook is a paid project from day one",
      "Explaining itself to a newcomer — the homepage, the documentation and the pricing table are all written for engineers",
    ],
    avoid: [
      "Building AI game characters — the product most Inworld write-ups still describe, and no longer a path a non-programmer can take here",
      "Any use where the listener must not realise they are hearing a machine. Inworld's acceptable use policy requires you to \"clearly and prominently disclose to users they are interacting with AI rather than a human\" unless it is obvious from the context.",
    ],
  },

  starterActions: [
    {
      title: "Type the performance into the line itself",
      prompt:
        "[sigh] Fine. We'll do it your way. [laugh] But when this goes wrong, I want it on the record that I said so.",
      whyHere:
        "Inworld's TTS page lists six bracketed cues — [laugh], [breathe], [clear throat], [sigh], [cough], [yawn] — as \"first-class\" in its 2.0 voice, so you write them into the words rather than hunting for a settings panel. That vocabulary is Inworld's own, published on its own product page, and a fixed documented list is easier to learn than open-ended stage directions.",
      tweak:
        "Move the cue somewhere else in the line and generate again — the cues attach to the position you put them in.",
    },
    {
      title: "Describe a voice instead of picking one",
      prompt:
        "A woman in her late twenties, warm and slightly breathy, with a light Irish accent, speaking quickly like she is telling a friend something she has just found out.",
      whyHere:
        "Inworld's documentation describes a Voice Design flow — TTS Playground, then Create Voice, then Design — where you type a description like this alongside a short script and get back up to three voices to compare. Its own worked example is \"A middle-aged male voice with a clear British accent speaking at a steady pace and with a neutral tone,\" which tells you the register it expects: physical attributes and delivery, not mood words.",
      tweak:
        "The documentation describes a Structured mode next to the freeform box, where you edit the voice's attributes directly — worth trying if your descriptions keep missing. We could not confirm what either screen looks like without an account.",
    },
    {
      title: "Copy a voice from a short recording",
      whatItDoes:
        "Upload a clean recording of someone speaking and Inworld builds a copy of that voice you can then type for. Its documentation puts this \"instant\" version at as little as 3 seconds of audio and no more than 30, and says a longer sample within that window gets closer to the original; the TTS product page quotes 5 to 15 seconds instead, so treat the safe answer as \"a short, clean clip near the top of that range.\"",
      whyHere:
        "The free On-Demand column on Inworld's own comparison table includes voice cloning, voice design and a ceiling of 100 custom voices. What is held back is \"professional\" cloning, trained on 30-plus minutes of audio and marked as an add-on further up the plans — test that against ElevenLabs and the free-tier line falls elsewhere.",
      tweak:
        "Record somewhere quiet — the sample is only seconds long, so background noise is a large share of what the system has to go on.",
    },
    {
      title: "Say the same line in another language",
      prompt:
        "Thanks so much for coming — we'll start in about five minutes, so grab a coffee while you can.",
      whyHere:
        "Inworld's TTS page states that \"Realtime TTS supports 200+ languages,\" and a vendor piece published 28 May 2026 makes the stronger claim that \"one cloned voice can be localized across more than 200 languages.\" That same page attaches its own caution: this is \"not a quality guarantee,\" and \"every launch language needs native-speaker review using the product's actual scripts.\"",
      tweak:
        "Paste the English line, then a translation of it, and listen to both. Judge the second on whether a native speaker would wince.",
    },
    {
      title: "Know where the no-code part stops",
      whatItDoes:
        "Beyond the voice playground, Inworld sells three things a programmer wires into software: a routing layer reaching 220-plus text AIs from providers including OpenAI, Anthropic, Google, Groq, Mistral and xAI through a single connection; a realtime service that holds a spoken back-and-forth conversation; and game-engine kits for Unreal and Unity, the Unity one announced as early access in October 2025.",
      whyHere:
        "This is the line that decides whether Inworld is a tool for you or a supplier to whoever builds you something. Convai, the name people reach for when comparing, still sells a character-building product aimed at people who do not code; Inworld's equivalent moved to the far side of it.",
    },
  ],

  pitfalls: [
    "Landing on inworld.ai and bouncing straight off. The homepage sells infrastructure and its two main buttons are \"Get started\" and \"Contact Sales\"; what you want is the TTS Playground inside the portal.",
    "Assuming the free minutes come back next month. The comparison table lists them as included with the plan rather than as a recurring credit, so budget them as a one-off.",
    "Reading the documentation as a map of what you can click. Large parts of Inworld's docs now redirect to a login — its release notes among them — so \"the docs describe this\" and \"you will see this button\" are two different claims.",
    "Iterating on a long script. Every regeneration spends from the same small allowance, so settle the voice on one or two sentences first.",
    "Trusting a price you read in an announcement. Inworld publicised a more-than-50% price cut in June 2026 with per-character figures that do not match the on-demand rates on its own current pricing table. Check the table, not the news.",
  ],

  whereToNext: [
    { label: "Voice & Speech", categorySlug: "voice-speech" },
    { label: "Gaming & Creative AI", categorySlug: "gaming-creative-ai" },
    { label: "AI APIs & Developer Services", categorySlug: "ai-apis-developer-services" },
  ],
};
