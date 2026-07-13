import type { PlatformTutorialData } from "./types";

export const runwayTutorial: PlatformTutorialData = {
  slug: "runway-getting-started",
  platformSlug: "runway",
  title: "Getting Started with Runway",
  tagline:
    "Turn a text prompt or a still image into short AI-generated video — a filmmaking tool you drive by describing what you want.",
  archetype: "prompts",
  lastReviewedAt: "2026-07-13",
  changelogUrl: "https://runwayml.com/research",
  accessTier: "FREE",

  howItWorks:
    "Like other generators you prompt it in words (or feed it an image to animate), and it renders a clip. It runs on a **credit** system, but with a video-specific twist: **credits are spent by the second of generated video**, and higher-quality models cost more per second — so a few polished seconds can burn credits fast, especially since you'll usually generate several takes before one works. Building the muscle for clear, specific prompts is what makes the credits go further.",

  whatItIs: [
    "Runway is an **AI video generator** (with image and audio tools alongside). You give it a prompt, or a starting image, and it produces a short video clip; you can also direct edits by describing the change you want. It's used by hobbyists making social clips all the way up to professional studios, so the ceiling is high — but the on-ramp is simple enough for a first-timer.",
  ],

  beforeYouStart: [
    "The **free plan is a one-time sample, not a monthly allowance**: a single deposit of credits that never refills, and every clip carries a **Runway watermark**. It's for evaluating quality. Paid plans start around **$12/month (billed annually)** for a monthly credit allotment and watermark-free output.",
    "**Budget for iteration.** AI video rarely nails it first try; plan on multiple takes per usable clip, and know that credits mostly don't roll over (only the top plan rolls a little forward).",
    "Web-app credits and API credits are **separate pools** — don't assume buying one covers the other.",
  ],

  security: [
    {
      kind: "text",
      text: "Runway is unusually **creator-friendly on rights**: it grants **commercial-use rights on every tier, including the free plan**, and you **retain ownership** of what you generate, with **no attribution** to Runway required. The practical catch on free is the **watermark**, which makes those clips fine for testing but not for client delivery — that clears on the paid plans.",
    },
    {
      kind: "list",
      label: "Where the real risk lives — your prompt, not the license",
      items: [
        "If your prompt references a **copyrighted character, a real brand, a trademark, or a real person**, the output can carry legal risk no matter what Runway's license says. The license covers Runway's grant to you; it can't grant rights Runway doesn't hold.",
        "You're responsible for the rights to anything you **upload** as a starting image.",
        "Runway's license doesn't override the **rules of wherever you publish** (a platform can still take a video down).",
      ],
    },
    {
      kind: "text",
      text: "Generations are processed on Runway's cloud. As with any generator, treat outputs as drafts and check them — AI video still produces artifacts, and \"it looked right in the preview\" isn't a rights clearance.",
    },
  ],

  triad: {
    bestAt: [
      "Turning a still image into a short animated clip",
      "Generating stylized or cinematic B-roll from a description",
      "Directed edits — telling it what to change instead of restarting",
      "Fast concepting for social and short-form content",
    ],
    okayAt: [
      "Long or perfectly consistent sequences (short clips are the sweet spot)",
      "Exact prompt adherence (expect iteration)",
      "Photorealistic humans without artifacts (improving, not solved)",
    ],
    avoid: [
      "Prompts built on copyrighted characters, brands, or real people",
      "Client delivery from the watermarked free tier",
      "Assuming credits stretch far — a few HQ seconds go quickly",
    ],
  },

  starterActions: [
    {
      title: "Animate a still image",
      prompt:
        "Take this photo and add gentle, natural motion: drifting clouds, a slight camera push-in, subtle movement in the foreground. Keep it realistic and calm.",
      whyHere:
        "Image-to-video is Runway's most reliable, most beginner-friendly move and shows the quality immediately.",
      tweak: "Start from your own photo; describe the one motion you want most.",
    },
    {
      title: "A short text-to-video clip",
      prompt:
        "A slow cinematic shot of a coffee cup on a wooden table by a rainy window, warm morning light, soft focus, gentle steam rising.",
      whyHere:
        "Specific, static-ish scenes with one clear motion are what the models do best — a fair first read on text-to-video.",
      tweak: "Keep it to one subject and one motion; complexity is where clips fall apart.",
    },
    {
      title: "Direct an edit",
      prompt:
        "Same scene, but change the time of day to sunset and add a person walking past in the background.",
      whyHere:
        "Directed editing — describing the change rather than regenerating from scratch — is Runway's standout, and worth trying early.",
      tweak: "Make one change at a time so you can see what each instruction does.",
    },
  ],

  pitfalls: [
    "**The free plan doesn't refill.** It's a one-time credit deposit with a watermark — a demo, not a workflow.",
    "**Credits burn by the second, times your retries.** A minute of finished video can cost far more than a minute of credits suggests.",
    "**The license is generous; your prompt is where the legal risk is.** Copyrighted characters and real people in prompts are the trap.",
  ],

  whereToNext: [
    { label: "Video Creation & Editing", categorySlug: "video-creation-editing" },
    { label: "Image Generation & Editing", categorySlug: "image-generation-editing" },
  ],
};
