import { useEffect, useState } from "react";
import { Moon, Search, Sun } from "lucide-react";
import { animations, categories } from "../data/animations";
import { REPO } from "../data/site";
import { GitHubStarsLink } from "./GitHubStarsLink";
import { SearchDialog } from "./SearchDialog";
import favicon from "../assets/favicon/favicon.svg";

export function DocsLayout({
  active,
  slug,
  theme,
  onToggleTheme,
  children,
}) {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col overflow-y-auto border-r border-dashed border-border px-5 py-6 md:flex">
        <a href="#/" className="flex items-center gap-2 pb-7">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <img src={favicon} alt="" className="h-4 w-4 dark:invert" />
          </span>
          <span className="text-lg font-medium tracking-tight">cssframes</span>
        </a>

        <nav className="flex flex-col gap-0.5">
          <p className="px-2 pb-1 pt-2 text-sm text-muted">Get Started</p>
          <a
            href="#/introduction"
            className={`rounded-md px-2 py-1.5 text-sm transition-colors ${
              active === "introduction"
                ? "bg-surface-2 font-medium text-text"
                : "text-muted hover:bg-surface-2 hover:text-text"
            }`}
          >
            Introduction
          </a>
          <a
            href="#/installation"
            className={`rounded-md px-2 py-1.5 text-sm transition-colors ${
              active === "installation"
                ? "bg-surface-2 font-medium text-text"
                : "text-muted hover:bg-surface-2 hover:text-text"
            }`}
          >
            Installation
          </a>

          {categories.map((cat) => (
            <div key={cat.id} className="mt-5">
              <p className="px-2 pb-1 text-sm text-muted">{cat.label}</p>
              <div className="flex flex-col gap-0.5">
                {animations
                  .filter((a) => a.category === cat.id)
                  .map((a) => (
                    <a
                      key={a.slug}
                      href={`#/animations/${a.slug}`}
                      className={`rounded-md px-2 py-1.5 text-sm transition-colors ${
                        active === "animation" && a.slug === slug
                          ? "bg-surface-2 font-medium text-text"
                          : "text-muted hover:bg-surface-2 hover:text-text"
                      }`}
                    >
                      {a.name}
                    </a>
                  ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Right side: top bar + page */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur sm:px-6">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex w-full max-w-xs items-center gap-2 rounded-lg bg-surface-2 px-3 py-2 text-left text-sm text-muted transition-colors hover:text-text sm:max-w-sm"
          >
            <Search size={14} className="shrink-0" />
            <span className="flex-1 truncate">Search animations...</span>
            <kbd className="hidden rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] sm:block">
              ⌘ K
            </kbd>
          </button>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle color theme"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-text"
            >
              {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <GitHubStarsLink repo={REPO} className="text-sm" />
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </div>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
