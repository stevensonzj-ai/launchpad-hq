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
    "You describe a song — genre, mood, instruments, the feeling you're after — and Udio plays back audio it made from that. You can supply your own words or let it write them. It builds short pieces first; you extend the ones you like and redo the parts you don't.",

  whatItIs: [
    "A text-to-music generator: describe a song in plain English, get a finished-sounding recording with vocals, instruments and structure. No instrument, no studio, no music theory.",
    "It's built around editing rather than rolling dice: once something is close, you extend it, regenerate a weak section, or restyle it, rather than starting over.",
    "**Before you compare it with Suno, settle one thing.** Udio's draw is a detailed, textured production sound and finer control over reworking a track — but its current terms bar downloads and limit you to personal, non-commercial use. If you want a file you can keep, post or release, that isn't Udio right now, and check Suno's own terms before assuming it is either.",
  ],

  beforeYouStart: [
    "Free to start, and the free tier is real: no card, around 10 credits a day plus a separate monthly pool of around 100, and free accounts capped at 3 full-length (about 2 minutes 10 seconds) generations a day. Sign up at udio.com and put one sentence in the **prompt** box — the message you type.",
    "**How credits work.** Credits are the platform's unit of spend, and Udio generates in pairs: two 32-second clips currently cost 2 credits, two 130-second songs cost 4. Monthly credits don't roll over; separately purchased packs don't expire.",
    "You won't need to pay to try it. You'll hit the ceiling wanting longer songs, more per day, or the upload and voice-editing features, which are paid-only. Entry plans currently run around $10/month (roughly $8 prepaid annually) and the top tier around $30, with a free trial on the entry plan — prices and credit amounts change, so check the pricing page.",
  ],

  security: [
    {
      kind: "list",
      label: "Rights and ownership — read this before you make anything you care about",
      items: [
        "Udio's Terms of Service (last revised 12 November 2025) say Udio and its licensors own all right, title and interest in the output, and that any ownership that would vest in you is assigned to Udio.",
        "The same terms say you may use output \"solely for your personal and non-commercial purposes\" and that you may not download copies of your output \"for any purpose.\"",
        "Downloading of audio, video and stems is currently disabled in the product — Udio confirmed this in its own help article about the Universal Music Group partnership.",
        "They also ask you not to republish or distribute generated songs on streaming or user-generated-content platforms; YouTube, TikTok, Spotify, Instagram and SoundCloud are named.",
        "Warning: parts of Udio's own help centre predate the settlement and say the opposite — that you own your songs and can use them commercially. Those pages are stale; the Terms of Service are the binding document.",
      ],
    },
    {
      kind: "text",
      text: "Udio is a social site as much as a tool: by default other people can remix, extend and restyle songs you make. You can change that per song under \"Edit permissions,\" but only one at a time — there's no way to set it library-wide. Treat what you generate as potentially visible.",
    },
    {
      kind: "text",
      text: "Uploading your own audio is paid-only, and Udio requires that you own what you upload. Under the terms, uploading grants Udio a broad, worldwide, perpetual and irrevocable licence to use, store and modify it, including to train its AI — and what you type and what comes back can be used for training too.",
    },
  ],

  triad: {
    bestAt: [
      "A plain-English description turned into a structured, listenable song in under a minute",
      "Genres and production styles you couldn't play or record yourself",
      "Reworking a track you almost like: extending, regenerating a section, restyling",
      "Auditioning different musical treatments of the same words — the style prompt and the lyric field are separate",
    ],
    okayAt: [
      "Songs built around lyrics you wrote — phrasing and pronunciation wander",
      "Precise structure: exact bar counts, key, tempo. You steer, you don't dictate",
      "Long-form pieces, which take repeated extends and burn credits fast",
    ],
    avoid: [
      "**Any commercial release or paid client work.** The current terms grant ownership to Udio, permit personal non-commercial use only, and disable downloads. Don't build anything commercial here until you can confirm otherwise from Udio's own terms.",
      "**Prompting in the name of a living artist** for their voice or style — the terms prohibit impersonation, it's the fastest route to a legal problem, and it's unfair to the artist",
      "Anything needing a file — a podcast intro, a game soundtrack, video background music — because you can't currently take the audio off the platform",
      "Work you'd be upset to lose — it lives on Udio's servers under terms that have already changed sharply once",
    ],
  },

  starterActions: [
    {
      title: "Make your first song from one sentence",
      prompt:
        "dreamy indie folk, female vocal, fingerpicked acoustic guitar, soft brushed drums, warm and a little melancholy, late autumn evening",
      whyHere:
        "Udio responds to descriptive production language — instruments, texture, room, mood — rather than commands, so stacking short phrases is the native way to steer it, at a couple of credits a go.",
      tweak: "Change one word — `warm` to `sparse` — and regenerate.",
    },
    {
      title: "Extend a clip into a full song",
      whyHere:
        "Udio composes in pieces rather than one shot — the core of how it differs from tools that hand you a fixed track. Longer generations cost more credits and free accounts get 3 full-length ones a day, so extend deliberately.",
      tweak: "Describe what happens next — a break, a key change, a stripped-back final chorus.",
    },
    {
      title: "Fix one section instead of rerolling the whole song",
      whatItDoes: "Regenerates or restyles just the part you don't like, leaving the rest intact.",
      whyHere:
        "This is where the credit system rewards you: patching a section costs far less than re-rolling a whole track. Beginners hit regenerate until something clicks; editing instead is what changes your results.",
    },
  ],

  pitfalls: [
    "**Almost every guide online is out of date.** The rules reversed after Udio settled with Universal Music Group in late 2025, but reviews and videos still describe output you own and can use commercially — and some of Udio's own help pages haven't been updated either. The Terms of Service govern.",
    "**People still arrive expecting an MP3.** There was a brief window after the settlement when downloads reopened so users could save existing work, and it closed. Confirm any platform's export terms before spending a week on it.",
    "**Burning your allowance on long songs.** Full-length generations cost roughly double a short one per track, and free accounts get about three a day. Prototype at 32 seconds until the style prompt is right, then commit credits to length — unused ones are gone at the reset.",
  ],

  whereToNext: [
    { label: "More music generators", categorySlug: "music-generation" },
    { label: "Voice and speech tools", categorySlug: "voice-speech" },
  ],
};
