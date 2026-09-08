import type { PlatformTutorialData } from "./types";

export const fireworksAiTutorial: PlatformTutorialData = {
  slug: "fireworks-ai-getting-started",
  platformSlug: "fireworks-ai",
  title: "Getting Started with Fireworks AI",
  tagline:
    "A hundred-plus open AI models behind one login — try them in a browser chat box, then wire the one you like into software you're building.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-08",
  changelogUrl: "https://fireworks.ai/blog",
  accessTier: "FREE",

  howItWorks:
    "You open Fireworks in a browser, pick an AI **model** (the AI \"brain\" that does the actual thinking) from a long list, and type into a chat box to see what comes back. Swap to a different model and send the same message again. When you want it inside your own software, the same models answer from code.",

  whatItIs: [
    "Fireworks is a hosting company, not a model maker. Labs like DeepSeek, Alibaba, Meta and Mistral publish their AI models as files anyone may download and run; Fireworks runs them on its own machines and rents you access. That is why one login reaches a hundred-plus models rather than one company's.",
    "It is built for people putting AI inside something they are making. The browser chat box is the right place to start, but there is no phone app, no saved conversations, no sidebar of documents; the paid layers rent dedicated hardware or tune a model on your own examples. If you want an assistant to talk to daily, a consumer chatbot is the better door.",
  ],

  beforeYouStart: [
    "**Understand the money before anything else.** Fireworks runs on prepaid **credits** (the platform's unit of spend — each thing you make costs some), not a subscription. A new account currently gets about $1 in free credits — a one-off welcome grant, not an allowance that refills. The documentation is explicit: when it runs out with no card on file, the account is suspended until you add one.",
    "It goes further than it sounds. The cheapest text models currently list at cents per million chunks of text handled (a chunk is roughly a short word); only the flagships cost dollars. An afternoon in the browser spends a fraction of the grant.",
    "Until a card is on file the account is capped at roughly ten requests a minute — ample for typing questions by hand, far too little to run anything real.",
    "Nothing to install. Sign in with Google, GitHub, LinkedIn or an email address; Fireworks' own onboarding puts experimenting in the model playground before anything else, so the model list and chat box are where to head first.",
  ],

  security: [
    {
      kind: "text",
      text: "Fireworks' stated default is unusually strong for a hosted service. Its documentation says that for open models it does not log or store what you type or what comes back at all without an explicit opt-in — the data lives only in working memory for the length of the request. Fireworks also lists SOC 2 Type II certification and says it supports HIPAA workloads.",
    },
    {
      kind: "list",
      label: "Two things that qualify it",
      items: [
        "One documented exception, and it is opt-out rather than opt-in: a newer interface called the Response API saves conversations by default so a chat can carry across calls, deleting them after 30 days.",
        "\"Not stored\" describes storage, not travel. What you type still crosses to Fireworks' machines and runs through a model another company built.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Breadth — DeepSeek, Qwen, GLM, Kimi, MiniMax, Llama, Gemma and Mistral behind one login and one balance, so comparing them is a dropdown rather than four signups.",
      "Growing past the trial without moving house: the same account rents dedicated hardware and tunes models on examples you supply.",
    ],
    okayAt: [
      "Being explored by someone who does not write code. The chat box is the way in, though the quickstart makes a key before anything else, so you may find you need one; everything around it is written for developers.",
    ],
    avoid: [
      "Assuming Fireworks' terms are the only ones that apply. Its agreement requires you to obey each model's own licence, written by the lab that published it — so whether you may use a model commercially is a question about that model, not about Fireworks.",
      "Passing the results off as your own writing. The terms specifically forbid representing output as human-generated, and let Fireworks tell you at any time to stop using an output it believes may infringe someone's rights.",
    ],
  },

  starterActions: [
    {
      title:
        "Ask the same question of a cheap model and an expensive one, and read both price rows",
      prompt:
        "A shop sells pens at 3 for $4 and notebooks at $2.50 each. I spend exactly $21 and buy twice as many pens as notebooks. How many of each? Show your working.",
      whyHere:
        "Every Fireworks model page prints three prices, not one — text going in, text coming back, and a much lower third rate for input the system has already seen. GLM 5.2 currently shows $1.40, $4.40 and $0.14 per million chunks. Read that beside a model listed at five cents and you learn both things that matter here: whether the cheap model was good enough, and why repeating a long standing instruction costs far less than the headline rate.",
      tweak:
        "Use a question with a right answer you can check. Open-ended writing makes every model look fine.",
    },
    {
      title: "Try a model you cannot get in a consumer app",
      whyHere:
        "DeepSeek, Kimi, GLM and MiniMax are among the strongest openly published models anywhere, and almost none reach Western consumer chatbots. Fireworks serves them from its own machines under the no-logging default above, rather than forwarding your request to whichever host is cheapest that minute — so trying them does not also mean choosing where your text lands.",
    },
    {
      title: "Only if you write code: make a key and change two lines",
      whyHere:
        "The quickstart lists three ways to call the service — Fireworks' own toolkit, OpenAI's and Anthropic's — so a script already written against either of those usually needs a changed address and key, not a rewrite. If you do not write code, stopping after step two is a legitimate ending.",
      tweak:
        "An **API key** is a password that identifies your app, and that spends your money. Make a separate one per project.",
    },
  ],

  pitfalls: [
    "Adding credits does not always restart a stopped account. A separate monthly spend limit can pause one that still holds a balance; the fix is raising that cap in billing settings, not buying more.",
    "Auto Reload is a standing instruction to charge your card whenever the balance dips. Switch it on deliberately.",
    "The pricing page currently flags a rate change on dedicated hardware. Check any figure here against it before relying on one.",
  ],

  whereToNext: [
    { label: "More AI APIs and developer services", categorySlug: "ai-apis-developer-services" },
    { label: "Running open models on your own computer", categorySlug: "local-open-source-ai" },
    { label: "If you just want an assistant to talk to", categorySlug: "text-conversational-ai" },
  ],
};
