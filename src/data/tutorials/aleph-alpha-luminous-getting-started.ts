import type { PlatformTutorialData } from "./types";

export const alephAlphaLuminousTutorial: PlatformTutorialData = {
  slug: "aleph-alpha-luminous-getting-started",
  platformSlug: "aleph-alpha-luminous",
  title: "Getting Started with Aleph Alpha (Kolibri)",
  tagline:
    "A German company's open-weight language model you can download, plus an installed product sold to governments and large businesses.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-11-26",
  changelogUrl: "https://aleph-alpha.com/en/news/kolibri-1-1-release/",
  accessTier: "PREMIUM",

  howItWorks:
    "Kolibri is a language model (the AI \"brain\") you download and run yourself. Aleph Alpha's installed product, PhariaAI, is the other door: staff at a buying organisation open an internal chat and type a question there.",

  whatItIs: [
    "Aleph Alpha is a Heidelberg company. Its current open-weight model is Kolibri 1.1, released 23 November 2026, seven weeks after Kolibri 1.0. The announcement says the weights are on Hugging Face under the Apache 2.0 licence, with 75 billion parameters in total and 3 billion active, a context window it describes as 1 million tokens, and that the model can run on a GPU with 24 GB of memory.",
    "The model card is more specific than the announcement. It says the native context is 262,144 tokens, that you can extend it to 1,048,576, and that complex tasks should stay at or under 262,144. It counts 3.44 billion active parameters. It also says the Apache 2.0 grant covers the weights and configuration files in that repository, not Aleph Alpha's training code or the model architecture.",
    "PhariaAI is the installed stack for organisations. The company's developer docs describe a chat that lives at the customer's own address, not on a public website anyone can sign up to. Luminous is the older model line this listing was first written about. The 23 November 2026 announcement is about Kolibri, not a new Luminous release.",
    "On 16 September 2026 Cohere announced a definitive agreement to combine with Aleph Alpha. That announcement says the deal still needs regulatory approvals and was expected to close later in 2026. The page does not say the deal has closed, and it does not say what happens to PhariaAI afterwards.",
  ],

  beforeYouStart: [
    "The Kolibri download is the part you can start without a salesperson. The weights are published by Aleph Alpha at huggingface.co/Aleph-Alpha/Kolibri-1.1. The card's instructions use vLLM, so this is a setup for someone who can follow a developer guide, not a chat box you open in a browser.",
    "The installed product is the other way in, and it is not self-serve. The announcement describes Kolibri as built for enterprises and public institutions. Nothing on that page is a sign-up form.",
    "If what you wanted was an assistant you can open and type into today, the chat category on this site lists ones that are open to anyone.",
  ],

  gettingSetUpSafely: {
    officialSource: "The Kolibri 1.1 model card on Hugging Face (huggingface.co/Aleph-Alpha/Kolibri-1.1)",
    body: [
      "Download only from the Aleph-Alpha organisation. The card names Aleph-Alpha/Kolibri-1.1. A re-upload under another account is not the publisher, and a model file is code your computer will run.",
      "Read the licence section on that card before you build anything on the weights. It is Apache 2.0 for the files in the repository, and the card says that grant stops there.",
      "Follow Aleph Alpha's own getting-started notes on the card. The announcement's 24 GB figure is a hardware claim on the news post, not a step-by-step install guide.",
    ],
    vendorDocsUrl: "https://huggingface.co/Aleph-Alpha/Kolibri-1.1",
  },

  security: [
    {
      kind: "text",
      text: "Two different products sit under this name, and they handle your text differently. Kolibri's weights run on a machine you control, so a prompt stays there unless you send it on. PhariaAI, as Aleph Alpha describes it, is installed inside the buying organisation. The privacy notice on aleph-alpha.com is about the website. The binding rules for an installation are the customer's contract.",
    },
    {
      kind: "list",
      label: "Before you treat the download as 'open source, do anything'",
      items: [
        "The model card says Apache 2.0 applies to the weights and configuration files in the repository.",
        "The same paragraph says the licence does not extend to underlying code, the architecture, parameter settings, or the training method.",
        "Read that paragraph on the card. A blog summary is not the licence.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "German and English work. The model card says those are the languages it focuses on.",
      "Running an open-weight model on hardware you control. The announcement says Kolibri 1.1 can operate on a GPU with 24 GB of memory.",
      "An organisation that wants a vendor installing software inside its own systems, which is the PhariaAI pitch rather than the download.",
    ],
    okayAt: [
      "Very long documents. The announcement says a 1-million-token window. The model card says quality on complex tasks may fall off past the native 262,144 tokens, and it recommends staying under that.",
    ],
    avoid: [
      "Planning around Luminous pages that are still online. The current announcement is Kolibri 1.1.",
      "Assuming the Cohere combination has already changed what you can download. The 16 September 2026 announcement still describes the deal as waiting on approvals.",
    ],
  },

  starterActions: [
    {
      title: "Read the licence on the model card",
      whatItDoes:
        "Open huggingface.co/Aleph-Alpha/Kolibri-1.1 and read the Licence and terms section before you download anything.",
      whyHere:
        "The announcement says Apache 2.0. The card then limits what that grant covers. Reading the card is the difference between 'I may use the weights' and 'I may copy the whole training setup'.",
    },
    {
      title: "Match the context you need to the card, not the headline",
      whatItDoes:
        "If your document is long, check the model card's context row before you assume a 1-million-token window will hold the quality.",
      whyHere:
        "The news post and the model card do not use the same number. The post says 1 million tokens. The card says 262,144 native, up to 1,048,576, and recommends the shorter length for complex tasks.",
    },
    {
      title: "Check the Cohere announcement before you bet on a roadmap",
      whatItDoes:
        "Open Cohere's 16 September 2026 post and read the sentence about regulatory approvals.",
      whyHere:
        "That post is still the public status of the combination. It says approvals are outstanding. It does not describe a finished merger or a new product line.",
    },
  ],

  pitfalls: [
    "Searching for Luminous and landing on old posts that look current. This listing started as a Luminous page. The model Aleph Alpha announced on 23 November 2026 is Kolibri 1.1.",
    "Quoting '1 million tokens' as if the model card agreed without a caveat. It documents a shorter native length and a recommendation to stay there for complex work.",
    "Treating the download as the installed product. The weights are public. PhariaAI is still described as software an organisation installs, not a site you sign up to.",
  ],

  whereToNext: [
    { label: "AI chat assistants you can open today", categorySlug: "text-conversational-ai" },
    { label: "Local and open-source AI", categorySlug: "local-open-source-ai" },
    { label: "AI APIs and developer services", categorySlug: "ai-apis-developer-services" },
  ],
};
