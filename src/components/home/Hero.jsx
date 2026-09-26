import { animations } from "../../data/animations";
import DomeGallery from "./DomeGallery";

export function Hero() {
  return (
    <section id="top" className="flex flex-col items-center px-5 pb-20 pt-16 text-center sm:px-8 sm:pt-24">
      <h1 className="max-w-4xl text-4xl leading-tight tracking-[-3px] sm:text-5xl">
        Pure CSS animations you can
        <br className="hidden sm:block" /> copy, paste, and ship anywhere.
      </h1>

      <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
        An open-source collection of {animations.length} keyframe animations
        across 5 categories. Preview every animation live, copy the CSS, and
        drop it into any project - no JavaScript, no dependencies, no build
        step.
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

      {/* Built with */}
      <div className="mt-12 flex flex-col items-start gap-5">
        <div className="flex items-center gap-1.5">
          <svg
            width="8"
            height="8"
            viewBox="0 0 11 11"
            fill="none"
            aria-hidden="true"
            className="relative top-[1px]"
          >
            <path
              d="M1 10V1h9"
              stroke="currentColor"
              strokeWidth="1.6"
              className="text-muted"
            />
          </svg>
          <span className="mono-label">Built with</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-9 gap-y-4 text-muted">
          <span className="flex items-center gap-2 text-sm transition-colors hover:text-text">
            <svg viewBox="-11.5 -10.23 23 20.46" className="h-4 w-4" aria-hidden="true">
              <circle r="2.05" fill="currentColor" />
              <g stroke="currentColor" strokeWidth="1" fill="none">
                <ellipse rx="11" ry="4.2" />
                <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                <ellipse rx="11" ry="4.2" transform="rotate(120)" />
              </g>
            </svg>
            React
          </span>

          <span className="flex items-center gap-2 text-sm transition-colors hover:text-text">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
              <path
                d="M12.5 2 3.5 6.6l3.2 11.6L12.5 2Z"
                fill="currentColor"
                opacity="0.55"
              />
              <path
                d="M12.5 2 20.5 6.4l-3.3 11.8-4.7-8.1"
                fill="currentColor"
              />
            </svg>
            Vite
          </span>

          <span className="flex items-center gap-2 text-sm transition-colors hover:text-text">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
              <path
                d="M2.5 9.5c2.2-4 5.8-4 8 0s5.8 4 8 0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M2.5 14.5c2.2-4 5.8-4 8 0s5.8 4 8 0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Tailwind CSS
          </span>

          <span className="flex items-center gap-2 text-sm transition-colors hover:text-text">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
              <path d="M12 4.5 21.5 20H2.5L12 4.5Z" fill="currentColor" />
            </svg>
            Vercel
          </span>
        </div>
      </div>




            <div className="mt-10 h-[500px] w-[900px] max-w-full overflow-hidden">
        <DomeGallery
          fit={0.6}
          minRadius={300}
          maxRadius={560}
          overlayBlurColor="var(--background)"
          maxVerticalRotationDeg={0}
          segments={34}
          dragDampening={2}
          openedImageWidth="280px"
          openedImageHeight="280px"
          grayscale={false}
        />
      </div>
    </section>
  );
}
