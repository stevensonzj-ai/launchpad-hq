import type { PlatformTutorialData } from "./types";

export const togetherAiTutorial: PlatformTutorialData = {
  slug: "together-ai-getting-started",
  platformSlug: "together-ai",
  title: "Getting Started with Together AI",
  tagline:
    "Two hundred-plus open AI models — text, images, video, speech — on one prepaid account. There is no free trial: it starts with $5 on a card.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-08",
  changelogUrl: "https://docs.together.ai/docs/changelog",
  accessTier: "FREE",

  howItWorks:
    "You sign in, put a small amount of money on the account, then open Together's playground in a browser, pick a **model** (the AI \"brain\" that does the actual thinking) from a long list, and type into a box. An answer comes back and the cost comes off your balance. Swap the model, ask again.",

  whatItIs: [
    "Together AI is infrastructure, not an app. It runs openly published models — made by other labs, not by Together — on its own machines and rents access through an **API** (a way for programs to talk to each other without a person clicking). Chatbots built on DeepSeek, Qwen or Llama often have something like Together underneath.",
    "What sets it apart from the other rent-a-model companies is range: one account and one balance reach 200-plus models across about ten kinds of work, so a video clip and a page of text bill to the same place. It will also train a model on your own examples, or rent you the machines themselves by the hour. There is a plain chat window too — Together Chat, hosted in the US and Canada — separate from the developer platform.",
  ],

  beforeYouStart: [
    "**There is no free trial, and that is the first thing to know.** Together removed its free tier in a July 2025 billing change; reaching the platform now means putting at least $5 of credit on a card up front, and at a zero balance your access is suspended until you top it up. If you want to try open models without paying, Groq's free tier or a model on your own computer are the honest starting points — come back once you know what you want to build.",
    "For text, $5 goes further than you would expect; the cheaper models cost cents for a great deal of it. Video is the exception, billed per clip at a few cents each, which moves a balance in a way text never will.",
    "Nothing to install — a browser covers everything here. Together Chat may be usable without the card: it launched free with a daily allowance, though Together no longer publishes its limits, so treat what you get there as a bonus rather than a plan.",
  ],

  security: [
    {
      kind: "text",
      text: "What you type runs on Together's servers. Its privacy policy is unusually direct: Together says it does not use data collected from you to train its models without your explicit opt-in, and that consent is revocable. A zero-retention option in the Privacy and Security settings goes further, stopping your text and the answers being stored at all.",
    },
    {
      kind: "list",
      label: "Practical rules",
      items: [
        "Together's terms explicitly prohibit sending financial, medical or sensitive personal data — a rule you agree to at signup, not general caution.",
        "Make an **API key** (a password that identifies your app, and that spends your money) only when you have code to put it in.",
        "Set a usage limit before switching on auto-reload, which buys more credit from your card whenever the balance runs low.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Breadth on one bill — text, image, video and speech models from many different labs, on a single account",
      "Running the big open families — DeepSeek, Qwen, Llama, GLM — so the machine bill is not yours",
      "Growing without switching vendor: pay-as-you-go, training on your own examples, or whole machines by the hour",
    ],
    okayAt: [
      "Being looked around cheaply — $5 is a small door charge, but it is a door charge",
      "The hardest reasoning and coding, where the leading closed models are still ahead",
      "Stability of any single model name; the catalogue turns over constantly",
    ],
    avoid: [
      "Sending financial, medical or sensitive personal data — Together's own terms list it as prohibited use, not merely discouraged",
      "Hardcoding a model name. The published retirement policy gives ordinary models two to three weeks' notice and preview models under 24 hours, and an upgrade redirects your requests to a new version after three days",
      "Making it your first ever AI tool — with no free trial there is nowhere to look around before paying",
    ],
  },

  starterActions: [
    {
      title: "Spend the first dollar in the playground, not in code",
      whatItDoes:
        "Picks a mid-sized chat model in the browser playground and asks it something you already know the answer to.",
      whyHere:
        "Together takes the $5 before it shows you anything, so the number going down is your own prepaid balance, not a promotional grant burning off. Watching one real request cost real money is the fastest way to build accurate cost instincts.",
    },
    {
      title: "Ask one question of three models from three different labs",
      whatItDoes:
        "Sends the same question to a DeepSeek, a Qwen and a GLM model, changing only the dropdown.",
      whyHere:
        "The catalogue passes 200 models across about ten kinds of work, so one balance buys comparisons that are not limited to text: answer the question, then generate a picture of the answer from the same account, billed per megapixel rather than by the word.",
      tweak:
        "Then make one short video and stop. Video bills per clip, a few cents each, and it is the only thing here that visibly moves a $5 balance.",
    },
    {
      title: "Try Together Chat before deciding you need the platform",
      whyHere:
        "Same open models in an ordinary chat window, on machines in the US and Canada, and the one route here that does not begin with a card. If it does everything you came for, what you wanted was a chatbot rather than an AI cloud — and you have saved the $5.",
    },
  ],

  pitfalls: [
    "**The $5 is a door charge, not a subscription.** People arrive expecting a free tier that has not existed since July 2025, and find they cannot send a single request.",
    "**Reading 'free model' as 'free account'.** A model or two in the catalogue currently costs $0.00 per use, but you still need the funded balance to reach it.",
    "**Assuming Together built these models.** It hosts open models made by other labs; whether one is any good this month is a question about DeepSeek or Qwen, not about Together.",
  ],

  whereToNext: [
    { label: "More developer platforms like this one", categorySlug: "ai-apis-developer-services" },
    { label: "Running open models on your own machine, for free", categorySlug: "local-open-source-ai" },
  ],
};
