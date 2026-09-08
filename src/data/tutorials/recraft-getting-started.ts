import type { PlatformTutorialData } from "./types";

export const recraftTutorial: PlatformTutorialData = {
  slug: "recraft-getting-started",
  platformSlug: "recraft",
  title: "Getting Started with Recraft",
  tagline:
    "The AI image tool that makes real logos and icons, not just pictures of them.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-07",
  changelogUrl: "https://www.recraft.ai/blog-announcements",
  accessTier: "FREE",

  howItWorks:
    "You type a description of the image you want, pick a style, and Recraft draws it on a canvas in a few seconds. You edit what comes back in place, generate variations beside it, and keep what works. Then the same for the next piece.",

  whatItIs: [
    "An AI image generator with a design canvas, for people making things they intend to use — logos, icons, illustrations, patterns, mockups — rather than one-off art.",
    "Its distinctive output is **vector** artwork: an image made of shapes, so it stays sharp at any size, unlike a photo, which blurs when you enlarge it. Most generators hand you a picture of a logo someone still has to redraw. Recraft draws the shapes and exports them as `SVG`, the file Figma, Illustrator and Canva all open.",
    "The second piece is consistency: build a custom style from up to around ten reference images, then generate everything else in it — the difference between one nice icon and a matching set of twelve.",
    "Canva is a layout tool with AI added; Recraft is a generator with editing added. Canva assembles a poster from existing pieces; Recraft makes the pieces.",
  ],

  beforeYouStart: [
    "**There is a free plan, it is genuinely usable for learning, and you do not own what you make on it.** Recraft's documentation is blunt: free-plan images belong to Recraft, appear publicly in the community gallery, and aren't licensed for commercial use.",
    "A browser and an email address is the whole requirement.",
    "Everything costs **credits**, the platform's unit of spend: a small free allowance that refills daily, or a monthly paid pot that resets without rolling over. Vector generations currently cost more than plain images — a few credits each, more if you pick one of the higher-quality vector **models** (the AI \"brains\" doing the work) — so a vector-heavy afternoon empties an allowance fast.",
    "If you want to use what you make, you'll be paying. The entry plan currently sits around 10-12 USD a month, the next tier around 16-20, with roughly 20% off annually. Paying flips your images to private and hands you ownership and commercial rights for anything generated while subscribed — and those stay yours if you later cancel.",
  ],

  security: [
    {
      kind: "text",
      text: "The most important thing to know: on the free plan your generated images are public. Recraft's docs state they may appear in the community gallery and that Recraft, not you, owns them. Keep anything confidential or client-identifying out of a free account — what you type and what you upload alike.",
    },
    {
      kind: "list",
      label: "Commercial use, by tier",
      items: [
        "Free: owned by Recraft, publicly visible, not licensed for commercial use, and not listable on stock platforms, which require proof of ownership.",
        "Any paid plan: full ownership and commercial rights for images generated while subscribed, client work included.",
        "After cancelling: images made while subscribed stay private and stay yours, not retroactively made public.",
        "On every plan: Recraft's terms forbid using its output to train other AI models or systems.",
      ],
    },
    {
      kind: "text",
      text: "You can upload your own images as references, or to trace and edit, and free accounts are capped at a few uploads a day. Only upload artwork you have the right to use — the public-gallery rule covers free-plan work built from it too.",
    },
  ],

  triad: {
    bestAt: [
      "Logos and app icons you need as clean, editable files rather than flat pictures",
      "Matched sets — a dozen icons, an illustration series — that share one look",
      "Turning an existing image or rough sketch into artwork that scales",
      "Short, readable text inside a design: labels, badges, a poster headline",
      "Repeating patterns and backgrounds, using its dedicated seamless-tile mode",
    ],
    okayAt: [
      "Photorealistic scenes and product photography — decent, not its headline strength",
      "Long paragraphs of text in an image; short phrases are far more reliable",
      "Multi-page layout — it makes the pieces, it isn't a layout tool",
    ],
    avoid: [
      "Commercially usable assets on the free plan — the licence simply isn't there",
      "Anything requiring a real person's likeness, or images passed off as photographs of real events",
      "Asking for a logo \"like\" a famous brand's — that's legal exposure, not a shortcut",
    ],
  },

  starterActions: [
    {
      title: "Make a logo mark you can actually use",
      prompt:
        "A minimalist logo mark for a coffee roastery, one coffee bean formed from two curved leaf shapes, flat vector, two colours, deep brown and warm cream, no text, plenty of space around it",
      whyHere:
        "This is Recraft's core trick: the result arrives as shapes you export into Figma or Illustrator, so you can recolour it, shrink it to a browser-tab icon, or hand it to a printer at any size.",
      tweak:
        "Swap \"two colours\" for \"single colour, black\" — one-colour marks are the real test, and what you need for stamps and dark backgrounds.",
    },
    {
      title: "Build a matching icon set",
      prompt:
        "A set of interface icons in one style, line art with rounded corners and the same line thickness throughout, single accent colour on a transparent background: a calendar, an envelope, a bar chart, a padlock",
      whyHere:
        "Consistency is what Recraft sells and what beginners underestimate. Generate the set, pick your favourite, save its look as a custom style, then generate the rest against it — that's how icon eleven still matches icon one.",
    },
    {
      title: "Rescue a low-resolution image",
      whatItDoes:
        "Turns a pixel image you already have into shapes you can rescale and recolour.",
      whyHere:
        "Recraft has a dedicated tracing function and an editor on the same canvas, so you clean up the result without exporting elsewhere — useful for an old logo that only survives as a small blurry file.",
      tweak:
        "It works best on flat, high-contrast artwork; on a photograph you get a poster effect rather than a usable trace.",
    },
  ],

  pitfalls: [
    "**The free plan is a demo, not a supply of assets.** People generate a logo they love, put it on a real product, and only later read that free-plan images are owned by Recraft and publicly visible. Rights attach to what you make while subscribed, so subscribe before you generate the thing that matters.",
    "**Scalable output is a mode, not something you apply afterwards.** Generate a pixel image and then ask for shapes and you get a traced approximation, not clean geometry. Choose the vector model or style up front when the output needs to scale.",
    "**Credits vanish faster than you plan for.** Vector generations cost several times a basic image, the pro-quality vector models several times that again. Explore with cheap drafts, then spend vector credits once you know the composition you want.",
  ],

  whereToNext: [
    {
      label: "More AI image and editing tools",
      categorySlug: "image-generation-editing",
    },
    {
      label: "Marketing and brand tools that use these assets",
      categorySlug: "sales-marketing-seo-ai",
    },
  ],
};
