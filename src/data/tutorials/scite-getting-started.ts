import type { PlatformTutorialData } from "./types";

export const sciteTutorial: PlatformTutorialData = {
  slug: "scite-getting-started",
  platformSlug: "scite",
  title: "Getting Started with Scite",
  tagline:
    "Checking whether a scientific paper has been backed up or shot down by the research that came after it.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-15",
  accessTier: "PREMIUM",

  howItWorks:
    "You type a paper's title or a research question into Scite's search box. Back comes the paper plus a breakdown of how later papers cited it, with the actual sentences quoted. You click a sentence to jump to the paper it came from, filter down to just the disagreements, and search again from there.",

  whatItIs: [
    "Scite is a search tool for scientific papers that does one unusual thing: rather than only counting how many times a paper has been cited, it reads the sentence around each citation and sorts it into **supporting**, **contrasting** or **mentioning**.",
    "Scite calls these Smart Citations. A paper with 400 citations that are nearly all passing mentions is a different animal from one with 40 citations where six later studies contradicted it — and a raw citation count hides that difference completely.",
    "It also has Scite Assistant, a chat box where you ask a research question in plain English and get an answer with links to the papers it drew from.",
    "Scite was bought by Research Solutions in November 2023 and now trades as \"Scite, LLC, a Research Solutions Company.\" It is still sold directly to individuals; the acquisition did not move it behind an institution-only door.",
  ],

  beforeYouStart: [
    "This is not free in the way most things on this site are. Scite's free \"Connect\" plan gives you 25 monthly **credits** (the platform's unit of spend — each thing you do costs some) for a connector that pipes Scite's data into ChatGPT, Claude or Gemini. It does not get you into Scite's own site: the pricing table lists Connect as having no Assistant and no search. Scite's Assistant page separately says you start a free trial \"to save and access your chat history\", which reads as though you might get a question or two in without one — the two pages disagree, so assume you will need the trial.",
    "Paid access currently starts around $20 a month for Basic, billed a year at a time. Scite's pricing page shows only the annual rate, so month to month costs more than $20 — the page's \"save $96\" note implies somewhere near $28, but Scite does not print the monthly figure. Pro is around $50 a month and adds bigger collections plus patent, clinical trial and grant data. There is a 7-day free trial and you create an account to start it.",
    "Before paying, check whether your university or employer already subscribes — Scite sells institutional plans through a sales team, and library access is how many people get in. Scite's pricing page also points students and academics at its support address for a discount.",
    "**The coverage gap matters more than the price.** Scite indexes around 317 million articles but holds only about 41 million of them in full text, and a Smart Citation can only be pulled from full text it holds. Its published partner list — 35-plus publishers, last updated June 2026 — includes Wiley, SAGE, Cambridge University Press and the Royal Society of Chemistry, but does not name Elsevier, Springer Nature, Taylor & Francis, IEEE or Oxford University Press. Whole fields will look thinner on Scite than they are. Scite says it adds partners over time, so a publisher missing today may be covered later; check the coverage page rather than trusting a list you read once.",
    "The browser extension is a separate, free thing and runs on Chrome, Firefox, Edge and Safari. Scite describes it as a free extension; you may need to sign in to a free account once it is installed, which is worth checking on the day.",
  ],

  security: [
    {
      kind: "text",
      text: "Scite's privacy policy, effective 26 March 2026, says in so many words that Scite does \"not use Customer Data to train, fine-tune, retrain, or otherwise improve\" its AI systems, and its terms repeat the promise. For a tool where your searches reveal what you are working on before you publish it, that is worth more than it sounds.",
    },
    {
      kind: "list",
      label: "What still applies",
      items: [
        "Your searches, Assistant conversations and any documents you upload sit on Scite's servers, not your machine",
        "The same policy says account data is kept for up to 10 years after you close the account",
        "Deletion goes through Research Solutions customer support rather than a button in your settings, as far as the public policy describes",
      ],
    },
    {
      kind: "text",
      text: "Scite's terms also limit what you may do with its classifications: you may not use its Classifier Results to build anything that competes with or substitutes for Scite's own products, and you may not create derivative works from them. If you were planning to bulk-export supporting and contrasting counts into a database or a paper of your own, read that clause first — noting that those terms carried no visible effective or last-updated date when we checked on 15 September 2026, so which version governs is not something the public page will tell you.",
    },
  ],

  triad: {
    bestAt: [
      "Sanity-checking a paper you are about to build on — one glance at whether anything contrasts it",
      "Finding where a literature disagrees with itself, by filtering one paper's citations down to contrasting only",
      "Catching retractions (a journal formally withdrawing a paper) and editorial notices on work you have already collected",
    ],
    okayAt: [
      "General literature searching — it works, but the coverage gap above shapes what comes back",
      "Papers published in the last few months — nothing has cited them yet, so there is nothing for Smart Citations to classify",
    ],
    avoid: [
      "Treating \"contrasting: 0\" as a clean bill of health. Far more often it means nobody has cited that paper inside the full text Scite holds — which, for the publishers named above as missing, is a great many papers.",
      "Reading the supporting and contrasting labels as verdicts. A machine learning **model** (the AI \"brain\" doing the work) assigns them from a single sentence, and Scite's own help documentation describes a route for users to flag a misclassification for two experts to review. That route exists because the labels are sometimes wrong.",
    ],
  },

  starterActions: [
    {
      title: "Start with a paper you already half-trust",
      whatItDoes:
        "Search Scite for a paper you have cited before or are about to cite, and read the supporting, mentioning and contrasting split at the top of its report before you read anything else on the page.",
      whyHere:
        "Reading the split before the abstract inverts the usual order — you find out whether later work pushed back before you have formed a view of the paper. A Google Scholar count cannot answer that question at any point in the process.",
      tweak:
        "Try it on a paper you already know is contested and see whether the split matches what you know.",
    },
    {
      title: "Filter down to just the contrasting citations",
      whatItDoes:
        "On any report, set the classification filter to contrasting only, then read the quoted sentences that remain.",
      whyHere:
        "Contrasting is by far the smallest of the three buckets — on Scite's own published paper it sits under one percent of citations — so this one filter turns thousands of citations into a readable handful.",
    },
    {
      title: "Ask the Assistant a question instead of typing keywords",
      prompt:
        "What is the current evidence on whether intermittent fasting improves insulin sensitivity in adults without diabetes? Give me the strongest supporting studies, and any studies that contradict them, with citations.",
      whyHere:
        "Scite Assistant answers out of papers it holds in full text, including paywalled ones covered by its publisher deals, so asking for both sides at once is asking it to do the single thing its index is built for.",
      tweak:
        "Swap in your own question. The clause worth keeping is \"and any studies that contradict them.\"",
    },
    {
      title: "Put the badges on the search you already use",
      whatItDoes:
        "Install the Scite browser extension, then run a normal PubMed or Google Scholar search; Scite's badges appear alongside the results, and a panel appears at the side when you open a paper.",
      whyHere:
        "It injects Scite's classification into PubMed and Google Scholar results — pages Scite does not own — so the split reaches you inside the search tool you already use, with no second lookup.",
    },
    {
      title: "Run a finished reference list through Reference Check",
      whatItDoes:
        "Upload a manuscript PDF to Reference Check; Scite reports how each reference in it has been cited by others, flagging any that have been retracted or picked up editorial notices.",
      whyHere:
        "A retraction is the failure nobody catches by rereading their own bibliography, because the entry still looks fine; this checks the list you already wrote rather than helping you build a new one.",
      tweak:
        "Scite's feature pages describe Reference Check but its pricing table does not say which plan includes it, so expect to need the trial or a paid plan.",
    },
  ],

  pitfalls: [
    "Mistaking the Assistant for the citation data. They are two different things on one site: the Assistant writes you an answer, while Smart Citations hand you raw classified sentences. The second is what Scite is actually distinctive for, and it is the one people skip.",
    "Assuming \"supporting\" means somebody replicated the original. Scite's help documentation says a citation can count as supporting when the conclusions line up, even where the method, model or conditions were different.",
    "Reading Scite's marketing figures as coverage. Its Assistant page describes \"317M+ full-text articles\", which does not square with the article-versus-full-text split on Scite's own data-coverage page. The coverage page is the specific one; trust it.",
    "Judging the paid product by a public report page. One currently opens to anyone with the three counts visible, but the pricing table lists article Smart Citation reports as a Basic-plan feature — so how much of a report you can read without paying may already have narrowed and may narrow further. Treat the public page as a preview rather than the product.",
  ],

  whereToNext: [
    { label: "More research tools", categorySlug: "research-academic-tools" },
    { label: "AI chat assistants", categorySlug: "text-conversational-ai" },
  ],
};
