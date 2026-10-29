import type { PlatformTutorialData } from "./types";

export const activepiecesTutorial: PlatformTutorialData = {
  slug: "activepieces-getting-started",
  platformSlug: "activepieces",
  title: "Getting Started with Activepieces",
  tagline:
    "Automation built from public code — around 760 integrations anyone can read, and a free cloud allowance that resets every morning.",
  archetype: "recipes",
  lastReviewedAt: "2026-10-29",
  changelogUrl: "https://github.com/activepieces/activepieces/releases",
  accessTier: "FREE",

  howItWorks:
    "You work on a canvas in your browser. You pick a **trigger** — the \"when,\" the event that starts an automation, like a form being filled in — then add steps under it, choosing an app and what it should do. You run the whole thing once with real data and read what each step received before switching it on.",

  whatItIs: [
    "An automation tool: you build flows that connect apps you already use — Gmail, Slack, Sheets, Notion and around 760 others. Activepieces calls each of those integrations a **piece**, and the code for every one of them is published for anyone to read.",
    "The thing that separates it from Zapier or Make is its licence. The main body of Activepieces is released under the MIT licence, about as permissive as software gets: you may run it, change it and build on it. One \"enterprise\" folder inside the same code is carved out of that and governed by a commercial licence instead. So self-hosting it (running it on your own computer or server rather than the company's) is genuinely free, but not every part of the product comes with you.",
    "Cloud billing counts runs, not steps: one flow firing is one credit — the platform's unit of spend — however many steps it contains. AI steps are the exception and cost extra on top.",
    "It has grown past plumbing. The same workspace now carries AI agents, spreadsheet-style tables, and a chat box that drafts a flow from a plain description, which the docs still mark Beta.",
  ],

  beforeYouStart: [
    "**The free cloud plan is a plan, not a trial.** No card, unlimited flows, a small team of users, and a credit allowance that the pricing table gives as a monthly figure refreshing daily, so running out today never eats into tomorrow. The same page's FAQ says monthly in one answer and next day in another; go by the table, and check it on the day.",
    "Run out and nothing breaks. The pricing page says your flows stay switched on and runs past the quota simply don't go through until credits refresh the next day. A mistake on this platform costs you a day, not a month.",
    "You would start paying when the free daily allowance stops being enough, or when your team outgrows the small-team user limit. Plus and Team are flat monthly plans with much larger credit allowances, and runs beyond the allowance are billed per credit. AI steps cost more credits the more capable the model is, and a paid plan lets you plug in your own AI account to bring every AI step back down to the cost of an ordinary run.",
    "Worth checking before you commit anything real: the Activepieces cloud runs by default in a European region (Frankfurt, Germany), with other regions available on request. If your work has to sit somewhere else, running it yourself is the answer rather than the cloud.",
    "**First step:** sign up at activepieces.com, open the template library rather than a blank canvas, and run somebody else's finished flow once before building your own.",
  ],

  security: [
    {
      kind: "text",
      text: "Where your connected logins physically sit is a decision you actually get to make here, and it is worth making on purpose. Its security docs say credentials are held under 256-bit encryption with no interface to read them back out, and that sensitive values are stripped out of run logs. Choose to run it on your own machine instead and every one of those protections becomes something you are responsible for.",
    },
    {
      kind: "list",
      label: "Worth knowing before you switch a flow on",
      items: [
        "The free plan takes a small team, so invite colleagues as their own users rather than sharing your login.",
        "Templates and pieces are written in the open by a lot of different contributors. That is exactly why the library is so wide, and exactly why you read what a template's steps do before you connect a real account to it.",
        "If you self-host, a new version ships every Monday. Installing it is now your job, not theirs.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Flows with a lot of steps, since the credit cost does not move with the step count",
      "Reaching an app through a piece somebody outside the company wrote and published",
      "Keeping an automation running on hardware you own, indefinitely, without asking anyone's permission",
    ],
    okayAt: [
      "Working as a team on the free plan, which allows a few users but no separate projects",
      "Cloud work under a data-location requirement outside Europe, unless you ask Activepieces about another region",
      "Staying entirely clear of technical vocabulary — the cloud side is click-based, but the self-hosting half of the story is written for people comfortable running a server",
    ],
    avoid: [
      "Frontier-model AI steps on the free plan — each one costs many times an ordinary run, so a handful of runs uses up the whole day's allowance",
      "Treating the free allowance as capacity for a backlog: credits refill daily rather than accumulating, so three hundred queued items cannot clear in one go",
      "Hosting Activepieces for other people out of the enterprise folder — that part's licence forbids copying, distributing, sublicensing or selling it, and production use needs a paid seat count",
    ],
  },

  starterActions: [
    {
      title: "When a form is submitted → then file it and tell you about it",
      whatItDoes:
        "Activepieces hosts the form itself, drops each response into a table or a spreadsheet, and sends you a message about it.",
      whyHere:
        "Three steps, one credit. On Zapier that same flow spends a separate task per step out of a small monthly allowance; n8n prices by the run too, but has no permanent free cloud plan to do it on.",
      tweak:
        "Point it at a test spreadsheet and fire it by hand a few times first. The run view shows what each step received.",
    },
    {
      title: "Every weekday at 8am → then have an AI step summarise yesterday and post it",
      whatItDoes:
        "A scheduled trigger gathers yesterday's messages or rows, an AI step condenses them, and the summary lands in your chat app or inbox.",
      whyHere:
        "Activepieces posts what an AI step will cost before you run it, so you can weigh a daily habit against the daily allowance in your head. Zapier sells its AI features as separate products with their own plans, and n8n expects you to bring your own model account rather than quoting you a rate.",
      tweak:
        "Start on the fast model. If the summary is good enough there, you have just bought yourself ten times the runs.",
    },
    {
      title: "When the free daily allowance stops being enough → then move the same flow onto your own machine",
      whatItDoes:
        "One install command brings up the free Community Edition on a server you control, where runs and users are unlimited and there is no credit system at all.",
      whyHere:
        "Because the core is MIT-licensed, running it yourself is permitted even for paying clients or inside something you sell. n8n's self-hosted edition is free too, but its licence specifically forbids hosting it commercially for other people; Zapier has no self-hosted edition to move to at all.",
      tweak:
        "It wants a machine that stays on and Docker Compose. Do this after the cloud version has taught you what a flow is, not before.",
    },
    {
      title: "When a niche app you use does something → then start an automation from it",
      whatItDoes:
        "Search the piece library for the app before assuming you are stuck; if a piece exists, its events work as a trigger like any other.",
      whyHere:
        "Each piece is MIT-licensed and published as its own package, most of them written by people outside the company. On Zapier a missing integration is a request you file with a company; n8n is open too, but ships its own connectors under a licence that stops you reusing them freely.",
      tweak:
        "If the piece you want does not exist, the framework for writing one is public — a project rather than an afternoon, but not a closed door.",
    },
  ],

  pitfalls: [
    "**What you self-host is the automation core, not the cloud product minus the bill.** Community Edition leaves out projects, single sign-on, audit logs and Git Sync, and those last two sit in the paid part on cloud too. For one person automating their own work that is no loss; for a company it is the entire reason the paid tiers exist.",
    "**AI steps are the only thing that breaks the one-credit-per-run rule.** Price a single run before you schedule it hourly.",
    "**The free daily figure has moved before.** Community posts in mid-2026 report hitting the cap sooner than they used to, so treat today's allowance as a snapshot rather than a promise, and check the pricing page.",
    "**The chat box that builds a flow from a description is still marked Beta in the docs.** Fine for a first draft; read every step it wrote before you switch it on.",
  ],

  whereToNext: [
    { label: "More ways to connect your apps together", categorySlug: "workflow-automation" },
    { label: "Other tools you can run on your own machine", categorySlug: "local-open-source-ai" },
  ],
};
