import type { PlatformTutorialData } from "./types";

export const grokTutorial: PlatformTutorialData = {
  slug: "grok-getting-started",
  platformSlug: "grok",
  title: "Getting Started with Grok",
  tagline:
    "A chatbot with a live feed — it reads the web and X as you ask, so it can talk about what happened an hour ago.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-07",
  changelogUrl: "https://x.ai/news",
  accessTier: "FREE",

  howItWorks:
    "You sign in at grok.com (or the phone app), type a question into a box, and read the answer. If the question is about something current, Grok goes and searches the web and X before it replies, then shows you the links it used.",

  whatItIs: [
    "Grok is a general-purpose AI assistant from the company that also owns X (formerly Twitter). You can chat with it, have it write and edit text, explain code, generate images, or talk to it out loud in voice mode.",
    "It's for anyone who wants a capable everyday assistant, and especially for people who care about **right now** — news, sports, a trending argument, a product launch this morning.",
    "The reason to pick Grok over other chatbots is its wiring into X. Most assistants search the open web; Grok also reads live X posts, so it's unusually good at \"what are people actually saying about this\" — a question the others answer badly or not at all.",
    "The reason to be careful is the same reason: X posts are opinions, not facts. Grok's edge is speed and pulse, not accuracy.",
  ],

  beforeYouStart: [
    "**It costs nothing to start.** There's a real free tier, not a trial that dies in a week.",
    "You need an account. Sign-in is by X account or email — if you already have an X login, that's the fastest route.",
    "**The free tier works on a usage pool:** you get an allowance, you spend it, and it refills on its own schedule. The exact numbers change often, so treat the mechanism as the durable fact — you will hit a wall, and the wall lifts by itself.",
    "**Will you realistically need to pay?** Probably not, if you use it a few times a day for questions and writing. You'll feel the free limits if you generate a lot of images, run long research sessions, or lean on it daily for work.",
    "Paid plans currently start at around $30/month, with a higher tier at about $100/month. First step: go to grok.com, sign in, and ask it something that happened today.",
  ],

  security: [
    {
      kind: "text",
      text: "Grok runs in the cloud — nothing happens on your computer. Everything you type is sent to the company's servers, and by default your conversations are used to help train future versions of the model. That's the default setting, not something you agreed to separately. It's changeable, and you should change it before you paste anything you wouldn't want a stranger to read.",
    },
    {
      kind: "list",
      label: "What to do in your first five minutes",
      items: [
        "**Turn off training:** on the website go to Settings, then Data, and deselect \"Improve the Model.\" In the mobile app it's Settings, then Data Controls, same toggle. This only affects new conversations going forward, not ones you've already had.",
        "**For a one-off sensitive question, use Private Chat** — the ghost icon in the top right. Those chats stay out of your history, aren't used for training, and are deleted within 30 days.",
        "If you signed in with X, know that Grok's answers already draw on public X posts, including yours. Opting out of that is a separate setting inside X, under Privacy and safety.",
        "Don't paste passwords, financial account details, medical records, client work under an NDA, or anything about another person that they wouldn't want shared.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Questions about things happening now — breaking news, live scores, a stock moving today",
      "Telling you what people on X are saying about a topic, and roughly which way the argument is going",
      "Explaining a confusing viral post, meme, or piece of jargon in context",
      "Fast everyday writing: emails, summaries, rewrites, first drafts",
      "Casual conversation with a looser, more informal personality than most assistants",
    ],
    okayAt: [
      "Coding help — genuinely capable, but not the first tool most developers reach for",
      "Generating images from a description",
      "Reading and summarising documents you upload",
      "Long multi-step reasoning problems, which work better on the paid tiers",
    ],
    avoid: [
      "Anything where being wrong matters and you can't check it — medical, legal, or financial decisions",
      "Using it as a fact-checker on live events; it has repeatedly been shown to repeat confident errors during fast-moving news",
      "Work that must stay confidential, unless you've turned off training and understand it still leaves your machine",
      "Questions where you need a neutral, carefully hedged answer — Grok's default register is opinionated",
    ],
  },

  starterActions: [
    {
      title: "Ask it what happened today",
      whatItDoes: "Sends Grok to search the live web and X before answering.",
      prompt:
        "What are the three biggest news stories from the last 12 hours? For each one, give me two sentences of context and link the sources you used.",
      whyHere:
        "Most chatbots either refuse this or answer from stale training data. Grok searches X and the web at the moment you ask, which is the single thing it does that its competitors don't.",
      tweak: "Swap \"news\" for your own world — a sports league, a company, a game you play.",
    },
    {
      title: "Decode something you saw on X",
      whatItDoes: "Explains a trending post, term, or argument using the actual conversation around it.",
      prompt:
        "Explain what people mean when they talk about this and why it is trending. Assume I have no background at all. Tell me who is arguing what, and be clear about which parts are opinion.",
      whyHere:
        "Grok can read the replies and quote-posts, not just an article about them. Ask another assistant this and you get a definition; ask Grok and you get the room.",
      tweak: "Paste the post's text or link directly above the prompt.",
    },
    {
      title: "Make an image from a sentence",
      whatItDoes: "Turns a written description into a picture.",
      prompt:
        "Make an image of a small bookshop on a rainy street at night, warm light in the window, soft and painterly.",
      whyHere:
        "Image generation is built into the same chat box — no second tool, no separate signup. Note that everything Grok generates carries a visible watermark, and there's no way to remove it.",
      tweak: "Add a style: \"as a pencil sketch,\" \"as a 1970s film photo.\"",
    },
    {
      title: "Talk to it out loud",
      whatItDoes: "Opens a spoken back-and-forth instead of typing.",
      prompt:
        "I want to practice explaining my job to someone who knows nothing about it. Ask me questions like a curious stranger would, one at a time.",
      whyHere:
        "Voice mode is included on the free tier and is quick enough to feel like a conversation rather than a walkie-talkie. It's the easiest way to get past the blank-text-box feeling if this is your first AI tool.",
      tweak: "Use it for language practice, or to think out loud on a walk.",
    },
  ],

  pitfalls: [
    "**Confident is not correct.** Grok answers breaking news in a certain, fluent tone even when it's wrong, and it has a documented record of getting fast-moving events wrong. If it matters, click through to the sources it cites and read them yourself.",
    "**X is not a source of truth.** When Grok tells you \"people are saying,\" it's summarising posts from an argumentative social network, not verified reporting. Loud does not mean true or representative.",
    "**Your chats train the model until you say otherwise.** The opt-out is a toggle two clicks into Settings, and turning it off doesn't retroactively pull back what you already sent.",
    "**The free wall arrives without warning.** You'll be mid-task when the limit hits. It refills on its own, but budget your heavier requests — image generation burns through an allowance far faster than chatting does.",
    "**The personality is a feature, and it can bite.** Grok is deliberately less filtered than other assistants. That makes it feel refreshingly blunt, and it also means it will occasionally produce something crude or badly judged. Don't use it for anything customer-facing without reading it first.",
  ],

  whereToNext: [
    { label: "Compare it with other chat assistants", categorySlug: "text-conversational-ai" },
    { label: "Tools built just for making images", categorySlug: "image-generation-editing" },
  ],
};
