import type { PlatformTutorialData } from "./types";

export const clineTutorial: PlatformTutorialData = {
  slug: "cline-getting-started",
  platformSlug: "cline",
  title: "Getting Started with Cline",
  tagline:
    "A free AI coding agent that works inside your code editor — it plans, edits files and runs commands, asking your permission at each step.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-10-24",
  changelogUrl: "https://github.com/cline/cline/blob/main/CHANGELOG.md",
  accessTier: "FREE",

  howItWorks:
    "You install Cline in your editor and connect it to an AI model. You describe a change in plain language; Cline reads your project, proposes a plan, then edits files and runs terminal commands — showing each change and waiting for your approval. You pay the model provider for the AI it uses, not Cline for the tool.",

  whatItIs: [
    "Cline is an **AI coding agent** — it doesn't just suggest code, it carries out a task across your project. Its docs describe an agent that reads and writes files, runs commands and uses a browser, with every action requiring your explicit approval. It runs as an extension in VS Code and VS Code-based editors such as Cursor and Windsurf, as a JetBrains plugin, and as a command-line tool.",
    "It has two modes. In **Plan** mode it can read your code and talk the task through, but its docs say it cannot modify files or run commands. In **Act** mode it makes the changes. A good habit is to agree a plan first, then switch to Act. Cline also saves **checkpoints** — snapshots after each step, kept separately from your own Git history — so you can roll files back if a change goes wrong.",
    "You can teach it your project's habits with **rules** files (a `.clinerules` folder, or an existing `AGENTS.md`), and extend it with **MCP** servers, a standard way to plug extra tools into AI apps. The VS Code extension and CLI are open source under the Apache 2.0 licence; Cline's README says its JetBrains plugins are not open source.",
  ],

  beforeYouStart: [
    "**The tool is free; the AI isn't.** Cline's pricing page says it is completely free for individual developers, and you pay only for AI usage. You choose how: Cline's own provider (sign in, buy credits, no API key needed), ClinePass — an optional $9.99-a-month subscription for extra usage on selected open coding models, per Cline's docs as of 24 October 2026 — or your own key from a provider such as Anthropic, OpenAI or OpenRouter, billed at that provider's rates.",
    "**Some free models exist, with conditions.** Cline's docs describe rotating, time-limited free models for anyone with a Cline account, up to a quota, and note that free-model usage may be used to help improve those models. Don't use them for private code.",
    "**Running a model on your own computer is possible but demanding.** Cline works with Ollama and LM Studio; its docs suggest 16–32 GB of memory for small models and 64 GB or more for larger ones, and warn local models are much slower.",
    "**You should be comfortable reading code.** Cline asks you to approve each change and command. If you can't tell whether a change is safe, start with a chat assistant instead.",
  ],

  gettingSetUpSafely: {
    officialSource:
      "Install from your editor's marketplace and check the publisher. In VS Code the genuine extension's ID is `saoudrizwan.claude-dev`, published as \"Cline\" with a verified cline.bot badge; JetBrains users install the \"Cline\" plugin from the JetBrains Marketplace.",
    body: [
      "**Keep auto-approve narrow.** Cline can be set to approve some actions automatically. Its docs recommend auto-approving only \"Read project files\" at first, and call YOLO mode — which approves everything — dangerous, because Cline could delete files or push commits.",
      "**Know that `.clineignore` isn't a lock.** Cline's docs say this file is being deprecated and is not a security boundary: ignored files can still be reached through mentions or shell commands. Keep secrets like `.env` files out of projects you open with an agent, or use the blocking hook its docs describe.",
      "**Decide on telemetry.** Cline's usage reporting is on by default. Its docs say it doesn't include your code or prompts when you use your own key, but can include prompts when you use Cline's own provider. Turn it off under Settings → General → \"Allow error and usage reporting\".",
      "**Confirm it works.** Open an empty folder, switch to Act mode and ask for something tiny, like a one-page HTML to-do list. Approving the first file it writes is your setup checkpoint.",
    ],
    vendorDocsUrl: "https://docs.cline.bot/getting-started/installing-cline",
  },

  security: [
    {
      kind: "text",
      text: "Cline acts on your real files and terminal, so the safety model is your approvals. Read each diff and each command before you accept it. Cline's docs say the model itself decides which commands count as \"safe\" — there is no fixed allowlist — which is why approving commands automatically is a bigger step than approving file reads.",
    },
    {
      kind: "list",
      label: "Where your code goes:",
      items: [
        "With your own API key, Cline's privacy notice says your content goes straight to that provider and Cline doesn't collect it.",
        "With Cline's own provider or ClinePass, Cline receives your prompts and passes them to the model provider, some of which may train on it unless you opt out.",
        "Only install MCP servers you trust; Cline's docs say so plainly, because an MCP server is code with access to what Cline can reach.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Multi-file changes you can describe in a sentence, with a plan you approve before anything is edited.",
      "Choosing your own AI model and provider, including running locally.",
      "Undoing mistakes, thanks to checkpoints separate from your Git history.",
    ],
    okayAt: [
      "Keeping costs predictable. You pay per token, and Cline's docs note its running cost estimate can differ from your actual bill.",
      "Very long tasks. When the context fills up, Cline compresses it, and its docs warn earlier details may be lost.",
    ],
    avoid: [
      "YOLO mode or broad auto-approval on a project you care about.",
      "Opening folders that contain secrets or credentials.",
    ],
  },

  starterActions: [
    {
      title: "Build something tiny from scratch",
      prompt:
        "Create a simple to-do list app in a single HTML file. It should let me add items, tick them off, and delete them. No frameworks.",
      whyHere:
        "Cline's own walkthrough starts with a to-do app in an empty folder. Approving each file shows you the whole loop — plan, edit, approve — with nothing at risk.",
      tweak: "Then ask it to add one feature, and watch how it edits rather than rewrites.",
    },
    {
      title: "Plan before you act",
      prompt:
        "Read this project and explain what each top-level folder does. Then suggest a plan to add input validation to the signup form. Don't change any files yet.",
      whyHere:
        "Run this in Plan mode, which can't modify files. Correcting a plan costs a few messages; correcting a botched edit costs more.",
    },
    {
      title: "Write down your house rules",
      prompt:
        "Create a project rule that says: use TypeScript, keep functions small, and never edit files in the generated/ folder.",
      whyHere:
        "Use `/newrule` with this. Rules save you repeating yourself, though Cline's docs note they use up context on every request — keep them short.",
    },
    {
      title: "Practise rolling back",
      whatItDoes:
        "After Cline makes a change, open the checkpoint for that step and choose Restore Files.",
      whyHere:
        "Knowing you can undo makes it easier to let the agent work — try it once on something unimportant.",
    },
  ],

  pitfalls: [
    "**One giant task.** Long conversations cost more and lose detail; start a fresh task with `/newtask` for a new job.",
    "**Approving commands you don't understand.** If a command looks unfamiliar, ask Cline what it does before approving.",
    "**Different defaults after an update.** Cline's changelog warns default models can change between versions; pick your model explicitly.",
    "**Assuming the cheapest model is enough.** Cline lets you use a stronger model for Plan mode and a cheaper one for Act.",
  ],

  whereToNext: [
    { label: "More AI coding tools", categorySlug: "ai-coding-development" },
    { label: "Run models locally", categorySlug: "local-open-source-ai" },
    { label: "AI APIs for your own key", categorySlug: "ai-apis-developer-services" },
  ],
};
