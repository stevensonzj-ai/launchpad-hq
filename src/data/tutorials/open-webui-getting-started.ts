import type { PlatformTutorialData } from "./types";

export const openWebuiTutorial: PlatformTutorialData = {
  slug: "open-webui-getting-started",
  platformSlug: "open-webui",
  title: "Getting Started with Open WebUI",
  tagline:
    "The chat interface you run yourself — you bring the model, it brings everything else.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-07",
  changelogUrl: "https://github.com/open-webui/open-webui/releases",
  accessTier: "FREE",

  howItWorks:
    "You install Open WebUI on your own computer and open it in a browser tab — except the site runs on your machine, not someone else's. That's what **self-hosted** means. What you type goes to whichever AI you've connected.",

  whatItIs: [
    "A browser-based chat window for AI you host yourself. It has no **model** of its own — the model is the AI \"brain\" that does the thinking — so you connect one separately.",
    "Why this over Jan or LM Studio: those are desktop apps, one person, one computer. This one keeps running in the background, so your household reaches it from their own phones and logins.",
  ],

  beforeYouStart: [
    "Free, and the code is public — no account, no trial, no card. The company sells licensing to large organisations; nothing you'd run is paywalled.",
    "**Open WebUI is not an AI.** Install it and you get an empty model dropdown — sort out the AI half first. Ollama is the usual answer, and this site has a page for it.",
    "The real question isn't whether you're technical, it's whether you want a small server in your house. You'll need **Docker** (a way of running an app in a self-contained box, so you don't install its parts by hand). If you only want AI on your laptop, **Jan** or **LM Studio** do it in an afternoon.",
  ],

  gettingSetUpSafely: {
    officialSource: "https://openwebui.com/",
    vendorDocsUrl: "https://docs.openwebui.com/getting-started/quick-start/",
    body: [
      "Install only from the official project — the site above, or `open-webui/open-webui` on GitHub. Lookalikes exist, and this one holds your keys and chat history.",
      "Follow its official quick-start, not a forum post; commands change between versions. Docker is the recommended path, Python and a desktop app the alternatives.",
      "Open WebUI currently finds a local Ollama by itself in the standard Docker setup; an online provider needs its address and key in Settings.",
      "**Make the admin account yourself, immediately** — the first account on a fresh install becomes the administrator and sign-up closes behind it. Then open the address the docs give you (currently port 3000 for Docker, 8080 for Python and desktop) and send one message; an empty model dropdown means no AI is connected.",
    ],
  },

  security: [
    {
      kind: "text",
      text: "Its privacy posture isn't fixed — your model source decides it.",
    },
    {
      kind: "list",
      label: "What your setup actually determines",
      items: [
        "A model on your own hardware: conversations never leave the machine. It works with the internet unplugged.",
        "An online provider connected with an **API key** — a password that identifies your app and spends your money, whoever on your instance uses it — sends those chats to them, under their terms.",
        "Check which model is selected before pasting anything sensitive: the dropdown is the privacy boundary.",
      ],
    },
    {
      kind: "text",
      text: "Securing it is your job: keep it on your home network unless you have a reason not to. An instance left open is a stranger's free chat window on your hardware.",
    },
  ],

  triad: {
    bestAt: [
      "One shared chat window for a household or small team",
      "Local and online models in one place, switched from a dropdown",
    ],
    okayAt: [
      "One person on one computer — more machinery than you need",
      "Document chat and web search — supported, and fiddly to get right",
    ],
    avoid: [
      "Access from anywhere, without the job of securing a server",
      "Any expectation of intelligence on its own — it ships with none",
    ],
  },

  starterActions: [
    {
      title: "Connect exactly one model source, then stop",
      whyHere:
        "The settings surface is large, and the temptation is to configure everything before it works. Later problems are easier to diagnose from one known-good path.",
    },
    {
      title: "Lock the front door",
      whyHere: `Unlike a desktop app, this is a server the moment it starts — the only tool in this category where "who else can reach this?" is a question you answer yourself.`,
    },
    {
      title: "Ask the same question of two models",
      prompt:
        "Explain in plain language why an AI on my own laptop might answer more slowly than one on a company's servers. Under 200 words.",
      whyHere:
        "One question against a model on your machine and one online, in the same window, shows what this is for, and where a small local model's limits are.",
    },
  ],

  pitfalls: [
    "**Assuming self-hosted means private.** It means private **if your model is local**. Add an online provider's key and those chats go to them like any cloud tool.",
    "**Fighting your Python version.** That install route currently supports a specific range and refuses newer releases outright. Docker sidesteps it.",
    "**Installing it and never updating it.** The project currently ships releases every few weeks, and a self-hosted app doesn't update itself.",
  ],

  whereToNext: [
    { label: "Local & Open-Source AI", categorySlug: "local-open-source-ai" },
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
  ],
};
