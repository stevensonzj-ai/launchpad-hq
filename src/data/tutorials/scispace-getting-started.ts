import type { PlatformTutorialData } from "./types";

export const scispaceTutorial: PlatformTutorialData = {
  slug: "scispace-getting-started",
  platformSlug: "scispace",
  title: "Getting Started with SciSpace",
  tagline:
    "Upload a research paper, ask it questions, and get answers that point back at the page.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-15",
  accessTier: "FREE",

  howItWorks:
    "You upload a paper as a PDF, or search for one, and a chat box appears alongside it. You type a question about the paper and the answer comes back with small numbered links you click to jump to the sentence it came from. Highlight any passage to get a plainer version of it.",

  whatItIs: [
    "SciSpace is an AI research assistant built around reading papers. You either point it at a PDF you already have and ask questions about it, or search its index of published papers and pull what each one found into a side-by-side table.",
    "You will meet two old names. It was **Typeset.io** until 2022 — typeset.io still redirects here — and its in-paper reading assistant was called **Copilot** before it became **Chat with PDF**. Tutorials and reviews written even a year ago use menu names that no longer exist, so check a walkthrough's date before you conclude a feature was removed.",
    "It is run by PubGenius Inc., and it sits alongside your library rather than in place of it.",
  ],

  beforeYouStart: [
    "Signing up is free and takes no card. The **Basic** plan is the free tier at scispace.com, and it is where everyone starts.",
    "The free ceiling is worth understanding before you invest an afternoon in it. Basic includes **100 credits a month** for SciSpace Agent tasks — *credits* are the platform's unit of spend, each thing you run costs some — and unused ones expire at the end of each billing cycle rather than rolling over. An **agent** here means AI that goes off and takes actions on its own rather than only answering. Separately, SciSpace's plan table marks chats with PDFs, paraphraser outputs, citation generations, topic searches and AI detections as \"Limited\" on Basic without publishing the numbers behind that word — while its individual feature pages describe several of those same tools as simply \"free\". The two do not agree, SciSpace does not reconcile them anywhere public, and there is no documented reset schedule for those caps the way there is for the monthly credits — so you will most likely find out where they sit by reaching one.",
    "**Exports are the one hard wall on the free plan.** Basic is listed as \"No Exports allowed\" — no CSV, Excel, BIB, RIS or XML out of any tool, including the comparison table you just spent an hour building. Anything you want to keep has to be copied out by hand until you pay.",
    "Paying is currently around **$12/month billed annually, or $20 month-to-month, for Premium**, which turns the \"Limited\" rows into unlimited ones. **Deep Review** — the deeper literature-analysis mode most reviews write about — sat on the **Advanced** plan, at roughly $70-$90/month, rather than on Premium, in the most recent plan table we were able to read, which dates from January 2026; SciSpace's live table is drawn by the browser and its own Deep Review help article names no plan at all. Treat the per-tier rows as current in shape, check the numbers on the pricing page before you pay, and confirm which tier Deep Review is on before upgrading for it specifically.",
  ],

  security: [
    {
      kind: "text",
      text: "Read the feature page and the binding policy in that order, because they do not say the same thing. SciSpace's Chat with PDF pages promise that uploaded files are encrypted at rest, travel over an encrypted connection, are \"never used for model training\", stay private to your account, are auto-purged after 30 days of inactivity, and can be deleted from your dashboard on demand. That is more than most tools in this category commit to in writing.",
    },
    {
      kind: "text",
      text: "The policy says less. SciSpace's privacy policy — effective **10 April 2024**, and still the version in force today — does not carry that no-training promise for the platform as a whole. It describes using data to \"research, develop and improve our AI models\" in the context of its synthetic audio and video features, and it names advertising partners and data brokers among the categories of party it shares personal data with. We could not find anywhere SciSpace reconciles the two, and where a feature page and a policy differ the policy is the one you would be held to, so read the no-training line as scoped to Chat with PDF specifically rather than to your whole account.",
    },
    {
      kind: "list",
      label: "Worth deciding before you upload",
      items: [
        "Whether you actually hold the rights to the PDF — a paper licensed to you through your institution is not always yours to put on a third party's server",
        "Whether unpublished work belongs here at all: manuscripts under review, grant drafts and anything covered by a confidentiality agreement are a conversation with your supervisor or research office first",
        "Deleting files when you are done with them, rather than letting the 30-day inactivity purge do it, since \"inactivity\" restarts every time you open the file",
      ],
    },
    {
      kind: "text",
      text: "For a published, open-access paper none of this is a real risk. The care is entirely for work that is not yours or not out yet.",
    },
  ],

  triad: {
    bestAt: [
      "Getting oriented fast in a paper you did not choose — what it did, what it found, and what it quietly did not test",
      "Explaining one specific paragraph, equation, table or figure in plainer words without leaving the PDF",
      "Turning a research question into a first list of candidate papers, then into a table of what each one says",
      "Working in a language you do not read well — SciSpace supports asking and answering in 75+ languages",
    ],
    okayAt: [
      "Scanned and photocopied PDFs. It has to read the text off the image first, and SciSpace puts that at 90%+ accuracy, rising to 98% on clean high-resolution scans — its own figures, which we found no independent test of, and which still leave a real margin on an old scan",
      "Telling you how much it actually has. SciSpace's homepage currently claims **280M+ papers** while its own Literature Review page claims **200M+**, both checked on the same day. That is a wide gap for one product, neither figure is dated, and either is better taken as a rough order of magnitude than quoted",
      "Writing. There is an AI Writer and a paraphraser, but this is where the tool and your institution's rules on AI-assisted work meet, and the rules win",
    ],
    avoid: [
      "Taking a number out of an extracted comparison table as though it were the paper's number. SciSpace's own guidance for its writing tools is \"verify every citation against the source\" — that applies just as hard to a value it lifted out of a results table, where a units error or a pulled-from-the-wrong-row error looks identical to a correct answer",
      "Using the AI detector to establish that someone used AI. SciSpace's own help page says manual verification is recommended for a final judgement, and that human writing containing \"excessive AI-like structures\" can be flagged",
      "Assuming its search is complete. SciSpace's published benchmark claims Deep Review returns more *relevant* papers per query than Elicit or Consensus — that is a relevance claim, not a coverage one. Nothing the vendor publishes says it finds everything, and a review you will have to defend still needs a database search behind it",
    ],
  },

  starterActions: [
    {
      title: "Ask the paper the question you actually have",
      prompt:
        "What did this paper actually measure, how many participants or samples, and what was the single main result? Quote the sentence each part of your answer comes from.",
      whyHere:
        "SciSpace publishes both halves of this: a long paper is split into chunks for it automatically, with no length limit on the text itself, and the answer is written from the chunks nearest your question. Aim, not length, is what you control — a question pointed at one thing matches one passage, while \"summarise this\" matches everything and averages it.",
      tweak:
        "Ask the same question again with \"and what did it not test?\" appended. The gaps are usually in the limitations section nobody reads.",
    },
    {
      title: "Highlight the paragraph that lost you",
      whatItDoes:
        "Select any confusing passage inside the PDF with your cursor. Alongside the plainer wording, SciSpace offers papers related to what you highlighted.",
      whyHere:
        "Highlighting a method you have never met is also how you find the paper that introduced it, because those recommendations come out of SciSpace's own index of published papers rather than out of the PDF in front of you — which is the half a standalone PDF chat tool cannot do.",
      tweak:
        "Highlight a method name rather than a conclusion. Conclusions are where you already know what you think.",
    },
    {
      title: "Make it read the table and the equation",
      prompt:
        "Explain the main results table row by row in plain language. For each row, say what was compared, what the number means, and whether the difference is one the authors themselves call significant.",
      whyHere:
        "SciSpace names equations and tables as things you can select and have explained, not just prose — its own FAQ calls this out for maths, physics and chemistry papers.",
      tweak:
        "Then open the table yourself and check two rows against what it said. Two is enough to tell you how much to trust the rest.",
    },
    {
      title: "Search the literature as a question, not as keywords",
      prompt:
        "Does intermittent fasting improve blood pressure in adults with hypertension?",
      whyHere:
        "SciSpace's Literature Review page gives a documented instruction most people never read: if you are asking a question, put a question mark on the end and the results improve. It is the rare search tip that comes from the vendor rather than from a blog guessing.",
      tweak:
        "Swap in your own question. Keep it to one comparison — a question with two \"ands\" in it returns a worse list than two separate searches.",
    },
    {
      title: "Build the comparison table, then notice where it stops",
      whatItDoes:
        "From a set of results or your own uploaded PDFs, add columns for the things you care about — sample size, method, outcome, limitations — and let it fill the grid across every paper at once.",
      whyHere:
        "The column cap is the free plan's real shape: Basic stops at 5 columns including the ones SciSpace suggests for you, Premium goes to 50. Five is enough to learn whether the extraction is trustworthy on your topic and not enough to finish a review, which is a useful thing to discover in twenty minutes rather than at the end.",
      tweak:
        "Make one column \"page number for this claim\". It costs you a column and turns the table into something you can check.",
    },
  ],

  pitfalls: [
    "PDFs only, 100 MB each. SciSpace says Word, PowerPoint and video support is planned but not here, so a slide deck or a `.docx` has to be converted before it will go in.",
    "It answers from the document in front of it, not from the field. Ask about a section your paper does not have and you can still get back something that reads like an answer.",
    "Credits drain faster than 100 sounds. SciSpace's own help page explains that one Agent run fans out into dozens of sub-tasks and shows a user spending nearly a month's allowance on two runs — so the Agent is the thing to spend deliberately, while Chat with PDF and Literature Review do not draw on credits at all.",
    "Free answers come from SciSpace's standard AI engine; the higher-quality one is a paid unlock listed on the plan table. If an answer feels shallower than the paper deserves, the plan is a likelier cause than the paper.",
    "The paraphraser's limit on how much text it will take per run sits behind a collapsed FAQ we could not read, so you may need to check that one once you are signed in.",
  ],

  whereToNext: [
    { label: "Research and academic tools", categorySlug: "research-academic-tools" },
    { label: "Document and PDF tools", categorySlug: "document-pdf-processing" },
    { label: "Learning with AI", categorySlug: "education-learning-ai" },
  ],
};
