"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const TRAIL = [
  { stiffness: 320, damping: 22, size: 34, opacity: 1 },
  { stiffness: 180, damping: 18, size: 26, opacity: 0.55 },
  { stiffness: 110, damping: 16, size: 19, opacity: 0.3 },
];

function PawDot({
  x,
  y,
  stiffness,
  damping,
  size,
  opacity,
}: {
  x: ReturnType<typeof useMotionValue<number>>;
  y: ReturnType<typeof useMotionValue<number>>;
  stiffness: number;
  damping: number;
  size: number;
  opacity: number;
}) {
  const sx = useSpring(x, { stiffness, damping });
  const sy = useSpring(y, { stiffness, damping });
  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[95]"
      style={{ x: sx, y: sy, opacity }}
    >
      <svg width={size} height={size} viewBox="0 0 64 64" style={{ transform: "translate(-50%, -50%) rotate(-18deg)" }} aria-hidden>
        <g stroke="#0B110D" strokeWidth="4" strokeLinejoin="round">
          <circle cx="16" cy="22" r="7" fill="var(--coral)" />
          <circle cx="30" cy="14" r="7" fill="var(--mint)" />
          <circle cx="45" cy="18" r="7" fill="var(--teal)" />
          <path d="M32 28c9 0 17 7 17 14s-7 10-17 10-17-3-17-10 8-14 17-14z" fill="var(--amber)" />
        </g>
      </svg>
    </motion.div>
  );
}

export default function PawCursor() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const capable =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!capable) return;

    const apply = (on: boolean) => {
      setActive(on);
      document.documentElement.classList.toggle("paw-on", on);
    };
    apply(localStorage.getItem("paw-cursor") !== "off");

    const onToggle = () => {
      const next = !document.documentElement.classList.contains("paw-on");
      localStorage.setItem("paw-cursor", next ? "on" : "off");
      apply(next);
    };
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("paw-toggle", onToggle);
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("paw-toggle", onToggle);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.classList.remove("paw-on");
    };
  }, [x, y]);

  if (!active) return null;

  return (
    <>
      {TRAIL.map((dot, i) => (
        <PawDot key={i} x={x} y={y} {...dot} />
      ))}
    </>
  );
}
