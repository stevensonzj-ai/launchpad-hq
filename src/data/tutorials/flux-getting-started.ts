import type { PlatformTutorialData } from "./types";

export const fluxTutorial: PlatformTutorialData = {
  slug: "flux-getting-started",
  platformSlug: "flux",
  title: "Getting Started with FLUX",
  tagline:
    "The image model that finally gets text right — but you'll reach it through someone else's front door.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-07",
  changelogUrl: "https://docs.bfl.ai/release-notes",
  accessTier: "PREMIUM",

  howItWorks:
    "FLUX is a **model** — the AI \"brain\" that does the actual work — not a website you log into. Whichever route you reach it through, the motion is the same: describe the picture you want, look at what comes back, change the wording, go again.",

  whatItIs: [
    "An image and editing model family from Black Forest Labs, the German lab founded by the researchers behind Stable Diffusion. The current line is FLUX.2: `[max]`, `[pro]`, `[flex]`, `[dev]` and `[klein]`. Two are **open-weight** — the model file itself is published, so you can run it yourself, which no closed rival allows. The rest sit behind a paid **API**, a way for programs to talk to each other without a person clicking.",
    "Its pitch against Midjourney: legible text inside images, and tight instruction-following. BFL says typography, infographics and UI mockups \"now work reliably\", and that it holds a character consistent across up to ten reference images.",
  ],

  beforeYouStart: [
    "Going direct to Black Forest Labs' dashboard at bfl.ai costs money from the first image: prepaid credit, currently 1 credit = $0.01, with the docs suggesting $10–$20 to experiment. Per image, prices currently run from about $0.014 on the small `[klein]` models to $0.03 for `[pro]` and $0.07 for `[max]`. Those are starting prices, and they vary by resolution.",
    "**Most beginners should come in through someone else's app.** Krea and Freepik are ordinary image-making websites — sign up, type, get pictures — that license FLUX and run it for you. Both have a free tier, you pay them rather than BFL, and their terms set your rights.",
    "Running the files yourself is free, and the barrier is hardware, not skill: the freely licensed `FLUX.2 [klein]` 4B wants a graphics card with roughly 13GB of memory on it — most laptops don't have that — plus software like ComfyUI to drive it. Below that bar, a third-party app is the same model for cents an image.",
  ],

  security: [
    {
      kind: "text",
      text: "Privacy differs sharply by route. `[klein]` on your own machine is genuinely private — no server is involved. Every other route sends what you type to someone's computer, BFL's or a third-party app's, which may pass it on. Open source is not the same as private.",
    },
    {
      kind: "list",
      label: "Free to download is not free to sell from",
      items: [
        "Images made through BFL's paid API are yours: their Developer Terms say you own the Output and may use it commercially.",
        "`FLUX.2 [klein]` 4B is Apache 2.0 — free, and free to sell from. The 9B is under the FLUX Non-Commercial License: free to download, not for commercial use.",
        "`FLUX.2 [dev]`, the large open-weight model, is non-commercial by default; selling needs a paid self-hosted licence.",
        "For FLUX these permissions genuinely come apart — check your variant before anything reaches a client invoice.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Readable text inside an image — signage, packaging, poster headlines",
      "Long, multi-part instructions, without quietly dropping half",
      "Editing by instruction: change the jacket, leave the rest alone",
    ],
    okayAt: [
      "Painterly art — Midjourney is prettier unasked",
      "Photorealistic faces: good, occasionally uncanny",
      "Fast iteration on the small variants, trading fidelity for speed",
    ],
    avoid: [
      "Expecting a polished consumer app with a gallery — BFL doesn't make one",
      "Body text: headlines hold, paragraphs degrade into plausible nonsense",
      "Anything commercial on a non-commercially-licensed variant — a legal limit, not a quality one",
    ],
  },

  starterActions: [
    {
      title: "Test the text-rendering claim first",
      prompt:
        "A weathered enamel shop sign on a brick wall, cream lettering on deep green, reading exactly: HARBOUR ROAD BAKERY - est. 1974. Soft overcast daylight.",
      whyHere:
        "Legible text is the capability BFL leads with for FLUX.2, so a failure here tells you about your route immediately.",
    },
    {
      title: "Stack five requirements and count what survives",
      prompt:
        "A ceramicist's workbench seen from directly above. Exactly three unfired bowls in the upper left. A blue cloth over the right edge. Warm light from the left. No hands.",
      whyHere:
        "FLUX.2 is tuned for adherence to complex structured instructions, so counting how many hold is a fair test, not a gotcha.",
    },
    {
      title: "Edit a picture with words instead of tools",
      prompt:
        "Keep this photograph as it is, but change the parked car from silver to matte dark green. Change nothing else — not the background, the lighting, the reflections.",
      whyHere:
        "FLUX.2 generates and edits in one model at up to 4MP, and change one thing, touch nothing else is the job it was built for.",
    },
  ],

  pitfalls: [
    "**It is not a website you log into.** There is no consumer FLUX app the way there is a Midjourney — BFL runs a developer dashboard with a playground, billed against prepaid credit. A free browser tool with a gallery means a third-party product with FLUX inside.",
    "**Confusing the generations.** FLUX.1, FLUX.2 and FLUX 3 are different things; FLUX 3 is a combined image, video and audio model, not a successor to the image line. Check the release notes when what you read doesn't match what you see.",
  ],

  whereToNext: [
    {
      label: "Image tools you can just sign up for",
      categorySlug: "image-generation-editing",
    },
    {
      label: "Running open models yourself",
      categorySlug: "local-open-source-ai",
    },
  ],
};
