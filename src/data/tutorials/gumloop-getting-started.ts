import type { PlatformTutorialData } from "./types";

export const gumloopTutorial: PlatformTutorialData = {
  slug: "gumloop-getting-started",
  platformSlug: "gumloop",
  title: "Getting Started with Gumloop",
  tagline:
    "Build automations by dragging boxes onto a canvas — with AI steps built in, not bolted on.",
  archetype: "recipes",
  lastReviewedAt: "2026-09-07",
  changelogUrl: "https://www.gumloop.com/changelog",
  accessTier: "PREMIUM",

  howItWorks: `Gumloop gives you a blank canvas. You drag boxes onto it, and each box does one small job: fetch the new email, read the attached PDF, ask an AI model for the total, add a row to your spreadsheet. Then you draw lines between the boxes to set the order. Each box is a **node** — Gumloop's word for one step. The first step is the **trigger**, the "when"; everything after it is an **action**, the "then".`,

  whatItIs: [
    "A visual automation builder. Connect your accounts once — Gmail, Slack, Drive, Notion, Airtable and a few hundred others — then build workflows that move information between them for you.",
    `AI steps are ordinary citizens on the canvas. "Ask AI", "Extract Data" and "Categorizer" are nodes you drag in like any other, so summarising and pulling fields out of messy text sits mid-workflow instead of being a separate service you wire up.`,
    "It leans toward documents and data. Gumloop's own published examples are contract clause extractors, invoice processors and PDF readers — jobs where the hard part is reading a pile of files.",
    `Why this over Zapier, Make or n8n, all already on this site? Honestly: for simple "when this, then that" plumbing, Zapier is easier. Gumloop earns its place when the middle of the job needs judgement — reading, classifying, extracting — across a batch. Its pricing follows that shape: currently, ordinary steps like logic, loops and app connections generally cost nothing, and you pay mainly for the AI steps.`,
  ],

  beforeYouStart: [
    "**This one costs money from day one.** Gumloop had a permanently free plan and dropped it in mid-2026. The pricing page now lists only Pro and Enterprise, plus a 14-day trial. If you want free-forever tinkering, start with a free-tier tool from this site instead.",
    "**What you need:** a card, about half an hour, and the account you want to automate — a Gmail or Drive login is enough to follow along.",
    "**How the meter works.** Your plan includes a monthly allowance of **credits**, the platform's unit of spend. Simple steps are cheap or free; AI steps are the expensive ones, billed on how much text the model reads and writes, with bigger models costing more per word. Credits currently don't roll over.",
    "**Will you realistically need to pay? Yes.** Budget for the entry plan — currently around $37 a month for an allowance in the tens of thousands of credits. Check the pricing page for today's figure; this company changed its packaging recently.",
    "**Your first move:** start the trial, open the template gallery rather than a blank canvas, and run someone else's finished workflow before you build anything.",
  ],

  security: [
    {
      kind: "text",
      text: "The risk with a tool like this isn't what you type into it — it's what you connect to it. Linking your Gmail or Drive hands Gumloop standing permission to act in that account on your behalf, on a schedule, while you're not watching. That's the whole value and the whole risk.",
    },
    {
      kind: "list",
      label: "Sensible habits when connecting accounts",
      items: [
        "Prefer workflows that read over ones that send, delete or overwrite.",
        "Learn on a spare or personal account rather than your work login.",
        "Point early workflows at one test folder or label, not your whole inbox.",
        "Every few months, disconnect apps no live workflow uses.",
      ],
    },
    {
      kind: "text",
      text: "Documents you push through AI steps are sent to third-party model providers to be processed. Gumloop's privacy policy says that for paying customers it does not use your uploaded data, flows or agent chats to train any AI, and that its model providers are contractually committed not to train on data sent through Gumloop. That's better than silence, but it's a policy, not a technical guarantee — so treat confidential material as a deliberate decision, not a default.",
    },
  ],

  triad: {
    bestAt: [
      "Reading a batch of documents — PDFs, contracts, invoices, resumes — and pulling the same fields out of each",
      "Summarising and classifying messy text so it lands somewhere already sorted",
      "Repetitive research and reporting: gather, condense, drop the result in a doc or Slack",
    ],
    okayAt: [
      "Plain two-step plumbing with no thinking in the middle — more tool than the job needs",
      "Real-time reactions; scheduled and triggered runs are the natural rhythm",
      "Being learned from a blank canvas without leaning on templates first",
    ],
    avoid: [
      "Free-forever tinkering — there's no free plan any more",
      "Anything where a wrong answer is costly and nobody checks it",
      "Business-critical processes on day one",
    ],
  },

  starterActions: [
    {
      title: "When a PDF invoice arrives in Gmail, then extract the totals into a spreadsheet",
      whatItDoes:
        "A Gmail trigger watches one label, a document step reads the attachment, an AI step pulls out supplier, date and amount, and a last step appends a row to Sheets.",
      whyHere:
        "Elsewhere, reading a PDF means bolting on a separate parsing service. Here the document step and the extraction step are both just nodes on the same canvas.",
      tweak: "Flag anything over a threshold into Slack instead of filing it silently.",
    },
    {
      title: "When a file lands in a Drive folder, then summarise it and file the summary",
      whatItDoes:
        "Watches one folder, reads each new document, asks AI for a short plain-language summary, and writes it to a running doc.",
      whyHere:
        "Looping over a batch is a normal part of the canvas and the looping itself costs nothing — only the summarising does, so running it over forty documents is reasonable to try.",
      tweak: "Ask for three bullets and one open question instead of a paragraph.",
    },
    {
      title: "When a form is submitted, then classify it and route it to the right place",
      whatItDoes:
        "A form or Airtable trigger fires, a categoriser step decides which bucket the submission belongs in, and a router sends each to a different owner.",
      whyHere: `Classification is a first-class node, so "which of these five things is this?" is one box rather than a chain of brittle keyword rules.`,
      tweak: "Add a catch-all branch so anything uncertain reaches a human.",
    },
    {
      title: "Every Monday morning, then research a topic and write the week's briefing",
      whatItDoes:
        "A schedule trigger fires, steps gather from the web and your own sources, and an AI step drafts a summary into a doc.",
      whyHere:
        "Gathering and writing live in one workflow, so you're not pasting search results into a chatbot by hand every week.",
      tweak: "Keep a running archive doc to see how the picture shifts.",
    },
  ],

  pitfalls: [
    "**AI steps are where the money goes.** They're billed by how much text goes in and out, so summarising two hundred documents costs vastly more than ten. Run one, check what it consumed, then multiply.",
    "**Test on a single item before switching it on.** Run it manually against one email or file and read the output yourself. Batch automations don't make one mistake, they make two hundred identical ones.",
    "**Don't start on a blank canvas.** Open a template, run it, break it, rebuild it. Most people who bounce off this kind of tool bounced off an empty screen.",
    "**Connecting an account is a real permission.** Give each workflow the narrowest scope you can before pointing it at everything.",
    "**The AI step will be wrong sometimes, and won't sound wrong.** Spot-check extracted figures for the first fortnight.",
  ],

  whereToNext: [
    { label: "More ways to connect your apps together", categorySlug: "workflow-automation" },
    { label: "Tools built for documents and PDFs", categorySlug: "document-pdf-processing" },
  ],
};
