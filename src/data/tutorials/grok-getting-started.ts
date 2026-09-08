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
    "You sign in at grok.com or the phone app, type a question into a box, and read the answer. If it is about something current, Grok searches the web and X before replying, then shows you the links it used.",

  whatItIs: [
    "Grok is a general-purpose AI assistant from the company that also owns X (formerly Twitter). You can chat, have it write and edit text, explain code, make images in the same box, or talk to it out loud in voice mode, which is included free.",
    "The reason to pick it over other chatbots is its wiring into X: most assistants search the open web, while Grok also reads live X posts — which is the mechanism behind \"what are people actually saying about this\" and the one source a web-search assistant cannot reach.",
    "The reason to be careful is the same reason: when Grok says \"people are saying,\" it is summarising an argumentative social network, not verified reporting. Its edge is speed and pulse, not accuracy — loud does not mean true.",
  ],

  beforeYouStart: [
    "It costs nothing to start — a real free tier, not a trial that dies in a week. Sign-in is by X account or email, so an X login is the fastest way in.",
    "**The free tier works on a usage pool:** you get an allowance, spend it, and it refills on its own schedule. The exact numbers change often, so treat the mechanism as the durable fact — you will hit a wall, and the wall lifts by itself.",
    "A few questions and some writing a day costs nothing. You'll feel the limits if you run long research sessions, lean on it daily for work, or make a lot of images — image generation burns an allowance far faster than chatting. Paid plans currently start at around $30/month, with a higher tier at about $100/month.",
    "First step: go to grok.com, sign in, and ask it something that happened today.",
  ],

  security: [
    {
      kind: "text",
      text: "Grok runs in the cloud: everything you type goes to the company's servers, and by default your conversations help train future versions of the **model** (the AI \"brain\" that does the actual thinking). Change that before you paste anything you wouldn't want a stranger to read.",
    },
    {
      kind: "list",
      label: "What to do in your first five minutes",
      items: [
        "**Turn training off.** Website: Settings, Data, deselect \"Improve the Model.\" App: Settings, Data Controls, same toggle. It only affects new conversations, not ones you have already had.",
        "**For a one-off sensitive question, use Private Chat** — the ghost icon at top right. Those chats stay out of your history, aren't used for training, and are deleted within 30 days.",
        "If you signed in with X, Grok's answers already draw on public X posts, including yours; opting out of that is a separate setting inside X, under Privacy and safety.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Questions about right now — breaking news, live scores, a stock moving today",
      "What people on X are saying, and which way the argument is going",
      "Explaining a confusing viral post, meme or bit of jargon",
      "Fast everyday writing: emails, summaries, rewrites, first drafts",
    ],
    okayAt: [
      "Coding help — capable, but not the first tool most developers reach for",
      "Making images, and summarising documents you upload",
      "Long multi-step reasoning, which works better on the paid tiers",
    ],
    avoid: [
      "Publishing a Grok image as your own — everything it makes carries a visible **watermark** (a mark identifying output as AI-made) that you can't remove",
      "Treating it as a fact-checker on live events; it has repeatedly produced confident errors during fast-moving news",
      "Questions where you want a careful, hedged answer — Grok is built to have an attitude",
    ],
  },

  starterActions: [
    {
      title: "Ask it what happened today",
      prompt:
        "What are the three biggest news stories from the last 12 hours? For each one, give me two sentences of context and link the sources you used.",
      whyHere:
        "Grok searches X and the open web as you ask, and shows its links. Put the same question to ChatGPT and you get an article write-up, not what the feed is saying.",
    },
    {
      title: "Decode something you saw on X",
      prompt:
        "Explain what people mean when they talk about this and why it is trending. Assume I have no background at all. Tell me who is arguing what, and be clear about which parts are opinion.",
      whyHere:
        "Grok can read the replies and quote-posts, not just an article about them. Ask another assistant and you get a definition; ask Grok and you get the room.",
    },
    {
      title: "Make an image from a sentence",
      prompt:
        "Make an image of a small bookshop on a rainy street at night, warm light in the window, soft and painterly.",
      whyHere:
        "Image generation sits in the same chat box, no second tool and no separate signup — and every picture comes out watermarked, worth discovering on something throwaway rather than on real work.",
    },
  ],

  pitfalls: [
    "**Confident is not correct.** Grok answers breaking news in a fluent, certain tone even when wrong, and has a documented record of getting fast-moving events wrong. Click through to the sources it cites.",
    "**The personality is a feature, and it can bite.** Grok is deliberately less filtered than other assistants, which makes it refreshingly blunt and occasionally crude or badly judged. Don't send anything customer-facing without reading it first.",
  ],

  whereToNext: [
    { label: "Compare it with other chat assistants", categorySlug: "text-conversational-ai" },
    { label: "Tools built just for making images", categorySlug: "image-generation-editing" },
  ],
};
