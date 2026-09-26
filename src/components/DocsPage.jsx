import { useEffect, useState } from "react";
import { Check, Copy, Moon, RefreshCw, Sun } from "lucide-react";
import {
  animations,
  animCss,
  buildCss,
  categories,
  findAnimation,
} from "../lib/animations";
import { copyText } from "../lib/copy";
import { GithubIcon } from "./GithubIcon";
import favicon from "../assets/favicon/favicon.svg";

const OBJECTS = ["box", "circle", "text", "button"];
const REPO = "https://github.com/bilalmlkdev/cssframes";

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

function CopyBtn({ onClick, copied }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1 rounded-md bg-surface-2 px-2 py-1 text-[11px] text-muted transition-colors hover:text-text"
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
  );
}

function CodeBlock({ code, copied, onCopy, maxH }) {
  return (
    <div className="relative">
      <pre
        className={`overflow-auto rounded-lg bg-code-bg px-4 py-3 font-mono text-xs leading-relaxed text-code-text ${maxH || ""}`}
      >
        {code}
      </pre>
      <span className="absolute right-2 top-2">
        <CopyBtn onClick={onCopy} copied={copied} />
      </span>
    </div>
  );
}

function Preview({ anim }) {
  const [object, setObject] = useState(
    anim.category === "text" ? "text" : "box",
  );
  const [duration, setDuration] = useState(anim.duration);
  const [infinite, setInfinite] = useState(Boolean(anim.iteration));
  const [replay, setReplay] = useState(0);
  const [animKey, setAnimKey] = useState(anim.slug);

  if (animKey !== anim.slug) {
    setAnimKey(anim.slug);
    setObject(anim.category === "text" ? "text" : "box");
    setDuration(anim.duration);
    setInfinite(Boolean(anim.iteration));
    setReplay((r) => r + 1);
  }

  return (
    <div>
      <div className="flex min-h-[340px] items-center justify-center rounded-xl border border-border bg-surface">
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
                object === o ? "bg-text text-background" : "text-muted hover:text-text"
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
          className="ml-auto flex items-center gap-1.5 rounded-lg bg-surface-2 px-2.5 py-1.5 text-xs text-text transition-colors hover:text-muted"
        >
          <RefreshCw size={12} />
          Replay
        </button>
      </div>
    </div>
  );
}

export function DocsPage({ slug, theme, onToggleTheme }) {
  const anim = findAnimation(slug) || animations[0];
  const [tab, setTab] = useState("preview");
  const [copiedKey, setCopiedKey] = useState(null);
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
  const categoryLabel = categories.find((c) => c.id === anim.category)?.label;

  const usage = `<div class="cf-animated cf-${anim.slug}">Hello</div>`;
  const css = `${animCss(anim)}\n\n${anim.keyframes}`;
  const codeSnippet = `${usage}\n\n${css}`;
  const vars = `.cf-animated.cf-${anim.slug} {
  --cf-duration: ${anim.duration}ms;
  --cf-delay: 0s;
  --cf-iteration: ${anim.iteration || "1"};
}`;

  const doCopy = async (text, key) => {
    const ok = await copyText(text);
    if (ok) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1600);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col overflow-y-auto border-r border-dashed border-border px-5 py-6 md:flex">
        <a href="#/" className="flex items-center gap-2 pb-6">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <img src={favicon} alt="" className="h-4 w-4 dark:invert" />
          </span>
          <span className="text-lg font-medium tracking-tight">cssframes</span>
        </a>

        <nav className="flex flex-col gap-0.5">
          <a
            href="#/"
            className="rounded-md px-2 py-1.5 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-text"
          >
            Home
          </a>

          {categories.map((cat) => (
            <div key={cat.id} className="mt-5">
              <p className="px-2 text-sm font-medium text-muted">
                {cat.label}
              </p>
              <div className="mt-1 flex flex-col gap-0.5">
                {animations
                  .filter((a) => a.category === cat.id)
                  .map((a) => (
                    <a
                      key={a.slug}
                      href={`#/animations/${a.slug}`}
                      className={`rounded-md px-2 py-1.5 text-sm transition-colors ${
                        a.slug === anim.slug
                          ? "bg-surface-2 font-medium text-text"
                          : "text-muted hover:bg-surface-2 hover:text-text"
                      }`}
                    >
                      {a.name}
                    </a>
                  ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-auto flex items-center gap-1 pt-4">
          <a
            href={REPO}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-text"
          >
            <GithubIcon size={15} />
            GitHub
          </a>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle color theme"
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-text"
          >
            {theme === "dark" ? (
              <Moon size={15} />
            ) : (
              <Sun size={15} />
            )}
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="min-w-0 flex-1">
        {/* Mobile nav */}
        <div className="flex gap-1 overflow-x-auto border-b border-border px-4 py-3 md:hidden">
          {animations.map((a) => (
            <a
              key={a.slug}
              href={`#/animations/${a.slug}`}
              className={`whitespace-nowrap rounded-md px-2.5 py-1 text-xs ${
                a.slug === anim.slug
                  ? "bg-surface-2 font-medium text-text"
                  : "text-muted"
              }`}
            >
              {a.name}
            </a>
          ))}
        </div>

        <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {anim.name}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
            {anim.desc}
          </p>

          {/* Examples */}
          <h2 className="mt-12 text-2xl font-semibold tracking-tight">
            Examples
          </h2>
          <p className="mt-6 text-base font-medium">Basic usage</p>

          <div className="mt-3 flex gap-6 border-b border-border">
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

          <div className="mt-5">
            {tab === "preview" ? (
              <Preview anim={anim} />
            ) : (
              <CodeBlock
                code={codeSnippet}
                maxH="max-h-96"
                copied={copiedKey === "usage"}
                onCopy={() => doCopy(codeSnippet, "usage")}
              />
            )}
          </div>

          {/* Installation */}
          <h2 className="mt-14 text-2xl font-semibold tracking-tight">
            Installation
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Add the base class plus {anim.name.toLowerCase()} to your markup, or
            copy the full stylesheet into your project.
          </p>
          <div className="mt-4">
            <CodeBlock
              code={`<!-- add to your html -->\n${usage}`}
              copied={copiedKey === "html"}
              onCopy={() => doCopy(usage, "html")}
            />
          </div>
          <div className="mt-3">
            <CodeBlock
              code={vars}
              copied={copiedKey === "vars"}
              onCopy={() => doCopy(vars, "vars")}
            />
          </div>
          <button
            type="button"
            onClick={() => doCopy(buildCss(), "full")}
            className="mt-4 flex items-center gap-2 rounded-lg bg-text px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            {copiedKey === "full" ? (
              <>
                <Check size={14} /> Copied
              </>
            ) : (
              <>
                <Copy size={14} /> Copy full cssframes.css
              </>
            )}
          </button>

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
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm transition-colors hover:bg-surface-2"
              >
                &lt; {prev.name}
              </a>
            ) : (
              <span />
            )}
            {next && (
              <a
                href={`#/animations/${next.slug}`}
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm transition-colors hover:bg-surface-2"
              >
                {next.name} &gt;
              </a>
            )}
          </div>

          <p className="mt-10 text-xs text-muted">
            {categoryLabel} - cf-{anim.slug}
          </p>
        </div>
      </main>
    </div>
  );
}
