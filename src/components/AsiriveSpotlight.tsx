"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import PhotoFrame from "@/components/PhotoFrame";
import { asirive, projects } from "@/data/content";

const versions = [
  { name: "V1 · First Light", desc: "ESP32-CAM relay — frames sent to a laptop that did the thinking. Not standalone, but it proved camera + AI guidance works." },
  { name: "V2 · The Upgrade", desc: "RPi CM5 + AI accelerator. Real edge compute and commodity parts — but the shoulder-strap mount fought the user." },
  { name: "V3 · Pocket Unit (current)", desc: "RPi 5 + Hailo-8L, dual camera on the glasses, one USB-C to a pocket unit. It disappears — you stop thinking about the computer." },
];

const specs = [
  "LTA DATAMALL × YOLO VISION",
  "GUARDIAN SAFETY <100MS",
  "CO-DESIGNED WITH SAVH",
  "$186 BOM MEASURED",
  "BUILT IN SINGAPORE",
];

const aetherStats = [
  { k: "parameters", v: "≈187M" },
  { k: "accelerator", v: "RX 7600 · 8 GB" },
  { k: "BF16 sustained", v: "26.30 TFLOPS" },
  { k: "train speed", v: "3,900–4,200 t/s" },
  { k: "token target", v: "6.55B" },
  { k: "tests passing", v: "116" },
];

export default function AsiriveSpotlight() {
  const cortex = projects.find((p) => p.id === "asirive-cortex")!;
  const aether = projects.find((p) => p.id === "asirive-aether")!;

  return (
    <section id="asirive" className="relative py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-amber/15 to-transparent" aria-hidden />

      <div className="mx-auto w-[min(1150px,92vw)]">
        <Reveal>
          <p className="micro text-inksoft">03 · the flagship company</p>
          <h2 className="mt-2 font-display text-[clamp(3rem,9vw,7rem)] font-extrabold leading-[0.9]">
            {asirive.name}
          </h2>
          <p className="micro mt-1 text-amber">{asirive.tagline} · asirive.com</p>
        </Reveal>

        <Reveal delay={0.1}>
          <blockquote className="mt-8 max-w-4xl font-display text-[clamp(1.5rem,3.4vw,2.6rem)] font-bold leading-tight">
            “{asirive.belief}”
          </blockquote>
          <p className="mt-3 text-lg text-inksoft">{asirive.mission}</p>
        </Reveal>

        {/* FLAGSHIP: Asirive Cortex */}
        <Reveal delay={0.15}>
          <article className="sticker-card circuit mt-14 p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="btn-squish pointer-events-none btn-coral px-4 py-1 text-xs">FLAGSHIP</span>
              <span className="micro text-inksoft">navigation-first · audio-first · assistive hardware</span>
            </div>
            <h3 className="mt-4 text-[clamp(2.2rem,5vw,3.8rem)] font-extrabold leading-none">{cortex.name}</h3>
            <p className="mt-2 max-w-2xl text-xl text-teal">{cortex.tagline}</p>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="text-lg leading-relaxed text-inksoft">{cortex.mission}</p>
                <ul className="mt-5 space-y-2">
                  {cortex.built.slice(3).map((b) => (
                    <li key={b} className="flex gap-3 text-inksoft">
                      <span className="text-teal">▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  {cortex.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn-squish btn-solid">
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <PhotoFrame slot="cortex-hero" src="/cortex-standalone.png" alt="Asirive Cortex V3 standalone pocket unit" />
                <PhotoFrame slot="cortex-field" src="/cortex-worn.png" alt="Cortex V3 worn with the glasses-mounted dual camera" className="mt-4" />
              </div>
            </div>

            <ul className="mt-8 flex flex-wrap gap-2">
              {specs.map((s) => (
                <li key={s} className="micro rounded-full border-2 border-line px-3 py-1.5">
                  {s}
                </li>
              ))}
            </ul>

            <h4 className="micro mt-10 text-inksoft">one device. three versions. each one fixed a specific failure.</h4>
            <ol className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
              {versions.map((v, i) => (
                <li key={v.name}>
                  <Reveal delay={i * 0.09} y={18}>
                    <div className="sticker-card h-full px-5 py-5">
                      <p className="font-display text-lg font-extrabold">{v.name}</p>
                      <p className="mt-2 text-sm text-inksoft">{v.desc}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr]">
              <a
                href="https://www.youtube.com/watch?v=vgvTApfXBPM"
                target="_blank"
                rel="noopener noreferrer"
                className="sticker-card group relative block overflow-hidden p-2"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-[14px]">
                  <Image
                    src="/cortex-demo-thumb.jpg"
                    alt="Asirive Cortex Demo V2 field recording"
                    fill
                    sizes="(max-width: 768px) 90vw, 40vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="micro mt-2 px-2 pb-1">watch it walk — field recording · demo v2 ▶</p>
              </a>
              <div className="sticker-card p-3">
                <PhotoFrame slot="cortex-savh" src="/cortex-savh-1.png" alt="SAVH co-design session" caption="savh co-design session · swap me for session 2" />
              </div>
            </div>
          </article>
        </Reveal>

        {/* Asirive Aether */}
        <Reveal delay={0.1}>
          <article className="sticker-card mt-10 p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="btn-squish pointer-events-none px-4 py-1 text-xs">REV 0.1 // IN DEVELOPMENT</span>
              <span className="micro text-inksoft">in-house edge language model · formerly SNAP-C1</span>
            </div>
            <h3 className="mt-4 text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-none">{aether.name}</h3>
            <p className="mt-2 text-xl text-coral">{aether.tagline}</p>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr]">
              <div>
                <p className="leading-relaxed text-inksoft">{aether.mission}</p>
                <ul className="mt-4 space-y-2 text-inksoft">
                  {aether.built.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="text-teal">▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <p className="micro mt-5 text-amber">small by design — not small by compromise · we publish failures</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {aether.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn-squish">
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <ul className="grid grid-cols-2 gap-3">
                  {aetherStats.map((s) => (
                    <li key={s.k} className="sticker-card px-4 py-3">
                      <p className="micro text-inksoft">{s.k}</p>
                      <p className="font-display text-xl font-extrabold">{s.v}</p>
                    </li>
                  ))}
                </ul>
                <PhotoFrame slot="aether-diagram" className="mt-4" />
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
