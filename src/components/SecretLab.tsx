"use client";

import { useEffect, useRef, useState } from "react";
import CypherMascot from "@/components/CypherMascot";
import Reveal from "@/components/Reveal";
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
    <section id="lab" className="mx-auto w-[min(1150px,92vw)] py-14 md:py-20">
      <SectionHead
        kicker="08 · the secret lab"
        parts={[{ t: "Failures, toys &" }, { t: "mascot hardware.", c: "shimmer-coral" }]}
        sub="Failures are just renovations for character. Here lie the renovations. Also: draggable toys. Engineers need both."
      />

      <div className="mt-12 grid grid-cols-1 gap-7 lg:grid-cols-2">
        <div className="space-y-7">
          <Reveal>
            <div
              ref={zone}
              className="sticker-card relative h-[340px] overflow-hidden p-6"
            >
              <p className="micro text-inksoft">sticker drawer — drag & throw them (seriously)</p>
              <Sticker rotate={-8} style={{ left: "12%", top: "30%" }} constraints={zone}>
                <PawIcon size={58} />
              </Sticker>
              <Sticker rotate={10} style={{ left: "45%", top: "24%" }} constraints={zone}>
                <ChipIcon size={58} />
              </Sticker>
              <Sticker rotate={-4} style={{ left: "72%", top: "52%" }} constraints={zone}>
                <SparkleIcon size={50} />
              </Sticker>
              <Sticker rotate={14} style={{ left: "28%", top: "64%" }} constraints={zone}>
                <BoltIcon size={50} />
              </Sticker>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="sticker-card px-6 py-6">
              <p className="micro text-inksoft">the renovation graveyard — root-cause post-mortems</p>
              <h3 className="mt-1 font-display text-2xl font-extrabold">R.I.P. these designs</h3>
              <ul className="mt-4 space-y-5">
                {graveyard.map((g) => (
                  <li key={g.title} className="rounded-2xl border-2 border-dashed border-inksoft/40 px-4 py-3">
                    <p className="font-display text-lg font-extrabold">† {g.title}</p>
                    <p className="mt-1 text-sm text-coral">died: {g.died}</p>
                    <p className="mt-1 text-sm text-teal">renovation: {g.fix}</p>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal delay={0.12}>
            <article className="sticker-card circuit px-6 py-6">
              <p className="micro text-amber">{fursuitRnd.status}</p>
              <h3 className="mt-1 font-display text-2xl font-extrabold">Biomechatronics R&D (Fursuit Cortex)</h3>
              <p className="mt-2 text-inksoft">{fursuitRnd.blurb}</p>
              <ul className="mt-3 space-y-1 text-inksoft">
                {fursuitRnd.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="text-teal">▸</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>

        {/* Right column: Interactive Cypher Emotion Lab */}
        <div className="space-y-7">
          <Reveal delay={0.06}>
            <div className="sticker-card flex flex-col items-center gap-6 p-6 md:p-8">
              <div className="w-full flex items-center justify-between border-b border-line/15 pb-3">
                <div>
                  <span className="micro text-teal font-bold">CYPHER EMOTION LAB</span>
                  <h3 className="font-display text-xl font-extrabold text-ink mt-0.5">
                    Real Character Art Engine
                  </h3>
                </div>
                <span className="micro px-3 py-1 rounded-full border-2 border-line bg-card font-mono text-xs font-bold text-amber">
                  14 MOODS
                </span>
              </div>

              {/* Character Presentation & Speech */}
              <div className="relative flex flex-col items-center justify-center w-full pt-16">
                <div className={`float-soft ${party ? "party-dance" : ""}`}>
                  <CypherMascot
                    emotion={emotion}
                    size={270}
                    interactive
                    showSpeech
                    speechText={speech}
                    onPoke={poke}
                    lighting="lab"
                  />
                </div>
              </div>

              {/* Emotion Selector Matrix */}
              <div className="w-full mt-2">
                <div className="flex items-center justify-between mb-2">
                  <p className="micro text-inksoft">SELECT CYPHER&apos;S MOOD (SMOOTH MORPH):</p>
                  <button
                    onClick={randomVibe}
                    className="font-mono text-[0.7rem] font-bold text-teal hover:underline uppercase"
                  >
                    🎲 random vibe
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {cypherEmotions.map((e) => {
                    const active = e.id === emotion;
                    return (
                      <button
                        key={e.id}
                        onClick={() => selectEmotion(e.id)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl border-2 transition-all text-left ${
                          active
                            ? "border-line bg-teal/20 text-ink shadow-[2px_2px_0_var(--shadowc)] scale-[1.02]"
                            : "border-line/40 bg-card hover:border-line hover:bg-bg2/60 text-inksoft hover:text-ink"
                        }`}
                      >
                        <span className="font-sans text-xs font-bold truncate">
                          {e.name}
                        </span>
                        <span className="font-mono text-[0.62rem] opacity-70 ml-1 shrink-0 uppercase">
                          {e.tag}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex flex-wrap justify-center gap-3 pt-2 w-full border-t border-line/10">
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

              <p className="micro text-inksoft text-center">
                (konami code also works directly on your keyboard. we don&apos;t judge.)
              </p>

              {fortune ? (
                <div className="w-full rounded-2xl border-2 border-dashed border-inksoft/40 bg-bg/40 px-4 py-3 text-center">
                  <span className="micro text-amber font-bold block mb-1">FOX FORTUNE COOKIE</span>
                  <p className="font-sans text-sm text-ink font-medium italic">
                    “{fortune}”
                  </p>
                </div>
              ) : null}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
