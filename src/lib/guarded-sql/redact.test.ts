import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { redactAndCap, redactSecrets, secretsFromConnectionString } from "./redact";

describe("redactSecrets", () => {
  it("removes connection strings embedded in messages", () => {
    const out = redactSecrets('connect failed for postgresql://u:secretpw@ep-x.neon.tech/db?sslmode=require: refused');
    assert.ok(!out.includes("secretpw"));
    assert.ok(!out.includes("ep-x.neon.tech"));
  });
  it("removes known secrets even without URL shape", () => {
    const out = redactSecrets("auth failed for user alice with secretpw", ["secretpw", "alice"]);
    assert.ok(!out.includes("secretpw"));
    assert.ok(!out.includes("alice"));
  });
  it("removes password= pairs and Neon API keys", () => {
    const out = redactSecrets("host=h password=hunter22 key napi_abc123XYZ");
    assert.ok(!out.includes("hunter22"));
    assert.ok(!out.includes("napi_abc123XYZ"));
  });
  it("secretsFromConnectionString yields user, password and the string", () => {
    const s = secretsFromConnectionString("postgresql://alice:p%40ss@ep-x.neon.tech/db");
    for (const v of ["alice", "p%40ss", "p@ss"]) assert.ok(s.includes(v), v);
  });
  it("caps at 200 characters after redaction", () => {
    assert.equal(redactAndCap("x".repeat(500)).length, 200);
  });
});
