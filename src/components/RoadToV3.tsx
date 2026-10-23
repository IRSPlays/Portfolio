"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/motion/SectionHead";
import { timeline } from "@/data/content";

export default function RoadToV3() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="road" className="mx-auto w-[min(1150px,92vw)] py-28">
      <SectionHead
        kicker="02 · the road to v3"
        parts={[{ t: "One year. Three versions." }, { t: "Zero ego.", c: "shimmer-coral" }]}
        sub="Each version exists because the last one failed at something specific — straight from the Asirive journal."
      />

      <div ref={ref} className="relative mt-16">
        <div className="absolute left-[18px] top-0 h-full w-[4px] rounded bg-line/15 md:left-1/2 md:-translate-x-1/2" aria-hidden />
        <motion.div
          className="absolute left-[18px] top-0 h-full w-[4px] origin-top rounded bg-teal md:left-1/2 md:-translate-x-1/2"
          style={{ scaleY: lineScale }}
          aria-hidden
        />

        <ol className="space-y-12">
          {timeline.map((entry, i) => {
            const right = i % 2 === 1;
            return (
              <li key={entry.title} className="relative pl-12 md:grid md:grid-cols-2 md:gap-14 md:pl-0">
                <motion.span
                  className={`absolute left-[7px] top-2 z-10 h-6 w-6 rounded-full border-[4px] border-line md:left-1/2 md:-ml-3 ${
                    entry.accent ? "bg-coral" : "bg-mint"
                  }`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: [0, 1.7, 1] }}
                  viewport={{ once: true, margin: "-30% 0px -30% 0px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  aria-hidden
                />
                <Reveal
                  variant={right ? "right" : "left"}
                  className={`${right ? "md:col-start-2" : "md:col-start-1 md:text-right"}`}
                >
                  <article className={`sticker-card px-6 py-5 ${entry.accent ? "circuit" : ""}`}>
                    <p className="micro text-amber">{entry.date} · {entry.tag}</p>
                    <h3 className="mt-1 font-display text-2xl font-extrabold">{entry.title}</h3>
                    <p className="mt-2 text-inksoft">{entry.story}</p>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
