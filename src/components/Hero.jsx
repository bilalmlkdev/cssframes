import { animations, categories } from "../lib/animations";

export function Hero() {
  return (
    <section id="top">
      <div className="flex min-h-[56vh] flex-col items-center justify-center px-6 py-24 text-center">
          <h1 className="font-serif text-[12.5vw] leading-[.90] tracking-tight sm:text-6xl md:text-7xl lg:text-[130px]">
            {animations.length} animations,
            <br />
            {categories.length} categories,
            <br />
            one stylesheet.
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-snug text-muted sm:text-lg lg:text-2xl">
            Cssframes is an open-source repository of{" "}
            <a
              href="#library"
              className="underline decoration-[0.07em] underline-offset-[0.15em] transition-colors hover:text-text"
            >
              pure CSS keyframe animations
            </a>
            , designed to be a reference for anyone adding motion to an
            interface.
          </p>
      </div>
    </section>
  );
}
