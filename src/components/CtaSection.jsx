export function CtaSection() {
  return (
    <section className="flex flex-col items-center px-5 pb-24 pt-10 text-center sm:px-8">
      <h2 className="max-w-2xl text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl">
        Start animating your
        <br />
        next interface today
      </h2>

      <a
        href="#/introduction"
        className="mt-8 flex items-center gap-2 rounded-lg bg-text px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
      >
        Get started
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="h-4 w-4"
        >
          <path
            d="M5 12h14M12 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>

      <p className="mt-5 text-sm text-muted">
        Free and open source - MIT licensed - works with any framework
      </p>
    </section>
  );
}
