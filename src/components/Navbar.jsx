import { useEffect } from "react";
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

export function Navbar({ onToggleTheme }) {
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
    <header className="flex items-center justify-between gap-4 px-5 py-2 sm:px-8">
      <a href="#/" className="flex items-center gap-1">
      <span>
        <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70" aria-label="cssframes Logo" width="70" height="70" className="h-6 w-auto" fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-width="3" d="M51.883 26.495c-7.277-4.124-18.08-7.004-26.519-7.425-2.357-.118-4.407-.244-6.364 1.06M59.642 51c-10.47-7.25-26.594-13.426-39.514-15.664-3.61-.625-6.744-1.202-9.991.263"></path></svg>
      </span>
        <span className="text-base font-medium tracking-tight">cssframes</span>
      </a>

      <div className="flex items-center gap-3">
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

        
<div className="h-4 w-0.5 bg-[var(--border)]" />
        <GitHubStarsLink repo={REPO} className="text-sm" />
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label="Toggle color theme"
          className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-surface-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4.5"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path><path d="M12 3l0 18"></path><path d="M12 9l4.65 -4.65"></path><path d="M12 14.3l7.37 -7.37"></path><path d="M12 19.6l8.85 -8.85"></path></svg>
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
