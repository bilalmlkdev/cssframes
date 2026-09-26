import { Navbar } from "../components/layout/Navbar";
import { Hero } from "../components/home/Hero";
import { IntroSection } from "../components/home/IntroSection";
import { FaqSection } from "../components/home/FaqSection";
import { Footer } from "../components/layout/Footer";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export function HomePage({ onToggleTheme }) {
  useDocumentMeta(
    "cssframes - Open-source CSS animation library",
    "Pure CSS keyframe animations you can preview, copy, and paste into any project. No JavaScript, no dependencies, free and open source.",
  );

  return (
    <div className="mx-auto w-full max-w-[1220px]">
      <Navbar onToggleTheme={onToggleTheme} />
      <main id="main" className="flex flex-col">
        <Hero />
        <IntroSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
