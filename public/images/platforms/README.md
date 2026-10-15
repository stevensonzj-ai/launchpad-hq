# Platform logo provenance

Fetched from official vendor sites on 2026-10-15. These are original files, not generated approximations. Their colors and shapes are unmodified; the UI provides a neutral container.

| File | Official source | Discovery |
| --- | --- | --- |
| claude.png | https://assets.claude.com/95a868946ac8a31e5ff832e2899f294aa368b836.png?w=128&h=128 | Icon link on https://claude.com/product/overview (redirected from https://www.anthropic.com/claude) |
| anthropic.ico | https://www.anthropic.com/favicon.ico | Company favicon |
| perplexity.svg | https://www.perplexity.ai/favicon.svg | Icon link on vendor homepage |
| canva.ico | https://www.canva.com/favicon.ico | Icon link on vendor response |
| ollama.png | https://ollama.com/public/ollama-nav.png | Navigation logo on vendor homepage |

The logo component prefers these local assets, then an existing HTTPS `Platform.logoUrl`, then a neutral initial. A failed image switches to the initial. Logos do not imply endorsement.

## Expanded catalog coverage

`catalog-logos.json` records each additional catalog slug, file, vendor website, and exact downloaded source URL (2026-10-15). PNG assets were resized to fit 96px without recoloring; ICO assets retain their original bytes. Assets were obtained from icon links on catalog vendor websites or their favicon endpoint. OpenAI entries use the official OpenAI organization mark, explicitly identified in the manifest; it is not a product-specific icon. Generic GitHub hosting icons were discarded for open-source projects because they do not identify those projects.

`src/lib/platform-logo-assets.json` is the small runtime slug-to-file index; the source/provenance manifest is not bundled into the client component. Existing hand-verified Claude, Canva, Perplexity, and Ollama assets take precedence. Runway for Education uses the same official Runway mark. Coverage remains incomplete; initials remain where no suitable icon was obtained. Asset retrieval does not verify current catalog facts or editorial claims.
