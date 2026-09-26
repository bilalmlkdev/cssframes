const howItWorks = [
  ["Class model", "cf-animated + cf-<name>"],
  ["Keyframes", "Standard @keyframes syntax"],
  ["Customization", "--cf-duration / --cf-delay / --cf-iteration"],
  ["Browser support", "Any modern browser"],
  ["JavaScript", "None required"],
];

const gettingIt = [
  ["Stylesheet", "cssframes.css"],
  ["Single animation", "Copy from the docs"],
  ["License", "MIT"],
  ["Price", "Free and open source"],
];

function SpecRow({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-t border-border py-3.5 text-[15px]">
      <span>{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}

export function IntroSection() {
  return (
    <section className="px-5 pb-20 sm:px-8">
      <p className="mx-auto max-w-[1120px] text-2xl leading-[1.1] tracking-[-0.5px] sm:text-[48px] font-heading font-light">
        <span className="text-highlight-a">CSSframes</span> is an open-source
        collection of pure CSS animations designed for developers who want
        motion without the overhead, and built to work in any project. Made
        with{" "}
        <span className="text-highlight-b">
          no JavaScript, no dependencies
        </span>
        , and no build step, cssframes is designed to be a beautiful and
        functional part of your every day workflow.
      </p>

      <div className="mx-auto mt-16 grid max-w-[1120px] gap-x-16 gap-y-12 md:grid-cols-[1.45fr_1fr]">
        <div className="flex flex-col gap-12">
          <div>
            <h3 className="text-[19px] font-normal">The file</h3>
            <p className="mt-1 text-[15px] text-muted">
              plain CSS / one stylesheet / zero setup
            </p>
          </div>
          <div className="border-b border-border">
            <h3 className="mb-4 text-[26px] font-normal">How it works</h3>
            {howItWorks.map(([label, value]) => (
              <SpecRow key={label} label={label} value={value} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-12">
          <div>
            <h3 className="text-[19px] font-normal">Requirements</h3>
            <p className="mt-1 text-[15px] text-muted">
              no JavaScript / no dependencies / no build step
            </p>
          </div>
          <div className="border-b border-border">
            <h3 className="mb-4 text-[26px] font-normal">Getting it</h3>
            {gettingIt.map(([label, value]) => (
              <SpecRow key={label} label={label} value={value} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
