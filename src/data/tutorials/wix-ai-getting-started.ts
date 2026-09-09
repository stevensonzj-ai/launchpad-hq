import type { PlatformTutorialData } from "./types";

export const wixAiTutorial: PlatformTutorialData = {
  slug: "wix-ai-getting-started",
  platformSlug: "wix-ai",
  title: "Getting Started with Wix AI",
  tagline:
    "Describe your business, watch a website appear, then argue with it until it's yours.",
  archetype: "recipes",
  lastReviewedAt: "2026-09-09",
  accessTier: "FREE",

  howItWorks:
    "You type a description of your business into a box on Wix's site. A whole site appears while you watch — pages, layout, wording, placeholder pictures. From there you either drag things around by hand or type another request into a chat panel and watch the page change. You repeat that until it looks right, then publish.",

  whatItIs: [
    "**Wix AI** is a label, not a product — Wix sells nothing under that exact name. What it covers is a cluster of AI features inside the Wix website builder: a generator that builds a whole site from a paragraph you write, an assistant called **Aria** that redesigns pages and rewrites copy when you ask it to in a chat panel, a separate assistant called **Astro** that runs your business dashboard by chat, and image and visitor-chat tools scattered through the editor.",
    "The comparison most people are actually making is Wix against Squarespace, and the difference is money. Squarespace has no free plan — every site starts on a 14-day trial, so the meter runs from the first day. Wix keeps a free tier that doesn't expire, so paying is an upgrade rather than the price of being online at all.",
    "The other difference is control. Wix lets you drag any element anywhere on the page; Squarespace holds you to its layout structure. That's more freedom and more rope — which is why a bad Wix site looks worse than a bad Squarespace site, and a specific Wix site can look like nothing else.",
  ],

  beforeYouStart: [
    "**You can build and publish a Wix site without paying anything, and there is no card at signup.** A free site lives at an address like `yourname.wixsite.com/yoursite`, carries a Wix ad banner across the top and a Wix icon in the browser tab, and comes with 500MB of storage and a 1GB traffic allowance. Paying is what buys your own domain name and removes that branding — currently around $18 a month on the cheapest Light plan billed annually, with the ability to take card payments on your site starting one tier up on Core, around $30. Wix says prices differ by country, so check what yours shows.",
    "Most of the AI is free to use as much as you like: Wix states plainly that chatting with Aria costs nothing and does not consume **AI credits** (the platform's unit of spend — each thing you make costs some). Credits cover the heavier tools instead — the visitor chat, the marketing and phone agents, the Wixel design app — and a free account currently gets up to 30 credits a day, capped at 120 in a month. Premium plans include a monthly allowance that resets.",
    "Wix has more than one editor, and which one you land in decides which AI you get. Aria lives in the newer **Wix Harmony** editor; the classic Wix Editor has AI tools behind an icon but no free-flowing chat, and there is a third, newer entry point called Wix Vibe with its own limits. Wix's docs don't say which one a brand-new signup gets today, so look at what's on your screen before following any tutorial.",
    "If you meet Wix ADI in an old article, it's gone. Wix stopped supporting sites built with it on 10 November 2024; surviving ADI sites now open in the Wix Editor, and Wix names the AI Website Builder as its replacement.",
  ],

  security: [
    {
      kind: "text",
      text: "Wix's own generative AI policy says it develops, improves and trains its software tools — including its AI systems — on data collected since the company started, and it names user-generated content such as images and page layouts among those sources, under the licence you grant in the Terms of Use. That is Wix stating it in its own help centre, not an inference.",
    },
    {
      kind: "list",
      label: "Three Wix-specific things to weigh:",
      items: [
        "**Your requests leave Wix.** Wix publishes the list of outside AI companies behind its features — currently around fourteen, including Anthropic, OpenAI, Google, Meta, Microsoft Azure AI Services, ElevenLabs and Stability AI — and tells you to read their policies yourself before using its AI features.",
        "**Wix singles one out.** On that same page it says users should not input their personal information when using Stability. Treat that as the floor rather than the ceiling: it's the only tool Wix names, not necessarily the only one worth caution.",
        "**Whatever the AI wrote, you published it.** Wix's own risk page says AI-generated content is not guaranteed to be accurate, may resemble other companies' copyrighted material or trademarks, and may even contain other people's personal information — and that you remain responsible for the content on your site.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Getting from nothing to a live, presentable multi-page site in an afternoon, with your own wording and pictures already in place rather than filler.",
      "Editing by conversation — asking for a different colour palette, a shorter About page or a whole new section and watching it happen, instead of hunting for the setting that does it.",
      "Small local businesses whose site needs to take a booking, show a service list and carry a contact form more than it needs to be beautiful.",
    ],
    okayAt: [
      "Selling online. It works, but not on the cheapest paid tier — budget for Core before you build a shop.",
      "Mobile layout. Wix says Aria only appears while you're editing the desktop view; switch to the mobile view and the chat panel goes away.",
    ],
    avoid: [
      "Anything you might later want to move to another host. Wix's help centre says a Wix site 'needs to be hosted and operated on Wix's servers' and that its architecture doesn't support external hosting. You can point your own domain at it; that is the extent of the portability.",
      "Committing to a template you're unsure about. Wix states you can't switch an existing site to a different template — the official route is to build a second site and copy your pages, media and plan across to it.",
      "Starting in Harmony if you may want a different Wix editor later. Wix says a site created in the Harmony editor cannot be transferred to the Wix Editor or the Studio Editor afterwards, and existing Wix Editor sites cannot be migrated into Harmony.",
    ],
  },

  starterActions: [
    {
      title: "When you don't know what the site should say yet",
      whatItDoes:
        "Type one messy paragraph about the business → Wix generates the pages, layout, colours and starter wording for you to react to.",
      whyHere:
        "Reacting to a wrong draft beats staring at a blank page, and Wix makes the draft genuinely free: you can throw the whole site away, describe it differently and generate again as many times as you like — on a free account that costs nothing but your afternoon.",
      tweak:
        "Wix's own instructions invite you to edit its suggested description before generating, and to add 'preferred colors, style, or anything important to you'. Put your one non-negotiable in there rather than fixing it afterwards.",
    },
    {
      title: "When the site exists but the wording sounds like nobody",
      whatItDoes:
        "Select a block of text → use Ask Aria on the action bar to shorten it, simplify the language, or change the tone.",
      whyHere:
        "Rewriting is on the free side of Wix's meter, so you can rework the same paragraph twenty times without spending anything countable.",
      tweak:
        "Start with the About page. Wix names About pages among the things its AI drafts for you, and invented biography is the fastest way to lose a visitor who was otherwise ready to call you.",
    },
    {
      title: "When you need a picture and the stock photo is obviously a stock photo",
      whatItDoes:
        "Open the Media panel → Photo Studio → Create AI Images → describe the shot, pick a style, save it to your site.",
      whyHere:
        "It lands in your site's own media library rather than your downloads folder, so it's already where the page can use it. Know the meter first: Wix caps this at 1,000 generated images per user — a lifetime ceiling, not a monthly one — and says every generation counts against it even if you never save the image.",
      tweak:
        "Because throwaways still count, write the description you actually want before pressing generate, rather than fishing with one-word attempts.",
    },
    {
      title: "When visitors ask the same question at eleven at night",
      whatItDoes:
        "Switch on Wix Smart Chat (formerly AI Site Chat) → it answers visitors from what's on your site while you're asleep.",
      whyHere:
        "This is the one Wix AI feature that runs when you aren't there, and the one that spends the credit allowance described above rather than being free. Wix says that when the credits run out the chat drops to offline mode instead of continuing to answer — the safer failure of the two.",
      tweak:
        "Decide what happens at zero before you switch it on. Wix says you can configure an offline setting or hand conversations back to manual chat.",
    },
    {
      title: "When you're running the business rather than building the site",
      whatItDoes:
        "Open Astro from your Wix dashboard → ask it about the site in plain English instead of navigating menus.",
      whyHere:
        "Astro is the half of Wix's AI that isn't about design at all. Wix's launch announcement describes tracking site performance, analysing visitor behaviour and generating reports, drafting blog posts and marketing emails, and even managing collaborator roles and permissions — all by chat, in the dashboard, not the editor.",
      tweak:
        "Ask it a question before you ask it to change anything — 'how did the site do last month' — so you can see whether its answer matches what you already know.",
    },
  ],

  pitfalls: [
    "**The free site announces itself.** Perfectly fine for a hobby page — check how the ad banner actually looks on a phone before you send the link to a customer.",
    "**The mobile view is the part you build by hand.** The generator works desktop-first and Aria doesn't follow you into the phone view — which is the version most of your visitors will see.",
    "**Free storage and traffic run out quietly.** The allowance goes further on a text page than on a site full of AI-generated photos, which are full-size images.",
    "**The meters differ between surfaces.** Wix Vibe gives a free site 6 chat requests a day and a paid site 50, with nothing rolling over to the next day — a different meter from the AI credits elsewhere in the product.",
  ],

  whereToNext: [
    { label: "More AI built into business software", categorySlug: "ai-plugins-business-software" },
    { label: "Marketing, sales and SEO tools", categorySlug: "sales-marketing-seo-ai" },
    { label: "Image generation and editing", categorySlug: "image-generation-editing" },
  ],
};
