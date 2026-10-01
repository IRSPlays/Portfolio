"use client";

import Reveal from "@/components/Reveal";
import { nowItems, profile } from "@/data/content";

const tone: Record<string, string> = {
  "IN PROGRESS": "bg-coral/20 text-coral",
  "IN DEVELOPMENT": "bg-amber/20 text-amber",
  LIVE: "bg-mint/25 text-teal",
  "EARLY R&D": "bg-navy/20 text-navy",
};

export default function NowPanel() {
  return (
    <section id="now" className="mx-auto w-[min(1150px,92vw)] py-28">
      <Reveal>
        <p className="micro text-inksoft">07 · right now</p>
        <h2 className="mt-2 text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold leading-[0.95]">
          {profile.status} <span className="text-mint">here&apos;s the proof.</span>
        </h2>
      </Reveal>

      <div className="sticker-card circuit mt-10 p-6 md:p-8">
        <ul className="divide-y-2 divide-line/10">
          {nowItems.map((n, i) => (
            <li key={n.title}>
              <Reveal delay={i * 0.06}>
                <div className="flex flex-wrap items-start justify-between gap-4 py-5">
                  <div className="max-w-2xl">
                    <h3 className="font-display text-xl font-extrabold">{n.title}</h3>
                    <p className="mt-1 text-inksoft">{n.detail}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`micro rounded-full px-3 py-1 ${tone[n.status] ?? "bg-card"}`}>{n.status}</span>
                    <span className="micro text-inksoft">{n.date}</span>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
