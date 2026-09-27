import { REPO_URL } from "../../data/site";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { DocsArticle } from "../../components/layout/DocsArticle";
import { Pager } from "../../components/layout/Pager";

export function IntroductionPage() {
  useDocumentMeta(
    "Introduction - cssframes",
    "cssframes is an open-source collection of pure CSS keyframe animations: preview, copy, and paste.",
  );

  return (
    <DocsArticle>
      <h1 className="text-[24px] font-medium tracking-tight">Introduction</h1>

      <div className="mt-6 space-y-5 text-base leading-relaxed">
        <p>
          <span className="font-medium">cssframes</span> is a set of
          customizable, production-ready CSS keyframe animations, making it easy
          to add motion to buttons, cards, page transitions, menus, and loading
          states, quickly and beautifully.
        </p>

        <p>
          <span className="font-medium">cssframes</span> is built with the same
          idea as a component library: one stylesheet, predictable class names,
          and CSS variables for tuning. But instead of shipping components, it
          ships motion. Drop{" "}
          <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-sm">
            cf-animated
          </code>{" "}
          and an animation class like{" "}
          <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-sm">
            cf-zoom-in
          </code>{" "}
          on any element and it animates. No JavaScript runs your motion, and
          there is no package to install - copy the CSS and you are done.
        </p>

        <p>
          Every animation is a plain keyframes rule, so it works in any
          framework or plain HTML. Duration, delay, and iteration live in CSS
          variables, so you tune motion per element without editing the library.
          A single reduced-motion media query turns everything off for people
          who ask for less motion.
        </p>

        <p>
          This project is a work in progress, and we are continuously improving
          and expanding the collection. We would love to hear your feedback or
          see your contributions as it evolves.
        </p>

        <p>
          cssframes is open source. Check out the code and contribute on{" "}
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            GitHub
          </a>
          .
        </p>
      </div>

      <Pager
        prev={null}
        next={{ href: "#/installation", label: "Installation" }}
      />
    </DocsArticle>
  );
}
