"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import SectionHead from "@/components/motion/SectionHead";
import { nowItems, profile } from "@/data/content";

const tone: Record<string, string> = {
  "IN PROGRESS": "text-[#f0876b]",
  "IN DEVELOPMENT": "text-[#efa14c]",
  LIVE: "text-[#a5e6a0]",
  "EARLY R&D": "text-[#6f9dc0]",
};

type Line = { kind: "cmd" | "head" | "body" | "meta"; text: string; cls?: string };

/** The "right now" list as a terminal that types itself as you scroll. */
export default function NowPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const [count, setCount] = useState(0);

  const lines = useMemo<Line[]>(() => {
    const out: Line[] = [{ kind: "cmd", text: "asirive@bench ~ $ status --now" }];
    nowItems.forEach((n) => {
      out.push({ kind: "head", text: `▸ [${n.status}] ${n.title}`, cls: tone[n.status] });
      out.push({ kind: "body", text: `    ${n.detail}` });
      out.push({ kind: "meta", text: `    updated: ${n.date}` });
    });
    out.push({ kind: "cmd", text: "asirive@bench ~ $ _" });
    return out;
  }, []);
  const total = useMemo(() => lines.reduce((a, l) => a + l.text.length, 0), [lines]);

  useMotionValueEvent(scrollYProgress, "change", (v) => setCount(Math.floor(Math.min(1, Math.max(0, v)) * total)));

  let left = count;

  return (
    <section id="now" className="mx-auto w-[min(1150px,92vw)] py-14 md:py-24">
      <SectionHead
        kicker="07 · right now"
        parts={[{ t: profile.status }, { t: "here's the proof.", c: "shimmer-teal" }]}
        sub="Live from the bench. No marketing layer — it types out as you scroll."
      />

      <div ref={ref} className="mt-14">
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -0.8 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-[22px] border-[3px] border-line bg-[#0d1410] text-[#e8f2e6] shadow-[10px_12px_0_var(--shadowc)]"
        >
          <div className="flex items-center gap-2 border-b-[3px] border-line bg-[#16211c] px-4 py-3">
            <span className="h-3.5 w-3.5 rounded-full border-2 border-line bg-[#f0876b]" />
            <span className="h-3.5 w-3.5 rounded-full border-2 border-line bg-[#efa14c]" />
            <span className="h-3.5 w-3.5 rounded-full border-2 border-line bg-[#a5e6a0]" />
            <span className="micro ml-3 text-[0.62rem] text-[#aab8a6]">bench.log — zsh</span>
            <span className="micro ml-auto flex items-center gap-2 text-[0.62rem] text-[#a5e6a0]">
              <span className="blink-dot inline-block h-2 w-2 rounded-full bg-[#a5e6a0]" /> online
            </span>
          </div>

          <div className="min-h-[430px] px-5 py-6 font-mono text-[0.9rem] leading-[1.75] md:px-8 md:text-[0.98rem]">
            {lines.map((l, idx) => {
              const shown = Math.max(0, Math.min(l.text.length, left));
              left -= l.text.length;
              const done = shown >= l.text.length;
              if (shown === 0) return null;
              const colour =
                l.kind === "cmd" ? "text-[#2fa398]" : l.kind === "meta" ? "text-[#aab8a6]/70" : l.kind === "body" ? "text-[#e8f2e6]/85" : l.cls ?? "";
              return (
                <p key={idx} className={`whitespace-pre-wrap ${colour} ${l.kind === "head" ? "mt-5 font-bold" : ""}`}>
                  {l.text.slice(0, shown)}
                  {!done ? <span className="ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[0.2em] bg-[#a5e6a0]" /> : null}
                </p>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
