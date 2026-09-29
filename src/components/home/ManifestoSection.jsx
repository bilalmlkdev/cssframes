import { animations } from "../../data/animations";

const POINTS = [
  {
    number: "01",
    title: "A stylesheet, not a framework",
    body: "One file contains the motion. There is no runtime API to learn, no component wrapper to preserve, and no build plugin hiding what gets shipped.",
  },
  {
    number: "02",
    title: "Tuning stays in CSS",
    body: "Duration, delay, and iteration are custom properties. Change them on one element, a section, or the whole page without editing the keyframes.",
  },
  {
    number: "03",
    title: "Designed to leave cleanly",
    body: "The library is deliberately easy to adopt and just as easy to remove. Delete the stylesheet and the rest of your project keeps working.",
  },
];

export function ManifestoSection() {
  return (
    <section className="px-5 py-22 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-24">
          <div>
            <p className="mono-label">The idea</p>
            <h2 className="mt-5 max-w-[12ch] font-heading text-[clamp(2.7rem,5vw,4.9rem)] font-light leading-[0.94] tracking-[-0.045em]">
              Small motion deserves a small system.
            </h2>
          </div>

          <div className="lg:pt-12">
            <p className="max-w-[60ch] text-[18px] leading-[1.7] text-muted">
              cssframes keeps the useful part of animation work and removes the
              ceremony around it. The result is {animations.length} readable
              keyframe animations that behave like ordinary CSS, because they
              are ordinary CSS.
            </p>
          </div>
        </div>

        <div className="mt-18 grid border-y border-border sm:grid-cols-3">
          {POINTS.map((point) => (
            <article
              key={point.number}
              className="group min-h-[240px] border-b border-border px-0 py-8 sm:border-b-0 sm:border-r sm:px-7 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                  {point.number}
                </span>
                <span className="h-px w-9 bg-border transition-all duration-300 group-hover:w-14 group-hover:bg-text" />
              </div>
              <h3 className="mt-12 max-w-[17ch] font-heading text-[25px] font-normal leading-tight tracking-[-0.02em]">
                {point.title}
              </h3>
              <p className="mt-3 max-w-[35ch] text-[14px] leading-[1.7] text-muted">
                {point.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
