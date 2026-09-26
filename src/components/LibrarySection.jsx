import { useState } from "react";
import { animations } from "../lib/animations";
import { AnimationCard } from "./AnimationCard";

const FADE_MASK = "linear-gradient(to bottom, black 78%, transparent 100%)";

export function LibrarySection() {
  const [expanded, setExpanded] = useState(false);

  const openDocs = (anim) => {
    window.location.hash = `#/animations/${anim.slug}`;
  };

  return (
    <section id="library" className="px-5 pb-16 sm:px-8">
      <ul
        className={`grid grid-flow-dense gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
          expanded ? "" : "max-h-[85vh] overflow-hidden"
        }`}
        style={
          expanded
            ? undefined
            : { maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }
        }
      >
        {animations.map((anim, i) => (
          <li key={anim.slug} className={i % 8 === 0 ? "sm:col-span-2" : ""}>
            <AnimationCard anim={anim} onOpen={openDocs} />
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="rounded-lg bg-surface-2 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-border"
        >
          {expanded
            ? "Show less"
            : `Show all ${animations.length} animations`}
        </button>
      </div>
    </section>
  );
}
