"use client";

import { motion } from "framer-motion";
import Eyebrow from "@/components/eae/Eyebrow";
import SplitText from "@/components/motion/SplitText";
import VelocityMarquee from "@/components/motion/VelocityMarquee";
import { arsenalMarquee, arsenalTiers, graveyard } from "@/data/content";

export default function Craft() {
  return (
    <section id="craft" className="eae-dark relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto w-[min(1400px,92vw)]">
        <Eyebrow n="05" label="Craft · tools & failures" />
        <SplitText
          as="h2"
          parts={[{ t: "From the soldering iron" }, { t: "up to the model.", c: "serif-i text-coral" }]}
          className="serif mt-10 max-w-[16ch] text-[clamp(2.8rem,8vw,7.5rem)] leading-[0.95]"
        />

        <div className="mt-20 grid gap-px bg-ink/30 md:grid-cols-3">
          {arsenalTiers.map((t, i) => (
            <motion.article
              key={t.tier}
              className="bg-bg p-7 md:p-9"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="micro text-coral">{t.tier}</p>
              <h3 className="serif mt-3 text-3xl leading-tight">{t.subtitle}</h3>
              <ul className="mt-6 space-y-3 text-[0.95rem] leading-snug text-inksoft">
                {t.items.map((it) => (
                  <li key={it} className="flex gap-3">
                    <span className="text-coral">→</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="mt-24 space-y-2" aria-hidden>
        <VelocityMarquee base={-6}>
          {arsenalMarquee.map((t) => (
            <span key={t} className="serif outline-text px-6 text-[clamp(3rem,8vw,8rem)] leading-none">
              {t}
            </span>
          ))}
        </VelocityMarquee>
        <VelocityMarquee base={6}>
          {[...arsenalMarquee].reverse().map((t) => (
            <span key={t} className="serif px-6 text-[clamp(3rem,8vw,8rem)] leading-none">
              {t}
            </span>
          ))}
        </VelocityMarquee>
      </div>

      <div className="mx-auto mt-28 w-[min(1400px,92vw)]">
        <p className="micro text-coral">failure log — what broke, and what I changed</p>
        <ol className="mt-8 grid gap-px bg-ink/30 md:grid-cols-3">
          {graveyard.map((g, i) => (
            <motion.li
              key={g.title}
              className="bg-bg p-7"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <p className="micro text-inksoft">fault 0{i + 1}</p>
              <h3 className="serif mt-2 text-2xl leading-tight">{g.title}</h3>
              <p className="mt-4 text-sm leading-snug text-inksoft">
                <span className="micro mr-2 text-coral">broke</span>
                {g.died}
              </p>
              <p className="mt-3 text-sm leading-snug">
                <span className="micro mr-2 text-coral">fixed</span>
                {g.fix}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
