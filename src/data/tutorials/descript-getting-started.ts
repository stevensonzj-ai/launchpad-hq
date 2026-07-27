import type { PlatformTutorialData } from "./types";

export const descriptTutorial: PlatformTutorialData = {
  slug: "descript-getting-started",
  platformSlug: "descript",
  title: "Getting Started with Descript",
  tagline: `Edit audio and video by editing the transcript — powerful, intuitive, and easier to misuse than it looks.`,
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-07-27",
  changelogUrl: "https://www.descript.com/release-notes",
  accessTier: "FREE",

  howItWorks: `Descript transcribes your recording and then lets you edit the media by editing the text. Delete a sentence from the transcript and it disappears from the audio and video. Rearrange a paragraph and the footage follows. For anything dialogue-driven — interviews, podcasts, talking-head video — this collapses a timeline-editing skill into a word-processing one. An AI assistant sits alongside it, capable of removing filler words, finding clips, and generating captions on request.`,

  whatItIs: [
    `An audio and video editor built around transcript editing rather than a timeline.`,
    `Aimed at spoken-word content — podcasts, interviews, tutorials — rather than at cinematic video work.`,
    `Metered on **two separate things at once**: how much media you bring in, and how much AI you use on it.`,
    `Distinct from voice-generation tools: this edits recordings of real people rather than synthesising new speech, though it can do both.`,
  ],

  beforeYouStart: [
    `The free plan gives about an hour of media a month, a one-time grant of AI credits, watermarked exports at 720p, and a single seat. It is a real trial, not a demo.`,
    `Paid plans start around $16 a month billed annually, with the tier above at about $24 adding higher-resolution export and fuller voice features. Monthly billing costs meaningfully more.`,
    `**Media minutes and AI credits are different meters.** Manual transcript cuts barely touch credits; leaning on the AI assistant exhausts them first. Which limit you hit depends on how you work, not how much you work.`,
    `This is a desktop application. There is no meaningful mobile editing.`,
    `Cloning a voice requires a recorded consent statement and a substantial audio sample, by design.`,
  ],

  security: [
    {
      kind: "text",
      text: `Voice cloning here is gated: creating a voice model requires recording a spoken consent statement plus a sizeable sample, which is a deliberate barrier against cloning someone who has not agreed. That gate is real and worth respecting rather than working around.`,
    },
    {
      kind: "text",
      text: `The more distinctive risk is one no consent gate addresses. **Transcript editing makes misrepresentation trivially easy.** Deleting one word from a guest's sentence — a "not", a qualifier, a hedge — changes what they said, and the edit is seamless and invisible in the finished audio. Nothing warns you, because the tool cannot tell a tightening edit from a distorting one.`,
    },
    {
      kind: "list",
      label: "Working with other people's recordings",
      items: [
        `Get consent to record before you record, and be explicit that the recording will be edited.`,
        `Draw your own line between removing filler and changing meaning, and hold it when a cut would be convenient.`,
        `Send the edit to the person for review when their words carry any weight — a claim, a commitment, an opinion attributed to them.`,
        `Treat voice cloning of anyone but yourself as needing express, specific permission, whatever the tool permits.`,
      ],
    },
    {
      kind: "text",
      text: `Recordings are processed in the cloud, so interviews containing confidential or personal material are leaving your machine. Worth deciding before you upload, not after.`,
    },
  ],

  triad: {
    bestAt: [
      `Cutting dialogue-driven audio and video quickly`,
      `Removing filler words and false starts in bulk`,
      `Producing transcripts, captions, and short clips from one recording`,
      `Making editing approachable for people who have never opened a timeline editor`,
    ],
    okayAt: [
      `Multi-camera and heavily layered video, which it handles but is not built for`,
      `Music and sound design, which are outside its focus`,
      `Collaborative editing, which works but is not its strength`,
    ],
    avoid: [
      `Colour grading, compositing, and finishing work — use a real video editor`,
      `Editing anyone else's words without a clear line on what you will and will not change`,
      `Heavy AI use on a small plan, where credits disappear faster than you expect`,
    ],
  },

  starterActions: [
    {
      title: "Edit something by deleting words",
      whyHere: `The core idea sounds abstract and becomes obvious the moment you do it once.`,
      tweak: `Use a recording of yourself. The first edits are always clumsy and you will not mind.`,
    },
    {
      title: "Remove filler words in one pass",
      whatItDoes: `Finds and strips hesitations across the whole recording at once.`,
      whyHere: `The single biggest time saving the tool offers, and the clearest demonstration of why transcript editing works.`,
      tweak: `Listen back afterwards. Removing every hesitation can make speech sound unnaturally clipped — put a few back.`,
    },
    {
      title: "Watch your two meters for one project",
      whyHere: `Discovering which limit you hit first tells you which plan you actually need, and prevents the bill surprise this platform is known for.`,
      tweak: `Do one project mostly manually and one mostly with the AI assistant. The difference in credit use is stark.`,
    },
    {
      title: "Set your own editing line before you edit a guest",
      whyHere: `Deciding what you will not change is much easier before you are staring at a cut that would make the episode better.`,
      tweak: `Write it down. "Filler and false starts yes, meaning no" is a rule you can actually apply under time pressure.`,
    },
  ],

  pitfalls: [
    `**Two meters, not one.** Media minutes and AI credits run out independently. Heavy AI users hit credits first; heavy importers hit minutes. Size your plan by which one you will exhaust.`,
    `**Seamless edits can change meaning.** Cutting one qualifier from someone's sentence is invisible in the output and misrepresents them. The tool will not warn you, so the judgement is entirely yours.`,
    `**Bill shock is the most common complaint.** Costs climb fast once a team exceeds included limits. Watch the meters during your first month rather than at the end of it.`,
    `**It is not a full video editor.** Colour work, compositing, and advanced effects belong elsewhere. Descript is for cutting dialogue, and it is excellent at that.`,
    `**Everything uploads.** Recordings are processed in the cloud. If an interview contains confidential material, that decision needs making before the upload, not after.`,
  ],

  whereToNext: [
    { label: "Voice and speech tools", categorySlug: "voice-speech" },
    { label: "Video creation and editing", categorySlug: "video-creation-editing" },
  ],
};
