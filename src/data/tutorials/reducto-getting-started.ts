import type { PlatformTutorialData } from "./types";

export const reductoTutorial: PlatformTutorialData = {
  slug: "reducto-getting-started",
  platformSlug: "reducto",
  title: "Getting Started with Reducto",
  tagline:
    "Turns a messy PDF or scan into tidy, labelled text and tables for other software to use — a building block, not an app you chat to.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-09",
  accessTier: "FREE",

  howItWorks:
    "You sign in to Reducto's browser workspace, drag a document in, and wait a moment. Back comes the same document rewritten as tidy, labelled data — headings, paragraphs, table cells — shown beside the original page. Change a setting, run it again, and put the two results side by side to see where they differ.",

  whatItIs: [
    "Reducto is a document parser: it reads a PDF, a scan, a spreadsheet or a Word file and hands back what was on the page as text, tables and figures with their positions marked, in a shape another program can read.",
    "It is a building block rather than a finished product. It will not chat with you about your document, summarise it, or keep a library of your files — it produces the clean input that a chatbot, a search tool or an automated workflow needs in order to be accurate.",
    "The company sells this to teams putting large document piles into AI systems, and says it has processed over a billion pages. Its browser workspace, called Studio, exists so you can watch what it produces before anyone writes a line of code.",
  ],

  beforeYouStart: [
    "**Reducto is built for people writing software, and its site assumes it.** That is a fact about the product rather than about you: it emits data for other programs to consume, not answers for a person to read. If what you want is to ask questions of a PDF and get a readable reply back, **ChatPDF** is the tool for that job and this site has a page on it.",
    "There is no sales gate on the entry plan. Reducto's pricing page currently lists a self-serve Standard plan carrying **$150 in free usage** — described in the same page's FAQ as 15,000 credits — which at its published rate of around $10 per 1,000 pages for parsing works out to roughly 15,000 pages before you owe anything. Its Studio page says signing in takes \"no setup, no credit card\"; that is Reducto's own wording, worth confirming when you get there.",
    "The two plans above Standard, Growth and Enterprise, are quoted by sales rather than published — and several of the data protections described under Security below start on those plans rather than the free one.",
    "Have a genuinely awkward document ready before you sign in. The reason anyone goes looking for a parser is a scanned invoice, a financial statement whose table runs over a page break, or a form somebody filled in by hand.",
  ],

  security: [
    {
      kind: "text",
      text: "Every tool in this category uploads your document; Reducto's particular wrinkle is **which** route keeps it. Its data policy page says data submitted through the **API** (a way for programs to talk to each other without a person clicking) is set to expire within 24 hours — and then names Studio-run jobs as the exception. The no-code path a beginner would naturally take is the one where files are retained, which is the opposite of what most people would assume.",
    },
    {
      kind: "list",
      label: "What Reducto's own documents say",
      items: [
        "The same policy page states that Reducto never uses customer data for training \"for users on our 'Growth' tier and above\". That sentence is written so that it does not cover the free Standard plan you would be experimenting on.",
        "Its terms of service run the other way: they grant Reducto a licence to \"use, analyze, aggregate, reproduce, modify\" what you submit, and to use it \"to develop and improve the Services\". The data policy page is not the document you agreed to; the terms are.",
        "It says it has completed SOC 2 Type I and Type II — an audit of how a company handles customer data. A HIPAA-compliant processing pipeline, and a signed agreement covering health records, are offered to Growth and Enterprise customers, not on the free plan.",
        "Reducto's own docs give two different retention windows: the FAQ says results are \"generally available for 12 hours\", the policy page says data expires within 24. Both are stated for API jobs. Neither covers the browser workspace.",
      ],
    },
    {
      kind: "text",
      text: "Practical version: until you know which plan you are on, test it with a document you would not mind a stranger reading. Short retention windows are reassuring but they do not undo the upload itself.",
    },
  ],

  triad: {
    bestAt: [
      "Complicated tables — merged cells, nested headers, rows that continue after a page break — which is the specific failure that sends people looking for a parser in the first place",
      "Scans and photographs of pages, where the text has to be recognised off the image before anything else can happen",
      "Showing its working: results link back to the exact region of the page a value came from, so you can check a number instead of trusting it",
      "Feeding other software — 30+ file types in, one consistent shape of data out, so a spreadsheet, a slide deck and a scanned form all arrive looking the same",
    ],
    okayAt: [
      "Being explored without code. Studio is real and included on the free plan, but it is built for people who will eventually write some",
      "Handwriting and less common languages. Reducto claims broad support; that is a claim to test on your own worst page",
      "One-off jobs. Nothing stops you parsing a single PDF, but you are wiring up an industrial machine to open one envelope",
    ],
    avoid: [
      "Asking questions about a document — it hands the contents to something that can",
      "Being the finished workflow. There is no inbox to forward invoices to and no approval queue for a person to sign off in; Reducto stops at producing the data and assumes your system takes it from there",
      "Trusting published head-to-head benchmarks, Reducto's own included. It publishes comparisons against named rivals on its site; treat those as a hypothesis to test on your documents, not a result",
    ],
  },

  starterActions: [
    {
      title: "Feed it your worst table",
      prompt:
        "Upload a financial statement or invoice whose largest table spans a page break, then check whether the rows after the break stayed in the right columns.",
      whyHere:
        "Tables are the reason this category exists, and when a number lands in the wrong column the marked cell positions let you see where it came from rather than guessing. A parser that returns only text gives you no way to tell a misread character from a broken layout.",
      tweak:
        "Run the same file twice with one setting changed. Where the two runs disagree is where the document is genuinely ambiguous.",
    },
    {
      title: "Photograph a page and parse the photo",
      prompt:
        "Photograph one page of a printed form with your phone, upload it, and compare the result against the same page exported as a PDF.",
      whyHere:
        "Reducto takes JPEG, PNG, HEIC and TIFF alongside PDFs, so one pipeline handles a phone snap and a born-digital file. That is the case that separates a parser from a text extractor: a clean PDF already contains its text and almost anything can read it.",
      tweak:
        "Then photograph the same page badly on purpose, at an angle and half in shadow, and find where it stops coping. Knowing the boundary is worth more than knowing the best case.",
    },
    {
      title: "Ask for four fields instead of the whole document",
      prompt:
        "List the five values you would type into a spreadsheet from this document, then ask for exactly those five and nothing else.",
      whyHere:
        "Parse and extract are separate products here with separate prices, because they are separate jobs: parse hands you the whole document, extract hands you the four values you were going to copy out of it anyway. Choosing the wrong one is the commonest way to overpay in this category.",
      tweak:
        "Ask for a field that genuinely is not in the document. How a tool behaves when the answer is absent tells you more than how it behaves when it is there.",
    },
    {
      title: "Price your real workload before you decide you like it",
      prompt:
        "Multiply your monthly page count by the published rate for the endpoint you need, then check that total against the free balance you start with.",
      whyHere:
        "Reducto publishes a per-endpoint rate card — parse, extract, deep extract, split, deep split, classify and edit each priced separately — so you can cost a project off the pricing page without a sales call. Most vendors in this category quote by conversation, which makes the arithmetic somebody else's.",
      tweak:
        "Do it twice, once for the pages you have today and once for ten times that. The second number is what decides whether this becomes infrastructure or stays an experiment.",
    },
  ],

  pitfalls: [
    "**The $150 is a balance, not a monthly allowance.** The pricing page says standard rates apply after it, which reads as one pot you spend down rather than something that resets. Bulk-parsing a back catalogue is exactly how you would burn through it without noticing.",
    "The endpoint names **are** the pricing, and the \"deep\" variants currently cost roughly double their plain counterparts on the published rate card. Reaching for the strongest option by reflex is the expensive habit here.",
    "Upload limits depend on how you send the file, not on the file. Direct upload is currently capped at 100MB, a presigned upload at 5GB, and passing a link has no stated cap — so \"too big\" usually means you used the wrong door rather than that the document is unsupported.",
    "**This company is moving fast.** It raised a $75M Series B in October 2025, acquired another company in May 2026, and has repositioned from a parsing API to an \"agentic document platform\" along the way. Product names, endpoints and prices are worth re-checking against its own docs before you build anything on them.",
  ],

  whereToNext: [
    {
      label: "Other ways to get answers out of documents",
      categorySlug: "document-pdf-processing",
    },
    {
      label: "More developer services like this one",
      categorySlug: "ai-apis-developer-services",
    },
    {
      label: "Reading long documents rather than parsing them",
      categorySlug: "research-academic-tools",
    },
  ],
};
