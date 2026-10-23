"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** Counts every number inside a string up from 0 once it scrolls into view. */
export default function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [p, setP] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setP(1);
      return;
    }
    const c = animate(0, 1, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: setP });
    return () => c.stop();
  }, [inView, reduce]);

  const out = value.replace(/(?<![A-Za-z])\d[\d,]*(\.\d+)?/g, (m) => {
    const num = parseFloat(m.replace(/,/g, ""));
    const dec = (m.split(".")[1] ?? "").length;
    const v = num * p;
    return m.includes(",")
      ? v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec })
      : v.toFixed(dec);
  });

  return (
    <span ref={ref} className={className} aria-label={value}>
      {out}
    </span>
  );
}
