import type { PlatformTutorialData } from "./types";

export const vllmTutorial: PlatformTutorialData = {
  slug: "vllm-getting-started",
  platformSlug: "vllm",
  title: "Getting Started with vLLM",
  tagline:
    "The engine that serves one open AI model to a lot of people at once — free software that expects a serious graphics card and a Linux machine.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-13",
  changelogUrl: "https://github.com/vllm-project/vllm/releases",
  accessTier: "FREE",

  howItWorks:
    "On a Linux machine with a graphics card, you run one command naming the **model** (the AI \"brain\" that does the thinking) you want. It downloads, loads, and keeps running as a service. Nothing opens on screen — instead other programs, or a chat app you point at it, send questions and get answers back.",

  whatItIs: [
    "vLLM is the engine underneath a lot of AI products you have already used: the part that takes a question, runs it through a published AI model, and hands back an answer — for many people at the same time, on one machine, without falling over. It is built for the person putting a model in front of other users: a team standing up its own internal AI service, or an organisation that wants requests staying on hardware it controls. If you have heard of Ollama or LM Studio, those are the laptop-scale relatives of the same idea — one person, one conversation, your own computer. vLLM is that idea scaled up and pointed outwards.",
  ],

  beforeYouStart: [
    "**The graphics card decides whether any of this is possible.** vLLM currently needs an NVIDIA card of compute capability 7.5 or newer — the docs name the T4, RTX 20-series, A100, L4, H100 and B200 as examples — or an AMD card on ROCm (MI200/MI300/MI350, Radeon RX 7900 and 9000 series, Ryzen AI MAX and AI 300), or an Intel Data Center or Arc GPU. There is no published minimum in gigabytes, because the real rule is that the model has to fit on the card with room to work; vLLM claims about 92% of the card's memory for itself on startup, so a run either fits or stops immediately. For scale, the project's own worked examples serve models of around half a billion to one-and-a-half billion **parameters** (a rough measure of a model's size — more is smarter but heavier), not the famous large ones.",
    "**It runs on Linux, and that is not a soft preference.** The docs state plainly that vLLM does not support Windows natively; on Windows you run it inside WSL, Microsoft's built-in Linux layer. On a Mac there are two paths and both come with an asterisk: vLLM-Metal, which the docs describe as a community-maintained plugin, uses Apple's graphics hardware but needs its own separate set of model files; and a CPU-only Mac build that the docs call experimental and that you have to compile yourself. If you are on a MacBook and what you actually want is to try running an AI model privately on your own machine, Ollama is the tool built for that and will get you there this evening — come back to vLLM when the question is serving other people.",
    "**The software is free; the machine it needs usually is not.** vLLM is free to download and use with no account, no card and no usage limits, and its code is public under a permissive licence that allows commercial use. What costs money is the hardware. Most people meet that by renting a GPU machine by the hour — currently somewhere between around $0.30 and $3.50 an hour depending on the card — which is billed for as long as the machine is switched on, whether or not anyone is asking it questions. If you already have a suitable card sitting in a desktop, your cost really is zero.",
    "**The model's licence is a separate question from vLLM's.** vLLM being permissively licensed says nothing about what you may do with what comes out of it — that is governed by whichever model you load. Some are equally permissive: the model the quickstart uses, Qwen2.5-1.5B-Instruct, is Apache-2.0. Others are not: Meta's Llama models carry a custom Llama Community License and the download is gated, so you have to accept the agreement and share contact details before you can fetch the files at all. Check the model's page before you build anything on it.",
  ],

  gettingSetUpSafely: {
    officialSource:
      "Install from the vLLM project's own installation guide at docs.vllm.ai, and nowhere else. It resolves to exactly two official things: the `vllm` package on PyPI, and the official container image `vllm/vllm-openai` on Docker Hub. One trap worth naming: those same official docs link a community-maintained Windows fork, in the same paragraph where they say Windows is not natively supported. Being linked from the official docs does not make a fork official.",
    body: [
      "Check the card before you install anything, because this is the step that decides the whole evening. Confirm the GPU is on the supported list first; the project's installation guide covers the rest.",
      "Know where the model files pile up. vLLM downloads models from Hugging Face on first run. These are large files and they accumulate silently; if you are on a rented machine, they also disappear with it and download again next time, which is worth planning around rather than discovering.",
      "Confirm it worked before you build anything on top. Start a small model and ask the running server to list what it is hosting — getting the model's name back is how you know the install landed.",
    ],
    vendorDocsUrl:
      "https://docs.vllm.ai/en/stable/getting_started/installation/gpu.html",
  },

  security: [
    {
      kind: "text",
      text: "Almost everything else in this corner of the catalog is something you run for yourself. vLLM is something you run for other people, and that changes the shape of the risk entirely. Nothing you send it leaves your hardware — the model sits on your machine, the questions go to your machine, there is no company on the other end — and that part is genuinely private. But a service built to be reachable by others ships with no password on the door: authentication is something you switch on, not something you switch off. That is the single most important thing to understand before you start it on a machine with a public address.",
    },
    {
      kind: "list",
      label: "What that means in practice:",
      items: [
        "There is no login by default. You get one by passing `--api-key` when you start the server — and vLLM's own security page is unusually blunt that this is not enough on its own: other addresses on the same server run exactly the same model and stay open with no key at all. The project's own instruction is not \"set a key\" but \"put a proxy in front of it that only lets through the addresses you meant to expose.\"",
        "Do not assume it is only listening to you. The quickstart says the server starts at `localhost:8000`, while the security page warns that vLLM and the libraries beneath it may open services on every network interface, sometimes outside vLLM's own control — so treat the address it is listening on as something to check and firewall, not something to assume. An inference server reachable from the open internet is not a theoretical problem: anyone who finds it can use your hardware, and can call the addresses that pause it or change what model it is running.",
        "`--trust-remote-code` runs code the model's author wrote. Some models on Hugging Face need that flag before vLLM will load them. It does what it says — it executes their Python on your machine. Use it for models from sources you would trust with a software install, and not otherwise.",
        "If you ever spread it across more than one machine, the traffic between them is unprotected. The docs state that all communication between nodes is insecure by default and must be placed on an isolated network — a documented design choice, not an oversight.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Serving one model to a lot of people at once — the memory handling and request batching that make that work are the whole reason the project exists",
      "Getting the most answers per hour out of a graphics card you are already paying for",
      "Standing in for a paid AI service in code you have already written, because it speaks the same request format the big providers use — often a change of address rather than a rewrite",
      "Keeping prompts, documents and customer data on hardware you control, with no third party in the path",
    ],
    okayAt: [
      "Modest hardware. It does run on ordinary processors without a graphics card, and on Apple Silicon through a community plugin, but the docs describe those as basic and experimental respectively",
      "One person having one conversation. Nothing breaks — but nothing about the design pays off either",
    ],
    avoid: [
      "Judging it by a run on a MacBook — whatever you measure on the community Mac plugin, it is not the thing the benchmarks are describing",
      "Reaching for it as your first attempt at running an AI model yourself — Ollama answers that question today, and this is still here afterwards",
      "Chasing a model announced this week. Support often lands in the daily development builds before it lands in a release, and running a development build to get one model is a different commitment from installing a stable one",
    ],
  },

  starterActions: [
    {
      title: "Start with a model small enough that the card is not the question",
      whatItDoes:
        "Serves one of the small models the project's own documentation demonstrates with — around half a billion to one-and-a-half billion parameters — so that your first run is testing your installation rather than your hardware.",
      whyHere:
        "An oversized model here fails at launch instead of just running slowly. On Ollama an oversized model grinds along on a mix of graphics memory and ordinary memory, so \"too big\" feels like slowness; here it is a stopped server.",
    },
    {
      title: "Decide which single model this server is for",
      whatItDoes:
        "Names one model at launch. That server hosts that model until you stop it; wanting a second model means a second server on a second port.",
      whyHere:
        "The docs state it directly — the server hosts one model at a time — so on vLLM \"which model\" is a deployment decision you make once, not a per-request choice. Ollama's server loads whichever installed model each individual request names and unloads it again when idle.",
      tweak:
        "If you find yourself wanting to switch models often, that is a signal you want the laptop-scale tool, not this one.",
    },
    {
      title: "Send it many questions at once, because that is the actual product",
      whatItDoes:
        "Fires a batch of requests simultaneously rather than one after another, and compares total answers per minute against sending them in sequence.",
      whyHere:
        "The engine folds new requests into work already running on the card instead of queueing them behind it; its docs describe requests being set aside and recomputed when the working memory fills. Ollama has no equivalent; it is designed around one person at a keyboard.",
    },
    {
      title: "Rent the graphics card for an evening before you buy one",
      whatItDoes:
        "Spins up a rented Linux machine with a supported card, installs from the official docs or runs the official container image, serves one model, and shuts the machine down again.",
      whyHere:
        "The project publishes a ready-made container image because running it on hardware you do not sit in front of is the normal case, not the exotic one. Renting a machine to run Ollama would defeat Ollama's entire proposition, which is your own computer.",
      tweak: "Set yourself an alarm.",
    },
  ],

  pitfalls: [
    "**Gated models fail with an unhelpful error.** If you have not accepted Meta's licence agreement on Hugging Face, the serve command simply fails to fetch the model — and the reason is on a web page, not in the error.",
    "**The first start is slow, and it is not broken.** vLLM compiles and prepares work for your specific card before it will answer anything, which makes the first boot noticeably longer than later ones. The project caches that work so repeat starts are faster. Waiting is the correct response; restarting it is not.",
  ],

  whereToNext: [
    { label: "Local & Open-Source AI", categorySlug: "local-open-source-ai" },
    { label: "AI APIs & Developer Services", categorySlug: "ai-apis-developer-services" },
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
  ],
};
