"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { resume } from "@/data/content";

const links = [
  { id: "about", label: "About" },
  { id: "road", label: "Road" },
  { id: "asirive", label: "Asirive" },
  { id: "arsenal", label: "Arsenal" },
  { id: "projects", label: "Projects" },
  { id: "now", label: "Now" },
  { id: "lab", label: "Lab" },
  { id: "contact", label: "Contact" },
];

const btn =
  "rounded-full border-2 border-line bg-card px-3.5 py-1.5 font-mono text-[0.72rem] font-bold uppercase tracking-wider text-ink transition-transform hover:-translate-y-0.5 active:scale-95";

export default function SiteNav() {
  const [active, setActive] = useState("");
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);
  const { scrollY } = useScroll();

  // hide on scroll down, return on scroll up; solid once off the top
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    if (menu) return;
    setHidden(y > prev && y > 400);
  });

  useEffect(() => {
    const els = links.map((l) => document.getElementById(l.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menu ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menu]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[80]"
        animate={{ y: hidden ? "-110%" : 0 }}
        transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
      >
        <div
          className={`transition-[background,border-color,backdrop-filter] duration-300 ${
            solid ? "border-b-[3px] border-line bg-bg/85 backdrop-blur-md" : "border-b-[3px] border-transparent"
          }`}
        >
          <nav className="mx-auto flex h-[68px] w-[min(1280px,94vw)] items-center justify-between gap-6">
            <a href="#top" className="group flex items-center gap-3" aria-label="Back to top">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/cypher/pfp.jpg"
                alt=""
                className="h-10 w-10 rounded-full border-[3px] border-line object-cover shadow-[2px_3px_0_var(--shadowc)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
              />
              <span className="leading-none">
                <span className="block font-display text-lg font-extrabold tracking-tight">Haziq</span>
                <span className="micro block text-[0.6rem] text-inksoft">systems · asirive</span>
              </span>
            </a>

            <ul className="hidden items-center lg:flex">
              {links.map((l, i) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className={`relative flex items-baseline gap-1.5 px-3 py-2 font-display text-[0.95rem] font-bold transition-colors ${
                      active === l.id ? "text-ink" : "text-inksoft hover:text-ink"
                    }`}
                  >
                    <span className="micro text-[0.55rem] text-coral">{String(i + 1).padStart(2, "0")}</span>
                    {l.label}
                    {active === l.id ? (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-0.5 h-[3px] rounded bg-coral"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2.5">
              <a href={resume.cvHref} className={`${btn} hidden sm:inline-block`}>
                CV ↓
              </a>
              <ThemeToggle className={`${btn} hidden items-center gap-1.5 sm:flex`} />
              <button
                className={`${btn} lg:hidden`}
                onClick={() => setMenu((m) => !m)}
                aria-expanded={menu}
                aria-label={menu ? "Close menu" : "Open menu"}
              >
                {menu ? "close" : "menu"}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {menu ? (
          <motion.div
            className="fixed inset-0 z-[75] flex flex-col justify-center bg-bg2 px-[6vw] pt-20"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul>
              {links.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.05 }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={() => setMenu(false)}
                    className="flex items-baseline gap-4 border-b-2 border-line/15 py-2.5 font-display text-[clamp(2rem,9vw,3.2rem)] font-extrabold leading-none"
                  >
                    <span className="micro text-coral">{String(i + 1).padStart(2, "0")}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3">
              <a href={resume.cvHref} className={btn}>
                CV ↓
              </a>
              <ThemeToggle className={`${btn} flex items-center gap-1.5`} />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
