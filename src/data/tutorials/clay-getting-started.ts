import type { PlatformTutorialData } from "./types";

export const clayTutorial: PlatformTutorialData = {
  slug: "clay-getting-started",
  platformSlug: "clay",
  title: "Getting Started with Clay",
  tagline:
    "A spreadsheet that fills itself in: start with a list of companies or people, and Clay looks up details from many data providers and AI research — row by row, for credits.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-10-24",
  changelogUrl: "https://www.clay.com/changelog",
  accessTier: "FREE",

  howItWorks:
    "You build a **table** that looks like a spreadsheet. Rows come from a source — a company search, a CSV, your CRM. Then you add columns that **enrich** each row: look up a work email, a job title, company size, or ask Clay's AI agent to research something on the web. Each lookup spends Clay's usage units.",

  whatItIs: [
    "Clay is a data platform for sales and marketing teams. Its course for beginners teaches a four-step pattern it calls FETE: **Find** companies or people, **Enrich** them with more details, **Transform** the data with formulas or AI, and **Export** it to your CRM, email tool or a CSV. Clay's docs say every table begins with a source — a built-in company or people search, a CRM, a webhook or an uploaded file.",
    "Its signature feature is the **waterfall**: Clay's docs describe it as several data providers run in a set order, so if the first one can't find an email, the next one tries. Clay's pricing page says it offers data from more than 150 providers through one account.",
    "For anything a data provider can't answer, there's **Claygent**, which Clay's pricing page calls its AI agent with access to web research — for example, \"does this company mention SOC 2 on its website?\" — and AI columns that clean up or reshape data. Clay's AI docs say it uses models from OpenAI, Anthropic, Google and others, and that row data is only sent to a model when you run that action.",
  ],

  beforeYouStart: [
    "**Two meters, not one.** Clay's credits guide splits usage into **Actions** (each enrichment, AI run or export) and **Data Credits** (paying for data from providers and AI models). A fully enriched record typically costs several Data Credits, per that guide. Exporting to CSV costs neither.",
    "**Free is for learning.** As of 24 October 2026, Clay's pricing page lists a Free plan with small monthly allowances of Actions and Data Credits, a cap on rows per table, and no phone-number lookups. New accounts also get a 14-day trial with extra Data Credits, per Clay's plans guide; no credit card is needed to start.",
    "**Paid plans are expensive by beginner standards.** The pricing page lists Launch at {{price:clay:Launch}} and Growth at {{price:clay:Growth}}, more if you pay month to month, with higher tiers for more credits. Actions don't roll over; Data Credits partly do, with rules that differ for monthly and annual plans.",
    "**Using your own provider keys** skips Data Credits for those lookups (the provider bills you instead), but each run still uses an Action.",
  ],

  gettingSetUpSafely: {
    officialSource:
      "Sign up at app.clay.com/signup, linked from clay.com. Connect your CRM or email tools from inside Clay only once you know what you'll send there.",
    body: [
      "**Turn Auto-run off while you build.** Clay's table settings guide says table-level Auto-run is on by default, so enrichments run whenever rows are added or edited. Clay recommends switching it off while building, testing on 5–10 rows, then turning it back on.",
      "**Test on 10 rows first.** Clay's credit-saving guide suggests running a new column on about 10 rows before the whole table, and using \"Only run if\" conditions so you only enrich rows that qualify.",
      "**Confirm it works.** Start from one of Clay's official templates, run it on a handful of rows, and check the credits it used in your workspace before scaling up.",
    ],
    vendorDocsUrl: "https://university.clay.com/courses/clay-101",
  },

  security: [
    {
      kind: "text",
      text: "Clay is full of information about real people, and what you do with it is your legal responsibility. Clay's terms say you're responsible for having the right to upload and use your content. Its email best-practices guide — which says it isn't legal advice — notes you need a lawful basis for personal data in the EU and UK, every email needs an opt-out, and you shouldn't email people's personal addresses.",
    },
    {
      kind: "list",
      label: "What Clay says about your data:",
      items: [
        "Clay's AI docs say it doesn't use customer data to train models, apart from features that live in your own workspace.",
        "Clay's pricing page lists SOC 2 Type II, GDPR, CCPA and ISO 27001 compliance, with reports available through its Trust Center.",
        "Deleting a workspace removes its data after 30 days, per Clay's security doc. Privacy requests go to privacy@clay.com.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Building a detailed, accurate list of target companies and contacts by combining many data sources.",
      "Answering custom questions about each row with AI web research instead of manual browsing.",
      "Feeding clean data into a CRM or outreach tool automatically.",
    ],
    okayAt: [
      "Small budgets. The free plan is enough to learn; real prospecting at volume needs a paid plan.",
      "Data accuracy. Clay's terms provide the service \"as is\"; spot-check results before relying on them.",
    ],
    avoid: [
      "Running a new column on a huge table without testing it first.",
      "Leaving Auto-run on while you're still building.",
    ],
  },

  starterActions: [
    {
      title: "Take the short course",
      whatItDoes:
        "Work through the first lessons of Clay 101 on Clay University (\"Get Started in Clay\" and the FETE intro).",
      whyHere:
        "Clay's interface packs a lot in. The official course explains the pattern every table follows, which makes every later step faster.",
    },
    {
      title: "Start from a template",
      whatItDoes:
        "Open Clay's template \"Find Key Decision Makers at any Company with just a Website URL\" and run it on three company websites you know.",
      whyHere:
        "Using companies you know lets you judge the results' accuracy immediately, and a template saves you building the columns yourself.",
    },
    {
      title: "Ask Claygent a question",
      prompt:
        "Visit this company's website and tell me in one sentence what they sell and who their main customers are. If you can't tell, say \"unclear\".",
      whyHere:
        "Add this as an AI research column on five rows. Asking it to say \"unclear\" when it can't tell keeps the column honest instead of filled with guesses.",
    },
    {
      title: "Export a CSV",
      whatItDoes:
        "Export your finished table to CSV.",
      whyHere:
        "Clay's credits guide says CSV export uses no Actions or Data Credits — a free way to take your results elsewhere while you learn.",
    },
  ],

  pitfalls: [
    "**Unexpected deductions.** Clay's credits guide lists the usual causes: Auto-run being on, AI columns charging for every row, and re-running columns.",
    "**Enriching every row of a big list.** Filter or qualify rows first; per-workbook spend limits are an Enterprise feature, so on other plans the discipline is yours.",
    "**Assuming Free works for phone numbers.** Phone enrichment needs a paid plan, and isn't included in the trial.",
    "**Cancelling instead of downgrading.** Clay's credits guide says long-term retention isn't guaranteed after extended inactivity, and recommends downgrading rather than cancelling.",
  ],

  whereToNext: [
    { label: "Sales, Marketing & SEO AI", categorySlug: "sales-marketing-seo-ai" },
    { label: "Workflow & automation tools", categorySlug: "workflow-automation" },
    { label: "Research tools", categorySlug: "research-academic-tools" },
  ],
};
