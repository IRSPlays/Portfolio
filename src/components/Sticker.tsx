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
      <g stroke="#0B110D" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        {/* Black Claws */}
        <path d="M15 17 L12 8 L18 14 Z" fill="#0B110D" />
        <path d="M26 13 L25 4 L30 11 Z" fill="#0B110D" />
        <path d="M38 12 L41 4 L42 11 Z" fill="#0B110D" />
        <path d="M49 16 L55 9 L51 15 Z" fill="#0B110D" />

        {/* Mint Fur Silhouette */}
        <path
          d="M16 25
             C12 21, 10 15, 16 15
             C20 15, 22 18, 23 21
             C23 16, 23 10, 28 10
             C33 10, 34 15, 34 20
             C36 15, 37 9, 42 9
             C47 9, 47 15, 45 20
             C47 17, 50 14, 53 15
             C57 16, 56 22, 52 26
             C56 31, 57 37, 53 44
             C49 50, 44 56, 32 56
             C20 56, 15 50, 11 43
             C7 35, 10 30, 16 25 Z"
          fill="#5DE89A"
        />

        {/* Side fur tufts */}
        <path d="M11 39 L6 41 L9 45" fill="#5DE89A" />
        <path d="M53 39 L58 41 L55 45" fill="#5DE89A" />

        {/* 4 Cerulean Blue Toe Beans */}
        <ellipse cx="18" cy="20" rx="3.6" ry="4.8" transform="rotate(-18 18 20)" fill="#1C7EBC" />
        <ellipse cx="28.5" cy="16" rx="3.6" ry="5.2" transform="rotate(-4 28.5 16)" fill="#1C7EBC" />
        <ellipse cx="39.5" cy="16" rx="3.6" ry="5.2" transform="rotate(4 39.5 16)" fill="#1C7EBC" />
        <ellipse cx="50" cy="21" rx="3.6" ry="4.8" transform="rotate(18 50 21)" fill="#1C7EBC" />

        {/* Main Blue Palm Pad Bean */}
        <path
          d="M23 35
             C23 29, 29 28, 34 30
             C39 28, 45 29, 45 35
             C45 43, 39 48, 34 48
             C29 48, 23 43, 23 35 Z"
          fill="#1C7EBC"
        />
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
