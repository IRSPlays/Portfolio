"use client";

import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { useRef } from "react";

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/** Endless marquee that speeds up (and flips) with scroll velocity. */
export default function VelocityMarquee({
  children,
  base = -4,
  speed,
  className = "",
}: {
  children: React.ReactNode;
  base?: number;
  /** pixels per second, independent of content width. Sign sets direction. Overrides `base`. */
  speed?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const boost = useTransform(smooth, [-3000, 0, 3000], [-6, 0, 6], { clamp: false });
  const dir = useRef((speed ?? base) < 0 ? -1 : 1);
  const copy = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const pxPos = useRef(0);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get();
    if (speed !== undefined) {
      const w = copy.current?.offsetWidth ?? 0;
      if (!w) return;
      if (b < -0.05) dir.current = -1;
      else if (b > 0.05) dir.current = 1;
      const step = Math.abs(speed) * dir.current * (delta / 1000) * (1 + Math.min(Math.abs(b), 3) * 0.6);
      pxPos.current = wrap(-w, 0, pxPos.current + step);
      px.set(pxPos.current);
      return;
    }
    if (b < -0.05) dir.current = -1;
    else if (b > 0.05) dir.current = 1;
    // dir -1 = drift left, +1 = drift right; scroll velocity flips and accelerates it
    const move = Math.abs(base) * dir.current * (delta / 1000) * (1 + Math.abs(b));
    baseX.set(baseX.get() + move);
  });

  const xPct = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const x = speed !== undefined ? px : xPct;

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div className="flex w-max" style={{ x }}>
        <div ref={copy} className="flex shrink-0">
          {children}
        </div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
