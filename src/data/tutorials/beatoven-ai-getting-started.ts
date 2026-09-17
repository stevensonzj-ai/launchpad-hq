import type { PlatformTutorialData } from "./types";

export const beatovenAiTutorial: PlatformTutorialData = {
  slug: "beatoven-ai-getting-started",
  platformSlug: "beatoven-ai",
  title: "Getting Started with Beatoven.ai",
  tagline:
    "Describe the background music a scene needs and it composes one to order — though right now there is no working way in.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-17",
  accessTier: "PREMIUM",

  howItWorks:
    "You describe the music you want in a sentence — what the scene is, the mood, how fast, how long — and press generate. A finished instrumental track plays back a few moments later. You listen, change the wording or adjust parts of it, generate again, and when one fits you download the audio file.",

  whatItIs: [
    "Beatoven.ai is an AI music generator built specifically for **background** music — instrumental scoring that sits underneath a video, a podcast, a game or an advert, rather than songs with singing.",
    "What sets it apart is where its training music came from: Beatoven licenses directly from musicians and holds a **Fairly Trained** certification — an outside badge given to AI companies that train only on material they have permission to use — and says contributing musicians are paid when their work feeds a generated track. If the ethics of AI music are what is stopping you, this is the corner of the category built to answer that.",
    "There are two generators inside it, not one. The newer one, which Beatoven calls **maestro**, is the kind you write to: you give it a **prompt** (the message you type) describing the music and it composes to that — we could not confirm what that box is labelled on screen, because the product is unreachable. An older one, listed as Composer in the plan table, works the other way round: you pick settings such as sections, moods, tempo and genre. Beatoven's terms of use still describe that settings-driven flow as how the service works, which measures how recently the text box arrived.",
  ],

  beforeYouStart: [
    "**As of September 2026 there is no working way in.** Every route into the product — the sign-up button, \"Try now\", the subscribe buttons, the developer dashboard — points at an address called `sync.beatoven.ai`, and that name no longer exists on the internet's address book: not a slow server, nothing to connect to. The pricing page and the blog return \"Page Not Found\", and the homepage no longer shows a sign-up button. Beatoven has announced nothing about it, so open `beatoven.ai` and look for a way to sign up before assuming either that the product is gone or that it is coming back. If there still isn't one, the other music generators on this site are working today and one of those is where to start instead.",
    "When it was last purchasable, generating was not what you paid for — downloading was. Beatoven meters downloads in **minutes of finished audio**, not tracks and not credits. The last published plan table gave 30 and 60 minutes of downloads a month for around $10 and $20, with unlimited generating on both, and occasional users could buy minutes outright at around $3 a minute. That table is offline and cannot be re-checked, so treat these figures as roughly right rather than current.",
    "The free Trial plan looked like a preview rather than a usable free tier: a small monthly allowance of generations — the table contradicted itself on the number, so call it a handful a month — and no download minutes against it. Beatoven's own help pages describe downloading a licensed track as something paid users do. The table is offline, so this could not be confirmed a second time, but the honest expectation is that you could hear what you made and not keep it. Nothing on Beatoven's public pages mentions marking free downloads either way; on the evidence available the limit is the download meter rather than a mark on the audio, though you may need to check that once you are signed in.",
    "maestro launched without vocals, Beatoven said at the time that singing was still to come, and nothing on the site claims it has arrived — so assume instrumental until the product says otherwise. If you want a song with a singer, this is the wrong tool in the category.",
  ],

  security: [
    {
      kind: "text",
      text: "Beatoven's privacy policy is dated **26 August 2022**: three years before the text generator the site now leads with, and before the product accepted uploads at all. It covers ordinary things — account details, payments through Stripe, sign-in through Auth0, Google Analytics and Microsoft Clarity for usage tracking — and says your data is stored and processed in India and the United States. The document that actually governs what you upload is not this one; it is the terms of use.",
    },
    {
      kind: "list",
      label: "What the terms say about anything you upload",
      items: [
        "Submitting a file grants Beatoven a worldwide, royalty-free, sub-licensable licence, in perpetuity, to use, reproduce, adapt and exploit it — including for promoting the service.",
        "The same clause says Beatoven may keep what you submitted in its database after you close your account and stop using the service.",
        "Survivable for a rough cut you are scoring yourself; not for a client's unreleased footage, and no setting changes it.",
      ],
    },
    {
      kind: "text",
      text: "There is nothing sensitive in a sentence describing a mood; the care belongs at the upload box, not the text box.",
    },
  ],

  triad: {
    bestAt: [
      "Scoring to a written brief — a named scene, one emotion, a pace and an exact running time",
      "Short functional pieces: a 15-second podcast intro, a 45-second cue under a scene, a loop behind a game level",
    ],
    okayAt: [
      "Working from a reference instead of a description: Beatoven says you can hand it an audio file or a video, but its marketing pages describe this rather than showing it, so treat the fidelity as unproven until you try it",
      "Fixing a near miss — Beatoven describes an editor where you swap instruments or change tempo, genre and mood by typing, though that is a claim on its own pages rather than something we could see",
      "Anything long: the published examples top out around three minutes",
    ],
    avoid: [
      "Releasing the track as a piece of music in its own right. The terms exclude selling copies of it or putting it on Spotify, Apple Music or any other streaming service, and the plan page carried the same bans in plainer words — adding that a Beatoven track may not be registered as your own work anywhere that records music ownership.",
      `Assuming the licence outlives your subscription. Beatoven's FAQ calls it a "non-exclusive perpetual licence" and a product page calls it "lifetime", but the binding terms grant the right "during the term of this Agreement" and reserve every right not expressly given. Those are not the same promise; what happens after you cancel is genuinely unsettled, and in a dispute it is the terms that get read.`,
      "Feeding what it makes into another AI. The terms bar using the music inside any other artificial intelligence service, or to train any AI tool or system — worth knowing if there is an AI editor anywhere in your pipeline.",
    ],
  },

  starterActions: [
    {
      title: "Score a moment, not a mood",
      prompt:
        "I need music for a sunset drive along a coastal road in a short film where the underlying emotion is nostalgia. Music should be slow, flowing tempo. The piece should run 45 seconds. Keep it minimal and piano-driven.",
      whyHere:
        "This is Beatoven's own published example, and its shape is the lesson: situation, one named emotion, a tempo, an exact running time, then a single constraint on the arrangement. Suno's guidance points you at genre and vocal style because it is building a song; this one describes a moment in someone else's footage.",
      tweak: `Change only the last sentence and run it again, to hear how much "minimal and piano-driven" alone is controlling.`,
    },
    {
      title: "Ask for a podcast intro by the second",
      prompt:
        "I need intro music for a tech and futurism podcast that feels thrilling. The pace of the music needs to be energetic, and the piece should run 15 seconds. My preferred genre for the music is hip-hop.",
      whyHere:
        "Beatoven publishes this as a template for podcasters and it is worth copying literally, down to the order of the clauses. Fifteen seconds is also the length where a stock library serves you worst, because nothing in it was cut to your runtime.",
      tweak:
        `Ask for the outro of the same show next, keeping every word but "intro" and the duration, so the two pieces share a family resemblance.`,
    },
    {
      title: "Shortlist before you spend a minute",
      whatItDoes:
        "Run the same brief three or four times with exactly one word changed each time — the emotion, then the pace, then the instrument — and pick by listening before you download anything at all.",
      whyHere:
        "On Suno and Udio the meter sits on generating, so hesitation is what costs you. Beatoven puts the meter on the way out instead: here, being indecisive is free and being hasty is the expensive move.",
    },
    {
      title: "Get a sound effect from the same kind of box",
      prompt: "A heavy wooden door creaking open slowly in an empty stone hallway, with a faint echo.",
      whyHere:
        "Beatoven ships a second generator just for sound effects, maestro Sound Effects, and describes it as taking a written description the same way the music one does. Most AI music tools stop at music and send you to a stock library for a door creak.",
      tweak: "Name the room as well as the object — half of what a sound effect is, is the space it happens in.",
    },
    {
      title: "Keep the licence email with the project",
      whatItDoes:
        "Every completed download sends you a licence by email for that specific track, carrying a track ID. Save it into the project folder rather than leaving it in your inbox, and put the ID in the audio file's name so the two never separate.",
      whyHere:
        "Beatoven's documented procedure for a YouTube copyright claim is to report it to YouTube quoting the track ID from that licence, then file a form on beatoven.ai so the company clears it. That is a per-track escalation path with a reference number, and it only works if you still have the email.",
      tweak:
        "If you are scoring a series, keep one folder of licence emails per series rather than per episode.",
    },
  ],

  pitfalls: [
    "**You get a licence, not the copyright.** Beatoven's terms say that as between you and Beatoven, Beatoven is the copyright owner of the music you generate, and you control only the rights the licence gives you. Its own FAQ says the same thing in plain words. That is a different arrangement from most AI image tools.",
    `**There is a credit requirement almost nobody notices.** The terms ask you to display "Music by Beatoven.ai" in connection with any use of your project, "wherever practicable". No plan was ever described as removing it. The wording is soft, but it sits in the binding document rather than on the pricing page, which is where people look.`,
    `**The price has moved a lot, and every figure about this tool goes stale fast.** In early 2025 the entry subscription was listed at $30 a month for 15 download minutes; by mid-2026 the same tier was $10 for 30 minutes.`,
    `**Anything the site calls "upcoming" should be read as absent.** Beatoven's use-case pages still sell paid access to an "upcoming 'Audio to Audio'" feature, and still use an old "pro" plan name that the later pricing table replaced with Creator and Visionary. The marketing pages are the least current on the site.`,
    `**Two people can be handed near-identical music.** The terms say outright that your rights are non-exclusive, that Beatoven keeps using the catalogue its generator was trained on, and that it may licence music to other users that is the same as or similar to yours. The paid plan table advertised an "Exclusive music license" in the same breath, which cannot be true as written alongside the terms; where they disagree the terms are the binding document. That is the ordinary bargain of a generated library, but few vendors write it down this directly.`,
  ],

  whereToNext: [
    { label: "Music generators", categorySlug: "music-generation" },
    { label: "Video creation and editing", categorySlug: "video-creation-editing" },
  ],
};
