"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Eyebrow from "@/components/eae/Eyebrow";
import SplitText from "@/components/motion/SplitText";
import { projects } from "@/data/content";
import { workIds } from "@/data/eae";

const items = workIds.map((id) => projects.find((p) => p.id === id)!).filter(Boolean);

export default function Work() {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);

  return (
    <section id="work" className="mx-auto w-[min(1400px,92vw)] py-28 md:py-40">
      <Eyebrow n="04" label="Selected work" />
      <SplitText
        as="h2"
        parts={[{ t: "Six more things" }, { t: "I shipped.", c: "serif-i text-coral" }]}
        className="serif mt-10 max-w-[14ch] text-[clamp(2.8rem,8vw,7.5rem)] leading-[0.95]"
      />

      <ul className="mt-16 border-b border-ink">
        {items.map((p, i) => {
          const isOpen = open === p.id;
          return (
            <li key={p.id} className="border-t border-ink">
              <button
                onClick={() => setOpen(isOpen ? null : p.id)}
                aria-expanded={isOpen}
                data-hover
                className="row-sweep grid w-full grid-cols-[2.5rem_1fr_2rem] items-baseline gap-x-4 px-2 py-6 text-left md:grid-cols-[4.5rem_1fr_16rem_2rem] md:px-4 md:py-8"
              >
                <span className="micro soft text-inksoft">{String(i + 1).padStart(2, "0")}</span>
                <span className="serif text-[clamp(1.8rem,4.2vw,4rem)] leading-[1.02]">{p.name}</span>
                <span className="micro soft hidden text-inksoft md:block">{p.stack.slice(0, 3).join(" · ")}</span>
                <motion.span
                  className="serif text-3xl leading-none"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  aria-hidden
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-8 px-2 pb-10 pt-2 md:grid-cols-[4.5rem_1.2fr_1fr] md:px-4">
                      <span className="hidden md:block" />
                      <div>
                        <p className="serif text-[clamp(1.4rem,2.2vw,2rem)] leading-snug">{p.tagline}</p>
                        <p className="mt-4 max-w-[58ch] leading-relaxed text-inksoft">{p.mission}</p>
                      </div>
                      <div>
                        <p className="micro text-coral">what I built</p>
                        <ul className="mt-3 space-y-2 text-[0.95rem] leading-snug">
                          {p.built.slice(0, 3).map((b) => (
                            <li key={b} className="flex gap-3">
                              <span className="text-coral">→</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {p.stack.map((s) => (
                            <li key={s} className="micro rounded-full border border-ink/50 px-3 py-1 text-[0.62rem]">
                              {s}
                            </li>
                          ))}
                        </ul>
                        {p.links.length ? (
                          <div className="mt-5 flex flex-wrap gap-4">
                            {p.links.map((l) => (
                              <a
                                key={l.href}
                                href={l.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="micro border-b border-ink pb-0.5 transition-colors hover:border-coral hover:text-coral"
                              >
                                {l.label} ↗
                              </a>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
