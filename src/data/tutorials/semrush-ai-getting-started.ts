import type { PlatformTutorialData } from "./types";

export const semrushAiTutorial: PlatformTutorialData = {
  slug: "semrush-ai-getting-started",
  platformSlug: "semrush-ai",
  title: "Getting Started with Semrush's AI Visibility Tools",
  tagline: "Finding out whether ChatGPT and Google's AI answers mention your business — and what it costs to keep watching.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-17",
  accessTier: "PREMIUM",

  howItWorks:
    "You type a website address, or a list of prompts (the short questions people type into an AI), into a box and hit go. Semrush runs them for you, then hands back a report: a score, a count of times your brand came up, and which of your pages got linked. You change the list and re-run.",

  whatItIs: [
    "\"Semrush AI\" is not a product you can buy. Semrush is a long-running SEO suite — SEO meaning the work of getting your website to show up in search results — and over the past two years it has bolted AI features onto that suite and sold them under several different names.",
    "The one that matters, and the reason the term \"Semrush AI\" gets used at all, is the **AI Visibility Toolkit**: it checks whether AI assistants name your brand when someone asks them a question in your market, and whether they link to your site when they do.",
    "Semrush has been an Adobe company since 28 April 2026, when Adobe completed its acquisition. The product, the pricing pages and the signup flow all still operate under the Semrush name.",
    "Everything else with \"AI\" on it — AI writing, AI review replies, AI press releases — lives in a different toolkit with its own separate subscription. Buying one does not get you the others.",
  ],

  beforeYouStart: [
    "**Start with the free checker, not the pricing page.** Semrush's AI Search Visibility Checker takes a website address and gives you a report three times a day, with no account and no card — the vendor states this plainly in the tool's own FAQ. That is enough to learn whether this whole category tells you anything you did not already know about your own site.",
    "What you pay for after that is a quota and a schedule, not access. The AI Visibility Toolkit on its own is currently $99 a month, billed annually, covering one website address. Bundled with the search tools it starts at the Starter plan, around $199 a month, or $165.17 a month if you commit to a year. Prices are in US dollars.",
    "A free Semrush account (no card required) gets you one demo project, 10 reports a day across the main tools, and what Semrush's knowledge base calls \"a limited set of AI Visibility features.\" It does not say which features, and we did not sign in to find out — expect to discover the edges yourself.",
    "You need a website or a brand name already out in the world for any of this to return something. Unlike a chatbot, there is nothing here to poke at with a made-up question. If what you want is to see what AI can actually do, a text tool is the better first stop — this one measures a business rather than teaching you.",
  ],

  security: [
    { kind: 'text', text: "What you hand Semrush is different from what you hand a chatbot: your own website, your competitors' names, and the questions you think your customers are asking. That last list is a fair description of your commercial strategy, and it sits on Semrush's servers." },
    { kind: 'text', text: "Semrush's AI Functionality Terms take an unusually clear line on training: \"Semrush does not train or develop its models, and does not allow its third-party providers to train or develop its models on User Input.\" That is a stronger default than most consumer AI tools offer. The same document, though, grants Semrush the right to \"transfer and make User Input available to third-party artificial intelligence service providers,\" naming OpenAI products, Stable Diffusion and MidJourney — so what you type does leave Semrush. These terms carry no published effective date; the parent Terms of Service that incorporate them are dated 25 August 2026." },
    { kind: 'list', label: 'Worth knowing before you type', items: [
      'Client names and unannounced products go into your prompt list the same way your own brand does — and that list is the strategy document, not the report',
      'The privacy policy (last modified 13 October 2025) sends data to the United States and to group companies elsewhere, under standard EU contract terms',
      'Semrush’s output carries no accuracy warranty at all; see the triad below for what the terms actually disclaim',
    ] },
    { kind: 'text', text: "None of this makes the tool risky to use. It is a business subscription behaving like one — but it is a subscription, and the terms are the part people skip." },
  ],

  triad: {
    bestAt: [
      "Answering one question a search-ranking tool cannot: does an AI assistant say your name when someone asks about your market",
      "Running the same set of questions on a fixed daily schedule, so a change over a month is a measurement rather than an anecdote",
      "Putting your brand and a named competitor against the identical prompt list, side by side",
      "Separating *mentions* (your name appeared) from *citations* (an AI linked to your site) — only the second sends anyone to you",
    ],
    okayAt: [
      "Explaining **why** a number moved. It reports the movement; working out the cause is your job",
      "Telling you which AI platforms are actually covered — Semrush's own pages disagree with each other on this, see the pitfalls",
      "Writing the content you would fix any of this with. There is a Content Toolkit, but it is a separate subscription from a separate pricing page",
    ],
    avoid: [
      "Feeding Semrush's output into another AI tool. Its Terms of Service (25 August 2026), §3.3(r), forbid using Semrush outputs \"as inputs/prompts into, or for the purposes of developing, training, improving, fine-tuning, testing, or otherwise enhancing\" any AI or machine-learning system — carved out only for Semrush's own official integrations. Pasting a Semrush report into a chatbot to summarise it is the exact move the clause names.",
      "Treating what comes back as accurate because you paid for it. The AI Functionality Terms disclaim, in capitals, all warranties that outputs will be \"FREE FROM ERRORS, BIAS, OR OMISSIONS, OR THAT THE OUTPUTS WILL BE UNIQUE, ACCURATE, RELIABLE, OR FIT FOR ANY PARTICULAR PURPOSE,\" and license output to you \"only to the extent Semrush has such rights.\"",
      "Buying the $139 SEO plan because its card lists \"Monitor custom prompts.\" Semrush's own knowledge base says that plan \"doesn't include the full AI visibility feature set — no dedicated prompt-tracking quota, AI-ready Site Audit, or per-domain AI brand performance.\" The pricing card and the knowledge base contradict each other; the knowledge base is the more specific of the two, and prompt tracking with a stated quota starts one tier up.",
    ],
  },

  starterActions: [
    {
      title: "Check your own site before you pay for anything",
      whatItDoes:
        "Open Semrush's free AI Search Visibility Checker, type your website address into the field, and click Check AI Visibility. You get a score out of 100, a count of brand mentions, a per-platform breakdown, and the pages of yours that AI answers link to most.",
      whyHere:
        "Three runs a day with no registration and no card is the vendor's own published allowance, and it is what makes a first look free rather than trial-shaped — but read the same page's FAQ before you trust the platform breakdown, because it lists Gemini and Google's AI Mode as \"coming soon\" while the headline above it claims both are covered. Tested against Ahrefs' brand-monitoring tooling: the sentence breaks immediately, because it is anchored to a specific documented allowance and a specific documented self-contradiction on one Semrush page.",
      tweak:
        "Run a competitor's address on one of your three daily checks. The gap between the two scores is more informative than either number alone.",
    },
    {
      title: "Give Prompt Tracking real questions, not keywords",
      prompt: `best project management software for small teams
project management tools compared 2026
easiest project management app to learn
is [your brand] good for a five-person team`,
      whyHere:
        "Semrush's documentation says it accepts these one per line or comma-separated and runs them **unchanged** against ChatGPT Search, Google's AI Mode and Gemini every day — which is why they have to read like something a person would actually type, not like the keyword fragments an SEO tool normally wants. The quota is the product: 25 prompts on the standalone tier, 50 on Starter, 100 on Pro+, 200 on Advanced. Tested against typing the same four lines into ChatGPT yourself, which costs nothing but gives you one non-repeatable reading; the metered daily re-run is the whole difference.",
      tweak:
        "Swap the bracketed name for a competitor's on one line. Seeing which of you the AI names first, on the same question, on the same day, is the comparison the score is built from.",
    },
    {
      title: "Find out what people actually ask before you guess",
      prompt: "standing desk",
      whyHere:
        "Prompt Research takes a bare phrase like this and returns hundreds of real prompts built around it, sorted by intent, against what Semrush describes as a database of 317M+ AI queries — capped at 1,000 prompts a day. It is the opposite motion from the card above: you are harvesting questions to track rather than inventing them. Tested against a keyword tool, including Semrush's own free Keyword Tool: those return search terms people type into Google, not the full sentences people type into an assistant, and the two lists do not look alike.",
      tweak:
        "Feed the best five results straight into your Prompt Tracking list — that is the intended handoff between the two reports.",
    },
    {
      title: "Read the citations column, not the score",
      whatItDoes:
        "On any report, find Mentions and Citations and treat them as two separate numbers. Semrush defines Mentions as the times your brand name appears in an AI answer and Citations as the times an AI links to your website as a source.",
      whyHere:
        "Semrush publishes these as distinct counters on the same free report and says outright that citations are \"how you turn AI search visibility into real referral traffic\" — so a high score built on mentions with no citations means the AI is describing you to people who will never reach you, which is a diagnosis, not a win. Tested against a traditional rank tracker, Semrush's own included: ranking tools have no equivalent of this split, because a blue link is a mention and a citation at once.",
    },
  ],

  pitfalls: [
    "The plan names changed and most guides have not caught up. Semrush One launched 29 October 2025 with Starter, Pro+ and Advanced, replacing Pro, Guru and Business. Stale references to the old names still appear in the text bundle of Semrush's own live pricing page, and almost every third-party pricing article you will find still describes the retired tiers. Read the pricing page itself, on the day.",
    "Adobe completed its acquisition of Semrush on 28 April 2026. Semrush's customer FAQ of the same date says there will be \"no immediate changes to your current services, agreements, or points of contact\" — which is a statement about that moment, not a commitment about next year. Treat the current pricing as current, not settled.",
    "Your own spot-check will not match the report, and that is expected. Semrush's FAQ says answers \"change based on factors such as model updates, shifts in training data, or differences in how the same query is phrased,\" and that it runs prompts \"in a controlled environment\" specifically so its numbers stay comparable. Do not open ChatGPT, get a different answer, and conclude the tool is broken.",
    "Which AI platforms are covered depends entirely on which Semrush page you read. The AI Visibility pricing page lists ChatGPT, Google AI, Gemini and Perplexity; the Prompt Tracking documentation lists ChatGPT Search, Google's AI Mode and Gemini, with no Perplexity; the free checker's FAQ lists ChatGPT and AI Overviews as live with Gemini and AI Mode \"coming soon.\" Three vendor pages, three lists. Check the page for the specific tool before you rely on a platform being in there.",
    "The toolkits bill separately and it adds up fast. A Semrush plan covers search and AI visibility. Content, Local, Social, Advertising and AI PR are each their own subscription stacked on top — the Content Toolkit, which is where the AI writing lives, currently starts at $60 a month billed annually on its own pricing page.",
  ],

  whereToNext: [
    { label: 'More marketing and SEO tools', categorySlug: 'sales-marketing-seo-ai' },
    { label: 'AI chatbots to try first', categorySlug: 'text-conversational-ai' },
    { label: 'Research tools', categorySlug: 'research-academic-tools' },
  ],
};
