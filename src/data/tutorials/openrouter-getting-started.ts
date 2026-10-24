import type { PlatformTutorialData } from "./types";

export const openrouterTutorial: PlatformTutorialData = {
  slug: "openrouter-getting-started",
  platformSlug: "openrouter",
  title: "Getting Started with OpenRouter",
  tagline:
    "One account and one API key for hundreds of AI models from dozens of companies — with a browser chat room to compare them before you write any code.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-10-23",
  changelogUrl: "https://openrouter.ai/docs/changelog",
  accessTier: "FREE",

  howItWorks:
    "You make an account, add credits, and create an **API key** (a secret password your code sends with each request). Your app sends a request to OpenRouter naming the model you want; OpenRouter passes it to a company that runs that model and returns the answer. You can also chat with models in the browser, no code needed.",

  whatItIs: [
    "OpenRouter is a middleman between you and the companies that run AI models. Instead of opening separate accounts with OpenAI, Anthropic, Google and the rest, you open one account, keep one balance, and reach all of them through a single connection. Its pricing page lists more than 500 models from more than 80 providers on paid accounts.",
    "It is built for people writing code. OpenRouter's API is **OpenAI-compatible**, meaning software already written for OpenAI's API can usually switch over by changing the web address it talks to and the model name. Its docs say it can also **fall back** automatically: if the model or provider you asked for errors, it tries the next one on a list you supply.",
    "There is a no-code side too. The Chat Playground at openrouter.ai/chat lets you send one prompt to several models side by side and compare the answers, which is the quickest way to see whether a cheaper model is good enough for your job. OpenRouter notes that chat-room conversations are stored only in your browser, not synced to its servers.",
    "OpenRouter does not make its own models. Every answer comes from a third-party provider, and the same model can be offered by several providers at different prices and speeds; by default OpenRouter balances between them, favouring cheaper ones while weighing uptime.",
  ],

  beforeYouStart: [
    "**You can start free, within limits.** OpenRouter's free plan gives access to a set of free models (their IDs end in `:free`). Its rate-limit docs say free models allow 20 requests a minute and 50 a day; once you have bought at least $10 of credits in total, the daily cap rises to 1,000.",
    "**Paid models run on prepaid credits.** OpenRouter says it passes through each provider's price with no markup on the model itself, and instead charges a platform fee when you buy credits — 5.5% on the standard pay-as-you-go plan, per its pricing page. The minimum purchase in its terms is $5. Prices are per million **tokens** (chunks of text, roughly three-quarters of a word), usually different for what you send and what comes back.",
    "**Unused credits are not a savings account.** OpenRouter's terms let you refund unused credits only within 24 hours of buying them (the fee is not refunded), and say it may expire credits that go unused for a year. Buy small amounts while you learn.",
    "**You'll need a little code to use the API.** If you only want to chat with AI, a regular chat app is simpler; OpenRouter earns its keep once you are building something or comparing models.",
  ],

  gettingSetUpSafely: {
    officialSource:
      "Create keys only on openrouter.ai itself (Settings → Keys), and store each one in your project's environment variables — OpenRouter's docs say never to commit keys to a code repository — rather than in a chat, email or document.",
    body: [
      "**Put a credit limit on every key.** When you create a key you can give it a spending cap that resets daily, weekly or monthly. OpenRouter's own guidance is to always set one, because a key with no limit can drain your whole balance — including any auto top-up you have switched on.",
      "**Decide on privacy before your first real prompt.** In Settings → Privacy you can stop OpenRouter routing your requests to providers that may store or train on your data, and restrict routing to providers with **zero data retention** (they keep nothing). Strict settings can make some models unavailable; that error is the setting working.",
      "**Confirm it works with a free model.** In the Chat Playground, add the Free Models Router and send a short message. A reply, with the name of the model that answered, means your account is set up.",
    ],
    vendorDocsUrl: "https://openrouter.ai/docs/quickstart",
  },

  security: [
    {
      kind: "text",
      text: "Your API key is the thing to protect. Anyone holding it can spend your credits, so keep it out of code you share, screenshots and public repositories. OpenRouter's docs say it scans GitHub for leaked keys and emails you if it finds one; if that happens, delete the key in Settings → Keys and make a new one.",
    },
    {
      kind: "list",
      label: "What happens to your prompts:",
      items: [
        "OpenRouter's data-collection docs say prompt and response logging is **off by default** and always opt-in. It does keep metadata such as token counts and timing.",
        "There is an opt-in that lets OpenRouter use your inputs and outputs in exchange for a 1% discount. Leave it off for anything private.",
        "The providers that actually run the models have their own policies, and some may keep or train on what you send. OpenRouter lets you exclude those providers in your privacy settings — separately for free and paid models. Its pricing table lists data-policy routing as not included on the Free plan, so check what your plan allows.",
      ],
    },
    {
      kind: "text",
      text: "Don't send personal, client or confidential information until you have set those privacy controls and checked which providers your chosen model routes to.",
    },
  ],

  triad: {
    bestAt: [
      "Trying many models from one account and one bill instead of signing up with each company.",
      "Comparing models side by side in the Chat Playground before you commit code to one.",
      "Keeping an app running when one provider has an outage, using fallback lists.",
    ],
    okayAt: [
      "Free experimentation. The free models are real, but OpenRouter itself calls them usually unsuitable for production use, and 50 requests a day goes quickly.",
      "Predicting costs. Prices are pass-through and can change; OpenRouter says requests keep working at a model's new price, so check the model page before a big job.",
    ],
    avoid: [
      "Creating a key with no credit limit.",
      "Buying a large block of credits up front — refunds are only possible within 24 hours.",
      "Sending sensitive data before you have set your privacy routing.",
    ],
  },

  starterActions: [
    {
      title: "Chat for free in the browser",
      whatItDoes:
        "Open openrouter.ai/chat, click Add Model, type \"free\" and choose the Free Models Router, then send a message. Each reply shows which free model answered.",
      whyHere:
        "It proves your account works and shows you what OpenRouter does — many models behind one door — without a key, code or payment.",
      tweak: "Ask the same question twice and notice that a different model may answer.",
    },
    {
      title: "Race two models on one prompt",
      whatItDoes:
        "In the Chat Playground, add a well-known paid model and a cheaper or free one, then send them the same prompt from your own work and compare the answers.",
      whyHere:
        "Most tasks don't need the most expensive model. Seeing the gap yourself is the fastest way to pick a model you can afford to run all day.",
      tweak: "Check each model's price per million tokens on openrouter.ai/models before you choose.",
    },
    {
      title: "Make a key with a ceiling",
      whatItDoes:
        "Go to Settings → Keys, create a key with a name you'll recognise, and set a small credit limit that resets monthly.",
      whyHere:
        "The limit is what turns a leaked key or a runaway script from a disaster into a nuisance. Doing it before you write code means you never run without one.",
    },
    {
      title: "Point existing code at OpenRouter",
      whatItDoes:
        "If you have code written for OpenAI's API, change its base URL to https://openrouter.ai/api/v1, use your OpenRouter key, and set the model to an ID copied from the models page.",
      whyHere:
        "Because the API is OpenAI-compatible, this is usually the whole migration. It is the clearest demonstration of why developers use OpenRouter.",
      tweak: "OpenRouter's Request Builder generates a working example request in several languages if you are starting from scratch.",
    },
    {
      title: "Stay free on purpose",
      whatItDoes:
        "When testing in code, use only model IDs ending in `:free`, or the `openrouter/free` router, and keep paid models out of any fallback list.",
      whyHere:
        "OpenRouter's docs warn that if a free model's fallback list includes a paid model, the paid one is billed. This keeps experiments at zero cost.",
    },
  ],

  pitfalls: [
    "**Web search is never free.** Adding web search to a request (the `:online` suffix or the web plugin) costs extra even on free models.",
    "**A negative balance blocks free models too.** OpenRouter's docs say you need to top up before free models work again.",
    "**Models come and go.** A retired model returns a \"no endpoints found\" error; pin exact model IDs and recheck them occasionally.",
    "**The same model can cost different amounts.** Prices vary by provider, and default routing balances on price and uptime rather than always choosing the cheapest.",
    "**Deleting your account forfeits your credits.** Spend down or refund (within 24 hours) first.",
  ],

  whereToNext: [
    { label: "AI APIs & Developer Services", categorySlug: "ai-apis-developer-services" },
    { label: "AI coding tools to build with", categorySlug: "ai-coding-development" },
    { label: "Run models on your own computer instead", categorySlug: "local-open-source-ai" },
  ],
};
