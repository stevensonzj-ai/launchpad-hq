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

`catalog-logos.json` records each additional catalog slug, file, vendor website, and exact downloaded source URL (2026-10-15). Initial PNG assets were resized to fit 96px without recoloring; ICO assets retain their original bytes. Assets were obtained from icon links on catalog vendor websites or their favicon endpoint. OpenAI entries use the official OpenAI organization mark, explicitly identified in the manifest; it is not a product-specific icon. Generic GitHub hosting icons were discarded for open-source projects because they do not identify those projects.

`src/lib/platform-logo-assets.json` is the small runtime slug-to-file index; the source/provenance manifest is not bundled into the client component. Existing hand-verified Claude, Canva, Perplexity, and Ollama assets take precedence. Runway for Education uses the same official Runway mark. Coverage remains incomplete; initials remain where no suitable icon was obtained. Asset retrieval does not verify current catalog facts or editorial claims.

## Resolution improvement pass

64 small assets were replaced with larger official-site touch icons or vector sources. `-hq.png` files fit within 128px; raster sources were never enlarged. SVG sources were rasterized at sufficient density, preserving their original shape and colors. `-hq.ico` files preserve the source bytes. Replaced small files were removed, and the Anthropic API runtime override was removed so its larger official icon is used. The table above retains the historical manually fetched sources, not a promise that each is still selected at runtime.

ICO is a container format, not a resolution rating: some files contain 256px images. Resolution was measured from the largest embedded ICO image or PNG dimensions. Larger assets remain unavailable for some vendors; remaining small icons are a documented limitation, not presented as high-resolution replacements. The separate reviewer verified that every mapped local file exists; individual brand correctness and visual sharpness were not independently reviewed for every logo.

## Dark-theme pass

Additional official icons were fetched from vendor homepages, icon links, and same-site logo files on 2026-10-15. Exact URLs are in `catalog-logos.json`. Where an official ICO's largest frame was at least 72px, that frame was saved as PNG without recoloring. Letter tiles remain where a vendor publishes no usable image mark (Aider's site logo is the text wordmark in `aider.svg`; GitHub project pages that only expose the GitHub mark were left as initials; hosts that returned only a sub-72px icon, or blocked retrieval, stay on that small icon or an initial).

Where a downloaded raster had a solid near-white edge matte and a darker mark, that matte was cleared to transparency. Mark pixels were not recolored. AlphaSense's official SVG included a white background rectangle, which was removed; the mark paths are unchanged. Dark marks sit on a warm rounded plate; other marks sit on a translucent dark tile. Neither plate is a hard white square.
