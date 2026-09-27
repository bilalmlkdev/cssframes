import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { animations, categories } from "../../data/animations";
import { GET_STARTED } from "../../data/site";

function buildItems() {
  const pages = GET_STARTED.map((p) => ({
    label: p.title,
    hint: p.blurb,
    href: p.href,
    group: "Get Started",
  }));
  const library = {
    label: "Animation library",
    hint: "Browse, filter, favorite, and compose all animations",
    href: "#/animations",
    group: "Animations",
  };
  const anims = animations.map((a) => ({
    label: a.name,
    hint: `cf-${a.slug}`,
    href: `#/animations/${a.slug}`,
    group: categories.find((c) => c.id === a.category)?.label || "Animations",
  }));
  return [...pages, library, ...anims];
}

function goTo(href) {
  window.location.hash = href;
}

// Mounted by the parent only while open, so state resets on every open.
export function SearchDialog({ onClose }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const items = useMemo(() => buildItems(), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        i.hint.toLowerCase().includes(q) ||
        i.group.toLowerCase().includes(q),
    );
  }, [items, query]);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    inputRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, []);

  const choose = (item) => {
    goTo(item.href);
    onClose();
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && results[selected]) {
      e.preventDefault();
      choose(results[selected]);
    } else if (e.key === "Tab") {
      // Simple focus trap: keep Tab inside the dialog.
      const focusables = dialogRef.current?.querySelectorAll(
        'input, button, [href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]">
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search animations and pages"
        onKeyDown={onKeyDown}
        className="relative w-full max-w-lg overflow-hidden rounded-xl bg-surface shadow-2xl"
      >
        <div className="flex items-center gap-2 border-b border-border px-4">
          <Search
            size={15}
            className="shrink-0 text-muted"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="search-results"
            aria-autocomplete="list"
            aria-activedescendant={
              results[selected] ? `search-option-${selected}` : undefined
            }
            aria-label="Search animations and pages"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(0);
            }}
            placeholder="Search animations and pages..."
            className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-muted"
          />
          <kbd className="shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted">
            esc
          </kbd>
        </div>

        <div
          id="search-results"
          role="listbox"
          aria-label="Search results"
          className="max-h-[50vh] overflow-y-auto p-2"
        >
          {results.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-muted">
              No results for &quot;{query}&quot;.
            </p>
          ) : (
            results.map((item, i) => (
              <button
                key={item.href}
                id={`search-option-${i}`}
                type="button"
                role="option"
                aria-selected={i === selected}
                onClick={() => choose(item)}
                onMouseEnter={() => setSelected(i)}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                  i === selected ? "bg-surface-2" : ""
                }`}
              >
                <span className="text-sm font-medium">{item.label}</span>
                <span className="truncate text-xs text-muted">
                  {item.group}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
