import { useCallback, useMemo, useState } from "react";
import { animations, buildCss } from "./lib/animations";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { LibrarySection } from "./components/LibrarySection";
import { UsageSection } from "./components/UsageSection";
import { Footer } from "./components/Footer";

export default function App() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );

  // The full library stylesheet: injected once for the site and reused
  // by every copy button, so the page and the copied code never drift.
  const css = useMemo(() => buildCss(animations), []);

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

  return (
    <div className="min-h-screen bg-background text-text">
      <style>{css}</style>
      <div className="mx-auto max-w-[1530px]">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <main className="flex flex-col">
          <Hero />
          <LibrarySection />
          <UsageSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
