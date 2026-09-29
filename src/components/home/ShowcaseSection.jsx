import { ArrowRight } from "lucide-react";
import { categories, animations } from "../../data/animations";

const BLURB = {
  entrances: "Bring elements into view with controlled, quiet motion.",
  exits: "Remove elements without the jarring snap of a hard cut.",
  attention: "Use motion where something genuinely needs attention.",
  loops: "Keep loaders and ambient details moving with CSS alone.",
  text: "Give typography a little personality without a JS timeline.",
};

const SAMPLE = {
  entrances: { slug: "fade-in-up", label: "fade-in-up", shape: "box" },
  exits: { slug: "fade-out-up", label: "fade-out-up", shape: "box" },
  attention: { slug: "bounce", label: "bounce", shape: "dot" },
  loops: { slug: "spin", label: "spin", shape: "ring" },
  text: { slug: "tracking-in", label: "tracking-in", shape: "text" },
};

const byCategory = Object.fromEntries(
  categories.map((c) => [c.id, animations.filter((a) => a.category === c.id)]),
);

function Preview({ category }) {
  const sample = SAMPLE[category.id];

  if (sample.shape === "text") {
    return (
      <span className="cf-animated cf-tracking-in font-heading text-[19px] tracking-tight">
        type
      </span>
    );
  }

  if (sample.shape === "dot") {
    return (
      <span className="cf-animated cf-bounce h-12 w-12 rounded-full border border-text bg-background" />
    );
  }

  if (sample.shape === "ring") {
    return (
      <span className="cf-animated cf-spin h-10 w-10 rounded-full border border-text border-l-transparent" />
    );
  }

  return (
    <span
      className="cf-animated h-11 w-20 rounded-md border border-border bg-background [--cf-duration:1100ms] [--cf-iteration:infinite]"
      style={{ animationName: `cf-${sample.slug}` }}
    />
  );
}

export function ShowcaseSection() {
  return (
    <section className="px-5 py-22 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="mono-label">The library</p>
            <h2 className="mt-5 max-w-[16ch] font-heading text-[clamp(2.7rem,5vw,4.7rem)] font-light leading-[0.95] tracking-[-0.045em]">
              Pick a motion. Copy the idea.
            </h2>
          </div>
          <a
            href="#/animations"
            className="group inline-flex items-center gap-2 text-[13px] font-medium"
          >
            Open all {animations.length}
            <ArrowRight
              size={13}
              className="text-muted transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>

        <div className="mt-16 grid gap-px border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, index) => {
            const list = byCategory[category.id] || [];
            return (
              <a
                key={category.id}
                href="#/animations"
                className={`group flex min-h-[290px] flex-col justify-between bg-background p-6 transition-colors hover:bg-surface-2 sm:p-7 ${
                  index === categories.length - 1
                    ? "md:col-span-2 xl:col-span-1"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-8 font-heading text-[29px] font-normal leading-none tracking-[-0.025em]">
                      {category.label}
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] text-muted">
                    {String(list.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex items-center gap-6 border-y border-border py-9">
                  <div className="flex h-18 w-24 items-center justify-center border border-dashed border-border bg-surface-2">
                    <Preview category={category} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] tracking-tight text-text">
                      cf-{SAMPLE[category.id].label}
                    </p>
                    <p className="mt-2 max-w-[25ch] text-[13px] leading-[1.65] text-muted">
                      {BLURB[category.id]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-6 text-[12px] text-muted">
                  <span>Browse category</span>
                  <span className="underline decoration-border underline-offset-4 transition-colors group-hover:decoration-text">
                    Explore
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
