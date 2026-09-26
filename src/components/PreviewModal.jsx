import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, RefreshCw, X } from "lucide-react";
import { animCss, categories } from "../lib/animations";
import { copyText } from "../lib/copy";

const OBJECTS = ["box", "circle", "text", "button"];

const MotionBackdrop = motion.div;
const MotionPanel = motion.div;

function Target({ object }) {
  if (object === "circle") {
    return <div className="h-20 w-20 rounded-full bg-accent" />;
  }
  if (object === "text") {
    return <span className="text-4xl font-semibold text-accent">Hello</span>;
  }
  if (object === "button") {
    return (
      <span className="rounded-xl bg-accent px-6 py-3 text-sm font-medium text-accent-fg">
        Button
      </span>
    );
  }
  return <div className="h-20 w-20 rounded-3xl bg-text" />;
}

export function PreviewModal({ anim, onClose }) {
  const [object, setObject] = useState(anim.category === "text" ? "text" : "box");
  const [duration, setDuration] = useState(anim.duration);
  const [infinite, setInfinite] = useState(Boolean(anim.iteration));
  const [replay, setReplay] = useState(0);
  const [copiedKey, setCopiedKey] = useState(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const categoryLabel = categories.find((c) => c.id === anim.category)?.label;
  const usage = `<div class="cf-animated cf-${anim.slug}">...</div>`;
  const css = `${animCss(anim)}\n\n${anim.keyframes}`;

  const doCopy = async (text, key) => {
    const ok = await copyText(text);
    if (ok) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1600);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <MotionBackdrop
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <MotionPanel
        role="dialog"
        aria-modal="true"
        aria-label={anim.name}
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-surface shadow-2xl"
      >
        <div className="flex items-start justify-between px-5 py-4">
          <div>
            <h3 className="font-serif text-2xl">{anim.name}</h3>
            <p className="mono-label mt-1">
              {categoryLabel} - cf-{anim.slug}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="rounded-lg p-1.5 text-muted transition-colors hover:bg-surface-2 hover:text-text"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 px-5 pb-3">
          <div className="flex rounded-lg bg-surface-2 p-0.5">
            {OBJECTS.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => setObject(o)}
                className={`rounded-md px-2.5 py-1 text-xs capitalize transition-colors ${
                  object === o
                    ? "bg-accent text-accent-fg"
                    : "text-muted hover:text-text"
                }`}
              >
                {o}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-xs text-muted">
            Duration
            <input
              type="range"
              min={100}
              max={3000}
              step={50}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-24 accent-[var(--accent)] sm:w-36"
            />
            <span className="w-12 font-mono text-xs">{duration}ms</span>
          </label>

          <label className="flex cursor-pointer items-center gap-1.5 text-xs text-muted">
            <input
              type="checkbox"
              checked={infinite}
              onChange={(e) => setInfinite(e.target.checked)}
              className="accent-[var(--accent)]"
            />
            Infinite
          </label>

          <button
            type="button"
            onClick={() => setReplay((r) => r + 1)}
            className="ml-auto flex items-center gap-1.5 rounded-lg bg-surface-2 px-2.5 py-1.5 text-xs text-text transition-colors hover:text-muted"
          >
            <RefreshCw size={12} />
            Replay
          </button>
        </div>

        <div className="relative mb-4 flex h-52 items-center justify-center overflow-hidden bg-background">
          <div
            key={`${object}-${replay}`}
            className={`cf-animated cf-${anim.slug}`}
            style={{
              "--cf-duration": `${duration}ms`,
              "--cf-iteration": infinite ? "infinite" : "1",
            }}
          >
            <Target object={object} />
          </div>
        </div>

        <div className="space-y-4 px-5 py-4">
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="mono-label">Usage</span>
              <CopyButton
                onClick={() => doCopy(usage, "usage")}
                copied={copiedKey === "usage"}
              />
            </div>
            <pre className="overflow-x-auto rounded-lg bg-code-bg px-4 py-3 font-mono text-xs leading-relaxed text-code-text">
              {usage}
            </pre>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="mono-label">CSS</span>
              <CopyButton
                onClick={() => doCopy(css, "css")}
                copied={copiedKey === "css"}
              />
            </div>
            <pre className="max-h-44 overflow-auto rounded-lg bg-code-bg px-4 py-3 font-mono text-xs leading-relaxed text-code-text">
              {css}
            </pre>
          </div>
        </div>
      </MotionPanel>
    </div>
  );
}

function CopyButton({ onClick, copied }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1 rounded-md bg-surface-2 px-2 py-1 text-[11px] text-muted transition-colors hover:text-text"
    >
      {copied ? (
        <>
          <Check size={11} className="text-accent" /> Copied
        </>
      ) : (
        <>
          <Copy size={11} /> Copy
        </>
      )}
    </button>
  );
}
