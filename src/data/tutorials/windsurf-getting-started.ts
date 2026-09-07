import type { PlatformTutorialData } from "./types";

export const windsurfTutorial: PlatformTutorialData = {
  slug: "windsurf-getting-started",
  platformSlug: "windsurf",
  title: "Getting Started with Devin Desktop",
  tagline:
    "A desktop code editor with an AI agent built in — the app that used to be called Windsurf.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-07",
  changelogUrl: "https://docs.devin.ai/desktop/changelog",
  accessTier: "FREE",

  howItWorks:
    "You install Devin Desktop on your own computer, like any other app. It's an **IDE** — the single window where you write, run, and debug code. Built into it is an **agent**: an AI assistant that reads your project's files, writes new ones, edits existing ones, and runs commands, rather than just answering questions in a box. You describe a job in a side panel; it proposes changes across every file that job touches, and you approve or reject them. There's also inline autocomplete that finishes lines as you type.",

  whatItIs: [
    "**This used to be called Windsurf** — and before that, Codeium. Cognition bought it in July 2025 and renamed it Devin Desktop in June 2026. Same editor, same account, same plans; `windsurf.com` now sends you to `devin.ai`. If the tutorial you're following says Windsurf, you're in the right place — the buttons just say something else now.",
    "A real desktop editor, not a browser tab. You open a project folder and work in it all day. It's honestly a developer tool: it assumes you have files and folders, and it will hand you a terminal.",
    "Why this over Cursor or Claude Code, both already on this site? Cursor is the closest comparison — a similar editor with a similar agent, and either will serve you well. Claude Code is a different shape entirely: it lives in your terminal, with no editor around it. Devin Desktop's distinguishing bet is fleet management — one subscription and one screen covering the agent on your laptop, agents running in the cloud, and a command-line version. If you just want one good editor, try this and Cursor and keep whichever feels better. If you expect to hand longer jobs to agents running somewhere other than your laptop, this side has more room to grow into.",
  ],

  beforeYouStart: [
    "There's a genuine free plan — currently $0, with unlimited inline edits and tab completions, plus a light agent quota and a reduced list of models.",
    "You need a computer you can install software on (currently macOS, Windows 10 or later, or a mainstream Linux) and a folder of code to point it at — yours, someone else's, or an empty one you're about to fill.",
    "Usage is a token budget, not a message count. Each request costs whatever the model burns on it, so a big model reading a big file costs far more than a quick question. Budgets refresh daily as well as weekly, so running dry on a Tuesday doesn't cost you the rest of the week.",
    "Will you realistically need to pay? Learning, dabbling, or mostly living off autocomplete — probably not. Hand the agent multi-file jobs most days and you'll hit the ceiling; paid entry currently sits around $20/month. Check the pricing page before you budget, because this category reprices often.",
    "First step: download from the official site, install it, sign in, and open a project. Don't pay for anything until you've felt the free quota run out at least once.",
  ],

  gettingSetUpSafely: {
    officialSource: "https://devin.ai/download — Cognition's own download page",
    vendorDocsUrl: "https://docs.devin.ai/desktop/getting-started",
    body: [
      "Download from `devin.ai/download` and nowhere else. The rename left stale \"download Windsurf\" links scattered across blogs and software-aggregator sites, and a code editor is the worst possible thing to install from a source nobody has vouched for — it runs with your permissions, on your files. `windsurf.com` redirecting to `devin.ai` is expected and fine.",
      "Pick the build that matches your machine: Apple Silicon or Intel on Mac, x64 or arm64 on Windows. Grabbing the wrong one is the usual reason a first install won't launch.",
      "Onboarding offers to import settings and keybindings from VS Code or Cursor, and you can run that import later from the command palette if you skip it. One thing to check before you switch for good: you can't install extensions from a marketplace here, and other AI-completion extensions are incompatible by design. If your work depends on a particular extension, confirm it's available before you move.",
      "Follow the vendor's own install steps rather than any third-party walkthrough, this one included: `docs.devin.ai/desktop/getting-started`. Install flows change; old blog posts don't.",
      "Confirm it worked: open a real project, open the agent panel on the right, and ask it something only your code can answer — \"what does this project do, based on the files you can see?\" A specific answer means you're installed, signed in, and the agent can see your files. Generic filler means it can't.",
    ],
  },

  security: [
    {
      kind: "text",
      text: "Your code leaves your machine. When you ask the agent anything, the relevant files are sent to a cloud model. That's how nearly every AI coding tool works and it isn't sinister — but think twice before pointing it at a client's private repository, anything under NDA, or a codebase with credentials sitting in it. There is no offline mode. If code genuinely cannot leave the building, this is the wrong category of tool.",
    },
    {
      kind: "list",
      label: "What to know about your data",
      items: [
        "By default, Cognition may use data processed through the product for model training. There's an opt-out, which also switches on Zero Data Retention with its model providers — but that control lives in paid-plan settings. On the free plan, assume your code contributes.",
        "Cognition holds SOC 2 Type II certification. That's a real audit of security controls, and the sort of thing an employer's security team will ask you about.",
        "Enterprise agreements are different: no training on your data without express prior written consent. Evaluating this for work rather than for yourself? That's the conversation to have.",
      ],
    },
    {
      kind: "text",
      text: "Understand an agent's blast radius. Autocomplete only ever adds text at your cursor. An agent can create, rewrite, and delete files and run terminal commands across your whole project. That's the point of it, and it also means a badly aimed instruction does real damage in seconds. The defence is boring and it works: keep every project in git, commit before you set the agent loose, and read what it proposes. If you can always get back to your last good commit, the worst case is a wasted afternoon rather than lost work.",
    },
  ],

  triad: {
    bestAt: [
      "Changes that span several files at once — renaming a concept everywhere, wiring a new page into an existing app, updating every call site after a function changes.",
      "Explaining a codebase you didn't write, grounded in the actual files rather than a generic pattern.",
      "Everyday typing speed. Inline completion is unlimited even on the free plan, and it's what you'll notice most in the first hour.",
    ],
    okayAt: [
      "Building from nothing when you don't yet know what you want. It'll scaffold something, but results improve sharply once you can describe the shape of the thing.",
      "Very large, old codebases. It copes, but more context means more quota spent and tighter scoping needed.",
    ],
    avoid: [
      "Work where source code genuinely cannot leave your machine. There's no local-only mode.",
      "Learning to program from zero. It will happily write code you don't understand, which feels like progress and isn't.",
      "Being your only copy of anything. It's an editor, not a backup system.",
    ],
  },

  starterActions: [
    {
      title: "Get a tour of a codebase you didn't write",
      whatItDoes:
        "Uses the agent's access to your files to explain what a project actually contains.",
      prompt:
        "Read through this project and explain what it does, what the main entry point is, and where I would go to change how the homepage looks. Assume I have never seen this code before.",
      whyHere:
        "This is the thing an editor-with-agent does that a chat window can't — it reads the real files on your disk, so the answer is about your project rather than a generic pattern. It's also the cheapest way to confirm the agent is properly wired up.",
      tweak: "Swap \"the homepage\" for whichever part you actually want to change.",
    },
    {
      title: "Your first agent edit, deliberately tiny",
      whatItDoes:
        "Has the agent make one contained change so you can practise reviewing its work before trusting it with more.",
      prompt:
        "Change the page title and the main heading on the homepage to say Hello from my first edit. Change nothing else. Then show me every file you modified.",
      whyHere:
        "The agent proposes changes and waits for your approval, and that review step is the entire safety model. Learn where the approve button is on a change small enough to check by eye.",
      tweak:
        "Commit to git first, then undo the change with git afterwards and watch how cleanly you get back.",
    },
    {
      title: "Find out where your free quota actually stops",
      whatItDoes:
        "Spends one honest week of normal work to locate your personal ceiling on the free plan.",
      whyHere:
        "Quota is measured in tokens spent, not messages, so no article can tell you how many requests you get — it depends on which model you pick and how much code each request touches. And because the budget refreshes daily as well as weekly, hitting the wall costs you hours rather than days.",
      tweak:
        "Use a cheaper, faster model for routine work and save the expensive one for the genuinely hard problem. That single habit stretches a free quota further than anything else.",
    },
  ],

  pitfalls: [
    "**Accepting large agent edits without reading them.** This is the big one. When the agent proposes changes across nine files, the approve button is right there and reading it all feels like it defeats the purpose. It doesn't. Agents confidently produce changes that are subtly wrong, delete things they judged unnecessary, or quietly refactor something you liked. Commit before every run and read the diff. If a change is too big to review, the request was too big — break it up.",
    "**Downloading it from the wrong place.** The rename left a trail of outdated links, and aggregator sites are exactly where bad builds of popular developer tools live. Only `devin.ai/download` is official.",
    "**Assuming the free tier's data terms match the paid one's.** Opting out of having your data used for model training is a paid-plan setting. If you're on free and the code is a client's, you're making that decision whether you notice it or not.",
    "**Following guides written before mid-2026 without translating.** Older tutorials say Windsurf throughout and describe an agent called Cascade that has since been retired. The concepts carry over; the menu names and screenshots don't. Check the date on anything you follow.",
    "**Treating it as a substitute for understanding your own code.** It's fast enough to ship features you couldn't have written yourself — exhilarating right up until something breaks and you don't know what any of it does. Use it to go faster at things you could have done slowly.",
  ],

  whereToNext: [
    { label: "Compare other AI coding tools", categorySlug: "ai-coding-development" },
    { label: "Run models on your own machine instead", categorySlug: "local-open-source-ai" },
  ],
};
