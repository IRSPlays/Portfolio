"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { createElement, useRef } from "react";

export type Part = { t: string; c?: string };

type Offset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

function Word({ word, i, n, progress, cls }: { word: string; i: number; n: number; progress: MotionValue<number>; cls?: string }) {
  const start = (i / n) * 0.72;
  const end = Math.min(1, start + 0.28);
  const opacity = useTransform(progress, [start, end], [0.1, 1]);
  const y = useTransform(progress, [start, end], [14, 0]);
  const blur = useTransform(progress, [start, end], ["blur(4px)", "blur(0px)"]);
  return (
    <motion.span style={{ opacity, y, filter: blur }} className={`inline-block ${cls ?? ""}`}>
      {word}
    </motion.span>
  );
}

/** Scroll-scrubbed word-by-word reveal: words light up as the block travels up the screen. */
export default function SplitText({
  parts,
  as = "span",
  className = "",
  offset = ["start 88%", "start 42%"],
}: {
  parts: Part[];
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  offset?: Offset;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });

  const words = parts.flatMap((p) => p.t.split(" ").filter(Boolean).map((w) => ({ w, c: p.c })));

  if (reduce) {
    return createElement(
      as,
      { ref, className },
      parts.map((p, i) => (
        <span key={i} className={p.c}>
          {p.t}
        </span>
      ))
    );
  }

  return createElement(
    as,
    { ref, className },
    words.map((x, i) => (
      <span key={i}>
        <Word word={x.w} i={i} n={words.length} progress={scrollYProgress} cls={x.c} />{" "}
      </span>
    ))
  );
}
