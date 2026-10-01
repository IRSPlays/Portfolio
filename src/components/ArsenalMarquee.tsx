"use client";

import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import Reveal from "@/components/Reveal";
import { arsenalMarquee, arsenalTiers } from "@/data/content";

function MarqueeRow({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee" style={{ ["--speed" as string]: "45s" }}>
      <div className="marquee-track py-2">
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="btn-squish pointer-events-none whitespace-nowrap px-5 py-2 text-sm">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ArsenalMarquee() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 220, damping: 40 });
  const skew = useTransform(smooth, (v) => Math.max(-3, Math.min(3, v / 260)));

  return (
    <section id="arsenal" className="py-28">
      <div className="mx-auto w-[min(1150px,92vw)]">
        <Reveal>
          <p className="micro text-inksoft">05 · technical arsenal</p>
          <h2 className="mt-2 text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold leading-[0.95]">
            The <span className="text-teal">zero-glaze</span> stack.
          </h2>
          <p className="mt-3 max-w-2xl text-inksoft">
            Three functional layers from silicon to cognition. No icon soup, no fluff — just what actually ships.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {arsenalTiers.map((tier, i) => (
            <Reveal key={tier.tier} delay={i * 0.09}>
              <article className="sticker-card h-full px-6 py-6">
                <p className="micro text-amber">{tier.tier}</p>
                <h3 className="mt-1 font-display text-2xl font-extrabold">{tier.subtitle}</h3>
                <ul className="mt-4 space-y-3 text-inksoft">
                  {tier.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-teal">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <motion.div className="mt-14" style={{ skewY: skew }}>
        <MarqueeRow items={arsenalMarquee} />
      </motion.div>
    </section>
  );
}
