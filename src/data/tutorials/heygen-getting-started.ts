import type { PlatformTutorialData } from "./types";

export const heygenTutorial: PlatformTutorialData = {
  slug: "heygen-getting-started",
  platformSlug: "heygen",
  title: "Getting Started with HeyGen",
  tagline:
    "Turn a script into a talking-head video with a realistic AI avatar — no camera, studio, or on-camera talent required.",
  archetype: "prompts",
  lastReviewedAt: "2026-07-13",
  changelogUrl: "https://www.heygen.com/blog",
  accessTier: "FREE",

  howItWorks:
    "You give it a script and a presenter, and it renders a talking-head video. It runs on **credits**, and the catch to understand: the photorealistic avatar engines cost meaningfully more credits per minute than basic ones, translation consumes credits too, and 4K doubles them — so a few minutes of premium video goes through a plan's allowance fast, and credits mostly don't roll over. Creating a custom avatar of your own likeness is a separate, paid setup step.",

  whatItIs: [
    "HeyGen makes **AI avatar videos**. You paste a script, pick a presenter — a stock avatar, one built from a single photo, or a **digital twin** of yourself trained from a short recording — choose a voice, and it generates a video where the avatar speaks your words with synced lips, gestures, and expressions. It also **translates videos into 175+ languages** (re-syncing the speaker's lips) and can build a whole video from a single prompt. It's used for training content, product explainers, marketing, and localization.",
  ],

  beforeYouStart: [
    "The free plan (no card) gives a handful of short, **watermarked** videos a month plus one custom avatar — enough to see the quality, not to produce real content. **Creator is around $29/month** (watermark off, 1080p).",
    "Before you make an avatar of anyone — including yourself — read the consent section below. It's the thing that separates responsible use from a real problem.",
    "Scripts are where the cost lives: every re-render burns credits, so write and polish the script before you generate.",
  ],

  security: [
    {
      kind: "list",
      label: "Likeness needs consent — this is the whole ballgame",
      items: [
        "A HeyGen avatar is a **synthetic version of a real person's face and voice.** Only create a digital twin (or clone a voice) of **yourself**, or of someone who has given you **explicit, documented permission.**",
        "HeyGen's rules **prohibit deepfakes and impersonation** — creating a likeness to deceive, or of a public figure without consent, can get your account suspended and may be illegal.",
        "Worth knowing: independent reviewers have flagged that HeyGen's consent checks are **lighter than some competitors'**, which means more of the responsibility to do the right thing falls on **you**, not the platform's guardrails.",
      ],
    },
    {
      kind: "text",
      text: "The **video translator re-animates a real person's mouth** to speak another language. That's still that person's likeness — get their OK before translating and publishing footage of someone else.",
    },
    {
      kind: "text",
      text: "On rights: paid users generally own their exports for commercial use (subject to the terms and to consent), and stock avatars/voices are licensed for commercial use — but free-tier output is watermarked and more restricted. Read the terms before running client work or ads.",
    },
  ],

  triad: {
    bestAt: [
      "Talking-head videos from a script, no camera needed",
      "Localizing one video into many languages with lip-sync",
      "A reusable digital twin so you don't re-record every update",
      "Training, explainer, and marketing content at volume",
    ],
    okayAt: [
      "Cinematic realism (good, but not indistinguishable from real footage)",
      "Predictable cost (premium avatars + 4K + translation burn credits fast)",
      "Off-axis or busy shots (front-facing, clean audio gives the best lip-sync)",
    ],
    avoid: [
      "Making anyone's avatar or voice without documented consent",
      "Deepfakes, impersonation, or anything deceptive (prohibited, often illegal)",
      "High-authenticity content where a real human on camera matters",
    ],
  },

  starterActions: [
    {
      title: "A stock-avatar video from a script",
      prompt:
        "Hi everyone! In this quick video I will show you three tips for staying organized at work. Let us jump right in.",
      whyHere:
        "The fastest way to judge quality — pick a stock avatar and voice, paste a script, render, watch. No consent questions with a stock avatar.",
      tweak: "Keep the first script short; long scripts cost more credits and take longer to render.",
    },
    {
      title: "Make a digital twin of YOURSELF",
      whatItDoes:
        "Record the short sample HeyGen asks for and create a digital twin of your own likeness, then have it deliver a line.",
      whyHere:
        "Your own avatar is the standout feature and the one you can make with zero consent worry.",
      tweak: "Record in a quiet, well-lit spot facing the camera for a much better twin.",
    },
    {
      title: "Translate a clip",
      whatItDoes:
        "Upload a short video of yourself and use the translator to produce a lip-synced version in another language.",
      whyHere: "Localization with matched lip movement is HeyGen's other headline trick.",
      tweak: "Only translate footage of yourself or someone who's agreed to it.",
    },
  ],

  pitfalls: [
    "**Consent is the rule, and the guardrails are light.** Only make avatars/voices of yourself or with documented permission — HeyGen leans on you to do the right thing.",
    "**Credits vanish fast.** Premium avatars, translation, and 4K each multiply the cost, and credits mostly don't roll over.",
    "**Free output is watermarked.** Fine for testing, not for publishing.",
  ],

  whereToNext: [
    { label: "Video Creation & Editing", categorySlug: "video-creation-editing" },
    { label: "Voice & Speech", categorySlug: "voice-speech" },
  ],
};
