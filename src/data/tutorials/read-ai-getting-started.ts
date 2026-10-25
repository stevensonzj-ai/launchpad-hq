import type { PlatformTutorialData } from "./types";

export const readAiTutorial: PlatformTutorialData = {
  slug: "read-ai-getting-started",
  platformSlug: "read-ai",
  title: "Getting Started with Read AI",
  tagline:
    "An AI note-taker that joins your Zoom, Teams and Google Meet calls, writes up summaries and action items, and can search across your meetings, email and chat.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-10-24",
  changelogUrl: "https://www.read.ai/blog",
  accessTier: "FREE",

  howItWorks:
    "You sign in and connect your calendar. Read's note-taker then joins your video meetings as a participant (on Google Meet it can also record without joining) and produces a report: a summary, topics, action items, key questions and a transcript. You can also ask **Ask Read** questions across your meetings and, if you connect them, your email and chat.",

  whatItIs: [
    "Read AI is a meeting assistant. Its help centre says it supports Zoom, Microsoft Teams and Google Meet: it joins Zoom and Teams as a participant named \"read.ai meeting notes\" by default, and on Meet it can join or use botless recording. For other platforms, or in-person meetings, there are desktop and iPhone apps that record locally.",
    "Each meeting gets a report with a summary, topics, action items, key questions and a transcript. Read also measures how a meeting went: its **Read Score** combines sentiment and engagement, which its help centre says is measured from facial and verbal cues outside the EU and UK. You also get private **speaker coaching** on things like pace and filler words.",
    "**Ask Read** is its search assistant. Its help centre says it can search your meetings, the web, and — if you connect them — Gmail or Outlook, your calendar, and Slack or Teams. Connecting email and chat also powers **Readouts**, summaries of your inbox and messages.",
  ],

  beforeYouStart: [
    "**Sign-up sets up auto-join.** You can sign in with Google, Microsoft, Zoom, Slack or email. Read's step-by-step setup guide says the default is to join **all** meetings on your calendar and to send recaps to everyone with access — its own help centre warns people skim this step and are surprised when Read starts joining every meeting.",
    "**Free is small.** Read's free plan caps how many meeting transcripts you get each month and how long a meeting can run. Its help centre adds that reports other people share with you count toward that allowance, and that Readouts on Free last only 14 days. New users start on a free trial of a paid plan, then drop to Free.",
    "**Paid plans are per user.** Pro is {{price:read-ai:Pro}} billed annually, more if you pay month to month, and the two Enterprise plans cost more per user. The pricing page also says Read doesn't offer refunds.",
  ],

  gettingSetUpSafely: {
    officialSource:
      "Sign up at read.ai. If you use Zoom, connect the Zoom integration from inside Read — its help centre says Read can now only join Zoom meetings when you're there, signed in with that connected account.",
    body: [
      "**Change auto-join during setup.** Choose \"only meetings you host\" or \"only meetings you invite it to\" instead of all meetings. You can change it later under Account Settings → Meeting Recording → Auto-Join Preferences.",
      "**Send recaps only to yourself at first.** Read's help centre says report sharing goes to everyone on the calendar invite, whether or not they attended. Change it under Account Settings → Report Sharing.",
      "**Using a Gmail address?** Read decides who's internal by email domain, so with a personal address everyone counts as external and the \"internal only\" options won't work.",
      "**Confirm it works.** From the Calendar page, turn on \"Add Read?\" for one upcoming meeting and check that a report appears afterwards.",
    ],
    vendorDocsUrl: "https://support.read.ai/hc/en-us/articles/41295760641171",
  },

  security: [
    {
      kind: "text",
      text: "Read records other people, and recording-consent laws vary by place, so tell participants. In a meeting, anyone can type \"Opt Out\" in the chat: Read's help centre says it then leaves and deletes everything, with no report created. When you record locally with the desktop or phone app there's no bot, and getting consent is entirely your responsibility.",
    },
    {
      kind: "list",
      label: "Worth knowing before you connect everything:",
      items: [
        "**Sentiment and engagement scores** analyse faces and voices outside the EU and UK. They can feel intrusive in HR or client meetings; Read's help centre says any user can turn these metrics off in Account Settings.",
        "**AI training is opt-in,** per Read's privacy page, and its privacy policy says you're not opted into its Customer Experience Program by default.",
        "**Email and chat access is optional.** Read says it doesn't read your email unless you connect an email integration, and you can revoke access from Integrations.",
        "Read states it is SOC 2 Type II audited and GDPR compliant; a HIPAA agreement is only available on annual Enterprise+.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Hands-off meeting notes with clear action items across Zoom, Teams and Meet.",
      "Searching across meetings, email and chat in one place once you connect them.",
      "Private feedback on how you come across in meetings.",
    ],
    okayAt: [
      "Heavy use on the free plan — its small monthly allowance, including reports shared with you, goes quickly.",
      "Platforms beyond the big three. Webex, GoTo and RingCentral need the desktop app or a file upload, and uploads are paid.",
    ],
    avoid: [
      "Leaving the default auto-join and sharing settings on.",
      "Showing engagement scores about other people without their knowledge.",
    ],
  },

  starterActions: [
    {
      title: "Narrow it down",
      whatItDoes:
        "Set auto-join to meetings you host and recaps to \"Only you\", then enable Read for one meeting from the Calendar page.",
      whyHere:
        "Read's defaults join everything and share widely. Starting with one meeting lets you see exactly what a report contains before anyone else does.",
    },
    {
      title: "Ask about yesterday",
      prompt: "What issues came up in my meeting yesterday?",
      whyHere:
        "This is the example Read's own docs give for Ask Read. It's the quickest way to see whether searching your meetings saves you time.",
    },
    {
      title: "Read your coaching",
      whatItDoes:
        "After a meeting where you spoke a lot, open your speaker coaching and look at pace and filler words.",
      whyHere:
        "Read's help centre says coaching is always private to you, so it's a low-stakes way to get value from the meeting metrics.",
    },
    {
      title: "Practise opting out",
      whatItDoes:
        "In a test meeting, type \"Opt Out\" in the chat and confirm Read leaves and no report is created.",
      whyHere:
        "Knowing the exact words — and that anyone on the call can use them — makes it easier to tell others how to decline.",
    },
  ],

  pitfalls: [
    "**Other people's Read still joins.** Turning Read off for yourself doesn't stop an attendee's own Read account from joining; Read's help centre says a private meeting setting stops others adding it.",
    "**\"Read Stop\" isn't \"Opt Out\".** \"Read Stop\" ends recording but keeps a report; \"Opt Out\" deletes everything.",
    "**Shared reports eat your free allowance.** Reports others share with you count toward your monthly allowance on Free.",
    "**Custom vocabulary is paid.** If names keep coming out wrong, the fix — a custom word list — needs a paid plan.",
  ],

  whereToNext: [
    { label: "More meeting & note tools", categorySlug: "meetings-notes" },
    { label: "Voice & speech tools", categorySlug: "voice-speech" },
    { label: "Workflow & automation tools", categorySlug: "workflow-automation" },
  ],
};
