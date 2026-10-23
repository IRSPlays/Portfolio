"use client";

import { motion } from "framer-motion";
import Eyebrow from "@/components/eae/Eyebrow";
import Magnetic from "@/components/motion/Magnetic";
import SplitText from "@/components/motion/SplitText";
import { eaeLinks, eaeMeta } from "@/data/eae";

function Letters({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          whileHover={{ y: -16, color: "#ff4a1c" }}
          transition={{ type: "spring", stiffness: 500, damping: 14 }}
        >
          {ch}
        </motion.span>
      ))}
    </>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="eae-dark relative overflow-hidden pb-8 pt-28 md:pt-40">
      <div className="mx-auto w-[min(1400px,92vw)]">
        <Eyebrow n="08" label="Contact" />

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <SplitText
              as="h2"
              parts={[{ t: "Let's talk about" }, { t: "building.", c: "serif-i text-coral" }]}
              className="serif max-w-[11ch] text-[clamp(3.2rem,10vw,9.5rem)] leading-[0.9]"
            />
            <a
              href={`mailto:${eaeMeta.email}`}
              data-hover
              className="serif mt-12 block text-[clamp(1.5rem,4.6vw,4.2rem)] leading-none"
              aria-label={`Email ${eaeMeta.email}`}
            >
              <Letters text={eaeMeta.email} />
            </a>
          </div>

          <Magnetic strength={0.25} className="mx-auto">
            <a
              href={`mailto:${eaeMeta.email}`}
              data-hover
              className="group relative grid h-[min(46vw,300px)] w-[min(46vw,300px)] place-items-center rounded-full bg-coral text-[#111]"
              aria-label="Say hello by email"
            >
              <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 h-full w-full" aria-hidden>
                <defs>
                  <path id="eae-ring" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
                </defs>
                <text fontSize="13" fontWeight="700" letterSpacing="3.4" fill="#111" className="font-mono">
                  <textPath href="#eae-ring" textLength="500">SAY HELLO • SAY HELLO • SAY HELLO •</textPath>
                </text>
              </svg>
              <span className="serif text-[clamp(3rem,7vw,5.5rem)] leading-none transition-transform duration-500 group-hover:rotate-45">↗</span>
            </a>
          </Magnetic>
        </div>

        <ul className="mt-24 grid gap-px bg-ink/30 sm:grid-cols-2 lg:grid-cols-4">
          {eaeLinks.map((l) => (
            <li key={l.href} className="bg-bg">
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="row-sweep flex h-full min-h-[150px] flex-col justify-between gap-10 p-6"
              >
                <span className="micro soft text-inksoft">{l.handle}</span>
                <span className="serif text-3xl leading-none">
                  {l.label} <span className="text-coral">↗</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p
        className="serif outline-text mt-24 select-none whitespace-nowrap text-center text-[clamp(6rem,26vw,28rem)] leading-[0.8]"
        aria-hidden
      >
        Haziq
      </p>
      <div className="mx-auto mt-6 flex w-[min(1400px,92vw)] flex-wrap justify-between gap-2 border-t border-ink/30 py-5">
        <p className="micro text-[0.65rem] text-inksoft">© {new Date().getFullYear()} {eaeMeta.name}</p>
        <p className="micro text-[0.65rem] text-inksoft">
          {eaeMeta.school} · {eaeMeta.location}
        </p>
      </div>
    </section>
  );
}
