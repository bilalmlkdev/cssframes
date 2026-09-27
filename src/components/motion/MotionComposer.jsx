import { useMemo, useState } from "react";
import { GripVertical, Trash2 } from "lucide-react";
import { animations } from "../../data/animations";
import { MotionTarget } from "./MotionTarget";
import { CodeBlock } from "../ui/CodeBlock";
import { useCopy } from "../../hooks/useCopy";
import { animationMood, downloadText, escapeHtml } from "../../lib/motion";
import { animCss } from "../../lib/css";

function compositionMarkup(sequence, target, text, gap) {
  let child = `<span class="cf-composer-target">${escapeHtml(text)}</span>`;
  let elapsed = 0;

  for (let index = 0; index < sequence.length; index += 1) {
    const item = sequence[index];
    const delay = elapsed;
    child = `<span class="cf-animated cf-${item.slug}" style="--cf-duration:${item.duration}ms; --cf-delay:${delay}ms; --cf-iteration:1; animation-fill-mode:both; display:inline-block;">${child}</span>`;
    elapsed += item.duration + gap;
  }

  return `<div class="cf-animation-sequence" data-target="${target}">\n  ${child}\n</div>`;
}

export function MotionComposer({ initialAnimation }) {
  const [sequence, setSequence] = useState([initialAnimation]);
  const [target, setTarget] = useState("heading");
  const [text, setText] = useState("Motion that feels intentional");
  const [gap, setGap] = useState(120);
  const [replay, setReplay] = useState(0);
  const { copiedKey, doCopy } = useCopy();

  const available = animations.filter((item) => !sequence.some((selected) => selected.slug === item.slug));
  const totalDuration = useMemo(
    () => sequence.reduce((total, item) => total + item.duration, 0) + Math.max(0, sequence.length - 1) * gap,
    [sequence, gap],
  );
  const code = useMemo(
    () => compositionMarkup(sequence, target, text, gap),
    [sequence, target, text, gap],
  );

  const addAnimation = (slug) => {
    const item = animations.find((animation) => animation.slug === slug);
    if (!item || sequence.length >= 4) return;
    setSequence((current) => [...current, item]);
    setReplay((value) => value + 1);
  };

  const removeAnimation = (slug) => {
    if (sequence.length <= 1) return;
    setSequence((current) => current.filter((item) => item.slug !== slug));
    setReplay((value) => value + 1);
  };

  const exportSequence = () => {
    const keyframes = sequence.map((item) => animCss(item)).join("\n\n");
    const styles = sequence.map((item) => item.keyframes).join("\n\n");
    const output = `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>cssframes sequence</title>\n<style>\n.cf-animated { animation-fill-mode: both; }\n${keyframes}\n${styles}\n</style>\n</head>\n<body>\n${code}\n</body>\n</html>`;
    downloadText("cssframes-sequence.html", output, "text/html");
  };

  return (
    <section className="mt-14" aria-label="Animation composer">
      <h2 className="text-2xl font-semibold tracking-tight">Compose motion</h2>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Chain entrance, emphasis, text and exit effects into one reusable sequence. Each stage keeps its own keyframes, so the output stays pure CSS.
      </p>

      <div className="mt-4 overflow-hidden rounded-xl border border-border bg-surface">
        <div className="grid gap-0 lg:grid-cols-[1fr_270px]">
          <div className="flex min-h-[270px] items-center justify-center border-b border-border bg-background p-6 lg:border-b-0 lg:border-r">
            <div key={replay}>
              {sequence.reduceRight((child, item, index) => {
                const delay = sequence.slice(0, index).reduce((sum, current) => sum + current.duration + gap, 0);
                return (
                  <span
                    className={`cf-animated cf-${item.slug}`}
                    style={{
                      ...item.style,
                      "--cf-duration": `${item.duration}ms`,
                      "--cf-delay": `${delay}ms`,
                      "--cf-iteration": "1",
                      animationFillMode: "both",
                      animationDuration: `${item.duration}ms`,
                      animationDelay: `${delay}ms`,
                      display: "inline-block",
                    }}
                  >
                    {child}
                  </span>
                );
              }, <MotionTarget target={target} text={text} />)}
            </div>
          </div>

          <div className="space-y-4 p-4 sm:p-5">
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-xs font-medium">Sequence</span>
                <span className="text-[11px] text-muted">{totalDuration}ms total</span>
              </div>
              <div className="space-y-1.5">
                {sequence.map((item, index) => (
                  <div key={item.slug} className="flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-2">
                    <GripVertical size={13} className="text-muted" aria-hidden="true" />
                    <span className="w-4 font-mono text-[10px] text-muted">0{index + 1}</span>
                    <span className="min-w-0 flex-1 truncate text-xs font-medium">{item.name}</span>
                    <span className="text-[10px] text-muted">{animationMood(item)}</span>
                    <button
                      type="button"
                      aria-label={`Remove ${item.name}`}
                      onClick={() => removeAnimation(item.slug)}
                      disabled={sequence.length <= 1}
                      className="rounded p-1 text-muted transition-colors hover:bg-surface-2 hover:text-text disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {sequence.length < 4 && (
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium">Add stage</span>
                <select
                  defaultValue=""
                  onChange={(event) => {
                    addAnimation(event.target.value);
                    event.target.value = "";
                  }}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none"
                >
                  <option value="">Choose an animation...</option>
                  {available.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
              </label>
            )}

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium">Target</span>
              <select value={target} onChange={(event) => setTarget(event.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none">
                <option value="heading">Heading</option>
                <option value="button">Button</option>
                <option value="card">Card</option>
                <option value="notice">Notice</option>
                <option value="avatar">Avatar</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 flex items-center justify-between text-xs font-medium"><span>Gap between stages</span><span className="font-mono text-[10px] text-muted">{gap}ms</span></span>
              <input type="range" min="0" max="500" step="10" value={gap} onChange={(event) => setGap(Number(event.target.value))} className="w-full accent-[var(--accent)]" />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium">Target text</span>
              <input value={text} onChange={(event) => setText(event.target.value)} maxLength={80} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none" />
            </label>

            <div className="flex gap-2">
              <button type="button" onClick={() => setReplay((value) => value + 1)} className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-text px-3 py-2 text-xs font-medium text-background">Replay</button>
              <button type="button" onClick={exportSequence} className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs text-muted hover:bg-surface-2 hover:text-text">Export</button>
            </div>
          </div>
        </div>

        <div className="border-t border-border p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs font-medium">Sequence output</p>
              <p className="mt-1 text-[11px] text-muted">Nested wrappers keep each animation independent.</p>
            </div>
            <button type="button" onClick={() => doCopy(code, "composition")} className="rounded-lg border border-border px-2.5 py-1.5 text-xs hover:bg-surface-2">
              {copiedKey === "composition" ? "Copied" : "Copy sequence"}
            </button>
          </div>
          <div className="mt-3">
            <CodeBlock code={code} lang="markup" maxH="max-h-56" copied={copiedKey === "composition"} onCopy={() => doCopy(code, "composition")} />
          </div>
        </div>
      </div>
    </section>
  );
}
