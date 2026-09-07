import type { PlatformTutorialData } from "./types";

export const googleVeo31Tutorial: PlatformTutorialData = {
  slug: "google-veo-3-1-getting-started",
  platformSlug: "google-veo-3-1",
  title: "Getting Started with Google Veo",
  tagline:
    "Google's video model: describe a shot, get a few seconds of video with the sound already in it.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-07",
  changelogUrl: "https://ai.google.dev/gemini-api/docs/changelog",
  accessTier: "FREE",

  howItWorks:
    "You describe a shot — what's in frame, how the camera moves, what you hear — and Veo generates a short clip to match, with its own audio: room tone, effects, dialogue if you asked. You can also hand it a still image to animate, or a first and last frame and let it invent the movement between.\n\nEach attempt is a fresh roll, not an edit. The model doesn't tweak your last clip; it makes a new one from your new wording, so you steer by rewriting and going again. Everything is metered: in Google Flow, the studio most beginners use, every generation spends credits. Longer pieces get built by stitching several clips on a timeline — never by asking for one long video.",

  whatItIs: [
    "A text-to-video model from Google DeepMind, reached through Google's own apps. If you have a Google account, you already have the login.",
    "It generates picture and sound in one pass — Google's docs list native audio as always on. Most rivals in this class hand you silent video you score yourself afterwards.",
    "It lives inside Google Flow, a studio with projects and a timeline rather than a bare prompt box, so you can try, compare and assemble in one place.",
    "Why this over Runway, Pika or the Sora-class tools: audio comes free, there's a real free daily allowance to learn on, and no new account or card before your first clip.",
  ],

  beforeYouStart: [
    "**Start in Google Flow, not the Gemini chat app.** Flow (`labs.google/fx/tools/flow`) has the model picker, timeline and video controls. Video in the Gemini app currently needs a paid Google AI plan — starting there means a paywall before you've made anything.",
    "**The free allowance is real but small.** A signed-in Google account currently gets around 50 Flow credits a day. The cheapest Veo setting currently costs about 10 credits per generation — roughly five short clips daily, free. Credits reset daily and don't roll over.",
    "**Credits go per generation, not per keeper.** A prompt that produces mush costs the same as your hero shot. The top-quality Veo setting currently runs around 100 credits: one clip a day, free.",
    "**Will you realistically need to pay? Yes, past experimenting.** Free credits teach you the tool but won't survive real iteration, where ten attempts at one shot is normal. Paid Google AI plans currently start around 5 US dollars a month, with the mainstream tier around 20 and top tiers at 100 and up. Check the current plan page — these move.",
    "**First step:** sign in at `labs.google/fx/tools/flow`, start a project, pick the cheapest video model, and spend your first 50 credits running one prompt several times. Seeing how much a single prompt varies is the most useful thing you'll learn on day one. You must be 18 or older and in a supported country.",
  ],

  security: [
    {
      kind: "text",
      text: "Flow and the Gemini app run on your Google account, and what you type is handled like other Gemini activity. Google's policy states that a subset of conversations is reviewed by human reviewers — disconnected from your account first — and kept up to three years, and that your activity is used to improve its services, including training generative AI models. Turning off Keep Activity stops future chats being used for model improvement and cuts retention to around 72 hours. Assume a person could read your prompt: don't paste a client's unreleased campaign or anything under NDA.",
    },
    {
      kind: "list",
      label: "Watermarking and provenance",
      items: [
        "Every video from Google's video models carries SynthID, its invisible watermark marking the file as AI-generated. You can't turn it off.",
        "A visible watermark is a separate toggle in Flow's profile menu, applied automatically for users in India, South Korea and Vietnam.",
        "Invisible doesn't mean undetectable — SynthID exists so Google's own detector can answer 'was this made by AI?'. Disclose rather than get caught not disclosing.",
      ],
    },
    {
      kind: "list",
      label: "Don't generate real people",
      items: [
        "Google's Generative AI Prohibited Use Policy bans impersonating an individual, living or dead, without explicit disclosure, in order to deceive.",
        "It also bans facilitating non-consensual intimate imagery, and using personal data or biometrics without legally required consent.",
        "In practice: don't upload a photo of a real person — a colleague, a public figure, an ex — and animate it. Expect refusals, and occasional false refusals on invented characters that merely look real.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Short establishing shots and B-roll where nobody speaks",
      "Atmosphere: weather, light, texture, room tone, ambient sound",
      "Animating a still image you already like",
      "Testing a visual idea before you pay to film it",
    ],
    okayAt: [
      "Dialogue and lip-sync — it'll try; results vary shot to shot",
      "Keeping one character looking the same across several clips",
      "On-screen text and signage",
      "Product, logo and brand accuracy",
    ],
    avoid: [
      "Anything longer than a few seconds in a single generation",
      "Surgical edits to an existing clip — this is a generator, not an editor",
      "Real, identifiable people",
      "Client work signed off without a human watching every frame",
    ],
  },

  starterActions: [
    {
      title: "Write like a camera operator, not a customer",
      whatItDoes:
        "Says the same idea in shot, lens and lighting language to show how much control that buys.",
      prompt:
        "Handheld medium shot, 35mm, shallow depth of field: a woman in a yellow raincoat steps off a bus into heavy rain, sodium streetlight, rain drumming on her hood, bus doors hissing shut behind her.",
      whyHere:
        "Veo's controls are built around camera movement, framing and reference styling, so filmmaking vocabulary lands as instruction rather than decoration — and the rain and door hiss are generated as audio in the same pass. Compare it against typing 'a woman getting off a bus in the rain'.",
      tweak: "Swap handheld for a locked-off tripod. Same story, colder temperature.",
    },
    {
      title: "Animate a photo you own",
      whatItDoes:
        "Turns one of your own stills into a few seconds of motion and sound.",
      prompt:
        "Animate this still: the camera drifts slowly to the right, steam rises from the mug, soft morning room tone with faint birdsong outside the window.",
      whyHere:
        "Image-to-video is core to the Veo family, and because audio is native, a silent photograph comes back with a soundscape it never had. Starting from your own image also sidesteps the hardest part of text-to-video: getting the look right at all.",
      tweak:
        "Ask for a push in instead of a drift right, and see which movement makes the still feel more alive.",
    },
    {
      title: "Bridge a first frame and a last frame",
      whatItDoes:
        "Gives the model a starting image and an ending image and asks it to invent the movement between them.",
      prompt:
        "Move from the first frame to the last frame in one continuous handheld take with no cuts, keeping the ambient street sound running throughout.",
      whyHere:
        "First-and-last-frame control is a documented Veo capability and the closest thing here to directing rather than wishing — you fix where the shot starts and ends, and the model solves only the middle.",
      tweak:
        "Use two frames that are near-identical except one moving object. Less to invent, cleaner result.",
    },
    {
      title: "Extend your best clip",
      whatItDoes: "Continues a generation you liked instead of starting over.",
      prompt:
        "Continue this shot for a few more seconds: the camera keeps drifting in the same direction at the same speed, the light and ambient sound unchanged.",
      whyHere:
        "Extension is supported on some Veo and Omni options in Flow and not others, so this also teaches you to read the model picker — and extending a shot you like is far cheaper than regenerating and hoping.",
      tweak:
        "If extension is greyed out, switch models and try again. Which model does what changes over time; noticing that is the skill.",
    },
  ],

  pitfalls: [
    "**Every attempt costs, not every keeper.** Credits go per generation, hero shot or mush alike. Ten attempts at one shot is a normal session, so a generous-sounding daily allowance can vanish in twenty minutes. Set a budget per shot before you start.",
    "**A \"video\" here is a handful of seconds.** Veo's options in Flow currently produce roughly four, six or eight seconds; the newer companion model stretches to about ten. Nothing you generate is a scene. Anything longer is you assembling clips, which makes continuity between generations the real work.",
    "**The model names change faster than any tutorial.** Google ships new video versions constantly and is rolling out a successor, Gemini Omni, that replaces Veo inside the Gemini app while both stay selectable in Flow. Trust the current in-product menu over any guide, including this one.",
    "**Consistency across clips stays hard.** Generate the same character twice and you get two similar-ish people. Reference-image features improve your odds, not guarantee a match. Plan projects that survive visual drift, or keep same-subject shots short enough that nobody studies the face.",
  ],

  whereToNext: [
    { label: "More video tools to compare it against", categorySlug: "video-creation-editing" },
    { label: "Make the still images you feed it", categorySlug: "image-generation-editing" },
  ],
};
