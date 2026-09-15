import type { PlatformTutorialData } from "./types";

export const gongTutorial: PlatformTutorialData = {
  slug: "gong-getting-started",
  platformSlug: "gong",
  title: "Getting Started with Gong",
  tagline: "What to do in your first week on a Gong account your employer pays for.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-15",
  changelogUrl: "https://help.gong.io/docs/release-notes",
  accessTier: "PREMIUM",

  howItWorks:
    "Gong sits on your work calendar and records your sales calls. Afterwards you open a call in your browser and see the recording, a written transcript and a summary. A chat panel sits beside it: you type a question about what was said, read the answer, and keep asking follow-ups.",

  whatItIs: [
    "Gong is a call-recording and analysis platform for sales teams. It captures the meetings and phone calls a company's reps run with customers, then analyses what was said across all of them.",
    "Gong's core licence is called **Gong Foundation**, and your employer assigns you a seat on it. Specialised applications — Enable Essentials, Forecast Essentials, Gong Forecast, Gong Engage and Data Cloud — are bought separately on top of it.",
    "The part a new user actually touches is **Gong Assistant**, the chat panel that answers questions about your calls, accounts and deals. Gong announced in March 2026 that it was renaming Ask Anything to Gong Assistant, but the change has not reached everywhere: the mobile help page still calls it \"Ask anything\" and still says it is available on any Gong plan, while the web pages say Gong Assistant requires a Gong Foundation seat. Gong has not reconciled the two, so what you see on your phone may not match the browser.",
    "Most of what Gong produces — call summaries, activity, deal signals — flows back into your **CRM** (the system a sales team keeps its customer records in), and that round-trip is usually why a company buys it.",
  ],

  beforeYouStart: [
    "**There is no way to sign yourself up, so this is not a tool you can go and try tonight.** Gong's pricing page publishes no prices, offers no trial and no self-serve plan — only a form to \"prepare a customized proposal for you.\" You get access because your employer buys Gong and an admin assigns you a seat. If what you want is hands-on practice with AI on recorded meetings this week, Otter has a free tier you sign up for yourself in a browser, and it will teach you most of the same habits — asking a transcript questions, checking what it got wrong — on calls you own.",
    "What your company pays is per person, plus a platform fee: Gong states on its own pricing page that \"Licenses are priced per user\" and that \"There is a platform fee based on the number of users supported,\" but publishes no figures for either, and no vendor page states a seat minimum or a floor price. Per-seat numbers circulating on comparison sites are someone's estimate rather than Gong's price. As a user you never see a bill or a usage meter; the cost question is settled above you.",
    "Your admin, not you, decides which of your calls are recorded and who can see what. If your calls are not appearing in Gong, that is almost always a company-level setting rather than anything you did. Gong also sells a cheaper Call Intelligence seat alongside Gong Foundation; Gong marks that help page as excluded from its own search, so it may not reflect what is currently sold, but if the chat panel is missing for you it may be that your company bought that seat rather than a Foundation one.",
    "Gong records you as well as your customer. Your manager — and, depending on how permissions are set, other colleagues — can play back your calls, read the transcript and score them. Treat every external call you run as reviewable, including the small talk before the customer joins.",
  ],

  security: [
    {
      kind: "text",
      text: "Gong is a recording system, and that makes its legal position different from a chatbot's. Recording law varies by country and, in the United States, by state: some places need only one person on the call to be aware, others require everyone to agree, and when the two sides sit in different places the stricter rule usually applies. Gong's own guidance is blunt about where that lands — decisions about whether and how to record in a particular jurisdiction \"belong exclusively to the customer and their legal counsel,\" and its recording-law article carries a note that it \"does not constitute legal advice.\" Gong also flags its own recording-consent help page as stale in its documentation, so check the current version with your admin rather than treating the detail below as settled.",
    },
    {
      kind: "list",
      label: "How participants are told they are being recorded",
      items: [
        "A consent page Gong hosts, opened before the participant joins the meeting",
        "An audio prompt played as they join",
        "A pre-call email sent about 10 minutes before the meeting",
        "Zoom's own recording disclaimer, where a company uses native Zoom recording",
        "Which of these run is set by your admin in a consent profile and applies to every call — you cannot switch them on or off for one meeting",
      ],
    },
    {
      kind: "list",
      label: "Controls worth knowing on day one",
      items: [
        "Marking the calendar event private stops Gong recording the call at all — but it does not make an already-recorded call private",
        "Setting a recorded call to private hides its content, not its existence: colleagues still see that the call happened, who owned it and when, it still counts in Gong's statistics, and it still exports to your CRM flagged as private",
        "Your chat history with Gong Assistant is personal to you and not visible to teammates",
        "Your company chooses whether its Gong data lives in a US or an EU data centre; US is the default, and the choice is made when the company onboards",
      ],
    },
    {
      kind: "text",
      text: "Under European and UK privacy law your employer is the party responsible for the recordings; Gong acts on your company's instructions rather than on its own account. In practice that means a customer asking to be deleted from your records is handled by your admin, who has tools for exactly that — it is not something you can action from the chat panel. Gong deletes a company's data within 30 days of its contract ending.",
    },
    {
      kind: "text",
      text: "One question the public documents do not settle: whether your conversations are used to train Gong's own AI. Gong's terms permit it to use customer data to \"provide insights, recommendations and value analysis\" without addressing model training either way, and its privacy policy and help centre are silent on it. Gong's trust centre lists an Artificial Intelligence section, but its contents did not open without an account, so this page cannot say what those documents commit to. If it matters to you, ask your admin.",
    },
  ],

  triad: {
    bestAt: [
      "Answering \"what did they actually say\" about a call you were on — responses on a call page can cite the moment in the transcript they came from",
      "Finding a pattern across a pile of calls at once — objections, competitor mentions, recurring themes — without listening to any of them",
      "Getting up to speed on an account before a meeting or a handover, using calls plus the emails Gong has captured for that account",
      "Turning conversations into reusable material: crib sheets, FAQs, talk tracks, onboarding docs and scorecards",
    ],
    okayAt: [
      "Calls in languages other than English. Gong transcribes more than 70 languages, but several analysis features — email labels, red-flag alerts, recommended to-dos and example-based smart trackers — only produce results for English calls. Gong marks that language-support page as stale in its own documentation, so the list may have moved on since it was last reviewed.",
      "\"Either/or\" and \"everything except\" questions. Gong's own documentation says to set filters first for those, because a typed question combines conditions with \"and\"",
      "Reading Gong in your own language: the interface currently displays in English, French and Canadian French only, and Gong says localisation is still rolling out, so parts of it stay in English",
    ],
    avoid: [
      "Treating an answer as the whole conversation when someone refused consent partway through. If a participant joins late and declines, Gong keeps the portion recorded before they joined as long as roughly 70% of the planned call was captured — and the answer is built on that partial transcript without making the gap obvious",
      "Settling who said what in an internal meeting. Many companies exclude internal calls from recording entirely, and Gong only classes a meeting as internal when every invitee works at your company — one outside address changes the rule that applies",
      "Trying to force a recording through by inviting the recorder by hand. That does not override an enforced consent requirement that was not met, or a colleague on the call whose settings say never record — the call simply will not be recorded",
    ],
  },

  starterActions: [
    {
      title: "Ask the call what actually happened",
      prompt:
        "What did the customer commit to on this call, what did I commit to, and what was left unresolved?",
      whyHere:
        "On a call page the panel reads the transcript together with the account, deal and participant records attached to that call, so it can answer about the relationship and not just the hour — Otter.ai, working from the same recording, has only the transcript to go on.",
      tweak:
        "Or skip typing: the panel offers Summarize this call, Suggest next steps, List objections and Draft follow-up as one-click actions.",
    },
    {
      title: "Ask one question across a month of calls",
      prompt:
        "What concerns did customers raise in closed-lost deals during the last 30 days?",
      whyHere:
        "Gong resolves timeframes, deal status, deal value, named accounts and named participants straight out of the sentence by matching them against your CRM records — a generic meeting recorder like Fireflies has no deal or account fields to match against, so the same sentence is just a keyword search there.",
    },
    {
      title: "Set the scope by hand when the sentence won't carry it",
      whatItDoes:
        "Open Search, filter down to the calls you mean, then click Assistant — or open the Assistant page, click Add context, and pick calls, folders or streams.",
      whyHere:
        "Gong publishes the list of question shapes its natural language does not handle reliably — CRM fields like industry or territory, sentiment, specific transcript phrases — and tells you to filter first for those rather than leaving you to discover it from a wrong answer.",
    },
    {
      title: "Turn what you found into something the team can use",
      prompt:
        "Using these calls, write a one-page crib sheet on the objection that came up most: the objection in the customer's own words, the three best responses reps actually used, and what to avoid saying.",
      whyHere:
        "Gong Assistant produces documents and Gong assets — scorecards among them — that open in the Assistant page where you can read them properly and ask for revisions, rather than returning a wall of chat text you have to copy out.",
    },
    {
      title: "Give it something the calls don't contain",
      whatItDoes:
        "Click Assistant, choose Add context, then Upload files — up to 10 files per message, PDF, MD, TXT or CSV, each up to 20 MB — then ask your question.",
      whyHere:
        "Uploading the template, price list or competitor deck you want the answer shaped around lets Gong answer from your calls and the document together, which is the difference between \"summarise this call\" and \"score this call against our own checklist.\"",
    },
  ],

  pitfalls: [
    "Not every call reaches Gong. Private calendar events, meetings booked less than 30 minutes ahead, calls hosted by somebody outside your company, and internal calls your company has excluded are all skipped unless you invite the recorder yourself — so \"it isn't in Gong\" is not evidence a conversation never happened.",
    "The chat only knows the context it was opened with. From a call it sees that call; from Search it sees your current search results. Change the filters and your next question uses the new set, while the answers already on screen still refer to the old one.",
    "Answers inherit transcript errors. Gong's own FAQ says an incomplete transcript, or one transcribed in the wrong language, is the usual cause of a wrong or thin answer — the fix is to re-transcribe the call in the right language and ask again, not to rephrase the question.",
    "Capital letters matter more than you would expect. Gong matches account names and participant names in your question against the names in your CRM, and its documentation notes that the matching is case sensitive.",
    "A new chat is a blank slate. Gong holds the thread of a conversation only while that chat stays open, and moving between Your library and Company library starts a fresh chat whether you meant it to or not — so keep one line of enquiry in one chat.",
  ],

  whereToNext: [
    { label: "Meeting recorders you can actually sign up for", categorySlug: "meetings-notes" },
    { label: "Sales, marketing and SEO tools", categorySlug: "sales-marketing-seo-ai" },
    { label: "AI inside business software", categorySlug: "ai-plugins-business-software" },
  ],
};
