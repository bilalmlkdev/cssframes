import { Navbar } from "../components/layout/Navbar";
import { Hero } from "../components/home/Hero";
import { ManifestoSection } from "../components/home/ManifestoSection";
import { HowItWorksSection } from "../components/home/HowItWorksSection";
import { ShowcaseSection } from "../components/home/ShowcaseSection";
import { FaqSection } from "../components/home/FaqSection";
import { Footer } from "../components/layout/Footer";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { animations } from "../data/animations";

export function HomePage({ onToggleTheme }) {
  useDocumentMeta(
    "cssframes - Open-source CSS animation library",
    `${animations.length} pure CSS keyframe animations you can preview, copy, and paste into any project. No JavaScript, no dependencies, free and open source.`,
  );

  return (
    <div className="mx-auto w-full max-w-[1280px] border-x border-border">
      <Navbar onToggleTheme={onToggleTheme} fixed />
      <main id="main">
        <Hero />
        <ManifestoSection />
        <HowItWorksSection />
        <ShowcaseSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
