import { feedMethodNotAllowed } from "./http";

/**
 * Every /data/v1 route is GET/HEAD only. Each route spreads these so other
 * methods get the JSON 405 instead of Next's empty one:
 *   export const { POST, PUT, PATCH, DELETE } = FEED_READ_ONLY;
 */
export const FEED_READ_ONLY = {
  POST: feedMethodNotAllowed,
  PUT: feedMethodNotAllowed,
  PATCH: feedMethodNotAllowed,
  DELETE: feedMethodNotAllowed,
} as const;
