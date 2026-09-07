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
    "You type a description of the image you want, pick a style, and Recraft generates it in a few seconds. What makes it different from most image generators is the output format. Recraft can produce **vector** artwork — an image built from shapes and lines rather than a grid of coloured dots. A vector stays perfectly sharp whether it's a favicon or a billboard, because the software redraws the shapes at whatever size you ask for. A normal photo-style image (a **raster** image) is a fixed grid of pixels, so blowing it up makes it soft and blocky. Recraft also lets you save a look as a reusable style, so the tenth icon you make matches the first. You work on a canvas, generate, edit in place, and export as `SVG`, `PNG`, `JPG`, `PDF` or `Lottie`.",

  whatItIs: [
    "An AI image and vector generator with a design canvas, aimed at people making assets they actually intend to use — logos, icons, illustrations, product mockups, patterns — rather than one-off art.",
    "The distinctive pitch is genuine vector output. Midjourney and most image generators hand you a pixel image; if you need a logo from it, someone has to trace it by hand. Recraft generates the shapes directly and exports them as `SVG`, which you can open in Figma, Illustrator or Canva and recolour or resize with no quality loss.",
    "The second distinctive piece is style consistency. You can build a custom style from up to around ten reference images and then generate everything else in that style. That's the difference between \"I got one nice icon\" and \"I got a matching set of twelve.\"",
    "Canva is a layout tool with AI bolted on; Recraft is a generator with editing bolted on. Reach for Canva to assemble a poster from existing pieces. Reach for Recraft to create the pieces — especially the ones that need to scale.",
  ],

  beforeYouStart: [
    "**There is a free plan and it is genuinely usable for learning — but you do not own what you make on it.** Recraft's documentation is blunt about this: free-plan images belong to Recraft, appear publicly in the community gallery, and are not licensed for commercial use. Treat free as a test drive, not a source of assets.",
    "**You need nothing but a browser and an email address.** It runs entirely on the web, no install, and there's no separate model to download or configure.",
    "**Everything costs credits.** Generating an image or a vector deducts from a credit balance. Free accounts get a small allowance that refills daily; paid plans get a monthly pot that resets each billing cycle and does not roll over. Vector generations currently cost more credits than plain images (a few credits per vector, more for the higher-quality vector models), so a vector-heavy afternoon burns through an allowance faster than you'd expect.",
    "**Will you realistically need to pay? If you want to use the output, yes.** The entry paid plan currently sits at around 10-12 USD a month, with the next tier up around 16-20 USD a month; annual billing shaves roughly 20% off. Paying is what flips your images to private and hands you ownership and commercial rights for anything you generate while subscribed — and those stay yours if you later cancel.",
    "**First step:** open Recraft in a browser, sign up free, and generate one icon in vector mode. Do it before you read another word about it — five minutes on the canvas tells you more than any review.",
  ],

  security: [
    {
      kind: "text",
      text: "The single most important thing to know: on the free plan your generated images are public. Recraft's docs state they may appear in the community gallery and that Recraft, not you, owns them. Don't put anything confidential, personal, or client-identifying into a free account — not in prompts, not as uploads.",
    },
    {
      kind: "list",
      label: "Commercial use, by tier",
      items: [
        "Free: images are owned by Recraft, publicly visible, and not licensed for commercial use. You also can't list them on stock platforms, which require proof of ownership.",
        "Any paid plan: you get full ownership and commercial rights for images generated while subscribed — marketing, branding, packaging, client work.",
        "After cancelling a paid plan: images you made while subscribed stay private and stay yours. They are not retroactively made public.",
        "One restriction applies on every plan: Recraft's terms forbid using its output to train other AI models or systems.",
      ],
    },
    {
      kind: "text",
      text: "You can upload your own images as references — for building a custom style, or to vectorise or edit. Free accounts are capped at a small number of uploads per day. Only upload artwork you have the right to use, and remember the public-gallery rule applies to free-plan work built from those uploads too.",
    },
  ],

  triad: {
    bestAt: [
      "Logos, icons, and app glyphs you need as clean, editable `SVG` files",
      "Matched sets — a dozen icons, a full illustration series — that share one visual style",
      "Turning an existing raster image or rough sketch into a scalable vector",
      "Simple, readable text inside a design: labels, badges, short headlines on a poster",
      "Repeating patterns and background textures for web and packaging",
    ],
    okayAt: [
      "Photorealistic scenes and product photography — decent, occasionally excellent, but not its headline strength",
      "Long paragraphs of text inside an image; short phrases are far more reliable",
      "Fine-grained edits to a specific small region of a complex image",
      "Complex multi-page layout — it makes the pieces, it isn't a layout tool",
    ],
    avoid: [
      "Anything requiring a real person's likeness, or images passed off as photographs of real events",
      "Commercially usable assets on the free plan — the licence simply isn't there",
      "Trademark-adjacent work: asking for a logo \"like\" a famous brand's gets you legal exposure, not a shortcut",
      "Precise technical diagrams where every measurement must be correct",
    ],
  },

  starterActions: [
    {
      title: "Make a logo mark you can actually use",
      whatItDoes:
        "Generates a simple, symbolic logo as editable vector shapes rather than a flat picture.",
      prompt:
        "A minimalist logo mark for a coffee roastery, a single coffee bean formed from two curved leaf shapes, flat vector, two colours, deep brown and warm cream, clean geometry, no text, generous negative space, centred on a white background",
      whyHere:
        "This is Recraft's core trick. The result comes out as vector shapes you export as SVG and open in Figma or Illustrator, so you can recolour it, resize it to a 32-pixel favicon, and hand it to a printer at any size. Most generators would give you a picture of a logo that someone still has to redraw.",
      tweak:
        "Swap \"two colours\" for \"single colour, black\" — one-colour marks are the real test of a logo, and they're what you'll need for stamps, embroidery and dark backgrounds.",
    },
    {
      title: "Build a matching icon set",
      whatItDoes: "Produces several icons that look like they came from the same designer.",
      prompt:
        "A set of interface icons in one consistent style, line art with rounded corners and uniform two-pixel stroke weight, single accent colour on transparent background, depicting a calendar, an envelope, a bar chart, and a padlock",
      whyHere:
        "Consistency is the thing Recraft sells and it's the thing beginners underestimate. Generate the set, pick the one you like most, then save its look as a custom style and generate the rest against it — that's how you get icon eleven to match icon one instead of drifting.",
      tweak:
        "Generate the first icon, save it as a custom style, then request each remaining icon one at a time under that style. Slower, noticeably more consistent.",
    },
    {
      title: "Rescue a low-resolution image by vectorising it",
      whatItDoes:
        "Converts a pixel image you already have into scalable, recolourable vector shapes.",
      prompt:
        "(No prompt needed — upload the image, then use the vectorise action on the canvas.)",
      whyHere:
        "Recraft has a dedicated vectorise function and a vector editor built into the same canvas, so you can clean up the traced result without exporting to another program. Useful for an old logo that only survives as a small blurry PNG.",
      tweak:
        "Vectorise works best on flat, high-contrast artwork. On a photograph it produces an interesting poster effect rather than a usable trace — worth trying once so you can see the difference for yourself.",
    },
    {
      title: "Design a poster with legible text on it",
      whatItDoes:
        "Generates a complete composition with a short headline rendered as part of the image.",
      prompt:
        "A bold event poster for a Saturday farmers market, flat illustration of vegetables in a woven basket, warm autumn palette, large clear headline text reading FRESH SATURDAY, small subtitle reading 9AM TO 2PM, generous margins, portrait orientation",
      whyHere:
        "Text-in-image is where many generators produce convincing gibberish. Recraft handles short phrases well and, because the output can be vector, the type stays crisp when you scale the poster up for print.",
      tweak:
        "Keep headlines to two or three words in capitals. If a word comes out misspelled, regenerate rather than trying to describe the fix — it's faster.",
    },
    {
      title: "Create a seamless background pattern",
      whatItDoes:
        "Generates a tile that repeats without visible seams, for web backgrounds, packaging or fabric.",
      prompt:
        "A seamless repeating pattern of small hand-drawn botanical sprigs, sage green on an off-white ground, even spacing, subtle, suitable for a product packaging background",
      whyHere:
        "Recraft has a dedicated seamless-pattern mode, so the tile genuinely joins edge to edge instead of merely looking like a pattern. As a vector, it scales to any surface size without going fuzzy.",
      tweak:
        "Add \"sparse\" or \"dense\" to control how busy it feels. Sparse patterns are far more forgiving behind text.",
    },
  ],

  pitfalls: [
    "**The free plan is a demo, not a supply of assets.** People generate a logo they love, put it on a real product, and only later read that free-plan images are owned by Recraft and publicly visible. If the work matters, subscribe before you generate it — rights attach to what you make while subscribed, not to what you made earlier.",
    "**Vector is a mode, not a magic setting.** If you generate in raster and then expect an SVG, you'll get a traced approximation rather than clean shapes. Choose the vector model or style up front when the output needs to scale.",
    "**Credits vanish faster than you plan for.** Vector generations cost several times a basic image, and the pro-quality vector models cost several times that again. Do your exploring with cheap raster drafts, then spend the vector credits once you know the composition you want.",
    "**Style consistency requires you to set a style.** Repeating the same descriptive words in every prompt gets you close but drifts. Building a custom style from your best result and generating everything under it is the actual mechanism, and it's the feature most beginners never touch.",
    "**Prompting for a specific brand's look is a trap.** \"In the style of\" a famous logo produces something close enough to cause a problem and not close enough to be worth it. Describe the qualities you want — geometric, hand-drawn, single-weight line — not the brand.",
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
