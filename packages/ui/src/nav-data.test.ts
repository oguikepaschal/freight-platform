import assert from "node:assert/strict";
import { test } from "node:test";
import { DEFAULT_PRIMARY_ACTION, HOME_PRIMARY_ACTION, resolveContextualCta } from "./nav-data.ts";

test("the homepage resolves to the specialist CTA", () => {
  assert.deepEqual(resolveContextualCta("/"), HOME_PRIMARY_ACTION);
});

test("a page without an override falls through to the Header default", () => {
  assert.equal(resolveContextualCta("/locations"), undefined);
});

test("the site-wide default stays tracking", () => {
  assert.equal(DEFAULT_PRIMARY_ACTION.href, "/track");
});
