import { ArrowRight, ArrowUpRight } from "lucide-react";
import { REPO_URL } from "../../data/site";
import { animations } from "../../data/animations";

const COUNT = animations.length;

const MARKS = [
  [String(COUNT), "animations, written by hand"],
  ["1", "file, plain CSS"],
  ["0", "lines of JavaScript"],
];

const LINKS = [
  { href: "#/introduction", label: "Get started" },
  { href: "#/animations", label: "Browse the animations" },
  { href: REPO_URL, label: "Source on GitHub", external: true },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-5 pb-24 pt-10 sm:px-8 sm:pb-28 sm:pt-14">
      {/* typographic ghost, bled off the right edge clear of the headline */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-25 top-8 -z-10 hidden select-none whitespace-nowrap font-mono text-[13vw] font-medium leading-none tracking-tighter text-text/[0.05] lg:block"
      >
        @keyframes
      </span>

      <div className="relative mx-auto w-full max-w-[1120px]">
        <p className="mono-label">An open-source CSS animation library</p>

        <h1 className="mt-8 max-w-[17ch] font-heading text-[clamp(2.9rem,8.5vw,6.5rem)] font-light leading-[0.95] tracking-[-0.035em]">
          Motion belongs in the stylesheet, not the bundle.
        </h1>

        <div className="mt-14 border-t border-border pt-10">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <p className="max-w-[48ch] text-[17px] leading-relaxed text-muted sm:text-[18px]">
              Most motion on the web arrives as a dependency, a runtime, and a
              build step to keep it honest. cssframes takes the opposite
              position: keyframe animations shipped as a single stylesheet you
              can read in one sitting, paste into any project, and delete the
              rest of your tooling over.
            </p>
            <p className="max-w-[48ch] text-[17px] leading-relaxed text-muted sm:text-[18px]">
              There is nothing to import, nothing to hydrate, and nothing to
              configure. Add two class names and the motion is already running.
              Retime it with a CSS variable rather than a rebuild, and ship a
              stylesheet a colleague can actually read.
            </p>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-8">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  {...(l.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className="group inline-flex items-center gap-2 text-[15px]"
                >
                  <span className="border-b border-border pb-0.5 transition-colors group-hover:border-text">
                    {l.label}
                  </span>
                  {l.external ? (
                    <ArrowUpRight
                      size={14}
                      className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  ) : (
                    <ArrowRight
                      size={14}
                      className="text-muted transition-transform group-hover:translate-x-1"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <dl className="mt-20 grid gap-10 border-t border-border pt-10 sm:grid-cols-3">
          {MARKS.map(([value, label]) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd>
                <span className="block font-heading text-[clamp(3rem,6.5vw,4.5rem)] font-light leading-[0.85] tracking-[-0.03em] text-highlight-a">
                  {value}
                </span>
                <span className="mt-3 block max-w-[22ch] text-[14px] leading-snug text-muted">
                  {label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
