"use client";

import { motion } from "framer-motion";

/** "02 ——— Flagship project": numbered label whose rule draws itself in. */
export default function Eyebrow({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="micro text-coral">{n}</span>
      <motion.span
        className="h-px w-16 origin-left bg-ink/60 sm:w-28"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        aria-hidden
      />
      <span className="micro text-inksoft">{label}</span>
    </div>
  );
}
