import type { PlatformTutorialData } from "./types";

export const murfAiTutorial: PlatformTutorialData = {
  slug: "murf-ai-getting-started",
  platformSlug: "murf-ai",
  title: "Getting Started with Murf AI",
  tagline:
    "Turning a written script into a finished voiceover — and what it actually costs to keep one.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-17",
  accessTier: "PREMIUM",

  howItWorks:
    "You open a project in your browser, type or paste your script into a text editor that splits it into paragraph-sized blocks, pick a voice from a list and press play. Murf reads it back in seconds. You then adjust the wording, the voice, the speed or the pauses and play it again until the read sounds right.",

  whatItIs: [
    "Murf AI is a browser-based text-to-speech studio: you give it written words, it gives you back a recorded-sounding voice reading them aloud. It is made by Murf Inc., a San Francisco company that has run the product since 2020.",
    "It is aimed at people producing narration in volume — e-learning modules, explainer videos, YouTube scripts, product demos, phone-system greetings — rather than at one-off novelty clips. The editor also carries a timeline for images and video, so a narrated video can be assembled without leaving it.",
    "Murf currently advertises somewhere between 200 and 300 voices across roughly 30-plus languages and accents. Its own pages give different counts in different places, so treat the headline number as approximate and check the voice list for the specific language you need before you commit.",
  ],

  beforeYouStart: [
    "Signing up is free and needs no card. You get a one-time allowance of 10 minutes of voice generation plus 10 minutes of transcription. It has no expiry date — it simply ends when those minutes are used up, and Murf describes it as a one-time credit rather than something that refills monthly.",
    "**The free plan cannot download anything.** Murf's own help centre states that exporting is available on paid plans only, and its pricing table marks the free plan \"No Commercial Rights\". You can listen, share a preview link and embed the result on a page; you cannot save the audio file. So yes — you will need to pay to keep what you make. Creator currently runs about $19 a month when billed annually (around $228 for the year) and Business about $66 a month annually (around $792). Murf advertises roughly a third off for paying yearly, so paying month to month costs meaningfully more; the exact monthly figures only appear once you flip the toggle on its pricing page.",
    "Paid allowances are measured in Voice Generation Time — Murf's credits (the platform's unit of spend), counted in minutes of finished audio rather than words typed. Murf sells it by the year: Creator currently includes about 24 hours annually, Business about 96. As a rule of thumb Murf publishes, a 1,000-word English script uses roughly six minutes.",
    "Voice cloning — making a synthetic copy of one specific real person's voice — is not part of what you can buy here. Murf's help centre says cloning is available only on its Enterprise plan and is \"not a self-serve solution\": you arrange it through their sales team. It currently covers English, Spanish, Portuguese, French and German.",
    "Everything runs in the browser. There is nothing to install, though Murf offers optional add-ons for Canva, PowerPoint and Google Slides on paid tiers.",
  ],

  security: [
    {
      kind: "text",
      text: "Murf is a cloud service: your script, any audio you upload and everything it generates sit on Murf's servers. On the reassuring side, Murf says it keeps all customer data in the United States (Amazon's Ohio region), encrypts it at rest, and holds SOC 2 Type II (an audit of how a company handles customer data) along with ISO 27001 and ISO 42001 certifications.",
    },
    {
      kind: "text",
      text: "The detail worth noticing is on the price list rather than the security page: Murf's plan-comparison table lists \"No Training on your Data\" as an Enterprise-tier feature. Murf's published privacy policy does not say either way what happens on the cheaper plans, so it is safest to assume scripts you paste on a Free, Creator or Business account may be used to improve Murf's systems. Keep unreleased, confidential or client-owned material out until you have asked them directly.",
    },
    {
      kind: "list",
      label: "If you ever go as far as cloning a voice",
      items: [
        "Murf's terms require explicit written consent from the person whose voice it is — submitting someone's recordings without it is prohibited outright, not merely discouraged",
        "The same terms say Murf staff, service providers and affiliates may listen to your training audio and your synthesised audio to check quality",
        "They also reserve the right to have the cloned voice speak a set of non-defamatory test phrases internally for quality assurance",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Long narration read straight through — e-learning modules, explainer videos, audiobook-style reads — where one voice carries many paragraphs",
      "Turning a script you have already written into audio without booking a recording session or re-reading it yourself",
      "Trying the same paragraph in a dozen different voices before committing to one",
      "Scripts with more than one speaker, where each paragraph is assigned its own voice",
      "Laying a voiceover over your images and video inside a single editor, rather than exporting audio and importing it somewhere else",
    ],
    okayAt: [
      "Emotional or performed delivery — the controls over emphasis and pacing are real, but you are steering a read rather than directing an actor",
      "Languages other than English: Murf lists 30-plus languages and accents, but how many voices exist per language is uneven, so check yours specifically",
      "Very short social clips — the project-and-blocks structure is built for scripts, and is more machinery than a fifteen-second hook needs",
    ],
    avoid: [
      "Cloning a real person's voice on a whim. Murf's terms require that person's explicit **written** consent before you upload a single recording, and in any case cloning is Enterprise-only and arranged through sales — it is not a button you will find.",
      "Anchoring a long-running series to one particular voice with no fallback. Murf's voices are licensed from real voice actors, and when an actor ends the collaboration Murf retires that voice from the Studio. You get notice, but not on your schedule.",
      "Feeding Murf-generated audio into another AI system as training material, or reselling access to the voices themselves. Murf's terms forbid both by name, separately from the ordinary commercial licence.",
    ],
  },

  starterActions: [
    {
      title: "Hear the same paragraph in a dozen voices",
      prompt:
        "Every product has a story, but most of them are told badly. The trick is not to say more. It is to say less, and to mean it. Start with the one thing your customer cannot stop thinking about, and build outward from there.",
      whyHere:
        "Paste it into a new project's script box, press play, then keep swapping the voice on the same text and playing again. Murf charges you by the length of audio it generates, and its documentation says that changing the voice actor, style, pitch, speed, pause, emphasis, pronunciation or volume on text it has already rendered consumes no further voice generation time — so the twelfth voice you audition costs the same as the first, which is nothing.",
      tweak:
        "Paste a paragraph of your own writing instead — you are listening for whether the voice suits **your** rhythm, not Murf's demo copy.",
    },
    {
      title: "Give a two-person script two voices",
      prompt:
        "So what changed? Six months ago you said this was impossible.\n\nIt was impossible the way we were doing it. We stopped trying to fix the old process and threw it out instead.\n\nThat sounds expensive.\n\nIt was. It was also the only thing that worked.",
      whyHere:
        "Paste it in, accept the split-by-paragraph option Murf offers, then assign a different voice to alternating blocks. When you paste, Murf shows a split screen that turns each paragraph into a block and optionally each sentence into a sub-block, and voice selection is per block rather than per project — so a two-hander is a paste-and-assign job rather than two separate renders you stitch together afterwards.",
      tweak:
        "Tick \"Don't Split Sentences\" if you want each speaker's lines to flow as one continuous take instead of sentence by sentence.",
    },
    {
      title: "Work out whether your script fits before you type it",
      whatItDoes:
        "Count the words in the script you actually want to make, divide by 1,000, and multiply by six. That is roughly how many minutes it will cost.",
      whyHere:
        "Murf publishes an explicit conversion — about six minutes of voice generation time per 1,000 English words — which means you can decide **before** opening an account whether your real project fits inside the one-time 10-minute allowance or blows straight through it.",
      tweak:
        "Add a margin. The figure covers a clean first render, not the re-renders you will do after rewriting a sentence.",
    },
    {
      title: "Teach it a name it keeps getting wrong",
      prompt:
        "Welcome to the Q3 review from Aoife, Nguyen and Sioban at NCAA headquarters. Our EBITDA rose 14% year over year, and the Reuters piece on Worcestershire was, frankly, premature.",
      whyHere:
        "Render it, listen for what it mangles, then use the pronunciation control to correct each word. Corrections you make go into a pronunciation library that Murf's comparison table marks as available from the cheapest paid tier upward, scoped to your own account — so a surname or acronym you fix once carries into your next project instead of being retyped every time.",
      tweak:
        "Front-load it with the names, brands and jargon from your actual work. This is the test that tells you whether Murf can handle your vocabulary.",
    },
    {
      title: "Get something out of a free account without paying",
      whatItDoes:
        "Once you have a render you like, skip the download button and use Share project preview or Create Embed link instead.",
      whyHere:
        "Murf's own free-trial feature list includes preview sharing and embed links alongside the note that downloads are not included — so on a free account the work leaves as a link someone can play in a browser, not as a file you own. It is enough to show a colleague or a client and ask whether the voice is right before anyone spends money.",
      tweak:
        "Send the link, not a description. The whole question a voice sample answers is whether it sounds right, and no amount of describing it settles that.",
    },
  ],

  pitfalls: [
    "**Re-rendering costs again.** Voice generation time is deducted every time Murf produces audio for a sentence, so each round of rewriting and replaying a line spends the allowance a second and third time. Editing a script you have already rendered costs more minutes than the word count alone suggests.",
    "**Unused time is more fragile than it looks.** Murf carries leftover time forward exactly one billing cycle — carried-over time that goes unused in the second cycle disappears rather than accumulating. Cancelling the subscription forfeits it outright, though pausing keeps it.",
    "**Murf's own background music can get your video flagged on YouTube.** Murf's soundtrack library triggers YouTube's automatic copyright matching, sometimes with a revenue-sharing notice attached. Murf issues \"YouTube codes\" you add to your channel to clear these, but it is a step you have to know about before you publish, not after.",
    "**The refund window is genuinely narrow.** Murf's terms make a purchase refundable only if it was bought within the last 24 hours **and** you have used under 10 minutes of voice generation. Past either line, the money is spent.",
    "**The cheapest paid plan does not include the delivery controls the demos show off.** Murf's comparison table marks Emphasis, Variability and \"Say It My Way\" as Business tier and above, while the Creator tier gets pronunciation editing but not those. If fine-grained control over how a line lands is what sold you, check which tier the demo was running on.",
  ],

  whereToNext: [
    { label: "Other voice and speech tools", categorySlug: "voice-speech" },
    { label: "Video creation and editing", categorySlug: "video-creation-editing" },
    { label: "Education and learning AI", categorySlug: "education-learning-ai" },
  ],
};
