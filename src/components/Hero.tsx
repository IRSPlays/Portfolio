"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import CypherMascot from "@/components/CypherMascot";
import StackJudge from "@/components/StackJudge";
import { Sticker, PawIcon, SparkleIcon, BoltIcon } from "@/components/Sticker";
import Magnetic from "@/components/motion/Magnetic";
import { INTRO_DELAY } from "@/components/motion/Preloader";
import { profile, roles, type CypherEmotionId } from "@/data/content";

const HeroScene = dynamic(() => import("@/three/HeroScene"), { ssr: false, loading: () => null });

function Typewriter() {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(roles[0]);
      return;
    }
    let i = 0;
    let deleting = false;
    let timer = 0;
    const step = () => {
      const word = roles[idx % roles.length];
      if (!deleting) {
        i += 1;
        setText(word.slice(0, i));
        if (i === word.length) {
          deleting = true;
          timer = window.setTimeout(step, 1500);
          return;
        }
        timer = window.setTimeout(step, 45);
      } else {
        i -= 1;
        setText(word.slice(0, i));
        if (i === 0) {
          setIdx((v) => v + 1);
          return;
        }
        timer = window.setTimeout(step, 22);
      }
    };
    timer = window.setTimeout(step, 500);
    return () => window.clearTimeout(timer);
  }, [idx]);

  return (
    <span className="font-mono text-base text-teal sm:text-lg">
      &gt; {text}
      <span className="animate-pulse">▋</span>
    </span>
  );
}

export default function Hero() {
  const zone = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const foxY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const shrink = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const [show3d, setShow3d] = useState(false);
  const [heroEmotion, setHeroEmotion] = useState<CypherEmotionId>("smirk");
  const [heroSpeech, setHeroSpeech] = useState<string | undefined>(undefined);
  const [showSpeech, setShowSpeech] = useState(false);

  useEffect(() => {
    setShow3d(
      window.matchMedia("(min-width: 768px)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const letters = profile.name.toUpperCase().split("");

  return (
    <section ref={section} id="top" className="relative flex min-h-screen items-center overflow-hidden pt-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full bg-amber/25 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-8%] h-[440px] w-[440px] rounded-full bg-teal/20 blur-3xl" />
      </div>
      {show3d ? (
        <motion.div style={{ y: sceneY }} className="pointer-events-none absolute inset-0 opacity-70 md:opacity-90">
          <HeroScene />
        </motion.div>
      ) : null}

      <motion.div ref={zone} style={{ opacity: fade, scale: shrink }} className="relative mx-auto grid w-[min(1150px,92vw)] grid-cols-1 items-center gap-10 md:grid-cols-[1.4fr_1fr]">
        <motion.div style={{ y: textY }}>
          <motion.p
            className="micro text-inksoft"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: INTRO_DELAY + 0.1 }}
          >
            {profile.location} · systems architect · founder @ asirive
          </motion.p>

          <h1 className="mt-3 flex text-[clamp(4.5rem,16vw,11rem)] font-extrabold leading-[0.85]">
            {letters.map((ch, i) => (
              <span key={i} className="letter-wave" style={{ animationDelay: `${i * 0.18}s` }}>
                <motion.span
                  initial={{ y: 140, rotate: 14, opacity: 0, scaleY: 1.4 }}
                  animate={{ y: 0, rotate: i % 2 ? 2 : -2, opacity: 1, scaleY: 1 }}
                  transition={{ type: "spring", stiffness: 170, damping: 11, delay: INTRO_DELAY + i * 0.07 }}
                  whileHover={{ y: -18, rotate: i % 2 ? -10 : 10, scale: 1.12, color: "var(--coral)" }}
                  className="inline-block"
                >
                  {ch}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="micro mt-2 text-inksoft"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: INTRO_DELAY + 0.55 }}
          >
            ({profile.handle}) — a.k.a. {profile.fursona}&apos;s human
          </motion.p>

          <motion.div
            className="mt-5 h-8"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: INTRO_DELAY + 0.65 }}
          >
            <Typewriter />
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: INTRO_DELAY + 0.8 }}
          >
            <Magnetic>
              <a href="#lab" className="btn-squish btn-solid">
                see my chaos
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#asirive" className="btn-squish btn-coral">
                Asirive Cortex ↓
              </a>
            </Magnetic>
            <span className="micro text-inksoft">{profile.status}</span>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: foxY }} className="relative flex flex-col items-center justify-center">
          <svg
            viewBox="0 0 120 120"
            className="ring-spin pointer-events-none absolute -right-2 -top-6 z-20 hidden h-28 w-28 sm:block"
            aria-hidden
          >
            <defs>
              <path id="ring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
            </defs>
            <circle cx="60" cy="60" r="56" fill="var(--amber)" stroke="var(--line)" strokeWidth="3" />
            <text fontSize="9.5" fontWeight="800" fill="var(--bg)" className="font-mono" letterSpacing="1.2">
              <textPath href="#ring" textLength="272">FAILING WITH HONOUR ✦ FAILING WITH HONOUR ✦</textPath>
            </text>
          </svg>
          <motion.div
            className="float-soft relative z-10"
            initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 13, delay: INTRO_DELAY + 0.35 }}
          >
            <CypherMascot
              emotion={heroEmotion}
              size={360}
              priority
              showSpeech={showSpeech}
              speechText={heroSpeech}
              onPoke={() => {
                const nexts: CypherEmotionId[] = [
                  "smirk",
                  "excited",
                  "locked-in",
                  "failing-with-honor",
                  "happy",
                  "cooked",
                  "thankful",
                ];
                const nextIdx = (nexts.indexOf(heroEmotion) + 1) % nexts.length;
                const next = nexts[nextIdx];
                setHeroEmotion(next);
                setHeroSpeech(undefined);
                setShowSpeech(true);
              }}
            />
          </motion.div>
          <motion.div
            className="mt-2 w-full max-w-[420px]"
            initial={{ scale: 0, rotate: -12 }}
            animate={{ scale: 1, rotate: -1 }}
            transition={{ type: "spring", stiffness: 260, damping: 12, delay: INTRO_DELAY + 1 }}
          >
            <StackJudge
              onJudge={(emotion, verdict) => {
                setHeroEmotion(emotion);
                setHeroSpeech(verdict.line);
                setShowSpeech(true);
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <Sticker rotate={-9} style={{ left: "2%", top: "12%" }} constraints={zone} className="hidden md:block">
        <PawIcon size={58} />
      </Sticker>
      <Sticker rotate={12} style={{ right: "8%", top: "18%" }} constraints={zone} className="hidden md:block">
        <SparkleIcon size={50} />
      </Sticker>
      <Sticker rotate={-5} style={{ left: "46%", bottom: "26%" }} constraints={zone} className="hidden md:block">
        <BoltIcon size={48} />
      </Sticker>

      <motion.a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden md:block"
        style={{ x: "-50%" }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
        <span className="micro rounded-full bg-card px-3 py-1 text-inksoft">scroll (gently)</span>
      </motion.a>
    </section>
  );
}
