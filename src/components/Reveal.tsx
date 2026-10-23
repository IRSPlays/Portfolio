"use client";

import { motion } from "framer-motion";

type Variant = "rise" | "pop" | "left" | "right" | "tilt";

const from = (v: Variant, y: number, rotate: number) => {
  switch (v) {
    case "pop":
      return { opacity: 0, scale: 0.82, y: 24, rotate };
    case "left":
      return { opacity: 0, x: -70, rotate: -1.5 };
    case "right":
      return { opacity: 0, x: 70, rotate: 1.5 };
    case "tilt":
      return { opacity: 0, y: 50, rotate: rotate * 6, scale: 0.96 };
    default:
      return { opacity: 0, y, rotate };
  }
};

export default function Reveal({
  children,
  delay = 0,
  y = 34,
  rotate = -0.6,
  variant = "rise",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  rotate?: number;
  variant?: Variant;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={from(variant, y, rotate)}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
