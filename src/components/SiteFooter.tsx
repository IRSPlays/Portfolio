"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile, socials } from "@/data/content";
import { boing } from "@/lib/sound";

const index = [
  { label: "About", href: "#about" },
  { label: "The road", href: "#road" },
  { label: "Asirive", href: "#asirive" },
  { label: "Projects", href: "#projects" },
  { label: "Lab", href: "#lab" },
];

function SgClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () =>
      setT(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Singapore",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="tabular-nums">{t || "--:--:--"}</span>;
}

/** Colophon-style footer: sign-off, index, live Singapore clock, and a giant wordmark Cypher peeks over. */
export default function SiteFooter() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const peek = useTransform(scrollYProgress, [0.4, 1], [40, 0]);
  const word = useTransform(scrollYProgress, [0, 1], ["-4%", "0%"]);

  const toTop = () => {
    boing();
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.8 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={ref} className="relative mt-24 overflow-hidden border-t-[3px] border-line bg-ink text-bg">
      <div className="mx-auto grid w-[min(1150px,92vw)] gap-10 pb-10 pt-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="micro text-bg/60">colophon</p>
          <p className="mt-3 max-w-[18ch] font-display text-3xl font-extrabold leading-[1.05]">
            “{profile.motto}”
          </p>
          <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-bg/70">
            Designed and built by Haziq with Cypher looking over a shoulder. Set in Bricolage Grotesque, Plus
            Jakarta Sans and JetBrains Mono. No foxes were harmed.
          </p>
        </div>

        <div>
          <p className="micro text-bg/60">index</p>
          <ul className="mt-3 space-y-1.5">
            {index.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group inline-flex items-center gap-2 font-display text-lg font-bold">
                  <span className="inline-block w-0 overflow-hidden text-coral transition-all duration-300 group-hover:w-5">→</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="micro text-bg/60">elsewhere</p>
          <ul className="mt-3 space-y-1.5">
            {socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-display text-lg font-bold"
                >
                  {s.label}
                  <span className="text-coral transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="micro text-bg/60">signal</p>
          <p className="mt-3 font-mono text-2xl font-bold">
            <SgClock /> <span className="text-sm text-bg/60">SGT</span>
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm text-bg/70">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-mint" />
            </span>
            {profile.status}
          </p>
          <button
            onClick={toTop}
            className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-bg/70 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors hover:bg-bg hover:text-ink"
          >
            back to top ↑
          </button>
        </div>
      </div>

      <div className="relative select-none">
        <motion.div
          style={{ y: peek }}
          className="pointer-events-none absolute bottom-[10%] right-[2.5vw] z-10 hidden lg:block"
          aria-hidden
        >
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/cypher/thankful.png" alt="" className="h-[clamp(7rem,12vw,11rem)] w-auto" />
          </motion.div>
        </motion.div>
        <motion.p
          style={{ x: word, WebkitTextStroke: "2px var(--bg)" }}
          className="whitespace-nowrap px-[2vw] pb-2 font-display text-[clamp(6rem,24vw,24rem)] font-extrabold uppercase leading-[0.78] tracking-[-0.05em] text-transparent transition-colors duration-500 hover:text-bg"
        >
          Haziq
        </motion.p>
      </div>

      <div className="border-t-2 border-bg/20">
        <p className="mx-auto flex w-[min(1150px,92vw)] flex-wrap justify-between gap-2 py-4 font-mono text-[0.68rem] uppercase tracking-widest text-bg/60">
          <span>© {new Date().getFullYear()} Haziq (IRSPlays)</span>
          <span>Singapore · built with Next.js</span>
        </p>
      </div>
    </footer>
  );
}
