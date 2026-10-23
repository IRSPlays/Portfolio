import type { CSSProperties, ReactNode } from "react";

type Tint = "amber" | "teal" | "coral" | "navy" | "mint" | "ink";

const scallop = (() => {
  let d = "M0,30 L0,16";
  for (let x = 0; x < 1440; x += 72) d += ` Q${x + 36},-8 ${x + 72},16`;
  return `${d} L1440,30 Z`;
})();

/** A full-bleed coloured chapter with scalloped sticker edges, so sections read as physical pieces laid on the page. */
export default function Band({
  id,
  tint,
  strength = 11,
  className = "",
  children,
  style,
}: {
  id?: string;
  tint: Tint;
  strength?: number;
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  const bg = `color-mix(in srgb, var(--${tint}) ${strength}%, var(--bg))`;
  return (
    <section id={id} className={`relative ${className}`} style={{ background: bg, ...style }}>
      <svg
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-7 w-full -translate-y-[98%]"
        viewBox="0 0 1440 30"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d={scallop} fill={bg} />
      </svg>
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-7 w-full translate-y-[98%] rotate-180"
        viewBox="0 0 1440 30"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d={scallop} fill={bg} />
      </svg>
      {children}
    </section>
  );
}
