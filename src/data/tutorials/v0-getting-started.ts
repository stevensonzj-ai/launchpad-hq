import type { PlatformTutorialData } from "./types";

export const v0Tutorial: PlatformTutorialData = {
  slug: "v0-getting-started",
  platformSlug: "v0",
  title: "Getting Started with v0",
  tagline:
    "Describe an app in plain language; Vercel's v0 builds it, runs it, and puts it online.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-09",
  changelogUrl: "https://v0.app/changelog",
  accessTier: "FREE",

  howItWorks:
    "You type a description of the app or page you want. v0 works on it and shows a live, clickable version next to your message. You can click something in that preview and say what to change, or look at the code behind it. You keep replying until it's right, then publish it to a live web address.",

  whatItIs: [
    "v0 is Vercel's app builder: you describe a website or app in ordinary language and it writes the working code.",
    "It began as a tool that produced single pieces of interface. Since August 2025 Vercel has positioned it as something that builds the whole thing — the pages people see and the machinery behind them.",
    "What comes back is real code, not a picture of a design. You can send it to GitHub, where developers keep and track their code, or export it and carry on somewhere else.",
    "Vercel's terms assign you its rights in that code, which is why v0 sits closer to the start of a real project than to a demo you throw away.",
  ],

  beforeYouStart: [
    "v0 lives at v0.app; the older v0.dev address redirects there. Signing in uses a Vercel account. The free plan is listed at $0 a month, though no public page says whether a card is requested during sign-up — worth watching for at that step.",
    "**The free plan's shape is the thing to understand before you start: currently around $5 of credits a month (credits are the platform's unit of spend — each thing you make costs some) and a cap of 7 messages a day.** A single small project usually takes more than seven rounds of \"no, change that,\" so plan on spreading work across days, or on paying.",
    "How fast credits drain depends on which **model** (the AI \"brain\" doing the work) handled the message. v0 publishes four model tiers whose rates differ by more than twentyfold. v0's pricing docs say unused monthly credits roll over and expire after 65 days; when the balance reaches zero, generation stops.",
    "Paid plans currently start at $30 per user per month, which raises the monthly credit allowance to $30, adds $2 of free credits on each day you log in, and opens access to all models. v0's own FAQ also lists an older $20 Premium plan it describes as being sunsetted — don't plan around it.",
    "You don't need to know how to code to get something running. What you do need is patience for the moment something breaks and the fix isn't obvious — the code is real, and real code has real bugs.",
  ],

  security: [
    {
      kind: "text",
      text: "Vercel's AI Policy says user input, prompt content, queries and other interactions \"may be used by Vercel... to improve our AI Products.\" Which way the default falls depends on your plan: the policy excludes Enterprise customers outright, and v0's pricing page lists \"Training opt-out by default\" as a **Business**-plan feature — which is a plain admission that the cheaper tiers are not opted out for you. The policy says you can change the setting yourself in Team Settings.",
    },
    {
      kind: "list",
      label: "Check who can see a chat before you paste anything into it",
      items: [
        "v0's sharing docs list four levels: private, everyone on your team, anyone with the link (\"not be indexed by search engines\"), and anyone on the web — which the docs say \"may be indexed by search engines and appear in public galleries.\"",
        "The docs don't say which level a new chat starts on, and that can't be confirmed without an account. Open the sharing control on your first chat and look, rather than assuming.",
        "Inviting named individuals is described as a Plus, Business or Enterprise feature, so on the free plan sharing is a link, not a guest list.",
      ],
    },
    {
      kind: "text",
      text: "One trap specific to what v0 builds: anything you store in a setting whose name begins with `NEXT_PUBLIC_` is sent to every visitor's browser. v0's security docs say it analyses your project and warns you about this, but the warning is a safety net rather than the rule — keep passwords and any key that spends money out of those.",
    },
  ],

  triad: {
    bestAt: [
      "Getting a working, clickable version of an idea in front of people fast — you send a link instead of describing what you mean.",
      "The common furniture of the web: dashboards, landing pages, forms, sign-up flows, admin tables.",
      "Starting from a picture. v0's docs describe generating interfaces from wireframes or mockups you upload, and its July 2026 changelog adds reading a Figma file directly.",
      "Handing work to a developer later, rather than dead-ending in the chat.",
    ],
    okayAt: [
      "Sustained work on one project. It will keep going; the free plan's daily message cap is what limits the pace.",
      "Exact visual design. It produces a competent, recognisable house style, and pulling it onto an exact brand takes real fighting.",
      "The machinery behind the pages. The docs describe connecting data and services, but it is the part where someone who doesn't code is most likely to get stuck when it misbehaves.",
    ],
    avoid: [
      "Assuming what you get is yours alone. Vercel's AI Product Terms warn that the output \"may not be unique\" and that other users may receive \"the same or similar Output.\"",
      "Putting generated code in front of real users unreviewed. Vercel's own policy says code output \"should be paired with human review, where applicable, to ensure suitability for any commercial use.\"",
      "Learning to code from it. It writes the code for you; watching that happen is not the same as being able to repair it.",
    ],
  },

  starterActions: [
    {
      title: "Get a link on day one",
      whatItDoes:
        "Builds a small single-page site and puts it at a live address you can send to someone.",
      whyHere:
        "v0 is made by the company that runs the hosting, so putting the result online is a control in the chat header rather than an export-and-upload errand — and v0's pricing page lists deploying to Vercel on the free plan.",
      tweak:
        "Swap in your own business, but keep the last sentence — it is how you find the publish control without hunting for it.",
      prompt:
        "Build a one-page site for a dog-walking business called Trot. Include a short intro, three service cards with prices, a strip of photo placeholders, and a contact form that shows a thank-you message when it is submitted. Make it work properly on a phone. When it's done, tell me exactly what to click to put it online.",
    },
    {
      title: "Fix it by pointing, not describing",
      whatItDoes: "Makes a small visual change without rebuilding the whole page.",
      whyHere:
        "v0's quickstart tells you to open Design mode and select elements in the preview to tweak their styles visually or in words — and v0's pricing page lists Design mode on the free plan, where spending one of the day's messages to nudge a margin is a bad trade.",
      tweak:
        "Name the section and the exact change. Vague instructions like \"make it nicer\" are what burns a message.",
      prompt:
        "The pricing section feels cramped and the middle card should stand out. Increase the space between the cards, make the middle one slightly wider with a subtle border, and change the section heading to Simple pricing. Leave everything else exactly as it is.",
    },
    {
      title: "Make it tell you the plan first",
      whatItDoes:
        "Gets a short written plan you can correct before a single line of code is generated.",
      whyHere:
        "Every generation draws on the same daily message cap and monthly credit balance described above, so with v0 the cheapest fix is the build that never happens — and a wrong build on an expensive model costs several right ones on a cheap one.",
      tweak: "Ask for five bullets instead of three for anything with more than one screen.",
      prompt:
        "Before you build anything, tell me in three bullets what you are going to make and what you are assuming about it. Then stop and wait for me to say go.",
    },
    {
      title: "Hand it over without a rewrite",
      whatItDoes:
        "Moves the code out of the chat into the place developers work, and gets a plain-language map of it.",
      whyHere:
        "v0's FAQ describes a bi-directional GitHub integration — changes made locally sync back into v0 — so the handoff is not a one-way export that strands the conversation that produced it.",
      tweak:
        "No GitHub account? Ask it to export the code instead, and to say where the download lands and what to do with it.",
      prompt:
        "Connect this project to GitHub. Then summarise for me in plain language what files you created, what each one is responsible for, and which one I would open first if I wanted to change the wording on the homepage.",
    },
    {
      title: "Ask it to break its own work",
      whatItDoes:
        "Sends v0 through the site it just built, looking for what a real visitor would trip over.",
      whyHere:
        "Vercel's launch post says v0 can search the web, read files and inspect a live site, so \"go and look at the page you just made\" is a described capability rather than the model recalling what it intended to build.",
      tweak:
        "Swap in a specific visitor: someone using a screen reader, someone on a bad connection, someone who has never bought anything online.",
      prompt:
        "Act as a first-time visitor using a slow phone. Walk through this page and list every place it could confuse someone, break, or fail silently. Then fix only the top three problems and tell me plainly what you changed.",
    },
  ],

  pitfalls: [
    "The free plan's daily message cap counts your corrections, not your projects — so write longer, more complete messages here than you would to a chatbot.",
    "Messages and credits are two separate caps: running out of the day's messages does not release your remaining credits, and having credits left does not buy you another message.",
    "Publishing is not testing. Getting a production address takes seconds, which makes it easy to send someone a link to something you have looked at but never actually used.",
    "Changes ripple. Because a message rebuilds rather than edits a single line, say what should stay exactly as it is, not only what should change.",
    "v0's pricing page lists access to all models as a paid feature, so if the model choice looks thin on the free plan, that is the plan rather than a fault.",
  ],

  whereToNext: [
    { label: "Other AI coding tools", categorySlug: "ai-coding-development" },
    { label: "Chat assistants", categorySlug: "text-conversational-ai" },
    { label: "Developer APIs and services", categorySlug: "ai-apis-developer-services" },
  ],
};
