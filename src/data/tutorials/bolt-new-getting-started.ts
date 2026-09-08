import type { PlatformTutorialData } from "./types";

export const boltNewTutorial: PlatformTutorialData = {
  slug: "bolt-new-getting-started",
  platformSlug: "bolt-new",
  title: "Getting Started with Bolt.new",
  tagline:
    "Describe an app in plain English and watch it get built in a browser tab — on a free plan with rules.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-08",
  changelogUrl: "https://support.bolt.new/release-notes",
  accessTier: "FREE",

  howItWorks:
    "You open bolt.new in a browser and type what you want built, in ordinary sentences. Bolt writes the app and a working version appears in a preview panel beside the chat a few minutes later. From there you keep talking to it — describe a change, or click the thing on screen you want different — and it rebuilds in place.",

  whatItIs: [
    "Bolt is an AI app builder from StackBlitz: you describe a website or web app in plain language and it writes the whole thing — the screens people see and the storage behind them — and puts it on a live web address.",
    "Nothing is installed: it builds and previews your project inside your own browser tab rather than on a distant server, so a Chromebook is enough.",
    "Your allowance is measured in **tokens** (a chunk of text, roughly a short word — how AI usage gets counted), and Bolt's documentation says most of yours goes on Bolt reading and syncing your project files. So the same request costs more in week three than on day one: there is more project to read.",
    "It builds in JavaScript, the language of the web; back ends written in Python or PHP are not supported.",
  ],

  beforeYouStart: [
    "Free, and no card: sign in with Google, GitHub or email. The free plan gives 300,000 tokens a day under a ceiling of 1 million a month, and unused daily tokens never carry over.",
    "That is enough for one small app and a few rounds of changes, not a full day of building.",
    "Pro currently runs about $25 a month for roughly 10 million tokens, with no daily cap and unused tokens rolling over. Bolt states that subscriptions are non-refundable, so do your deciding on the free plan.",
    "Publishing is included, but free hosting is capped at what Bolt estimates as 10,000–15,000 visits a month, and free sites carry a \"Made in Bolt\" badge. Past the cap the site goes offline until the month resets.",
  ],

  security: [
    {
      kind: "text",
      text: "Bolt's privacy policy (updated May 2026) says StackBlitz may use what you type and what the AI writes to improve the service, on anonymised data, and sends portions of any files you attach to outside AI providers. Its own instruction is the plainest summary: \"Do not include secrets, API keys, passwords, or confidential information in prompts, source code.\"",
    },
    {
      kind: "list",
      label: "Before anyone else uses what you built",
      items: [
        "An app the AI wrote is not an app anyone has checked. Bolt ships a security audit for exactly this — the full project audit is on paid plans, the database check is on every plan.",
        "Run it from Bolt's own button rather than asking for it in the chat: Bolt notes that a chat-requested audit decreases your token balance.",
      ],
    },
    {
      kind: "text",
      text: "Ownership is refreshingly plain: Bolt's documentation states that all code you create with Bolt and StackBlitz is your own, usable for any legal purpose including commercial ones.",
    },
  ],

  triad: {
    bestAt: [
      "One sentence to a clickable, working web app in a sitting",
      "Small tools that store things — trackers, booking pages, internal lists",
      "Changing wording and look by clicking the preview, not describing it",
      "A shareable web address with no hosting settings to touch",
    ],
    okayAt: [
      "Phone apps — built through Expo, but a store listing needs paid Apple and Google developer accounts",
      "Long-lived projects, where each message costs more as the project grows",
      "Predicting spend: building and site traffic are metered separately",
    ],
    avoid: [
      "Anything needing a Python or PHP back end — Bolt only builds JavaScript ones, so that project can't be done here at all",
      "Real customer data before a security audit, whose full-project form means a paid plan",
      "Subscribing in order to try it: Bolt states subscriptions are non-refundable",
    ],
  },

  starterActions: [
    {
      title: "Build one small, whole thing first",
      prompt:
        "Build a simple reading log: one page where I can add a book, mark it reading or finished, rate it out of five, and see what I finished this month.",
      whyHere:
        "Bolt spends tokens reading and syncing your project files, so the first build on an empty project is the cheapest one you will ever run. Something small but complete leaves most of the day's 300,000 tokens for changes.",
      tweak: "Keep version one to a single screen.",
    },
    {
      title: "Stack up the cosmetic changes, then save once",
      whatItDoes:
        "Lets you point at things in the preview and change their text, colour, size and spacing.",
      whyHere:
        "Bolt's documentation is specific: visual edits are free to make, and tokens are spent only when you save. Ten fixes made in one pass and saved together are charged once, not ten times.",
      tweak: "Finish the whole wording-and-colour pass before pressing save.",
    },
    {
      title: "Keep working after the daily limit",
      prompt: "Show me the code for the page I just built.",
      whyHere:
        "Bolt's tokens page says that once the day's limit is gone you can still edit your project's existing code in Code view, which doesn't use tokens — so a typo or a wrong colour is fixable at 4pm.",
      tweak: "Code view is read-only in Safari; edit in a Chrome-family browser.",
    },
  ],

  pitfalls: [
    "The daily and monthly limits are separate, and neither banks: a few heavy days can end your month early even if the rest of it was light.",
    "Clicking \"Attempt fix\" over and over. Bolt warns against this by name, and each attempt spends tokens; rolling back through version history costs nothing.",
    "Asking in the chat for something that has a button — a chat-requested security audit spends tokens, the button's version doesn't.",
  ],

  whereToNext: [
    { label: "AI Coding & Development", categorySlug: "ai-coding-development" },
    { label: "Workflow & Automation", categorySlug: "workflow-automation" },
    { label: "AI Chatbots & Assistants", categorySlug: "text-conversational-ai" },
  ],
};
