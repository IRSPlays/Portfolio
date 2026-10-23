"use client";

import { motion } from "framer-motion";
import SplitText from "@/components/motion/SplitText";

/** Connective line between chapters: a thread draws down, then one sentence hands over to the next section. */
export default function Bridge({ text, accent }: { text: string; accent?: string }) {
  return (
    <div className="mx-auto flex w-[min(900px,88vw)] flex-col items-center py-6 text-center">
      <motion.span
        className="block h-20 w-[3px] origin-top rounded bg-line/40"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-20% 0px" }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        aria-hidden
      />
      <SplitText
        as="p"
        parts={accent ? [{ t: text }, { t: accent, c: "text-coral" }] : [{ t: text }]}
        className="mt-6 max-w-[24ch] font-display text-[clamp(1.7rem,3.8vw,2.8rem)] font-bold leading-[1.12] tracking-tight"
        offset={["start 95%", "start 60%"]}
      />
    </div>
  );
}
