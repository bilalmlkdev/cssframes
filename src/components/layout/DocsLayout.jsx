import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { animations, categories } from "../../data/animations";
import { REPO, REPO_URL, X_URL } from "../../data/site";
import { useCmdK } from "../../hooks/useCmdK";
import { GitHubStarsLink } from "../ui/GitHubStarsLink";
import { Logo } from "../ui/Logo";
import { SearchDialog } from "../ui/SearchDialog";
import { ThemeToggle } from "../ui/ThemeToggle";

function SidebarContent({ active, slug }) {
  const linkClass = (isActive) =>
    `w-fit rounded-md px-2 py-1.5 text-sm transition-colors ${
      isActive ? "bg-surface-2 font-medium" : "hover:bg-surface-2 hover:text-text"
    }`;

  return (
    <>
      <a
        href="#/"
        className="mb-6 flex items-center gap-1"
      >
        <Logo className="h-8 w-auto" />
        <span className="text-xl font-medium tracking-tight">cssframes</span>
      </a>

      <nav aria-label="Documentation" className="flex flex-col gap-1 mt-10">
        <p className="px-2 pb-1 pt-2 text-sm font-medium text-muted">
          Get Started
        </p>
        <a
          href="#/introduction"
          aria-current={active === "introduction" ? "page" : undefined}
          className={linkClass(active === "introduction")}
        >
          Home
        </a>
        <a
          href="#/installation"
          aria-current={active === "installation" ? "page" : undefined}
          className={linkClass(active === "installation")}
        >
          Installation
        </a>
        <a
          href="#/animations"
          aria-current={active === "animations" ? "page" : undefined}
          className={linkClass(active === "animations")}
        >
          Animation library
        </a>

        {categories.map((cat) => (
          <div key={cat.id} className="mt-15">
            <p className="px-2 pb-1 text-sm font-medium text-muted">
              {cat.label} Animations
            </p>
            <div className="flex flex-col gap-0.5">
              {animations
                .filter((a) => a.category === cat.id)
                .map((a) => (
                  <a
                    key={a.slug}
                    href={`#/animations/${a.slug}`}
                    aria-current={
                      active === "animation" && a.slug === slug
                        ? "page"
                        : undefined
                    }
                    className={linkClass(
                      active === "animation" && a.slug === slug,
                    )}
                  >
                    {a.name}
                  </a>
                ))}
            </div>
          </div>
        ))}

        <p className="mt-9 px-2 pb-1 pt-2 text-sm font-medium text-muted">
          Socials
        </p>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className={linkClass(false)}
        >
          GitHub
        </a>
        <a
          href={X_URL}
          target="_blank"
          rel="noreferrer"
          className={linkClass(false)}
        >
          X (Twitter)
        </a>
        <a href="mailto:bilalmlkdev@gmail.com" className={linkClass(false)}>
          Email
        </a>
      </nav>
    </>
  );
}

export function DocsLayout({ active, slug, onToggleTheme, children }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useCmdK(() => setSearchOpen(true));

  useEffect(() => {
    const onOpenSearch = () => setSearchOpen(true);
    window.addEventListener("cssframes-open-search", onOpenSearch);
    return () => window.removeEventListener("cssframes-open-search", onOpenSearch);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [drawerOpen]);

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="scrollbar-hidden sticky top-0 hidden h-screen w-60 shrink-0 flex-col overflow-y-auto border-r border-dashed border-border px-5 pt-7.5 pb-25 md:flex">
        <SidebarContent active={active} slug={slug} />
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Documentation menu"
            className="scrollbar-hidden absolute left-0 top-0 flex h-full w-72 max-w-[85vw] flex-col overflow-y-auto border-r border-border bg-background px-5 py-7"
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setDrawerOpen(false)}
              className="mb-4 flex h-8 w-8 items-center justify-center self-end rounded-lg transition-colors hover:bg-surface-2"
            >
              <X size={16} />
            </button>
            <SidebarContent active={active} slug={slug} />
          </div>
        </div>
      )}

      {/* Right side: top bar + page */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex items-center justify-end gap-2 bg-background/90 px-4 py-3 backdrop-blur sm:px-6">
          <button
            type="button"
            aria-label="Open documentation menu"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-surface-2 md:hidden"
          >
            <Menu size={16} />
          </button>

          <button
            type="button"
            aria-label="Search animations"
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-surface-2 px-3 py-2 text-sm text-muted transition-colors hover:text-text sm:w-72"
          >
            <Search size={14} className="shrink-0" aria-hidden="true" />
            <span className="hidden flex-1 truncate text-left sm:block">
              Search animations...
            </span>
            <kbd className="hidden rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] sm:block">
              ⌘ K
            </kbd>
          </button>

          <ThemeToggle onToggle={onToggleTheme} />
          <GitHubStarsLink repo={REPO} className="px-2 text-sm" />
        </header>

        <main id="main" className="flex-1">
          {children}
        </main>
      </div>

      {searchOpen && (
        <SearchDialog onClose={() => setSearchOpen(false)} />
      )}
    </div>
  );
}
