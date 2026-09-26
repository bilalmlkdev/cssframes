import { CodeBlock } from "../../components/ui/CodeBlock";
import { useCopy } from "../../hooks/useCopy";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { DocsArticle } from "../../components/layout/DocsArticle";
import { Pager } from "../../components/layout/Pager";
import { CSS_URL, REPO_CLONE, REPO_URL } from "../../data/site";

const linkSnippet = `<link rel="stylesheet" href="cssframes.css" />`;

const usageSnippet = `<div class="cf-animated cf-fade-in-up">Hello</div>`;

const cloneSnippet = `git clone ${REPO_CLONE}
cd cssframes
npm install
npm run dev`;

const prerequisites = [
  {
    term: "A project",
    body: " that loads a stylesheet - React, Next.js, Vue, Svelte, or plain HTML.",
  },
  {
    term: "Node.js",
    body: " version 18 or later, only if you want to run this repository locally.",
  },
];

export function InstallationPage() {
  const { copiedKey, doCopy } = useCopy();
  useDocumentMeta(
    "Installation - cssframes",
    "Install cssframes: add the stylesheet, two classes, and run the docs locally.",
  );

  return (
    <DocsArticle>
      <h1 className="text-[24px] font-medium tracking-tight">
        Installation
      </h1>

      {/* Prerequisites */}
      <h2 className="mt-12 text-2xl font-medium tracking-tight">
        Prerequisites
      </h2>
      <p className="mt-4 text-base leading-relaxed">
        Before installing, ensure you have the following:
      </p>
      <ul className="mt-4 list-disc space-y-2.5 pl-5 text-base leading-relaxed marker:text-muted">
        {prerequisites.map((p) => (
          <li key={p.term}>
            <span className="underline underline-offset-4">{p.term}</span>
            {p.body}
          </li>
        ))}
      </ul>

      {/* Stylesheet */}
      <h2 className="mt-12 text-2xl font-medium tracking-tight">
        Add the stylesheet
      </h2>
      <p className="mt-4 text-base leading-relaxed">
        cssframes has no package to install. Copy the full library into a{" "}
        <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-sm">
          cssframes.css
        </code>{" "}
        file, or paste it into the stylesheet you already have. Then link it
        in your project:
      </p>
      <div className="mt-4">
        <CodeBlock
          lang="markup"
          code={linkSnippet}
          copied={copiedKey === "link"}
          onCopy={() => doCopy(linkSnippet, "link")}
        />
      </div>
      <a
        href={CSS_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface-2"
      >
        <Download size={14} />
        Download cssframes.css
      </a>

      {/* Usage */}
      <h2 className="mt-12 text-2xl font-medium tracking-tight">Usage</h2>
      <p className="mt-4 text-base leading-relaxed">
        Once the stylesheet is loaded,{" "}
        <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-sm">
          cf-animated
        </code>{" "}
        turns the element on and the second class picks the animation. Open
        any animation in the sidebar to preview it and copy its CSS.
      </p>
      <div className="mt-4">
        <CodeBlock
          lang="markup"
          code={usageSnippet}
          copied={copiedKey === "usage"}
          onCopy={() => doCopy(usageSnippet, "usage")}
        />
      </div>

      {/* Development */}
      <h2 className="mt-12 text-2xl font-medium tracking-tight">
        Running this project locally
      </h2>
      <p className="mt-4 text-base leading-relaxed">
        Want to browse the docs offline or contribute? The site is a small
        Vite + React app. Clone it, install the dependencies once, and start
        the dev server:
      </p>

      <ol className="mt-5 space-y-4">
        <li className="flex gap-3">
          <span className="mt-0.5 font-mono text-xs text-muted">01</span>
          <div>
            <p className="text-base">Clone the repository</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Download the source with{" "}
              <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs">
                git clone
              </code>{" "}
              and move into the folder.
            </p>
          </div>
        </li>
        <li className="flex gap-3">
          <span className="mt-0.5 font-mono text-xs text-muted">02</span>
          <div>
            <p className="text-base">Install dependencies</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Run{" "}
              <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs">
                npm install
              </code>{" "}
              once. It pulls everything the docs site needs - React, Vite,
              Tailwind, and Prism for code highlighting.
            </p>
          </div>
        </li>
        <li className="flex gap-3">
          <span className="mt-0.5 font-mono text-xs text-muted">03</span>
          <div>
            <p className="text-base">Start the dev server</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Run{" "}
              <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs">
                npm run dev
              </code>{" "}
              and open{" "}
              <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs">
                http://localhost:5173
              </code>
              . Edits hot-reload as you save.
            </p>
          </div>
        </li>
      </ol>

      <div className="mt-5">
        <CodeBlock
          lang="bash"
          code={cloneSnippet}
          copied={copiedKey === "clone"}
          onCopy={() => doCopy(cloneSnippet, "clone")}
        />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        The same three commands are all you need. After{" "}
        <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs">
          npm run dev
        </code>
        , the URL Vite prints in the terminal is your local site.
      </p>
      <a
        href={REPO_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-text px-2 py-1.5 text-xs font-medium shadow-xs text-background transition-opacity hover:opacity-80"
      >
        Open on GitHub
      </a>

      <Pager
        prev={{ href: "#/introduction", label: "Introduction" }}
        next={{ href: "#/animations/fade-in", label: "Animations" }}
      />
    </DocsArticle>
  );
}
