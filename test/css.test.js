import { test } from "node:test";
import assert from "node:assert/strict";
import { animCss, buildCss } from "../src/lib/css.js";
import { animations } from "../src/data/animations.js";

test("animCss emits class, name, duration and timing", () => {
  const css = animCss(animations[0]);
  assert.match(css, new RegExp(`^\\.cf-${animations[0].slug} \\{`));
  assert.match(css, /animation-name: cf-/);
  assert.match(css, /animation-duration: var\(--cf-duration, \d+ms\)/);
  assert.match(css, /animation-timing-function: /);
});

test("animCss includes iteration only when the animation loops", () => {
  const looping = animations.find((a) => a.iteration);
  const once = animations.find((a) => !a.iteration);
  assert.ok(
    looping && once,
    "library has both looping and one-shot animations",
  );
  assert.match(
    animCss(looping),
    /animation-iteration-count: var\(--cf-iteration/,
  );
  assert.doesNotMatch(animCss(once), /animation-iteration-count/);
});

test("buildCss contains every animation class and keyframes", () => {
  const css = buildCss();
  assert.match(css, /\.cf-animated \{/);
  for (const anim of animations) {
    assert.ok(
      css.includes(`.cf-${anim.slug} {`),
      `class rule for ${anim.slug}`,
    );
    assert.ok(css.includes(anim.keyframes), `keyframes for ${anim.slug}`);
  }
});

test("buildCss includes the license banner and reduced motion guard", () => {
  const css = buildCss();
  assert.match(css, /^\/\*! cssframes v1\.0\.0 \| MIT/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /animation: none;/);
});

test("buildCss respects a custom animation list", () => {
  const css = buildCss([animations[0]]);
  assert.ok(css.includes(`.cf-${animations[0].slug} {`));
  assert.equal(css.includes(`.cf-${animations[1].slug} {`), false);
});
