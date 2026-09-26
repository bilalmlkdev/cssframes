import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import {
  animations,
  findAnimation,
} from "../../data/animations";
import { animCss } from "../../lib/css";
import { CodeBlock } from "../../components/CodeBlock";
import { useCopy } from "../../lib/useCopy";

const OBJECTS = ["box", "circle", "text", "button"];

function Target({ object }) {
  if (object === "circle") {
    return <div className="h-20 w-20 rounded-full bg-accent" />;
  }
  if (object === "text") {
    return <span className="text-4xl font-semibold text-accent">Hello</span>;
  }
  if (object === "button") {
    return (
      <span className="rounded-xl bg-accent px-6 py-3 text-sm font-medium text-accent-fg">
        Button
      </span>
    );
  }
  return <div className="h-20 w-20 rounded-3xl bg-text" />;
}

function Preview({ anim }) {
  const [object, setObject] = useState("text");
  const [duration, setDuration] = useState(anim.duration);
  const [infinite, setInfinite] = useState(Boolean(anim.iteration));
  const [replay, setReplay] = useState(0);
  const [animKey, setAnimKey] = useState(anim.slug);

  if (animKey !== anim.slug) {
    setAnimKey(anim.slug);
    setObject("text");
    setDuration(anim.duration);
    setInfinite(Boolean(anim.iteration));
    setReplay((r) => r + 1);
  }

  return (
    <div>
      <div className="flex min-h-[340px] items-center justify-center rounded-xl border border-border bg-surface px-6 sm:px-8">
        <div
          key={`${object}-${replay}`}
          className={`cf-animated cf-${anim.slug}`}
          style={{
            "--cf-duration": `${duration}ms`,
            "--cf-iteration": infinite ? "infinite" : "1",
          }}
        >
          <Target object={object} />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-3">
        <div className="flex rounded-lg bg-surface-2 p-0.5">
          {OBJECTS.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => setObject(o)}
              className={`rounded-md px-2.5 py-1 text-xs capitalize transition-colors ${
                object === o
                  ? "bg-text text-background"
                  : "text-muted hover:text-text"
              }`}
            >
              {o}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-xs text-muted">
          Duration
          <input
            type="range"
            min={100}
            max={3000}
            step={50}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-24 accent-[var(--accent)] sm:w-36"
          />
          <span className="w-12 font-mono text-xs">{duration}ms</span>
        </label>

        <label className="flex cursor-pointer items-center gap-1.5 text-xs text-muted">
          <input
            type="checkbox"
            checked={infinite}
            onChange={(e) => setInfinite(e.target.checked)}
            className="accent-[var(--accent)]"
          />
          Infinite
        </label>

        <button
          type="button"
          onClick={() => setReplay((r) => r + 1)}
          className="ml-auto flex items-center gap-1.5 rounded-lg bg-surface-2 px-2.5 py-1.5 text-xs shadow-xs text-text transition-colors hover:text-muted"
        >
          <RefreshCw size={12} />
          Replay
        </button>
      </div>
    </div>
  );
}

export function AnimationPage({ slug }) {
  const anim = findAnimation(slug);
  const [tab, setTab] = useState("preview");
  const { copiedKey, doCopy } = useCopy();
  const [activeSlug, setActiveSlug] = useState(anim.slug);

  if (activeSlug !== anim.slug) {
    setActiveSlug(anim.slug);
    setTab("preview");
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [anim.slug]);

  const index = animations.findIndex((a) => a.slug === anim.slug);
  const prev = index > 0 ? animations[index - 1] : null;
  const next = index < animations.length - 1 ? animations[index + 1] : null;

  const usage = `<div class="cf-animated cf-${anim.slug}">Hello</div>`;
  const codeSnippet = `${usage}\n\n${animCss(anim)}\n\n${anim.keyframes}`;
  const vars = `.cf-animated.cf-${anim.slug} {
  --cf-duration: ${anim.duration}ms;
  --cf-delay: 0s;
  --cf-iteration: ${anim.iteration || "1"};
}`;

  return (
    <article className="max-w-3xl ml-45 px-5 py-15 sm:px-8">
      <h1 className="text-[24px] font-medium tracking-tight">
        {anim.name}
      </h1>
      <p className="mt-3 text-base leading-relaxed text-muted">
        {anim.desc}
      </p>

      {/* Examples */}
      <h2 className="mt-12 text-2xl font-semibold tracking-tight">
        Examples
      </h2>
      <p className="mt-6 text-base font-medium">Basic usage</p>

      <div className="mt-4 flex px-2 gap-6 border-b border-border">
        <button
          type="button"
          onClick={() => setTab("preview")}
          className={`-mb-px border-b-2 pb-2 text-sm transition-colors ${
            tab === "preview"
              ? "border-text font-medium text-text"
              : "border-transparent text-muted hover:text-text"
          }`}
        >
          Preview
        </button>
        <button
          type="button"
          onClick={() => setTab("code")}
          className={`-mb-px border-b-2 pb-2 text-sm transition-colors ${
            tab === "code"
              ? "border-text font-medium text-text"
              : "border-transparent text-muted hover:text-text"
          }`}
        >
          Code
        </button>
      </div>

      <div className="mt-3">
        {tab === "preview" ? (
          <Preview anim={anim} />
        ) : (
          <CodeBlock
            code={codeSnippet}
            lang="css"
            maxH="max-h-96"
            copied={copiedKey === "usage"}
            onCopy={() => doCopy(codeSnippet, "usage")}
          />
        )}
      </div>

      {/* Usage */}
      <h2 className="mt-14 text-2xl font-semibold tracking-tight">Usage</h2>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Add the base class plus this animation to your markup, tune the
        variables, or copy the full stylesheet into your project.
      </p>
      <div className="mt-4">
        <CodeBlock
          lang="markup"
          code={`${usage}`}
          copied={copiedKey === "html"}
          onCopy={() => doCopy(usage, "html")}
        />
      </div>
      <div className="mt-3">
        <CodeBlock
          lang="css"
          code={vars}
          copied={copiedKey === "vars"}
          onCopy={() => doCopy(vars, "vars")}
        />
      </div>

      {/* Animation API */}
      <h2 className="mt-14 text-2xl font-semibold tracking-tight">
        Animation API
      </h2>
      <p className="mt-4 font-medium">Properties</p>
      <div className="mt-3 overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-surface-2">
              <th className="border-b border-border px-4 py-2.5 font-medium">
                Property
              </th>
              <th className="border-b border-border px-4 py-2.5 font-medium">
                Type
              </th>
              <th className="border-b border-border px-4 py-2.5 font-medium">
                Default
              </th>
              <th className="border-b border-border px-4 py-2.5 font-medium">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b border-border px-4 py-2.5 font-mono text-xs">
                --cf-duration
              </td>
              <td className="border-b border-border px-4 py-2.5 text-muted">
                time
              </td>
              <td className="border-b border-border px-4 py-2.5 font-mono text-xs">
                {anim.duration}ms
              </td>
              <td className="border-b border-border px-4 py-2.5 text-muted">
                How long the animation runs.
              </td>
            </tr>
            <tr>
              <td className="border-b border-border px-4 py-2.5 font-mono text-xs">
                --cf-delay
              </td>
              <td className="border-b border-border px-4 py-2.5 text-muted">
                time
              </td>
              <td className="border-b border-border px-4 py-2.5 font-mono text-xs">
                0ms
              </td>
              <td className="border-b border-border px-4 py-2.5 text-muted">
                Wait before the animation starts.
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-mono text-xs">
                --cf-iteration
              </td>
              <td className="px-4 py-2.5 text-muted">number</td>
              <td className="px-4 py-2.5 font-mono text-xs">
                {anim.iteration || "1"}
              </td>
              <td className="px-4 py-2.5 text-muted">
                Repeat count, use infinite for loops.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Prev / Next */}
      <div className="mt-14 flex items-center justify-between gap-4">
        {prev ? (
          <a
            href={`#/animations/${prev.slug}`}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 shadow-xs text-sm transition-colors hover:bg-surface-2"
          >
            &lt; {prev.name}
          </a>
        ) : (
          <a
            href="#/installation"
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 shadow-xs text-sm transition-colors hover:bg-surface-2"
          >
            &lt; Installation
          </a>
        )}
        {next && (
          <a
            href={`#/animations/${next.slug}`}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 shadow-xs text-sm transition-colors hover:bg-surface-2"
          >
            {next.name} &gt;
          </a>
        )}
      </div>
    </article>
  );
}
