"use client";

import Reveal from "@/components/Reveal";
import PhotoFrame from "@/components/PhotoFrame";
import { profile, resume, socials } from "@/data/content";

export default function Contact() {
  return (
    <section id="contact" className="relative pt-28">
      <div className="mx-auto w-[min(1150px,92vw)]">
        <Reveal>
          <p className="micro text-inksoft">09 · transmissions open</p>
          <h2 className="mt-2 text-[clamp(2.6rem,7vw,5.5rem)] font-extrabold leading-[0.92]">
            Let&apos;s build something <span className="text-coral">loud.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-inksoft">
            Assistive tech, ambient AI, stage AV, or gloriously silly web experiments — my inbox is
            open and Cypher reads over my shoulder.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href={`mailto:${profile.email}`} className="btn-squish btn-coral px-7 py-4 text-lg">
              {profile.email}
            </a>
            <a href={resume.cvHref} className="btn-squish px-7 py-4 text-lg">
              CV ↓ · spec sheet
            </a>
            {socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-squish"
              >
                {s.label} <span className="micro text-inksoft">{s.handle}</span>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-16">
            <PhotoFrame slot="workspace" caption="where the pain-first magic happens" />
          </div>
        </Reveal>
      </div>

      <footer className="relative mt-20 overflow-hidden border-t-[3px] border-line py-10">
        <div className="mx-auto flex w-[min(1150px,92vw)] flex-wrap items-center justify-between gap-6">
          <div>
            <p className="font-display text-2xl font-extrabold">“{profile.motto}”</p>
            <p className="micro mt-2 text-inksoft">
              built by Haziq (IRSPlays) & Cypher · {new Date().getFullYear()} · no foxes were harmed
            </p>
          </div>
          <svg width="120" height="90" viewBox="0 0 120 90" aria-hidden className="tail-sway">
            <path
              d="M20 85 Q10 40 55 30 Q105 20 100 5 Q70 8 60 28 Q52 48 68 62 Q40 70 20 85 Z"
              fill="var(--teal)"
              stroke="#0B110D"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path d="M92 12 Q104 22 96 44 Q88 30 92 12 Z" fill="var(--mint)" stroke="#0B110D" strokeWidth="4" strokeLinejoin="round" />
          </svg>
        </div>
      </footer>
    </section>
  );
}
