import test from "node:test";
import assert from "node:assert/strict";
import { animations } from "../src/data/animations.js";
import {
  createInitialSettings,
  exportSnippets,
  fullCssSnippet,
  MOTION_PRESETS,
} from "../src/lib/motion.js";

test("motion presets are available", () => {
  assert.ok(MOTION_PRESETS.length >= 5);
  assert.equal(MOTION_PRESETS.some((preset) => preset.id === "modern-saas"), true);
});

test("exported motion settings preserve all playground controls", () => {
  const anim = animations[0];
  const settings = {
    ...createInitialSettings(anim),
    duration: 850,
    delay: 125,
    easing: "ease-in-out",
    iteration: "2",
    direction: "alternate",
    fill: "forwards",
    origin: "top",
    text: "Hello <CSS>",
  };
  const css = fullCssSnippet(anim, settings);
  const outputs = exportSnippets(anim, settings);

  assert.match(css, /animation-duration: 850ms;/);
  assert.match(css, /animation-delay: 125ms;/);
  assert.match(css, /animation-timing-function: ease-in-out;/);
  assert.match(css, /animation-iteration-count: 2;/);
  assert.match(css, /animation-direction: alternate;/);
  assert.match(css, /animation-fill-mode: forwards;/);
  assert.match(css, /transform-origin: top;/);
  assert.match(outputs.html, /Hello &lt;CSS&gt;/);
  assert.match(outputs.tailwind, /\[animation-duration:850ms\]/);
  assert.equal(Object.keys(outputs).sort().join(","), "css,html,react,tailwind,vue");
});
