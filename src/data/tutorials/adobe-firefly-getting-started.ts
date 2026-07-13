import type { PlatformTutorialData } from "./types";

export const adobeFireflyTutorial: PlatformTutorialData = {
  slug: "adobe-firefly-getting-started",
  platformSlug: "adobe-firefly",
  title: "Getting Started with Adobe Firefly",
  tagline:
    "Adobe's image generator, built to be commercially safe — trained only on licensed and public-domain content, with legal backing for paying users.",
  archetype: "prompts",
  lastReviewedAt: "2026-07-13",
  changelogUrl: "https://helpx.adobe.com/firefly/using/whats-new.html",
  accessTier: "FREE",

  howItWorks:
    "You prompt it like any image generator and get results in seconds, with the option to refine style, aspect ratio, and variations. It runs on **credits**: on paid plans, standard image generation is effectively unlimited, and credits are spent mainly on premium operations (video, higher-res, partner models). Every Firefly image also carries **Content Credentials** — invisible provenance metadata marking it as AI-generated, part of Adobe's transparency push.",

  whatItIs: [
    "Firefly is Adobe's **generative AI for images** (and increasingly video, audio, and vector art). You describe what you want and it generates it — as a standalone web app, and baked into Adobe tools like Photoshop (Generative Fill) and Illustrator. What sets it apart isn't image quality — Midjourney generally beats it there — it's **legal safety**: Firefly was trained only on content Adobe has the rights to, which is why Adobe can stand behind commercial use in a way most generators can't. It's aimed at marketers, designers, and businesses who need images they can actually use without a copyright headache.",
  ],

  beforeYouStart: [
    "The free plan needs only a free Adobe ID (no card) and gives a small monthly batch of credits — enough to try it. Outputs have **no watermark** and are licensed for commercial use, but the free tier is **not** covered by Adobe's legal indemnity (see security).",
    "**Paid plans start around $10/month** (standalone), and if you already pay for Creative Cloud, Firefly credits are usually bundled in.",
    "The headline reason to choose Firefly over a flashier generator is the commercial-safety story below — understand exactly what it does and doesn't cover before you rely on it.",
  ],

  security: [
    {
      kind: "text",
      text: "Firefly's whole pitch is **commercial safety**: it's trained only on **licensed content (Adobe Stock), openly-licensed, and public-domain** material — not scraped from the open web — and Adobe **does not train Firefly on your prompts or uploads.** That clean training data is why Adobe can offer the legal backing below, which most generators can't.",
    },
    {
      kind: "list",
      label: "The indemnity is real — and narrower than the marketing",
      items: [
        "On **paid** plans, Adobe offers **IP indemnification**: if a Firefly-generated image is hit with a copyright claim, Adobe will defend you and cover it. **Free-tier outputs are NOT covered.**",
        "It only backs **clean, on-policy** generations. The moment your prompt names a **real brand, character, or person**, you've stepped outside the safe zone — \"trained on licensed data\" does not make a trademark-infringing prompt safe.",
        "It doesn't extend to third-party integrations/API wrappers or to reference images you upload — the coverage is for standard Firefly outputs on a paid plan.",
      ],
    },
    {
      kind: "text",
      text: "Separate but important: indemnity protects you from infringing **someone else's** copyright; it does **not** give you a copyright **in** your image. As with any generator, a pure prompt-to-image result may not be copyrightable — so you can use it commercially, but you may not be able to stop others from using something similar.",
    },
  ],

  triad: {
    bestAt: [
      "Commercially safe images for ads, marketing, and client work",
      "Generative Fill / Expand inside Photoshop and Illustrator",
      "Business use where legal defensibility matters more than raw artistry",
      "Clean, on-brand product and marketing visuals",
    ],
    okayAt: [
      "Peak artistic quality and stylistic range (Midjourney leads here)",
      "Highly stylized or experimental art (it's tuned for commercial-safe, not wild)",
      "Photorealistic close-up faces and hands (improving, still imperfect)",
    ],
    avoid: [
      "Relying on the free tier for indemnified commercial work (it isn't covered)",
      "Prompts naming real brands, characters, or people (voids the safe zone)",
      "Assuming 'commercially safe' means you own a copyright in the output",
    ],
  },

  starterActions: [
    {
      title: "A clean commercial image",
      prompt:
        "A bright, minimal flat-lay of a reusable water bottle on a pale wooden table with soft morning light, lots of empty space for text. Photorealistic.",
      whyHere:
        "Marketing-style, no named IP — exactly the kind of prompt Firefly is built for and that stays inside the safe zone.",
      tweak: "Change the product and lighting; keep it generic, no brands or logos.",
    },
    {
      title: "Try a few styles",
      prompt:
        "A friendly cartoon fox mascot waving, simple vector style, bold flat colors, on a transparent background.",
      whyHere: "Shows style control and the kind of reusable brand asset Firefly does well.",
      tweak: "Ask for the same subject in \"watercolor\" or \"3D render\" to see the range.",
    },
    {
      title: "Extend an image (in Photoshop)",
      whatItDoes:
        "If you have Photoshop, open a photo and use Generative Fill/Expand to widen the frame or add a matching background.",
      whyHere:
        "Firefly's integration into real design tools is its practical superpower, not just the standalone app.",
      tweak: "No Photoshop? The web app's expand feature does the same thing.",
    },
  ],

  pitfalls: [
    "**The free tier isn't indemnified.** The legal safety net that's Firefly's whole selling point only applies to paid plans.",
    "**Naming real IP breaks the safe zone.** Clean prompts are protected; \"make me a [famous character]\" is not.",
    "**Commercial-safe is not the same as you-own-the-copyright.** You can use it; you may not be able to stop others copying it.",
  ],

  whereToNext: [
    { label: "Image Generation & Editing", categorySlug: "image-generation-editing" },
    { label: "Video Creation & Editing", categorySlug: "video-creation-editing" },
  ],
};
