import type { PlatformTutorialData } from "./types";

export const pikaTutorial: PlatformTutorialData = {
  slug: "pika-getting-started",
  platformSlug: "pika",
  title: "Getting Started with Pika",
  tagline:
    "Turn one photo into a five-second video that squishes, melts or explodes — usually in a couple of taps, usually for free.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-07",
  changelogUrl: "https://pika.art/blog",
  accessTier: "FREE",

  howItWorks:
    "You give Pika a starting point and it gives you a short video clip. The starting point can be a sentence you type (**text-to-video**), a photo you upload (**image-to-video**), or a video you already have that you want altered.\n\nThe part that makes Pika feel different is **Pikaffects** — a menu of pre-built effects. Instead of describing what should happen, you upload a picture and pick \"melt\" or \"squish\" or \"cake-ify\" from a list. No prompt-writing skill required for your first result.\n\nEverything runs on **credits**, a spending unit rather than a clip count. Each generation deducts an amount based on length, resolution and feature, so a 480p test costs a fraction of a 1080p one.",

  whatItIs: [
    "A short-form AI video generator, made by Mellis, Inc. It produces clips of a few seconds from text, a photo, or existing footage, on the web and in an iOS app.",
    "Its centre of gravity is playful and social rather than cinematic. Pika describes what it makes as \"social-first content\", and its homepage leads with turning a photo into \"a reality-bending video with just one tap.\"",
    "Why start here rather than Runway: Pika has a real free tier, and its effects menu gets you a finished, shareable clip before you have learned to write a prompt. Runway is the stronger craft tool for people building shots; Pika is the faster toy. And where Google's Veo leads on realism and built-in sound, it sits behind a Google subscription — Pika's honest position is cheaper and more fun, not more realistic.",
    "Worth knowing before you invest time: Pika's video model is currently at version 2.5, and 2026's releases have been audio tools, agents and an API storefront reselling other labs' models rather than a new flagship video model. Alive and shipping — just not racing on raw quality.",
  ],

  beforeYouStart: [
    "There is a genuinely free plan. Pika's pricing page currently lists a Basic plan at $0 with 80 video credits a month, and — unlike most free tiers — no watermark on downloads.",
    "What you need: an email address (or a Google sign-in) and, ideally, a photo. Image-to-video is where Pika is strongest, so bring a picture rather than only a sentence.",
    "The mechanism to understand is **monthly credits that reset and do not roll over**. Pika's FAQ is explicit that unused monthly credits vanish; only purchased top-ups carry over, and only on paid plans. Costs are published openly: at 480p, a five-second clip is around 12 credits, a Pikaffect around 15, a Pikascene around 20.",
    "Will you realistically need to pay? Probably, eventually. 80 credits is roughly six five-second 480p clips a month — enough to learn on, not enough to make things regularly — and 480p looks soft on a phone and worse on anything bigger. For higher resolutions, longer clips or real volume, the cheapest paid tier is currently around $8 a month billed yearly, with the tiers above at roughly $28 and $76.",
    "Concrete first step: go to pika.art, sign up free, upload one clear photo of a single object against a plain background, open Pikaffects, and pick one effect. That's your first video, for about 15 of your 80 credits.",
  ],

  security: [
    {
      kind: "text",
      text: "Your generations are not fully private, and Pika says so plainly. Its FAQ answers \"Are the videos I created in my Pika account private?\" with \"No, but let us explain\" — other people generally only see clips you share, but Pika may select your videos to feature on its Templates page, with your display name attached. Deleting the video removes it. Treat every generation as potentially visible, and keep confidential material out of it.",
    },
    {
      kind: "list",
      label: "Uploaded photos, faces and voices",
      items: [
        "Pika's privacy policy says it collects \"Biometric information, such as scans of facial features or voice data\" when you use features driven by a face or a voice. Uploading a selfie is not the same as uploading a picture of a teacup.",
        "Features like AI Trendmaker are built around your likeness — a selfie plus a sound becomes a video of you. That is the point, and also the reason to think before feeding it someone else's face.",
        "Uploading images or likenesses of other people without their consent is explicitly prohibited by Pika's terms. Friends, colleagues, celebrities and strangers all count. Ask first, or don't upload.",
        "Where law permits or you consent, Pika may use your inputs and outputs to improve its AI models. Assume what you upload may train something.",
        "Pika does not claim ownership of your inputs or outputs — you keep them — but you grant Pika a broad licence to use, reproduce and display what you upload while it is stored on the service.",
      ],
    },
    {
      kind: "list",
      label: "Commercial use — check before you rely on it",
      items: [
        "Pika's pricing page currently lists \"Commercial use\" on every plan, including the free Basic tier.",
        "Pika's FAQ contradicts this, saying commercial use is limited to Pro and Fancy. The FAQ is visibly out of date elsewhere on the same page, so the pricing page is the better guide — but the terms defer to the pricing page, which makes the disagreement matter.",
        "If money depends on the answer, email support@pika.art and get it in writing first. A five-minute check that prevents an expensive mistake.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "One-photo party tricks: Pikaffects applied to a single clear subject — melting, squishing, inflating, cake-ifying",
      "Short social clips where the effect is the idea and five seconds is plenty",
      "Adding or swapping a single object inside footage you already have, via Pikadditions and Pikaswaps",
      "Cheap experimentation — low 480p credit costs make it a forgiving place to learn what AI video can and cannot do",
    ],
    okayAt: [
      "Straight text-to-video from a description. It works, but this is the crowded part of the market and Pika is not the leader",
      "Simple camera moves — push-ins, orbits, timelapses — described in a prompt",
      "Stitching a first frame to a last frame with Pikaframes to reach longer clips, currently up to around 20–25 seconds",
    ],
    avoid: [
      "Anything needing a long, continuous, coherent shot. The default generation is five seconds and most features offer nothing longer",
      "Faces, hands and readable text held steady across a clip — these still drift",
      "Precise control over what happens and when. You are steering, not directing",
      "Real people who have not agreed to it. Prohibited by Pika's terms, and a bad idea regardless",
    ],
  },

  starterActions: [
    {
      title: "Melt one object with Pikaffects",
      whatItDoes: "Turns a still photo into a five-second effect video with no prompt at all.",
      whyHere:
        "Pikaffects is Pika's signature feature and the reason the site exists in this form. It is on the free plan for image-to-video at around 15 credits, so it is the cheapest first win. Use one clear subject on a plain background — clutter confuses the effect.",
      tweak:
        "Try the same photo through two different effects before you try a second photo. You learn more from the comparison than from variety.",
    },
    {
      title: "Add a camera move to a still photo",
      whatItDoes: "Animates a photo you already have, with movement you describe.",
      prompt:
        "Slow dolly push in toward the mug on the table, steam rising, warm morning light, everything else still",
      whyHere:
        "Pika's own FAQ names the camera words it responds to — bullet time, vertigo, timelapse, dolly down. That is unusually direct guidance from a vendor, and it works better here than vague cinematic adjectives.",
      tweak:
        "Swap `dolly push in` for `vertigo` and run it again. Same photo, completely different feeling, and you learn what the camera vocabulary actually does.",
    },
    {
      title: "Test the five-second limit deliberately",
      whatItDoes: "Shows you where AI video breaks, using the cheapest possible setting.",
      prompt:
        "A paper boat drifts across a puddle, camera locked off, gentle ripples, overcast afternoon",
      whyHere:
        "At 480p this costs around 12 credits, the cheapest way to meet Pika's real constraint. Run it, then run something ambitious with several moving elements and compare. That gap is the most useful thing a beginner can learn about AI video.",
      tweak:
        "Keep one subject and one action. Every extra thing you ask for is another thing that can drift.",
    },
    {
      title: "Swap one thing inside real footage",
      whatItDoes: "Takes a video you shot on your phone and changes a single object in it.",
      prompt:
        "Replace the coffee cup on the desk with a small potted cactus, keep everything else exactly the same",
      whyHere:
        "Pikaswaps is built for exactly this — modifying one region while preserving the original footage and its sound. It is on the free plan at 480p for around 20 credits, and it is a genuinely different skill from generating from scratch.",
      tweak:
        "Shoot five seconds of a static scene on a tripod or propped-up phone. A locked-off camera gives the model far less to fight.",
    },
  ],

  pitfalls: [
    "**Burning your month on re-rolls.** AI video is a slot machine, and 80 free credits is roughly six attempts. Running the same idea five times because the third nearly worked is how people hit zero by Tuesday. Write down what was wrong before you press generate again.",
    "**Expecting a long, coherent shot.** Most Pika features top out at five seconds, and even the longer keyframe route currently reaches only about 20–25 seconds. Build a sequence out of short deliberate clips instead of hoping for one continuous take.",
    "**Forgetting credits reset and vanish.** Monthly credits do not roll over. Only purchased top-up credits carry forward, and only on paid plans. If it is the 28th and you have 60 credits left, use them.",
    "**Prompting like a novelist.** Paragraphs of mood and adjectives produce mush. One subject, one action, one camera instruction — using the camera words Pika names in its own FAQ.",
    "**Assuming your generations are private.** They are not, by Pika's own admission — clips may be featured on the Templates page with your display name attached. Never generate with material you cannot afford to have seen.",
  ],

  whereToNext: [
    { label: "More AI video tools", categorySlug: "video-creation-editing" },
    { label: "Make the images you feed it", categorySlug: "image-generation-editing" },
  ],
};
