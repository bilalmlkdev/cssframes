import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { GithubIcon } from "./GithubIcon";

const REPO_URL = "https://github.com/bilalmlkdev/cssframes";

function formatStars(n) {
  if (n >= 1000) {
    const k = n / 1000;
    return `${k >= 10 ? Math.round(k) : Math.round(k * 10) / 10}k`;
  }
  return String(n);
}

function focusSearch() {
  document.getElementById("library")?.scrollIntoView({ behavior: "smooth" });
  window.setTimeout(() => {
    document.getElementById("library-search")?.focus();
  }, 400);
}

export function Navbar({ theme, onToggleTheme }) {
  const [stars, setStars] = useState(null);

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

  useEffect(() => {
    fetch("https://api.github.com/repos/bilalmlkdev/cssframes")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {
        /* rate limited or offline: count stays hidden */
      });
  }, []);

  return (
    <header className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
      <a href="#top" className="flex items-center gap-2">
        <span className="text-lg font-medium tracking-tight">cssframes</span>
        <span className="rounded bg-text px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-background">
          beta
        </span>
      </a>

      <div className="flex items-center gap-4 sm:gap-5">
        <nav className="hidden items-center gap-5 text-sm md:flex">
          <a href="#library" className="transition-colors hover:text-muted">
            Animations
          </a>
          <a href="#usage" className="transition-colors hover:text-muted">
            How to use
          </a>
        </nav>

        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub repository"
          className="flex items-center gap-1.5 text-sm transition-colors hover:text-muted"
        >
          <GithubIcon size={16} />
          {stars !== null && <span className="font-mono text-xs">{formatStars(stars)}</span>}
        </a>

        <button
          type="button"
          onClick={onToggleTheme}
          aria-label="Toggle color theme"
          className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-surface-2"
        >
          {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        <a
          href="#usage"
          className="rounded-lg bg-text px-3 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
        >
          Get started
        </a>
      </div>
    </header>
  );
}
