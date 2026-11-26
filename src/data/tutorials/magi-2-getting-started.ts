import type { PlatformTutorialData } from "./types";

export const magi2Tutorial: PlatformTutorialData = {
  slug: "magi-2-getting-started",
  platformSlug: "magi-2",
  title: "Getting Started with MAGI-2",
  tagline:
    "Sand AI's video model for a clip with sound, up to 30 seconds at 1080p — and a billing page that does not match the pricing page.",
  archetype: "prompts",
  lastReviewedAt: "2026-11-26",
  changelogUrl: "https://sand.ai/blog/magi-2/",
  accessTier: "FREE",

  howItWorks:
    "You describe a scene, and you can attach pictures, video or audio as references. MAGI-2 returns a short clip with the sound made in the same pass. The research post caps that clip at 30 seconds, 1080p, and 25 frames a second.",

  whatItIs: [
    "MAGI-2 is a video model from Sand AI. The homepage and the research post dated 24 November 2026 both say it can make up to 30 seconds of 1080p video with native audio in one pass. The post also says 25 frames a second, about 480 billion parameters in total and about 28 billion active, and references across images, video and audio (up to 20 items).",
    "A playground is linked at platform.sand.ai/app/playground/. On 26 November 2026 that page returned only a loading shell, so this guide does not describe the buttons inside it. What the model can make is taken from the homepage and the research post, not from a screen we clicked through.",
    "The research post says open-source releases will follow. That is a promise. The pages read today did not publish the weights.",
  ],

  beforeYouStart: [
    "The model pricing page lists one rate: magi-2 at 1080p, billed per second. It does not state a free tier or an end date for that rate. The figure is on this tool's Launchpad page. This guide does not type it.",
    "**The pricing page and the billing page disagree about adding funds.** The pricing page says \"Top-up is not supported for the time being.\" The balance and billing page describes opening Top up and paying online, with Stripe on the global site and Alipay on the China site. Do not assume you can buy more credit until the screen in your own account completes a payment.",
    "There is no consumer plan price on those pages. If a salesperson quotes one, it was not on the pages this guide used.",
  ],

  security: [
    {
      kind: "text",
      text: "Sand AI's privacy policy is at sand.ai/privacy-policy/. This guide does not summarise it: a privacy rating was not taken from that page. Read it before you upload a face, a client's footage, or anything you would not post. A reference image is still your file, sent to their service.",
    },
    {
      kind: "list",
      label: "Two billing facts to read before you pay",
      items: [
        "The pricing page says top-up is not supported for the time being, and points people to Sand AI's X account for a launch date.",
        "The billing page still walks through Top up, a preset or custom amount, and an online payment. Treat that as a description of a screen, not as proof the button works today.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "A short clip with picture and sound generated together, up to the 30-second 1080p limit the research post states.",
      "Keeping a character or a place steady by attaching references. The post says up to 20 media items on a native request.",
    ],
    okayAt: [
      "Directing every cut yourself. The post describes timeline and shot-cut control. This guide did not open the playground, so the control names on screen are not listed here.",
    ],
    avoid: [
      "A film longer than 30 seconds, or a master above 1080p. That is the ceiling the homepage and the research post describe.",
      "Planning a budget around top-up. The two official pages do not agree that you can add funds.",
      "Waiting on a download. Open-sourcing is described as something that will follow, not as a file you can get today.",
    ],
  },

  starterActions: [
    {
      title: "One subject, one camera move",
      prompt:
        "A ceramic coffee mug on a wooden table beside a rainy window, steam rising, soft morning light, one slow push-in, no cuts, quiet room tone.",
      whyHere:
        "The homepage says one pass can be up to 30 seconds of 1080p with native audio. A single subject and a single camera move is the smallest test of that claim. The playground's own buttons were not visible when this page was written, so if a control is named differently, follow the label on screen.",
      tweak: "Change only the camera move — a static wide shot, then a slow orbit — and compare.",
    },
    {
      title: "Read both billing pages before you pay",
      whatItDoes:
        "Open the model pricing page and the balance and billing page and read the top-up lines side by side.",
      whyHere:
        "One page says top-up is not supported for the time being. The other describes how to top up. The rate itself is per second of 1080p, and the Launchpad page shows the current figure.",
    },
    {
      title: "Check the promise about the weights",
      whatItDoes:
        "On the research post, find the sentence that says open-source releases will follow.",
      whyHere:
        "That sentence is a plan. It is not a download link. If a file appears later, its licence will be on that release, not in this sentence.",
    },
  ],

  pitfalls: [
    "**Do not budget for a top-up the pricing page says is unavailable.** The billing page describing the steps does not settle the disagreement.",
    "**30 seconds is the long end, not a default you should start with.** A short clip tells you whether the description worked before you spend several seconds of the per-second rate.",
    "**The playground page did not show its controls on 26 November 2026.** If a button you expected is missing, that is a gap in this guide, not a sign you did the prompt wrong.",
  ],

  whereToNext: [
    { label: "Video Creation & Editing", categorySlug: "video-creation-editing" },
    { label: "AI APIs and developer services", categorySlug: "ai-apis-developer-services" },
  ],
};
