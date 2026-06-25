import type { PlatformTutorialData } from "./types";

export const midjourneyTutorial: PlatformTutorialData = {
  slug: "midjourney-getting-started",
  platformSlug: "midjourney",
  title: "Getting Started with Midjourney",
  tagline: "Turn a sentence into striking AI art — no design skills required.",
  archetype: "prompts",
  lastReviewedAt: "2026-06-25",
  changelogUrl: "https://www.midjourney.com/updates",
  accessTier: "FREE",

  howItWorks:
    "You type a description of an image — this is your **prompt** — and Midjourney generates four versions of it. You pick the one you like best, then refine it: upscale it for more detail, make variations, or adjust the wording and try again. It all happens on Midjourney's website, and you don't need any design skill — just words.",

  whatItIs: [
    "Midjourney is widely regarded as the best AI image generator for sheer visual quality — it turns a plain sentence into striking, often genuinely beautiful art. It's the tool most people mean when they talk about \"AI art.\"",
    "A beginner reaches for it when the goal is how the image looks — mood, style, atmosphere — more than precise control or a rock-bottom price. It used to live entirely inside Discord, which scared a lot of people off; there's now a normal website, so it's far friendlier than its old reputation.",
  ],

  beforeYouStart: [
    "**Paid only — there's no free tier.** This is the big one: unlike most tools here, you pay before you make a single image. The cheapest way in is the **Basic plan at $10/month** (or $8/month billed yearly). First step: go to midjourney.com, sign in with a Google or Discord account, pick Basic, and you're in.",
    "**Will you need to pay? Yes — so here's the honest math.** Basic ($10) covers roughly 200 images a month, then your fast generations stop. Most people who stick with it move to **Standard ($30/month)**, which adds unlimited \"Relax mode\" — slower to generate, but you stop counting. One quirk: you're buying **GPU time** (the computing power to make images), not a fixed number of images, so heavier jobs use up your allowance faster.",
    "**If free is a dealbreaker, you're not stuck.** Midjourney is the quality benchmark, but it isn't the only option — the catalog has solid free image generators too, a gentler way to test whether AI image-making is for you before you pay for anything. Browse the Image Generation category (linked below) to compare.",
  ],

  security: [
    {
      kind: "text",
      text: "Midjourney's privacy is unusual, and it's the main reason to use it deliberately. Two things are true by default: what you make is **public**, and the prompts and images you create can be **used to train Midjourney's models**. Privacy (\"Stealth Mode\") is a paid feature — Pro plan ($60/month) and up — and even then it doesn't make images you already generated private.",
    },
    {
      kind: "list",
      label: "So keep these in mind:",
      items: [
        "Treat a prompt like a public post, not a private sketchbook. Don't put anything sensitive or identifying into a prompt or a reference image on the lower plans — it's visible to others and it's retained.",
        "You own what you create and can use it commercially on any paid plan, even after you cancel — but Midjourney won't defend you in a dispute. Generating a real person's face, a copyrighted character, or a living artist's signature style is a legal risk that's on you.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Aesthetic quality — mood, lighting, composition, atmosphere. Give it an evocative scene and it produces something beautiful with little effort. This is its whole reason to exist.",
      "Stylistic range — name a medium or era (watercolor, 1970s sci-fi poster, charcoal sketch) and it nails the look better than almost anything else.",
      "Concept art and inspiration — quickly visualizing ideas and directions you can't quite put into words yet.",
    ],
    okayAt: [
      "Precise text inside an image — improved, but tools like Ideogram and ChatGPT's image model are more reliable when words must be spelled correctly.",
      "The same character across many images — its reference features help, but the character still drifts; for a consistent face across a series, other tools currently do better.",
      "Photorealism — very good now, though a couple of rivals have edged ahead specifically on looking like a real photo.",
    ],
    avoid: [
      "Exact likenesses of real people, copyrighted characters, or a living artist's signature style — legally risky, against the rules, and Midjourney won't defend you in a dispute. Make \"a wizard,\" not \"a famous actor as a wizard.\"",
      "Anything you need spelled out in precise, reliable text (logos with exact wording, detailed signage) — pick a text-focused generator instead.",
      "If you specifically want a free tool — Midjourney is paid-only. Start with a free image generator from the catalog and come back when top quality is worth paying for.",
    ],
  },

  starterActions: [
    {
      title: "Atmosphere over precision (its signature move)",
      prompt: "a cozy bookshop on a rainy evening, warm golden light spilling onto wet cobblestones, cinematic, painterly",
      whyHere:
        "Midjourney's edge is mood, light, and composition. Give it an evocative scene rather than exact specifications and it fills in beauty that other generators miss.",
      tweak:
        "Change the lighting words — \"foggy morning,\" \"neon night,\" \"candlelit\" — that's what sells the whole mood.",
    },
    {
      title: "Pick a visual style by name",
      prompt: "a red fox curled asleep, in the style of a vintage watercolor children's book illustration",
      whyHere:
        "Naming a medium or era is where Midjourney's huge stylistic range shines — most generators flatten everything toward the same look, and this one doesn't.",
      tweak:
        "Keep the subject, change only the style phrase, and watch how far the range goes.",
    },
    {
      title: "Set the shape for a real use (the one setting worth learning)",
      prompt: "a minimalist mountain range at dawn, muted earth tones, soft mist --ar 16:9",
      whyHere:
        "The --ar 16:9 at the end makes a wide image instead of the default square — the one parameter worth knowing on day one, turning a generation into a usable wallpaper or page header.",
      tweak:
        "Try --ar 9:16 for a phone wallpaper, or --ar 3:2 for something print-shaped.",
    },
    {
      title: "The portrait test (and its honest limit)",
      prompt: "a friendly elderly fisherman with a weathered face, soft window light, photographic portrait",
      whyHere:
        "Faces and hands are far better than Midjourney's early reputation suggests — a good way to see how far it's come. The honest catch: for the same character across many images, it still drifts.",
      tweak:
        "Add an emotion — \"contemplative,\" \"laughing\" — the expression is where it tends to surprise you.",
    },
  ],

  pitfalls: [
    "**There's no free tier — you pay before your first image.** Unlike most tools here, you can't try it free; budget the $10 minimum before you sign up.",
    "**Everything you make is public by default.** On the plans below Pro, your prompts and images are visible to others in Midjourney's gallery — don't generate anything you'd want kept private unless you're paying for Stealth Mode.",
    "**You're buying GPU time, not a set number of images.** Basic's allowance covers roughly 200 images, then fast generation stops; Standard's unlimited \"Relax mode\" (slower) is why most people move up.",
    "**Overstuffing the prompt.** Beginners pile in twenty details at once and get a muddle. Start with a clear, simple description and add one element at a time.",
    "**Stopping at the first four.** The opening grid is a starting point, not the answer — pick the closest, use Vary, or run it again. The good results come from iterating.",
  ],

  whereToNext: [
    { label: "Image Generation & Editing", categorySlug: "image-generation-editing" },
    { label: "Video Creation & Editing", categorySlug: "video-creation-editing" },
  ],
};
