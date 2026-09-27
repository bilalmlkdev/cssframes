import { Plus } from "lucide-react";
import { FAQS } from "../../data/faqs";

export function FaqSection() {
  return (
    <section className="border-t border-border px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[0.8fr_1.4fr]">
        <div>
          <p className="mono-label">FAQ</p>
          <h2 className="mt-5 font-heading text-[clamp(1.9rem,4.4vw,3rem)] font-light leading-[1.08] tracking-[-0.02em]">
            The questions that come up first.
          </h2>
          <p className="mt-5 max-w-[38ch] text-[15px] leading-relaxed text-muted">
            If something is not answered here, the docs cover it in more detail,
            and the repository is open.
          </p>
        </div>

        <div className="border-t border-border">
          {FAQS.map((f) => (
            <details key={f.q} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-start gap-4 py-5 text-[16px] leading-snug [&::-webkit-details-marker]:hidden">
                <Plus
                  size={16}
                  className="mt-1 shrink-0 text-muted transition-transform duration-200 group-open:rotate-45"
                />
                <span className="font-normal">{f.q}</span>
              </summary>
              <p className="max-w-[62ch] pb-6 pl-8 text-[15px] leading-relaxed text-muted">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
