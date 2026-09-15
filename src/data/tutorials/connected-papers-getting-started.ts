import type { PlatformTutorialData } from "./types";

export const connectedPapersTutorial: PlatformTutorialData = {
  slug: "connected-papers-getting-started",
  platformSlug: "connected-papers",
  title: "Getting Started with Connected Papers",
  tagline:
    "Turn one paper you already have into a visual map of the field around it.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-15",
  accessTier: "FREE",

  howItWorks:
    "You paste a paper's title or web link into the search box on the homepage and press enter. After a few seconds a page of circles appears, each one a related paper. You drag and zoom around it, click any circle to read that paper's summary, and start a new map from anything you find.",

  whatItIs: [
    "Connected Papers is a visual map-maker for academic literature. You give it one paper you already care about, and it draws you the cluster of papers around it.",
    "It is not a chatbot and it does not summarise anything for you — there is no message box. The only thing you type is a paper's title, its web address, or its **DOI** (the permanent ID code printed on most published papers).",
    "What it is genuinely good at is the problem of not knowing what you don't know: you have one paper, and no idea which forty others a reviewer would expect you to have read.",
  ],

  beforeYouStart: [
    "You need one paper to start from. Connected Papers has no browse mode and no topic search — type a subject like `machine learning` and it will look for a paper with that phrase in its title, not a field to explore. Find one paper first, anywhere, then come here.",
    "**Log in before you start clicking.** Without an account you get 2 graphs a month; a free account raises that to 5. The counter runs on the calendar month and resets on the 1st, and it counts distinct starting papers — reopening a map you already built shouldn't cost you another one, and the three example graphs on the homepage are free.",
    "Paying is an unusually small decision here. The Academic plan — which covers students, university researchers, non-profits and personal use — is currently around $72 a year in the US, or $30 if you pay quarterly; there is no month-to-month option. Prices are set per country, so yours may differ. Most people never need it: five maps a month is a lot of maps.",
    "If you are on a university network, look at the top of the homepage before you pay anything. Connected Papers grants premium access by institutional IP address, and says it shows a line naming the institution providing it when that applies. There is also a scholarship program at `scholarships@connectedpapers.com` for researchers who genuinely cannot afford a subscription.",
  ],

  security: [
    {
      kind: "text",
      text: "This is one of the lowest-risk tools on this site. You are not uploading documents or pasting private text — you type the name of a paper that is already published, which is public information. Nothing you write is read by a model.",
    },
    {
      kind: "list",
      label: "What it does keep",
      items: [
        "Your username, email address and password, if you make an account",
        "The papers you add to your Saved Papers list",
        "Your graph history — which papers you have started maps from",
      ],
    },
    {
      kind: "text",
      text: "Connected Papers says it stores this in Microsoft Azure, sends no marketing messages, does not share your details with third parties for marketing, and gives you the standard European data rights — access, correction, deletion, restriction, objection and portability. Its terms of service are dated 2023-02-21; the privacy policy shows no revision date at all, so read both as the version being served today rather than one that was recently reviewed.",
    },
  ],

  triad: {
    bestAt: [
      "Finding the papers around a paper you already have — the ones that draw on the same sources it does",
      "Reading a field's shape at a glance",
      "Checking a reading list you already have for holes, before you commit to it",
    ],
    okayAt: [
      "Handing you the paper itself — the map links out to arXiv, PubMed, DOI pages and PDFs where they exist, but Connected Papers hosts none of them",
      "Fields where the underlying database has parsed fewer references; the map can only be as complete as what Semantic Scholar has indexed",
    ],
    avoid: [
      "Using a graph as your evidence that you've covered the literature. The placement is a guess computed from overlapping citations, not a search of what has been written, and the vendor's own terms of service disclaim any warranty as to the accuracy or reliability of the material.",
      "Starting from a paper with few references or few citations. Connected Papers will refuse outright with `Not enough citations and references to build a graph` — and a paper just over that line tends to produce a thin map that still looks as confident as a dense one.",
      "Assuming a paper missing from the map isn't relevant — anything the database failed to parse never appears at all, and the picture looks equally full either way.",
    ],
  },

  starterActions: [
    {
      title: "Spend your first graph on a paper you know well",
      whatItDoes:
        "Don't start with the paper you're unsure about. Paste in a paper you have already read and could argue about, and look hard at what comes back. You will be able to tell straight away whether the map is placing things sensibly.",
      whyHere:
        "Circle size here is a citation count and circle colour is a publication year — two fixed encodings you have to learn to read, and the only way to learn them is on papers whose vintage and standing you already know.",
      tweak:
        "If the result looks wrong rather than unfamiliar, check you clicked the right paper in the autocomplete list — two papers can share a title.",
    },
    {
      title: "Read the Prior Works list before you read the graph",
      whatItDoes:
        "Open the Prior Works tab. It lists the papers most often cited *by* the papers on your map, which in practice means the foundational work everyone in that corner of the field builds on. Click one and the map highlights every paper on it that cites that work. The list can be downloaded if you want it out of the browser.",
      whyHere:
        "Prior Works is computed from the graph you just built rather than from a global citation count, so it surfaces what is foundational for this specific cluster — not what is famous overall, which is what a Google Scholar 'cited by' number gives you.",
    },
    {
      title: "Use Derivative Works to find the review you should have read first",
      whatItDoes:
        "Open the Derivative Works tab. It lists papers that cite many of the papers on your map at once, which usually means either a review of the whole field or recent work at its edge. If you are new to the topic, one good review here saves you a week of reading.",
      whyHere:
        "Because it ranks on how many of your graph's papers a later work cites, it reaches field-level reviews that a keyword search for 'review' or 'survey' will miss — the useful ones frequently don't say so in the title.",
    },
    {
      title: "Build a second graph from the best paper the first one found",
      whatItDoes:
        "Pick the paper on your map that you most wish you had known about, and start a fresh graph from it. Where the two maps overlap, you have found the papers you can be most confident actually matter to your question.",
      whyHere:
        "Each graph is anchored to its starting paper and recomputed from scratch rather than filtered, so moving the starting paper produces a genuinely different map — and the overlap between two of them is information no single graph contains.",
      tweak:
        "Connected Papers also builds multi-origin graphs from several papers at once, on every plan including free, if you would rather combine than compare.",
    },
    {
      title: "Check the build date before you trust a graph someone sent you",
      whatItDoes:
        "Every graph carries the date it was built, with a Graph History panel listing earlier versions of it. If someone shares a Connected Papers link with you, look at that date first. If the site offers you a rebuilt version, take it — the database behind the map moves, and so do the citation counts that set circle sizes.",
      whyHere:
        "Graphs here are saved objects with their own URLs and version histories rather than live queries. That is what makes them shareable, and it is also why a stale one looks exactly as authoritative as a fresh one.",
    },
  ],

  pitfalls: [
    "It looks like a citation tree and is not one. A strong line between two circles does not mean one cited the other — it means they draw on many of the same sources, or that many of the same later papers cite both. Connected Papers says this outright on its about page; the picture says otherwise, and the picture usually wins.",
    "Very recent work barely shows up. A **preprint** (a paper posted publicly before peer review) from last month has almost no citations yet, so the arithmetic that places papers on the map has nothing to work with. The newest thing on your map is usually months or years old.",
    "The citation counts come from Connected Papers' own source database and will not match the number Google Scholar shows for the same paper. Circle size is built on those numbers, so a paper can look smaller on the map than its reputation.",
    "The picture is the easy part; the lists are where the work happens. List view sits alongside the graph, and people who only ever look at the picture get far less out of the tool than people who read the tables.",
  ],

  whereToNext: [
    { label: "Research tools", categorySlug: "research-academic-tools" },
    { label: "Document and PDF tools", categorySlug: "document-pdf-processing" },
    { label: "AI chatbots", categorySlug: "text-conversational-ai" },
  ],
};
