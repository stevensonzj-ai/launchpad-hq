import type { PlatformTutorialData } from "./types";

export const slackAiTutorial: PlatformTutorialData = {
  slug: "slack-ai-getting-started",
  platformSlug: "slack-ai",
  title: "Getting Started with Slack AI",
  tagline:
    "The AI that already knows what your team said last week — because it lives inside Slack.",
  archetype: "recipes",
  lastReviewedAt: "2026-09-07",
  changelogUrl: "https://slack.com/release-notes",
  accessTier: "PREMIUM",

  howItWorks:
    "Slack AI isn't a separate app you sign into — it sits inside the Slack you already use for work. You ask a question in the search bar, or pick a summary from a conversation's menu, and it answers in sentences about your own projects rather than the internet.",

  whatItIs: [
    "A set of AI features built into Slack itself: channel and thread summaries, a daily recap, a search that answers in sentences instead of listing messages, notes from huddles (Slack's quick audio calls), and Slackbot as a personal assistant.",
    "It's for people who live in Slack and lose real time scrolling — back from holiday, joining late, or in twenty channels they can't keep up with.",
    `Why this rather than pasting messages into a general chatbot: it searches your workspace's own archive, which no outside tool can see — and only the part you could already read: its features "only use Slack data that members have access to at the time of request."`,
  ],

  beforeYouStart: [
    "**There is no free tier.** Conversation and thread summaries plus huddle notes currently come with every paid plan; the rest needs **Business+** or higher — search answers, daily recaps, file summaries, translations, message explanations, canvas generation and the full Slackbot assistant.",
    "You almost certainly can't switch it on yourself: AI is controlled by workspace and organisation Admins, so an ordinary member's first step is asking whoever administers the workspace whether it's on.",
    `You won't be paying personally; your employer does. Slack has withdrawn the old per-seat AI add-on — it "is no longer available to purchase on the Slack website" — and moved existing customers onto plan tiers at their first renewal after August 2025. It also notes that the price "won't change if you turn all AI features off." Prices currently run around **$7-9 per user/month for Pro** and **$15-18 for Business+** (the lower figure is annual), Enterprise+ by sales.`,
    "First step once it's on: open a busy channel, click the three-dots icon at the top, choose **Summarize channel**. Not there? Your plan or your admin hasn't enabled it.",
  ],

  security: [
    {
      kind: "text",
      text: `Slack states that your messages and files are not used to train **LLMs** (large language models — the kind of AI that reads and writes text), and that the models it uses "are deployed inside Slack's cloud environment, so model providers do not have access to your data." Its security pages are blunter: "Customer data is never used to train third-party LLMs."`,
    },
    {
      kind: "list",
      label: "Worth knowing before you rely on it",
      items: [
        "Permissions cut both ways: a recap can hand you a tidy digest of a sensitive channel you were added to months ago and forgot.",
        "Outputs aren't all temporary — summaries and search answers are currently ephemeral, recaps persist around 90 days, and workflow-generated summaries follow your organisation's retention policy.",
        "Your admin can switch AI off, or restrict who gets it, at any time.",
      ],
    },
    {
      kind: "text",
      text: "Slack is owned by Salesforce, which sells separate AI products that plug into Slack; this page covers only the AI inside Slack.",
    },
  ],

  triad: {
    bestAt: [
      "Catching you up after time off — a long thread compressed into a minute's reading",
      `Answering "where was this decided?" and pointing at the source messages`,
      "Turning a huddle into written notes nobody had to take",
    ],
    okayAt: [
      "Summarising disagreement — it captures what was said, flattens who was pushing back",
      "Translating between languages; fine for gist, not for anything contractual",
      "Explaining internal jargon it has seen used in context",
    ],
    avoid: [
      "Treating a summary as the record of what was agreed",
      "Anything living in a channel or DM you're not a member of",
      "Assuming it caught the sarcasm, or the reversal three messages later",
    ],
  },

  starterActions: [
    {
      title: "Catch up on one busy channel after time away",
      whyHere:
        "Its summaries link back to the messages they were built from, so one works as an index into two weeks of scrollback rather than a replacement for it.",
      tweak: "Start with your busiest channel, then open the threads it flagged.",
    },
    {
      title: "Ask where a decision was made",
      whatItDoes:
        "Type a plain question into the Slack search bar and get an answer in sentences, with the messages it drew from.",
      whyHere:
        "Search answers sit behind the Business+ gate, so this one feature decides whether the upgrade is worth it. Ordinary search hands you a list; this hands you the answer plus its evidence.",
      tweak: "Click through to the source messages it cites, every time.",
    },
    {
      title: "Turn on notes for your next huddle",
      whyHere:
        "The notes are posted back into the channel that led to the call, so the decision and its context stay together rather than scattering into someone's notes app.",
      tweak: "Say at the start that notes are being taken — it changes what people say.",
    },
    {
      title: "Summarise a file someone dropped in a thread",
      whyHere:
        "It reads a file already in your workspace, so nothing is downloaded or uploaded to an outside tool — for internal documents that's often the difference between allowed and not.",
      tweak: "Use it to triage, never as your only read of anything you'll sign.",
    },
  ],

  pitfalls: [
    "**Trusting a summary of a nuanced discussion.** Summaries capture what was talked about, not how strongly people felt — twenty messages of quiet disagreement compress into one confident sentence.",
    "**Treating silence as evidence.** It can't see private channels or DMs you aren't in, so \"Slack AI didn't mention it\" never means it didn't happen.",
    "**Quoting an AI answer as if it were the source.** \"Slack AI said the deadline was the 14th\" is not a citation. Click through and quote the message.",
  ],

  whereToNext: [
    { label: "More AI inside the business software you already use", categorySlug: "ai-plugins-business-software" },
    { label: "Tools that capture and summarise meetings", categorySlug: "meetings-notes" },
  ],
};
