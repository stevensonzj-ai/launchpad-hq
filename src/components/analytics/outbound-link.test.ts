import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import test from "node:test";
import {
  destinationHost,
  OutboundLink,
  outboundEventProperties,
} from "./outbound-link";

test("destinationHost keeps hostname only", () => {
  assert.equal(
    destinationHost("https://chatgpt.com/auth/login?next=/"),
    "chatgpt.com",
  );
  assert.equal(destinationHost("https://apps.apple.com/app/id123"), "apps.apple.com");
  assert.equal(destinationHost("not a url"), "");
});

test("outboundEventProperties uses slug, surface, and host — nothing else", () => {
  const props = outboundEventProperties(
    "https://play.google.com/store/apps/details?id=com.openai.chatgpt",
    "chatgpt",
    "platform_mobile",
  );
  assert.deepEqual(Object.keys(props).sort(), [
    "destination_host",
    "platform",
    "surface",
  ]);
  assert.deepEqual(props, {
    platform: "chatgpt",
    surface: "platform_mobile",
    destination_host: "play.google.com",
  });
});

test("OutboundLink preserves href, target, and rel in markup", () => {
  const html = renderToStaticMarkup(
    createElement(OutboundLink, {
      href: "https://example.com/offer?utm=1",
      platform: "example-sponsor",
      surface: "sponsor_spotlight",
      eventName: "sponsor_clickout",
      target: "_blank",
      rel: "sponsored noopener",
      className: "mt-3 inline-flex",
      children: "Visit",
    }),
  );
  assert.ok(html.includes('href="https://example.com/offer?utm=1"'));
  assert.ok(html.includes('target="_blank"'));
  assert.ok(html.includes('rel="sponsored noopener"'));
  assert.ok(html.includes('class="mt-3 inline-flex"'));
  assert.ok(html.includes("Visit"));
  assert.ok(!html.includes("destination_host"));
});
