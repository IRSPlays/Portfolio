"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import FoxMascot from "@/components/FoxMascot";
import { Sticker, PawIcon, SparkleIcon, BoltIcon } from "@/components/Sticker";
import { profile, roles } from "@/data/content";

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
  const [show3d, setShow3d] = useState(false);

  useEffect(() => {
    setShow3d(
      window.matchMedia("(min-width: 768px)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const letters = profile.name.toUpperCase().split("");

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full bg-amber/25 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-8%] h-[440px] w-[440px] rounded-full bg-teal/20 blur-3xl" />
      </div>
      {show3d ? (
        <div className="pointer-events-none absolute inset-0 opacity-70 md:opacity-90">
          <HeroScene />
        </div>
      ) : null}

      <div ref={zone} className="relative mx-auto grid w-[min(1150px,92vw)] grid-cols-1 items-center gap-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <motion.p
            className="micro text-inksoft"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {profile.location} · systems architect · founder @ asirive
          </motion.p>

          <h1 className="mt-3 flex text-[clamp(4.5rem,16vw,11rem)] font-extrabold leading-[0.85]">
            {letters.map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: 90, rotate: 8, opacity: 0 }}
                animate={{ y: 0, rotate: i % 2 ? 2 : -2, opacity: 1 }}
                transition={{ type: "spring", stiffness: 180, damping: 12, delay: 0.15 + i * 0.07 }}
                whileHover={{ y: -14, rotate: i % 2 ? -8 : 8, color: "var(--coral)" }}
                className="inline-block"
              >
                {ch}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="micro mt-2 text-inksoft"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
          >
            ({profile.handle}) — a.k.a. {profile.fursona}&apos;s human
          </motion.p>

          <motion.div
            className="mt-5 h-8"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Typewriter />
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
          >
            <a href="#projects" className="btn-squish btn-solid">
              see my chaos
            </a>
            <a href="#asirive" className="btn-squish btn-coral">
              Asirive Cortex ↓
            </a>
            <span className="micro text-inksoft">{profile.status}</span>
          </motion.div>
        </div>

        <div className="relative flex justify-center">
          <motion.div
            className="float-soft"
            initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 13, delay: 0.35 }}
          >
            <FoxMascot size={330} />
          </motion.div>
          <motion.div
            className="absolute -bottom-4 left-2 rounded-2xl border-[3px] border-line bg-card px-4 py-2 shadow-[4px_5px_0_var(--shadowc)] md:left-0"
            initial={{ scale: 0, rotate: -12 }}
            animate={{ scale: 1, rotate: -3 }}
            transition={{ type: "spring", stiffness: 260, damping: 12, delay: 1 }}
          >
            <span className="micro font-bold">that&apos;s Cypher. he judges your stack.</span>
          </motion.div>
        </div>
      </div>

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
        <span className="micro text-inksoft">scroll (gently)</span>
      </motion.a>
    </section>
  );
}
