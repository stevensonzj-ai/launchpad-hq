import type { PlatformTutorialData } from "./types";

export const poeTutorial: PlatformTutorialData = {
  slug: "poe-getting-started",
  platformSlug: "poe",
  title: "Getting Started with Poe",
  tagline:
    "One app, many AI chatbots from different companies — paid for with a shared daily allowance of points instead of a separate subscription to each.",
  archetype: "prompts",
  lastReviewedAt: "2026-10-15",
  accessTier: "FREE",

  howItWorks:
    "You pick a bot — Poe's name for each AI you can talk to — type a message, and it answers in the same chat window. Each reply spends points (Poe's unit of spend — each message costs some). Follow up, or ask a different bot the same thing and compare what comes back.",

  whatItIs: [
    "Poe is a chat app made by Quora that puts AI chatbots from many different companies in one place. Instead of opening one company's app for one AI, you open Poe and choose which one to talk to. Poe's own help pages list bots from OpenAI, Anthropic, Google and Meta, alongside image, video and audio generators.",
    "Each of those AIs runs on a **model** (the AI \"brain\" that does the actual thinking), and the model belongs to the company that built it, not to Poe. Poe's terms say plainly that Quora does not create what the bots write. Poe is the front door and the bill; the thinking happens elsewhere.",
    "The reason to use it rather than one company's own app is comparison. Poe's app listing describes comparing answers from different AIs and combining bots \"all within a single chat thread,\" so you can see for yourself which one suits a task instead of taking anyone's word for it.",
    "Anyone can also build a bot of their own on top of an existing one, and other users publish theirs. That is why Poe's bot list is much longer than the handful of big-company AIs — many of the bots you will scroll past were made by individuals, not by the companies whose models they use.",
  ],

  beforeYouStart: [
    "You can start without paying. You need a Poe account, and non-paying accounts get a fresh allowance of points every day; it resets every 24 hours and whatever you do not use is gone rather than saved up.",
    "**Every bot costs a different amount, and the cost is shown before you send.** Each bot's page displays how many points a message takes, and a \"Rates\" section explains how that price is worked out. A quick text bot and a video generator spend your one daily allowance at very different speeds, so which bots you use decides how far it goes.",
    "Whether you will ever need to pay depends on that mix. Poe's help pages say subscribers get more points than free users plus access to more advanced bots, and that points come daily, monthly or both depending on the plan. If you mostly chat with lighter bots, the free allowance may be all you need; if you lean on image or video generation, expect to run out quickly. Prices change, so check Poe's own pricing screen rather than any figure quoted elsewhere.",
    "If you do subscribe, decide where first. Poe's purchases FAQ says you can only upgrade on the same platform you subscribed on, and switching means cancelling and subscribing again. Subscriptions bought in the app stores renew automatically unless cancelled at least 24 hours before the period ends.",
  ],

  security: [
    {
      kind: "text",
      text: "Poe sits between you and several other companies, and that is the privacy fact that matters. Its privacy policy (last updated January 2024) says the companies whose models power a bot, and the people who built that bot, may receive the contents of your chats. It says your account details, such as your username and email, are not passed to them. Conversations are not visible to other Poe users unless you share them.",
    },
    {
      kind: "list",
      label: "Worth knowing before you type anything personal",
      items: [
        "Bots built by outside developers are a different case from the big-company ones. Poe's privacy policy says developers of bots built with code 'may view and store your anonymized chats on their servers to train their models.' Keep sensitive questions to the official bots.",
        "Sharing a chat publishes it. Choosing messages to share copies them into a post other Poe users can see; delete it from your profile if you change your mind.",
        "Memory is off by default. If you turn it on, Poe builds up context from your chats and shares that context with the other model companies you talk to on Poe. You can view or delete it in Settings.",
        "Temporary chats are not saved to your history and their messages are deleted within 24 hours, but files you upload to one are kept for up to 15 days for safety review.",
      ],
    },
    {
      kind: "list",
      label: "Never paste in",
      items: [
        "Passwords, card numbers or Social Security numbers — Poe's own privacy policy asks you not to",
        "Other people's private information",
        "Confidential work material",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Putting the same question to AIs from different companies and seeing the difference side by side, without an account at each one",
      "Finding out which AI you actually prefer before paying any single company for it",
      "Turning a set of instructions you keep retyping into your own reusable bot, with no code",
    ],
    okayAt: [
      "Image, video and audio generation — available, but these bots cost far more points per use than text bots",
      "Long, ongoing conversations — they work, but Poe sends chat history along with each new message, so a long thread costs more per reply than a fresh one",
    ],
    avoid: [
      "Assuming a community-made bot costs what an official one does — creators can set their own price per message, and Poe's per-message budget setting only warns you about those bots after the fact",
      "Relying on any bot for medical, legal or investment decisions — Poe's own FAQ says to consult a professional",
    ],
  },

  starterActions: [
    {
      title: "Ask two companies' AIs the same thing",
      prompt:
        "I want to understand how a credit score is calculated. Explain it in under 150 words for someone who has never had a credit card, and end with the single most common misunderstanding.",
      whyHere:
        "Send it to one bot, then send it again to a bot from a different company, in the same chat or a new one. Every bot's page shows its points cost, so you see both how the answers differ and what each one cost from the same daily allowance.",
      tweak:
        "Swap in any topic you are trying to learn. The differences are usually clearest on explanations, not on simple facts.",
    },
    {
      title: "Check the price tag before and after",
      whatItDoes:
        "Open a bot's page and look at its Rates section, send one short message, then open that message's info menu to see what it actually cost. Settings lets you view your points history.",
      whyHere:
        "Poe charges per message from one shared balance, and the cost differs bot to bot — which is not how a single-company chatbot like ChatGPT works, where you never see a per-message price. Two minutes of checking tells you which bots your daily allowance can comfortably cover.",
    },
    {
      title: "Build your own bot in a form, no code",
      prompt:
        "You are a patient writing coach. When I paste a paragraph, reply with: one sentence on what works, the two most important fixes, and a rewritten version. Keep it friendly and never longer than my original.",
      whyHere:
        "Click 'Create a bot' in the sidebar, choose a base bot (the existing AI it runs on) and paste this into the prompt field. Unlike ChatGPT's custom versions, the base can come from any company Poe carries, so you can rebuild the same coach on a different AI and compare. A setting called 'Prompt visible from bot profile' decides whether other people can read your instructions.",
      tweak: "Add a greeting message so you remember what the bot is for when you come back to it.",
    },
    {
      title: "Start a fresh chat for each new task",
      prompt:
        "Here is a long email I need to answer: '[paste]'. Summarise what the sender is actually asking for in three bullet points, then draft a reply under 120 words.",
      whyHere:
        "Poe has a setting called auto-manage context that limits how much earlier chat history is sent with each message, because sending history costs points. Starting a new chat for a new job keeps each reply cheap and keeps the AI from mixing in an unrelated earlier conversation.",
    },
  ],

  pitfalls: [
    "**Unused points do not carry over.** There is no saving up for a big job later in the week.",
    "**A long chat gets more expensive as it goes.** Turning off auto-manage context lets the bot see more of the conversation but spends more points per reply.",
    "**In a group chat, the person who calls a bot pays for it.** Bots only reply when mentioned, unless automatic replies are switched on, and the points come from whoever triggered the reply.",
    "**It sounds equally sure of itself whichever AI you pick.** Comparing two answers helps you spot disagreement, but two bots agreeing is not the same as being right — check anything that matters.",
  ],

  whereToNext: [
    { label: "Chat assistants", categorySlug: "text-conversational-ai" },
    { label: "Image generators", categorySlug: "image-generation-editing" },
    { label: "Research tools", categorySlug: "research-academic-tools" },
  ],
};
