"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export type FoxMood = "idle" | "happy" | "suspicious" | "sleepy";

const mouths: Record<FoxMood, React.ReactNode> = {
  idle: <path d="M84 138 Q100 150 116 138" stroke="#0B110D" strokeWidth="5" fill="none" strokeLinecap="round" />,
  happy: (
    <path d="M78 132 Q100 162 122 132 Q100 146 78 132 Z" fill="#0B110D" stroke="#0B110D" strokeWidth="4" strokeLinejoin="round" />
  ),
  suspicious: <path d="M86 142 L114 136" stroke="#0B110D" strokeWidth="5" fill="none" strokeLinecap="round" />,
  sleepy: <path d="M88 140 Q100 134 112 140" stroke="#0B110D" strokeWidth="5" fill="none" strokeLinecap="round" />,
};

export default function FoxMascot({
  mood = "idle",
  size = 300,
  className = "",
}: {
  mood?: FoxMood;
  size?: number;
  className?: string;
}) {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 130, damping: 15 });
  const sy = useSpring(py, { stiffness: 130, damping: 15 });
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      px.set(Math.max(-1, Math.min(1, dx * 2.4)));
      py.set(Math.max(-1, Math.min(1, dy * 2.4)));
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py]);

  const pupilX = useTransform(sx, (v) => v * 7);
  const pupilY = useTransform(sy, (v) => v * 6);

  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Cypher the fox mascot"
    >
      <g stroke="#0B110D" strokeWidth="5" strokeLinejoin="round">
        <path d="M38 22 L82 58 L52 108 Z" fill="var(--teal)" />
        <path d="M162 22 L118 58 L148 108 Z" fill="var(--teal)" />
        <path d="M48 40 L74 62 L60 86 Z" fill="var(--coral)" stroke="none" />
        <path d="M152 40 L126 62 L140 86 Z" fill="var(--coral)" stroke="none" />
        <path d="M40 88 Q100 52 160 88 L148 152 Q100 192 52 152 Z" fill="var(--mint)" />
        <path d="M62 78 Q100 58 138 78 L132 96 Q100 82 68 96 Z" fill="var(--teal)" stroke="none" />
      </g>
      <g className={mood === "sleepy" ? "" : "fox-blink"}>
        <ellipse cx="76" cy="118" rx="15" ry="17" fill="#F6EBD3" stroke="#0B110D" strokeWidth="5" />
        <ellipse cx="124" cy="118" rx="15" ry="17" fill="#F6EBD3" stroke="#0B110D" strokeWidth="5" />
        <motion.g style={{ x: pupilX, y: pupilY }}>
          {mood === "sleepy" ? (
            <>
              <path d="M66 118 L86 118" stroke="#0B110D" strokeWidth="5" strokeLinecap="round" />
              <path d="M114 118 L134 118" stroke="#0B110D" strokeWidth="5" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="76" cy="120" r="6.5" fill="#0B110D" />
              <circle cx="124" cy="120" r="6.5" fill="#0B110D" />
            </>
          )}
        </motion.g>
      </g>
      {mood === "suspicious" ? (
        <>
          <path d="M62 100 L92 108" stroke="#0B110D" strokeWidth="5" strokeLinecap="round" />
          <path d="M138 100 L108 108" stroke="#0B110D" strokeWidth="5" strokeLinecap="round" />
        </>
      ) : null}
      <path d="M60 104 L82 96 L74 110 Z" fill="var(--navy)" stroke="none" />
      <path d="M140 104 L118 96 L126 110 Z" fill="var(--navy)" stroke="none" />
      <path d="M92 132 Q100 126 108 132 Q100 140 92 132 Z" fill="#0B110D" />
      {mouths[mood]}
    </svg>
  );
}
