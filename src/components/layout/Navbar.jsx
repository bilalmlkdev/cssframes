import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { GitHubStarsLink } from "../ui/GitHubStarsLink";
import { Logo } from "../ui/Logo";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useCmdK } from "../../hooks/useCmdK";
import { REPO } from "../../data/site";

const LINKS = [
  { href: "#/introduction", label: "Introduction" },
  { href: "#/installation", label: "Installation" },
  { href: "#/animations", label: "Animations" },
];

function focusSearch() {
  const isDocs = window.location.hash
    .replace(/^#/, "")
    .startsWith("/animations");
  if (isDocs) {
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true }),
    );
    return;
  }
  window.location.hash = "#/animations";
}

export function Navbar({ onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useCmdK(focusSearch);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  return (
    <header className="relative flex items-center justify-between gap-4 px-5 py-2 sm:px-8">
      <a href="#/" className="flex items-center gap-1">
        <Logo className="h-6 w-auto" />
        <span className="text-base font-medium tracking-tight">cssframes</span>
      </a>

      <nav aria-label="Main" className="hidden items-center gap-5 text-sm md:flex">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="transition-colors hover:text-muted">
            {l.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <div className="h-4 w-0.5 bg-[var(--border)]" aria-hidden="true" />
        <GitHubStarsLink repo={REPO} className="text-sm" />
        <ThemeToggle onToggle={onToggleTheme} className="h-8 w-8" />
        <a
          href="#/introduction"
          className="rounded-lg bg-text px-3 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
        >
          Get started
        </a>
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-surface-2 md:hidden"
        >
          {menuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="absolute left-0 right-0 top-full z-50 flex flex-col gap-1 border-y border-border bg-background px-5 py-3 shadow-lg md:hidden"
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-2 py-2 text-sm transition-colors hover:bg-surface-2"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
