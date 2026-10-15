import type { PlatformTutorialData } from "./types";

export const veedTutorial: PlatformTutorialData = {
  slug: "veed-getting-started",
  platformSlug: "veed",
  title: "Getting Started with VEED",
  tagline:
    "A video editor that runs in your web browser, where you can cut a talking video by deleting words from its transcript.",
  archetype: "prompts",
  lastReviewedAt: "2026-10-15",
  changelogUrl: "https://www.veed.io/newsroom",
  accessTier: "FREE",

  howItWorks:
    "You open VEED in your web browser, upload a video or recording, and work on it in an editor: your clips sit on a timeline (the strip showing your footage in order) and the tools sit in a menu down the left. Click a tool, watch the preview change, adjust it, then press Done and download the finished video.",

  whatItIs: [
    "VEED is an online video editor made by Veed Limited, a London company. Everything happens in a browser tab: you upload footage, trim it, add subtitles and music, and download an MP4 at the end, without installing editing software.",
    "Its strength is talking-to-camera video — explainers, tutorials, social clips, recorded presentations. VEED turns your speech into a transcript, and several of its tools work from that transcript: delete a sentence from the text and the matching footage disappears from the video.",
    "Since August 2026 the first screen you see after signing in is VEED AI, a box where you type a topic and VEED drafts a script and then a video from it. That is one way in, not the only one; most of this page is about editing footage you already have.",
  ],

  beforeYouStart: [
    "You need a web browser and an account; VEED's help centre starts every tutorial with \"go to veed.io and log in or create an account.\" After signing in you land on the VEED AI prompt box (where you type the message — your prompt) — to work on your own video, click Edit Video on the dashboard and upload a file.",
    "The AI features that generate new material — VEED AI videos, AI Playground clips, subtitle translation — spend credits (the platform's unit of spend — each thing you make costs some). VEED shows the credit cost before you commit, doesn't charge for a generation that fails, and on monthly plans any credits you haven't used are gone at the end of the month. The everyday editing tools on this page — cutting, subtitling in your own language, removing silences — are not described by VEED as costing credits.",
    "A few tools only understand certain languages. Magic Cut, which trims pauses and filler words automatically, supports English only, and editing by transcript works only in languages that put spaces between words — so not Chinese, Japanese or Thai, for example.",
  ],

  security: [
    {
      kind: "text",
      text: "VEED's privacy policy, last updated 6 January 2025, says that personal data in content uploaded on its free plan may be used for 'training and developing' its artificial intelligence models. You can object, but the policy says that if you do, you cannot keep using the free plan — you would have to upgrade or delete your account. The policy gives no settings switch for this; it directs you to contact VEED's data privacy manager using the details in the policy itself.",
    },
    {
      kind: "list",
      label: "Also worth knowing before you upload:",
      items: [
        "VEED Limited is a UK company, and its privacy policy says many of the outside companies it relies on are based outside the UK and Europe. It also says it does not let those companies use your personal data for their own purposes.",
        "VEED's terms for its AI tools say you own the AI images you make, but give VEED the right to host them and to use them 'to market and improve our products and services.'",
        "The same terms ban using VEED's AI presenters or text-to-speech voices to impersonate any person, and ban AI content meant to influence elections or campaigns. Filming yourself is fine; making a digital someone-else is not.",
      ],
    },
    {
      kind: "text",
      text: "None of this makes ordinary editing risky. Just treat footage of other people, and anything filmed at work, as something you are handing to a company that may learn from it.",
    },
  ],

  triad: {
    bestAt: [
      "Cleaning up a recording of someone talking — cutting stumbles, pauses and 'um's by editing the words rather than scrubbing through footage.",
      "Adding subtitles quickly, then styling them and burning them into the video for social posts that play on mute.",
      "Rescuing audio recorded in a noisy room, one clip at a time.",
      "Editing on a computer that can't run desktop editing software, since everything runs in the browser.",
    ],
    okayAt: [
      "Fine, frame-by-frame editing of music videos or action footage. There is a timeline and it works, but the tools that make VEED quick all assume someone is speaking.",
      "Generating video from scratch. VEED AI and AI Playground will do it, but the result is a draft you will usually still edit.",
    ],
    avoid: [
      "Reshuffling a talk by dragging sentences around in the transcript — VEED's script editor can delete and restore words but not reorder them; you move footage on the timeline instead.",
      "Using AI presenters or synthetic voices for anything political, religious or about other sensitive topics; VEED's AI-tool terms rule those out for avatars and text-to-speech.",
    ],
  },

  starterActions: [
    {
      title: "Type a topic, read the script before you spend anything",
      prompt:
        "A 45-second vertical video for Instagram explaining three ways to keep houseplants alive through winter, friendly tone, for complete beginners.",
      whyHere:
        "VEED AI drafts the full script and shows it to you before any video is made — you can edit any line or regenerate the whole script — and the estimated credit cost sits on the Generate button. So the first attempt costs you nothing but reading: fix the words first, then pay for pictures.",
      tweak:
        "Paste a script you've already written instead of a topic. VEED's announcement also says a video with a voice but no on-screen character uses no credits, so try that version first if you're watching your balance.",
    },
    {
      title: "Auto-subtitle a clip and fix the orange words",
      whatItDoes:
        "Upload a clip of you talking, open the Subtitles tab on the left, pick the spoken language and click Auto-subtitle. Read through the result, correct anything it misheard, choose a style, then click Done and switch on Burn Subtitles so the words are part of the video.",
      whyHere:
        "VEED colours the words it is least sure about in orange, so you check those instead of proofreading every line. Its help centre also warns that if you cut the video after subtitling, the timings drift and you need to regenerate them — so subtitle last, not first.",
      tweak:
        "Add Translation in the same panel to subtitle into another language — VEED says translation spends credits.",
    },
    {
      title: "Edit the video by editing its words",
      whatItDoes:
        "With a clip on the timeline, click Video in the left panel and then Edit with Script. Highlight a sentence you fluffed and press Delete: the words go strikethrough and that footage is gone. Highlight it again and click Restore to bring it back.",
      whyHere:
        "The transcript also shows pauses as entries like '(( 0.5 s ))' that you can delete one by one, or all at once with Delete Silences, plus a Filler Word Removal option — but it only works from subtitles VEED generated itself, not ones you typed or uploaded, which is another reason to run Auto-subtitle first.",
      tweak:
        "For a one-click version, select the clip and use Magic Cut under the Video menu. It removes pauses, filler words and mistakes for you, then shows the cuts for you to adjust — English only.",
    },
    {
      title: "Clean up the sound on a noisy clip",
      whatItDoes:
        "Select a clip, open the AI Tools tab on the left and click Clean Audio. VEED strips hum, wind, traffic and echo, evens out the volume, and gives you a preview to compare.",
      whyHere:
        "Clean Audio works on the clip you selected and nothing else — VEED's help centre says a project with several clips needs it run on each one separately. Miss one and that section will sound different from the rest.",
    },
    {
      title: "Generate one short clip in AI Playground",
      prompt:
        "A slow push-in on a steaming cup of coffee on a wooden table beside a rainy window, soft morning light, calm and cosy.",
      whyHere:
        "In AI Playground you pick which video model to use, and VEED says each one gives a different look at a different credit cost, shown before you click Generate. Run the same description through two models and compare cost against result before settling on one.",
      tweak:
        "Choose the shape (vertical for phones, wide for YouTube) before generating — AI Playground asks for the aspect ratio as a separate step.",
    },
  ],

  pitfalls: [
    "**Changes after you download don't follow the file.** Any edit you make once you've exported needs a fresh export — and VEED renders it again, which takes time on longer projects.",
    "**Expecting VEED to sharpen your footage.** Its export settings let you pick a resolution, but VEED's help centre says it won't improve footage beyond its original quality. Blurry phone video exported at a higher setting is still blurry phone video.",
    "**Cancelling at the last minute.** VEED's help centre says to turn off auto-renewal at least two business days before your renewal date, that you have to finish a short questionnaire for the cancellation to go through, and that cancelling does not refund what you've already paid. Look for the confirmation email; if none arrives, contact support.",
  ],

  whereToNext: [
    { label: "Video Creation & Editing", categorySlug: "video-creation-editing" },
    { label: "Voice & Speech", categorySlug: "voice-speech" },
    { label: "Text & Conversational AI (for writing your script first)", categorySlug: "text-conversational-ai" },
  ],
};
