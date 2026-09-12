import type { PlatformTutorialData } from "./types";

export const alphasenseTutorial: PlatformTutorialData = {
  slug: "alphasense-getting-started",
  platformSlug: "alphasense",
  title: "Getting Started with AlphaSense",
  tagline:
    "AI search across company filings, analyst notes and expert interviews — sold to firms, not to individuals.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-12",
  changelogUrl:
    "https://help.alpha-sense.com/hc/en-us/categories/40996539323155-Product-Updates",
  accessTier: "FREE",

  howItWorks:
    "You sign in, type a question into a search bar in plain English, and get back a written answer with each claim linked to the exact sentence in the document it came from. Click a citation to read the source, then ask a follow-up in the same box to narrow or redirect the answer.",

  whatItIs: [
    "AlphaSense is a search engine for business and financial documents — company filings, earnings-call transcripts, news, research notes written by banks' own analysts, and interviews with people who have worked inside an industry. The company counts around 500 million documents from more than 10,000 sources. The pitch is the library rather than the AI: most of what is in it is licensed and closed, so a general AI search tool pointed at the open web cannot see it.",
    "It is built and priced for organisations. AlphaSense sells to investment banks, hedge funds, private equity and venture firms, asset managers, consultancies, law firms and corporate strategy teams; its terms of use (last updated 5 June 2026) license the service to named \"Authorized Users\" for \"internal business purposes.\"",
    "One note about everything below. The whole product sits behind a sign-in, so what follows about screens, buttons and settings is drawn from AlphaSense's own help centre rather than from us using it.",
  ],

  beforeYouStart: [
    "**You cannot sign up for AlphaSense yourself, and it does not publish a price.** Its pricing page lists two plans — Market Intelligence and Enterprise Intelligence — with no numbers next to either, saying only that it sells annual subscriptions \"ranging from enterprise packages to per-seat options\" and asking you to contact its sales team. Expert calls and Canalyst financial models sit beside those plans as separately paid add-ons. Treat any dollar figure you find on a third-party \"AlphaSense pricing\" page as somebody's guess, because the vendor publishes none.",
    "In practice there are three ways in. Your employer already subscribes and an administrator adds you. Or you are a current student, staff or faculty member at a business school whose library licenses it — Harvard Business School's and Stanford GSB's libraries both list AlphaSense, in each case restricted to their own current members, and Harvard's listing notes expert transcripts cannot be downloaded and that an account includes 25 company-model downloads for its lifetime. Or you fill in the trial request form at alpha-sense.com and wait. We could not see that form's fields without submitting it, so we cannot tell you whether a personal email address is accepted, how long a trial runs, or whether it is granted automatically.",
    "What you will actually be able to read depends on the contract, not on the product. Blocks of source material are switched on per account — AlphaSense calls them \"content sets\" — and its help centre says real-time research from a given bank needs what it calls an \"entitlement,\" which is permission that follows from your firm having a trading, advisory or coverage relationship with that bank. Older \"after-market\" research from the same banks does not need one. Two people on the same platform can run the same search and get different results.",
    "The closest honest substitute you can learn on this week is BamSEC — AlphaSense owns it, it is self-serve, it has a free tier, and BamSEC Pro is currently listed at around $69 a month billed annually. It covers US company filings and earnings-call transcripts rather than the licensed bank research and expert interviews.",
  ],

  security: [
    {
      kind: "text",
      text: "The unusual thing about AlphaSense's privacy position is that it is written down, and it is favourable. Its privacy notice (last updated 19 June 2026) states that it does not use customer personal data, customer-provided content, or personal data processed on behalf of customers to train generally available generative artificial intelligence models — and says the same about data pulled in from a firm's own connected systems.",
    },
    {
      kind: "list",
      label: "Where the real constraints are:",
      items: [
        "The account is your firm's, not yours: the terms of use forbid sharing login credentials outright — on a per-seat contract that is also the term most likely to be noticed.",
        "An administrator can see AI spending. The help centre describes a Credit Usage Dashboard visible to account administrators only, reporting how much of the organisation's allocation has gone and when the contract period ends. It does not say whether that breaks down per person, and we could not establish it — assume your usage is visible in aggregate at least.",
        "What you find is not yours to pass on. A separate third-party terms page (last updated 10 January 2025) carries each content provider's own rules, and they are strict: no republishing or redistributing, no downloading or derivative works in several cases, and one provider, TD Securities, bars using its data to train any AI tool. Several state plainly that their material is not investment advice and is not directed at your circumstances.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Finding one specific statement buried in a very large pile of company documents.",
      "Tracking how a single topic — pricing, tariffs, a competitor, a supply chain — has been discussed across many companies over time.",
      "Private-company research through expert interview transcripts, the part you genuinely cannot get free elsewhere. AlphaSense's own pages put the library somewhere in the hundreds of thousands of transcripts across 25,000–29,000 companies, though its figures differ between pages.",
      "Standing watch: dashboards and alerts that push new mentions to you instead of you going back to search.",
    ],
    okayAt: [
      "Anything on the open web — the help centre describes web search as something you switch on to reach beyond the library rather than the default.",
      "Questions whose answer is a single number. It is a document-search product first, not a spreadsheet.",
      "Being explored casually. There are public interactive product tours on alpha-sense.com that walk through the interface without an account; they appear to be open, though we could not confirm whether an email is asked for before one plays. They are walkthroughs of a fully-loaded configuration, not the account you would get.",
    ],
    avoid: [
      "Litigation and regulatory work. The terms of use expressly prohibit using the service for litigation purposes or in government or regulatory filings, and separately prohibit benchmarking.",
      "Treating a generated answer as the finding. What it summarises is largely opinion — analyst notes, expert interviews, management commentary.",
      "Deciding on your own to point it at your firm's internal files. Connecting shared drives is what the Enterprise Intelligence plan is for — a contract-level decision made above you, not a setting you turn on.",
    ],
  },

  starterActions: [
    {
      title: "Ask the question you'd otherwise read thirty documents to answer",
      prompt:
        "Act as an equity analyst. Summarize how [company] has discussed supply chain risks in earnings calls over the last 6 months. Group findings by theme and present them in a bulleted list.",
      whyHere:
        "AlphaSense's help centre publishes almost this exact wording as its example **prompt** (the message you type). Test the sentence against Perplexity and it fails — Perplexity would answer from the open web, while this answer can only be assembled from the content sets your particular account is licensed for.",
      tweak:
        "Change \"earnings calls\" to whichever document type you actually care about, and cut the window to six weeks when you want the current story rather than the trend.",
    },
    {
      title: "Interrogate a single document instead of reading it",
      prompt:
        "What did management say about pricing, and did the tone change from the previous quarter? Quote the lines you are relying on.",
      whyHere:
        "The help centre describes an \"Ask in Doc\" control on an open document, which confines the AI to that one file. Swap in ChatGPT and the sentence stops being true: here nothing is uploaded, the file is already in the library, and the scope is a setting rather than an instruction.",
      tweak:
        "Asking it to quote the lines it used turns a summary you have to trust into one you can check.",
    },
    {
      title: "Search like a librarian, not like a chatbot",
      prompt: "\"pricing power\" AND (tariff OR tariffs) NOT guidance",
      whyHere:
        "There is a real operator language behind the keyword bar, which is rare in an AI product. AlphaSense's published quick-reference guide documents AND, OR, NOT, quoted phrases, a `TITLE()` filter and proximity operators, and says typing `?` in the search bar lists the full set.",
      tweak:
        "Quotation marks matter — the guide says they stop the search quietly matching near-relatives of your words. For words near each other AlphaSense documents proximity operators, its own example being `NEAR2(travel space)`, but warns they cannot be combined with extra required or excluded keywords. Run a proximity search on its own.",
    },
    {
      title: "Turn a question into something you'd otherwise spend a morning writing",
      prompt:
        "Compare how [three named competitors] have described demand in [market] over the last four quarters. Note where they disagree, and flag anything only one of them mentions.",
      whyHere:
        "The help centre describes three reasoning settings — Auto, Think Longer and Deep Research — with Deep Research the one that goes away and runs a multi-step job on its own. Choose it deliberately, because these AI features draw on **credits** (the platform's unit of spend — each thing you make costs some) that come out of your organisation's allocation and reset at the contract end date, not monthly.",
      tweak:
        "Name the companies and the window explicitly. The vaguer the question, the more the run costs and the more generic the report that comes back.",
    },
    {
      title: "Before anything else, find out what your account can actually see",
      whatItDoes:
        "In the search bar, open the \"All Sources\" control the help centre describes and read which content sets are switched on for you — filings, news, bank research, expert transcripts, your firm's own documents — then check whether web search is on or off.",
      whyHere:
        "The material here is per-contract, which makes this the difference between a search that comes back empty because nobody said the thing and one that comes back empty because you are not licensed for the source that said it.",
    },
  ],

  pitfalls: [
    "Reading the summary and never clicking through to the source sentence. That link is the product's entire argument for itself over a free chatbot; skip it and you have bought an expensive chatbot.",
    "Reaching for the heaviest reasoning setting out of habit. Auto is the default the help centre describes and it is fine for a lookup — a shared allocation disappears one unnecessary deep run at a time.",
    "Treating expert-interview transcripts as neutral. They are paid, arranged conversations with individuals, which is exactly why AlphaSense describes a compliance process around them. Read one as a single informed person's view, not as a source of record.",
    "Stopping at the first answer. The help centre describes highlighting a passage inside a result to ask about that passage specifically — a narrowing move a plain follow-up does not give you.",
  ],

  whereToNext: [
    { label: "Research & Academic Tools", categorySlug: "research-academic-tools" },
    { label: "Finance & Real Estate AI", categorySlug: "finance-real-estate-ai" },
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
  ],
};
