import type { PlatformTutorialData } from "./types";

export const scaleAiTutorial: PlatformTutorialData = {
  slug: "scale-ai-getting-started",
  platformSlug: "scale-ai",
  title: "Getting Started with Scale AI",
  tagline:
    "The company that builds the training data behind the big AI labs. You almost certainly can't buy it — but its free public leaderboards tell you which AI model is currently best at the job you actually have.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-08",
  changelogUrl: "https://scale.com/blog",
  accessTier: "FREE",

  howItWorks:
    "You open Scale's public leaderboards in a browser, pick a skill you care about — coding, reasoning, voice, safety — and read a ranked table of which AI **models** (the AI \"brain\" that does the actual thinking) did best at it. Then you go use whichever one won.",

  whatItIs: [
    "Scale AI doesn't sell you an AI. It sells the raw material the AI companies need: enormous volumes of carefully labelled, human-checked training data, plus the tests used to grade the results. Its customers are AI labs, large enterprises and governments, on negotiated contracts. If you came looking for something to sign up for and type into, this isn't it.",
    "What Scale gives away is useful, and it's why this page exists. Its research arm, Scale Labs, publishes free public leaderboards at labs.scale.com ranking the well-known models against each other on specific named tests — agentic coding, scientific reasoning, legal and finance work, voice, honesty under pressure. No account, no card, nothing to install. It is one of the better free answers to the question every beginner has and nobody answers well: which one of these should I actually be using?",
    "Read those rankings knowing the company behind them is mid-upheaval. Meta took a large minority stake in June 2025 and founder Alexandr Wang left to run AI at Meta; Scale cut about 14% of staff a month later, and reporting at the time said OpenAI wound down its work with Scale while Google, its largest customer, planned to move on. Francis deSouza, previously COO at Google Cloud, became CEO in August 2026. Alive, funded and shipping — but not the company it was two years ago.",
  ],

  beforeYouStart: [
    "**Nothing here is something you can buy by clicking.** Scale is sales-led: the pricing page lists an Enterprise tier with no prices and a \"Book a demo\" link, and that demo page is a form to book an intro call.",
    "The free part needs no account. The leaderboards at labs.scale.com are public web pages you read like any article. That's where a beginner should spend their time here.",
    "There's one self-serve exception, and it probably isn't what you want. The pricing page still advertises a pay-as-you-go \"Self-Serve Data Engine\" billed to a card, with the first 1,000 labelling units and first 10,000 uploaded images free. What that buys is a console for labelling a dataset you already own — useful if you're training your own model, useless if you wanted something to chat with.",
    "One Scale surface an individual can sign up for: Outlier, its platform for paid freelance contributors who train and grade AI models. That's a job, not a product, and it's covered further down.",
  ],

  security: [
    {
      kind: "text",
      text: "The usual warning barely applies, because on the path this page recommends you don't type anything in. Reading a leaderboard is ordinary web browsing — no account, no prompt box, no upload. There is nothing to leak.",
    },
    {
      kind: "list",
      label: "Two places data does change hands:",
      items: [
        "Outlier, if you apply to contribute. Onboarding asks for government ID, a résumé and a LinkedIn profile, and the work means reading and grading real AI conversations. That's an identity-and-employment decision, not a signup. Apply from outlier.ai, reached via Scale's own site — not a link someone messaged you.",
        "The enterprise product, if your employer ever buys it. Handing over training data means human contractors read it; that is the service, not a side effect, and it's governed by a negotiated agreement rather than a checkbox. Scale's terms and subprocessor list are at scale.com/legal.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Answering \"which model is best at this specific thing\" — these are separate named tests, not one overall score",
      "Benchmarks that look like real work: the Remote Labor Index grades **agents** (AI that takes actions on its own rather than only answering)",
    ],
    okayAt: [
      "Picking a model for ordinary everyday chat — the tests skew hard and technical, and the gaps at the top are small",
      "Being a neutral referee, for the reason in the next column",
    ],
    avoid: [
      "Treating the rankings as independent scorekeeping. Scale sells data and evaluation services to several of the labs on its own leaderboards. It publishes a safeguard — it says it won't license recent data drawn from the live leaderboard's distribution — and it's worth understanding both that the safeguard exists and why it's needed.",
      "Coming here to try the actual product. There is no trial of Scale Data Engine and no free tier of the GenAI portfolio.",
    ],
  },

  starterActions: [
    {
      title: "Start with the Remote Labor Index",
      whatItDoes:
        "Shows how often AI agents finish an entire real freelance job — the kind someone paid a human to do — to a standard a client would accept.",
      whyHere:
        "Most rankings score models on exam-style questions. This one bought 240 finished freelance projects across 23 fields, worth about $144,000 in total, and grades the deliverable rather than the answer. Its own history is the useful part: the best agent completed roughly 2.5% of those projects at launch in late 2025, and the top of the board now sits near 16%.",
      tweak:
        "Don't read the winner's name — read the failure breakdown. Most misses are quality and incompleteness, not the model being unable to start.",
    },
    {
      title: "Pick the leaderboard that matches what you'd actually use AI for",
      whatItDoes:
        "Takes you from one global \"best model\" number to the board for your job — agentic coding, scientific and legal reasoning, image and video understanding, voice.",
      whyHere:
        "A single overall ranking averages things you'll never do. Scale's board is a shelf of separately named tests, each with a page describing what it tested, so \"best at refactoring code\" and \"best at finance questions\" are different answers with different winners.",
      tweak:
        "Open a safety or honesty board for the same model while you're there — one tests whether it tells the truth under pressure. A model can lead one and lag the other, and that gap is the thing to notice.",
    },
    {
      title: "Read Showdown — then read who did the voting",
      whatItDoes:
        "Ranks models by which answer real people preferred, side by side, without knowing which model wrote which.",
      whyHere:
        "The votes come from Scale's paid contributor network — 80+ countries and 70+ languages — cast inside Scale's own apps as part of their work, and the results filter by country, language, age and education. That's a different population from an open arena anyone can walk into, and it's why a model can top one board and not the other.",
      tweak:
        "Filter to your own country and language first — the regional differences are the interesting part.",
    },
    {
      title: "If you'd rather work in AI data than buy it, look at Outlier",
      whatItDoes:
        "Scale's freelance platform, where people with subject expertise are paid to write problems for AI models, grade their answers, and set the standards those answers are marked against.",
      whyHere:
        "It's the only Scale product an individual can actually sign up for, and the numbers are Scale's own: over $500 million paid to more than 700,000 contributors across 50 countries. It also explains the rest of this page: the Showdown votes and much of the data Scale sells come from this workforce.",
      tweak:
        "The bar is degree-level expertise plus English. Niche expertise is worth more here than general availability.",
    },
  ],

  pitfalls: [
    "Reading \"top AI platform\" lists as \"things I can use.\" Scale is a supplier to AI companies; the honest translation of its place on those lists is \"top AI company,\" which is a different thing.",
    "Chasing whoever is first on a board. Gaps at the top are small and the order changes monthly; a model you already pay for and that sits in the top few beats a new subscription for two points.",
  ],

  whereToNext: [
    { label: "AI APIs & Developer Services", categorySlug: "ai-apis-developer-services" },
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
  ],
};
