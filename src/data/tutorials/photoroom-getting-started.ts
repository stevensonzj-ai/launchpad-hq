import type { PlatformTutorialData } from "./types";

export const photoroomTutorial: PlatformTutorialData = {
  slug: "photoroom-getting-started",
  platformSlug: "photoroom",
  title: "Getting Started with Photoroom",
  tagline: "A beginner's first half-hour with the AI photo editor built for product listings.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-17",
  accessTier: "FREE",

  howItWorks:
    "You drop a photo of a product into the editor and Photoroom cuts the object away from its background in a second or two. From there you pick a backdrop from a list or type a description of the scene you want, look at what comes back, and keep re-describing until it fits.",

  whatItIs: [
    "Photoroom is a photo editor built around one trick — separating a product from what it was photographed against — and around what comes next: a plain backdrop, a generated scene, better lighting, a straighter crop.",
    "It is built for people who sell things, not photographers. Its customer stories are Depop, Decathlon and Palm Angels, and its tools are named product staging, virtual try-on, ghost mannequin, listing images.",
    "It runs as an iPhone, iPad and Android app and as a browser app at app.photoroom.com; one account works across all of them, though not identically.",
    "It will also invent a whole image from a written description, dress a virtual model, and generate short product videos — the expensive end of the product, and the part to try last.",
  ],

  beforeYouStart: [
    "**The free plan is licensed for personal use only.** Photoroom's terms, effective 29 July 2026 and in force today, license free accounts \"for your own personal, non commercial purposes,\" and its help centre puts it plainly: \"You cannot use Photoroom for commercial use.\" If the photo is going on an Etsy, eBay or Depop listing, the free plan is for deciding whether you like the tool.",
    "Free accounts currently get 25 exports a week and 100 a month, counted across anything that produces a file — downloads, camera-roll saves, shares. Editing is not what runs out; saving is.",
    "Free export resolution depends on which Photoroom you use: the vendor documents a 750 × 550 pixel ceiling on the iPhone, iPad and Android apps against 2000 × 2000 in the browser. Those figures were last revised in August 2025, so treat them as the published position rather than a guarantee about today.",
    "Generative tools run on **credits** (the platform's unit of spend — each thing you make costs some); background removal, retouch, preset shadows, expand, resize and the image enhancer do not, listed by the vendor as unmetered under fair use. Free accounts get some credits, but Photoroom does not publish how many — its help centre says only \"a low limit,\" and the pricing comparison table has no free column at all.",
    "Paying starts at Pro, currently about $12.99 a month or $89.99 a year, lifting exports to 1,000 a month and unlocking whole-folder editing and high-resolution export. Max, currently around $34.99 a month, is the first tier with the Shopify connection and the video generator. You move up for volume and for the commercial licence, not for better background removal — that is the same tool the free plan already gives you.",
  ],

  security: [
    { kind: 'text', text: "Photoroom trains its models on what you upload, by default, and its privacy policy is blunt about the consequence: switching the setting off later \"shall not have retroactive effect on processing activities already carried out.\" Find the switch in your first five minutes." },
    { kind: 'list', label: 'Where the switch lives', items: [
      'iPhone, iPad and Android: Create → Content → your workspace → Manage account → Data control → "Improve model for everyone"',
      'Browser: log in at app.photoroom.com → Create → Preferences → Your profile → scroll to "Terms & conditions" → "Improve model for everyone"',
      'It is per-person. Photoroom states there is currently no way to set it once for everybody sharing a workspace, though it says it plans to add one.',
    ] },
    { kind: 'text', text: "The terms also make you warrant you hold every right and consent needed for anything in an image you upload, naming likenesses specifically — a friend's hand holding your product is a consent question here, not just a courtesy." },
    { kind: 'text', text: "Photoroom is a French company, its privacy policy is written to European rules naming the CNIL as its supervising authority, and it publishes retention periods per category of data, so access and deletion rights are exercisable." },
  ],

  triad: {
    bestAt: [
      "Separating a product from a cluttered background in one tap — still the thing it does best",
      "The same cutout, backdrop and crop across a whole folder, on the paid plans",
      "Reshaping one image into the several aspect ratios different storefronts each insist on",
      "Describing a backdrop in words instead of hunting for a stock photo that nearly matches",
    ],
    okayAt: [
      "Images of people. The virtual-model and try-on tools work but are the most credit-hungry part of the product, and Photoroom's own prompt guide is written around reducing retries — which tells you retries are normal.",
      "General photo editing. No layers, curves or masks in the way a photo editor usually means them.",
      "Being the same product everywhere. The phone and browser apps differ in prompt options and in what they will export, so a task you gave up on in one may work in the other.",
    ],
    avoid: [
      "Planning a high-volume month around \"unlimited exports.\" That phrase still appears on Photoroom's own plans-overview article, while its pricing table and its newer, more specific export-limit article both give the Pro cap above. Assume the number, not the adjective.",
      "Buying Pro for the video generator: Photoroom's own plan comparison marks video \"Not included\" on Pro despite video sitting in the top-level product menu.",
      "Budgeting a fixed monthly output from the advertised credit figure outside the US. The vendor's pricing FAQ states that \"the monthly credit amount included with your plan may vary depending on your country or region,\" without publishing how much it varies.",
    ],
  },

  starterActions: [
    {
      title: "The cutout, on a photo you already have",
      whatItDoes:
        "Open the background remover in a browser, drag in a photo of something on your kitchen table, and download a transparent PNG — a cutout with no background baked in.",
      whyHere:
        "Tested against Canva, which also removes backgrounds: Canva's lives inside a design you already opened and gives back a design. Photoroom's is a page you drop a file onto, and gives back the transparent cutout itself — the asset you reuse against every later background.",
      tweak:
        "Try an awkward edge — a wicker basket, headphones — not a clean rectangular box.",
    },
    {
      title: "Describe the scene, not the product",
      prompt:
        "A ceramic mug on a pale oak table beside a folded linen napkin, morning window light coming from the left, a soft shadow under the mug, shot from slightly above at a shallow angle, clean and minimal, for an e-commerce product photo. Do not include other objects, hands or text.",
      whyHere:
        "Tested against Midjourney: a Midjourney **prompt** (the message you type) must describe the product too, because Midjourney invents the whole picture and can invent your mug wrong. Here the mug is already cut out and pinned in place, so every word goes on the scene — which is why Photoroom's prompt guide says to name the setting, materials, lighting, camera angle and intended use, and end with what you do not want.",
      tweak:
        "Change only the last sentence between attempts — \"do not include reflections\" — negative phrasing the vendor documents as supported.",
    },
    {
      title: "Run the same description on two different engines",
      whatItDoes:
        "In the AI Backgrounds settings, run your description once on an earlier engine (v2 or v3) and once on a Studio one, then compare.",
      whyHere:
        "Tested against Canva's Magic Media, which picks the **model** (the AI \"brain\" doing the work) for you without mentioning there was a choice: Photoroom exposes the dial and documents the trade — v2 and v3 give lower-resolution output and cost less to run, the Studio engines higher-resolution output and cost more.",
    },
    {
      title: "Invent the photo you never took",
      prompt:
        "A navy canvas tote bag hanging on a hook against a whitewashed plaster wall, late afternoon light raking across from the right, shot at eye level and centred with plenty of empty wall above it, for an e-commerce product photo. Do not include people, hands or other bags.",
      whyHere:
        "Paste this into \"Create any image\" under AI Tools, which Photoroom documents as a browser-app feature. Tested against ChatGPT, which also makes pictures from a sentence: what comes out here lands in the same editor as your real photographs, cropped, resized and exported by the same tools.",
      tweak:
        "Keep the last line and change the wall: \"a terracotta tiled wall,\" \"weathered timber.\"",
    },
    {
      title: "Export one throwaway file before you do any real work",
      whatItDoes:
        "Export one junk image from whichever Photoroom you plan to live in, before editing anything you care about, and check the file's pixel dimensions.",
      whyHere:
        "Tested against remove.bg, which shows the resolution before you commit: Photoroom does not surface its ceiling while you edit, and the phone and browser ceilings differ by a factor of four (see Before you start). One throwaway export buys that answer.",
    },
  ],

  pitfalls: [
    "Editing a folder spends the allowance per image: a batch of ten counts as ten exports, so one bulk run can eat most of a free week.",
    "Re-running an AI tool counts as a new generation, and so does editing an image the AI just made: the tenth background attempt costs what the first did.",
    "Photoroom automatically returns credits when a generation fails on a technical error, but an image that arrives intact and simply isn't what you pictured is a normal, paid-for result.",
    "Photoroom compresses imported images to 2000 × 2000 by default, and a low-resolution import stays low-resolution inside a larger design. Keep your originals somewhere else.",
    "Subscribe inside the phone app and Apple or Google bills you, not Photoroom — cancellations and refunds go through that store. Photoroom's own refund window is one week from purchase.",
  ],

  whereToNext: [
    { label: 'Image generators and editors', categorySlug: 'image-generation-editing' },
    { label: 'Video creation tools', categorySlug: 'video-creation-editing' },
    { label: 'Sales and marketing AI', categorySlug: 'sales-marketing-seo-ai' },
  ],
};
