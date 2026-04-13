export type TutorialSection = {
  heading: string;
  content: string;
  note?: string;
};

export type PlatformTutorialData = {
  slug: string;
  platformSlug: string;
  title: string;
  sections: TutorialSection[];
};

export const chatgptTutorial: PlatformTutorialData = {
  slug: "chatgpt-getting-started",
  platformSlug: "chatgpt",
  title: "Getting Started with ChatGPT",
  sections: [
    {
      heading: "Disclaimer",
      content:
        "This guide was created to help you get started with ChatGPT. Prices and features may change. Check openai.com for the latest information.",
    },
    {
      heading: "Create Your Account",
      content:
        "1. Go to chat.openai.com\n2. Click 'Sign Up'\n3. You can use email, Google, or Microsoft account\n4. Verify your email\n5. Start chatting!",
      note: "You don't need a phone number for the free tier",
    },
    {
      heading: "What Can ChatGPT Do?",
      content:
        "- Answer questions and explain concepts\n- Write, edit, and debug code\n- Summarize long texts\n- Brainstorm ideas\n- Translate languages\n- Create written content (emails, essays, stories)\n- Analyze data and documents\n- Generate images with DALL-E",
    },
    {
      heading: "Try These Prompts",
      content:
        "Here are some prompts to get started:\n\n• 'Explain quantum computing to a 10-year-old'\n• 'Write a professional email asking for a meeting'\n• 'Help me debug this code: [paste your code]'\n• 'Give me 5 recipe ideas using chicken and rice'\n• 'Summarize this article: [paste text]'",
    },
    {
      heading: "Strengths & Weaknesses",
      content:
        "Strengths:\n✓ Fast and responsive\n✓ Great for coding help\n✓ Good at explaining complex topics\n✓ Continuously improving\n\nWeaknesses:\n✗ Can hallucinate facts\n✗ Limited knowledge after cutoff date\n✗ May not understand context in long conversations\n✗ Can't browse live web (free tier)",
    },
    {
      heading: "Free Tier Limits",
      content:
        "ChatGPT Free includes:\n- GPT-4o mini (unlimited)\n- Limited GPT-4o access\n- 3 image generations per day\n- File uploads (PDFs, docs)\n- Web browsing\n- Canvas editor",
      note: "Limits may vary based on demand",
    },
    {
      heading: "What's Next?",
      content:
        "Once you're comfortable with ChatGPT, try:\n- Exploring GPT-4 (requires Plus: $20/month)\n- Using Custom Instructions for personalized responses\n- Trying the mobile app for on-the-go access",
    },
  ],
};
