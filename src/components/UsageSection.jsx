import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { buildCss } from "../lib/css";
import { copyText } from "../lib/copy";

function CodeBlock({ code, copyKey, copiedKey, onCopy }) {
  return (
    <div className="relative">
      <pre className="overflow-x-auto rounded-lg bg-code-bg px-4 py-3 font-mono text-xs leading-relaxed text-code-text">
        {code}
      </pre>
      <button
        type="button"
        onClick={() => onCopy(code, copyKey)}
        className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-[11px] text-white/70 transition-colors hover:text-white"
      >
        {copiedKey === copyKey ? (
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

const VARIABLES = [
  {
    name: "--cf-duration",
    desc: "How long the animation runs. Defaults to each animation's own value.",
  },
  { name: "--cf-delay", desc: "Wait before the animation starts." },
  {
    name: "--cf-iteration",
    desc: "How many times it runs. Use infinite for loops.",
  },
];

export function UsageSection() {
  const [copiedKey, setCopiedKey] = useState(null);

  const doCopy = async (text, key) => {
    const ok = await copyText(text);
    if (ok) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1600);
    }
  };

  const usageSnippet = `<div class="cf-animated cf-zoom-in">Hi</div>`;
  const varsSnippet = `.cf-animated.cf-zoom-in {
  --cf-duration: 1.2s;
  --cf-delay: 0.3s;
  --cf-iteration: 1;
}`;
  const motionSnippet = `@media (prefers-reduced-motion: reduce) {
  .cf-animated {
    animation: none;
  }
}`;

  return (
    <section id="usage" className="px-5 pb-16 sm:px-8">
      <div className="pt-4">
        <h2 className="text-lg font-medium uppercase tracking-wide">
          How to use
        </h2>
        <p className="mt-1 text-sm text-muted">
          Three steps, no build tools.
        </p>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        <Step n={1} title="Add the stylesheet">
        <p className="text-sm leading-relaxed text-muted">
          Copy the whole library into a cssframes.css file, or paste it into
          your existing stylesheet.
        </p>
        <button
          type="button"
          onClick={() => doCopy(buildCss(), "full")}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-xs font-medium text-accent-fg transition-opacity hover:opacity-90"
        >
          {copiedKey === "full" ? (
            <>
              <Check size={12} /> Copied
            </>
          ) : (
            <>
              <Copy size={12} /> Copy full cssframes.css
            </>
          )}
        </button>
      </Step>

      <Step n={2} title="Apply two classes">
        <p className="text-sm leading-relaxed text-muted">
          cf-animated turns the element on, the second class picks which
          animation runs.
        </p>
        <div className="mt-3">
          <CodeBlock
            code={usageSnippet}
            copyKey="usage"
            copiedKey={copiedKey}
            onCopy={doCopy}
          />
        </div>
      </Step>

      <Step n={3} title="Tune the variables">
        <p className="text-sm leading-relaxed text-muted">
          Set CSS variables globally, on a parent, or on the element itself.
        </p>
        <div className="mt-3">
          <CodeBlock
            code={varsSnippet}
            copyKey="vars"
            copiedKey={copiedKey}
            onCopy={doCopy}
          />
        </div>
      </Step>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-base font-medium">Every variable</h3>
        <dl className="mt-3 space-y-3">
          {VARIABLES.map((v) => (
            <div key={v.name}>
              <dt className="font-mono text-xs text-accent">{v.name}</dt>
              <dd className="mt-0.5 text-xs leading-relaxed text-muted">
                {v.desc}
              </dd>
            </div>
          ))}
        </dl>
      </div>

        <div>
          <h3 className="text-base font-medium">Respect reduced motion</h3>
        <p className="mt-2 text-xs leading-relaxed text-muted">
          Give users who ask for less motion an off switch. Drop this in your
          stylesheet and the library stays still.
        </p>
        <div className="mt-3">
          <CodeBlock
            code={motionSnippet}
            copyKey="motion"
            copiedKey={copiedKey}
            onCopy={doCopy}
          />
        </div>
        </div>
      </div>
    </section>
  );
}

function Step({ n, title, children }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs text-muted">
          {String(n).padStart(2, "0")}
        </span>
        <h3 className="text-base font-medium uppercase tracking-wide">
          {title}
        </h3>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
