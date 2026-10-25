/**
 * Unmatched /data paths (src/app/data/[[...path]]/route.ts). Bare /data and
 * /data/v1 point at the index; everything else is a JSON 404. Trailing
 * slashes never reach here: Next 308s them to the bare path first.
 */
export function resolveDataFallback(segments: readonly string[]): "index" | "not_found" {
  if (segments.length === 0) return "index";
  if (segments.length === 1 && segments[0] === "v1") return "index";
  return "not_found";
}
