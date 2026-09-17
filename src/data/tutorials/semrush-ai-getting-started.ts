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
    "You type a website address, or a list of prompts (the short questions people type into an AI), into a box and hit go. Semrush runs them and hands back a report: a score, a count of times your brand came up, and which of your pages got linked. You change the list and re-run.",

  whatItIs: [
    "\"Semrush AI\" is not a product you can buy. Semrush is a long-running SEO suite — SEO meaning the work of getting your website to show up in search results — and it has bolted AI features onto that suite under several different names.",
    "The one that matters is the **AI Visibility Toolkit**: it measures whether AI assistants name your brand when someone asks about your market, and whether they link to your site.",
    "Semrush has been an Adobe company since 28 April 2026, when Adobe completed its acquisition. The product, the pricing pages and the signup flow all still operate under the Semrush name.",
    "Everything else with \"AI\" on it — AI writing, AI review replies, AI press releases — lives in a different toolkit with its own separate subscription. Buying one does not get you the others.",
  ],

  beforeYouStart: [
    "**Start with the free checker, not the pricing page.** Semrush's AI Search Visibility Checker takes a website address and gives you a report three times a day, with no account and no card — the vendor states this in the tool's own FAQ. That is enough to learn whether this category tells you anything you did not already know.",
    "What you pay for after that is a quota and a schedule, not access. The AI Visibility Toolkit alone is currently $99 a month billed annually, covering one website address. Bundled with the search tools it starts at Starter, around $199 a month, or $165.17 a month on an annual commitment. Prices are in US dollars.",
    "A free Semrush account (no card required) gets you one demo project, 10 reports a day across the main tools, and what Semrush's knowledge base calls \"a limited set of AI Visibility features.\" It does not say which features, and we did not sign in to find out — expect to discover the edges yourself.",
    "You need a website or a brand name already out in the world for any of this to return something; there is nothing here to poke at with a made-up question. To see what AI can actually do, a text tool is the better first stop — this one measures a business rather than teaching you.",
  ],

  security: [
    { kind: 'text', text: "What you hand Semrush is different from what you hand a chatbot: your own website, your competitors' names, and the questions you think your customers are asking — a strategy document sitting on Semrush's servers." },
    { kind: 'text', text: "Semrush's AI Functionality Terms are unusually clear on training: \"Semrush does not train or develop its models, and does not allow its third-party providers to train or develop its models on User Input.\" The same document grants Semrush the right to \"transfer and make User Input available to third-party artificial intelligence service providers,\" naming OpenAI products, Stable Diffusion and MidJourney — so what you type does leave Semrush. The terms carry no published effective date; the parent Terms of Service that incorporate them are dated 25 August 2026." },
    { kind: 'list', label: 'Worth knowing before you type', items: [
      'Client names and unannounced products go into that prompt list the same way your own brand does',
      'The privacy policy (last modified 13 October 2025) sends data to the United States and to group companies elsewhere, under standard EU contract terms',
      'Semrush’s output carries no accuracy warranty at all — see the triad for what the terms disclaim',
    ] },
  ],

  triad: {
    bestAt: [
      "Answering what a search-ranking tool cannot: whether an AI assistant says your name at all",
      "Running the same questions on a fixed daily schedule, so a change over a month is a measurement rather than an anecdote",
      "Putting your brand and a named competitor against the identical prompt list, side by side",
      "Separating *mentions* (your name appeared) from *citations* (an AI linked to your site) — only the second sends anyone to you",
    ],
    okayAt: [
      "Explaining **why** a number moved. It reports the movement; working out the cause is your job",
      "Telling you which AI platforms are actually covered — Semrush's own pages disagree with each other, see the pitfalls",
      "Writing the content you would fix any of this with. That lives in the separate Content Toolkit",
    ],
    avoid: [
      "Feeding Semrush's output into another AI tool. Its Terms of Service (25 August 2026), §3.3(r), forbid using Semrush outputs \"as inputs/prompts into, or for the purposes of developing, training, improving, fine-tuning, testing, or otherwise enhancing\" any AI or machine-learning system, carved out only for Semrush's own official integrations. Pasting a Semrush report into a chatbot to summarise it is the exact move the clause names.",
      "Treating what comes back as accurate because you paid for it. The AI Functionality Terms disclaim, in capitals, all warranties that outputs will be \"FREE FROM ERRORS, BIAS, OR OMISSIONS, OR THAT THE OUTPUTS WILL BE UNIQUE, ACCURATE, RELIABLE, OR FIT FOR ANY PARTICULAR PURPOSE,\" and license output to you \"only to the extent Semrush has such rights.\"",
      "Buying the $139 SEO plan because its card lists \"Monitor custom prompts.\" Semrush's own knowledge base says that plan \"doesn't include the full AI visibility feature set — no dedicated prompt-tracking quota, AI-ready Site Audit, or per-domain AI brand performance.\" Card and knowledge base contradict each other; the knowledge base is the more specific, and prompt tracking with a stated quota starts one tier up.",
    ],
  },

  starterActions: [
    {
      title: "Check your own site before you pay for anything",
      whatItDoes:
        "Open Semrush's free AI Search Visibility Checker, type your website address in, and click Check AI Visibility. You get a score out of 100, a count of brand mentions, a per-platform breakdown, and the pages of yours AI answers link to most.",
      whyHere:
        "The vendor's published three-a-day, no-card allowance makes a first look free rather than trial-shaped. Tested against Ahrefs' brand-monitoring tooling: swap the name in and the sentence fails, because it is anchored to an allowance Semrush publishes on this page.",
      tweak:
        "Run a competitor's address on one of your three daily checks — the gap between the scores is more informative than either number alone.",
    },
    {
      title: "Give Prompt Tracking real questions, not keywords",
      prompt: `best project management software for small teams
project management tools compared 2026
easiest project management app to learn
is [your brand] good for a five-person team`,
      whyHere:
        "Semrush's documentation says it accepts these one per line or comma-separated and runs them **unchanged** every day — which is why they must read like something a person would type, not like the keyword fragments an SEO tool normally wants. The quota is the product: 25 prompts on the standalone tier, 50 on Starter, 100 on Pro+, 200 on Advanced. Tested against typing the same four lines into ChatGPT yourself: that is one non-repeatable reading; the metered daily re-run is the difference.",
      tweak:
        "Swap the bracketed name for a competitor's on one line — same question, same day, is the comparison the score is built from.",
    },
    {
      title: "Find out what people actually ask before you guess",
      prompt: "standing desk",
      whyHere:
        "Prompt Research takes a bare phrase and returns hundreds of real prompts sorted by intent, against what Semrush describes as a database of 317M+ AI queries, capped at 1,000 prompts a day. Tested against a keyword tool, Semrush's own free Keyword Tool included: those return search terms people type into Google, not the sentences people type into an assistant.",
      tweak:
        "Feed the best five straight into your Prompt Tracking list — that is the intended handoff between the two reports.",
    },
    {
      title: "Read the citations column, not the score",
      whatItDoes:
        "On any report, find Mentions and Citations and treat them as two separate numbers rather than one headline.",
      whyHere:
        "Semrush publishes them as distinct counters on the same free report and says citations are \"how you turn AI search visibility into real referral traffic\" — so a high score built on mentions with no citations means the AI is describing you to people who will never reach you. Tested against a rank tracker, Semrush's own included: ranking tools have no equivalent split, because a blue link is a mention and a citation at once.",
    },
  ],

  pitfalls: [
    "The plan names changed and most guides have not caught up. Semrush One launched 29 October 2025 with Starter, Pro+ and Advanced, replacing Pro, Guru and Business. Stale references to the old names still appear in the text bundle of Semrush's own live pricing page, and in almost every third-party pricing article. Read the pricing page itself, on the day.",
    "Adobe's acquisition came with a customer FAQ of the same date: \"no immediate changes to your current services, agreements, or points of contact\" — a statement about that moment, not a commitment about next year. Treat the current pricing as current, not settled.",
    "Your own spot-check will not match the report, and that is expected: Semrush's FAQ says answers \"change based on factors such as model updates, shifts in training data, or differences in how the same query is phrased,\" and that it runs prompts \"in a controlled environment\" so its numbers stay comparable. Do not open ChatGPT, get a different answer, and conclude the tool is broken.",
    "Which AI platforms are covered depends on which Semrush page you read. The AI Visibility pricing page lists ChatGPT, Google AI, Gemini and Perplexity; the Prompt Tracking documentation lists ChatGPT Search, Google's AI Mode and Gemini, no Perplexity; the free checker's FAQ lists ChatGPT and AI Overviews as live with Gemini and AI Mode \"coming soon,\" under a headline claiming both are covered. Three vendor pages, three lists — check the page for the tool you are buying.",
    "The toolkits bill separately and it adds up fast. A Semrush plan covers search and AI visibility; Content, Local, Social, Advertising and AI PR are each their own subscription on top — the Content Toolkit, where the AI writing lives, currently starts at $60 a month billed annually.",
  ],

  whereToNext: [
    { label: 'More marketing and SEO tools', categorySlug: 'sales-marketing-seo-ai' },
    { label: 'AI chatbots to try first', categorySlug: 'text-conversational-ai' },
    { label: 'Research tools', categorySlug: 'research-academic-tools' },
  ],
};
