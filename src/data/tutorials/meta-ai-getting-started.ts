import type { PlatformTutorialData } from "./types";

export const metaAiTutorial: PlatformTutorialData = {
  slug: "meta-ai-getting-started",
  platformSlug: "meta-ai",
  title: "Getting Started with Meta AI",
  tagline:
    "The free AI assistant already sitting inside WhatsApp, Instagram, Messenger and Facebook, plus its own app and website.",
  archetype: "prompts",
  lastReviewedAt: "2026-10-15",
  accessTier: "FREE",

  howItWorks:
    "You open a chat with Meta AI, either in its own app, at meta.ai, or inside an app you already use, and type a message (this is your **prompt** — the message you type). It answers in plain language, and you reply to steer it: shorter, different, try again.",

  whatItIs: [
    "Meta AI is the AI assistant made by Meta, the company behind Facebook, Instagram, WhatsApp and Messenger. It answers questions, writes and rewrites text, makes and edits images, and can look at a photo you show it.",
    "What sets it apart is where it lives. Besides its own app (iPhone, Android, and a Mac version in beta) and the website at meta.ai, it is built into the search bars and chats of Meta's own apps, and it is the assistant inside Meta's AI glasses. If you already use WhatsApp or Instagram, you may have Meta AI on your phone without ever installing anything.",
    "The **model** (the AI \"brain\" that does the actual thinking) behind it is called Muse Spark, built by Meta's own lab.",
    "Its other difference is that it is wired into Meta's social world: Meta describes it searching Facebook Marketplace listings near you when you shop, and surfacing public posts from locals about a place. That is useful, and it is also why the privacy section below matters more here than on most chatbots.",
  ],

  beforeYouStart: [
    "It is free. Meta's own page says Meta AI is free for everyday use, that it is testing usage limits, and that a paid subscription gives you more.",
    "You can start in two places, and which one you pick decides which account it's tied to. Inside WhatsApp, Instagram, Messenger or Facebook, Meta AI uses the account you are already signed in to. For the standalone app or meta.ai, you sign in when you open it; Meta's public pages we could read don't spell out whether that requires a Facebook or Instagram account, so check the sign-in screen for your options.",
    "If your Facebook and Instagram accounts are linked in Meta's account settings, Meta AI can draw on both, including your profile details and what you engage with, to tailor its answers. Meta says these personalized answers are currently available only in the US and Canada.",
    "Features roll out unevenly. Meta's announcements repeatedly say new abilities start in the US and reach \"more countries\" later, and the app listing warns some features are limited to certain countries and languages, so a feature you read about may not be on your phone yet.",
    "If you own Meta's AI glasses, the Meta AI app is also their required companion app, so you may already have it installed for that reason.",
  ],

  security: [
    {
      kind: "text",
      text: "Meta AI is built by an advertising company, and it says so. Since 16 December 2025, in what Meta calls \"most regions\", Meta uses your conversations with its AI features to personalize the posts, reels and ads you see across its apps: chat about hiking and you may be shown hiking groups and hiking-boot ads (Meta newsroom, announced 1 October 2025). Meta's announcement describes no switch to turn this off, only your usual ads and feed preferences. Meta also lists 'people's interactions with AI at Meta features' among the data it uses to train its AI (Meta Transparency Center, seen 2026-10-15).",
    },
    {
      kind: "list",
      label: "What Meta says limits this:",
      items: [
        "Conversations about religion, sexual orientation, politics, health, racial or ethnic origin, philosophical beliefs or trade-union membership are not used to show you ads, per the same October 2025 announcement. They are not excluded from everything else.",
        "Your accounts only share this with each other if they are linked in Meta's account settings. Meta's example: a WhatsApp account you have not linked won't feed your Facebook or Instagram experience.",
        "Incognito Chat, announced 13 May 2026 for WhatsApp and the Meta AI app and rolling out over the coming months, is a private mode Meta says it cannot see, where conversations are not saved and messages disappear by default. If you have it, use it for anything personal.",
      ],
    },
    {
      kind: "list",
      label: "Never paste in:",
      items: [
        "Passwords, card or bank numbers, ID numbers",
        "Health details or anything you would not want shaping the ads you see",
        "Other people's private information, including screenshots of group chats",
      ],
    },
    {
      kind: "text",
      text: "And watch the Share button. The app has a public Discover feed of other people's AI chats. Meta says nothing goes there unless you choose to post it, so read what you are sharing before you tap it.",
    },
  ],

  triad: {
    bestAt: [
      "Quick questions and writing help in the middle of a chat you are already having in WhatsApp or Messenger, without switching apps.",
      "Local and shopping questions, where it can pull in Facebook Marketplace listings and public posts from people near a place.",
      "Making and editing images from a description.",
      "Looking at something through your camera or a photo and telling you what it is.",
    ],
    okayAt: [
      "Long, careful reasoning. There is a slower Thinking mode for harder questions; use it, and still check the answer.",
      "Anything that depends on a feature you read about in the news; it may not have reached you yet.",
    ],
    avoid: [
      "Anything you would not want feeding the ads in your Facebook and Instagram feed; the privacy section explains why.",
      "Treating a group-chat answer as private. Mentioning Meta AI inside a WhatsApp group puts the question and its answer in front of everyone in that chat.",
      "Assuming 'free' means unlimited. The usage limits Meta is testing are not published.",
    ],
  },

  starterActions: [
    {
      title: "The local scout",
      prompt:
        "I'm visiting [neighbourhood or town] this Saturday with two kids under 10. What are three things to do there, what are local people saying about them right now, and what should I skip?",
      whyHere:
        "Meta says Meta AI can search public posts from locals about a place, alongside the wider web. ChatGPT can search the web too, but it has no access to Facebook and Instagram posts, so the 'what are people saying' half of this answer is Meta's own.",
      tweak: "Swap the kids for a budget, a dog, or 'rainy day'.",
    },
    {
      title: "The Marketplace shopper",
      prompt:
        "Help me find a used [bike / desk / stroller] near me for under $[amount]. Show me a few options and tell me what to check before I buy one secondhand.",
      whyHere:
        "Meta describes a shopping mode that searches Facebook Marketplace listings near you, with a map and filters for price and distance. No other assistant on this site searches Marketplace.",
      tweak:
        "If you don't see listings in the answer, that feature may not have reached your country or account yet.",
    },
    {
      title: "What is this?",
      prompt:
        "What is this, and is it safe to [eat / touch / leave in the garden]? Tell me how sure you are.",
      whyHere:
        "Point the camera or attach a photo first, then send this. Meta's own example is comparing snack labels from a photo. The 'how sure are you' line is the important part: it makes the assistant tell you when it's guessing.",
      tweak:
        "Works for a plant, a strange error message on a screen, or a label in another language.",
    },
    {
      title: "The group-chat helper",
      prompt:
        "@Meta AI suggest three dinner places within 15 minutes of [area] that can take a group of 8 on Friday, with a rough price for each.",
      whyHere:
        "Meta says Meta AI is coming into group chats in its apps; where it is switched on in WhatsApp, you call it in by mentioning it, and the whole group sees the answer. ChatGPT can't join a WhatsApp group chat that way.",
      tweak:
        "Use it to settle a trivia argument, or to turn a long thread of suggestions into one list.",
    },
  ],

  pitfalls: [
    "**Taking the first answer.** Reply with 'shorter', 'friendlier', or 'you missed X'. The second and third tries are usually where it gets good.",
    "**Forgetting which account you're in.** Because each place uses its own sign-in, a chat you had in one may not be in another.",
    "**Thinking a chat is private because you're in a messaging app.** WhatsApp is known for keeping personal chats private, but talking to Meta AI is talking to Meta.",
    "**Confident answers about the local world.** Public posts from locals can be out of date or wrong, and it can mix them into an answer that sounds certain. Check opening hours and prices yourself.",
  ],

  whereToNext: [
    { label: "More AI chatbots", categorySlug: "text-conversational-ai" },
    { label: "Image generators", categorySlug: "image-generation-editing" },
    { label: "Research tools", categorySlug: "research-academic-tools" },
  ],
};
