"use client";

import { useEffect, useRef, useState } from "react";
import FoxMascot, { type FoxMood } from "@/components/FoxMascot";
import Reveal from "@/components/Reveal";
import { Sticker, PawIcon, ChipIcon, SparkleIcon, BoltIcon } from "@/components/Sticker";
import { fursuitRnd, foxLines, fortunes, graveyard } from "@/data/content";
import { soundEnabled, toggleSound } from "@/lib/sound";

const moods: FoxMood[] = ["happy", "suspicious", "sleepy", "idle"];
const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export default function SecretLab() {
  const zone = useRef<HTMLDivElement>(null);
  const [mood, setMood] = useState<FoxMood>("idle");
  const [line, setLine] = useState("poke me. i dare you.");
  const [party, setParty] = useState(false);
  const [pawOn, setPawOn] = useState(true);
  const [fxOn, setFxOn] = useState(true);
  const [fortune, setFortune] = useState("");

  useEffect(() => {
    setFxOn(soundEnabled());
    setFortune(fortunes[Math.floor(Math.random() * fortunes.length)]);
  }, []);

  const poke = () => {
    const next = moods[(moods.indexOf(mood) + 1) % moods.length];
    setMood(next);
    setLine(foxLines.poke[Math.floor(Math.random() * foxLines.poke.length)]);
  };

  const togglePaw = () => {
    window.dispatchEvent(new Event("paw-toggle"));
    setPawOn((v) => !v);
  };

  const toggleFx = () => setFxOn(toggleSound());

  const startParty = () => {
    document.documentElement.classList.add("party");
    setParty(true);
    setLine(foxLines.konami);
    setMood("happy");
    window.setTimeout(() => {
      document.documentElement.classList.remove("party");
      setParty(false);
      setMood("idle");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="lab" className="mx-auto w-[min(1150px,92vw)] py-28">
      <Reveal>
        <p className="micro text-inksoft">08 · the secret lab</p>
        <h2 className="mt-2 text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold leading-[0.95]">
          Failures, toys & <span className="text-coral">mascot hardware.</span>
        </h2>
        <p className="mt-3 text-inksoft">
          Failures are just renovations for character. Here lie the renovations. Also: draggable toys. Engineers need both.
        </p>
      </Reveal>

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

        <div className="space-y-7">
          <Reveal delay={0.06}>
            <div className="sticker-card flex flex-col items-center gap-4 p-6">
              <div className="relative">
                <div className={`float-soft ${party ? "party-dance" : ""}`}>
                  <FoxMascot mood={mood} size={210} />
                </div>
                <div className="absolute -top-2 right-[-140px] w-56 rounded-2xl border-[3px] border-line bg-card px-4 py-3 shadow-[4px_5px_0_var(--shadowc)]">
                  <p className="text-sm font-bold">{line}</p>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap justify-center gap-3">
                <button className="btn-squish btn-coral" data-boing onClick={poke}>
                  poke the fox
                </button>
                <button className="btn-squish" onClick={togglePaw}>
                  paw cursor: {pawOn ? "on" : "off"}
                </button>
                <button className="btn-squish" onClick={toggleFx}>
                  boing: {fxOn ? "on" : "off"}
                </button>
                <button className="btn-squish btn-solid" onClick={startParty}>
                  ↑↑↓↓←→←→BA
                </button>
              </div>
              <p className="micro text-inksoft">(konami code also works on your keyboard. we don&apos;t judge.)</p>
              {fortune ? (
                <p className="mt-2 rounded-full border-2 border-dashed border-inksoft/40 px-4 py-2 text-center text-sm text-inksoft">
                  🍪 fox fortune: {fortune}
                </p>
              ) : null}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
