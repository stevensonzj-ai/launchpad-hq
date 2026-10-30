import { describe, it } from "node:test";
import assert from "node:assert/strict";
import type { ErrorEvent } from "@sentry/nextjs";
import { scrubMcpEvent } from "./sentry-scrub";

describe("scrubMcpEvent", () => {
  it("strips the request body, query string, extras and console breadcrumbs from /mcp events", () => {
    const event = {
      type: undefined,
      transaction: "POST /mcp",
      request: { url: "https://www.launchpadhq.io/mcp?x=1", data: '{"task":"my SSN is 000-00-0000"}', query_string: "x=1" },
      extra: { body: "my SSN is 000-00-0000" },
      breadcrumbs: [{ category: "console", message: "my SSN is 000-00-0000" }, { category: "http" }],
    } as unknown as ErrorEvent;
    const out = scrubMcpEvent(event);
    assert.ok(!JSON.stringify(out).includes("000-00-0000"));
    assert.equal(out.request?.url, "https://www.launchpadhq.io/mcp");
    assert.deepEqual(out.breadcrumbs, [{ category: "http" }]);
  });

  it("leaves other routes alone", () => {
    const event = { request: { url: "https://www.launchpadhq.io/api/search", data: "keep" } } as unknown as ErrorEvent;
    assert.equal(scrubMcpEvent(event).request?.data, "keep");
  });
});

describe("scrubMcpEvent on /api/moderation", () => {
  it("strips the signed token from the URL, query string and breadcrumbs", () => {
    const event = {
      request: {
        url: "https://www.launchpadhq.io/api/moderation?token=abc.def&action=approve",
        query_string: "token=abc.def&action=approve",
        data: "token=abc.def",
      },
      breadcrumbs: [
        { category: "fetch", data: { url: "https://www.launchpadhq.io/api/moderation?token=abc.def" } },
        { category: "console", message: "kept" },
      ],
    } as unknown as ErrorEvent;
    const out = scrubMcpEvent(event);
    assert.equal(out.request?.url, "https://www.launchpadhq.io/api/moderation");
    assert.equal(out.request?.query_string, undefined);
    assert.equal(out.request?.data, undefined);
    assert.doesNotMatch(JSON.stringify(out), /abc\.def/);
    assert.equal(out.breadcrumbs?.length, 2);
  });

  it("matches the moderation transaction name too", () => {
    const out = scrubMcpEvent({ transaction: "GET /api/moderation", request: { url: "/api/moderation?token=x1" } } as unknown as ErrorEvent);
    assert.equal(out.request?.url, "/api/moderation");
  });

  it("leaves other routes alone", () => {
    const out = scrubMcpEvent({ request: { url: "https://www.launchpadhq.io/api/platforms?q=a", query_string: "q=a" } } as unknown as ErrorEvent);
    assert.equal(out.request?.query_string, "q=a");
  });
});
