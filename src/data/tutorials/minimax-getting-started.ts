import type { PlatformTutorialData } from "./types";

export const minimaxTutorial: PlatformTutorialData = {
  slug: "minimax-getting-started",
  platformSlug: "minimax",
  title: "Getting Started with MiniMax",
  tagline:
    "A model company with a coding app, a pay-as-you-go API, and open weights under MiniMax's own community licence.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-11-26",
  changelogUrl: "https://www.minimax.io/blog/minimax-m31f",
  accessTier: "FREE",

  howItWorks:
    "MiniMax is a family of models, not one chat box. You either open MiniMax Code and describe a task, call the API from software you write, or download the weights and run them on hardware you control.",

  whatItIs: [
    "MiniMax's homepage lists flagship models across language, video, image and speech, and names MiniMax Code and MiniMax Design as products, plus an API platform for developers. This page covers the two models with a public how-to: M3.1 Flash and H3-Image.",
    "M3.1 Flash, announced 19 October 2026, is a text model that also accepts images and video and answers in text. MiniMax says it is available through the API, M Plan, and MiniMax Code. The model card says about 428 billion parameters in total, about 23 billion active, and a context window of up to 1 million tokens. It is not an image generator. Drawing a picture is H3-Image's job.",
    "H3-Image, announced 11 November 2026, is an open-weight image model. The post says it can make a 4K image (4096 by 4096) in under 10 seconds, take up to 16 reference images, and edit as well as generate. It is available through the API, MiniMax Code, and Hailuo AI.",
    "The M3.1 Flash weights are on Hugging Face under the MiniMax Community License. That is MiniMax's own licence. Non-commercial use is allowed. Commercial use has extra conditions, below. The licence is not a standard permissive grant.",
  ],

  beforeYouStart: [
    "Pick the door that matches the job. MiniMax Code is the app: the M3.1 Flash post links a desktop download at agent.minimax.io/download. The API is for code you run yourself. M Plan is a subscription with its own key. The M Plan quickstart says that key is not the same as a pay-as-you-go API key, and that if you only use M Plan inside MiniMax Code you do not need to configure the key.",
    "This guide does not type prices. M3.1 Flash is billed per token on the API. M Plan and the other models are priced on platform.minimax.io. The figures this site has checked are on the Launchpad page.",
    "The 11 November H3-Image post also mentions a launch-week discount. This guide does not repeat it. A later read of the API pricing page, recorded on the fact file, did not use that launch-week wording, and that pricing page was not opened again on 26 November 2026.",
  ],

  gettingSetUpSafely: {
    officialSource: "The M3.1 Flash model card and its MiniMax Community License on Hugging Face",
    body: [
      "Download M3.1 Flash only from MiniMaxAI/MiniMax-M3.1-Flash. The card's own command is hf download of that repository. A copy under another account is not the publisher.",
      "Read the LICENSE file in that repository before you ship anything. The grant for ordinary use is non-commercial. Commercial use adds the credit line and, above a revenue threshold, written permission.",
      "H3-Image has its own repository. Read that model's licence separately. This page checked the M3.1 Flash licence, not H3-Image's.",
    ],
    vendorDocsUrl: "https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash",
  },

  security: [
    {
      kind: "text",
      text: "The API platform's privacy policy is at platform.minimax.io/protocol/privacy-policy. On 26 November 2026 that page did not return its text, so this guide does not say where data is stored or whether prompts are used for training. Read the policy before you upload a client's files, and do not treat silence here as a promise.",
    },
    {
      kind: "list",
      label: "The M3.1 Flash licence, as published on Hugging Face",
      items: [
        "Non-commercial use is granted. The copyright notice has to stay with copies.",
        "Commercial use means you prominently display \"Built with MiniMax M3.1-Flash\" and send MiniMax a one-time notice.",
        "If the product brings in more than 20 million US dollars in a year, you need MiniMax's written permission first. The licence says to email api@minimax.io.",
        "The appendix bars military use, harm to minors, and several other uses. Read that appendix. It is part of the licence.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "A coding or research task inside MiniMax Code, on M3.1 Flash, without writing an API client first.",
      "An image with words in the prompt, or with up to 16 reference pictures, on H3-Image rather than on the text model.",
      "Running M3.1 Flash yourself, if you can follow a model-serving guide and you accept the community licence.",
    ],
    okayAt: [
      "Calling the API from your own program. The quickstart is there. This page does not teach the code.",
    ],
    avoid: [
      "Asking M3.1 Flash to draw the picture. It returns text. H3-Image is the image model.",
      "Treating the download as a standard permissive grant. The licence is MiniMax's, and commercial use is conditional.",
      "Pasting an API key into a chat or a repository. The M Plan quickstart says the key is a secret.",
    ],
  },

  starterActions: [
    {
      title: "Open MiniMax Code and name the model",
      whatItDoes:
        "Install MiniMax Code from the download link on the M3.1 Flash post, then confirm the selected model is MiniMax-M3.1-Flash before you give it a real task.",
      whyHere:
        "The post says the same model runs in MiniMax Code, on M Plan, and on the API. Checking the name first stops you from testing a different model and blaming this one.",
    },
    {
      title: "Read the licence before you ship",
      whatItDoes:
        "Open the LICENSE file on MiniMaxAI/MiniMax-M3.1-Flash and read the commercial-use paragraph and the appendix.",
      whyHere:
        "A download that says \"open weights\" still has conditions. The credit line and the revenue threshold are in that file, not in the blog headline.",
    },
    {
      title: "Make the picture on H3-Image",
      prompt:
        "A ceramic coffee mug on a wooden table by a rainy window, steam rising, soft morning light, no text.",
      whyHere:
        "Run this in Hailuo or in MiniMax Code's H3 Image tool, not in a M3.1 Flash chat. The H3-Image post is the one that describes text-to-image, editing, and up to 16 reference images.",
      tweak: "Add one reference photo of a mug you own, and say that the photo guides the mug's shape only.",
    },
  ],

  pitfalls: [
    "**M3.1 Flash does not generate the image.** If the reply is a paragraph about a mug, you are on the text model. Switch to H3-Image.",
    "**The two API keys are not interchangeable.** The M Plan quickstart says the subscription key spends M Plan quota, and a pay-as-you-go key is a different credential.",
    "**The H3-Image launch post still mentions a launch-week discount.** Do not plan a budget around that sentence. Check the API pricing page, and the Launchpad page, for the rate that applies today.",
  ],

  whereToNext: [
    { label: "AI APIs and developer services", categorySlug: "ai-apis-developer-services" },
    { label: "Image generators", categorySlug: "image-generation-editing" },
    { label: "Local and open-source AI", categorySlug: "local-open-source-ai" },
  ],
};
