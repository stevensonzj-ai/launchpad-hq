import type { PlatformTutorialData } from "./types";

export const litmapsTutorial: PlatformTutorialData = {
  slug: "litmaps-getting-started",
  platformSlug: "litmaps",
  title: "Getting Started with Litmaps",
  tagline:
    "Start from one paper you trust and let the citations draw you a map of the field.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-15",
  accessTier: "FREE",

  howItWorks:
    "You search for one paper you already trust, select it, and click Explore Related Articles. Litmaps draws a map of dots — papers — joined by lines showing which cites which. You click promising dots to add them, refresh, and the map redraws around your growing set.",

  whatItIs: [
    "Litmaps is a citation-mapping tool for academic literature, not a chatbot. You hand it papers you already have, and it shows you what they cite, what cites them, and what sits nearby in the web of references.",
    "It draws on a catalogue Litmaps puts at over 270 million articles, assembled from Crossref, Semantic Scholar and OpenAlex — which between them cover PubMed, arXiv, bioRxiv and medRxiv — and refreshed weekly.",
    "It is one of three tools beginners usually weigh against each other. Connected Papers builds one fixed graph around one origin paper and caps free accounts at five graphs a month. ResearchRabbit is closest in spirit — a collection you keep growing, with alerts — and its free tier allows up to 50 starting papers. Litmaps sits between them: a map you keep, re-run and re-sort, with emailed alerts, but on a tighter free allowance than ResearchRabbit's.",
    "Two of those three are now related. Litmaps acquired ResearchRabbit in May 2025, and ResearchRabbit's own site describes its paid tier as powered by Litmaps' technology. They still run as separate products with separate accounts today, so choosing one does not get you the other — though with the two converging, that split may not stay where it is.",
  ],

  beforeYouStart: [
    "A free account gets you in at app.litmaps.com — email sign-up, no card. That is the whole barrier; there is nothing to install.",
    "**The free tier is small, and its shape is the thing to understand before you start building.** Each map is capped at 100 articles, a search will take up to 20 articles as inputs, and you get basic search only — filtering by publication date, author, journal or journal ranking is a paid feature. Litmaps' own pages disagree on how many maps you get: the main plan card on its pricing page and its help centre both say two, while a second comparison table lower on that same page says one. Plan for one map until you can see your own account.",
    "Paying is per person and priced by country, so the figure you are quoted may be lower than these advertised list rates. Litmaps Pro currently advertises around $10 a month billed annually — $120 a year — on the education rate, which requires an academic email address, or around $12.50 billed monthly. The commercial rate is currently around $40 a month billed annually ($480 a year), or $50 monthly.",
    "You need a starting paper. Litmaps works outward from something you already hold — a title you can search for, or an article from a reading list — so it is the wrong tool for the very first hour on a brand-new topic, when you have nothing to seed it with.",
  ],

  security: [
    {
      kind: "text",
      text: "Litmaps only ever receives the titles of published papers, never your own writing. That makes its privacy policy, rather than its handling of anything you create, the document worth reading — and Litmaps' is unusually clear.",
    },
    {
      kind: "list",
      label: "What the policy actually says",
      items: [
        "Litmaps is run from New Zealand, and its privacy policy — last modified 23 June 2026, and the version in force today — commits to both the New Zealand Privacy Act 2020 and GDPR (European privacy law governing what companies may do with your data)",
        "It states plainly: \"We do not sell your personal data\"",
        "It names the outside companies that handle your data on its behalf — hosting, email, analytics, support, payments — on a public page, rather than leaving them unlisted",
        "It offers the standard rights: see your data, delete it, object to its use, take it elsewhere",
      ],
    },
    {
      kind: "text",
      text: "Two gaps worth naming rather than glossing over. The privacy policy says nothing either way about whether your saved articles and searches are used to improve Litmaps' own systems, so treat that as unanswered rather than settled. And the terms and conditions carry a last-modified date of 10 June 2024 — two years older than the privacy policy — so the two documents are plainly not revised together.",
    },
  ],

  triad: {
    bestAt: [
      "Working outward from a paper you already trust — the \"I have one good reference, what else is out there\" problem",
      "Seeing the shape of a field at a glance: which papers everything else hangs off, and roughly when the work happened",
      "Spotting the gap between two clusters of papers that barely cite each other",
      "Keeping a map alive so new work comes to you by email instead of you going back to look",
    ],
    okayAt: [
      "Judging quality — it surfaces citation counts and journal rankings; it does not read the papers for you",
      "Being your reference manager — it is a discovery layer, not a place to keep PDFs and reading notes",
    ],
    avoid: [
      "Fields whose literature lives in books, reports or venues that publishers don't index openly. Litmaps says it is \"legally only able to index Open Access metadata\" — the descriptive record a publisher releases about an article — so anything without one is simply absent from the map, and nothing on the map tells you it is missing.",
      "Counting on it for group work on the plans a beginner will meet. Litmaps' pricing table lists collaboration as \"None\" on both Free and Pro — team-wide collaboration sits on the Team plan, which is sales-priced with no figure published.",
    ],
  },

  starterActions: [
    {
      title: "Seed a map from one paper you trust",
      whatItDoes:
        "Type the paper's title into the Litmaps search bar and hit enter, select it in the results, and click **Explore Related Articles**. Your starting article shows up as a dark dot; suggested articles appear as white ones, joined by lines that stand for citations.",
      whyHere:
        "Litmaps builds outward from a seed you nominate rather than from a query, and a free account has very few maps to spend — so unlike ResearchRabbit's roomier free tier, a poorly chosen first paper costs you most of what you get.",
      tweak:
        "If your starting paper is very recent, try an older well-cited paper on the same topic instead — it has more citation links for the map to follow.",
    },
    {
      title: "Grow the map instead of starting over",
      whatItDoes:
        "On any white dot that looks relevant, click **More Like This** to save it into your map, then re-run the search. The papers you just added become inputs too, so the next round of suggestions is drawn from your whole collection rather than the single paper you began with.",
      whyHere:
        "Litmaps redraws the map each round, so the shape of the field visibly changes as you add to it — where ResearchRabbit's equivalent grows the collection without showing you that movement.",
      tweak:
        "Tag papers as you save them — tags are what an export or a Zotero sync works from later.",
    },
    {
      title: "Change what the axes mean",
      whatItDoes:
        "Open a map's axis controls and set X and Y to any of Citation Count, Reference Count, Publication Date, Momentum or Map Connectivity. The same papers rearrange themselves — date against citations surfaces the old landmarks, connectivity surfaces the hubs.",
      whyHere:
        "Re-sortable axes are the thing a Litmap does that a fixed similarity graph cannot. Connected Papers positions its circles by similarity and you cannot re-sort them, so \"which of these is actually central\" is a question only a map with adjustable axes can answer.",
      tweak:
        "Momentum is worth trying in a fast-moving field — though Litmaps' help page lists the axis options without defining them, so check what it measures in the app before you read much into it.",
    },
    {
      title: "Turn a map into a standing alert",
      whatItDoes:
        "Save the map and switch on Monitor. Litmaps then emails you when newly published articles connect to the papers you have collected. Every account can use it, including free ones — but only paid accounts can change the settings. A free account runs on Litmaps' own default and, per the pricing table, gets a monthly summary.",
      whyHere:
        "Monitor re-runs against the articles in your map rather than against a phrase, so a new paper reaches you because it cites what you collected, not because it matched your keywords. Connected Papers builds its graph once and has nothing to switch on.",
      tweak:
        "A monthly digest being too slow for your field is the clearest single reason to consider Pro. Don't count on a particular frequency: the two tables on Litmaps' own pricing page disagree — one says weekly, the other daily — and its Monitor help page offers only weekly or monthly.",
    },
    {
      title: "Get your papers back out",
      whatItDoes:
        "Export the articles you have collected as BibTeX (the format most reference managers read), RIS (for EndNote) or CSV. Litmaps' help page describes export without naming any plan restriction, so it appears to be open to free accounts — though the pricing table does not list export either way, so that is a silence rather than a guarantee.",
      whyHere:
        "The live two-way Zotero sync — where a tag in Litmaps mirrors a collection in Zotero, a popular free reference manager — is documented as a Pro feature, so on a free account the export file is the way your papers leave.",
    },
  ],

  pitfalls: [
    "The map shows citation links, not relevance. A heavily cited paper sits prominently whether or not it answers your question, and the perfect-fit paper with three citations barely registers.",
    "Suggestions come from what your current papers cite and are cited by, so a narrow start gives you a narrow map. If everything it surfaces looks the same, add a paper from a different corner of the topic and refresh, rather than clicking deeper into the cluster you already have.",
    "Brand-new papers are what a citation map is worst at. Citation links accumulate only after publication, and Litmaps notes a delay before new articles connect up — keep an ordinary keyword alert running somewhere else for this week's work.",
    "Cancelling a paid plan does not delete your work, but Litmaps' help centre is clear that your access drops back to the free limits — so maps beyond that allowance stop being available to you, even though the data is still there.",
    "Two dots sitting close together are not necessarily related. Position comes entirely from whichever axes are currently set, so a layout you changed ten minutes ago is telling you something different from the one you started with.",
  ],

  whereToNext: [
    { label: "More research tools", categorySlug: "research-academic-tools" },
    { label: "Document & PDF tools", categorySlug: "document-pdf-processing" },
    { label: "AI chatbots", categorySlug: "text-conversational-ai" },
  ],
};
