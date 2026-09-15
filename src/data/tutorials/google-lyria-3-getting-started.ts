import type { PlatformTutorialData } from "./types";

export const googleLyria3Tutorial: PlatformTutorialData = {
  slug: "google-lyria-3-getting-started",
  platformSlug: "google-lyria-3",
  title: "Getting Started with Google Lyria",
  tagline:
    "Describe a song in a sentence and Google's Gemini app writes, sings and mixes it — free.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-15",
  changelogUrl: "https://gemini.google/release-notes/",
  accessTier: "FREE",

  howItWorks:
    "You open Gemini's music page, pick a template or type a sentence describing the song you want — mood, genre, instruments, what it's about. A minute or so later a finished track plays back with its own cover art. You listen, change the description, and generate again until one sounds right.",

  whatItIs: [
    "Lyria is Google's music-generating **model** (the AI \"brain\" that does the actual thinking) — it writes, performs and mixes a complete track, vocals and all, from a plain-English description.",
    "You never meet it by name. It runs inside the Gemini app, on the Music page, behind the same login you would use to chat with Gemini — the button says \"Music generation,\" not \"Lyria.\"",
    "Google keeps shipping new versions under the same name: the one currently serving the Gemini app is Lyria 3.5, from September 2026. Businesses and developers can also buy Lyria through Google's paid Vertex AI and developer products, but you need none of that to make a song.",
  ],

  beforeYouStart: [
    "You need a Google account, and Google requires you to be 18 or older to use music generation at all.",
    "Nothing to pay to start. Google's plan comparison lists music generation on every Gemini plan including the free one, so a free account can make tracks. What Google AI Plus (currently around $5 a month), Pro (around $20) and Ultra (from around $100) buy you is a higher ceiling on how much you can generate — not a better music model.",
    "**The one setting that will stop you:** Gemini refuses to generate music unless Keep Activity is switched on. That is the setting that saves your chats to your Google account, so the price of making a song here is that the session is kept. A temporary chat or an activity-off account will not work.",
    "Full-length tracks — around two to three minutes — need the Gemini model switched to **Pro** in the model picker. Free accounts get some Pro access rather than unlimited, so you will run out of long tracks sooner than short ones, which run about a minute.",
    "Available in every country where the Gemini app itself is available. Google's launch announcement named eight interface languages — English, German, Spanish, French, Hindi, Japanese, Korean and Portuguese — and that list may well have grown since; what language your *lyrics* are in is a separate question from what language the app speaks.",
  ],

  security: [
    {
      kind: "text",
      text: "Because the feature cannot run with your activity switched off (see Before you start), music generation is the rare Gemini feature with a privacy floor you cannot lower.",
    },
    {
      kind: "text",
      text: "Under the Gemini Apps Privacy Notice, last updated 29 June 2026, human reviewers read some of what you type; chats are kept 18 months by default, adjustable to 3 or 36 months; and a conversation picked for review can be held for up to three years. Google's own wording is not to enter anything you would not want a reviewer to see.",
    },
    {
      kind: "text",
      text: "None of this makes normal use risky. Write about your cat, your commute, your friend's birthday. Just do not treat the lyrics box as private.",
    },
  ],

  triad: {
    bestAt: [
      "Background music for a video, a slideshow or a podcast intro, where you need something that fits the mood and is not a famous song",
      "Novelty and occasion songs — a birthday track, an in-joke, a song telling your roommate to do the dishes, which is an example Google itself publishes",
      "Trying one idea in four genres in a single sitting",
    ],
    okayAt: [
      "Song structure — asking for a shape works better than it once did, but you are still describing a shape, not arranging one.",
      "Long-form music — anything past the full-length ceiling has to be several tracks joined together outside Gemini.",
      "Revising one moment in a track you otherwise like. The documented flow is describe-and-regenerate; if there is a way to edit an existing track in place, Google's help page does not describe one.",
    ],
    avoid: [
      "Sounding like a named artist. Google states the model treats a named artist as broad creative inspiration rather than something to imitate, so \"in the style of [famous singer]\" gets you the genre and not the voice — and the gap between those two is where beginners waste an afternoon.",
      "Anything that needs to be undetectable as AI. Every track the Gemini app produces carries SynthID, an inaudible **watermark** (a mark on generated output identifying it as AI-made), by design and with no opt-out.",
      "Assuming you may sell it. Google's Terms of Service, in force since 30 July 2026, say Google does not claim ownership of your content, and separately forbid using AI output to train other AI models — but no Google page we could find grants commercial music rights in so many words. Check the terms before you put a track behind a paywall or monetise a video with it.",
    ],
  },

  starterActions: [
    {
      title: "The one-sentence song",
      prompt:
        "A warm, mid-tempo indie folk song about moving out of the first apartment you ever loved. Acoustic guitar, brushed drums, a female vocal that sounds a little tired. Hopeful at the end.",
      whyHere:
        "Google's own Lyria prompting guidance asks you to name genre, era, instruments, vocal character and subject, and this line supplies all five into a single box — the one field is doing work that Suno splits across a separate style field and a separate lyrics field.",
      tweak:
        "Change one word — swap \"hopeful\" for \"resigned\" — and regenerate, to hear how much of the result that single adjective was holding up.",
    },
    {
      title: "Hand it your own words",
      prompt:
        "A 90s-style pop punk track, fast drums, a shouty male vocal. Lyrics: Verse: the sink is full again / the mugs have grown a skin / Chorus: Ryan, do the dishes / Ryan, do the dishes",
      whyHere:
        "The word `Lyrics:` is a real instruction to Lyria rather than decoration — Google's prompting guide uses that exact prefix to switch the model from writing *about* your subject to singing the text you supply.",
      tweak:
        "Keep supplied lyrics short. Google's guidance is that a track has limited room for words, so a full page of them gets compressed or dropped rather than sung.",
    },
    {
      title: "Switch to Pro and ask for a shape",
      whatItDoes:
        "Open the model picker in Gemini, choose Pro, set the length control to the full option, then ask for a track with named sections — an intro, two verses, a chorus and a bridge.",
      whyHere:
        "Prompting for named intros, verses, choruses and bridges is a capability Google added specifically with Lyria 3 Pro; paired with the full-length setting it is the difference between three minutes of loop and a track that goes somewhere.",
      tweak:
        "Ask for the bridge to drop the drums. Naming what an individual section should *stop* doing tests the structure control harder than naming what it should do.",
    },
    {
      title: "Start from a template, not a blank box",
      whatItDoes:
        "On the music page, open the template gallery and pick a genre — Pop, Hip-hop and rap, Rock, K-pop and others are offered — then edit the description it hands you rather than writing from nothing.",
      whyHere:
        "The templates are Google's own worked examples of the prompt shape Lyria responds to, so editing one puts you inside the format Google's prompting guidance describes rather than guessing at it.",
      tweak:
        "Notice how many words the template spends on instruments versus mood, and copy that ratio into descriptions of your own.",
    },
    {
      title: "Prove the watermark is real",
      whatItDoes:
        "Download a track you made, then upload the file back into an ordinary Gemini chat and ask whether Google AI generated it.",
      whyHere:
        "Gemini reads SynthID straight out of a file you hand it, which means the same trick works on audio someone *else* sends you — the check is not limited to your own downloads.",
      tweak:
        "Try it on a piece of music you know a human made, to see what a negative answer looks like.",
    },
  ],

  pitfalls: [
    "Writing one word and judging the tool on it. \"A love song\" is a valid description and Google lists it as one, but it hands every decision to the model.",
    "Forgetting the cover art is generated too. Downloading the MP4 gets you a video with an AI-made image attached to the music; if you only want audio, take the MP3.",
    "Expecting a published daily allowance. Google says only that limits exist and that you will get a notification when you pass one, with the choice of waiting for a refresh or upgrading — so plan on discovering your ceiling rather than reading it.",
    "Assuming your tracks are saved somewhere. The output arrives as a file to download or a link to share, and Google's help page does not promise a permanent library of what you have generated, so save the ones you want to keep.",
  ],

  whereToNext: [
    { label: "Other music generators", categorySlug: "music-generation" },
    { label: "Video creation and editing", categorySlug: "video-creation-editing" },
    { label: "AI chat assistants", categorySlug: "text-conversational-ai" },
  ],
};
