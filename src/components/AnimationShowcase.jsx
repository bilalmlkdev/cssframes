import { useState } from "react";
import { animations, categories } from "../data/animations";

const FADE = "linear-gradient(to bottom, black 72%, transparent 100%)";

// Round-robin across categories so the 16 tiles show every group.
function pickFeatured(count) {
  const pools = categories.map((c) =>
    animations.filter((a) => a.category === c.id),
  );
  const picked = [];
  while (picked.length < count) {
    let took = false;
    for (const pool of pools) {
      if (picked.length >= count) break;
      const next = pool.find((a) => !picked.includes(a));
      if (next) {
        picked.push(next);
        took = true;
      }
    }
    if (!took) break;
  }
  return picked;
}

function ShowcaseCard({ anim }) {
  const [hovering, setHovering] = useState(false);
  const [nonce, setNonce] = useState(0);
  const isLoop = anim.category === "loops";
  const playing = hovering || isLoop;

  const handleEnter = () => {
    setNonce((n) => n + 1);
    setHovering(true);
  };

  return (
    <article
      onMouseEnter={handleEnter}
      onMouseLeave={() => setHovering(false)}
      className="flex flex-col rounded-xl bg-surface-2 p-6"
    >
      <div className="flex min-h-[150px] flex-1 items-center justify-center">
        <div
          key={nonce}
          className={`px-2 text-center text-lg font-medium ${
            playing ? `cf-animated cf-${anim.slug}` : ""
          }`}
          style={
            playing
              ? {
                  "--cf-duration": `${anim.duration}ms`,
                  "--cf-iteration": isLoop ? "infinite" : "1",
                }
              : undefined
          }
        >
          {anim.name}
        </div>
      </div>
      <div className="mt-6">
        <p className="text-base font-medium">{anim.name}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">{anim.desc}</p>
      </div>
    </article>
  );
}

export function AnimationShowcase() {
  const featured = pickFeatured(16);

  return (
    <section className="px-5 pb-16 px-40">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-medium uppercase tracking-wide">
            Animations
          </h2>
          <p className="mt-1 text-sm text-muted">
            Hover a tile to play it. Loops run on their own.
          </p>
        </div>
      </div>

      <div
        className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        style={{ maskImage: FADE, WebkitMaskImage: FADE }}
      >
        {featured.map((anim) => (
          <ShowcaseCard key={anim.slug} anim={anim} />
        ))}
      </div>
    </section>
  );
}
