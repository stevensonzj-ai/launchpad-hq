import type { PlatformTutorialData } from "./types";

export const geminiTutorial: PlatformTutorialData = {
  slug: "gemini-getting-started",
  platformSlug: "gemini",
  title: "Getting Started with Gemini",
  tagline: `Google's assistant, free and genuinely capable — with a privacy model built on human review rather than a training switch.`,
  archetype: "prompts",
  lastReviewedAt: "2026-07-27",
  changelogUrl: "https://gemini.google/release-notes/",
  accessTier: "FREE",

  howItWorks: `Gemini is Google's conversational assistant, reachable from a browser or its own app and increasingly woven into Gmail, Docs, Chrome, and Search. You ask in plain language; it answers, generates images, researches topics across many sources, and works with files you upload. Because it sits inside Google's product family, the boundary between "using Gemini" and "using Google" is blurrier than with standalone assistants — which is both its main convenience and its main thing to understand.`,

  whatItIs: [
    `A general-purpose assistant with an unusually capable free tier — chat, image generation and editing, deep research, and live voice conversation at no cost.`,
    `Tied into the Google account you already have, with paid tiers bundling cloud storage and other Google subscriptions alongside higher usage.`,
    `Strong on very long inputs, with paid tiers accepting document sets far larger than most assistants handle.`,
    `Governed by Google's activity and human-review model rather than by a single train-or-don't switch.`,
  ],

  beforeYouStart: [
    `The free tier needs nothing but a Google account — no card, no trial clock. It includes chat, image generation and editing, deep research, live voice, and the notebook research tool.`,
    `Paid tiers ladder by usage: roughly $5 a month for double the free allowance, about $20 for four times it, and $100 or $200 a month at the top for five and twenty times the $20 tier respectively.`,
    `Limits are compute-based rather than message-counted, refresh on a five-hour cycle against a weekly ceiling, and can be extended by buying credits.`,
    `**Decide what you are willing to have a human read before you start typing.** See the security section — this is the part that differs most from its competitors.`,
  ],

  security: [
    {
      kind: "text",
      text: `Gemini's privacy model is not a training toggle. Google's stated position is that a portion of conversations are read and annotated by **human reviewers**, including reviewers at service providers, to improve its models and services. Google's own guidance is unusually direct about the implication: do not enter anything confidential that you would not want a reviewer to see.`,
    },
    {
      kind: "list",
      label: "What deleting does and does not do",
      items: [
        `Conversations selected for human review are kept separately from your account and retained for up to three years.`,
        `Deleting your activity does not remove them. Deletion clears your history; it does not reach into the review pipeline.`,
        `Turning the activity setting off still leaves a floor — conversations are held for roughly 72 hours to operate the service.`,
        `Temporary conversations are excluded from being used to improve Google's AI.`,
        `Custom assistants you configure carry the same exposure as ordinary conversations, including any files you attach to them.`,
      ],
    },
    {
      kind: "text",
      text: `Set against a tool where one switch turns training off, this is a different shape of risk rather than a larger or smaller one. There is **no configuration that gets you to zero retention**, and the meaningful control is not a setting — it is what you choose to type. Use temporary conversations for anything sensitive, and treat the sensitive material itself as the thing to withhold.`,
    },
  ],

  triad: {
    bestAt: [
      `Very large document sets, where its context capacity outclasses most assistants`,
      `Multi-source research reports assembled in one pass`,
      `Work that touches Gmail, Docs, or Drive, where it is already inside the tools`,
      `Image generation and editing without leaving the conversation`,
    ],
    okayAt: [
      `Hard multi-step reasoning, where it is competent but not the category leader`,
      `Consistency across long sessions, which varies more than its rivals`,
      `Code, which it handles but is not the reason to pick it`,
    ],
    avoid: [
      `Confidential, regulated, or client material on a personal account`,
      `Any workflow where you need a guarantee that deleting means deleted`,
      `Treating its answers about its own settings as current, since the product's interface changes frequently`,
    ],
  },

  starterActions: [
    {
      title: "Hand it more material than feels reasonable",
      prompt: `I'm attaching several documents. Read all of them, then tell me where they disagree with each other. I care more about the contradictions than the summary.`,
      whyHere: `Its capacity for large inputs is the clearest advantage it has, and almost nobody uses it.`,
      tweak: `Ask which document is the outlier and why — that surfaces the assumption the set is built on.`,
    },
    {
      title: "Run a deep research report before you commit to a direction",
      whatItDoes: `Searches across many sources and returns a structured report rather than a chat answer.`,
      whyHere: `Available on the free tier, and it is a different tool from ordinary chat — worth learning as its own thing.`,
      tweak: `Give it the decision you are trying to make, not the topic. "Should I do X or Y, and what would change my mind" beats "tell me about X".`,
    },
    {
      title: "Use a temporary conversation for anything sensitive",
      prompt: `[Start a temporary conversation, then ask your question as normal.]`,
      whyHere: `The one concrete control that meaningfully reduces exposure, and it is off the beaten path.`,
      tweak: `Make it a habit tied to content, not to mood — anything with a name, a number, or an employer in it.`,
    },
    {
      title: "Ask it to show its sources and then check one",
      prompt: `Answer the question, then list the specific sources you used and which part of the answer each one supports.`,
      whyHere: `Builds the verification reflex early, while the stakes are low.`,
      tweak: `Pick the claim that most surprised you and check that one. Surprise is a good relevance filter.`,
    },
  ],

  pitfalls: [
    `**Deleting your activity does not delete everything.** Conversations that went to human review are kept separately for up to three years and survive your deletion. Deletion manages your history, not Google's review pipeline.`,
    `**There is no zero-retention setting.** Even with activity off, conversations persist for around 72 hours. The real control is what you type, not what you toggle.`,
    `**The free tier's model is not the paid tier's model.** Free access to the top model is described as varying rather than guaranteed, so a result you got yesterday may not reproduce today.`,
    `**Third-party pricing articles are frequently wrong.** Plan prices were restructured in 2026 and stale figures are widespread online. Check the official subscriptions page rather than a comparison post.`,
    `**Interface details move faster than any guide.** Setting names and menu locations change often. If a setting is not where you expect, it was probably renamed rather than removed.`,
  ],

  whereToNext: [
    { label: "Other chat assistants", categorySlug: "text-conversational-ai" },
    { label: "Research and academic tools", categorySlug: "research-academic-tools" },
  ],
};
