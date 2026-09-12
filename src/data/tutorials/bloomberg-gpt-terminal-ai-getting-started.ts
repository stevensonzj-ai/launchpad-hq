import type { PlatformTutorialData } from "./types";

export const bloombergGptTerminalAiTutorial: PlatformTutorialData = {
  slug: "bloomberg-gpt-terminal-ai-getting-started",
  platformSlug: "bloomberg-gpt-terminal-ai",
  title: "Getting Started with Bloomberg Terminal AI",
  tagline:
    "The AI built into Bloomberg's financial data workstation — and why the \"BloombergGPT\" you read about isn't something you can sign up for.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-12",
  accessTier: "FREE",

  howItWorks:
    "You sit down at a Bloomberg Terminal, type a short code into the box at the top of a panel, press the GO key, and a screen of financial data appears. Newer AI parts let you type a plain-English question instead and read back an answer with the Bloomberg documents it drew on, then ask a follow-up.",

  whatItIs: [
    "Two different things share one name here. BloombergGPT was a 50-billion-parameter **model** (the AI \"brain\" that does the actual thinking) that Bloomberg described in a research paper in March 2023. Bloomberg published the paper, not the model — there has never been a BloombergGPT website, app, sign-up page or download, and Bloomberg's own AI pages today do not mention it at all.",
    "What you can actually use is the AI built into the Bloomberg Terminal, Bloomberg's subscription workstation for finance professionals. As of September 2026 Bloomberg's AI page leads with ASKB, which it calls \"a new conversational AI interface\" and says is \"now in beta\". Bloomberg also describes it as coordinating **agents** (AI that takes actions on its own rather than only answering) to work through multi-step requests, alongside older features: AI summaries on news stories, AI search across filings, transcripts and analyst research, and AI-assisted company financials.",
    "Bloomberg says ASKB runs on \"multiple commercial and open weight\" models — a mix of outside models and publicly published ones — rather than on a single in-house Bloomberg model.",
  ],

  beforeYouStart: [
    "**The barrier here is the subscription, not the AI.** The Bloomberg Terminal is sold to firms and institutions through a sales conversation: Bloomberg publishes no price anywhere on its site, and every Terminal product page ends in \"Request a Demo\". There is no free tier, no trial button and no credit-card checkout. Annual figures in the tens of thousands of dollars per user circulate widely in the press and in software-procurement write-ups, but Bloomberg does not publish them, so treat any number you see — including that one — as an outside estimate rather than a price.",
    "There are three realistic ways to end up in front of one: your employer gives you a login; your university or school has a Bloomberg lab (Bloomberg runs a \"Bloomberg Terminal on Campus\" programme for universities and high schools, built around physical Terminals in a teaching facility); or you contact Bloomberg's sales team yourself. If none of those is true for you today, none of what follows is reachable yet — start somewhere free instead, like our Getting Started with ChatGPT page or the Finance & Real Estate category, and come back if a Terminal ever lands on your desk.",
    "Bloomberg labels ASKB \"now in beta\" and has not published which subscribers have it, in which regions, or whether it costs anything on top of a Terminal licence. The older AI pieces are described as ordinary Terminal features — Bloomberg announced AI-powered earnings-call summaries in January 2024 and AI-powered news summaries in January 2025. So if the question box isn't in your login, the likely reason is the beta, not anything you did wrong; ask whoever administers your Terminal.",
    "The AI sits on top of a system you still have to learn — the Terminal's own short-code navigation, confirmed with the GO key (Bloomberg's student guide teaches `DES` for a company description, `FA` for financial statements, `WEI` for world equity indices), which Bloomberg describes ASKB as complementing rather than replacing. If you want those basics before you sit down, Bloomberg publishes a self-paced course called Bloomberg Market Concepts; it doesn't state a price on that page.",
  ],

  security: [
    {
      kind: "text",
      text: "The privacy question here is the opposite of a consumer chatbot's, and it isn't about the AI. A Terminal licence belongs to one named person and to the firm that pays for it — Bloomberg says access \"requires biometric (i.e., fingerprint) and multiple-method authentication\" — so the account is identifiable, and it is not really yours.",
    },
    {
      kind: "list",
      label: "Three things that follow from that:",
      items: [
        "**Assume your firm can read what you type in the Terminal.** Bloomberg sells the product that does it: Bloomberg Vault captures \"email, chat, collaboration and voice such as Instant Bloomberg (IB), Bloomberg Message (MSG)\" and runs surveillance over the archive. If your employer licenses it, your Terminal messages are compliance records.",
        "**Don't share or borrow a login.** Bloomberg does sell shared licences that several people log into, which is how most university labs run — if you're on one of those, treat the machine as a public one, and anything you leave on screen as visible to whoever sits down next.",
        "**We could not establish what Bloomberg does with what you type into ASKB.** Its public AI pages don't say whether conversations are retained or used to improve the service, and its privacy notice is closed to automated readers, so we could not check it. Until you've seen it in writing, follow your firm's rules on putting client, deal or unpublished information into an AI tool — and if there are no rules yet, ask before you're the test case.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Questions about a specific public company — it is searching Bloomberg's own licensed store: filings, transcripts, Bloomberg News, sell-side and independent research from over 800 providers, plus in-house research from Bloomberg Intelligence, BloombergNEF and Bloomberg Economics.",
      "Showing its work. Bloomberg says ASKB answers come with \"transparent attribution to original research documents and news sources\".",
      "Reading a stack of long documents quickly, rather than one at a time.",
    ],
    okayAt: [
      "Being a general assistant. It is pointed at company and markets research; ordinary writing, coding and everyday questions are not what it's for.",
      "Being finished. Bloomberg calls ASKB a beta — a reason not to rebuild your week around it yet.",
    ],
    avoid: [
      "Justifying a Terminal with the AI. The AI sits on top of a data and news subscription; if you don't already need the data, nothing here is worth the entry price.",
      "Paying anyone for \"BloombergGPT access\" — a course, a reseller, an API key, a \"private endpoint\". Whatever is being sold, it isn't the thing named on the tin.",
      "Acting on a generated summary without opening what it cites. The attribution is there because a summary is a compression, and a compressed earnings call is exactly where the qualifier that mattered gets dropped.",
    ],
  },

  starterActions: [
    {
      title: "Ask a plain-English question about one company",
      prompt:
        "What were the main bullish and bearish takeaways from [Company]'s most recent earnings call, and how did guidance change from the prior quarter?",
      whyHere:
        "Swap test against AlphaSense, which also searches transcripts and broker research: the question is the same there. What differs is what the answer gets checked against — Bloomberg says its AI-assisted Company Financials lines reported numbers up against consensus estimates, and the consensus set on a Terminal is Bloomberg's own rather than a licensed third party's. You are paying for the estimates, not for the summarising.",
      tweak:
        "Run the identical question against a competitor's ticker; a like-for-like read is more useful than a single company's answer.",
    },
    {
      title: "Describe a piece of work, not just a question",
      prompt:
        "Prepare me for [Company]'s earnings next week: what consensus expects, what has changed since last quarter, and the three things analysts pushed management on last time.",
      whyHere:
        "Bloomberg's AI page names \"pre-earnings prep\" and \"post-earnings analysis\" as multi-step activities you can describe in one request. That is the mechanism worth learning here, because it collapses a dozen one-code-one-screen lookups into a single instruction.",
      tweak:
        "Add the constraint that matters to you — \"in bullet points\", \"only what changed\", \"assume I've read last quarter's release\" — before you ask it to go longer.",
    },
    {
      title: "Ask for a chart and keep the code underneath it",
      prompt:
        "Chart [Company]'s quarterly revenue and gross margin for the last five years, with the sector median alongside for comparison.",
      whyHere:
        "Koyfin will draw you that chart too, and for free. What it can't hand back is the query that produced it: Bloomberg says ASKB surfaces the underlying Bloomberg Query Language (BQL) code when it pulls data, which turns the chart from a picture you have to trust into a query you can read, correct and run again.",
      tweak:
        "If a number looks wrong, read the code rather than re-asking the question — it shows which field it actually pulled.",
    },
    {
      title: "Read the summary already sitting on a news story",
      whatItDoes:
        "Bloomberg News stories inside the Terminal carry an AI-generated summary at the top. Bloomberg launched this in January 2025 as AI-Powered News Summaries — \"three succinct bullet points at the top of Bloomberg News content\" — and now describes AI summaries drawn from more than 30,000 sources. You don't ask for it and there's no box to type into: it's there when you open the story, on the desktop Terminal and in the Bloomberg Professional mobile app.",
      whyHere:
        "It needs no new habit and no beta access, which makes it the honest place to start looking. Against AlphaSense, the difference is whose text is being compressed — this is Bloomberg's own newsroom copy summarised in the same window it was published in, not a third-party pass over other people's coverage.",
    },
    {
      title: "Put a stack of documents in front of it",
      whatItDoes:
        "Document Search covers \"hundreds of millions of documents, including company transcripts, sell-side research, news and proprietary Bloomberg content\". Document Workspace is the companion for going deeper on a set you've chosen: Bloomberg describes it as extracting structured insights from multiple documents at once and laying them out for comparison.",
      whyHere:
        "Doing this in the Terminal rather than uploading PDFs to a general chatbot changes who supplies the documents. Research from over 800 providers is already licensed and indexed here, so you are searching material you could not legally have assembled yourself.",
      tweak:
        "Start with two documents you already know well, so you can judge whether the comparison it produces is actually right before you rely on one you haven't read.",
    },
  ],

  pitfalls: [
    "Reading a blank answer as \"there's no data\". Bloomberg's AI features are named and scoped, while the Terminal itself has thousands of functions they don't reach. A question that draws a shrug may simply be outside what the AI covers rather than unanswerable on the Terminal.",
    "Judging the whole thing on the newest part. ASKB is the piece Bloomberg is still building; the news summaries and document search have been ordinary Terminal features for longer. If the conversational answers disappoint you, that tells you about the beta, not about the rest.",
  ],

  whereToNext: [
    { label: "Finance & Real Estate AI", categorySlug: "finance-real-estate-ai" },
    { label: "Research & Academic Tools", categorySlug: "research-academic-tools" },
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
  ],
};
