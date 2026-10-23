"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import VelocityMarquee from "@/components/motion/VelocityMarquee";
import { eaeMeta } from "@/data/eae";

const ticks = Array.from({ length: 72 }, (_, i) => i);
const rows = [
  ["Applicant", eaeMeta.name],
  ["School", eaeMeta.school],
  ["Based in", eaeMeta.location],
  ["Focus", eaeMeta.focus],
  ["Founder", "Asirive — ambient intelligence & hardware"],
];

export default function Cover() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const ringRot = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0.1, 0.85], [1, 0]);

  return (
    <section ref={ref} id="top" className="blueprint relative flex min-h-[100svh] flex-col overflow-hidden">
      <motion.div style={{ opacity: fade }} className="relative mx-auto grid w-[min(1400px,92vw)] flex-1 grid-cols-1 items-center gap-8 pb-10 pt-28 lg:grid-cols-[1.25fr_0.75fr]">
        {/* measuring ring */}
        <motion.div
          style={{ rotate: ringRot }}
          className="pointer-events-none absolute -right-[12%] top-1/2 hidden h-[min(80vh,720px)] w-[min(80vh,720px)] -translate-y-1/2 lg:block"
          aria-hidden
        >
          <svg viewBox="-210 -210 420 420" className="spin-slow h-full w-full">
            <circle r="200" fill="none" stroke="currentColor" strokeWidth="0.6" className="text-ink/50" />
            <circle r="150" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 6" className="text-ink/40" />
            {ticks.map((i) => (
              <line
                key={i}
                x1="0"
                x2="0"
                y1="-200"
                y2={i % 6 === 0 ? -186 : -194}
                stroke="currentColor"
                strokeWidth={i % 6 === 0 ? 1 : 0.5}
                className="text-ink"
                transform={`rotate(${i * 5})`}
              />
            ))}
            <circle r="5" cx="0" cy="-200" className="fill-coral" />
          </svg>
        </motion.div>

        <motion.div style={{ y: nameY }} className="relative z-10">
          <motion.p
            className="micro text-inksoft"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Portfolio · Early Admissions Exercise
          </motion.p>

          <h1 className="serif-i mt-3 flex text-[clamp(6.5rem,25vw,26rem)] leading-[0.8] tracking-[-0.045em]" aria-label="Haziq">
            {eaeMeta.short.split("").map((ch, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.12em] pr-[0.02em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "115%", rotate: 6 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 1.1, delay: 0.25 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                >
                  {ch}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="serif mt-6 max-w-[20ch] text-[clamp(1.8rem,3.4vw,3rem)] leading-[1.05]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            I build assistive technology <span className="serif-i text-coral">with</span> the people who use it.
          </motion.p>

          <motion.dl
            className="mt-9 grid max-w-xl grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 border-t border-ink/40 pt-4 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {rows.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="micro pt-0.5 text-inksoft">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.figure style={{ y: portraitY }} className="relative z-0 mx-auto w-[min(360px,72vw)] lg:ml-auto lg:mr-[6%]">
          <motion.div
            className="relative aspect-[3/4] overflow-hidden border border-ink bg-bg2"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.3, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <Image
              src="/haziq-portrait.png"
              alt="Portrait of Haziq Shah"
              fill
              priority
              sizes="(max-width: 1024px) 72vw, 360px"
              className="object-cover object-[50%_20%] grayscale contrast-110"
            />
            <div className="absolute inset-0 bg-coral mix-blend-multiply opacity-55" aria-hidden />
          </motion.div>
          <figcaption className="micro mt-2 flex justify-between text-[0.6rem] text-inksoft">
            <span>fig. 01</span>
            <span>H. Shah · {eaeMeta.location}</span>
          </figcaption>
        </motion.figure>
      </motion.div>

      <div className="relative border-y border-ink bg-ink py-3 text-bg">
        <VelocityMarquee speed={-40}>
          {["Assistive technology", "Edge AI", "Embedded systems", "Field-tested", "Built in Singapore"].map((t) => (
            <span key={t} className="micro px-8 text-[0.7rem]">
              {t} <span className="px-5 text-coral">/</span>
            </span>
          ))}
        </VelocityMarquee>
      </div>
    </section>
  );
}
