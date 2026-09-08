import type { PlatformTutorialData } from "./types";

export const googleVertexAiTutorial: PlatformTutorialData = {
  slug: "google-vertex-ai-getting-started",
  platformSlug: "google-vertex-ai",
  title: "Getting Started with Vertex AI (Now Gemini Enterprise Agent Platform)",
  tagline:
    "Google Cloud's platform for building with AI rather than chatting with it — renamed in 2026, and free to try for 90 days without a card.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-08",
  changelogUrl:
    "https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes",
  accessTier: "FREE",

  howItWorks:
    "You sign in with your Google account, pick a model (the AI \"brain\" that does the actual thinking) from a list in your browser, type an instruction, and read the reply in the same window. You change a setting, try again, and when you like the result you copy code that calls that model from your own program.",

  whatItIs: [
    "Vertex AI is where Google Cloud lets you build with AI instead of only talking to it: a workspace in your browser, plus the plumbing to call the same models from your own software. Google renamed it in April 2026 to Gemini Enterprise Agent Platform — \"agent\" meaning AI that takes actions on its own rather than only answering — and both names are still in circulation.",
    "It is built for people making software or wiring AI into a company's systems. If you mainly want to ask an AI questions, the Gemini app or Google AI Studio gets you there in a minute.",
  ],

  beforeYouStart: [
    "**The name changed and the internet has not caught up.** Google announced on 22 April 2026 that Vertex AI's services now ship as Gemini Enterprise Agent Platform, and the old documentation carries a banner saying it is no longer updated. Guides you find elsewhere — and some of Google's own pages — still say Vertex AI, and usually still describe the right thing.",
    "There is a free way in that most write-ups skip: express mode signs you up with nothing but a Google account, and Google's FAQ states that no payment information is required for 90 days, within set usage limits. A window, not an ongoing free plan.",
    "The better-known offer wants a card: $300 in Welcome credit across a 90-day trial, spendable on all of Google Cloud, so anything else you leave running draws down the same pot. After both windows close it is metered by the amount of text going in and coming back, with no permanent free allowance.",
  ],

  security: [
    {
      kind: "text",
      text: "The reason a company picks this over the free consumer tools is in the documentation: Google's data governance page says it \"won't use your data to train ... models without your prior permission or instruction.\" Google's own free developer tier says the opposite — there, content is \"used to improve our products.\"",
    },
    {
      kind: "list",
      label: "Two things to know before you send anything real:",
      items: [
        "An **API key** (a password that identifies your app, and that spends your money) is the one secret here. Anyone holding it can bill your project.",
        "Letting the model check Google Search before it answers is the exception to that promise: Google keeps what you sent and what came back for 30 days, with no way to turn it off.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Reaching many companies' models from one account — Model Garden advertises 200+, from Google's own Gemini to Meta's Llama and Anthropic's Claude",
      "Letting a model check Google Search before it answers, currently 5,000 checks a month at no charge",
      "Keeping company data out of model training, stated in writing rather than implied",
    ],
    okayAt: [
      "Being somewhere to simply talk to Gemini — it works, but you set up a cloud project to get there",
      "Guiding a newcomer — the documentation is written for engineers, and it is currently mid-rename",
    ],
    avoid: [
      "Parking anything you want to keep in an express mode project — Google's own FAQ says that without billing, access ends after 90 days and \"30 days after that, your data will be marked for deletion\"",
      "Trusting any one Google page on naming — the data governance page still says \"Vertex AI\", and a tutorial titled \"Agent Studio in express mode\" sits at a URL containing vertex-ai-studio",
      "Assuming what you learned on Google AI Studio carries over — separate product, different data terms",
    ],
  },

  starterActions: [
    {
      title: "Sign up in express mode before you set up a billing account",
      whyHere:
        "Google's FAQ states that no payment information is required to try express mode for 90 days. Amazon Bedrock, the closest equivalent, has no such door — an AWS account with a payment method comes first. It also leaves the $300 trial credit unspent until you need it.",
      tweak:
        "Write down the date. Express projects stop at 90 days; deletion follows 30 days later.",
    },
    {
      title: "Ask about something that happened this week, with Search checking behind it",
      whyHere:
        "Google is selling the one asset its rivals cannot license: the pricing page currently includes 5,000 such checks a month at no charge, then about $14 per 1,000. Azure AI Foundry can check Bing, not Google Search.",
      tweak:
        "Ask again with the check switched off. The gap between the answers is what you pay for.",
    },
    {
      title: "Send one instruction to a Google model and to a non-Google one",
      whyHere:
        "Model Garden puts Anthropic's and Meta's models under the same project, terms and invoice as Google's own, so the comparison costs no second signup and no second vendor relationship. Google AI Studio, the free door most beginners find first, serves Google's models only.",
      tweak:
        "Use something with a right answer — differences show up most clearly when one model is wrong.",
    },
  ],

  pitfalls: [
    "Enabling billing without setting a budget alert. Charges land on the whole project's Google Cloud bill, mixed in with storage and computing, not on a standalone AI invoice with a prepaid balance.",
    "Expecting express mode to cover everything. Some services are capped to small usage limits there, and some need a billing account before you can deploy.",
  ],

  whereToNext: [
    { label: "AI APIs & Developer Services", categorySlug: "ai-apis-developer-services" },
    { label: "AI Coding & Development", categorySlug: "ai-coding-development" },
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
  ],
};
