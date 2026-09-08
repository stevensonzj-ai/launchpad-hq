import type { PlatformTutorialData } from "./types";

export const replicateTutorial: PlatformTutorialData = {
  slug: "replicate-getting-started",
  platformSlug: "replicate",
  title: "Getting Started with Replicate",
  tagline:
    "A catalog of thousands of ready-to-run AI models — image, video, audio, text — that you can run from a form in your browser and pay for by the run, with no subscription.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-08",
  changelogUrl: "https://replicate.com/changelog",
  accessTier: "FREE",

  howItWorks:
    "You browse a directory of AI **models** (the AI \"brain\" that does the actual thinking), open the one you want, and its page gives you a form — type a description, upload a photo, set a couple of options. Press Run, wait a few seconds, and the result appears underneath. Change an input, run it again.",

  whatItIs: [
    "Replicate is a directory of AI models you rent by the run. Thousands of them — image generators, video models, upscalers, transcription, old-photo restoration, text models — each on its own page with a form, a price and a Run button. You don't open an account with the lab that built each model; you open one here and run any of them.",
    "Two things shape what it feels like. Models come in two grades: \"official\" ones Replicate maintains, which stay running and charge a flat price per image or per thousand words, and community ones uploaded by their authors, charged for the seconds of hardware time they use. And Replicate was acquired by Cloudflare in late 2025 — replicate.com still runs under its own name and was still shipping changes into 2026, but its long-term direction is now Cloudflare's call.",
  ],

  beforeYouStart: [
    "**The account gate is the first surprise.** Replicate's sign-in page currently offers only \"Sign in with GitHub\" — there is no email-and-password option, so signing up means creating a free GitHub developer account if you don't have one. It takes a couple of minutes, and it stops more non-developers than anything else on the site. You also need to be 18.",
    "\"Free\" here is a fixed number of runs, not a monthly allowance. A \"Try for free\" collection lets you run a small set of selected models a limited number of times once you have an account; after that you're asked to set up billing.",
    "You pay by the run out of a balance you top up, so there's no subscription to cancel — but budget a little real money if you want to explore properly. Official models publish a flat price on the page (FLUX Pro is currently about $0.04 per image); community models bill for however long the hardware runs, which is harder to predict. Worth knowing up front: Replicate removed its self-serve monthly spend limit in July 2025, so there's no toggle to cap yourself.",
    "You do not need to write code. The code path is there when you want it; nothing on day one requires it.",
  ],

  security: [
    {
      kind: "text",
      text: "The thing worth knowing is where your runs end up. Replicate stores the inputs, outputs, files and logs from what you run, and the two paths are not the same: runs you make in the browser are kept indefinitely until you delete them, while runs made through the **API** (a way for programs to talk to each other without a person clicking) are removed automatically after an hour. The convenient path is the one that remembers everything.",
    },
    {
      kind: "list",
      label: "Three habits that fit how it actually works:",
      items: [
        "Treat your run history as a filing cabinet, not a scratchpad.",
        "Read the model, not just the platform. Most models here were uploaded by other people, and some forward your input to another company's service to run it. Replicate's terms hand you the rights to what you generate — but each model carries its own licence on top, and that is the one that governs commercial use.",
        "Don't send anything you'd hesitate to hand a third party. Replicate's terms take a broad licence over what you submit in order to run the service. Fine for a photo you'd post publicly; poor for a passport scan or a client's contract.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Trying one specific model — a named image, video, upscaling or transcription model — without opening an account with the company that made it",
      "Narrow, unglamorous jobs nobody built a consumer app around — face restoration, upscaling, background removal, reading text out of a scan",
    ],
    okayAt: [
      "Chatting — text models do run here, but a chat window is a better place to talk to one",
    ],
    avoid: [
      "Building a habit around a community model — its author maintains it, not Replicate, and its inputs can change between versions",
      "Assuming you can cap your spending in settings — the self-serve monthly spend limit was deprecated in July 2025, and getting one now means asking support",
    ],
  },

  starterActions: [
    {
      title: "Start in the 'Try for free' collection",
      whatItDoes:
        "Runs one of a small set of selected models — image generators, upscalers, photo restorers — a limited number of times without setting up billing.",
      whyHere:
        "It's the one corner of the site where the Run button works before a payment method does. Open a model from search instead and you get a short run of goes and then a billing prompt. Starting here means you find out whether the output is any good before you decide to fund an account.",
      tweak:
        "Bookmark the collection page — it's easy to wander into the wider catalog and lose track of which models were the free ones.",
    },
    {
      title: "Prefer models labelled 'Official' while you're learning",
      whatItDoes:
        "Narrows your choices to the models Replicate maintains itself.",
      whyHere:
        "The two grades are billed on different clocks. An official model tells you it costs about four cents an image before you press anything; a community model charges for however many seconds the hardware ran, which you can't know in advance. Learning what things cost is far easier on the side of the catalog where the price is a number rather than a stopwatch.",
    },
    {
      title: "Run one model in the browser before writing a line of code",
      whatItDoes:
        "Uses the form on the model page — type or upload, press Run, see the result on the same page.",
      whyHere:
        "Each model page generates its form from that model's own inputs, so the browser covers the whole catalog rather than a demo subset, and those runs stay in your account history where you can see what you ran and what it cost.",
    },
    {
      title: "Go looking for the model nobody made an app out of",
      whatItDoes:
        "Searches the community catalog for the narrow jobs — sharpening a blurred face in an old photo, enlarging a small image, pulling text out of a scan, cutting out a background.",
      whyHere:
        "These are research models their authors published and never wrapped in a product, so there's no website to sign up to; this catalog is often the only place a non-developer can press Run on one. It's also the clearest reason to be here rather than at a curated model service, which carries the popular models and not the long tail.",
      tweak:
        "Run counts are shown on the model cards. One that thousands of people have used is a safer first try than one with a handful.",
    },
  ],

  pitfalls: [
    "Scrolling past the price. It's on the model page — per output, or per second of hardware — and it's the easiest thing to skip on the way to the form.",
    "Judging a model by a slow first run. One that hasn't been used lately has to start up first, which can take minutes. You aren't charged for that wait.",
    "Treating an output link as storage. Files from runs made through code are deleted after an hour — download anything you want to keep.",
    "Expecting 'free' to come back. The free runs are a one-off allotment on selected models, not a monthly allowance.",
  ],

  whereToNext: [
    { label: "AI APIs & Developer Services", categorySlug: "ai-apis-developer-services" },
    { label: "Local & Open-Source AI", categorySlug: "local-open-source-ai" },
  ],
};
