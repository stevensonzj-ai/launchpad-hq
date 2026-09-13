import type { PlatformTutorialData } from "./types";

export const alephAlphaLuminousTutorial: PlatformTutorialData = {
  slug: "aleph-alpha-luminous-getting-started",
  platformSlug: "aleph-alpha-luminous",
  title: "Getting Started with Aleph Alpha",
  tagline:
    "The German company behind Luminous — now sold to governments and large businesses through a salesperson, not a website you can sign up to.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-13",
  changelogUrl:
    "https://docs.aleph-alpha.com/phariaai-home/latest/release-notes/index.html",
  accessTier: "PREMIUM",

  howItWorks:
    "Aleph Alpha's software is installed inside an organisation's own systems rather than opened on a public website. Staff there sign in to an internal address, type a question into a chat box, and read the answer back.",

  whatItIs: [
    "Aleph Alpha is a Heidelberg company that builds language models (a **model** is the AI \"brain\" that does the actual thinking) for European governments and large regulated businesses, and sells them as an installed stack called PhariaAI.",
    "Luminous — the model line that made its name, and what this listing was originally about — is no longer part of what it sells. The company stopped building general-purpose models in September 2024 and now co-builds domain-specific ones with individual customers.",
    "Its documentation describes a chat app and a prompt-and-settings workspace inside each installation, but both live at an address belonging to the customer. Treat that as what the docs describe rather than something anyone can confirm without an account.",
    "In April 2026 the Canadian AI company Cohere announced a merger with Aleph Alpha; that deal had not closed when this page was last checked, and nothing public says what happens to the PhariaAI product line afterwards.",
  ],

  beforeYouStart: [
    "There is no sign-up. The site has one call to action — contact sales — and its pricing page no longer exists, so the honest answer to whether you will need to pay is yes, through a negotiated contract rather than a card.",
    "The one exception is a Research Playground, and it is narrow: the request form asks for an academic or research institute email address and says access is granted at Aleph Alpha's discretion. It does not say how long a decision takes or how many applications are accepted, so treat approval as possible rather than likely.",
    "One Aleph Alpha model is free to download — Pharia-1-LLM-7B, published on Hugging Face. Getting an answer out of it means installing the company's own Scaling library and writing a few lines of Python; there is no click-to-install version.",
    "If what you actually wanted was an AI assistant you can open and type into today, the chat and text category on this site lists ones that are open to anyone.",
  ],

  gettingSetUpSafely: {
    officialSource:
      "The Aleph-Alpha organisation page on Hugging Face (huggingface.co/Aleph-Alpha)",
    body: [
      "Download only from the Aleph-Alpha organisation itself. Re-uploads of these files exist under other accounts; those accounts are not the publisher, and a model file is code your computer will run.",
      "Check the size before you start. The published files come to around 14 GB, and they are the full-size originals rather than a shrunk-down version, so loading them needs roughly their own size again in memory. That is a rule of thumb worked out from the published file sizes rather than a hardware requirement Aleph Alpha states, so treat it as an estimate.",
      "The instructions for loading them are Aleph Alpha's own. Follow the vendor's developer guide rather than a blog post.",
    ],
    vendorDocsUrl:
      "https://docs.aleph-alpha.com/phariaai-dev-guide/latest/pharia-llm/using-the-models.html",
  },

  security: [
    {
      kind: "text",
      text: "Aleph Alpha's whole pitch is that its software runs inside the buying organisation's own systems on European servers rather than on Aleph Alpha's, so the question of whether a vendor keeps and trains on what you type is settled by where the software sits rather than by a setting. That is a genuine structural difference from a chatbot you open in a browser tab.",
    },
    {
      kind: "text",
      text: "Two things temper it. The privacy notice on aleph-alpha.com is dated 4 September 2024 and covers the website, not the product. And the developer guide's promise that prompt data is not stored and user inputs are not logged points to Terms and Conditions that we could not find published anywhere on the public site — so the binding version is presumably the one inside a customer's contract. If you are the person evaluating this for an organisation, read the contract, not the website.",
    },
    {
      kind: "list",
      label: "If you download the free model instead",
      items: [
        "It runs on your own machine, so what you type never leaves it.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "German-language work — the models were trained on a multilingual corpus and the vendor states they are culturally and linguistically optimised for German, French and Spanish",
      "Organisations that must keep data inside Europe and be able to prove where it runs",
      "Deep, document-heavy work inside one organisation — the published customer results are government administration, contract compliance, technical document search and engineering requirements",
    ],
    okayAt: [
      "Looking good on benchmark tables — Aleph Alpha states outright that its models were not tailored to the standard leaderboards and would be expected to underperform on them",
      "Serving one person. Every part of the buying process assumes an organisation behind you",
    ],
    avoid: [
      "Anything commercial done with the free download. The Open Aleph License 1.0 permits use only for non-commercial and non-administrative purposes — and \"non-administrative\" rules out public-sector use, which is precisely what the company sells to its paying customers",
      "Committing to a long roadmap on the strength of what is available today — this company has already retired an entire model line once",
    ],
  },

  starterActions: [
    {
      title: "Read the licence before you read anything else",
      whatItDoes:
        "Open the LICENSE file on the Pharia-1-LLM-7B page on Hugging Face and read the short paragraph beginning \"Subject to the terms and conditions.\" It is a few lines long.",
      whyHere:
        "Downloadable models normally arrive under one of a handful of standard permissive licences, where reading it is a formality; Aleph Alpha wrote its own, and its \"non-administrative\" restriction has no equivalent in those standard licences — so skimming this one the way you would skim a familiar licence gives you the wrong answer. Mistral's downloadable models carry no comparable clause.",
    },
    {
      title: "Find out whether the door is open to you",
      whatItDoes:
        "Go to the Research Playground request form and read the eligibility line before filling anything in. Two minutes there saves you waiting on a reply that may never come.",
      whyHere:
        "Elsewhere a playground is gated by a card, which at least tells you the price of entry; Aleph Alpha gates this one behind who your employer is plus a discretionary decision, so there is no amount you can pay to get in by this route — and the form is the only place that says so. OpenAI's playground is card-gated, not employer-gated.",
    },
    {
      title: "Read the customer results as the spec sheet",
      whatItDoes:
        "Open the customers section of aleph-alpha.com and read the three deployments it publishes: an assistant rolled out to 80,000 users in a government agency, document retrieval at a global chip manufacturer, and requirements processing at an automotive supplier.",
      whyHere:
        "Because the company sells models co-built per customer rather than a fixed product, there is no feature list, tier table or price sheet to compare against anyone — those three customer results are the only public description of what you would actually be buying. Anthropic publishes plans, prices and model specs, so its case studies are illustration rather than specification.",
    },
    {
      title: "Check whether it is still shipping",
      whatItDoes:
        "Open the release notes index in Aleph Alpha's documentation and look at the top entry. When this page was written the most recent was PhariaAI v1.260700.0.",
      whyHere:
        "Aleph Alpha's version numbers are date-encoded — 1.260700.0 is the July 2026 release — so the number alone tells you how current the stack is without opening anything, which is the only outside-visible sign of life for a product no member of the public can log into. Cohere's changelog does not encode the release date in the version string, and its products are publicly reachable anyway.",
    },
  ],

  pitfalls: [
    "Searching for \"Luminous\" and landing on pages that look live. The old Luminous blog posts and benchmark write-ups are still at their original addresses with no notice on them, and third-party review sites still quote Luminous pricing. None of it is current.",
    "Expecting the free model to know recent things. Those published files were last updated in January 2025 and have not been refreshed since.",
    "Reading the developer documentation as if you could follow along. It gives the workspace's address as `pharia-studio` followed by your own organisation's domain.",
    "Assuming published weights means open source. The model files are public, but the licence is the company's own and does not grant the freedom to use it for anything you like, which an **open-source** licence (the code is public and anyone can inspect it) normally would.",
  ],

  whereToNext: [
    { label: "AI chat assistants you can open today", categorySlug: "text-conversational-ai" },
    { label: "Local and open-source AI", categorySlug: "local-open-source-ai" },
    { label: "AI APIs and developer services", categorySlug: "ai-apis-developer-services" },
  ],
};
