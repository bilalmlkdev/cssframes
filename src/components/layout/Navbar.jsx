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
  const isDocs = window.location.hash.replace(/^#/, "").startsWith("/animations");
  if (isDocs) {
    window.dispatchEvent(new CustomEvent("cssframes-open-search"));
  } else {
    window.location.hash = "#/animations";
  }
}

export function Navbar({ onToggleTheme, fixed = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useCmdK(focusSearch);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  // A fixed bar only earns its blur once the page has scrolled under it.
  useEffect(() => {
    if (!fixed) return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [fixed]);

  const shell = fixed
    ? `fixed inset-x-0 top-0 z-50 backdrop-blur-xl backdrop-saturate-150 ${
        scrolled
          ? "bg-background/70"
          : "border-transparent bg-transparent"
      }`
    : "relative";

  const inner = `mx-auto flex w-full items-center justify-between gap-4 px-5 sm:px-8 ${
    fixed ? "max-w-[1220px]" : ""
  }`;

  return (
    <header className={`${shell} transition-colors duration-200`}>
      <div className={fixed ? `${inner} py-2` : `${inner} py-2`}>
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
      </div>
    </header>
  );
}
