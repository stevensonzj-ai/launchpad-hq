import type { PlatformTutorialData } from "./types";

export const casetextCocounselTutorial: PlatformTutorialData = {
  slug: "casetext-cocounsel-getting-started",
  platformSlug: "casetext-cocounsel",
  title: "Getting Started with CoCounsel Legal (formerly Casetext CoCounsel)",
  tagline:
    "The legal AI that Casetext became — grounded in Westlaw, and sold only through a sales call.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-13",
  accessTier: "PREMIUM",

  howItWorks:
    "You open a browser window, type what you need in plain English, and attach whichever documents it should work from. It thinks in steps you can watch, then hands back a draft or an answer with every citation linked, so you can click each one and check it before you rely on any of it.",

  whatItIs: [
    "CoCounsel Legal is Thomson Reuters' AI assistant for legal work — the product that used to be sold as Casetext CoCounsel, before Thomson Reuters bought Casetext in 2023 and folded it into the Westlaw family.",
    "You describe a matter in plain language and it researches, drafts and reviews documents, grounding what it says in Westlaw case law and Practical Law's attorney-written guidance rather than in whatever the AI absorbed during training.",
    "The August 2026 rebuild runs on Anthropic's Claude Agent SDK and behaves as an **agent** (AI that takes actions on its own rather than only answering) — planning several steps and showing its work as it goes, instead of picking a task off a menu the way the original Casetext version did.",
    "It is a professional subscription tool: it assumes you are already doing legal work and have someone to bill it to.",
  ],

  beforeYouStart: [
    "Casetext is not a product you can buy any more. Thomson Reuters completed its $650 million acquisition on 17 August 2023, and as of September 2026 casetext.com simply redirects to Thomson Reuters' CoCounsel page while the old Casetext search addresses return a \"Gone\" response.",
    "You will pay from day one, and you cannot find out how much on your own. Thomson Reuters publishes no price for any CoCounsel plan — its pricing page asks for your sector, number of attorneys, jurisdiction and preferred plan length before it will quote, and both the \"free demo\" and \"free trial\" buttons lead to a form that ends with a sales representative phoning you. There is no free tier advertised and no self-serve signup, so budget for a conversation before you budget for the software. Thomson Reuters advertises a free trial of CoCounsel Essentials but does not publish how long it runs, so ask what you are being given.",
    "**The rebuilt CoCounsel Legal launched on 20 August 2026 and is currently United States only** — Thomson Reuters says Canada, the United Kingdom and Australia are expected later in 2026. If you practise outside the US, the honest answer today is \"not yet.\"",
    "There are four plans and they are not small variations on each other. Thomson Reuters' own comparison table shows Westlaw content and KeyCite flags — the red and yellow markers that say a case has been overruled or criticised — in only two of the four, and Practical Law in a different two. Get the plan named in writing before you agree to anything.",
    "If what you actually want is to feel out what AI is like on legal-adjacent work — summarising a lease, putting a clause into plain English — a general assistant such as ChatGPT will let you do that today for nothing and without a phone call. Start there, and come back to CoCounsel Legal when a firm is paying for it.",
  ],

  security: [
    {
      kind: "text",
      text: "The vendor-side answer is unusually solid for this category, and worth taking as read: Thomson Reuters states that \"CoCounsel Legal is not trained on any customer data,\" and lists independent audits — ISO/IEC 42001:2023 and SOC 2 Type 2 — plus a US federal authorisation in progress. That is not the part that will bite you.",
    },
    {
      kind: "list",
      label: "The part that stays yours",
      items: [
        "Attorney-client privilege is a duty you owe, not a feature the software carries. ABA Formal Opinion 512, issued 29 July 2024 and still the American Bar Association's standing guidance on generative AI, is explicit that a lawyer's confidentiality obligation can require informed client consent before client information goes into a tool like this. A vendor's security certificate does not discharge that, and no setting inside CoCounsel Legal does either.",
        "Your **prompt** (the message you type) and everything you attach to it pass through outside AI providers under Thomson Reuters' contracts, not through Thomson Reuters alone — the company's own security notes for the Outlook integration say user content is not used to train third-party models and name OpenAI and Google as the providers in that chain. The protection is contractual, which is a different kind of protection from the data never leaving.",
        "Accounts are administered by the firm, not by you. \"Who else can see this matter\" is answered by whoever runs your organisation's subscription, so ask them before the first client document goes in.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Turning a plain-language question into research where every case comes back linked and flagged for whether it is still good law.",
      "First drafts that have to carry citations — briefs, memos, motions — with a separate pass that checks whether the authority cited actually supports each assertion.",
      "Reading a large set of your own documents in one go and returning the answers as a sortable table rather than a wall of prose.",
      "Marking up and rewriting inside Microsoft Word, where the drafting actually happens, rather than in a separate browser tab you copy out of.",
    ],
    okayAt: [
      "Novel or genuinely unsettled questions. It is strongest where authority already exists to cite, which is the opposite of where you most want a second brain.",
      "Material outside Thomson Reuters' own libraries. It will read whatever you attach, but the grounding that makes it trustworthy is Westlaw and Practical Law; point it at a foreign statute or a trade standard and it is an ordinary assistant again.",
      "Short everyday tasks. It will summarise an email thread perfectly well, and you will be paying research-platform rates for the privilege.",
    ],
    avoid: [
      "Filing anything on the strength of a cheaper plan's output. CoCounsel Essentials and the Practical Law bundle carry no KeyCite flags at all, so nothing in those plans will tell you the case you are about to cite has been overruled.",
      "Reading the visible reasoning trail as a check on the answer. Thomson Reuters ships a separate feature, Deep Research Verify, whose entire job is confirming that cited authority supports the assertion made — which is a fair indication the reasoning display was never doing that job.",
    ],
  },

  starterActions: [
    {
      title: "Ask the question, not for the cases",
      prompt:
        "Is a non-compete signed in one state enforceable against an employee who has since moved to Texas? Give me the controlling authority, tell me where courts disagree, and flag any case you cite that has been criticised or overruled.",
      whyHere:
        "Thomson Reuters owns Westlaw, so the cases this returns arrive already carrying KeyCite flags — Westlaw's own markers for whether a decision is still good law. Harvey's authority comes from LexisNexis under the alliance the two announced in June 2025, and there is no KeyCite flag anywhere in that stack.",
    },
    {
      title: "Draft from the house library, not from scratch",
      prompt:
        "Draft a mutual confidentiality agreement for a US software vendor and a hospital, using standard market clauses. Mark anywhere you have departed from the standard position and say why.",
      whyHere:
        "The clauses come out of Practical Law, Thomson Reuters' own library of attorney-written model documents and practice notes. Neither Harvey nor Lexis+ AI can reach Practical Law at all; it is Thomson Reuters property, which is exactly why it is a plan you buy rather than a feature you enable.",
    },
    {
      title: "Put a document set into a table",
      prompt:
        "Across the attached leases, answer for each one: who is the landlord, when does the term end, is there an assignment clause, and does it require landlord consent? Return a table with one row per lease and one column per question.",
      whyHere:
        "The mechanism is that the questions travel across the set rather than the document — Thomson Reuters specifies up to 10,000 documents and up to 100 questions in a single pass, returned as a filterable table. Westlaw's own research tools cannot do this at all, because they search published authority rather than the files sitting on your matter.",
    },
    {
      title: "Reach it from Claude instead of logging in",
      whatItDoes:
        "Thomson Reuters and Anthropic announced a connection on 12 May 2026 that lets Claude talk to CoCounsel Legal directly, so a request you make in Claude can be routed into CoCounsel to research, draft and come back with validated citations. It is set up once by your firm as a connector rather than something you type into CoCounsel itself.",
      whyHere:
        "This is a first-party bridge built by the content owner, which is what makes the citations that come back Westlaw-grounded rather than written by the AI. Harvey's content arrangement runs the other way — its LexisNexis alliance brings that material into Harvey's own interface, so there is nothing on that side for an outside tool to call. Thomson Reuters said general availability was expected during summer 2026 and has not published whether the connection needs anything on top of a CoCounsel subscription, so treat it as something to ask about rather than something you switch on.",
    },
  ],

  pitfalls: [
    "Searching for \"Casetext\" and buying from whatever comes back. Anything still offering you \"Casetext\" is a reseller, a review site, or simply out of date.",
    "Expecting the Word and Outlook add-ins to be the same generation as the browser product. Thomson Reuters' own security notes for the Outlook integration still describe an earlier CoCounsel engine, so the surfaces may not all move at once.",
    "Using a Workspace as personal scratch space. Thomson Reuters describes Workspaces as matter environments holding firm documents and institutional knowledge, which means the matter team, not just you — check the sharing rules with whoever administers the account.",
    "Reading the descriptions here as a walkthrough. No account was opened to write this page, because there is no way in without a contract, so what the product does is Thomson Reuters' published account of its own software — verify the steps against what you see once your firm's login arrives.",
  ],

  whereToNext: [
    { label: "Legal AI tools", categorySlug: "legal-ai" },
    { label: "Research tools", categorySlug: "research-academic-tools" },
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
  ],
};
