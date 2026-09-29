import { ArrowRight, Plus } from "lucide-react";
import { FAQS } from "../../data/faqs";

export function FaqSection() {
  return (
    <section className="border-t border-border px-5 py-22 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-24">
        <div>
          <p className="mono-label">FAQ</p>
          <h2 className="mt-5 max-w-[12ch] font-heading text-[clamp(2.6rem,4.8vw,4.4rem)] font-light leading-[0.95] tracking-[-0.045em]">
            Keep the answers close to the code.
          </h2>
          <p className="mt-6 max-w-[36ch] text-[15px] leading-[1.75] text-muted">
            The important bits stay simple: what ships, how to use it, and what
            happens when a user prefers reduced motion.
          </p>
          <a
            href="#/introduction"
            className="group mt-8 inline-flex items-center gap-2 text-[13px] font-medium"
          >
            Read the documentation
            <ArrowRight
              size={13}
              className="text-muted transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>

        <div className="border-t border-border">
          {FAQS.map((faq, index) => (
            <details key={faq.q} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none gap-5 py-6 [&::-webkit-details-marker]:hidden">
                <span className="w-7 shrink-0 pt-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-[15px] font-medium leading-snug sm:text-[16px]">
                  {faq.q}
                </span>
                <Plus
                  size={15}
                  className="mt-0.5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="max-w-[64ch] pb-7 pl-12 pr-4 text-[14px] leading-[1.75] text-muted sm:text-[15px]">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
