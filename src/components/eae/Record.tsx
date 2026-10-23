"use client";

import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Eyebrow from "@/components/eae/Eyebrow";
import Handoff from "@/components/eae/Handoff";
import SplitText from "@/components/motion/SplitText";
import { eaeRecord } from "@/data/eae";

type Item = (typeof eaeRecord)[number];

function Plate({ r, i, wide, progress }: { r: Item; i: number; wide?: boolean; progress?: MotionValue<number> }) {
  // the big numeral drifts against the scroll for a layered, parallax feel
  const fallback = useTransform(useScroll().scrollYProgress, [0, 1], [0, 0]);
  const numX = useTransform(progress ?? fallback, [0, 1], [60 - i * 20, -120 + i * 20]);
  const body = (
    <>
      <div className="flex items-start justify-between">
        <span className="micro text-[0.7rem]">{r.when}</span>
        <span className="micro text-[0.7rem]">{String(i + 1).padStart(2, "0")} / {String(eaeRecord.length).padStart(2, "0")}</span>
      </div>
      <motion.span
        style={wide ? { x: numX } : undefined}
        className="serif-i pointer-events-none absolute right-3 top-9 select-none text-[clamp(5.5rem,9vw,8.5rem)] leading-none opacity-40"
        aria-hidden
      >
        <span className="outline-text" style={{ WebkitTextStroke: "1.5px #111" }}>
          {r.n}
        </span>
      </motion.span>
      <div className="relative mt-auto">
        <h3 className="serif max-w-[16ch] text-[clamp(1.7rem,2.6vw,2.6rem)] leading-[1.04]">{r.title}</h3>
        <p className="mt-4 max-w-[38ch] text-[0.95rem] leading-snug text-black/70">{r.detail}</p>
        {r.href ? <p className="micro mt-4 border-b border-black pb-0.5 text-[0.65rem] w-fit">view profile ↗</p> : null}
      </div>
    </>
  );
  const cls = `relative flex flex-col overflow-hidden border-2 border-black bg-[#f2eee4] p-6 text-black shadow-[10px_10px_0_#111] ${
    wide ? "h-[min(50vh,440px)] w-[min(480px,80vw)] shrink-0" : "min-h-[360px] w-full"
  }`;
  const tilt = wide ? { rotate: i % 2 ? 1.2 : -1.2 } : undefined;
  return r.href ? (
    <motion.a href={r.href} target="_blank" rel="noopener noreferrer" data-hover className={cls} style={tilt} whileHover={{ y: -10, rotate: 0 }}>
      {body}
    </motion.a>
  ) : (
    <motion.div className={cls} style={tilt} whileHover={{ y: -10, rotate: 0 }} data-hover>
      {body}
    </motion.div>
  );
}

export default function Record() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [desktop, setDesktop] = useState(false);
  const [dist, setDist] = useState(0);
  const [cur, setCur] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const measure = () => {
      setDesktop(mq.matches);
      if (track.current) setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    const t = [300, 1200].map((ms) => window.setTimeout(measure, ms));
    return () => {
      mq.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
      t.forEach(window.clearTimeout);
    };
  }, [desktop]);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const ghostX = useTransform(scrollYProgress, [0, 1], ["8%", "-48%"]);
  useMotionValueEvent(scrollYProgress, "change", (v) => setCur(Math.min(eaeRecord.length - 1, Math.floor(v * eaeRecord.length * 0.999))));

  return (
    <section id="record" className="eae-signal relative overflow-x-clip">
      <div ref={wrap} className="relative" style={desktop ? { height: `calc(100vh + ${dist}px)` } : undefined}>
        <div className={desktop ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-20 pb-8" : "py-28"}>
          {/* ghost word travelling behind everything */}
          <motion.p
            style={{ x: ghostX }}
            className="serif-i pointer-events-none absolute left-0 top-1/2 -z-0 -translate-y-1/2 select-none whitespace-nowrap text-[clamp(14rem,38vw,40rem)] leading-none"
            aria-hidden
          >
            <span style={{ WebkitTextStroke: "1.5px rgba(17,17,17,.35)", color: "transparent" }}>The record</span>
          </motion.p>

          <div className="relative z-10 mx-auto w-[min(1400px,92vw)]">
            <div className="flex items-end justify-between gap-6">
              <div>
                <Eyebrow n="03" label="The record" />
                <SplitText
                  as="h2"
                  parts={[{ t: "Awards, trials and" }, { t: "receipts.", c: "serif-i" }]}
                  className="serif mt-3 text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.96]"
                />
              </div>
              {desktop ? (
                <p className="serif text-[clamp(3rem,6vw,5rem)] leading-none">
                  {String(cur + 1).padStart(2, "0")}
                  <span className="micro ml-2 text-[0.7rem]">/ {String(eaeRecord.length).padStart(2, "0")}</span>
                </p>
              ) : null}
            </div>
          </div>

          {desktop ? (
            <>
              <motion.div ref={track} style={{ x }} className="relative z-10 mt-8 flex w-max items-stretch gap-8 px-[4vw] py-4">
                {eaeRecord.map((r, i) => (
                  <Plate key={r.n} r={r} i={i} wide progress={scrollYProgress} />
                ))}
              </motion.div>
              <div className="relative z-10 mx-auto mt-6 h-[6px] w-[min(520px,70vw)] overflow-hidden border border-black">
                <motion.div className="h-full origin-left bg-black" style={{ scaleX: scrollYProgress }} />
              </div>
            </>
          ) : (
            <div ref={track} className="relative z-10 mx-auto mt-12 grid w-[min(1400px,92vw)] gap-8 sm:grid-cols-2">
              {eaeRecord.map((r, i) => (
                <Plate key={r.n} r={r} i={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Handoff parts={[{ t: "Cortex isn't the only thing" }, { t: "I build.", c: "serif-i" }]} />
    </section>
  );
}
