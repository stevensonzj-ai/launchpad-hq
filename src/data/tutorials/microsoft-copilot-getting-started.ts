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
    "You open Copilot in a browser, on your phone, or from the taskbar on a Windows PC, then type a question or paste in text and it answers in a chat window. You keep replying in the same thread to sharpen the answer.",

  whatItIs: [
    "**The name is the confusing part.** This page is about the free consumer Copilot — at `copilot.com`, in the Copilot app, and on the Windows taskbar, signed in with a personal Microsoft account. It is **not** GitHub Copilot (a paid tool that writes code in a programmer's editor) and **not** Microsoft 365 Copilot (a paid work add-on that reads your organisation's files and emails). Same brand, different products, sold separately.",
    "Why pick it over ChatGPT or Gemini: it is already on a Windows 11 PC and leans into Microsoft's world — the Edge sidebar, Windows settings, Word and Excel if you subscribe. Otherwise it is in the same class as its rivals, so the deciding factor is which ecosystem you live in.",
  ],

  beforeYouStart: [
    "**Nothing to start.** Go to `copilot.com`, or open the Copilot app on a Windows 11 PC, where Microsoft says it is typically installed by default. You can chat without an account.",
    "Signing in with a free personal Microsoft, Apple or Google account is optional, but Microsoft says it unlocks chat history, longer conversations, more image creation and longer voice sessions.",
    "The free tier is not a trial that expires but a working assistant with ceilings: ordinary chat keeps going, while image generation, voice and the heaviest thinking run down and refill.",
    "Most beginners never pay. You would pay for two things — Copilot inside the Word, Excel and PowerPoint desktop apps, and Copilot Vision, which lets it look at your screen — both currently needing a Microsoft 365 Personal, Family or Premium subscription at roughly $10–20 a month. The business add-on is currently around $20–30 per user per month; prices move.",
  ],

  security: [
    {
      kind: "text",
      text: "Copilot is a cloud service: whatever you type, paste or upload goes to Microsoft's servers. What matters here is less what you send than which account you send it from.",
    },
    {
      kind: "list",
      label: "Personal account versus work or school account",
      items: [
        "**On a personal Microsoft account**, Microsoft says it uses data from Bing, MSN and Copilot to train its **models** — the AI \"brains\" that do the thinking. A privacy setting opts your conversation activity out; find it early.",
        "**On a work or school account** — the sign-in from your employer — Microsoft states plainly it does not train Copilot on that data, and that what you type and what it answers are not used to train the underlying models. Your IT admins then get controls and visibility they lack over your personal account.",
        "**You can see which one you are in:** the app puts a `Work` or `Personal` label next to your profile. Glance at it before pasting anything sensitive.",
      ],
    },
    {
      kind: "text",
      text: "The five minutes worth spending on day one go into the privacy settings; the label in the corner is what to check thereafter.",
    },
  ],

  triad: {
    bestAt: [
      "Rewriting and re-toning text you have already written",
      "Explaining an unfamiliar term or error message in plain language",
      "Questions needing current information — it searches the live web and shows its sources",
      "\"How do I do this on my Windows PC?\" questions about settings",
      "Getting a rough first draft onto a blank page",
    ],
    okayAt: [
      "Summarising a long article or document you paste or upload",
      "Casual image generation, and light spreadsheet and formula help",
    ],
    avoid: [
      "Serious programming work — that is GitHub Copilot, a separate paid product",
      "Confidential, client or regulated material in a personal account, where activity feeds model training unless you opt out",
      "Expecting a subscription to make it cleverer; Microsoft 365 buys reach, not better answers",
      "Anything where being confidently wrong is expensive — medical, legal, financial, tax — or any figure you cannot check",
    ],
  },

  starterActions: [
    {
      title: "Fix a real email before you send it",
      prompt:
        "Here is an email I am about to send. Rewrite it to be clearer and about a third shorter while keeping my voice, then list what you changed.",
      whyHere:
        "On a Windows 11 PC Copilot is on the taskbar by default, so it reaches you while you are writing rather than making you open a tab. ChatGPT and Gemini both want that tab.",
    },
    {
      title: "Ask your own PC how to do something",
      prompt:
        "My laptop screen is hard to read and the text feels too small. Walk me through fixing this in Windows, and tell me where each setting lives.",
      whyHere:
        "Microsoft lists settings help among the things Copilot on Windows does that the browser version cannot, so it names the actual path on your machine.",
    },
    {
      title: "Get a sourced answer on something current",
      prompt:
        "What are the current rules for this topic? Short answer first, then the detail, with links to the sources so I can check them.",
      whyHere:
        "Copilot sits in the Edge sidebar, so a sourced answer arrives beside the page you are already reading. Perplexity and Gemini show sources too; neither is in the sidebar of the browser Windows ships with.",
    },
  ],

  pitfalls: [
    "**Signed out is a weaker Copilot** — shorter conversations, no history, less image creation. If it feels clipped or forgetful, check you are signed in.",
    "**Work habits leak into personal accounts.** People paste work documents into a personal session without thinking. The data handling is different, and so is your employer's policy.",
    "**Assuming a tip you read applies to your Copilot.** Much of the advice online is about one of the other three.",
  ],

  whereToNext: [
    { label: "Compare the big chat assistants", categorySlug: "text-conversational-ai" },
    { label: "AI inside business software", categorySlug: "ai-plugins-business-software" },
  ],
};
