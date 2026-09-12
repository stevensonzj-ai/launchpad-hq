import type { PlatformTutorialData } from "./types";

export const scenarioTutorial: PlatformTutorialData = {
  slug: "scenario-getting-started",
  platformSlug: "scenario",
  title: "Getting Started with Scenario",
  tagline:
    "The AI image generator built for game art — where the goal is forty things that match, not one thing that dazzles.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-12",
  accessTier: "FREE",

  howItWorks:
    "You open a panel on the left, pick which AI **model** (the AI \"brain\" that does the actual thinking) will draw for you, type a description of the picture you want, and press Generate. The pictures appear on the right. You change a word, generate again, and keep going until one is close.",

  whatItIs: [
    "Scenario is an AI image generator built for people making game art — characters, props, icons, background tiles, menu screens — rather than for people making one striking picture to post.",
    "Its distinguishing feature is that you can train it on your own artwork: give it reference images sharing one style and it builds a private model of that style, so afterwards a short **prompt** (the message you type) matches everything else you have made. Scenario's guide puts a workable style set at roughly 10–20 images, and 5–15 for a single character or object.",
    "You pick it over a general image generator when the problem is \"these forty icons need to look like a set,\" not \"I want one great picture.\" It also makes video, 3D meshes and audio from the same workspace, but images are where to start.",
  ],

  beforeYouStart: [
    "Free to try without a card. Sign up at scenario.com and you currently get 50 **credits** a day — the platform's unit of spend, where each thing you make costs some (Scenario's help pages also call them Compute Units). They reset daily rather than piling up, and a single image currently runs about 2–15 credits depending on the model, so a free day is somewhere between a handful and twenty pictures. On paid plans the allowance renews on your billing date and unused credits do not roll over.",
    "The custom-style training Scenario is known for is not on the free tier, and not on the cheapest paid tier either. Its plan comparison table currently puts \"Train custom models\" on the Pro plan — around $45 a month, or around $30 if you pay for the year — while Starter at around $15 a month lists everything except training. A single training run costs roughly 100–500 credits by Scenario's own published figure, so even setting the plan gate aside, a 50-credit free day could not pay for one.",
    "What will actually decide this for you is not which plan to pick but whether you have a consistent body of your own artwork to train on. Without that, Scenario is a capable general image generator that bills you per picture, and there are free ones in the same category on this site.",
  ],

  security: [
    {
      kind: "text",
      text: "Scenario asks you to upload your own artwork, which makes what it then does with that artwork the important question — and Scenario's public pages answer it two different ways. Its marketing pages say your data stays yours and is never used to improve other models. Its privacy policy, last updated 16 July 2026, says of ordinary accounts: \"To operate, secure, and improve the Services and our AI models, we may use your content and aggregated, de-identified usage data.\" In plain words: on a website sign-up, Scenario reserves the right to use what you upload and make to improve its own models. The promise not to do that is written for enterprise customers with a signed contract, and no opt-out is described for anyone else. Where a marketing page and a privacy policy disagree, the policy is the one that binds.",
    },
    {
      kind: "list",
      label: "Three things to settle before you upload anything",
      items: [
        "Your prompts and generated assets are kept while the account is open and deleted within 60 days of closing it, per the same privacy policy.",
        "Whether your free-tier work is visible to anyone else is not stated anywhere public. Scenario's pricing table lists \"Private generations\" as a feature of the paid Starter plan and shows no free column at all, which is suggestive but not an answer. Check the setting once you are signed in rather than assuming either way.",
        "Whether you may sell what the free tier makes is contradictory on Scenario's own pages. The pricing page's FAQ says \"Free plan outputs are for personal and evaluation use only.\" The help centre says all generations from Scenario's ready-made models \"are cleared for commercial use.\" The terms and conditions in force today — v2.1.1, last updated 16 July 2026 — say \"You own your Generated Assets\" and draw no line between plans, while separately letting Scenario impose feature restrictions on free accounts. If money depends on the answer, the paid plans are the ones that state a commercial licence in writing.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Producing many images that belong to the same set rather than one showpiece.",
      "Working from pictures as well as words — you can attach reference images and slide how strongly each one pulls the result.",
      "Carrying an asset past the picture stage: background removal, enlarging and image-to-3D-mesh all sit in the same workspace on the same credit balance.",
    ],
    okayAt: [
      "One-off images. The ready-made models are the same families other tools use, but you are spending per picture on machinery built for consistency.",
      "Video and 3D generation, which the vendor's own cost guide places in a higher credit band than images, so experiments there run down a free day fast.",
    ],
    avoid: [
      "Training a style model on artwork you did not make. Scenario's FAQ puts the responsibility on you to hold \"full rights to the training data you upload,\" the terms bar uploads that infringe someone else's rights, and the indemnity clause leaves any claim with you. Cloning an artist's portfolio is the wrong use of the platform's main feature, and the one it makes easiest.",
      "Realistic pictures of real, identifiable people. The terms prohibit generating recognisable depictions of real individuals without their consent, sexual or not.",
      "Throwing a big untidy folder at the trainer. Scenario's guidance is that a small, well-curated set beats a large varied one, with the variety in subject and camera angle while the style stays fixed — the reverse of what most people upload first.",
    ],
  },

  starterActions: [
    {
      title: "One icon, framed so the next thirty match",
      prompt:
        "A single fantasy health potion bottle, game inventory icon, centred on a plain flat background, soft rim light, clean silhouette, no text, no border.",
      whyHere:
        "Scenario prints the credit cost of the run on the Generate button before you press it, and that number changes the moment you pick a different model above the prompt field — so a small icon shows as a cheap experiment before you commit.",
      tweak:
        "Change only the noun — \"shield\", \"map scroll\", \"iron key\". Repeating the framing words verbatim is what turns separate pictures into a set.",
    },
    {
      title: "The same sentence through three different models",
      prompt:
        "A stout dwarven blacksmith standing at a forge, three-quarter view, waist up, painterly, warm firelight.",
      whyHere:
        "The model selector sits directly above the prompt field and Scenario's library runs to hundreds, so one fixed sentence is how you find which one draws the way your project needs — and the choice is not cosmetic, because a style model you train later sits on top of it and inherits its habits.",
      tweak:
        "Keep the sentence identical between runs. Edit the words and the model at once and you have learned nothing about either.",
    },
    {
      title: "Turn a picture into a game asset",
      whatItDoes:
        "Takes an image you have already generated and converts it into a 3D mesh or a short video, from a menu on the image itself.",
      whyHere:
        "For a game the 2D concept is rarely the deliverable, and most image generators stop at the picture. Scenario keeps picture-to-3D in the same workspace on the same credit balance rather than sending you to a second tool with a second bill.",
      tweak:
        "Converting to 3D works best from the image you would have drawn for the job anyway: one object, plain background, no dramatic lighting hiding its shape.",
    },
    {
      title: "Train the style, then write less",
      whatItDoes:
        "Turns a folder of your own artwork into a private model that draws in that style. Scenario's documented steps: crop the images square, let it caption them, choose which ready-made model to build on top of, press Start Training. It emails you when the run finishes and shows progress under a Recent Tasks icon.",
      whyHere:
        "Scenario's prompting guide says custom models want the opposite of what you just learned: shorter descriptions, shaped like the captions used in training, because the model weights the earliest words most. Carrying a long ornate description over from a ready-made model is the usual reason a freshly trained style looks worse than what you trained it on.",
      tweak:
        "If the results look like an averaged blur rather than your style, the variety is in the wrong place — see the last Avoid item.",
    },
    {
      title: "Ask for the size you are going to ship",
      prompt:
        "A seamless stone dungeon floor texture, top-down view, even lighting, no shadows, no objects, tileable.",
      whyHere:
        "The Dimensions control sits in the same panel as the prompt and costs nothing extra to set, while enlarging an image afterwards is a separately billed action that can cost more credits than the picture did in the first place.",
      tweak:
        "Swap \"stone dungeon floor\" for any surface you need repeated — grass, timber decking, cracked ice — and keep \"seamless\" and \"tileable\"; they do most of the work.",
    },
  ],

  pitfalls: [
    "Credits are spent on the attempt, not the result. A batch of four that all miss costs what four keepers cost, so generate one at a time while you are still hunting for the wording.",
    "Judging Scenario on a free session. The free tier gives you the ready-made models, not the trained-style machinery described above — so \"this is just another image generator\" is a fair verdict on the free tier and an unfair one on the product.",
    "Forgetting which ready-made model your own style was built on. Its habits — how it handles faces, edges, text — persist through everything the trained model makes afterwards. Write down which one you picked.",
    "Treating the model library as the hard part. The four or five framing words you repeat in every description change your output far more than switching between two models trained on similar pictures.",
  ],

  whereToNext: [
    { label: "Image generation and editing", categorySlug: "image-generation-editing" },
    { label: "Gaming and creative AI", categorySlug: "gaming-creative-ai" },
    { label: "Video creation and editing", categorySlug: "video-creation-editing" },
  ],
};
