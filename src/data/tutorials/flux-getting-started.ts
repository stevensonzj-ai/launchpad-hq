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
    "FLUX is a **model** — the trained maths that turns a description into a picture — not an app with a signup button. The motion depends on which route you take to it.\n\nThe shape never changes: write a description, get an image, adjust the words, go again. What changes is where you're sitting. On Black Forest Labs' own playground you log into a developer dashboard, load a few dollars of credit, pick a variant like `flux-2-pro`, and type. On a third-party site that licenses FLUX — Krea, Freepik, Poe, Photoshop's generative tools — you use their interface and never touch BFL. On your own computer you download the **open-weight** files (the model's parameters, published for anyone to run) and drive them through software like ComfyUI. Same model, three prices, three sets of rules about what you may do with the results.",

  whatItIs: [
    "An image generation and editing family from Black Forest Labs, the German lab founded by researchers who previously built Stable Diffusion. The current line is FLUX.2: `[max]`, `[pro]`, `[flex]`, `[dev]` and `[klein]`.",
    "Two variants are open-weight — free to download and run on your own hardware, which no closed rival allows. The rest sit behind a paid **API**, a connection point other software talks to rather than a site you visit.",
    "Why bother over Midjourney or Ideogram: FLUX.2 is built for legible text inside images and tight instruction-following. BFL points at typography, infographics and UI mockups as things that \"now work reliably\", and at referencing up to ten images at once to hold a character consistent.",
  ],

  beforeYouStart: [
    "**Three routes, priced differently.** BFL directly at bfl.ai; a third-party app with FLUX inside; or the weights on your own machine.",
    "**Going direct costs from the first image.** One bfl.ai account covers playground and API, billed from prepaid credit — currently 1 credit = $0.01, with the docs suggesting $10–$20 to experiment. Prices currently run from around $0.014 per image on the small `[klein]` models to about $0.03 for `[pro]` and $0.07 for `[max]`. A band, not a quote.",
    "**Most beginners should start on a third-party front-end.** Krea or Freepik gives you a normal creative interface, a free tier, and no API keys. You pay them, not BFL, and play by their rules.",
    "**Local is free but not easy.** `FLUX.2 [klein]` 4B is the small, freely licensed one, needing roughly 13GB of graphics memory. If that meant nothing to you, it isn't your starting point yet.",
    "**First step:** read bfl.ai's pricing and licensing pages before signing up anywhere.",
  ],

  security: [
    {
      kind: "text",
      text: "Privacy differs sharply by route. FLUX.2 [klein] on your own machine is genuinely private — no server is involved. Everything else leaves your computer: BFL's API and playground receive what you send, and a third-party front-end receives it too, then may pass it on. \"It's open source, so it's private\" is true only of the route where you host it yourself.",
    },
    {
      kind: "list",
      label: "The licence question, before you sell anything",
      items: [
        "Images made through BFL's paid API are yours — their Developer Terms say you own the Output and may use it commercially.",
        "FLUX.2 [klein] 4B is Apache 2.0: free, and free to sell from.",
        "FLUX.2 [klein] 9B is under the FLUX Non-Commercial License — free to download, not for commercial use.",
        "FLUX.2 [dev], the large open-weight model, is non-commercial by default; selling needs a paid self-hosted licence.",
        "Through someone else's app, that company's terms govern your rights, not BFL's.",
        "Free to download is not free to sell from. For FLUX those permissions genuinely come apart — check your variant before anything reaches a client invoice.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Readable text inside an image — signage, packaging labels, poster headlines, UI mockups. The clearest reason to pick FLUX over Midjourney.",
      "Following long, multi-part instructions without quietly dropping half of them.",
      "Holding a character, product or style consistent from up to ten reference images.",
      "Instruction-based editing at up to 4MP: change the jacket to red, leave everything else alone.",
    ],
    okayAt: [
      "Painterly, expressive art — competent, but Midjourney is more opinionated and often prettier unasked.",
      "Photorealistic faces and skin: good, occasionally uncanny.",
      "Fast iteration on the small variants, trading fidelity for speed.",
    ],
    avoid: [
      "Expecting a polished consumer app with galleries and a phone app. BFL doesn't make one.",
      "Long passages of body text — headlines hold up, paragraphs degrade into plausible nonsense.",
      "Anything commercial on a non-commercially-licensed variant. A legal limit, not a quality one.",
      "Precise diagrams: convincing charts, wrong numbers.",
    ],
  },

  starterActions: [
    {
      title: "Test the text rendering claim",
      whatItDoes:
        "Puts specific words in an image and shows whether FLUX actually spells them.",
      prompt:
        "A weathered enamel shop sign on a brick wall, cream lettering on deep green, reading exactly: HARBOUR ROAD BAKERY - est. 1974. Soft overcast daylight, slight rust at the bolt holes, shot straight on.",
      whyHere:
        "Text is the capability BFL leads with for FLUX.2. Do it first — if it fails on your route, you have learned something important immediately.",
      tweak:
        "Swap in your own business name, then try two lines and watch where legibility breaks.",
    },
    {
      title: "Stack six requirements and count what survives",
      whatItDoes:
        "Tests prompt adherence by giving the model more instructions than it can casually ignore.",
      prompt:
        "A cluttered ceramicist's workbench seen from directly above. Exactly three unfired bowls in the upper left. A blue cloth over the right edge. Wooden calipers pointing toward the top of the frame. Warm light from the left. No hands or people. Muted earth palette.",
      whyHere:
        "FLUX.2 is specifically tuned for adherence to complex structured instructions, so this is a fair test rather than a gotcha. Count how many of the six hold.",
      tweak: "Add conditions until it breaks. Knowing your ceiling saves hours later.",
    },
    {
      title: "Edit an image with words instead of tools",
      whatItDoes:
        "Changes one element of a picture you already have, leaving the rest intact.",
      prompt:
        "Keep this photograph exactly as it is, but change the parked car from silver to matte dark green. Do not alter the background, the lighting, the reflections in the windows, or anything else in the frame.",
      whyHere:
        "FLUX.2 does editing and generation in one model, at up to 4MP. Change this, touch nothing else is precisely what it is built for.",
      tweak:
        "Try removing an object rather than recolouring one — subtraction is harder.",
    },
    {
      title: "Hold one character across three images",
      whatItDoes:
        "Uses reference images so the same subject appears consistently in new scenes.",
      prompt:
        "Using the attached references of the same woman, place her in a new scene: standing on a train platform at dusk, holding a paper coffee cup, three-quarter view, same face and same red coat. Cinematic, shallow depth of field.",
      whyHere:
        "Multi-reference conditioning is a headline FLUX.2 feature, and consistency is what turns a novelty into usable work.",
      tweak: "Push to a five-scene storyboard with one lighting brief.",
    },
  ],

  pitfalls: [
    "**Assuming it's a website you log into.** There is no consumer FLUX app the way there's a Midjourney. BFL runs a developer dashboard with a playground attached, billed against prepaid credit. If you wanted a free browser tool with a gallery, you want a third-party product with FLUX inside — a fine answer, just a different one.",
    "**Assuming free to download means free to sell from.** `[klein]` 4B is Apache 2.0 and commercially fine; `[klein]` 9B and `[dev]` are non-commercial without a paid licence. Same download page, completely different rights.",
    "**Confusing the generations.** FLUX.1, FLUX.2 and FLUX 3 are different things, and FLUX 3 is a multimodal image, video and audio model rather than a straight successor to the image line. Check the release notes when what you read doesn't match what you see.",
    "**Expecting local to be plug-and-play.** Open weights mean graphics card requirements, multi-gigabyte files, and ComfyUI's own learning curve. A good destination, a bad first day.",
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
