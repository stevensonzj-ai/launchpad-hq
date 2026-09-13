import type { PlatformTutorialData } from "./types";

export const microsoftDesignerTutorial: PlatformTutorialData = {
  slug: "microsoft-designer-getting-started",
  platformSlug: "microsoft-designer",
  title: "Getting Started with Microsoft Designer",
  tagline:
    "Describe a card, invitation or image in one sentence and get a finished design you can edit.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-13",
  accessTier: "FREE",

  howItWorks:
    "You sign in, type a description of the picture or card you want, and a few finished designs come back within seconds. Pick the one closest to what you meant, then drag, retype and recolour anything on it, or describe a change and let it redo that part. Download the result when it looks right.",

  whatItIs: [
    "Microsoft Designer is Microsoft's design app for people who are not designers: you describe something in ordinary words and it produces a finished-looking image, card, invitation or social post that you can then edit.",
    "It runs in a browser at designer.microsoft.com and as a phone app, and it signs in with the Microsoft account you may already have from Outlook.com, Xbox or a Windows PC.",
    "Compared with a general chatbot that also makes pictures, Designer hands back an editable layout — text boxes, shapes and photos you can move — rather than one flat image.",
  ],

  beforeYouStart: [
    "**The account is the real gate, not the money.** Designer needs a personal Microsoft account. Microsoft's support page says Designer is not available to enterprise users, so if the only Microsoft login you have is a work or school one, that is not the way in. First step: go to designer.microsoft.com and sign in with a personal account.",
    "It costs nothing to start and most people never pay. Every account gets a set of **credits** (the platform's unit of spend — each thing you make costs some) that refills at the start of each month, and Microsoft's plan page says one credit comes off each time you use an AI feature in Designer or Copilot. Microsoft no longer publishes how many credits a free account gets each month — its current plan tables describe usage in words like \"standard\" and \"extensive\" rather than in numbers — so expect a monthly allowance of unspecified size rather than a figure you can plan against. You would only pay if you run the balance flat regularly, and the paid route is a Microsoft 365 subscription — currently from around $10 a month — which raises the allowance rather than unlocking a different Designer.",
    "Microsoft's own pages disagree about that free tier, so be ready for it. Its Designer plan comparison shows a free column with monthly credits, and its Designer FAQ says plainly \"Designer is free to use. A subscription may be required for those who want to create more frequently\" — while the \"Welcome to Microsoft Designer\" support article says you will need a Microsoft 365 Personal or Family account. Nobody has reconciled the two; if you are bounced to an upgrade screen, that is why rather than a mistake on your part.",
    "The AI features are age-gated and the threshold differs by country. Microsoft's FAQ says a message that Designer, or one feature such as Upscale, \"isn't available for your account\" usually means you do not meet the age requirement for your region — not that anything is broken. Whether every AI feature is switched on in your country is not published in one place, so you may find something unavailable to you without a stated reason.",
  ],

  security: [
    {
      kind: "text",
      text: "Designer is a consumer Microsoft service, and its own terms are unusually blunt about what happens to what you type. Microsoft does not claim to own your **prompts** (the messages you type) or the things you make, but you grant it and its suppliers a licence to copy, distribute, display, edit, translate and reformat them \"in connection with the operation of their businesses\" — and the Designer FAQ says prompt data is collected both for abuse monitoring and to improve the service. Nothing sinister, but it is not a private sketchpad.",
    },
    {
      kind: "text",
      text: "Everything Designer's AI makes or edits leaves a mark you cannot see. Microsoft attaches Content Credentials — an invisible tag inside the image file recording that AI was involved — to images created with Designer's AI features, and anyone can read it on the Content Credentials site. That matters if you are posting somewhere that treats AI-made images differently; it travels with the file after you download it.",
    },
    {
      kind: "list",
      label: "Worth knowing before you upload a photo",
      items: [
        "Photos you upload are stored in your own OneDrive, not in a scratch folder that clears itself.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Turning one line of description into a finished design that already has a layout, fonts and colours chosen for you.",
      "Cleaning up a photo you already have — erasing an object out of it, blurring or removing the background, making a small image bigger without it going blurry.",
      "Personal one-offs where the blank page is the problem: a birthday card, a party invite, a sticker, a phone wallpaper.",
    ],
    okayAt: [
      "Getting readable words inside a generated picture. Microsoft's own documentation warns that text in a generated image \"may not be in the requested language or may have spelling errors\" — a real limit, not bad luck.",
      "Precise layout control — a simplified editor next to a full design program.",
    ],
    avoid: [
      "Anything connected to a business. The Designer consumer terms — the supplement to the Microsoft Services Agreement, effective 31 May 2024 and still the version served today — say your use of Designer is \"for personal use only and not for use in the course of trade or commerce.\" That rules out a shop logo, client work, or anything you sell, however personal it feels.",
      "Treating a Designer image as safely yours to publish widely. The same terms disclaim any warranty that what it generates does not infringe someone else's rights, tell you to consult a lawyer about how you intend to use it, and make you indemnify Microsoft — cover its costs — if a claim arrives.",
    ],
  },

  starterActions: [
    {
      title: "An invitation from one sentence",
      prompt:
        "Create a birthday party invitation for a 7-year-old who loves dinosaurs. Saturday 14 March, 2pm, at Riverside Park. RSVP to Sam by 7 March. Bright and friendly, not scary.",
      whyHere:
        "Designer's invitation feature is documented to take the occasion plus date, time, location and RSVP as separate details and return one to five vertical designs sized for sharing from a phone, so the event facts you type land as text in the design instead of as a description of one. Canva's equivalent starts you in a template you fill in yourself rather than generating the card from event details.",
      tweak:
        "Change only the last sentence — the style words — and generate again to see how much of the design they control.",
    },
    {
      title: "Press Enhance prompt before you press Generate",
      whatItDoes:
        "Type a short description of an image, then choose **Enhance prompt** instead of Generate. Designer rewrites your line into a longer, more detailed one and shows it to you; edit it, then generate.",
      whyHere:
        "Microsoft documents Enhance prompt as turning your description into \"a descriptive high-quality prompt\" that you can then edit, so you can see exactly which added words changed the picture. Canva's Magic Media gives you no comparable step that returns the expanded wording for editing.",
      tweak:
        "Delete half of what it added and regenerate — the fastest way to learn which words are doing work.",
    },
    {
      title: "Erase the thing you wish wasn't in the shot",
      whatItDoes:
        "Upload a photo, open the erase tool, click the object you want gone — or brush over the area by hand — then accept the result or start the selection over.",
      whyHere:
        "Having both selection modes on the same photo, plus a Start over that redoes only the selection, is what makes a bad first attempt cheap — and it runs on a free Microsoft account. Adobe Photoshop's generative fill needs a paid Creative Cloud plan.",
    },
    {
      title: "Ten photos, one described frame",
      whatItDoes:
        "Upload up to ten photos, type a theme into the Elements box — \"autumn leaves\", \"beach holiday\" — pick a style, and generate.",
      whyHere:
        "Microsoft documents the collage as coming back \"complete with a frame\" generated from the words you type, so the border is made for your set rather than chosen from a library. Canva's collage templates give you a fixed frame you drop photos into.",
      tweak:
        "Keep the photos and change only the Elements words to get a different set entirely.",
    },
    {
      title: "A thank-you card with the message already written",
      prompt:
        "A thank-you card for a neighbour who looked after our dog for a week. Warm and a bit funny, with a scruffy terrier on the front. Sign it from Priya and Tom.",
      whyHere:
        "Microsoft describes the greeting-card feature as producing an animated digital card — an AI-made image plus a written message inside, with the message text still editable afterwards — from a single description, so you get something you can send rather than an image you then have to write on.",
      tweak:
        "Edit the message text rather than regenerating — the wording is the part it gets wrong most often.",
    },
  ],

  pitfalls: [
    "Designer quietly shares your Microsoft storage in both directions. Designs save to the cloud automatically and the photos you upload count against the same allowance as your Outlook mail — currently 5 GB on a free account. Microsoft's own warning is that exceeding it can stop you saving files or sending and receiving email. Deleting a project inside Designer does not remove the photo you uploaded; that has to go from OneDrive.",
    "There is no recycle bin. Microsoft states plainly that a deleted Designer project cannot be recovered. Download anything you would be sorry to lose, the day you make it.",
    "Paying for a Family plan does not buy the family anything. Microsoft's plan documentation says AI benefits are available to the subscription owner only and cannot be shared — so the larger allowance follows one account, not the household.",
    "The counter is not where you would look for it. Microsoft points you to **Services & subscriptions** in your Microsoft account to see your credits and limits, so if generation stops and Designer does not tell you why, check there before assuming something is broken.",
    "Every interface step described here comes from Microsoft's published documentation rather than a session anyone watched, so a button may have moved or been renamed since it was written.",
  ],

  whereToNext: [
    { label: "Image generators", categorySlug: "image-generation-editing" },
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
  ],
};
