export const FAQS = [
  {
    q: "What is cssframes?",
    a: "An open-source library of pure CSS keyframe animations, shipped as one stylesheet you can copy and paste.",
  },
  {
    q: "Do I need JavaScript to use it?",
    a: "No. Every animation is CSS only. Add the cf-animated class plus an animation class, and the motion runs. The JavaScript on this site is just the docs and previews.",
  },
  {
    q: "How do I install it?",
    a: "Download cssframes.css from the repository, or copy a single animation's CSS from the docs. There is no package to install, and the file is plain CSS.",
  },
  {
    q: "Can I change the duration, delay, or repeat count?",
    a: "Yes. Every animation reads CSS variables: --cf-duration, --cf-delay, and --cf-iteration. Set them globally, on a parent, or on the element itself.",
  },
  {
    q: "Does it work with React, Next.js, or Tailwind?",
    a: "It works anywhere CSS works. Use plain class names in JSX, add them in your template, or drop the stylesheet into a Tailwind project alongside your utilities.",
  },
  {
    q: "What about accessibility and reduced motion?",
    a: "The stylesheet ships with a prefers-reduced-motion media query, so the entire library turns off for people who ask for less motion.",
  },
  {
    q: "Is cssframes free to use?",
    a: "Yes, free and open source under the MIT license. Use it in personal and commercial projects.",
  },
  {
    q: "How can I contribute?",
    a: "Open an issue or pull request on GitHub. Bug fixes, new animations, and docs improvements are all welcome.",
  },
];
