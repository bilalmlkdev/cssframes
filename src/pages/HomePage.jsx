import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { FaqSection } from "../components/FaqSection";
import { Footer } from "../components/Footer";

export function HomePage({ onToggleTheme }) {
  return (
    <div className="mx-auto w-full max-w-[1440px]">
      <Navbar onToggleTheme={onToggleTheme} />
      <main className="flex flex-col">
        <Hero />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
