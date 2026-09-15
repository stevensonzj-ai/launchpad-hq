import type { PlatformTutorialData } from "./types";

export const mubertTutorial: PlatformTutorialData = {
  slug: "mubert-getting-started",
  platformSlug: "mubert",
  title: "Getting Started with Mubert",
  tagline:
    "Royalty-free background music in a couple of minutes — and the licence rules that decide what you may do with it.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-15",
  changelogUrl: "https://mubert.com/render/whatsnew",
  accessTier: "FREE",

  howItWorks:
    "You open Render, type a short description of the music you want into the box (this is your **prompt** — the message you type), or pick a genre and mood from the lists instead, and press Generate. A finished instrumental track plays back a few moments later. Regenerate it or download it.",

  whatItIs: [
    "Mubert is an AI music generator aimed at background music — the bed that sits under a video, a podcast, a stream or a game, rather than songs you would listen to on their own.",
    "It is built differently from the song-writing generators it gets compared with. Mubert assembles a track from a library it says holds more than 2.5 million short pieces of recorded music, contributed by artists it pays through its Mubert Studio programme, rather than composing a whole song from scratch. The output is instrumental: there are no lyrics, and where a vocal layer exists it is textures and short vocal samples rather than singing.",
    "Mubert's site sells four things, and only one of them is this page's subject: Render, the track generator; Studio, for musicians contributing material; a developer service for putting music inside other products; and Mubert Play, a listening app. The homepage's main button, \"Generate a track now\", takes you to Render.",
    "Nothing here is sold to you. Mubert keeps the copyright in every track it generates and grants you a licence to use it inside something else — royalty-free in the sense that you never pay again per play, not in the sense that it becomes yours. *Which* uses you are allowed is the entire substance of its plans, and the main thing to understand before you start.",
  ],

  beforeYouStart: [
    "A free account — email, Google or Facebook — puts you on the Ambassador plan: 25 generations a month, but only **5 downloads a month**, MP3 only, and a track length you cannot change, because the Duration field is locked behind an \"Upgrade to edit\" note. Downloads, not generations, are what you run out of first. Mubert's pricing page calls this plan Ambassador and its licence page calls it Free; they appear to be the same plan. Its public pages also don't make clear whether you can generate a track before signing in — you certainly need a free account to download one. Mubert's terms require account holders to be 18, or to have a parent's permission.",
    "**The free plan is not licensed for anything you earn from, and it may not be silent either.** Mubert's plan-comparison table lists an audible watermark on Ambassador downloads and its Terms of Use describe free tracks as watermark-protected, although its FAQ says the watermark is removed once you download — so treat a free download as marked until you can hear otherwise. Crediting is not optional: the FAQ calls it obligatory.",
    "Where the money line falls depends on what the music is *for*, not how much you make. Creator (currently around $14 a month) adds higher-quality WAV files, tracks up to 25 minutes and promoted or boosted posts. Pro (around $39) is the first plan cleared for a monetised channel, digital ads and commercial content. Business (around $199) covers client and agency work, apps, games and sub-licensing. Annual billing currently takes about 25% off. Nothing on the public pricing page suggests the free plan asks for a card, though Mubert doesn't say so outright.",
    "Paid plans renew automatically until you cancel them in My Profile, and Mubert's terms say payments are non-refundable because the music is delivered immediately. Card only — Visa, MasterCard or American Express; PayPal isn't supported.",
  ],

  security: [
    {
      kind: "text",
      text: "Mubert asks for very little. An account is an email address or a Google or Facebook login; if you pay, Mubert's privacy policy says card details sit with third-party processors such as Stripe rather than with Mubert, and that it shares your data with nobody else except on a court or government request.",
    },
    {
      kind: "text",
      text: "The gap worth knowing about is what that policy doesn't cover. Mubert Render's privacy policy is marked \"Last revised 31.08.2021\" — years before the text-prompt and image-to-music features the site now leads with — and it accounts only for account details, payment data, contact forms, cookies and analytics. It says nothing either way about what becomes of the descriptions you type or the images you upload, so it is safest to assume they may be kept.",
    },
    {
      kind: "list",
      label: "Two habits that follow from that",
      items: [
        "Don't upload an image you don't own, or one showing someone identifiable — nothing published tells you where it goes",
        "Delete the account from My Profile if you stop using it; the policy says profile data is stored \"as long as it is necessary\", which is not a period",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Instrumental beds that sit under a voice — narrated video, podcasts, streams, presentations",
      "Long, continuous audio rather than a three-minute song: paid plans generate up to 25 minutes in one piece",
      "Starting from a library instead of a blank box — roughly 12,000 staff-picked tracks are browsable by genre, mood, tempo (labelled BPM), theme and instrument",
    ],
    okayAt: [
      "Matching a reference track: you can paste a link and Mubert analyses its style rather than copying the composition, but the field is marked beta on the page",
      "Precise control: every plan can regenerate or remove individual instrument layers — Mubert calls them stems — with Quick Remix, but reshaping a track's structure, tempo or key needs the full Track Editor on Pro or Business",
    ],
    avoid: [
      "Releasing what you make as music. Every plan, paid ones included, forbids putting Mubert tracks on Spotify, Apple Music, YouTube Music or a stock library, and forbids registering them in Content ID (the system that spots a track inside a video and claims it for whoever owns the music).",
      "Anything you need to carry on making after you stop paying. Mubert's FAQ is explicit: when a subscription ends you may leave already-published projects up and keep monetising them, but you may not use those tracks in new projects.",
      "Background music inside an app, a game or software you are building. Everything below the $199 Business plan excludes it, and the licence agreement tells software developers outright that they cannot use tracks within a mobile app or computer software.",
    ],
  },

  starterActions: [
    {
      title: "Describe the room, not the song",
      prompt:
        "warm lo-fi hip hop with soft rhodes piano, brushed drums and vinyl crackle, relaxed and unobtrusive, for a study vlog",
      whyHere:
        "Every Mubert track is arranged out of short recordings already sitting in its own licensed library, so naming textures and instruments gives the arranger something it can actually match in there. Naming a band or a chart song matches nothing, because no recording of theirs is in the library to find.",
      tweak:
        "The box is labelled `Type text or upload image` and its placeholder reads `Type anything in English` — write the description in English even if you work in another language.",
    },
    {
      title: "Choose the track type before you press Generate",
      whatItDoes:
        "Next to the prompt box is a track-type selector with four settings, and it changes the shape of what comes back more than the description does. Track is standard length. Jingle makes a complete short piece of up to about 40 seconds, rather than a fade-out of a longer one. Loop makes something built to repeat seamlessly. Mix chains generated tracks one after another like a DJ set, which is how you get hours of stream or study-channel audio out of a 25-minute ceiling.",
      whyHere:
        "Suno and Udio give you one output shape and let you trim it. Mubert asks the question up front because it is assembling material, not writing a song.",
    },
    {
      title: "Aim a track at the job it has to do",
      prompt:
        "calm ambient pads under a corporate explainer video, no drums, no melody that competes with a voiceover, steady and neutral all the way through",
      whyHere:
        "Mubert's own FAQ says you cannot combine two genre categories in the browse filters and tells you to add a text description instead — which makes the prompt box the only place a mixed instruction, or a negative one like \"no drums\", can go at all.",
      tweak:
        "Swap the final clause for \"building to a lift in the last fifteen seconds\" when the video ends on a call to action.",
    },
    {
      title: "Check the audio before you publish, not after",
      whatItDoes:
        "Mubert runs a free copyright checker at `mubert.com/tools/copyright-checker` that needs no account and no plan. Export your finished audio as MP3, WAV or AIFF under 50MB, upload it, and it returns a risk estimate for whether a copyright-matching system will flag it.",
      whyHere:
        "It is the only part of Mubert that will look at audio you did not make there. Epidemic Sound clears its own catalogue inside its own player; this reads a file you already have, which is what you need when a video mixes music from more than one place.",
      tweak:
        "Mubert calls the result a risk estimate and not legal advice, and says a \"low risk\" verdict can simply mean a track has not been indexed yet.",
    },
    {
      title: "Download the licence, not just the track",
      whatItDoes:
        "Every download comes with a licence certificate file. Mubert's FAQ says that if a platform files a false-positive copyright claim against your video, that certificate — the one issued when you downloaded the track — is what you upload to dispute it. Save it beside the audio, named for the project it belongs to.",
      whyHere:
        "Because Mubert keeps the copyright and licenses you the use, the proof that you are allowed to use a track lives in a separate file rather than in the fact that you made it. On Suno's paid plans the ownership itself transfers; here, losing the certificate leaves you with audio and no evidence.",
    },
  ],

  pitfalls: [
    "**Mubert's own documents disagree about the Creator plan, on exactly the question that costs money.** The pricing table and the FAQ both call Creator non-commercial and say monetising needs Pro; the Subscription License Agreement — the binding document — says the Creator Licence lets you \"publish and monetize your Derivative Works on Social Media\". A third page, Mubert's marketing licence page, prints \"Cleared for monetization\" without naming a tier at all, which reads more permissively than the plan table it links to. Neither the Terms of Use nor the Subscription License Agreement carries an effective or last-revised date, so there is no way from the public pages to tell when either was last changed; both were in force on 15 September 2026. Until Mubert reconciles them, the safe reading when money is involved is the stricter one, Pro, unless you get the answer from Mubert in writing.",
    "**A remix costs a generation.** Quick Remix and the Track Editor each produce a new version of the track, and the FAQ confirms each one draws on your monthly generation allowance — so nudging a track you nearly like costs the same as starting again.",
    "**The required credit is not written the same way twice.** The FAQ asks for a link to Mubert Render plus a #mubert hashtag; the Terms of Use ask you to print \"This free music track provided by Mubert Inc by Mubert Render Service. All rights reserved and belong to Mubert Inc.\"; the Subscription License Agreement asks for a link to mubert.com on every page the music appears on. Satisfying all three costs one line of description text, which is cheaper than guessing.",
    "**Regenerating drifts.** Mubert's FAQ warns that because generation carries variation, a regenerated layer \"may sound different from what you expected and can slightly affect the overall feel of the track\" — so a near-miss can get further away rather than closer. The original version is kept, so go back to it rather than remixing a remix.",
  ],

  whereToNext: [
    { label: "Video tools to put the music in", categorySlug: "video-creation-editing" },
    { label: "Other music generators", categorySlug: "music-generation" },
    { label: "Voice and speech tools", categorySlug: "voice-speech" },
  ],
};
