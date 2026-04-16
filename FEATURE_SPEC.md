# LaunchpadHQ - Complete Feature Specification

## Business Model
- **Pricing:** Single flat rate — /month
- **Trial:** 1 week free, then auto-charge
- **Tiers:** None — everyone gets same access
- **Stripe:** Wait to set up until site is ready (no test charges)

---

## Feature 1: User Auth (Clerk)
- Browse-first flow (no forced quiz)
- Enable email verification (built into Clerk)
- Store: email, name, phone (optional), quiz answers, favorites, preferences
- No reminder emails
- CAPTCHA + double opt-in for spam prevention
- Rate limiting: max 5 sign-ups per IP

---

## Feature 2: Platform Discovery + Mobile App Links
- Data source: Obsidian Mobile-Apps-Research + Downloads folder
- Import mobile app links to database
- Display: Android hyperlink + iOS hyperlink only
- Filter by \
has
mobile
app\ (already works)

---

## Feature 3: Tutorial Library
- Storage: File system (src/data/tutorials/)
- Template: Copy from ChatGPT tutorial
- Same format for all platforms
- Agent workflow: AI researches ? Zach reviews ? approved = posted

---

## Feature 4: Workflow Templates
- Location: Integrated into home/explore page
- We write them (AI can help generate)
- Start with 5-10 most common tasks
- Three-tier system: Optimal / Hybrid / Budget

---

## Feature 5: Subscription ( + Free Week)
- Collect: email, name, phone at sign-up
- Get card info upfront
- Inform: charged after 7 days, can cancel anytime
- Failed payment: lock out + email notification
- Wait on Stripe (set up later)

---

## Feature 6: Prompt Library (Per Platform)
- Fields: prompt text, output screenshot/video/link, author, rating
- Access: Logged-in users only (including free trial)
- No approval queue; takedowns as needed
- Disclaimer at top
- Sort: newest, oldest, highest rated

---

## Feature 7: Discussion Board (Per Platform)
- Format: Reddit-style threads
- Upvotes: Include if not too complex
- Access: Logged-in users only
- Sort: newest to oldest
- Moderation: Report button + auto-flag + moderator review
- Disclaimer at top

---

## Feature 8: \Get
Matched\ Quiz
- Questions: 
  1. What do you want to accomplish? (text, image, video, code, audio, research)
  2. What's your experience level? (beginner, intermediate, expert)
  3. What's your monthly budget? (free, under , under , +)
  4. Where should AI tools run? (online only, local only, don't care)
  5. What tasks do you need? (marketing, coding, content, education, business)
- Results: Stored in user preferences
- Can retake quiz (option to clear previous results)
- Shows list of recommended platforms + explanation
- Unlocks personalized \For
You\ page
- \Favorite\ platforms adds to \For
You\ page
- Newsletter based on \For
You\ page
- Can remove platforms from \For
You\ page

---

## Workflow Templates to Create (5-10)
1. Blog Post Generator
2. Image Generation
3. Voice Clone
4. Video Editing
5. Code Writing
6. Audio Transcription
7. Content Research
8. Social Media Posts
9. Email Writing
10. Presentation Creation

---

## Data Sources
- Platform data: Obsidian Launchpad-HQ/Research/
- Mobile apps: Obsidian Launchpad-HQ/Research/Mobile-Apps-Research.md + Downloads folder
- Tutorials: src/data/tutorials/ + Obsidian Launchpad-HQ/Tutorials/

---

## MVP Launch Must-Haves
1. User Auth (Clerk)
2. Platform discovery + search + filters
3. Mobile app links on platform pages
4. Tutorial library (at least core platforms)
5. Workflow templates
6. /month subscription logic
7. Prompt library (per platform)
8. Discussion board (per platform)
9. \Get
Matched\ quiz

---

## Future Features
- Subscription tracker with affiliate links
- Weekly news digest
- Team workspaces

