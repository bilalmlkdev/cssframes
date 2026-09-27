import { test } from "node:test";
import assert from "node:assert/strict";
import {
  animations,
  categories,
  findAnimation,
} from "../src/data/animations.js";
import { FAQS } from "../src/data/faqs.js";
import { GET_STARTED, REPO } from "../src/data/site.js";

test("animations and categories are present", () => {
  assert.ok(animations.length > 0);
  assert.ok(categories.length > 0);
});

test("every animation has required fields and a valid category", () => {
  const ids = new Set(categories.map((c) => c.id));
  for (const a of animations) {
    for (const key of [
      "slug",
      "name",
      "desc",
      "category",
      "duration",
      "keyframes",
    ]) {
      assert.ok(a[key], `${a.slug} missing ${key}`);
    }
    assert.ok(
      ids.has(a.category),
      `${a.slug} has unknown category ${a.category}`,
    );
    assert.match(a.slug, /^[a-z0-9-]+$/);
    assert.match(a.keyframes, new RegExp(`@keyframes cf-${a.slug}\\b`));
  }
});

test("slugs are unique", () => {
  const slugs = animations.map((a) => a.slug);
  assert.equal(new Set(slugs).size, slugs.length);
});

test("findAnimation resolves known slugs and rejects unknown ones", () => {
  assert.equal(findAnimation(animations[0].slug), animations[0]);
  assert.equal(findAnimation("does-not-exist"), undefined);
});

test("category totals cover every animation", () => {
  for (const c of categories) {
    const count = animations.filter((a) => a.category === c.id).length;
    assert.ok(count > 0, `category ${c.id} is empty`);
  }
});

test("site data is well formed", () => {
  assert.equal(REPO, "bilalmlkdev/cssframes");
  assert.ok(GET_STARTED.length >= 2);
  for (const item of GET_STARTED) {
    assert.ok(item.title && item.href && item.blurb);
  }
  assert.ok(FAQS.length > 0);
  for (const f of FAQS) {
    assert.ok(f.q && f.a);
  }
});
