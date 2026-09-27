import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { createPortal } from "react-dom";
import { X, ChevronDown, Search } from "lucide-react";

function labelOf(item) {
  return item.label || item.name || "";
}

export function Dropdown({
  trigger,
  items,
  onSelect,
  placeholder = "Select...",
  className = "",
  // Rendered in a portal by default so the menu is never clipped by an
  // ancestor with overflow-hidden. Pass false to keep it in normal flow.
  portal = true,
  searchable,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);

  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // A search box only earns its space once the list is long enough to need it.
  const showSearch = searchable ?? items.length > 6;

  const filtered = query.trim()
    ? items.filter(
        (item) =>
          labelOf(item).toLowerCase().includes(query.trim().toLowerCase()) ||
          (item.hint || "").toLowerCase().includes(query.trim().toLowerCase()),
      )
    : items;

  useEffect(() => {
    const t = window.setTimeout(() => setHighlighted(0), 0);
    return () => window.clearTimeout(t);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e) {
      const inTrigger = containerRef.current?.contains(e.target);
      const inPanel = panelRef.current?.contains(e.target);
      if (!inTrigger && !inPanel) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  useEffect(() => {
    if (open && showSearch && inputRef.current) inputRef.current.focus();
  }, [open, showSearch]);

  useEffect(() => {
    if (!open || !listRef.current) return;
    listRef.current
      .querySelector("[data-active]")
      ?.scrollIntoView({ block: "nearest" });
  }, [highlighted, open]);

  // Anchor the menu to the trigger and flip it up when there is no room below.
  // Positioning is done on the node directly so the panel never has to render
  // at the wrong coordinates first.
  useLayoutEffect(() => {
    if (!open) return undefined;
    if (!portal) return undefined;
    const place = () => {
      const t = triggerRef.current;
      const p = panelRef.current;
      if (!t || !p) return;
      const r = t.getBoundingClientRect();
      const h = p.offsetHeight;
      const below = window.innerHeight - r.bottom;
      const above = r.top;
      const flip = below < h + 12 && above > below;
      p.style.left = `${r.left}px`;
      p.style.width = `${r.width}px`;
      if (flip) {
        p.style.top = "auto";
        p.style.bottom = `${window.innerHeight - r.top + 6}px`;
      } else {
        p.style.bottom = "auto";
        p.style.top = `${r.bottom + 6}px`;
      }
      p.style.opacity = "1";
    };
    place();
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [open, portal, items, query]);

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
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
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
      } else if (e.key === "Home") {
        e.preventDefault();
        setHighlighted(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setHighlighted(Math.max(filtered.length - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[highlighted]) handleSelect(filtered[highlighted]);
      } else if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        setQuery("");
      }
    },
    [open, filtered, highlighted, handleSelect],
  );

  const menu = (
    <div
      ref={panelRef}
      className={`overflow-hidden rounded-xl border border-border bg-surface shadow-2xl ${
        portal ? "fixed z-[100]" : "absolute left-0 right-0 z-50 mt-1.5"
      }`}
      style={
        portal
          ? { top: 0, left: 0, opacity: 0, transition: "opacity 120ms ease" }
          : undefined
      }
    >
      {showSearch && filtered.length > 0 && (
        <div className="relative border-b border-border">
          <Search size={14} className="absolute left-3 top-2.5 text-muted" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search..."
            aria-label="Filter options"
            className="w-full bg-transparent py-2.5 pl-9 pr-8 text-sm outline-none placeholder:text-muted"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Clear filter"
              className="absolute right-3 top-2.5 text-muted hover:text-text"
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
                key={item.value || labelOf(item) || i}
                type="button"
                role="option"
                aria-selected={isActive}
                data-active={isActive}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setHighlighted(i)}
                className={`flex w-full items-center gap-3 px-3 py-2 text-left transition-colors ${
                  isActive
                    ? "bg-surface-2 text-text"
                    : "text-muted hover:bg-surface-2 hover:text-text"
                }`}
              >
                {item.icon && (
                  <span className="shrink-0 text-base leading-none">
                    {item.icon}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium">
                    {labelOf(item)}
                  </p>
                  {item.hint && (
                    <p className="truncate text-[11px] text-muted">
                      {item.hint}
                    </p>
                  )}
                </div>
                {item.badge && (
                  <span className="shrink-0 rounded-full bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-muted">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })
        )}
      </div>

      <div className="border-t border-border px-3 py-1.5 text-[10px] text-muted/70">
        {showSearch ? "Type to filter · " : ""}↑↓ Navigate · Enter Select · Esc
        Close
      </div>
    </div>
  );

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs text-text transition-colors hover:border-text/40 focus:outline-none focus:ring-2 focus:ring-text/20 ${className}`}
      >
        <span className={`truncate ${open ? "text-muted" : ""}`}>
          {query || trigger || placeholder}
        </span>
        <ChevronDown
          size={13}
          className={`shrink-0 text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (portal ? createPortal(menu, document.body) : menu)}
    </div>
  );
}
