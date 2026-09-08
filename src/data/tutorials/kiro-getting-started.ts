import type { PlatformTutorialData } from "./types";

export const kiroTutorial: PlatformTutorialData = {
  slug: "kiro-getting-started",
  platformSlug: "kiro",
  title: "Getting Started with Kiro",
  tagline: "AWS's code editor that writes the plan down before it writes any code.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-08",
  changelogUrl: "https://kiro.dev/changelog/",
  accessTier: "FREE",

  howItWorks:
    "You open Kiro on your computer, type what you want built in a side panel, and instead of writing code straight away it writes back a short plan you read and approve. Once you approve it, Kiro edits the files in your project itself, one step at a time, and you check each change.",

  whatItIs: [
    "Kiro is a code editor from AWS, Amazon's cloud division, with an AI **agent** (AI that takes actions on its own rather than only answering) built into it.",
    "Its distinguishing idea is that the agent writes the plan down first. Ask for a feature and Kiro produces three plain Markdown files — requirements, design, and a task list — inside a `.kiro/specs/` folder in your project. AWS calls this spec-driven development.",
    "It launched in preview in July 2025 and became generally available in November 2025, so there is no waitlist. It's built on Code OSS, the open code underneath VS Code, so a VS Code user can import their settings, themes and most add-ons the first time they open it.",
  ],

  beforeYouStart: [
    "Kiro is for people who already write code, or are actively learning to. It works on a project folder that already exists on your computer, and what it produces is code you are responsible for reading. If you want to build something with AI without that background, a browser-based tool like Lovable is a gentler place to start.",
    "Getting in is free and quick: download from kiro.dev, sign in with GitHub, Google or an AWS Builder ID, and no card is asked for.",
    "The free plan gives you 50 **credits** (the platform's unit of spend — each thing you make costs some) a month. They reset at the start of each billing month, don't roll over, and can't be topped up on the free plan. A simple question can cost under one credit; running a spec task usually costs more than one — so 50 is an evening of experimenting, not a month of work. If you want more, paid plans currently start at $20/month for 1,000 credits.",
    "Which AI does the work changes how fast that runs out. The free plan includes Claude Sonnet 4.5 with limits plus several cheaper open-weight **models** (the AI \"brain\" that does the actual thinking). There is also a version for people who prefer typing commands, and a browser version, but the browser one needs a paid plan.",
  ],

  gettingSetUpSafely: {
    officialSource:
      "Download only from kiro.dev/downloads. A code editor gets access to everything in the project folders you open with it, so this is not the software to take from a search ad, a mirror site, or a link someone sent you.",
    body: [
      "Check there's a build for your machine: macOS (Apple Silicon and Intel), Windows x64, and Linux (Debian/Ubuntu 24 or later).",
      "Change the data setting before your first real project, not after — see below.",
      "Point it at a scratch project first. Kiro edits files itself, so let the first spec run somewhere nothing is lost if it goes wrong.",
    ],
    vendorDocsUrl: "https://kiro.dev/downloads/",
  },

  security: [
    { kind: 'text', text: "The question to settle before your first project isn't whether Kiro sees your code; it has to. It's what AWS is allowed to keep. On the free plan the default is that your prompts, Kiro's replies and the code it generates may be used for service improvement, including model training. One setting turns all of it off: Settings → User sub-tab → Application → Telemetry and Content → Disabled." },
    { kind: 'list', label: 'Before you point it at anything real', items: [
      "Kiro's privacy page words the paid exemption around \"an Amazon Q Developer Pro subscription\", while its FAQ words it around Pro and above signed in through AWS IAM Identity Center. If you are counting on being exempt, confirm it against your own account rather than the docs.",
      'Agent hooks fire on their own when files are saved or created. They\'re useful, and they spend credits without you typing anything.',
    ] },
  ],

  triad: {
    bestAt: [
      "Turning a vague feature idea into a written plan you can argue with before any code exists",
      "Working through a multi-step change one approved task at a time",
      "Coming back to a project later — the spec files are ordinary Markdown left in your folder, so the reasoning is still there",
    ],
    okayAt: [
      "Small one-line edits — you can chat to it without a spec, but the ceremony is the point of the tool, and a plain chat assistant is faster for a typo",
      "Large existing codebases — it will take them on, but the review burden scales with everything it touches",
    ],
    avoid: [
      "Assuming privacy is the default. Content collection is on unless you turn it off, and the exemption the docs describe is written for paid, AWS-account sign-ins.",
      "Treating the approval gates as a safety net you can't lose. Quick Spec generates requirements, design and tasks in one go with no review step between them, and it sits one click from the normal flow.",
    ],
  },

  starterActions: [
    {
      title: "Your first spec",
      prompt:
        "Create a spec for a small to-do list app I can run from my own machine: add a task, list tasks, mark one done, saved to a local file. Stop after the requirements and wait for me to approve them.",
      whyHere:
        "The \"stop and wait\" is the mechanism, not politeness — Kiro writes `requirements.md`, `design.md` and `tasks.md` into `.kiro/specs/` and pauses between each, so you rewrite the plan while it still costs a credit instead of a whole implementation.",
      tweak: "Swap in a feature for a project you already have open.",
    },
    {
      title: "Set the model before you spend anything",
      whatItDoes:
        "In the chat panel's model picker, move off the default Auto to one of the cheap open-weight options for routine work.",
      whyHere:
        "Kiro prices every model as a multiplier of Auto — currently as low as 0.05x, against 1.3x for Claude Sonnet 4.5 — so on a 50-credit month the picker, not the prompt, is what decides how long you last.",
    },
    {
      title: "Write your conventions down once",
      prompt:
        "Read this project and generate steering files for it — product, tech and structure — then show me what you inferred so I can correct it.",
      whyHere:
        "Kiro keeps these as three separate files — `product.md`, `tech.md`, `structure.md` — in `.kiro/steering/`, and you can keep a global set in `~/.kiro/steering/` that applies to every project, so a correction you make once outlives the chat you made it in.",
      tweak: "Correct the generated files by hand; they're plain Markdown.",
    },
    {
      title: "Give it a check that runs on its own work",
      prompt:
        "Add a hook that runs my linter whenever you save a TypeScript file, then tell me what it caught.",
      whyHere:
        "Kiro's file hooks fire on the agent's saves rather than yours, so the check lands on machine-written code.",
    },
  ],

  pitfalls: [
    "The 50 free credits go faster than the number sounds. Spec refinement, task execution and hook runs all come out of the same monthly pool, and they don't carry over.",
    "Approving a task list is not reading the code. The plan can be right and the implementation still wrong.",
    "It's a whole editor, not a plugin. Using it means switching editors; importing your VS Code settings softens that but doesn't remove it.",
    "The docs lag the product in places — the privacy page still frames the paid exemption around Amazon Q Developer Pro, a name that predates today's plan list. Check anything you're relying on inside the app.",
  ],

  whereToNext: [
    { label: 'AI coding tools', categorySlug: 'ai-coding-development' },
    { label: 'APIs and developer services', categorySlug: 'ai-apis-developer-services' },
    { label: 'Run AI on your own machine', categorySlug: 'local-open-source-ai' },
  ],
};
