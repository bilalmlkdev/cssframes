import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { AnimationShowcase } from "../components/AnimationShowcase";
import { CtaSection } from "../components/CtaSection";
import { Footer } from "../components/Footer";

export function HomePage({ theme, onToggleTheme }) {
  return (
    <div className="mx-auto max-w-[1530px]">
      <Navbar theme={theme} onToggleTheme={onToggleTheme} />
      <main className="flex flex-col">
        <Hero />
        <AnimationShowcase />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
