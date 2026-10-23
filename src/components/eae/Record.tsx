"use client";

import { motion } from "framer-motion";
import Eyebrow from "@/components/eae/Eyebrow";
import SplitText from "@/components/motion/SplitText";
import { eaeRecord } from "@/data/eae";

export default function Record() {
  return (
    <section id="record" className="mx-auto w-[min(1400px,92vw)] py-28 md:py-40">
      <Eyebrow n="03" label="The record" />
      <SplitText
        as="h2"
        parts={[{ t: "Awards, trials" }, { t: "and receipts.", c: "serif-i text-coral" }]}
        className="serif mt-10 max-w-[14ch] text-[clamp(2.8rem,8vw,7.5rem)] leading-[0.95]"
      />

      <ol className="mt-16 border-b border-ink">
        {eaeRecord.map((r, i) => {
          const inner = (
            <>
              <span className="micro soft pt-2 text-inksoft">{r.n}</span>
              <span>
                <span className="serif block text-[clamp(1.6rem,3.2vw,3rem)] leading-[1.06]">{r.title}</span>
                <span className="soft mt-2 block max-w-[60ch] text-[0.98rem] leading-snug text-inksoft">{r.detail}</span>
              </span>
              <span className="micro soft pt-2 text-inksoft md:text-right">{r.when}</span>
            </>
          );
          const cls =
            "row-sweep grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-2 border-t border-ink px-2 py-7 md:grid-cols-[4.5rem_1fr_9rem] md:px-4 md:py-9";
          return (
            <motion.li
              key={r.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              {r.href ? (
                <a href={r.href} target="_blank" rel="noopener noreferrer" className={`${cls} block-link`} data-hover>
                  {inner}
                </a>
              ) : (
                <div className={cls} data-hover>
                  {inner}
                </div>
              )}
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
