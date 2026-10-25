import type { PlatformTutorialData } from "./types";

export const manusTutorial: PlatformTutorialData = {
  slug: "manus-getting-started",
  platformSlug: "manus",
  title: "Getting Started with Manus",
  tagline:
    "Give Manus a goal and it works through it on its own computer in the cloud — researching, browsing, writing files, even building a website — while you do something else.",
  archetype: "prompts",
  lastReviewedAt: "2026-10-23",
  changelogUrl: "https://manus.im/updates",
  accessTier: "FREE",

  howItWorks:
    "You describe a task in plain language. Manus makes a plan and carries it out in its own **sandbox** — a private computer in the cloud with a web browser and files — showing each step. It keeps working if you close the tab, then hands back the result: a report, spreadsheet, slides or a working web page.",

  whatItIs: [
    "Manus is an **AI agent** — software that takes actions to finish a job rather than only answering questions. Its docs describe it as a virtual colleague with its own computer: it can search the web, open pages, write and run code, install software and create files. You watch it work, and you can step in and take over its browser at any point; Manus will ask you to when it gets stuck, for example at a CAPTCHA.",
    "Because the work happens in the cloud, tasks keep running after you close your browser. Paid plans add **Wide Research**, which splits a big research job into many parallel sub-tasks, and **scheduled tasks** can repeat a job on a timetable — a weekday-morning briefing, say. **Connectors** link Manus to apps such as Gmail, Google Calendar, Notion and Slack, and an optional browser extension lets it work inside your own Chrome or Edge.",
    "Manus runs on the web, Mac, Windows, iPhone and Android. On ownership: Manus's own blog says Meta acquired it in December 2025, and that it formally resumed independent operations in September 2026 after separating from Meta to meet regulatory requirements in certain jurisdictions — news reports said Chinese regulators had ordered the deal unwound. Its terms say the service is run by Butterfly Effect Pte. Ltd. under Singapore law, and its trust centre says data is stored in the US and Singapore.",
  ],

  beforeYouStart: [
    "**Everything runs on credits.** Manus's credits page says a task's cost depends on how complex and long it is — the AI's reading and writing, the cloud computer's time, and any outside services used. Its examples show a long web-app build costing several times what a short chart does. Its help centre says there's currently no way to see the cost before a task starts.",
    "**The free plan is daily.** Manus's help centre lists a Free plan with a daily credit allowance (reset at midnight UTC, no rollover), one task at a time and two scheduled tasks. It also caps how much of that daily allowance a free user can spend in a month. Those daily credits can only be used with the lighter Manus 2.0 Lite model.",
    "**Paid plans are monthly credit allowances.** Manus's pricing help article lists several paid tiers, each with a bigger monthly credit allowance than the last (the second comes with a 7-day free trial), and a discount for annual billing. Monthly credits reset each billing date, and Manus says leftover monthly credits are wiped if you cancel.",
    "**Refunds are limited.** Manus's terms say payments are non-refundable except where the law requires. Its help centre says credits are refunded when a task fails because of a technical problem on Manus's side — not if you simply don't like the result.",
  ],

  security: [
    {
      kind: "text",
      text: "An agent that acts for you deserves more care than a chatbot. Manus's terms say actions the agent takes can be attributed to you, and revoking access doesn't undo something it already did. Start with tasks where a mistake is harmless — research, drafts, files — before letting it send, buy or post anything.",
    },
    {
      kind: "list",
      label: "Before you hand over access:",
      items: [
        "**Logins.** When Manus needs a site you're signed in to, you log in yourself in its cloud browser, and it asks whether to save that session. You can review or switch off saved logins in Settings → Cloud Browser.",
        "**Your own browser.** The Browser Operator extension works in your real Chrome or Edge with your existing logins. Manus says each task needs your authorisation and passwords stay in your browser; switch off the \"My Browser\" connector when you're done.",
        "**Skip confirmations.** Scheduled tasks have an option to send, publish or post without asking you first. Leave it off until you trust a workflow.",
        "**Share links are public.** Manus's help centre says tasks are private until you share them, and sharing creates a public link; its privacy policy warns shared content can be copied or picked up by search engines.",
      ],
    },
    {
      kind: "text",
      text: "Manus's trust centre says its outside AI providers are contractually barred from training on your data, but its privacy policy says Manus may use de-identified data to improve its own models. A training opt-out is advertised as a Team-plan feature; we couldn't find one for individual plans on review day.",
    },
  ],

  triad: {
    bestAt: [
      "Multi-step research that ends in a finished file — a comparison table, a report, a slide deck.",
      "Building a simple website or web app from a description, then publishing it.",
      "Recurring jobs on a schedule, like a daily summary of news on a topic you follow.",
    ],
    okayAt: [
      "Predictable costs. You find out what a task cost after it runs, so the first few are guesswork.",
      "Accuracy. Manus's terms ask you to review outputs, and it shows a \"verify before you act\" notice on health, money and legal topics.",
    ],
    avoid: [
      "Giving it logins to accounts where an unwanted action would be costly.",
      "Sharing a task link that contains anything private.",
    ],
  },

  starterActions: [
    {
      title: "Compare before you buy",
      prompt:
        "Compare the three best-reviewed cordless vacuums under $300 for a home with pets. Make a table with price, battery life, weight and the main complaint in reviews, and give me a one-paragraph recommendation with links to your sources.",
      whyHere:
        "Comparing options before a purchase is one of Manus's own beginner examples. It shows the agent researching across many pages and delivering a finished table — and the links let you check its work.",
      tweak: "Swap in anything you're shopping for, and add your must-haves.",
    },
    {
      title: "Plan something end to end",
      prompt:
        "Take ownership of planning a four-day trip to Chicago in May for two adults on a $1,500 budget, not counting flights. Give me a day-by-day plan with neighbourhoods, two restaurant options per evening and estimated costs, as a document I can download.",
      whyHere:
        "Manus's beginner guide suggests phrases like \"take ownership\" for whole jobs. A complete plan with a downloadable file shows what an agent does that a chatbot doesn't.",
    },
    {
      title: "Build a one-page website",
      prompt:
        "Build a simple one-page website for a neighbourhood book club: a welcome section, the next meeting date and book, and a contact email. Keep it clean and mobile-friendly.",
      whyHere:
        "Manus's credits page uses a small webpage as a typical task. You'll get a working page you can open and refine — check whether its link is temporary before sharing it.",
    },
    {
      title: "Set up a weekly briefing",
      prompt:
        "Every Monday at 8am, search for the past week's news about electric bikes and give me a five-bullet summary with links.",
      whyHere:
        "Scheduled tasks are available on every plan. A weekly summary is low-risk, useful, and shows you how many credits a repeating job really uses.",
    },
  ],

  pitfalls: [
    "**One giant conversation.** Manus's credit tips say long single threads cost more; start a new task for a new job and put everything it needs in the first message.",
    "**Vague first prompts.** An agent fills gaps by doing more work, which spends more credits.",
    "**Temporary links.** Manus's help centre says temporary deployment links expire; use permanent deploy for anything you want to keep.",
    "**Tasks stopped by high demand.** If a task ends with a high-load error, Manus says you can stop and take the credit refund, or wait and continue.",
  ],

  whereToNext: [
    { label: "More workflow & automation tools", categorySlug: "workflow-automation" },
    { label: "Research & academic tools", categorySlug: "research-academic-tools" },
    { label: "Chat assistants for quick questions", categorySlug: "text-conversational-ai" },
  ],
};
