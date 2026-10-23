"use client";

import { motion } from "framer-motion";
import Eyebrow from "@/components/eae/Eyebrow";
import Handoff from "@/components/eae/Handoff";
import SplitText from "@/components/motion/SplitText";
import { eaeNow } from "@/data/eae";

export default function Next() {
  return (
    <section id="next" className="relative">
      <div className="mx-auto w-[min(1400px,92vw)] pt-28 md:pt-40">
        <Eyebrow n="07" label="What's next" />
        <SplitText
          as="p"
          offset={["start 85%", "end 55%"]}
          parts={[
            { t: "I taught myself electronics, firmware and machine learning by building things that had to work for someone else. What I want next is" },
            { t: "formal depth, and people better than me to build with.", c: "serif-i text-coral" },
          ]}
          className="serif mt-12 max-w-[26ch] text-[clamp(2.1rem,5.4vw,5rem)] leading-[1.03]"
        />

        <div className="mt-24">
          <p className="micro flex items-center gap-2 text-inksoft">
            <span className="blink inline-block h-2 w-2 rounded-full bg-coral" />
            on the bench right now
          </p>
          <ul className="mt-6 border-b border-ink">
            {eaeNow.map((n, i) => (
              <motion.li
                key={n.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="row-sweep grid gap-x-8 gap-y-2 border-t border-ink px-2 py-8 md:grid-cols-[9rem_1fr_1.1fr] md:px-4 md:py-10"
                data-hover
              >
                <span className="micro soft pt-3 text-inksoft">{n.tag}</span>
                <span className="serif text-[clamp(2rem,4.4vw,4.2rem)] leading-none">{n.title}</span>
                <span className="soft max-w-[46ch] pt-1 text-[0.98rem] leading-snug text-inksoft md:pt-2">{n.detail}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16">
        <Handoff parts={[{ t: "If any of that sounds like a fit," }, { t: "let's talk.", c: "serif-i text-coral" }]} />
      </div>
    </section>
  );
}
