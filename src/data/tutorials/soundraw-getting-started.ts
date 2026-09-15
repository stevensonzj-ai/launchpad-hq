import type { PlatformTutorialData } from "./types";

export const soundrawTutorial: PlatformTutorialData = {
  slug: "soundraw-getting-started",
  platformSlug: "soundraw",
  title: "Getting Started with Soundraw",
  tagline:
    "Build a royalty-free backing track by clicking tags instead of describing a song — then pay to take it away.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-15",
  accessTier: "PREMIUM",

  howItWorks:
    "You open the generator and click tags for mood, genre and theme, then set a length and a tempo. A list of finished tracks appears and you play them. Pick one and an editing screen opens where you toggle instruments, raise or lower the energy of each section and trim the length, rebuilding the track as you go.",

  whatItIs: [
    "Soundraw makes **royalty-free** instrumental music — royalty-free meaning you pay for a licence rather than paying again each time the track is used. It is aimed at people who need something playing under a video, podcast, stream or game, not at people who want to write a song.",
    "**It does not generate vocals or lyrics.** Its help centre is direct about this: Soundraw \"specializes in generating instrumental tracks and does not support the creation of songs with integrated vocals or lyrics.\" If you want singing, you want a different tool in this category.",
    "The other thing that sets it apart is what it is trained on. Soundraw says its AI learns only from music its own in-house producers wrote and recorded, which is why it is willing to promise a worldwide commercial licence on everything you generate. That claim is the whole product, and it is the reason the licence terms below are worth reading properly.",
  ],

  beforeYouStart: [
    "You can generate and listen to full tracks at soundraw.io without signing up at all. A free account adds one thing: the ability to favourite a track and find it again later, under Favorites in the account menu.",
    "**The paywall is the download, not the music.** Soundraw's help centre puts it plainly — creating songs is free, but \"downloading and using the tracks require a subscription to one of our plans\", and it says elsewhere that \"there is no free trial of our license.\" So the honest answer on cost is: you will be paying before any file reaches your computer.",
    "Which plan depends on what you are making. Creator, currently $16.99 a month or about $11.04 a month billed annually, gives unlimited MP3 downloads for background music in your own projects. The Artist tiers, currently $29.99 to $50 a month, are for musicians who want to release tracks; only the top two include WAV and **stems** — the separate instrument files, drums and bass and melody apart, so you can rework them in music software like GarageBand or Ableton — and the two cheaper Artist tiers cap you at 10 or 20 downloads a month. One oddity to check once you are signed in: the pricing page's stems answer mentions \"vocals (if any)\" among the files, which sits awkwardly beside the help centre's statement that Soundraw does not generate vocals at all.",
    "Annual plans are hard to leave. The terms of service (updated 12 June 2025) say fees already paid are not refunded, and that ending a yearly plan early means paying the remaining unexpired fees up front. Start monthly and switch later if it earns it.",
  ],

  security: [
    {
      kind: "text",
      text: "Soundraw is unusual at the input end: you type nothing and you upload nothing. What the company holds is ordinary account data — its privacy policy lists name, date of birth, address, phone, email and card number, plus usage and device information — and that policy is undated, which is worth knowing when you rely on it. The part that actually deserves your attention is the licence.",
    },
    {
      kind: "list",
      label: "What the licence gives you, and what it takes back",
      items: [
        "Soundraw's own explainer (19 February 2025) says that when you cancel you \"do not have to take down any of your existing content\" and can keep monetising projects that already use a downloaded track. You just stop being able to generate new ones.",
        "**There are named exceptions, and they are the uses people build businesses on.** The licence page says that if you use Soundraw tracks as downloaded for meditation, lo-fi and relaxation content, \"you can only keep your content published while your SOUNDRAW subscription is active.\" The cancellation explainer extends the same rule to background-music and lo-fi channels and to business hold music.",
        "Registering a Soundraw track with **Content ID** — YouTube's automatic copyright-matching system, and the equivalents run by distributors — is prohibited outright. The licence agreement puts it in capitals.",
        "You are licensing, not buying. Soundraw's licence agreement treats the recordings as Soundraw's and splits the underlying composition of anything you derive from them 50/50 between you and Soundraw.",
      ],
    },
    {
      kind: "text",
      text: "Note the tension before you plan around it: Soundraw's pricing FAQ says \"Anything you make while you're subscribed stays licensed for life, even if you cancel later,\" while the licence page carves out those content types. The licence page is the more specific document and the one to act on — but if a meditation channel or a hold-music contract is the reason you are here, ask Soundraw in writing which one governs you.",
    },
  ],

  triad: {
    bestAt: [
      "Hitting an exact runtime: you set the length before generating and the arrangement is rebuilt around it, ending rather than fading",
      "Auditioning a dozen directions in a few minutes without writing a word",
      "Genre blends built as a combination of tags rather than as a phrase",
    ],
    okayAt: [
      "Landing on a specific reference sound: tags get you the neighbourhood, not the address",
      "Long pieces — five minutes is currently the per-track ceiling, so anything longer means stitching two tracks together in an editor",
      "Music that has to carry a moment on its own rather than sit underneath one",
    ],
    avoid: [
      "Scoring video you do not own — films, TV, adverts — which the licence page lists as not covered; that needs a separate licence you have to contact Soundraw for",
      "Selling a Soundraw-derived track on a stock-audio library; the licence names that as not allowed",
      "Putting an unmodified Soundraw beat out as your own single. Even on an Artist plan, distribution to Spotify and the rest is permitted only if you change the beat first — \"the final, modified song needs to sound clearly different to the original, downloaded track\"",
    ],
  },

  starterActions: [
    {
      title: "Make a 30-second podcast intro",
      whatItDoes:
        "Open the generator, set the length to 30 seconds, and pick one mood tag and one genre tag — Happy and Acoustic is a safe pair. Play the top three results, keep one, then in the editing screen mute the drums on the opening section so the track starts quietly and lands when your voice comes in.",
      whyHere:
        "Muting a named section of a finished arrangement is not the same as fading a file — the intro drops out cleanly and the rest plays exactly as generated. Suno hands back a finished mix with no sections to reach into.",
      tweak:
        "Change the mood tag and regenerate — the length and the muted opening stay put.",
    },
    {
      title: "Blend two genres on purpose",
      whatItDoes:
        "Select two genre tags at once — Hip-Hop with Orchestra, or Trap with Lo-Fi — and generate. Then remove one tag, generate again, and listen to how much of the result that single tag was carrying.",
      whyHere:
        "Genre here is a filter rather than a word in a sentence, so a blend is repeatable: the same two tags return the same territory every time, which is not true of the same phrase typed into Suno twice.",
      tweak:
        "Try a pairing that should not work. The mismatches are where you learn what each tag actually controls.",
    },
    {
      title: "Decide whether it is worth paying for, before you pay",
      whatItDoes:
        "Make a free account, spend two sessions favouriting five candidates, and play each one against your rough cut in the browser. Only subscribe once one of them clearly wins. Soundraw's help centre doesn't say how long an unpaid account keeps its favourites, so don't lean on one you couldn't bear to lose.",
      whyHere:
        "Because only the download is metered (see Before you start), the entire audition happens unpaid — which makes the favourites list, not the generator, the thing to stress-test before you subscribe.",
      tweak:
        "Favourite the near-misses too. They are useful for working out which tags to change.",
    },
  ],

  pitfalls: [
    "The tags narrow a catalogue rather than compose from scratch. Stack too many at once and you get a short list of near-identical options; start with two or three and add one at a time.",
    "On the Artist tiers the monthly download allowance is spent at the moment you download, not when you generate. Audition in the browser and download only the version you have settled on.",
    "Editing happens before the download, not after. Once the MP3 is on your machine, changing the arrangement means going back to Soundraw and downloading again — which costs another download on a counted plan.",
  ],

  whereToNext: [
    { label: "Music Generation", categorySlug: "music-generation" },
    { label: "Video Creation & Editing", categorySlug: "video-creation-editing" },
    { label: "Voice & Speech", categorySlug: "voice-speech" },
  ],
};
