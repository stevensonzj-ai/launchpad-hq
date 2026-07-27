import type { PlatformTutorialData } from "./types";

export const acrobatAiTutorial: PlatformTutorialData = {
  slug: "acrobat-ai-getting-started",
  platformSlug: "adobe-acrobat-ai-assistant",
  title: "Getting Started with Acrobat AI Assistant",
  tagline: `Ask questions of a long PDF and get cited answers — inside the reader you probably already have.`,
  archetype: "prompts",
  lastReviewedAt: "2026-07-27",
  changelogUrl: "https://helpx.adobe.com/acrobat/using/whats-new.html",
  accessTier: "PREMIUM",

  howItWorks: `Acrobat AI Assistant is a paid feature inside Adobe Acrobat and the free Acrobat Reader. Open a document and you can ask questions about it in plain language, getting back answers with citations pointing to the passage they came from. It handles scanned documents by running text recognition first, and can work across a set of files rather than one at a time. The design is deliberately narrow: it answers about the documents in front of it rather than about the world.`,

  whatItIs: [
    `A question-and-answer layer over PDFs and other documents, built into software most people already have installed.`,
    `Available as a paid add-on to both the free Reader and paid Acrobat subscriptions.`,
    `Grounded in your documents, with citations back to source passages rather than free-form generation.`,
    `Able to work across multiple documents at once, which is where it beats reading them individually.`,
  ],

  beforeYouStart: [
    `This is a **paid add-on**. It is not included with the free Reader or with a standard Acrobat subscription — it is billed separately on top.`,
    `Pricing has changed since launch and is bundled differently across several Adobe tiers. **Check Adobe's current plans page for the figure that applies to you** rather than relying on a quoted price from an article.`,
    `It works on scanned documents by running text recognition first, but quality drops on poor scans. A bad photograph of a page produces bad answers.`,
    `It answers about your documents, not about the world. It is not a general assistant and does not try to be.`,
  ],

  security: [
    {
      kind: "text",
      text: `This is the reassuring page in a category where most are not. Adobe states that it does not train its generative models on customer document content, and that it contractually prohibits the third-party models it uses from training on that content either. Document content is processed to answer your question and then discarded.`,
    },
    {
      kind: "list",
      label: "What that does and does not mean",
      items: [
        `Your documents are still transmitted for processing — "not used for training" is not the same as "never leaves your device".`,
        `Organisations with stricter requirements can arrange processing inside their own cloud tenancy, which removes the residency objection but costs more.`,
        `Administrators can disable the feature, though the granularity of that control varies by plan.`,
        `Genuinely regulated material still deserves an explicit policy decision rather than an assumption.`,
      ],
    },
    {
      kind: "text",
      text: `Worth noticing why this page reads calmer than its neighbours: the vendor made a **narrow, checkable commitment** and stated it plainly. That is what a good data posture looks like written down, and it is a useful benchmark to hold other tools against when their answer is longer and less specific.`,
    },
  ],

  triad: {
    bestAt: [
      `Finding specific information in a long document quickly`,
      `Summarising a dense report before deciding whether to read it`,
      `Comparing several documents that cover the same ground`,
      `Answering with citations you can jump to and verify`,
    ],
    okayAt: [
      `Poor-quality scans, where text recognition limits everything downstream`,
      `Complex tables and figures, which it reads inconsistently`,
      `Documents in languages outside its supported set`,
    ],
    avoid: [
      `Relying on a summary of a contract or legal document without reading the relevant clauses yourself`,
      `Treating it as a general assistant — it answers about your files, nothing else`,
      `Extremely long documents where an important detail could sit outside what it weighted`,
    ],
  },

  starterActions: [
    {
      title: "Ask what a document is before asking what it says",
      prompt: `What kind of document is this, who produced it, and who is it addressed to? Then tell me what it's trying to get the reader to do.`,
      whyHere: `Orientation questions produce better follow-ups than summary requests, and the answer tells you whether it understood the document at all.`,
      tweak: `If it misidentifies the document type, treat everything after that with suspicion.`,
    },
    {
      title: "Ask a question you already know the answer to",
      whyHere: `The fastest calibration available. You learn whether to trust it on this document in about thirty seconds.`,
      tweak: `Choose something specific and checkable — a date, a number, a named party.`,
    },
    {
      title: "Follow one citation to its source",
      whyHere: `Citations are the feature that makes this checkable rather than merely convenient. Following one turns the habit on.`,
      tweak: `Follow the citation behind the claim you found most useful. Useful and wrong is the expensive combination.`,
    },
    {
      title: "Compare two documents on the same question",
      whatItDoes: `Answers across a set of files rather than one.`,
      whyHere: `The multi-document case is where it saves the most time and where people least expect it to work.`,
      tweak: `Ask specifically where the documents disagree. Agreement is easy; contradictions are what you needed to find.`,
    },
  ],

  pitfalls: [
    `**It is a separate paid add-on.** Neither the free Reader nor a standard Acrobat subscription includes it. Check what your plan actually covers before assuming you have access.`,
    `**Scan quality caps everything.** Text recognition runs before the AI does, so a poor scan produces poor answers with no warning that the input was the problem.`,
    `**Do not accept a summary of a contract.** Summarisation is a starting point for legal or financial documents, never a substitute for reading the clauses that bind you.`,
    `**Not used for training is not the same as never leaves your device.** Documents are still transmitted for processing. For genuinely regulated material, that needs a deliberate decision.`,
    `**Tables and figures are read inconsistently.** Numbers pulled from complex layouts are the most likely thing to be wrong. Verify any figure you intend to act on.`,
  ],

  whereToNext: [
    { label: "Other document and PDF tools", categorySlug: "document-pdf-processing" },
    { label: "Research and academic tools", categorySlug: "research-academic-tools" },
  ],
};
