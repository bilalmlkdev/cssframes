import { useEffect, useState } from "react";
import { findAnimation, animations } from "../lib/animations";

const FEATURED = [
  "zoom-bounce",
  "fade-in-up",
  "bounce",
  "float",
  "blur-in",
  "tada",
  "rise-in",
  "spin",
];

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % FEATURED.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  const anim = findAnimation(FEATURED[index]);
  const categoryCount = new Set(animations.map((a) => a.category)).size;

  return (
    <section id="top" className="pb-14 pt-16 sm:pt-24">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="mono-label inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5">
            Open source - MIT licensed
          </span>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
            Pure CSS animations,{" "}
            <span className="text-accent">ready to paste.</span>
          </h1>
          <p className="mt-4 max-w-md leading-relaxed text-muted">
            Browse a library of GPU-friendly keyframe animations, preview
            every one live, then copy the CSS into your project. No
            JavaScript required on your side.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#library"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
            >
              Browse animations
            </a>
            <a
              href="#usage"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-medium text-text transition-colors hover:bg-surface-2"
            >
              Get the CSS
            </a>
          </div>
          <p className="mono-label mt-6">
            {animations.length} animations - {categoryCount} categories -
            100% CSS
          </p>
        </div>

        <div className="rounded-2xl border-2 border-border bg-surface p-1.5 shadow-xs">
          <div className="stage-dots relative flex h-64 items-center justify-center overflow-hidden rounded-xl border border-border/70 bg-surface-2">
            <span className="mono-label absolute left-3 top-3">
              Live preview
            </span>
            <div
              key={index}
              className={`cf-animated cf-${anim.slug}`}
              style={{
                "--cf-duration": "1.3s",
                "--cf-iteration": anim.iteration || "1",
              }}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-accent to-fuchsia-500 text-lg font-bold text-white shadow-lg shadow-accent/30">
                CF
              </div>
            </div>
            <span className="mono-label absolute bottom-3 right-3">
              cf-{anim.slug}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
