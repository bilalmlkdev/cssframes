import { useState, useRef, useEffect, useCallback } from "react";
import { X, ChevronDown, Search } from "lucide-react";
import { Logo } from "./Logo";

export function Dropdown({
  trigger,
  items,
  onSelect,
  placeholder = "Select...",
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const filtered = query.trim()
    ? items.filter(
        (item) =>
          (item.label || item.name || "").toLowerCase().includes(query.toLowerCase()) ||
          (item.hint || "").toLowerCase().includes(query.toLowerCase()),
      )
    : items;

  useEffect(() => {
    window.setTimeout(() => setHighlighted(0), 0);
  }, [query]);

  useEffect(() => {
    function onDocClick(e) {
      if (!containerRef.current?.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open || !listRef.current) return;
    const active = listRef.current.querySelector("[data-active]");
    if (active) active.scrollIntoView({ block: "nearest" });
  }, [highlighted, open]);

  const handleSelect = useCallback(
    (item) => {
      onSelect?.(item);
      setOpen(false);
      setQuery("");
    },
    [onSelect],
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (!open) {
        if (e.key === "ArrowDown" || e.key === "Enter") {
          e.preventDefault();
          setOpen(true);
        }
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlighted((p) => Math.min(p + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlighted((p) => Math.max(p - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[highlighted]) handleSelect(filtered[highlighted]);
      } else if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    },
    [open, filtered, highlighted, handleSelect],
  );

  return (
    <div className="relative inline-block w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-fg transition-colors hover:border-accent/40 focus:outline-none focus:ring-2 focus:ring-accent/50 ${className}`}
      >
        <span className={open ? "text-muted" : "text-fg"}>
          {query || trigger || placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 z-50 mt-1.5 overflow-hidden rounded-xl border border-border bg-surface shadow-2xl">
          {filtered.length > 0 && (
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-3 text-muted"
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search..."
                className="w-full bg-transparent py-2.5 pl-9 pr-8 text-sm outline-none placeholder:text-muted"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                  className="absolute right-3 top-3 text-muted hover:text-fg"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          )}

          <div
            ref={listRef}
            role="listbox"
            className="max-h-60 overflow-y-auto py-1"
          >
            {filtered.length === 0 ? (
              <p className="px-4 py-3 text-center text-sm text-muted">
                No results found
              </p>
            ) : (
              filtered.map((item, i) => {
                const isActive = i === highlighted;
                return (
                  <button
                    key={item.value || item.label || i}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    data-active={isActive}
                    onClick={() => handleSelect(item)}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                      isActive
                        ? "bg-surface-2 text-fg"
                        : "text-muted hover:bg-surface-2 hover:text-fg"
                    }`}
                  >
                    {item.icon && (
                      <span className="shrink-0 text-lg">{item.icon}</span>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {item.label || item.name}
                      </p>
                      {item.hint && (
                        <p className="truncate text-xs text-muted">
                          {item.hint}
                        </p>
                      )}
                    </div>
                    {item.badge && (
                      <span className="shrink-0 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-mono text-accent">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>

          <div className="border-t border-border px-4 py-2 text-[10px] text-muted/60">
            ↑↓ Navigate · Enter Select · Esc Close
          </div>
        </div>
      )}
    </div>
  );
}
