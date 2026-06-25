import type { PlatformTutorialData } from "./types";

export const zapierTutorial: PlatformTutorialData = {
  slug: "zapier-getting-started",
  platformSlug: "zapier",
  title: "Getting Started with Zapier",
  tagline:
    "Connect the apps you already use and let them talk to each other — no code.",
  archetype: "recipes",
  lastReviewedAt: "2026-06-25",
  changelogUrl: "https://help.zapier.com/hc/en-us/categories/13951101412877-Product-updates",
  accessTier: "FREE",

  howItWorks:
    "You build little automations called **Zaps**. Each one has a **trigger** (the \"when\" — something that happens in one app) and an **action** (the \"then\" — what should happen in another). You set them up by clicking through menus, not by writing code.",

  whatItIs: [
    "Zapier is the duct tape of the internet. It links apps that don't naturally work together — Gmail, Slack, Google Sheets, your calendar, thousands more — so when something happens in one, something automatically happens in another.",
    "It's the go-to first step for anyone who keeps repeating the same copy-paste between two apps.",
    "It's also leaned into AI lately: a built-in **Copilot** can draft an automation from a plain-English description of what you want, and Zapier now offers AI chatbots and \"agents\" (free versions included) — though you don't need any of that for your first automation.",
  ],

  beforeYouStart: [
    "**Free to start**, no card. You connect your existing accounts — your real Gmail, your real Slack — so Zapier acts on your behalf inside them. Keep that in mind from the very first click. First step: sign up at zapier.com, connect one app you already use, and try a starter automation below.",
    "**Will you need to pay?** Free is fine for a couple of simple automations. The free plan currently gives you about **100 \"tasks\" a month** (one task = one automated action that runs) and limits you to **two-step Zaps** (one trigger plus one action — it's called \"two steps\" because the trigger counts as the other step). A busy automation can burn through 100 tasks fast, sometimes in a week. You'd move to a paid plan (roughly the low tens of dollars a month) for multi-step flows or more volume.",
    "Run out of tasks and your automations pause rather than vanish — they're held and re-run after the monthly reset.",
  ],

  security: [
    {
      kind: "text",
      text: "This is different from a chatbot: the risk isn't what you type, it's what you connect. Zapier holds ongoing login access to every app you link, which makes your Zapier account a **master key** — if someone got into it, they could reach everything you've connected to it.",
    },
    {
      kind: "list",
      label: "Three habits keep that safe:",
      items: [
        "**Lock down the Zapier account itself** — a strong, unique password plus two-factor authentication. This matters more here than for most tools you use.",
        "**Connect only the apps you actually need**, and disconnect any you've stopped using.",
        "**Be thoughtful about sensitive apps** — data in a Zap passes through Zapier's servers, so think twice before routing banking, health, or confidential information through one.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Connecting two apps that don't talk to each other — \"new form submission → add a spreadsheet row → ping me on Slack.\"",
      "Killing repetitive copy-paste between tools you already use.",
      "Letting non-technical people automate real work without writing any code.",
    ],
    okayAt: [
      "Complicated multi-branch logic — possible on paid plans, but fiddly; Make and n8n handle complex flows more cleanly.",
      "Instant reactions — the free tier checks for changes on a schedule (about every 15 minutes), so \"real-time\" can really mean several minutes.",
    ],
    avoid: [
      "High-volume automation — the per-task pricing climbs fast.",
      "Using it as a database or for heavy data crunching — it moves data between apps, it doesn't store or process it.",
      "Anything that genuinely can't fail for a second while you're on the free tier.",
    ],
  },

  starterActions: [
    {
      title: "Never lose a form lead",
      whatItDoes:
        "When someone submits your Google Form or Typeform → then add a row to a Google Sheet.",
      whyHere:
        "A two-step classic with an instantly visible payoff — and the cleanest possible first Zap to build.",
      tweak:
        "New to building Zaps? Describe it to Zapier's Copilot in plain English — \"when someone submits my Google Form, add a row to my sheet\" — and it'll draft the Zap for you to review before you switch it on.",
    },
    {
      title: "Turn starred emails into a to-do",
      whatItDoes:
        "When you star an email in Gmail → then create a task in Todoist or Trello.",
      whyHere:
        "Teaches an important idea: your own action can be the trigger, not just an event coming from outside.",
    },
    {
      title: "Get a heads-up when something matters",
      whatItDoes:
        "When a new row appears in a specific Google Sheet → then Slack or email yourself.",
      whyHere:
        "Notifications are the most satisfying first payoff — you watch the automation do its job in real time.",
    },
  ],

  pitfalls: [
    "**You'll burn free tasks faster than you think.** Before you switch a Zap on, ask: how often will this realistically fire?",
    "**Always test before switching on.** A misconfigured Zap can fire a hundred times in a row — spamming you and torching your task budget. Use the test step every single time.",
    "**The free two-step limit bites mid-build.** Know that ceiling before you plan a clever four-step flow you can't actually run yet.",
    "**Set-it-and-forget-it cuts both ways.** A Zap you built months ago is still quietly running. Keep a mental list of what you've got switched on.",
  ],

  whereToNext: [
    { label: "Workflow & Automation", categorySlug: "workflow-automation" },
    { label: "Meetings & Notes", categorySlug: "meetings-notes" },
  ],
};
