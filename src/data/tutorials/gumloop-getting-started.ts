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

  howItWorks: `Gumloop gives you a blank canvas. You drag boxes onto it, and each box does one small job: fetch the new email, read the attached PDF, ask an AI for the total, add a row to your spreadsheet. Lines between the boxes set the order. Each box is a **node** — Gumloop's word for one step.`,

  whatItIs: [
    "A visual automation builder. You connect your accounts once — Gmail, Slack, Drive, Notion, Airtable and a few hundred others — then build workflows that move information between them while you do something else.",
    `AI steps are ordinary boxes on the canvas: "Ask AI", "Extract Data", "Categorizer". Summarising or pulling fields out of messy text sits mid-workflow instead of in a separate service. Gumloop's own published examples lean that way — contract clause extractors, invoice processors, PDF readers.`,
    `Why this over Zapier, Make or n8n, all already on this site? For simple "when this, then that" plumbing, Zapier is easier and free. Gumloop earns its price when the middle of the job needs judgement — reading, classifying, extracting — across a batch.`,
  ],

  beforeYouStart: [
    "**There is no free plan.** Gumloop dropped its permanent free tier in mid-2026; the pricing page now lists Pro and Enterprise plus a 14-day trial. The entry plan is currently around $37 a month for an allowance in the tens of thousands of **credits** — the platform's unit of spend. Check the pricing page for today's figure, because this company repackaged recently.",
    "So the real question is what fourteen days can show you. Bring a card, and one job worth automating — a folder of invoices, a weekly report you assemble by hand. Open the template gallery rather than a blank canvas and run someone else's finished workflow first.",
    "Simple steps are cheap or free; the AI steps are what you actually pay for, billed on how much text the AI reads and writes, with the bigger, smarter ones costing more per word. Credits currently don't roll over.",
  ],

  security: [
    {
      kind: "text",
      text: "Building the workflow is the half you can see. The half you can't is the standing permission that runs it: link your Gmail or Drive and Gumloop can open, read and write in that account on a schedule, at three in the morning, without asking you again.",
    },
    {
      kind: "list",
      label: "Sensible habits when connecting accounts",
      items: [
        "Prefer workflows that read over ones that send, delete or overwrite.",
        "Point early workflows at one test folder or label, not your whole inbox.",
        "Every few months, disconnect apps no live workflow uses.",
      ],
    },
    {
      kind: "text",
      text: "Documents you push through AI steps go out to third-party AI providers to be processed. Gumloop's privacy policy says that for paying customers it does not use your uploaded data, flows or chat sessions to train any AI, and that those providers are contractually committed not to train on data sent through Gumloop. Better than silence — but treat confidential material as a deliberate decision, not a default.",
    },
  ],

  triad: {
    bestAt: [
      "Reading a batch of documents — PDFs, contracts, invoices, resumes — and pulling the same fields from each",
      "Summarising and classifying messy text so it lands somewhere already sorted",
      "Repetitive research and reporting: gather, condense, drop it somewhere",
    ],
    okayAt: [
      "Plain two-step plumbing with no thinking in the middle — more tool than you need",
      "Real-time reactions; scheduled and triggered runs are the natural rhythm",
      "Being learned from a blank canvas rather than a template",
    ],
    avoid: [
      "Free-forever tinkering — Gumloop dropped its free plan in mid-2026, leaving Pro, Enterprise and a 14-day trial",
      "Pointing an AI step at a batch before you've priced a single run — two hundred documents is not twenty times ten",
      "Confidential material on the strength of the no-training promise — a policy, not a technical guarantee",
      "Saving up an allowance for a big month — credits currently don't roll over",
    ],
  },

  starterActions: [
    {
      title: "When a PDF invoice arrives in Gmail, then extract the totals into a spreadsheet",
      whatItDoes:
        "A Gmail **trigger** — the event that starts a workflow — watches one label, a document step reads the attachment, an AI step pulls supplier, date and amount, and a row lands in Sheets.",
      whyHere:
        "Elsewhere, reading a PDF means bolting on a separate parsing service; here it is another box on the same canvas.",
      tweak: "Flag anything over a threshold into Slack instead of filing it silently.",
    },
    {
      title: "When a file lands in a Drive folder, then summarise it and file the summary",
      whyHere:
        "It writes a plain-language summary of each new document into a running doc. Looping over the batch costs nothing — only the summarising does — so forty documents is a reasonable trial-week test.",
      tweak: "Ask for three bullets and one open question instead of a paragraph.",
    },
    {
      title: "When a form is submitted, then classify it and route it to the right place",
      whatItDoes:
        "A form or Airtable trigger fires, a categoriser step decides which bucket the submission belongs in, and a router sends it onward.",
      whyHere: `Classification is a first-class node, so "which of these five things is this?" is one box rather than a chain of brittle keyword rules.`,
      tweak: "Add a catch-all branch so anything uncertain reaches a human.",
    },
  ],

  pitfalls: [
    "**AI steps are where the money goes.** Run one, check what it consumed, then multiply before you point it at the pile.",
    "**Test on a single item before switching it on.** Batch automations don't make one mistake, they make two hundred identical ones.",
    "**Don't start on a blank canvas.** Open a template, run it, break it, rebuild it — most people who bounce off this kind of tool bounced off an empty screen.",
  ],

  whereToNext: [
    { label: "More ways to connect your apps together", categorySlug: "workflow-automation" },
    { label: "Tools built for documents and PDFs", categorySlug: "document-pdf-processing" },
  ],
};
