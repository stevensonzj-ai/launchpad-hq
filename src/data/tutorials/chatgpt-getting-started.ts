import type { PlatformTutorialData } from "./types";

export const chatgptTutorial: PlatformTutorialData = {
  slug: "chatgpt-getting-started",
  platformSlug: "chatgpt",
  title: "Getting Started with ChatGPT",
  tagline: "A beginner's first 20 minutes with the most popular AI chatbot.",
  archetype: "prompts",
  lastReviewedAt: "2026-06-22",
  accessTier: "FREE",

  howItWorks:
    "You type a message (this is called a prompt — the instruction you give the AI), it types back in plain language, and you can keep the conversation going, including telling it to redo or improve an answer.",

  whatItIs: [
    "ChatGPT is OpenAI's general-purpose AI assistant — the one most people mean when they say \"AI.\"",
    "It's the best default starting point for a beginner because it does a little of everything competently, before you graduate to specialized tools.",
  ],

  beforeYouStart: [
    "Free to use with a sign-up (email, Google, or Apple) — no card required. First step: go to chat.openai.com, sign up free, and you're in.",
    "Will you need to pay? The free tier is plenty for casual use — learning, drafting, brainstorming. You'd only pay (Plus, currently around $20/month) if you want the best models reliably or hit the limits often. Paying buys better models, not more privacy.",
    "The free tier has usage limits that reset on a rolling few-hour window. When you hit them, ChatGPT quietly swaps you to a smaller, faster model (the AI \"brain\" doing the work — there are smarter-but-slower and faster-but-simpler ones). Answers get noticeably shallower with no big warning; if a reply suddenly feels worse, that's usually why. Limits also tighten when OpenAI is busy.",
  ],

  security: [
    "ChatGPT is mainstream and reasonably well-run, but it's a cloud service — and on the free tier, your conversations are used to train OpenAI's models by default. Good rule for any AI chatbot: treat everything you type as if a stranger might eventually read it.",
    "Never paste in: passwords, bank or card numbers, Social Security numbers; medical records tied to your name; other people's private info; or confidential work material (several companies have banned employees from doing exactly this).",
    "Two settings worth knowing day one: turn off training under Settings → Data Controls → \"Improve the model for everyone\" (paying for Plus does not do this for you); and use Temporary Chat for one-off sensitive questions. Note that \"temporary\" and \"deleted\" still aren't instant — OpenAI holds data for around 30 days either way. None of this makes normal use unsafe; the box just isn't a vault.",
  ],

  triad: {
    bestAt: [
      "Brainstorming and getting unstuck",
      "Rewriting and reshaping text",
      "Explaining things at your level (\"explain X like I'm new to it\")",
      "Drafting first versions you then refine",
    ],
    okayAt: [
      "Math and precise logic — check the numbers",
      "Current events — it can search the web, but it's limited on free, so don't assume it knows this week's news",
      "Coding — competent for small tasks and learning, but dedicated tools do better",
    ],
    avoid: [
      "Anything where being wrong has real consequences — legal, medical, financial; it sounds equally confident when wrong",
      "Facts you can't verify, especially sources and citations — it invents plausible ones",
      "Truly current or niche information on the free tier",
    ],
  },

  starterActions: [
    {
      title: "The explainer (its best trick)",
      whatItDoes:
        "Prompt: \"Explain how compound interest works to someone who's never heard of it. Use a simple real-life example, keep it under 150 words, and end with one thing people most often get wrong about it.\"",
      whyHere:
        "ChatGPT is strongest when you give it topic + audience + length + focus all at once — this prompt does all four.",
      tweak: "Swap in any topic you want to learn.",
    },
    {
      title: "The rewriter (format control)",
      whatItDoes:
        "Prompt: \"Here's a rough message to my landlord about a broken heater: '[paste].' Rewrite it three ways — polite, firm, urgent — each under four sentences.\"",
      whyHere:
        "\"Give me options\" works for almost any writing task and lets you pick the tone instead of settling for the first draft.",
    },
    {
      title: "The thinking partner (back-and-forth)",
      whatItDoes:
        "Prompt: \"I'm deciding between [two options]. Ask me five questions one at a time to help me think it through — don't give your opinion yet. Wait for each answer.\"",
      whyHere: "Turning it into a back-and-forth is where a chatbot beats a search engine.",
    },
    {
      title: "The role-player (practice)",
      whatItDoes:
        "Prompt: \"Act as a friendly interviewer for a [retail job]. Ask one common question, wait for my answer, give brief feedback, then continue until I say stop.\"",
      whyHere: "The same pattern works for language practice or rehearsing any tricky conversation.",
    },
    {
      title: "The organizer (structure from mess)",
      whatItDoes:
        "Prompt: \"Turn this brain-dump into a clean weekly plan as a table, grouped by day, with a 'must-do' and 'nice-to-have' each: '[dump].'\"",
      whyHere: "It's good at imposing structure on chaos — turning a messy list into something usable.",
    },
  ],

  pitfalls: [
    "It sounds confident even when wrong — a made-up answer reads as smoothly as a correct one. Verify anything factual.",
    "It invents sources, quotes, and citations — search for the real thing yourself.",
    "The free tier downgrades you mid-session — quality quietly drops when you hit the cap; that's the cause, not you.",
    "It doesn't truly remember — within one chat it follows along, but a new chat is a blank slate, and very long threads \"forget\" the top. One task, one conversation.",
    "Taking the first answer — the whole point is the follow-up: \"shorter,\" \"more casual,\" \"you missed X.\" Tries two and three are where it gets good.",
  ],

  whereToNext: [
    "Browse image generators",
    "Browse AI coding tools",
    "Browse research tools",
  ],
};
