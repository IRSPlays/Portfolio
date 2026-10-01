"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/Reveal";
import { timeline } from "@/data/content";

export default function RoadToV3() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="road" className="mx-auto w-[min(1150px,92vw)] py-28">
      <Reveal>
        <p className="micro text-inksoft">02 · the road to v3</p>
        <h2 className="mt-2 text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold leading-[0.95]">
          One year. Three versions. <span className="text-coral">Zero ego.</span>
        </h2>
        <p className="mt-3 max-w-2xl text-inksoft">
          Each version exists because the last one failed at something specific — straight from the Asirive journal.
        </p>
      </Reveal>

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
                <span
                  className={`absolute left-[7px] top-2 h-6 w-6 rounded-full border-[4px] border-line md:left-1/2 md:-translate-x-1/2 ${
                    entry.accent ? "bg-coral" : "bg-mint"
                  }`}
                  aria-hidden
                />
                <Reveal
                  delay={0.05}
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
