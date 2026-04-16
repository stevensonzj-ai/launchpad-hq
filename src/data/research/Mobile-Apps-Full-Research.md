# Mobile apps research (Launchpad HQ)

Canonical source in Obsidian (when available):

`ObsidianVault/02-Projects/Launchpad-HQ/Research/Mobile-Apps-Full-Research.md`

This file is the **in-repo snapshot** of curated store links and mobile flags. The database is updated by running:

```bash
npm run db:update-mobile
```

The authoritative slug → URL mappings live in `scripts/update-platform-mobile-fields.ts` (`RESEARCH_UPDATES`). Edit that array, then run the script against your `DATABASE_URL`.

## Summary

- **`hasMobileApp`**: Native iOS and/or Android app listed in App Store / Play Store.
- **`iosAppUrl` / `androidAppUrl`**: Direct store URLs (nullable when only one platform exists).
- **`mobileWebFriendly`**: Usable in mobile browsers; CLI-only tools are marked `false`.

## Platforms with native apps (snapshot)

See `RESEARCH_UPDATES` in `scripts/update-platform-mobile-fields.ts` for the full list (ChatGPT, Claude, Gemini, Perplexity, Copilot, Grok, Le Chat, NotebookLM, Grammarly, Suno, Canva, Firefly, Leonardo, Ideogram, Microsoft Designer, Recraft, Runway, HeyGen, InVideo, Luma, ElevenLabs, Udio, Mubert, Replit, Lovable, v0, Notion, Make, Power Automate, and others).

Platforms explicitly **without** a native app in research (examples): Midjourney, Pika, Cursor, Claude Code, GitHub Copilot, Zapier, n8n.
