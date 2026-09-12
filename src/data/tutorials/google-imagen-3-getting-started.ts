import type { PlatformTutorialData } from "./types";

export const googleImagen3Tutorial: PlatformTutorialData = {
  slug: "google-imagen-3-getting-started",
  platformSlug: "google-imagen-3",
  title: "Getting Started with Google Imagen (Now Nano Banana)",
  tagline:
    "Google's image generator has been renamed and moved — here's where it actually lives now, and what you get without paying.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-12",
  changelogUrl: "https://gemini.google/release-notes/",
  accessTier: "FREE",

  howItWorks:
    "You open Google's Gemini app in a browser or on your phone, pick the image tool, and type a description of the picture you want. Pictures come back a few seconds later. Then you talk to it — \"make the sky darker,\" \"lose the hat\" — and it redraws, keeping the parts you liked.",

  whatItIs: [
    "Imagen is a **model** — the AI \"brain\" that does the actual thinking — not an app you sign into. You reach Google's picture-making through one of Google's own products, and the model underneath can be swapped for a newer one without your being asked.",
    "It has been swapped twice. Google's list of retired models records Imagen 3 as shut down on 10 November 2025, and the Imagen 4 models that replaced it as scheduled to shut down on 17 August 2026, with a Gemini image model as the replacement. What you get today is a model Google calls **Nano Banana 2** — its real name, not a nickname; the Gemini app puts a banana on the button.",
    "For a beginner the swap is good news: what replaced Imagen lives inside the free Gemini app and needs only a Google Account. This page covers that surface — gemini.google.com and the Gemini phone app — not Google Cloud's Vertex AI, where the Imagen name still appears in the developer documentation and which assumes cloud billing.",
  ],

  beforeYouStart: [
    "**There is no Imagen website, app or download.** Go to gemini.google.com, or install the Gemini app, and sign in with a free Google Account — that is the entire setup. Searching for \"Imagen\" lands people in Google Cloud's developer console, which opens by asking about projects and billing, or on a lookalike site with nothing to do with Google.",
    "You can make pictures without paying. Google's plan comparison lists \"image generation and editing\" on the free plan, alongside paid plans currently around $5, around $20, and from around $100 a month. Its two plan pages disagree — the Google One version lists image access only on the paid rows — so assume the free allowance is real but modest.",
    "The clearest free-versus-paid line is the download: Google's help page says images download at 1K resolution without a Google AI plan and 2K with one. 1K is fine for a screen or a slide; small once you want to print or crop in hard.",
    "The limits are not counted in pictures. Google describes usage as compute-based across everything you do in the app, refreshing every five hours until a weekly ceiling — so a long chat earlier in the day eats into the images you were saving. Subscribers who hit it drop to a lighter, faster model; Google does not say what a free account gets there, so treat running out as \"come back in a few hours\".",
    "Google's help page puts generating images at 13 and over, or the applicable age in your country, and editing at 18 and over. Availability follows the Gemini app's supported countries and languages, and school accounts may be restricted further.",
  ],

  security: [
    {
      kind: "text",
      text: "The unusual thing here is not what you type in, it's what comes out. Every picture carries a **watermark** — a mark on generated output identifying it as AI-made — and here there are two: an invisible one Google calls SynthID, designed to survive cropping, filters and compression, plus a visible Gemini mark on the free plan. What to weigh before pressing send is where the picture ends up, and whether anyone downstream needs to know a machine drew it.",
    },
    {
      kind: "list",
      label: "Which rules actually govern your pictures",
      items: [
        "The standalone Generative AI Additional Terms stopped applying on 22 May 2024, when Google folded AI into its main Terms of Service. The governing document today is the Google Terms of Service, version effective 30 July 2026 — read that, not the friendlier help pages.",
        "They say your content stays yours: you keep whatever intellectual-property rights you have, while granting Google a broad licence to host, reproduce and use it to operate and improve its services.",
        "Google's Gemini Apps privacy hub, last updated 10 August 2026, asks you to get permission before using someone's face or voice in Gemini — guidance rather than a licence term, but the closest thing Google publishes to a plain rule about other people.",
        "Google may remove images when its systems detect a possible violation of the Terms of Service, including the Prohibited Use Policy — a picture appearing is not the same as one allowed to stay.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Changing one thing in an existing picture by saying what to change.",
      "Words inside the picture: signs, posters, labels. Google's product page leads on spelling and typography — the traditional weak spot of image generators, and the easiest claim to test.",
      "Keeping the same character recognisable across pictures — Google's documentation claims this for the current model.",
      "Starting cold: a free Google Account is the whole setup — no card, no waitlist, nothing to install.",
    ],
    okayAt: [
      "Precise control. You steer by describing the change in words, not by masking or brushing a region — \"a bit further left\" is a negotiation, not a setting.",
      "Matching something outside the chat — an exact brand colour, a real product's shape. It gets close and confidently misses.",
    ],
    avoid: [
      "Anything that has to pass as human-made. Between the marking above and Google's Terms of Service, which forbid misleading others into thinking generative-AI content was created by a human, this is the use the platform is built to defeat.",
      "Putting a recognisable person into a situation they were never in. Google's Generative AI Prohibited Use Policy — the version in force when this page was checked was dated 17 December 2024 — bans impersonating an individual \"living or dead\" without explicit disclosure to deceive, and separately bans non-consensual intimate imagery.",
      "Feeding the output into training your own image model. Google's Terms of Service prohibit using AI-generated content from its services to develop machine learning models or related AI technology.",
    ],
  },

  starterActions: [
    {
      title: "The spelling test",
      prompt:
        "A vertical poster for a neighbourhood plant swap. The words on the poster read exactly: PLANT SWAP — SATURDAY 10AM — BRING ONE, TAKE ONE. Hand-lettered chalk style on dark green, one large monstera leaf in the corner. No other text anywhere.",
      whyHere:
        "Send it once, then switch the app's model setting from Fast to Thinking and send the same words again — the Gemini app offers that choice next to the description, so one **prompt** (the message you type) buys two results. Miscounted letters are the one error you can judge without any taste.",
      tweak:
        "Change only the words in capitals; that isolates the lettering from everything else.",
    },
    {
      title: "The one-thing-at-a-time edit",
      prompt:
        "A photo-realistic cat sitting on a windowsill at sunset, shot on a 50mm lens, warm light, shallow depth of field.",
      whyHere:
        "Editing is another sentence in the same conversation, so the picture has to still be in that thread — and it is the feature Google gates at 18 and over while generating opens at 13.",
      tweak:
        "Stay in the same chat, one change per message: \"Keep everything identical but make it raining outside the window.\" Two changes at once is where the picture drifts.",
    },
    {
      title: "The same character twice",
      prompt:
        "A friendly cartoon fox wearing a red scarf and round glasses, flat vector style, plain cream background, front view, full body.",
      whyHere:
        "Its reference is the picture sitting in your chat history, not a set of images you upload and train a style on — so testing Google's consistency claim costs one more message.",
      tweak:
        "In the same chat: \"Same fox, same scarf and glasses, now at a desk writing a letter.\" Judge the claim on a third scene rather than the second.",
    },
    {
      title: "Same words, two Google boxes",
      whatItDoes:
        "Send a description you already like twice: once in the Gemini app, once in Google Search's AI Mode. Note which gave the better picture, and whether either interrupted you to suggest an upgrade.",
      whyHere:
        "Google's subscription page sells \"more access to Nano Banana in Search\" as something a paid plan buys, while the free plan's own line item is image generation outright — so the same sentence can be free in one Google box and gated in another.",
    },
    {
      title: "Ask it whether it made the picture",
      whatItDoes:
        "Save one of your generated images, open a new chat, upload it and ask whether Google AI created it. Do the same with a photo you took yourself, and compare.",
      whyHere:
        "Google states you can upload an image and ask the app whether Google AI made or altered it, reading back the invisible marking above — the detector is something you already have, not a promise to take on trust.",
    },
  ],

  pitfalls: [
    "Following a guide written for Imagen 3. The buttons, the model picker and the results all moved on when that model was retired, so a step-by-step accurate last year will not match your screen.",
    "Opening a new chat to make a change. Editing works on the picture in the conversation you are in; start fresh and you are describing it from scratch, with no way to say \"the same one, but.\"",
    "Expecting a named real person to come out right. Between the age gate on editing and the policy limits on impersonation, this is where refusals cluster and results go generic.",
  ],

  whereToNext: [
    { label: "Image generators", categorySlug: "image-generation-editing" },
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
    { label: "Video creation and editing", categorySlug: "video-creation-editing" },
  ],
};
