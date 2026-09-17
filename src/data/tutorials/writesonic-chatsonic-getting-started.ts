import type { PlatformTutorialData } from "./types";

export const writesonicChatsonicTutorial: PlatformTutorialData = {
  slug: "writesonic-chatsonic-getting-started",
  platformSlug: "writesonic-chatsonic",
  title: "Getting Started with Writesonic",
  tagline: "Find out whether ChatGPT and Gemini mention your business — and what to do when they don't.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-17",
  accessTier: "PREMIUM",

  howItWorks:
    "You add your brand name, your competitors, and a list of questions your customers might actually ask. Every day the platform puts those questions to the big AI assistants and records the answers. You come back to a dashboard showing whether you were mentioned, which sites were quoted instead, and how that has moved since last week.",

  whatItIs: [
    "Writesonic started life as an AI writing tool and a lot of the internet still describes it that way. It isn't one anymore: the company has rebuilt around a single question — when someone asks ChatGPT, Gemini, Claude or Perplexity for a recommendation in your line of work, does your name come up?",
    "It currently says it checks around ten AI assistants — ChatGPT, Claude, Gemini, Google AI Overviews, Perplexity, Grok, DeepSeek, Microsoft Copilot and Meta AI among them — by working through each one's normal web interface the way a customer would, rather than through a back-door connection. That is the company's own claim, and it is why the numbers move day to day.",
    "Alongside the tracking, the same subscription includes tools to act on what you find: an AI article writer, site audits that crawl your pages and flag what is holding them back, and content scoring.",
    "Chatsonic, the chatbot this product was once best known for, still lives in the left-hand menu of the account. It is no longer what Writesonic sells, and you should not buy this expecting a ChatGPT competitor.",
  ],

  beforeYouStart: [
    "**This one costs money on day one.** There is no permanently free plan. The signup page offers a 7-day free trial with no credit card, and after that the cheapest plan — currently Starter, around $79/month, less if you pay for a year up front — is the floor.",
    "You need a website you control before this is worth anything: roughly half of what you are buying is diagnosis of your own pages — audits, content scores, fixes. With no site to point it at, you are paying for a dashboard that tells you a competitor is winning and gives you nowhere to put the answer.",
    "The number that actually runs out is **prompts** (the messages you type — here, the customer questions you ask the platform to track). Plans meter these monthly, currently in the region of 100 on Basic and 200 on Growth, with separate monthly caps on articles and site audits. Article count is what people look at; tracked prompts is what constrains what you can learn.",
    "Come with a list of the questions a real customer would type before choosing someone like you — \"best accountant for freelancers in Leeds,\" not \"accounting.\" Those literal sentences are the raw material.",
  ],

  security: [
    { kind: 'text', text: "Writesonic's privacy policy, last updated 13 May 2026, is unusually direct on the point people worry about most: it states the company does **not** use customer data to train or fine-tune any general-purpose, foundation or large language model, though it reserves the right to use de-identified data to improve the service." },
    { kind: 'list', label: 'Where your text actually goes', items: [
      'The policy names the outside companies that process content on Writesonic’s behalf: OpenAI; Anthropic; Microsoft Azure OpenAI Service; Microsoft Azure, for Anthropic models; Stability AI; OpenRouter; Google Cloud Platform; AWS, for custom models.',
      'Writesonic says each handles data differently and that some are configured so they retain nothing.',
      'Practical reading: your drafts pass through several third parties, under Writesonic’s contracts rather than yours.',
    ] },
    { kind: 'list', label: 'What you are handing over when you connect things', items: [
      'The write-and-publish side asks to link to accounts that matter: Google Search Console, WordPress and SEO tools such as Ahrefs are the ones the vendor names.',
      'A Search Console link exposes your real search performance data; a WordPress link can put text on your live site.',
      'Connect them one at a time, and only once you have decided you are keeping the subscription.',
    ] },
    { kind: 'text', text: "On retention, the policy says data from deleted accounts is held up to 30 days and then permanently deleted, while billing records are kept seven years and support tickets three. Cancelling is not the same as erasing." },
  ],

  triad: {
    bestAt: [
      "Answering a question no other tool on this site answers: whether AI assistants currently name your business, and who they name instead",
      "Showing change over time — the daily re-run turns a curiosity into a trend you can act on",
      "Naming the specific pages and sites the AI assistants quoted, so you can see who is actually being read",
      "Comparing you against competitors you name yourself, rather than against whoever the tool guesses",
    ],
    okayAt: [
      "Writing the articles. The drafts are serviceable, but this is no longer where the company's effort goes and a dedicated writing tool does it better",
      "Small or very local businesses. The method depends on AI assistants having an opinion about your category at all, and for a narrow niche the honest answer may be that nobody is asking",
    ],
    avoid: [
      "Judging the product on the 7-day trial. What you are buying is a trend line built from daily runs, and a week gives you a dashboard and almost no signal. Budget a month",
      "Buying it for Chatsonic. The chatbot is still in the app but absent from the pricing comparison table, the homepage, and about six months of changelog entries — what an unsupported feature looks like before anyone announces it",
      "Treating the visibility score as comparable to anyone else's. It is Writesonic's own measurement of its own prompt list — a direction of travel, not an absolute",
      "Relying on the generated text without reading it. The terms of service dated 12 May 2026 put this in writing — outputs \"may be inaccurate, incomplete, biased, offensive, infringing,\" and the customer is \"solely responsible for evaluating Outputs\" before publishing them",
    ],
  },

  starterActions: [
    {
      title: "Track the question that actually decides a sale",
      prompt:
        "What is the best [your category] for [your specific customer]? Give me three options and say why.",
      whyHere:
        "Add this sentence to the tracked-prompt list, not a chat box: it is not sent off for an answer, it goes onto a list re-run daily, and the output is a record of whether your name appeared. Tested against ChatGPT, which answers once, now, and Jasper, which helps you write copy about being the best option: neither keeps asking on a schedule and keeps score.",
      tweak:
        "Add a version with a location or price qualifier — answers diverge sharply between \"best CRM\" and \"cheapest CRM for two people.\"",
    },
    {
      title: "Name your competitors before you look at anything else",
      whatItDoes:
        "In setup, enter the rivals you actually lose deals to; the reports then show share of voice and citations for you and them side by side.",
      whyHere:
        "The comparison is the product; a visibility score with nothing to compare it to is a number without a unit. Tested against Jasper, whose brand voice settings shape how your copy sounds rather than who cites you, and ChatGPT, which can tell you who your competitors probably are but will not track them daily against a fixed prompt list.",
    },
    {
      title: "Run the two free tools before you pay anything",
      whatItDoes:
        "Writesonic publishes an AI Crawl Checker and an llms.txt Generator as free tools — llms.txt being a small file you put on your site to tell AI crawlers what it contains and how to read it. Run both against your domain first.",
      whyHere:
        "These are the only parts of the platform that need no account, and they answer the cheapest version of the question — whether AI crawlers can read your site at all, because if they cannot, no amount of visibility tracking fixes that first. Tested against ChatGPT: it can explain what an llms.txt file is; it cannot generate one against your live site or tell you whether your server is blocking crawlers.",
    },
    {
      title: "Run one site audit and read only the citation findings",
      whatItDoes:
        "Point a site audit at your domain. It crawls up to the page cap on your plan and returns a list of issues; on the first pass read only what it says about being quotable.",
      whyHere:
        "The audit's page cap is one of the things the plan tiers actually meter, so this is a resource you spend, not a free scan. Tested against Jasper, which does not audit sites at all, and ChatGPT, which cannot crawl your site on a schedule or hold the previous crawl to compare against.",
    },
    {
      title: "Ask Chatsonic the one thing it is better placed to answer than a plain chatbot",
      prompt:
        "Using my connected Search Console data, which of my pages already get impressions for questions people would ask an AI assistant? List them with the query.",
      whyHere:
        "Chatsonic's documented reason to exist inside this product is those connections, so the only prompts worth typing here rather than into ChatGPT are ones needing your real data. It is documented as reachable from the left-hand menu, but whether it is in the tier you bought is something you may need to check once you are signed in.",
      tweak:
        "If the connections are not available to you, this card is the one to skip — it is the only one that depends on them.",
    },
  ],

  pitfalls: [
    "Writesonic's own pages disagree about what it costs. The live pricing page currently shows Starter around $79/month with Basic and Growth above it, while the developer docs' subscription page lists no Starter at all and puts Basic at $249/month ($199 annually). Read the pricing page on the day you buy; third-party review figures, including this year's, are not reliable.",
    "Its marketing pages are stale in a way that will mislead you: writesonic.com/chat still advertises Chatsonic with a free tier and an Individual plan at about $16/month, and still names models from 2024, while the live plan table has no free plan and nothing at $16. The pricing table is what you will be charged.",
    "Diary the refund window. The terms dated 12 May 2026 give self-serve customers a full refund within 7 days of purchase by email request, and fees are non-refundable after that except where the law requires otherwise; enterprise and agency subscriptions are non-refundable from the start. That window and the 7-day trial are not the same thing.",
    "Everything you see is scoped to the prompts you wrote. If you guess the questions badly, the platform will faithfully report that you are invisible for questions nobody asks. Revisit the list monthly; it is the input, not a setting.",
    "You own what it generates, but the terms make that ownership conditional — on third-party rights in underlying material and on the terms of the model providers behind the scenes.",
  ],

  whereToNext: [
    { label: 'Marketing and SEO tools', categorySlug: 'sales-marketing-seo-ai' },
    { label: 'AI chatbots, if a chatbot is what you wanted', categorySlug: 'text-conversational-ai' },
    { label: 'Research tools', categorySlug: 'research-academic-tools' },
  ],
};
