import type { PlatformTutorialData } from "./types";

export const replitAgentTutorial: PlatformTutorialData = {
  slug: "replit-agent-getting-started",
  platformSlug: "replit-agent",
  title: "Getting Started with Replit Agent",
  tagline:
    "Describe an app in ordinary sentences, get a working one you can click — and learn where the money goes.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-08",
  changelogUrl: "https://docs.replit.com/updates",
  accessTier: "FREE",

  howItWorks:
    "You open a project in your browser and type what you want built, in ordinary sentences. An agent — AI that takes actions on its own rather than only answering — writes the files, runs the app and shows you a live preview. You click around, tell it what looked wrong, and it goes again.",

  whatItIs: [
    "Replit Agent builds working software from a description you type, inside Replit's workspace in your browser. Nothing is installed and you are never asked to open a terminal. The current version is Agent 4, released March 2026.",
    "As it works it saves **checkpoints** — snapshots of the whole project at each finished piece of work.",
    "It is genuinely aimed at people who don't code. But what comes out is a real app holding real data, and putting that in front of other people is a bigger step than making it.",
  ],

  beforeYouStart: [
    "Sign up at replit.com and you land on the free Starter plan: Agent **credits** — the platform's unit of spend — that refresh daily up to a monthly cap, plus one published app, all in the browser.",
    "Starter's ceiling is features as much as spending. It runs only Replit's \"Lite build\" mode, for quick, focused changes; the fuller build, Plan Mode, outside connections and anything that isn't a web or mobile app need Core, currently around $20 a month.",
    "Publishing is billed separately, from about $2 a month plus small per-request charges, and Starter's one free published app expires after 30 days unless you re-publish it.",
    "Set a spending limit before your first real build, under Settings → Account → Usage → \"Manage limits\". Nothing caps you by default, and auto-reload buys another credit pack on its own when you run low.",
  ],

  security: [
    { kind: 'text', text: "Everything happens on Replit's machines: what you type, the code it writes, whatever your app stores. Replit's privacy policy, updated August 2026, says it collects \"code, project files, text, commands and prompts\" and uses that data \"to improve the accuracy of our machine learning technologies such as code generation.\" No consumer plan has a switch to turn that off; the granular controls are an Enterprise feature." },
    { kind: 'list', label: 'Four things to get right before anyone else sees it', items: [
      "Keep passwords and access keys in Replit Secrets, never in the chat window — and per Replit's own checklist, never in client-side code, local storage or cookies",
      "Publish privately if it isn't meant for the public; private publishing works on Starter and Core, and stops unauthorised requests before they reach your app",
      "Confirm every part of the app that touches data requires a login — Agent wrote that code, and checking it is your job",
      "Read Replit's security checklist in full before anything with a sign-up form goes live",
    ] },
    { kind: 'text', text: "One detail is a real safeguard. Every Replit app keeps two separate stores of information: a development one Agent works in, and a production one behind your published app that Replit's docs say Agent can't touch. That split exists because it had to — in July 2025 an Agent run deleted a customer's live database during a code freeze, which Replit's leadership acknowledged publicly." },
  ],

  triad: {
    bestAt: [
      "Turning a plain-English description into something clickable within the hour",
      "Fixing its own mistakes once you say exactly what you saw go wrong",
      "Building the unglamorous parts — a sign-up form, somewhere to save entries, a page listing them back — without you naming a technology",
    ],
    okayAt: [
      "Anything beyond a small web or mobile app on the free plan; slides, data apps and animations are Core-only",
      "Larger or older projects, where Replit steers you toward Max, its most capable and most expensive mode",
    ],
    avoid: [
      "Treating the free published app as permanent hosting — Starter's one free app expires after 30 days and must be re-published by hand",
      "Leaving auto-reload on before you know your own pace; it buys another credit pack without asking again",
      "Other people's real information in an app you haven't reviewed — Agent wrote the code protecting it, and nothing has checked that code but Agent",
    ],
  },

  starterActions: [
    {
      title: "Start with one screen, not one app",
      prompt:
        "Build one web page where I can add a task with a due date, see the list sorted by date, and tick items off. No login, nothing saved between visits yet. Plain, readable styling.",
      whyHere:
        "Replit prices a request by the effort it takes, rather than the flat per-checkpoint fee it used to charge, and asks you to confirm before paid work starts. Something you can describe in four sentences keeps that confirmation cheap and stays checkable.",
      tweak: "Swap in your own idea, then delete half of it before you send.",
    },
    {
      title: "Make it write the plan first",
      prompt:
        "Before you change any code: write out what you'd build, in what order, what counts as finished, and what you're deliberately leaving out. Don't build anything yet.",
      whyHere:
        "Replit's built-in Plan Mode requires Core, so on free Starter, asking for the plan inside the message is the only way to see what Agent intends before it edits files.",
      tweak: "If a step surprises you, say so before you tell it to go.",
    },
    {
      title: "Get the live version's data in on purpose",
      prompt:
        "The published app is empty. Explain where the entries I made while building went, then tell me how to get the categories — not my test entries — into the live version.",
      whyHere:
        "A Replit app keeps its building data and its live data in two separate places, and the live one starts empty. A published app looking blank is the system working as documented, not something you broke.",
      tweak: "Move reference data you'd hate to retype; leave the test junk behind.",
    },
    {
      title: "Practise rolling back before you need to",
      prompt:
        "That last change made things worse. Show me the checkpoints from this session and what changed in each, then roll back to the one before the layout change.",
      whyHere:
        "Agent History keeps a checkpoint at each finished piece of work and restores any of them, which makes \"undo that\" a cheaper first move than \"now fix it\".",
      tweak: "Do it once on something trivial, so the panel isn't unfamiliar during a real mess.",
    },
  ],

  pitfalls: [
    "Entries made while building do not appear in the published app, which reads a separate, empty store until you copy things across.",
    "Cost tracks the work a request takes, not the number of messages. Replit dropped its flat 25-cents-a-checkpoint fee in 2025, so a debugging spiral costs more than the message count suggests.",
  ],

  whereToNext: [
    { label: "AI Coding & Development", categorySlug: "ai-coding-development" },
    { label: "Workflow & Automation", categorySlug: "workflow-automation" },
  ],
};
