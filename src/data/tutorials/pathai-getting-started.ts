import type { PlatformTutorialData } from "./types";

export const pathaiTutorial: PlatformTutorialData = {
  slug: "pathai-getting-started",
  platformSlug: "pathai",
  title: "Getting Started with PathAI",
  tagline:
    "AI that reads tissue slides inside hospital and drug-company labs — sold to institutions, not to people.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-12",
  changelogUrl: "https://www.pathai.com/news",
  accessTier: "FREE",

  howItWorks:
    "A lab scans a glass slide of tissue into a very large digital image, which lands in a list in the browser of the doctor reading it. They open it, pan and zoom like a map, switch on AI tools that mark up what they see, then type their findings into a report.",

  whatItIs: [
    "PathAI is a Boston-based company building AI software for pathologists — the doctors who examine tissue samples under a microscope and say what a disease is. Its own description of who uses the platform: \"biopharma, reference laboratories, academic medical centers, and health systems.\"",
    "It sells two things: a platform that holds, displays and routes a lab's scanned slides, and a set of AI **models** (the AI \"brain\" that does the actual thinking) — PathExplore, IHCExplore, LiverExplore, IBDExplore, TumorDetect, ArtifactDetect, PathAssist Derm, AIM-MASH — which run on it and mark up or measure what is in an image.",
    "PathAI used to own a pathology laboratory business too; it was sold to Quest Diagnostics in 2024, and PathAI has described itself since as \"an independent company, dedicated to advancing AI and digital pathology solutions for biopharmaceutical companies and pathology laboratories.\"",
  ],

  beforeYouStart: [
    "**You cannot buy this as an individual, and there is no price to look up.** Every route on pathai.com ends at a \"Request a Demo\" form or an email address — `digitaldx@pathai.com` for the diagnostic platform, `bd@pathai.com` for research partnerships, both ending in a sales conversation rather than a download. As of 11 September 2026 we found no sign-up page, no published price list and no free trial anywhere on the site.",
    "Two products share the AISight name, and the small print tells them apart. One footnote reads: \"AISight® Dx is FDA-cleared for primary diagnosis in the US with the Hamamatsu NanoZoomer® S360MD, Leica Aperio® GT 450 DX, Roche VENTANA® DP200 and DP600 slide scanners and is CE-IVD–marked for primary diagnosis in the EEA, UK, and Switzerland.\" The other reads: \"AISight® is for Research Use Only. Not for use in diagnostic procedures.\" **Research Use Only** is a legal status, not modesty: PathAI is not permitted to sell that product for working out what is wrong with a patient. \"Primary diagnosis\" is its phrase for the opposite case — the diagnosis a patient's treatment is based on.",
    "Those footnotes name four places: the US, the EEA, the UK and Switzerland. PathAI announces deployments elsewhere — Brazil's A.C.Camargo Cancer Center in May 2026 — but we could not establish from its public pages what regulatory status applies outside those four.",
    "One route ends with somebody outside a customer organisation receiving something. The PathExplore Data Access Program offers approved academic researchers the measurements PathAI's software produced from slides in a public cancer-research archive called TCGA; the announcement states: \"If approved, there is no cost to academic researchers to access and use these data sets.\" What arrives is the software's output, not the software.",
    "Everything else PathAI makes public is reading: its news index and resource library are open, and the US regulator's clearance record is a free public database — the starter actions below are built around both. If you came wanting to ask an AI about medicine in plain language, this site's Getting Started with ChatGPT page will get you typing in a minute.",
  ],

  security: [
    {
      kind: "text",
      text: "If PathAI's software ever touches your data, it is because a laboratory you sent a tissue sample to is running it. Its privacy notice, effective 13 February 2025, says: \"In certain cases, your access and use of our Platforms may result in your providing access to Protected Health Information ('PHI') as defined by the Health Insurance Portability and Accountability Act of 1996 ('HIPAA')\", and \"our processing of PHI is governed by Customer Agreements, Terms of Use, and Business Associate Agreements, as applicable.\" The contract protecting a patient is the laboratory's, not the patient's.",
    },
    {
      kind: "list",
      label: "Two documents that are easy to mistake for each other",
      items: [
        "The Terms of Use on pathai.com are **website** terms — effective 3 May 2018, last updated 10 May 2022 — and say so, noting that PathAI \"software products and related services may also be governed by separate Terms of Service.\" Those product terms are not published, so the binding document for anyone using the platform is one the public cannot read.",
        "The privacy notice reserves the right to share \"aggregated user statistics and de-identified information derived from Personal Information, with third parties for any purpose.\"",
        "PathAI announced ISO 27001 certification — an independent audit of how a company manages information security — in March 2019. We found no more recent statement on its site, so treat that as a 2019 fact, not a current one.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "One browser-based place for a lab's scanned slides — PathAI pitches AISight as \"a central hub for case management, image management, and best-in-class artificial intelligence tools.\"",
      "Running other companies' algorithms next to its own: the site lists Deep Bio, Paige, Visiopharm and DoMore Diagnostics as partner algorithms on the platform.",
      "Measuring the same thing the same way at scale — PathExplore is advertised as over 600 standardised measurements per sample, at single-cell detail, across 14 cancer types.",
      "Drug trials: PathAI announced on 9 December 2025 that AIM-MASH is the first AI-powered pathology tool to receive FDA qualification under the Drug Development Tool programme, for clinical trials of MASH, a serious liver disease.",
    ],
    okayAt: [
      "Being understood from outside. Nearly everything published about how the platform behaves is PathAI's own description of it, and none of it can be checked without an account.",
    ],
    avoid: [
      "Anything diagnostic on a product carrying the Research Use Only footnote — PathExplore, PathAssist Derm and the AISight image management system all carry \"Not for use in diagnostic procedures\" in PathAI's own materials.",
      "Reading \"FDA\" as though it meant one thing. On PathAI's own pages it does three jobs: AISight Dx is **cleared** (510(k) K243391); AIM-MASH is **qualified** as a drug development tool for clinical trials and is, in PathAI's words, \"not for use in diagnostic procedures\"; PathAssist Derm got **Breakthrough Device Designation** in March 2026 and is still Research Use Only. A designation is a place in a review queue, not permission to diagnose anyone.",
      "Assuming the platform's clearance covers the algorithms running on it. K243391 is filed under the regulation \"Digital Pathology Image Viewing And Management Software\" — the viewing and workflow layer; PathAI's own and its partners' algorithms carry separate statuses.",
    ],
  },

  starterActions: [
    {
      title: "Look up the clearance yourself",
      whatItDoes:
        "Open the US FDA's public 510(k) database and search the number PathAI prints in its own footnotes: **K243391**. The record comes back: device AISight Dx; applicant PathAI, Inc., Boston; decision date 26 June 2025; decision \"Substantially Equivalent\"; regulation name \"Digital Pathology Image Viewing And Management Software\"; product code QKQ.",
      whyHere:
        "PathAI prints the K-number in its marketing footnotes, so the trip from a vendor claim to the government record behind it is one search — and the \"regulation name\" line names what was actually cleared.",
    },
    {
      title: "Read the footnote before the headline",
      whatItDoes:
        "Open PathAI's PathExplore page and its AISight Dx page in two tabs and read the small grey line at the bottom of each before anything else.",
      whyHere:
        "PathAI's own navigation lists \"AISight® Image Management System (RUO)\" and \"AISight® Dx Digital Pathology Platform\" — the three-letter difference in the name, and the footnote under it, carry the entire regulatory distinction.",
    },
    {
      title: "Apply for the free academic data set, if that is you",
      whatItDoes:
        "Email `pathexplore.hifs@pathai.com` to apply to the PathExplore Data Access Program.",
      whyHere:
        "It is the only path on the site ending with a person outside a customer organisation actually receiving something — the software's output on public images, not the software.",
    },
    {
      title: "Follow the release notes rather than the press releases",
      whatItDoes:
        "On PathAI's news index, look for the numbered entries: AISight Dx v2.17 in October 2025, v2.18 in December 2025, v2.19 in March 2026, v2.20 in May 2026, v2.21 in July 2026, each headline naming what changed — dashboards, viewer usability, reporting, configurability.",
      whyHere:
        "A numbered release roughly every two months is a harder signal than a partnership announcement: partnerships tell you who signed, the version stream tells you the platform is genuinely shipping.",
    },
  ],

  pitfalls: [
    "**Searching \"PathAI\" and landing on a laboratory.** Quest Diagnostics bought select assets of PathAI Diagnostics; the digitised Memphis lab was rebranded AmeriPath and became Quest's national AI and digital research centre, and Quest separately licensed the AISight platform for its own labs. That laboratory is not the company that makes the software.",
    "**\"Self-service\" in PathAI's announcements does not mean you.** Its 18 November 2025 release, \"self-service integration of PathExplore on AISight\", describes an institution already running AISight switching PathExplore on without PathAI's implementation help.",
    "**Expecting the demo link to show you the product.** \"Request a Demo\" books a conversation. PathAI does run demo.aisight.pathai.com, but loading it gave only a browser-requirements notice — Chrome or Edge, JavaScript on — with no visible way to create an account, so we could not establish what sits behind it.",
  ],

  whereToNext: [
    { label: "Healthcare AI", categorySlug: "healthcare-ai" },
    { label: "Research & academic tools", categorySlug: "research-academic-tools" },
    { label: "Chat assistants anyone can open today", categorySlug: "text-conversational-ai" },
  ],
};
