import type { PlatformTutorialData } from "./types";

export const kiraSystemsTutorial: PlatformTutorialData = {
  slug: "kira-systems-getting-started",
  platformSlug: "kira-systems",
  title: "Getting Started with Kira by Litera",
  tagline:
    "Firm-licensed AI that reads a stack of contracts and lines up the clauses that matter in one table.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-13",
  accessTier: "PREMIUM",

  howItWorks:
    "You load a folder of contracts into a project, tick the clause types you want found, and wait while it reads them. What comes back is a table: one row per contract, one column per clause, with each answer linked to the exact paragraph it came from. You click through, correct anything wrong, and export.",

  whatItIs: [
    "Kira is a contract-review tool used mainly for due diligence — the part of a deal where someone has to read every agreement a company has signed and report on what is in them.",
    "It was built by Kira Systems, a Toronto company Litera agreed to buy in August 2021; the Kira name survived that deal but the company did not, and kirasystems.com now lands on Litera's own site.",
    "Most beginners meet it because their firm bought it rather than because they picked it.",
  ],

  beforeYouStart: [
    "**You cannot sign up for this yourself.** Every route on Litera's site ends at \"Request a Demo,\" and Kira is not one of the four products Litera's own online store will sell you. If you are not somewhere that already licenses it, the honest way to start learning AI-assisted contract review is to upload a single agreement to a general assistant such as ChatGPT and ask it to list the obligations and dates — less precise, available today.",
    "Litera publishes no price for Kira anywhere on its site, so the real answer to \"will I need to pay\" is that someone already has: it is licensed to the firm, per subscription, not to you. Any figure you find quoted on a software-comparison site is somebody's estimate rather than a rate card, and whether there is a minimum number of seats is not something Litera publishes either — it comes out of the sales conversation.",
    "Access does not appear the day the paperwork is signed. Litera's current Kira cloud terms (version May 2026, in force for subscriptions starting on or after 1 May 2026) say a standard shared cloud setup is made available within three business days of the subscription start, and a private one targets around two weeks.",
    "Check the languages before you promise anyone a deadline. Litera says you can create your own clause finders in any language just by describing what you want in a **prompt** (the message you type), but coverage of non-English contracts by the ready-made finders varies from field to field — Litera keeps a support article on precisely this question inside its customer portal, so ask whoever administers your firm's Kira to check it against the languages your deal actually involves.",
  ],

  security: [
    {
      kind: "text",
      text: "Everything you put into Kira is somebody else's confidential contract — usually a client's, often covered by an **NDA** (a signed agreement not to share someone's confidential information) you did not personally sign. That changes the question. It is not \"is this safe for me\"; it is \"can I tell a client exactly where their documents went and who touched them.\" Kira is unusual among AI tools in that the answer is written down.",
    },
    {
      kind: "list",
      label: "What Litera commits to in writing",
      items: [
        "It will not train on your work. Litera's terms for products with generative features (version April 2026) say Litera will not, and will not let its outside providers, develop, train or fine-tune generative models using customer data, prompts or outputs unless separately agreed in writing.",
        "Your firm picks the country. The current Kira cloud terms say the data centres holding your documents sit in the hosting jurisdiction the customer chose — so \"where is this contract right now\" is a fact your administrator can answer, not a guess.",
        "The outside companies involved are published. Litera's subprocessor list for Kira names Amazon Web Services for storage in that customer-selected jurisdiction, and Microsoft's Azure OpenAI service for the AI-written answers, hosted in regions matching where Kira itself is hosted, or a comparable alternative.",
      ],
    },
    {
      kind: "list",
      label: "What stays on you",
      items: [
        "The terms make the customer warrant that it has the rights to put those documents in at all, and that doing so breaks no duty of confidentiality owed to anyone. That warranty is signed at firm level and honoured — or broken — by the person at the upload screen.",
        "The generative features can be switched off for one project while another leaves them on, so it is worth knowing which side of the switch you are on before you start.",
        "When a subscription ends, downloading or deleting the documents is the customer's job, with limited access for thirty days afterwards to do it.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Pulling the same clause out of hundreds of agreements at once and lining the answers up side by side",
      "Due-diligence work where the deliverable is a report on what a pile of contracts says — mergers and acquisitions, real estate, banking and finance are the areas Litera builds for",
      "Teaching it to find a clause nobody else needs — a house-specific provision your firm keeps running into",
    ],
    okayAt: [
      "Contracts in languages other than English, where the ready-made finders help unevenly and you may end up building your own",
      "Being your only tool — it reviews contracts; drafting, comparing versions and the rest sit in separate Litera products",
      "Small jobs. It is built for volume, and three contracts do not repay the effort of setting up a project",
    ],
    avoid: [
      "Heavy exploratory use of the AI-written-answer features. Litera's terms reserve the right to throttle you, move you to a higher-cost plan, or add usage charges if your usage \"materially deviates\" from that of similar customers — the question box is not an all-you-can-eat part of the licence.",
      "Building a large library of custom clause finders and assuming it is yours. Under the current cloud terms those trained finders are exclusively yours during the subscription and are deleted when it expires, with neither side permitted to use them afterwards.",
      "Leaning on a generated answer as advice. Litera's own terms disclaim every warranty on generative output and state that these features are not professional advice and create no attorney-client relationship — which is the vendor telling you, in the contract, to verify before you send.",
    ],
  },

  starterActions: [
    {
      title: "Run one clause across the whole pile",
      whatItDoes:
        "Create a project, load every agreement in the deal, and tick a handful of ready-made clause finders — change of control, assignment, governing law.",
      whyHere:
        "Kira's shape is a library: Litera puts 1,400-plus pre-trained clause finders and a 95%-or-better precision claim on target provisions on its own product page, which is why your first useful output comes from ticking boxes rather than teaching the tool what a change-of-control clause looks like. Neither Luminance nor eBrevia has published those two figures for their own products.",
      tweak: "Start with three clause types, not thirty. The grid is only readable while it is narrow.",
    },
    {
      title: "Decide the AI question before you open the project",
      whatItDoes:
        "Kira lets the generative features be turned on or off for one project without affecting others. You set that when the project is created, so a matter running under a client's AI restrictions and a matter without them can live in the same firm instance.",
      whyHere:
        "Litera scoped this control at the project level rather than account-wide, and named it in its January 2026 release material as the reason a firm can honour one client's restrictions without disabling the feature for everyone — a governance answer you can give about a single matter. Luminance documents no equivalent per-project switch.",
    },
    {
      title: "Ask the whole deal one question",
      prompt:
        "Which of these agreements contain a change-of-control provision triggered by a merger, and for each one, does the counterparty get a right to terminate or only a right to be consulted?",
      whyHere:
        "Grid Chat, which Litera introduced in July 2026, answers across every contract in the worksheet at once and builds the answer from Kira's already-checked extractions rather than from raw document text, and flags when it is missing data. That validated-extraction layer is the distinction Litera draws against general chat tools, and it is not how eBrevia works.",
      tweak:
        "This goes into the chat inside the analysis grid, not a general search box, and it only works once the extraction has finished — Litera describes it as plain-language questions over a worksheet you have already built. Exactly how that box is labelled is worth confirming once your login is set up.",
    },
    {
      title: "Train a finder for a clause nobody else needs",
      whatItDoes:
        "When a provision matters to your firm and is not in the library, you show Kira examples of it in your own documents and it learns to find that clause in new ones.",
      whyHere:
        "Litera's current cloud terms give these a name — \"Customer Provisions\" — and a lifespan. That is a defined term in Litera's own May 2026 Kira licence rather than a capability claim, and knowing the trained finder is leased rather than owned changes whether you build ten of them or a hundred.",
    },
    {
      title: "Make the memo out of the grid",
      whatItDoes:
        "Kira turns the completed table into summaries and export-ready reports, so the diligence memo is generated from the extraction instead of being retyped out of it.",
      whyHere:
        "Litera sells this as \"answers, not spreadsheets,\" and the mechanism is that the report is built from the same checked extractions the grid holds, so a statement in the deliverable still traces back to a clause. eBrevia has no comparable extraction-to-report pipeline to point at.",
      tweak:
        "Read the summary against two source clauses before you send it. Generated text is where the traceability quietly stops.",
    },
  ],

  pitfalls: [
    "Assuming \"Kira Systems\" is still someone you can deal with. It is not — support runs through Litera's customer portal, and anything written about Kira Systems as an independent vendor predates August 2021.",
    "Reading extraction accuracy as answer accuracy. A precision figure on target provisions means the clause was correctly found. It says nothing about whether the clause means what you assumed it meant.",
    "Trusting a review of \"Kira\" written before mid-2026. The generative layer, the analysis grid and Grid Chat all arrived between July 2025 and July 2026, so older write-ups describe a genuinely different product.",
  ],

  whereToNext: [
    { label: "Legal AI tools", categorySlug: "legal-ai" },
    { label: "Document & PDF processing", categorySlug: "document-pdf-processing" },
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
  ],
};
