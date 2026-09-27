"use client";

import { useEffect, useState, useCallback } from "react";
import { animations } from "../../data/animations";

const TARGET_ELEMENTS = ["heading", "button", "card", "input", "notice", "avatar"];

function AnimatedPreview({ anim }) {
  const target = TARGET_ELEMENTS[Math.abs(hashStr(anim.slug)) % TARGET_ELEMENTS.length];
  const text = anim.name;

  const style = {
    "--cf-duration": `${anim.duration}ms`,
    "--cf-delay": "0ms",
    "--cf-iteration": "1",
    animationTimingFunction: anim.timing || "ease-out",
    animationDirection: "normal",
    animationFillMode: "both",
  };

  return (
    <div className="flex items-center justify-center py-8">
      <span className={`cf-${anim.slug}`} style={style}>
        {target === "heading" ? (
          <span className="text-3xl font-heading font-light tracking-tight sm:text-5xl">{text}</span>
        ) : target === "button" ? (
          <button type="button" className="rounded-xl bg-text px-6 py-3 text-sm font-medium text-background">
            {text}
          </button>
        ) : target === "card" ? (
          <div className="w-64 rounded-2xl border border-border bg-background p-5 text-left shadow-sm">
            <div className="mb-6 h-2 w-16 rounded bg-text" />
            <p className="text-sm font-medium">{text}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{anim.desc}</p>
          </div>
        ) : target === "input" ? (
          <div className="w-72 rounded-xl border border-border bg-background px-4 py-3 text-sm text-muted">
            {text}
          </div>
        ) : target === "notice" ? (
          <div className="flex max-w-md items-start gap-3 rounded-xl border border-border bg-background px-4 py-3 text-left">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-text" />
            <div>
              <p className="text-sm font-medium">{text}</p>
              <p className="mt-0.5 text-xs text-muted">{anim.desc}</p>
            </div>
          </div>
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-border bg-surface-2 text-lg font-medium">
            {text.slice(0, 2).toUpperCase()}
          </div>
        )}
      </span>
    </div>
  );
}

function hashStr(s) {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = ((hash << 5) - hash + s.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export function AutoGallery() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const anim = animations[index];

  const goNext = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % animations.length);
      setVisible(true);
    }, 300);
  }, []);

  useEffect(() => {
    const timer = setInterval(goNext, 3000);
    return () => clearInterval(timer);
  }, [goNext]);

  return (
    <div className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-surface px-6 py-8 sm:px-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="mono-label">{anim.category}</span>
          <h3 className="mt-1 text-xl font-heading font-light tracking-tight">
            {anim.name}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-accent transition-all duration-300"
              style={{ width: `${((index + 1) / animations.length) * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-muted">
            {index + 1}/{animations.length}
          </span>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-muted mb-6">{anim.desc}</p>

      <div className="relative">
        <div
          className={`transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <AnimatedPreview anim={anim} />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 text-[10px] text-muted/60">
        <span className="inline-flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          Auto-playing
        </span>
        <span>duration: {anim.duration}ms</span>
        <span>·</span>
        <span>timing: {anim.timing || "ease-out"}</span>
      </div>
    </div>
  );
}
