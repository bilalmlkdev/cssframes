import { useMemo, useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";
import { animations, findAnimation } from "../../data/animations";
import { animCss } from "../../lib/css";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { useCopy } from "../../hooks/useCopy";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { DocsArticle } from "../../components/layout/DocsArticle";
import { Pager } from "../../components/layout/Pager";
import { MotionWorkbench } from "../../components/motion/MotionWorkbench";
import { MotionComposer } from "../../components/motion/MotionComposer";

export function AnimationPage({ slug }) {
  const anim = findAnimation(slug);
  const [tab, setTab] = useState("preview");
  const { copiedKey, doCopy } = useCopy();

  useDocumentMeta(
    `${anim.name} animation - cssframes`,
    `${anim.desc} Tune it live, compose it with other effects, and copy the CSS for ${anim.name}.`,
  );

  const index = animations.findIndex((a) => a.slug === anim.slug);
  const prev = index > 0 ? animations[index - 1] : null;
  const next = index < animations.length - 1 ? animations[index + 1] : null;

  const usage = `<div class="cf-animated cf-${anim.slug}">Hello</div>`;
  const codeSnippet = useMemo(
    () => `${usage}\n\n${animCss(anim)}\n\n${anim.keyframes}`,
    [anim, usage],
  );
  const vars = `.cf-animated.cf-${anim.slug} {
  --cf-duration: ${anim.duration}ms;
  --cf-delay: 0ms;
  --cf-iteration: ${anim.iteration || "1"};
}`;

  return (
    <DocsArticle>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="mono-label">Animation / {anim.category}</p>
          <h1 className="mt-2 text-[24px] font-medium tracking-tight">
            {anim.name}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
            {anim.desc}
          </p>
        </div>
        <span className="rounded-md border border-border px-2.5 py-1.5 font-mono text-[10px] text-muted">
          cf-{anim.slug}
        </span>
      </div>

      <MotionWorkbench anim={anim} />

      <MotionComposer initialAnimation={anim} />

      <h2 className="mt-14 text-2xl font-semibold tracking-tight">Examples</h2>
      <p className="mt-6 text-base font-medium">Basic usage</p>

      <div className="mt-4 flex gap-6 border-b border-border px-2">
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
          <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-xl border border-border bg-surface">
            <div
              key={`static-${anim.slug}`}
              className={`cf-animated cf-${anim.slug}`}
            >
              <span className="rounded-xl border border-border bg-background px-6 py-4 text-sm font-medium">
                Preview target
              </span>
            </div>
            <button
              type="button"
              onClick={(event) => {
                const target = event.currentTarget.previousElementSibling;
                if (!(target instanceof HTMLElement)) return;
                target.classList.remove("cf-animated");
                void target.offsetWidth;
                target.classList.add("cf-animated");
              }}
              className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-muted hover:text-text"
            >
              <RefreshCw size={12} /> Replay
            </button>
          </div>
        ) : (
          <div className="relative">
            <CodeBlock
              code={codeSnippet}
              lang="css"
              maxH="max-h-96"
              copied={copiedKey === "usage"}
              onCopy={() => doCopy(codeSnippet, "usage")}
            />
            <button
              type="button"
              onClick={() => doCopy(codeSnippet, "usage")}
              className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-code-bg px-2 py-1 text-[10px] text-code-text transition-colors hover:bg-surface-2"
            >
              {copiedKey === "usage" ? <Check size={11} /> : <Copy size={11} />}
              {copiedKey === "usage" ? "Copied" : "Copy"}
            </button>
          </div>
        )}
      </div>

      <h2 className="mt-14 text-2xl font-semibold tracking-tight">Usage</h2>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Add the base class plus the animation class to your element. The
        generated playground above can then tune the variables without changing
        the animation source itself.
      </p>
      <div className="mt-4">
        <CodeBlock
          lang="markup"
          code={usage}
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

      <h2 className="mt-14 text-2xl font-semibold tracking-tight">
        Animation API
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Every animation exposes the standard CSS animation controls shown in the
        playground. The defaults below are generated from the animation source.
      </p>
      <div className="mt-4 overflow-x-auto rounded-lg border border-border">
        <table
          aria-label="Animation API properties"
          className="w-full border-collapse text-left text-sm"
        >
          <thead>
            <tr className="bg-surface-2">
              <th
                scope="col"
                className="border-b border-border px-4 py-2.5 font-medium"
              >
                Property
              </th>
              <th
                scope="col"
                className="border-b border-border px-4 py-2.5 font-medium"
              >
                Type
              </th>
              <th
                scope="col"
                className="border-b border-border px-4 py-2.5 font-medium"
              >
                Default
              </th>
              <th
                scope="col"
                className="border-b border-border px-4 py-2.5 font-medium"
              >
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "--cf-duration",
                "time",
                `${anim.duration}ms`,
                "How long the animation runs.",
              ],
              [
                "--cf-delay",
                "time",
                "0ms",
                "Wait before the animation starts.",
              ],
              [
                "--cf-iteration",
                "number",
                anim.iteration || "1",
                "Repeat count, use infinite for loops.",
              ],
              [
                "animation-timing-function",
                "easing",
                anim.timing || "ease-out",
                "Controls the pace between keyframes.",
              ],
              [
                "animation-direction",
                "keyword",
                "normal",
                "Controls which direction iterations play.",
              ],
              [
                "animation-fill-mode",
                "keyword",
                "both",
                "Controls styles before and after the animation.",
              ],
              [
                "transform-origin",
                "position",
                "center",
                "Sets the origin for transforms such as scale and rotate.",
              ],
            ].map(([property, type, defaultValue, description]) => (
              <tr key={property}>
                <td className="border-b border-border px-4 py-2.5 font-mono text-xs">
                  {property}
                </td>
                <td className="border-b border-border px-4 py-2.5 text-muted">
                  {type}
                </td>
                <td className="border-b border-border px-4 py-2.5 font-mono text-xs">
                  {defaultValue}
                </td>
                <td className="border-b border-border px-4 py-2.5 text-muted">
                  {description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pager
        prev={
          prev
            ? { href: `#/animations/${prev.slug}`, label: prev.name }
            : { href: "#/installation", label: "Installation" }
        }
        next={
          next ? { href: `#/animations/${next.slug}`, label: next.name } : null
        }
      />
    </DocsArticle>
  );
}
