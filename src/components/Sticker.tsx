"use client";

import { motion, type MotionStyle } from "framer-motion";
import type { ReactNode, RefObject } from "react";

export function Sticker({
  children,
  rotate = 0,
  style,
  constraints,
  className = "",
  title = "drag me — throw me",
}: {
  children: ReactNode;
  rotate?: number;
  style?: MotionStyle;
  constraints?: RefObject<HTMLElement | null>;
  className?: string;
  title?: string;
}) {
  return (
    <motion.div
      className={`absolute z-20 select-none ${className}`}
      style={style}
      drag
      dragMomentum
      dragElastic={0.55}
      dragConstraints={constraints}
      initial={{ rotate, scale: 0, opacity: 0 }}
      animate={{ rotate, scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 16, delay: Math.random() * 0.4 }}
      whileHover={{ scale: 1.15, rotate: rotate + 7, zIndex: 50 }}
      whileTap={{ scale: 0.8, rotate: rotate - 10 }}
      title={title}
    >
      {children}
    </motion.div>
  );
}

export function PawIcon({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <g stroke="#0B110D" strokeWidth="3.5" strokeLinejoin="round">
        <circle cx="16" cy="22" r="7" fill="var(--coral)" />
        <circle cx="30" cy="14" r="7" fill="var(--mint)" />
        <circle cx="45" cy="18" r="7" fill="var(--teal)" />
        <path d="M32 28c9 0 17 7 17 14s-7 10-17 10-17-3-17-10 8-14 17-14z" fill="var(--amber)" />
      </g>
    </svg>
  );
}

export function ChipIcon({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <g stroke="#0B110D" strokeWidth="3.5" strokeLinejoin="round">
        <rect x="18" y="18" width="28" height="28" rx="6" fill="var(--teal)" />
        <path d="M26 8v10M38 8v10M26 46v10M38 46v10M8 26h10M8 38h10M46 26h10M46 38h10" strokeLinecap="round" />
        <path d="M27 32l4 4 7-8" fill="none" strokeLinecap="round" stroke="var(--bg)" />
      </g>
    </svg>
  );
}

export function SparkleIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <path
        d="M32 4c3 16 12 25 28 28-16 3-25 12-28 28-3-16-12-25-28-28 16-3 25-12 28-28z"
        fill="var(--amber)"
        stroke="#0B110D"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BoltIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <path
        d="M36 4 12 36h14L24 60l28-34H36l4-22z"
        fill="var(--mint)"
        stroke="#0B110D"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
