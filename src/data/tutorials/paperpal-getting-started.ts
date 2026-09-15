import type { PlatformTutorialData } from "./types";

export const paperpalTutorial: PlatformTutorialData = {
  slug: "paperpal-getting-started",
  platformSlug: "paperpal",
  title: "Getting Started with Paperpal",
  tagline:
    "A beginner's guide to editing an academic paper with AI — and to telling your journal you did.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-15",
  changelogUrl: "https://paperpal.com/blog/category/product-updates",
  accessTier: "FREE",

  howItWorks:
    "You write or paste your draft into Paperpal's editor, and suggested changes appear alongside your text sentence by sentence; you click each one to accept or ignore it. Select a passage and a small menu offers rewrites of it. There's also a box where you type a question in plain English and get an answer back.",

  whatItIs: [
    "Paperpal is an academic writing and language-editing assistant from Cactus Communications, the academic-services company behind Editage. It is built for research papers, theses and journal manuscripts rather than general writing, and its suggestions are tuned to how academic English is expected to sound.",
    "It runs in three places — its own web editor, an add-in for Microsoft Word, and a Chrome or Edge extension that puts it inside Google Docs and Overleaf (the browser-based editor many maths and physics papers are written in). One account covers all of them, and the vendor says your plan benefits are the same whichever one you use, so the allowances appear to be shared across them rather than counted separately.",
    "Alongside editing it bundles pre-submission checks — plagiarism, reference accuracy, AI detection (a tool that guesses whether text was written by AI) and a report on how your manuscript measures against journal requirements — plus a research box that answers a typed question with citations.",
  ],

  beforeYouStart: [
    "Signing up is free and takes an email, with no card. The free plan gives you **200 language-editing suggestions a month**, and a separate allowance of five uses a day for the generative features — paraphrase, trim, translate, academic tone and AI Review. The monthly bucket resets monthly and the daily one daily, so a bad afternoon costs you a day, not a month.",
    "Whether you will need to pay is a question about manuscript length, not ambition. Two hundred suggestions is roughly an abstract-and-introduction pass, not a thesis. Paid plans are currently around $12 a month billed annually ($25 month to month) for Prime, which raises that to 20,000 edits a month, and around $29 a month billed annually ($59 monthly) for Pro, which makes editing unlimited. Those figures come from Paperpal's help centre rather than its pricing page, which loads its numbers from a logged-in account and may show something different in your region — treat them as the shape of the deal and check the price you are shown at checkout.",
    "The main editing engine reads English and only English. Paperpal's own documentation lists non-English text among the things Language Suggestions skip entirely, so a paper written in Spanish or Mandarin gets no grammar suggestions at all. Its Translate and Rewrite tools do work in other languages, but they are a different part of the product from the editor you will spend most of your time in.",
    "**Look up your journal's or university's AI policy before you edit a word, not after.** Elsevier, to take one publisher, requires a declaration when generative AI was used to improve the readability and language of a manuscript, while exempting basic checks of grammar, spelling and punctuation (policy updated June 2026). Paperpal sits on both sides of that line — a comma fix and a rewritten paragraph are the same two clicks — so which of its features you use decides what you have to declare.",
  ],

  security: [
    {
      kind: "text",
      text: "Paperpal's commitment on training is written down and it reaches the free plan: your documents, uploads and personal information \"are never used for model training and remain fully confidential, on every plan\" — and it says the same specifically of work edited through its Overleaf integration, down to not recording which suggestions you accept. It is certified against the international security and AI-management standards (ISO 27001 and ISO 42001) and says it complies with European privacy law and with US student-records law.",
    },
    {
      kind: "text",
      text: "That commitment is the reason an unpublished manuscript is a more defensible thing to put here than in a chat window. It is still a company's own statement about a cloud service, not something you can verify yourself.",
    },
    {
      kind: "list",
      label: "Still worth thinking about",
      items: [
        "Your draft is uploaded and stored so it can be re-checked later; you can delete documents and uploaded files yourself when you are done.",
        "A co-author's unpublished data, or anything covered by a confidentiality agreement, is not yours alone to upload. Ask first.",
        "Patient-identifiable material needs its own clearance. Paperpal announced infrastructure built for the US rules covering patient data in March 2026, but that is an arrangement for life-sciences organisations, not something a free account sits inside.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Tightening English in a draft you have already written — it is an editor, not a ghostwriter, and it is at its best when there is something to edit",
      "Catching the errors that academic English written by non-native speakers tends to produce: article use, tense in methods sections, over- and under-hedging",
    ],
    okayAt: [
      "Producing text from nothing. Titles, outlines and abstracts come from filled-in forms rather than a free-form instruction, so you get a competent template shaped like your field, not your argument",
      "The journal-fit report. Free and Prime accounts both get the cut-down version of it; the full report is Pro-only, which is easy to miss because the feature appears on every tier",
    ],
    avoid: [
      "Letting Paperpal's plagiarism or AI-detection scores settle anything. Your institution runs its own tools against its own databases, including sources Paperpal cannot see, so the numbers will not match — and Paperpal has published its own explanation of why text it has edited can be flagged by an AI detector, which means a clean score from its checker is not a prediction of what your university's will say",
      "Relying on it for the parts of a paper it does not read. Language Suggestions skip tables, text boxes, figure and table captions, equations and numbers, abbreviations, text inside quotation marks, the code used to typeset maths, and anything inside an image — so errors in exactly the places reviewers look survive a clean pass",
      "Paraphrasing your way out of a similarity flag. Rewriting a matched passage until the checker stops matching it does not make it cited, and Rewrite makes doing that accidentally very easy",
    ],
  },

  starterActions: [
    {
      title: "Run one paragraph before you run the paper",
      whatItDoes:
        "Paste a single difficult paragraph — your methods section is a good candidate — into the web editor and work through the suggestions one at a time, accepting and rejecting individually rather than applying them in bulk.",
      whyHere:
        "Paperpal meters the free tier in individual suggestions rather than in documents, and one dense methods paragraph can easily eat dozens of that monthly allowance. Doing a paragraph first tells you how far 200 will actually stretch on *your* writing before you spend it discovering that on a full draft.",
      tweak:
        "Pick the paragraph you have rewritten most times yourself — that is where you find out whether its suggestions are better than your own.",
    },
    {
      title: "Ask the research box a real question",
      prompt:
        "What evidence is there that spaced repetition improves long-term retention in adult learners, and what are the main criticisms of that evidence?",
      whyHere:
        "Paperpal's Research box answers out of a library of published papers and hands back citations you can save straight into your own, so its failure mode is a thin answer rather than a confidently invented reference.",
      tweak:
        "Ask a question the literature actually has an answer to. Vague questions come back with vague citations.",
    },
    {
      title: "Turn on AI Footprint before you start editing",
      whatItDoes:
        "Switch on AI Footprint from the editor's menu before you accept your first suggestion. It marks which parts of the document Paperpal added or changed, and keeps those marks across writing sessions.",
      whyHere:
        "Most editing tools leave you unable to reconstruct afterwards which sentences were yours — which is exactly what a disclosure statement, or a supervisor's question, requires you to do. Paperpal added AI Footprint alongside one-click disclosure templates drawn from Springer, Wiley and IEEE wording in September 2025 for precisely that reason.",
      tweak:
        "Turn it on first — switching it on halfway through cannot tell you about the edits you already accepted. It is not listed on the current plan-comparison table, so whether a free account gets it is not publicly documented; if you are relying on the trail for a disclosure statement, check it is switched on and working before you edit.",
    },
    {
      title: "Ask a PDF instead of skim-reading it",
      prompt:
        "Summarise this paper's method in five bullet points, then list every limitation the authors admit to and the page each one appears on.",
      whyHere:
        "The PDFs you question this way sit in the same library Paperpal's citation tools draw from, so a paper you have just interrogated is one step from being a formatted reference in your draft rather than something you have to go and find again.",
      tweak:
        "Asking for page numbers is the point — it gives you something to check the answer against.",
    },
    {
      title: "Translate a sentence, not a paper",
      whatItDoes:
        "Select one passage in another language and use Translate on it, then edit the English yourself rather than accepting it whole.",
      whyHere:
        "Translate, Paraphrase, Trim and Academic Tone all cap at about 300 words per selection and need at least ten words to run at all, so these tools are built for sentence-level work — feeding them a whole section gets you nothing rather than a warning.",
      tweak:
        "Translate into English, then run the result past the editor as if you had written it. The help centre documents translation between 50-plus languages while an earlier vendor post described it as translating into English, so check the direction you need works before you rely on it.",
    },
  ],

  pitfalls: [
    "Real-time suggestions are documented up to around 35,000 words, and Paperpal advises splitting anything larger. A book-length thesis goes through in chunks, which also means your chapter numbering and cross-references are on you.",
    "Each submission check is separately metered and separately gated, so \"Paperpal has a plagiarism checker\" and \"my plan will run one on this manuscript\" are different claims. Read the plan comparison table before you rely on any of them the night before a deadline — consistency checks and reference checks are not on the free plan at all, and the free plagiarism check returns what Paperpal calls a Lite Report, which appears to be a similarity range with top sources rather than a full itemised one. Exactly what is withheld is not spelled out publicly, so expect less detail and confirm it once you are signed in.",
    "Paperpal Preflight is a separate product. It is the submission-readiness service offered through publisher partners, it is not included in any subscription, and it carries a per-manuscript charge (rechecks on revisions are included in that charge). Seeing Preflight in a journal's workflow does not mean your Paperpal plan covers it.",
    "Accepting every suggestion flattens your voice. Extensive mode deliberately produces more and heavier rewrites than Essential mode, and on a paper you will have to defend in a viva or a review response, more is not automatically better.",
    "The plan table has recently grown a row for a category of feature Paperpal has not yet published anything describing, marked as limited on the free plan — so you may find something in the product that this page does not cover.",
    "It edits what you wrote, not what you meant. A sentence that is grammatically immaculate and scientifically wrong comes back immaculate.",
  ],

  whereToNext: [
    { label: "Document & PDF tools", categorySlug: "document-pdf-processing" },
    { label: "Education & learning AI", categorySlug: "education-learning-ai" },
    { label: "More research tools", categorySlug: "research-academic-tools" },
  ],
};
