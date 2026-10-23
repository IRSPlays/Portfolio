"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import Eyebrow from "@/components/eae/Eyebrow";
import SplitText from "@/components/motion/SplitText";
import { cortexSteps } from "@/data/eae";

const links = [
  { label: "asirive.com/cortex", href: "https://www.asirive.com/cortex" },
  { label: "Field demo ▶", href: "https://www.youtube.com/watch?v=vgvTApfXBPM" },
  { label: "Repository", href: "https://github.com/Asirive/Asirive-Cortex" },
];

export default function Cortex() {
  const pin = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: pin, offset: ["start start", "end end"] });
  const [i, setI] = useState(0);
  const n = cortexSteps.length;

  useMotionValueEvent(scrollYProgress, "change", (v) => setI(Math.max(0, Math.min(n - 1, Math.floor(v * n * 0.999)))));

  const step = cortexSteps[i];

  return (
    <section id="cortex" className="eae-dark relative">
      <div className="mx-auto w-[min(1400px,92vw)] pb-10 pt-28 md:pt-40">
        <Eyebrow n="02" label="Flagship project · Asirive Cortex" />
        <SplitText
          as="h2"
          parts={[{ t: "A navigation system" }, { t: "built around a cane,", c: "serif-i text-coral" }, { t: "not instead of one." }]}
          className="serif mt-10 max-w-[18ch] text-[clamp(2.8rem,7.5vw,7rem)] leading-[0.98]"
        />
        <div className="mt-8 flex flex-wrap gap-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="micro rounded-full border border-ink/60 px-4 py-2 transition-colors hover:bg-ink hover:text-bg"
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      </div>

      {/* desktop: pinned scene driven by scroll */}
      <div ref={pin} className="relative hidden md:block" style={{ height: `${n * 95}vh` }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto grid w-[min(1400px,92vw)] grid-cols-[1.15fr_1fr] items-center gap-14">
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-ink/40 bg-bg2">
              {cortexSteps.map((s, idx) => (
                <motion.div
                  key={s.img}
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    clipPath: idx === i ? "inset(0% 0 0 0)" : idx < i ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)",
                    scale: idx === i ? 1 : 1.12,
                  }}
                  transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                >
                  <Image src={s.img} alt={s.alt} fill sizes="55vw" className="object-cover" />
                </motion.div>
              ))}
              <span className="micro absolute left-3 top-3 bg-bg px-2 py-1 text-[0.6rem] text-ink">
                fig. 0{i + 2} — {step.k}
              </span>
            </div>

            <div className="relative min-h-[420px]">
              <div className="flex items-center gap-3">
                <p className="serif text-6xl leading-none text-coral">{String(i + 1).padStart(2, "0")}</p>
                <div className="flex flex-1 gap-1.5" aria-hidden>
                  {cortexSteps.map((_, idx) => (
                    <span key={idx} className="h-[3px] flex-1 overflow-hidden bg-ink/20">
                      <motion.span
                        className="block h-full origin-left bg-coral"
                        animate={{ scaleX: idx <= i ? 1 : 0 }}
                        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                      />
                    </span>
                  ))}
                </div>
                <p className="micro text-inksoft">/ {String(n).padStart(2, "0")}</p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="micro mt-8 text-coral">{step.k}</p>
                  <h3 className="serif mt-3 text-[clamp(2rem,3.4vw,3.4rem)] leading-[1.04]">{step.title}</h3>
                  <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-inksoft">{step.body}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {step.chips.map((c) => (
                      <li key={c} className="micro rounded-full border border-ink/50 px-3 py-1.5 text-[0.65rem]">
                        {c}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* mobile: plain stacked story */}
      <div className="mx-auto w-[min(1400px,92vw)] space-y-14 pb-24 md:hidden">
        {cortexSteps.map((s, idx) => (
          <article key={s.k}>
            <div className="relative aspect-[4/3] overflow-hidden border border-ink/40">
              <Image src={s.img} alt={s.alt} fill sizes="92vw" className="object-cover" />
            </div>
            <p className="micro mt-4 text-coral">
              {String(idx + 1).padStart(2, "0")} · {s.k}
            </p>
            <h3 className="serif mt-2 text-3xl leading-[1.05]">{s.title}</h3>
            <p className="mt-3 text-inksoft">{s.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
