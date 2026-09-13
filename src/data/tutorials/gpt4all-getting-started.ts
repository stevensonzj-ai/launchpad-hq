import type { PlatformTutorialData } from "./types";

export const gpt4allTutorial: PlatformTutorialData = {
  slug: "gpt4all-getting-started",
  platformSlug: "gpt4all",
  title: "Getting Started with GPT4All",
  tagline:
    "A double-click desktop app that runs AI on your own computer — free, offline, and able to answer questions about a folder of your own files.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-13",
  accessTier: "FREE",

  howItWorks:
    "You install the app, pick an AI **model** — the \"brain\" that does the thinking — from a list, and wait while it downloads onto your hard drive. Then you type into a chat box and read the reply, which your own computer worked out. Ask a follow-up and it keeps going.",

  whatItIs: [
    "GPT4All is a free desktop app from a company called Nomic that downloads AI models onto your own machine and lets you chat with them with the internet switched off. Where Ollama started life as a tool you typed commands into and grew a window around it later, GPT4All has been a plain install-and-chat window from the beginning — and it ships with something a browser chatbot doesn't have: LocalDocs, which points the model at a folder of your own files and then shows you which file each answer came from.",
  ],

  beforeYouStart: [
    "Hardware decides this, not how technical you are. Nomic's own minimum-specification sheet asks for **16 GB of RAM** — your computer's short-term memory, what runs out when too much is open — and drops that to 8 GB only for the smallest models; on Apple hardware the minimum it lists is an M1 with 16 GB. Check what you have first (Task Manager on Windows, \"About This Mac\" on a Mac). Below the line the app still opens and the model still loads; it just crawls — if your machine is under the line, Ollama runs the same small models with a lighter footprint and is the gentler place to start.",
    "There are installers for macOS (Monterey 12.6 or newer, and it is tuned for Apple Silicon), Windows, Windows on ARM, and Ubuntu-style Linux on Intel/AMD chips. One wrinkle worth knowing before you count on it: Nomic's own two pages disagree about ARM — the download page offers a Windows ARM installer while the requirements sheet says ARM PCs are not currently supported, so on a Snapdragon laptop treat this as worth a try rather than as promised.",
    "Check how current it is before you commit to it. As of this review the newest tagged release is v3.10.0 from February 2025, the installers on the official download page were last changed in early February 2025, and the code repository's last push appears to be around May 2025. It has not been archived, renamed or handed to anyone else, and Nomic still hosts and links it — but Nomic's business today is an AI platform for architecture and construction firms, and GPT4All currently reads like a product being kept online rather than one being built. It installs and it works; expect no new features.",
    "You will not need to pay for any of this. The app is free, there is no account, no card and no sign-in, and models cost nothing to download or run. The $20-a-month plan advertised across Nomic's website is for its separate business platform and has nothing to do with GPT4All.",
  ],

  gettingSetUpSafely: {
    officialSource:
      "Download from one place only — Nomic's own GPT4All page at nomic.ai/gpt4all, which is also where the old gpt4all.io address now sends you. This matters more here than anywhere else on the page: you are installing a program with the run of your whole machine, and \"GPT4All\" is a well-known enough name that copycat download sites and bundle installers exist. Not a search result, not a download aggregator, not a link from a forum post.",
    body: [
      "Know where the big files land. The app itself is small; the models are not. Each one is roughly 2 to 7 GB, they are saved outside the app's own folder, and they stay there when you uninstall. A model's size is usually quoted in **parameters** — a rough measure of a model's size, where more is smarter but heavier — and the documentation lists a memory figure beside each example model, so you can decide before you click Download rather than after.",
      "Confirm it worked, then confirm it is really local. Load the model, send one message, get a reply back — that is your setup checkpoint. Then turn your wi-fi off and send another. If it still answers, you have proved the thing the whole app is for.",
    ],
    vendorDocsUrl: "https://docs.gpt4all.io/gpt4all_desktop/quickstart.html",
  },

  security: [
    {
      kind: "text",
      text: "There is no sign-up, no server and no session here. The model file sits on your hard drive and your own processor does the thinking, which makes GPT4All about as private as an AI tool gets — and it changes what you have to watch. Nothing you paste is the risk. The risk is a switch inside the app, or a file you chose to install.",
    },
    {
      kind: "list",
      label: "Four things to know:",
      items: [
        "The first time you open it, GPT4All asks you two yes/no questions: whether to send anonymous usage statistics, and whether to share your chats with the GPT4All open data collection. The chat-sharing one is documented as off by default, and its own dialog spells out the consequence — that with it on you 'should have no expectation of chat privacy.' Answer no to both if privacy is why you are here. (These wordings come from the app's published source and settings documentation; the exact screen you meet may have moved.)",
        "Adding an API key turns it into a different product. The app can be pointed at outside providers, and Nomic's documentation is refreshingly clear about what that means: prompts 'leave your computer to the API provider' and come back afterwards. Nothing wrong with the feature, but it is the one thing that undoes the reason you installed this.",
        "There is a built-in local server, off by default, that lets any program on your device talk to your model on port 4891. Leave it off unless you have a specific reason and know what you are connecting to it.",
        "Models are pulled from the public HuggingFace library, which is enormous and not curated. Stick to what appears in the app's own suggested list until you have a reason not to; treat anything else the way you would treat a program from a publisher you have never heard of.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Asking questions of a folder of your own files with the internet off",
      "Privacy in the strongest form on offer — nothing you type crosses your network",
      "Unlimited use for nothing once the model is on your disk — on a plane, in a basement, with the wi-fi switched off",
    ],
    okayAt: [
      "Answer quality — the models this app is built around sit in the 3-to-13-billion size band, and that band has a ceiling",
      "How fast an answer arrives, which is decided by the machine and not by anything you can change in the app",
      "Helping you choose: the Explore screen searches the whole public HuggingFace library, which is thousands of files with very little to tell a newcomer which one is right",
    ],
    avoid: [
      "Windows or Linux machines with ARM chips, and older Intel Macs — the requirements sheet's minimum Apple entry is an M1, and the vendor's own two pages contradict each other on whether Windows ARM is supported at all",
      "Anything you intend to sell or publish without checking the individual model's licence first — the app's MIT licence is not the model's",
      "Making it your only AI when the quality of the answer matters more than where it runs — a cloud chatbot will beat it on hard questions",
    ],
  },

  starterActions: [
    {
      title: "On 8 GB: start with the smallest model, on purpose",
      whatItDoes:
        "Downloads a 3-to-4-billion-size model — roughly a 2 GB file — which loads quickly, leaves room for everything else you have open, and proves your setup works end to end before you gamble on anything bigger.",
      whyHere:
        "Nomic's published floor carves out 8 GB only for the smallest models, so on a modest laptop GPT4All tells you in advance which side of the line you are on and the small model here is a deliberate choice rather than a consolation prize.",
      tweak:
        "Judge it on the second answer. The first one carries the wait while the model is read off your disk, and that wait is not the model's speed.",
    },
    {
      title: "With 16 GB: step up to a 7-to-8-billion-size model",
      whatItDoes:
        "Moves you to a mid-size general model — around a 4 to 5 GB download — which is where local AI stops feeling like a demo and starts being something you would actually reach for.",
      whyHere:
        "The documentation's example table pairs every model with the memory it needs — a 4.66 GB Llama 3 file listed against 8 GB of memory — so you can decide whether this whole approach fits your machine while still reading a web page.",
    },
    {
      title: "Read the licence beside the model, not the one on the app",
      whatItDoes:
        "Before you download anything you plan to use for work, look at the licence attached to that specific model. The app is MIT-licensed; the models are separately licensed by whoever made them, and they do not agree with each other.",
      whyHere:
        "GPT4All's documentation states outright that \"license agreements differ regarding personal and commercial applications,\" and its own example list runs MIT, Apache 2.0, GPL, Meta's Llama licence and a non-commercial CC-BY-NC-SA entry side by side — while the project's repository headline advertises \"available for commercial use.\" That gap between the headline and the list is specific to how this project presents itself, and it is the reason to check.",
    },
    {
      title: "Point it at one folder of your own files (LocalDocs)",
      whatItDoes:
        "Creates a named collection tied to a folder on your computer, reads through it on-device, and then lets you switch that collection on during a chat so the model answers from your documents instead of from general knowledge.",
      whyHere:
        "The indexing runs on your machine using Nomic's own on-device models, and every answer gets a Sources control listing which file it drew from — private document search plus per-answer attribution in one window, built in rather than assembled.",
      tweak:
        "Start with one small folder, not your whole Documents directory. Wait for the collection to show Ready before you judge the answers.",
    },
    {
      title: "Ask something only your own files can answer",
      prompt:
        "Using only my documents, answer this: [your question]. Quote the exact sentences you based it on, and tell me if the documents don't actually say.",
      whyHere:
        "The last clause is doing real work here, because GPT4All gives you a way to check it: the Sources control names the files behind the answer, so you can open one and see whether the quoted line is in it. A local model will invent a confident answer as readily as any other, and this is the one setup on the page where you can catch it in about ten seconds.",
      tweak:
        "Works well on things you would never upload anywhere — a lease, medical paperwork, old bank letters, a folder of personal notes.",
    },
  ],

  pitfalls: [
    "The Explore screen will cheerfully hand you a model your memory cannot hold, and that is where most people wrongly conclude that local AI is useless. Match the model to what you actually have.",
    "Looking for an update inside the app and finding none. Given how long it has been since the last release, \"no update available\" is the expected answer rather than a sign something is broken — the official download page is the place to check.",
  ],

  whereToNext: [
    { label: "Local & Open-Source AI", categorySlug: "local-open-source-ai" },
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
  ],
};
