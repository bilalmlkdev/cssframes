import { animations } from "../../data/animations";

export function IntroSection() {
  return (
    <section className="px-5 pb-20 sm:px-8">
      <p className="mx-auto max-w-4xl text-2xl leading-[1.4] tracking-[-0.5px] sm:text-3xl">
        <span className="text-highlight-a">cssframes</span> is an open-source
        collection of {animations.length} pure CSS animations for developers
        who want motion without the overhead. Every effect is plain CSS: copy
        it, paste it into any project, and ship with{" "}
        <span className="text-highlight-b">
          no JavaScript, no dependencies
        </span>
        , and no build step.
      </p>
    </section>
  );
}
