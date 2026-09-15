import type { PlatformTutorialData } from "./types";

export const trinkaAiTutorial: PlatformTutorialData = {
  slug: "trinka-ai-getting-started",
  platformSlug: "trinka-ai",
  title: "Getting Started with Trinka AI",
  tagline:
    "A grammar checker built for research writing, where the specialist words your usual checker underlines are the ones that are right.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-15",
  accessTier: "FREE",

  howItWorks:
    "You paste or type your text into Trinka's web editor and it underlines problems as you go. Click an underline and you get the suggested fix plus a short reason; accept it or ignore it. Keep editing and it keeps rechecking, then you copy the cleaned-up text back out or download the file.",

  whatItIs: [
    "Trinka is a grammar and style checker built specifically for academic and technical writing, from Crimson AI — the company behind the research-editing service Enago.",
    "What separates it from a general checker is as much what it leaves alone as what it catches. It is tuned not to \"fix\" field-specific terminology, the passive voice of a methods section, or the hedged phrasing research writing uses deliberately — and it checks things a general tool never looks at: style-guide conventions, consistency across a whole document, and whether a manuscript carries the declarations a journal will ask for.",
    "Checking works on English and Spanish text, and for English you choose US or UK spelling. The site's menus come in several other languages, but that is the interface, not the checking.",
    "Around the editor sits a set of separate, mostly pay-per-use research tools — plagiarism and AI-detection reports, citation checking and formatting, a journal finder — which is what makes it feel larger than a grammar checker.",
  ],

  beforeYouStart: [
    "Signing up is free and needs no card. The free Basic plan gives you 5,000 words of language checking a month, a separate allowance for the paraphraser that Trinka's feature page describes as roughly the same size again but does not itemise in its plan table, and 5 AI-writing requests. When you reach a limit Trinka stops rather than quietly giving you something weaker — its own wording is that you \"cannot continue using Trinka\", which suggests it halts rather than warns you first. The counter resets a month from the date you registered, not on the first of the month.",
    "The free plan also drops 4 **credits** (the platform's unit of spend — each report costs some) into your account every 30 days. Unused free credits expire at the end of each 30-day period. Credits you buy never expire.",
    "Paying is worth it for specific things rather than in general. Premium — currently around $10 a month, or around $100 for a year, though Trinka renders prices by region, so check the figure on its pricing page before you buy — unlocks the deeper \"Power\" grammar mode, the journal style guides (APA, AMA, ACS, AGU, IEEE), the full set of paraphrase modes and the Microsoft Word add-in. It does not include plagiarism reports, which still come out of credits. The browser extension, the consistency check and the journal finder are already on the free plan.",
  ],

  security: [
    {
      kind: "text",
      text: "The plan you are on decides the answer here. Trinka's terms of service say text from free-plan users is used to train its AI, and that every paid plan is exempt — so the tier this page starts you on is the one tier without that protection. If you are working on an unpublished manuscript, that is the fact to weigh before you paste it in.",
    },
    {
      kind: "text",
      text: "The posture around that is stronger than most tools this size: AWS servers in the US, encryption in transit and at rest, **SOC 2** (an audit of how a company handles customer data) Type 2 and ISO 27001:2022, and a public Trust Center that sets out what happens to your files.",
    },
    {
      kind: "list",
      label: "Worth knowing before you paste a manuscript in",
      items: [
        "Paid does not mean deleted straight away — Trinka's Trust Center says Premium users' processed documents are cleared from its servers every 90 days.",
        "Deletion immediately after processing is a feature of the separate, much pricier Confidential Data plan, not of an ordinary paid account.",
        "The commitments above live on the pricing page, the Trust Center and the terms of service (last updated 15 April 2024). The privacy policy itself still carries an effective date of 1 January 2021 and does not spell out the plan-by-plan training and deletion rules.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Manuscripts, theses and technical reports, where correct jargon is what every other checker underlines",
      "Catching inconsistencies that accumulate across a long document — colour and color, ultra-violet and ultra violet, TNF-alpha and TNF-α",
      "Checking a paper against a journal's style guide before you submit it",
      "Writing formally in English as a second language, where each suggestion arrives with a short reason attached",
    ],
    okayAt: [
      "Everyday writing — email, blog posts, marketing copy. It is tuned for formal prose and will push casual writing toward stiffness.",
      "Spanish, which is supported for checking, though the academic machinery around the editor appears to be built for English — if Spanish is your writing language it is worth confirming which of the extras apply to it.",
    ],
    avoid: [
      "Treating the free plagiarism check as a plagiarism report. The one free check a month gives you a similarity number; the report that shows which sources matched costs 24 credits, or 36 for the version that also searches paid journals.",
      "Assuming \"unlimited\" paid checking is unlimited. Trinka's terms set a fair-use ceiling of 150,000 words of language check and 120 plagiarism scans a month.",
      "Reading the journal finder's result as a verdict on your paper. It matches your abstract against journal scope, which produces a shortlist — not an assessment of whether the work is strong enough for any journal on it.",
    ],
  },

  starterActions: [
    {
      title: "Paste a real paragraph of your own and read only the explanations",
      whatItDoes:
        "Runs the free grammar check over something you actually wrote and shows a one-line reason beside each suggestion.",
      whyHere:
        "Tested against Grammarly, the signal here is the underlines you do not get. Reading only the explanations is the fastest way to find out whether Trinka's idea of correct academic prose matches your field's.",
      tweak:
        "Use a methods section if you have one — that is where passive voice is densest and a general checker is noisiest.",
    },
    {
      title: "Set your English variant, then run the consistency check across a whole document",
      whatItDoes:
        "Choose US or UK English, then run Consistency Check over the full document to surface spellings, hyphenations, numerals and symbols you have used both ways.",
      whyHere:
        "A sentence-by-sentence checker, Grammarly included, has no opinion about a spelling you used two ways forty pages apart. Trinka runs this check over the whole document at once, which is the only way a manuscript-length inconsistency surfaces.",
      tweak:
        "Save it for last, after the writing is finished — it is a tidying pass, not a drafting one.",
    },
    {
      title: "Run your abstract through the Journal Finder",
      whatItDoes:
        "Paste your abstract and get a ranked list of journals whose published scope matches it, filterable by publisher, region and open-access status, with journal metrics alongside.",
      whyHere:
        "It flags predatory journals (ones that take a fee and publish almost anything) — the part of journal selection a first-time author cannot easily do by hand, and the part no grammar checker attempts.",
      tweak:
        "Filter for open access first if your funder requires it, before you look at anything else.",
    },
    {
      title: "Ask Trinka to tighten one sentence without touching your terminology",
      prompt:
        "Rewrite this sentence to be more concise and more formal. Keep every technical term exactly as written, and do not change what it claims.",
      whyHere:
        "The `/Ask` field — typed as `/ask` in the editor, or opened by selecting a sentence — is the one place in Trinka where you write an instruction instead of clicking a suggestion. Telling it to leave your terminology alone is the instruction worth learning, because it is what the checker around it is already doing for you.",
      tweak:
        "Free requests are few, so spend one on the sentence you have already rewritten four times yourself.",
    },
    {
      title: "Spend one credit on a publication readiness check before you submit",
      whatItDoes:
        "Import your manuscript file and run the technical checks — more than 25 of them, covering ethics approval and consent statements, conflict-of-interest and funding declarations, author names and affiliations, figure and table captions, clinical trial IDs, and references that are obsolete or retracted.",
      whyHere:
        "A paper bounced before review for a missing declaration is not a writing problem, and no grammar checker looks for one. The report costs a single credit out of the monthly free allowance.",
      tweak:
        "Run it before the final proofread, so there is still time to go and get the declarations you are missing.",
    },
  ],

  pitfalls: [
    "**AI editing can trigger a disclosure requirement, and the line is not where most people assume.** Elsevier's generative-AI policy for journals (June 2026) states that basic checks of grammar, spelling and punctuation need no declaration, but that substantive changes to sentence structure or to how the text is organised must be disclosed — which is precisely what the paraphraser and /Ask do. The ICMJE recommendations go further, asking authors to disclose AI-assisted technologies used in producing a submission and to describe writing assistance in the acknowledgements. Check your target journal's own policy; they are not identical.",
    "**The free plan runs the shallow mode.** Basic gets Lite mode grammar checking, so trying the free tier tells you whether you like the tool, not what it does at its best.",
    "**Trinka's own pages disagree about the AI detector, in two different ways.** Its feature page presents AI content detection as free, while the plan-comparison table meters it at 1 credit per 5,000 words. The same two pages also disagree on the included allowance — the feature page cites 120 pages for Premium Plus, the plan table 240 pages a year. A separate free web version exists, capped at 500 words a session and 10 sessions a day. Trinka has not reconciled either figure, so assume the plan table governs your account and verify both once you are signed in.",
    "**It will still argue with your field.** Specialist notation, gene names and unit formats do get flagged. Build up the personal dictionary early rather than overriding the same term fifty times. Whether that dictionary carries across the web editor, the browser extension and the Word add-in is not stated publicly, so that is another thing to check once you are signed in.",
    "**There are no refunds.** Trinka's terms state that refunds are not allowed on purchased subscriptions; you can cancel to stop the renewal, but the period you have paid for is spent.",
  ],

  whereToNext: [
    { label: "General AI assistants for drafting", categorySlug: "text-conversational-ai" },
    { label: "Other research and academic tools", categorySlug: "research-academic-tools" },
    { label: "Working with PDFs and documents", categorySlug: "document-pdf-processing" },
  ],
};
