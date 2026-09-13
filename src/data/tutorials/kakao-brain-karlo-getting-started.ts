import type { PlatformTutorialData } from "./types";

export const kakaoBrainKarloTutorial: PlatformTutorialData = {
  slug: "kakao-brain-karlo-getting-started",
  platformSlug: "kakao-brain-karlo",
  title: "Getting Started with Karlo",
  tagline: "Kakao's shut-down Korean image generator, still running free as a one-box demo.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-13",
  accessTier: "FREE",

  howItWorks:
    "You open a single web page with one text box on it, type a short description of a picture, and press Generate. After a wait, six small images appear in a grid below the box. There is nothing to adjust — you read the results, reword your description, and press it again.",

  whatItIs: [
    "Karlo is an image generator built in 2022 by Kakao Brain, the AI lab of the Korean company behind KakaoTalk.",
    "Kakao then shut the product down: the consumer apps closed during 2024 and the paid developer service — the route other software used to plug into Karlo — ended on 30 September 2024.",
    "What survives is the **model** (the AI \"brain\" that does the actual thinking) itself, released as **open weights** — the model file was published, so anyone can run it — together with a free demo page that Kakao Brain's own account still keeps running on Hugging Face, the site where AI teams publish their work.",
    "That demo is why this page exists: it is a working, no-cost place to watch a 2022-era generator answer a **prompt** (the message you type).",
  ],

  beforeYouStart: [
    "**The Kakao-branded product is gone, so start in the right place.** Searching for Karlo leads to `kakaobrain.com` or `karlo.ai`; as of 13 September 2026 neither is a live address — a browser cannot find them — and Kakao's own developer pages for Karlo return \"not found\". The one place Karlo runs today is `huggingface.co/spaces/kakaobrain/karlo`.",
    "Nothing to pay, nothing to install, no sign-up. The demo page is free and works signed out. Hugging Face gives a signed-out visitor a small daily allowance of shared processing time — currently around two minutes a day, roughly five with a free account — which is enough for a handful of pictures before you are asked to wait or sign in. You will not be asked for money at any point, because there is no paid version of Karlo left to sell you.",
    "Write your descriptions in English. Karlo was built in Seoul, but its text side is OpenAI's CLIP ViT-L/14 encoder — named on the model's own information page — and all four examples its authors typed into the demo box are English. The Korean origin shows up in what the model was shown, not in what language it reads.",
    "Set your expectations before the first press, or the first press will do it for you. Each run returns six pictures at 256 by 256 pixels — thumbnail size — from a model trained in 2022 on 115 million image-and-caption pairs. Against anything current that is small and rough, and it is meant to be: this is a look at how image generation worked one generation ago. If what you want is pictures you will actually use, start with a current tool from the image generators category — ChatGPT's image generation is the gentlest way in on this site.",
  ],

  security: [
    {
      kind: "text",
      text: "Karlo's privacy position has a hole in the middle of it: the company whose name is on the demo is no longer in the loop. The demo is published under Kakao Brain's Hugging Face account but runs on Hugging Face's own machines in the US, so what you type goes to Hugging Face, not to Korea — and Kakao's Karlo privacy terms, whatever they said, govern a service that no longer exists.",
    },
    {
      kind: "list",
      label: "What nobody is doing on your behalf here",
      items: [
        "Filtering the output. The demo's own footer, written by its authors, warns that the model \"may output content that reinforces or exacerbates societal biases, as well as realistic faces, pornography and violence\" — and the project's licence page says a safety checker is \"highly recommended\" as a post-processing step. This demo does not have one.",
        "Answering you. The only contact address the project publishes is an `@kakaobrain.com` one, on a domain that no longer resolves. There is no support channel, no status page and no one to report a bad output to.",
        "Keeping records. There is no account, no history and no saved gallery, which cuts both ways: nothing of yours accumulates anywhere, and nothing of yours is recoverable either.",
      ],
    },
    {
      kind: "text",
      text: "On what you may do with the pictures: the demo states that its authors \"claim no rights on the outputs you generate,\" under the CreativeML Open RAIL-M licence the project has carried since 2022 — the same licence Stable Diffusion v1 used. That licence permits commercial use and puts the responsibility on you, while forbidding a specific list of uses including harassment, spreading misinformation and targeting vulnerable groups. Read the list once if you plan to publish anything.",
    },
  ],

  triad: {
    bestAt: [
      "Painterly, illustrative and surreal descriptions — the four examples its own authors shipped in the demo box all sit in that register: a Magritte-style portrait, a black porcelain Pikachu, a children's drawing of a teddy bear on a skateboard.",
      "Showing the spread of an idea rather than one result — you see what a description does and does not pin down.",
      "Giving an absolute beginner a first answer to \"what does text-to-image actually mean.\"",
    ],
    okayAt: [
      "Recognisable single objects and simple scenes, at the size it works in.",
      "Photographic looks — it can produce realistic faces, but they rarely survive being looked at closely.",
      "Image variations: Kakao Brain published a variations model alongside this one, so the capability exists in the weights, though the demo does not offer it.",
    ],
    avoid: [
      "Any control beyond the words themselves — no negative prompt, no seed, no choice of how many images, no size or aspect-ratio setting, no style presets, no reference-image upload. Whatever you have learned about steering a generator has nothing to attach to here.",
      "Depending on it for anything. This is a 2022 research demo kept alive on free shared hardware by an account whose company discontinued the product; nothing obliges anyone to keep it running.",
      "Judging it against a current generator to decide which is better. Its authors labelled it an alpha. The comparison it survives is against 2022.",
    ],
  },

  starterActions: [
    {
      title: "Run their example before you spend anything",
      prompt: "A man with a face of avocado, in the drawing style of Rene Magritte",
      whyHere:
        "This exact string is one of four examples the Karlo authors hard-coded into the demo, and the demo is set to cache its example results — so it comes back immediately without drawing on your daily allowance of shared processing time. DALL·E 3 inside ChatGPT caches nothing; every request there spends one of your generations. Use this to confirm the page is awake before you risk your own ideas on it.",
      tweak: "Try the other three baked-in examples the same way — they cost nothing either.",
    },
    {
      title: "One idea, six answers",
      prompt:
        "a small wooden sailboat inside a glass bottle on a windowsill, morning light, oil painting",
      whyHere:
        "Karlo's demo is fixed at six images per press — the number is written into its code with no control to change it — so a single description buys you the spread rather than one sample. Midjourney returns four and charges a job for every rerun. Here the six are the unit, so what you are reading is the range of ways your sentence can be understood, not a verdict on it.",
      tweak:
        "Change exactly one word — \"morning\" to \"stormy\" — and press again. Six against six is where you learn which words are doing work.",
    },
    {
      title: "Aim at the ceiling on purpose",
      prompt: "a hand-lettered wooden shop sign reading OPEN, close-up, weathered paint",
      whyHere:
        "Karlo's last stage upsamples a 64-pixel image to 256 in seven denoising steps — that shortcut is the specific trick its authors published, and fine detail is where a seven-step upscale shows its seams. Ideogram, built around legible lettering, is designed so you never see this.",
      tweak: "Repeat with a face in close-up. Same lesson, different failure.",
    },
    {
      title: "Name a style, not a subject",
      prompt:
        "a lighthouse, in the drawing style of a 1950s children's picture book, flat colour, thick outlines",
      whyHere:
        "Three of the four examples Kakao Brain shipped with this demo name a style rather than a subject, which is a hint from the authors about where its training set has real coverage. Stable Diffusion 1.5 rewards long comma-stacked keyword lists because it has weighting and negative prompts to stack them against; Karlo has neither, so one clearly named style is the whole lever you get.",
      tweak:
        "Swap the style clause only — \"as a woodblock print\", \"as a faded travel poster\" — and keep the lighthouse fixed.",
    },
    {
      title: "Test the Korean assumption",
      prompt:
        "a traditional Korean hanok courtyard in autumn, persimmon tree, tiled roof, soft afternoon light",
      whyHere:
        "Karlo is the best-known Korean-built image model, and the natural assumption is that you should prompt it in Korean. Naver's HyperCLOVA X tools are the ones actually built to take Korean text; this one you write to in English and judge on subject coverage.",
      tweak:
        "Run the same scene as a European one — \"a stone farmhouse courtyard in autumn\" — and compare which is better served.",
    },
  ],

  pitfalls: [
    "`bdiscover.kakaobrain.com` fails to load like the others, and the demo's own header still links to B^DISCOVER as \"a better version\" of Karlo. That link has been broken for years. Ignore it and stay on the Hugging Face page.",
    "Kakao's Karlo documentation is still findable through search, and the fragments that surface still describe free monthly quotas as if you could sign up. You cannot — that service ended in 2024. Nothing you read on `developers.kakao.com` about Karlo applies any more.",
    "The wait is not a failure. The project's own notes warn that a run can take up to around two minutes while the graphics hardware spins up, and that it is sometimes the **second** run rather than the first that is slow. Pressing Generate again while you wait just puts another job behind the first one.",
    "Nothing is saved — the six images live in the page until you navigate away or press Generate again. Save anything you want to keep before you type the next description.",
    "The \"Duplicate this Space\" button is not a free fast lane. Duplicating puts a copy under your own Hugging Face account, and free hosting of a shared-GPU Space currently requires an account in good standing — verified email, more than 30 days old — capped at two. A brand-new account made to skip a queue will not qualify.",
  ],

  whereToNext: [
    { label: "Image generators", categorySlug: "image-generation-editing" },
    { label: "Local & open-source AI", categorySlug: "local-open-source-ai" },
    { label: "International & regional AI", categorySlug: "international-regional-ai" },
  ],
};
