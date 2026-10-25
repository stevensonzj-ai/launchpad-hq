/**
 * Review fields safe to return from public, no-sign-in API routes.
 * Reviewer identity (userId, user name, avatar) stays out.
 */
export const PUBLIC_REVIEW_SELECT = {
  id: true,
  rating: true,
  title: true,
  body: true,
  helpful: true,
  createdAt: true,
} as const;
