import { useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  Download,
  Heart,
  Plus,
  RotateCcw,
  Star,
  X,
} from "lucide-react";
import { animations, categories } from "../../data/animations";
import { CodeBlock } from "../ui/CodeBlock";
import { Dropdown } from "../ui/Dropdown";
import { useCopy } from "../../hooks/useCopy";
import { MotionTarget } from "./MotionTarget";
import { MotionTimeline } from "./MotionTimeline";
import {
  DIRECTIONS,
  EASINGS,
  FILLS,
  MOTION_PRESETS,
  ORIGINS,
  animationMood,
  animationUsage,
  createInitialSettings,
  downloadText,
  exportSnippets,
  getPreset,
  getAnimationStyle,
  readCollections,
  readFavorites,
  removeCollection,
  removeFromCollection,
  toggleFavorite,
  upsertCollection,
} from "../../lib/motion";

const TARGETS = [
  ["box", "Box"],
  ["button", "Button"],
  ["card", "Card"],
  ["heading", "Heading"],
  ["input", "Input"],
  ["notice", "Notice"],
  ["avatar", "Avatar"],
  ["custom", "Custom HTML"],
];

const EXPORT_LABELS = {
  css: "CSS",
  html: "HTML",
  react: "React",
  vue: "Vue",
  tailwind: "Tailwind",
};

function SelectField({ label, value, onChange, options }) {
  const selected = options.find((option) => option.id === value);
  return (
    <div className="min-w-0">
      <span className="mb-1.5 block text-xs font-medium">{label}</span>
      <Dropdown
        trigger={selected?.label}
        placeholder="Select..."
        items={options.map((option) => ({ ...option, value: option.id }))}
        onSelect={(item) => onChange(item.value)}
      />
    </div>
  );
}

function RangeField({ label, value, min, max, step, suffix, onChange }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between text-xs font-medium">
        <span>{label}</span>
        <span className="font-mono text-[11px] text-muted">
          {value}
          {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-1.5 w-full accent-[var(--accent)]"
      />
    </label>
  );
}

function TargetPicker({ value, onChange }) {
  return (
    <div>
      <span className="mb-2 block text-xs font-medium">Preview target</span>
      <div className="flex flex-wrap gap-1.5">
        {TARGETS.map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`rounded-md border px-2.5 py-1.5 text-xs transition-colors ${
              value === id
                ? "border-text bg-text text-background"
                : "border-border bg-background text-muted hover:text-text"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function FavoriteControl({ slug, onChange, className = "" }) {
  const [favorites, setFavorites] = useState(readFavorites);
  const active = favorites.includes(slug);
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => {
        const next = toggleFavorite(slug);
        setFavorites(next);
        onChange?.(next);
      }}
      className={`inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs transition-colors hover:bg-surface-2 ${className}`}
    >
      <Heart size={13} fill={active ? "currentColor" : "none"} />
      {active ? "Saved" : "Favorite"}
    </button>
  );
}

function CollectionControl({ slug, onChange }) {
  const [open, setOpen] = useState(false);
  const [collections, setCollections] = useState(readCollections);
  const [name, setName] = useState("");
  const entries = Object.entries(collections);

  const refresh = (next) => {
    setCollections(next);
    onChange?.(next);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs transition-colors hover:bg-surface-2"
        aria-expanded={open}
      >
        <Star size={13} />
        Collection
        <ChevronDown size={12} />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-20 mt-2 w-64 rounded-xl border border-border bg-background p-3 shadow-xl">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium">Save animation to</p>
            <button
              type="button"
              aria-label="Close collection menu"
              onClick={() => setOpen(false)}
              className="rounded p-1 text-muted hover:bg-surface-2 hover:text-text"
            >
              <X size={13} />
            </button>
          </div>
          {entries.length > 0 ? (
            <div className="mt-3 space-y-1">
              {entries.map(([collection, slugs]) => {
                const selected = slugs.includes(slug);
                return (
                  <button
                    type="button"
                    key={collection}
                    onClick={() => {
                      const next = selected
                        ? removeFromCollection(collection, slug)
                        : upsertCollection(collection, slug);
                      refresh(next);
                    }}
                    className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-xs hover:bg-surface-2"
                  >
                    <span className="truncate">{collection}</span>
                    {selected && <Check size={13} />}
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="mt-3 text-xs leading-relaxed text-muted">
              No collections yet. Create one below. It stays entirely in your
              browser.
            </p>
          )}
          <form
            className="mt-3 flex gap-1.5 border-t border-border pt-3"
            onSubmit={(event) => {
              event.preventDefault();
              if (!name.trim()) return;
              refresh(upsertCollection(name, slug));
              setName("");
            }}
          >
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="New collection"
              className="min-w-0 flex-1 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs outline-none"
            />
            <button
              type="submit"
              className="rounded-md bg-text px-2.5 py-1.5 text-xs text-background"
            >
              <Plus size={13} />
            </button>
          </form>
          {entries.length > 0 && (
            <button
              type="button"
              onClick={() => {
                const target = prompt("Collection name to delete");
                if (target && collections[target])
                  refresh(removeCollection(target));
              }}
              className="mt-3 text-[11px] text-muted underline underline-offset-2 hover:text-text"
            >
              Delete a collection
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function PresetStrip({ onApply }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-xs font-medium">Motion presets</span>
        <span className="text-[11px] text-muted">
          Tune the preset after applying.
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {MOTION_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            title={preset.description}
            onClick={() => onApply(getPreset(preset.id))}
            className="rounded-md border border-border px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-text/40 hover:text-text"
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function MotionWorkbench({ anim }) {
  const [settings, setSettings] = useState(() => createInitialSettings(anim));
  const [replay, setReplay] = useState(0);
  const [copyMessage, setCopyMessage] = useState("");
  const [exportType, setExportType] = useState("css");
  const { copiedKey, doCopy } = useCopy();

  const snippets = useMemo(
    () => exportSnippets(anim, settings),
    [anim, settings],
  );

  const usage = animationUsage(anim, settings);
  const related = useMemo(() => {
    return animations
      .filter((item) => item.slug !== anim.slug)
      .filter(
        (item) =>
          item.category === anim.category ||
          animationMood(item) === animationMood(anim),
      )
      .slice(0, 4);
  }, [anim]);

  useEffect(() => {
    if (!copyMessage) return undefined;
    const timeout = window.setTimeout(() => setCopyMessage(""), 1800);
    return () => window.clearTimeout(timeout);
  }, [copyMessage]);

  const update = (key, value) =>
    setSettings((current) => ({ ...current, [key]: value }));

  const replayAnimation = () => setReplay((current) => current + 1);

  const applyPreset = (preset) => {
    setSettings((current) => ({
      ...current,
      duration: preset.duration,
      delay: preset.delay,
      easing: preset.easing,
      iteration: preset.iteration,
      direction: preset.direction,
      fill: preset.fill,
    }));
    replayAnimation();
  };

  const reset = () => {
    setSettings(createInitialSettings(anim));
    replayAnimation();
  };

  const copyOutput = async (type) => {
    await doCopy(snippets[type], `export-${type}`);
    setCopyMessage(`${EXPORT_LABELS[type]} copied`);
  };

  const downloadOutput = (type) => {
    const extension =
      type === "react"
        ? "jsx"
        : type === "vue"
          ? "vue"
          : type === "html"
            ? "html"
            : "txt";
    const mime =
      type === "css"
        ? "text/css"
        : type === "html" || type === "react" || type === "vue"
          ? "text/plain"
          : "text/plain";
    downloadText(`cssframes-${anim.slug}.${extension}`, snippets[type], mime);
  };

  return (
    <section
      className="mt-5"
      aria-label={`${anim.name} interactive playground`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FavoriteControl slug={anim.slug} />
          <CollectionControl slug={anim.slug} />
        </div>
        <span className="text-[11px] text-muted">
          Browser-only settings · nothing is uploaded
        </span>
      </div>

      <div className="mt-3 overflow-hidden rounded-xl border border-border bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3">
          <div>
            <p className="text-sm font-medium">Interactive playground</p>
            <p className="mt-0.5 text-xs text-muted">
              Experiment first. Copy second. A revolutionary concept,
              apparently.
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs text-muted transition-colors hover:bg-surface-2 hover:text-text"
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>

        <div className="grid gap-0 lg:grid-cols-[1fr_280px]">
          <div className="flex min-h-[360px] items-center justify-center overflow-hidden border-b border-border bg-background p-6 lg:border-b-0 lg:border-r sm:min-h-[410px]">
            <div
              key={`${anim.slug}-${replay}-${settings.target}`}
              className={`cf-animated cf-${anim.slug}`}
              style={getAnimationStyle(anim, settings)}
            >
              <MotionTarget
                target={settings.target}
                text={settings.text}
                customHtml={settings.customHtml}
              />
            </div>
          </div>

          <div className="space-y-5 p-4 sm:p-5">
            <TargetPicker
              value={settings.target}
              onChange={(value) => update("target", value)}
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <RangeField
                label="Duration"
                value={settings.duration}
                min={100}
                max={3000}
                step={50}
                suffix="ms"
                onChange={(value) => update("duration", value)}
              />
              <RangeField
                label="Delay"
                value={settings.delay}
                min={0}
                max={1500}
                step={25}
                suffix="ms"
                onChange={(value) => update("delay", value)}
              />
            </div>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium">
                {settings.target === "custom" ? "Custom HTML" : "Target text"}
              </span>
              {settings.target === "custom" ? (
                <textarea
                  value={settings.customHtml}
                  onChange={(event) => update("customHtml", event.target.value)}
                  className="min-h-24 w-full rounded-lg border border-border bg-background px-3 py-2 font-mono text-[11px] leading-relaxed outline-none"
                  maxLength={2000}
                  spellCheck="false"
                  aria-label="Custom HTML target"
                />
              ) : null}
              {settings.target !== "custom" ? (
                <input
                  value={settings.text}
                  onChange={(event) => update("text", event.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none"
                  maxLength={80}
                />
              ) : null}
            </label>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <SelectField
                label="Easing"
                value={settings.easing}
                onChange={(value) => update("easing", value)}
                options={EASINGS}
              />
              <SelectField
                label="Direction"
                value={settings.direction}
                onChange={(value) => update("direction", value)}
                options={DIRECTIONS}
              />
              <SelectField
                label="Iterations"
                value={settings.iteration}
                onChange={(value) => update("iteration", value)}
                options={[
                  { id: "1", label: "1×" },
                  { id: "2", label: "2×" },
                  { id: "3", label: "3×" },
                  { id: "infinite", label: "Infinite" },
                ]}
              />
              <SelectField
                label="Fill mode"
                value={settings.fill}
                onChange={(value) => update("fill", value)}
                options={FILLS}
              />
              <SelectField
                label="Transform origin"
                value={settings.origin}
                onChange={(value) => update("origin", value)}
                options={ORIGINS}
              />
            </div>

            <button
              type="button"
              onClick={replayAnimation}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-text px-3 py-2 text-xs font-medium text-background transition-opacity hover:opacity-80"
            >
              <RotateCcw size={12} /> Replay animation
            </button>
          </div>
        </div>
      </div>

      <MotionTimeline settings={settings} />

      <div className="mt-5">
        <PresetStrip onApply={applyPreset} />
      </div>

      <div className="mt-6 border-t border-border pt-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-medium">
              Copy or export this exact setup
            </h3>
            <p className="mt-1 text-xs text-muted">
              Every control above is reflected in the generated output.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(EXPORT_LABELS).map(([type, label]) => (
              <button
                key={type}
                type="button"
                onClick={() => setExportType(type)}
                className={`rounded-md border px-2.5 py-1.5 text-xs ${
                  exportType === type
                    ? "border-text bg-text text-background"
                    : "border-border text-muted hover:text-text"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3">
          <CodeBlock
            code={snippets[exportType]}
            lang={
              exportType === "css"
                ? "css"
                : exportType === "html"
                  ? "markup"
                  : "jsx"
            }
            maxH="max-h-80"
            copied={copiedKey === `export-${exportType}`}
            onCopy={() => copyOutput(exportType)}
          />
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => copyOutput(exportType)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium transition-colors hover:bg-surface-2"
            >
              {copiedKey === `export-${exportType}` ? (
                <Check size={13} />
              ) : null}
              {copyMessage || `Copy ${EXPORT_LABELS[exportType]}`}
            </button>
            <button
              type="button"
              onClick={() => downloadOutput(exportType)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs text-muted transition-colors hover:bg-surface-2 hover:text-text"
            >
              <Download size={13} /> Download
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-5">
        <h3 className="text-sm font-medium">The short version</h3>
        <div className="mt-3 rounded-lg border border-border bg-surface px-4 py-3 font-mono text-[11px] leading-relaxed text-muted">
          {usage}
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-medium">Related motion</h3>
            <p className="mt-1 text-xs text-muted">
              Keep exploring without leaving the animation workflow.
            </p>
          </div>
          <span className="text-[11px] text-muted">
            {categories.find((category) => category.id === anim.category)
              ?.label || "Animations"}
          </span>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {related.map((item) => (
            <a
              key={item.slug}
              href={`#/animations/${item.slug}`}
              className="group rounded-lg border border-border p-3 transition-colors hover:bg-surface-2"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-[10px] text-muted opacity-0 transition-opacity group-hover:opacity-100">
                  Open
                </span>
              </div>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
                {item.desc}
              </p>
              <div className="mt-2 text-[10px] text-muted">
                {item.duration}ms · {animationMood(item)}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
