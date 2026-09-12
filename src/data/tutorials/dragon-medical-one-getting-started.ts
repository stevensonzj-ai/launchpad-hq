import type { PlatformTutorialData } from "./types";

export const dragonMedicalOneTutorial: PlatformTutorialData = {
  slug: "dragon-medical-one-getting-started",
  platformSlug: "dragon-medical-one",
  title: "Getting Started with Dragon Medical One",
  tagline:
    "Speak your clinical notes straight into the patient record — a Windows app your employer licenses for you, not one you can sign up for.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-12",
  accessTier: "FREE",

  howItWorks:
    "You sit at your work computer with the patient record open, put the cursor where the text should go, switch the microphone on, and talk. The words appear as you speak. You say a short command to fix anything wrong, then switch the microphone off.",

  whatItIs: [
    "Dragon Medical One turns speech into typed text inside the software a hospital keeps its patient records in, and steers the screen with spoken commands.",
    "The ownership moved and the name hasn't caught up. Nuance built it; Microsoft bought Nuance, so the product page now sits on microsoft.com under Microsoft's health solutions — old nuance.com links redirect there — while downloads and support stay on nuance.com addresses carrying a 2026 Nuance copyright. Microsoft also sells a newer, separate product called **Dragon Copilot** and points Dragon Medical One customers towards it; the two are not the same thing.",
    "Nobody outside a subscribing organisation can open the app to check. Everything here about buttons, commands and screens comes from Microsoft's and Nuance's own user guides and admin documentation — the vendor's description, not a walkthrough by someone who used it.",
  ],

  beforeYouStart: [
    "**Your employer buys this; you can't.** Microsoft's product page carries no price and no trial — the main button reads \"Buy additional licenses\", the other route is \"contact us\". An administrator creates your account in the console Microsoft calls Nuance Management Center and assigns your licence. So the first step is asking your IT team whether your organisation has a seat free.",
    "Because it is quoted rather than listed, there is no honest sticker price. For scale only: one reseller's UK public-sector procurement listing advertises it at around £25–50 per licence a month — the reseller's figure, not Microsoft's, and normally none of it comes out of your pocket.",
    "It is a Windows program: Microsoft's requirements page lists Windows 10, Windows 11 and Windows Server, and names no Mac or iPad version. Your phone can stand in as the wireless microphone through a companion app called PowerMic Mobile, but recognition still happens on a Windows PC.",
    "It types into named systems, not anywhere: Epic (including Haiku, Canto and Rover), Oracle Cerner PowerChart Touch, MEDITECH Expanse and MConnect, plus athenaClinicals and Allscripts on the vendor's version-comparison page, alongside Word, Outlook and Edge. Ask about anything outside that list before your organisation signs.",
    "Not a clinician whose employer will license this? The dictation tools in our voice and speech section (Otter is the usual start) do the same job, minus the clinical vocabulary and record-system integration.",
  ],

  gettingSetUpSafely: {
    officialSource:
      "Your IT team installs it. If you are fetching it, the installers live on the vendor's resource centre at dragonmedicalone.nuance.com — still a Nuance-branded address in September 2026, though the product pages moved to microsoft.com. Take it from nowhere else.",
    body: [
      "The installer expects an organisation token — a code the vendor says arrives \"in your Welcome Kit email\" when an organisation buys licences. Without it there is nothing to install into.",
      "Check the version. The resource centre currently offers build 2026.3, and states that version 2021.4.5 or earlier \"will be end of life and no longer function after December 31, 2026\".",
      "The vendor's download page warns that \"depending on your security settings, Windows might mark downloaded files as unsafe and prevent the installer from running\" — normal here.",
      "Your \"it worked\" checkpoint: sign in, choose your microphone, put the cursor in a note and watch your words appear. A floating box instead means it didn't recognise the field — covered below.",
    ],
    vendorDocsUrl: "https://dragonmedicalone.nuance.com/StandAlone/dragonmedicalone",
  },

  security: [
    {
      kind: "text",
      text: "The privacy question isn't really about you: what you dictate is someone else's medical record, under an agreement between your employer and Microsoft. That binding paperwork is not currently public.",
    },
    {
      kind: "list",
      label: "What the vendor publishes, and what it doesn't",
      items: [
        "Microsoft's healthcare compliance page, updated 20 July 2026, says a HIPAA (America's patient-privacy law) business-associate agreement is included by default in its online services terms for covered customers. Its product list names neither Dragon Medical One nor Dragon Copilot — a general Microsoft position, not confirmation this product is covered.",
        "The subscription agreement Nuance published for the marketplace edition of Dragon Medical One no longer loads: as of 11 September 2026 its address redirects to Microsoft's healthcare homepage, so the terms in force could not be read.",
        "The published data figures belong to Dragon Copilot, not this product. Its FAQ, updated 27 July 2026, says audio, recognised text and transcripts are kept up to 90 days, encrypted in transit and at rest, and \"deidentified or pseudonymized for AI model improvement\". No equivalent page for Dragon Medical One could be found, so don't assume those numbers carry across.",
      ],
    },
    {
      kind: "text",
      text: "The one piece you control is the microphone. Microsoft's guidance says to switch it off as soon as you've finished so the app doesn't \"capture extraneous dictation\" — worth more than it sounds with the patient still in front of you.",
    },
  ],

  triad: {
    bestAt: [
      "Long stretches of free text, landing where you put them rather than following your mouse — the docs call that anchoring your speech focus",
      "Words general dictation tools mangle: drug names, procedures, local abbreviations",
      "Starting without homework — Microsoft's product page says no voice-profile training is required and that it calibrates audio and detects accents automatically",
    ],
    okayAt: [
      "Ordinary non-clinical writing. The comparison page shows it in Word, Outlook and Edge, so it will take a letter — an expensive way to write one",
      "Any particular voice. The \"no training required, accents detected automatically\" claim is the vendor's; how it holds for your accent and your room is something only using it answers",
    ],
    avoid: [
      "Expecting it to sit in on the appointment and write the note. Dragon Medical One types what you dictate; the listen-and-draft product is Dragon Copilot, sold separately",
      "A cheap headset. The vendor specifies audio at 16 kHz, 16-bit mono and publishes a list of tested microphones; a bad one is the commonest reason recognition feels worse than advertised",
      "Assuming any text box will take dictation — the vendor publishes a named list of supported editors and record-system clients",
    ],
  },

  starterActions: [
    {
      title: "Say the punctuation out loud",
      whatItDoes:
        "Dictate the marks as part of the sentence — \"period\", \"comma\", \"new paragraph\", \"new line\". Microsoft's guidance: speak \"clearly and naturally as if you were speaking to someone in person\", in \"complete thoughts or sentences\", and \"dictate with punctuation\".",
      whyHere:
        "A pause is what separates text from commands: the vendor says to \"pause briefly before and after saying a command so Dragon Medical One knows that you are not dictating text\".",
      tweak:
        "Pause briefly **after** switching the microphone on and **before** switching it off — the vendor says this stops the first and last few words being clipped.",
    },
    {
      title: "Fix a mis-heard word without touching the mouse",
      whatItDoes:
        "Correct by voice: \"select [the word]\" and \"select [word] through [word]\" highlight, \"scratch that\" or \"delete that\" remove what you just said, \"undo that\" and \"redo that\" step back and forward, \"cap that\" and \"all caps that\" fix capitalisation.",
      whyHere:
        "Reaching for the mouse to fix one word gives back the time dictation saved. The docs pair this with \"Anchor Speech Focus\", which holds your text in the field you chose even when the screen moves.",
      tweak:
        "Say \"what can I say\" — the vendor's help article describes that opening a searchable list of commands grouped by what they do.",
    },
    {
      title: "Teach it the words it keeps getting wrong",
      whatItDoes:
        "Say \"add that to vocabulary\" with the word selected, or \"manage vocabulary\", to open the Add word window. The vendor's quick reference notes you don't need to press the talk button on a PowerMic to train a word.",
      whyHere:
        "The words it fumbles are the ones your specialty uses daily and nobody else uses at all. Vocabulary also lives at organisation level: the admin documentation describes managing it centrally, so a word can be added once for a whole group.",
    },
    {
      title: "Turn the paragraph you retype daily into a spoken shortcut",
      whatItDoes:
        "Highlight text you've just dictated and say \"make that an auto-text\" to save it as a reusable block; \"manage auto-texts\" shows what you've got. Blocks can hold blanks marked with square brackets, and \"next field\" moves between them.",
      whyHere:
        "A keyboard macro drops a block and abandons you in it; here one spoken phrase drops the block and a second walks you through the gaps. The admin docs also describe defining blocks for a whole group.",
      tweak:
        "The bracket characters are a setting — the vendor lists square brackets as the default and says the delimiters can be changed.",
    },
    {
      title: "Know what to do when your words won't go in",
      whatItDoes:
        "When the cursor isn't in a field it recognises, the vendor says a dictation box opens on its own. Dictate into it, correct it there, then say \"transfer text\" to push the text where your cursor is; \"recall text\" brings it back if it landed wrong, \"discard text\" throws it away, and \"open dictation box\" opens it deliberately.",
      whyHere:
        "It is the documented escape hatch for every screen outside the supported list, and knowing it is a designed fallback rather than a fault beats any individual command on day one.",
      tweak:
        "The transfer runs on a keystroke: the vendor names `Shift + Insert` as the default and says the method can be changed.",
    },
  ],

  pitfalls: [
    "Losing text to another window. It goes wherever the cursor is, so a notification that moves focus mid-sentence sends the rest of a paragraph somewhere you'll have to find.",
    "Chasing help on the wrong site. Support articles sit on support.microsoft.com, admin and deployment documentation on learn.microsoft.com, and installers and version notices on a nuance.com resource centre — knowing which of the three you want saves an annoying half-hour.",
  ],

  whereToNext: [
    { label: "Dictation tools you can sign up for yourself", categorySlug: "voice-speech" },
    { label: "Apps that record and write up meetings", categorySlug: "meetings-notes" },
    { label: "Healthcare AI", categorySlug: "healthcare-ai" },
  ],
};
