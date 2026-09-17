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
    "Beatoven.ai is an AI music generator built specifically for **background** music — instrumental scoring that sits underneath a video, a podcast, a game or an advert, rather than songs with singing. You tell it what the moment needs and it writes something to fit.",
    "What sets it apart in this category is where its training music came from. Beatoven licenses music directly from musicians and holds a **Fairly Trained** certification — an outside badge given to AI companies that train only on material they have permission to use — and says contributing musicians are paid when their work feeds a generated track. If the ethics of AI music are the thing stopping you, this is the corner of the category built to answer that objection.",
    "There are two generators inside it, not one. The newer one, which Beatoven calls **maestro**, is the kind you write to: you give it a **prompt** (the message you type) describing the music and it composes to that. We could not confirm what the box is labelled on screen, because the product is unreachable, so treat it simply as the place you write what you want. An older one, listed as Composer in the plan table, works the other way round — you pick settings such as sections, moods, tempo and genre. Beatoven's terms of use still describe that settings-driven flow as how the service works, which is a fair measure of how recently the text box arrived.",
  ],

  beforeYouStart: [
    "**Before anything else, check whether the tool is reachable, because as of September 2026 it is not.** Every route into the product — the sign-up button, \"Try now\", the subscribe buttons, the developer dashboard — points at an address called `sync.beatoven.ai`, and that name no longer exists on the internet's address book. That is different from a server being slow or busy; there is nothing to connect to. The pricing page and the blog return \"Page Not Found\", and the homepage no longer shows a sign-up button at all. Beatoven has announced nothing about it, so it is worth opening `beatoven.ai` and looking for a way to sign up before assuming either that the product is gone or that it is coming back. If there still isn't one, the other music generators on this site are working today and one of those is where to start instead.",
    "When it was last purchasable, generating music was not what you paid for — taking it away was. Beatoven meters downloads in **minutes of finished audio**, not in tracks and not in credits. The two subscriptions on the last published plan table gave 30 and 60 minutes of downloads a month for around $10 and $20 a month, with unlimited generating on both, and occasional users could buy minutes outright at around $3 a minute. That table is offline now and cannot be re-checked, so treat these figures as roughly right rather than current.",
    "The free Trial plan looked like a preview rather than a usable free tier: it listed a small monthly allowance of generations — the table contradicted itself on the number, so call it a handful a month — and no download minutes against it, and Beatoven's own help pages describe downloading a licensed track as something paid users do. Because the table is offline this could not be confirmed a second time, but the honest expectation is that you could hear what you made and not keep it. Nothing on Beatoven's public pages mentions marking free downloads either way; on the evidence available the limit is the download meter rather than a mark on the audio, though you may need to check that once you are signed in.",
    "Everything it makes is instrumental. maestro launched without vocals, Beatoven said at the time that singing was still to come, and nothing on the site claims it has arrived — so assume instrumental until the product says otherwise. If you want a song with a singer, this is the wrong tool in the category.",
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
        "That is survivable for a rough cut you are scoring for yourself. It is not survivable for a client's unreleased footage, and no setting changes it.",
      ],
    },
    {
      kind: "text",
      text: "None of this is unusual for a small creative-tools company, and there is nothing sensitive in a sentence describing a mood. The care belongs at the upload box, not the text box.",
    },
  ],

  triad: {
    bestAt: [
      "Scoring to a written brief — a named scene, one emotion, a pace and an exact running time, which is the shape Beatoven's own published example prompts take",
      "Short functional pieces: a 15-second podcast intro, a 45-second cue under a scene, a loop behind a game level",
      "Trying an idea many ways, because generating does not touch the download meter — only the track you keep costs anything",
    ],
    okayAt: [
      "Working from a reference instead of a description: Beatoven says you can hand it an audio file or a video, but its marketing pages describe this rather than showing it, so treat the fidelity as unproven until you try it",
      "Fixing a near miss — Beatoven describes an editor where you swap instruments or change tempo, genre and mood by typing, though that is a claim on its own pages rather than something we could see, and the screen sits behind the sign-in",
      "Anything long: the published examples top out around three minutes, and selling the product by minutes of download is itself a nudge toward short cues",
    ],
    avoid: [
      "Releasing the track as a piece of music in its own right. The terms exclude selling copies of it or putting it on Spotify, Apple Music or any other streaming service, and the plan page carried the same bans in plainer words — adding that a Beatoven track may not be registered as your own work anywhere that records music ownership.",
      `Assuming the licence outlives your subscription. Beatoven's FAQ calls it a "non-exclusive perpetual licence" and a product page calls it "lifetime", but the binding terms grant the right "during the term of this Agreement" and reserve every right not expressly given. Those are not the same promise, what happens after you cancel is genuinely unsettled on the face of the documents, and in a dispute it is the terms that get read.`,
      "Feeding what it makes into another AI. The terms bar using the music inside any other artificial intelligence service, or to train any AI tool or system — worth knowing if there is an AI editor anywhere in your pipeline.",
    ],
  },

  starterActions: [
    {
      title: "Score a moment, not a mood",
      prompt:
        "I need music for a sunset drive along a coastal road in a short film where the underlying emotion is nostalgia. Music should be slow, flowing tempo. The piece should run 45 seconds. Keep it minimal and piano-driven.",
      whyHere:
        "This is Beatoven's own published example, and its shape is the lesson: situation, one named emotion, a tempo, an exact running time, then a single constraint on the arrangement. Suno's guidance points you at genre and vocal style because it is building a song; this one describes a moment in someone else's footage, which is the job a background-music tool is actually being given.",
      tweak: `Change only the last sentence and run it again. Hearing how much "minimal and piano-driven" alone controls is the fastest way to learn what the box responds to.`,
    },
    {
      title: "Ask for a podcast intro by the second",
      prompt:
        "I need intro music for a tech and futurism podcast that feels thrilling. The pace of the music needs to be energetic, and the piece should run 15 seconds. My preferred genre for the music is hip-hop.",
      whyHere:
        "Beatoven publishes this as a template for podcasters and it is worth copying literally — subject of the show, one feeling, a pace, a duration in seconds, a genre, in that order. Fifteen seconds is also the length where a stock library serves you worst, because nothing in it was cut to your runtime.",
      tweak:
        `Ask for the outro of the same show next, keeping every word but "intro" and the duration, so the two pieces share a family resemblance.`,
    },
    {
      title: "Shortlist before you spend a minute",
      whatItDoes:
        "Run the same brief three or four times with exactly one word changed each time — the emotion, then the pace, then the instrument — and pick by listening before you download anything at all.",
      whyHere:
        "On Suno and Udio the meter sits on generating, so hesitation is what costs you. Beatoven puts the meter on the way out instead, which inverts the habit completely: here, being indecisive is free and being hasty is the expensive move.",
      tweak: "One variable per attempt, not three, or you will not know which word did the work.",
    },
    {
      title: "Get a sound effect from the same kind of box",
      prompt: "A heavy wooden door creaking open slowly in an empty stone hallway, with a faint echo.",
      whyHere:
        "Beatoven ships a second generator just for sound effects, maestro Sound Effects, and describes it as taking a written description the same way the music one does. Most AI music tools stop at music and send you to a stock library for a door creak, so this is a whole errand that does not leave the tool.",
      tweak: "Name the room as well as the object. Half of what a sound effect is, is the space it happens in.",
    },
    {
      title: "Keep the licence email with the project",
      whatItDoes:
        "Every completed download sends you a licence by email for that specific track, carrying a track ID. Save it into the project folder rather than leaving it in your inbox, and put the ID in the audio file's name so the two never separate.",
      whyHere:
        "Beatoven's documented procedure for a YouTube copyright claim is to report it to YouTube quoting the track ID from that licence, then file a form on beatoven.ai so the company clears it. That is a per-track escalation path with a reference number, and it only works if you still have the email.",
      tweak:
        "If you are scoring a series, keep one folder of licence emails per series rather than per episode; it is the version of this you will actually maintain.",
    },
  ],

  pitfalls: [
    "**You get a licence, not the copyright.** Beatoven's terms say that as between you and Beatoven, Beatoven is the copyright owner of the music you generate, and you control only the rights the licence gives you. Its own FAQ says the same thing in plain words. That is a different arrangement from most AI image tools, and it matters the first time someone asks you to confirm that you own a soundtrack.",
    `**There is a credit requirement almost nobody notices.** The terms ask you to display "Music by Beatoven.ai" in connection with any use of your project, "wherever practicable". No plan was ever described as removing it. The wording is soft, but it sits in the binding document rather than on the pricing page, which is where people look.`,
    `**The price has moved a lot, and every figure about this tool goes stale fast.** In early 2025 the entry subscription was listed at $30 a month for 15 download minutes; by mid-2026 the same tier was $10 for 30 minutes. Treat any number you read about Beatoven — including the ones above — as a description of a moment rather than a current price.`,
    `**Anything the site calls "upcoming" should be read as absent.** Beatoven's use-case pages still sell paid access to an "upcoming 'Audio to Audio'" feature, and still use an old "pro" plan name that the later pricing table replaced with Creator and Visionary. The pages on this site are not all maintained at the same time, and the marketing ones are the least current.`,
    `**Two people can be handed near-identical music.** The terms say outright that your rights are non-exclusive, that Beatoven keeps using the catalogue its generator was trained on, and that it may licence music to other users that is the same as or similar to yours. The paid plan table advertised an "Exclusive music license" in the same breath, which cannot be true as written alongside the terms; where they disagree the terms are the binding document. That is the ordinary bargain of a generated library, but few vendors write it down this directly, and it is worth knowing before a cue becomes a channel's signature sound.`,
  ],

  whereToNext: [
    { label: "Music generators", categorySlug: "music-generation" },
    { label: "Video creation and editing", categorySlug: "video-creation-editing" },
  ],
};
