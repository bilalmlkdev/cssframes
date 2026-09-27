import { useEffect, useMemo, useState } from "react";
import { Check, Heart, Search, Star, X } from "lucide-react";
import { animations, categories } from "../../data/animations";
import { DocsArticle } from "../../components/layout/DocsArticle";
import { useCopy } from "../../hooks/useCopy";
import { animCss } from "../../lib/css";
import {
  animationMood,
  readCollections,
  readFavorites,
  toggleFavorite,
} from "../../lib/motion";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";

const MOODS = [
  ["all", "All"],
  ["subtle", "Subtle"],
  ["playful", "Playful"],
  ["dramatic", "Dramatic"],
  ["loop", "Loop"],
  ["text", "Text"],
  ["exit", "Exit"],
];

function FavoriteButton({ slug, onChange }) {
  const [active, setActive] = useState(() => readFavorites().includes(slug));
  return (
    <button
      type="button"
      aria-label={active ? "Remove favorite" : "Add favorite"}
      aria-pressed={active}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        const next = toggleFavorite(slug);
        const isActive = next.includes(slug);
        setActive(isActive);
        onChange?.(next);
      }}
      className="rounded-md p-1.5 text-muted transition-colors hover:bg-surface-2 hover:text-text"
    >
      <Heart size={14} fill={active ? "currentColor" : "none"} />
    </button>
  );
}

function AnimationCard({ anim, onFavorite, copied, onCopy }) {
  return (
    <div className="group rounded-xl border border-border bg-surface p-4 transition-colors hover:bg-surface-2">
      <div className="flex items-start justify-between gap-3">
        <a href={`#/animations/${anim.slug}`} className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{anim.name}</p>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">{anim.desc}</p>
        </a>
        <FavoriteButton slug={anim.slug} onChange={onFavorite} />
      </div>

      <a href={`#/animations/${anim.slug}`} className="mt-4 flex h-28 items-center justify-center overflow-hidden rounded-lg border border-border bg-background">
        <span className={`cf-animated cf-${anim.slug} text-sm font-medium`}>Preview</span>
      </a>

      <div className="mt-3 flex items-center justify-between gap-2 text-[10px] text-muted">
        <span>{anim.duration}ms · {animationMood(anim)}</span>
        <button
          type="button"
          onClick={() => onCopy(`${animCss(anim)}\n\n${anim.keyframes}`, anim.slug)}
          className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 transition-colors hover:bg-background hover:text-text"
          aria-label={`Copy ${anim.name} CSS`}
        >
          {copied ? <Check size={12} /> : null}
          {copied ? "Copied" : "Copy CSS"}
        </button>
      </div>
    </div>
  );
}

export function AnimationsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [mood, setMood] = useState("all");
  const [speed, setSpeed] = useState("all");
  const [view, setView] = useState("all");
  const [favorites, setFavorites] = useState(() => readFavorites());
  const [collections, setCollections] = useState(() => readCollections());
  const [copiedKey, setCopiedKey] = useState("");
  const { doCopy } = useCopy();

  useDocumentMeta(
    "Animation library - cssframes",
    "Browse, preview, customize, favorite, compose, and copy pure CSS animations.",
  );

  useEffect(() => {
    const onStorage = () => {
      setFavorites(readFavorites());
      setCollections(readCollections());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = animations.filter((anim) => {
      const matchesQuery = !q || [anim.name, anim.slug, anim.desc, anim.category].some((value) => value.toLowerCase().includes(q));
      const matchesCategory = category === "all" || anim.category === category;
      const matchesMood = mood === "all" || animationMood(anim) === mood;
      const matchesSpeed = speed === "all" || (speed === "fast" ? anim.duration <= 600 : speed === "medium" ? anim.duration > 600 && anim.duration <= 1000 : anim.duration > 1000);
      const matchesView = view === "all" || (view === "favorites" ? favorites.includes(anim.slug) : collections[view]?.includes(anim.slug));
      return matchesQuery && matchesCategory && matchesMood && matchesSpeed && matchesView;
    });
    return result;
  }, [category, collections, favorites, mood, query, speed, view]);

  const setCopied = async (code, slug) => {
    await doCopy(code, `library-${slug}`);
    setCopiedKey(slug);
    window.setTimeout(() => setCopiedKey(""), 1600);
  };

  return (
    <DocsArticle>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-medium tracking-tight">Animations</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
            Browse the full library by intent, speed, category, or your saved collections. Every animation opens into the same interactive playground.
          </p>
        </div>
        <span className="font-mono text-xs text-muted">{items.length} / {animations.length}</span>
      </div>

      <div className="mt-8 space-y-3">
        <label className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2.5">
          <Search size={14} className="shrink-0 text-muted" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, slug, description..." className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted" />
          {query && <button type="button" onClick={() => setQuery("")} className="rounded p-1 text-muted hover:bg-surface-2 hover:text-text"><X size={13} /></button>}
        </label>

        <div className="flex flex-wrap gap-1.5">
          <button type="button" onClick={() => setView("all")} className={`rounded-md border px-2.5 py-1.5 text-xs ${view === "all" ? "border-text bg-text text-background" : "border-border text-muted hover:text-text"}`}>All</button>
          <button type="button" onClick={() => setView("favorites")} className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs ${view === "favorites" ? "border-text bg-text text-background" : "border-border text-muted hover:text-text"}`}><Heart size={12} /> Favorites ({favorites.length})</button>
          {Object.entries(collections).map(([name, slugs]) => (
            <button key={name} type="button" onClick={() => setView(name)} className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs ${view === name ? "border-text bg-text text-background" : "border-border text-muted hover:text-text"}`}><Star size={11} /> {name} ({slugs.length})</button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 border-t border-border pt-3">
          <span className="self-center pr-1 text-[11px] text-muted">Category</span>
          <button type="button" onClick={() => setCategory("all")} className={`rounded-md px-2 py-1 text-xs ${category === "all" ? "bg-surface-2 text-text" : "text-muted hover:text-text"}`}>All</button>
          {categories.map((item) => (
            <button key={item.id} type="button" onClick={() => setCategory(item.id)} className={`rounded-md px-2 py-1 text-xs ${category === item.id ? "bg-surface-2 text-text" : "text-muted hover:text-text"}`}>{item.label}</button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          <span className="self-center pr-1 text-[11px] text-muted">Mood</span>
          {MOODS.map(([id, label]) => (
            <button key={id} type="button" onClick={() => setMood(id)} className={`rounded-md px-2 py-1 text-xs ${mood === id ? "bg-surface-2 text-text" : "text-muted hover:text-text"}`}>{label}</button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          <span className="self-center pr-1 text-[11px] text-muted">Speed</span>
          {["all", "fast", "medium", "slow"].map((id) => (
            <button key={id} type="button" onClick={() => setSpeed(id)} className={`rounded-md px-2 py-1 text-xs capitalize ${speed === id ? "bg-surface-2 text-text" : "text-muted hover:text-text"}`}>{id}</button>
          ))}
        </div>
      </div>

      {items.length ? (
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {items.map((anim) => (
            <AnimationCard
              key={anim.slug}
              anim={anim}
              onFavorite={setFavorites}
              copied={copiedKey === anim.slug}
              onCopy={setCopied}
            />
          ))}
        </div>
      ) : (
        <div className="mt-7 rounded-xl border border-dashed border-border px-5 py-12 text-center">
          <p className="text-sm font-medium">Nothing matches those filters.</p>
          <p className="mt-1 text-xs text-muted">Clear a filter or search term. The animations have not personally offended anyone.</p>
        </div>
      )}
    </DocsArticle>
  );
}
