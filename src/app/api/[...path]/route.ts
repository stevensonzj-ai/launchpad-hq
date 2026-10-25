import { apiError } from "@/lib/api-error";

/** Any /api path no route matched: the JSON 404 envelope, not Next's HTML page. */
function notFound() {
  return apiError("not_found", { message: "No API endpoint at this URL." });
}

export { notFound as GET, notFound as HEAD, notFound as POST, notFound as PUT, notFound as PATCH, notFound as DELETE };
