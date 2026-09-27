import { animCss } from "./css.js";

export const EASINGS = [
  { id: "ease", label: "Ease" },
  { id: "ease-in", label: "Ease in" },
  { id: "ease-out", label: "Ease out" },
  { id: "ease-in-out", label: "Ease in out" },
  { id: "linear", label: "Linear" },
  { id: "cubic-bezier(0.22, 1, 0.36, 1)", label: "Smooth / cubic" },
];

export const DIRECTIONS = [
  { id: "normal", label: "Normal" },
  { id: "reverse", label: "Reverse" },
  { id: "alternate", label: "Alternate" },
  { id: "alternate-reverse", label: "Alternate reverse" },
];

export const ORIGINS = [
  { id: "center", label: "Center" },
  { id: "top", label: "Top" },
  { id: "bottom", label: "Bottom" },
  { id: "left", label: "Left" },
  { id: "right", label: "Right" },
];

export const FILLS = [
  { id: "both", label: "Both" },
  { id: "none", label: "None" },
  { id: "forwards", label: "Forwards" },
  { id: "backwards", label: "Backwards" },
];

export const MOTION_PRESETS = [
  {
    id: "subtle-ui",
    label: "Subtle UI",
    description: "Short, low-distance motion for product interfaces.",
    duration: 420,
    delay: 0,
    easing: "ease-out",
    iteration: "1",
    direction: "normal",
    fill: "both",
  },
  {
    id: "modern-saas",
    label: "Modern SaaS",
    description: "Clean movement with a slightly slower reveal.",
    duration: 620,
    delay: 40,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    iteration: "1",
    direction: "normal",
    fill: "both",
  },
  {
    id: "playful",
    label: "Playful",
    description: "Longer timing for noticeable, expressive motion.",
    duration: 760,
    delay: 0,
    easing: "ease-out",
    iteration: "1",
    direction: "normal",
    fill: "both",
  },
  {
    id: "dramatic",
    label: "Dramatic",
    description: "Slower movement with room for the motion to breathe.",
    duration: 1100,
    delay: 80,
    easing: "ease-in-out",
    iteration: "1",
    direction: "normal",
    fill: "both",
  },
  {
    id: "text-reveal",
    label: "Text Reveal",
    description: "Readable pacing for headline and copy entrances.",
    duration: 900,
    delay: 0,
    easing: "ease-out",
    iteration: "1",
    direction: "normal",
    fill: "both",
  },
  {
    id: "micro-loop",
    label: "Micro Loop",
    description: "A restrained repeating motion for ambient UI details.",
    duration: 1800,
    delay: 0,
    easing: "ease-in-out",
    iteration: "infinite",
    direction: "alternate",
    fill: "both",
  },
];

export function getPreset(id) {
  return MOTION_PRESETS.find((preset) => preset.id === id) || MOTION_PRESETS[0];
}

export function getAnimationStyle(anim, settings) {
  return {
    "--cf-duration": `${settings.duration}ms`,
    "--cf-delay": `${settings.delay}ms`,
    "--cf-iteration": settings.iteration,
    animationTimingFunction: settings.easing,
    animationDirection: settings.direction,
    animationFillMode: settings.fill,
    transformOrigin: settings.origin,
    animationDuration: `${settings.duration}ms`,
    animationDelay: `${settings.delay}ms`,
  };
}

export function createInitialSettings(anim) {
  return {
    duration: anim.duration,
    delay: 0,
    easing: anim.timing || "ease-out",
    iteration: anim.iteration || "1",
    direction: "normal",
    fill: "both",
    origin: "center",
    target: "heading",
    customHtml: `<div style="padding:20px;border:1px solid currentColor;border-radius:12px">Your element</div>`,
    text:
      anim.category === "text" ? "Motion that feels intentional" : "Hello, CSS",
  };
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function animationUsage(anim, settings) {
  return `<div class="cf-animated cf-${anim.slug}" style="--cf-duration:${settings.duration}ms; --cf-delay:${settings.delay}ms; --cf-iteration:${settings.iteration};">Hello</div>`;
}

export function fullCssSnippet(anim, settings) {
  const override = `.cf-${anim.slug} {\n  animation-duration: ${settings.duration}ms;\n  animation-delay: ${settings.delay}ms;\n  animation-timing-function: ${settings.easing};\n  animation-iteration-count: ${settings.iteration};\n  animation-direction: ${settings.direction};\n  animation-fill-mode: ${settings.fill};\n  transform-origin: ${settings.origin};\n}`;
  return `${animCss(anim)}\n\n${override}\n\n${anim.keyframes}`;
}

export function exportSnippets(anim, settings) {
  const baseClass = `cf-animated cf-${anim.slug}`;
  const css = fullCssSnippet(anim, settings);
  const outputText =
    settings.target === "custom"
      ? settings.customHtml
      : escapeHtml(settings.text);
  const html = `<div class="${baseClass}" style="--cf-duration:${settings.duration}ms; --cf-delay:${settings.delay}ms; --cf-iteration:${settings.iteration}; animation-timing-function:${settings.easing}; animation-direction:${settings.direction}; animation-fill-mode:${settings.fill}; transform-origin:${settings.origin};">${outputText}</div>`;
  const react = `<div\n  className="${baseClass}"\n  style={{\n    "--cf-duration": "${settings.duration}ms",\n    "--cf-delay": "${settings.delay}ms",\n    "--cf-iteration": "${settings.iteration}",\n    animationTimingFunction: "${settings.easing}",\n    animationDirection: "${settings.direction}",\n    animationFillMode: "${settings.fill}",\n    transformOrigin: "${settings.origin}",\n  }}\n>\n  ${settings.text}\n</div>`;
  const vue = `<div\n  class="${baseClass}"\n  style="--cf-duration:${settings.duration}ms; --cf-delay:${settings.delay}ms; --cf-iteration:${settings.iteration}; animation-timing-function:${settings.easing}; animation-direction:${settings.direction}; animation-fill-mode:${settings.fill}; transform-origin:${settings.origin};"\n>\n  ${settings.text}\n</div>`;
  const tailwind = `<div class="${baseClass} [animation-duration:${settings.duration}ms] [animation-delay:${settings.delay}ms] [animation-iteration-count:${settings.iteration}] [animation-direction:${settings.direction}] [animation-fill-mode:${settings.fill}] [transform-origin:${settings.origin}] [animation-timing-function:${settings.easing}]"><!-- ${settings.text} --></div>`;
  return { css, html, react, vue, tailwind };
}

export function downloadText(filename, text, type = "text/plain") {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

const FAVORITES_KEY = "cssframes-favorites";
const COLLECTIONS_KEY = "cssframes-collections";

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable in private/restricted contexts.
  }
}

export function readFavorites() {
  const value = readJson(FAVORITES_KEY, []);
  return Array.isArray(value)
    ? value.filter((item) => typeof item === "string")
    : [];
}

export function toggleFavorite(slug) {
  const favorites = new Set(readFavorites());
  if (favorites.has(slug)) favorites.delete(slug);
  else favorites.add(slug);
  const next = [...favorites];
  writeJson(FAVORITES_KEY, next);
  return next;
}

export function readCollections() {
  const value = readJson(COLLECTIONS_KEY, {});
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value).filter(([, slugs]) => Array.isArray(slugs)),
  );
}

export function upsertCollection(name, slug) {
  const collections = readCollections();
  const key = name.trim();
  if (!key) return collections;
  collections[key] = [...new Set([...(collections[key] || []), slug])];
  writeJson(COLLECTIONS_KEY, collections);
  return collections;
}

export function removeFromCollection(name, slug) {
  const collections = readCollections();
  if (!collections[name]) return collections;
  collections[name] = collections[name].filter((item) => item !== slug);
  if (collections[name].length === 0) delete collections[name];
  writeJson(COLLECTIONS_KEY, collections);
  return collections;
}

export function removeCollection(name) {
  const collections = readCollections();
  delete collections[name];
  writeJson(COLLECTIONS_KEY, collections);
  return collections;
}

export function animationMood(anim) {
  if (anim.category === "loops") return "loop";
  if (anim.category === "text") return "text";
  if (anim.category === "attention") return "playful";
  if (anim.category === "exits") return "exit";
  return anim.duration <= 600 ? "subtle" : "dramatic";
}
