import type { PlatformTutorialData } from "./types";

export const invideoAiTutorial: PlatformTutorialData = {
  slug: "invideo-ai-getting-started",
  platformSlug: "invideo-ai",
  title: "Getting Started with invideo AI",
  tagline: "Describe a video in a sentence, get a finished cut back, then edit it by typing.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-17",
  accessTier: "FREE",

  howItWorks:
    "You open its prompt page and type what you want the video to be — a **prompt** (the message you type) can be one line, a rough concept, or a finished script. Back comes a full cut with visuals, voiceover and music. Below it sits a second box where you type changes in plain English, and it re-cuts.",

  whatItIs: [
    "invideo is a video maker you drive by describing what you want, rather than by dragging clips along a timeline — though there is a timeline underneath if you want it.",
    "It writes the script, picks the footage, generates the voiceover and lays in music, all from your description. The footage and music come from licensed stock libraries — iStock, Storyblocks and Shutterstock — and it can generate shots outright as well.",
    `During 2026 invideo repositioned itself around "Agent Two", which it markets as an agentic video editor for serious creatives, with project memory that carries characters and tone between sessions. The simple on-ramp — describe a video, get a cut — is still there and is still the right way in.`,
  ],

  beforeYouStart: [
    `Signing up takes an email address, a Google account or an Apple account, and invideo sends a six-digit code instead of asking for a password. Its AI video generator page says "Get started, It's free!"; we could not confirm from any public page whether a card is requested during signup, so expect to check that yourself.`,
    "There is a free plan, but you will not find it on the pricing page. That page currently lists only three paid tiers — Starter, Plus and Max, starting around $20 a month billed annually. The free plan is documented only in the help centre, which says it gives you limited **credits** (the platform's unit of spend — each thing you make costs some) that reset weekly, on Monday at 12 a.m. UTC.",
    "The thing to know before you invest an afternoon: invideo's help centre states that on the free plan, downloading without a **watermark** (a mark stamped on the output showing where it was made) requires a paid plan. Free exports are watermarked.",
    "Credits are spent on *creating*, never on downloading, and different models cost wildly different amounts — invideo's own example runs from about half a credit for a quick clip to 10 or more credits for a 4K clip with generated audio. Unused monthly credits are forfeited at each reset; credits you buy separately as an add-on last 12 months.",
    "Premium iStock footage is a second, separate meter from credits, and it behaves backwards from them: it is counted when you download, not when you generate.",
  ],

  security: [
    {
      kind: "text",
      text: `Most video tools leave you guessing about whether your footage trains their AI. invideo does not: its privacy policy (effective 8 June 2026, last updated 8 July 2026) states flatly, "We do not use your User Content, Inputs, Output or Designs to train or fine-tune our proprietary artificial intelligence or machine-learning models." Take that at face value — it is a written commitment, not marketing copy.`,
    },
    {
      kind: "list",
      label: "The catch is the models it rents",
      items: [
        `The same policy sorts third-party AI providers into two tiers. Standard Tier providers are "contractually prohibited from using your content for their own purposes, including model training."`,
        `Experimental Tier providers are defined as those "that have not committed to refraining from training on Customer Personal Data, or do not hold complete independent security certifications."`,
        "The policy directs you to invideo's sub-processor list at trust.invideo.io/subprocessors to see which provider is in which tier. It does not say the product labels that tier at the moment you choose a model, and we could not confirm from public pages whether it does — so if a shot matters, check before you generate it.",
      ],
    },
    {
      kind: "text",
      text: "Delete your account and invideo says content leaves active systems within about 90 days, with backups overwritten on normal rotation. Ordinary marketing footage is fine here. Unreleased client material run through a model you have not checked the tier of is the case worth a second thought.",
    },
  ],

  triad: {
    bestAt: [
      "Turning a written idea, or a script you already have, into a complete first cut with visuals, voiceover, music and subtitles",
      "Faceless social video, where licensed stock carries the visuals and the voiceover carries the story",
      "Reworking a finished cut by typing a sentence at it instead of opening a timeline",
      "Producing the same video in another language — invideo lists 50+ and names 11 as fully tested: Japanese, German, French, Russian, Spanish, Brazilian Portuguese, Italian, Dutch, Korean, Polish and Hindi",
    ],
    okayAt: [
      "Frame-level precision work. The timeline exists, but you are working against what the tool is good at",
      "Subtitles in right-to-left and several Asian scripts — invideo's help centre lists Arabic, Urdu, Hebrew, Chinese (Simplified), Tamil, Marathi, Maori, Farsi, Thai and Hindi as languages where subtitles are not yet supported, which includes one language on its own fully-tested list",
      "Planning a fixed cost per video, because the credit charge moves with the model, the resolution and whether audio is generated",
    ],
    avoid: [
      "Client work where the chain of title on music and footage has to be unimpeachable. invideo's own support article concedes that YouTube sometimes issues incorrect Content ID claims against its royalty-free library, and that the fix is for you to dispute them.",
      `Acting on invideo's support article that says you have "complete rights to all the videos that you make" and can use them "anywhere, anytime and for any purpose you see fit." The terms updated 8 July 2026 are narrower: you own outputs "subject always to these Terms, applicable law and third-party rights," and "Your rights to use Licensed Content are limited to the scope of those third-party licences." Where the two disagree, the terms are the binding document.`,
      "Video whose script has to be factually right on the first pass — the agent writes it from your description and will fill the gaps it does not know with plausible invention.",
    ],
  },

  starterActions: [
    {
      title: "Your first video, in one sentence",
      prompt:
        "Make a 60-second video explaining why sourdough bread takes so long to rise. Friendly, curious tone, aimed at someone who has never baked. Use real footage where you can, and end on a single practical tip.",
      whyHere:
        "The prompt page runs Agent mode by default and takes a one-line concept, a loose treatment or a finished script at the same field — so your first attempt does not need a script, and your tenth can paste one in without switching tools.",
      tweak: "Swap the topic for anything you would otherwise explain in a blog post.",
    },
    {
      title: "Steer the stock before it costs you",
      prompt: "settings: no iStock media",
      whyHere:
        "iStock is a capped second meter and it is charged the moment you download, so a video can look free to make and quietly spend your allowance at export; invideo documents a `settings:` directive inside the prompt that caps or removes it, and anything removed is replaced automatically from its Storyblocks and Shutterstock libraries, which are uncapped.",
      tweak: "`settings: max 3 iStock media` caps it rather than cutting it.",
    },
    {
      title: "Edit the finished cut by typing at it",
      prompt:
        "Change the narrator voice to an Australian accent, make scene #4 funnier, and increase the background music to 80%.",
      whyHere:
        "Magic Box sits under the rendered video rather than in a project panel, and it accepts media, audio, text and tone commands in the same sentence — including scene numbers — so a re-cut is one instruction instead of a round trip through an editor.",
      tweak: `"Remove iStock media" and "Replace all iStock media" work here too, after the fact.`,
    },
    {
      title: "Make the same video in another language",
      prompt: "Make this video in Brazilian Portuguese, keeping the same visuals and pacing.",
      whyHere:
        "Brazilian Portuguese is one of the 11 languages invideo names as fully tested rather than merely supported, and the language request goes in the prompt itself, so translation is a re-run of the same job rather than a separate export-and-dub pipeline.",
      tweak:
        "Check the subtitle list first — several supported languages, Arabic and Hindi among them, do not yet get subtitles.",
    },
    {
      title: "Price the generation before you run it",
      whatItDoes: `Enter your prompt and, before confirming, read the credit figure invideo displays alongside the generate control; open the dropdown and choose "Learn more" for a per-model breakdown, then pick a cheaper model if the job does not need the expensive one.`,
      whyHere:
        "The credit cost is shown before the generation runs, not billed after it, and the gap between models is large enough to matter — invideo's own example spans about half a credit to 10 or more for a single clip. Checking once turns an opaque balance into a decision you can make.",
    },
  ],

  pitfalls: [
    `Parts of the help centre are out of date with the product. Several articles still talk about running out of "video minutes" while the pricing page and the newer articles meter credits. Where they disagree, believe the pricing page and the in-product credit figure.`,
    `Downloading costs no credits at all, which sounds generous until you notice that every "try again" does. The expensive habit is regenerating, not exporting.`,
    "Re-exporting the same video with the same stock costs nothing extra — but using the same clip again in a *different* video counts against your allowance a second time.",
    "It writes the script unless you give it one. If names, dates or numbers matter, paste your own script into the prompt rather than describing the topic and hoping.",
  ],

  whereToNext: [
    { label: "Voice and speech tools", categorySlug: "voice-speech" },
    { label: "Image generators", categorySlug: "image-generation-editing" },
    { label: "Other video tools", categorySlug: "video-creation-editing" },
  ],
};
