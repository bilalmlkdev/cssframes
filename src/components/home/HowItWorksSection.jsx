import { CSS_URL } from "../../data/site";
import { animations } from "../../data/animations";

const PARTS = [
  {
    token: "cf-animated",
    role: "The base class",
    note: "Carries the shared timing function, fill mode, and iteration count. You write it once and never think about it again.",
  },
  {
    token: "cf-fade-in-up",
    role: "The motion",
    note: `Names the keyframes you actually want. ${animations.length} of these, grouped by what they are for.`,
  },
];

const VARIABLES = [
  ["--cf-duration", "How long a single pass takes."],
  ["--cf-delay", "How long to wait before starting."],
  ["--cf-iteration", "How many times it repeats."],
];

const GUARANTEES = [
  [
    "Readable",
    "Plain CSS you can open and audit. No build output, no minified payload to reverse engineer.",
  ],
  [
    "Portable",
    "React, Next, Astro, Rails, a static page. It works anywhere CSS works, with no adapter.",
  ],
  [
    "Retirable",
    "Delete the one stylesheet and your project is exactly as it was. That is the whole dependency.",
  ],
  [
    "Polite",
    "A prefers-reduced-motion query switches the entire library off for anyone who asks for less movement.",
  ],
];

export function HowItWorksSection() {
  return (
    <section className="border-y border-border px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1120px]">
        <h2 className="max-w-[20ch] font-heading text-[clamp(2rem,5vw,3.4rem)] font-light leading-[1.02] tracking-[-0.03em]">
          Two class names. That is the entire interface.
        </h2>

        {/* anatomy, drawn in type rather than in a code sample */}
        <div className="mt-16 border-t border-border pt-10">
          <p className="mono-label">What you write</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="font-mono text-[clamp(1.1rem,3.4vw,2rem)] tracking-tight">
              cf-animated
            </span>
            <span className="font-mono text-[clamp(1.1rem,3.4vw,2rem)] text-muted">
              +
            </span>
            <span className="font-mono text-[clamp(1.1rem,3.4vw,2rem)] tracking-tight text-highlight-a">
              cf-fade-in-up
            </span>
          </div>

          <dl className="mt-10 grid gap-x-16 gap-y-8 sm:grid-cols-2">
            {PARTS.map((p) => (
              <div key={p.token}>
                <dt className="font-mono text-[13px] text-muted">{p.token}</dt>
                <dd className="mt-2">
                  <span className="block text-[15px]">{p.role}</span>
                  <span className="mt-1.5 block max-w-[42ch] text-[15px] leading-relaxed text-muted">
                    {p.note}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* retiming */}
        <div className="mt-20 border-t border-border pt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="mono-label">How you retime it</p>
            <p className="max-w-[46ch] text-[15px] leading-relaxed text-muted">
              Set a custom property on the element, on any ancestor, or on the
              root. The motion follows, with no rebuild and no new selector.
            </p>
          </div>

          <dl className="mt-8">
            {VARIABLES.map(([name, desc]) => (
              <div
                key={name}
                className="flex flex-wrap items-baseline gap-x-8 gap-y-1 border-b border-border py-4"
              >
                <dt className="font-mono text-[15px] tracking-tight sm:w-[220px]">
                  {name}
                </dt>
                <dd className="flex-1 text-[15px] text-muted">{desc}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* what you get */}
        <div className="mt-20 border-t border-border pt-10">
          <p className="mono-label">What you get in exchange</p>
          <dl className="mt-8 grid gap-x-16 gap-y-10 sm:grid-cols-2">
            {GUARANTEES.map(([term, desc]) => (
              <div key={term}>
                <dt className="font-heading text-[21px] font-normal">{term}</dt>
                <dd className="mt-2 max-w-[44ch] text-[15px] leading-relaxed text-muted">
                  {desc}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-14 max-w-[56ch] text-[17px] leading-relaxed text-muted">
            Start with the{" "}
            <a
              href={CSS_URL}
              className="border-b border-border pb-0.5 text-text transition-colors hover:border-text"
            >
              stylesheet
            </a>
            , or lift a single animation out of the docs and paste it into
            whatever you are already building.
          </p>
        </div>
      </div>
    </section>
  );
}
