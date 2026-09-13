import type { PlatformTutorialData } from "./types";

export const localaiTutorial: PlatformTutorialData = {
  slug: "localai-getting-started",
  platformSlug: "localai",
  title: "Getting Started with LocalAI",
  tagline:
    "Run AI on hardware you own — and put it where an app expects a paid cloud service.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-13",
  changelogUrl: "https://github.com/mudler/LocalAI/releases",
  accessTier: "FREE",

  howItWorks:
    "You install LocalAI, open a web page it serves on your own computer, pick a **model** (the AI \"brain\" that does the actual thinking) from its built-in list, and wait while it downloads. Then you type in the chat box on that same page and it answers — with nothing leaving your machine.",

  whatItIs: [
    "LocalAI runs AI models on hardware you own, and nothing you type is sent anywhere. What separates it from Ollama, the usual first stop for local AI, is what it is built to impersonate: it answers on the same **API** (a way for programs to talk to each other without a person clicking) shapes that OpenAI's and Anthropic's paid services use, so software already written against one of those can be pointed at your own machine instead. It also does pictures, speech and transcription from the same server, where Ollama stays with text — which is why people reach for LocalAI when they want one private stand-in for a whole cloud subscription, rather than just a private chat window.",
  ],

  beforeYouStart: [
    "How well this runs is a question about the model you pick and the machine you pick it for, not about LocalAI itself. The project's own answer on hardware is that requirements \"vary based on\" the model's size, how much it has been shrunk to fit, and which runner it uses — they publish no minimum, which is honest but unhelpful when you're deciding. Plan for roughly the same ballpark as any other local AI tool: currently around 8 GB of spare memory to run a small model comfortably, and check what your machine has before you start (Task Manager on Windows, About This Mac on a Mac). \"No GPU required\" is the project's headline claim and it is true — CPU-only is a supported, tested path — but true is not the same as fast.",
    "**Which computer you have decides how much work this is.** On a Mac there is a proper signed installer you double-click. On Linux there is a plain downloadable program. **On Windows there is no installer at all** — the project publishes no Windows version, so the route is **Docker** (a way of running an app in a self-contained box, so you don't install its parts by hand), which is the project's own recommended path on every platform anyway. That is a genuine extra thing to learn. If you're on Windows and you mainly want private AI chat rather than a stand-in for a cloud service, Ollama is a shorter road to the same feeling — come back here when you have something you actually want to point at it.",
    "It is free in the way that matters: MIT-licensed, code public, no account, no card, no usage cap, and — unusually for this category — no paid cloud tier sitting next to it trying to catch you. You will never be asked to pay LocalAI anything. What it does cost you is disk and electricity, and the models are separate downloads of several gigabytes each.",
    "It arrives empty. Installing LocalAI gets you a server and a web page with nothing to talk to; the chat page only lists models you have installed yourself. The project's quickstart names a small, CPU-friendly starter model (currently `qwen3-4b`) as the first thing to install, which is the sensible place to begin.",
  ],

  gettingSetUpSafely: {
    officialSource:
      "Get it from **localai.io** and nowhere else. That single page links the Mac installer, the container command and the official release files — which matters more here than for a web app, because you are running a server on your own machine, and a lookalike download has the run of it. Don't take an install command out of a blog post, a video description or a search ad; copy it from the project's own install page.",
    body: [
      "Confirm you have several gigabytes of memory free and a good deal more disk while you are still deciding. Doing this first is what separates \"local AI is slow and disappointing\" from \"local AI is fine\" — the tool cannot fix a machine that was never going to keep up.",
      "Pick the right flavour for the computer you actually have. The project publishes a plain version and separate accelerated versions for NVIDIA, AMD, Intel and Vulkan hardware. Take the plain one unless you know which graphics card is in the machine. The wrong one either won't start or will quietly ignore the hardware you chose it for.",
      "Know where the gigabytes go. LocalAI fetches a separate runner for each kind of model you install, so the model file is not the whole cost. Everything lands in a models folder alongside a backends folder; on the container route, follow the docs' full command rather than the short one-liner, or those folders vanish with the container.",
      "Confirm it worked before you do anything else. Open `http://localhost:8080` in a browser on the same computer, install the small starter model the quickstart names, and send it one message. A reply is the proof that the download, the runner and your hardware all lined up. If that works, everything else on this page is available to you.",
    ],
    vendorDocsUrl: "https://localai.io/docs/installation/",
  },

  security: [
    {
      kind: "text",
      text: "Privacy is not the thing to worry about with LocalAI — it runs on your own computer, so your prompts, your documents and your recordings stay on your disk, and there is no company account holding any of it. The \"never paste anything sensitive into a chatbot\" rule mostly stops applying, and that is the whole reason to accept the setup work. What you have to get right instead is the server, because LocalAI's out-of-the-box configuration is more open than most local tools'.",
    },
    {
      kind: "list",
      label: "Two ways to lose it:",
      items: [
        "**It is reachable from your network the moment it starts, and it asks nobody for a password.** LocalAI's server listens on every network connection your computer has, not just the computer itself — its default listening setting is a bare port with no address in front of it, which means \"anyone who can reach this machine.\" And authentication is off unless you turn it on: the project's own documentation says that if you configure neither authentication mode, \"the authentication middleware does not restrict requests,\" and describes LocalAI as private by default only once you have set a key. On your own home network behind a router that is usually survivable. On shared Wi-Fi, an office network, or anything reachable from the internet, it means a stranger can use your model, read what the server exposes, and spend your electricity. If the machine ever leaves your house, set an access key first — the project documents a single setting for it.",
        "**Where your model files come from is a decision you are making.** LocalAI's own gallery is curated and open-licensed. Anything you pull from outside it is a large binary file from a stranger, held to whatever standard that stranger keeps — worth choosing deliberately rather than by clicking the first result.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Standing in for a paid cloud service on hardware you own",
      "Covering more than chat from one server — text, images, speech, transcription and search-style embeddings on the same address",
      "Total privacy, with no company account involved at any point",
    ],
    okayAt: [
      "Raw answer quality — nothing you can fit on your own hardware competes with a hosted frontier model, and LocalAI does not change that",
      "Speed: \"no GPU required\" means it runs without a graphics card, not that it feels like one",
      "First-day friendliness — the Mac installer is easy, the Windows route is not",
    ],
    avoid: [
      "Being your only Windows option if you have never touched Docker — Ollama installs on Windows in one step",
      "Reading \"no GPU required\" as \"you don't need a GPU\" — nobody is promising you a usable speed",
      "Using it purely as a chat window. Everything that repays the extra setup is the part where something else talks to it. If a private chat box is all you want, you are doing more work than the result needs.",
    ],
  },

  starterActions: [
    {
      title: "Start with the small CPU-friendly model the quickstart names",
      whatItDoes:
        "Installs the starter model LocalAI's own getting-started guide points to — currently a small Qwen3 model chosen because it runs on an ordinary processor and still supports tool use. You install it from the Models page in the web interface, which shows you an estimated download size before you commit.",
      whyHere:
        "Which model you install changes what LocalAI installs alongside it: the project keeps a small core and fetches the runner for a model's type only when a model needs it. Starting with the plain CPU-friendly one keeps you off the graphics-card-specific builds entirely — where Ollama ships one engine and one installer regardless of what you pull, so the choice there changes the download and not the software.",
    },
    {
      title: "Point something you already use at your own machine",
      whatItDoes:
        "Takes an app, script or tool that expects to talk to a paid AI service and changes the address it calls to your own computer. LocalAI answers on the same shapes OpenAI's and Anthropic's services use, so in most cases the app doesn't notice the difference.",
      whyHere:
        "This is the specific thing LocalAI is built for, and the Anthropic half is the part that isn't available elsewhere in local AI — the project describes itself as a small core that speaks both the OpenAI and the Anthropic API, so a tool written against either one has somewhere local to land. Ollama offers an OpenAI-shaped address and nothing for the other.",
    },
    {
      title: "Add a voice or picture model next to the text one",
      whatItDoes:
        "Installs a second model of a different kind — speech from text, transcription of a recording, or image generation — from the same gallery, served from the same address as your chat model.",
      whyHere:
        "LocalAI's feature list covers image generation, speech generation, transcription, speaker separation, vision and embeddings from one server, so \"one private server for everything\" is achievable without installing a second tool for each job. Ollama runs text and vision-input models only, with no image-generation or speech addresses at all.",
    },
    {
      title: "Your first real message, in the built-in chat page",
      prompt:
        "Explain in plain language what you can and can't help with, then give me three examples of things I could ask you that play to your strengths.",
      whyHere:
        "LocalAI starts with nothing installed, so the first reply is doing double duty — it's an answer, and it's proof that the model, its runner and your hardware all matched. Asking the model to describe its own limits also calibrates you fast: a model small enough to run locally will tell you a narrower story than a cloud service would.",
    },
  ],

  pitfalls: [
    "**The models don't inherit LocalAI's licence.** LocalAI is MIT-licensed and you can do as you like with it. The models are separate works with separate terms, and the project says so itself: text-generation models \"might have a license which is not permissive for commercial use or might be questionable or without any license at all. Please check the model license before using it.\" If anything you make with this is going to be sold or published, that check is yours to do, per model.",
    "**Assuming the model file is the whole download.** Install a chat model, an image model and a speech model and you have collected three model files and three runners. Watch the folder, not the individual download.",
  ],

  whereToNext: [
    { label: "Local & Open-Source AI", categorySlug: "local-open-source-ai" },
    { label: "AI APIs & Developer Services", categorySlug: "ai-apis-developer-services" },
    { label: "Getting Started with Ollama" },
  ],
};
