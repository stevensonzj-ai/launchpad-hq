import type { PlatformTutorialData } from "./types";

export const ludoAiTutorial: PlatformTutorialData = {
  slug: "ludo-ai-getting-started",
  platformSlug: "ludo-ai",
  title: "Getting Started with Ludo.ai",
  tagline:
    "Turn a rough game idea into concepts, characters and animated art — a tool built only for making games.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-12",
  changelogUrl: "https://ludo.ai/whats-new",
  accessTier: "FREE",

  howItWorks:
    "You type a description of the game you have in mind into a box, and Ludo sends back concept cards — a title, a short pitch, and a piece of art beside each one. You keep the ones you like, ask for variations, and turn a favourite into a project you then add art, sound and animation to.",

  whatItIs: [
    "Ludo.ai is an AI tool made for one job: the planning stage of a video game, before anyone writes code. It generates game ideas, drafts the written design document that goes with them, and makes the art, sound, animation and 3D models the game would need.",
    "The reason to reach for it rather than a general chatbot or art generator is that everything it produces comes out shaped for a game. Characters arrive as **sprites** — a sprite is a single character or object image that the game draws on screen — cut out on a clear background, ready to drop into the program you build the game in.",
    "One thing to be clear about before you sign up, because the marketing can read otherwise: it does not build a playable game. Ludo's own FAQ asks \"Does Ludo.ai create playable games or prototypes?\" and answers \"No, it does not.\" It takes you to the point where a game could be built, and stops there.",
  ],

  beforeYouStart: [
    "**There is no free tier here — there is a one-off trial, and it is small.** You get **30 credits** (the platform's unit of spend — each thing you make costs some) when you create an account, no card asked for, and Ludo's own documentation puts 30 credits at \"roughly sixty images, or seven four-second sprite animations on the default model, or ten 3D models.\" Ludo's docs call it a free trial; its FAQ calls it the free plan; the pricing comparison table has no free column at all, and none of the three says the 30 credits come back. Assume they don't. Start at ludo.ai and spend a few credits on ideas and images before anything expensive.",
    "Producing an actual set of characters means paying. The entry plan (Indie) is currently around $20 a month, or about $15 a month if you pay for a year up front, and carries roughly 250 credits a month — granted as 3,000 up front on the annual plan, with unused credits rolling over while the subscription is active. The next tier up (Pro) is currently around $50 a month, or about $35 a month paid annually.",
    "Anything you download on the free account is stamped. Ludo's FAQ and its sprite documentation both say sprite sheet downloads on the free plan carry a Ludo watermark on every single frame, and that subscribing to any paid plan removes it — the FAQ says without needing to generate the art again. So the trial is for deciding, not for producing.",
    "You have to be an adult. The Terms of Service and End User Licence Agreement in force today (Jet Play, Inc., dated 26 August 2026) states plainly: \"You must be at least 18 years of age to use the Service.\"",
    "It works in English. Ludo says its interface and the content it generates are in English, with parts of the website and several tool guides also available in German, Spanish, Korean, Portuguese and Chinese. No vendor page states a regional restriction — though not saying so is not the same as confirming it is available everywhere.",
  ],

  security: [
    {
      kind: "text",
      text: "Ludo.ai runs in the cloud, so what you type reaches its servers. The question that actually matters for a game project is a different one: who owns what comes out. On that, Ludo's friendly pages and its binding contract do not say the same thing.",
    },
    {
      kind: "list",
      label: "What the two documents actually say",
      items: [
        "Ludo's FAQ says: \"The individual who initiates the generation of content using the AI platform is recognized as the full owner of that content,\" with the freedom to use, share or monetise it.",
        "The Terms of Service and End User Licence Agreement (Jet Play, Inc., 26 August 2026) instead grants you \"a nonexclusive worldwide license and right to use, modify, distribute and create derivative works of the Materials,\" for personal and commercial purposes. Commercial use is clearly permitted — but a non-exclusive licence is a permission, not ownership, and it does not stop similar output reaching someone else.",
        "The same terms have you grant Jet Play \"a perpetual, worldwide, non-exclusive, royalty-free, sublicenseable and transferable license\" over what you submit to the service.",
      ],
    },
    {
      kind: "text",
      text: "Where a company's terms and its help pages disagree, the terms are the document that binds. Commercial use is explicitly allowed either way — but if you need something to be exclusively yours, read the licence rather than the FAQ and take the narrower of the two.",
    },
    {
      kind: "text",
      text: "On training: Jet Play's privacy policy, last updated 10 March 2025, says \"We do not use your game concepts, designs, or other content to train AI models that would make your creative work accessible to others.\" Read the ending carefully — it is a promise about your work not surfacing for other people, which is narrower than a promise never to train on it.",
    },
  ],

  triad: {
    bestAt: [
      "Getting from a vague itch to a screenful of concrete game concepts, each with a genre, platform, art style and camera angle attached",
      "Art in the shapes a game needs — sprite animations export as a PNG sheet, a sheet plus a JSON file describing where each frame sits, a GIF, a ZIP of frames or an MP4; 3D models as GLB with textures and skeleton, or plain mesh files",
      "Grounding an idea in what is really selling, through its Top Charts view",
      "Holding one project together — concept, art, audio and 3D in one workspace",
    ],
    okayAt: [
      "Writing — the design document it drafts is a good scaffold with the sections named for you, but the prose inside is generic and you will rewrite most of it",
      "Keeping a set of characters looking alike — Ludo's advice is to pin an art style filter, reuse the same phrases and supply reference images every time, which is discipline on your part",
      "Longer animation — Ludo's documentation warns that frame counts of 49 and above are \"more prone to looping issues,\" and that its Transfer Motion mode caps sprite sheets at 36 frames",
    ],
    avoid: [
      "Treating the charts as a reason to build something — Top Charts cannot tell you why those games sell or whether a newcomer has a route in, and a chart of incumbents is the easiest thing in the world to mistake for a market gap",
      "Using it as evidence that your idea is original — its ideation blends one to three games you pick from a chart, so \"new\" means recombined from existing titles",
      "General-purpose work — every surface is game-shaped, so a non-game task gets a game-flavoured answer and still charges you for it",
    ],
  },

  starterActions: [
    {
      title: "Describe the game you half-have in mind",
      prompt:
        "A cosy farming game set on an abandoned space station, where the crops are alien and slightly dangerous. Mobile, top-down, pixel art.",
      whyHere:
        "Ludo's idea box sits above a filter panel — platform, genre, art style and camera angle are chips you tick, so they get applied rather than interpreted, and every concept comes back with art beside it and a button that turns it into a project. That is how Ludo's documentation describes the screen; we could not watch it operate without an account.",
      tweak:
        "You can leave the box empty and set only the filters — Ludo's documentation says it will generate open-ended from those alone. Its guidance is to start with two or three inputs, because \"too many inputs dilute the result.\"",
    },
    {
      title: "Make a character you can actually use",
      prompt:
        "A stout mushroom-person merchant with a woven backpack and a lopsided hat, facing the camera, full body, cel-shaded.",
      whyHere:
        "Ludo's sprite documentation tells you to describe only what the character looks like and leave movement out — motion is a separate step with a library of animation presets. Midjourney will happily draw you a mushroom merchant, but it has no idea it is making a game character, so you get a picture rather than something already cut out on a clear background.",
      tweak:
        "Pick the art style from Ludo's style list instead of writing it into the sentence, then reuse that exact setting for every character.",
    },
    {
      title: "Turn the idea into a written plan",
      prompt:
        "Mushroom merchants trade rare spores between floating islands. The player runs a market stall, sets prices, and works out which spores each island secretly wants. Mobile, top-down, cel-shaded.",
      whyHere:
        "Two sentences produce a document already broken into the sections a game design plan needs — gameplay, the game world, art and mockups — with a version history and an assistant that can see whichever section you are editing. A first-time designer's real problem is not knowing what a design document should contain.",
      tweak:
        "If you already have notes, you don't have to start from a sentence — Ludo's documentation says you can import an existing PDF design document and have it build the project from that.",
    },
    {
      title: "Read the charts before you commit",
      whatItDoes:
        "Pick a store — App Store, Google Play or Steam — then a country and a genre, and read three live rankings: Top Free, Top Paid, and Top Grossing, which counts in-app spending rather than downloads. Ludo says the data is refreshed daily. Click the lightbulb icon on one to three games and press Start New Generation, and the idea panel builds fresh concepts out of that combination.",
      whyHere:
        "This is the one part of Ludo that generates nothing — it reads live store charts, filtered by country and genre, which no chatbot can do for you. No vendor page states which plans include it, and it appears nowhere in Ludo's credit-cost table, so we cannot tell you whether it spends from your trial.",
      tweak:
        "Change only the country and watch the same genre rearrange itself.",
    },
    {
      title: "Ask it the question you'd ask a designer friend",
      prompt:
        "I want a reason for players to come back to my mushroom merchant game every day that isn't an energy timer. Give me five options, and say which is cheapest to build.",
      whyHere:
        "Opened inside a project, Ludo's assistant can see that project's sections, so \"my game\" means the document you already wrote. It is metered: each message costs a fixed amount of credits, more per image or asset it produces, capped at three images per request.",
      tweak:
        "It will also answer questions about the tool itself — \"What is the Game Ideator and how do I use it?\" is one of Ludo's own documented examples — a cheaper way to learn the interface than clicking through it.",
    },
  ],

  pitfalls: [
    "Spending your 30 trial credits in the wrong order. Images are the cheapest thing the tool makes; video and sprite animation are billed by the second, with a minimum charge per animation. Ideas and images first, motion last.",
    "Buying the entry plan because you saw the word unlimited. Ludo's own plan comparison lists unlimited ideation, game concept and image generation against Pro and Studio — not against Indie, where the docs say everything draws on one shared pool of credits. The same table gives Indie five active projects where Pro is unlimited, and one generation running at a time where Pro gets two and Studio five.",
    "Re-rolling when you should be editing. Every generation returns two results by default, and the tool's real strength is the editing modes that come after — edit the image, mask off one region, generate from a reference, remove the background.",
  ],

  whereToNext: [
    { label: "Gaming & Creative AI", categorySlug: "gaming-creative-ai" },
    { label: "Image Generation & Editing", categorySlug: "image-generation-editing" },
    { label: "AI Coding & Development", categorySlug: "ai-coding-development" },
  ],
};
