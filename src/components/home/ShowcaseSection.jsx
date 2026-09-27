import { categories, animations } from "../../data/animations";

const BLURB = {
  entrances: "Elements that arrive, without a flash of unstyled content.",
  exits: "Elements that leave, without leaving a hole behind them.",
  attention: "Motion that pulls the eye to the one thing that matters.",
  loops: "Ambient motion that runs until something stops it.",
  text: "Type that assembles itself, character by character.",
};

const byCategory = Object.fromEntries(
  categories.map((c) => [c.id, animations.filter((a) => a.category === c.id)]),
);

export function ShowcaseSection() {
  return (
    <section className="px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1120px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-[22ch] font-heading text-[clamp(2rem,5vw,3.4rem)] font-light leading-[1.02] tracking-[-0.03em]">
            Forty five animations, sorted by what they are for.
          </h2>
          <a
            href="#/animations"
            className="group inline-flex items-center gap-2 pb-1 text-[14px]"
          >
            <span className="border-b border-border pb-0.5 transition-colors group-hover:border-text">
              See the full index
            </span>
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              aria-hidden="true"
              className="text-muted transition-transform group-hover:translate-x-0.5"
            >
              <path
                d="M1 6.5h10M7 2.5l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <ul className="mt-16 border-t border-border">
          {categories.map((c) => {
            const list = byCategory[c.id] || [];
            return (
              <li key={c.id} className="border-b border-border">
                <a
                  href="#/animations"
                  className="group grid gap-x-8 gap-y-2 py-7 transition-colors sm:grid-cols-[auto_1fr_auto] sm:items-baseline"
                >
                  <span className="font-heading text-[clamp(1.5rem,3vw,2.1rem)] font-light tracking-[-0.02em]">
                    {c.label}
                  </span>
                  <span className="max-w-[48ch] text-[15px] leading-relaxed text-muted">
                    {BLURB[c.id]}
                  </span>
                  <span className="flex items-baseline gap-4 sm:justify-end">
                    <span className="font-mono text-[13px] text-muted">
                      {String(list.length).padStart(2, "0")}
                    </span>
                    <span className="text-[13px] text-muted underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-current">
                      Browse
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
