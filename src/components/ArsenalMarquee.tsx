"use client";

import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/Reveal";
import { arsenal } from "@/data/content";

function Row({ domain, items, reverse }: { domain: string; items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className={`marquee ${reverse ? "marquee-reverse" : ""}`} style={{ ["--speed" as string]: `${26 + items.length * 3}s` }}>
      <div className="marquee-track py-2">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="btn-squish pointer-events-none whitespace-nowrap px-5 py-2 text-sm"
          >
            <span className="micro mr-2 text-inksoft">{domain.split(" ")[0].toLowerCase()}</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ArsenalMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 220, damping: 40 });
  const skew = useTransform(smooth, (v) => Math.max(-3, Math.min(3, v / 260)));

  return (
    <section id="arsenal" className="py-28" ref={ref}>
      <div className="mx-auto w-[min(1150px,92vw)]">
        <Reveal>
          <p className="micro text-inksoft">03 · technical arsenal</p>
          <h2 className="mt-2 text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold leading-[0.95]">
            Things I wrestle <span className="text-coral">daily.</span>
          </h2>
        </Reveal>
      </div>

      <motion.div className="mt-12 space-y-4" style={{ skewY: skew }}>
        {arsenal.map((row, i) => (
          <div key={row.domain}>
            <p className="mx-auto w-[min(1150px,92vw)] micro mb-1 text-inksoft">{row.domain}</p>
            <Row domain={row.domain} items={row.items} reverse={i % 2 === 1} />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
