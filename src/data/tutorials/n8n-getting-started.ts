import type { PlatformTutorialData } from "./types";

export const n8nTutorial: PlatformTutorialData = {
  slug: "n8n-getting-started",
  platformSlug: "n8n",
  title: "Getting Started with n8n",
  tagline:
    "Connect your apps and let them pass work to each other automatically — and unusually, there's a version you can run yourself for free, forever.",
  archetype: "recipes",
  lastReviewedAt: "2026-09-07",
  changelogUrl: "https://docs.n8n.io/changelog/release-notes",
  accessTier: "FREE",

  howItWorks:
    "You build on a canvas. You drop down a **trigger** — the \"when,\" like a set time, a new email, or a form being filled in — then chain **actions** after it, the \"then\": send this, save that, look this up. Each box is called a **node**, you join them with a line, and you can run the whole chain with your real data to watch what happens before you ever turn it on.",

  whatItIs: [
    "n8n is a workflow automation tool: you build chains of steps that run without you, connecting the apps you already use. It ships with hundreds of prebuilt app connections and a large library of ready-made workflow templates you can open and adapt.",
    "It's for people who've either outgrown simpler automation tools or who like seeing how the machine actually works. It's noticeably more capable than Zapier or Make, and noticeably harder to learn — both are true and we're not going to pretend otherwise.",
    "The reason to pick n8n over Zapier or Make is the **billing shape**. Those charge you roughly per *step* your automation takes; n8n's paid cloud charges per *execution* — one full run of a workflow, however many steps it contains. A 3-step workflow and a 30-step workflow cost the same. That changes what you're willing to build.",
    "The other reason is the free self-hosted version, which has no execution cap at all. Nobody else in this category offers that.",
  ],

  beforeYouStart: [
    "**There are two different n8n's, and confusing them is the most common beginner mistake.** *n8n Cloud* is the hosted version n8n runs for you — sign up, start building, they handle the servers, you pay monthly. *Self-hosting* means running the software on a computer or server you control; that version, the Community edition, is free indefinitely with almost the full feature set and no cap on how many times your workflows run. Same product; the difference is who maintains the machine.",
    "To start on Cloud you need nothing but an email address — the trial is currently around two weeks with no credit card. To **self-host** you need a machine that stays on and comfort with a terminal; n8n's own docs list technical expertise as *required* for self-hosted setup and point non-technical users to Cloud. That's their advice, not ours, and it's honest.",
    "**Will you realistically need to pay?** If you're not technical: yes, after the trial. If you're willing to self-host: genuinely no, possibly ever — but you're paying in time and responsibility instead of money.",
    "Cloud pricing currently starts at around €20 a month on annual billing (a bit more month-to-month), with the next tier up around €50. Prices are listed in euros. Treat these as a band, not a quote.",
    "**First step:** start a free Cloud trial and open the template library rather than a blank canvas. Find a template near what you want, run it once, and change one thing. You'll learn more in ten minutes than from an hour of reading.",
  ],

  security: [
    {
      kind: "text",
      text: "The risk with n8n isn't what you type into it, it's **what you connect it to**. Every app you link — your email, your files, your calendar — hands n8n a credential that lets it act as you, and a workflow with a mistake in it acts as you at machine speed. Connect one account at a time, only what a given workflow actually needs, and run everything manually a few times before you turn it on. You can revoke any connection from the app's own security settings, not just from n8n.",
    },
    {
      kind: "list",
      label: "If you self-host, these become your job",
      items: [
        "Keeping the software updated — security fixes don't install themselves.",
        "Backups. Your workflows and stored credentials live on your machine; if it dies, they die.",
        "Locking down access, so your n8n isn't sitting open on the public internet.",
        "Nobody is monitoring it for you. Self-hosting trades a subscription for responsibility, which is a fair trade only if you'll actually do the work.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Multi-step workflows where the step count would get expensive elsewhere",
      "Connecting to a service that has no prebuilt integration anywhere, via a plain web request",
      "Processing a batch of things in one run rather than one at a time",
      "Keeping data on hardware you control",
      "Adding an AI step into an otherwise ordinary automation",
    ],
    okayAt: [
      "Being your first-ever automation tool — doable, but you'll hit concepts other tools hide from you",
      "Team collaboration on the free tier, where sharing and permissions are limited",
      "Quick one-off automations you'll build in five minutes and never touch again",
    ],
    avoid: [
      "Choosing this if you want to never see anything technical — Zapier is the kinder first step and there's no shame in it",
      "Self-hosting because it's free, if you won't maintain it",
      "Trusting a complex workflow you haven't run manually several times",
      "Assuming it's open-source software you can resell — it isn't (see pitfalls)",
    ],
  },

  starterActions: [
    {
      title: "When a form is submitted → log it to a spreadsheet and email you",
      whatItDoes:
        "n8n hosts the form itself, drops each response into a Google Sheet, and sends you a notification with the details filled in.",
      whyHere:
        "This is the \"hello world\" of automation and it's deliberately unambitious — the point is to see data physically travel between two nodes on the canvas, which is the thing that makes everything else click.",
      tweak: "Add a branch so submissions containing a certain word get a different email.",
    },
    {
      title: "When a new email arrives with attachments → save every file and log the sender",
      whatItDoes:
        "Watches an inbox, and for each attachment on a matching message, saves it to cloud storage and adds a row to a tracking sheet.",
      whyHere:
        "An email with five attachments is *one execution* in n8n. On a per-step tool, looping over each attachment is where your quota quietly evaporates. This is the pricing difference made visible.",
      tweak: "Filter to only invoices, by matching the subject line.",
    },
    {
      title: "Every weekday at 8am → gather headlines, summarise with AI, send to chat",
      whatItDoes:
        "A schedule trigger pulls from news feeds or an API, passes the text to an AI model for a short summary, and posts the result to Slack or email.",
      whyHere:
        "n8n has AI nodes built in as ordinary workflow steps, so the AI is just one box in the middle rather than a separate product you bolt on. You can also point it at your own model key instead of buying credits.",
      tweak: "Change the schedule to Monday-only, or ask for three bullets instead of a paragraph.",
    },
    {
      title: "When a row is added to a sheet → call a service n8n has never heard of",
      whatItDoes:
        "Uses the generic HTTP Request node to talk to any web API directly, rather than waiting for an official integration to exist.",
      whyHere:
        "This is n8n's real superpower and the honest reason people switch. On Zapier, if there's no integration, you're stuck. Here, if the service has an API, you have an integration — it's just a bit of reading.",
      tweak: "Start with a public API that needs no key, so you can see it work before wrestling with authentication.",
    },
  ],

  pitfalls: [
    "**Nothing runs until you turn it on.** Testing on the canvas works fine while your workflow is still switched off — plenty of people build something, walk away, and wonder why nothing ever happened. Publish it.",
    "**\"Free\" and \"open source\" aren't the same thing here.** n8n is fair-code, under its Sustainable Use License: free for your own internal or personal use, source code public — but you may not resell it, white-label it, or host it commercially for others. Fine for almost every beginner. Worth knowing before you build a business on it.",
    "**Self-hosting is cheaper in money and dearer in time.** Updates, backups, and uptime become yours. If that sentence made you tired, use Cloud.",
    "**Data moves as a list of items, not one thing.** A node usually runs once per item it receives, which is powerful and also the source of most confusing early results. When something loops unexpectedly, this is why.",
    "**Templates from strangers carry credentials-shaped holes.** Community templates are a genuinely great way to learn, but read what a workflow does before you connect your accounts to it.",
  ],

  whereToNext: [
    { label: "More automation tools to compare", categorySlug: "workflow-automation" },
    { label: "Connect AI models directly into your workflows", categorySlug: "ai-apis-developer-services" },
  ],
};
