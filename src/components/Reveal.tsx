"use client";

import { motion } from "framer-motion";

export default function Reveal({
  children,
  delay = 0,
  y = 28,
  rotate = -0.6,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  rotate?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, rotate }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.34, 1.3, 0.64, 1] }}
    >
      {children}
    </motion.div>
  );
}
