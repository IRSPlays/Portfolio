"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  cypherEmotionsMap,
  type CypherEmotionId,
} from "@/data/content";
import { boing } from "@/lib/sound";

export type { CypherEmotionId };

interface CypherMascotProps {
  emotion?: CypherEmotionId;
  size?: number;
  className?: string;
  interactive?: boolean;
  showSpeech?: boolean;
  speechText?: string;
  onPoke?: (nextEmotion: CypherEmotionId) => void;
  priority?: boolean;
  lighting?: "scene" | "hero" | "lab" | "subtle" | "none";
}

export default function CypherMascot({
  emotion = "smirk",
  size = 320,
  className = "",
  interactive = true,
  showSpeech = false,
  speechText,
  onPoke,
  priority = false,
  lighting = "scene",
}: CypherMascotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPoking, setIsPoking] = useState(false);

  // Parallax / mouse tracking for expressive alive feel
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smoothX = useSpring(mx, { stiffness: 140, damping: 18 });
  const smoothY = useSpring(my, { stiffness: 140, damping: 18 });

  const rotY = useTransform(smoothX, [-1, 1], [-12, 12]);
  const rotX = useTransform(smoothY, [-1, 1], [10, -10]);
  const transX = useTransform(smoothX, [-1, 1], [-8, 8]);
  const transY = useTransform(smoothY, [-1, 1], [-6, 6]);

  useEffect(() => {
    if (!interactive) return;
    const onPointerMove = (e: PointerEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2)));
      const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2)));
      mx.set(dx);
      my.set(dy);
    };

    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [interactive, mx, my]);

  const activeData = cypherEmotionsMap[emotion] ?? cypherEmotionsMap.smirk;
  const displayText = speechText ?? activeData.quote;

  const handlePoke = () => {
    if (!interactive) return;
    setIsPoking(true);
    boing();
    window.setTimeout(() => setIsPoking(false), 320);

    if (onPoke) {
      onPoke(emotion);
    }
  };

  // Physical drop-shadow & environment-specific tonal grading
  const imageFilter =
    lighting === "lab"
      ? "brightness(0.91) contrast(1.05) saturate(1.0) drop-shadow(0 14px 20px rgba(0, 0, 0, 0.45))"
      : lighting === "scene" || lighting === "hero"
      ? "brightness(0.98) contrast(1.03) saturate(1.02) drop-shadow(0 14px 20px rgba(0, 0, 0, 0.45))"
      : lighting === "subtle"
      ? "contrast(1.02) drop-shadow(0 12px 18px rgba(0, 0, 0, 0.35))"
      : undefined;

  const maskStyles = {
    WebkitMaskImage: `url("${activeData.src}")`,
    maskImage: `url("${activeData.src}")`,
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex flex-col items-center justify-center select-none ${className}`}
      style={{ perspective: 1000 }}
    >
      {/* Speech Bubble */}
      <AnimatePresence mode="wait">
        {showSpeech && (
          <motion.div
            key={displayText}
            className="absolute -top-16 z-30 max-w-[280px] sm:max-w-[340px] rounded-2xl border-[3px] border-line bg-card px-4 py-3 shadow-[5px_6px_0_var(--shadowc)]"
            initial={{ opacity: 0, y: 14, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: -10, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 360, damping: 20 }}
          >
            <div className="flex items-center justify-between gap-2 border-b border-line/10 pb-1.5 mb-1.5">
              <span className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-teal">
                CYPHER // {activeData.name}
              </span>
              <span className="micro text-[0.6rem] px-2 py-0.5 rounded-full bg-line/10 font-mono">
                {activeData.tag}
              </span>
            </div>
            <p className="font-sans text-xs sm:text-sm font-semibold leading-relaxed text-ink">
              “{displayText}”
            </p>
            {/* Bubble Tail */}
            <div
              className="absolute -bottom-2.5 left-8 h-4 w-4 rotate-45 border-r-[3px] border-b-[3px] border-line bg-card"
              aria-hidden
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Mascot Card & Parallax Layer */}
      <motion.div
        className="relative cursor-pointer"
        style={{
          width: size,
          height: size,
          rotateY: rotY,
          rotateX: rotX,
          x: transX,
          y: transY,
        }}
        animate={{
          scale: isPoking ? [1, 0.88, 1.06, 1] : 1,
          rotate: isPoking ? [-4, 5, -2, 0] : 0,
        }}
        whileHover={interactive ? { scale: 1.04 } : undefined}
        whileTap={interactive ? { scale: 0.92, rotate: -3 } : undefined}
        onClick={handlePoke}
        title={interactive ? `Cypher (${activeData.name}) — Tap to poke` : `Cypher (${activeData.name})`}
      >
        {/* Soft Contact Shadow Underneath */}
        <div
          className="absolute inset-x-10 bottom-2 h-8 rounded-full bg-line/50 blur-lg pointer-events-none"
          aria-hidden
        />

        {/* Emotion Switcher Pop Container */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeData.id}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.82, rotate: -6, y: 14 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, rotate: 6, y: -12 }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 24,
              mass: 0.8,
            }}
          >
            <div
              className="relative h-full w-full"
              style={{ filter: imageFilter }}
            >
              {/* Base Character Image */}
              <Image
                src={activeData.src}
                alt={`Cypher Fox mascot with ${activeData.name} expression`}
                fill
                priority={priority}
                sizes={`${size}px`}
                className="object-contain pointer-events-none transition-transform duration-300"
              />

              {/* OUTDOOR SUNSET LIGHTING (Hero/Scene) */}
              {(lighting === "scene" || lighting === "hero") && (
                <>
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      ...maskStyles,
                      background:
                        "linear-gradient(135deg, rgba(255, 220, 150, 0.24) 0%, rgba(255, 190, 100, 0.08) 32%, transparent 56%)",
                      mixBlendMode: "soft-light",
                    }}
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      ...maskStyles,
                      background:
                        "radial-gradient(circle at 75% 20%, rgba(255, 235, 185, 0.26) 0%, rgba(255, 205, 130, 0.08) 30%, transparent 55%)",
                      mixBlendMode: "soft-light",
                    }}
                    aria-hidden
                  />
                </>
              )}

              {/* INDOOR HARDWARE LAB LIGHTING (Secret Lab) */}
              {lighting === "lab" && (
                <>
                  {/* Overhead workbench cool ambient light */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      ...maskStyles,
                      background:
                        "linear-gradient(180deg, rgba(165, 230, 160, 0.18) 0%, rgba(47, 163, 152, 0.08) 38%, transparent 65%)",
                      mixBlendMode: "soft-light",
                    }}
                    aria-hidden
                  />
                  {/* Subtle top console highlight */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      ...maskStyles,
                      background:
                        "radial-gradient(circle at 50% 16%, rgba(185, 245, 215, 0.24) 0%, transparent 48%)",
                      mixBlendMode: "soft-light",
                    }}
                    aria-hidden
                  />
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
