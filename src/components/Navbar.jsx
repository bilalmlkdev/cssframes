import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { GitHubStarsLink } from "./GitHubStarsLink";
import { REPO } from "../data/site";

function focusSearch() {
  const isDocs = window.location.hash
    .replace(/^#/, "")
    .startsWith("/animations");
  if (isDocs) {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
    return;
  }
  window.location.hash = "#/animations";
}

export function Navbar({ theme, onToggleTheme }) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        focusSearch();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
      <a href="#/" className="flex items-center gap-2">
        <span className="text-lg font-medium tracking-tight">cssframes</span>
        <span className="rounded bg-text px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-background">
          beta
        </span>
      </a>

      <div className="flex items-center gap-4 sm:gap-5">
        <nav className="hidden items-center gap-5 text-sm md:flex">
          <a href="#/introduction" className="transition-colors hover:text-muted">
            Introduction
          </a>
          <a href="#/installation" className="transition-colors hover:text-muted">
            Installation
          </a>
          <a href="#/animations" className="transition-colors hover:text-muted">
            Animations
          </a>
        </nav>

        <GitHubStarsLink repo={REPO} className="text-sm" />

        <button
          type="button"
          onClick={onToggleTheme}
          aria-label="Toggle color theme"
          className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-surface-2"
        >
          {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        <a
          href="#/introduction"
          className="rounded-lg bg-text px-3 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
        >
          Get started
        </a>
      </div>
    </header>
  );
}
