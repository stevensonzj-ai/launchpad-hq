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
    "You drop a photo of a product into the editor and Photoroom cuts the object away from its background in a second or two. From there you either pick a backdrop from a list or type a description of the scene you want, look at what comes back, and keep re-describing until it fits.",

  whatItIs: [
    "Photoroom is a photo editor built around one trick — separating a product from whatever it was photographed against — and around everything you might want to do next: drop in a plain backdrop, generate a scene, fix the lighting, straighten the crop.",
    "It is aimed at people who sell things rather than at photographers. Its own customer stories are Depop, Decathlon and Palm Angels, and its tool names give the game away: product staging, virtual try-on, ghost mannequin, listing images. The editing controls are narrow and opinionated because the job is narrow.",
    "It runs as an iPhone, iPad and Android app and as a browser app at app.photoroom.com, and the same account works across all of them — though, as the next section explains, not identically.",
    "Beyond background work it will also invent a whole image from a written description, dress a virtual model, and generate short product videos. Those are the expensive end of the product and the part most beginners should try last.",
  ],

  beforeYouStart: [
    "**The free plan is licensed for personal use only.** Photoroom's terms, effective 29 July 2026 and in force today, grant free accounts a licence \"for your own personal, non commercial purposes,\" and its help centre says the same thing in plainer words: \"You cannot use Photoroom for commercial use.\" That restriction lands squarely on the people the product is otherwise built for. If the photo is going on an Etsy, eBay or Depop listing, the free plan is for deciding whether you like the tool — not for doing the work.",
    "Free accounts currently get 25 exports a week and 100 a month, counted across everything that produces a file: downloads, saves to your phone's camera roll, shares. Editing is not what runs out; saving is.",
    "Free export resolution depends on which Photoroom you are using, and the gap is large. The vendor documents a 750 × 550 pixel ceiling on the iPhone, iPad and Android apps against 2000 × 2000 in the browser. If you only ever try the phone app you may decide the output is too small to use, when the same free account in a browser would have handed you four times the width. Those figures were last revised in August 2025, so treat them as the published position rather than a guarantee about today.",
    "The generative tools run on **credits** (the platform's unit of spend — each thing you make costs some). Background removal, retouch, preset shadows, expand, resize and the image enhancer explicitly do not: the vendor lists those as unmetered under fair use. Free accounts do get some credits, but Photoroom does not publish how many — its help centre says only \"a low limit,\" and the pricing comparison table has no free column at all, so plan on finding out by using it.",
    "Paying starts at Pro, currently about $12.99 a month or $89.99 a year, which lifts exports to 1,000 a month and unlocks editing a whole folder at once and high-resolution export. Max, currently around $34.99 a month, is the first tier that includes the Shopify connection and the video generator. You would move up for volume and for the commercial licence — not for better background removal, which is the same tool the free plan already gives you.",
  ],

  security: [
    { kind: 'text', text: "Photoroom trains its models on what you upload, by default. Its privacy policy is unusually blunt about the consequence: switching the setting off later \"shall not have retroactive effect on processing activities already carried out.\" So the switch is worth finding in your first five minutes rather than after you have uploaded a season's worth of stock." },
    { kind: 'list', label: 'Where the switch lives', items: [
      'iPhone, iPad and Android: Create → Content → your workspace → Manage account → Data control → "Improve model for everyone"',
      'Browser: log in at app.photoroom.com → Create → Preferences → Your profile → scroll to "Terms & conditions" → "Improve model for everyone"',
      'It is per-person. Photoroom states there is currently no way to set it once for everybody sharing a workspace, though it says it plans to add one.',
    ] },
    { kind: 'text', text: "The terms also make you warrant that you hold every right and consent needed for anything in an image you upload, naming likenesses specifically. Photographing a friend's hand holding your product is a consent question under this agreement, not just a courtesy." },
    { kind: 'text', text: "Photoroom is a French company and its privacy policy is written to European rules, naming the CNIL as its supervising authority, with published retention periods for each category of data it holds. Your access and deletion rights are real and exercisable. That is a better position than most photo apps; it is not a reason to upload anything you would mind a stranger seeing." },
  ],

  triad: {
    bestAt: [
      "Separating a product from a cluttered background in one tap — the thing the company was built on and still the thing it does best",
      "Making a hundred photos look like one shoot: applying the same cutout, backdrop and crop across a whole folder on the paid plans",
      "Reshaping one image into the several different aspect ratios that different storefronts each insist on",
      "Describing a backdrop in words instead of hunting for a stock photo that nearly matches",
    ],
    okayAt: [
      "Images of people. The virtual-model and try-on tools work, but they are the most credit-hungry part of the product, and Photoroom's own prompt guide is written around reducing the number of retries — which tells you retries are normal.",
      "General photo editing. There are no layers, curves or masks in the way a photo editor usually means them. It edits products, not photographs.",
      "Being the same product everywhere. The phone apps and the browser app differ in prompt options and in what they will export, so a task you gave up on in one may simply work in the other.",
    ],
    avoid: [
      "Planning a high-volume month around \"unlimited exports.\" That phrase still appears on Photoroom's own plans-overview article, while its pricing table and its newer, more specific export-limit article both cap Pro at 1,000 exports a month. The two newer sources agree with each other; assume the number, not the adjective.",
      "Buying Pro for the video generator. Photoroom's own plan comparison marks video as \"Not included\" on Pro despite video sitting in the top-level product menu — it starts at Max.",
      "Budgeting a fixed monthly output from the advertised credit figure if you are outside the US. The vendor's pricing FAQ states that \"the monthly credit amount included with your plan may vary depending on your country or region,\" without publishing how much it varies.",
    ],
  },

  starterActions: [
    {
      title: "The cutout, on a photo you already have",
      whatItDoes:
        "Open the background remover in a browser, drag in a photo of something sitting on your kitchen table, and download the result as a transparent PNG — a cutout with no background baked into it.",
      whyHere:
        "Tested against Canva, which also removes backgrounds: Canva's version only exists inside a design you have already opened, and what it gives back is a design. Photoroom's is a single-purpose page you drop a file onto, and what it gives back is the cutout itself. That distinction is the whole workflow — a transparent cutout is the asset you reuse against every later background, and Canva never hands you one on its own.",
      tweak:
        "Try it on something with an awkward edge — a wicker basket, a pair of headphones, anything with a handle — rather than a clean rectangular box. The edge cases are where you find out whether this tool is good enough for your products.",
    },
    {
      title: "Describe the scene, not the product",
      prompt:
        "A ceramic mug on a pale oak table beside a folded linen napkin, morning window light coming from the left, a soft shadow under the mug, shot from slightly above at a shallow angle, clean and minimal, for an e-commerce product photo. Do not include other objects, hands or text.",
      whyHere:
        "Tested against Midjourney: a Midjourney **prompt** (the message you type) has to describe the product too, because Midjourney is inventing the entire picture and can invent your mug wrong. Here your actual mug is already cut out and pinned in place, so every word is spent on the scene around it. That is why Photoroom's own prompt guide tells you to name the setting, the materials, the lighting, the camera angle and the intended use, and to finish by saying what you do not want.",
      tweak:
        "Change only the last sentence between attempts — \"do not include reflections,\" \"do not include a second mug.\" The vendor documents negative phrasing as a supported move, and changing one variable at a time is how you learn what the sentence is actually doing.",
    },
    {
      title: "Run the same description on two different engines",
      whatItDoes:
        "In the AI Backgrounds settings, generate your description once on one of the earlier engines (v2 or v3) and once on a Studio one, then put the two results side by side.",
      whyHere:
        "Tested against Canva's Magic Media, which picks the **model** (the AI \"brain\" doing the work) for you and never mentions there was a choice: Photoroom exposes the dial and documents the trade-off attached to it — the earlier v2 and v3 engines produce lower-resolution output and cost less to run, the Studio ones produce higher-resolution output and cost more. Seeing both outputs from one description is the fastest way to learn what that trade actually looks like on your products.",
    },
    {
      title: "Invent the photo you never took",
      prompt:
        "A navy canvas tote bag hanging on a hook against a whitewashed plaster wall, late afternoon light raking across from the right, shot at eye level and centred with plenty of empty wall above it, for an e-commerce product photo. Do not include people, hands or other bags.",
      whyHere:
        "Paste this into \"Create any image\" under AI Tools, which Photoroom documents as a browser-app feature. Tested against ChatGPT, which will also make you a picture from a sentence: ChatGPT hands you an image and a conversation about it. What comes out here lands in the same editor as your real photographs, so a generated scene and a photographed one get cropped, resized and exported by exactly the same tools — which is what makes it usable as a placeholder for a product you haven't shot yet rather than as a novelty.",
      tweak:
        "Keep the last line and change the wall. \"Against a terracotta tiled wall,\" \"against weathered timber\" — the background is the variable your listing actually needs to test.",
    },
    {
      title: "Export one throwaway file before you do any real work",
      whatItDoes:
        "Before editing anything you care about, export a single junk image from whichever Photoroom you plan to live in, then open the file and check its pixel dimensions.",
      whyHere:
        "Tested against remove.bg, which shows you what resolution you are getting before you commit: Photoroom does not surface its ceiling while you are editing, and the phone and browser ceilings differ by a factor of four (see Before you start). Finding that out on a throwaway file costs you one export. Finding it out on finished work costs you the work.",
    },
  ],

  pitfalls: [
    "Editing a folder at once spends the allowance per image, not per click. Downloading a batch of ten counts as ten exports — so one bulk run can eat most of a free week in a single action.",
    "Every attempt is a fresh charge. Re-running an AI tool on an image counts as a new generation each time, and so does editing an image the AI just made for you. The tenth attempt at a background costs the same as the first did.",
    "A failed generation is refunded; a disappointing one is not. Photoroom automatically returns credits when a generation fails on a technical error. An image that arrives intact and simply isn't what you pictured is a normal, paid-for result.",
    "Your imports get shrunk on the way in. Photoroom compresses imported images to 2000 × 2000 by default, and a low-resolution import stays low-resolution inside a larger design — enlarging the canvas cannot re-create detail that was never uploaded. Keep your originals somewhere else.",
    "If you subscribe inside the phone app, Apple or Google is billing you, not Photoroom — cancellations and refunds go back through whichever store you bought from. Photoroom's own refund window is one week from purchase.",
  ],

  whereToNext: [
    { label: 'Image generators and editors', categorySlug: 'image-generation-editing' },
    { label: 'Video creation tools', categorySlug: 'video-creation-editing' },
    { label: 'Sales and marketing AI', categorySlug: 'sales-marketing-seo-ai' },
  ],
};
