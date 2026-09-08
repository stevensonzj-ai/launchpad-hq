import type { PlatformTutorialData } from "./types";

export const n8nTutorial: PlatformTutorialData = {
  slug: "n8n-getting-started",
  platformSlug: "n8n",
  title: "Getting Started with n8n",
  tagline:
    "Connect your apps and let them pass work to each other — with a version you can run yourself, free, forever.",
  archetype: "recipes",
  lastReviewedAt: "2026-09-07",
  changelogUrl: "https://docs.n8n.io/changelog/release-notes",
  accessTier: "FREE",

  howItWorks:
    "You build on a canvas. You drop down a **trigger** — the \"when,\" like a set time, a new email, or a form being filled in — then chain **actions** after it: send this, save that, look this up. You can run the whole chain with your real data before you ever turn it on.",

  whatItIs: [
    "A workflow automation tool: you build chains of steps that run without you, connecting apps you already use. It ships with hundreds of prebuilt connections and a library of ready-made workflows to adapt.",
    "It's noticeably more capable than Zapier or Make, and noticeably harder to learn. Both are true.",
    "The reason to pick it is the **billing shape**. Zapier and Make charge roughly per **step**; n8n's paid cloud charges per **execution** — one full run of a workflow, however many steps it contains — so a 3-step and a 30-step workflow cost the same. That changes what you're willing to build.",
  ],

  beforeYouStart: [
    "**There are two n8n's, and confusing them is the most common beginner mistake.** **n8n Cloud** is the version n8n runs for you: sign up, build, pay monthly. **Self-hosting** means running the free Community edition on a machine you control: almost the full feature set, no cap on how many times your workflows run (nobody else in this category offers that), and the maintenance is yours.",
    "Cloud needs only an email address, and the trial is currently around two weeks with no card. Self-hosting needs a machine that stays on, and comfort typing instructions into a text window instead of clicking — n8n's own docs list technical expertise as required, and point non-technical readers to Cloud.",
    "So if you're not technical you'll pay after the trial; if you'll self-host, possibly never — you pay in time and responsibility instead. Cloud currently starts around €20 a month on annual billing, a bit more month-to-month, next tier around €50; treat those as a band, not a quote.",
    "**First step:** start a free Cloud trial and open the template library rather than a blank canvas. Find a template near what you want, run it once, change one thing.",
  ],

  security: [
    {
      kind: "text",
      text: "Every app you link hands n8n a stored credential that lets it act as you — and a workflow with a mistake in it acts as you at machine speed, over and over. Connect one account at a time, only what a workflow needs, and run everything manually a few times before switching it on. Any connection can be revoked from the app's own settings, not just from n8n.",
    },
    {
      kind: "list",
      label: "If you self-host, these become your job",
      items: [
        "Keeping the software updated — security fixes don't install themselves.",
        "Backups: your workflows and stored credentials live on your machine, and if it dies, they die.",
        "Locking down access, so your n8n isn't sitting open on the public internet.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Multi-step workflows where the step count would get expensive elsewhere",
      "Reaching a service with no prebuilt integration, via a plain web request",
      "Adding an AI step to an ordinary automation, on hardware you control",
    ],
    okayAt: [
      "Being your first-ever automation tool — you'll hit concepts other tools hide",
      "Team work on the free tier, where sharing and permissions are limited",
      "Quick one-offs you'll build in five minutes and never touch again",
    ],
    avoid: [
      "Choosing it to never see anything technical — Zapier is the kinder first step",
      "Self-hosting because it's free, if you won't maintain it",
    ],
  },

  starterActions: [
    {
      title: "When a form is submitted → log it to a spreadsheet and email you",
      whatItDoes:
        "n8n hosts the form itself, drops each response into a Google Sheet, and emails you the details.",
      whyHere:
        "n8n makes you place and wire the boxes yourself, and run the chain with real data while it's switched off — so you watch data pass between two **nodes** (one step in a workflow, shown as a box you connect).",
      tweak:
        "Nothing runs until you switch the workflow on — canvas testing works fine while it's off.",
    },
    {
      title: "When an email arrives with attachments → save every file and log the sender",
      whyHere:
        "An email with five attachments is **one execution** in n8n. On a per-step tool, looping over each attachment is where your quota quietly evaporates — the pricing difference made visible.",
      tweak: "Filter to only invoices, by matching the subject line.",
    },
    {
      title: "Every weekday at 8am → gather headlines, summarise with AI, post to chat",
      whyHere:
        "AI steps are ordinary boxes here rather than a separate product you bolt on, and you can point one at your own model key instead of buying platform credits.",
    },
    {
      title: "When a row is added to a sheet → call a service n8n has never heard of",
      whatItDoes:
        "Uses n8n's general-purpose web-request box to talk to a service directly, instead of waiting for an official integration.",
      whyHere:
        "This is the honest reason people switch: on Zapier, no integration means you're stuck; here, if a service publishes a way for programs to talk to it, you have one.",
      tweak:
        "Start with a public service that needs no login, so you see it work first.",
    },
  ],

  pitfalls: [
    "**\"Free\" and \"open source\" aren't the same thing here.** n8n publishes its source but licenses it as **fair-code**, under its Sustainable Use License: free for personal or internal use, but you may not resell it, white-label it, or host it commercially for others. Fine for almost every beginner; worth knowing before you build a business on it.",
    "**Data moves as a list of items, not one thing.** A step usually runs once per item it receives — powerful, and the source of most confusing early results.",
    "**Templates from strangers carry credentials-shaped holes.** They're a great way to learn, but read what a workflow does before you connect your accounts.",
  ],

  whereToNext: [
    { label: "More automation tools to compare", categorySlug: "workflow-automation" },
    { label: "Connect AI models directly into your workflows", categorySlug: "ai-apis-developer-services" },
  ],
};
