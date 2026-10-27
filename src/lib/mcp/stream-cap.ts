/**
 * Ends a text/event-stream response body after `ms`, so no /mcp stream can
 * outlive the function's maxDuration (Vercel kills it at the limit and logs
 * "Task timed out"). The server is stateless and has nothing to push, so a
 * stream still open at the cap is only keep-alives; ending it lets the
 * client reconnect cleanly. Other responses pass through untouched.
 */
export function capEventStream(response: Response, ms: number): Response {
  const type = response.headers.get("content-type") ?? "";
  if (!response.body || !type.includes("text/event-stream")) return response;
  const reader = response.body.getReader();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      timer = setTimeout(() => {
        reader.cancel().catch(() => {});
        try {
          controller.close();
        } catch {}
      }, ms);
    },
    async pull(controller) {
      try {
        const { done, value } = await reader.read();
        if (done) {
          clearTimeout(timer);
          controller.close();
        } else {
          controller.enqueue(value);
        }
      } catch {
        // Cancelled at the cap while a read was pending: already closed.
        clearTimeout(timer);
      }
    },
    cancel(reason) {
      clearTimeout(timer);
      return reader.cancel(reason);
    },
  });
  return new Response(body, { status: response.status, statusText: response.statusText, headers: response.headers });
}
