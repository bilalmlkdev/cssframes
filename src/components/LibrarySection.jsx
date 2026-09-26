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
    <section id="library" className="scroll-mt-16 border-t border-border py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mono-label">The library</p>
          <h2 className="mt-1.5 text-2xl font-semibold tracking-tight">
            Pick an animation, copy the code
          </h2>
        </div>
        <p className="text-sm text-muted">
          {filtered.length} of {animations.length}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative">
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search animations..."
            className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent sm:w-64"
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

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((anim) => (
            <AnimationCard key={anim.slug} anim={anim} onOpen={setActive} />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-center text-sm text-muted">
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
      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "border-accent bg-accent text-accent-fg"
          : "border-border bg-surface text-muted hover:text-text"
      }`}
    >
      {label}
    </button>
  );
}
