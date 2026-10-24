import type { PlatformTutorialData } from "./types";

export const firefliesAiTutorial: PlatformTutorialData = {
  slug: "fireflies-ai-getting-started",
  platformSlug: "fireflies-ai",
  title: "Getting Started with Fireflies.ai",
  tagline:
    "An AI note-taker that joins your video calls, transcribes them and sends summaries — once you've told it which meetings to join and who should get the notes.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-10-23",
  accessTier: "FREE",

  howItWorks:
    "You connect your Google or Outlook calendar. Fireflies' note-taker, **Fred**, then joins your video meetings as a participant, records and transcribes them, and afterwards sends a summary with action items. You can search transcripts or ask **AskFred**, its chat assistant, questions about one meeting or many.",

  whatItIs: [
    "Fireflies.ai is a meeting assistant built around a bot. Its help centre describes Fred as Fireflies' bot, which joins calls as fred@fireflies.ai on Zoom, Google Meet, Microsoft Teams and other platforms, then produces a transcript, summary and action items. The pricing page lists transcription in more than 100 languages.",
    "If you don't want a bot on the call, there are other ways in. The desktop app can capture your computer's audio with no bot joining — Fireflies says that mode keeps only the transcript and summary, not audio or video. The Chrome extension records from your browser, the iPhone and Android apps record in-person meetings, and you can upload audio or video files.",
    "After the meeting, **AskFred** answers questions about what was said — inside one meeting, or across past meetings and connected apps. You can also clip short **soundbites** of key moments, and send notes automatically to tools like Slack, Notion or a CRM; the pricing page says every plan includes all integrations.",
  ],

  beforeYouStart: [
    "**Sign-up connects your calendar.** You sign in with Google or Microsoft (Outlook) — the only options — and grant calendar access. Fireflies supports one calendar per account. During setup it asks two important questions: which meetings Fred should join, and who should get the recap emails.",
    "**Change the defaults before your first meeting.** Fireflies' account-setup guide says the defaults are to join every calendar meeting with a video link and to send recaps to everyone on the invite — including outside guests. Most beginners want \"Only meetings that I own\" or \"Only when I invite fred@fireflies.ai\", and recaps sent only to themselves at first.",
    "**Free has catches.** Fireflies' pricing page lists Free at $0 with 400 minutes of storage. Its help centre says unlimited transcription on Free only applies with auto-join turned on; with auto-join off or set to invite-only, accounts created since September 1, 2026 get 3 meeting transcriptions. Downloading transcripts needs a paid plan.",
    "**Paid plans are per seat.** The pricing page lists Pro at $18 per seat per month ($10 billed annually), Business at $29 ($19 annually) and Enterprise at $39 per seat per month, billed annually. Separately, **AI credits** pay for extra AI features; Fireflies' credits guide says paid plans are automatically subscribed to a small credit pack when they run out.",
  ],

  gettingSetUpSafely: {
    officialSource:
      "Sign up at fireflies.ai and install the desktop app, mobile apps or Chrome extension only from links on fireflies.ai or the official app stores. Fireflies asks for calendar access, so review the permission screen to make sure it's the real thing.",
    body: [
      "**Set who Fred records.** In Settings → Recording & Privacy, choose your auto-join option. \"Only when I invite fred@fireflies.ai\" gives you the most control; on the Free plan, Fireflies' help centre says it also limits you to 3 transcriptions.",
      "**Set who gets the notes.** In the same area, change recap emails from \"Everyone on the invite\" to just you, or only teammates, until you're sure what a recap contains.",
      "**Check sharing.** Fireflies' help centre says meeting privacy defaults to \"Teammates & Anyone with Link\", meaning anyone with a forwarded link can view it. Tighten it if your meetings are sensitive; Fireflies offers to apply the change to past meetings too.",
    ],
    vendorDocsUrl: "https://guide.fireflies.ai/articles/9016807101-how-to-create-a-fireflies-account",
  },

  security: [
    {
      kind: "text",
      text: "A bot that joins meetings records other people, so consent is the first thing to manage. Fireflies' consent guide says it follows your meeting platform's recording rules, and most meetings are opt-out — the bot joins, and people have to remove it. Recording-consent laws vary by place, so tell people up front. Fireflies has two settings you switch on yourself: an email to attendees an hour before with a link to decline recording, and a message pinned in the meeting chat.",
    },
    {
      kind: "list",
      label: "Handy controls:",
      items: [
        "Type `/ff pause` or `/ff leave` in the meeting chat to pause or remove Fred. Fireflies says no transcript is made if Fred is removed within 3 minutes.",
        "Recording Rules can stop Fred joining meetings that match a keyword, email or domain — useful for HR or medical calls.",
        "Only a meeting's owner can delete it, and deletion is permanent.",
      ],
    },
    {
      kind: "text",
      text: "Fireflies' privacy policy says personal information isn't used to train AI models and that its AI vendors keep no meeting content. It lists SOC 2 Type II and GDPR compliance; HIPAA agreements require Enterprise.",
    },
  ],

  triad: {
    bestAt: [
      "Recording and summarising lots of video calls without anyone taking notes.",
      "Finding what was said across weeks of meetings by search or by asking AskFred.",
      "Pushing meeting notes into Slack, Notion or a CRM automatically.",
    ],
    okayAt: [
      "Accuracy in hard conditions. Fireflies' own guide says background noise, accents, people talking over each other and poor connections all reduce it.",
      "Meetings where a visible bot feels awkward — use the desktop app's no-bot mode instead.",
    ],
    avoid: [
      "Leaving the defaults on: every meeting recorded, recaps to every guest, links viewable by anyone.",
      "Recording people who haven't been told.",
    ],
  },

  starterActions: [
    {
      title: "Lock down the defaults",
      whatItDoes:
        "In Settings → Recording & Privacy, set auto-join to \"Only meetings that I own\", send recaps only to yourself, and set meeting privacy to teammates only.",
      whyHere:
        "Fireflies' defaults record every meeting with a video link and email notes to every guest. Starting narrow means nothing goes out that you haven't seen.",
    },
    {
      title: "Ask about one meeting",
      prompt: "What were the key decisions in this meeting, and who agreed to do what by when?",
      whyHere:
        "Open a processed meeting and ask AskFred. Fireflies' help centre recommends specific questions like this, and checking the answer against the transcript before you act on it.",
    },
    {
      title: "Ask across meetings",
      prompt: "List my action items from this week's meetings.",
      whyHere:
        "This is one of Fireflies' own example questions for AskFred across meetings (Ctrl/Cmd+J). It's the best way to see why a searchable meeting history is useful.",
    },
    {
      title: "Try it without a bot",
      whatItDoes:
        "Install the desktop app and record your next call from your computer's audio instead of inviting Fred.",
      whyHere:
        "Fireflies says this mode keeps only the transcript and summary, with no audio or video saved — a gentler option for small or sensitive meetings.",
    },
    {
      title: "Turn on the courtesy notices",
      whatItDoes:
        "Enable the pre-meeting email that lets attendees decline recording, and the pinned chat message announcing that the meeting is being recorded.",
      whyHere:
        "Fireflies' consent guide treats both as settings you switch on yourself. Turning them on makes telling people the default rather than an afterthought.",
    },
  ],

  pitfalls: [
    "**Fred turning up uninvited.** If it joins a meeting it shouldn't, check your auto-join setting — and remember it follows your calendar, not your intentions.",
    "**Outsiders getting your recaps.** Recap emails go to everyone on the invite by default, including people without a Fireflies account.",
    "**Running out of Free storage.** The 400-minute cap doesn't reset monthly; you'll need to delete old meetings to open new ones.",
    "**Surprise AI-credit charges.** Fireflies says its Daily Digest and Meeting Prep features are on by default and use AI credits; turn them off if you don't use them.",
  ],

  whereToNext: [
    { label: "More meeting & note tools", categorySlug: "meetings-notes" },
    { label: "Voice & speech tools", categorySlug: "voice-speech" },
    { label: "Automate what happens after the call", categorySlug: "workflow-automation" },
  ],
};
