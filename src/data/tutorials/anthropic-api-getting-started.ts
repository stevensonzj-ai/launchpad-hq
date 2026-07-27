import type { PlatformTutorialData } from "./types";

export const anthropicApiTutorial: PlatformTutorialData = {
  slug: "anthropic-api-getting-started",
  platformSlug: "anthropic-api",
  title: "Getting Started with the Anthropic API",
  tagline: `The same models as the chat assistant, billed per token — and under a contract with the opposite privacy default.`,
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-07-27",
  changelogUrl: "https://platform.claude.com/docs",
  accessTier: "PREMIUM",

  howItWorks: `The API lets your own code send text to Anthropic's models and get responses back, instead of typing into a chat window. You create an account on the developer console, generate a key, and your program sends requests with that key attached. Billing is per token — roughly, per chunk of text in and out — so cost scales with how much you send and how much you get back, with no monthly subscription underneath it.`,

  whatItIs: [
    `A pay-per-use interface to the same model family behind the Claude chat assistant.`,
    `Aimed at people building something — a tool, a script, a product feature — rather than at people who want to chat.`,
    `Billed by usage with no subscription floor, which means near-zero cost while you experiment and real cost at volume.`,
    `Governed by **commercial terms**, which have a different and stricter privacy default than the consumer chat product.`,
  ],

  beforeYouStart: [
    `You need to write or run code. There is no interface here — the console has a testing workbench, but the product is the endpoint.`,
    `Pricing is per million tokens and differs sharply by model. At the time of writing the range runs from about $1 in and $5 out for the fastest model up to $10 in and $50 out for the most capable one, with the mid-tier model at $3 in and $15 out.`,
    `A discounted introductory rate on the mid-tier model is scheduled to end on 2026-08-31. **Budget against the standard rate, not the promotional one.**`,
    `Batch processing halves the cost in both directions for work that does not need an immediate answer. If your job can wait, this is the single largest saving available.`,
    `Set a spending limit in the console before your first real run. Runaway loops are the most common way beginners get an unpleasant bill.`,
  ],

  gettingSetUpSafely: {
    officialSource: "Anthropic developer documentation",
    vendorDocsUrl: "https://platform.claude.com/docs",
    body: [
      `Create an account on the developer console — this is separate from any chat subscription you may already pay for, and one does not include the other.`,
      `Generate an API key and **treat it like a password**. Anyone holding it can spend your money.`,
      `Store the key in an environment variable, never inside your code. Keys committed to a public repository are found and abused within minutes.`,
      `Set an organisation spend limit before writing anything that runs in a loop.`,
      `Start with the cheapest model that could plausibly work. Moving up is easy; discovering you overpaid for a month is not.`,
    ],
  },

  security: [
    {
      kind: "text",
      text: `This is the same company as the Claude chat assistant and **the default is reversed**. API traffic falls under commercial terms, which means it is not used to train models by default, and inputs and outputs are deleted from backend systems within about thirty days. The consumer chat product trains on personal-plan conversations unless you opt out; the API does not train on them at all.`,
    },
    {
      kind: "list",
      label: "Practical implications",
      items: [
        `Routing work through the API rather than a personal chat account changes the contract you are operating under, not just the interface.`,
        `Submitting feedback is the material exception to the no-training baseline — feedback you send can be retained and used.`,
        `Zero-retention arrangements exist for qualifying organisations, but they are arranged through sales rather than switched on in a dashboard.`,
        `Content flagged for policy violations is retained longer regardless of your configuration.`,
      ],
    },
    {
      kind: "text",
      text: `The transferable lesson: **which door you walk through determines which contract you are under.** Two interfaces to the same underlying model can have opposite data defaults, and neither one advertises this at the moment you paste something sensitive.`,
    },
  ],

  triad: {
    bestAt: [
      `Building the same operation into a repeatable pipeline`,
      `Processing many items in bulk, especially where batch pricing applies`,
      `Embedding assistant behaviour inside a product you are building`,
      `Work where a stricter data contract is a requirement rather than a preference`,
    ],
    okayAt: [
      `One-off tasks, where the chat interface is faster and cheaper`,
      `Cost prediction, which is straightforward per call and surprising in aggregate`,
    ],
    avoid: [
      `Casual use — a subscription is cheaper for conversation`,
      `Any project without a spending cap configured`,
      `Shipping a key in client-side code, ever`,
    ],
  },

  starterActions: [
    {
      title: "Make one call from the console before writing any code",
      whyHere: `Confirms your key, your account, and your billing work, without a debugging session in the way.`,
      tweak: `Send something deliberately trivial. You are testing the plumbing, not the model.`,
    },
    {
      title: "Price your actual job before you build it",
      whatItDoes: `Runs one representative item, then multiplies by your real volume.`,
      whyHere: `Per-call costs look negligible and per-month costs frequently do not. Do this arithmetic while it is still cheap to change your mind.`,
      tweak: `Price it against the cheapest model too. The difference is often larger than the quality gap.`,
    },
    {
      title: "Move a bulk job to batch processing",
      whyHere: `Half price in both directions is the biggest lever available, and it costs nothing but patience.`,
      tweak: `If you find yourself waiting on results interactively, the job was not a batch job.`,
    },
    {
      title: "Put the key in an environment variable on day one",
      whyHere: `Every leaked-key story starts with "I was going to fix that later".`,
      tweak: `Add the environment file to your ignore list in the same commit, not the next one.`,
    },
  ],

  pitfalls: [
    `**A chat subscription does not include API credit.** They are separate products with separate billing. Paying for one buys you nothing on the other.`,
    `**The promotional rate expires.** The discounted mid-tier price ends on 2026-08-31 and reverts to the standard rate. If your budget assumes the lower number, it breaks that day.`,
    `**Loops are how people get surprised bills.** A retry that does not stop, or a batch larger than you thought, runs up cost quickly. Set the spend limit first, not after.`,
    `**Keys in public repositories are found within minutes.** Automated scanners watch for them continuously. Environment variables are not a best practice here, they are the minimum.`,
    `**The most capable model is rarely the right first choice.** Start cheap and move up only when a specific failure justifies it. The price gap between tiers is far larger than the quality gap for most tasks.`,
  ],

  whereToNext: [
    { label: "Other developer APIs", categorySlug: "ai-apis-developer-services" },
    { label: "Run models locally instead", categorySlug: "local-open-source-ai" },
  ],
};
