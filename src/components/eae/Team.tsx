"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Eyebrow from "@/components/eae/Eyebrow";
import SplitText from "@/components/motion/SplitText";
import { team } from "@/data/eae";

export default function Team() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 50%"] });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="team" className="mx-auto w-[min(1400px,92vw)] py-28 md:py-40">
      <Eyebrow n="06" label="Team · Admiralty Secondary" />
      <SplitText
        as="h2"
        parts={[{ t: "Three roles," }, { t: "one device.", c: "serif-i text-coral" }]}
        className="serif mt-10 max-w-[12ch] text-[clamp(2.8rem,8vw,7.5rem)] leading-[0.95]"
      />
      <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-inksoft">
        Asirive began as three 15-year-olds in the same school. Each of us owns a different part of the problem, and none of it ships unless all three do.
      </p>

      <div ref={ref} className="relative mt-20">
        <motion.span
          className="pointer-events-none absolute left-0 right-0 top-[22px] hidden h-px origin-left bg-coral md:block"
          style={{ scaleX: draw }}
          aria-hidden
        />
        <ul className="grid gap-12 md:grid-cols-3 md:gap-8">
          {team.map((m, i) => (
            <motion.li
              key={m.name}
              className="relative pt-14"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="absolute left-0 top-4 h-4 w-4 rounded-full border-2 border-ink bg-coral" aria-hidden />
              <p className="micro text-coral">{m.role}</p>
              <h3 className="serif mt-2 text-[clamp(3rem,6vw,5.5rem)] leading-none">{m.name}</h3>
              <p className="mt-4 max-w-[30ch] leading-snug text-inksoft">{m.line}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
