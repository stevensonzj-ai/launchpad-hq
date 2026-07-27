import type { PlatformTutorialData } from "./types";

export const huggingFaceTutorial: PlatformTutorialData = {
  slug: "hugging-face-getting-started",
  platformSlug: "hugging-face",
  title: "Getting Started with Hugging Face",
  tagline: `The place every open model actually lives — and an orientation to it before you try to use it.`,
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-07-27",
  changelogUrl: "https://huggingface.co/blog",
  accessTier: "FREE",

  howItWorks: `Hugging Face is the shared repository the open-model world runs on. Models, datasets, and small hosted demos live there, uploaded by companies and individuals alike. Most people meet it sideways: a tutorial says "download the model from Hugging Face" and they arrive without knowing what the site is. Its core function is storage and distribution — the models are free to browse and download — while running anything at scale on their hardware is where charges begin.`,

  whatItIs: [
    `A public repository of openly available AI models and datasets, free to browse and download without an account.`,
    `The place other tools point at when they fetch a model — including local runners like Ollama and LM Studio.`,
    `A host for small interactive demos, so you can try a model in a browser before installing anything.`,
    `**Not a chat assistant.** If you want something to talk to, this is the wrong page — this is where the components live.`,
  ],

  beforeYouStart: [
    `This platform is marked Advanced in our catalogue and that is honest. Getting real value from it generally means writing some Python. Browsing and trying demos does not.`,
    `A free account costs nothing and needs no card. It covers unrestricted access to public models and datasets, private storage, basic demo hosting, and a small daily allowance of shared GPU time.`,
    `The individual paid tier runs about $9 a month and mostly buys a larger GPU allowance and more storage. Team and enterprise tiers are per seat.`,
    `**The subscription is not the bill.** Compute — hosted demos on upgraded hardware, and dedicated model deployments — is billed separately by the hour on top of any plan.`,
    `Most beginners should arrive here to fetch a model for a different tool, not to run one here.`,
  ],

  gettingSetUpSafely: {
    officialSource: "Hugging Face documentation",
    vendorDocsUrl: "https://huggingface.co/docs",
    body: [
      `Browse without an account first. You do not need to sign up to look at a model page or read its documentation.`,
      `When you do create an account, generate an access token only if a tool asks for one, and scope it to read access unless you are uploading.`,
      `Before spinning up any paid hardware, find where the pause control is. Knowing how to stop the meter matters more than knowing how to start it.`,
      `Read a model's licence before using its output for anything real. "Openly available" and "free to use commercially" are not the same claim.`,
    ],
  },

  security: [
    {
      kind: "text",
      text: `The risk here is not a vendor training on your conversations — it is that this is a **public repository anyone can upload to**. Models and datasets arrive from companies, research labs, and anonymous individuals alike, and the platform hosts them rather than vetting each one. Popularity and download counts are social signals, not safety guarantees.`,
    },
    {
      kind: "list",
      label: "What to check before you trust a model",
      items: [
        `Who published it — an established organisation, or an account with no history.`,
        `Whether the model card actually documents training data and intended use, or is empty boilerplate.`,
        `The licence, which governs commercial use and is frequently more restrictive than people assume.`,
        `Whether you are downloading something that executes code on load, as opposed to plain weights.`,
      ],
    },
    {
      kind: "text",
      text: `The billing risk deserves equal weight. **Idle compute still bills.** A dedicated deployment left running charges by the hour regardless of whether it served a single request, and the most common expensive mistake here is forgetting something is switched on rather than using it too much.`,
    },
  ],

  triad: {
    bestAt: [
      `Finding and downloading open models for use in other tools`,
      `Trying a model in a browser demo before committing to a local install`,
      `Reading documentation about what a model was trained on and intended for`,
      `Finding datasets for a specific task`,
    ],
    okayAt: [
      `Serving as a general-purpose entry point, since it assumes more background than most beginners have`,
      `Running things directly, which works but costs real money at any scale`,
    ],
    avoid: [
      `Treating any uploaded model as vetted or safe by default`,
      `Leaving paid hardware running between sessions`,
      `Expecting a chat interface — that is not what this is`,
    ],
  },

  starterActions: [
    {
      title: "Try a model in a browser demo before installing anything",
      whatItDoes: `Runs a small hosted demo of a model on the platform's own hardware.`,
      whyHere: `You find out whether a model does what you need without a download, an install, or a bill.`,
      tweak: `If the demo is slow or queued, that is shared free capacity, not the model's real speed.`,
    },
    {
      title: "Read one model card end to end",
      whyHere: `Model cards are where training data, limitations, and licence live. Learning to read one is the actual skill this platform teaches.`,
      tweak: `Compare a well-documented card against a sparse one. The difference tells you a lot about what you are about to run.`,
    },
    {
      title: "Find the model a tutorial told you to download",
      whyHere: `This is how most people genuinely use the site, and doing it deliberately once removes the mystery.`,
      tweak: `Note the exact model name including the publisher prefix. Similarly-named models from different publishers are not interchangeable.`,
    },
    {
      title: "Check a licence before you rely on an output",
      whyHere: `Open weights routinely carry conditions on commercial use, and discovering that after you have shipped is expensive.`,
      tweak: `If the licence is not plainly stated, treat that as a finding rather than an oversight.`,
    },
  ],

  pitfalls: [
    `**Anyone can upload.** This is a public repository, not a curated store. Check the publisher, the model card, and the licence before running anything, and be sceptical of models with no documented provenance.`,
    `**Idle compute bills anyway.** Dedicated deployments and upgraded demo hardware charge by the hour whether or not they are used. Pausing is not the same as scaling down — find the pause control before you start.`,
    `**The plan price is a fraction of the real cost.** Subscription tiers cover your account, not the compute. Anything you actually run is billed separately.`,
    `**Open does not mean commercially free.** Licences vary widely and some prohibit commercial use outright. Read it before you build on it.`,
    `**It is not an assistant.** Arriving here expecting something to chat with means you wanted a different tool. This is the parts department.`,
  ],

  whereToNext: [
    { label: "Run models on your own machine", categorySlug: "local-open-source-ai" },
    { label: "Hosted APIs instead", categorySlug: "ai-apis-developer-services" },
  ],
};
