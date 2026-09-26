import { Plus } from "lucide-react";
import { FAQS } from "../../data/faqs";

export function FaqSection() {
  return (
    <section className="px-5 pb-20 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-3 pb-2">
          <h2 className="text-lg font-medium uppercase tracking-wide">FAQ</h2>
          <a
            href="#/introduction"
            className="text-sm font-medium transition-colors hover:text-muted"
          >
            Read the docs &rarr;
          </a>
        </div>

        <div className="mt-4 border-t border-border">
          {FAQS.map((f) => (
            <details key={f.q} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-center gap-4 py-5 text-[15px] [&::-webkit-details-marker]:hidden">
                <Plus
                  size={16}
                  className="shrink-0 text-muted transition-transform group-open:rotate-45"
                />
                {f.q}
              </summary>
              <p className="pb-5 pl-10 pr-8 text-sm leading-relaxed text-muted">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
