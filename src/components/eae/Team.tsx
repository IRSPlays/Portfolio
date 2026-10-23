"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Eyebrow from "@/components/eae/Eyebrow";
import Handoff from "@/components/eae/Handoff";
import { team } from "@/data/eae";

/** Three people, three shapes. As you scroll they slide together and lock into one mark: the device. */
export default function Team() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const circleX = useTransform(p, [0.12, 0.62], ["-30vw", "-5vw"]);
  const triX = useTransform(p, [0.12, 0.62], ["30vw", "5vw"]);
  const squareScale = useTransform(p, [0.12, 0.62, 1], [0.85, 1, 1.15]);
  const squareRot = useTransform(p, [0.12, 1], [0, 135]);
  const markRot = useTransform(p, [0.62, 1], [0, 90]);
  const mergedO = useTransform(p, [0.58, 0.72], [0, 1]);
  const namesO = useTransform(p, [0.3, 0.55], [1, 0]);
  const namesY = useTransform(p, [0.3, 0.55], [0, 30]);
  const headO = useTransform(p, [0.2, 0.38], [1, 0]);

  return (
    <section id="team" className="eae-blue relative">
      <div ref={ref} className="relative" style={{ height: "340vh" }}>
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
          <div className="absolute left-[4vw] top-24 z-10">
            <Eyebrow n="06" label="Team · Admiralty Secondary" />
          </div>

          {/* intro headline fades as the shapes start moving */}
          <motion.h2
            style={{ opacity: headO }}
            className="serif absolute left-[4vw] right-[4vw] top-[16%] text-[clamp(2.4rem,6.4vw,6.4rem)] leading-[0.95]"
          >
            Three roles, <span className="serif-i text-coral">one device.</span>
          </motion.h2>

          <motion.div style={{ rotate: markRot }} className="absolute left-1/2 top-[47%] flex h-[min(30vh,300px)] w-[min(30vh,300px)] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <motion.svg style={{ x: circleX }} viewBox="0 0 100 100" className="absolute h-[85%] w-[85%] overflow-visible" aria-hidden>
              <circle cx="50" cy="50" r="48" fill="#ff4a1c" fillOpacity="0.88" stroke="#f2eee4" strokeWidth="1.2" />
            </motion.svg>
            <motion.svg style={{ x: triX }} viewBox="0 0 100 100" className="absolute h-[85%] w-[85%] overflow-visible" aria-hidden>
              <polygon points="50,4 97,92 3,92" fill="#f2eee4" fillOpacity="0.88" stroke="#f2eee4" strokeWidth="1.2" />
            </motion.svg>
            <motion.svg style={{ scale: squareScale, rotate: squareRot }} viewBox="0 0 100 100" className="absolute h-[70%] w-[70%] overflow-visible mix-blend-multiply" aria-hidden>
              <rect x="6" y="6" width="88" height="88" fill="#0b0b0c" fillOpacity="0.78" stroke="#f2eee4" strokeWidth="1.2" />
            </motion.svg>
          </motion.div>

          {/* names appear under their shapes, then dissolve into the merged mark */}
          <motion.ul style={{ opacity: namesO, y: namesY }} className="absolute bottom-[6%] grid w-[min(1100px,92vw)] grid-cols-3 gap-3 text-center">
            {team.map((m) => (
              <li key={m.name}>
                <p className="micro text-coral">{m.role}</p>
                <p className="serif text-[clamp(2rem,5vw,4.5rem)] leading-none">{m.name}</p>
                <p className="mx-auto mt-2 hidden max-w-[24ch] text-[0.9rem] leading-snug text-inksoft sm:block">{m.line}</p>
              </li>
            ))}
          </motion.ul>

          <motion.div style={{ opacity: mergedO }} className="absolute bottom-[8%] w-[min(900px,92vw)] text-center">
            <p className="serif text-[clamp(2.2rem,6vw,5.5rem)] leading-[0.98]">
              Haziq, Irfan <span className="serif-i text-coral">&amp;</span> Eryna.
            </p>
            <p className="mx-auto mt-3 max-w-[48ch] text-[1rem] leading-snug text-inksoft">
              Three 15-year-olds from one school. Each owns a part of the problem; none of it ships unless all three do.
            </p>
          </motion.div>
        </div>
      </div>

      <Handoff parts={[{ t: "So — where does" }, { t: "this go next?", c: "serif-i text-coral" }]} />
    </section>
  );
}
