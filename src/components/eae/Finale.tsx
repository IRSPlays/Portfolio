"use client";

import { motion } from "framer-motion";
import Eyebrow from "@/components/eae/Eyebrow";
import Magnetic from "@/components/motion/Magnetic";
import SplitText from "@/components/motion/SplitText";
import { eaeLinks, eaeMeta, eaeNow } from "@/data/eae";

export default function Finale() {
  return (
    <>
      <section id="next" className="mx-auto w-[min(1400px,92vw)] py-28 md:py-40">
        <Eyebrow n="07" label="What's next" />
        <SplitText
          as="p"
          offset={["start 85%", "end 60%"]}
          parts={[
            { t: "I taught myself electronics, firmware and machine learning by building things that had to work for someone else. What I want next is" },
            { t: "formal depth, and people better than me to build with.", c: "serif-i text-coral" },
          ]}
          className="serif mt-12 max-w-[26ch] text-[clamp(2.1rem,5.4vw,5rem)] leading-[1.03]"
        />

        <ul className="mt-20 grid gap-px bg-ink/30 md:grid-cols-3">
          {eaeNow.map((n, i) => (
            <motion.li
              key={n.title}
              className="bg-bg p-7 md:p-9"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <p className="micro flex items-center gap-2 text-coral">
                <span className="blink inline-block h-2 w-2 rounded-full bg-coral" />
                {n.tag}
              </p>
              <h3 className="serif mt-3 text-3xl leading-tight">{n.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-snug text-inksoft">{n.detail}</p>
            </motion.li>
          ))}
        </ul>
      </section>

      <section id="contact" className="eae-dark relative overflow-hidden pb-10 pt-28 md:pt-40">
        <div className="mx-auto w-[min(1400px,92vw)]">
          <Eyebrow n="08" label="Contact" />
          <SplitText
            as="h2"
            parts={[{ t: "Let's talk about" }, { t: "building.", c: "serif-i text-coral" }]}
            className="serif mt-10 max-w-[12ch] text-[clamp(3rem,9.5vw,9rem)] leading-[0.92]"
          />

          <Magnetic strength={0.12} className="mt-14 block">
            <a
              href={`mailto:${eaeMeta.email}`}
              data-hover
              className="serif group relative inline-block text-[clamp(1.6rem,5.2vw,4.6rem)] leading-none"
            >
              {eaeMeta.email}
              <motion.span
                className="absolute -bottom-2 left-0 h-[3px] w-full origin-left bg-coral"
                initial={{ scaleX: 0.15 }}
                whileHover={{ scaleX: 1 }}
                animate={{ scaleX: 0.15 }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              />
              <span className="ml-4 inline-block text-coral transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2">↗</span>
            </a>
          </Magnetic>

          <ul className="mt-20 grid gap-px bg-ink/30 sm:grid-cols-2 lg:grid-cols-4">
            {eaeLinks.map((l) => (
              <li key={l.href} className="bg-bg">
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  className="row-sweep flex h-full flex-col justify-between gap-10 p-6"
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

        <p className="serif outline-text mt-24 select-none whitespace-nowrap text-center text-[clamp(6rem,26vw,28rem)] leading-[0.8]" aria-hidden>
          Haziq
        </p>
        <div className="mx-auto mt-6 flex w-[min(1400px,92vw)] flex-wrap justify-between gap-2 border-t border-ink/30 py-5">
          <p className="micro text-[0.65rem] text-inksoft">© {new Date().getFullYear()} {eaeMeta.name}</p>
          <p className="micro text-[0.65rem] text-inksoft">{eaeMeta.school} · {eaeMeta.location}</p>
        </div>
      </section>
    </>
  );
}
