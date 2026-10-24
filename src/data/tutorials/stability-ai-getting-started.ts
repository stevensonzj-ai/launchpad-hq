import type { PlatformTutorialData } from "./types";

export const stabilityAiTutorial: PlatformTutorialData = {
  slug: "stability-ai-getting-started",
  platformSlug: "stability-ai",
  title: "Getting Started with Stability AI",
  tagline:
    "The company behind Stable Diffusion and Stable Audio — use its models through a music web app, a pay-per-image API, or free downloads you run yourself.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-10-23",
  changelogUrl: "https://docs.stability.ai/release-notes",
  accessTier: "FREE",

  howItWorks:
    "Stability AI makes generative models for images, audio and 3D. There are three ways in: the Stable Audio web app for making music in a browser; the Developer Platform, where your code pays a few cents per image; or downloading the open models and running them on your own computer with a tool like ComfyUI.",

  whatItIs: [
    "Stability AI is best known for **Stable Diffusion**, the family of image models anyone can download and run. Today it offers image models (Stable Diffusion and its \"Stable Image\" services, from the fast and cheap Core to the flagship Ultra), the **Stable Audio** family for music and sound effects, and 3D models that turn an image into a 3D object.",
    "Unlike most AI companies, it publishes many of its models as **open weights** — files you can download from its Hugging Face page and run on your own hardware. Its model pages recommend ComfyUI or the diffusers code library for this. Running locally means no per-image cost and nothing leaves your computer, but you need a capable graphics card.",
    "For people who don't want to install anything, there's the **Stable Audio web app** at stableaudio.com — Stability's one remaining consumer app, which it described as an early beta in August 2026 — and the **Developer Platform**, an API (a way for software to call the models) that charges per generation. Its consumer image app, Stable Assistant, no longer appears on Stability's site, and its old address now redirects elsewhere.",
  ],

  beforeYouStart: [
    "**API credits are a penny each.** Stability's pricing page says 1 credit is $0.01 and new accounts get 25 free credits; its getting-started guide describes them for accounts created with Google sign-in. An image from Stable Image Core costs 3 credits and from Stable Image Ultra 8 credits. Its terms say credits are non-refundable and expire a year after purchase.",
    "**Stable Audio has its own plans.** The web app uses a separate credit system from the API, with a free plan and paid monthly plans listed at stableaudio.com/pricing. Its credits don't carry over between months.",
    "**Running models yourself takes real hardware.** Stability's own figure for running its largest Stable Diffusion model is about 19 GB of graphics memory (VRAM), or about 11 GB with an optimised version on recent NVIDIA cards. Smaller models need less, but plan on a dedicated graphics card.",
    "**Check the licence if you'll earn money.** Stability's Community License lets individuals and organisations with under US $1 million in annual revenue use its open models commercially, but requires registering with Stability and displaying \"Powered by Stability AI\". Above $1 million you need an Enterprise licence.",
  ],

  gettingSetUpSafely: {
    officialSource:
      "Use stability.ai, platform.stability.ai, stableaudio.com and the official stabilityai page on Hugging Face. Downloads there are gated: you click \"Agree\" to the licence before you can get the files, which is also your reminder to read it.",
    body: [
      "**Protect your API key.** The Developer Platform gives you a secret key that spends your credits. Keep it in your code's environment settings, never in a shared document or public code.",
      "**Decide about training before you upload.** Stability's privacy policy says it may use your inputs and outputs to train its models, and that you can opt out in Account Settings. Do that first if you'll upload your own images or audio.",
      "**Confirm it works cheaply.** Generate one image with Stable Image Core (3 credits) from the free allowance before trying the more expensive services.",
    ],
    vendorDocsUrl: "https://platform.stability.ai/docs/getting-started",
  },

  security: [
    {
      kind: "text",
      text: "If you use Stability's own services, what you upload and generate is processed on its servers, and by default may be used to train its models until you opt out. Running the open models locally avoids that entirely — nothing is sent anywhere.",
    },
    {
      kind: "list",
      label: "Rules worth knowing:",
      items: [
        "Stability's Acceptable Use Policy bans sexually explicit content, content that harms others, attempts to get around its safeguards, and passing AI output off as human-made.",
        "Its terms set a minimum age of 18 for most services; the audio services allow 13 and up with a parent's permission.",
        "Stability's API FAQ says outputs can be used commercially as long as they don't infringe anyone's copyright, and its licence says you own your outputs as far as the law allows.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Open image and audio models you can run privately on your own computer, with no per-use fees.",
      "Cheap, high-volume image generation from code through the API.",
      "Making music and sound effects in the browser with Stable Audio.",
    ],
    okayAt: [
      "Being a beginner's first stop for images. Without its old consumer image app, the easy routes are the API or a local tool like ComfyUI, both a step up from a chat app.",
      "Video. Stability's API no longer offers video; its video models are now download-only.",
    ],
    avoid: [
      "Using the open models for a business over $1 million in revenue without an Enterprise licence.",
      "Uploading private material before opting out of training.",
    ],
  },

  starterActions: [
    {
      title: "Make a track in the browser",
      whatItDoes:
        "Open stableaudio.com, sign up for the free plan, and describe a short piece of music — a genre, a mood and a few instruments. Then refine it by describing what to change.",
      whyHere:
        "It's the only no-install, no-code way into Stability's models, and audio is where its newest model family is.",
    },
    {
      title: "Price-test two image services",
      whatItDoes:
        "In the Developer Platform, spend your free credits generating the same prompt with Stable Image Core (3 credits) and Stable Image Ultra (8 credits), and compare.",
      whyHere:
        "Costs vary a lot between Stability's services. Seeing the quality gap yourself tells you which one your project can afford to use at scale.",
    },
    {
      title: "Try an edit, not a new image",
      whatItDoes:
        "Use the API's Remove Background or Search and Replace tool on a photo you own.",
      whyHere:
        "These edit tools change one thing about an existing image without you drawing a mask — often more useful day to day than generating from scratch.",
    },
    {
      title: "Run a model locally",
      whatItDoes:
        "If you have a capable graphics card, accept the licence for one of the Stable Diffusion models on Stability's Hugging Face page, download it, and load it in ComfyUI using the example workflow on the model card.",
      whyHere:
        "This is what makes Stability different: once it's running, every image is free and private. Start with a smaller model if your graphics memory is limited.",
    },
  ],

  pitfalls: [
    "**Two separate credit systems.** API credits and Stable Audio credits aren't interchangeable.",
    "**Expensive extras.** Stability's pricing lists its Creative Upscaler at 60 credits per image — far more than generating the image.",
    "**Forgetting the licence conditions.** Commercial use of the open models needs registration and the \"Powered by Stability AI\" notice, even under the revenue threshold.",
    "**Out-of-date guides.** Many older tutorials point to Stable Assistant or Stability's retired video API; check against Stability's own docs.",
  ],

  whereToNext: [
    { label: "More local & open-source AI", categorySlug: "local-open-source-ai" },
    { label: "Image generation & editing", categorySlug: "image-generation-editing" },
    { label: "Music generation", categorySlug: "music-generation" },
  ],
};
