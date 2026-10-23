"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const grain =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.55'/></svg>\")";

function Blob({ className, dx, dy, dur }: { className: string; dx: number; dy: number; dur: number }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      animate={{ x: [0, dx, -dx / 2, 0], y: [0, dy, -dy / 2, 0], scale: [1, 1.12, 0.94, 1] }}
      transition={{ duration: dur, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/** One fixed world behind everything: aurora tint shifts per chapter, blobs drift, scroll warps the grid. */
export default function WorldBackground() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const a = useTransform(p, [0, 0.22, 0.45], [1, 0.45, 0]);
  const b = useTransform(p, [0.1, 0.38, 0.62], [0, 1, 0.15]);
  const c = useTransform(p, [0.5, 0.85, 1], [0, 0.9, 1]);
  const gridY = useTransform(p, [0, 1], ["0px", "-600px"]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <motion.div className="absolute inset-0" style={{ opacity: a }}>
        <Blob className="-right-24 -top-24 h-[560px] w-[560px] bg-amber/30" dx={60} dy={40} dur={16} />
        <Blob className="-left-20 bottom-0 h-[420px] w-[420px] bg-coral/20" dx={-40} dy={-50} dur={19} />
      </motion.div>
      <motion.div className="absolute inset-0" style={{ opacity: b }}>
        <Blob className="left-[10%] top-[10%] h-[520px] w-[520px] bg-teal/25" dx={70} dy={60} dur={18} />
        <Blob className="-right-24 bottom-[5%] h-[460px] w-[460px] bg-mint/20" dx={-60} dy={-40} dur={15} />
      </motion.div>
      <motion.div className="absolute inset-0" style={{ opacity: c }}>
        <Blob className="left-[25%] top-[20%] h-[600px] w-[600px] bg-coral/25" dx={50} dy={70} dur={17} />
        <Blob className="-left-20 -top-10 h-[380px] w-[380px] bg-navy/25" dx={40} dy={30} dur={21} />
      </motion.div>

      <motion.div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          y: gridY,
          backgroundImage:
            "linear-gradient(color-mix(in srgb, var(--ink) 7%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--ink) 7%, transparent) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 50% 40%, #000 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, #000 20%, transparent 75%)",
        }}
      />
      <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay" style={{ backgroundImage: grain }} />
    </div>
  );
}
