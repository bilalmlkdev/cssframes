import { Check, Copy, GitBranch } from "lucide-react";
import { buildCss } from "../../lib/css";
import { CodeBlock } from "../../components/CodeBlock";
import { useCopy } from "../../lib/useCopy";
import { REPO, REPO_CLONE, REPO_URL } from "../../data/site";
import { GithubIcon } from "../../components/GithubIcon";

const usageSnippet = `<link rel="stylesheet" href="cssframes.css" />

<div class="cf-animated cf-fade-in-up">
  Hello
</div>`;

const requirements = [
  {
    title: "Using the library",
    body: "Any modern browser. The output is plain CSS, so it works with every framework, bundler, or none at all.",
  },
  {
    title: "Working on cssframes",
    body: "Node.js 18 or newer and npm. Clone the repo, run npm install, then npm run dev for the local site.",
  },
  {
    title: "Deploying the site",
    body: "npm run build produces the static site in dist. Vercel or any static host can serve it.",
  },
];

export function InstallationPage() {
  const { copiedKey, doCopy } = useCopy();

  return (
    <article className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Installation
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
        There is nothing to install to use cssframes. Copy the stylesheet or a
        single animation, add two classes, done.
      </p>

      {/* Requirements */}
      <h2 className="mt-12 text-2xl font-semibold tracking-tight">
        Requirements
      </h2>
      <div className="mt-5 space-y-3">
        {requirements.map((r) => (
          <div key={r.title} className="rounded-xl bg-surface-2 p-4">
            <p className="text-sm font-medium">{r.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              {r.body}
            </p>
          </div>
        ))}
      </div>

      {/* Repository */}
      <h2 className="mt-12 text-2xl font-semibold tracking-tight">
        Repository
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        The source lives on GitHub. Clone it to contribute, or copy the URL to
        reference it.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-lg bg-surface-2 px-3 py-2.5">
          <GithubIcon size={15} />
          <code className="flex-1 truncate font-mono text-xs">{REPO}</code>
        </div>
        <button
          type="button"
          onClick={() => doCopy(REPO_CLONE, "repo")}
          className="flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface-2"
        >
          {copiedKey === "repo" ? (
            <>
              <Check size={14} /> Copied
            </>
          ) : (
            <>
              <Copy size={14} /> Copy clone URL
            </>
          )}
        </button>
      </div>
      <div className="mt-3">
        <CodeBlock
          code={`git clone ${REPO_CLONE}\ncd cssframes\nnpm install\nnpm run dev`}
          copied={copiedKey === "clone"}
          onCopy={() =>
            doCopy(
              `git clone ${REPO_CLONE}\ncd cssframes\nnpm install\nnpm run dev`,
              "clone",
            )
          }
        />
      </div>
      <a
        href={REPO_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-text px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
      >
        <GitBranch size={14} />
        Open on GitHub
      </a>

      {/* Stylesheet */}
      <h2 className="mt-12 text-2xl font-semibold tracking-tight">
        The stylesheet
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        One file with every class and every keyframes rule. Save it as
        cssframes.css, or paste it into the stylesheet you already have.
      </p>
      <button
        type="button"
        onClick={() => doCopy(buildCss(), "full")}
        className="mt-4 flex items-center gap-2 rounded-lg bg-text px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
      >
        {copiedKey === "full" ? (
          <>
            <Check size={14} /> Copied
          </>
        ) : (
          <>
            <Copy size={14} /> Copy full cssframes.css
          </>
        )}
      </button>

      {/* First usage */}
      <h2 className="mt-12 text-2xl font-semibold tracking-tight">
        First usage
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Link the file, add the base class plus any animation class, and the
        motion runs. Open the animations list in the sidebar to preview each
        one and copy its CSS.
      </p>
      <div className="mt-4">
        <CodeBlock
          code={usageSnippet}
          copied={copiedKey === "usage"}
          onCopy={() => doCopy(usageSnippet, "usage")}
        />
      </div>

      <div className="mt-14 flex justify-between">
        <a
          href="#/introduction"
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm transition-colors hover:bg-surface-2"
        >
          &lt; Introduction
        </a>
        <a
          href={`#/animations/fade-in`}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm transition-colors hover:bg-surface-2"
        >
          Animations &gt;
        </a>
      </div>
    </article>
  );
}
