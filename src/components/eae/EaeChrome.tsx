"use client";

import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { eaeMeta } from "@/data/eae";

const sections = [
  { id: "brief", label: "Brief" },
  { id: "cortex", label: "Cortex" },
  { id: "record", label: "Record" },
  { id: "work", label: "Work" },
  { id: "craft", label: "Craft" },
  { id: "team", label: "Team" },
  { id: "next", label: "Next" },
  { id: "contact", label: "Contact" },
];

/** Fixed chrome: progress line, blend-mode nav, live HUD readout and a reticle cursor. */
export default function EaeChrome() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [active, setActive] = useState("");
  const coords = useRef<HTMLSpanElement>(null);
  const pct = useRef<HTMLSpanElement>(null);

  // reticle follows the pointer, grows over interactive things
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });
  const [hot, setHot] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (pct.current) pct.current.textContent = String(Math.round(v * 100)).padStart(3, "0");
  });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (coords.current) {
        coords.current.textContent = `${String(Math.round(e.clientX)).padStart(4, "0")} / ${String(Math.round(e.clientY)).padStart(4, "0")}`;
      }
      setHot(!!(e.target as HTMLElement).closest("a,button,[data-hover]"));
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), {
      rootMargin: "-45% 0px -50% 0px",
    });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-[100] h-[3px] origin-left bg-coral" style={{ scaleX }} aria-hidden />

      <header className="pointer-events-none fixed inset-x-0 top-0 z-[90] mix-blend-difference">
        <div className="mx-auto flex h-16 w-[min(1400px,92vw)] items-center justify-between text-white">
          <a href="#top" className="pointer-events-auto micro font-bold tracking-[0.2em]">
            {eaeMeta.name} <span className="opacity-60">— portfolio</span>
          </a>
          <nav className="pointer-events-auto hidden items-center gap-5 lg:flex" aria-label="Sections">
            {sections.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`micro flex items-center gap-1.5 transition-opacity ${active === s.id ? "opacity-100" : "opacity-50 hover:opacity-100"}`}
              >
                <span className="text-[0.55rem]">{String(i + 1).padStart(2, "0")}</span>
                {s.label}
                {active === s.id ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
              </a>
            ))}
          </nav>
          <a href="#contact" className="pointer-events-auto micro font-bold lg:hidden">
            contact →
          </a>
        </div>
      </header>

      <div className="pointer-events-none fixed bottom-4 left-[4vw] z-[90] hidden text-white mix-blend-difference sm:block" aria-hidden>
        <p className="micro text-[0.6rem] opacity-80">
          xy <span ref={coords}>0000 / 0000</span>
        </p>
        <p className="micro text-[0.6rem] opacity-80">
          scroll <span ref={pct}>000</span>%
        </p>
      </div>
      <div className="pointer-events-none fixed bottom-4 right-[4vw] z-[90] hidden text-white mix-blend-difference sm:block" aria-hidden>
        <p className="micro blink text-[0.6rem]">● live document · {eaeMeta.location}</p>
      </div>

      <motion.div
        className="eae-cursor pointer-events-none fixed left-0 top-0 z-[110] -ml-5 -mt-5 h-10 w-10 mix-blend-difference"
        style={{ x: sx, y: sy }}
        aria-hidden
      >
        <motion.div
          className="relative h-full w-full"
          animate={{ scale: hot ? 1.7 : 1, rotate: hot ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white" />
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white" />
          <span className="absolute inset-[9px] rounded-full border border-white" />
        </motion.div>
      </motion.div>
    </>
  );
}
