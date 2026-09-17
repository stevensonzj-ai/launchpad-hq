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
    "Writesonic started life as an AI writing tool, and a lot of the internet still describes it that way. It isn't one anymore. The company has rebuilt around a single question: when someone asks ChatGPT, Gemini, Claude or Perplexity for a recommendation in your line of work, does your name come up?",
    "The platform currently says it checks around ten AI assistants — including ChatGPT, Claude, Gemini, Google AI Overviews, Perplexity, Grok, DeepSeek, Microsoft Copilot and Meta AI — and that it does this by working through each one's normal web interface the way a customer would, rather than through a back-door connection. That distinction is the company's own claim and it is the reason the numbers move day to day.",
    "Alongside the tracking, the same subscription includes tools to act on what you find: an AI article writer, site audits that crawl your pages and flag what is holding them back, and content scoring.",
    "Chatsonic, the chatbot this product was once best known for, still lives in the left-hand menu of the account. It is no longer what Writesonic sells, and you should not buy this expecting a ChatGPT competitor.",
  ],

  beforeYouStart: [
    "**This one costs money on day one.** There is no permanently free plan. The signup page offers a 7-day free trial with no credit card, and after that the cheapest plan — currently Starter, at around $79/month, less if you pay for a year up front — is the floor. This is priced as a marketing tool for a business, not as something to poke at out of curiosity.",
    "You need a website you control before this is worth anything. Roughly half of what you are buying is diagnosis of your own pages: audits, content scores, fixes. With no site to point it at, you are paying for a dashboard that tells you a competitor is winning and gives you nowhere to put the answer.",
    "The number that actually runs out is **prompts** (the messages you type — here, the customer questions you ask the platform to track). The plans meter these monthly, currently in the region of 100 on Basic and 200 on Growth, along with separate monthly caps on articles and site audits. Article count is the number people look at; tracked prompts is the one that constrains what you can learn.",
    "Come with a list of the questions a real customer would type before choosing someone like you — \"best accountant for freelancers in Leeds,\" not \"accounting.\" Those literal sentences are the raw material. Everything the platform shows you is downstream of how well you guessed them.",
  ],

  security: [
    { kind: 'text', text: "Writesonic's privacy policy, last updated 13 May 2026, is unusually direct on the point people worry about most: it states the company does **not** use customer data to train or fine-tune any general-purpose, foundation or large language model, though it reserves the right to use de-identified data to improve the service. That is a stronger written commitment than most consumer AI tools make, and it is worth knowing it is in the policy rather than assumed." },
    { kind: 'list', label: 'Where your text actually goes', items: [
      'The policy names the outside companies that process content on Writesonic’s behalf: OpenAI; Anthropic; Microsoft Azure OpenAI Service; Microsoft Azure, for Anthropic models; Stability AI; OpenRouter; Google Cloud Platform; AWS, for custom models.',
      'Writesonic says each handles data differently and that some are configured so they retain nothing.',
      'Practical reading: your drafts pass through several third parties, under Writesonic’s contracts rather than yours.',
    ] },
    { kind: 'list', label: 'What you are handing over when you connect things', items: [
      'The write-and-publish side of the product asks to link to accounts that matter: Google Search Console, WordPress and SEO tools such as Ahrefs are the ones the vendor names.',
      'A Search Console link exposes your real search performance data; a WordPress link can put text on your live site.',
      'Connect them one at a time, and only once you have decided you are keeping the subscription.',
    ] },
    { kind: 'text', text: "On retention, the policy says data from deleted accounts is held up to 30 days and then permanently deleted, while billing records are kept seven years and support tickets three. Cancelling is therefore not the same as erasing, and the billing trail outlives the account by design." },
  ],

  triad: {
    bestAt: [
      "Answering a question no other tool on this site answers: whether AI assistants currently name your business, and who they name instead",
      "Showing change over time — the daily re-run is what turns a one-off curiosity into a trend you can act on",
      "Naming the specific pages and sites the AI assistants quoted, so you can see who is actually being read",
      "Comparing you against competitors you name yourself, rather than against whoever the tool guesses",
      "Turning a finding into a task — audits and content scoring hand you something concrete to fix",
    ],
    okayAt: [
      "Writing the articles. It will draft them and the drafts are serviceable, but this is no longer where the company's effort goes, and a dedicated writing tool will do it better",
      "Chatsonic as a general-purpose chatbot — it works, but you would be paying a marketing-platform price for something a free chatbot does as well",
      "Small or very local businesses. The method depends on AI assistants having an opinion about your category at all, and for a narrow niche the honest answer may be that nobody is asking",
    ],
    avoid: [
      "Judging the product on the 7-day trial. What you are buying is a trend line built from daily runs; a week gives you a dashboard and almost no signal. Budget a month before deciding whether it told you anything",
      "Buying it for Chatsonic. The chatbot is still in the app, but it is absent from the pricing comparison table, absent from the homepage, and absent from about six months of changelog entries — that is what an unsupported feature looks like before anyone announces it",
      "Treating the visibility score as a number you can compare to anyone else's. It is Writesonic's own measurement of its own prompt list; it means something as a direction of travel and nothing as an absolute",
      "Relying on the generated text without reading it. The terms of service dated 12 May 2026 put this in writing — outputs \"may be inaccurate, incomplete, biased, offensive, infringing,\" and the customer is \"solely responsible for evaluating Outputs\" before publishing them",
    ],
  },

  starterActions: [
    {
      title: "Track the question that actually decides a sale",
      prompt:
        "What is the best [your category] for [your specific customer]? Give me three options and say why.",
      whyHere:
        "Add this sentence to the tracked-prompt list rather than to a chat box. It is not sent to an AI for an answer — it goes onto a list Writesonic re-runs against roughly ten assistants every day, and the output is a record of whether your name appeared in each. Tested against ChatGPT and Jasper: ChatGPT will answer the question once, right now, from your account; Jasper will help you write marketing copy about being the best option. Neither keeps asking on a schedule and keeps score.",
      tweak:
        "Add a second version with a location or a price qualifier. Answers often diverge sharply between \"best CRM\" and \"cheapest CRM for two people,\" and the gap tells you which conversation you are losing.",
    },
    {
      title: "Name your competitors before you look at anything else",
      whatItDoes:
        "In setup, enter the rivals you actually lose deals to. The reports then show share of voice and citations for you and them side by side, instead of against whoever the tool would have picked.",
      whyHere:
        "The comparison is the product; a visibility score with nothing to compare it to is a number without a unit. Tested against Jasper and ChatGPT: Jasper's brand features tune how you sound — its brand voice settings shape your own copy, not whether anyone is citing you. ChatGPT can tell you who your competitors probably are, but it will not track them daily against a fixed prompt list.",
    },
    {
      title: "Run the two free tools before you pay anything",
      whatItDoes:
        "Writesonic publishes an AI Crawl Checker and an llms.txt Generator on its site as free tools — llms.txt being a small file you put on your site to tell AI crawlers what it contains and how to read it. Run both against your domain first.",
      whyHere:
        "These are the only parts of the platform that need no account and no subscription, and they answer the cheapest version of the question — whether AI crawlers can read your site at all. If the crawl checker says they cannot, that is your problem, and no amount of visibility tracking will fix it first. Tested against ChatGPT: it can explain what an llms.txt file is; it cannot generate one against your live site or tell you whether your server is blocking crawlers.",
    },
    {
      title: "Run one site audit and read only the citation findings",
      whatItDoes:
        "Point a site audit at your domain. It crawls your pages up to the page cap on your plan and returns a list of issues; ignore the general hygiene items on the first pass and look at what it says about being quotable.",
      whyHere:
        "The audit's page cap is one of the things the plan tiers actually meter, so this is a resource you are spending, not a free scan — running it three times on the same unchanged site is a waste of the allowance. Tested against Jasper and ChatGPT: Jasper does not audit sites at all, and ChatGPT cannot crawl your site on a schedule or hold the previous crawl to compare against.",
    },
    {
      title: "Ask Chatsonic the one thing it is better placed to answer than a plain chatbot",
      prompt:
        "Using my connected Search Console data, which of my pages already get impressions for questions people would ask an AI assistant? List them with the query.",
      whyHere:
        "Chatsonic's documented reason to exist inside this product is the connections — Writesonic's own pages name Google Search Console, WordPress and Ahrefs — so the only prompts worth typing here rather than into ChatGPT are ones that need your real data. Treat this as the test of whether the feature is live and connected on your plan: Chatsonic is documented as reachable from the account's left-hand menu, but it is not on the pricing comparison table, so whether it is included in the tier you bought is something you will have to check once you are signed in.",
      tweak:
        "If the connections are not available to you, this card is the one to skip — it is the only one that depends on them.",
    },
  ],

  pitfalls: [
    "Writesonic's own pages disagree about what it costs. The live pricing page currently shows Starter around $79/month with Basic and Growth above it, while the developer docs' subscription page lists no Starter at all and puts Basic at $249/month ($199 annually). Read the pricing page on the day you buy and ignore every third-party review's figure, including the ones published this year.",
    "Its marketing pages are stale in a way that will mislead you. writesonic.com/chat still advertises Chatsonic with a free tier and an Individual plan at about $16/month, and still names models from 2024. The live plan table has no free plan and nothing at $16. Where a feature page and the pricing table disagree, the pricing table is what you will be charged.",
    "The refund window is short and you should diary it. The terms dated 12 May 2026 give self-serve customers a full refund within 7 days of purchase by email request, and state that fees are non-refundable after that except where the law requires otherwise; enterprise and agency subscriptions are non-refundable from the start. That 7-day window and the 7-day trial are not the same thing, and together they are less evaluation time than the product needs.",
    "Everything you see is scoped to the prompts you wrote. If you guess the questions badly, the platform will faithfully report that you are invisible for questions nobody asks. Revisit the list monthly; it is the input, not a setting.",
    "You own what it generates, but the terms make that ownership conditional — on third-party rights in underlying material and on the terms of the model providers behind the scenes — and put the burden of checking outputs on you. Publishing a generated article unread is the specific risk the contract is describing.",
  ],

  whereToNext: [
    { label: 'Marketing and SEO tools', categorySlug: 'sales-marketing-seo-ai' },
    { label: 'AI chatbots, if a chatbot is what you wanted', categorySlug: 'text-conversational-ai' },
    { label: 'Research tools', categorySlug: 'research-academic-tools' },
  ],
};
