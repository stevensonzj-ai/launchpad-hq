import type { PlatformTutorialData } from "./types";

export const mistralAiLeChatTutorial: PlatformTutorialData = {
  slug: "mistral-ai-le-chat-getting-started",
  platformSlug: "mistral-ai-le-chat",
  title: "Getting Started with Mistral Vibe (formerly Le Chat)",
  tagline:
    "The French-built assistant that turned into a work agent — and the only major one whose company also gives its models away.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-07",
  changelogUrl: "https://docs.mistral.ai/resources/changelogs",
  accessTier: "FREE",

  howItWorks:
    "Vibe (formerly Le Chat) is a chat assistant you use in a browser at `chat.mistral.ai`, or in its iOS, Android and desktop apps. You type what you want in ordinary language and it writes back. That part will feel familiar.\n\nWhat is different is the shape underneath. Vibe has three modes. **Chat** is the quick back-and-forth you already know. **Work** is for jobs that take more than one step: it reads your prompt, pulls context from files you attach, tools you connect, or the web, then makes a plan and carries it out while you watch each step. **Code** is for developers — ignore it as a beginner.\n\nWork is where Mistral placed its bet, and the pieces are named plainly. **Connectors** link Vibe to tools you already use, like email, calendar, Slack, Notion, GitHub or Google Drive. **Libraries** are document collections you upload once and question repeatedly. **Skills** are checklists or templates you hand it so a task gets done your way every time. It also searches the web, reads pages you point it at, makes images, takes voice input, and can run a prompt on a schedule.\n\nThe practical version: start in Chat, move to Work the day you have a task with several steps and more than one source.",

  whatItIs: [
    "**A general assistant with an agent layer.** It answers questions, drafts and edits writing, summarises documents you upload, searches the web and makes images — and can chain those together toward one goal rather than answering one message at a time.",
    "**Made by a French company, and for some people that is the point.** Mistral AI is registered in Paris and is your data controller under European privacy law (GDPR). Its privacy policy says it prioritises providers inside the EU, and attaches the European Commission's Standard Contractual Clauses where it uses a non-EU one. Be precise about what that buys you: choosing where your data physically lives is an Enterprise feature, not something a free account gives you.",
    "**The company publishes open-weight models.** Several Mistral models — including Mistral Small 4 under an Apache 2.0 licence, about as permissive as licensing gets — are released as downloadable weights anyone can run on their own hardware. That does not change Vibe, which is hosted like any other product. It matters as an exit: the technology is not entirely locked behind one login.",
    "**Why pick this over ChatGPT, Claude or Gemini?** Honestly, on everyday questions you will not tell the four apart in your first week. Pick Vibe if the European story is worth something to you, if you want the connectors-and-scheduling agent shape without paying first, or if you value the open models. Pick a rival if you want the biggest pile of tutorials to search when you get stuck — Mistral's beginner ecosystem is thinner.",
  ],

  beforeYouStart: [
    "**It costs nothing to start.** There is a free plan. You need an email address and two minutes — no card, no waitlist.",
    "**What you need:** a browser, or the iOS, Android or desktop app. Nothing to install if you use the web.",
    "**How the free tier limits you — the mechanism, not a number.** Mistral publishes no message count. Free gives you capped messages and web searches, capped coding sessions, image generation and the connectors; hit a cap and you wait for a reset or upgrade. So it is not a trial that expires — it is a permanent account that slows down when you lean on it. Treat any daily-limit figure on a third-party blog as a guess.",
    "**Will you realistically need to pay?** Probably not for a while. A few questions, drafts and document summaries a day stays comfortably inside free. You will feel the ceiling running multi-step Work tasks daily. The paid consumer tier currently sits at around fifteen US dollars a month, with a cheaper verified-student rate. Check the pricing page — these numbers move.",
    "**Your first step:** go to `chat.mistral.ai`, sign up, and before typing anything else open Settings and deal with the privacy toggle below.",
  ],

  security: [
    {
      kind: "text",
      text: "Mistral AI is a French company and, for your account, the data controller under European privacy law — the entity legally responsible for how your data is used. Its privacy policy says it prioritises providers within the EU that adhere to GDPR, and that in exceptional cases where it uses a non-EU provider it attaches the European Commission's Standard Contractual Clauses. That is a stronger European posture than most assistants offer. It is not a guarantee your data never leaves the EU, and not the same as the data residency options sold to Enterprise customers. Do not repeat a \"your data stays in Europe\" claim you cannot check.",
    },
    {
      kind: "list",
      label: "The setting to change first",
      items: [
        "Mistral's own documentation states Vibe users are **not opted out by default** — your conversations may be used to train its models unless you say otherwise. Enterprise customers are opted out by default; you are not.",
        "On web: Settings, then Vibe under Manage, then Privacy, and disable `Allow your interactions to be used to train our models`.",
        "On iOS or Android: Settings, then Data & Account Controls, then deselect data sharing.",
        "Mistral's developer API has a **separate** toggle. Turning one off does not turn the other off.",
      ],
    },
    {
      kind: "list",
      label: "What is kept, and what to withhold",
      items: [
        "Conversations are retained until you delete the conversation or your account. Deleting a chat is a real action, not just tidying.",
        "Connectors are the highest-stakes setting here — linking your email or Drive gives the assistant reach into everything in that account. Connect one at a time, for a reason, and disconnect what you stopped using.",
        "Never paste passwords, card numbers, medical records or other people's personal details into any assistant, this one included.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Everyday writing — drafting, rewriting, tightening, changing tone",
      "Reading long documents you upload and answering specific questions about them",
      "Multi-step tasks spanning several sources, where Work mode earns its keep",
      "European-language work, French especially",
      "Being a genuinely capable free assistant if you do not want to pay to find out whether you like it",
    ],
    okayAt: [
      "Web research — it searches and reads pages, but check anything that matters",
      "Image generation: usable, not the strongest available",
      "Coding help for beginners, though Code mode is aimed over your head",
      "Very recent news, where every assistant trails a search engine",
    ],
    avoid: [
      "Anything where a confident wrong answer costs you — medical, legal, tax, financial",
      "Arithmetic and data you have not verified",
      "Tasks where you will need a large community of tutorials to get unstuck",
      "Storing anything you would not want retained on someone else's server",
    ],
  },

  starterActions: [
    {
      title: "Make it explain something at your level",
      whatItDoes:
        "Turns a topic you find confusing into an explanation pitched where you actually are.",
      prompt:
        "Explain how a large language model produces text, to someone with no technical background. Use one everyday analogy, keep it under 200 words, and end with one thing people commonly get wrong about it.",
      whyHere:
        "Chat mode is the direct descendant of Le Chat and is built for exactly this — fast single answers, no setup, no cost on the free plan. The cheapest way to learn whether you like how this assistant writes.",
      tweak:
        "Swap in anything you have been nodding along to without really understanding.",
    },
    {
      title: "Upload a document and interrogate it",
      whatItDoes:
        "Gets a straight answer out of a long PDF or report without reading all of it.",
      prompt:
        "I am attaching a document. Give me a five-bullet summary, then list every deadline, obligation or number I would regret missing. If anything is ambiguous, say so rather than guessing.",
      whyHere:
        "Work mode takes documents, spreadsheets, presentations, PDFs and images directly. If you question the same files week after week, Vibe's Libraries feature lets you upload them once, indexed, instead of re-attaching every time.",
      tweak:
        "Add \"quote the exact sentence each point came from\" so you can check its work.",
    },
    {
      title: "Test its honesty before you trust it",
      whatItDoes:
        "Shows you how this assistant behaves when it does not know something.",
      prompt:
        "What were the three biggest changes in my industry in the last two months? Search the web, cite a link for each claim, separate what you found from what you are inferring, and say plainly if you cannot verify something.",
      whyHere:
        "Vibe can search the web and open a specific URL you give it, so you can watch it work rather than take its word. Finding out early how this one signals uncertainty tells you what its confident voice is worth.",
      tweak: "Follow up with \"which of those claims is weakest, and why?\"",
    },
    {
      title: "Point it at a real multi-step job",
      whatItDoes: "Uses Work mode as designed, on a task with more than one stage.",
      prompt:
        "Write me a one-page briefing on a topic I will name. Find three credible recent sources, show where they agree and contradict each other, then write it in plain language for someone who knows nothing about it. Show me your plan before you start writing.",
      whyHere:
        "This is what Vibe was rebuilt around — Work mode gathers context, forms a plan, and executes with the steps visible. Asking to see the plan first is your chance to redirect it before it spends your free allowance going the wrong way.",
      tweak:
        "If you run this weekly, Vibe can run a prompt on a schedule instead.",
    },
  ],

  pitfalls: [
    "**It will be confidently wrong, and it sounds identical to when it is right.** No tone change, no tell. True of every assistant; it is the most expensive beginner mistake. Verify anything you would hate to be wrong about.",
    "**The training default runs the wrong way.** Mistral's documentation is explicit that personal Vibe users are not opted out of model training unless they opt out. Do it in the first five minutes, on web and mobile — and remember the API has its own separate switch.",
    "**\"European company\" is real but narrower than it sounds.** Mistral being French, being your GDPR data controller and prioritising EU providers is checkable. Choosing where your data physically lives is an Enterprise feature. Quote the privacy policy rather than improvising a stronger claim.",
    "**Connectors are powerful and quietly permanent.** Two clicks gives the assistant real reach into a real inbox. People connect everything on day one out of curiosity and never revisit it.",
    "**The name changed and the internet has not caught up.** Le Chat became Vibe in May 2026. Most guides and videos still say Le Chat and some describe an interface that no longer exists. Your account and conversations carried over unchanged; the tutorials did not.",
  ],

  whereToNext: [
    {
      label: "Compare it with the other big assistants",
      categorySlug: "text-conversational-ai",
    },
    {
      label: "Explore the open models behind it",
      categorySlug: "local-open-source-ai",
    },
  ],
};
