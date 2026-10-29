import type { PlatformTutorialData } from "./types";

export const adobeFireflyTutorial: PlatformTutorialData = {
  slug: "adobe-firefly-getting-started",
  platformSlug: "adobe-firefly",
  title: "Getting Started with Adobe Firefly",
  tagline:
    "Adobe's image generator, built around commercial safety — though the safety story covers Adobe's own models, not every model now in the app.",
  archetype: "prompts",
  lastReviewedAt: "2026-10-29",
  changelogUrl: "https://helpx.adobe.com/firefly/using/whats-new.html",
  accessTier: "FREE",

  howItWorks:
    "You describe the image you want and it generates several options in seconds. You pick one and refine it — change the style, the shape of the frame, ask for more variations — until you have something worth keeping.",

  whatItIs: [
    "Firefly is Adobe's **generative AI for images** (and increasingly video, audio, and vector art). You describe what you want and it generates it — as a standalone web app, and baked into Adobe tools like Photoshop (Generative Fill) and Illustrator. What sets it apart isn't image quality — Midjourney generally beats it there — it's **legal safety**: Adobe says its own Firefly models are trained on licensed content such as Adobe Stock and on public-domain material, which is why it can stand behind commercial use in a way most generators can't. It's aimed at marketers, designers, and businesses who need images they can actually use without a copyright headache. Every Firefly output also carries **Content Credentials** — provenance metadata marking it as AI-made, part of Adobe's transparency push.",
    "**One app, two kinds of model.** The Firefly app now also offers **partner models** from other companies — Adobe's product page lists Google's Nano Banana, OpenAI's GPT Image, FLUX, Runway, Luma and ElevenLabs among them. Those are not Adobe's models, and Adobe's licensed-training description is about its own. The model picker tells you which one you're using; for commercial work, that choice matters more than anything else on this page.",
  ],

  beforeYouStart: [
    "The free plan needs only a free Adobe ID (no card). Adobe's product page describes it as giving \"free daily generations to try Adobe Firefly\" — enough to try it, not to run a campaign on.",
    "**Paid plans add more generations and access to more models**, and if you already pay for Creative Cloud, check your plan before buying — Firefly use may already be included. Check what a generation costs on the model you pick before you run a big batch.",
    "The headline reason to choose Firefly over a flashier generator is the commercial-safety story below — understand exactly what it does and doesn't cover before you rely on it.",
  ],

  security: [
    {
      kind: "text",
      text: "Firefly's whole pitch is **commercial safety**. Adobe says its own Firefly models are \"trained on a dataset of licensed content, such as Adobe Stock, and public domain content where copyright has expired\" — not scraped from the open web. Adobe does not describe how the **partner** models in the app were trained. On your own material the promise covers both: Adobe says user content in its apps is not used to train generative AI models, \"whether those models are from Adobe or its partners.\"",
    },
    {
      kind: "list",
      label: "The indemnity is real — and narrower than the marketing",
      items: [
        "Adobe's own page on its approach says it \"provides intellectual property indemnification for **enterprise customers** for content generated with Adobe Firefly.\" That is a promise to business customers on enterprise contracts about Adobe's own models. Nothing on that page extends it to individual plans — free or paid — or to images made with a partner model.",
        "It only backs **clean, on-policy** generations. The moment your prompt names a **real brand, character, or person**, you've stepped outside the safe zone — \"trained on licensed data\" does not make a trademark-infringing prompt safe.",
        "If legal backing is the reason you chose Firefly, generate with an Adobe Firefly model, and if you are buying for a company, ask Adobe in writing which models and features your contract's indemnity covers.",
      ],
    },
    {
      kind: "text",
      text: "Separate but important: indemnity protects against claims that you infringed **someone else's** copyright; it does **not** give you a copyright **in** your image. As with any generator, a pure prompt-to-image result may not be copyrightable — so you can use it commercially, but you may not be able to stop others from using something similar.",
    },
  ],

  triad: {
    bestAt: [
      "Commercially safe images for ads, marketing, and client work, using Adobe's own models",
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
      "Counting on indemnity outside an enterprise contract, or for a partner model",
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
    "**Indemnity is an enterprise promise about Adobe's own models.** Adobe describes it for enterprise customers; a personal plan, free or paid, isn't where that safety net lives.",
    "**Picking a partner model changes the story.** Nano Banana, GPT Image, FLUX and the rest sit in the same picker as Adobe's models, but Adobe's licensed-training description is about its own models only.",
    "**Naming real IP breaks the safe zone.** Clean prompts are protected; \"make me a [famous character]\" is not.",
    "**Commercial-safe is not the same as you-own-the-copyright.** You can use it; you may not be able to stop others copying it.",
  ],

  whereToNext: [
    { label: "Image Generation & Editing", categorySlug: "image-generation-editing" },
    { label: "Video Creation & Editing", categorySlug: "video-creation-editing" },
  ],
};
