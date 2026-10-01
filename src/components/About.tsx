"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import PhotoFrame from "@/components/PhotoFrame";
import Reveal from "@/components/Reveal";
import { profile } from "@/data/content";

const chips = ["SAVH-tested", "XPRIZE builder", "HackerOne researcher", "Edge vision nerd", "Failing with honour"];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yB = useTransform(scrollYProgress, [0, 1], [70, -60]);

  return (
    <section id="about" className="mx-auto w-[min(1150px,92vw)] py-28" ref={ref}>
      <Reveal>
        <p className="micro text-inksoft">01 · about the human (and the fox)</p>
        <h2 className="mt-2 text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold leading-[0.95]">
          Hi, I&apos;m Haziq. <span className="text-teal">I build systems that punch above their price.</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 items-start gap-14 md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative h-[520px]">
          <motion.div style={{ y: yA }} className="absolute left-0 top-0 w-[78%] rotate-[-4deg]">
            <div className="sticker-card p-3">
              <PhotoFrame slot="cypher-portrait" src="/cypher-sticker.jpg" alt="Cypher, Haziq's fursona" />
              <p className="micro mt-2 text-center text-inksoft">CYPHER · resident fox · CTO of vibes</p>
            </div>
          </motion.div>
          <motion.div style={{ y: yB }} className="absolute bottom-0 right-0 w-[52%] rotate-[5deg]">
            <div className="sticker-card p-3">
              <PhotoFrame slot="haziq-portrait" />
              <p className="micro mt-2 text-center text-inksoft">the human</p>
            </div>
          </motion.div>
        </div>

        <div>
          {profile.bio.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="mt-4 text-lg leading-relaxed text-inksoft">{p}</p>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
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
