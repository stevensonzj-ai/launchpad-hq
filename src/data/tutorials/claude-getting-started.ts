import type { PlatformTutorialData } from "./types";

export const claudeTutorial: PlatformTutorialData = {
  slug: "claude-getting-started",
  platformSlug: "claude",
  title: "Getting Started with Claude",
  tagline: `A chat assistant with a genuinely capable free tier — and a training default worth knowing about before you start.`,
  archetype: "prompts",
  lastReviewedAt: "2026-07-27",
  changelogUrl: "https://claude.com/blog",
  accessTier: "FREE",

  howItWorks: `Claude is a conversational assistant from Anthropic. You type in plain language and it responds, holding the thread of a long conversation rather than treating each message as a fresh start. It can search the web, read files you upload, write and run code, and carry memory across separate conversations. The practical skill is not learning commands — there are none — but learning to give it enough context up front that it does not have to guess what you want.`,

  whatItIs: [
    `A general-purpose chat assistant you use through a browser, a desktop app, or a phone app.`,
    `Strongest on long documents, careful writing, and problems where you want reasoning shown rather than a bare answer.`,
    `Free to use with no card required, with paid tiers that buy more usage rather than fundamentally different features.`,
    `The same brand covers several products — the chat assistant, a coding tool, and a developer API — which are governed by **different terms and have different privacy defaults**.`,
  ],

  beforeYouStart: [
    `The free plan covers web, iOS, Android, and desktop, and includes web search, file uploads, memory across conversations, and the ability to create files and run code. It is not a stripped demo.`,
    `Paid plans start at $20 a month billed monthly, or $17 a month if you pay for a year up front. Higher tiers exist at $100 and $200 a month and buy usage headroom, not new capabilities.`,
    `Usage resets on a rolling five-hour window, and paid plans add a weekly ceiling on top. There is no published message count — how far you get depends on conversation length, model, and which features you use.`,
    `**Set your training preference before your first real conversation.** On free and paid personal plans, training is on by default. See the security section.`,
  ],

  security: [
    {
      kind: "text",
      text: `The thing worth understanding here is not a setting, it's a contract. Anthropic sells access to the same models under two different agreements, and they have **opposite privacy defaults**. Personal chat plans — Free, Pro, and Max alike — are opt-out for model training: unless you turn it off, new and resumed conversations are used to improve Anthropic's models. Team, Enterprise, and direct API access run under commercial terms, where no training happens by default at all.`,
    },
    {
      kind: "list",
      label: "The numbers behind the toggle",
      items: [
        `Training left on: conversations can be retained for up to **five years**.`,
        `Training turned off: the window drops to thirty days.`,
        `The toggle sits in your privacy settings and can be changed at any time, though changing it is not retroactive for data already processed.`,
        `Conversations you delete are not used for future training.`,
        `Incognito conversations are excluded regardless of the setting.`,
        `Conversations flagged by safety systems are the exception — they can be retained and reviewed whatever your preference.`,
      ],
    },
    {
      kind: "text",
      text: `That five-year figure is the part to carry away. Retention on assistant products is usually measured in weeks, and leaving this one at its default stretches it to years — a difference of scale rather than degree. Because the same company offers the same models under stricter terms elsewhere, **which door you walked through decides your default**, not how careful you are once you are inside. Paying more does not change it; changing product does.`,
    },
  ],

  triad: {
    bestAt: [
      `Working through long documents you upload and answering questions grounded in them`,
      `Drafting and revising prose where tone and structure matter`,
      `Explaining reasoning step by step instead of asserting a conclusion`,
      `Sustained back-and-forth on one problem across a long conversation`,
    ],
    okayAt: [
      `Current events, where it depends on web search rather than its own knowledge`,
      `Arithmetic and data work, which is reliable when it writes code and shakier when it does not`,
      `Image understanding, which is competent but not its focus`,
    ],
    avoid: [
      `Anything requiring certainty about very recent events without checking sources`,
      `Legal, medical, or financial decisions taken on its word alone`,
      `Confidential material on a personal plan with training left on`,
    ],
  },

  starterActions: [
    {
      title: "Give it a document and interrogate it",
      prompt: `I've attached a document. Before you summarise anything, tell me what kind of document it is and what it's for. Then give me the three things in it most likely to matter to someone who has to act on it.`,
      whyHere: `The single highest-value thing a beginner can do, and the thing generic chatbot advice never mentions.`,
      tweak: `Ask it to quote the exact passage behind each point, so you can check it rather than trust it.`,
    },
    {
      title: "Ask it to argue against itself",
      prompt: `Here's a decision I'm leaning towards: [describe it]. Give me the strongest case against it. Don't soften it, and don't finish by agreeing with me.`,
      whyHere: `Assistants agree too readily. Forcing the opposing case is the cheapest way to get past that.`,
      tweak: `Follow with "which of those objections is the one I'm most likely to dismiss unfairly?"`,
    },
    {
      title: "Make it ask you questions first",
      prompt: `I want help with [task]. Before you produce anything, ask me the three questions whose answers would most change what you write.`,
      whyHere: `Most disappointing answers come from insufficient context, not insufficient capability.`,
      tweak: `If the questions are obvious, your brief was already clear — skip ahead.`,
    },
    {
      title: "Set up a project for recurring work",
      whatItDoes: `Keeps a set of files and instructions attached to every conversation in that project.`,
      whyHere: `Stops you re-pasting the same background every time. Unlimited projects are a paid feature; the free plan can still use one conversation as a long-running thread.`,
      tweak: `Put your standing preferences — tone, format, what to skip — in the project instructions rather than repeating them.`,
    },
  ],

  pitfalls: [
    `**The training default is on.** The reputation for privacy applies to business plans. On a personal plan, your conversations train the model unless you go into privacy settings and turn it off — and doing so also shortens retention from five years to thirty days.`,
    `**Confident and wrong looks exactly like confident and right.** Fluent prose is not evidence. For anything that matters, ask for the source passage and check it yourself.`,
    `**Long conversations drift.** After many turns it may be working from an early version of your requirements. Restate the current goal periodically, or start fresh.`,
    `**Usage is shared across everything.** Chat, desktop, mobile, and the coding tool all draw from one pool. A heavy coding session eats the same allowance as your writing.`,
    `**Free and paid run the same models.** Paying buys usage and extra features, not a smarter assistant. If quality is your problem, better prompting fixes more than upgrading does.`,
  ],

  whereToNext: [
    { label: "Other chat assistants", categorySlug: "text-conversational-ai" },
    { label: "Build with an API instead", categorySlug: "ai-apis-developer-services" },
  ],
};
