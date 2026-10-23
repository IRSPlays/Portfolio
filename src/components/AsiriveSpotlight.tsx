"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import Band from "@/components/motion/Band";
import CountUp from "@/components/motion/CountUp";
import SplitText from "@/components/motion/SplitText";
import { PawIcon, SparkleIcon } from "@/components/Sticker";
import { asirive, projects } from "@/data/content";
import { cortexSteps } from "@/data/eae";

const aetherStats = [
  { k: "parameters", v: "≈187M", from: { x: -260, y: -120, r: -24 } },
  { k: "accelerator", v: "RX 7600 · 8 GB", from: { x: 40, y: -200, r: 14 } },
  { k: "BF16 sustained", v: "26.30 TFLOPS", from: { x: 280, y: -90, r: 22 } },
  { k: "train speed", v: "3,900–4,200 t/s", from: { x: -300, y: 120, r: 18 } },
  { k: "token target", v: "6.55B", from: { x: 30, y: 210, r: -16 } },
  { k: "tests passing", v: "116", from: { x: 300, y: 140, r: -20 } },
];

const tilt = [-4, 3, -2, 4, -3];

/** Stats start scattered around the card and settle into a grid as you scroll. */
function StatTile({ s, i, progress }: { s: (typeof aetherStats)[number]; i: number; progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const x = useTransform(progress, [0, 1], [s.from.x, 0]);
  const y = useTransform(progress, [0, 1], [s.from.y, 0]);
  const rotate = useTransform(progress, [0, 1], [s.from.r, (i % 2 ? 1 : -1) * 1.5]);
  return (
    <motion.li style={{ x, y, rotate }} className="sticker-card px-5 py-4">
      <p className="micro text-inksoft">{s.k}</p>
      <CountUp value={s.v} className="font-display text-2xl font-extrabold md:text-[1.7rem]" />
    </motion.li>
  );
}

export default function AsiriveSpotlight() {
  const cortex = projects.find((p) => p.id === "asirive-cortex")!;
  const aether = projects.find((p) => p.id === "asirive-aether")!;

  /* ----- giant wordmark ----- */
  const head = useRef<HTMLDivElement>(null);
  const { scrollYProgress: headP } = useScroll({ target: head, offset: ["start end", "end start"] });
  const nameX = useTransform(headP, [0, 1], ["14%", "-14%"]);
  const nameScale = useTransform(headP, [0, 0.5, 1], [0.85, 1, 1.08]);

  /* ----- pinned Cortex story ----- */
  const pin = useRef<HTMLDivElement>(null);
  const { scrollYProgress: pinP } = useScroll({ target: pin, offset: ["start start", "end end"] });
  const [i, setI] = useState(0);
  const n = cortexSteps.length;
  useMotionValueEvent(pinP, "change", (v) => setI(Math.max(0, Math.min(n - 1, Math.floor(v * n * 0.999)))));
  const step = cortexSteps[i];

  /* ----- Aether stat settle ----- */
  const grid = useRef<HTMLUListElement>(null);
  const { scrollYProgress: gridP } = useScroll({ target: grid, offset: ["start 95%", "start 40%"] });

  return (
    <Band id="asirive" tint="amber" strength={12} className="mt-8 pb-20 pt-20">
      {/* ---------- 03 · the company ---------- */}
      <div ref={head} className="mx-auto w-[min(1150px,92vw)]">
        <div className="flex items-center gap-4">
          <p className="micro text-inksoft">03 · the flagship company</p>
          <span className="h-[3px] w-24 rounded bg-coral" aria-hidden />
        </div>
        <motion.h2
          style={{ x: nameX, scale: nameScale }}
          className="mt-3 origin-left whitespace-nowrap font-display text-[clamp(4.5rem,16vw,13rem)] font-extrabold leading-[0.85] shimmer-teal"
        >
          {asirive.name}
        </motion.h2>
        <p className="micro mt-2 text-amber">{asirive.tagline} · asirive.com</p>
        <SplitText
          as="p"
          parts={[{ t: `“${asirive.belief}”` }]}
          className="mt-10 max-w-4xl font-display text-[clamp(1.6rem,3.4vw,2.8rem)] font-bold leading-tight"
        />
        <p className="lede mt-5 text-inksoft">{asirive.mission}</p>
      </div>

      {/* ---------- Cortex: pinned story with a pile of polaroids ---------- */}
      <div className="mx-auto mt-24 w-[min(1150px,92vw)]">
        <div className="flex flex-wrap items-center gap-3">
          <span className="btn-squish pointer-events-none btn-coral px-4 py-1 text-xs">FLAGSHIP</span>
          <span className="micro text-inksoft">navigation-first · audio-first · assistive hardware</span>
        </div>
        <h3 className="mt-4 font-display text-[clamp(2.6rem,6vw,5rem)] font-extrabold leading-none">{cortex.name}</h3>
        <p className="mt-3 text-xl text-teal">{cortex.tagline}</p>
      </div>

      <div ref={pin} className="relative mt-10 hidden md:block" style={{ height: `${n * 90}vh` }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto grid w-[min(1150px,92vw)] grid-cols-[1.1fr_1fr] items-center gap-12">
            {/* the pile */}
            <div className="relative aspect-[4/3] w-full">
              {cortexSteps.map((s, idx) => {
                const shown = idx <= i;
                const rot = tilt[idx % tilt.length];
                return (
                  <motion.div
                    key={s.img}
                    className="sticker-card absolute inset-0 p-3"
                    style={{ zIndex: idx }}
                    initial={false}
                    animate={{
                      y: shown ? 0 : -640,
                      x: shown ? (idx - i) * 6 : 0,
                      rotate: shown ? rot : 24,
                      opacity: shown ? 1 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 15 }}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-[14px]">
                      <Image src={s.img} alt={s.alt} fill sizes="50vw" className="object-cover" />
                    </div>
                    <span className="micro absolute -bottom-3 left-6 rounded-full border-2 border-line bg-card px-3 py-1 text-[0.6rem]">
                      {s.k}
                    </span>
                  </motion.div>
                );
              })}
              <motion.div className="absolute -right-6 -top-8 z-[20]" animate={{ rotate: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                <PawIcon size={56} />
              </motion.div>
            </div>

            {/* the text */}
            <div className="relative min-h-[430px]">
              <div className="flex items-center gap-2" aria-hidden>
                {cortexSteps.map((_, idx) => (
                  <motion.span
                    key={idx}
                    className="block h-3.5 rounded-full border-2 border-line"
                    animate={{ width: idx === i ? 44 : 14, backgroundColor: idx <= i ? "var(--coral)" : "var(--card)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  />
                ))}
                <span className="micro ml-2 text-inksoft">
                  {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, rotate: -1 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="micro mt-8 text-amber">{step.k}</p>
                  <h4 className="mt-2 font-display text-[clamp(1.8rem,3vw,2.7rem)] font-extrabold leading-[1.05]">{step.title}</h4>
                  <p className="mt-4 max-w-[48ch] text-[1.05rem] leading-relaxed text-inksoft">{step.body}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {step.chips.map((c) => (
                      <li key={c} className="micro rounded-full border-2 border-line bg-card px-3 py-1 text-[0.62rem]">
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

      {/* mobile: plain stack */}
      <div className="mx-auto mt-10 w-[min(1150px,92vw)] space-y-8 md:hidden">
        {cortexSteps.map((s, idx) => (
          <article key={s.k} className="sticker-card p-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[14px]">
              <Image src={s.img} alt={s.alt} fill sizes="90vw" className="object-cover" />
            </div>
            <p className="micro mt-4 text-amber">
              {String(idx + 1).padStart(2, "0")} · {s.k}
            </p>
            <h4 className="mt-1 font-display text-2xl font-extrabold leading-tight">{s.title}</h4>
            <p className="mt-2 text-inksoft">{s.body}</p>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-10 flex w-[min(1150px,92vw)] flex-wrap gap-3">
        {cortex.links.map((l) => (
          <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn-squish btn-solid">
            {l.label} ↗
          </a>
        ))}
      </div>

      {/* ---------- Aether ---------- */}
      <div className="mx-auto mt-28 w-[min(1150px,92vw)]">
        <Reveal variant="tilt">
          <article className="sticker-card circuit p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="btn-squish pointer-events-none px-4 py-1 text-xs">REV 0.1 // IN DEVELOPMENT</span>
              <span className="micro text-inksoft">in-house edge language model · formerly SNAP-C1</span>
              <SparkleIcon size={34} />
            </div>
            <h3 className="mt-4 font-display text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-none">{aether.name}</h3>
            <p className="mt-2 text-xl text-coral">{aether.tagline}</p>

            <div className="mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <p className="leading-relaxed text-inksoft">{aether.mission}</p>
                <ul className="mt-4 space-y-2 text-inksoft">
                  {aether.built.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="text-teal">▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <p className="micro mt-5 text-amber">small by design — not small by compromise · we publish failures</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {aether.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn-squish">
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              </div>
              <ul ref={grid} className="grid grid-cols-2 gap-3 self-center">
                {aetherStats.map((s, idx) => (
                  <StatTile key={s.k} s={s} i={idx} progress={gridP} />
                ))}
              </ul>
            </div>
          </article>
        </Reveal>
      </div>
    </Band>
  );
}
