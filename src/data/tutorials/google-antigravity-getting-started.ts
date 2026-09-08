import type { PlatformTutorialData } from "./types";

export const googleAntigravityTutorial: PlatformTutorialData = {
  slug: "google-antigravity-getting-started",
  platformSlug: "google-antigravity",
  title: "Getting Started with Google Antigravity",
  tagline:
    "Google's free AI coding app: hand it a whole task and it plans, edits your files, and clicks through a browser to check its own work.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-08",
  changelogUrl: "https://antigravity.google/changelog/",
  accessTier: "FREE",

  howItWorks:
    "You install it like any desktop app, open a folder of code, and type what you want in plain language. It works through the task on its own — reading files, editing them, running things, even clicking through a browser — then hands back a plan and screenshots of what it did for you to approve or send back.",

  whatItIs: [
    "Google Antigravity is a free desktop app for building software with **agents** (AI that takes actions on its own rather than only answering): you hand out tasks, several run in parallel, and you review what comes back.",
    "The unusual part is the reach. As well as your files, an agent can drive a real browser, opening what it just built and clicking through it.",
    "Cursor and GitHub Copilot sit beside you as you type. Antigravity is built to be handed a task and checked on later.",
  ],

  beforeYouStart: [
    "**You must be 18 or over.** Google says Antigravity is currently unavailable to under-18 users, and checks the age on your Google account. It is a hard stop, and it rules the tool out as a school or family starting point.",
    "Sign in with a personal @gmail.com address — Google's own FAQ points people there when a work or school (Workspace) account misbehaves. Eligibility also follows the country on your Google account: most of the world, not everywhere.",
    "It costs nothing and asks for no card; the paid tiers are Google's general AI subscriptions, AI Pro and AI Ultra at $100 a month, and they buy headroom rather than features. The shape matters more than the price. The free allowance refreshes weekly, while paid plans also get a top-up roughly every five hours, so running dry on the free plan can cost you days rather than an evening.",
    "You need a folder of code to point it at. To build something without that background, Lovable in this same category works from a written description in a browser. Installs on macOS 12+, Windows 10 (64-bit)+ and Linux.",
  ],

  gettingSetUpSafely: {
    officialSource: "Google's official Antigravity download and documentation",
    body: [
      "Download only from antigravity.google. The name has attracted lookalike sites with their own downloads and their own privacy policies.",
      "First launch signs you in with Google and puts a security and data use policy on screen. That screen is worth reading rather than clicking past.",
      "Point it at a throwaway project for the first hour. Its agents change real files and run real commands on your computer, and the undo that matters is the copy you kept outside the app.",
    ],
    vendorDocsUrl: "https://antigravity.google/docs/getting-started",
  },

  security: [
    {
      kind: "text",
      text: "The work happens on your machine; the thinking happens at Google, and the files an agent touches are sent there. Free and paid use fall under the same terms, which are blunt about it: interactions are used to develop and improve Google's products and machine learning, and Google employees and contractors may access, view and review them. The opt-out is a toggle called **Enable Telemetry**, in Settings under Account.",
    },
    {
      kind: "list",
      label: "Three things that change the answer",
      items: [
        "Which model you pick changes whose rules apply — Anthropic's and OpenAI's models sit alongside Google's, and using them means agreeing to those companies' terms too.",
        "Personal and work use are different contracts. Organisations get Antigravity through Google Cloud under Google Cloud's terms, so your own Gmail sign-in is not covered by what your employer negotiated.",
        "The browser agent drives a real browser window, and whatever is loaded there during a task — a signed-in dashboard, say — is within its reach.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Being handed a whole task and left to it",
      "Several agents working at once across different projects",
      "Checking its own work by clicking through the app and recording it",
    ],
    okayAt: [
      "Being your everyday code editor",
      "Small edits, where explaining the task costs more than doing it",
      "Predicting what a task will spend",
    ],
    avoid: [
      "Anyone under 18 — Google refuses the account outright",
      "Work or school Google accounts; Google's own FAQ sends people to a personal Gmail",
      "Code a person at Google should not read, unless you have turned telemetry off",
    ],
  },

  starterActions: [
    {
      title: "Ask it to explain a project before it changes anything",
      prompt:
        "Read this project and explain what it does, where a request enters, and the three files I should read first. Do not change anything yet.",
      whyHere:
        "Antigravity answers as an artifact — a written walkthrough saved next to the project, not a chat reply that scrolls away — so your first task also shows you how it reports back on every task after it.",
      tweak: "Ask which parts look unmaintained. That answer beats the tour.",
    },
    {
      title: "Give it one small change and make it prove the change worked",
      prompt:
        "Change the homepage heading to \"[new text]\", then open the site in the browser and show me a screenshot proving it worked.",
      whyHere:
        "The browser agent is the piece GitHub Copilot has no equivalent for: it clicks through what it built and hands back a recording, so \"it works\" becomes something you watch rather than take on trust.",
      tweak: "Ask for a phone-sized window too.",
    },
    {
      title: "Make it write the plan before it writes the code",
      prompt:
        "Before you touch any files, write a plan for [the change] — what you will change, in which files, and how you will know it worked. Wait for me to approve it.",
      whyHere:
        "Where Claude Code shows you each step in a session you sit and watch, Antigravity is built to be left alone with several agents running, so an approved plan is often your only checkpoint before they act.",
      tweak:
        "Change one line of the plan before approving, and watch how it takes the correction.",
    },
    {
      title: "Find out where your free week actually ends",
      whyHere:
        "Work an ordinary afternoon, then check your usage. Running dry on Windsurf costs you until tomorrow; here the free allowance is weekly, and the five-hourly top-up that rescues a bad afternoon is a paid-plan feature.",
    },
  ],

  pitfalls: [
    "Signing in with a work or school account and hitting an eligibility error — a personal Gmail is the path of least resistance.",
    "Treating the age check as a formality. Under-18 accounts are refused, and the fix is age verification on your Google account, not a setting in the app.",
    "Reading the write-up as proof. The plan and the prose are what the agent believes it did; the screenshot and the recording are the evidence.",
  ],

  whereToNext: [
    { label: "More AI coding tools", categorySlug: "ai-coding-development" },
    { label: "Start with a chat assistant", categorySlug: "text-conversational-ai" },
  ],
};
