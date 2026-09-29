import { CSS_URL } from "../../data/site";
import { animations } from "../../data/animations";

const STEPS = [
  {
    number: "01",
    label: "Pick",
    title: "Find a motion that fits the job.",
    detail: `Browse ${animations.length} animations by entrances, exits, attention, loops, and text. Each one has a live preview before you touch the code.`,
  },
  {
    number: "02",
    label: "Paste",
    title: "Use two classes and keep moving.",
    detail:
      "Add the shared base class and the motion class to an element. There is no package API hiding underneath them.",
  },
  {
    number: "03",
    label: "Tune",
    title: "Make it yours with CSS variables.",
    detail:
      "Change duration, delay, or iteration count on the element or an ancestor. The stylesheet itself does not need to change.",
  },
];

const VARIABLES = [
  ["--cf-duration", "800ms", "speed"],
  ["--cf-delay", "0ms", "offset"],
  ["--cf-iteration", "1", "repeat"],
];

export function HowItWorksSection() {
  return (
    <section className="border-y border-border px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1120px]">
        <div className="flex flex-col gap-7 border-b border-border pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mono-label">Small API, real control</p>
            <h2 className="mt-5 max-w-[13ch] font-heading text-[clamp(2.8rem,6vw,5rem)] font-light leading-[0.94] tracking-[-0.04em]">
              Use the motion. Keep the CSS.
            </h2>
          </div>
          <p className="max-w-[45ch] text-[15px] leading-relaxed text-muted sm:text-[16px]">
            The landing page should not need a software architecture diagram to
            explain an animation library. Pick a motion, copy it, then tune the
            few values that matter.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-16">
          <div
            aria-hidden="true"
            className="absolute left-[8%] right-[8%] top-5 hidden border-t border-border lg:block"
          />

          <ol className="grid gap-12 lg:grid-cols-3 lg:gap-0">
            {STEPS.map((step) => (
              <li key={step.number} className="relative lg:px-7 first:lg:pl-0 last:lg:pr-0">
                <div className="flex items-center gap-3">
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background font-mono text-[11px]">
                    {step.number}
                  </span>
                  <span className="mono-label">{step.label}</span>
                </div>

                <h3 className="mt-7 max-w-[16ch] font-heading text-[clamp(1.7rem,3vw,2.35rem)] font-light leading-[1.02] tracking-[-0.025em]">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-[40ch] text-[15px] leading-relaxed text-muted">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-20 border-t border-border pt-10 sm:mt-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="mono-label">The whole interface</p>
              <p className="mt-5 max-w-[33ch] font-heading text-[clamp(1.8rem,3.8vw,2.8rem)] font-light leading-[1.04] tracking-[-0.025em]">
                One selector for the system. One selector for the effect.
              </p>
            </div>

            <div>
              <div className="border-y border-border py-7">
                <div className="overflow-x-auto">
                  <code className="block min-w-max font-mono text-[clamp(1rem,2vw,1.35rem)] tracking-[-0.03em]">
                    <span className="text-muted">&lt;div</span>{" "}
                    <span>className=</span>
                    <span className="text-highlight-a">&quot;cf-animated cf-fade-in-up&quot;</span>
                    <span className="text-muted">&gt;</span>
                  </code>
                </div>
                <p className="mt-5 max-w-[56ch] text-[14px] leading-relaxed text-muted">
                  That is the integration. The library handles the animation
                  rule; your component decides when and where to use it.
                </p>
              </div>

              <div className="mt-7 grid sm:grid-cols-3">
                {VARIABLES.map(([name, value, label], index) => (
                  <div
                    key={name}
                    className={`py-4 sm:px-5 first:pl-0 last:pr-0 ${
                      index > 0 ? "border-t border-border sm:border-l sm:border-t-0" : ""
                    }`}
                  >
                    <code className="font-mono text-[13px] tracking-[-0.02em]">{name}</code>
                    <div className="mt-2 flex items-baseline justify-between gap-3 sm:block">
                      <span className="font-heading text-[25px] font-light tracking-[-0.02em]">
                        {value}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted sm:mt-1 sm:block">
                        {label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap items-baseline justify-between gap-5 border-t border-border pt-7">
            <p className="max-w-[62ch] text-[15px] leading-relaxed text-muted">
              The stylesheet is readable enough to edit and small enough to
              understand. Start with the full file or copy a single animation
              from the docs.
            </p>
            <a
              href={CSS_URL}
              className="border-b border-border pb-0.5 font-mono text-[12px] transition-colors hover:border-text"
            >
              open cssframes.css
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}