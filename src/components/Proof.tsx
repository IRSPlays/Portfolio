"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import SectionHead from "@/components/motion/SectionHead";
import { PawIcon } from "@/components/Sticker";
import { awards } from "@/data/content";

const zig = "polygon(" +
  Array.from({ length: 41 }, (_, i) => `${(i * 100) / 40}% ${i % 2 ? "0%" : "10px"}`).join(",") +
  "," +
  Array.from({ length: 41 }, (_, i) => `${100 - (i * 100) / 40}% calc(100% - ${i % 2 ? "0px" : "10px"})`).join(",") +
  ")";

/** The awards, printed on a receipt that scrolls out of a slot. A stamp lands when it's done. */
export default function Proof() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 62%"] });
  const clip = useTransform(scrollYProgress, [0, 1], ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]);
  const [stamped, setStamped] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => setStamped(v > 0.94));

  return (
    <section id="proof" className="relative mx-auto w-[min(1150px,92vw)] py-14 md:py-20">
      <SectionHead
        kicker="04 · receipts"
        parts={[{ t: "Awards, field trials &" }, { t: "paid in full.", c: "shimmer-teal" }]}
        sub="Everything below is itemised. Scroll — the printer is warming up."
      />

      <div className="relative mx-auto mt-16 w-full max-w-[520px]">
        <p className="micro pointer-events-none absolute left-[-3.5rem] top-1/2 hidden -translate-x-full -rotate-90 whitespace-nowrap text-inksoft xl:block" style={{ transformOrigin: "right center" }}>
          thermal paper · keep out of sunlight · keep in portfolio
        </p>
        <p className="micro pointer-events-none absolute right-[-3.5rem] top-1/2 hidden translate-x-full rotate-90 whitespace-nowrap text-inksoft xl:block" style={{ transformOrigin: "left center" }}>
          no refunds · all failures are final renovations
        </p>
          {/* printer slot */}
          <div className="relative z-10 mx-auto h-5 w-[calc(100%+36px)] -translate-x-0 rounded-full border-[3px] border-line bg-ink shadow-[0_6px_0_var(--shadowc)]" style={{ marginLeft: "-18px" }} aria-hidden />

          <motion.div
            ref={ref}
            style={{ clipPath: clip }}
            className="relative -mt-1 px-7 pb-14 pt-9 font-mono text-[#1c2b24] drop-shadow-[0_14px_0_rgba(0,0,0,0.16)]"
          >
            <div style={{ clipPath: zig }} className="pointer-events-none absolute inset-0 -z-0 bg-[#faf6e8]" aria-hidden />
            <div className="relative">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold tracking-[0.25em]">ASIRIVE RECEIPTS CO.</p>
                <PawIcon size={30} />
              </div>
              <p className="mt-1 text-[0.7rem] opacity-70">ORDER #TKKYIA-2026 · SINGAPORE</p>
              <div className="my-4 border-t-2 border-dashed border-[#1c2b24]/40" />

              <ul className="space-y-5">
                {awards.map((a, i) => (
                  <li key={a.name}>
                    <div className="flex items-baseline gap-2 text-[0.82rem] font-bold uppercase">
                      <span className="shrink-0 opacity-60">{String(i + 1).padStart(2, "0")}</span>
                      <span className="min-w-0">{a.name}</span>
                      <span className="mb-1 min-w-4 flex-1 border-b-2 border-dotted border-[#1c2b24]/40" />
                      <span className="shrink-0">{a.date}</span>
                    </div>
                    <p className="mt-1 pl-6 text-[0.78rem] leading-snug opacity-75">{a.detail}</p>
                  </li>
                ))}
              </ul>

              <div className="my-5 border-t-2 border-dashed border-[#1c2b24]/40" />
              <div className="flex items-baseline justify-between text-sm font-extrabold">
                <span>TOTAL</span>
                <span>1 MERIT AWARD · 1 YEAR OF FIELD TRIALS</span>
              </div>
              <p className="mt-1 text-[0.7rem] opacity-70">PAID IN: PAIN FIRST, REST LATER.</p>

              <div
                className="mt-6 h-12 w-full"
                style={{
                  background:
                    "repeating-linear-gradient(90deg,#1c2b24 0 2px,transparent 2px 5px,#1c2b24 5px 6px,transparent 6px 10px,#1c2b24 10px 13px,transparent 13px 15px)",
                }}
                aria-hidden
              />
              <p className="mt-2 text-center text-[0.65rem] tracking-[0.3em] opacity-70">THANK YOU · FAILING WITH HONOUR</p>
            </div>

            <AnimatePresence>
              {stamped ? (
                <motion.div
                  initial={{ scale: 3.2, opacity: 0, rotate: -30 }}
                  animate={{ scale: 1, opacity: 1, rotate: -14 }}
                  exit={{ opacity: 0, scale: 1.4 }}
                  transition={{ type: "spring", stiffness: 420, damping: 18 }}
                  className="pointer-events-none absolute bottom-10 right-4 z-10 rounded-xl border-[5px] border-[#bf4a2e] px-4 py-1.5 font-display text-3xl font-extrabold uppercase tracking-wider text-[#bf4a2e] mix-blend-multiply"
                >
                  approved
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
      </div>
    </section>
  );
}
