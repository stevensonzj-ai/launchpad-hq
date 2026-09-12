import type { PlatformTutorialData } from "./types";

export const vizAiTutorial: PlatformTutorialData = {
  slug: "viz-ai-getting-started",
  platformSlug: "viz-ai",
  title: "Getting Started with Viz.ai",
  tagline:
    "Hospital software that watches scans as they are taken and alerts the specialist who can act — and that no individual can buy.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-12",
  changelogUrl: "https://www.viz.ai/news",
  accessTier: "FREE",

  howItWorks:
    "There is no app you open. A hospital scanner sends an image to Viz.ai automatically, software checks it for a suspected finding, and if it sees one a phone buzzes in a specialist's pocket with a case to look at. The user is a clinician receiving an alert, not someone typing.",

  whatItIs: [
    "Viz.ai makes software hospitals install between their scanners and their specialists' phones. When a scan is taken it checks for a short list of urgent findings — a blocked major artery in the brain, bleeding in the brain, a clot in the lungs — and if it suspects one, alerts the doctor who would treat it, at the same time as the radiologist does the normal read.",
    "It is here as one of the clearest examples of AI regulated as a medical device: each piece cleared by the US Food and Drug Administration for one stated purpose, and required to publish what that purpose is. Viz.ai's homepage calls the platform \"driven by over 50 advanced, FDA-cleared algorithms\" and says it is trusted by over 2,000 hospitals; a July 2026 announcement puts that at 2,000 hospitals and 230 million patients across the US and Europe — Viz.ai's figures about itself, published without a method.",
  ],

  beforeYouStart: [
    "**You are at neither end of this.** Viz.ai's end user licence agreement, last updated March 2026, says the app is \"made available to you as an authorized user under an existing agreement with a hospital or health care system\" and that you must \"only use the App and Services if you are a medical specialist with the requisite clinical expertise.\" That binding document is the answer to \"can I try this\": no, and not because of a waiting list.",
    "There is no price to compare. Viz.ai publishes no pricing page — viz.ai/pricing does not exist — and offers no trial and no self-serve sign-up; the only routes in are a demo request form and three phone numbers reaching a sales team. Any confident \"Viz.ai pricing\" figure online comes from a third-party directory, not the company.",
    "The app being free in the app stores is a red herring: it downloads for nothing and the store listing carries no access restriction at all, but where a store page and the licence quoted above disagree, the licence binds.",
    "Clearances are granted country by country. The modules on the indications-for-use page are described as FDA-cleared for the US, and in June 2021 the company announced a CE Mark for its stroke software, permitting sale within the European Economic Area. Which modules are cleared where today is not published module by module, so treat any \"it's available in X\" claim — including one you read here — as something to check.",
    "What you can do today is read: the indications-for-use page, the licence agreement, the privacy policy and the trust centre are public and un-gated. If you came for an AI tool you can open this afternoon, start with a general chatbot like ChatGPT.",
  ],

  security: [
    {
      kind: "text",
      text: "The sensitive information here is not yours: it belongs to the patients being scanned. Viz.ai's US privacy policy for subscription services, effective 20 August 2025, puts the medical data outside that policy — \"Protected Health Information is governed by the HIPAA Business Associate Agreement between the Customer and Viz.ai and not by this Privacy Policy.\" The hospital–Viz.ai contract, which is not public, governs patient scans.",
    },
    {
      kind: "list",
      label: "Three things in the vendor's own documents worth knowing",
      items: [
        "The same policy says Viz.ai may commercialise the data it treats as non-medical: \"We may also share and sell this Usage Data to interested third parties to help them improve their medical programs.\" What falls inside \"Usage Data\" is defined elsewhere in the policy.",
        "Its trust centre lists a **SOC 2** Type II audit (an audit of how a company handles customer data), a European privacy programme, and — announced in May 2026 — certification to ISO/IEC 42001, an international standard for managing AI. All are the company's statements about itself; the audit reports go to customers, not the public.",
        "Nothing published says whether patient scans are used to improve Viz.ai's own software. The privacy policy routes that question to the hospital contract, which is not published — so it is genuinely unanswered from outside, not answered quietly in the vendor's favour.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Getting a suspected finding to the specialist who can act on it, in parallel with the normal radiology read rather than after it.",
      "A short list of urgent findings: the indications-for-use page names blocked major arteries in the brain, bleeding in and around the brain, clots in the lungs, tears in the aorta, and some heart conditions.",
      "Automated measurements the company says are consistent: for brain bleeds, volume, thickness and how far the brain has shifted.",
      "One alerting layer across neurology, cardiology, vascular, trauma and lungs, not a tool per department.",
    ],
    okayAt: [
      "Breadth. Each module looks for one thing, so a scan normal for that finding produces no alert. It is a watchlist, not a second opinion on the scan.",
      "Its newest layer. Viz Assist, launched 20 October 2025, is described by the company as \"a suite of autonomous AI agents\" (an **agent** is AI that takes actions on its own rather than only answering) drafting notes from recorded doctor–patient conversations and record data.",
      "Telling you anything about itself in use. Everything past the marketing site sits behind a hospital deployment, so nothing here comes from using the product — only from documents the company publishes.",
    ],
    avoid: [
      "Expecting it to answer a question. The indications describe an automatic, notification-only path. Nothing published describes a clinician asking it anything, and there is no box to type into.",
      "Taking \"detects\" to mean \"diagnoses\". Viz LVO's own indication says it is \"limited to analysis of imaging data and should not be used in-lieu of full patient evaluation or relied upon to make or confirm diagnosis\" — the company's wording.",
    ],
  },

  starterActions: [
    {
      title: "Read the page Viz.ai is required to publish",
      whatItDoes:
        "Opens viz.ai/indications-for-use, where Viz.ai lists module by module what each piece of its software is cleared to do.",
      whyHere:
        "The wording is specific enough to check a claim against. Viz ANEURYSM \"is limited to detecting aneurysms at least 4mm in diameter\"; Viz LVO \"is intended to analyze terminal ICA and MCA-M1 vessels\" — two named blood vessels, not the whole brain. Those are Viz.ai's numbers, not the category's; RapidAI clears its own scope separately.",
      tweak:
        "Read one module's entry twice: once for what the software finds, once for what it is not for.",
    },
    {
      title: "Find the sentence where the vendor says it does not diagnose",
      whatItDoes:
        "Opens the end user licence agreement at viz.ai/eula and finds the passage the company sets in capitals.",
      whyHere:
        "Viz.ai puts it in capitals in a binding document — \"THE APP AND THE SERVICES DO NOT DIAGNOSE CONDITIONS and are intended only as a supplement to your knowledge and professional judgment\" — while its product pages lead with detection performance. Both are true, written for different readers under different rules.",
    },
    {
      title: "Separate the cleared parts from the new parts",
      whatItDoes:
        "Compares the cleared imaging modules on the indications-for-use page against Viz Assist.",
      whyHere:
        "Viz.ai's launch announcement for Viz Assist calls its imaging algorithms FDA-cleared and says nothing about a clearance for Viz Assist itself; the product page carries no regulatory statement either. An unstated status, not a denied one — two regulatory positions side by side under one brand.",
    },
    {
      title: "Work out what the phone is actually allowed to be",
      whatItDoes:
        "Reads the mobile-app clause that recurs across several of Viz.ai's indications.",
      whyHere:
        "It says images previewed on the phone \"are compressed and are for informational purposes only and not intended for diagnostic use beyond notification,\" and that \"notified clinicians are responsible for viewing non-compressed images on a diagnostic viewer.\" The phone's job: wake someone up, not become the screen they decide on.",
      tweak:
        "Viz HCM, which reads heart tracings rather than scans, is worded differently and aimed at cardiologists reviewing patients aged 18 and over.",
    },
    {
      title: "Test the vendor's own head-to-head claim",
      whatItDoes:
        "Traces the comparison line on Viz.ai's Viz LVO page back to the publication it cites.",
      whyHere:
        "The page states \"Viz performed better than Rapid with a higher specificity and PPV\" — two measures of how often a positive flag turns out to be right — and names its source (listed as Delora et al., 28 July 2023). The citation being there means the claim can be followed rather than taken on trust, though it is still the vendor's choice of result.",
    },
  ],

  pitfalls: [
    "Reading a suite name as a product. \"Viz Neuro Suite\" and \"Viz Cardio Suite\" are website groupings; clearances attach to the modules inside — Viz LVO, Viz ICH, Viz CTP, Viz SDH, Viz ANEURYSM and the rest — each worded separately with its own limits.",
    "Mistaking the training app for the product. A separate free \"Viz Training\" app exists in the app stores, labelled \"not a medical device\" and \"intended for informational purposes only,\" its listing showing a last update in February 2020.",
    "Taking the homepage's \"over 50 advanced, FDA-cleared algorithms\" as covering everything on the site. It counts cleared algorithms; it does not say every feature or assistant carrying the Viz name is one, and the indications-for-use page names far fewer than fifty.",
  ],

  whereToNext: [
    { label: "Healthcare AI", categorySlug: "healthcare-ai" },
    { label: "Research & academic tools", categorySlug: "research-academic-tools" },
    { label: "Chat assistants you can open today", categorySlug: "text-conversational-ai" },
  ],
};
