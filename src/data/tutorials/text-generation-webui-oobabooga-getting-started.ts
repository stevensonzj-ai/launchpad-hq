import type { PlatformTutorialData } from "./types";

export const textGenerationWebuiOobaboogaTutorial: PlatformTutorialData = {
  slug: "text-generation-webui-oobabooga-getting-started",
  platformSlug: "text-generation-webui-oobabooga",
  title: "Getting Started with TextGen (oobabooga's text-generation-webui)",
  tagline:
    "Run AI models on your own computer with the controls left visible — free, private, and built for people who want to tinker.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-13",
  changelogUrl: "https://github.com/oobabooga/textgen/releases",
  accessTier: "FREE",

  howItWorks:
    "You download a ready-to-run build, unzip it, and double-click it — a window opens on your own computer. You drop a **model** file (the AI \"brain\" that does the actual thinking) into its models folder, pick it from a menu, and type into a chat box. Answers come back locally, and you can adjust the settings and retry.",

  whatItIs: [
    "TextGen — the project most people still know as oobabooga's text-generation-webui — runs AI models on your own machine and shows you the machinery while it does. Where Ollama and LM Studio pick an engine for you and hide the rest, TextGen currently lets you choose among five different engines for the same model, switch between them without restarting, and change dozens of generation settings from a dedicated tab. That control is the entire reason to choose it.",
  ],

  beforeYouStart: [
    "**Hardware decides how this feels to use.** Unusually, the project publishes no minimum spec — it publishes a memory calculator instead, which reads a model file and estimates the **RAM** (your computer's short-term memory — what runs out when too much is open) or graphics-card memory it will need. A graphics card makes it much faster, but ready-to-run CPU-only builds exist for Windows, Linux and macOS, so one isn't strictly required.",
    "This is a control panel, not an appliance. You choose the model file, and usually the engine and the generation settings too — nothing is chosen for you, and nothing is hidden to keep the first run simple. If what you want is a local model working in five minutes with no decisions, start with Ollama and come back here once you have a specific setting you want to change.",
    "You will not need to pay. It's free, the code is public, there's no account and no paid tier — the only real cost is disk space, and the longer installation currently wants around 10 GB before you have downloaded a single model.",
    "Ready-to-run builds cover Windows, Linux and macOS, Apple Silicon included. One asymmetry worth knowing up front: the macOS ready-to-run build currently ships only the llama.cpp engine, so the engine-switching this app is known for is mostly a Windows and Linux story unless you do the longer installation.",
    "The project renamed itself. It is TextGen now, and nearly everything written about it still says text-generation-webui or just \"oobabooga.\" Same project, same maintainer — but it means much of what you find describes an older layout.",
  ],

  gettingSetUpSafely: {
    officialSource:
      "There is exactly one official source: the releases page of the project's own repository, **github.com/oobabooga/textgen**. Job one is not trusting anything else. Because the project renamed, search results are thick with the old name — download mirrors, \"installer\" pages, forks and repackagers, none of them the project — and you are installing software that will have full run of your machine. Links to the old `github.com/oobabooga/text-generation-webui` address still land in the right place. Anything that isn't one of those two does not.",
    body: [
      "Decide which installation you actually need. The ready-to-run build is a download-unzip-double-click affair that runs **GGUF** files (the single-file model format) through one engine and nothing else. The longer installation adds the other engines, fine-tuning, image generation and extensions.",
      "Know where the models pile up. Model files run to several gigabytes each, they live in a `user_data/models` folder inside the app, nothing clears them out, and a handful of them will take up far more room than the app itself.",
      "Confirm it worked. Loading one small model and getting a reply back in the chat box is your checkpoint — do that before you change a single setting, so you know what a working baseline looks like.",
    ],
    vendorDocsUrl: "https://github.com/oobabooga/textgen#installation",
  },

  security: [
    {
      kind: "text",
      text: "The default here is already the private one, and the app does nothing behind your back to change it: it runs on your own machine, makes no telemetry or update calls of its own, and the interface it serves is reachable only from the computer it is running on. Nothing you type is sent anywhere. What can undo that is never a hidden setting — this is an app built to hand you switches, and three of them decide who else can reach your machine and whose code gets to run on it.",
    },
    {
      kind: "list",
      label: "Three switches worth understanding before you flip them:",
      items: [
        "**Sharing the interface.** One option makes the app reachable from other machines on your network; another puts it on a public web address through an outside tunnelling service. The project prints its own warning when you use either without a password — that you may be exposing the interface to the entire internet with no access control. A chat interface that can load models and read local files is not a thing to leave open.",
        "**Untrusted model files.** A model is a file you downloaded from a stranger. Most are inert data, but some ship Python code beside them, and there is a setting — off by default — that allows that code to run. The project's own wording is blunt: switching it on lets models execute arbitrary code on your machine. Leave it off unless you know exactly whose model it is and why it needs it.",
        "**Community extensions.** None load by default, which is the good news. But an extension is a Python file that runs inside the app with the same access to your files that you have, and the community directory is a list of links to other people's repositories rather than a reviewed catalogue. Installing one is running someone's program, not adding a feature.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Handing you the controls — model, engine, generation settings and context size all changeable from the interface rather than a config file",
      "Running one model file through different engines to find out which is actually faster on your hardware",
      "Free, offline and unlimited use",
      "Being one window for several jobs — chat, free-form text, document and image input, image generation and LoRA fine-tuning",
    ],
    okayAt: [
      "First impressions — it opens onto a dense interface, because showing you everything is the point",
      "Answer quality, which is a property of the model file you chose rather than of this app",
      "Telling you what to pick — it documents thoroughly what every control does and takes no position on which you should use",
    ],
    avoid: [
      "Using it as your first taste of local AI. Every choice it hands you is a choice you then have to make, and made wrong they produce a slow or mediocre result with nothing explaining why.",
      "Expecting a hosted fallback when your hardware runs out. There is no cloud version of this to switch to — unlike Ollama, which sells one.",
    ],
  },

  starterActions: [
    {
      title: "Your first model: one small GGUF file from Hugging Face",
      whatItDoes:
        "Downloads a single small model file from Hugging Face and drops it into the app's `user_data/models` folder. The interface detects it on its own — there is no separate import step — and it appears in the model menu ready to load.",
      whyHere:
        "Ollama pulls from a library it curates, so the shortlist is made for you before you arrive. TextGen has no library: the ready-to-run build reads GGUF files you go and fetch yourself, which makes picking the file — and its size — your job from the first minute. Start small, so a wrong choice costs you ten minutes rather than an evening.",
      tweak:
        "The compression level is in the filename. A Q4 file is roughly half the size of a Q8 of the same model, and a little worse at everything.",
    },
    {
      title: "Run the same model through a different engine",
      whatItDoes:
        "Selects a different engine in the Model tab and reloads. The project currently lists llama.cpp, ik_llama.cpp, Transformers, ExLlamaV3 and TensorRT-LLM.",
      whyHere:
        "In LM Studio or Ollama \"which engine\" is not a question you can ask; here it is a dropdown, and on the same file the answer changes measurably.",
    },
    {
      title: "Change one generation setting at a time in the Parameters tab",
      whatItDoes:
        "Opens the dedicated Parameters tab, where the settings that shape an answer — temperature, top-p, min-p, repetition penalties and a long list besides — are exposed as controls, including the order in which they get applied.",
      whyHere:
        "LM Studio gives you a few of these behind a panel. TextGen gives you the full list plus a sampler-priority control that reorders how they are applied, which most local apps have no interface for at all. Change one, regenerate the same message, compare. That loop is what the tab exists for, and it is what the extra friction of this app buys you.",
      tweak:
        "Temperature first. Low makes it repetitive and literal; high makes it wander. Every other control is easier to judge once you have felt that one.",
    },
    {
      title: "Try the Notebook tab instead of the chat box",
      prompt: "The three things nobody tells you about learning to sail are",
      whyHere:
        "This is a separate tab with no chat turns in it at all, where the model simply continues whatever text is on the page. Handing it an unfinished sentence rather than a question shows you what the thing underneath is actually doing — continuing text — which is precisely what the chat format papers over. Ollama's app is a chat window and has nowhere to do this.",
      tweak:
        "Paste in a half-written paragraph of your own, let it carry on, then edit its continuation and run it again from there.",
    },
    {
      title: "Generate an image without leaving the app",
      whatItDoes:
        "Loads an image model in the app's dedicated image tab and makes pictures on the same machine, with a gallery that keeps what you made along with the settings that made it.",
      whyHere:
        "With Ollama or LM Studio, an image means a second application and a second set of downloads. TextGen currently ships an image tab with its own memory-saving options, which matters on a modest machine: a text model and an image model competing for the same graphics memory is the usual reason one of them refuses to load.",
      tweak:
        "If the image model won't start, unload the text model first. There is an idle-timeout setting that will do it for you after a few quiet minutes.",
    },
  ],

  pitfalls: [
    "Downloading a model bigger than your machine can hold. The catalogue here is the whole of Hugging Face with no size gate anywhere.",
    "Trusting a well-ranked blog post. Prefer the project's own wiki, however well the blog post ranks.",
    "Pasting in a command that contains a sharing flag. Guides written for cloud notebooks include them because they have to; on your own computer the same flag turns a private app into a reachable one.",
    "Extension dependencies quietly breaking the app. Extensions bring conflicting versions of the app's own requirements with them. If things stop working right after you added one, suspect that first.",
  ],

  whereToNext: [
    { label: "Local & Open-Source AI", categorySlug: "local-open-source-ai" },
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
  ],
};
