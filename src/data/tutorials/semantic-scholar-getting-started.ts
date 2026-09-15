import type { PlatformTutorialData } from "./types";

export const semanticScholarTutorial: PlatformTutorialData = {
  slug: "semantic-scholar-getting-started",
  platformSlug: "semantic-scholar",
  title: "Getting Started with Semantic Scholar",
  tagline:
    "A free, non-profit academic search engine — with AI features that cover far less than the search does.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-15",
  accessTier: "FREE",

  howItWorks:
    "You type a research topic or a paper title into a search box and get a ranked list of papers. Open one and you see its summary, who cited it, and what it cited. Follow those links outward, save what matters, and the connections between papers become the thing you are actually browsing.",

  whatItIs: [
    "Semantic Scholar is a free academic search engine run by Ai2, the Seattle non-profit AI research institute founded in 2014 by the late Microsoft co-founder Paul Allen. Semantic Scholar itself launched in 2015.",
    "Its index spans all fields of science, assembled from partnerships with 50-plus publishers and scholarly societies, from data providers such as PubMed, arXiv and Springer Nature, and from papers found on the open web.",
    "The AI in it is not a chatbot. It ranks results by meaning rather than exact keyword matches, writes one-sentence paper summaries, classifies why one paper cited another, and recommends new papers based on what you save.",
    "It is mature rather than fast-moving. Its own release-notes page carries no entry newer than early 2024 — and the dates on that page are internally inconsistent, so read that as approximate rather than exact — while Ai2's newer research-agent work went into a separate product, Asta, launched in August 2025 and built on Semantic Scholar's own data. Nothing public says whether Ai2 intends to keep developing both. There is no shutdown notice and the service runs normally, so the honest position is that Semantic Scholar is stable and well-maintained rather than actively growing.",
  ],

  beforeYouStart: [
    "Nothing here costs money and nothing is being sold to you. Ai2 is a non-profit, and Semantic Scholar has no paid tier, no credits and no card field anywhere — so the will-I-need-to-pay question has a one-word answer, which is no. The funding comes from Ai2 rather than from you, and Ai2 in turn is funded as a research institute: in August 2025 the US National Science Foundation and NVIDIA awarded it $152 million jointly for open AI infrastructure for science.",
    "You can search, open papers and read summaries without signing in at all. A free account — email, Google, or your institution — adds three things: saved library folders, email alerts, and the research feed. If your university subscribes to journals, signing in through your institution (Semantic Scholar uses OpenAthens for this) also surfaces full text you already have access to.",
    "**The AI extras cover far less of the index than the search does.** The one-sentence summaries Semantic Scholar calls TLDRs are currently limited to computer science and biomedical papers; topic pages to computer science; and Semantic Reader, its in-browser paper reader, to papers from arXiv (a free site where physics, maths and computer-science papers are posted, often before formal publication). Search everything; expect the extras on a slice of it.",
    "**Ask This Paper** — the one place on the site where you type a question instead of keywords — is documented by Semantic Scholar in its FAQ and its December 2023 release notes, but paper pages block automated visits, so this page cannot confirm the box still renders. Semantic Scholar also describes it as tested only on English-language papers and available on a limited set of them. Treat it as something to look for on the paper you open rather than something guaranteed to be there.",
  ],

  security: [
    {
      kind: "text",
      text: "This is one of the least worrying tools on this site. Ai2 is a non-profit, there is no card on file, and Semantic Scholar's FAQ states it does not collect sign-in information such as your username or password — accounts are handled by Google, by your institution, or by a reset link. Ai2's privacy policy, last updated 19 February 2025, is the document that governs.",
    },
    {
      kind: "text",
      text: "The disclosure worth knowing is that two features send text to a third party. Semantic Scholar's FAQ says Ask This Paper queries OpenAI's API with the paper's content alongside your question, and that the on-click term definitions in Semantic Reader ask ChatGPT. The specific model named on that FAQ page looks out of date, so the durable fact is that your question leaves Ai2 for OpenAI rather than anything about which system answers it. Those are the two places it happens and nowhere else on the site.",
    },
    {
      kind: "list",
      label: "Two things to know about your own trail here",
      items: [
        "Author pages are built from publicly listed paper details whether or not you ever create an account — yours may already exist.",
        "The research feed is trained on what you save, so your library folders are a standing record of your interests held on Ai2's servers.",
      ],
    },
    {
      kind: "text",
      text: "Reading here exposes far less than pasting an unpublished manuscript into a chatbot. The papers and the citations between them are already public; that is the whole premise of the site.",
    },
  ],

  triad: {
    bestAt: [
      "Following a citation trail in both directions — forward to who cited a paper, backward to what it cited",
      "Finding the paper you half-remember from a fragment of its title",
      "Judging whether a paper mattered, using citation counts and its \"highly influential citations\" flag",
      "Standing up a recurring email alert on an author, a paper or a topic",
    ],
    okayAt: [
      "Precise lookups — it ranks by meaning, which helps when you don't know the right keywords and gets in the way when you know the exact phrase you want",
      "The newest papers, where indexing and paper details catch up after publication",
    ],
    avoid: [
      "Systematic-review-grade searching. Semantic Scholar's FAQ states its search supports quoted phrases but not the `AND`/`OR`/wildcard syntax (it calls these boolean operators and wildcards) that a reproducible search strategy is written in.",
      "Any literature that lives in books. The same FAQ says book coverage is very limited and patents are not included, so a search here under-represents fields that publish as monographs rather than as journal articles. Semantic Scholar publishes no figure for how completely arts, humanities and law are represented either way, so run one search here against a subject database you already trust before relying on it for those.",
      "Reusing data pulled through the free API commercially without reading the licence. Ai2's API License Agreement, last updated 17 May 2023 and in force today, says the underlying data carries its own licences such as CC BY-NC, which excludes commercial use.",
    ],
  },

  starterActions: [
    {
      title: "Ask one paper a question in its own words",
      prompt:
        "What are the key results of this paper, and what did the authors say their method could not do?",
      whyHere:
        "Unlike Elicit, which answers from a pile of papers at once, this is scoped to the single paper on screen and returns supporting sentences lifted from that paper's own text — so the answer arrives with the evidence for checking it attached.",
      tweak:
        "Semantic Scholar offers starter questions like \"What is the baseline condition?\" — try one of those first to see the shape of a question it handles well.",
    },
    {
      title: "Walk the citation graph both ways",
      whatItDoes:
        "Open any paper and move between its references — what it cited — and its citations — who cited it. Then filter the citing papers by whether Semantic Scholar classified the citation as background, method, or result extension.",
      whyHere:
        "Google Scholar will tell you a paper was cited 4,000 times and stop there. Semantic Scholar labels the intent behind each citation, so you can skip the 3,900 that mention it in passing and go to the ones that built on the method.",
      tweak:
        "Sort the citing papers by most influential to find where this paper was central rather than a footnote.",
    },
    {
      title: "Teach the research feed in one sitting",
      whatItDoes:
        "Save five papers you consider relevant into a single library folder, mark three suggestions \"not relevant\" in the feed for that folder, and toggle the research feed on.",
      whyHere:
        "Those numbers are Semantic Scholar's own stated minimum for its recommender — five positive signals, three negative — and its recommendations are drawn only from papers published in the last three months, which makes the feed a current-awareness tool rather than a search.",
      tweak:
        "Come back tomorrow. A newly created feed produces nothing on the day you make it, and refreshes daily after that.",
    },
    {
      title: "Read an arXiv paper in Semantic Reader",
      whatItDoes:
        "Open a paper hosted on arXiv and choose Semantic Reader instead of the plain PDF. Citations become cards you open in place instead of scrolling to the reference list, and terms with a dotted underline expand into a definition.",
      whyHere:
        "Semantic Reader is reading the same citation index as the search engine rather than only the file in front of it, so a cited paper's own one-sentence summary appears in the margin without you leaving the page.",
      tweak:
        "The skimming highlights — AI-drawn Goal, Method and Result overlays — are available on most English-language arXiv computer science papers, on desktop only.",
    },
    {
      title: "Notice what else is running on this data",
      whatItDoes:
        "Connected Papers, Litmaps and a number of other research tools are built on Semantic Scholar's **API** (a way for programs to talk to each other without a person clicking). Most of its endpoints answer without any key, and a key is free on request.",
      whyHere:
        "Scopus and Web of Science sell access to exactly this kind of data; Ai2 gives it away, which is why Semantic Scholar turns up under other products' hoods rather than only at its own address.",
      tweak:
        "If you are not building anything, the useful takeaway is that several tools you already use are reading this same index — and inherit its gaps.",
    },
  ],

  pitfalls: [
    "**The size of the index depends which page you read.** The search bar currently says about 238 million papers, the API overview still says 214 million, and the About page says \"over 200 million\". Treat any single figure as approximate.",
    "**Indexed does not mean readable.** Semantic Scholar links out to publishers. If a paper is paywalled you may land on a page asking you to buy it, and for some entries there is no link at all — just the title and its details.",
    "**The generated text is wrong in quiet ways.** Semantic Scholar's own FAQ warns that errors in its AI-generated features will mostly be subtle rather than obvious. Read the abstract before you cite the summary.",
    "**Author pages assemble themselves.** Papers get attached to the wrong person and one researcher can end up split across several pages. Claiming your page is how that gets fixed.",
    "**Its metrics are not the same as anyone else's.** Citation counts here differ from other sites because the index differs, and Semantic Scholar explicitly says its h-index should be treated as a single indicator and not used for comparative analysis or research assessment.",
  ],

  whereToNext: [
    { label: "Other research and academic tools", categorySlug: "research-academic-tools" },
    { label: "Working with PDFs and documents", categorySlug: "document-pdf-processing" },
    { label: "AI chatbots for general questions", categorySlug: "text-conversational-ai" },
  ],
};
