import { useCallback, useEffect, useMemo, useState } from "react";
import { animations, buildCss } from "./lib/animations";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { LibrarySection } from "./components/LibrarySection";
import { Footer } from "./components/Footer";
import { DocsPage } from "./components/DocsPage";

function parseRoute() {
  const hash = window.location.hash.replace(/^#/, "");
  const match = hash.match(/^\/animations\/(.+)$/);
  if (match) return { view: "docs", slug: decodeURIComponent(match[1]) };
  if (hash === "/animations") return { view: "docs", slug: null };
  return { view: "home" };
}

export default function App() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );

  // The full library stylesheet: injected once for the site and reused
  // by every copy button, so the page and the copied code never drift.
  const css = useMemo(() => buildCss(animations), []);
  const [route, setRoute] = useState(parseRoute);

  useEffect(() => {
    const onHash = () => setRoute(parseRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      try {
        localStorage.setItem("cssframes-theme", next);
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  }, []);

  if (route.view === "docs") {
    return (
      <div className="min-h-screen bg-background text-text">
        <style>{css}</style>
        <DocsPage
          slug={route.slug}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text">
      <style>{css}</style>
      <div className="mx-auto max-w-[1530px]">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <main className="flex flex-col">
          <Hero />
          <LibrarySection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
