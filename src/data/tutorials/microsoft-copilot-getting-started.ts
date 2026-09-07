import type { PlatformTutorialData } from "./types";

export const microsoftCopilotTutorial: PlatformTutorialData = {
  slug: "microsoft-copilot-getting-started",
  platformSlug: "microsoft-copilot",
  title: "Getting Started with Microsoft Copilot",
  tagline:
    "Microsoft's free AI assistant, already sitting inside the Windows and Office world you use every day.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-07",
  accessTier: "FREE",

  howItWorks:
    "You open Copilot in a browser, on your phone, or from the taskbar on a Windows PC, then type a question or paste in some text and it answers in a chat window. You keep replying in the same thread to sharpen what it gave you, the way you'd go back and forth with a colleague rather than firing off a single search.",

  whatItIs: [
    "A general-purpose chat assistant from Microsoft. It answers questions, drafts and rewrites text, explains things in plain language, searches the live web with links, and generates images.",
    "**The name is the confusing part.** This page is about the free consumer Copilot — the one at `copilot.com`, in the Copilot app, and on the Windows taskbar, that you sign into with a personal Microsoft account. It is **not** GitHub Copilot (a separate paid tool that writes code inside a programmer's editor), and it is **not** Microsoft 365 Copilot (a paid work add-on that reads your organisation's files, emails and chats). Same brand, genuinely different products, sold separately.",
    "Why a beginner might pick this over ChatGPT or Gemini: it's already installed on a Windows 11 PC and it leans into Microsoft's world — the Edge browser sidebar, Windows settings, and Word and Excel if you later subscribe. The shortest distance between you and an AI assistant is often the one already on your machine.",
    "Why you might not: for everyday chatting, drafting and explaining, Copilot is broadly in the same class as its rivals. The honest deciding factor is usually which ecosystem you already live in, not which assistant is cleverer.",
  ],

  beforeYouStart: [
    "**Cost to start: nothing.** Go to `copilot.com` in any browser, or open the Copilot app on a Windows 11 PC, where Microsoft says it's typically installed by default. You can chat without an account at all.",
    "**What you need:** a browser. Signing in with a free personal Microsoft account (or an Apple or Google account) is optional, but Microsoft says it's what unlocks chat history, longer conversations, more image creation and longer voice sessions. Do it on day one.",
    "**The shape of the free tier:** it isn't a trial that expires. It's a working assistant with ceilings. Ordinary back-and-forth chat keeps going; the expensive extras — image generation, voice, the heaviest reasoning — are what run down and then refill over time. Paying raises the ceiling and adds reach into other apps. It does not hand you a different, smarter assistant.",
    "**Will you realistically need to pay? For most beginners, no.** Asking questions, drafting, rewriting and summarising are all free. You'd pay for two specific things: Copilot working **inside** the Word, Excel and PowerPoint desktop apps, and Copilot Vision (letting it look at your screen) — both of which currently require a Microsoft 365 Personal, Family or Premium subscription. Those currently sit in roughly the $10–20 per month range for individuals; the separate business add-on is currently around $20–30 per user per month. Prices move, so check before you buy.",
    "**Your first move:** open `copilot.com` and paste in something you actually wrote — an email, a paragraph, a message you're unsure about — and ask it to make it clearer and shorter and tell you what it changed.",
  ],

  security: [
    {
      kind: "text",
      text: "Copilot is a cloud service, not software thinking on your own computer. Whatever you type, paste or upload travels to Microsoft's servers to be answered. That's normal for AI assistants, and it means the ordinary rule applies: don't paste anything you'd be unhappy to have leave your hands — passwords, ID numbers, or someone else's private information.",
    },
    {
      kind: "list",
      label: "Personal account vs work or school account — the difference here is real",
      items: [
        "**On a personal Microsoft account**, Microsoft says it uses data from Bing, MSN and Copilot for AI training, and that you can control this — there's a privacy setting to opt out of having your conversation activity used for model training. Find it early if that matters to you.",
        "**On a work or school account** (an Entra ID sign-in from your employer), Microsoft states plainly that it does not train Copilot on that data, and that prompts and responses in Copilot Chat aren't used to train the underlying foundation models. In exchange, your organisation's IT admins have controls and visibility that they don't have over your personal account.",
        "**You can see which one you're in.** The app puts a `Work` or `Personal` label next to your profile. Glance at it before you paste anything sensitive, because the protections behind those two labels are not the same.",
      ],
    },
    {
      kind: "text",
      text: "None of this makes Copilot risky to try. It makes it a normal cloud service with a settings page worth five minutes of your attention.",
    },
  ],

  triad: {
    bestAt: [
      "Rewriting, tightening and re-toning text you've already written",
      "Explaining an unfamiliar term, topic or error message in plain language",
      "Questions that need current information, since it searches the web and shows sources",
      "Getting a rough first draft onto a blank page",
      "\"How do I do this on my Windows PC?\" questions about settings and features",
    ],
    okayAt: [
      "Summarising a long article or document you paste or upload",
      "Brainstorming — competent ideas, rarely surprising ones",
      "Casual image generation",
      "Light spreadsheet and formula help, if you describe your data clearly",
      "Translation and reading comprehension in common languages",
    ],
    avoid: [
      "Decisions where being confidently wrong is expensive — medical, legal, financial or tax. Use it to understand the terrain, not to choose your route.",
      "Facts you have no way to check. It still invents plausible-sounding names, numbers, dates and citations.",
      "Confidential, client or regulated material typed into a personal account.",
      "Serious programming work. That's a different product — GitHub Copilot — and this one isn't a substitute for it.",
    ],
  },

  starterActions: [
    {
      title: "Fix a real email before you send it",
      whatItDoes:
        "Turns something you've already written into a shorter, clearer version, and shows you what changed so you learn from it.",
      prompt:
        "Here is an email I am about to send. Rewrite it to be clearer and about a third shorter while keeping my voice, then list what you changed and why. Do not add anything I did not say.",
      whyHere:
        "Copilot is one keypress away on a Windows PC and lives in the Edge sidebar, so it reaches you at the moment you're actually writing rather than making you break stride and open a separate tab.",
      tweak:
        "Add \"give me two versions, one warmer and one more formal\" and choose between them.",
    },
    {
      title: "Ask your own PC how to do something",
      whatItDoes:
        "Copilot on Windows can answer questions about your machine's settings and walk you to the right one.",
      prompt:
        "My laptop screen is hard to read and the text feels too small. Walk me through fixing this in Windows step by step, and tell me exactly where each setting lives.",
      whyHere:
        "This is the thing a generic chatbot cannot do. Copilot on Windows is built into the operating system and knows the Windows settings landscape it's sitting in.",
      tweak:
        "Swap in whatever is actually annoying you — battery draining fast, notifications too noisy, a printer that won't appear.",
    },
    {
      title: "Get a sourced answer on something current",
      prompt:
        "What are the current rules for this topic? Give me a short answer first, then the detail, and include links to the sources you used so I can check them myself.",
      whyHere:
        "Copilot searches the live web by default and surfaces its sources inline, which makes it a decent starting point for time-sensitive questions — provided you actually click through.",
      tweak:
        "Follow up with \"which of those sources is the most authoritative, and why?\" It's a fast way to learn whose word is worth trusting.",
    },
    {
      title: "Turn messy notes into something usable",
      whatItDoes:
        "Converts a rough pile of typed notes into a summary, a list of decisions and a list of next steps.",
      prompt:
        "Below are my rough notes from a meeting. Turn them into a short summary, a list of decisions that were made, and a list of action items with an owner for each. Where something is ambiguous, flag it instead of guessing.",
      whyHere:
        "If you ever subscribe to Microsoft 365, this exact motion moves into Word and Outlook themselves — so the habit you build in the free chat carries forward into the Office apps rather than being thrown away.",
      tweak:
        "Ask for the action items as a table you can paste straight into an email.",
    },
  ],

  pitfalls: [
    "**Four different things are called Copilot.** The free consumer app, Microsoft 365 Copilot (the paid work add-on that reads your company's files), Copilot on Windows, and GitHub Copilot for programmers. A large share of the advice and complaints you'll read online are about a different one than the one you're using — check which product a tip refers to before you conclude yours is broken.",
    "**Signed out is a weaker Copilot.** Without an account you lose chat history and get shorter conversations and less image creation. If it feels oddly clipped or forgetful, check whether you're actually signed in before you blame the AI.",
    "**It sounds exactly as confident when it's wrong.** Fluency is not accuracy. Treat every specific number, name, date and citation as unverified until you've checked it — including ones that arrive with a link attached, because the link doesn't always say what the answer claims.",
    "**Paying does not buy you a smarter chatbot.** A Microsoft 365 subscription mostly buys reach: Copilot inside Word and Excel, Copilot Vision, higher usage ceilings. If you're unhappy with the quality of the answers, a subscription won't fix that. Clearer prompts and more context usually will.",
    "**Work habits leak into personal accounts.** People paste work documents into a personal Copilot session without thinking. Check the `Work` or `Personal` label first — the data handling is different, and so is your employer's policy about it.",
  ],

  whereToNext: [
    {
      label: "See how Copilot compares to the other big chat assistants",
      categorySlug: "text-conversational-ai",
    },
    {
      label: "AI built into the business software you already use",
      categorySlug: "ai-plugins-business-software",
    },
  ],
};
