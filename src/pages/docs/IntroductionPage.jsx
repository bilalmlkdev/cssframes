import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { copyText } from "../../lib/copy";

const usageSnippet = `<div class="cf-animated cf-zoom-in">Hello</div>`;

const varsSnippet = `.cf-animated.cf-zoom-in {
  --cf-duration: 900ms;
  --cf-delay: 0.2s;
  --cf-iteration: 1;
}`;

const FEATURES = [
  {
    title: "Pure CSS",
    body: "Every animation is a keyframes rule and a class. No JavaScript runs your motion.",
  },
  {
    title: "Copy and paste",
    body: "Grab one animation or the whole stylesheet - there is no package to install to use it.",
  },
  {
    title: "Fully customizable",
    body: "Duration, delay, and iteration live in CSS variables, so you tune motion per element.",
  },
  {
    title: "Reduced motion ready",
    body: "A single media query turns the whole library off for people who ask for less motion.",
  },
];

function Snippet({ code, copied, onCopy }) {
  return (
    <div className="relative">
      <pre className="overflow-x-auto rounded-lg bg-code-bg px-4 py-3 font-mono text-xs leading-relaxed text-code-text">
        {code}
      </pre>
      <button
        type="button"
        onClick={onCopy}
        className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-[11px] text-white/70 transition-colors hover:text-white"
      >
        {copied ? (
          <>
            <Check size={11} /> Copied
          </>
        ) : (
          <>
            <Copy size={11} /> Copy
          </>
        )}
      </button>
    </div>
  );
}

export function IntroductionPage() {
  const [copied, setCopied] = useState(null);

  const doCopy = async (text, key) => {
    const ok = await copyText(text);
    if (ok) {
      setCopied(key);
      setTimeout(() => setCopied(null), 1600);
    }
  };

  return (
    <article className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Introduction
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
        cssframes is an open-source library of pure CSS keyframe animations.
        It is a reference you browse, a stylesheet you copy, and a small set of
        variables you tune - nothing more.
      </p>

      <h2 className="mt-12 text-2xl font-semibold tracking-tight">
        Why cssframes
      </h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {FEATURES.map((f) => (
          <div key={f.title} className="rounded-xl bg-surface-2 p-4">
            <p className="text-sm font-medium">{f.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              {f.body}
            </p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-2xl font-semibold tracking-tight">
        Basic usage
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Two classes do the work. <code className="font-mono text-xs">
          cf-animated
        </code>{" "}
        turns the element on, and the second class picks the animation.
      </p>
      <div className="mt-4">
        <Snippet
          code={usageSnippet}
          copied={copied === "usage"}
          onCopy={() => doCopy(usageSnippet, "usage")}
        />
      </div>

      <h2 className="mt-12 text-2xl font-semibold tracking-tight">
        Tuning with variables
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Set the variables globally, on a parent, or on the element itself.
        Every animation falls back to its own default duration.
      </p>
      <div className="mt-4">
        <Snippet
          code={varsSnippet}
          copied={copied === "vars"}
          onCopy={() => doCopy(varsSnippet, "vars")}
        />
      </div>

      <h2 className="mt-12 text-2xl font-semibold tracking-tight">
        Respecting reduced motion
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Give people who ask for less motion an off switch. Drop this into your
        stylesheet and the library stays still.
      </p>
      <div className="mt-4">
        <Snippet
          code={`@media (prefers-reduced-motion: reduce) {
  .cf-animated {
    animation: none;
  }
}`}
          copied={copied === "motion"}
          onCopy={() =>
            doCopy(
              `@media (prefers-reduced-motion: reduce) {\n  .cf-animated {\n    animation: none;\n  }\n}`,
              "motion",
            )
          }
        />
      </div>

      <div className="mt-14 flex justify-between">
        <span />
        <a
          href="#/installation"
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm transition-colors hover:bg-surface-2"
        >
          Installation &gt;
        </a>
      </div>
    </article>
  );
}
