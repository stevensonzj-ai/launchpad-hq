import type { PlatformTutorialData } from "./types";

export const udioTutorial: PlatformTutorialData = {
  slug: "udio-getting-started",
  platformSlug: "udio",
  title: "Getting Started with Udio",
  tagline:
    "Make surprisingly good music from a sentence — just know that, right now, the song stays on Udio.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-07",
  changelogUrl: "https://help.udio.com/en/articles/10748731-changelog-what-s-new-with-udio",
  accessTier: "FREE",

  howItWorks:
    "You type a description of a song — genre, mood, instruments, the feel you're chasing — and Udio generates it as audio you can play in your browser. You can add your own lyrics or let Udio write them. It builds in short pieces first, then you extend them into a full track and patch up sections you don't like. Everything lives in your Udio library and plays from Udio's site. Generating costs \"credits,\" which refill on a schedule.",

  whatItIs: [
    "A text-to-music generator: describe a song in plain English, get a finished-sounding recording with vocals, instruments, and structure. No instrument, no studio, no music theory required.",
    "Built around editing, not just rolling the dice. Once you have something close, you can extend it, regenerate a weak section, or restyle it — rather than starting over and hoping.",
    "**The reason to pick Udio over Suno is the sound and the editing, not the output.** Udio has a reputation for detailed, textured production and gives you finer control over reworking a track. But Suno is already on this site, and there is one decision that should come first: Udio's current terms say you may not download your songs and may only use them personally and non-commercially. If you want a file you can keep, post, or release, Udio is not currently the tool — check Suno's own current terms before assuming it is either.",
    "Best understood today as a place to make and listen to music, and to learn what prompting music actually feels like — not a place to produce assets you'll take somewhere else.",
  ],

  beforeYouStart: [
    "**It's free to start, and the free tier is real.** No credit card. You currently get around 10 credits per day plus a separate monthly pool of around 100, and free accounts are capped at 3 full-length (about 2 minutes 10 seconds) song generations per day.",
    "**How credits work:** Udio generates in pairs. A set of two 32-second clips currently costs 2 credits (1 per song); a set of two 130-second songs costs 4 credits (2 per song). Credits do not roll over month to month. Separately purchased credit packs don't expire.",
    "**Will you realistically need to pay?** For trying it out, writing a birthday song, or seeing whether you enjoy it — no. You'll hit the free ceiling if you want longer songs, more of them per day, or the upload and voice-editing features, which are paid-only. Paid plans currently run around $10/month for the entry tier (roughly $8/month if you prepay a year) and around $30/month for the top tier, with a free trial on the entry plan. Prices and credit amounts change; check the pricing page.",
    "**First step:** go to udio.com, sign up free, and type one sentence describing a song into the prompt box. Play it. That whole loop takes about two minutes and tells you more than any review.",
    "**The rights position, plainly:** under Udio's Terms of Service (last revised November 2025, after Udio settled a major-label copyright lawsuit and partnered with Universal Music Group), Udio and its licensors own the output, downloading is disabled, and you may use what you generate only for personal, non-commercial purposes. Do not build a release, a client project, or a YouTube channel on this.",
  ],

  security: [
    {
      kind: "list",
      label: "Rights and ownership — read this before you make anything you care about",
      items: [
        "Udio's Terms of Service (last revised 12 November 2025) state that Udio and its licensors own all right, title and interest in the output, and that to the extent any ownership would vest in you, you assign it to Udio.",
        "The same terms say you may use output \"solely for your personal and non-commercial purposes\" and that you may not download copies of your output \"for any purpose.\"",
        "Downloading of audio, video, and stems is currently disabled in the product. Udio confirmed this in its own help article about the Universal Music Group partnership.",
        "The terms also ask you not to republish or distribute generated songs on streaming or user-generated-content platforms — YouTube, TikTok, Spotify, Instagram and SoundCloud are named.",
        "Warning: parts of Udio's own help centre still date from before the settlement and say the opposite — that you own your songs and can use them commercially. Those pages are stale. The Terms of Service are the binding document, and they say otherwise.",
      ],
    },
    {
      kind: "text",
      text: "Udio is a social site as much as a tool — there's a public feed, and other people can find, play, and build on tracks. By default, songs you make can be remixed, extended, and restyled by other users. You can change that per song under \"Edit permissions,\" but you have to do it one song at a time, and there's currently no way to change it for your whole library at once. Treat anything you generate as potentially visible unless you've deliberately set it otherwise.",
    },
    {
      kind: "text",
      text: "If you upload your own audio — a guitar part, a vocal take, a field recording — Udio requires that you actually own the rights to it, and uploading is a paid-only feature. Under the terms, uploading grants Udio a broad, worldwide, perpetual and irrevocable licence to use, store and modify what you upload, including to train and improve its models. Your prompts and the resulting output can be used for training too. Don't upload anything you'd be unhappy to see feeding a model, and don't upload other people's recordings.",
    },
  ],

  triad: {
    bestAt: [
      "Turning a plain-English description into a listenable, structured song in under a minute",
      "Exploring genres and production styles you couldn't play or record yourself",
      "Learning how music prompting works — hearing immediately how a wording change alters the result",
      "Sketching a mood or idea to play for someone, inside Udio",
      "Reworking a track you almost like: extending it, regenerating a weak section, restyling it",
    ],
    okayAt: [
      "Songs built around specific lyrics you wrote — it handles them, but phrasing and pronunciation can wander",
      "Precise structural control (exact bar counts, exact key, exact tempo) — you steer, you don't dictate",
      "Long-form pieces, which take repeated extends and burn credits fast",
      "Consistency across takes — you'll get variation you didn't ask for",
    ],
    avoid: [
      "**Any commercial release or paid client work.** Udio's current terms grant ownership to Udio, permit personal non-commercial use only, and disable downloads. Until that changes and you can confirm it from Udio's own terms, don't build anything commercial here.",
      "**Prompting in the name of a living artist** to get their voice or style. Udio's terms prohibit using it to impersonate someone, it's the fastest route to a legal problem, and it's unfair to the artist.",
      "Anything where you need a file — a podcast intro, a game soundtrack, background music for a video — because you currently can't take the audio off the platform",
      "Work you'd be upset to lose. It lives on Udio's servers under Udio's terms, and those terms have changed sharply once already.",
    ],
  },

  starterActions: [
    {
      title: "Make your first song from one sentence",
      whatItDoes:
        "Generates a pair of short tracks from a plain description, so you hear what Udio does before you learn anything else.",
      prompt:
        "dreamy indie folk, female vocal, fingerpicked acoustic guitar, soft brushed drums, warm and a little melancholy, late autumn evening",
      whyHere:
        "Udio responds strongly to descriptive production language — instruments, texture, room, mood — rather than to commands. Stacking short descriptive phrases like this is the native way to steer it, and it costs only a couple of credits, so it's the cheapest way to calibrate your expectations.",
      tweak:
        "Change one word only — swap `warm` for `sparse`, or `melancholy` for `hopeful` — and regenerate. Hearing what a single adjective does is the fastest prompting lesson available.",
    },
    {
      title: "Extend a clip into a full song",
      whatItDoes:
        "Takes a short generation you like and continues it, section by section, into a complete track.",
      whyHere:
        "Udio is built to compose in pieces rather than in one shot — this is the core of how it differs from tools that hand you one fixed track. Getting comfortable with extend is what separates a 30-second novelty from something that sounds finished. Note that longer generations cost more credits, and free accounts are capped at 3 full-length generations a day, so extend deliberately rather than reflexively.",
      tweak:
        "When extending, describe what should happen next — an instrumental break, a key change, a stripped-back final chorus — instead of leaving it blank.",
    },
    {
      title: "Bring your own lyrics",
      whatItDoes:
        "Sets the words yourself instead of letting Udio write them, with the style prompt handling the music.",
      prompt:
        "slow soul ballad, male vocal, Rhodes piano, upright bass, gentle string pad, intimate and unhurried",
      whyHere:
        "Udio separates the style description from the lyric field, so you can hold the words steady and audition completely different musical treatments of the same lyric. That's a genuinely useful exercise, and it's much harder to do in tools that take one blended prompt.",
      tweak:
        "Keep the lyrics identical and change the style prompt to something contradictory — a driving punk arrangement, say. The same words in the wrong genre is one of the more instructive things you can do here.",
    },
    {
      title: "Fix one section instead of rerolling the whole song",
      whatItDoes: "Regenerates or restyles just the part you don't like, leaving the rest intact.",
      whyHere:
        "This is Udio's real advantage over one-shot generators, and it's where the credit system rewards you — patching a section costs far less than regenerating a whole track repeatedly. Beginners tend to hit regenerate until something clicks; on Udio, learning to edit instead is the single biggest upgrade to your results.",
      tweak:
        "If a vocal line is muddy in one spot, target just that span and describe the fix — clearer diction, fewer layers — rather than re-rolling the verse.",
    },
    {
      title: "Describe a sound, never a name",
      whatItDoes:
        "Practises getting a specific artist's feel without naming anyone — the skill that keeps you out of trouble.",
      prompt:
        "1970s soft rock, close-harmony vocals, layered acoustic guitars, mellow Wurlitzer, sunlit California production, analogue tape warmth",
      whyHere:
        "Udio filters and prohibits prompts aimed at impersonating real people, so artist names either fail or produce something worse than a good description would. Building the habit of naming era, instrumentation, and production qualities gets you closer to the sound anyway — and it's the habit that transfers to every other music tool you'll use.",
      tweak:
        "Add a decade and a recording detail (`recorded to tape`, `room mic`, `close-miked`) — production language moves Udio more reliably than genre labels alone.",
    },
  ],

  pitfalls: [
    "**Naming a real, living artist in your prompt.** Asking for a specific singer's voice or a named artist's style is prohibited under Udio's terms, which forbid using the service to impersonate someone. It also tends not to work, and it's the behaviour that put AI music companies in court in the first place. Describe the era, instruments, vocal character and production instead — you'll get a better result and no ethical hangover.",
    "**Assuming you own what you generate.** You don't. Udio's current terms assign ownership of output to Udio and its licensors, limit you to personal non-commercial use, and disable downloads. This reversed after Udio settled with Universal Music Group in late 2025, so almost every guide, review and video you'll find online describes the old rules. Confusingly, some of Udio's own help pages haven't been updated either. The Terms of Service are what govern.",
    "**Planning around getting a file out.** People still arrive expecting an MP3. There was a brief window after the settlement when Udio reopened downloads so users could save existing work, and it closed. If your goal is audio you can put in a video, a podcast, or a distributor, start by confirming a platform's export and licence terms before you spend a week making something on it.",
    "**Burning your daily allowance on long songs.** Full-length generations cost roughly double a short one per track, and free accounts are limited to about three full-length generations a day. Prototype at 32 seconds until the style prompt is right, then commit credits to length. Credits don't roll over, so unused ones are simply gone at the reset.",
    "**Uploading audio you don't have the rights to.** Udio requires that you own anything you upload, and prohibits commercial or copyrighted tracks. Beyond breaking the rules, you're granting a broad, irrevocable licence over whatever you upload — including for model training. Upload your own playing, or nothing.",
  ],

  whereToNext: [
    { label: "More music generators", categorySlug: "music-generation" },
    { label: "Voice and speech tools", categorySlug: "voice-speech" },
  ],
};
