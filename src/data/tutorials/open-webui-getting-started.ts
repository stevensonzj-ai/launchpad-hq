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
    "You install Open WebUI on your own computer or home server and open it in a browser tab, except the site is running on your machine rather than someone else's. That's what **self-hosted** means. You get the chat window: history, document uploads, accounts, settings. You don't get the intelligence behind it. You point Open WebUI at a **model** (the AI itself — the thing that reads your message and writes back), and you supply that separately: a local runner like Ollama on the same machine, or a hosted provider connected with an **API key** (a private string that lets one piece of software use your account on another). Most people do one. Some do both and switch in the same dropdown.",

  whatItIs: [
    "A browser-based chat interface for AI models you host yourself, rather than a service you sign into.",
    "It has no model of its own. It's the front end; the model is a separate thing you connect.",
    "Why pick it over Jan or LM Studio: those are desktop apps, one person on one computer. Open WebUI runs as a small server, so you can reach it from your phone or laptop on the same network, and give your household or team their own logins and histories.",
    "It connects to local and hosted models side by side, so one interface covers both.",
  ],

  beforeYouStart: [
    "Free and open-source. No account, no trial, no card. The company sells enterprise licensing to large organisations; nothing in the self-hosted version is time-limited or paywalled.",
    "**The part people get wrong: Open WebUI is not an AI.** Installing it and finding an empty model dropdown is the most common first experience. Decide your model source **before** you install — Ollama on the same machine is the usual answer.",
    "You need **Docker** (a way of running an app in a self-contained box, so you don't install its parts by hand) or a working Python setup. Docker is the officially recommended route and genuinely easier here.",
    "Be honest about the technical floor. If a terminal makes you uneasy and you just want a local model on your laptop, **Jan** or **LM Studio** get you there in an afternoon with none of this. Come here when you specifically want browser access, multiple accounts, or one interface for everything.",
    "First step: install Ollama, pull one small model, confirm it answers you in the terminal. Then install Open WebUI. You're connecting two working things instead of debugging two broken ones.",
  ],

  gettingSetUpSafely: {
    officialSource: "https://openwebui.com/",
    vendorDocsUrl: "https://docs.openwebui.com/getting-started/quick-start/",
    body: [
      "Install only from the official project — the site above, or the `open-webui/open-webui` repository on GitHub. Self-hosted AI tools attract convincing lookalikes, and you're handing this one your API keys and chat history.",
      "Follow the official quick-start, not a forum post or an old blog. Install commands change between versions. Docker is the recommended path, with a Python install and a desktop app currently offered as alternatives.",
      "Have your model source running first. Open WebUI currently detects a local Ollama automatically in the standard Docker setup; for a hosted provider you add its address and API key in Settings once you're inside.",
      "**Create your admin account immediately.** The first account on a fresh install becomes the administrator, and sign-up closes behind it. Do that yourself, before anyone else can reach the instance.",
      "Confirm it worked: open the address the docs give you (currently `localhost:3000` for Docker, `localhost:8080` for Python and desktop), create that admin account, pick a model, send one throwaway message. A real reply means interface and model are talking. An empty dropdown means the model source isn't connected — fix that before touching another setting.",
    ],
  },

  security: [
    {
      kind: "text",
      text: "Open WebUI's privacy posture isn't fixed. It's whatever your model source makes it, which is the opposite of most tools on this site.",
    },
    {
      kind: "list",
      label: "What your setup actually determines",
      items: [
        "With a **local model** on your own hardware, conversations never leave the machine. It works with the internet unplugged. About as private as AI gets.",
        "Add a hosted provider's **API key** and chats through that model go to that provider, under their terms and retention, exactly as if you'd used their website. Self-hosting the interface changes nothing about that.",
        "You can have both configured at once. Know which model is selected before pasting anything sensitive: the dropdown is the privacy boundary.",
      ],
    },
    {
      kind: "text",
      text: "The other half is on you. A self-hosted instance is a server, and securing it is your job. Keep it on your home network unless you have a specific reason not to. If you do expose it to the internet, do it deliberately — authentication on, strong secret key, HTTPS, ideally behind a VPN or reverse proxy — because an open instance is a stranger's free chat interface running on your hardware and spending your API credits.",
    },
  ],

  triad: {
    bestAt: [
      "Giving a household or small team one shared chat interface over models you control.",
      "Reaching a local model from your phone or laptop, not just the machine running it.",
      "Keeping local and hosted models in one place, so switching is a dropdown rather than another app.",
      "Running an always-on AI setup on a home server or spare machine.",
    ],
    okayAt: [
      "One person on one computer. It works, but it's more machinery than you need.",
      "Document chat and web search: supported, and they take configuring to get right.",
      "Being your first AI tool. Possible, but you'd be learning two unfamiliar things at once.",
    ],
    avoid: [
      "If Docker, a terminal, or a config file makes you uneasy, this will be a frustrating weekend.",
      "If you want AI without installing anything, this is the wrong shape of tool entirely.",
      "If you need it reachable from anywhere and don't want to think about securing a server.",
      "If you expect it to be intelligent on its own. It isn't, and no configuration will make it so.",
    ],
  },

  starterActions: [
    {
      title: "Connect exactly one model source, then stop",
      whatItDoes:
        "Get a single model working end to end — most likely a local Ollama — before configuring anything else. One message, one reply, leave the rest alone.",
      whyHere:
        "Open WebUI has a large settings surface, and the temptation is to configure it all before it works at all. Every later problem is easier to diagnose once one known-good path exists.",
      tweak:
        "If your source is a hosted provider, the equivalent checkpoint is the model list populating after you save the API key.",
    },
    {
      title: "Lock the front door",
      whatItDoes:
        "Confirm the admin account is yours, authentication is on, and you know whether the instance is reachable from outside your home network. If unsure, assume it is and check.",
      whyHere: `Unlike a desktop app, Open WebUI is a server the moment it starts. It's the only tool in this category where "who else can reach this?" is a question you have to answer yourself.`,
      tweak:
        "Adding a second person is the feature that justifies choosing this over Jan or LM Studio — but if you share hosted-model access, they spend your API credits.",
    },
    {
      title: "Ask the same question of two models",
      prompt:
        "Explain in plain language what a reverse proxy does, and why someone self-hosting an app at home might want one. Keep it under 200 words and assume I have never set one up.",
      whyHere:
        "Running one prompt against a local model and a hosted one, in the same interface, is the clearest demonstration of what Open WebUI is for — and shows honestly where a small local model's limits are.",
      tweak:
        "Try a much smaller local model too. The quality gap tells you which jobs you can keep offline.",
    },
    {
      title: "Put a document in and ask about it",
      prompt:
        "Using only the document I have uploaded, list the three things it asks me to do and quote the exact sentence for each. If something is unclear or missing, say so rather than filling in the gap.",
      whyHere:
        "Document chat is a main reason people self-host instead of pasting into a cloud tool — with a local model, that file genuinely never gets uploaded anywhere.",
      tweak:
        "Start with something short and boring. Long documents make retrieval issues look like model failures.",
    },
  ],

  pitfalls: [
    "**Expecting it to work without a model source.** It installs cleanly and then does nothing, because there's no AI in it. An empty model dropdown isn't a bug — it's the tool saying the second half of the setup is missing.",
    "**Exposing it to the internet without securing it.** Forwarding a port so you can use it from work is a five-minute job that turns your machine into a public AI service. Authentication on, HTTPS, strong secret key, preferably a VPN — or keep it on the home network.",
    "**Assuming self-hosted means private.** It means private **if your model is local**. Add a hosted key and those chats go to that provider like any other cloud tool. The dropdown decides, not the hosting.",
    "**Fighting your Python version.** The pip install currently supports a specific range and refuses newer releases outright. Docker sidesteps it entirely.",
    "**Installing it and never updating it.** The project currently ships releases every few weeks, and a self-hosted app doesn't update itself. Pulling a fresh image occasionally is part of the deal.",
  ],

  whereToNext: [
    { label: "Local & Open-Source AI", categorySlug: "local-open-source-ai" },
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
  ],
};
