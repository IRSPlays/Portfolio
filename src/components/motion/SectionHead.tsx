"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import SplitText, { type Part } from "@/components/motion/SplitText";

export default function SectionHead({
  kicker,
  parts,
  sub,
}: {
  kicker: string;
  parts: Part[];
  sub?: string;
}) {
  return (
    <header>
      <div className="flex items-center gap-4">
        <p className="micro text-inksoft">{kicker}</p>
        <motion.span
          className="h-[3px] w-24 origin-left rounded bg-coral"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        />
      </div>
      <SplitText as="h2" parts={parts} className="mt-3 text-[clamp(2.6rem,7vw,5.6rem)] font-extrabold leading-[0.93]" />
      {sub ? (
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl text-lg text-inksoft">{sub}</p>
        </Reveal>
      ) : null}
    </header>
  );
}
