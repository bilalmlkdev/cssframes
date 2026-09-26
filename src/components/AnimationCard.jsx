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
      className="group relative z-0 flex h-full cursor-pointer flex-col bg-background p-4 transition-all duration-200 hover:z-10 hover:translate-x-1 hover:-translate-y-1 hover:rounded-xl hover:shadow-[0_0_0_1px_var(--text)]"
    >
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-surface p-4">
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

      <h3 className="mt-4 font-serif text-2xl leading-tight">{anim.name}</h3>
      <p className="mt-1 text-sm italic text-muted">{categoryLabel}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{anim.desc}</p>
    </article>
  );
}
