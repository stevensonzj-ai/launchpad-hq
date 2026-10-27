/**
 * Does catalog text name "official" as its source? Shared by the label check
 * (label-consistency.ts) and catalog audit 10's wording fix, so the two can
 * never disagree. No imports: audit scripts load it without the app.
 */
const OFFICIAL = /\bofficial\b/i;
/** Clauses that say the official page could not be read: not a provenance claim. */
const COULD_NOT_READ = /unverified|did not|didn't|not render|blocked|javascript|not confirmed|not listed/i;

/** A clause (split on ". ", "; ", ": ") that names "official" as its source. */
export function claimsOfficial(text: string): boolean {
  return text.split(/[.;:]\s/).some((clause) => OFFICIAL.test(clause) && !COULD_NOT_READ.test(clause));
}
