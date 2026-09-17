import type { PlatformTutorialData } from "./types";

export const jasperTutorial: PlatformTutorialData = {
  slug: "jasper-getting-started",
  platformSlug: "jasper",
  title: "Getting Started with Jasper",
  tagline: "A marketing-team writing platform that learns your brand's voice — and costs money from day one.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-17",
  accessTier: "PREMIUM",

  howItWorks:
    "You open a project, type a prompt (the message you type) into the chat panel at the bottom, and Jasper writes the piece into a document beside it. You then highlight any sentence and ask for a rewrite, a different length, or a new angle, and it replaces the text in place.",

  whatItIs: [
    "Jasper is a writing and content platform for marketing teams. You get a chat box and a document editor, like most AI writing tools; the difference is stored brand settings Jasper applies to everything it writes, so you are not re-explaining your company in every conversation.",
    "It does not build its own AI. Jasper's own architecture page says it routes each task to outside systems from OpenAI, Google, Anthropic and Meta and \"layers in your brand, context, and guardrails\" on top. You are paying for the brand layer and the workflow, not a smarter underlying AI.",
    "It has changed shape. Jasper started as a copywriting tool for individuals and freelancers; today its homepage headline is \"Put AI agents to work for marketing\" and it calls itself \"the agent workspace built for modern marketing teams.\" Older reviews describing cheap word-count plans describe a product that no longer exists.",
    "Agents (AI that takes actions on its own rather than only answering) are the current centre of the product — pre-built ones for common marketing jobs on Pro, and more complex ones plus a no-code builder reserved for the quote-only Business plan.",
  ],

  beforeYouStart: [
    "**There is no free tier.** The only self-serve plan is Pro, currently around $69/month for one login, or around $59/month on an annual commitment. Above that is the Business plan, quote-only — Jasper publishes no price, so if Pro does not cover you your next step is a sales conversation, not a checkout page.",
    "The 7-day trial is not a look-around. Jasper's help centre is explicit: \"We do require a credit card during our trial sign-ups right now,\" and \"Once the 7-day free trial has ended, you will be moved to and charged for the plan you selected when starting your trial.\" Cancelling during the trial is self-serve in the app, per the same page.",
    "Refunds are documented two ways by Jasper itself. The terms (section 5b) say flatly: \"You may cancel your Customer Account at any time; however, there are no refunds for cancellation.\" The help centre says you can get one by emailing within seven days of the charge. The terms bind; treat the help centre route as a courtesy you may or may not get.",
    "The annual price is a year-long commitment billed upfront, not a discount you can walk away from: Jasper's help centre says annual plans \"are one-year commitments and cannot be canceled at any time within the year,\" with a 7-day window at the start and no refunds for unused time after. Start monthly.",
    "Jasper works in around 34 languages at the workspace level, but its help centre says the Content Translator Agent \"is limited to Business plans.\" If translation is the reason you are here, Pro is probably not enough.",
  ],

  security: [
    { kind: 'text', text: "What matters about Jasper is not how it stores your work but what its terms let it do with it. Its terms of service (version 4.1, effective 30 May 2025) say in section 3(a): \"We claim no ownership rights over Customer Property. The Customer Property remains yours.\" But the same section has you grant Jasper a \"royalty-free, sublicensable, transferable, perpetual, irrevocable, non-exclusive, worldwide license\" to use what you put in and what comes out, including for \"modifying, improving, and enhancing artificial intelligence models.\"" },
    { kind: 'text', text: "Section 7 states it plainly: \"Jasper uses Customer Property, including Input and Output, to provide, maintain, and improve the Services, including for the purpose of developing and enhancing Jasper's artificial intelligence models.\" An objection right exists, but section 12 limits it to people \"located in the European Union or United Kingdom,\" exercised by emailing legal@jasper.ai. Elsewhere, the terms as written offer no switch." },
    { kind: 'text', text: "Jasper's ethics page says something that sounds like the opposite: \"Data and intellectual property entered into Jasper is NOT used to train underlying LLMs.\" Both can be literally true — \"underlying\" likely means the outside systems Jasper routes to, while section 7 covers Jasper's own — but a reader taking the ethics page at face value would conclude something the terms do not say. The terms bind; ask Jasper in writing before you paste anything sensitive." },
    { kind: 'list', label: 'Keep out of it, on any plan', items: [
      'Client material covered by a confidentiality agreement you signed — the licence in section 3(a) is broader than most such agreements allow',
      'Unannounced products, pricing or campaign plans you cannot afford to have leak',
      'Customer lists or anything with real names and contact details in it',
    ] },
    { kind: 'text', text: "Jasper's security page states data is encrypted in transit and at rest, and that it holds an independent security audit report customers can request. Data is kept for the life of your agreement and deleted after termination on written request." },
  ],

  triad: {
    bestAt: [
      "Producing on-brand copy repeatedly once you have taught it your voice — the second and tenth pieces are where it earns the money, not the first",
      "Turning one finished piece into the smaller pieces a campaign needs: posts, emails, captions, ad variants",
      "Keeping a team's output consistent when several people are writing",
    ],
    okayAt: [
      "A one-off piece of writing. It will do it well, but the monthly fee buys a setup step you would be skipping",
      "Research and current information — it is a writing surface first",
      "Images. Generation and editing are included on Pro, but this is not why anyone chooses Jasper",
    ],
    avoid: [
      "Enforcing a written house style guide on the plan you can actually buy: Jasper's help centre says \"Style Guide is available on Business plans only\"",
      "Buying it as a general assistant. It is priced against marketing output for a single login, not against answering your everyday questions",
      "Connecting it to your own systems on Pro — the comparison table puts API access on Business only",
      "Publishing anything factual it wrote without checking it. A well-tuned brand voice makes a wrong claim sound more authoritative, not less",
    ],
  },

  starterActions: [
    {
      title: "Teach it your voice before you write anything",
      whatItDoes:
        "In Jasper IQ, choose Add Brand Voice and give it up to eight examples of your existing writing — upload .txt, .pdf or .docx, paste text, or hand it URLs for Jasper to crawl. Do this on day one of the trial.",
      whyHere:
        "Everything Jasper charges a premium for runs through this object: once saved, the voice applies automatically in chat, in the document editor and inside agents. Tested against ChatGPT's custom instructions, which take a typed description of your tone rather than eight documents and crawled URLs that agents inherit. Tested against Copy.ai, which also has brand voice: Jasper's is capped at two on Pro, unlimited on Business — a decision you make before you subscribe.",
      tweak: "Feed it your best-performing pieces, not your most recent ones.",
    },
    {
      title: "Make it show its work on the voice",
      prompt:
        "Write three LinkedIn posts announcing [product or feature]. Under each post, list the specific words, phrasings or structural habits you took from my brand voice. If you could not find any, say so instead of guessing.",
      whyHere:
        "Jasper applies the brand voice silently — nothing in the interface tells you whether it did anything, so this is the cheapest way to find out during a trial whether you are getting a branded draft or a generic one. Tested against ChatGPT and Copy.ai: in ChatGPT there is no stored voice object to audit, so the question has no referent.",
    },
    {
      title: "Turn one piece into a campaign in a single instruction",
      prompt:
        "Using the blog post in this project, create separate assets for: five LinkedIn posts, three emails for a nurture sequence, and ten short social captions. Keep each in my brand voice and do not repeat the same opening line twice.",
      whyHere:
        "Jasper's Canvas documentation says chat can \"update one or more assets in bulk\" — the output lands as separate, individually editable documents on the project board rather than one block you cut apart. Tested against ChatGPT, which returns eighteen pieces stacked in one reply: the board holds each piece as its own asset you can revise without re-running the request.",
      tweak: "Add \"and flag which three you think are strongest\" to get a starting point rather than a pile.",
    },
    {
      title: "Edit without leaving the page",
      prompt:
        "Cut this by half, keep the specific numbers, and make the first sentence the one a reader would stop scrolling for.",
      whyHere:
        "Highlight a paragraph, choose Ask Jasper Anything, and paste that in. Jasper's documentation describes the highlight-and-ask toolbar as rewriting the selected text in place, with a compose shortcut (Cmd+J on Mac, Ctrl+J on Windows) that continues a sentence you have started. Tested against ChatGPT: there you paste into a chat, get a new copy back, and paste it into your document.",
    },
    {
      title: "Set the cancellation clock before you set anything else",
      whatItDoes:
        "The moment the trial starts, put a reminder in your calendar for day six; cancellation happens in the app under settings. Then decide what you are testing — a brand voice plus two real pieces through it is a fair trial; poking at features is not.",
      whyHere:
        "The card is taken upfront and Jasper's own two documents disagree about refunds (see Before you start), so the deadline is the first thing to set rather than the last. Tested against ChatGPT and Copy.ai: both have a genuinely free tier you can sit on indefinitely, so neither creates a deadline on the day you sign up.",
    },
  ],

  pitfalls: [
    "The plagiarism checker's tick on Pro does not mean free scans. The pricing table shows it included, but the help centre says \"Plagiarism checks are an optional add-on to any plan\" and tells you to add credits (the platform's unit of spend — each thing you make costs some) before running one. It is powered by an outside service, Copyleaks.",
    "Jasper documents its own plan gating inconsistently, so check in the app rather than trusting a page: the Jasper IQ overview article says IQ \"is available on Business plans,\" while the pricing table and the Brand Voice article both give Pro two brand voices, five knowledge assets and three audiences.",
    "The terms of service still describe themselves as applying to \"our Creator and Pro plans\" — and Creator is no longer sold. The legal documents lag the product.",
    "The brand voice is only as good as what you feed it: eight samples of flat, hedging copy produce a machine that writes flat, hedging copy faster, in volume, with your logo on it.",
    "The terms say cancellation notice \"will be effective in the month following the month you provide us notice,\" so a cancellation late in a billing cycle can still carry a charge. Cancel early in the month.",
  ],

  whereToNext: [
    { label: 'Sales & marketing AI tools', categorySlug: 'sales-marketing-seo-ai' },
    { label: 'General AI chatbots (including free ones)', categorySlug: 'text-conversational-ai' },
    { label: 'Workflow automation', categorySlug: 'workflow-automation' },
  ],
};
