/**
 * One JSON error shape for /api, /data/v1 and the non-protocol errors of /mcp:
 *
 *   { "error": { "code": "not_found", "message": "...", "resolution": "..." } }
 *
 * `code` is stable and machine-readable. `message` says what went wrong and
 * `resolution` says what to do next; both are written for people and
 * agents. Never put stack traces, driver messages or env var names here.
 *
 * Pure (no Next or server imports) so client components can read errors
 * with apiErrorMessage.
 */
import { SITE_URL } from "@/lib/site";

export type ApiErrorCode =
  | "bad_request"
  | "unauthorized"
  | "not_found"
  | "method_not_allowed"
  | "unavailable"
  | "internal_error";

export type ApiErrorBody = {
  error: { code: ApiErrorCode; message: string; resolution: string; field?: string };
};

const DEVELOPERS_URL = `${SITE_URL}/developers`;

const DEFAULTS: Record<ApiErrorCode, { status: number; message: string; resolution: string }> = {
  bad_request: {
    status: 400,
    message: "The request is missing a value or has one in the wrong format.",
    resolution: "Check the request body and parameters, then retry.",
  },
  unauthorized: {
    status: 401,
    message: "You need to be signed in to do this.",
    resolution: `Sign in to Launchpad HQ, then retry. Public catalog data needs no sign-in: see ${DEVELOPERS_URL}.`,
  },
  not_found: {
    status: 404,
    message: "Nothing exists at this URL.",
    resolution: `Check the URL. The public endpoints are listed at ${DEVELOPERS_URL} and ${SITE_URL}/llms.txt.`,
  },
  method_not_allowed: {
    status: 405,
    message: "This URL does not accept this HTTP method.",
    resolution: "Retry with one of the methods in the Allow header.",
  },
  unavailable: {
    status: 503,
    message: "This service is temporarily unavailable.",
    resolution: "Retry in a minute or two.",
  },
  internal_error: {
    status: 500,
    message: "Something went wrong on our side.",
    resolution: `Retry later. If it keeps happening, report it via ${SITE_URL}/contact.`,
  },
};

export function apiErrorStatus(code: ApiErrorCode): number {
  return DEFAULTS[code].status;
}

export type ApiErrorOptions = { message?: string; resolution?: string; field?: string };

export function apiErrorBody(code: ApiErrorCode, options: ApiErrorOptions = {}): ApiErrorBody {
  const base = DEFAULTS[code];
  return {
    error: {
      code,
      message: options.message ?? base.message,
      resolution: options.resolution ?? base.resolution,
      ...(options.field ? { field: options.field } : {}),
    },
  };
}

/** A JSON error response. Not cached unless `headers` says otherwise. */
export function apiError(
  code: ApiErrorCode,
  options: ApiErrorOptions & { status?: number; headers?: Record<string, string> } = {},
): Response {
  return new Response(JSON.stringify(apiErrorBody(code, options)), {
    status: options.status ?? DEFAULTS[code].status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...options.headers,
    },
  });
}

const ALL_METHODS = ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"] as const;
type Method = (typeof ALL_METHODS)[number];

/**
 * JSON 405 handlers for every method a route does not implement (Next's own
 * 405 has an empty body). Spread into the route's exports:
 *   export const { GET, PUT, PATCH, DELETE } = methodsNotAllowed(["POST"]);
 */
export function methodsNotAllowed(allowed: readonly Method[]): Record<Method, () => Response> {
  const allow = allowed.includes("GET") && !allowed.includes("HEAD") ? [...allowed, "HEAD"] : [...allowed];
  const handler = () => apiError("method_not_allowed", { headers: { Allow: allow.join(", ") } });
  return Object.fromEntries(ALL_METHODS.map((m) => [m, handler])) as Record<Method, () => Response>;
}

/**
 * The human message from an /api error body, for client components. Reads
 * the envelope and the older `{ error: "text" }` shape alike.
 */
export function apiErrorMessage(body: unknown, fallback: string): string {
  const error = (body as { error?: unknown } | null)?.error;
  if (typeof error === "string" && error) return error;
  const message = (error as { message?: unknown } | null | undefined)?.message;
  return typeof message === "string" && message ? message : fallback;
}

/** Run a route body; any throw becomes a logged JSON 500 with no internals. */
export async function withApiErrors(label: string, handler: () => Promise<Response>): Promise<Response> {
  try {
    return await handler();
  } catch (error) {
    // Message only: driver errors can carry connection details in other fields.
    console.error(`[${label}] failed:`, error instanceof Error ? error.message : "unknown error");
    return apiError("internal_error");
  }
}
