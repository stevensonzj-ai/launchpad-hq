import type { PlatformTutorialData } from "./types";

export const ideogramTutorial: PlatformTutorialData = {
  slug: "ideogram-getting-started",
  platformSlug: "ideogram",
  title: "Getting Started with Ideogram",
  tagline:
    "The AI image generator that can actually spell — built for posters, logos, and anything with words in it.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-07",
  changelogUrl: "https://docs.ideogram.ai/about-ideogram/blog-posts",
  accessTier: "FREE",

  howItWorks:
    "You type a description of the picture you want — your **prompt**, the message you give the AI — into a box and press go; a few seconds later a set of images comes back. If one is close but not right, change the wording or edit the image directly and run it again.",

  whatItIs: [
    "A text-to-image generator: you describe a picture in plain words and it draws one, in your browser, with nothing to install. It's built for things that have words on them — posters, flyers, logo concepts, book covers, social posts, product mockups.",
    "The reason to pick this over Midjourney, DALL·E or Firefly is **legible text**. Most image generators turn lettering into convincing-looking gibberish; Ideogram is built around spelling words correctly and setting them as real-looking type. If your image needs to **say** something, start here.",
  ],

  beforeYouStart: [
    "**Sign in with Google, Apple or Microsoft — not with a plain email address.** Ideogram's pricing page states that free weekly credits go to accounts using one of those three; an email-only signup gets none. Both your login method and your username are permanent, so decide before you click. It's otherwise free to start, no card, at ideogram.ai.",
    "You get a pool of **credits** — the unit of spend, each image costing some — refilling weekly. Free credits are \"slow\" credits: your job runs in the lower-priority queue, one generation at a time. Ideogram doesn't publish the exact number and says it may vary.",
    "To try it and make the odd graphic, you won't pay. You'd want a paid plan if you generate regularly, or if you need images kept private — private generation is a paid feature. Personal plans currently start around $15–20/month, larger tiers around $42–60/month; prices move, check the pricing page.",
  ],

  security: [
    {
      kind: "text",
      text: "**On the free plan your images are public by default.** Ideogram's FAQ is plain: images are public unless you choose private generation, which requires a paid plan. Public means the image appears on the site next to your handle, where others can find and remix it. You can unpublish afterwards — but keep anything confidential or client-sensitive out of a free-tier prompt.",
    },
    {
      kind: "list",
      label: "If you upload a reference image",
      items: [
        "Ideogram's docs say uploaded images are private and live in your Library, not published.",
        "Anything you **generate** from that upload still follows the public-by-default rule above.",
        "Its terms give Ideogram a broad licence to store and process your content to run and improve the service, and neither the terms nor the privacy policy say whether prompts and uploads train its models — so don't upload other people's photos or copyrighted artwork.",
      ],
    },
    {
      kind: "text",
      text: "**Commercial use is allowed on every plan, including free.** Ideogram says it doesn't claim ownership of your images and you may use them for any purpose, with no separate licence to buy. The risk stays yours: what you make must not infringe someone's trademark or copyright.",
    },
  ],

  triad: {
    bestAt: [
      "Short text rendered legibly inside an image",
      "Posters, flyers and social graphics",
      "Logo and wordmark concepts",
      "Text on real objects — signage, packaging, book covers, apparel",
    ],
    okayAt: [
      "Photorealistic people and scenes",
      "General illustration and painting styles",
      "Matching the look of a reference image you supply",
      "Enlarging an image, or removing and replacing a background",
    ],
    avoid: [
      "Text-heavy layouts — its own docs say it isn't designed for complete documents",
      "Non-Latin alphabets and accented characters, which the docs flag as unreliable",
      "Exact brand fidelity — a real logo, a specific licensed font, an exact hex colour",
      "Anything you need kept private while you're on the free tier",
    ],
  },

  starterActions: [
    {
      title: "Turn a business name into a logo concept",
      prompt:
        "A simple flat logo for a coffee shop called \"Third Hour\", rounded sans-serif wordmark with a coffee bean above the text, black on white, generous empty space",
      whyHere:
        "A wordmark is pure spelling, exactly what Ideogram is built for. Its prompting guide says to put the words you want in quotation marks and place them early, and to describe a font's properties — soft and rounded here — rather than name a typeface. Two short words sits in its sweet spot, where spelling holds up.",
      tweak:
        "Ask instead for narrow, upright capitals with small strokes on the ends. Same name, different feel.",
    },
    {
      title: "Switch Magic Prompt off when the wording matters",
      prompt:
        "A hand-lettered chalkboard sign outside a bakery that reads \"OPEN EARLY, SOLD OUT BY NOON\", warm morning light, soft blurred background",
      whyHere:
        "Magic Prompt is a setting, on by default, that quietly rewrites and expands your description — often helpful, but it can wander from the words you asked for. Longer text is where Ideogram is most fragile, so run this once with it on and once off, and compare.",
    },
    {
      title: "Fix a misspelled word instead of starting over",
      whatItDoes:
        "Open a generated image in the Editor, paint over just the broken word, and regenerate that patch.",
      whyHere:
        "This is Ideogram's own recommended fix for text errors, and it matters here: when 90% of a poster is right and one letter is mangled, re-rolling wastes credits and changes the parts you liked.",
    },
  ],

  pitfalls: [
    "**Cramming a paragraph into the picture.** Spelling accuracy falls off as text gets longer. Keep it to a few words and add long copy afterwards in any editor.",
    "**Assuming your images are private.** On the free plan they're public by default, next to your username. Check before you generate anything you wouldn't post.",
    "**Naming a specific font or brand.** \"Make it in Helvetica\" or \"use the Nike logo\" won't work reliably and may not be legally yours. Describe the look instead — bold, narrow, curly handwriting.",
  ],

  whereToNext: [
    { label: "More image generation and editing tools", categorySlug: "image-generation-editing" },
    { label: "Turn your graphics into marketing", categorySlug: "sales-marketing-seo-ai" },
  ],
};
