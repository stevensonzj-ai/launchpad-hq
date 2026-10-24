import type { PlatformTutorialData } from "./types";

export const fathomTutorial: PlatformTutorialData = {
  slug: "fathom-getting-started",
  platformSlug: "fathom",
  title: "Getting Started with Fathom",
  tagline:
    "A free AI note-taker for Zoom, Google Meet and Teams that records, transcribes and summarises your calls — generous on the free plan, with sharing defaults worth changing.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-10-24",
  changelogUrl: "https://help.fathom.video/en/articles/6220097",
  accessTier: "FREE",

  howItWorks:
    "You connect your Google or Microsoft calendar and install Fathom's desktop app. When a Zoom, Meet or Teams call starts, Fathom records it — usually with a visible \"Fathom Notetaker\" bot — then gives you a transcript, an AI summary and highlights you can clip and share. On a Mac there's also a newer bot-free mode.",

  whatItIs: [
    "Fathom is an AI meeting assistant. Its homepage describes it as an AI notetaker that summarizes your meetings so you can focus on the conversation. It works with Zoom, Google Meet and Microsoft Teams, and its free plan includes unlimited recordings, storage and transcription, per its help centre.",
    "Most people meet Fathom as a bot: a participant called \"Fathom Notetaker\" joins the call and records. Fathom's help centre says a newer bot-free mode is rolling out on Macs, which can capture just a transcript or audio without a bot; Microsoft Teams calls still use the bot. Fathom records only while you are on the call and leaves when the meeting ends.",
    "After the call you get a transcript in one of 38 languages, an AI summary using a meeting template, and highlights you can turn into short clips. Paid plans add **Ask Fathom** — a chat that answers questions about a call — plus AI action items, follow-up emails and CRM syncing. An iPhone app records in-person conversations.",
  ],

  beforeYouStart: [
    "**You need a Google or Microsoft account.** Fathom's help centre says it only supports Google- or Microsoft-based email addresses. Signing up with a personal address like Gmail has an extra hurdle: Fathom's quick-start guide says you need a Zoom, Meet or Teams meeting on your calendar in the next seven days to finish sign-up.",
    "**The free plan is genuinely useful.** Fathom's help centre lists unlimited recordings, storage and transcription on Free, with its advanced AI summaries for your first 5 calls each month and a simpler summary after that. New accounts also get a 30-day free preview of the paid Premium features.",
    "**Paid plans are per person.** As of 24 October 2026, Fathom's pricing page shows Premium at $16 or $20 per user per month, Team at $15 or $19, and Business at $25 or $34, depending on the billing option selected (the page offers Monthly or Annually, \"save 25%+\"). Team and Business need at least two users. Check the toggle before you buy, because both prices are shown \"/month\".",
  ],

  gettingSetUpSafely: {
    officialSource:
      "Sign up at fathom.ai and download the desktop app from fathom.video/download. Fathom's help centre warns about impostors posing as Fathom, so don't install anything from a link in an unexpected email.",
    body: [
      "**Turn on consent requests.** Fathom has an opt-in setting, Auto Request Recording Consent, that emails external guests 24 hours before a scheduled meeting. Its help centre says that if a guest declines, auto-record is switched off for that call — but if nobody replies, Fathom still records.",
      "**Check who gets the notes.** Fathom's sharing guide says auto-share sends notes to everyone on the calendar invite, including people who didn't attend. Change it to just yourself until you know what a recap contains.",
      "**Lock down links.** On Free and individual plans, recording links default to \"Anyone with the link can view\". Restrict sensitive recordings one by one, and remember a share can't be unsent, only revoked.",
      "**Run a test call.** Start a meeting on your own and confirm a recording and summary appear in Fathom afterwards.",
    ],
    vendorDocsUrl: "https://help.fathom.video/en/articles/276608",
  },

  security: [
    {
      kind: "text",
      text: "Recording a meeting records other people. Fathom's help centre says there's no way to silently record — the bot is visible, Zoom shows a recording banner, and bot-free mode posts a notice in the chat — and it warns that recording without consent can be illegal in some places. Telling people at the start of the call is still on you.",
    },
    {
      kind: "list",
      label: "What Fathom does with your recordings:",
      items: [
        "Fathom's privacy policy (updated August 16, 2026) says its outside AI providers, such as OpenAI, Anthropic and Google, may not train on your data — but Fathom may use de-identified meeting data to train its own models unless you opt out in your settings.",
        "Fathom says it is SOC 2 Type II, GDPR and HIPAA compliant, and stores data in the US. A signed HIPAA agreement is an Enterprise feature.",
        "Deleting a call can't be undone. Automatic retention policies are Enterprise-only.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Recording and summarising lots of video calls for free, with no cap on recordings.",
      "Turning a long call into short clips you can share with people who weren't there.",
      "Mac users who'd rather not have a bot in the call, via the bot-free mode as it rolls out.",
    ],
    okayAt: [
      "Asking questions of your calls. Ask Fathom and account-wide search are paid features.",
      "Platforms beyond the big three. Fathom's help centre lists Chromebooks, Linux, iPads, webinars and breakout rooms as unsupported.",
    ],
    avoid: [
      "Keeping the default sharing settings for sensitive meetings.",
      "Assuming silence means consent — no reply to a consent email still means Fathom records.",
    ],
  },

  starterActions: [
    {
      title: "Set sharing before your first call",
      whatItDoes:
        "In your settings, change auto-share so notes go only to you, and switch the default link setting away from \"Anyone with the link\".",
      whyHere:
        "Fathom's defaults send notes to everyone on the invite and make links viewable by anyone who has them. Changing this first means nothing leaves your account by surprise.",
    },
    {
      title: "Record a test call",
      whatItDoes:
        "Start a Zoom, Meet or Teams call with yourself (or a friend who's agreed), talk for a few minutes, then end it and open the recording in Fathom.",
      whyHere:
        "It confirms your calendar and platform are connected properly before a real meeting depends on it.",
    },
    {
      title: "Clip the moment that matters",
      whatItDoes:
        "In a finished recording, highlight a key exchange and turn it into a clip to share.",
      whyHere:
        "Clips are where Fathom saves other people time: a 90-second clip beats sending someone an hour-long recording.",
    },
    {
      title: "Ask your call a question",
      prompt: "What did we agree on next steps, and who owns each one?",
      whyHere:
        "Try this in Ask Fathom during your 30-day Premium preview. It shows whether the paid chat features are worth it before the preview ends.",
    },
  ],

  pitfalls: [
    "**The Meet link has to be in the right place.** Fathom's help centre says Google Meet links must be in the event's Location field, on your primary calendar.",
    "**The bot gets stuck in the lobby.** On Zoom and Teams you may need to admit Fathom from the waiting room, and Teams meetings with end-to-end encryption can't be recorded.",
    "**Free summaries step down after 5 calls.** The advanced summaries cover your first 5 calls each month.",
    "**A blocked Gmail sign-up is final.** If sign-up with a personal email is blocked, Fathom says you can't make another free account with that email.",
  ],

  whereToNext: [
    { label: "More meeting & note tools", categorySlug: "meetings-notes" },
    { label: "Voice & speech tools", categorySlug: "voice-speech" },
    { label: "Sales tools that use call notes", categorySlug: "sales-marketing-seo-ai" },
  ],
};
