import type { PlatformTutorialData } from "./types";

export const pineconeTutorial: PlatformTutorialData = {
  slug: "pinecone-getting-started",
  platformSlug: "pinecone",
  title: "Getting Started with Pinecone",
  tagline:
    "The searchable memory behind \"chat with your own documents\" apps — free to start, with one part that works in a browser without code.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-08",
  changelogUrl: "https://docs.pinecone.io/release-notes",
  accessTier: "FREE",

  howItWorks:
    "You sign in to Pinecone's console in a browser, create a store for your material, and upload documents into it. Then you ask a question in a chat box and get back an answer with citations pointing at the files it came from. Programs do the same thing without the browser, sending questions in and getting matches back.",

  whatItIs: [
    "Pinecone is a **vector database** — a store that finds things by meaning rather than by matching exact words. Ask it about \"refund policy\" and it surfaces a paragraph on money-back guarantees though not one word lines up. It is the part you never see: when an app answers questions about files you uploaded, something has to hold that material in a searchable form.",
    "It is built for people making things — with one exception. Pinecone's assistant feature lets you upload documents in the console and ask questions about them in a chat box, citations included, with no code. Everything past that assumes you write software.",
    "Ignore the homepage headline: the company currently leads with Nexus, an enterprise product that installs into a large company's own cloud, and it is not what the free plan gives you.",
  ],

  beforeYouStart: [
    "The free Starter plan is a standing allowance, not a trial — Pinecone's docs say it \"has no monthly minimum,\" and it does not expire. It currently covers around 2 GB of stored data, one project and two people. You enter a card only if you upgrade; the first paid step is currently $20 a month flat.",
    "It blocks rather than bills. On the flat-fee plans, using up a monthly allowance returns an error and an upgrade prompt instead of an overage charge.",
    "Nothing installs. Everything runs on Pinecone's servers, in a browser at app.pinecone.io — which also means your uploaded material lives on their infrastructure.",
    "If you only want to ask questions about your own files, a consumer AI assistant with file upload gets you there faster. Pinecone earns its place when the material is bigger than that, or when something you are building must search it for other people.",
  ],

  security: [
    {
      kind: "text",
      text: "Your documents leave your computer; that is the arrangement with a hosted service. Pinecone's security page says your data \"is only used for servicing API calls\" — not for training models — and lists SOC 2 Type II and ISO 27001 certification, GDPR readiness, and HIPAA compliance on request. Data is encrypted in transit and at rest.",
    },
    {
      kind: "list",
      label: "Two things worth knowing",
      items: [
        "The exposure is a different shape from a chatbot's: you are not typing one message you might regret, you are uploading a whole body of material, and all of it becomes retrievable by anything holding the key.",
        "An **API key** is a password that identifies your app — and this one can read, change and delete everything you have stored, not merely spend money. One key per project; delete any you think has been seen.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Finding relevant passages across a large pile of material by meaning, which keyword search cannot do",
      "Being the memory behind an app other people use — fully managed, so there is no server to keep alive",
      "Getting to a working \"ask questions about my documents\" setup in a single browser session",
    ],
    okayAt: [
      "Being explored without code — the console and assistant playground are real, but everything past them assumes a developer",
      "Small projects: machinery built for billions of items, pointed at a few hundred documents",
    ],
    avoid: [
      "Running it on your own machine. There is no self-hosted version; the Docker build called Pinecone Local is an emulator the docs call \"not suitable for production\" that loses everything when it stops. If data must never leave your computer, look elsewhere.",
      "Using it as an AI in its own right — it stores and retrieves, and something else does the thinking",
      "Parking real work on the Starter plan: one project, two users, community-Discord support",
    ],
  },

  starterActions: [
    {
      title: "Start in the console: make an assistant and upload a few documents",
      whyHere:
        "Most vector databases hand you an empty store and leave you to turn documents into something searchable. Pinecone's assistant does that step and returns answers with citations naming the file behind each claim — which is why this is the one action here a non-developer can finish.",
      tweak:
        "Starter caps files at 10 MB each and 1 GB across your whole account, so start with a handful, not an archive.",
    },
    {
      title: "Ask it something using words your documents never use",
      prompt:
        "Using only the documents I uploaded, answer this: [ask about a topic using different words than the documents themselves use]. Say which file each part of the answer came from.",
      whyHere:
        "A plain vector store returns matching fragments and leaves the answering to you; Pinecone's assistant returns an answer with its source attached. Clicking that citation is how you check whether the match was really about meaning or just lucky word overlap.",
    },
    {
      title: "Open the usage page before you build anything on it",
      whyHere:
        "Pinecone bills read and write units rather than queries, and the docs put a query at roughly one read unit per gigabyte of data it searches. The same query gets more expensive as your collection grows while your query count stays flat — that, not the number of questions you ask, is what decides affordability.",
    },
  ],

  pitfalls: [
    "The ceiling is account-wide, not per index. On Starter, 2 GB is your whole organisation's stored data and 1 GB is the assistant's file storage.",
    "\"Serverless\" does not mean free. It means you are charged for reads, writes and storage instead of for a machine that runs all the time.",
    "Plan mechanics change in the changelog, not on the pricing page — egress became a metered monthly allowance on 1 September 2026 and the Marketplace was retired on 31 August. Check the release notes before designing around a limit.",
  ],

  whereToNext: [
    { label: "More AI APIs & developer services", categorySlug: "ai-apis-developer-services" },
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
  ],
};
