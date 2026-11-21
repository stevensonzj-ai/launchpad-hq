# LaunchpadHQ

A curated AI-platform discovery site for beginners. Live at
[launchpadhq.io](https://www.launchpadhq.io).

> [!IMPORTANT]
> **New here? Read [`START-HERE.md`](START-HERE.md) before anything else — including
> this file and including the source.**
>
> The MCP connector section immediately below is the public description of the catalog
> connector. Everything after that section is the unmodified `create-next-app`
> boilerplate and carries no information about this project. `START-HERE.md` carries
> the onboarding: what the project is, which of its own documents are now false, the
> reasoning behind every hard rule, the current repository state, and how work gets
> done here.
>
> Then: [`CLAUDE.md`](CLAUDE.md) for conventions and coding rules,
> [`AGENTS.md`](AGENTS.md) for the Next.js 16 warning, and
> [`docs/history/`](docs/history/README.md) for the archived project record.

## MCP connector

A free, read-only MCP server for the Launchpad HQ AI-tools catalog. No auth required.

- **URL:** https://www.launchpadhq.io/mcp (streamable HTTP)
- **Registry name:** `io.launchpadhq/launchpad-hq`

Tools:

- `search_tools` — Finds AI tools for a task, optionally within a budget, skill level or platform. Returns catalog matches with dated, sourced free-tier facts. Items with `fallback: true` are popular tools, not direct matches; `stale: true` means the facts are over 90 days old.
- `compare` — Compares 2 to 4 specific AI tools side by side: plans, API pricing, usage limits and platforms, each with its own `as_of` date and source.
- `get_pricing_facts` — What one AI tool costs and what its free tier includes. Returns verified pricing facts first; catalog text only when no verified price exists, labeled `catalog_only`.
- `find_free_alternatives` — A free or freemium alternative to a specific AI tool. Verified free tiers rank first; catalog-only matches are labeled unverified.

Each tool call logs only a random request ID, the tool name, the result count, timing and success. It doesn't log your search text, the assistant app's name, IP addresses, headers, cookies or request bodies.

Results never include sponsor data, affiliate links or promo codes.

- [Privacy](https://www.launchpadhq.io/privacy)
- [Terms](https://www.launchpadhq.io/terms)
- [Support](https://www.launchpadhq.io/support)

Remote client config, no auth:

```json
{
  "mcpServers": {
    "launchpad-hq": {
      "url": "https://www.launchpadhq.io/mcp"
    }
  }
}
```

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

