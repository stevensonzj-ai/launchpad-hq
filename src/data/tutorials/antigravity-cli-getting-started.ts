import type { PlatformTutorialData } from "./types";

export const antigravityCliTutorial: PlatformTutorialData = {
  slug: "antigravity-cli-getting-started",
  platformSlug: "antigravity-cli",
  title: "Getting Started with Antigravity CLI",
  tagline:
    "Google's terminal coding agent, and since June 2026 the place Google sends anyone who used Gemini CLI for free.",
  archetype: "prompts",
  lastReviewedAt: "2026-10-29",
  changelogUrl: "https://github.com/google-antigravity/antigravity-cli",
  accessTier: "FREE",

  howItWorks:
    "You open a text window on your computer, start it inside a project folder, and type what you want in plain English. It reads your files, proposes changes, runs commands to check its work, and reports back. You read what it did and say what to fix next.",

  whatItIs: [
    "Antigravity CLI is Google's coding **agent** — AI that takes actions on its own rather than only answering — driven from a **terminal**, the text window where you type instructions instead of clicking. The command you type to start it is `agy`. Google describes it as the terminal surface for the same agent that runs inside its Antigravity desktop app.",
    "It is the successor to Gemini CLI for individuals. On 18 June 2026 Gemini CLI stopped answering free personal Google accounts and Google AI Pro and Ultra subscribers, and Google moved all of them here. Google says plainly that there is no one-to-one feature match, so an old Gemini CLI habit may not have an exact equivalent.",
    "Unlike Gemini CLI, it is not open source. Google publishes no source code or open licence for it; it ships as a ready-made program under Google's Antigravity terms.",
  ],

  beforeYouStart: [
    "A personal Google account is enough to start, and the individual plan costs nothing. You must be 18 or over and in a country Google supports. The catch is the allowance: Google describes it only as \"a meaningful quota, refreshed weekly\", publishes no numbers, and says its limits can change. A heavy weekend can use up the week.",
    "If the weekly allowance runs out too often, Google's paid AI subscriptions raise it. Google AI Pro ({{price:antigravity-cli:Google AI Pro}}) refreshes a higher allowance every five hours until a weekly limit is reached; Google AI Ultra (from {{price:antigravity-cli:Google AI Ultra}}) gives the highest allowance and adds models from other companies. Pro and Ultra can also buy extra AI credits for use past the allowance.",
    "You cannot plug in your own API key — a password that bills your own AI account — because Google says it does not support that here. If paying per use with a key is what you want, that is the route Gemini CLI still offers.",
    "Which AI **model** — the \"brain\" doing the thinking — you get depends on the plan. Every plan has a fast Gemini model as its main agent. Paid plans add Google's newest Gemini model and Anthropic's latest Claude models. Google's model page says some older models on the individual plan are due to be removed on 2 November 2026, so check that page if a model you rely on disappears.",
  ],

  gettingSetUpSafely: {
    officialSource: "Google's Antigravity CLI getting-started page at antigravity.google",
    body: [
      "Install only with the command on that page: a script you paste into the terminal on a Mac or Linux computer, or a PowerShell command on Windows. Copying an install command from anywhere else runs someone else's script on your machine. Then type `agy --version` to check it worked. It keeps itself up to date after that.",
      "Start it inside one project folder whose changes you track, and nowhere else. It edits real files and runs real programs.",
      "Moving from Gemini CLI? Google's migration guide covers bringing your extensions across, where they are now called plugins.",
    ],
    vendorDocsUrl: "https://antigravity.google/docs/getting-started",
  },

  security: [
    {
      kind: "text",
      text: "Nothing runs on your own hardware. Every request goes to Google's servers, so code you are not allowed to share with Google should not go in here.",
    },
    {
      kind: "list",
      label: "What Google's Antigravity terms say, for personal accounts",
      items: [
        "Google uses what you send and receive — its terms call these \"Interactions\" — to \"evaluate, develop, and improve\" its products and machine-learning technologies.",
        "\"Google employees and contractors may access, view, review and use Interactions\", and the terms ask you not to submit confidential information.",
        "The opt-out is a setting called **Enable Telemetry**. Google's FAQ says \"You can opt out of data collection at any point from the Settings panel,\" and the terms say that if you do not want your Interactions used this way you can change that preference in settings. For the CLI it is saved with your account rather than in a settings file. It is on by default for personal accounts, so switch it off before you point the CLI at real work.",
        "Switching it off does not stop everything. The terms say that even with telemetry off, Google still uses your data to provide the service, process any feedback you send and help keep Antigravity safe. The terms make no distinction between the free plan and a paid Google AI plan for personal accounts, and we found no separate paid-individual wording.",
        "Business accounts (Google Workspace, Gemini Enterprise) are different: the CLI documentation says telemetry is always off for them, and they follow their organisation's Google Cloud terms.",
        "To have your Interactions deleted, the terms say to email Google's Antigravity support team. There is no self-serve delete button described.",
        "Work and school accounts are different: they follow whatever Google Cloud or Workspace terms your administrator signed.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Free terminal coding with Google's models for people who had been using Gemini CLI on a personal account",
      "Working across a whole project folder: reading it, changing several files, then running commands to check",
      "Picking up where the Antigravity desktop app leaves off, since both use the same agent",
    ],
    okayAt: [
      "Predicting how far the free allowance goes, because Google publishes no numbers",
      "Matching a Gemini CLI setup, since Google says features do not carry over one to one",
    ],
    avoid: [
      "Code you are barred from sharing, unless telemetry is off: with it on, personal-account conversations can be read by Google reviewers",
      "Anything that needs your own API key or a fixed per-use bill — that is Gemini CLI's route, not this one",
    ],
  },

  starterActions: [
    {
      title: "Ask it to explain the project before it changes anything",
      prompt:
        "Read this project and explain in plain English what it does, how the folders fit together, and how to run it. Don't change any files yet.",
      whyHere:
        "On a weekly allowance with no published numbers, a read-only first request shows how much one task costs you before you spend the week on edits.",
    },
    {
      title: "Get a plan you can approve",
      prompt:
        "I want to add a dark mode toggle to the settings page. List the files you would change and what you would change in each, then wait for me to say go.",
      whyHere:
        "It edits real files and runs real commands, so splitting plan from action gives you one clear place to say no before anything on disk changes.",
      tweak: "Swap in the change you actually want; keep the last sentence.",
    },
    {
      title: "Bring your Gemini CLI extensions across",
      whatItDoes:
        "Follow Google's Gemini CLI migration guide to import your old extensions as Antigravity plugins, then list them to see what came over.",
      whyHere:
        "Antigravity CLI is where Gemini CLI's free users were sent, and Google renamed extensions to plugins on the way. Checking what imported is quicker than finding a missing tool mid-task.",
    },
  ],

  pitfalls: [
    "**Guides written for Gemini CLI do not all apply.** Google says there is no one-to-one feature match, so steps written for Gemini CLI may not work as written here.",
    "**The allowance resets weekly, not daily.** Running out early in the week means waiting, or upgrading, until it refreshes.",
    "**It is not the same thing as Google Antigravity, the desktop app.** They share an agent, but the app is a separate download with its own catalog page.",
  ],

  whereToNext: [
    { label: "Gemini CLI, the paid-key route it replaced", href: "/platform/gemini-cli" },
    { label: "Google Antigravity, the desktop app", href: "/platform/google-antigravity" },
    { label: "Other AI coding tools", categorySlug: "ai-coding-development" },
  ],
};
