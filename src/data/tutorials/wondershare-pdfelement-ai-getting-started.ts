import type { PlatformTutorialData } from "./types";

export const wondersharePdfelementAiTutorial: PlatformTutorialData = {
  slug: "wondershare-pdfelement-ai-getting-started",
  platformSlug: "wondershare-pdfelement-ai",
  title: "Getting Started with Wondershare PDFelement",
  tagline:
    "A full desktop PDF editor with an AI panel bolted on — the answer and the file stay in the same window.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-09",
  changelogUrl: "https://pdf.wondershare.com/whats-new.html",
  accessTier: "FREE",

  howItWorks:
    "You open a PDF in a desktop window and work on it the way you would a document. When you want the AI, you click the button in the corner and a panel opens beside the page. You type a question about the file, read the answer, and keep asking.",

  whatItIs: [
    "PDFelement is a desktop PDF editor first and an AI tool second. Its main job is the unglamorous work: editing text inside a PDF, turning a scan into text you can actually select and search, filling and signing forms, converting to Word, combining files, blacking out details you don't want sent onward.",
    "The AI features — asking a document questions, summarising it, translating it, flagging clauses in a contract — are a layer added on top of that.",
    "That layering is the whole reason to choose it. A tool built only to answer questions about PDFs can tell you what page a clause is on; it cannot then edit that clause, redact the name next to it, and hand you back a signed file. Here the reading and the fixing happen in one window.",
    "The trade is that you are buying a large piece of software to get at a side panel.",
  ],

  beforeYouStart: [
    "It is software you install, on Windows or Mac, with matching apps for iPhone, iPad and Android and Linux builds on the same download page. It is not demanding — Wondershare's own install guide still lists a floor of around 512 MB of memory and 500 MB of disk space, which dates the page more than it describes the requirement. Any computer bought in the last decade will run it.",
    "If you only want to try the AI, there is a browser version — PDFelement Online — that needs nothing installed. Its free tier is currently around one use a day of the PDF tools and about ten AI uses in total, which is enough to find out whether the thing is useful to you before anything lands on your hard drive.",
    "The desktop download doesn't expire, but it is a trial, not a free tier, and the limits are specific. Wondershare's trial-limits page currently states that converting a PDF to another format does half the pages — and at most three pages if the file is longer than ten; text recognition on scans stops at three pages; combining stops at three files; batch data extraction stops at two files; and compression and XFA form filling are switched off entirely. The AI panel gets around ten uses.",
    "There are two shapes of paying for it. Wondershare currently sells a subscription (around $80 a year for one platform) and a one-time perpetual licence (currently around $130 for one platform, more for cross-platform). Note that \"single-platform\" means one of Windows or Mac — not both, and not your phone. Discounts run on the store pages more or less permanently, so a crossed-out price is not a limited event.",
    "AI use is metered separately from the licence. Plans currently include around 50 AI uses; past that it is a separate add-on, currently around $3.99 a month for 1,000 uses or around $39.99 a year for 12,000. Wondershare counts these as **credits** (the platform's unit of spend — each thing you make costs some), charged per use rather than per page, so a long document and a short one cost the same.",
  ],

  gettingSetUpSafely: {
    officialSource:
      "Download from Wondershare's own download centre — pdf.wondershare.com/download.html — and nowhere else. This is worth more attention than it sounds: a search for \"PDFelement download\" returns repack and \"cracked Pro\" sites alongside the real one, and this is a program you are about to point at every document you own.",
    body: [
      "Decide which platform you're on before you download rather than after. The download page carries Windows, Mac, Linux, iOS and Android builds plus older versions 6 through 11, and the licence you buy later is tied to a platform — grabbing the Mac build when you meant to buy the Windows licence is a wasted purchase, not a fixable mistake.",
      "Skip the install entirely if trying the AI is all you want. The browser version at the same site runs the AI features with nothing to install and nothing to uninstall afterwards.",
      "Know what registering actually does. The app opens and works without an account; a Wondershare ID is what activates a licence you've bought, and it appears to be what your AI allowance is counted against — expect to be signed in and online for the AI panel even though the editing is local.",
      "Confirm it works before money is involved. Open one real PDF, edit a line, and run the AI panel once. That's your \"installed correctly\" checkpoint — and it also tells you whether your document is real text or a picture of text, which decides whether the AI can read it at all.",
    ],
    vendorDocsUrl: "https://pdf.wondershare.com/guide/download-install-pdfelement.html",
  },

  security: [
    {
      kind: "text",
      text: "Because PDFelement is a program on your own computer, it's easy to assume everything stays there. The editing does. The AI doesn't. Wondershare's own General Terms of Use are unusually plain about this: for features such as Summarize PDF, Grammar Check, Translate PDF, Generate PPT, AI-Written Detect and PDF to Markdown, \"all these features would upload your PDFs to your personal Document Cloud first.\" The file goes to a server before you get an answer.",
    },
    {
      kind: "list",
      label: "What that actually means for you:",
      items: [
        "Editing offline is genuinely offline — changing text, reordering pages, filling a form and signing are local work on a local file.",
        "The AI panel is a different decision: it needs a connection to work at all.",
        "Wondershare's privacy policy states that it does not use this data to train its own general AI models. The same policy describes AI work being routed to outside model providers under contract — but the providers it names by name are from its video product, not PDFelement, so exactly whose servers handle a PDF isn't something the public pages settle.",
        "Wondershare describes the desktop AI assistant as powered by ChatGPT, which is consistent with the upload clause: the thinking is happening somewhere else.",
      ],
    },
    {
      kind: "text",
      text: "None of that makes it a bad choice — it's a disclosed mechanism rather than a hidden one. The practical line is that the confidential contract is the one you edit locally and don't run the AI over, which, unlike with a browser-only tool, is an option you actually have here.",
    },
  ],

  triad: {
    bestAt: [
      "Doing the reading and the fixing in one place",
      "Scanned documents: running text recognition on a scan and then asking questions about what it found",
      "Contracts and forms — reviewing, filling, signing and redacting are all first-class parts of the editor rather than add-ons",
      "Ordinary PDF chores that have nothing to do with AI — the editor half of it is a full one",
    ],
    okayAt: [
      "Being an ask-your-PDF tool on its own — it does that competently, but the metered AI allowance means it isn't the thing you reach for fifty times a day",
      "First impressions. It's a dense, ribbon-heavy editor, and the AI is one panel inside a large program rather than the front door",
    ],
    avoid: [
      "Buying it as an AI tool. The included allowance is small and volume is sold separately (see \"Before you start\")",
      "Assuming one cheap licence covers your laptop and your phone — single-platform means one of them (see \"Before you start\")",
      "Running the AI over documents you're not permitted to send to a third party. The editing is local; the AI upload is in the terms (see Security), and \"it's desktop software\" is not a defence",
    ],
  },

  starterActions: [
    {
      title: "Ask a scan what it says",
      prompt:
        "Summarise this document in plain language, then list every date or deadline it contains and tell me which page each one is on.",
      whyHere:
        "A scan is a picture of text, and the AI can't read a picture — so you run PDFelement's text recognition on it first, in the same window, and then ask.",
      tweak:
        "If the answers come back empty or nonsensical, that's your signal the text recognition step hasn't run — not that the document is unclear.",
    },
    {
      title: "Find out what you're agreeing to",
      prompt:
        "Read this agreement and list, in plain language, every obligation it puts on me, every fee it can charge me, and how either side ends it. Flag anything unusual and say what page it's on.",
      whyHere:
        "When the answer points at page 7, you can strike the clause, sign the document and export it without the file leaving the window. Wondershare's V13 release adds a dedicated contract-review feature on top of this; treat that as its description of the tool rather than something we've watched work.",
      tweak:
        "Follow up with \"now list the three questions I should ask before signing\" — the second pass is usually more useful than the first.",
    },
    {
      title: "Catch the personal details before you send it",
      prompt:
        "List every person's name, home address, phone number, email address, date of birth and account number that appears in this document, with the page each one is on.",
      whyHere:
        "PDFelement can black out what it finds so the text is genuinely gone from the file rather than covered by a rectangle — which is the failure mode that leaks documents.",
      tweak:
        "Run this on anything you're about to attach to an email. It catches the details in headers, footers and form fields that you stop seeing after the third read.",
    },
    {
      title: "Read something that isn't in your language",
      prompt:
        "Translate this page into English. Keep the headings, the numbering and the order of the list exactly as they are, and tell me if any part of the original was unclear.",
      whyHere:
        "An unfamiliar foreign-language form is exactly the kind of document people paste without thinking, and translation is one of the features that uploads to the cloud first (see Security).",
      tweak:
        "Ask for both at once — \"give me the translation, then a three-line summary of what it's asking me to do\" — and you'll usually know whether the full translation was even worth reading.",
    },
  ],

  pitfalls: [
    "The trial lets you do the work and then stamps it. You can edit, comment and sign in the free version — and when you export, Wondershare's own trial-limits page says the file comes out carrying a **watermark**, a visible mark printed across the page. You find this out after the work, not before it, which is what makes it a trap rather than a limit.",
    "PDF editors are a standard vehicle for bundled junk, because they are software people install in a hurry — which is why the download source named above is worth being fussy about.",
    "\"Perpetual\" means perpetual for this version. Wondershare's store pages describe the one-time licence as perpetual access to PDFelement 13 with free minor updates, and note that major upgrades may cost extra. It's a genuine one-time purchase; it just isn't a licence to every future version.",
    "Asking a scanned document questions before it has been through text recognition is the single most common reason PDF AI features seem broken.",
  ],

  whereToNext: [
    { label: "Document & PDF tools", categorySlug: "document-pdf-processing" },
    { label: "Research & academic tools", categorySlug: "research-academic-tools" },
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
  ],
};
