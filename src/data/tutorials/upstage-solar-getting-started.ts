import type { PlatformTutorialData } from "./types";

export const upstageSolarTutorial: PlatformTutorialData = {
  slug: "upstage-solar-getting-started",
  platformSlug: "upstage-solar",
  title: "Getting Started with Upstage",
  tagline:
    "Turns messy PDFs and scans into text that software can read — priced by the page, and built for people who write code.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-09",
  accessTier: "FREE",

  howItWorks:
    "You sign in to Upstage's console in a browser and, by Upstage's own description, drop a PDF or scan into its playground and press run. What returns is the same document as structured text, with headings, tables and paragraphs marked up. Adjust an option, run it once more, then download what comes back.",

  whatItIs: [
    "**Two products share one name here.** Solar is Upstage's family of **models** — the AI \"brains\" that do the actual thinking — and it is not the part of Upstage that reads your documents. That work belongs to separate products called Document Parse, Document OCR and Information Extract, which take a PDF, a photographed form or a slide deck and hand back clean structured text.",
    "Upstage is a Korean company, now one of Korea's larger AI firms, and it sells both halves the same way: as an **API** — a way for programs to talk to each other without a person clicking — charged per page for documents and per chunk of text for Solar. There is no consumer app and no monthly subscription.",
    "It also publishes some of its models as files anyone can download and run on their own hardware, under a licence Upstage wrote itself. The document engines are not published that way; those you rent.",
    "A layer called Upstage Studio sits on top, where you assemble the document steps into a workflow from a template rather than by writing code.",
  ],

  beforeYouStart: [
    "Upstage is sold to developers, and you will get further with it if you have someone who can call an API. That is a fact about the product, not about you — if what you actually want is to ask questions of one PDF and read the answers in a browser, Adobe's Acrobat AI Assistant on this site does that, and does not involve an account with a spending balance.",
    "Signup is self-serve — no sales call, no demo booking. Upstage's console sign-in page currently advertises **$10 in free credit** for new accounts; the pricing page doesn't repeat that figure and no expiry is published anywhere public, so treat the amount as current rather than guaranteed. Separately, the pricing page says every Studio agent includes ten free runs with no credit card required.",
    "Beyond that you're buying **credits** — the platform's unit of spend, drawn down as you go. Document Parse currently runs about $0.01 a page at the standard setting and $0.03 enhanced; plain text extraction is about $0.0015 a page; pulling named fields out of a form is around $0.04 to $0.06. Ten dollars is roughly a thousand ordinary pages, which is more than most people trying this out will get through.",
    "The console, the documentation, the pricing page and the help centre are all in English and prices are quoted in US dollars. No regional restriction on signup is stated on any public page — though that is an absence of a rule rather than a published promise.",
  ],

  security: [
    {
      kind: "text",
      text: "Every document you send leaves your machine and is processed on Upstage's infrastructure, which its privacy policy says runs on US cloud providers. What happens to it next depends on which tier you are on, and Upstage's terms of service — the binding document, currently effective 21 September 2026 — draw the line sharply. For paid services, Article 22 says Upstage will not use your inputs or outputs for service improvement or model training without separate consent. For free services it says the opposite: that data may be used for service improvement and for AI research and development, training included. The same terms tell free-service users not to input personal data at all.",
    },
    {
      kind: "list",
      label: "Practical rules",
      items: [
        "Work out which side of that line you are on before you upload anything sensitive. Genuinely free endpoints — the ones the pricing page marks free or beta — sit on the free side. Upstage's terms carve out \"temporarily free promotional services\" from the training clause, which is arguably where a sign-up credit lands, but the terms do not say so in those words and the ambiguity is yours to carry.",
        "The Solar Chat demo is separate and stricter about saying so: the privacy policy states demo inputs are stored with personal information masked and may be used for AI model training. Do not treat it as a private scratchpad.",
        "Article 22 also confirms the useful half — you keep ownership of what you put in and what comes out.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Turning documents software normally chokes on — scans, forms, slide decks, tables that run across a page break — into structured text with the layout preserved",
      "Volume: Upstage's published figure is about 0.6 seconds a page, or a hundred pages in under a minute",
      "Korean paperwork specifically — it reads `.hwp` and `.hwpx`, the Korean word-processor formats almost nothing outside Korea handles",
      "Giving you an exit: the downloadable Solar Open models move the language half of the stack onto your own hardware",
    ],
    okayAt: [
      "Being explored without code — Studio and the playground exist and Upstage says they are for non-developers too, but everything around them is shaped for engineers",
      "Everyday chatting — Solar Chat exists as a demo rather than a product, and this is not a chatbot company",
      "Single documents — the account, the balance and the per-page pricing are built for thousands of pages, not one PDF",
    ],
    avoid: [
      "Putting anything you'd mind being learned from through a free endpoint — the terms treat free-service data differently from paid (see Security)",
      "Using what it returns to build or improve a competing document model — the terms prohibit that outright, including indirectly through a third party",
      "Hardcoding a Solar version and walking away — Upstage has shipped Solar Pro 2, 3 and 4 inside roughly a year, and the older ones sit in the price table at different rates",
    ],
  },

  starterActions: [
    {
      title: "Run your worst scan through it first",
      prompt:
        "Upload a crooked phone photo of a printed form or receipt with a stamp across it, then compare the table it returns against the original page.",
      whyHere:
        "Document Parse ships against exactly these cases: Upstage's published fix list names 90 and 180 degree rotations, tilted scans, and tables that continue across a page break merged back into one.",
    },
    {
      title: "Parse the same page twice — standard, then enhanced",
      prompt:
        "Send a page thick with tables through the standard setting, then the same page through the enhanced setting, and put the two outputs side by side.",
      whyHere:
        "The tripling from standard to enhanced is one Upstage publishes but never explains in words, so four cents of your own documents buys the answer cheaper than guessing wrong across ten thousand pages.",
      tweak:
        "Do it again on a plain page of body text. If the two outputs are identical there, you've learned the setting only matters for a subset of your documents.",
    },
    {
      title: "Compare plain text extraction against full parsing",
      prompt:
        "Run one scanned page through Document OCR, then the same page through Document Parse, and read both outputs.",
      whyHere:
        "Upstage prices these nearly seven times apart because one returns the words and the other returns the words plus where they sat. Most people over-buy here.",
      tweak:
        "Use a page whose meaning lives in its layout — an invoice, a lab result, a timetable. That is where the cheap option falls down.",
    },
    {
      title: "Run a prebuilt agent from the Studio library",
      prompt:
        "Open Upstage Studio's agent library, choose a template matching your document type, and run it against ten of your own pages.",
      whyHere:
        "The ten free runs per agent make this the only part of the platform you can judge before payment details exist anywhere. Studio bills as the sum of the steps an agent runs, so the same test shows what one real workflow costs per document.",
      tweak:
        "Note which steps the agent chained together. That list is the shape of the job you would otherwise be writing code to do.",
    },
    {
      title: "Send the parsed text somewhere else and question it",
      prompt:
        "Take the structured output from a parsed invoice, paste it into the chat AI you already use, and ask it for the total, the due date and the vendor's tax number.",
      whyHere:
        "Document Parse's stated output formats are HTML and Markdown, chosen specifically so a language model can read them, and pasting the result somewhere neutral is the fastest test of that claim. Because the models and the parser are sold separately, it also tells you whether you need Upstage's models at all.",
      tweak:
        "Ask a question whose answer lives inside a table cell rather than a sentence. That is where a bad parse shows up.",
    },
  ],

  pitfalls: [
    "**The prepaid balance is not a spending cap.** Upstage's pricing page states that when your credits run out, usage is not interrupted — the charges go to your registered payment method instead. If you want a hard stop, the only reliable one is not registering a card.",
    "**A single setting can triple your bill.** Standard and enhanced parsing live at the same endpoint, as do the two field-extraction tiers, and nothing warns you which one a script is using.",
    "**Every speed and accuracy number on Upstage's site is Upstage's own.** The 0.6-seconds-a-page figure, the \"5-10x faster than competitors\" claim and the published table-recognition scores are vendor benchmarks, not independent tests. Your documents are the only benchmark that binds.",
    "**The terms were rewritten this quarter.** The version effective 21 September 2026 names the one before it as running 1 July to 20 September 2026, so if you read Upstage's data terms earlier this year, you did not read these.",
    "**Two names, two documentation trees.** The document engines are documented separately from Solar.",
  ],

  whereToNext: [
    { label: "Other tools that read documents for you", categorySlug: "document-pdf-processing" },
    { label: "More developer services like this one", categorySlug: "ai-apis-developer-services" },
    { label: "Running open models on your own machine", categorySlug: "local-open-source-ai" },
  ],
};
