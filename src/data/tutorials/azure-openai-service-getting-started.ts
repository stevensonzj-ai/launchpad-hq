import type { PlatformTutorialData } from "./types";

export const azureOpenaiServiceTutorial: PlatformTutorialData = {
  slug: "azure-openai-service-getting-started",
  platformSlug: "azure-openai-service",
  title: "Getting Started with Azure OpenAI Service",
  tagline:
    "OpenAI's GPT models, rented through a Microsoft Azure account — the enterprise route to the technology behind ChatGPT, with control over where your data gets processed.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-08",
  changelogUrl: "https://devblogs.microsoft.com/foundry/",
  accessTier: "FREE",

  howItWorks:
    "You sign in to Microsoft's Foundry portal with an Azure account, pick a **model** (the AI \"brain\" that does the actual thinking) from a catalogue, switch on your own copy of it, then type into a chat box and read the reply. Once it works there, your own program can send the same requests instead.",

  whatItIs: [
    "Azure OpenAI is how you use OpenAI's GPT models — the same family behind ChatGPT — as a service you rent through a Microsoft Azure account rather than buying from OpenAI directly. Same models, different landlord: the bill, the sign-in, the legal agreement and the support all run through Microsoft.",
    "**The name has moved twice, and old guides will confuse you.** Microsoft folded this into its Foundry platform and now sells it as \"Azure OpenAI in Foundry Models.\" The wider platform, called Azure AI Foundry until late 2025, is now Microsoft Foundry, and was Azure AI Studio before that. \"Azure OpenAI Service,\" \"Azure AI Foundry\" and \"Microsoft Foundry\" in a tutorial all point at this.",
    "**Who it is really for: people whose organisation already runs on Azure, or who need to be able to say where in the world their prompts get processed.** This is infrastructure, not a product you chat with. There is no consumer app — there is a portal, a test playground, and an **API** (a way for programs to talk to each other without a person clicking).",
  ],

  beforeYouStart: [
    "**There is no free tier, and that is the single most important thing to know before you sign up.** A new Azure account currently comes with around $200 of credit to spend in its first 30 days plus twelve months of free monthly amounts on a list of other Azure services — but the AI models are not on that list. Microsoft's own support guidance is that Foundry has no free option and bills from the first request once you are on pay-as-you-go. Signing up needs a card; Microsoft says that is a temporary $1 authorisation and that you are not charged unless you choose to move to pay-as-you-go.",
    "You need an Azure account, and to create a workspace inside it you need admin rights over that account. On a personal account you have them automatically. On an employer's account you often do not, and that — not any technical step — is where most people actually get stuck.",
    "Cost is measured in **tokens** (a chunk of text, roughly a short word — how AI usage gets counted), billed per million, priced separately for what you send and what comes back. Playground poking around costs pennies. The reliable way to sleep at night is to set a budget alert in Azure's cost management before you switch anything on, not after.",
    "Nothing to install — a browser and the portal at ai.azure.com. If all you want is to use OpenAI's models, ChatGPT or OpenAI's own developer platform will get you there in a fraction of the clicks.",
  ],

  security: [
    {
      kind: "text",
      text: "Microsoft's position here is unusually explicit, and it is the main reason organisations pick this route over going to OpenAI directly. Its documentation states that your prompts, your outputs, your embeddings and your training data are not available to OpenAI or other model providers, are not used by them to improve their models, and are not used to train foundation models without your instruction. The models themselves are described as stateless — nothing you send is stored inside the model.",
    },
    {
      kind: "list",
      label: "Two things that stay true anyway:",
      items: [
        "Prompts can still be stored and read by a person. Microsoft's abuse-monitoring system holds flagged data in a store kept separate per customer, which authorised Microsoft reviewers can open when the automated check spots a pattern. Only customers managed by a Microsoft account team can apply to have that storage and human review switched off.",
        "Where your prompts are processed is a setting you choose, not a given. If data residency is the reason you are here, that one dropdown is most of your answer.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Putting OpenAI's models inside an Azure account you already have",
      "Reaching models from other labs — Anthropic, Meta, Mistral, xAI, DeepSeek, Microsoft's own — out of the same catalogue",
    ],
    okayAt: [
      "Being anybody's first experience of AI. It is an enterprise console and behaves like one.",
    ],
    avoid: [
      "Reserved capacity while you are still experimenting. It bills hourly for the capacity you reserved whether or not you send a single request, and it cannot be paused — the billing stops only when you delete the deployment.",
      "Expecting to turn the safety filters off. They are applied by default to every deployment across hate, sexual, violence and self-harm categories.",
      "Treating it as a ChatGPT substitute. No consumer app, no chat history to come back to tomorrow, no mobile client — the playground is a test surface, not a place to live.",
    ],
  },

  starterActions: [
    {
      title: "Switch on one small model and chat with it in the playground",
      whatItDoes:
        "Creates a project, turns on your own named copy of a model, and opens a chat box against it — all in the browser, no code.",
      whyHere:
        "On OpenAI's own platform every model is simply there the moment you hold a key. Here a model does nothing until you switch on a copy of it and give that copy a name — and it is *that* name, not the model's name, that your code has to ask for afterwards. Doing it once by hand is the quickest way to understand why so many Azure error messages amount to \"no such model.\"",
      tweak:
        "Accept the default name the first time. Renaming it at this step is where most of the later confusion is born.",
    },
    {
      title: "Choose the deployment type on purpose rather than clicking past it",
      whatItDoes:
        "Makes you read the one dropdown that decides where in the world your prompt is processed.",
      whyHere:
        "This is the setting people come to Azure for. \"Global\" hands your request to whichever Azure region has room; \"Data Zone\" confines processing to the US, EU or Asia Pacific; \"Standard\" confines it to one Azure geography. OpenAI's own API gives you a single endpoint and no such choice at all. If residency is not a requirement for you, Global is the sensible default and the easiest to reason about — but choose it, don't inherit it.",
    },
    {
      title: "Find where the safety filter draws its line",
      whatItDoes:
        "Shows you what a blocked request looks like, on your terms, before a real user finds it for you.",
      whyHere:
        "Every deployment gets Microsoft's guardrails by default, and a blocked prompt comes back as an error rather than as a model politely declining. That is a different failure mode from a chatbot saying no, and it is the one that breaks applications written by people who never saw it in testing. You can tune the severity thresholds per category; removing the filters needs an approval only Microsoft-managed customers can request.",
      tweak:
        "Use clinical or news-report phrasing about violence or self-harm rather than anything genuinely unpleasant. The point is to see the shape of the error, not to test the limits.",
    },
    {
      title: "Look up the model's retirement date before you build anything on it",
      whatItDoes:
        "Finds, in Microsoft's published schedule, the date the model you just switched on stops answering.",
      whyHere:
        "Microsoft sets a retirement date automatically when a model launches — currently about eighteen months out — and publishes it, so the end of your model's life is knowable on day one. Standard deployments upgrade themselves to a replacement when that date arrives, unless you have set the version option to never auto-upgrade, in which case they simply stop working. OpenAI retires models too, but it does not hand you a per-deployment switch that decides whether your app quietly upgrades or quietly dies.",
      tweak:
        "Leave auto-upgrade on while you are learning. A model that improves under you is a far better surprise than one that stops answering.",
    },
  ],

  pitfalls: [
    "**Two portals wearing almost the same name.** ai.azure.com carries a \"New Foundry\" toggle, and Microsoft maintains a whole parallel set of documentation labelled \"Foundry (classic).\" A tutorial written for one will not match the screen in front of you if you are on the other. Check the toggle before concluding that a step has gone missing.",
    "**Hunting for a model that is not offered where you are.** Availability is per region and per model. Before deciding something is broken, check Microsoft's region availability list for the model you actually want.",
  ],

  whereToNext: [
    { label: "More AI APIs and developer services", categorySlug: "ai-apis-developer-services" },
    { label: "Text and conversational AI", categorySlug: "text-conversational-ai" },
  ],
};
