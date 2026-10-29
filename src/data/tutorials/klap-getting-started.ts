import type { PlatformTutorialData } from "./types";

export const klapTutorial: PlatformTutorialData = {
  slug: "klap-getting-started",
  platformSlug: "klap",
  title: "Getting Started with Klap",
  tagline:
    "Paste a long video and get back short vertical clips for TikTok, Reels and Shorts, captioned and reframed, priced by the clip.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-10-29",
  changelogUrl: "https://klap.app/blog",
  accessTier: "FREE",

  howItWorks:
    "You paste a YouTube link or upload a video file, then wait a few minutes while it works through the recording. It hands back a set of short vertical clips, each cut, captioned and scored. You preview them, adjust the ones you keep, then download or post them.",

  whatItIs: [
    "Klap turns one long video — a podcast, a webinar, a YouTube episode — into many short vertical clips. It picks the moments, reframes a wide shot into a tall one so the speaker stays in frame, adds captions, and gives each clip a score for how likely it is to go viral.",
    "It is built for talking footage. Klap's own FAQ says it \"works best for videos that incorporate speaking\" because its algorithm \"relies heavily on speech detection,\" and gives a rule of thumb of about five clips for every minute of video. Music videos, gameplay without commentary or silent footage give it much less to go on.",
    "Each clip opens in an editor. On its comparison page Klap says every plan includes the full editor: precise cuts, importing your own media and B-roll, and frame-accurate caption editing, plus a brand kit for fonts, colours and logos. Its reframing (Klap calls it AI Reframe) picks a layout per scene, such as split screen or a screen-recording layout, and Klap says it uses active speaker detection to keep whoever is talking in frame. Klap says exports go up to 4K.",
    "It is made by a small company in France, ZIGG SAS, which trades as Klap. Besides the website it offers an **API** (a way for programs to talk to each other without a person clicking), ready-made Zapier, Make and n8n integrations, and an **MCP server** (a connector that lets AI assistants such as ChatGPT, Claude or Cursor use it), so the same clipping can be run from a chat window or an automation. Support is through Discord or live chat.",
  ],

  beforeYouStart: [
    "You can try it on one video with no credit card, and Klap's own FAQ is plain about the catch: you can preview and edit those clips, but \"downloading and posting clips needs a paid plan.\" Treat the free video as a test of whether its picks suit your footage, not as a free way to publish.",
    "Paid plans are sold by the number of clips you can make each month, not by minutes of video uploaded: Basic is {{price:klap:Basic}}, Pro {{price:klap:Pro}} and Pro+ (sold for teams) {{price:klap:Pro+}}, each with a bigger monthly clip allowance than the one before. Paying yearly costs roughly half as much a month, and the pricing page shows the yearly figure first, so check which one you are looking at. Klap's FAQ says paid exports carry no Klap branding, and every plan includes AI clipping, unlimited connected social accounts and analytics. The clip allowances are on its Launchpad page.",
    "If you pay and change your mind, the terms of service allow a refund request before the end of your first month; on a yearly plan, a full refund is only available in that first month. You start the refund yourself from your billing page after cancelling.",
    "Language support is stated two ways on Klap's own site: the homepage FAQ says it edits and transcribes videos in 52 languages, while the API page says captions work in over 100. If your videos are not in English, check yours on the free video before paying.",
  ],

  security: [
    {
      kind: "text",
      text: "To find a 30-second moment, Klap reads your whole recording, so everything said in it leaves your hands, not just the clip you wanted. Its privacy policy (last updated 1 October 2026) is unusually specific about where that goes.",
    },
    {
      kind: "list",
      label: "What Klap's privacy policy says",
      items: [
        "Your videos and account data are stored with Supabase and Google Cloud in the United States. Content is kept until you delete it or your account, \"plus up to 30 days in our backups.\"",
        "Your transcripts and clipping instructions go to outside AI services — OpenRouter, \"the model providers it routes to,\" and OpenAI — and Google's Gemini receives the video itself when it has no speech to transcribe.",
        "Contractors may review \"samples of video frames\" to improve Klap's reframing.",
        "The policy says users are told about this AI processing, but \"explicit consent before data sharing with third-party AI models is not obtained\"; it says an opt-in checkbox is being built.",
        "It does not say whether your videos are used to train AI models.",
      ],
    },
    {
      kind: "text",
      text: "Connecting your TikTok, YouTube, Instagram or LinkedIn account to post from Klap gives it access tokens for that account. The policy says those are deleted as soon as you disconnect the account, so disconnect any channel you stop posting to.",
    },
  ],

  triad: {
    bestAt: [
      "Cutting a long talking-head recording — podcast, interview, webinar — into a batch of vertical clips in one pass",
      "Reframing a wide recording into a tall one, with layouts its homepage names for split screens, screen recordings and gaming footage",
      "Running the same clipping from code or an AI assistant, through its API and connector, with no separate API key for the assistant connector",
    ],
    okayAt: [
      "Choosing the best moments. Each clip comes with a viral score, but that is Klap's prediction made before anyone has watched it.",
      "Short source videos. It looks for highlights inside long footage, so a short upload gives it little to choose between.",
      "Footage without much talking. Klap says its clipping relies heavily on speech detection, so gameplay, music or b-roll-heavy videos get weaker picks.",
    ],
    avoid: [
      "Clipping footage you didn't make. Klap's terms put it on you to have \"the necessary rights for any content you submit\" — the tool will process anything, which is not permission.",
      "Recordings with people who haven't agreed to their words going to outside AI services: by Klap's own policy, transcripts are shared with third-party AI providers without a separate consent step.",
    ],
  },

  starterActions: [
    {
      title: "Spend the free video on footage you'd really post",
      whatItDoes:
        "Pick one long recording with clear speech — your own podcast episode or a talk you gave — and paste its YouTube link or upload the file.",
      whyHere:
        "You only get one free video and you can't download its clips, so its value is the preview: it shows whether Klap finds the moments you would have picked, before you pay for a monthly batch of clips.",
      tweak: "Use a recording in the language you normally publish in, so you also find out how its captions handle it.",
    },
    {
      title: "Judge the clips by watching, not by the score",
      whatItDoes:
        "Sort through the batch, watch each clip start to finish, and note which ones you'd actually post next to their viral scores.",
      whyHere:
        "Klap scores each clip's \"potential to go viral\" before a single viewer has seen it. Comparing its scores with your own picks on the free video tells you how much to trust them later.",
    },
    {
      title: "Check the captions and the framing on every keeper",
      whatItDoes:
        "On each clip you plan to keep, read the captions against what was said, and check the speaker stays in frame through the whole clip.",
      whyHere:
        "Captions come from automatic transcription and the vertical crop is chosen by Klap's reframing, so a misheard name or a face cut off at the edge is the most likely fault — and once posted, fixing it means posting again.",
      tweak: "If the crop keeps losing a second speaker, try one of its other layouts, such as split screen.",
    },
    {
      title: "Run it from an AI assistant, if you already use one",
      whatItDoes:
        "Klap's MCP server page shows how to connect it to Claude Code, Cursor or ChatGPT by signing in with your Klap account, so you can ask the assistant to clip a video or cut a moment you describe.",
      whyHere:
        "Klap's page says the connector needs no API key and \"uses your Klap plan,\" so clips you make from a chat count against the same monthly allowance as clips made on the website.",
    },
  ],

  pitfalls: [
    "**The free video doesn't give you clips you can keep.** Downloading and posting need a paid plan, so don't build a posting schedule around free clips.",
    "**Clips count, not minutes.** One long upload can produce many clips, and each counts against your monthly allowance, so a few long videos can use up a month.",
    "**Yearly and monthly prices sit side by side.** The pricing page leads with the yearly-billed monthly price; the month-to-month price is much higher. Read which one your checkout shows before you pay.",
    "**Disconnect what you stop using.** Connected social accounts keep their access until you disconnect them in Klap or in the platform's own security settings.",
  ],

  whereToNext: [
    { label: "Video creation and editing", categorySlug: "video-creation-editing" },
    { label: "Gaming and creative AI", categorySlug: "gaming-creative-ai" },
    { label: "Klap vs OpusClip", href: "/compare/klap-vs-opus-clip" },
  ],
  disclosure: [{ slug: "klap", kinds: ["affiliate"] }],
};
