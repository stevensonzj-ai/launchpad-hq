import type { PlatformTutorialData } from "./types";

export const pictoryAiTutorial: PlatformTutorialData = {
  slug: "pictory-ai-getting-started",
  platformSlug: "pictory-ai",
  title: "Getting Started with Pictory",
  tagline: "Turn writing you already have into a narrated video, without opening a video editor.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-17",
  changelogUrl: "https://kb.pictory.ai/en/articles/8468770-pictory-release-notes",
  accessTier: "PREMIUM",

  howItWorks:
    "You paste a script or point it at something you have already written, and it splits the text into scenes, finds matching clips for each one, reads the words aloud in a chosen voice and puts captions on screen. You then work down the scene list swapping any clip or line you do not like, and download the finished video.",

  whatItIs: [
    "Pictory is a browser tool that turns writing you already have — a script, a blog post, a PDF, a slide deck — into a narrated video with captions and matching footage.",
    "It does not film or draw anything original by default — the clips are ready-made and the voice is synthetic. Pictory's help centre names Storyblocks and Getty Images as the sources of the visuals and Melodie as the source of the background music.",
    "It also works in the other direction: upload a webinar, a Zoom recording or a podcast episode and Pictory writes out everything said, so you can shorten the video by deleting sentences from the text.",
    "A newer layer generates visuals from scratch — images, short AI video, and computer-generated presenters — rather than pulling them from the library, and it is priced separately from everything else here.",
  ],

  beforeYouStart: [
    "There is no free tier. Pictory currently gives you a 14-day trial that its pricing page limits to 3 video projects, 15 minutes of video in total and a 5-minute cap on any one video; its signup pages say no card is needed to start. After that it is a paid product, currently from around $29/month on the Starter plan, or around $25/month if you pay for a year up front.",
    `**Assume trial exports carry Pictory's branding.** Its plan-comparison table lists "no watermark" (a mark on generated output identifying it as AI-made) against the paid plans only, and its free script-to-video landing page also files watermark-free export under the paid tiers. Neither page states outright that the trial is watermarked, so this is an inference from where the vendor puts the line rather than something Pictory says — worth confirming in the app before you build anything around trial output.`,
    "Two separate allowances run at once. Video minutes cover finished videos — currently around 200 a month on Starter, 600 on Professional. AI **credits** (the platform's unit of spend — each thing you make costs some) are a different pot entirely, spent only when you generate original AI images, AI video or a presenter, and Pictory's credits article says unused ones roll into the next cycle.",
    "The language you narrate in decides which voice pool you draw from. Pictory's help centre lists 7 languages for its standard voices — English, Dutch, French, German, Italian, Portuguese and Spanish — and 29 for the premium voices it licenses from ElevenLabs, which every plan meters by the minute. Whether transcription and auto-captions cover the same 29 languages is not stated on any Pictory page we could reach.",
  ],

  security: [
    {
      kind: "text",
      text: "Everything you put into Pictory goes to its cloud and stays there. Pictory advertises independent security auditing and European privacy compliance, and its privacy policy (last updated 17 February 2026) extends deletion, access and portability rights to all users rather than only EU ones. What that policy does not say, either way, is whether your uploaded content is used to improve Pictory's own AI. Treat that silence as a genuine unknown, not as a no.",
    },
    {
      kind: "list",
      label: "Think twice before uploading",
      items: [
        "Internal recordings — all-hands, strategy calls, anything nobody cleared for a third-party vendor",
        "Client footage covered by a contract or an **NDA** (a signed agreement not to share someone's confidential information)",
        "Unreleased product material",
        "Recordings of other people's faces and voices, where they have not agreed to a vendor processing them",
      ],
    },
    {
      kind: "text",
      text: "Your text does not stay inside one company: the premium voices are ElevenLabs', and the generated visuals come from an assortment of outside image and video models that Pictory names in its credits pricing. Pictory's privacy policy names its cloud hosts but does not list these AI suppliers individually, so you cannot tell from the public documents exactly whose servers a given generated shot passed through.",
    },
  ],

  triad: {
    bestAt: [
      "Getting captions onto footage without hand-timing a single one",
      "Volume: the tenth version of an explainer costs about what the first did",
    ],
    okayAt: [
      "Clip choice. A concrete sentence gets a usable shot; an abstract one gets a generic office corridor you will want to swap",
      "Voice performance. The standard voices read cleanly but flatly; the ones that sound genuinely human come out of the premium pool",
      "Slide decks. It converts PowerPoint, currently metered as 100 slides a month on Starter, but the result is a narrated slideshow rather than a redesign",
    ],
    avoid: [
      "Publishing anything with Pictory's background music to YouTube without following Pictory's own new rule. Its help centre states that from 1 September 2026 you must add the appropriate clearance code — a short string in your video description that tells YouTube's system you are licensed — before publishing, or the track's owner can claim your video. Pictory points to a separate article for where that code comes from, which we could not retrieve, so budget time to find it.",
      "Lifting a clip or a music bed out of a finished Pictory video to use on its own. Pictory's terms of service (last modified 14 July 2026) licence that third-party material only as part of the video you made in Pictory, and separately bar using any of it to train an AI system.",
      "Expecting the footage to be about you. A video about your product shows somebody else's product unless you upload your own material, which is a slower workflow than the one Pictory is fast at.",
    ],
  },

  starterActions: [
    {
      title: "Paste a mixed script and watch what it picks",
      prompt:
        "Most people think saving money is about willpower. It is not. It is about order of operations. First, work out what leaves your account automatically every month. Second, move the savings transfer to the day you get paid, before anything else goes out. Third, leave the rest alone. Nothing here requires you to spend less on coffee. It requires you to spend after you have saved, not before. Try it for one pay cycle and look at the balance.",
      whyHere: `Pictory chooses footage sentence by sentence on keywords, so a script mixing concrete nouns with abstractions shows you both outcomes in one pass — the bank-account lines get usable shots, "order of operations" gets a stock boardroom. invideo AI starts instead from footage you upload and an edit you describe, so it never makes this guess.`,
      tweak:
        "Run the same script twice with two different themes to see how much of the result is the theme rather than the writing.",
    },
    {
      title: "Cut a long recording by deleting sentences",
      whatItDoes:
        "Upload a webinar, Zoom call or podcast episode, wait for Pictory to write out everything said, then delete the filler sentences from that text and watch the matching video go with them.",
      whyHere:
        "Descript does transcript-based cutting too, and does it on a permanent free plan capped at 60 minutes of media a month. What Pictory adds on the same file is offering to pick the summary sentences for you and rebuild the recording as a short — Descript leaves every choice to you.",
    },
    {
      title: "Export once, change something, export again",
      whatItDoes:
        "Download your first finished video, then go back into the same project, swap a clip or fix a caption, and download it a second time.",
      whyHere:
        "Pictory's help centre says video minutes are deducted only on the first download of a project and that later downloads of the same project do not touch the quota, so finishing inside one project is cheaper than starting a fresh one each time you change your mind. invideo AI bills a monthly credit pot that its own pricing page says does not roll over, so the same habit buys you nothing there.",
    },
    {
      title: "Spend a few credits on one deliberate generated shot",
      prompt:
        "A slow overhead shot of a wooden desk at dawn, one open notebook and a cooling cup of coffee, warm low light, no people, no text on screen.",
      whyHere:
        "Pictory publishes a per-model, per-second price for this — its credits article currently puts generated video somewhere between about 1.6 and 20 credits a second depending which model you choose, and a presenter at around 15 credits per 30 seconds. Descript meters AI credits per plan too, but against editing features rather than a published per-second rate, so there is no equivalent meter to calibrate against.",
      tweak:
        "Run the same description on the cheapest and the dearest model in the list and decide whether you can see the difference at the size you publish.",
    },
    {
      title: "Find out which voice pool your language falls in",
      whatItDoes:
        "Before writing anything long, open the voice picker and check whether the language you need is in the seven standard-voice languages or only in the premium set.",
      whyHere:
        "Pictory meters the two pools differently: standard voices are unlimited on a paid plan, while the premium voices come out of a capped monthly minute allowance, currently around 60 minutes on Starter — so the language you write in decides whether narration is effectively free or rationed. Descript publishes one flat transcription-language list per plan, currently 25 languages including on its free tier, with no second pool to run out of.",
    },
  ],

  pitfalls: [
    `The first pass's clip choices are the weakest thing about the output — "our team has grown" reliably returns a stranger's open-plan office. Budget time to swap shots; publishing pass one is how Pictory videos come to look like Pictory videos.`,
    "The trial clock runs on days, not on use — it expires whether or not you make anything, so start it on a day you already have a script ready.",
    "Annual and monthly plans describe the same allowance with very different-looking numbers — Starter appears as roughly 2,400 minutes a year or roughly 200 a month. Those are the same thing said two ways, not a bigger pot for paying annually.",
    "Any single video is capped at 30 minutes on the paid plans, so a two-hour webinar cannot come out whole. It has to be cut down or split first, which is what the transcript editor is for.",
  ],

  whereToNext: [
    { label: "Write the script first", categorySlug: "text-conversational-ai" },
    { label: "Voice and speech tools", categorySlug: "voice-speech" },
    { label: "Other video tools", categorySlug: "video-creation-editing" },
  ],
};
