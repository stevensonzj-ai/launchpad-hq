/**
 * Hand-written titles and meta descriptions for pages whose generated
 * snippet does not match the query. `revisedAt` is the day the snippet
 * was written. `snippetRevisionDate` is what the sitemap uses as one
 * content date. It is not a build timestamp.
 *
 * Descriptions only say what the page already says. Length targets:
 * title 50-60 characters including the brand suffix, description 140-155.
 */
export type SnippetOverride = {
  title: string;
  description: string;
  /** YYYY-MM-DD. The day this snippet was written. */
  revisedAt: string;
};

const REVISED_AT = "2026-11-26";

export const SNIPPET_OVERRIDES: Readonly<Record<string, SnippetOverride>> = {
  "/platform/khan-academy-khanmigo/guide": {
    title: "How to use Khanmigo, Khan Academy's tutor | Launchpad HQ",
    description:
      "Khanmigo is Khan Academy's AI tutor. This guide covers who can use it, how it asks instead of answering, and what teachers get for free today.",
    revisedAt: REVISED_AT,
  },
  "/platform/research-rabbit/guide": {
    title: "How to use Research Rabbit to find papers | Launchpad HQ",
    description:
      "Research Rabbit starts from a paper you trust and follows citations to related work. This guide shows how to build a collection and read the map.",
    revisedAt: REVISED_AT,
  },
  "/platform/research-rabbit": {
    title: "Research Rabbit: paper discovery overview | Launchpad HQ",
    description:
      "Research Rabbit recommends academic papers from ones you already trust. This overview covers the free plan and the paid tier. It is not the sign-up page.",
    revisedAt: REVISED_AT,
  },
  "/platform/granola/guide": {
    title: "How to use Granola for meeting notes | Launchpad HQ",
    description:
      "Granola takes meeting notes from your computer's audio, with no bot in the call. This guide covers install, sign-in, and the audio permissions.",
    revisedAt: REVISED_AT,
  },
  "/platform/gong/guide": {
    title: "How to use Gong, a guide for beginners | Launchpad HQ",
    description:
      "Gong records sales calls and lets you ask about them afterward. This guide is for someone whose employer already pays for a seat, not a free signup.",
    revisedAt: REVISED_AT,
  },
  "/platform/bloomberg-gpt-terminal-ai/guide": {
    title: "Bloomberg GPT: a plain-English guide | Launchpad HQ",
    description:
      "Bloomberg's AI lives inside the Terminal. The BloombergGPT model people search for is not something you can sign up for. This guide says what you can use.",
    revisedAt: REVISED_AT,
  },
  "/platform/spellbook/guide": {
    title: "Spellbook guide: contracts inside Word | Launchpad HQ",
    description:
      "Spellbook marks up contracts inside the Word file you already have open. This guide covers setup and the security facts Spellbook publishes for IT.",
    revisedAt: REVISED_AT,
  },
  "/platform/harvey-ai/guide": {
    title: "How to use Harvey AI for legal work | Launchpad HQ",
    description:
      "Harvey is legal AI sold to firms by contract, not a card checkout. This guide explains who can get in and the part you can try without a firm licence.",
    revisedAt: REVISED_AT,
  },
  "/platform/openevidence/guide": {
    title: "OpenEvidence: a clinician's how-to guide | Launchpad HQ",
    description:
      "OpenEvidence answers clinical questions with citations for verified US clinicians. This guide explains how to use it and why it is not for patients.",
    revisedAt: REVISED_AT,
  },
  "/platform/magicschool/guide": {
    title: "How to use MagicSchool for lesson plans | Launchpad HQ",
    description:
      "MagicSchool is a library of AI tools for teachers: lesson plans, quizzes, rubrics, and rooms you control. This guide shows what to try first.",
    revisedAt: REVISED_AT,
  },
  "/platform/mistral-vibe/guide": {
    title: "How to use Mistral Vibe, formerly Le Chat | Launchpad HQ",
    description:
      "Mistral Vibe, formerly Le Chat, is a chat assistant that can also run multi-step jobs. This guide covers how to start and what the rename changed.",
    revisedAt: REVISED_AT,
  },
  "/platform/connected-papers/guide": {
    title: "Connected Papers: a beginner's map guide | Launchpad HQ",
    description:
      "Connected Papers turns one paper you already have into a visual map of the field around it. This guide shows how to start a graph and read it.",
    revisedAt: REVISED_AT,
  },
  "/platform/tactiq/guide": {
    title: "How to use Tactiq for live transcripts | Launchpad HQ",
    description:
      "Tactiq transcribes calls from inside your browser, and no bot joins the meeting. This guide covers how to turn it on and what the free plan limits.",
    revisedAt: REVISED_AT,
  },
  "/platform/quizlet-q-chat/guide": {
    title: "How to use Ask Quizlet while you study | Launchpad HQ",
    description:
      "Ask Quizlet is the AI study chat inside Quizlet, and it is not the older Q-Chat product. This guide explains what it does now and who can use it.",
    revisedAt: REVISED_AT,
  },
  "/platform/fathom/guide": {
    title: "How to use Fathom for meeting notes | Launchpad HQ",
    description:
      "Fathom records, transcribes, and summarises Zoom, Meet, and Teams calls. This guide covers starting on the free plan and the sharing defaults to change.",
    revisedAt: REVISED_AT,
  },
  "/platform/groq/guide": {
    title: "How to use Groq for fast AI answers | Launchpad HQ",
    description:
      "Groq serves fast answers from open models. This beginner's guide shows how to pick a model in the browser and ask a question before writing code.",
    revisedAt: REVISED_AT,
  },
  "/platform/speechify/guide": {
    title: "How to use Speechify for reading aloud | Launchpad HQ",
    description:
      "Speechify reads web pages, documents, and files out loud. This guide covers how to start, the free version, and a trial that bills if you do not cancel.",
    revisedAt: REVISED_AT,
  },
  "/platform/lexis-plus-ai": {
    title: "Lexis+ AI: what this overview covers | Launchpad HQ",
    description:
      "This is a Launchpad overview of Lexis+ with Protégé, not the Lexis sign-in page. It covers what the legal research assistant is for and who it is sold to.",
    revisedAt: REVISED_AT,
  },
};

export function snippetOverride(path: string): SnippetOverride | undefined {
  return SNIPPET_OVERRIDES[path];
}

export function snippetRevisionDate(path: string): string | undefined {
  return snippetOverride(path)?.revisedAt;
}
