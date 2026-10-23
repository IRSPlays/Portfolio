"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import PhotoFrame from "@/components/PhotoFrame";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/motion/SectionHead";
import SplitText from "@/components/motion/SplitText";
import { profile } from "@/data/content";

const chips = ["SAVH-co-designed", "TKKYIA 2026 Merit Award", "XPRIZE builder", "HackerOne researcher", "Edge vision nerd", "Failing with honour"];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yB = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const rA = useTransform(scrollYProgress, [0, 1], [-9, 1]);
  const rB = useTransform(scrollYProgress, [0, 1], [10, 2]);

  return (
    <section id="about" className="mx-auto w-[min(1150px,92vw)] py-14 md:py-20" ref={ref}>
      <SectionHead
        kicker="01 · about the human (and the fox)"
        parts={[
          { t: "Hi, I'm Haziq." },
          { t: "I build systems that punch above their price.", c: "shimmer-teal" },
        ]}
      />

      <div className="mt-14 grid grid-cols-1 items-start gap-14 md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative flex flex-col items-center gap-8 md:block md:h-[520px]">
          <motion.div style={{ y: yA, rotate: rA }} className="w-full max-w-[340px] md:absolute md:left-0 md:top-0 md:w-[78%] md:max-w-none">
            <div className="sticker-card p-3">
              <PhotoFrame slot="cypher-portrait" src="/cypher/pfp.jpg" aspect="1 / 1" alt="Cypher, Haziq's fursona" />
              <p className="micro mt-2 text-center text-inksoft">CYPHER · resident fox · CTO of vibes</p>
            </div>
          </motion.div>
          <motion.div style={{ y: yB, rotate: rB }} className="w-full max-w-[230px] md:absolute md:bottom-0 md:right-0 md:w-[52%] md:max-w-none">
            <div className="sticker-card p-3">
              <PhotoFrame slot="haziq-portrait" src="/haziq-portrait.png" alt="Haziq Shah, Founder of Asirive" />
              <p className="micro mt-2 text-center text-inksoft">the human · founder, asirive</p>
            </div>
          </motion.div>
        </div>

        <div>
          {profile.bio.map((p, i) => (
            <SplitText key={i} as="p" parts={[{ t: p }]} className="prose-body mt-4 text-lg leading-[1.65] text-ink" offset={["start 92%", "start 62%"]} />
          ))}

          <Reveal delay={0.1} variant="tilt">
            <blockquote className="sticker-card circuit mt-8 px-8 py-7">
              <p className="font-display text-3xl font-extrabold leading-tight">
                “{profile.motto}”
              </p>
              <p className="micro mt-3 text-inksoft">{profile.mottoAlt} · {profile.status}</p>
            </blockquote>
          </Reveal>

          <Reveal delay={0.28}>
            <p className="mt-8 italic text-inksoft">“{profile.philosophy}”</p>
          </Reveal>

          <Reveal delay={0.34}>
            <ul className="mt-6 flex flex-wrap gap-3">
              {chips.map((c) => (
                <li key={c} className="btn-squish pointer-events-none px-4 py-1.5 text-sm">
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
