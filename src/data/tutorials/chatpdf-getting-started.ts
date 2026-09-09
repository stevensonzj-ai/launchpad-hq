import type { PlatformTutorialData } from "./types";

export const chatpdfTutorial: PlatformTutorialData = {
  slug: "chatpdf-getting-started",
  platformSlug: "chatpdf",
  title: "Getting Started with ChatPDF",
  tagline:
    "Drop one long document in and ask it where things are — the least demanding tool in its category to actually try.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-09",
  accessTier: "FREE",

  howItWorks:
    "You drag a PDF onto the page, and it opens next to a chat box. You type a question about the document and the answer comes back marked with the page numbers it drew on. You keep asking follow-ups in the same conversation.",

  whatItIs: [
    "ChatPDF is a single-purpose website from ChatPDF GmbH, a small German company: you give it one document, you ask it questions about that document, and it does nothing else.",
    "That narrowness is the whole appeal — there is nothing to set up, no library to build first, and no developer step between you and an answer.",
    "It is a reading tool, not a PDF editor. It never changes the file you gave it, and it cannot fill in a form, sign anything, or hand you back a new version.",
  ],

  beforeYouStart: [
    "You can try it without signing up. ChatPDF's FAQ says the service \"requires no account to get started,\" and the upload box is the first thing on the homepage. A free account adds saved history and the folders that let you chat with several files at once.",
    "**The free ceiling is two documents a day** — that is the FAQ's own wording, \"analyze 2 documents every day.\" It counts documents, not questions, and nothing on the site states a limit on how many questions each document will take.",
    "Paying is currently around $15 a month or about $90 a year, according to ChatPDF GmbH's own App Store listing for its mobile app. The website publishes no pricing page at all, so the figure you meet at checkout on the web may differ from that one.",
    "Files have an outer limit of 2,000 pages or 32 MB each, a figure that appears only in ChatPDF's developer documentation. The website states no separate limit for free uploads, so treat that number as a ceiling rather than a promise.",
  ],

  security: [
    {
      kind: "text",
      text: "ChatPDF's terms state that the service is hosted in the United States. The FAQ covers the technical side reasonably: documents are encrypted in transit and while stored, deletion is available at any time, and the storage provider holds **SOC 2** Type II certification — an audit of how a company handles customer data. It is the storage provider's audit, not an audit of ChatPDF.",
    },
    {
      kind: "text",
      text: "The substance of this page is what the binding documents do not say. ChatPDF's privacy policy was last updated in January 2023 and is a general-purpose template about names, email addresses and billing details — it does not mention uploaded documents anywhere. It sets no retention period for your files, takes no position on whether they are used to improve the service, and names Stripe, its payment processor, as the only outside company involved. The FAQ, meanwhile, says questions are routed between OpenAI's GPT-4o and GPT-4o-mini **models** (the AI \"brain\" that does the actual thinking), which means passages from your document are being answered somewhere other than ChatPDF's own systems. None of that is evidence of bad handling. It is a policy that has not caught up with the product, and a thin policy is a fact worth knowing rather than a gap to fill in with optimism.",
    },
    {
      kind: "list",
      label: "What that means in practice",
      items: [
        "Delete a document when you are finished with it. That is the one control ChatPDF actually commits to, and its developer documentation shows a delete endpoint sitting behind it.",
        "No stated retention period is not the same as a short one. Assume a file stays until you remove it.",
        "The privacy policy's line \"we do not process sensitive personal information\" is describing the name and email address you give ChatPDF. It is not a statement about the medical letter or the contract you upload.",
        "If you would not email the document to a stranger, the question you want answered has to be worth the upload.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Finding where a long document says something, and getting the page back with it",
      "Getting through a paper or report you were going to have to read anyway, then reading only the parts that matter",
      "Reading a document in a language you do not have — upload in one language, ask in another",
      "Turning a document you were avoiding into a conversation you can start in about thirty seconds",
    ],
    okayAt: [
      "Scanned pages, where whether it can read the text at all is the whole question",
      "Numbers lifted out of tables — get the page reference and look",
      "Very long or very heavy files, which run into the page and size ceilings",
    ],
    avoid: [
      "Coursework you intend to hand in. ChatPDF's terms contain an academic-dishonesty clause and reserve the right to report violations to your institution — while its homepage markets answering multiple-choice questions \"faster than your classmates.\" The marketing and the contract disagree, and only one of them is binding.",
      "Anything covered by US health-privacy law (HIPAA) or US financial-privacy law (GLBA). The terms say the service is not built for those rules and that you may not use it if your material falls under them.",
      "Documents someone else made you promise to keep secret. The terms require you to warrant that what you upload does \"not constitute confidential information,\" and separately prohibit uploading trade secrets or confidential documents you are not authorised to share.",
    ],
  },

  starterActions: [
    {
      title: "Ask where, and make it quote",
      prompt:
        "Go through this document and find every place it mentions cancelling, ending, or renewing the agreement. For each one, give me the page number and quote the exact sentence. If the document says nothing about one of those, say so instead of guessing.",
      whyHere:
        "ChatPDF's developer documentation shows its answers carrying inline page markers in the form [P12], so a question shaped like this comes back as something you can go and look at rather than something you have to believe.",
      tweak:
        "Swap the three words for whatever you are actually worried about — a deadline, a fee, a named person.",
    },
    {
      title: "Ask what the summary left out",
      prompt:
        "Summarise this document in ten bullet points. Then, separately, list three things in the document that your summary left out and that might matter to someone who has to act on it.",
      whyHere:
        "ChatPDF routes queries between the two models named under Security depending on the question, so two answers about the same file minutes apart can come from differently sized brains. A second pass aimed at the gaps is how you notice you got the smaller one.",
      tweak:
        "If the \"left out\" list contains something important, ask for it with page numbers and go read that page.",
    },
    {
      title: "Give it the meeting deck, not a PDF",
      prompt:
        "This is a slide deck from a meeting I missed. Tell me what was decided, what was only proposed, and what was left unresolved. Give me the slide number for each one.",
      whyHere:
        "The accepted-formats list in ChatPDF's FAQ is longer than the name suggests — Word (.doc, .docx), PowerPoint (.ppt, .pptx), Markdown (.md) and plain text go into the same box as a PDF — so the deck you never opened is a legitimate thing to point it at.",
      tweak: "Ask it to flag anything that reads like an action assigned to a person.",
    },
    {
      title: "Read something you cannot read",
      prompt:
        "This document is not in English. Answer me in English: what kind of document is it, who sent it, what is it asking me to do, and what are the dates I need to care about? Give me the page number for each date.",
      whyHere:
        "ChatPDF's FAQ states the page references come back the same way when you upload in one language and ask in another — which makes this useful on a document you genuinely cannot decode, not just one you find slow.",
      tweak:
        "Ask for the original sentence alongside the translation when a date or an amount matters.",
    },
    {
      title: "Put the old version and the new one in one folder",
      prompt:
        "These are two versions of the same agreement. List every substantive difference between them. For each one, tell me which version it appears in and on which page, and say plainly whether the change favours me or the other party.",
      whyHere:
        "In ChatPDF the multi-file case works by creating a folder and talking to the folder, and folders are the specific thing sitting behind its free account — so this is the moment where signing up either earns its keep or does not.",
      tweak:
        "If the two files are long, ask it to work section by section and tell you when it has finished each one.",
    },
  ],

  pitfalls: [
    "Ask a 90-page agreement \"is there an auto-renewal clause?\" and a confident \"no\" is not evidence there isn't one — ChatPDF answers from the passages it pulled out of the document, and a clause it never pulled produces exactly the same sentence as a clause that genuinely does not exist. The page markers are the tell: if the answer to a question about a long document cites two pages, it worked from two pages. For anything you would sign, use it to find the clause and then read the clause.",
    "A badly chosen first upload costs you half of the day's allowance — and if there is also a cap on questions per document, you will find it only by hitting it.",
    "A scanned page is a photograph, not text. ChatPDF's mobile app listing advertises reading text out of scans, but the website's own FAQ never mentions it — so on a scanned document, treat a thin or oddly empty answer as a sign it may not have read the page, rather than proof the document is silent on your question.",
    "The reference you get back is a page, not a sentence. ChatPDF's developer documentation returns page numbers, while the marketing describes citations that scroll you to the exact source; on a dense page you may still be the one doing the finding.",
  ],

  whereToNext: [
    { label: "Other document and PDF tools", categorySlug: "document-pdf-processing" },
    { label: "Research and academic tools", categorySlug: "research-academic-tools" },
    { label: "General AI chatbots", categorySlug: "text-conversational-ai" },
  ],
};
