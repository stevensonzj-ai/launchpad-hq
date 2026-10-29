import type { PlatformTutorialData } from "./types";

export const hermesAgentTutorial: PlatformTutorialData = {
  slug: "hermes-agent-getting-started",
  platformSlug: "hermes-agent",
  title: "Getting Started with Hermes Agent",
  tagline:
    "A free, open-source AI agent from Nous Research that you run yourself or have hosted, and message from the chat apps you already use.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-10-29",
  changelogUrl: "https://github.com/NousResearch/hermes-agent/releases",
  accessTier: "FREE",

  howItWorks:
    "You install Hermes on your computer or a server, or let Nous host it, and connect it to an AI model. Then you message it from the terminal, its desktop app or a chat app such as Telegram. It works through the task, replies with the result, and remembers what it learned for next time.",

  whatItIs: [
    "Hermes Agent is an **AI agent** (AI that takes actions on its own rather than only answering) made by Nous Research. It is **open-source** under the MIT license: the code is public and anyone can inspect it. Nous calls it \"self-improving\" because it keeps a memory of past work and writes its own reusable skills as it goes; its skills follow the agentskills.io format.",
    "Where it runs is up to you. On your own machine there is a command-line version, a desktop app for Mac and Windows, Linux support and an Android route through Termux. Nous's site says it can also run on a rented server, a GPU cluster or serverless infrastructure. Or a Nous Portal account can host it in the cloud for you, running around the clock.",
    "Once it is running you can reach it from Telegram, Discord, Slack, WhatsApp, Signal or email as well as the command line. It can run tasks on a schedule, hand parts of a job to helper agents it starts itself, and plug into outside tools through MCP, the connector standard many AI apps share.",
  ],

  beforeYouStart: [
    "Hermes itself costs nothing, but it does not come with an AI model. You connect a **model provider**, the company whose AI does the thinking, such as OpenAI, OpenRouter or Nous's own Portal, and that provider bills you in its own way. Nous's site puts it plainly: \"Model providers and optional hosted services have their own pricing.\"",
    "Nous Portal is the optional paid side. It has a free plan, and paid plans run from {{price:hermes-agent:Plus}} up to {{price:hermes-agent:Ultra}}. Neither Nous page we checked states annual pricing or a free trial. Nous lists its Tool Gateway, which adds web search, images, text-to-speech and a browser, as a paid-subscription feature.",
    "Running it yourself means installing software and linking it to a provider account; the desktop app is the gentlest way in. If you would rather have nothing to install, Lindy AI is a hosted assistant agent in the same part of the catalog.",
    "The hosted option needs a Nous Portal account. Nous says the server costs for a cloud agent are billed to your Portal balance, and it does not say which region or company hosts those servers.",
  ],

  gettingSetUpSafely: {
    officialSource:
      "Download only from Nous Research's own pages: the site at hermes-agent.nousresearch.com and the code at github.com/NousResearch/hermes-agent. An agent acts on the machine it runs on, so a lookalike download from a search result does more damage here than a fake chat app would.",
    body: [
      "Choose where its work happens before you install. Nous lists your own computer, Docker, a remote machine over SSH, and hosted sandboxes from Modal, Daytona and Vercel. Your own computer is the simplest to start with.",
      "Connect one model provider and one chat app first. Add more once you have seen how it behaves.",
      "Confirm it works: send it a small task and get a reply back in the app you connected. That is your \"set up correctly\" checkpoint.",
    ],
    vendorDocsUrl: "https://hermes-agent.nousresearch.com/docs/",
  },

  security: [
    {
      kind: "text",
      text: "Where your words go depends on how you run Hermes, and on which model provider you connect.",
    },
    {
      kind: "list",
      label: "What Nous Research's pages say",
      items: [
        "Self-hosted, Hermes stores your conversations, memories and skills on your own machine. Your prompts still go to the model provider you chose, under that provider's own policy.",
        "Nous Portal's privacy policy (last updated September 28, 2026) says Portal collects prompts, outputs and conversation history, and that data may go to providers for \"training, fine-tuning\".",
        "The same policy describes a Privacy Mode that lets you \"opt out of the storage and use of certain inference payloads for training\". It is an opt-out, so switch it on if you use Portal.",
        "The policy does not state how long data is kept.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "A personal assistant you message from Telegram, Signal, WhatsApp or email, rather than a separate website you have to open",
      "Recurring jobs on a schedule, run by an agent that stays on around the clock on your own server or in Nous's cloud",
      "Keeping what it learns (conversations, memories and the skills it writes) on hardware you control",
    ],
    okayAt: [
      "Ease of setup. There is a desktop app, but picking a provider and a place for it to run is still your job.",
      "Predicting cost. The bill depends on the provider you connect and how much work the agent decides to do.",
    ],
    avoid: [
      "Running it straight on a computer that holds work you can't afford to have changed, when Docker or a hosted sandbox is on its list of places to work.",
    ],
  },

  starterActions: [
    {
      title: "Start on your own computer",
      whatItDoes:
        "Install the desktop app or the command-line version from Nous's site, connect one model provider, and send it a first message.",
      whyHere:
        "Hermes ships without a model of its own, so this first exchange is where you see what your chosen provider charges for real agent work before you leave anything running unattended.",
    },
    {
      title: "Connect the chat app you already use",
      whatItDoes:
        "Link Telegram, Discord, Slack, WhatsApp, Signal or email, then message Hermes from your phone.",
      whyHere:
        "Reaching it from your own messaging apps is what Hermes is built around; a terminal agent such as Claude Code or Codex CLI waits for you at a keyboard instead.",
      tweak: "Pick one app to start with; each one you add is another place it takes instructions from.",
    },
    {
      title: "Schedule one small recurring task",
      whatItDoes:
        "Ask it to do something on a timetable, such as a short morning summary sent to your chat app.",
      whyHere:
        "Hermes has scheduling built in, so the job runs on your machine or in Nous's cloud without you opening anything. A week of small runs shows whether it is reliable and what it costs.",
    },
    {
      title: "Read the skills it writes for itself",
      whatItDoes:
        "After a few tasks, look over the skills Hermes has created and remove any you don't want it to reuse.",
      whyHere:
        "Writing its own skills is Nous's headline feature, and Hermes saves them alongside its memory, so they shape what it does next time without you asking.",
    },
  ],

  pitfalls: [
    "**Two descriptions of the same plans.** Nous's agent site and its Portal describe what each paid plan includes in different ways. Read the Portal's own pricing page at checkout rather than either summary.",
    "**A fast-moving project.** Hermes is updated through GitHub releases, so menus and steps can change between versions. If this guide doesn't match what you see, check the releases page.",
  ],

  whereToNext: [
    { label: "More workflow & automation tools", categorySlug: "workflow-automation" },
    { label: "Local & open-source AI", categorySlug: "local-open-source-ai" },
    { label: "AI coding agents", categorySlug: "ai-coding-development" },
  ],
};
