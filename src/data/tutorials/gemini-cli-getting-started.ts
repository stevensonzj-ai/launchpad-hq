import type { PlatformTutorialData } from "./types";

export const geminiCliTutorial: PlatformTutorialData = {
  slug: "gemini-cli-getting-started",
  platformSlug: "gemini-cli",
  title: "Getting Started with Gemini CLI",
  tagline:
    "Google's terminal coding agent — still shipping, but since June 2026 it no longer opens to a free Google account.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-08",
  changelogUrl: "https://geminicli.com/docs/changelogs/",
  accessTier: "FREE",

  howItWorks:
    "You open a text window on your computer, start it inside a project folder, and type what you want in plain English. It reads the files itself, proposes edits, runs commands to check its work, and asks before changing anything. You read what it did and say what to fix.",

  whatItIs: [
    "Gemini CLI is Google's coding **agent** — AI that takes actions on its own rather than only answering — driven from a **terminal**, the text window where you type instructions instead of clicking. It works on a whole project at once, not one file.",
    "Since 18 June 2026 it no longer serves free personal Google accounts, or Google AI Pro and Ultra subscribers. Google moved individuals to a separate tool, Antigravity CLI, which is where a beginner should now start.",
    "The software is alive: the code is public and releases ship most weeks. It just answers only to an organisation's Code Assist licence or a paid Gemini **API key** — a password that identifies your app and spends your money.",
  ],

  beforeYouStart: [
    "Settle access before you install. A personal Google account no longer works; the two live routes are a Gemini Code Assist Standard or Enterprise licence, bought per seat by an organisation, or a paid Gemini API key. Without one it installs fine and then refuses to answer.",
    "There is no monthly price for an individual — a paid key bills you for what you use, so a heavy week has no ceiling until you set a budget yourself.",
    "Expect Google's documentation to lag Google's product: the quota page still lists a free 1,000-requests-a-day tier, and the sign-in page still recommends a personal account. The banner above them is current; the pages beneath are not.",
    "You need code on your own disk and enough comfort with a terminal to install a package. If not yet, Google's Gemini assistant in a browser writes and explains code with nothing to install.",
  ],

  gettingSetUpSafely: {
    officialSource: "Google's official Gemini CLI documentation",
    body: [
      "Install from Google's own listing only — `npx @google/gemini-cli`, a global `npm install -g @google/gemini-cli`, or `brew install gemini-cli`. Lookalikes exist and third-party instructions run a version behind.",
      "Keep it to one project folder whose changes are tracked. It edits real files and runs real programs.",
    ],
    vendorDocsUrl: "https://geminicli.com/docs/",
  },

  security: [
    {
      kind: "text",
      text: "Nothing runs on your own hardware. Every request leaves your machine for Google's models, so a codebase you are barred from sharing is barred from this too.",
    },
    {
      kind: "list",
      label: "Which door you came in decides your data terms",
      items: [
        "On a paid Gemini API key, Google's terms say it does not use your prompts or responses to improve its products. On the unpaid tier the same terms say the opposite, and that human reviewers may read them. The tool never tells you which you are on.",
        "It also sends usage statistics by default — which tools ran, which model, how long, though Google states not the content of your prompts. One setting turns that off: `privacy.usageStatisticsEnabled: false` in `~/.gemini/settings.json`.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Reading a project you did not write and explaining how it fits together",
      "Changes that touch several files and must stay consistent",
      "Working from a picture — app-from-an-image-or-PDF is Google's own headline claim",
    ],
    okayAt: [
      "Costing what you expect, since the bill tracks how long a session stays open, not the size of the task",
      "Being learnable from what is written about it, since most guides predate the June change",
    ],
    avoid: [
      "Its own setup pages, which still recommend the sign-in Google switched off in June",
      "Depending on a free Google developer tier; this one ended a month after it was announced",
    ],
  },

  starterActions: [
    {
      title: "Work out which door is open to you, before you install",
      whyHere:
        "Claude Code's entry check is one question — is your plan paid. Here the sign-in Google's own docs recommend is still there and still fails, so the only check that holds is what you own: a Code Assist licence, or a key with billing on. If it is neither, Antigravity CLI is where Google now sends you.",
    },
    {
      title: "Hand it a picture instead of a description",
      prompt:
        "@mockup.png Build a single plain HTML and CSS page matching this layout, then list the three things you had to guess.",
      whyHere:
        "The `@` prefix pastes a file straight into the prompt with no upload step, and app-from-an-image is the line Google leads with — not where Claude Code or Cursor put their emphasis.",
    },
    {
      title: "Write a `GEMINI.md` in the project root",
      prompt:
        "Read this project and draft a GEMINI.md: what it is, how to run its tests, the conventions you can infer, and three things never to change without asking me.",
      whyHere:
        "Context files load in a hierarchy — home folder, then workspace, then more as it touches directories — so a project file applies every session, and the filename setting takes a list, so a conventions file you already have can be reused.",
      tweak: "Keep it short. Every session pays for it whether it needs it or not.",
    },
  ],

  pitfalls: [
    "Nearly every Gemini CLI guide online opens with the free personal-account login it no longer has.",
    "A Google AI Pro or Ultra subscription does not cover it — it did until 18 June 2026, and the CLI simply stopped answering it.",
  ],

  whereToNext: [
    { label: "Other AI coding tools", categorySlug: "ai-coding-development" },
    { label: "Google's assistant in a browser", categorySlug: "text-conversational-ai" },
    { label: "Build with an API directly", categorySlug: "ai-apis-developer-services" },
  ],
};
