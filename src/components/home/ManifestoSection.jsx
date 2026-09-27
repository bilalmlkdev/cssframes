export function ManifestoSection() {
  return (
    <section className="px-5 pb-24 pt-8 sm:px-8 sm:pb-32">
      <p className="mx-auto max-w-[1120px] font-heading text-[clamp(1.5rem,3.6vw,2.9rem)] font-light leading-[1.18] tracking-[-0.02em]">
        <span className="text-highlight-a">CSSframes</span> is an open-source
        collection of pure CSS animations designed for developers who want
        motion without the overhead, and built to work in any project. Made with{" "}
        <span className="text-highlight-b">no JavaScript, no dependencies</span>
        , and no build step, cssframes is designed to be a beautiful and
        functional part of your every day workflow.
      </p>

      <div className="mx-auto mt-20 grid max-w-[1120px] gap-x-16 gap-y-14 md:grid-cols-3">
        <div>
          <h3 className="font-heading text-[22px] font-normal">
            It is just CSS
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">
            One stylesheet, plain <code className="font-mono">@keyframes</code>,
            and a class name. There is no library object to instantiate and no
            runtime that has to load before the motion appears.
          </p>
        </div>
        <div>
          <h3 className="font-heading text-[22px] font-normal">
            It stays yours
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">
            Every animation reads three CSS variables. Set them once globally,
            on a subtree, or on a single element, and the motion retimes itself
            without touching a rule.
          </p>
        </div>
        <div>
          <h3 className="font-heading text-[22px] font-normal">
            It gets out of the way
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">
            The stylesheet ships with a{" "}
            <code className="font-mono">prefers-reduced-motion</code> query, so
            the whole library switches off for anyone who has asked their system
            for less movement.
          </p>
        </div>
      </div>
    </section>
  );
}
