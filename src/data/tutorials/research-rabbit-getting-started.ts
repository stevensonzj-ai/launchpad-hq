import type { PlatformTutorialData } from "./types";

export const researchRabbitTutorial: PlatformTutorialData = {
  slug: "research-rabbit-getting-started",
  platformSlug: "research-rabbit",
  title: "Getting Started with ResearchRabbit",
  tagline:
    "Start from one paper you trust and let the citation trail lead you to the rest.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-15",
  changelogUrl: "https://www.researchrabbit.ai/releases",
  accessTier: "FREE",

  howItWorks:
    "You search for a paper you already trust and add it to your library. ResearchRabbit fans out from it, showing related papers as a list beside a map of dots and connecting lines. You skim, keep the ones worth keeping, and search again from the bigger set — each round widens the net.",

  whatItIs: [
    "ResearchRabbit is a discovery tool for academic literature. You give it a few papers you already know are relevant, and it recommends more by following **citations** (the earlier work a paper refers to, and the later work that refers back to it) across a database it currently describes as more than 310 million articles — a figure that has moved upward since its 2025 relaunch, so treat it as approximate.",
    "It is not a chatbot. There is no box to ask a question in, and it does not summarise papers or write anything for you — the vendor's help centre says ResearchRabbit \"does not use large language models to power its core recommendation algorithms.\" What it does instead is arithmetic on a citation network.",
    "Since May 2025 it has been owned by Litmaps, the New Zealand company behind the literature-mapping tool of the same name; ResearchRabbit's own site now carries a \"© 2026 Litmap Ltd\" footer. The product was rebuilt and relaunched in October 2025, and its paid tier arrived with that relaunch.",
  ],

  beforeYouStart: [
    "Free to use after a sign-up at researchrabbit.ai — no card required. The pricing page currently lists the free plan as \"$0, Forever,\" and the help centre explains the arrangement in the vendor's own words: \"We're able to offer the Free Tier thanks to the income we receive from subscribers to ResearchRabbit+.\" That is the company's own current wording for its commitment, not a guarantee anyone else is making — it is funded by paying users rather than by advertising.",
    "**The free-tier ceiling that will actually stop you is 50 seed articles** — seed articles being the papers you hand the tool to search out from. Fifty is generous for finding your way into a topic and tight for a full systematic review. ResearchRabbit+ (currently around $10 a month billed annually, or $12.50 month to month, with discount codes offered for 100-plus countries, so what you pay may differ) raises that to 300 and adds advanced search filters, multiple projects and alerts. The free plan is also reported to cap you at a single project and a small number of authors per search, but the pricing table spells out only the 50-article limit, so treat the other two as likely rather than confirmed.",
    "Bring one paper you already trust — a title, or the link to it. The tool is only as good as what you seed it with, and starting from a bare keyword gives it far less to work from than starting from a paper.",
    "It only knows what its sources know. By the vendor's own account the catalogue comes from Semantic Scholar, Crossref and OpenAlex, reached through parent company Litmaps; a university library evaluation names a slightly different set and says the provenance of further sources is unclear. Either way it is strong on journal articles and conference papers, and thin on books, theses, government reports and other work that was never indexed as a journal article.",
  ],

  security: [
    {
      kind: "text",
      text: "ResearchRabbit sits at the gentler end of the AI-privacy spectrum, and for a structural reason rather than a promise: you are not pasting text into it. What it holds is a record of which published papers you saved, how you grouped them, and any notes you wrote — not your manuscript, not your data, not your unpublished work.",
    },
    {
      kind: "list",
      label: "What it does hold about you",
      items: [
        "Your account email, and the papers in your library and collections",
        "Your notes, labels and colours — yours to write, but stored on their servers",
        "Whatever you imported from Zotero: the reference records, not the attached PDFs",
        "Any collection you share by link — a public link means exactly that, anyone holding it can read the collection",
      ],
    },
    {
      kind: "text",
      text: "Two honest caveats. Your collection is a map of what you are working on, which is more revealing than it first looks; if the topic itself is confidential, keep it out of a shared collection. And we could not read ResearchRabbit's current privacy policy or terms — both are served through an embedded viewer that needs a live browser — so we cannot tell you their effective date or what they say about sharing your data, and whether your library or your activity feeds the recommendation models is not something we could confirm from its public pages either. The help centre states only that large language models do not power the core recommendations. Read the policy yourself at researchrabbit.ai before you put anything sensitive in.",
    },
  ],

  triad: {
    bestAt: [
      "Finding papers a keyword search misses, by following citations outward from one you already have",
      "Getting oriented in an unfamiliar field quickly — the map shows which papers everything else hangs off",
      "Working backwards from a recent paper to the foundational ones it rests on",
      "Keeping a growing reading list organised in collections and subcollections, with notes and colour labels",
      "Handing a reading list to a supervisor or co-author as a shared link",
    ],
    okayAt: [
      "Starting from keywords alone — it will do it, but it is built to start from papers",
      "Author-based discovery — a route through authors exists, though a reviewer who tested the rebuilt tool rated it the least useful of the recommendation types",
      "Telling you whether a paper is any good — it shows you how connected a paper is, which is not the same thing as how sound it is",
    ],
    avoid: [
      "Systematic reviews that need a reproducible, documented search. A university library evaluation found results can differ depending on whether you search by title or by identifier, and that you cannot search across all its underlying sources at once — both are problems for a method section you have to defend.",
      "The map's vertical axis is not a quality ranking. It plots citation count, which is partly just an age effect: old and fashionable papers ride high, and a strong 2026 paper sits at the bottom because nobody has had time to cite it.",
      "Using it as your only search. Following citations works outward from what is already connected, so a genuinely isolated or brand-new paper is precisely the kind it will not surface.",
    ],
  },

  starterActions: [
    {
      title: "Seed it with one paper you already trust",
      whatItDoes:
        "Search for a paper by its exact title, add it to your library, and run a search from it. You get a list of recommendations down one side and a map beside it, where the horizontal axis is time, oldest to newest, and the vertical axis is how heavily a paper has been cited. Your own papers show as filled dots; recommendations show as hollow ones.",
      whyHere:
        "Connected Papers builds one graph per origin paper and hands it to you finished. ResearchRabbit instead keeps your seeds in a library you keep adding to, and re-runs the recommendations against the whole growing set — so the first seed you pick shapes every round after it, in a way it does not in a tool where you simply generate another graph.",
      tweak:
        "Add two or three seeds rather than one. The recommendations tighten noticeably once the tool can see what your papers have in common.",
    },
    {
      title: "Walk backwards, then forwards, from the same paper",
      whatItDoes:
        "With a paper selected, switch between **Earlier Work** and **Later Work**. Earlier Work is that paper's own reference list — what it was built on. Later Work is everything published since that cites it. One paper, two opposite directions in time.",
      whyHere:
        "The ranking behind these two views is arithmetic, not taste: the vendor's help centre says recommendations are calculated from the most influential articles in the local citation network, \"where influence comes from both the number and quality of citations.\" That makes a well-cited older paper's Later Work the fastest honest way to find out whether its conclusion actually survived — something a similarity-based map like Connected Papers, which does not separate direction at all, cannot tell you.",
      tweak:
        "An empty Later Work usually means the paper is too recent to have been cited yet, not that it was ignored.",
    },
    {
      title: "Use Similar Work when the citation trail goes cold",
      whatItDoes:
        "Switch to **Similar Work**. Unlike Earlier and Later Work, this view does not appear to follow citations at all — a reviewer who examined the rebuilt tool describes it as matching papers on their title and abstract, though the vendor does not spell out the method. Either way it can reach work in a neighbouring field that never cited yours and never will.",
      whyHere:
        "Knowing which of the three views follows citations and which does not is the difference between using ResearchRabbit and clicking around it. Litmaps and Connected Papers both fold similarity into a single blended score; ResearchRabbit keeps the routes on separate buttons and makes you pick one — more work, and more control over what you are actually asking for.",
      tweak:
        "If Earlier and Later Work keep returning the same clique of papers, that is the signal to switch to Similar Work.",
    },
    {
      title: "Pull your Zotero library in",
      whatItDoes:
        "Under Profile, then Account Settings, then Preferences, link your Zotero account — it uses a one-time permission screen rather than a key you copy. Then use the Zotero button on the Library page to choose a Zotero collection, pick which articles come across, and say which ResearchRabbit collection they land in. It is a manual import you re-run when you want it, not a live sync, and it runs one way. To get papers back out to Zotero you export a citation file from ResearchRabbit and import it on the Zotero side.",
      whyHere:
        "The vendor says a two-way sync is in development and has not given a shipping date; until it ships, whichever side you last edited is the side that is correct, and nothing tells you which that was.",
      tweak:
        "Import one narrow Zotero collection rather than your whole library — the help centre warns that large Zotero libraries take a while to load.",
    },
    {
      title: "Save a collection and share the link",
      whatItDoes:
        "Group what you have found into a collection, then share it, either with named collaborators or as a public link. Collections and subcollections, notes, stickers and colour labels are all on the free plan, and the pricing page puts no cap on how many you make.",
      whyHere:
        "Someone opening your shared ResearchRabbit collection sees not just the list but the route — which papers you seeded and what came back. That is a different artefact from emailing a bibliography, and unlike the 50-seed search ceiling, it is the part of the product the free plan does not meter at all.",
    },
  ],

  pitfalls: [
    "Seeding with a review article floods you. Reviews cite hundreds of papers, so Earlier Work comes back enormous and undifferentiated. Seed with primary research papers and let the reviews surface as recommendations instead.",
    "It is very easy to keep exploring and never start reading. Every paper opens three more routes, and the design rewards that. Decide how many rounds you will do before you open it.",
    "The catalogue lags publication. A paper that came out last month may not be in there yet, and the citations to it certainly will not be — so recency is the one thing you should not trust it on.",
    "A paper appearing in the map is not a paper you can read. ResearchRabbit surfaces the record; it does not tell you whether the full text is open, paywalled, or behind a subscription your institution lacks.",
    "\"Recently Found\" is a holding pen, not a collection. Saved papers land there by default, and if you never move them into real collections you end up with one long undifferentiated list — which defeats the organising that is half of what the tool is for.",
  ],

  whereToNext: [
    { label: "More research tools", categorySlug: "research-academic-tools" },
    { label: "Working with PDFs", categorySlug: "document-pdf-processing" },
    { label: "AI chatbots", categorySlug: "text-conversational-ai" },
  ],
};
