import { useCallback, useEffect, useMemo, useState } from "react";
import { animations, findAnimation } from "./data/animations";
import { buildCss } from "./lib/css";
import { ErrorBoundary } from "./components/error/ErrorBoundary";
import { SkipLink } from "./components/ui/SkipLink";
import { DocsLoader } from "./components/ui/DocsLoader";
import { DocsLayout } from "./components/layout/DocsLayout";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { IntroductionPage } from "./pages/docs/IntroductionPage";
import { InstallationPage } from "./pages/docs/InstallationPage";
import { AnimationPage } from "./pages/docs/AnimationPage";

// Hash router: #/ home, #/introduction, #/installation, #/animations/:slug.
// Plain in-page anchors like #top stay on the home view.
function parseRoute() {
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash.startsWith("/")) return { view: "home" };
  if (hash === "/" || hash === "") return { view: "home" };
  if (hash === "/introduction") return { view: "introduction" };
  if (hash === "/installation") return { view: "installation" };
  if (hash === "/animations") {
    return { view: "animation", slug: animations[0].slug };
  }
  const match = hash.match(/^\/animations\/(.+)$/);
  if (match) {
    const slug = decodeURIComponent(match[1]);
    return findAnimation(slug)
      ? { view: "animation", slug }
      : { view: "notfound" };
  }
  return { view: "notfound" };
}

export default function App() {
  const [, setTheme] = useState(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );

  // The full library stylesheet: injected once for the site and reused
  // by every copy button, so the page and the copied code never drift.
  const css = useMemo(() => buildCss(animations), []);
  const [route, setRoute] = useState(parseRoute);

  // First time this session enters the docs from the site, play a short
  // loader. Driven from the hashchange handler so it never sets state
  // inside an effect.
  const [docsLoader, setDocsLoader] = useState(false);

  const maybeShowDocsLoader = useCallback((view) => {
    const isDocs =
      view === "introduction" ||
      view === "installation" ||
      view === "animation";
    if (!isDocs) return;
    try {
      if (sessionStorage.getItem("cssframes-docs-seen") === "1") return;
    } catch {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      sessionStorage.setItem("cssframes-docs-seen", "1");
    } catch {
      /* storage unavailable */
    }
    setDocsLoader(true);
    window.setTimeout(() => setDocsLoader(false), 1250);
  }, []);

  useEffect(() => {
    const onHash = () => {
      const next = parseRoute();
      setRoute(next);
      maybeShowDocsLoader(next.view);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [maybeShowDocsLoader]);

  useEffect(() => {
    if (window.location.hash.startsWith("#/")) {
      window.scrollTo(0, 0);
    }
  }, [route]);

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

  let view;
  if (route.view === "home") {
    view = <HomePage onToggleTheme={toggleTheme} />;
  } else if (route.view === "notfound") {
    view = <NotFoundPage />;
  } else {
    let page;
    if (route.view === "introduction") {
      page = <IntroductionPage />;
    } else if (route.view === "installation") {
      page = <InstallationPage />;
    } else {
      page = <AnimationPage key={route.slug} slug={route.slug} />;
    }
    view = (
      <DocsLayout
        active={route.view}
        slug={route.slug}
        onToggleTheme={toggleTheme}
      >
        {page}
      </DocsLayout>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background text-text">
        <SkipLink />
        {docsLoader && <DocsLoader />}
        <style>{css}</style>
        {view}
      </div>
    </ErrorBoundary>
  );
}
