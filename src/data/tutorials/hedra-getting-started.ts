import type { PlatformTutorialData } from "./types";

export const hedraTutorial: PlatformTutorialData = {
  slug: "hedra-getting-started",
  platformSlug: "hedra",
  title: "Getting Started with Hedra",
  tagline: "Turn one photo of a face and a voice recording into a talking video — under a rule about whose face that can be that is stricter than most beginners expect.",
  archetype: "prompts",
  lastReviewedAt: "2026-10-15",
  accessTier: "FREE",

  howItWorks:
    "You open Hedra in your web browser, attach a photo of a face and a recording of speech, and type a sentence or two about how the person should come across. Hedra sends back a short video of that face saying your audio, mouth moving in time with it. You watch it, then ask for changes in plain words.",

  whatItIs: [
    "Hedra makes talking-character videos. You give it one still image of a face and an audio track, and it animates the face so the mouth, eyes and head move with the speech. Hedra's documentation calls these avatar or presenter videos, and says a sharp, front-facing photo with nothing covering the mouth or eyes, plus clean audio, gives the most reliable result.",
    "That job now sits inside a broader studio. Hedra's current workspace is built around an agent (AI that takes actions on its own rather than only answering): you describe the result you want in a chat box — that message is your prompt, the message you type — and the agent plans and generates video, images and speech onto a canvas beside the conversation. Each project lives in its own \"Space\", which keeps the conversation, your uploads and the results together. If you would rather pick every setting yourself, a set of manual tools does one job at a time, including an Avatar mode for exactly this task.",
    "Behind one account it runs a range of video, image and voice models, and a live model picker shows what each one needs as input and what it costs to run. It is aimed at creators and marketers: its ready-made starting points include presenter videos, creator-style ads, product spots, storyboards and animated photos.",
    "There is also a developer API for building Hedra into other software; nothing on this page touches it.",
  ],

  beforeYouStart: [
    "**The only real person you may put into Hedra is you.** Hedra's Acceptable Use Policy (the live page carries no date; its download link is the version filed as 31 July 2024, seen 15 October 2026) forbids using the service \"to input, generate, or create output that contains personal information related to any individual other than yourself, including (without limitation) any photos, audio, videos or any other media containing individuals other than yourself.\" The single exception is images of people who \"died at least one hundred years ago.\" The same policy separately bans deepfakes — impersonating real people or creating fake personas \"without consent or legal right.\" Note that the photo-and-audio rule has no permission exception: a friend, a parent, a colleague or a client saying \"yes\" does not, on the policy's wording, make their face or voice allowed. Hedra's own face-swap help article says only to \"use faces you have permission to use\", which is looser; where the two disagree, the policy is the binding document, so follow it. Your own face and voice, characters you generate inside Hedra, and Hedra's library voices are the safe inputs. Breaking the policy lets Hedra suspend or close your account.",
    "Signing up is free and needs no credit card. Everything you make is paid for in credits (the platform's unit of spend — each thing you make costs some), and Hedra does not publish how many credits the free plan includes. Costs differ from model to model, so check the picker's number rather than guessing.",
    "Paid plans are monthly subscriptions: Basic at $20 a month for 2,000 credits, Pro at $50 for 7,200, Ultra at $100 for 18,000, and Teams at $75 for 14,400, with Enterprise priced on request. Hedra's billing help says monthly credits reset each cycle and do not carry over, while one-off credit packs you buy separately do not expire. Its terms say a subscription renews automatically at the then-current price until you cancel; cancelling stops billing, and you keep your credits until the period ends.",
    "Hedra's privacy policy says the service is not intended for anyone under 18.",
  ],

  security: [
    { kind: 'text', text: "What makes Hedra different from a text chatbot is what it extracts from your uploads. Hedra's Biometric Data Privacy Policy (effective 23 July 2024) says it may generate facial templates from photos and derive information from voice recordings to build avatars, and that it will not keep that biometric data longer than three years after your last interaction with Hedra. Its privacy policy (effective 4 September 2026) says this derived data may also be used to improve the service and develop new products, and that data stripped of identifying details may be used to train its AI models. Neither page describes a switch to opt out of those uses." },
    { kind: 'list', label: 'Three things to know before you upload your own face:', items: [
      "Sharing a Space with someone shares its canvas, its files and the prompts used to make them. Hedra's docs say your chat with the agent stays private, but the prompts do not.",
      "Cancelling your subscription does not remove anything. To remove your account and the personal data tied to it, Hedra's docs point to Settings → Privacy → Delete account, which also ends any subscription immediately; the privacy policy says deleted information can sit in backups for up to 30 days.",
      "Hedra is US-based, and its privacy policy says your information may be moved to the United States or other countries whose privacy laws may be less protective than yours.",
    ] },
  ],

  triad: {
    bestAt: [
      "Making one still face speak an audio track you supply, with the mouth moving in time — the job Hedra's Avatar mode and presenter starting point exist for.",
      "Keeping a made-up character recognisable across many clips, by saving it once as a reusable reference and calling it up by name.",
      "Trying the same idea on several different video models from one account, with each one's cost shown before you spend.",
    ],
    okayAt: [
      "Scenes with more than one speaker. Hedra's docs say to make the intended speaker unambiguous in your instruction and to use speaker controls only where the chosen model offers them.",
      "Animating a photo with no speech at all. The docs say small, physically plausible movement holds up far better than several competing actions in one short clip.",
    ],
    avoid: [
      "Videos fronted by any real person other than yourself — a relative, a co-worker, a client's spokesperson — even with their blessing; the policy in Before you start has no permission exception.",
      "Planning a budget from documentation. Hedra's own docs say exact model names, credit prices, duration limits and resolutions are deliberately not listed there, and they can change.",
    ],
  },

  starterActions: [
    {
      title: "Make yourself talk",
      prompt:
        "Make a 15-second presenter video using my photo and my voice recording that I've attached. Frame me from the chest up, keep my face and background exactly as they are, and make the delivery warm and relaxed, with small natural head movements and no hand gestures.",
      whyHere:
        "Before you paste this, attach a sharp, front-facing selfie and a short voice memo you recorded yourself. Under the yourself-only rule in Before you start, your own face is the one real face this page can send you off with.",
      tweak: "Keep the first one short. If the lips drift out of time, ask for one change — 'keep everything, but make the mouth movement match the audio more closely' — instead of rewriting the whole brief.",
    },
    {
      title: "Give a historical portrait a voice",
      prompt:
        "Animate this portrait so the person in it speaks the attached audio. Keep the face, clothing, background, lighting and painted style unchanged. Subtle head movement and natural blinking only; the camera stays still.",
      whyHere:
        "This uses the policy's one exception, for people who died at least a century ago. A public-domain portrait of a nineteenth-century figure, read aloud by your own voice or one of Hedra's library voices, is the most dramatic thing you can make here that sits squarely inside the rules.",
      tweak: "Ask for a still camera and one small movement first.",
    },
    {
      title: "Invent a presenter, then reuse them",
      prompt:
        "Create a portrait of an original, fictional presenter: a friendly woman in her forties with short grey hair and a green cardigan, front-facing, evenly lit, plain light background, looking straight at the camera.",
      whyHere:
        "A character you generate is not a real person, so the policy's yourself-only rule does not bite. Once you like the result, save it under Library → Elements — Hedra's docs allow up to 10 reference images per Element — and type @ plus its name in any later prompt to bring the same face back, which is what keeps a recurring presenter looking like the same person.",
      tweak: "Pair your saved presenter with a voice from the Speech tool (next item) rather than a recording of a real person.",
    },
    {
      title: "Write the script first, then hand it to the face",
      whatItDoes:
        "Open Manual tools → Speech, choose a library voice, type a few sentences of script and generate the audio. Then, in the same Space, add that audio as the reference for your avatar video.",
      whyHere:
        "Hedra's docs recommend this order because the agent receives everything already on the canvas when you send your next message. It also keeps you inside the rules — a library voice is not anyone's real voice — and the Speech tool lets you insert emotion and pacing tags by typing a forward slash.",
      tweak: "Hedra's docs suggest short sentences and spelled-out abbreviations wherever pronunciation matters.",
    },
  ],

  pitfalls: [
    "**Generating a long video first.** Hedra's own advice is to start with a short test before a long performance. If a generation fails, your billing page's generation history should show the charge and, often, an automatic refund — check there before assuming the credits are gone.",
    "**Letting the agent choose everything when you care about cost.** Describing what you want in the main chat box lets Hedra pick the tools and model for you. If you want to see and choose the model and its price yourself, use Manual tools → Video → Avatar instead.",
    "**Feeding it too many references.** Hedra's docs warn that more images are not automatically better if they disagree about identity or style. Two clear, consistent photos beat six mismatched ones.",
    "**Mixing projects in one Space.** The docs advise one creative goal per Space, because the agent leans on earlier decisions in the conversation. Start a new Space for a new idea rather than piling it onto an old one.",
  ],

  whereToNext: [
    { label: 'Video Creation & Editing', categorySlug: 'video-creation-editing' },
    { label: 'Voice & Speech', categorySlug: 'voice-speech' },
    { label: 'Image Generation & Editing', categorySlug: 'image-generation-editing' },
  ],
};
