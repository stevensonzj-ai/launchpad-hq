import type { PlatformTutorialData } from "./types";

export const nanonetsTutorial: PlatformTutorialData = {
  slug: "nanonets-getting-started",
  platformSlug: "nanonets",
  title: "Getting Started with Nanonets",
  tagline:
    "Feed it the same document a hundred times and it learns your fields — the first twenty are the work.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-09",
  accessTier: "FREE",

  howItWorks:
    "You upload documents — or forward them from an email inbox — and Nanonets reads them, showing the fields it found beside the page it read them from. You check each field, fix what it got wrong, and approve. What you approve feeds back in, so the next batch arrives needing fewer corrections than the last.",

  whatItIs: [
    "Nanonets pulls structured data out of documents that arrive as files — supplier invoices, purchase orders, bank statements, delivery notes, identity documents — and hands the result to the software you keep records in, so nobody retypes it.",
    "It is built for the back office rather than the desk. The people it is designed for handle the same kind of document hundreds of times a month and want that handling to stop being somebody's afternoon.",
    "Beyond reading, it will act on what it read: route anything it is unsure about to a named person, then push the approved result into accounting software like QuickBooks or Xero, or a larger business system like SAP or NetSuite.",
    "If you have one contract to understand, this is the wrong shape of tool — a document chat tool answers you in a minute. Nanonets only pays back on repetition.",
  ],

  beforeYouStart: [
    "Every account currently starts with about $50 in **credits** (the platform's unit of spend — each thing you run costs some) and no card, and Nanonets says credits never expire. That is enough to put real documents through before you decide anything.",
    "The prices are published, which is unusual in this category: currently around $0.02 for a simple step, $0.10 for a standard AI step, and $0.30 for a data-extraction run. The self-serve paid plan is currently $100 a month for 100 credits; above that the buttons read **Talk to sales** and **Book a demo**.",
    "Bring a stack, not a file. Nanonets' own documentation describes a new extraction starting at 0% confidence and rising only as you correct and approve documents, with 90% named as the point it is ready to run unattended. One document cannot move that number.",
    "You do not need accounting or ERP software connected to try it. The free plan currently includes importing from an email address and from cloud folders such as Google Drive, Dropbox, OneDrive and SharePoint, and results can come back out as a spreadsheet.",
    "The free plan is currently capped at three users with community support, so it is a working trial rather than a small-team licence.",
  ],

  security: [
    {
      kind: "text",
      text: "The stake here is different from a chatbot's. You are not typing questions — you are uploading whole documents, and the documents this tool exists to read are the sensitive ones: supplier bank details, payment amounts, staff expenses, and, if you use its pre-built identity-document extraction, driving licences. One upload can contain more personal data about other people than a year of chat.",
    },
    {
      kind: "list",
      label: "What Nanonets publishes",
      items: [
        "**SOC 2** (an audit of how a company handles customer data) — Nanonets states it is SOC 2 compliant and ISO/IEC 27001 certified, with Type I and Type II reports available on request.",
        "AES-256 encryption at rest and 256-bit encryption in transit.",
        "All customer data stored in the USA. Data residency elsewhere, private-cloud or on-premises deployment, and single sign-on sit in the Enterprise tier.",
        "Deletion on written request to dpo@nanonets.com, completed within 30 days.",
        "Where an extraction is personalised to your account, the privacy policy states it exists solely to serve you and is never used to serve another customer.",
      ],
    },
    {
      kind: "list",
      label: "Three things worth reading before you upload anyone else's documents",
      items: [
        "The terms let Nanonets \"freely use Derived Data for its internal business purposes (including without limitation, for purposes of improving, testing, operating, promoting and marketing Nanonets's products and services)\". That is a narrower promise than \"we do not use your data\", and it is worth knowing which one you are relying on.",
        "The strongest no-training language in the privacy policy is scoped to data pulled from your Google account, not to everything you upload. Read it as a Google-integration commitment rather than a blanket one.",
        "The privacy policy says processing may send data to third-party model providers, but the published subprocessor list carries an effective date of December 2, 2020 and names none of them — only cloud hosts and support tools. If you handle regulated material, ask who sees it before you upload, rather than inferring an answer from that page.",
      ],
    },
    {
      kind: "text",
      text: "One asymmetry beginners miss: under **GDPR** (European privacy law governing what companies may do with your data), if you upload an invoice containing a supplier's employee's name and bank details, you are usually the party answerable for it, not the tool. Nanonets publishes access and erasure rights for its own users; it does not carry your obligation for the people inside the documents.",
    },
  ],

  triad: {
    bestAt: [
      "The same document a hundred times over — invoices, purchase orders, bank statements, delivery notes",
      "Documents that arrive in a mess of formats, where no two suppliers lay an invoice out the same way",
      "Line-item tables, which it is built to return as rows rather than as one block of text",
      "Getting the result into accounting or business software without anyone retyping it",
      "Saying when it is unsure, rather than passing a doubtful read through silently",
    ],
    okayAt: [
      "Phone photographs and poor scans, which cap everything downstream",
      "A layout it has never seen, where its documentation notes confidence can fall back",
      "Handwriting, which its training guidance does not address either way",
      "Anything you only need to do once, where correcting and approving costs more time than reading it yourself would",
    ],
    avoid: [
      "Taking the accuracy figures on the marketing pages as your own. Percentages like 93% touchless processing and 95% extraction accuracy are presented as customer outcomes, while your own extraction starts at 0%. Both are true and they describe different months.",
      "Uploading identity documents or regulated records before you have asked which outside model providers see them — the privacy policy says data may go to them and the published list of subprocessors does not name any.",
      "Assuming that because Nanonets says a personalised extraction only serves you, your data is off-limits for product improvement. The Derived Data clause in the terms is the sentence that governs that, and it points the other way.",
      "Planning around private-cloud deployment, data residency or single sign-on on the free or $100 plan — Enterprise is a conversation, not a checkout.",
    ],
  },

  starterActions: [
    {
      title: "Run twenty of the same document, not one",
      prompt:
        "Collect the last twenty invoices from one supplier, upload them together, and correct every wrong field before you approve any of them.",
      whyHere:
        "A one-file test measures nothing, because the mechanism the tool is built on — confidence rising only as you correct and approve — has not run yet.",
      tweak: "Pick the supplier whose invoices are ugliest. Clean ones flatter it.",
    },
    {
      title: "Time yourself correcting",
      prompt:
        "Time how long it takes you to check and fix the extracted fields on ten documents, then divide by ten.",
      whyHere:
        "Nanonets is unusual in publishing what each run costs up front, so the machine side of the bill is knowable on day one. The minutes a person spends fixing fields before approval are the half nobody publishes, and early on they are the larger number.",
      tweak:
        "Take the same measurement again after fifty approvals. The gap between the two readings is the whole return.",
    },
    {
      title: "Feed it the same receipt twice",
      prompt:
        "Upload a phone photograph of a crumpled receipt and a clean scan of the exact same receipt, then compare the two results field by field.",
      whyHere:
        "Nanonets reports a confidence score for the extraction, not for the image it started from, so a bad photograph and a hard document look identical in the output. A controlled pair is the only way to see which one you actually have.",
      tweak: "Then try a layout you have never sent it.",
    },
    {
      title: "Send it in the way it will really arrive",
      prompt:
        "Forward a real invoice email, attachment and all, to the address Nanonets gives your workflow, instead of uploading the file by hand.",
      whyHere:
        "Email and cloud-folder intake are both on the free plan, and they are the only test that matches how documents actually reach a back office — as attachments nobody downloaded.",
      tweak:
        "Forward one email with two attachments, and one with the invoice pasted into the body instead. The second is the case that breaks.",
    },
    {
      title: "Find out who gets interrupted",
      prompt:
        "Raise a field's confidence requirement until documents start failing review, and follow where the review request goes.",
      whyHere:
        "Nanonets raises what it is unsure about in Slack, Teams or email rather than inside its own screen, so the person doing the checking may never open the tool. Deciding who that person is before rollout costs less than discovering it after.",
    },
  ],

  pitfalls: [
    "**The correcting is the real cost.** For the first few weeks the human hours spent fixing fields before approval are larger than what the tool saves. Budget the attention, not just the credits.",
    "**Accuracy claims assume a clean scan.** The training guidance asks for images larger than 1000x1000 pixels and states plainly that blurry images hinder text recognition. A phone photograph of a crumpled delivery note is a different tool's problem.",
    "**A supplier's redesign can quietly undo months of progress.** A workflow that ran unattended can start needing human eyes again with no announcement, so watch the confidence figure, not just the output.",
    "**Self-serve stops at $100 a month.** The capabilities a regulated or larger team is most likely to need — private-cloud or on-premises deployment, data residency options, single sign-on, role-based access — are in that sales conversation rather than on the price list.",
  ],

  whereToNext: [
    { label: "Other document and PDF tools", categorySlug: "document-pdf-processing" },
    { label: "Workflow automation", categorySlug: "workflow-automation" },
    { label: "Finance and accounting AI", categorySlug: "finance-real-estate-ai" },
  ],
};
