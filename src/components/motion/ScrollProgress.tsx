"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const chapters = [
  { id: "top", label: "intro" },
  { id: "about", label: "about" },
  { id: "road", label: "road" },
  { id: "asirive", label: "asirive" },
  { id: "proof", label: "receipts" },
  { id: "arsenal", label: "arsenal" },
  { id: "projects", label: "projects" },
  { id: "now", label: "now" },
  { id: "lab", label: "lab" },
  { id: "contact", label: "contact" },
];

/** Top progress bar + chapter dots on the right edge. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const [active, setActive] = useState("top");

  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(c.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[95] h-1.5 origin-left bg-gradient-to-r from-teal via-amber to-coral"
        style={{ scaleX }}
        aria-hidden
      />
      <nav className="fixed right-4 top-1/2 z-[70] hidden -translate-y-1/2 flex-col items-end gap-2.5 xl:flex" aria-label="Chapters">
        {chapters.map((c) => {
          const on = active === c.id;
          return (
            <a key={c.id} href={`#${c.id}`} className="group flex items-center gap-2" aria-label={c.label}>
              <span
                className={`micro rounded-full bg-card px-2 py-0.5 transition-all ${
                  on ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                }`}
              >
                {c.label}
              </span>
              <span
                className={`block rounded-full border-2 border-line transition-all ${
                  on ? "h-4 w-4 bg-coral" : "h-2.5 w-2.5 bg-card group-hover:bg-mint"
                }`}
              />
            </a>
          );
        })}
      </nav>
    </>
  );
}
