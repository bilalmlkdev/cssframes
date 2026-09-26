import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { animCss, categories } from "../lib/animations";
import { copyText } from "../lib/copy";

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
      className="group relative flex h-full cursor-pointer flex-col rounded-3xl bg-surface p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_6px_16px_-6px_rgba(0,0,0,0.08)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_16px_32px_-12px_rgba(0,0,0,0.14)]"
    >
      <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-xl bg-surface-2 p-4 sm:h-52">
        <div
          key={nonce}
          className={`max-w-full text-center font-serif text-2xl leading-snug ${hovering ? `cf-animated cf-${anim.slug}` : ""}`}
          style={
            hovering
              ? {
                  "--cf-duration": `${anim.duration}ms`,
                  "--cf-iteration": anim.iteration || "1",
                }
              : undefined
          }
        >
          {anim.name}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copy CSS for ${anim.name}`}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md bg-background text-muted opacity-0 transition-all hover:text-text group-hover:opacity-100"
        >
          {copied ? (
            <Check size={14} className="text-accent" />
          ) : (
            <Copy size={14} />
          )}
        </button>
      </div>

      <h3 className="mt-4 text-base font-medium">{anim.name}</h3>
      <p className="mt-1 text-sm text-muted">{categoryLabel}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{anim.desc}</p>
    </article>
  );
}
