import type { PlatformTutorialData } from "./types";

export const workatoTutorial: PlatformTutorialData = {
  slug: "workato-getting-started",
  platformSlug: "workato",
  title: "Getting Started with Workato",
  tagline:
    "Enterprise automation you can finally sign up for on your own — with a free tier licensed for practice, not for real work.",
  archetype: "recipes",
  lastReviewedAt: "2026-09-17",
  changelogUrl: "https://www.workato.com/product-hub/changelog/",
  accessTier: "FREE",

  howItWorks:
    'Workato calls each automation a **recipe**. You build one in a browser builder: pick a **trigger** (the "when" — the event that starts an automation), then add **actions** (the "then" — what happens once the trigger fires), choosing each from a list of apps rather than writing code. Each finished recipe then runs on its own, without you watching.',

  whatItIs: [
    "Workato is an integration platform built for companies. It connects the large systems a business runs on — Salesforce, NetSuite, Workday, SAP, Slack, databases — so records, files and messages move between them without anyone copying and pasting. Its own connector directory currently lists more than 1,200 pre-built connections, and you can browse that directory publicly, before you sign up for anything.",
    "It is shaped around a central team rather than one person. A Workato workspace holds up to 100 collaborators, separate environments for testing and live use, and audit logs of who changed what. Even working alone you are using a console designed for an organisation, which is why it feels heavier than a consumer automation tool — that weight is the product, not a flaw in it.",
    "For most of its life you could not buy it without talking to a salesperson. That has changed: there is now a free self-serve account and a paid self-serve plan you can put a card on. The oddity is that Workato's own pricing page still shows no numbers and offers you a demo — the actual self-serve figures live in the documentation site instead.",
    'Since 2026 the company has pushed hard toward AI agents: Agent Studio for building them, packaged "Genies" for jobs like IT support, and AIRO, released generally in July 2026. None of that is needed for a first recipe, and the governance story — who is allowed to let an agent do what — is what Workato actually sells there.',
  ],

  beforeYouStart: [
    "Signing up is genuinely self-serve now. Workato's docs list email and password, Google, GitHub or Office 365 as ways in, with no sales contact; its free-signup page mentions signing in with a work email, so whether a personal address is accepted is something you will find out at the form rather than in advance. The free plan comes with a one-time grant of 50,000 **credits** (the platform's unit of spend — each thing that runs costs some). One-time, not monthly: nothing refills it, and Workato does not publish what happens once it is gone.",
    '**The free plan is licensed for practice, not for real work.** Workato\'s Self-Service Addendum, dated 18 June 2026, limits the non-paid edition to "internal trial, experimental and evaluation purposes" and has you agree not to use it "for any production purposes." Learn on it as much as you like. Anything your job depends on belongs on a paid plan.',
    "Paying for yourself starts at around $75 a month for 2,500 credits and runs to about $1,275 for 50,000, card on file, per Workato's self-service pricing docs. That is steep beside Zapier or Make, which both have free tiers you are allowed to run real work on. If what you want is to learn automation rather than to connect a company's systems, start with Zapier or Make on this site and come back here when a NetSuite or a Workday is the thing standing in your way.",
    "You cannot work out in advance how far 50,000 credits goes. Workato's docs say credits are consumed by tasks, by requests other programs make to your automations, by rows of data processed and by AI actions — but the conversion rate is not published, and the docs point you to your contract for it. You find out by running things and watching the meter.",
    'Free accounts get no promised help. The same addendum says Workato "is not obligated to provide any technical support" on the non-paid edition, though it may offer some. The documentation site and the community forum are the realistic places to get unstuck.',
  ],

  security: [
    {
      kind: "text",
      text: "Workato sells its security controls by tier, and a free self-serve account sits at the bottom of that ladder. Its documentation states plainly that self-service users cannot choose the region where Workato stores and processes their automation data; those accounts run in US data centres, while paying enterprise customers pick from nine, including the EU, UK, Japan, Singapore and Australia. If the data you would route through a recipe has to stay in a particular country, a free account is the wrong place to route it.",
    },
    {
      kind: "list",
      label: "Three things worth knowing before you connect anything:",
      items: [
        "Connect test accounts, not your employer's live ones. A workspace you opened to experiment in is not where your company's real Salesforce login should sit, and Workato holds that login continuously once you grant it.",
        "The certifications cover the platform, not your recipe. Workato publishes SOC 1, 2 and 3, ISO 27001, 27701 and 42001, HIPAA, PCI-DSS and others, and encrypts data in transit and at rest. None of that has an opinion on whether the automation you built sends the right data to the right place.",
        "Serious deployments do not keep credentials in Workato at all. It connects to AWS Secrets Manager, Azure Key Vault and HashiCorp Vault so passwords are fetched rather than stored. You will not set that up on a free account, but it tells you what the platform expects of a real one.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Connecting the big business systems that lighter automation tools cover thinly or not at all — NetSuite, Workday, Salesforce, SAP, databases — where the depth of the pre-built connector is the entire point.",
      "Automations a team owns rather than a person: one workspace, up to 100 collaborators, separate test and live environments, and an audit log, all present from the first recipe.",
      `Long processes with branching, loops and error handling, rather than a two-step "when this, then that."`,
      "Putting guardrails around AI agents — deciding centrally which systems an agent may touch and logging what it did.",
    ],
    okayAt: [
      "Being anybody's first automation ever. It will work, but you are learning an enterprise console to do something a simpler tool does in three clicks.",
      "Being cheap to leave idle. On the paid self-serve plans, credits expire at the end of each billing month and do not roll over, so a quiet month is money gone.",
    ],
    avoid: [
      "Running anything your work depends on from the free plan — its own addendum licenses that plan for evaluation only.",
      "Any automation whose data must stay outside the United States while you are on a self-serve account, since choosing a region is an enterprise feature.",
      "Reading the published $75–$1,275 self-serve prices as what Workato costs. Those are the self-serve tiers. The four contract editions — Standard, Business, Enterprise and Workato One — carry no published figures at all, and that is the version most companies actually buy.",
    ],
  },

  starterActions: [
    {
      title: "Watch a credit get spent",
      whatItDoes:
        "When a new row is added to a Google Sheet → then post a message into Slack.",
      whyHere:
        "The Slack message is not the point. The point is watching a one-time 50,000-credit grant tick down for the first time, on a platform that publishes no conversion rate between credits and runs. Zapier tells you a task is a task and gives you about a hundred a month; here the only way to calibrate is to spend a little deliberately and look at the meter.",
      tweak:
        "Fire the trigger by hand the first few times. A schedule that runs every five minutes is the fastest way to find out what your grant was worth.",
    },
    {
      title: "Start from somebody else's recipe",
      whatItDoes:
        "When you need a common connection → then clone a published recipe from Workato's community library and change it, instead of building from an empty canvas.",
      whyHere:
        "Workato's docs describe cloning community recipes straight into your own workspace. On a plan whose credits never refill, starting from a recipe that already works means fewer failed runs spent learning what a working one looks like — which is a different calculation from Zapier's templates, where a botched attempt costs you a task out of a monthly allowance that resets.",
    },
    {
      title: "Connect one big system, not a small one",
      whatItDoes:
        "When a record changes in Salesforce, NetSuite or Workday → then update a sheet or notify a channel.",
      whyHere:
        "Workato's connector directory is public, so you can check whether your particular NetSuite or Workday is covered before you make an account — which is the one piece of homework worth doing before signing up for any enterprise automation platform. Point Workato at Gmail instead and you have learned nothing it does better than Zapier.",
      tweak:
        "Workato says AIRO, released in July 2026, can draft an automation from a plain-English description of the goal. Whether that is switched on for a free self-serve account is not stated publicly, so treat it as something to look for in the builder rather than something to count on.",
    },
    {
      title: "Break a recipe on purpose, then read the run record",
      whatItDoes:
        "When a recipe fails → then open its job history to see which step stopped and exactly what data it was holding.",
      whyHere:
        "This record has a shelf life. Workato publishes job-history retention of 30 days on its Standard and Business editions and 90 on Enterprise, and states no figure for self-serve accounts — so assume what you can look back at is limited, and build the habit of reading a run while it is fresh rather than reconstructing it later.",
    },
  ],

  pitfalls: [
    "**Build with a trigger you fire by hand before you build one that fires on a schedule.** Every tutorial run, every failed test and every accidental loop comes out of the same one-time grant, and a recipe left on a five-minute schedule overnight is the classic way to wake up to nothing left.",
    `**"Recipe" here means one automation, not a set of instructions for an AI.** Workato has used the word since long before AI tools borrowed it, and the docs, the community library and the support forum all assume that meaning. Searching for "Workato recipes" gets you automations.`,
    "**The pricing page and the documentation tell you different things.** The marketing pricing page shows no numbers and offers a demo; the self-service pricing page on the docs site lists monthly figures. If you look on the marketing site and conclude there is no published price, you have found the sales funnel rather than the answer.",
    "**Features you read about in the docs may not exist in your account.** Choosing a data region, extended concurrency, longer job retention and raised quotas are all attached to paid editions. Workato's documentation describes the whole platform, not your plan, and it does not always say which is which.",
    "**A paid self-serve subscription renews itself.** Workato's addendum says subscriptions renew automatically at its then-current pricing and that fees are non-refundable; you can cancel at any time, but it takes effect at the end of the billing period rather than immediately.",
  ],

  whereToNext: [
    { label: "Workflow & Automation", categorySlug: "workflow-automation" },
    { label: "AI Plugins for Business Software", categorySlug: "ai-plugins-business-software" },
  ],
};
