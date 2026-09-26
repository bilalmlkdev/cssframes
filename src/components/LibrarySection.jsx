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
    <section id="library" className="px-5 pb-16 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
        <h2 className="text-lg font-medium uppercase tracking-wide">
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

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
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
            className="w-full rounded-lg bg-surface-2 py-2 pl-9 pr-3 text-sm outline-none transition-shadow placeholder:text-muted focus:ring-1 focus:ring-text sm:w-64"
          />
        </div>

        <div className="flex flex-wrap gap-1">
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

      {filtered.length > 0 ? (
        <ul className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((anim) => (
            <li key={anim.slug}>
              <AnimationCard anim={anim} onOpen={setActive} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-center text-sm text-muted">
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
      className={`rounded-md px-3 py-1.5 text-xs uppercase tracking-wide transition-colors ${
        active ? "bg-text text-background" : "text-muted hover:text-text"
      }`}
    >
      {label}
    </button>
  );
}
