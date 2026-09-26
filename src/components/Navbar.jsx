import { useEffect } from "react";
import { Moon, Search, Sun } from "lucide-react";

function focusSearch() {
  document.getElementById("library")?.scrollIntoView({ behavior: "smooth" });
  window.setTimeout(() => {
    document.getElementById("library-search")?.focus();
  }, 400);
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
    <header className="col-span-12 grid grid-cols-12 gap-px bg-border">
      {/* Logo cell */}
      <div className="col-span-7 flex items-end bg-background p-4 md:col-span-4">
        <a
          href="#top"
          className="font-serif text-2xl leading-none tracking-normal sm:text-[37px]"
        >
          The Component Gallery
        </a>
      </div>

      {/* Search + theme cell */}
      <div className="col-span-5 flex items-end justify-between bg-background py-2 px-3 md:col-span-4">
        <button
          type="button"
          onClick={focusSearch}
          className="flex items-center gap-2 rounded-lg text-base uppercase tracking-wide transition-colors hover:bg-surface-2"
        >
          <span className="hidden sm:inline">Search</span>
          <Search size={14} />
          <span className="hidden gap-1 md:flex">
            <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted">
              ⌘
            </kbd>
            <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted">
              K
            </kbd>
          </span>
        </button>
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label="Toggle color theme"
          className="flex h-10 w-10 items-center justify-center rounded-lg p-2.5 transition-colors hover:bg-surface-2"
        >
          {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>

      {/* Nav cell */}
      <nav className="col-span-12 hidden items-end bg-background p-4 md:col-span-4 md:flex">
        <ul className="flex w-full items-baseline justify-between text-[17px] uppercase tracking-wide">
          <li>
            <a href="#library" className="transition-colors hover:text-muted">
              Animations
            </a>
          </li>
          <li>
            <a href="#usage" className="transition-colors hover:text-muted">
              How to use
            </a>
          </li>
          <li>
            <a
              href="https://github.com/bilalmlkdev/cssframes"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-muted"
            >
              GitHub
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
