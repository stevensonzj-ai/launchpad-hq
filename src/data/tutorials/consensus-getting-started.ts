import type { PlatformTutorialData } from "./types";

export const consensusTutorial: PlatformTutorialData = {
  slug: "consensus-getting-started",
  platformSlug: "consensus",
  title: "Getting Started with Consensus",
  tagline:
    "Ask a research question in plain English and get an answer built only from published papers — including the catch buried in the word \"published.\"",
  archetype: "prompts",
  lastReviewedAt: "2026-09-15",
  changelogUrl:
    "https://help.consensus.app/en/articles/11954907-consensus-product-changelog",
  accessTier: "FREE",

  howItWorks:
    "You type a research question into one search box in plain English, the way you'd ask a colleague. You get back a written answer with a citation attached to each claim and the papers listed underneath. Hover or click a citation to see the passage it came from, then ask a follow-up to narrow it.",

  whatItIs: [
    "Consensus is a search engine for published science. It answers a question by finding papers and quoting them, rather than by writing from whatever it absorbed in training, and most of what it draws on has been **peer-reviewed** (checked by other scientists before a journal publishes it).",
    "It searches a collection of roughly 220 million papers, assembled from Semantic Scholar, OpenAlex, PubMed and its own web crawl, and refreshed weekly. Consensus's current documentation says \"over 220 million\" while its older pages still say \"over 200 million\", so read that as an approximate size rather than a count. Consensus describes it as the second-largest research index in the world after Google Scholar.",
    "Ask a yes-or-no question and it adds the Consensus Meter: a tally of how the top papers it read came down — Yes, No, Possibly or Mixed — with the paper count behind each.",
    "It is deliberately narrow. It has nothing useful to say about news, markets, company documents, or any question whose evidence has not been published in a journal.",
  ],

  beforeYouStart: [
    "Free to use once you create an account — the free plan is listed at $0 and Consensus advertises no trial you have to remember to cancel, though no public page says whether a card is requested at signup, so expect to check that yourself. The free plan gives you unlimited ordinary paper searches (the ranked list of papers, no AI answer) and then meters the AI work on top: currently 10 Pro messages, 3 Deep reviews and 10 Study Snapshots a month. No vendor page states whether the Consensus Meter rides on the unlimited search underneath or spends one of those Pro messages, so you may find it counts against your allowance once you are signed in.",
    "**Consensus's own pages disagree about what the plans are.** Its help centre subscription table, checked 15 September 2026, lists Free, Pro at $20/month ($144/year) and Deep at $65/month ($540/year). A marketing pricing page still live on the same site advertises a \"Premium\" tier at $8.99/month with a different feature list. The help centre and the product documentation agree with each other, so treat those as current — but check the price on the checkout screen before you pay.",
    "Paying is for people running literature reviews week after week. A student settling an argument or anyone checking a health claim they read online will rarely reach the monthly ceiling.",
    "It runs in a browser. There is an app in the iOS App Store using the Consensus name, but it appears to be published under an individual's name rather than the company's, so use the website unless you can confirm otherwise.",
  ],

  security: [
    {
      kind: "text",
      text: "Two Consensus documents say different things about what happens to material you upload. Its documentation says files you add to a Collection are \"private, not shared with anyone, and not used to train models,\" and its privacy policy (effective 18 August 2026) says it does not use your data to train large language models and does not sell it. Its terms of service (dated 25 June 2025) separately grant Consensus an \"irrevocable, non-exclusive, royalty-free, fully-paid, transferable, sub-licensable, perpetual\" licence to use \"User Materials.\" The terms are the binding document, so that licence is what you are agreeing to, whatever the friendlier page says.",
    },
    {
      kind: "text",
      text: "The privacy policy is unusually specific about where your text actually goes: to produce results, Consensus sends your queries and your uploaded documents to OpenAI, Anthropic, Google and Baseten under enterprise agreements. That is ordinary for a product of this kind, and it is worth knowing before you paste in anything you have not published.",
    },
  ],

  triad: {
    bestAt: [
      "Settling a yes-or-no question about the evidence — \"does X help with Y\" — and seeing which way the papers actually went",
      "Finding the research behind a health or nutrition claim you saw somewhere else",
      "Getting oriented in a literature you have never read, in language you can follow",
      "Working across fields at once, since the index spans all scientific disciplines rather than one",
    ],
    okayAt: [
      "Very recent work — the index refreshes weekly, but journals and the aggregators it draws on lag publication themselves",
      "Languages other than English — Consensus said in a 2024 changelog entry that it searches in around 100 of them, but its current documentation does not repeat the claim, so assume English is the best-supported until you have tested your own",
    ],
    avoid: [
      "Treating the Consensus Meter as a verdict. Consensus's own help pages say the meter is \"not a perfect reflection of all the science on a topic,\" that it \"will occasionally incorrectly classify results,\" and that it \"does not always account for details included in the original question.\"",
      "Reading a blank or thin meter as \"there is no evidence.\" The meter needs at least five relevant papers among the top twenty before it displays at all, so its absence tells you about your search, not about the science.",
    ],
  },

  starterActions: [
    {
      title: "Ask it the yes-or-no way",
      prompt:
        "Does creatine supplementation improve cognitive performance in healthy adults?",
      whyHere:
        "The Consensus Meter only appears when your search is phrased as a yes-or-no question — the same topic typed as the keywords `creatine cognition` returns papers but no tally at all. Elicit, the closest comparison, treats both phrasings the same way and has no equivalent readout.",
      tweak:
        "Swap in any claim you have seen repeated online. The closer your wording gets to something a single study could actually test, the tighter the tally.",
    },
    {
      title: "Read the answer by its citations, not its prose",
      whatItDoes:
        "Hover or click each citation in the written answer to open the passage in the paper it came from, then check that the passage really says what the sentence claims.",
      whyHere:
        "Consensus's own limitations page concedes that the AI \"can misinterpret a paper and summarize it incorrectly\" — and a misreading looks exactly like a correct summary until you open the passage behind the link, which is one click away.",
    },
    {
      title: "Spend one Deep review deliberately",
      whatItDoes:
        "Switch the search mode from Pro to Deep, then ask a question with two or three parts to it.",
      whyHere:
        "Pro and Deep are the same search box with a different budget behind them — up to twenty papers read in one pass, versus fifty to a hundred across as many as twenty searches run in parallel. Deep is the mode that finds the paper your first phrasing missed.",
      tweak:
        "Ask the same question in both modes back to back and compare which papers only Deep surfaced.",
    },
    {
      title: "Turn the preprints off and re-run it",
      whatItDoes:
        "Switch on \"Exclude preprints\" in the filters and run your question again.",
      whyHere:
        "**Preprints** (papers posted publicly before peer review) are in the index and labelled as such, so this one toggle shows you how much of an answer is resting on work no journal has vetted yet.",
      tweak:
        "The study-design filters are worth a look too — Consensus added 19 of them in July 2026, covering things like meta-analyses and randomised trials.",
    },
    {
      title: "Ask it what it cannot see",
      prompt:
        "What are the main gaps and unanswered questions in the research on [your topic], and which studies argue the evidence is still unsettled?",
      whyHere:
        "Consensus can only answer out of papers it retrieved, so it reports a gap only where some paper says there is one — it has no way to tell you about a question nobody has published on. Asking directly is where that limit becomes visible.",
      tweak: "Follow it with \"which of these findings failed to replicate?\"",
    },
  ],

  pitfalls: [
    "**A tally of published papers is not a tally of the evidence.** Studies that find nothing are far less likely to be published in the first place, so a meter reading \"Yes — 9 of 11 papers\" is counting what reached a journal, not measuring what is true. Consensus's limitations page admits its coverage is incomplete, but it never names this particular gap, so holding it in mind is your job rather than the product's.",
    "**Full text is uneven, and that shapes the answer.** Consensus has complete text for open-access papers and for publishers it has struck deals with — Wiley, Oxford University Press, SAGE, BMJ and JAMA among them — and only the abstract for everything else. An answer can lean on an abstract's headline finding while the caveats that qualify it sit behind a paywall.",
    "**Retracted papers — work a journal has formally withdrawn — are badged, not hidden.** Consensus marks them with a RETRACTED badge and never uses them in AI answers, but they still appear in the paper list. If you are browsing the list rather than reading the written answer, check the badges before you cite anything.",
    "**\"Not enough evidence\" is a real answer here, and easy to misread.** Consensus says it will tell you when it cannot find sufficient relevant research rather than inventing a bridge, which is a genuine strength. But a beginner reads that as \"science has not looked at this\" when it usually means \"this phrasing did not retrieve it.\" Try the question a second way before you conclude anything.",
    "**Medical mode is a different, much smaller collection.** Switching to it narrows you from the full 220-million-paper index to roughly 8 million papers plus around 50,000 clinical guidelines. That is the right trade for a clinical question and the wrong one for everything else — and it is easy to leave switched on by accident.",
  ],

  whereToNext: [
    { label: "More research tools", categorySlug: "research-academic-tools" },
    { label: "Working with documents and PDFs", categorySlug: "document-pdf-processing" },
    { label: "Learning and study tools", categorySlug: "education-learning-ai" },
  ],
};
