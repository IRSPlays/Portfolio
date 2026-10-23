"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Band from "@/components/motion/Band";
import SectionHead from "@/components/motion/SectionHead";
import VelocityMarquee from "@/components/motion/VelocityMarquee";
import { BoltIcon, ChipIcon, PawIcon } from "@/components/Sticker";
import { arsenalMarquee, arsenalTiers } from "@/data/content";

const slabs = [
  { color: "var(--coral)", icon: <ChipIcon size={64} />, label: "silicon" },
  { color: "var(--amber)", icon: <BoltIcon size={64} />, label: "bare metal" },
  { color: "var(--teal)", icon: <PawIcon size={64} />, label: "cognition" },
];

function Slab({ i, spread, active }: { i: number; spread: ReturnType<typeof useSpring>; active: number }) {
  const z = useTransform(spread, (s) => i * 18 + s * (i - 1) * 190);
  const lift = active === i ? 40 : 0;
  return (
    <motion.div
      className="absolute inset-0 grid place-items-center rounded-[28px] border-[4px] border-line"
      style={{ z, background: slabs[i].color, boxShadow: "0 0 0 0 transparent" }}
      animate={{ x: lift * 0.6, y: -lift * 0.3, opacity: active === -1 || active === i ? 1 : 0.8 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <div className="flex items-center gap-4 text-bg">
        {slabs[i].icon}
        <div>
          <p className="micro text-bg/80">layer 0{i + 1}</p>
          <p className="font-display text-3xl font-extrabold uppercase leading-none">{slabs[i].label}</p>
        </div>
      </div>
      <span className="absolute inset-3 rounded-[20px] border-2 border-dashed border-bg/50" aria-hidden />
    </motion.div>
  );
}

export default function ArsenalMarquee() {
  const pin = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: pin, offset: ["start start", "end end"] });
  const spread = useSpring(useTransform(scrollYProgress, [0.05, 0.3], [0, 1]), { stiffness: 80, damping: 20 });
  const [active, setActive] = useState(-1);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.22) return setActive(-1);
    setActive(Math.min(2, Math.floor(((v - 0.22) / 0.78) * 3)));
  });
  const tier = active >= 0 ? arsenalTiers[active] : null;

  return (
    <Band id="arsenal" tint="teal" strength={12} className="mt-8 pb-16 pt-20">
      <div className="mx-auto w-[min(1150px,92vw)]">
        <SectionHead
          kicker="05 · technical arsenal"
          parts={[{ t: "The" }, { t: "zero-glaze", c: "shimmer-teal" }, { t: "stack." }]}
          sub="Three layers from silicon to cognition. Scroll to pull them apart."
        />
      </div>

      {/* pinned exploded stack (desktop) */}
      <div ref={pin} className="relative mt-6 hidden md:block" style={{ height: "340vh" }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto grid w-[min(1150px,92vw)] grid-cols-[1.1fr_1fr] items-center gap-10">
            <div className="relative mx-auto h-[min(60vh,520px)] w-full" style={{ perspective: 1500 }}>
              <div
                className="absolute left-1/2 top-1/2 h-[min(34vh,270px)] w-[min(52vh,430px)] -translate-x-1/2 -translate-y-1/2"
                style={{ transformStyle: "preserve-3d", transform: "rotateX(58deg) rotateZ(-36deg)" }}
              >
                {slabs.map((_, i) => (
                  <Slab key={i} i={i} spread={spread} active={active} />
                ))}
              </div>
              <p className="micro absolute bottom-0 left-0 text-inksoft">
                {active === -1 ? "↓ keep scrolling — pulling the layers apart" : `inspecting layer 0${active + 1}`}
              </p>
            </div>

            <div className="relative min-h-[380px]">
              <AnimatePresence mode="wait">
                {tier ? (
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: 40, rotate: 1 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="micro text-amber">{tier.tier}</p>
                    <h3 className="mt-2 font-display text-[clamp(2rem,3.6vw,3.2rem)] font-extrabold leading-[1.02]">{tier.subtitle}</h3>
                    <ul className="mt-6 space-y-3">
                      {tier.items.map((it, k) => {
                        const [head, ...rest] = it.split(" — ");
                        return (
                          <motion.li
                            key={it}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.12 + k * 0.08 }}
                            className="sticker-card px-5 py-3"
                          >
                            <p className="font-display text-lg font-extrabold leading-tight">{head}</p>
                            {rest.length ? <p className="mt-0.5 text-sm text-inksoft">{rest.join(" — ")}</p> : null}
                          </motion.li>
                        );
                      })}
                    </ul>
                  </motion.div>
                ) : (
                  <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <p className="font-display text-[clamp(2rem,3.6vw,3.2rem)] font-extrabold leading-[1.05]">
                      No icon soup. <span className="shimmer-coral">Just what actually ships.</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* mobile: plain cards */}
      <div className="mx-auto mt-10 grid w-[min(1150px,92vw)] gap-5 md:hidden">
        {arsenalTiers.map((t, i) => (
          <article key={t.tier} className="sticker-card px-5 py-5">
            <p className="micro text-amber">{t.tier}</p>
            <h3 className="mt-1 font-display text-2xl font-extrabold">{t.subtitle}</h3>
            <ul className="mt-3 space-y-2 text-inksoft">
              {t.items.map((it) => (
                <li key={it} className="flex gap-2">
                  <span className="text-teal">▸</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
            <span className="sr-only">{slabs[i].label}</span>
          </article>
        ))}
      </div>

      <div className="mt-14 space-y-4">
        <VelocityMarquee speed={-60}>
          {arsenalMarquee.map((t) => (
            <span key={t} className="btn-squish pointer-events-none mx-2 whitespace-nowrap px-5 py-2 text-sm">
              {t}
            </span>
          ))}
        </VelocityMarquee>
        <VelocityMarquee speed={60}>
          {[...arsenalMarquee].reverse().map((t) => (
            <span key={t} className="btn-squish pointer-events-none mx-2 whitespace-nowrap px-5 py-2 text-sm">
              {t}
            </span>
          ))}
        </VelocityMarquee>
      </div>
    </Band>
  );
}
