import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { animCss, categories } from "../lib/animations";
import { copyText } from "../lib/copy";

function PreviewTarget({ anim }) {
  if (anim.category === "text") {
    return (
      <span className="text-2xl font-semibold text-accent">Hello</span>
    );
  }
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-fuchsia-500 text-xs font-bold text-white shadow-md shadow-accent/30">
      CF
    </div>
  );
}

export function AnimationCard({ anim, onOpen }) {
  const [hovering, setHovering] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [copied, setCopied] = useState(false);

  const categoryLabel = categories.find((c) => c.id === anim.category)?.label;

  const handleEnter = () => {
    setNonce((n) => n + 1);
    setHovering(true);
  };

  const handleCopy = async (e) => {
    e.stopPropagation();
    const ok = await copyText(`${animCss(anim)}\n\n${anim.keyframes}`);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onOpen(anim)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onOpen(anim);
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={() => setHovering(false)}
      className="group cursor-pointer rounded-xl border border-border bg-surface p-3 transition-colors hover:border-accent/60"
    >
      <div className="stage-dots relative flex h-32 items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-surface-2">
        <div
          key={nonce}
          className={hovering ? `cf-animated cf-${anim.slug}` : undefined}
          style={
            hovering
              ? {
                  "--cf-duration": `${anim.duration}ms`,
                  "--cf-iteration": anim.iteration || "1",
                }
              : undefined
          }
        >
          <PreviewTarget anim={anim} />
        </div>
        <span className="mono-label absolute right-2.5 top-2.5 opacity-0 transition-opacity group-hover:opacity-100">
          Preview
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-medium">{anim.name}</h3>
          <p className="text-xs text-muted">
            cf-{anim.slug} - {anim.duration}ms
          </p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copy CSS for ${anim.name}`}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:text-text"
        >
          {copied ? (
            <Check size={14} className="text-accent" />
          ) : (
            <Copy size={14} />
          )}
        </button>
      </div>
      <p className="mono-label mt-1.5">{categoryLabel}</p>
    </article>
  );
}
