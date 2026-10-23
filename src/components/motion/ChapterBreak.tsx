"use client";

import VelocityMarquee from "@/components/motion/VelocityMarquee";

const tones = {
  coral: "bg-coral text-bg",
  teal: "bg-teal text-bg",
  amber: "bg-amber text-bg",
  ink: "bg-ink text-bg",
} as const;

/** Tilted full-bleed ticker strip that cuts between chapters. */
export default function ChapterBreak({
  words,
  tone = "coral",
  tilt = -1.2,
  base = -3,
}: {
  words: string[];
  tone?: keyof typeof tones;
  tilt?: number;
  base?: number;
}) {
  return (
    <div className="relative z-10 my-10 overflow-x-clip py-6" aria-hidden>
      <div
        className={`-mx-6 scale-x-[1.04] border-y-[3px] border-line py-3 shadow-[0_8px_0_var(--shadowc)] ${tones[tone]}`}
        style={{ transform: `rotate(${tilt}deg) scaleX(1.04)` }}
      >
        <VelocityMarquee base={base}>
          {[...words, ...words].map((w, i) => (
            <span key={i} className="px-6 font-display text-3xl font-extrabold uppercase tracking-tight sm:text-5xl">
              {w} <span className="px-4">✦</span>
            </span>
          ))}
        </VelocityMarquee>
      </div>
    </div>
  );
}
