// cssframes - stylesheet builders.
// animCss() renders the class rule for one animation, buildCss() assembles
// the full shipped stylesheet. One source of truth: the data module.
import { animations } from "../data/animations.js";

export function animCss(anim) {
  const parts = [
    `animation-name: cf-${anim.slug};`,
    `animation-duration: var(--cf-duration, ${anim.duration}ms);`,
    `animation-timing-function: ${anim.timing || "ease-out"};`,
  ];
  if (anim.iteration) {
    parts.push(`animation-iteration-count: var(--cf-iteration, ${anim.iteration});`);
  }
  if (anim.classCss) {
    parts.push(anim.classCss);
  }
  return `.cf-${anim.slug} {\n  ${parts.join("\n  ")}\n}`;
}

// Full stylesheet: the base class + every class rule + every @keyframes.
// No defaults are declared on :root so each animation keeps its own
// fallback duration - users opt in by setting the variables themselves.
export function buildCss(list = animations) {
  const base = `/*! cssframes v1.0.0 | MIT | https://github.com/bilalmlkdev/cssframes */

.cf-animated {
  animation-duration: var(--cf-duration, 800ms);
  animation-delay: var(--cf-delay, 0ms);
  animation-iteration-count: var(--cf-iteration, 1);
  animation-fill-mode: both;
}`;

  const reducedMotion = `@media (prefers-reduced-motion: reduce) {
  .cf-animated {
    animation: none;
  }
}`;

  const rules = list.map(animCss).join("\n\n");
  const keyframes = list.map((a) => a.keyframes).join("\n\n");

  return `${base}\n\n${rules}\n\n${keyframes}\n\n${reducedMotion}\n`;
}
