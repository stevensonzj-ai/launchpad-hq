import type { PlatformTutorialData } from "./types";

export const luminanceTutorial: PlatformTutorialData = {
  slug: "luminance-getting-started",
  platformSlug: "luminance",
  title: "Getting Started with Luminance",
  tagline:
    "Enterprise contract AI — what it actually does, and the only three ways a beginner gets near it.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-13",
  accessTier: "PREMIUM",

  howItWorks:
    "You open a contract, usually inside Microsoft Word, and it comes back marked up: wording that differs from your side's standard is flagged, each with a suggested edit. You accept, change or reject them one at a time, and you can type a question about the document and get an answer.",

  whatItIs: [
    "Luminance is contract AI built by a Cambridge, UK company and sold to law firms and to the legal, procurement and compliance teams inside larger businesses.",
    "It is a suite rather than one tool: separate products for generating contracts from templates, marking up incoming ones, searching everything the company has already signed, running compliance checks on counterparties, and sifting documents for disputes and investigations.",
    "If you ever use Luminance, it will almost certainly be because your employer bought it.",
  ],

  beforeYouStart: [
    "Nothing about Luminance is hard to use; the hard part is getting a login at all. Luminance publishes no prices anywhere — every product page ends in the same \"Request a demo\" form asking for your name, work email, company and role — so the honest answer to whether you will need to pay is that someone will, in a negotiated order form, and it will not be you personally. Luminance's terms do contemplate evaluation orders alongside commercial ones, so an assessment period may be available, but nothing on the public site offers a trial and you would have to ask.",
    "Licensing is counted in documents rather than people. The order form sets a maximum number of documents you can hold, and the terms add a yearly cap of twice that number in uploads, counted even for documents you later delete. The limit you actually run into is how much you feed it, not how many colleagues have logins.",
    "The cross-contract question feature, Ask Lumi Pro, is metered in **credits** (Luminance calls them LumiTokens) — the platform's unit of spend, where one credit buys one answer about one document. Ask a single question across fifty contracts and you have spent fifty. The pool refills on a rolling seven-day window and is normally the same size as your document allowance.",
    "If you want contract AI you can open today rather than next quarter, Genie AI currently has a genuinely free tier you sign up for yourself, with limited AI usage and exports locked until you upgrade. It is a reasonable place to learn what these tools do while you wait for a rollout.",
    "Students have one other door: Luminance runs a certification programme that is free of charge to universities and law schools, with partners including King's College London, Vanderbilt Law School and UC Law SF. Worth asking whether yours is on the list, because it is the only hands-on route that does not run through a procurement team.",
  ],

  security: [
    {
      kind: "text",
      text: "The architecture is the answer Luminance leads with: each customer gets a dedicated, single-tenant instance on AWS rather than sharing a database with other firms, and Luminance says its own staff cannot open your documents without you granting that through the interface. It holds ISO 27001:2022 certification and has completed a SOC 2 Type 2 examination — an audit of how a company handles customer data. Instances are backed up nightly to a second AWS data centre in the same region, retained at least 14 days. Where your documents physically sit is fixed in the order form, not chosen by you: UK or EU hosting if that is what was bought, otherwise an international location.",
    },
    {
      kind: "list",
      label: "The clause to read before you type into the chat",
      items: [
        "Luminance's Master Hosted Terms, updated 10 October 2025 and in force, cover features that route through outside AI models — Ask Lumi among them, with OpenAI, Microsoft Azure and Google Cloud named as processors",
        "For those features the terms state that redaction \"may not be possible\" for the actual words entered as a query or a requested redraft, and that Luminance is not responsible for confidentiality or intellectual-property problems arising as a direct result",
        "The mitigation is real and worth knowing: your administrator can switch those features off by raising a support ticket, and the terms say so explicitly",
        "The practical rule: the document you upload is handled under the single-tenant arrangement above; the sentence you type into the chat box may not be",
      ],
    },
    {
      kind: "text",
      text: "Two exits worth knowing before you rely on it. Luminance describes deployment inside a customer's own environment as an alternative to its cloud, though it publishes no detail on what that involves — a question for whoever runs the evaluation. And when a subscription ends, the retention period is thirty days — from the end of the term or from notice of termination — during which you can download or delete everything; after that Luminance deletes it and says it cannot be recovered. Anything you keep only in Luminance is on that clock.",
    },
  ],

  triad: {
    bestAt: [
      "Marking up an incoming contract against language your side has already approved, without leaving Microsoft Word",
      "Answering \"which of our contracts say X\" across an entire signed archive, rather than one document at a time",
      "Generating a standard contract from a pre-approved template so Sales or Procurement can produce it without routing through Legal",
      "Reading documents in languages it was never specifically configured for — Luminance says its AI reads any language rather than working from a configured list, which is the durable claim; the specific language count it once published is several years old, so treat any number you see as unverified",
      "High-volume, low-variation paperwork — confidentiality agreements are the case the vendor leads with",
    ],
    okayAt: [
      "Grounding answers in actual law. The LexisNexis alliance that would put case law, statutes and citation checks inside Luminance was announced in April 2026 and is currently a waitlist for mutual customers, so today the system reasons about your contracts, not about the law around them",
      "Bespoke, heavily negotiated one-off agreements, where the \"what have we agreed before\" signal it runs on is thinnest",
    ],
    avoid: [
      "Bulk-uploading everything you can find to see what turns up — every upload counts against the yearly cap whether or not you delete it afterwards",
      "Reading a clean pass as a safe contract. It reports deviation from the standards it was given, so a risk nobody wrote into those standards is invisible to it",
    ],
  },

  starterActions: [
    {
      title: "Find out what's actually different about this one",
      prompt:
        "Compare this agreement against our standard position and give me a table of every clause where the wording differs, what each difference means for us commercially, and which three you would push back on first.",
      whyHere:
        "Ask Lumi answers against your organisation's own prior negotiations, templates and agreed standards — Luminance describes its suggested alternatives as \"based on context of prior negotiations, templates and playbooks\" — which is why asking it to rank the pushbacks returns something usable. Kira (Litera) returns the provisions it has been trained or taught to extract, into a diligence report; there is no store of your side's negotiating history for it to order a pushback list from.",
    },
    {
      title: "Ask for the redraft and the fallback in one go",
      prompt:
        "Our position is that the liability cap should be twelve months of fees. Redraft clause 9 to that position, keep the clause's existing structure, and give me one fallback wording we could live with if they refuse.",
      whyHere:
        "The answer arrives as a mark-up inserted into the Word document rather than as text you copy across — Luminance's phrase is \"surgically inserting a mark-up\" — and the fallback is drawn from language your organisation has previously accepted in the same system. Robin AI will also draft you a revision; what it cannot do is source \"one fallback we could live with\" from your own executed contracts, because that history lives in Luminance's repository, not in the drafting assistant.",
    },
    {
      title: "Ask one question of everything you've ever signed",
      prompt:
        "Across all our supplier contracts, which give the other side a right to terminate for convenience on less than 60 days' notice? List the contract, the clause reference and the notice period.",
      whyHere:
        "This is the Ask Lumi Pro path, and it is worth pricing before you run it: this question across a 400-contract repository is a 400-credit question. Kira runs diligence across a project set you define and bills nothing per answer, so the \"is this question worth asking\" arithmetic simply does not exist there — it is specific to how Luminance meters Ask Lumi Pro.",
    },
    {
      title: "Let it negotiate the boilerplate without you in the loop",
      whatItDoes:
        "Hand a high-volume, low-variation agreement to Luminance's autonomous negotiation and it reviews the document, applies your standards, redlines, sends revisions to the counterparty and reacts to their replies in a machine-to-machine exchange — surfacing the reasoning and the prior contracts behind each decision. Your job is setting the standards up front and reading the log afterwards.",
      whyHere:
        "In March 2026 Luminance opened this to designated users across the business rather than Legal alone, while Legal keeps governance — so it is one of the few places you will meet an **agent** (AI that takes actions on its own rather than only answering) pointed at a counterparty instead of at your own document. Robin AI's assistant produces the mark-up for a person to send; the send-and-respond loop itself is what differs here.",
    },
    {
      title: "Generate the contract instead of reviewing one",
      whatItDoes:
        "In Draft you work through a step-by-step walkthrough of conditions and it assembles a finished contract from a pre-approved template, so someone in Sales, Finance or Procurement can produce a compliant agreement without waiting on Legal to write it.",
      whyHere:
        "The comparison here is not review quality but who is allowed to press the button — the product's own listed use case is \"Self-Serve Contract Generation.\" Kira is a review and extraction tool with no generation side at all.",
    },
  ],

  pitfalls: [
    "On Ask Lumi Pro, credits are spent as you scroll, not when you ask. The terms say tokens are consumed as you page through results — so idly scrolling to the bottom of a fifty-document answer set costs fifty where reading the top five would have cost five. Read from the top and stop.",
    "The Word experience and the browser experience are different products. Contract mark-up lives in Negotiate, inside Word; repository search and cross-contract questions live in Analyze. Which of Luminance's products you get is set in the order form your organisation signed, so what you can see once you log in may be narrower than what the marketing pages show — assuming you have both is the standard first-week disappointment.",
    "Ask Lumi is opt-in, not on by default — the terms describe it as an interface the customer selects within the product. If you cannot find a chat box, the likeliest explanation is that nobody switched it on for your instance, not that you are looking in the wrong place.",
    "\"Legal-Grade\" is Luminance's own trademarked phrase, not an external standard. It describes the company's multi-model architecture and its own benchmarking; no third party certifies it. Treat it as a product name rather than an assurance.",
    "Acting on an answer as though it were advice. Luminance's public Lumi Go terms state that outputs \"are not intended to be, do not constitute and must not be used as, legal advice or a substitute for obtaining independent legal advice\" and that no lawyer-client relationship is created. Those public terms carry no date on the page, so it is worth checking them again at the point you are asked to accept them.",
  ],

  whereToNext: [
    { label: "Legal AI tools", categorySlug: "legal-ai" },
    { label: "Document & PDF processing", categorySlug: "document-pdf-processing" },
    { label: "Research tools", categorySlug: "research-academic-tools" },
  ],
};
