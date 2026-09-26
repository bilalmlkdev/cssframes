import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { animations, categories } from "../data/animations";
import { REPO, REPO_URL, X_URL } from "../data/site";
import { GitHubStarsLink } from "./GitHubStarsLink";
import { SearchDialog } from "./SearchDialog";
export function DocsLayout({
  active,
  slug,
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
      <aside className="sticky top-0 hidden h-screen w-60 scrollbar-hidden shrink-0 flex-col overflow-y-auto border-r border-dashed border-border px-5 pt-7.5 pb-25 md:flex">

        <a href="#/" className="flex items-center gap-1 mb-15">
      <span>
        <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70" aria-label="cssframes Logo" width="70" height="70" className="h-8 w-auto" fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-width="3" d="M51.883 26.495c-7.277-4.124-18.08-7.004-26.519-7.425-2.357-.118-4.407-.244-6.364 1.06M59.642 51c-10.47-7.25-26.594-13.426-39.514-15.664-3.61-.625-6.744-1.202-9.991.263"></path></svg>
      </span>
        <span className="text-xl font-medium tracking-tight">cssframes</span>
      </a>

        <nav className="flex flex-col gap-1">
          <p className="px-2 pb-1 pt-2 text-sm text-muted font-medium">Get Started</p>
          <a
            href="#/introduction"
            className={`w-fit rounded-md px-2 py-1.5 text-sm transition-colors ${
              active === "introduction"
                ? "bg-surface-2 font-medium"
                : "hover:bg-surface-2 hover:text-text"
            }`}
          >
            Home
          </a>
          <a
            href="#/installation"
            className={`w-fit rounded-md px-2 py-1.5 text-sm transition-colors ${
              active === "installation"
                ? "bg-surface-2 font-medium"
                : "hover:bg-surface-2 hover:text-text"
            }`}
          >
            Installation
          </a>

          {categories.map((cat) => (
            <div key={cat.id} className="mt-9">
              <p className="px-2 pb-1 text-sm text-muted font-medium">{cat.label} Animations</p>
              <div className="flex flex-col gap-0.5">
                {animations
                  .filter((a) => a.category === cat.id)
                  .map((a) => (
                    <a
                      key={a.slug}
                      href={`#/animations/${a.slug}`}
                      className={`w-fit rounded-md px-2 py-1.5 text-sm transition-colors ${
                        active === "animation" && a.slug === slug
                          ? "bg-surface-2 font-medium"
                          : "hover:bg-surface-2 hover:text-text"
                      }`}
                    >
                      {a.name}
                    </a>
                  ))}
              </div>
            </div>
          ))}

          <p className="mt-9 px-2 pb-1 pt-2 text-sm text-muted font-medium">
            Socials
          </p>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="w-fit rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-surface-2 hover:text-text"
          >
            GitHub
          </a>
          <a
            href={X_URL}
            target="_blank"
            rel="noreferrer"
            className="w-fit rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-surface-2 hover:text-text"
          >
            X (Twitter)
          </a>
          <a
            href="mailto:bilalmlkdev@gmail.com"
            className="w-fit rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-surface-2 hover:text-text"
          >
            Email
          </a>
        </nav>
      </aside>

      {/* Right side: top bar + page */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex items-center justify-end gap-2 bg-background/90 px-4 py-3 backdrop-blur sm:px-6">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-surface-2 px-3 py-2 text-sm text-muted transition-colors hover:text-text sm:w-72"
          >
            <Search size={14} className="shrink-0" />
            <span className="hidden flex-1 truncate text-left sm:block">
              Search animations...
            </span>
            <kbd className="hidden rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] sm:block">
              ⌘ K
            </kbd>
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle color theme"
            className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-surface-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4.5"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M12 3l0 18" />
              <path d="M12 9l4.65 -4.65" />
              <path d="M12 14.3l7.37 -7.37" />
              <path d="M12 19.6l8.85 -8.85" />
            </svg>
          </button>

          <GitHubStarsLink repo={REPO} className="px-2 text-sm" />
        </header>

        <main className="flex-1">{children}</main>
      </div>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
