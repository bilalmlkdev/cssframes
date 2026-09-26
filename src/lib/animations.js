// cssframes - the animation library itself.
// Every animation is pure CSS: data holds the @keyframes source plus the
// metadata, buildCss() assembles the full stylesheet which is injected
// into the site, used for copy buttons, and is the artifact we ship.

export const categories = [
  { id: "entrances", label: "Entrances" },
  { id: "exits", label: "Exits" },
  { id: "attention", label: "Attention" },
  { id: "loops", label: "Loops" },
  { id: "text", label: "Text" },
];

export const animations = [
  // ---------- Entrances ----------
  {
    slug: "fade-in",
    name: "Fade In",
    desc: "Reveals an element by fading it smoothly from transparent to fully visible.",
    category: "entrances",
    duration: 500,
    keyframes: `@keyframes cf-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}`,
  },
  {
    slug: "fade-in-up",
    name: "Fade In Up",
    desc: "Fades an element in while rising from slightly below, a classic content reveal.",
    category: "entrances",
    duration: 600,
    keyframes: `@keyframes cf-fade-in-up {
  from { opacity: 0; transform: translate3d(0, 24px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}`,
  },
  {
    slug: "fade-in-down",
    name: "Fade In Down",
    desc: "Fades an element in as it settles down from above into place.",
    category: "entrances",
    duration: 600,
    keyframes: `@keyframes cf-fade-in-down {
  from { opacity: 0; transform: translate3d(0, -24px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}`,
  },
  {
    slug: "fade-in-left",
    name: "Fade In Left",
    desc: "Slides an element in from the left edge while fading it into view.",
    category: "entrances",
    duration: 600,
    keyframes: `@keyframes cf-fade-in-left {
  from { opacity: 0; transform: translate3d(-24px, 0, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}`,
  },
  {
    slug: "fade-in-right",
    name: "Fade In Right",
    desc: "Slides an element in from the right edge while fading it into view.",
    category: "entrances",
    duration: 600,
    keyframes: `@keyframes cf-fade-in-right {
  from { opacity: 0; transform: translate3d(24px, 0, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}`,
  },
  {
    slug: "zoom-in",
    name: "Zoom In",
    desc: "Scales an element up gently from smaller as it fades into place.",
    category: "entrances",
    duration: 500,
    keyframes: `@keyframes cf-zoom-in {
  from { opacity: 0; transform: scale(0.86); }
  to { opacity: 1; transform: scale(1); }
}`,
  },
  {
    slug: "zoom-bounce",
    name: "Zoom Bounce",
    desc: "Pops an element in with a playful overshoot before it settles.",
    category: "entrances",
    duration: 700,
    timing: "ease-out",
    keyframes: `@keyframes cf-zoom-bounce {
  0% { opacity: 0; transform: scale(0.4); }
  60% { opacity: 1; transform: scale(1.06); }
  80% { transform: scale(0.97); }
  100% { opacity: 1; transform: scale(1); }
}`,
  },
  {
    slug: "slide-in-up",
    name: "Slide In Up",
    desc: "Pushes an element up from below the viewport edge, without fading.",
    category: "entrances",
    duration: 600,
    timing: "cubic-bezier(0.22, 1, 0.36, 1)",
    keyframes: `@keyframes cf-slide-in-up {
  from { transform: translate3d(0, 100%, 0); }
  to { transform: translate3d(0, 0, 0); }
}`,
  },
  {
    slug: "slide-in-down",
    name: "Slide In Down",
    desc: "Drops an element down from above into its position, without fading.",
    category: "entrances",
    duration: 600,
    timing: "cubic-bezier(0.22, 1, 0.36, 1)",
    keyframes: `@keyframes cf-slide-in-down {
  from { transform: translate3d(0, -100%, 0); }
  to { transform: translate3d(0, 0, 0); }
}`,
  },
  {
    slug: "slide-in-left",
    name: "Slide In Left",
    desc: "Moves an element in from the left with a smooth decelerating curve.",
    category: "entrances",
    duration: 600,
    timing: "cubic-bezier(0.22, 1, 0.36, 1)",
    keyframes: `@keyframes cf-slide-in-left {
  from { transform: translate3d(-100%, 0, 0); }
  to { transform: translate3d(0, 0, 0); }
}`,
  },
  {
    slug: "slide-in-right",
    name: "Slide In Right",
    desc: "Moves an element in from the right with a smooth decelerating curve.",
    category: "entrances",
    duration: 600,
    timing: "cubic-bezier(0.22, 1, 0.36, 1)",
    keyframes: `@keyframes cf-slide-in-right {
  from { transform: translate3d(100%, 0, 0); }
  to { transform: translate3d(0, 0, 0); }
}`,
  },
  {
    slug: "flip-in-x",
    name: "Flip In X",
    desc: "Rotates an element into view around its horizontal axis.",
    category: "entrances",
    duration: 700,
    timing: "ease-out",
    keyframes: `@keyframes cf-flip-in-x {
  from { opacity: 0; transform: perspective(600px) rotateX(90deg); }
  to { opacity: 1; transform: perspective(600px) rotateX(0); }
}`,
  },
  {
    slug: "flip-in-y",
    name: "Flip In Y",
    desc: "Rotates an element into view around its vertical axis.",
    category: "entrances",
    duration: 700,
    timing: "ease-out",
    keyframes: `@keyframes cf-flip-in-y {
  from { opacity: 0; transform: perspective(600px) rotateY(90deg); }
  to { opacity: 1; transform: perspective(600px) rotateY(0); }
}`,
  },
  {
    slug: "rise-in",
    name: "Rise In",
    desc: "A subtle entrance that lifts an element a short distance as it appears.",
    category: "entrances",
    duration: 600,
    keyframes: `@keyframes cf-rise-in {
  from { opacity: 0; transform: translate3d(0, 16px, 0) scale(0.985); }
  to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
}`,
  },

  // ---------- Exits ----------
  {
    slug: "fade-out",
    name: "Fade Out",
    desc: "Removes an element by fading it smoothly to full transparency.",
    category: "exits",
    duration: 500,
    keyframes: `@keyframes cf-fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}`,
  },
  {
    slug: "fade-out-up",
    name: "Fade Out Up",
    desc: "Fades an element away as it drifts upward out of view.",
    category: "exits",
    duration: 500,
    keyframes: `@keyframes cf-fade-out-up {
  from { opacity: 1; transform: translate3d(0, 0, 0); }
  to { opacity: 0; transform: translate3d(0, -24px, 0); }
}`,
  },
  {
    slug: "fade-out-down",
    name: "Fade Out Down",
    desc: "Fades an element away as it sinks downward out of view.",
    category: "exits",
    duration: 500,
    keyframes: `@keyframes cf-fade-out-down {
  from { opacity: 1; transform: translate3d(0, 0, 0); }
  to { opacity: 0; transform: translate3d(0, 24px, 0); }
}`,
  },
  {
    slug: "zoom-out",
    name: "Zoom Out",
    desc: "Shrinks an element slightly as it fades away.",
    category: "exits",
    duration: 500,
    keyframes: `@keyframes cf-zoom-out {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.8); }
}`,
  },
  {
    slug: "slide-out-down",
    name: "Slide Out Down",
    desc: "Pushes an element down past the bottom edge as it leaves.",
    category: "exits",
    duration: 600,
    timing: "cubic-bezier(0.22, 1, 0.36, 1)",
    keyframes: `@keyframes cf-slide-out-down {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(0, 100%, 0); }
}`,
  },
  {
    slug: "slide-out-up",
    name: "Slide Out Up",
    desc: "Pushes an element up past the top edge as it leaves.",
    category: "exits",
    duration: 600,
    timing: "cubic-bezier(0.22, 1, 0.36, 1)",
    keyframes: `@keyframes cf-slide-out-up {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(0, -100%, 0); }
}`,
  },
  {
    slug: "flip-out-x",
    name: "Flip Out X",
    desc: "Rotates an element away around its horizontal axis as it disappears.",
    category: "exits",
    duration: 700,
    timing: "ease-in",
    keyframes: `@keyframes cf-flip-out-x {
  from { opacity: 1; transform: perspective(600px) rotateX(0); }
  to { opacity: 0; transform: perspective(600px) rotateX(90deg); }
}`,
  },
  {
    slug: "blur-out",
    name: "Blur Out",
    desc: "Softens an element out of focus as it fades away.",
    category: "exits",
    duration: 500,
    keyframes: `@keyframes cf-blur-out {
  from { opacity: 1; filter: blur(0); }
  to { opacity: 0; filter: blur(8px); }
}`,
  },
  {
    slug: "collapse-out",
    name: "Collapse Out",
    desc: "Contracts an element inward as it quickly fades out.",
    category: "exits",
    duration: 450,
    keyframes: `@keyframes cf-collapse-out {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.85); }
}`,
  },

  // ---------- Attention ----------
  {
    slug: "bounce",
    name: "Bounce",
    desc: "A vertical bounce that pulls attention to buttons, badges, and alerts.",
    category: "attention",
    duration: 900,
    timing: "ease-out",
    keyframes: `@keyframes cf-bounce {
  0%, 20%, 53%, 100% { transform: translate3d(0, 0, 0); }
  40%, 43% { transform: translate3d(0, -18px, 0); }
  70% { transform: translate3d(0, -8px, 0); }
  90% { transform: translate3d(0, -2px, 0); }
}`,
  },
  {
    slug: "flash",
    name: "Flash",
    desc: "Alternates opacity quickly to flash an element like a warning light.",
    category: "attention",
    duration: 700,
    keyframes: `@keyframes cf-flash {
  0%, 50%, 100% { opacity: 1; }
  25%, 75% { opacity: 0; }
}`,
  },
  {
    slug: "pulse",
    name: "Pulse",
    desc: "A gentle scale pulse that highlights a single important element.",
    category: "attention",
    duration: 900,
    keyframes: `@keyframes cf-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}`,
  },
  {
    slug: "shake",
    name: "Shake",
    desc: "Vibrates an element side to side, the classic invalid-input signal.",
    category: "attention",
    duration: 600,
    keyframes: `@keyframes cf-shake {
  0%, 100% { transform: translate3d(0, 0, 0); }
  10%, 30%, 50%, 70%, 90% { transform: translate3d(-8px, 0, 0); }
  20%, 40%, 60%, 80% { transform: translate3d(8px, 0, 0); }
}`,
  },
  {
    slug: "swing",
    name: "Swing",
    desc: "Swings an element from a top anchor like a hanging sign.",
    category: "attention",
    duration: 900,
    timing: "ease-in-out",
    classCss: "transform-origin: top center;",
    keyframes: `@keyframes cf-swing {
  0% { transform: rotate(0); }
  20% { transform: rotate(14deg); }
  40% { transform: rotate(-10deg); }
  60% { transform: rotate(6deg); }
  80% { transform: rotate(-4deg); }
  100% { transform: rotate(0); }
}`,
  },
  {
    slug: "tada",
    name: "Tada",
    desc: "A celebratory wiggle with scale, perfect for success moments.",
    category: "attention",
    duration: 900,
    timing: "ease-in-out",
    keyframes: `@keyframes cf-tada {
  0% { transform: scale(1); }
  10%, 30%, 50%, 70%, 90% { transform: scale(1.08) rotate(2deg); }
  20%, 40%, 60%, 80% { transform: scale(1.08) rotate(-2deg); }
  100% { transform: scale(1); }
}`,
  },
  {
    slug: "wobble",
    name: "Wobble",
    desc: "Sways an element side to side with a tipsy, playful motion.",
    category: "attention",
    duration: 900,
    timing: "ease-in-out",
    keyframes: `@keyframes cf-wobble {
  0% { transform: translate3d(0, 0, 0) rotate(0); }
  15% { transform: translate3d(-10px, 0, 0) rotate(-5deg); }
  30% { transform: translate3d(8px, 0, 0) rotate(3deg); }
  45% { transform: translate3d(-6px, 0, 0) rotate(-3deg); }
  60% { transform: translate3d(4px, 0, 0) rotate(2deg); }
  75% { transform: translate3d(-2px, 0, 0) rotate(-1deg); }
  100% { transform: translate3d(0, 0, 0) rotate(0); }
}`,
  },
  {
    slug: "heartbeat",
    name: "Heartbeat",
    desc: "A double scale pulse that mimics a beating heart.",
    category: "attention",
    duration: 1100,
    timing: "ease-in-out",
    keyframes: `@keyframes cf-heartbeat {
  0%, 100% { transform: scale(1); }
  14% { transform: scale(1.15); }
  28% { transform: scale(1); }
  42% { transform: scale(1.12); }
  56% { transform: scale(1); }
}`,
  },
  {
    slug: "rubber-band",
    name: "Rubber Band",
    desc: "Stretches and squashes an element like a rubber band snapping back.",
    category: "attention",
    duration: 800,
    keyframes: `@keyframes cf-rubber-band {
  0% { transform: scale(1); }
  30% { transform: scaleX(1.25) scaleY(0.75); }
  40% { transform: scaleX(0.75) scaleY(1.25); }
  50% { transform: scaleX(1.15) scaleY(0.85); }
  65% { transform: scaleX(0.95) scaleY(1.05); }
  100% { transform: scale(1); }
}`,
  },

  // ---------- Loops ----------
  {
    slug: "spin",
    name: "Spin",
    desc: "Continuously rotates an element, ideal for loaders and spinners.",
    category: "loops",
    duration: 1400,
    iteration: "infinite",
    timing: "linear",
    keyframes: `@keyframes cf-spin {
  from { transform: rotate(0); }
  to { transform: rotate(360deg); }
}`,
  },
  {
    slug: "ping",
    name: "Ping",
    desc: "Emits an expanding ripple from an element, like a notification ping.",
    category: "loops",
    duration: 1000,
    iteration: "infinite",
    timing: "cubic-bezier(0, 0, 0.2, 1)",
    keyframes: `@keyframes cf-ping {
  0% { transform: scale(1); opacity: 0.8; }
  80%, 100% { transform: scale(2); opacity: 0; }
}`,
  },
  {
    slug: "bob",
    name: "Bob",
    desc: "Bobs an element up and down on a steady loop for loading states.",
    category: "loops",
    duration: 900,
    iteration: "infinite",
    timing: "ease-in-out",
    keyframes: `@keyframes cf-bob {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -10%, 0); }
}`,
  },
  {
    slug: "pulse-ring",
    name: "Pulse Ring",
    desc: "Expands and fades a ring outward in an endless radar-like pulse.",
    category: "loops",
    duration: 1200,
    iteration: "infinite",
    timing: "ease-out",
    keyframes: `@keyframes cf-pulse-ring {
  from { transform: scale(0.85); opacity: 1; }
  to { transform: scale(1.6); opacity: 0; }
}`,
  },
  {
    slug: "hue-cycle",
    name: "Hue Cycle",
    desc: "Cycles an element through every color of the wheel on a loop.",
    category: "loops",
    duration: 4000,
    iteration: "infinite",
    timing: "linear",
    keyframes: `@keyframes cf-hue-cycle {
  from { filter: hue-rotate(0deg); }
  to { filter: hue-rotate(360deg); }
}`,
  },
  {
    slug: "wiggle",
    name: "Wiggle",
    desc: "Rocks an element back and forth with a small looping rotation.",
    category: "loops",
    duration: 700,
    iteration: "infinite",
    timing: "ease-in-out",
    keyframes: `@keyframes cf-wiggle {
  0%, 100% { transform: rotate(0); }
  25% { transform: rotate(-6deg); }
  75% { transform: rotate(6deg); }
}`,
  },
  {
    slug: "flicker",
    name: "Flicker",
    desc: "Flickers an element like a neon sign or an unstable light source.",
    category: "loops",
    duration: 1600,
    iteration: "infinite",
    timing: "linear",
    keyframes: `@keyframes cf-flicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
  20%, 22%, 24%, 55% { opacity: 0.3; }
}`,
  },
  {
    slug: "float",
    name: "Float",
    desc: "Drifts an element gently up and down for a calm floating effect.",
    category: "loops",
    duration: 3000,
    iteration: "infinite",
    timing: "ease-in-out",
    keyframes: `@keyframes cf-float {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -12px, 0); }
}`,
  },

  // ---------- Text ----------
  {
    slug: "blur-in",
    name: "Blur In",
    desc: "Brings text into focus from a soft blur, great for headings.",
    category: "text",
    duration: 700,
    keyframes: `@keyframes cf-blur-in {
  from { opacity: 0; filter: blur(8px); }
  to { opacity: 1; filter: blur(0); }
}`,
  },
  {
    slug: "tracking-in",
    name: "Tracking In",
    desc: "Expands letter spacing inward as the text fades into place.",
    category: "text",
    duration: 800,
    timing: "ease-out",
    keyframes: `@keyframes cf-tracking-in {
  from { opacity: 0; letter-spacing: 0.4em; }
  to { opacity: 1; letter-spacing: 0; }
}`,
  },
  {
    slug: "skew-in",
    name: "Skew In",
    desc: "Slants text into position with a quick skew and lift.",
    category: "text",
    duration: 600,
    keyframes: `@keyframes cf-skew-in {
  from { opacity: 0; transform: translate3d(0, 20px, 0) skewX(-8deg); }
  to { opacity: 1; transform: translate3d(0, 0, 0) skewX(0); }
}`,
  },
  {
    slug: "focus-in",
    name: "Focus In",
    desc: "Sharpens oversized blurred text down to a crisp resting size.",
    category: "text",
    duration: 700,
    keyframes: `@keyframes cf-focus-in {
  from { opacity: 0; filter: blur(12px); transform: scale(1.06); }
  to { opacity: 1; filter: blur(0); transform: scale(1); }
}`,
  },
  {
    slug: "type-in",
    name: "Type In",
    desc: "Types text out character by character with a caret at the end.",
    category: "text",
    duration: 1400,
    timing: "steps(24, end)",
    classCss:
      "display: inline-block; white-space: nowrap; overflow: hidden; max-width: 100%; border-right: 2px solid currentColor;",
    keyframes: `@keyframes cf-type-in {
  from { width: 0; }
  to { width: 100%; }
}`,
  },
];

// The class rule for one animation (used for single copies and previews)
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

  const rules = list.map(animCss).join("\n\n");
  const keyframes = list.map((a) => a.keyframes).join("\n\n");

  return `${base}\n\n${rules}\n\n${keyframes}\n`;
}

export function findAnimation(slug) {
  return animations.find((a) => a.slug === slug);
}
