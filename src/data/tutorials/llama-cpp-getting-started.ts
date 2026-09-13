import type { PlatformTutorialData } from "./types";

export const llamaCppTutorial: PlatformTutorialData = {
  slug: "llama-cpp-getting-started",
  platformSlug: "llama-cpp",
  title: "Getting Started with llama.cpp",
  tagline:
    "The engine underneath most local AI apps — free, private, and yours to run directly if you're willing to type a command.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-13",
  changelogUrl: "https://github.com/ggml-org/llama.cpp/releases",
  accessTier: "FREE",

  howItWorks:
    "You run one command to install it and a second to fetch a **model** (the AI \"brain\" that does the actual thinking) and start it up. Then you either type at it in a text window or open a chat page in your browser, ask a question, read the answer, and keep going.",

  whatItIs: [
    "llama.cpp is the engine that runs an AI model on your own hardware — a C++ program (that's where the \".cpp\" comes from) that loads a model file and produces the words, with no company's server anywhere in the loop. Most people meet it without realising: Ollama's own README lists llama.cpp among the engines it runs on, and LM Studio runs the same model files, so both of those apps are graphical front doors onto this engine. Going direct means support for brand-new models as soon as the project ships it, and you decide exactly what runs and where the files live. What you give up is the app — there is nothing to double-click.",
  ],

  beforeYouStart: [
    "**Technical comfort is the real barrier here, not intelligence.** Every official way to install this starts with a command in a **terminal** (a text window where you type instructions instead of clicking). There is no installer to double-click and no desktop app. Ollama is this same engine with a desktop app built around it, so if the terminal is a wall rather than a speed bump, start there and come back when you want the engine itself.",
    "Then hardware, and the project makes this easy to check. Its curated model list prints a memory bracket beside every model size — the smallest entries read \"requires 8 GB+ memory,\" the largest \"requires 96 GB+ memory.\" Around 8 GB of free memory is the realistic floor, and the bracket, not the model's reputation, decides what you can run. On Apple Silicon Macs the graphics acceleration is switched on by default in the Mac builds; for Windows and Linux the project publishes ready-made versions for common NVIDIA, AMD and Intel graphics, so you should not need to compile anything.",
    "You will not need to pay. There is no account, no card and no paid tier — the software is published under the MIT licence, which attaches no conditions to what you do with it, including commercial work. The project states its position plainly on its own home page: no API keys, no telemetry, no limits. What it costs you is disk space and attention.",
    "**The model files are licensed separately from the program, and they do not all match.** Every model you download carries its own licence set by whoever published it. Several on the project's own list are MIT or Apache-2.0 and free to use commercially; Meta's Llama models, by contrast, sit behind a request-and-approval step and a custom community licence with conditions attached. The program being MIT tells you nothing about the model — check the model's own page before you build anything you intend to sell.",
    "Expect to keep up with it. The project publishes numbered releases alongside new builds most days, and support for a just-released model often arrives in a build only days old. \"Install it once and forget it\" is not how this one behaves.",
  ],

  gettingSetUpSafely: {
    officialSource:
      "There is one official source: **llama.app**, the project's own site, which carries the install command and the links to its GitHub releases under the same organisation (ggml-org) that publishes the code. Do not take a llama.cpp build from a search result, a mirror, or a link someone posted. You are installing a program that will then load large files off the internet, and the project's own published security advisories include several about maliciously crafted model files — so the chain of trust starts here and it matters.",
    body: [
      "The program and the model are two separate downloads, and this catches nearly everyone. Installing llama.cpp gets you the program, which can do nothing on its own. The intelligence arrives as a **GGUF file** (one file holding an entire model — weights, vocabulary and all). Those files run from under a gigabyte to tens of gigabytes each, and the project says they are stored in the standard Hugging Face cache folder — shared with other AI tools on your machine, so they accumulate quietly and are not removed when you uninstall something else.",
      "Confirm it worked in two steps, not one. The project's own check is to ask the installed program for its version; if it prints one, the install is fine. The real checkpoint is the next one — run one small model and get a reply back. Until that happens, you have not tested the part that depends on your hardware.",
      "Use the project's own install and quickstart pages for the literal commands. They are short and they are kept current.",
    ],
    vendorDocsUrl: "https://llama.app/docs/installation",
  },

  security: [
    {
      kind: "text",
      text: "There is no company in this picture at all — nobody to sign up with, nobody holding an account, nothing being reported back. The project states its own position as no API keys, no telemetry, no limits, and with the defaults left alone what you type stays on your machine. There are exactly two ways to lose that, and both are things you do rather than things done to you.",
    },
    {
      kind: "list",
      label: "Two things you'd have to do yourself:",
      items: [
        "**Changing where the server listens.** The project's docs say the built-in server listens on `http://127.0.0.1:8080` by default — your own machine only, unreachable from anywhere else — and that `--host 0.0.0.0` makes it listen on every network connection instead. Plenty of guides tell you to make that change without saying what it means: it puts a chat window onto your computer's model in front of anything else on the same network, with no password in the way. Recognise the setting and leave it alone unless you know exactly why you are changing it.",
        "**Taking model files from unknown uploaders.** Anyone can publish a GGUF file, and nothing vets them. The project's own security advisory list includes several about exactly this — \"Buffer Overflow via Malicious GGUF Model\" and \"Heap Buffer Overflow via Integer Overflow in GGUF Tensor Parsing\" among them. A model file is software you are running, not a document you are opening. Stick to the repositories the project's own model list links to, and keep your build reasonably current, because those advisories are fixed in later builds.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Running on hardware other local tools skip, across Mac, Windows and Linux",
      "Being first to a new model, because this is the engine the friendlier apps are built on top of",
      "Being something other programs can sit on top of, using your machine instead of a company's",
    ],
    okayAt: [
      "Telling you where to begin. The curated model list is genuinely useful, but nothing on it is marked \"start here\"",
      "Hand-holding after the install. The official documentation is a handful of pages covering the install, the two commands and the interface; there is no beginner track",
      "Being a settled product. The friendly front door — the llama.app site and the single `llama` command — arrived in 2026 and is far younger than the engine behind it, so guides you find elsewhere often describe a rougher, older setup",
    ],
    avoid: [
      "Reaching for the headline models on the project's own front page without reading the bracket first — the top of that list is server hardware, not a laptop",
      "Expecting a phone app or something you can send someone a link to. The Android and iOS pieces the project publishes are building blocks for developers, not an app you install and open",
    ],
  },

  starterActions: [
    {
      title: "Read the memory bracket before you read the model name",
      whatItDoes:
        "Before downloading anything, open the project's curated model list and find the size you are considering. Each entry shows two numbers: the file's size on disk, and a memory bracket. The bracket is the number that decides whether it runs at all.",
      whyHere:
        "The project prints that bracket itself, next to every size, which turns the hardware question into a two-minute check instead of a download-and-find-out. Ollama's library pages list a download size and a context window per version but not the memory you need free, so the same check there comes down to guesswork.",
      tweak:
        "A file that downloads happily can still fail to load. When that happens, step down one size rather than changing settings.",
    },
    {
      title: "Your first model, in the command that also downloads it",
      whatItDoes:
        "The project's quickstart has you hand `llama cli` the name of a Hugging Face repository. It fetches the GGUF file, stores it, and drops you straight into a conversation in the text window. Their own worked example is a shrunk-down Gemma 4, which they describe as using around 6 GB of memory.",
      whyHere:
        "The project stores downloaded models in the shared Hugging Face cache; Ollama keeps its models in its own store under its own naming, so the same model pulled there is a second copy on your disk that nothing else can see.",
    },
    {
      title: "Turn it into a chat page in your browser",
      whatItDoes:
        "The second command, `llama serve`, starts the model as a small server on your own machine, and the project's docs describe opening its local address in a browser to reach a chat interface built into it — one they say streams replies as they arrive, renders formatting and maths, and accepts images, PDFs and audio by drag-and-drop when the model can handle them.",
      whyHere:
        "The chat page and the model are served by the same program you started, at an address on your own machine — which is why the same docs show other software calling that address as though it were a cloud service. In LM Studio the chat lives inside its own desktop application and the server is a separate thing you switch on beside it.",
      tweak:
        "If the page is blank on first load, the model is probably still reading itself into memory. Give it a minute before assuming something is wrong.",
    },
    {
      title: "Ask the same question two ways without losing the first answer",
      prompt:
        "Explain [something you're trying to understand] in plain language, then give me one concrete example.",
      whyHere:
        "The project describes its built-in chat page as letting you edit any earlier message or regenerate any reply, and says doing so forks the conversation at that point rather than overwriting it — so both versions stay reachable. In Ollama's terminal chat there is no earlier message sitting there to go back and change.",
      tweak:
        "Edit your original question — \"explain it for someone who has never studied this\" — instead of asking again underneath. The fork keeps both answers side by side.",
    },
    {
      title: "Let another program use your machine as its AI",
      whatItDoes:
        "Once the server is running, other software can send its work there instead of to a company. The project walks through one pairing on its own home page: start the server, install a plugin, run a local coding assistant, and it finds your model with no keys and no configuration.",
      whyHere:
        "The project puts that pairing on its front page as a headline use, with the claim that files stay on your machine and requests never leave it — this engine is built to be the thing other tools sit on top of. LM Studio does expose a local server, but as a feature inside a desktop app; llama.cpp publishes no app for the server to live inside.",
    },
  ],

  pitfalls: [
    "Assuming the model files disappear when you remove the program. Uninstalling llama.cpp leaves tens of gigabytes in that shared cache folder behind.",
    "Deciding what local AI is worth from the smallest file on the list. The sub-gigabyte entries exist to prove the plumbing works, not to impress you. Move up a size before you form a view.",
  ],

  whereToNext: [
    { label: "Local & Open-Source AI", categorySlug: "local-open-source-ai" },
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
  ],
};
