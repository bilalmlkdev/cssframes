import { test } from "node:test";
import assert from "node:assert/strict";
import { formatStars } from "../src/utils/format.js";

test("formatStars formats thousands", () => {
  assert.equal(formatStars(0), "0");
  assert.equal(formatStars(999), "999");
  assert.equal(formatStars(1000), "1k");
  assert.equal(formatStars(1250), "1.2k");
  assert.equal(formatStars(9999), "9.9k");
  assert.equal(formatStars(12500), "13k");
  assert.equal(formatStars(100000), "100k");
});

test("formatStars tolerates bad input", () => {
  assert.equal(formatStars(null), "0");
  assert.equal(formatStars(undefined), "0");
  assert.equal(formatStars("abc"), "0");
  assert.equal(formatStars(-5), "0");
});
