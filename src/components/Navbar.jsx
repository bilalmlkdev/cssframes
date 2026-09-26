import { Moon, Sun } from "lucide-react";
import { GithubIcon } from "./GithubIcon";

export function Navbar({ theme, onToggleTheme }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <a href="#top" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent text-[11px] font-bold text-accent-fg">
            C
          </span>
          cssframes
        </a>

        <nav className="hidden items-center gap-6 text-sm text-muted sm:flex">
          <a href="#library" className="transition-colors hover:text-text">
            Animations
          </a>
          <a href="#usage" className="transition-colors hover:text-text">
            How to use
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle color theme"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:text-text"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <a
            href="https://github.com/bilalmlkdev/cssframes"
            target="_blank"
            rel="noreferrer"
            className="flex h-8 items-center gap-1.5 rounded-lg border border-border px-3 text-xs font-medium text-text transition-colors hover:bg-surface-2"
          >
            <GithubIcon size={14} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
