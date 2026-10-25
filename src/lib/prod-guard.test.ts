import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  CONFIRM_PRODUCTION_FLAG,
  PRODUCTION_ENDPOINT_ID,
  checkTargetHost,
  isProductionHost,
} from "./prod-guard";

const PROD = `${PRODUCTION_ENDPOINT_ID}.c-3.us-east-2.aws.neon.tech`;
const POOLER = `${PRODUCTION_ENDPOINT_ID}-pooler.c-3.us-east-2.aws.neon.tech`;
const BRANCH = "ep-hidden-truth-aj8wfxc2.c-3.us-east-2.aws.neon.tech";
const FLAG = ["node", "script.ts", CONFIRM_PRODUCTION_FLAG];
const NO_FLAG = ["node", "script.ts"];
const ENV = { CONFIRM_PROD_HOST: PRODUCTION_ENDPOINT_ID };

describe("checkTargetHost", () => {
  it("refuses production with neither flag nor env", () => {
    assert.equal(checkTargetHost(PROD, NO_FLAG, {}).ok, false);
  });

  it("refuses production with the flag only", () => {
    assert.equal(checkTargetHost(PROD, FLAG, {}).ok, false);
  });

  it("refuses production with the env only", () => {
    assert.equal(checkTargetHost(PROD, NO_FLAG, ENV).ok, false);
  });

  it("refuses production when CONFIRM_PROD_HOST has the wrong value", () => {
    for (const value of ["ep-hidden-truth-aj8wfxc2", "br-purple-band-ajks38xk", PROD, "", ` ${PRODUCTION_ENDPOINT_ID}`]) {
      assert.equal(checkTargetHost(PROD, FLAG, { CONFIRM_PROD_HOST: value }).ok, false, value);
    }
  });

  it("allows production with both, flagged as production", () => {
    assert.deepEqual(checkTargetHost(PROD, FLAG, ENV), { ok: true, production: true });
  });

  it("allows a non-production host with nothing", () => {
    assert.deepEqual(checkTargetHost(BRANCH, NO_FLAG, {}), { ok: true, production: false });
  });

  it("allows a non-production host with the flag, still production=false", () => {
    const result = checkTargetHost(BRANCH, FLAG, ENV);
    assert.equal(result.ok, true);
    assert.ok(result.ok && result.production === false);
    assert.ok(result.ok && result.note?.includes("not production"));
  });

  it("refuses a null host even with both confirmations", () => {
    assert.equal(checkTargetHost(null, FLAG, ENV).ok, false);
  });

  it("treats the pooler hostname as production", () => {
    assert.equal(isProductionHost(POOLER), true);
    assert.equal(checkTargetHost(POOLER, NO_FLAG, {}).ok, false);
    assert.equal(checkTargetHost(POOLER, FLAG, {}).ok, false);
    assert.deepEqual(checkTargetHost(POOLER, FLAG, ENV), { ok: true, production: true });
  });

  it("names what is missing in the refusal reason", () => {
    const result = checkTargetHost(PROD, FLAG, {});
    assert.ok(!result.ok && result.reason.includes("CONFIRM_PROD_HOST"));
  });
});
