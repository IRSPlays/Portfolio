"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Eyebrow from "@/components/eae/Eyebrow";
import Handoff from "@/components/eae/Handoff";
import SplitText from "@/components/motion/SplitText";
import VelocityMarquee from "@/components/motion/VelocityMarquee";
import { arsenalMarquee, arsenalTiers, graveyard } from "@/data/content";

/** A layer of the stack: slides in from alternating sides as it reaches the middle of the screen. */
function Slab({ t, i }: { t: (typeof arsenalTiers)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "start 45%"] });
  const dir = i % 2 ? 1 : -1;
  const x = useTransform(scrollYProgress, [0, 1], [dir * 160, 0]);
  const o = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const ghost = useTransform(scrollYProgress, [0, 1], [dir * -80, 0]);

  return (
    <motion.div ref={ref} style={{ x, opacity: o }} className="relative overflow-hidden border-y border-ink/40 bg-bg2 py-10 md:py-14">
      <motion.span
        style={{ x: ghost, WebkitTextStroke: "1.5px var(--ink)" }}
        className="serif-i pointer-events-none absolute -top-6 right-6 select-none text-[clamp(8rem,18vw,17rem)] leading-none text-transparent opacity-25"
        aria-hidden
      >
        L{i + 1}
      </motion.span>
      <div className="relative mx-auto grid w-[min(1400px,92vw)] gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="micro text-coral">{t.tier}</p>
          <h3 className="serif mt-3 max-w-[12ch] text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.02]">{t.subtitle}</h3>
        </div>
        <ul className="grid gap-4 sm:grid-cols-3">
          {t.items.map((it) => {
            const [head, ...rest] = it.split(" — ");
            return (
              <li key={it} className="border-t border-ink/40 pt-3">
                <p className="serif text-xl leading-tight">{head}</p>
                {rest.length ? <p className="mt-1.5 text-[0.88rem] leading-snug text-inksoft">{rest.join(" — ")}</p> : null}
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
}

/** Broke → fixed. The struck-through failure draws as you scroll, then the fix resolves beside it. */
function Fault({ g, i }: { g: (typeof graveyard)[number]; i: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 88%", "start 38%"] });
  const strike = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const fixO = useTransform(scrollYProgress, [0.45, 0.85], [0, 1]);
  const fixY = useTransform(scrollYProgress, [0.45, 0.85], [24, 0]);
  const brokeO = useTransform(scrollYProgress, [0.4, 0.9], [1, 0.4]);

  return (
    <li ref={ref} className="grid gap-5 border-t border-ink/40 py-9 md:grid-cols-[6rem_1fr_1fr_1fr] md:gap-8">
      <p className="micro text-inksoft">fault 0{i + 1}</p>
      <h3 className="serif text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[1.05]">{g.title}</h3>
      <motion.div style={{ opacity: brokeO }} className="relative">
        <p className="micro mb-2 text-coral">broke</p>
        <p className="relative inline text-[0.95rem] leading-snug">
          {g.died}
        </p>
        <motion.span
          style={{ scaleX: strike }}
          className="absolute left-0 top-[58%] h-[2px] w-full origin-left bg-coral"
          aria-hidden
        />
      </motion.div>
      <motion.div style={{ opacity: fixO, y: fixY }}>
        <p className="micro mb-2 text-coral">fixed</p>
        <p className="text-[0.95rem] leading-snug">{g.fix}</p>
      </motion.div>
    </li>
  );
}

export default function Craft() {
  return (
    <section id="craft" className="eae-dark relative overflow-hidden pt-28 md:pt-40">
      <div className="mx-auto w-[min(1400px,92vw)]">
        <Eyebrow n="05" label="Craft · tools & failures" />
        <SplitText
          as="h2"
          parts={[{ t: "From the soldering iron" }, { t: "up to the model.", c: "serif-i text-coral" }]}
          className="serif mt-10 max-w-[16ch] text-[clamp(2.8rem,8vw,7.5rem)] leading-[0.95]"
        />
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-inksoft">
          Three layers, bottom to top. Each one fights back differently — which is the part I like.
        </p>
      </div>

      <div className="mt-20 space-y-3">
        {arsenalTiers.map((t, i) => (
          <Slab key={t.tier} t={t} i={i} />
        ))}
      </div>

      <div className="mt-24 space-y-2" aria-hidden>
        <VelocityMarquee speed={-45}>
          {arsenalMarquee.map((t) => (
            <span key={t} className="serif outline-text px-6 text-[clamp(3rem,8vw,8rem)] leading-none">
              {t}
            </span>
          ))}
        </VelocityMarquee>
        <VelocityMarquee speed={45}>
          {[...arsenalMarquee].reverse().map((t) => (
            <span key={t} className="serif px-6 text-[clamp(3rem,8vw,8rem)] leading-none">
              {t}
            </span>
          ))}
        </VelocityMarquee>
      </div>

      <div className="mx-auto mt-32 w-[min(1400px,92vw)]">
        <p className="micro text-coral">failure log</p>
        <h3 className="serif mt-3 max-w-[18ch] text-[clamp(2rem,4.6vw,4rem)] leading-[1]">
          What broke, and what I changed.
        </h3>
        <ol className="mt-10 border-b border-ink/40">
          {graveyard.map((g, i) => (
            <Fault key={g.title} g={g} i={i} />
          ))}
        </ol>
      </div>

      <Handoff parts={[{ t: "None of it was built" }, { t: "alone.", c: "serif-i text-coral" }]} />
    </section>
  );
}
