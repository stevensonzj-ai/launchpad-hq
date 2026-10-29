import type { PlatformTutorialData } from "./types";

export const geminiNotebookTutorial: PlatformTutorialData = {
  slug: "gemini-notebook-getting-started",
  platformSlug: "gemini-notebook",
  title: "Getting Started with Gemini Notebook (formerly NotebookLM)",
  tagline:
    "Upload your own documents and Gemini Notebook answers questions using only those sources — with citations, and even a podcast-style audio summary.",
  archetype: "prompts",
  lastReviewedAt: "2026-10-29",
  accessTier: "FREE",

  howItWorks:
    "You create a notebook, add your sources — files, links, notes — and then chat with them: ask for a summary, a comparison, an explanation, and it answers from those documents only, with citations you click to see the passage. Add another source and ask again; the answers change with what's in the notebook.",

  whatItIs: [
    "Gemini Notebook — called NotebookLM until Google renamed it on 16 July 2026 — is Google's **source-grounded research assistant.** You upload your own material — PDFs, Google Docs, web pages, YouTube videos, notes — and it answers questions using **only those sources**, citing exactly where each answer came from. Because it's anchored to what you gave it, it rarely makes things up. It also turns your sources into study aids: an **Audio Overview** (a podcast-style conversation about your material), video overviews, mind maps, flashcards, and summaries. It's for students, researchers, and anyone making sense of a stack of documents.",
    "Google calls the rename \"the same standalone product, now doing more across the Google ecosystem\": you can also open and create notebooks inside the Gemini app, synced with the standalone site at notebook.google.com. Old NotebookLM links redirect there.",
  ],

  beforeYouStart: [
    "Free with a Google account, no time limit. Google's help center lists up to 100 notebooks and 50 sources per notebook without a plan. Chatting and the studio features run on compute-based usage limits that refresh every five hours, up to a weekly limit — enough for a real study session, and most people never need to pay.",
    "**Paid tiers** (bundled into Google's AI plans, which start at a low monthly price) raise those limits — Google's help center says AI Plus gives two times the standard usage and AI Pro four times — and add heavier features.",
    "One structural thing to know: it's **cloud-only** (no offline mode), and every source caps at a large but real size limit — a single enormous file may not import.",
  ],

  security: [
    {
      kind: "text",
      text: "Gemini Notebook's defining trait is that it answers **only from the sources you upload**, with citations — so unlike an open chatbot, it rarely fabricates, and you can trace every answer back to a specific document. That grounding is the whole point.",
    },
    {
      kind: "list",
      label: "Where your documents stand",
      items: [
        "Google states it **does not train its models on the documents you upload**, and your sources stay private unless you choose to share a notebook.",
        "But your files **are processed on Google's servers** (it's cloud-only) — so for truly confidential or regulated material, the personal version isn't the right home; that's what the enterprise version exists for.",
        "Each notebook is self-contained — it can't pull from your other notebooks or the open web, which is a privacy feature as much as a limitation.",
      ],
    },
    {
      kind: "text",
      text: "It's grounded, not infallible: it can still misread a source or miss context. Click the citations to confirm, exactly as you would with any research tool.",
    },
  ],

  triad: {
    bestAt: [
      "Answering questions from your own documents, with citations",
      "Turning a pile of PDFs into a searchable, summarizable knowledge base",
      "Making study aids — audio overviews, mind maps, flashcards — from your sources",
      "Staying grounded, so it rarely invents facts",
    ],
    okayAt: [
      "Very large single files (each source has a size ceiling)",
      "Working across many notebooks at once (each is siloed)",
      "Confidential/regulated material (cloud-only; use the enterprise version)",
    ],
    avoid: [
      "Uploading sensitive files that shouldn't leave your control",
      "Treating the audio/summary as verified without checking citations",
      "Expecting it to answer from outside your uploaded sources",
    ],
  },

  starterActions: [
    {
      title: "Make a notebook and add sources",
      whatItDoes:
        "Create a notebook and upload a few related documents — a PDF, a Google Doc, a web article on one topic.",
      whyHere:
        "Everything grounds on your sources; this is the step that makes Gemini Notebook different from a chatbot.",
      tweak: "Start with material you already need to understand — lecture notes, a report, a contract.",
    },
    {
      title: "Ask a grounded question",
      prompt:
        "Summarize the main argument across these sources, and list the points where they disagree. Cite where each point comes from.",
      whyHere: "Shows the core value — a cited synthesis of **your** material, not the open web.",
      tweak: "Follow up by asking it to explain any point \"like I'm new to this.\"",
    },
    {
      title: "Generate an Audio Overview",
      whatItDoes:
        "Create the podcast-style Audio Overview and listen to two AI hosts discuss your sources.",
      whyHere:
        "It's the feature that made the product famous back when it was called NotebookLM, and a genuinely different way to absorb dense material.",
      tweak: "Great for reviewing on a commute — but still check the citations for anything you'll rely on.",
    },
  ],

  pitfalls: [
    "**It only knows what you give it.** That's the point — it won't answer from the open web, so add the right sources.",
    "**Cloud-only, files on Google's servers.** Fine for most material; not for truly confidential or regulated files (use the enterprise version).",
    "**Grounded isn't infallible.** It can still misread a source — click citations before relying on an answer.",
  ],

  whereToNext: [
    { label: "Research & Academic Tools", categorySlug: "research-academic-tools" },
    { label: "Document & PDF Processing", categorySlug: "document-pdf-processing" },
  ],
};
