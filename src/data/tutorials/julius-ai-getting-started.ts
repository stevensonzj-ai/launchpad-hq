import type { PlatformTutorialData } from "./types";

export const juliusAiTutorial: PlatformTutorialData = {
  slug: "julius-ai-getting-started",
  platformSlug: "julius-ai",
  title: "Getting Started with Julius AI",
  tagline:
    "Upload a spreadsheet, ask questions about it in plain English, and get real calculations back.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-15",
  accessTier: "FREE",

  howItWorks:
    "You drag a spreadsheet into the chat window, then type a question about it the way you'd ask a colleague. Julius works for a moment and answers in the chat — a number, a table, a chart. You read it, ask a follow-up to narrow it down or redraw it, and keep going until it is the answer you wanted.",

  whatItIs: [
    "Julius is a chat window pointed at your own files — a spreadsheet, an export, a PDF — rather than at the open internet.",
    "What separates it from a general chatbot is that it doesn't estimate your numbers. It writes a short computer program, runs it on your file on Julius's servers, and reports back what the program returned. The tables, charts and statistics come out of an actual calculation.",
    "That makes it a fit for the \"I have a file and a question\" job — sales by region, which survey answers cluster together, what a trend actually looks like — for people who would otherwise be losing an afternoon to pivot tables. The programs it writes are in Python or R, the two languages analysts use for this work, and you can read them.",
  ],

  beforeYouStart: [
    "Free to use after a sign-up at julius.ai. The free plan currently runs on **25 credits a day** (the platform's unit of spend — each thing you do costs some), plus a one-off 25-credit welcome bonus when you join. The daily allowance refills each day and does not accumulate, and when it runs out it simply stops until the next day — Julius does not sell top-up credits, and its billing documentation does not spell out what you see when you hit the end. That is enough to explore a file and answer a few questions, not enough to work through an afternoon of analysis.",
    "The free plan runs only Julius's smallest **model** (the AI \"brain\" that does the actual thinking) — Julius 1.2 Lite, which Julius's own model documentation scopes to \"quick answers to simple questions.\" Every larger Julius model and every outside model on the selector is paid, currently from around $20/month for the Plus plan. If your first answers feel shallow, that is the likeliest reason, and it isn't your question.",
    "**Your uploaded files do not stay.** On a free account they are deleted after one hour of inactivity; on a paid account they last up to seven days. Re-uploading at the start of a session is normal, and nothing here is storage — keep your own copy of anything you care about.",
    "Julius runs each analysis inside a temporary computer it spins up for your chat, with 8GB of working memory on every plan. That covers most spreadsheets, but a file with millions of rows can exhaust it. Julius publishes no row limit and no file-size cap — its FAQ says there is \"no limit enforced by us\" and points at that memory as the practical ceiling — so there is no number to plan against, only the ceiling. A 32GB \"Memory Boost\" option exists as a Pro-plan upgrade, and Julius's FAQ separately describes the sandbox as having 32GB, which its own container documentation contradicts; the two vendor pages genuinely disagree, so assume 8GB unless you are paying for the upgrade.",
    "Connecting a real database — Postgres, Snowflake, BigQuery — is a paid feature. Free accounts can upload files directly or pull them from Google Drive, OneDrive and SharePoint.",
  ],

  security: [
    {
      kind: "text",
      text: "Julius's stated position is unusually clear for a tool you feed real files to. Its data-security documentation says \"Your data is not used to train any models, internally or externally,\" and its terms say Julius \"contractually restricts the AI Providers from using User Generated Content for training or otherwise improving such AI Provider's services for general use.\" All data is stored and processed in the United States. The privacy policy was last updated 1 July 2026 and the terms 6 March 2026; both govern today.",
    },
    {
      kind: "text",
      text: "The same terms then take a broad licence to what you upload. By making content available through the service you grant Julius \"a worldwide, irrevocable, perpetual, non-exclusive, transferable, royalty free license, with the right to sublicense, to use, access, view, copy, adapt, modify, distribute, license, sell, transfer\" it — and the clause is not worded as applying only to things you choose to share publicly. The no-training commitment and that licence sit awkwardly together, and the terms are the document that binds. Read them yourself before a file matters.",
    },
    {
      kind: "list",
      label: "Think hard before uploading",
      items: [
        "Customer or patient records with real names still attached",
        "Payroll, HR or performance files",
        "Anything you have signed a confidentiality agreement over",
        "Financial exports that identify individual people",
      ],
    },
    {
      kind: "text",
      text: "On the other side of the ledger: the terms say \"You exclusively own all right, title, and interest in and to the AI Content,\" so the charts, tables and reports you get out are yours. Julius's FAQ says that when you delete data in the app \"it is completely erased from our servers,\" and deleting your account is self-serve from account settings.",
    },
  ],

  triad: {
    bestAt: [
      "Answering a question about a file you already have — totals, breakdowns, \"which of these is the odd one out\"",
      "Turning a messy export into a usable table: fixing dates, splitting columns, catching duplicates",
      "Making a chart without deciding on a chart type first — describe what you want to see and let it pick",
      "Statistical work you know the name of but not the syntax — a regression, a correlation matrix, a comparison between two groups",
    ],
    okayAt: [
      "PDFs and images as data sources: they're supported, but pulling numbers out of a scanned or awkwardly laid-out document is hit and miss",
      "Long, multi-step analyses on the free plan — it runs out of room before you run out of questions",
    ],
    avoid: [
      "Treating a number as checked just because a program produced it. Julius decides which program to write from your wording — a correct calculation run on the wrong column, or on rows it quietly dropped while tidying, comes back as a confident figure with no error message anywhere.",
      "Building anything that needs to still exist next month. Julius has already sunset its Notebooks and Custom Agents features, and its file storage is designed to expire rather than to archive. It is a tool for a working session, not a system of record.",
    ],
  },

  starterActions: [
    {
      title: "Get a file in front of it first",
      whatItDoes:
        "Click the paperclip in the chat bar, or drag a spreadsheet straight onto the conversation. Julius reads it and tells you what columns it found before you've asked anything.",
      whyHere:
        "With no file attached you are driving Julius's smallest model as a plain chatbot, which the free tiers built for that job do better — the file is the entire reason to be here.",
      tweak:
        "No file to hand? Ask it to invent a realistic sample dataset and analyse that instead.",
    },
    {
      title: "Make it describe the file before you trust it",
      prompt:
        "Before answering anything else: list every column in this file with its data type, tell me how many rows there are, how many blank and how many duplicate values are in each column, and flag anything that looks inconsistent. Don't clean or change anything yet.",
      whyHere:
        "A misread column costs the same day's credits as a correct one, and the free allowance does not come back until tomorrow — so making Julius state what it thinks your columns hold is the cheapest run of the session, and it catches the misread before it becomes a number in someone's slide.",
      tweak:
        "Paste any column it misreads back to it with a one-line explanation of what that column actually holds.",
    },
    {
      title: "The plain question, with the format named",
      prompt:
        "Using the attached file, show me total revenue by region for the last 12 months as a table, sorted highest to lowest. Then show the same thing as a bar chart. Finally, tell me which region changed most compared with the 12 months before that, and by how much.",
      whyHere:
        "Julius's own prompting guidance tells you to name the output format — say \"table\" and \"bar chart\" and you get both objects, rather than a paragraph describing what a chart would show.",
      tweak:
        "Swap in your own column names; \"revenue\", \"region\" and \"date\" are just placeholders.",
    },
    {
      title: "Read the code it actually ran",
      whatItDoes:
        "Open the Code Sandbox panel next to the chat — Julius's documentation describes it as \"where Julius runs all code behind your analysis\" — and read the handful of lines behind the answer you just got, paying most attention to any row it filtered out.",
      whyHere:
        "Julius documents a place of its own for the code rather than folding it into the reply, so the one thing the chat cannot tell you — what the program did to your rows before it answered — has somewhere to be read.",
      tweak:
        "If a line is opaque, paste it back into the chat and ask what it does and why it chose that approach.",
    },
    {
      title: "The cleanup job that leaves with you",
      prompt:
        "This export is messy. Standardise the date column to YYYY-MM-DD, strip stray spaces and fix inconsistent capitalisation in the name column, and flag rows that look like duplicates rather than deleting them. Then give me the cleaned version as an Excel file to download, and list every change you made.",
      whyHere:
        "Julius can hand the result back as a real file with a download link in the chat, so a cleanup pays off once instead of being trapped inside a conversation you'll lose at the end of the session.",
      tweak: "Ask for CSV instead if the file is heading into another program.",
    },
  ],

  pitfalls: [
    "Credits drain unevenly. Cost depends on what a request sets off — running code, searching the web, building a deck — so a handful of ambitious asks can clear a free day's allowance while a dozen simple questions wouldn't dent it.",
    "A new chat appears to start a fresh sandbox, so a second conversation won't have your file or anything you built from it. Julius's container documentation implies one temporary computer per conversation without quite saying so, but stay in one chat while you're working on one dataset.",
    "Asking for the conclusion instead of the calculation. \"Is this trend real?\" gets an opinion. \"Compare these two groups with an appropriate statistical test, tell me which test you used, and say how confident the result is\" gets something you can check.",
    "Julius's plan table marks presentations, images, videos and website-building as \"Limited\" on the free plan without ever saying limited to what. You find out by running into it.",
  ],

  whereToNext: [
    { label: "Document & PDF tools", categorySlug: "document-pdf-processing" },
    { label: "Chat assistants", categorySlug: "text-conversational-ai" },
  ],
};
