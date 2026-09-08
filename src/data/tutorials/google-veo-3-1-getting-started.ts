import type { PlatformTutorialData } from "./types";

export const googleVeo31Tutorial: PlatformTutorialData = {
  slug: "google-veo-3-1-getting-started",
  platformSlug: "google-veo-3-1",
  title: "Getting Started with Google Veo",
  tagline:
    "Describe a shot, get a few seconds of video with the sound already in it.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-07",
  changelogUrl: "https://ai.google.dev/gemini-api/docs/changelog",
  accessTier: "FREE",

  howItWorks:
    "You describe a shot — what's in frame, how the camera moves, what you hear — and the **model** (the AI \"brain\" doing the work) returns a few seconds of video with its own sound. Each attempt is a fresh roll, not an edit, so you steer by rewriting and going again.",

  whatItIs: [
    "A text-to-video tool from Google DeepMind, reached through Google's own apps — a Google account is the only login you need.",
    "It makes picture and sound in one pass — Google's docs list native audio as always on, where most rivals in this class hand you silent video you score yourself.",
    "That, a daily allowance Google's own pages describe as free, and no new account or card is why you'd pick it over Runway, Pika or the Sora-class tools. It lives in Google Flow, a studio with projects and a timeline rather than a bare text box.",
  ],

  beforeYouStart: [
    "**Start in Google Flow** (`labs.google/fx/tools/flow`), not the Gemini chat app — video there currently needs a paid Google AI plan.",
    "The free allowance is small and spent per attempt — and Google is inconsistent about whether you get one. Flow's own page and its credits help article say a signed-in Google account currently gets around 50 Flow **credits** a day, the unit of spend; Flow's \"Get started\" article lists a paid Google AI plan as a requirement. Check which one your account lands on before planning around it. On the 50-a-day reading, the cheapest Veo setting costs about 10 and the top-quality one around 100: five short clips a day, or one. Credits don't roll over, and mush costs the same as your hero shot.",
    "You'll pay past the experimenting stage, because ten attempts at one shot is a normal session. Paid Google AI plans currently start around 5 US dollars a month, the mainstream tier around 20, top tiers 100 and up; check the plan page, these move.",
    "**First step:** sign in, pick the cheapest model, and run one description several times. How much a single wording varies is day one's real lesson. You must be 18 or over and in a supported country.",
  ],

  security: [
    {
      kind: "text",
      text: "Flow runs on your Google account and what you type is treated like other Gemini activity: Google says a subset of conversations is read by people (disconnected from your account first) and kept up to three years, and that your activity trains its generative AI models. Turning off Keep Activity stops that and cuts retention to around 72 hours. Assume a person could read what you type.",
    },
    {
      kind: "list",
      label: "Watermarks, and what you may not generate",
      items: [
        "Every video from Google's video models carries SynthID, an invisible **watermark** — a mark identifying output as AI-made. You can't turn it off, and Google's own detector reads it: disclose rather than be caught not disclosing.",
        "A visible watermark is a separate toggle in Flow's profile menu, applied automatically for users in India, South Korea and Vietnam.",
        "Google's Generative AI Prohibited Use Policy bans impersonating a person, living or dead, without explicit disclosure in order to deceive; non-consensual intimate imagery; and using personal data or biometrics without legally required consent. So don't animate a photo of a real colleague or public figure — expect refusals, and occasional false ones on invented characters that merely look real.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Short establishing shots and B-roll where nobody speaks",
      "Atmosphere — weather, light, texture, room tone, ambient sound",
      "Animating a still image you already like",
    ],
    okayAt: [
      "Dialogue and lip-sync — it'll try; results vary shot to shot",
      "Continuing a clip you liked — on some Flow model options, not others",
      "On-screen text, signage, product and logo accuracy",
    ],
    avoid: [
      "Surgical edits to a clip you already have — a generator, not an editor",
      "Client work signed off without a human watching every frame",
    ],
  },

  starterActions: [
    {
      title: "Write like a camera operator, not a customer",
      prompt:
        "Handheld medium shot, shallow depth of field: a woman in a yellow raincoat steps off a bus into heavy rain, rain drumming on her hood, bus doors hissing shut behind her.",
      whyHere:
        "Veo's controls are built around camera movement and framing, so film-set words work as instruction: handheld means the camera is carried rather than fixed, shallow depth of field means only the woman is sharp. The rain and the hiss arrive as sound in the same pass.",
      tweak: "Swap handheld for a locked-off tripod. Same story, colder temperature.",
    },
    {
      title: "Animate a photo you own",
      prompt:
        "Animate this still: the camera drifts slowly to the right, steam rises from the mug, soft morning room tone with faint birdsong outside the window.",
      whyHere:
        "Image-to-video is core to the Veo family, and because audio is native, a silent photograph comes back with a soundscape.",
      tweak: "Ask for a push in instead of a drift right.",
    },
    {
      title: "Bridge a first frame and a last frame",
      prompt:
        "Move from the first frame to the last frame in one continuous handheld take with no cuts, keeping the ambient street sound running throughout.",
      whyHere:
        "First-and-last-frame control is a documented Veo capability — you fix where the shot starts and ends, and it solves only the middle.",
      tweak: "Use two near-identical frames with one moving object.",
    },
  ],

  pitfalls: [
    "**A \"video\" here is a handful of seconds.** Flow's Veo options currently produce roughly four, six or eight seconds, the newer companion model about ten. Anything longer is you assembling clips, and continuity between them is the real work.",
    "**The model names change faster than any tutorial.** Google ships new video versions constantly and is rolling out a successor, Gemini Omni, which replaces Veo in the Gemini app while both stay selectable in Flow. Trust the in-product menu over any guide, including this one.",
    "**Consistency across clips stays hard.** The same character generated twice gives two similar-ish people; reference images improve the odds, not guarantee a match.",
  ],

  whereToNext: [
    { label: "More video tools to compare it against", categorySlug: "video-creation-editing" },
    { label: "Make the still images you feed it", categorySlug: "image-generation-editing" },
  ],
};
