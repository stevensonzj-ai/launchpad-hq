import type { PlatformTutorialData } from "./types";

export const spellbookTutorial: PlatformTutorialData = {
  slug: "spellbook-getting-started",
  platformSlug: "spellbook",
  title: "Getting Started with Spellbook",
  tagline: "AI that marks up contracts inside the Microsoft Word document you already have open.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-13",
  accessTier: "PREMIUM",

  howItWorks:
    "You open a contract in Microsoft Word as usual and Spellbook sits in a panel down the right-hand side. You click a button or type an instruction, wait while it reads the whole document, and its edits and comments appear marked up in the text itself. You accept the ones you want, ignore the rest, and ask again.",

  whatItIs: [
    "Spellbook is a contract review and drafting tool for lawyers, built by Dialog Enterprises Inc. and sold to law firms and in-house legal teams. Rather than being a website you upload a document to, its main form is an **add-in** — a panel that installs inside Microsoft Word and works on the file you already have open.",
    "A beginner would pick it over a general chatbot for one reason: it writes its suggestions back into the document as **redlines** (edits marked up so the other side can see exactly what changed) and margin comments, so a review ends with a marked-up contract rather than a list of findings to retype.",
    "There is a second, separate product called Associate that works across several documents at once; the two are sold together as one licence.",
  ],

  beforeYouStart: [
    "**The requirement that decides everything else is Microsoft Word.** Spellbook's Microsoft Marketplace listing declares support for Word on Windows, Word on Mac and Word in a browser; no iPad or phone version is listed. That listing is publisher-supplied metadata rather than a written statement from Spellbook, and it currently reaches back as far as Word 2013 on Windows and Word 2016 on Mac, so if you are on an older perpetual Office licence rather than a Microsoft 365 subscription, treat it as worth testing during the trial before you commit.",
    "If you don't have Word, there are two other routes and neither is identical. Associate runs in an ordinary browser at associate.spellbook.legal and there is a desktop app; a Google Docs add-in also exists, but Spellbook's own install guide says the Chrome extension is what lets it insert tracked changes, it is Chrome-only, and without it you get a \"Tracked changes unavailable\" banner.",
    "The trial form refuses consumer email addresses — its own error text says \"please enter your business email (not gmail, yahoo, etc)\" — and asks what kind of legal professional you are, though \"No, but I'd love to try Spellbook\" is one of the answers. The terms contract with a business entity, which does include a one-person firm.",
    "You will need to pay to keep using it. There is no free tier and no published price: the pricing page carries no numbers at all, says pricing is \"structured around the number of team members on your license,\" and routes every enquiry to a demo, so you cannot budget for this before a sales call. What you can get without one is a 7-day trial from spellbook.com/trial. Free access is offered separately to academic institutions through Spellbook's academic partnerships programme.",
    "Anything you build during the trial is on a clock. Spellbook's help centre says that when the trial ends your projects become inaccessible unless you upgrade, and tells you to download any files you need before it expires.",
  ],

  gettingSetUpSafely: {
    officialSource:
      "Microsoft's own add-in store, reached from inside Word — there is no Spellbook installer to download.",
    body: [
      "Install it from inside Word itself: Home tab → Add-ins → More Add-ins → search \"Spellbook\" → Add. The publisher on the listing is Dialog Enterprises Inc. — that is the right one. Treat any search result offering a \"Spellbook setup\" file as something to close.",
      "Expect it to fail on a work laptop before you conclude the product is broken. Spellbook's own guidance is that Word's optional connected experiences must be switched on (Windows: File → Options → Trust Center → Privacy Settings; Mac: Preferences → Privacy), and that on a work or school account your IT administrator may have blocked Office add-ins entirely. Firms that hit this deploy it centrally through the Microsoft 365 admin centre instead, which Spellbook documents.",
      "After installing you sign in and enter a licence key, so the install and the account are two separate steps — finishing the first one does not mean you have access yet.",
    ],
    vendorDocsUrl:
      "https://help.spellbook.legal/en/articles/9079381-install-spellbook-in-microsoft-word",
  },

  security: [
    {
      kind: "text",
      text: "The thing worth being clear-eyed about is what the panel is doing while you work: the Microsoft Marketplace listing states, in Microsoft's own words for this add-in, that it \"can read and make changes to your document\" and \"can send data over the Internet.\" A review is your client's draft contract leaving your machine.",
    },
    {
      kind: "list",
      label: "Where the document actually goes",
      items: [
        "To Spellbook's own cloud first — its security page says it uses cloud providers with data centres in Canada and the US to store and process customer data.",
        "Then out to third-party AI companies to do the reading. Spellbook names OpenAI and Anthropic and says it has negotiated zero-retention agreements with both, so that \"customer data included in requests and responses with these LLMs is not persisted and exists only in memory in order to process a request.\"",
        "Its Terms of Service (updated 27 July 2026, in force as at 13 September 2026) put that in binding form: data sent to those providers \"will not be used to train, improve, or develop the AI models,\" and Spellbook agrees to treat your documents as confidential and not disclose them to other customers or third parties.",
      ],
    },
    {
      kind: "text",
      text: "Read that carefully rather than as reassurance. The promise Spellbook makes in writing is about what the outside AI companies may do; its security page does not separately address whether Spellbook itself trains on customer data, and documents you add to its Library or connect through SharePoint or iManage are stored by Spellbook by design. Files uploaded to the Ask feature are a stated exception — its help centre says those are deleted automatically after three days.",
    },
    {
      kind: "text",
      text: "One check before a real client file goes through it: Spellbook's Marketplace listing does not currently show a Microsoft 365 App Certification or publisher attestation, so a firm's IT team assessing it will be reading Spellbook's own trust portal rather than a Microsoft-run audit.",
    },
  ],

  triad: {
    bestAt: [
      "Taking a first pass over a contract you already have open and marking it up in place",
      "Turning house positions into something reusable — Playbooks and Benchmarks convert your standards into pass/fail rules that everyone on the account then runs against the same contract types",
      "Answering \"what does this clause actually say\" about the document in front of you",
    ],
    okayAt: [
      "Drafting a whole document from nothing: the feature works, but it is built to fill a blank file",
      "Heavily formatted files — Spellbook's own guidance is that photos, tables and complex formatting affect how accurately its tools read a document",
      "Working in other languages: its Ask feature page claims review and chat in 140+ languages, but there is no published plan or feature table anywhere on the site to check that against, so treat it as a claim to test during the trial",
    ],
    avoid: [
      "Sending out AI-written markup where somebody is entitled to know a machine wrote it. Spellbook advertises that redlines are inserted under your own name in Word — Spellbook's own marketing line for it is \"Shhh.... We won't tell them it was AI\" — which means the tracked-changes record attributes the edits to you. Check your firm's policy, your client's expectations and any court's standing order on disclosing AI use before that document leaves your outbox.",
      "Treating its output as finished work. Spellbook's Terms of Service put the obligation back on you in terms: the customer \"will not solely rely on Output as constituting formal legal advice, and will ensure, when appropriate, that any Output is reviewed or vetted accordingly by a duly licensed and qualified lawyer.\"",
      "Reaching for it for a one-off personal document — a lease, a freelance contract, a private sale. Nothing here fits a person reviewing their own paperwork.",
    ],
  },

  starterActions: [
    {
      title: "Run a first pass on a contract you already have open",
      whatItDoes:
        "Spellbook's help centre documents the flow like this: in the Spellbook panel, click Review, then Comprehensive Review. Before it starts, set who you are acting for in the Representing Party dropdown and confirm the jurisdiction, which it fills in from the document but you can change. Tick whether you want general risks, proofreading or both, choose how much markup you want, then Start. Suggestions come back attached to specific passages; click Apply to insert one, or Apply All.",
      whyHere:
        "The review is aimed before it runs — you set the side you act for and the jurisdiction, so the markup argues a position rather than describing the document neutrally.",
    },
    {
      title: "Write your own review instruction and save it for next time",
      prompt:
        "Review this agreement as though I act for the supplier. Flag every clause that lets the customer terminate for convenience, every indemnity that isn't capped, and anything that survives termination. For each one, suggest replacement wording that improves my client's position.",
      whyHere:
        "Custom Review runs a typed instruction as a review pass across the whole document; Spellbook documents a bookmark icon at the top of the prompt that saves that instruction into a personal list you reopen, edit or delete, which is how a one-off phrasing becomes something you run on every deal.",
    },
    {
      title: "Ask about the clause in front of you and follow the citation back",
      prompt:
        "Explain in plain English what this indemnity actually obliges my client to do, and point me to the exact wording each part of your answer depends on.",
      whyHere:
        "Ask answers from the document open in Word and, per Spellbook's documentation, returns numbered reference bubbles you click to jump to the passage it used; the same box takes follow-ups, and toggles let you pull in your own Library, Spellbook's curated legal sources, or a web search.",
    },
    {
      title: "Ask whether a term is normal, not just whether you like it",
      whatItDoes:
        "Open Benchmarks from the panel's \"more\" menu. Spellbook's documentation describes it working out what kind of contract it is looking at, scoring how well the document covers the standards for that type, and listing what's missing. Click \"Go to\" to find the spot, \"Show Fix\" to see proposed language.",
      whyHere:
        "This runs against a library of currently more than 2,000 pre-built standards rather than against your own precedent, so it answers a different question from the review. You can also generate a custom standard by uploading a model document.",
    },
    {
      title: "Draft from your own precedents instead of from a blank page",
      prompt:
        "A limited liability clause favouring my client, capped at the fees paid in the previous twelve months, with carve-outs for breach of confidentiality and IP infringement.",
      whyHere:
        "The Draft box has a dropdown that switches the same typed request between \"AI Generated\" and \"My Library\" — the second searches clauses from documents you uploaded, with filters by folder and contract type — and Auto-Adjust then rewrites the chosen clause to match the defined terms and style of the contract you are in before you insert it at your cursor.",
    },
  ],

  pitfalls: [
    "The Spellbook icon greys out on `.doc` files. Spellbook's help centre says it only works on `.docx`, because it uses Word features that older files don't expose — File → Save As, choose `.docx`, and it comes back. This looks exactly like a broken install and isn't one.",
    "It cannot read a PDF. Spellbook's own answer is to convert the PDF to `.docx` first, or to use Associate, which does take PDFs — so the counterparty's scanned execution copy is not something the Word panel will touch.",
    "There are size limits that bite on long agreements: currently around 4 MB per document in the Word and Google Docs add-ins, and around 20 MB per file in Associate. Ask's document uploads are capped at 20 files at a time.",
    "\"Insert All\" in the full-document drafting flow overwrites everything currently in your Word file — Spellbook's own instructions say to run that feature on a blank document. Insert at Cursor is the safe button when you only want one clause.",
    "**Two vendor pages disagree about what happens when the trial ends, and the difference is money.** Spellbook's public Refund Policy says \"All monthly Spellbook subscriptions automatically renew after the trial period ends\" and that it does not issue refunds once that has happened. Its help centre says a self-serve trial started on the website \"will automatically expire after 7 days,\" that you \"will not be charged automatically,\" and that only a sales-assisted trial may convert into a paid subscription. Assume the refund policy governs unless someone at Spellbook tells you in writing which trial you are on, and ask before the seventh day.",
    "Bookmarks and links will look inconsistent: the marketing site is now spellbook.com while the help centre and the Associate app are still on spellbook.legal. That split is Spellbook's own, not a sign you are on a fake site.",
  ],

  whereToNext: [
    { label: "Legal AI tools", categorySlug: "legal-ai" },
    { label: "Document & PDF processing", categorySlug: "document-pdf-processing" },
    { label: "AI plugins for business software", categorySlug: "ai-plugins-business-software" },
  ],
};
