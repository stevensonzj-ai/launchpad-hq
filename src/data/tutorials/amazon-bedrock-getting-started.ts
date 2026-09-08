import type { PlatformTutorialData } from "./types";

export const amazonBedrockTutorial: PlatformTutorialData = {
  slug: "amazon-bedrock-getting-started",
  platformSlug: "amazon-bedrock",
  title: "Getting Started with Amazon Bedrock",
  tagline:
    "AWS's single door to AI models from Anthropic, OpenAI, Meta and a dozen more labs — billed by what you use.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-08",
  changelogUrl: "https://docs.aws.amazon.com/bedrock/latest/userguide/doc-history.html",
  accessTier: "FREE",

  howItWorks:
    "You sign in to AWS, open Bedrock, and pick a **model** (the AI \"brain\" that does the actual thinking) from a catalog. You type a question in the browser and read the reply. When you want it inside your own software, you generate a key and call the same models from code — swapping models means changing one line.",

  whatItIs: [
    "Amazon Bedrock is AWS's single door to AI models built by other companies. Instead of an account with Anthropic, another with OpenAI, another with Mistral, you reach models from around eighteen labs behind one login and one AWS bill. It's built for people making software — an **API** (a way for programs to talk to each other without a person clicking), not a chat app.",
  ],

  beforeYouStart: [
    "**The barrier here is AWS, not Bedrock.** There's no Bedrock signup — you open an AWS account, which needs a real credit or debit card even on the free plan, and you meet AWS's permissions and regions before you meet a model.",
    "Cost is per use, with no subscription. A new AWS account gets $100 of credit at signup and can earn $100 more by trying services, Bedrock among them — but the free plan ends six months in, or when the credit runs out. A trial, not an allowance.",
    "Anthropic's models need a one-time use-case form per AWS account before your first call. Other providers' models subscribe themselves on first use.",
    "Which models you can reach depends on the AWS region you pick, and newer ones are called through a geographic profile — the same name with `us.` or `eu.` in front.",
  ],

  security: [
    {
      kind: "text",
      text: "The reason companies pick Bedrock over calling each lab directly is in AWS's own FAQ: your content isn't used to improve the base models and isn't shared with any model provider. Claude runs here without Anthropic seeing your text.",
    },
    {
      kind: "list",
      label: "Your key spends your money — so give it a lifespan",
      items: [
        "You choose the expiry when you create a long-term key, and AWS's own docs recommend those keys only for exploring.",
        "It's shown once — copy it somewhere private, never into a public code repository or a screenshot.",
      ],
    },
    {
      kind: "text",
      text: "One honest wrinkle: geographic profiles spread a request across regions inside a geography like US or EU. Your data stays in that geography, but AWS states inputs and outputs may leave the region you picked, and may be stored there for abuse detection.",
    },
  ],

  triad: {
    bestAt: [
      "Putting one question to rival labs' models without an account at each",
      "Building on Claude, GPT or Llama with your text staying inside your own AWS account",
      "Teams already on AWS, who inherit the billing, permissions and logging they have",
    ],
    okayAt: [
      "Being a first AI tool — there's no consumer app here",
      "Predictable monthly cost, since the bill follows use",
      "Launch-day access — new frontier models often reach their own lab's API first",
    ],
    avoid: [
      "Assuming a model you read about is callable — it depends on your region",
      "Long-term API keys in production, which AWS's own docs advise against",
      "Following an older tutorial into Bedrock Agents — AWS closed it to new customers on 30 July 2026 and points new builders at AgentCore",
    ],
  },

  starterActions: [
    {
      title: "Compare models before you write any code",
      whatItDoes:
        "Put one question to up to three models in the console and read the replies side by side.",
      whyHere:
        "Bedrock's catalog names around eighteen providers, OpenAI and Anthropic among them, and the console runs one question across three at once. That's how you find out a cheap model answers as well as the expensive one.",
    },
    {
      title: "Give yourself a key with an expiry date",
      whatItDoes:
        "Generate a long-term key in the console and set it to expire; AWS's quickstart uses 30 days.",
      whyHere:
        "Bedrock lets you choose the lifespan as you create the key, and its short-term keys last about twelve hours. A forgotten Bedrock key stops working; a forgotten permanent key keeps spending.",
    },
    {
      title: "Set a budget, and know what it actually does",
      whatItDoes: "Create an AWS Budget with an email threshold before your first call.",
      whyHere:
        "On AWS the alarm and the brake are separate: a budget threshold sends a notification, while stopping spend means configuring a budget action that applies a deny policy.",
    },
    {
      title: "Clear the Anthropic form first",
      whatItDoes:
        "Submit the one-time use-case form for Anthropic models, once per AWS account.",
      whyHere:
        "Anthropic is the provider on Bedrock that gates first use this way; access opens the moment you submit, and a form filed at an organisation's management account carries down to the accounts beneath it.",
    },
  ],

  pitfalls: [
    "Most Bedrock confusion is AWS confusion. Permissions, regions and billing all belong to AWS, and a free-plan account closes itself six months after signup.",
    "A first call to a provider you haven't used can fail while Bedrock subscribes you in the background. Wait a couple of minutes and try again before assuming you set something up wrong.",
  ],

  whereToNext: [
    { label: "AI APIs & Developer Services", categorySlug: "ai-apis-developer-services" },
    { label: "AI Coding & Development", categorySlug: "ai-coding-development" },
  ],
};
