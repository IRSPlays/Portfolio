"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import CypherMascot from "@/components/CypherMascot";
import Reveal from "@/components/Reveal";
import Band from "@/components/motion/Band";
import SectionHead from "@/components/motion/SectionHead";
import { Sticker, PawIcon, ChipIcon, SparkleIcon, BoltIcon } from "@/components/Sticker";
import {
  fursuitRnd,
  foxLines,
  fortunes,
  graveyard,
  cypherEmotions,
  cypherEmotionsMap,
  type CypherEmotionId,
} from "@/data/content";
import { soundEnabled, toggleSound, blip, boing } from "@/lib/sound";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

function Tomb({ g, i }: { g: (typeof graveyard)[number]; i: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 100%", "start 55%"] });
  const y = useTransform(scrollYProgress, [0, 1], [110, 0]);
  const o = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const r = useTransform(scrollYProgress, [0, 1], [i % 2 ? 6 : -6, i % 2 ? 1.2 : -1.2]);
  return (
    <motion.li ref={ref} style={{ y, opacity: o, rotate: r }} className="relative flex flex-col">
      <div className="sticker-card flex-1 rounded-b-2xl rounded-t-[999px] px-6 pb-6 pt-14 text-center">
        <p className="font-display text-4xl leading-none text-inksoft">†</p>
        <p className="micro mt-2 text-inksoft">r.i.p. · v{i + 1}</p>
        <h4 className="mt-2 font-display text-xl font-extrabold leading-tight">{g.title}</h4>
        <p className="mt-3 text-sm leading-snug text-coral">
          <span className="micro mr-1">died:</span>
          {g.died}
        </p>
        <p className="mt-2 text-sm leading-snug text-teal">
          <span className="micro mr-1">renovation:</span>
          {g.fix}
        </p>
      </div>
      <div className="mx-[-10px] mt-[-2px] h-4 rounded-full border-[3px] border-line bg-mint/60" aria-hidden />
    </motion.li>
  );
}

export default function SecretLab() {
  const zone = useRef<HTMLDivElement>(null);
  const [emotion, setEmotion] = useState<CypherEmotionId>("smirk");
  const [speech, setSpeech] = useState<string>(cypherEmotionsMap.smirk.quote);
  const [party, setParty] = useState(false);
  const [pawOn, setPawOn] = useState(true);
  const [fxOn, setFxOn] = useState(true);
  const [fortune, setFortune] = useState("");

  useEffect(() => {
    setFxOn(soundEnabled());
    setFortune(fortunes[Math.floor(Math.random() * fortunes.length)]);
  }, []);

  const selectEmotion = (id: CypherEmotionId) => {
    setEmotion(id);
    const data = cypherEmotionsMap[id];
    setSpeech(data.quote);
    blip(740);
  };

  const poke = () => {
    const list: CypherEmotionId[] = [
      "failing-with-honor",
      "excited",
      "uneasy",
      "cooked",
      "locked-in",
      "angry",
      "thankful",
      "smirk",
    ];
    const nextIdx = (list.indexOf(emotion) + 1) % list.length;
    const nextEmotion = list[nextIdx];
    setEmotion(nextEmotion);
    const randomPokeLine = foxLines.poke[Math.floor(Math.random() * foxLines.poke.length)];
    setSpeech(randomPokeLine);
    boing();
  };

  const randomVibe = () => {
    const pool = cypherEmotions.filter((e) => e.id !== emotion);
    const chosen = pool[Math.floor(Math.random() * pool.length)];
    selectEmotion(chosen.id);
  };

  const togglePaw = () => {
    window.dispatchEvent(new Event("paw-toggle"));
    setPawOn((v) => !v);
  };

  const toggleFx = () => setFxOn(toggleSound());

  const startParty = () => {
    document.documentElement.classList.add("party");
    setParty(true);
    setEmotion("excited");
    setSpeech(foxLines.konami);
    boing();
    window.setTimeout(() => {
      document.documentElement.classList.remove("party");
      setParty(false);
      setEmotion("smirk");
      setSpeech(cypherEmotionsMap.smirk.quote);
    }, 6000);
  };

  const buffer = useRef<string[]>([]);
  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === "INPUT") return;
      buffer.current = [...buffer.current, e.key].slice(-KONAMI.length);
      if (KONAMI.every((k, i) => buffer.current[i] === k)) {
        buffer.current = [];
        startParty();
      }
    };
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, []);

  const currentEmotionData = cypherEmotionsMap[emotion] ?? cypherEmotionsMap.smirk;

  return (
    <Band id="lab" tint="navy" strength={14} className="mt-8 pb-20 pt-20">
      <div className="mx-auto w-[min(1150px,92vw)]">
        <SectionHead
          kicker="08 · the secret lab"
          parts={[{ t: "Failures, toys &" }, { t: "mascot hardware.", c: "shimmer-coral" }]}
          sub="Failures are just renovations for character. Poke the fox, throw some stickers, then go see what died."
        />

        {/* ---------- stage ---------- */}
        <Reveal variant="tilt">
          <div className="sticker-card relative mt-14 grid overflow-hidden lg:grid-cols-[1fr_1.05fr]">
            <div
              className="relative flex min-h-[460px] flex-col items-center justify-end overflow-hidden border-b-[3px] border-line pb-10 lg:border-b-0 lg:border-r-[3px]"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 78%, color-mix(in srgb, var(--amber) 38%, transparent), transparent 70%), radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--teal) 25%, transparent), transparent 55%)",
              }}
            >
              <p className="micro absolute left-5 top-4 text-teal">cypher emotion lab · {cypherEmotions.length} moods</p>
              <div className={`relative z-10 pt-16 ${party ? "party-dance" : "float-soft"}`}>
                <CypherMascot emotion={emotion} size={290} interactive showSpeech speechText={speech} onPoke={poke} lighting="lab" />
              </div>
              <div className="absolute bottom-6 left-1/2 h-8 w-[70%] -translate-x-1/2 rounded-[100%] bg-black/35 blur-xl" aria-hidden />
            </div>

            <div className="flex flex-col gap-5 p-6 md:p-8">
              <div className="flex items-center justify-between">
                <p className="micro text-inksoft">pick a mood — smooth morph</p>
                <button onClick={randomVibe} className="font-mono text-[0.7rem] font-bold uppercase text-teal hover:underline">
                  🎲 random vibe
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {cypherEmotions.map((e) => {
                  const active = e.id === emotion;
                  return (
                    <button
                      key={e.id}
                      onClick={() => selectEmotion(e.id)}
                      className={`flex items-center justify-between rounded-xl border-2 px-3 py-2 text-left transition-all ${
                        active
                          ? "scale-[1.03] border-line bg-teal/25 text-ink shadow-[2px_2px_0_var(--shadowc)]"
                          : "border-line/40 bg-card text-inksoft hover:border-line hover:text-ink"
                      }`}
                    >
                      <span className="truncate font-sans text-xs font-bold">{e.name}</span>
                      <span className="ml-1 shrink-0 font-mono text-[0.58rem] uppercase opacity-70">{e.tag}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-3 border-t-2 border-line/10 pt-5">
                <button className="btn-squish btn-coral" data-boing onClick={poke}>
                  poke the fox
                </button>
                <button className="btn-squish" onClick={togglePaw}>
                  paw cursor: {pawOn ? "on" : "off"}
                </button>
                <button className="btn-squish" onClick={toggleFx}>
                  sound: {fxOn ? "on" : "off"}
                </button>
                <button className="btn-squish btn-solid" onClick={startParty}>
                  ↑↑↓↓←→←→BA
                </button>
              </div>
              <p className="micro text-[0.62rem] text-inksoft">(the konami code works on your keyboard too. we don&apos;t judge.)</p>

              {fortune ? (
                <div className="rounded-2xl border-2 border-dashed border-inksoft/40 bg-bg/40 px-4 py-3">
                  <span className="micro mb-1 block font-bold text-amber">fox fortune cookie</span>
                  <p className="text-sm font-medium italic text-ink">“{fortune}”</p>
                </div>
              ) : null}
            </div>
          </div>
        </Reveal>

        {/* ---------- sticker table ---------- */}
        <Reveal>
          <div
            ref={zone}
            className="relative mt-16 h-[360px] overflow-hidden rounded-[28px] border-[3px] border-dashed border-line/60"
            style={{
              backgroundImage: "radial-gradient(color-mix(in srgb, var(--ink) 18%, transparent) 1.5px, transparent 1.5px)",
              backgroundSize: "26px 26px",
            }}
          >
            <p className="micro absolute left-5 top-4 text-inksoft">sticker table — drag, fling, repeat</p>
            <Sticker rotate={-8} style={{ left: "8%", top: "30%" }} constraints={zone}>
              <PawIcon size={74} />
            </Sticker>
            <Sticker rotate={10} style={{ left: "30%", top: "20%" }} constraints={zone}>
              <ChipIcon size={70} />
            </Sticker>
            <Sticker rotate={-4} style={{ left: "52%", top: "48%" }} constraints={zone}>
              <SparkleIcon size={64} />
            </Sticker>
            <Sticker rotate={14} style={{ left: "70%", top: "18%" }} constraints={zone}>
              <BoltIcon size={64} />
            </Sticker>
            <Sticker rotate={-12} style={{ left: "84%", top: "58%" }} constraints={zone}>
              <PawIcon size={52} />
            </Sticker>
            <Sticker rotate={6} style={{ left: "18%", top: "62%" }} constraints={zone}>
              <SparkleIcon size={48} />
            </Sticker>
          </div>
        </Reveal>

        {/* ---------- graveyard ---------- */}
        <div className="mt-24">
          <p className="micro text-inksoft">the renovation graveyard — root-cause post-mortems</p>
          <h3 className="mt-2 font-display text-[clamp(2rem,4.6vw,3.6rem)] font-extrabold leading-none">
            R.I.P. these <span className="shimmer-coral">designs</span>.
          </h3>
          <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {graveyard.map((g, i) => (
              <Tomb key={g.title} g={g} i={i} />
            ))}
          </ul>
        </div>

        {/* ---------- blueprint ---------- */}
        <Reveal variant="left">
          <article
            className="relative mt-24 overflow-hidden rounded-[28px] border-[3px] border-dashed border-teal px-6 py-8 md:px-10"
            style={{
              backgroundImage:
                "linear-gradient(color-mix(in srgb, var(--teal) 14%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--teal) 14%, transparent) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          >
            <p className="micro text-amber">{fursuitRnd.status}</p>
            <h3 className="mt-2 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold leading-tight">
              Biomechatronics R&amp;D (Fursuit Cortex)
            </h3>
            <p className="mt-3 max-w-2xl text-inksoft">{fursuitRnd.blurb}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {fursuitRnd.points.map((p) => (
                <li key={p} className="micro flex items-center gap-2 rounded-full border-2 border-line bg-card px-3.5 py-1.5 text-[0.65rem]">
                  <span className="blink-dot inline-block h-2 w-2 rounded-full bg-teal" />
                  {p}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>
    </Band>
  );
}
