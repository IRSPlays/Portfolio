"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/** A quiet colour wash that changes with the chapter. No blobs, no grain. */
export default function WorldBackground() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const a = useTransform(p, [0, 0.2, 0.4], [1, 0.4, 0]);
  const b = useTransform(p, [0.15, 0.4, 0.7], [0, 1, 0.1]);
  const c = useTransform(p, [0.55, 0.9, 1], [0, 0.9, 1]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      <motion.div className="absolute inset-0 bg-amber/[0.07]" style={{ opacity: a }} />
      <motion.div className="absolute inset-0 bg-teal/[0.08]" style={{ opacity: b }} />
      <motion.div className="absolute inset-0 bg-coral/[0.07]" style={{ opacity: c }} />
    </div>
  );
}
