"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export const INTRO_DELAY = 1.7;

/** Short intro reel: counter + bouncing chibi, then the curtain splits open. */
export default function Preloader() {
  const [done, setDone] = useState(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / 1300);
      setN(Math.round(100 * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
      else window.setTimeout(() => setDone(true), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      root.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.documentElement.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div className="fixed inset-0 z-[120]" exit={{ pointerEvents: "none" }} aria-hidden>
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 border-b-[3px] border-line bg-bg2"
            exit={{ y: "-101%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 border-t-[3px] border-line bg-bg2"
            exit={{ y: "101%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4"
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.35 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src="/cypher-chibi.png"
              alt=""
              className="h-36 w-auto"
              animate={{ y: [0, -22, 0], rotate: [-4, 4, -4] }}
              transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
            />
            <p className="font-display text-[clamp(4rem,14vw,9rem)] font-extrabold leading-none tabular-nums">
              {n}
              <span className="text-coral">%</span>
            </p>
            <p className="micro text-inksoft">booting cypher · failing with honour</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
