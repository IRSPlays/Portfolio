"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

/** Chibi Cypher trots along the bottom edge as you scroll, facing the direction you go. */
export default function CypherWalker() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 70, damping: 20 });
  const left = useTransform(p, [0, 1], ["2vw", "93vw"]);
  const last = useRef(0);
  const [facing, setFacing] = useState(1);
  const [moving, setMoving] = useState(false);
  const timer = useRef(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (Math.abs(v - last.current) > 0.0005) setFacing(v > last.current ? 1 : -1);
    last.current = v;
    setMoving(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMoving(false), 160);
  });

  return (
    <motion.div className="pointer-events-none fixed bottom-1 z-[60] hidden md:block" style={{ left }} aria-hidden>
      <motion.div
        animate={moving ? { y: [0, -9, 0], rotate: [-5, 5, -5] } : { y: [0, -2, 0], rotate: 0 }}
        transition={{ duration: moving ? 0.34 : 2.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ scaleX: facing }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/cypher-chibi.png" alt="" className="h-14 w-auto drop-shadow-[0_4px_0_var(--shadowc)]" />
      </motion.div>
    </motion.div>
  );
}
