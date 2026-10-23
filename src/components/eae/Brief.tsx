"use client";

import { motion } from "framer-motion";
import Eyebrow from "@/components/eae/Eyebrow";
import CountUp from "@/components/motion/CountUp";
import SplitText from "@/components/motion/SplitText";
import { eaeStats } from "@/data/eae";

export default function Brief() {
  return (
    <section id="brief" className="relative mx-auto w-[min(1400px,92vw)] py-28 md:py-40">
      <Eyebrow n="01" label="The brief" />

      <SplitText
        as="p"
        offset={["start 85%", "end 60%"]}
        parts={[
          { t: "For a year, my team sat with cane users at the Singapore Association for the Visually Handicapped and built what they asked for:" },
          { t: "a device that speaks only when the cane can't help.", c: "serif-i text-coral" },
        ]}
        className="serif mt-12 max-w-[24ch] text-[clamp(2.2rem,5.8vw,5.6rem)] leading-[1.02] md:max-w-[26ch]"
      />

      <dl className="mt-24 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {eaeStats.map((s, i) => (
          <motion.div
            key={s.label}
            className="relative pt-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: (i % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              className="absolute left-0 top-0 h-px w-full origin-left bg-ink"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: (i % 3) * 0.12, ease: [0.76, 0, 0.24, 1] }}
              aria-hidden
            />
            <dt className="flex items-baseline gap-3">
              <CountUp value={s.v} className="serif text-[clamp(4rem,8vw,7.5rem)] leading-none tracking-[-0.03em]" />
              <span className="micro text-coral">{s.unit}</span>
            </dt>
            <dd className="mt-3 max-w-[32ch] text-[0.95rem] leading-snug text-inksoft">{s.label}</dd>
          </motion.div>
        ))}
      </dl>
    </section>
  );
}
