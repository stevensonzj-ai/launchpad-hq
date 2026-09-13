import type { PlatformTutorialData } from "./types";

export const clioManageTutorial: PlatformTutorialData = {
  slug: "clio-manage-getting-started",
  platformSlug: "clio-manage",
  title: "Getting Started with Clio Manage AI",
  tagline:
    "The assistant built into your firm's case files — it drafts, bills and schedules from work already logged there.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-13",
  accessTier: "PREMIUM",

  howItWorks:
    "You're inside your firm's case-management system, looking at one client's case file. A gem icon at the top of the screen opens a panel where you type a question in plain English. It answers using the files, notes and time entries already in that file, and you edit or discard what comes back before anything is sent.",

  whatItIs: [
    "Clio Manage is the software a law firm runs its day on — every client's case file, or **matter** (the law firm's word for one client's case and everything filed under it), lives in it, along with the time entries, documents and calendar dates attached to that matter.",
    "Manage AI is the assistant Clio built on top of that pile. Because it can only see what your firm has already put into Clio, it is less a chatbot you consult and more a colleague who has read the file: you ask it where a matter stands, or hand it a court notice, and it works from your own records rather than from the open internet.",
    "Clio launched it as Clio Duo and renamed it Manage AI in late 2025, so both names still appear across Clio's help pages and in older write-ups.",
    "Clio sells Manage AI in every region it operates in, and it publishes no list of supported languages.",
  ],

  beforeYouStart: [
    "This is not a tool you try for free and keep. Clio Manage is a paid, per-user subscription with no free plan — currently starting around $49/user/month in the US and around £79/user/month in the UK, and Clio publishes only the entry price for each region and quotes the rest on request. You can see it without paying: Clio offers a 7-day trial at clio.com/signup with, in its words, no credit card required, and Clio's support pages say the trial cancels itself if you never add one. Realistically, though, you will pay — this is a firm's system of record, not a weekend experiment.",
    "**Check which plan you are on before you assume you have the AI, and check it for your own country.** Clio's plan tables differ by region. On the US, UK and Australian pricing pages the AI is bundled and Clio's own FAQ says it comes \"on Core and above … as part of the plan rather than as a separate add-on\" — the cheapest plan (Starter in the US, EasyStart in Australia) is marked No on every AI row. On the Canadian pricing page there is no AI section at all and Manage AI is listed as a paid add-on quoted by a sales rep, with no public price for it anywhere. Clio's help centre adds a third set of plan names again (Standard, Premium, Pro and Suite). Clio's feature pages, meanwhile, describe Manage AI as simply built into Clio Manage. Those sources genuinely disagree, so treat the comparison table for your own country as the answer and confirm against your account rather than against anything marketing says.",
    "Someone with administrator rights has to turn it on. Clio's help centre is explicit that an administrator must activate the feature and accept its terms, so if you are not the person who administers your firm's Clio, your first step is a conversation, not a click. Firm-performance reporting is gated higher again — Clio's current table shows it only from Signature upward.",
    "It is worth exactly as much as your firm's data hygiene. If your firm keeps half its time in a notebook, the assistant has half a file to read.",
    "Where this page describes a screen, it is describing what Clio's own help documentation says the screen does — no account was opened to write it. The exact wording you meet once you are signed in may have moved.",
  ],

  security: [
    {
      kind: "text",
      text: "Clio's AI reads a store your firm has already filled: privileged client material, indexed and searchable, years of it. Clio's terms of service (effective 4 August 2026, under its legal name Themis Solutions) state that using the AI services \"does not grant Themis the right to use any of Subscriber's Confidential Information for the purpose of training generalized LLMs\" — no general-purpose **model** (the AI \"brain\" that does the actual thinking) is being trained on your clients. The same section reserves a narrower right you should read: Clio \"may de-identify and aggregate the Content submitted to, and Output received from, AI Services\" to improve those services. That is a meaningfully different promise from \"your data is never touched,\" and it is the sentence to put in front of whoever signs off on this at your firm.",
    },
    {
      kind: "list",
      label: "Three things worth confirming before a client's file goes through it:",
      items: [
        "**Where the query is processed.** Clio's help centre states that \"depending on where your firm is located, AI features in Clio may process your queries on servers located outside your home jurisdiction,\" and that afterwards \"any resulting data remains securely stored within your region.\" Storage location and processing location are two answers, and only one of them is your region.",
        "**Who the third parties are.** Clio's published subprocessor list (last updated 20 August 2026) names OpenAI, Anthropic, Microsoft (Azure Foundry), Google (Vertex AI) and Amazon (AWS Bedrock) as AI processors, with processing regions listed per vendor — Anthropic showing US only. If your engagement letters or your regulator require you to name who touches client material, that list is the document you need.",
        "**Who inside the firm sees the output.** Clio states that the AI features follow your existing Clio Manage permissions, and drafted client communications are visible and sendable only to the matter's responsible staff member or responsible attorney. That is a genuine control, but it inherits whatever your matter permissions already are — which for many small firms is everyone.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Reconstructing where a matter stands from the file itself — the documents, notes and activity already logged — with citations you can click back to the source document.",
      "Turning work you have already recorded into finished admin: draft bills with cleaned-up narratives, calendar entries pulled out of a court notice, tasks and notes off the back of a stage change.",
      "Getting a first draft of a routine client update written from matter activity, rather than from you remembering what happened.",
    ],
    okayAt: [
      "Reading at volume. A single document analysis currently tops out at 25 documents, 50MB in total and 50MB per file, in DOCX, TXT or PDF; the date-extraction flow takes one document at a time, currently up to about 20 pages or 10MB.",
      "Firm-performance questions. The free-text reporting works, but it sits a tier above the rest of the AI.",
      "Sustained back-and-forth. The document analyser is a one-shot: Clio's own documentation says it \"cannot preserve chat context across sessions or respond to follow-up questions based on past interactions.\"",
    ],
    avoid: [
      "**Calculating a filing deadline and trusting the number.** Clio's help centre says it plainly and its marketing does not: \"AI Scheduling does not currently apply local court rules for counting days when calculating dates. Always check calculated deadlines against official court rules.\" Extracted dates marked \"Calculated\" were derived from other dates, not read off the page.",
      "**Legal research.** It reads your firm's records. It is not a source for what the law says, and asking it to be one confuses a file clerk with a library.",
      "**Sending anything it wrote without reading it.** Clio's terms say outright that it \"does not review Output for accuracy or completeness\" and puts the review obligation on you — including on the billing narratives it rewrote, which are highlighted precisely because they changed.",
    ],
  },

  starterActions: [
    {
      title: "Find out where a matter stands before the client calls",
      prompt:
        "Summarise everything that has happened on this matter in the last 60 days — documents filed, tasks completed, money billed and anything still outstanding.",
      whyHere:
        "Because the assistant is reading the matter record itself rather than a document you pasted in, the summary comes back with in-text citations that open the source document in the file. MyCase will summarise text too; what it does not have is Clio's matter-scoped document store returning a clickable citation trail inside the same matter.",
    },
    {
      title: "Ask one long document a specific question",
      prompt:
        "In this agreement, what are the termination provisions, what notice period applies to each, and which party bears the cost on early termination?",
      whyHere:
        "The analysis flow will not let you skip the question — after you pick the matter and the documents it moves you to a step literally labelled \"Next: Ask your question,\" and you choose Quick or Thorough before it runs. The answer can then be saved back into the matter as a note or a .docx rather than living in a chat log. PracticePanther has no equivalent forced question step scoped to a matter's own attachments, with the result written back into that matter.",
    },
    {
      title: "Let it build the week's draft bills, then check the blue",
      whatItDoes:
        "On a weekly or monthly cadence you set, a scheduled job converts the time and expense entries already logged against hourly, flat-fee and contingency matters into draft invoices, rewrites the entry descriptions for clarity, highlights every line it touched in blue, and routes the draft to your named approvers rather than to the client.",
      whyHere:
        "The mechanism is polish-and-route, not capture: Clio is not watching you work to invent the time entry, it is taking what is already recorded. Smokeball's pitch is automatic time capture, which is a different stage of the billing pipeline altogether.",
    },
    {
      title: "Turn a court notice into calendar entries you approve one by one",
      whatItDoes:
        "You pick the matter, confirm the document type and upload a single document — a court notice, a scheduling order, even handwritten notes. It pulls out the actionable dates, labels any it worked out from another date as \"Calculated,\" and presents the whole set for you to edit, delete or add to before you press Create events.",
      whyHere:
        "The propose-then-confirm step is the mechanism, and it exists because of a limit Clio publishes rather than hides: a screen that makes you approve each date individually is doing real work. Nothing in MyCase pairs a one-document extraction with a \"Calculated\" label on derived dates and a confirmation gate.",
    },
    {
      title: "Deal with the client update it noticed you owe",
      whatItDoes:
        "Without being asked, it watches matter activity — completed tasks, uploaded documents, a change of stage — and drops a suggested client update onto the matter dashboard as an AI Actions card. You open it, adjust the tone or the content, and send.",
      whyHere:
        "This one is on a clock in both directions: the card appears off the back of a specific logged event, and the draft currently expires about a day later, so an unopened suggestion disappears rather than queuing up — an event-triggered draft with an expiry that PracticePanther does not offer.",
    },
  ],

  pitfalls: [
    "**The analyser can only see documents attached to a matter.** A PDF sitting in your inbox or on your desktop is invisible to it until it is uploaded into the file — which for a beginner reads as the AI failing when it is really the filing that hasn't happened yet.",
    "**Automated billing bills what is logged when it runs, not what you meant to log.** Clio's own guidance is that everyone finalises their time and expense entries before the end of the previous business day; time entered the morning after simply isn't in that bill.",
    "**Two products, one gem.** The document-analysis flow is also reachable as \"Analyze with Vincent,\" which is Clio's separate research AI — so the same button can put you in front of a differently-scoped tool than the assistant you were using a moment ago. Note which one answered you.",
  ],

  whereToNext: [
    { label: "Legal AI tools", categorySlug: "legal-ai" },
    { label: "Workflow & Automation", categorySlug: "workflow-automation" },
    { label: "Meetings & Notes", categorySlug: "meetings-notes" },
  ],
};
