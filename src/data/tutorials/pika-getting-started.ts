import type { PlatformTutorialData } from "./types";

export const pikaTutorial: PlatformTutorialData = {
  slug: "pika-getting-started",
  platformSlug: "pika",
  title: "Getting Started with Pika",
  tagline:
    "Turn one photo into a five-second video that squishes, melts or explodes — usually in a couple of taps, usually free.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-07",
  changelogUrl: "https://pika.art/blog",
  accessTier: "FREE",

  howItWorks:
    "You upload a photo, type a description, or hand it a video you already have, and Pika gives back a clip a few seconds long. Adjust and run again if it isn't right — each run spends some of your **credits**, the platform's unit of spend.",

  whatItIs: [
    "A short-form AI video generator from Mellis, Inc., on the web and in an iOS app. Pika calls what it makes \"social-first content\" and its homepage offers \"a reality-bending video with just one tap\": the tap is real, the reality-bending is five seconds long and often takes three goes.",
    "It is built around **Pikaffects**, a menu of pre-made effects: instead of describing what should happen you upload a picture and pick \"melt\", \"squish\" or \"cake-ify\". Runway is the stronger craft tool for building shots; Pika is the faster toy with a real free tier. Veo leads on realism and sound but needs a Google subscription; Pika is cheaper and more fun, not more realistic.",
    "Its video model is currently at version 2.5; 2026's releases have been audio tools, agents and a storefront reselling other labs' models rather than a new flagship. Alive and shipping, just not racing on raw quality.",
  ],

  beforeYouStart: [
    "Pika's pricing page currently lists a free Basic plan at $0 with 80 video credits a month and — unusually — no **watermark**, the mark identifying output as AI-made, on downloads.",
    "Monthly credits reset and do not roll over; Pika's FAQ is explicit that unused ones vanish and only purchased top-ups carry over, on paid plans. At 480p, the lowest quality setting — soft on a phone, worse on anything bigger — a five-second clip is around 12 credits, a Pikaffect 15, a Pikascene 20.",
    "That makes 80 credits roughly six clips a month: enough to learn on, not to make things regularly. The cheapest paid tier is currently around $8 a month billed yearly, the tiers above roughly $28 and $76.",
    "Bring an email or Google sign-in and a photo; image-to-video is where Pika is strongest. First step: sign up at pika.art, upload a clear photo of one object on a plain background, open Pikaffects, pick an effect. About 15 credits.",
  ],

  security: [
    {
      kind: "text",
      text: "Your generations are not fully private, and Pika says so: its FAQ answers whether videos in your account are private with \"No, but let us explain.\" Others see only what you share, but Pika may feature yours on its Templates page under your display name; deleting the video removes it.",
    },
    {
      kind: "list",
      label: "Faces, likenesses and licensing",
      items: [
        "Pika's privacy policy says it collects \"Biometric information, such as scans of facial features or voice data\" for features driven by a face or voice. A selfie is not a picture of a teacup.",
        "AI Trendmaker and its like are built around your likeness — a selfie plus a sound becomes a video of you. Uploading images or likenesses of other people without consent is explicitly prohibited by Pika's terms: friends, colleagues, celebrities, strangers.",
        "Where law permits or you consent, Pika may use your inputs and outputs to improve its models. It does not claim ownership — you keep them — but you grant a broad licence to use, reproduce and display what you upload while stored.",
      ],
    },
    {
      kind: "list",
      label: "Commercial use — check before you rely on it",
      items: [
        "The pricing page currently lists \"Commercial use\" on every plan, including free Basic. The FAQ contradicts it, limiting that to Pro and Fancy — and is stale elsewhere on the same page, so the pricing page is the better guide. But the terms defer to it, which makes the disagreement matter.",
        "If money depends on the answer, email support@pika.art and get it in writing first.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "One-photo party tricks: Pikaffects on a single clear subject — melting, squishing, cake-ifying",
      "Short social clips where the effect is the idea",
      "Swapping one object inside footage you already have, via Pikadditions and Pikaswaps — free at 480p for around 20 credits",
    ],
    okayAt: [
      "Stitching a first frame to a last frame with Pikaframes, currently around 20–25 seconds",
    ],
    avoid: [
      "Anything needing a long, continuous shot — the default generation is five seconds",
      "Faces, hands and readable text held steady across a clip — these still drift",
      "Real people who have not agreed to it — prohibited by Pika's terms",
    ],
  },

  starterActions: [
    {
      title: "Melt one object with Pikaffects",
      whyHere:
        "Pikaffects is on the free plan for image-to-video at around 15 credits, your cheapest finished result and no writing at all. Use one clear subject on a plain background — clutter confuses the effect.",
    },
    {
      title: "Add a camera move to a still photo",
      prompt:
        "Slow dolly push in toward the mug on the table, steam rising, warm morning light, everything else still",
      whyHere:
        "Pika's own FAQ names the camera words it responds to — bullet time, vertigo, timelapse, dolly down. Unusually direct guidance from a vendor, and it works better than vague cinematic adjectives.",
      tweak: "Swap `dolly push in` for `vertigo` and run it again. Same photo, completely different feeling.",
    },
    {
      title: "Swap one thing inside real footage",
      prompt:
        "Replace the coffee cup on the desk with a small potted cactus, keep everything else exactly the same",
      whyHere:
        "Pikaswaps modifies one region while preserving the original footage and its sound — a genuinely different skill from generating from scratch.",
    },
  ],

  pitfalls: [
    "**Burning your month on re-rolls.** AI video is a slot machine. Running the same idea five times because the third nearly worked is how people hit zero by Tuesday.",
    "**Writing like a novelist.** Paragraphs of mood and adjectives produce mush. One subject, one action, one camera instruction.",
  ],

  whereToNext: [
    { label: "More AI video tools", categorySlug: "video-creation-editing" },
    { label: "Make the images you feed it", categorySlug: "image-generation-editing" },
  ],
};
