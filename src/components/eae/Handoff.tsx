"use client";

import { motion } from "framer-motion";
import SplitText, { type Part } from "@/components/motion/SplitText";

/** End-of-chapter line that hands the reader to the next section. */
export default function Handoff({ parts }: { parts: Part[] }) {
  return (
    <div className="mx-auto w-[min(1400px,92vw)] pb-16 pt-6">
      <div className="flex items-end justify-between gap-6 border-t border-ink/60 pt-7">
        <SplitText
          as="p"
          parts={parts}
          offset={["start 96%", "start 62%"]}
          className="serif max-w-[22ch] text-[clamp(1.8rem,4vw,3.6rem)] leading-[1.04]"
        />
        <motion.span
          className="serif text-[clamp(3rem,6vw,5rem)] leading-none text-coral"
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          ↓
        </motion.span>
      </div>
    </div>
  );
}
