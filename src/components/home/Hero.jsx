import { ArrowRight, ArrowUpRight, MoveUpRight } from "lucide-react";
import { REPO_URL } from "../../data/site";
import { animations } from "../../data/animations";

const COUNT = animations.length;

const MOTION_WORD = [
  { letter: "M", animation: "hero-rise", delay: "0ms" },
  { letter: "O", animation: "hero-orbit", delay: "120ms" },
  { letter: "V", animation: "hero-sway", delay: "240ms" },
  { letter: "E", animation: "hero-pulse", delay: "360ms" },
];

const CATEGORY_NOTES = [
  ["01", "entrances"],
  ["02", "attention"],
  ["03", "loops"],
  ["04", "text"],
];

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-14">
      <style>{`
        @keyframes cssframes-hero-rise {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          45% { transform: translateY(-10px) rotate(-1.5deg); }
          70% { transform: translateY(2px) rotate(0.6deg); }
        }

        @keyframes cssframes-hero-orbit {
          0% { transform: rotate(0deg) translateX(0) rotate(0deg); }
          35% { transform: rotate(7deg) translateX(8px) rotate(-7deg); }
          70% { transform: rotate(-4deg) translateX(-4px) rotate(4deg); }
          100% { transform: rotate(0deg) translateX(0) rotate(0deg); }
        }

        @keyframes cssframes-hero-sway {
          0%, 100% { transform: rotate(0deg) translateX(0); }
          25% { transform: rotate(-2deg) translateX(-6px); }
          55% { transform: rotate(1.5deg) translateX(5px); }
          78% { transform: rotate(-0.7deg) translateX(-2px); }
        }

        @keyframes cssframes-hero-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }

        @keyframes cssframes-hero-line {
          0% { transform: translateX(-110%); }
          100% { transform: translateX(210%); }
        }

        @keyframes cssframes-hero-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .cssframes-hero-letter {
          animation-duration: 2.8s;
          animation-timing-function: cubic-bezier(.22, 1, .36, 1);
          animation-iteration-count: infinite;
          animation-delay: var(--hero-delay);
          will-change: transform;
        }

        .cssframes-hero-line {
          animation: cssframes-hero-line 3.6s cubic-bezier(.22, 1, .36, 1) infinite;
        }

        .cssframes-hero-in {
          animation: cssframes-hero-in .75s cubic-bezier(.22, 1, .36, 1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .cssframes-hero-letter,
          .cssframes-hero-line,
          .cssframes-hero-in {
            animation-play-state: paused !important;
          }
        }
      `}</style>

      <div className="mx-auto max-w-[1220px]">
        <div className="border-t border-border">
          <div className="grid lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
            <div className="relative border-b border-border py-10 pr-0 lg:border-b-0 lg:border-r lg:py-14 lg:pr-14">
              <div className="flex items-center justify-between">
                <span className="mono-label">CSS motion / v1.0</span>
                <span className="font-mono text-[11px] text-muted">
                  01 — 04
                </span>
              </div>

              <div
                className="cssframes-hero-in mt-12"
                style={{ animationDelay: "80ms" }}
              >
                <p className="max-w-[15ch] font-heading text-[clamp(4.2rem,8vw,7.2rem)] font-light leading-[0.88] tracking-[-0.055em] sm:max-w-[13ch]">
                  Make every interaction
                  <span className="mt-1 block text-highlight-a">
                    feel alive.
                  </span>
                </p>

                <p className="mt-8 max-w-[44ch] text-[15px] leading-[1.75] text-muted sm:text-[16px]">
                  A hand-written collection of pure CSS keyframes. Preview the
                  motion, copy the CSS, and ship it without bringing JavaScript
                  along for the ride.
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                  <a
                    href="#/animations"
                    className="group inline-flex items-center gap-2 text-[14px] font-medium"
                  >
                    <span className="border-b border-text pb-0.5">
                      Explore the library
                    </span>
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </a>
                  <a
                    href={REPO_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 text-[14px] text-muted"
                  >
                    <span className="border-b border-transparent pb-0.5 group-hover:border-text">
                      View source
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </div>
              </div>

              <div className="mt-14 border-t border-border pt-5">
                <div className="flex items-end justify-between gap-6">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                      The whole point
                    </p>
                    <p className="mt-2 max-w-[30ch] text-[13px] leading-[1.6]">
                      Small, legible CSS that gets out of your way.
                    </p>
                  </div>
                  <MoveUpRight
                    size={18}
                    strokeWidth={1.5}
                    className="shrink-0"
                  />
                </div>
              </div>
            </div>

            <div className="relative min-h-[470px] overflow-hidden py-8 lg:min-h-[590px] lg:py-10">
              <div className="absolute inset-y-0 left-[14%] border-l border-border" />
              <div className="absolute inset-y-0 left-[50%] border-l border-border" />
              <div className="absolute inset-y-0 right-[13%] border-l border-border" />
              <div className="absolute inset-x-0 top-[25%] border-t border-border" />
              <div className="absolute inset-x-0 top-[64%] border-t border-border" />

              <div className="relative h-full">
                <div className="absolute left-[6%] top-0 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  live specimen
                </div>

                <div className="absolute right-[7%] top-0 text-right font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  pure CSS / no runtime
                </div>

                <div className="absolute inset-x-0 top-[16%]">
                  <div className="ml-[5%] flex items-baseline gap-3 overflow-hidden whitespace-nowrap">
                    <span className="font-mono text-[11px] text-muted">
                      .cf-animated
                    </span>
                    <span className="font-mono text-[11px] text-muted">{`{`}</span>
                    <span className="font-mono text-[11px]">animation:</span>
                    <span className="font-mono text-[11px] text-highlight-a">
                      keyframes;
                    </span>
                    <span className="font-mono text-[11px] text-muted">{`}`}</span>
                  </div>
                </div>

                <div className="absolute inset-x-0 top-[32%] flex items-center justify-center">
                  <div className="relative flex items-center font-heading text-[clamp(7rem,18vw,14.5rem)] font-light leading-[0.7] tracking-[-0.085em]">
                    <span className="sr-only">MOVE</span>
                    {MOTION_WORD.map(({ letter, animation, delay }) => (
                      <span
                        key={letter}
                        aria-hidden="true"
                        className="cssframes-hero-letter select-none"
                        style={{
                          animationName: animation,
                          animationDelay: delay,
                          ["--hero-delay"]: delay,
                        }}
                      >
                        {letter}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-[22%] left-[8%] right-[8%]">
                  <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.13em] text-muted">
                    <span>translate</span>
                    <span className="h-px flex-1 overflow-hidden bg-border">
                      <span className="cssframes-hero-line block h-full w-1/3 bg-text" />
                    </span>
                    <span>scale</span>
                    <span className="h-px flex-1 overflow-hidden bg-border">
                      <span className="cssframes-hero-line block h-full w-1/4 bg-highlight-b [animation-delay:1.2s]" />
                    </span>
                    <span>opacity</span>
                  </div>
                </div>

                <div className="absolute bottom-[7%] left-[6%] right-[6%] grid grid-cols-2 gap-x-8 gap-y-3 border-t border-border pt-4 sm:grid-cols-4">
                  {CATEGORY_NOTES.map(([index, label]) => (
                    <a
                      key={label}
                      href="#/animations"
                      className="group flex items-center justify-between gap-3 font-mono text-[11px]"
                    >
                      <span className="text-muted">{index}</span>
                      <span className="transition-transform group-hover:translate-x-0.5">
                        {label}
                      </span>
                    </a>
                  ))}
                </div>

                <div className="absolute bottom-0 left-[6%] font-mono text-[10px] text-muted">
                  {String(COUNT).padStart(2, "0")} animations / ready to paste
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid border-b border-border sm:grid-cols-3">
          <div className="flex items-baseline justify-between gap-5 border-b border-border py-5 sm:border-b-0 sm:border-r sm:pr-7">
            <span className="font-heading text-[2.6rem] font-light leading-none tracking-[-0.04em]">
              {COUNT}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
              animations
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-5 border-b border-border py-5 sm:border-b-0 sm:border-r sm:px-7">
            <span className="font-heading text-[2.6rem] font-light leading-none tracking-[-0.04em]">
              0
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
              JS dependencies
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-5 py-5 sm:pl-7">
            <span className="font-heading text-[2.6rem] font-light leading-none tracking-[-0.04em]">
              ∞
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
              ways to use them
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
