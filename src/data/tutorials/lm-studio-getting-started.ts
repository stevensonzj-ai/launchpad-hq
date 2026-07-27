import type { PlatformTutorialData } from "./types";

export const lmStudioTutorial: PlatformTutorialData = {
  slug: "lm-studio-getting-started",
  platformSlug: "lm-studio",
  title: "Getting Started with LM Studio",
  tagline: `Run an AI model entirely on your own computer, through an interface that does not require a terminal.`,
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-07-27",
  changelogUrl: "https://lmstudio.ai/blog",
  accessTier: "FREE",

  howItWorks: `LM Studio is a desktop application that downloads AI models onto your machine and runs them there. Nothing you type leaves your computer. You browse a built-in catalogue, download a model file, load it, and chat with it in a window that looks much like any other assistant — except the processing happens on your own hardware. Speed and quality depend on your machine rather than on a subscription tier, which is the whole trade being made.`,

  whatItIs: [
    `A desktop app for Windows, macOS, and Linux that runs open models locally with a graphical interface.`,
    `The point-and-click counterpart to command-line local runners — same underlying capability, no terminal required.`,
    `Free for personal **and** commercial use, with an optional paid tier for organisations needing central administration.`,
    `Completely offline once a model is downloaded, which is the reason most people choose it.`,
  ],

  beforeYouStart: [
    `**Your hardware is the limit, not your plan.** Memory is the binding constraint — roughly 8GB of RAM will run small models slowly, 16GB is workable, and 32GB or more with a dedicated graphics card is where it becomes comfortable.`,
    `Model files are large. Expect several gigabytes per model and plan disk space accordingly.`,
    `Since 2025-07-08 the app has been free for use at work with no licence request, no form, and no fee. Older articles saying otherwise are out of date.`,
    `Local models are genuinely less capable than the best hosted ones. You are trading capability for privacy, offline access, and zero per-use cost.`,
    `Nothing you type is sent anywhere. That is the feature.`,
  ],

  gettingSetUpSafely: {
    officialSource: "LM Studio official site",
    vendorDocsUrl: "https://lmstudio.ai/docs",
    body: [
      `Download the installer from the official site for your operating system. Model files are large — do this on a connection you are not paying by the gigabyte for.`,
      `Use the built-in catalogue rather than hunting for files elsewhere. It shows estimated memory requirements before you download, which is the number that decides whether a model will run at all.`,
      `Start with a small model. A small model that runs is more useful than a large one that swaps to disk and takes minutes per reply.`,
      `If a model loads but responds unusably slowly, it is too large for your machine. Unload it and step down a size rather than waiting it out.`,
    ],
  },

  security: [
    {
      kind: "text",
      text: `This is the strongest privacy posture available in this catalogue, and it is structural rather than contractual. Your conversations **never leave your computer**, so there is no retention policy to read, no training toggle to set, and no terms that can change next year and quietly alter what happens to your data.`,
    },
    {
      kind: "list",
      label: "What still deserves attention",
      items: [
        `Model files come from a public repository, so the same provenance caution applies — check who published a model before running it.`,
        `Conversations are stored locally in plain form, which means your own device security is now the whole of your data security.`,
        `The optional local server exposes an endpoint on your machine; leave it off unless you specifically need it.`,
        `Model licences still govern commercial use of outputs, independently of the app being free.`,
      ],
    },
    {
      kind: "text",
      text: `Worth stating plainly because it inverts the usual advice: with a local model, **there is no vendor to trust and no policy to check**. The trade is that you also have no vendor to fall back on — no uptime guarantee, no support, and capability bounded by the machine on your desk.`,
    },
  ],

  triad: {
    bestAt: [
      `Working with material you are unwilling to send anywhere`,
      `Using an assistant with no internet connection`,
      `Unlimited use with no per-message cost after the download`,
      `Trying several open models without wiring up any code`,
    ],
    okayAt: [
      `General assistant work, at noticeably lower quality than hosted frontier models`,
      `Longer documents, which local models handle but slowly`,
      `Coding help, where capability varies sharply by model`,
    ],
    avoid: [
      `Tasks needing the strongest available reasoning`,
      `Anything on a machine with limited memory, where the experience is genuinely bad`,
      `Expecting current information, since a local model has no web access by default`,
    ],
  },

  starterActions: [
    {
      title: "Download a small model first and confirm it runs",
      whyHere: `The most common first experience is downloading something too large and concluding local models are useless. Establish a working baseline instead.`,
      tweak: `Note the estimated memory figure before downloading. If it is close to your total RAM, choose smaller.`,
    },
    {
      title: "Ask it something you would not paste into a hosted assistant",
      prompt: `[Paste the document or question you have been avoiding putting into a cloud tool, and ask your real question.]`,
      whyHere: `This is the entire value proposition. Feeling the difference makes it concrete.`,
      tweak: `Then disconnect from the internet and ask again. Watching it work offline is the moment it clicks.`,
    },
    {
      title: "Compare two models on the same question",
      whyHere: `Teaches that "an AI model" is not one thing, and calibrates your expectations for what a machine your size can do.`,
      tweak: `Use a question you already know the answer to. You are evaluating the model, not learning the topic.`,
    },
    {
      title: "Attach a local document and ask about it",
      whatItDoes: `Lets the model read a file from your machine without uploading it anywhere.`,
      whyHere: `Private document analysis is the strongest practical use case for a local setup.`,
      tweak: `Start with a short document. Long ones are where limited hardware shows most.`,
    },
  ],

  pitfalls: [
    `**Outdated licensing information is everywhere.** The app has been free for commercial use since July 2025, but many guides still say a licence is required. Check the official site rather than a comparison article.`,
    `**Too large a model is the classic first mistake.** If replies take minutes, the model does not fit in memory. Step down a size rather than concluding local AI is unusable.`,
    `**Local means genuinely less capable.** Even good open models trail the best hosted ones on hard reasoning and long context. The trade is real; know which side of it you want.`,
    `**Your device is now your security perimeter.** Conversations sit on your disk in plain form. Full-disk encryption and a locked screen are now part of your privacy setup.`,
    `**No internet means no current information.** A local model knows only what it was trained on. It cannot check anything, and it will not tell you that.`,
  ],

  whereToNext: [
    { label: "Other local and open-source tools", categorySlug: "local-open-source-ai" },
    { label: "Hosted assistants instead", categorySlug: "text-conversational-ai" },
  ],
};
