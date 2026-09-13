import type { PlatformTutorialData } from "./types";

export const harveyAiTutorial: PlatformTutorialData = {
  slug: "harvey-ai-getting-started",
  platformSlug: "harvey-ai",
  title: "Getting Started with Harvey",
  tagline:
    "The AI most large law firms are buying — sold by contract, not by credit card, and here is the one part you can get for free today.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-13",
  changelogUrl: "https://www.harvey.ai/blog",
  accessTier: "PREMIUM",

  howItWorks:
    "You sign in through your firm, type what you need in plain English into a text box, and point it at your own case files and documents. It works through the task and hands back a draft or a summary with links to the pages it drew from. You read it, correct it, and ask again.",

  whatItIs: [
    "Harvey is legal AI built for the inside of a law firm or a company's legal department: it reads the matter files, drafts and reviews documents, and researches law in the jurisdictions whose sources it has licensed.",
    "It is sold to organisations rather than to individuals, so if you are reading this on your own, Harvey is something you will meet through an employer or a school, not something you can start tonight.",
    "It is worth understanding anyway, because a large part of the profession is standardising on it: Harvey says more than 200,000 lawyers at 2,400+ organisations across 70 countries use the platform.",
  ],

  beforeYouStart: [
    "The barrier is not skill or hardware, it is procurement. As of September 2026 harvey.ai has no pricing page and no sign-up link — the only two buttons on the site are \"Request a Demo\" and \"Login\" — and Harvey's own Evaluation Terms of Service, last updated 9 January 2026, describe \"an authorized free trial\" you use \"in accordance with Your instructions from Harvey,\" which means evaluations are granted by Harvey rather than requested by you. You will not realistically pay for this, because you cannot: nothing is sold in a unit one person buys, and the per-seat figures that circulate in the legal trade press are secondhand and should not be read as the price. If you want something in the same category you can start yourself this week, Spellbook currently offers a seven-day free trial you begin from a form rather than a sales call — it does not publish prices either, but you can be inside it the same day.",
    "One part of Harvey is free to anyone right now. Harvey Academy runs online courses on the platform and on using AI in legal work, and Harvey's help centre currently states that \"Both **Level 1 Foundations** and **Legal Engineering** certifications are available and free for anyone to take. A Harvey Academy account is all you need.\" Separately, if you are a law student or faculty member, ask your library: Harvey's Law School Program gives partner schools \"free access to the Harvey platform,\" and enrolment runs through the institution rather than the individual.",
    "Where you are matters more here than with most software. Harvey's research quality depends on which publishers it has licensed, not on how good the AI is — around August 2026 it added 100+ regional sources across Germany, South Africa, the UK, France, Poland, Brazil and Vietnam, plus Spanish localisation for Spain and Mexico. That expansion is also the tell: coverage is still uneven by country, and the same question will be better answered in some jurisdictions than others.",
    "Everything on this page about what the screens look like comes from Harvey's own product pages, help centre and developer documentation rather than from hands-on use, because there is no way to see the product without a firm account. Treat the interface detail as Harvey's account of its own software; you may need to check it once you are signed in.",
  ],

  security: [
    {
      kind: "text",
      text: "With Harvey the document worth reading is not the security page but the Platform Agreement — a firm signs it, Harvey publishes it in full, and it states in writing what happens to privileged material once it is inside.",
    },
    {
      kind: "list",
      label: "What Harvey commits to in writing",
      items: [
        "Its Platform Agreement, last updated 9 January 2026 and the version in force today, states: \"Harvey will not train any AI models using Your Content or Customer Data. Subprocessors will not train any AI models using Your Content or Customer Data.\" The second sentence is the one worth reading twice — it binds the outside AI providers Harvey runs on, not just Harvey.",
        "The same agreement sets a deletion window: \"Within 30 days of termination, Harvey will securely delete any remaining Customer Data or Content unless otherwise instructed by You.\"",
        "Log-ins are per-person and \"may not be shared, including within the same organization\" — so stretching one licence across a team is a breach of the agreement, not a workaround.",
        "A customer can choose where the data physically sits. Harvey's security page says you can \"keep everything in-region—EU or Switzerland, US, or Australia,\" which is how a firm answers a client whose own contract forbids its files leaving a territory.",
        "It lists SOC 2 II (an audit of how a company handles customer data), ISO 27001, ISO 27701 and ISO 42001, plus GDPR and CCPA compliance.",
      ],
    },
    {
      kind: "text",
      text: "The control you would not find in a consumer tool is the ethical wall. Harvey says it \"syncs and enforces your firm's existing ethical wall policies, blocking restricted users from accessing or sharing walled content\" — those are the internal barriers that stop lawyers on opposite sides of a conflict seeing each other's files — and around August 2026 it added automatic syncing of those restrictions from Intapp. This is the sharp edge of putting AI in a law firm: if the conflicts rules do not reach into the AI tool, the AI tool is the hole in them.",
    },
  ],

  triad: {
    bestAt: [
      "Working across a whole matter's documents at once — you query the pile and get review tables and cited reports back, rather than opening files one at a time",
      "Producing output with links back to the source pages, which is the difference between a draft a partner will read and one they will not",
      "Living inside Word and Outlook where the drafting actually happens — around August 2026 Harvey added playbook reviews in the web app and matter-grounded reply drafting in Outlook",
      "Jurisdictions where it has licensed the local publishers — Tirant lo Blanch for Spain and Mexico, Otto Schmidt for Germany, FromCounsel for UK restructuring, Wolters Kluwer in the US",
      "Showing the people who signed the contract whether anyone is using it — its Command Center reports adoption by practice group",
    ],
    okayAt: [
      "Being one person's tool. Nearly everything good about it depends on your organisation's documents, templates and matter history already being loaded into it",
      "Judgement. It drafts, extracts and compares well; deciding what position to take is still the lawyer's job",
    ],
    avoid: [
      "Reading \"fully cited\" as \"already checked.\" Harvey markets review-ready cited output, while the Platform Agreement the same company asks you to sign calls the Service \"a research tool\" whose output \"is not legal advice\" and \"may contain errors and misstatements or may be incomplete.\" Both of those are Harvey's own words",
      "Using it to work out what AI can do in general. It is a set of legal work surfaces wired into a firm's document systems, not a sandbox",
    ],
  },

  starterActions: [
    {
      title: "Take Level 1 Foundations at Harvey Academy",
      whatItDoes:
        "Harvey's own online course walks through how it frames legal AI — what each piece of the platform is for, what \"legal engineering\" means in its vocabulary, and how it expects work to be reviewed before it leaves the building. It ends in a certificate and a LinkedIn badge.",
      whyHere:
        "Open enrolment is the mechanism: it puts the vendor's actual method — not its marketing — in front of a non-customer. Neither CoCounsel nor Legora has published anything equivalent; their training sits behind a customer relationship, so this is the only one of the three you can study from the outside.",
    },
    {
      title: "Understand what Vault is before you ever meet it",
      whatItDoes:
        "Vault is the document side of the platform. A matter's files go into one project and you ask questions across all of them at once, getting back extraction tables and cited reports rather than one answer per document.",
      whyHere:
        "The mechanism is a published number: Harvey's Vault page currently states capacity of around 100,000 files stored per vault. Legora publishes no comparable figure, and that number is what makes \"ask the whole matter one question\" a different motion from uploading a contract and asking about it. It is also why Harvey turns up in diligence and investigations work specifically.",
    },
    {
      title: "Look for the approval step before anything runs",
      whatItDoes:
        "Harvey's Agents are handed a task — a research memo, a set of extractions — and produce the finished work rather than a chat reply. Its platform pages say you \"preview the plan, adjust the scope, and approve work before Harvey begins.\"",
      whyHere:
        "That gate is a supervision decision, not a convenience feature: an **agent** (AI that takes actions on its own rather than only answering) running unattended across privileged files is a professional-responsibility problem before it is a technical one, and Harvey's published answer is a plan a human signs off first. CoCounsel has stated no equivalent preview-and-approve step, which makes this the single thing worth watching for in a demo.",
    },
    {
      title: "Check whether your jurisdiction is actually covered",
      whatItDoes:
        "Harvey's research is only as good as the publishers licensed into it.",
      whyHere:
        "Named publishers are checkable in a way that \"global coverage\" is not — you can ask whether the source you already rely on is in the list. Legora's list is a different set of names, and that difference is the product: for legal research the licensed source list, not the AI itself, is what you are buying.",
    },
    {
      title: "Notice which model is doing the work",
      whatItDoes:
        "Harvey does not run on one **model** (the AI \"brain\" that does the actual thinking). Around August 2026 it said Mistral Medium 3.5, Opus 5 and Fable 5 were available as reasoning models, opt-in for the most complex work.",
      whyHere:
        "The menu being published and opt-in is the mechanism: a firm can pin sensitive work to a named provider and tell a client which one touched their matter. That list is Harvey's own, published in its monthly product notes, and it turns \"which model saw this file?\" into a question a client can now actually ask.",
    },
  ],

  pitfalls: [
    "Expecting the mobile app to be a way in. Harvey's iOS and Android app is free to download, which looks like consumer availability — it is a companion to a firm workspace, and without one there is nothing behind the login.",
    "Confusing an Academy certificate with product access. Finishing Level 1 Foundations gives you a credential and Harvey's vocabulary. It does not give you a workspace.",
    "Bringing real client material to an evaluation before your firm's own agreement is signed. An evaluation runs under Harvey's Evaluation Terms of Service rather than the full Platform Agreement, so which document governs your test files is a question to settle before anything is uploaded.",
    "Judging it from a demo run on Harvey's data. The things that make Harvey different — the ethical walls, the matter history, the firm's templates — only exist once your organisation's own material is inside it, so a demo shows you the least Harvey-specific version of the product there is.",
  ],

  whereToNext: [
    { label: "Legal AI tools", categorySlug: "legal-ai" },
    { label: "Document & PDF Processing", categorySlug: "document-pdf-processing" },
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
  ],
};
