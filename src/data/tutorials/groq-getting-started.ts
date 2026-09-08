import type { PlatformTutorialData } from "./types";

export const groqTutorial: PlatformTutorialData = {
  slug: "groq-getting-started",
  platformSlug: "groq",
  title: "Getting Started with Groq",
  tagline:
    "Absurdly fast answers from open AI models — try it in a browser before writing any code.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-07",
  changelogUrl: "https://console.groq.com/docs/changelog",
  accessTier: "FREE",

  howItWorks:
    "You open Groq's console in a browser, pick a **model** (the AI \"brain\" that does the actual thinking) from a dropdown, and type a question into a chat box. The answer arrives about as fast as the page loaded. Swap the model, ask again.",

  whatItIs: [
    "**First, the name.** Groq is not Grok. Grok is xAI's chatbot, the one on X. Groq makes computer chips and sells fast AI hosting to developers.",
    "It didn't build the models it offers; it runs open ones from other labs on its own machines. Most AI services use GPUs, chips designed for video game graphics — Groq built its own chip for language models, which is why words arrive at page-load speed. You're renting speed, not intelligence.",
    "**Infrastructure, not a finished product.** No app, no memory of past chats — the console is a testing bench for people building things, still worth twenty minutes of yours to feel what speed does to a tool.",
  ],

  beforeYouStart: [
    "Free and genuinely free — an email or Google account, no card, nothing to install. Start in the playground, not with a key.",
    "**The free plan gives you nothing to spend. It caps how often you can ask.** It counts requests and **tokens** (chunks of text, roughly three-quarters of a word) per minute and per day; hit a cap and requests fail until it resets. Caps cover your whole organisation, not each key, and only the limits page in your console settings is current — published numbers change.",
    "You probably won't pay. Usage beyond that is currently priced per million tokens, cents rather than dollars for the smaller models — check the pricing page. You'd upgrade for real users hitting the caps, for batch or flex processing, or for the spend cap under Settings, Billing, Limits, which is paid-plan only.",
  ],

  security: [
    {
      kind: "text",
      text: "What you type runs on Groq's servers. Groq's documentation says it doesn't retain customer data from the requests you send, but that inputs and outputs may be logged temporarily — currently up to 30 days — for troubleshooting and abuse investigation. Data Controls has a zero-data-retention setting that switches that off, at the cost of features needing stored data.",
    },
    {
      kind: "list",
      label: "Practical rules",
      items: [
        "It describes retention but says nothing explicit about training on what you send. Absence of a claim is not a promise either way — read the Services Agreement and Data Processing Addendum if it matters.",
        "Make an **API key** — a password that identifies your app, and that spends your money — only when you have code to put it in. Never paste one into a webpage, chat, screenshot or public code; bots scan publicly posted code for keys within minutes.",
        "Keep customer records, credentials and medical or legal detail out of the playground.",
        "The realistic risk isn't Groq reading what you type. It's you leaking your key and someone else spending your money.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Speed — enough that live transcription and instant chat feel ordinary",
      "Running well-known open models without owning a graphics card",
      "Dropping into existing code: its interface matches OpenAI's, so most OpenAI tutorials work after changing a web address and key",
      "Speech, where its Whisper-family models transcribe at a fraction of real time",
    ],
    okayAt: [
      "Model choice — a curated open catalogue that changes often",
      "Being explored without code: it works, but it behaves like a developer tool",
      "Long documents; respectable capacity, not the largest anywhere",
    ],
    avoid: [
      "Expecting frontier intelligence — the top proprietary models are still ahead on hard reasoning and coding",
      "Everyday chatbot use: no conversation history worth relying on, no integrations, no mobile",
      "Building on a model you expect to exist next quarter — preview ones can vanish at short notice, and models move to enterprise-only",
    ],
  },

  starterActions: [
    {
      title: "Ask something you already know the answer to",
      prompt:
        "Explain what an API key is to someone who has never written code, in about four sentences.",
      whyHere:
        "You're not judging the answer, you're calibrating what fast means — the one thing Groq's own chip buys you, and the one thing a screenshot can't show. Ask for 500 words and you watch a stream rather than a burst.",
    },
    {
      title: "Send one question to a small model, then a large one",
      prompt:
        "List every number between 40 and 80 that divides by 3 and whose digits add up to more than 10, and show your reasoning.",
      whyHere:
        "The catalogue runs from very small and fast to larger and slower, and switching is a dropdown, not a new account. The small ones sometimes get this wrong; the larger ones take longer and usually don't.",
      tweak: "Watch the tokens-per-second readout beside each reply. That number is the product.",
    },
  ],

  pitfalls: [
    "**It's Groq, not Grok.** Groq is the hosting company at groq.com; Grok is xAI's chatbot at grok.com. A tutorial that mixes them up didn't check anything else either.",
    "**Speed is not intelligence.** Answers arrive fast enough to feel authoritative. These are good open models, not frontier ones, and they make things up at ordinary rates.",
    "**The model list isn't stable.** Models get deprecated and moved to enterprise-only, so a hardcoded name can stop working. Check the models page, and prefer production models over preview ones.",
  ],

  whereToNext: [
    { label: "More developer services like this one", categorySlug: "ai-apis-developer-services" },
    { label: "Running open models on your own machine", categorySlug: "local-open-source-ai" },
  ],
};
