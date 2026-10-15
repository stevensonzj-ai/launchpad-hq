import type { PlatformTutorialData } from "./types";

export const qwenTutorial: PlatformTutorialData = {
  slug: "qwen-getting-started",
  platformSlug: "qwen",
  title: "Getting Started with Qwen",
  tagline: "Alibaba's free AI chat — and a first look at a model family you can later download and run yourself.",
  archetype: "prompts",
  lastReviewedAt: "2026-10-15",
  accessTier: "FREE",

  howItWorks:
    "You go to chat.qwen.ai, sign in, and type a message — your **prompt** (the message you type) — into the box. Qwen types an answer back, sometimes after searching the web and listing the pages it used underneath. You reply to steer it: shorter, simpler, more detail, try again.",

  whatItIs: [
    "Qwen is Alibaba's family of AI **models** (the AI \"brain\" that does the actual thinking), and Qwen Chat is the free website and app where you talk to them. Qwen's site credits the service as \"Powered by Alibaba Cloud.\"",
    "Qwen comes through three doors, and this page covers the first. **Qwen Chat** is the website at chat.qwen.ai plus apps for iOS, Android, macOS and Windows. **Downloadable models** are the second: Alibaba publishes hundreds of Qwen models as **open-weight** files (the model file itself is published, so you can run it yourself) on Hugging Face, a public site for sharing AI models. Run one with Ollama or LM Studio and your messages never leave your computer — see Local & Open-Source AI below. Each model carries its own licence, and they are not all the same, so read the one on the model's page before relying on it. The third door is for programmers building Qwen into their own software: Alibaba's Qwen Cloud, launched for global markets in May 2026, and Alibaba Cloud Model Studio.",
    "Why start here rather than with ChatGPT or Gemini: Qwen describes its chat as one place to reach both its open-source and its proprietary models, alongside web search, reading documents and pictures you upload, making and editing images, and voice and video chat. What you learn here carries straight over if you later want to run a Qwen model privately on your own machine — something you cannot do with the models behind ChatGPT, Claude or Gemini's chat apps.",
  ],

  beforeYouStart: [
    "Go to chat.qwen.ai (or start from qwen.ai, which links to it) and create an account — Qwen's rules say you must be signed in to use it. Its privacy policy describes signing up with an email address or with a Google, Apple or GitHub account. Qwen describes the chat as free to use and open to all.",
    "**It is licensed for personal use, not work.** Qwen's service agreement (effective 10 September 2026) says the service is \"for private and non-commercial use only.\" Learning, home projects and personal writing are fine; drafting for your employer or for paying clients falls outside that licence. Businesses are pointed at Alibaba's developer platforms instead.",
    "The agreement sets the minimum age at 18 (or older, if your country requires it), and says features \"may also vary among jurisdictions\" — so a button a guide mentions may simply not exist where you live.",
  ],

  security: [
    { kind: 'text', text: "Qwen Chat, the Qwen apps and the desktop client are run by NTH Power Global Tech Singapore Pte. Ltd., a company registered in Singapore. Its privacy policy (effective 7 September 2026) says your account details and conversations are collected, processed and stored in Singapore, on Alibaba Cloud's Singapore servers, and warns that Singapore's data-protection laws 'may differ from those in your jurisdiction.' The service agreement is governed by Singapore law, with disputes settled by arbitration there unless your country's consumer law says otherwise." },
    { kind: 'list', label: "What Qwen's own documents say about training on your chats", items: [
      "The privacy policy says Qwen may use your conversations to train its models after stripping out details that identify you, and that it does not train directly on your raw input.",
      "The service agreement is broader — it may use your content 'to train models' — and gives one way out: email privacy@qwen.com and ask to opt out. Neither document mentions a switch in the app's settings.",
      "Even after you opt out, rating an answer with thumbs up or down saves that whole conversation as feedback, and the agreement says feedback is still used for training. Skip the rating buttons on anything private.",
    ] },
    { kind: 'list', label: "Qwen's own list of things not to upload", items: [
      "Passwords, keys or login details of any kind — the agreement has you promise your uploads contain none",
      "Health records, ID cards and financial account information",
      "Your precise location, or biometric data such as face or fingerprint scans",
      "Other people's personal details, unless they've agreed — the policy makes that your responsibility",
    ] },
    { kind: 'text', text: "You can delete your account yourself from Qwen's settings, per the privacy policy. The same policy says some data may be kept after deletion where the law or a pending dispute requires it, and it publishes no fixed retention periods." },
  ],

  triad: {
    bestAt: [
      "Trying Qwen's models for free before deciding whether to download one and run it privately on your own computer.",
      "Questions about recent events, with the pages it searched listed under the answer so you can check them.",
      "Summarising and questioning documents and pictures you upload.",
      "Everyday drafting, rewriting and explaining — the core chat job.",
    ],
    okayAt: [
      "Search-backed answers: useful, but Qwen's own agreement says replies 'may still contain errors even when reference sources are identified' — open the sources.",
      "Image making and voice or video chat, which Qwen lists among its features; Qwen does not publish how much of them you can use.",
    ],
    avoid: [
      "Anything you are paid to produce — the personal, non-commercial licence covered in Before you start.",
      "Scripting it or bulk-copying its answers with another tool. The agreement bans 'extracting data or outputting content through automated or programmatic means'; the developer platforms exist for that.",
      "Letting its answer decide something about another person — a loan, a job, a tenancy, a diagnosis — without a human checking it. Qwen's agreement forbids exactly that use.",
    ],
  },

  starterActions: [
    {
      title:
        "Ask about something recent — and make it show its sources",
      prompt:
        "Search the web: what has changed about [a rule, product or event you care about] in the last month? List each source you used with its date, and tell me which points only one source supports.",
      whyHere:
        "Qwen's service agreement says it searches the web either when it guesses you want it to or when you switch its search function on yourself, and then lists the pages it drew on beneath the answer. Saying 'search the web' takes the guessing out, and asking for dates matters because the same agreement admits answers can be wrong even with sources attached.",
      tweak:
        "If no sources appear under the reply, it answered from what it already knew — ask again with search switched on.",
    },
    {
      title:
        "Hand it a document you're allowed to share",
      prompt:
        "Summarise the attached document in five bullet points a beginner could follow, then list three questions it leaves unanswered.",
      whyHere:
        "Qwen's agreement has you promise that anything you upload is yours or that you're authorised to share it. Practising on a public document — a product manual, a council notice, a blank lease template — lets you learn how it handles files without breaking that promise on day one.",
      tweak:
        "Follow up with 'Which of your bullet points is least certain, and why?'",
    },
    {
      title:
        "Find out what it remembers about you",
      prompt:
        "Remember this for future chats: I cook for two, I'm vegetarian, and I have 30 minutes on weeknights. Suggest three dinners for this week.",
      whyHere:
        "Qwen's privacy policy names a Memory feature that keeps 'specific details from your conversations' to shape later ones, but Qwen publishes no help page on how to see or clear what it has kept — unlike ChatGPT, which documents its memory controls. Asking it directly in a fresh chat is the dependable way to learn what it carries forward.",
      tweak:
        "Open a new chat and ask: 'What do you remember about me?' Tell it to forget anything you'd rather it didn't keep, then ask again to check.",
    },
    {
      title:
        "Test-drive a model you could later download",
      whatItDoes:
        "If Qwen Chat offers a choice of model, pick one Qwen also publishes as a free download, and ask it the kinds of questions you'd want answered offline — then compare it with the default.",
      whyHere:
        "Qwen describes its chat as one place to reach both its open-source and proprietary models. That turns the chat into a free test drive: you find out whether a model is good enough before spending the disk space and setup time to run it in Ollama.",
      tweak:
        "Whether a model chooser appears for you, and which models it lists, is something you'll see once you're signed in.",
    },
  ],

  pitfalls: [
    "**Lookalike sites and apps are everywhere.** Search 'Qwen pricing' and the top results include unofficial sites with Qwen-style names quoting their own prices. Start from qwen.ai or chat.qwen.ai and follow their links to the apps rather than a search result.",
    "**'Qwen' means two things.** It's the chat app and it's the family of downloadable models. A guide about 'running Qwen' or a per-use price is almost always about the models or the developer platform, not the free chat this page covers.",
  ],

  whereToNext: [
    { label: "Local & Open-Source AI", categorySlug: "local-open-source-ai" },
    { label: "AI APIs & Developer Services", categorySlug: "ai-apis-developer-services" },
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
  ],
};
