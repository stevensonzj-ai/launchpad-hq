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
    "Slack AI isn't a separate app or a website you sign into. It sits inside the Slack you already use for work. You ask it questions about your own conversations, and it summarises the channels and threads you missed while you were away. Because it's reading your workspace's actual history — the messages, threads and files you already have permission to see — its answers are about your projects and your colleagues, not the general internet.",

  whatItIs: [
    "A set of AI features built into Slack itself: channel and thread summaries, daily recaps, a search that answers questions in sentences instead of just listing messages, notes taken during huddles (Slack's quick audio calls), and Slackbot as a personal assistant you can message.",
    "For people who work in Slack every day and lose real time scrolling — anyone coming back from holiday, joining a project late, or sitting in twenty channels they can't keep up with.",
    "Different from pasting Slack messages into a general chatbot in one way that matters: it can search across your workspace's own history. No outside tool can see your company's private Slack archive, so no outside tool can tell you where a decision was made in March.",
    `It only ever works with content you could already find yourself. Slack states its AI features "only use Slack data that members have access to at the time of request" — it can't reach into private channels or DMs you're not part of.`,
  ],

  beforeYouStart: [
    "**This is a paid workplace feature, not a personal one.** There is no free tier of Slack AI. Slack currently makes basic AI — conversation and thread summaries plus huddle notes — available on all paid plans, and the more useful features (AI search answers, daily recaps, file summaries, translations, message explanations, the full Slackbot assistant) require the **Business+** plan or higher.",
    "**You almost certainly can't switch it on yourself.** AI features are controlled by workspace or organisation Owners and Admins from Slack's admin settings. If you're an ordinary member, the honest first step isn't a settings toggle — it's asking whoever administers your workspace whether AI is enabled for your plan.",
    `**The cost mechanism is your plan, not an add-on.** Slack used to sell "Slack AI" as a separate per-seat add-on; it says the add-on "is no longer available to purchase on the Slack website," with existing add-on customers moved over at their first renewal after August 2025. AI now comes bundled with the plan tier. Slack also notes the price "won't change if you turn all AI features off."`,
    "**Realistically, will you pay?** Not personally — your employer does. Slack's listed prices are currently around **$7-9 per user per month for Pro** and **around $15-18 per user per month for Business+** (the lower figure in each case is annual billing), with Enterprise+ priced by sales. Check slack.com/pricing for today's numbers; if you're paying out of your own pocket for a small team, Business+ is the line where Slack AI becomes genuinely worth it.",
    "**Concrete first step once it's on:** open a busy channel, click the three-dots icon at the top of the conversation, and choose **Summarize channel**. If that option isn't there, your plan or your admin hasn't enabled it — that's your answer.",
  ],

  security: [
    {
      kind: "text",
      text: `This feature reads your workplace's conversations, so it's worth knowing what Slack says about that. Slack states that your customer data in Slack — messages and files — is not used to train large language models, and that the models it uses "are deployed inside Slack's cloud environment, so model providers do not have access to your data." Its help documentation puts it more bluntly: "Customer data is never used to train third-party LLMs."`,
    },
    {
      kind: "list",
      label: "Worth knowing before you rely on it",
      items: [
        "Permissions carry over. Slack says AI features only use data you have access to at the time you ask, and won't use private channels or DMs you aren't in. It can't leak what you couldn't already read.",
        "But that cuts both ways: a summary can surface things from channels you'd forgotten you were in. If you were added to a sensitive channel months ago and never muted it, a recap may hand you a tidy digest of it.",
        "Outputs aren't all temporary. Slack currently describes summaries and search answers as ephemeral — they disappear when you navigate away — while recaps persist for around 90 days and summaries generated by workflows follow your organisation's normal retention policy.",
        "Your admin can turn AI features on or off at any time, and can restrict which members get them. If a feature vanishes one morning, that's usually why.",
      ],
    },
    {
      kind: "text",
      text: "One clarification: Slack is owned by Salesforce, and Salesforce sells a broader family of AI agents that can be connected to Slack. That's a separate purchase and a separate conversation. Everything on this page is about the AI features built into Slack itself.",
    },
  ],

  triad: {
    bestAt: [
      "Catching you up after time off — summarising a channel or a long thread into something you can read in a minute",
      `Answering "where was this decided?" by searching your own workspace history and pointing at the source messages`,
      "Turning a huddle into written notes so nobody has to be the designated note-taker",
      "Giving you a daily recap of the channels you can't realistically read in full",
    ],
    okayAt: [
      "Summarising discussions where people disagree — it captures what was said, but flattens who was actually pushing back",
      "Translating messages between languages for mixed-language teams; fine for gist, not for anything contractual",
      "Drafting and tidying text inside a canvas (Slack's built-in document)",
      "Explaining unfamiliar internal jargon and acronyms it has seen used in context",
    ],
    avoid: [
      "Treating a summary as the record of what was agreed — go read the actual thread before you act on it",
      "Anything that depends on a channel or DM you're not a member of; it genuinely cannot see those",
      "Using it as a general-purpose chatbot for research, writing or coding — that's not what it's built for",
      "Assuming it caught the sarcasm, the reversal three messages later, or the decision someone made in a huddle nobody transcribed",
    ],
  },

  starterActions: [
    {
      title: "Catch up on one busy channel after time away",
      whatItDoes:
        "Produces a short written summary of what happened in a channel over a period you choose, with links back to the original messages.",
      whyHere:
        "This is the thing Slack AI can do that nothing outside Slack can: it reads your workspace's own message history. A general chatbot can only see what you paste into it — which, for two weeks of a busy channel, you'd never manage.",
      tweak:
        "Start with your single busiest channel rather than all of them. Read the summary, then open the two or three threads it flagged. Treat the summary as an index, not a replacement.",
    },
    {
      title: "Ask where a decision was made",
      whatItDoes:
        "You type a plain question into the Slack search bar — like asking when the launch date moved — and get an answer in sentences, with the messages it drew from.",
      whyHere:
        "It's searching your workspace's actual history, so it can find the message where the decision happened. This is a Business+ feature, and it's the single strongest reason to be on that plan.",
      tweak:
        "Always click through to the source messages it cites. The answer is a shortcut to the evidence, not a substitute for it.",
    },
    {
      title: "Turn on notes for your next huddle",
      whatItDoes:
        "Captures a huddle (Slack's lightweight audio call) as written notes posted back into the channel afterwards.",
      whyHere:
        "The notes land in the same channel as the conversation that led to the call, so the decision and its context stay together instead of scattering into someone's separate notes app.",
      tweak:
        "Tell people at the start that notes are being taken. It's basic courtesy and it changes what people are comfortable saying.",
    },
    {
      title: "Set up your daily recap and actually read it",
      whatItDoes:
        "Gives you a once-a-day digest of activity across the channels you follow, in one place in the sidebar.",
      whyHere:
        "It's scoped to your channels and your permissions, so the digest reflects your actual working life rather than a generic feed.",
      tweak:
        "If the recap is noisy, the fix is usually in Slack rather than the AI — leave or mute the channels you don't need, and the recap gets sharper immediately.",
    },
    {
      title: "Summarise a file someone dropped in a thread",
      whatItDoes:
        "Gives you the gist of a document shared in Slack without opening and reading it in full.",
      whyHere:
        "It works on files already in your workspace, so you don't download anything or upload it to a third-party tool — which for internal documents is often the difference between allowed and not.",
      tweak:
        "Use it to triage — decide whether this is a document you need to read properly. Never use it as your only read of anything you're going to sign or send onward.",
    },
  ],

  pitfalls: [
    "**Trusting a summary of a nuanced discussion.** Summaries are good at what was talked about and poor at how strongly people felt. A thread where two people quietly disagreed for twenty messages can compress into one confident sentence that sounds like consensus. If the thread was contentious, read the thread.",
    "**Assuming it can see private channels you're not in.** It can't, by design, and Slack says so explicitly. So \"Slack AI didn't mention it\" is never evidence something didn't happen — it may simply have happened somewhere you don't have access.",
    "**Forgetting that summaries surface old channels.** A recap can hand you content from a channel you were added to months ago and forgot about. Useful, occasionally awkward — worth a look at your channel list before you rely on recaps in a shared setting.",
    "**Expecting it to work on the free plan.** Slack AI is a paid-plan feature and most of the good parts require Business+. If you're on Free and the menu items aren't there, nothing is broken.",
    "**Quoting an AI answer as if it were the source.** In a workplace, \"Slack AI said the deadline was the 14th\" is not a citation. Click through, find the actual message, quote that.",
  ],

  whereToNext: [
    { label: "More AI inside the business software you already use", categorySlug: "ai-plugins-business-software" },
    { label: "Tools that capture and summarise meetings", categorySlug: "meetings-notes" },
  ],
};
