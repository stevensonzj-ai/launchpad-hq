/**
 * Tab embeds link to the standalone discussions/prompts page only when that
 * section already has an approved post. An unknown count (undefined) still
 * shows the link, which is the historical default.
 */
export function communityEmbedShowsFullLink(
  showFullLink: boolean | undefined,
  approvedCount: number | undefined,
): boolean {
  return (showFullLink ?? true) && approvedCount !== 0;
}

/** rel for every anchor whose href was submitted by a user. */
export const USER_POSTED_LINK_REL = "ugc nofollow noopener noreferrer";
