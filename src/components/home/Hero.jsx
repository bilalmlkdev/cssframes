
export function Hero() {
  return (
    <section id="top" className="flex flex-col items-center px-5 pb-20 pt-16 text-center sm:px-8 sm:pt-24">
      <h1 className="font-heading max-w-4xl text-4xl leading-tight tracking-[-1px] sm:text-5xl">
        Pure CSS animations you can
        <br className="hidden sm:block" /> copy, paste, and ship anywhere.
      </h1>

      <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
        An open-source library of pure CSS keyframe animations. Preview every
        animation live, copy the CSS, and drop it into any project - no
        JavaScript, no dependencies, no build step.
      </p>


      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#/introduction"
          className="flex items-center gap-2 rounded-full shadow-xs bg-text px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
        >
          Get Started
        </a>
        <a
          href="#/animations"
          className="flex items-center gap-2 rounded-full shadow-xs bg-border px-4 py-2.5 text-sm font-medium text-text transition-opacity hover:opacity-80"
        >
          View Animations
        </a>
      </div>

    </section>
  );
}
