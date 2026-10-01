"use client";

import { useEffect, useRef, useState } from "react";
import FoxMascot, { type FoxMood } from "@/components/FoxMascot";
import Reveal from "@/components/Reveal";
import { Sticker, PawIcon, ChipIcon, SparkleIcon, BoltIcon } from "@/components/Sticker";
import { foxLines } from "@/data/content";

const moods: FoxMood[] = ["happy", "suspicious", "sleepy", "idle"];
const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export default function SecretLab() {
  const zone = useRef<HTMLDivElement>(null);
  const [mood, setMood] = useState<FoxMood>("idle");
  const [line, setLine] = useState("poke me. i dare you.");
  const [party, setParty] = useState(false);
  const [pawOn, setPawOn] = useState(true);

  const poke = () => {
    const next = moods[(moods.indexOf(mood) + 1) % moods.length];
    setMood(next);
    setLine(foxLines.poke[Math.floor(Math.random() * foxLines.poke.length)]);
  };

  const togglePaw = () => {
    window.dispatchEvent(new Event("paw-toggle"));
    setPawOn((v) => !v);
  };

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

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") startParty();
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
        <p className="micro text-inksoft">05 · the secret lab</p>
        <h2 className="mt-2 text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold leading-[0.95]">
          Useless (essential) <span className="text-coral">interactions.</span>
        </h2>
        <p className="mt-3 text-inksoft">
          Everything here is dragable, pokeable or forbidden. Engineers need toys too.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-7 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <div
            ref={zone}
            className="sticker-card relative h-[380px] overflow-hidden p-6"
          >
            <p className="micro text-inksoft">sticker drawer — drag & throw them (seriously)</p>
            <Sticker rotate={-8} style={{ left: "12%", top: "30%" }} constraints={zone}>
              <PawIcon size={62} />
            </Sticker>
            <Sticker rotate={10} style={{ left: "42%", top: "22%" }} constraints={zone}>
              <ChipIcon size={62} />
            </Sticker>
            <Sticker rotate={-4} style={{ left: "68%", top: "48%" }} constraints={zone}>
              <SparkleIcon size={54} />
            </Sticker>
            <Sticker rotate={14} style={{ left: "26%", top: "62%" }} constraints={zone}>
              <BoltIcon size={54} />
            </Sticker>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="sticker-card flex h-full flex-col items-center gap-4 p-6">
            <div className="relative">
              <div className={`float-soft ${party ? "party-dance" : ""}`}>
                <FoxMascot mood={mood} size={230} />
              </div>
              <div className="absolute -top-2 right-[-130px] w-52 rounded-2xl border-[3px] border-line bg-card px-4 py-3 shadow-[4px_5px_0_var(--shadowc)]">
                <p className="text-sm font-bold">{line}</p>
              </div>
            </div>
            <div className="mt-auto flex flex-wrap justify-center gap-3">
              <button className="btn-squish btn-coral" onClick={poke}>
                poke the fox
              </button>
              <button className="btn-squish" onClick={togglePaw}>
                paw cursor: {pawOn ? "on" : "off"}
              </button>
              <button className="btn-squish btn-solid" onClick={startParty} onKeyDown={onKey}>
                ↑↑↓↓←→←→BA
              </button>
            </div>
            <p className="micro text-inksoft">
              (konami code also works on your keyboard. we don&apos;t judge.)
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
