import type { PlatformTutorialData } from "./types";

export const surferSeoTutorial: PlatformTutorialData = {
  slug: "surfer-seo-getting-started",
  platformSlug: "surfer-seo",
  title: "Getting Started with Surfer",
  tagline: "The tool that tells you what the pages already ranking cover — and what your draft is missing.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-17",
  accessTier: "PREMIUM",

  howItWorks:
    "You type the search phrase you want to be found for, and Surfer reads the pages already winning on Google for it. It opens a writing document with a checklist down one side — words to include, how long to go, how many headings — and a score that moves up or down as you write or paste text.",

  whatItIs: [
    "Surfer is a writing tool for people trying to get found in search. It compares what you are writing against the pages that already rank for your phrase, and shows you what they cover that you do not.",
    "Since being bought by Positive Group — announced in October 2025 — it describes itself as an \"AI visibility platform\" rather than an SEO tool. Its newer half watches whether ChatGPT, Gemini and Perplexity mention your brand when someone asks them about your field. You supply the prompts (the messages a person would type into those assistants) you want checked.",
    "It will also write the article for you. You give it a phrase and some instructions and it drafts the whole thing, paragraph by paragraph. Whether you write it yourself or let it draft, the same scoring panel sits beside you.",
    "One cosmetic note so nothing looks wrong when you arrive: the parent company's rename shows up in browser tabs as \"Positive Surfer.\" The product is still called Surfer and still lives at surferseo.com.",
  ],

  beforeYouStart: [
    "**There is no free plan.** Surfer's help centre says new accounts get a 7-day trial of its Pro plan, but you enter billing details at checkout to start it, and on day 7 it converts to whatever plan you picked and charges the card. It does not lapse quietly. Paid plans currently run from around $49/month (Discovery) to $299/month, with a custom-priced Enterprise tier above that.",
    "Two pieces of Surfer cost nothing and want no subscription. Keyword Surfer, a browser extension Surfer's own page calls \"100% free. Forever.\", shows search volumes inside your normal Google results; it was last updated on the Chrome Web Store in January 2026 and lists around 600,000 users. Its AI Humanizer rewrites up to 500 words with no account at all, or 1,000 once you register without a plan — English only, as the vendor states it today.",
    "The trial runs once. Surfer's help centre says it is for new accounts only, and that a card already registered with Surfer makes you ineligible — so you cannot restart it under a new email with the same card.",
    "Annual billing saves up to about 17%, but Surfer's Regulations say a cancelled prepaid annual subscription is not refundable, with only a proportional recalculation available on request. Monthly costs more per month and risks less.",
  ],

  security: [
    { kind: 'text', text: "Surfer is run by Surfer sp. z o.o., a company in Wrocław, Poland, so its customer privacy policy — last updated 23 January 2026 — is written to European privacy law. Most of what you put into Surfer is marketing copy about your own business rather than anything sensitive, which makes this a lower-stakes tool than a general chatbot." },
    { kind: 'list', label: 'Worth knowing before you paste your site into it', items: [
      'That policy names roughly 23 outside services that touch customer data, split between European and American processing.',
      'It does not say either way whether your documents are used to train AI models. If that matters to you, ask support rather than assuming the answer you would prefer.',
      'Customer data is kept for the length of your contract plus around 30 days, which Surfer attributes to backup integrity.',
      "Surfer's help centre warns that after you cancel, the account expires and stored data goes with it. Export anything you want to keep before your last paid day — the editor exports to plain text, HTML or Markdown.",
    ] },
  ],

  triad: {
    bestAt: [
      "Telling you what the pages currently ranking for your phrase cover that your draft does not",
      "Giving a long article a shape — how many headings, roughly how long, which subtopics — before you write a word",
      "Getting a competent first draft out of a single phrase when the blank page is the actual problem",
      "Checking whether AI assistants name your brand when someone asks them a question in your field",
    ],
    okayAt: [
      "Prose quality. The score rewards coverage, not writing. You still edit.",
      "Working outside English — the analysis side is broad, the generating and rewriting sides are not",
      "Small sites. A lot of what separates the plans is tracked pages and tracked prompts, which you may not have enough of yet to use.",
    ],
    avoid: [
      "Reading the Content Score as a forecast. Surfer's own Regulations state that its analyses \"are not meant to serve as clues or recommendations,\" and that acting on them is voluntary and at your own risk. The score says you resemble the pages that rank, which is not the same as beating them.",
      "The article generator in Arabic, Hebrew or Maltese. Those are the only three languages Surfer's help centre lists as unsupported for AI article generation, out of roughly 29 it does support — while describing the analysis side as working in all languages. Check yours is on the list before you plan work around it.",
      "Treating the AI Humanizer as permission. Surfer markets it as helping text \"pass most of AI detection tools\" — a claim about detectors, not about whether your client, publisher or institution allows AI-written text in the first place.",
    ],
  },

  starterActions: [
    {
      title: "Look at Surfer's data before you look at Surfer",
      whatItDoes:
        "Add the Keyword Surfer extension to Chrome or another Chromium browser, then search Google for the phrase you would want to be found for. Search volumes and related phrases appear inside the results page you were already reading.",
      whyHere:
        "The guidelines Surfer builds inside its paid editor rest on this same search-volume layer, and this is the one place you can inspect it without a login — the extension's own listing does not require a Surfer account. Tested against Semrush: Semrush's keyword numbers live inside a Semrush dashboard you have to go to, so you are judging the tool and the data at the same time. Here you judge the data first, in a page you already trust.",
    },
    {
      title: "Overrule the average before it drafts anything",
      prompt:
        "Write for the owner of a small independent [bike repair shop] who has never optimized a page before. Keep sentences under 25 words. Use British spelling. Do not claim we are cheapest — we compete on turnaround time. Treat these as the source of truth about us: [your about page URL], [your services page URL].",
      whyHere:
        "This goes in the \"context & instructions\" box on the Content Editor's setup screen, before you choose \"Generate content.\" Surfer builds its guidelines by analysing the pages currently ranking, so left alone it drafts toward the average of your competitors — which is precisely the page nobody needs another of. Surfer's own documentation says this box takes free-text instructions plus up to five source URLs, and it is the only point before generation where you can contradict that average. Tested against ChatGPT: you can give ChatGPT the same instructions, but ChatGPT has not read the ten pages ranking for your phrase, so there is no average for your instructions to push against.",
      tweak:
        "Replace the bracketed business with your own, and use your two strongest existing pages as the source URLs.",
    },
    {
      title: "Fix one paragraph without leaving the score",
      prompt:
        "Rewrite this paragraph to use [term from the guidelines panel] naturally, keep it to three sentences, and cut anything that reads like marketing.",
      whyHere:
        "You select a paragraph inside a Surfer document, click \"Ask Surfy,\" and type this. Surfy only exists once you have selected text inside a Surfer document, and Surfer's docs say it runs on its own separate pool of credits (Surfer's documentation calls them tokens) rather than the allowance a full article generation spends — so small fixes are metered apart from big ones. Tested against ChatGPT: you can get the same rewrite there, but you then have to paste it back and find out whether the score moved, which is two extra steps and the whole reason for doing it in place.",
    },
    {
      title: "Ask the question your customer would actually ask an AI",
      prompt:
        "What's the best way to [the thing your business does] in [your city]?",
      whyHere:
        "Add this as a tracked prompt in the AI Tracker; Surfer's docs say tracked prompts refresh daily. Surfer reports two different things about that answer — whether your brand was named in it, and whether your page was among the sources the model read behind the scenes — and its own documentation flags that these measure different things and often disagree. Tested against a conventional rank tracker: a Google result either lists your page or it does not, so there is one number; an AI answer can cite you without naming you, or name you without citing you. Note the gating: the entry-level plan currently tracks zero prompts, so this one needs Standard or above.",
    },
    {
      title: "Spend a document on a page you already published",
      whatItDoes:
        "Open a new document for a phrase one of your existing pages **should** be winning, paste that page in, and read the gap list without writing anything new.",
      whyHere:
        "Surfer counts this against the same monthly \"documents\" allowance as writing a fresh article — currently 120 a month on the entry plan — so auditing an old page costs exactly what creating a new one does. That changes the order you should work in: check your best existing pages first, while the allowance is full. Tested against Google Search Console, the free tool most people already have: Search Console tells you a page has lost position; it will not tell you which subtopics the pages that overtook you cover.",
    },
  ],

  pitfalls: [
    "The score is a comparison, not a verdict. It measures how closely your draft resembles the pages ranking today. A page can score high and still be forgettable, and the pages it compared you to can move.",
    "Writing to the term list mechanically shows. The panel gives a suggested count range for each term, and hitting the top of every range is how Surfer-written pages come to read like Surfer-written pages. Treat the list as subjects to cover, not a quota.",
    "Unused limits do not roll over. Surfer's help centre says monthly limits reset rather than accumulate, so a quiet month is money spent, not money banked.",
    "Surfer's own AI page calls its generated articles \"ready-to-rank.\" They are drafted from competitor pages, not from your business, so every factual claim about you in that draft is a guess until you check it.",
    "The interface itself is available in English, Polish and French only, which is a separate matter from which languages it can analyse or write. Check that list if you need the app in your own language.",
    "Surfer's plan names are still settling after the acquisition: its own August 2026 changelog refers to tiers the live pricing page no longer lists. Every price and limit here is the published position on the day it was checked — read the pricing page itself before you commit.",
  ],

  whereToNext: [
    { label: 'Other sales & marketing AI tools', categorySlug: 'sales-marketing-seo-ai' },
    { label: 'Text & chat assistants', categorySlug: 'text-conversational-ai' },
    { label: 'Workflow automation', categorySlug: 'workflow-automation' },
  ],
};
