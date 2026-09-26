import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { animations, categories } from "../lib/animations";
import { AnimationCard } from "./AnimationCard";
import { PreviewModal } from "./PreviewModal";

export function LibrarySection() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [active, setActive] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return animations.filter((a) => {
      const matchCategory = category === "all" || a.category === category;
      const matchQuery =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.slug.includes(q) ||
        a.category.includes(q);
      return matchCategory && matchQuery;
    });
  }, [query, category]);

  const countFor = (id) => animations.filter((a) => a.category === id).length;

  return (
    <section id="library" className="grid grid-cols-12 gap-px bg-border">
      {/* Section header row */}
      <div className="col-span-12 flex flex-wrap items-center justify-between gap-3 bg-background p-4">
        <h2 className="font-serif text-lg uppercase tracking-wide">
          Animations
          <span className="ml-3 text-sm font-normal normal-case tracking-normal text-muted">
            {filtered.length} of {animations.length}
          </span>
        </h2>
        <a
          href="https://github.com/bilalmlkdev/cssframes"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-sm text-text transition-colors hover:text-muted"
        >
          Star on GitHub
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="h-4 w-4"
          >
            <path
              d="M5 12h14M12 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      {/* Controls row */}
      <div className="col-span-12 flex flex-col gap-3 bg-background p-4 sm:flex-row sm:items-center">
        <div className="relative">
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            id="library-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search animations..."
            className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted focus:border-text sm:w-64"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Pill
            active={category === "all"}
            onClick={() => setCategory("all")}
            label={`All (${animations.length})`}
          />
          {categories.map((c) => (
            <Pill
              key={c.id}
              active={category === c.id}
              onClick={() => setCategory(c.id)}
              label={`${c.label} (${countFor(c.id)})`}
            />
          ))}
        </div>
      </div>

      {/* Cards as hairline grid cells */}
      {filtered.length > 0 ? (
        <ul className="col-span-12 grid grid-cols-12 gap-px bg-border">
          {filtered.map((anim) => (
            <li
              key={anim.slug}
              className="col-span-full sm:col-span-6 lg:col-span-4 xl:col-span-3"
            >
              <AnimationCard anim={anim} onOpen={setActive} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="col-span-12 bg-background p-10 text-center text-sm text-muted">
          No animations match &quot;{query}&quot;.
        </p>
      )}

      <AnimatePresence>
        {active && (
          <PreviewModal anim={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function Pill({ active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md border px-3 py-1.5 text-xs uppercase tracking-wide transition-colors ${
        active
          ? "border-text bg-text text-background"
          : "border-border text-muted hover:text-text"
      }`}
    >
      {label}
    </button>
  );
}
