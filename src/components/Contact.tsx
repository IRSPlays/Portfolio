"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import PhotoFrame from "@/components/PhotoFrame";
import CypherMascot from "@/components/CypherMascot";
import { profile, resume, socials } from "@/data/content";
import { boing } from "@/lib/sound";

const footerLinks = [
  { label: "top", href: "#top" },
  { label: "about", href: "#about" },
  { label: "road", href: "#road" },
  { label: "asirive", href: "#asirive" },
  { label: "projects", href: "#projects" },
  { label: "lab", href: "#lab" },
];

export default function Contact() {
  const scrollToTop = () => {
    boing();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="contact" className="relative pt-28">
      <div className="mx-auto w-[min(1150px,92vw)]">
        <Reveal>
          <p className="micro text-inksoft">09 · transmissions open</p>
          <h2 className="mt-2 text-[clamp(2.6rem,7vw,5.5rem)] font-extrabold leading-[0.92]">
            Let&apos;s build something <span className="text-coral">loud.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-inksoft leading-relaxed">
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
            <PhotoFrame
              slot="workspace"
              src="/cypher-wallpaper.jpg"
              alt="Cypher's workspace & wallpaper"
              caption="where the pain-first magic happens · the real cypher room"
            />
          </div>
        </Reveal>
      </div>

      {/* Upgraded Footer Section */}
      <footer className="relative mt-24 border-t-[3px] border-line bg-card/40 py-12">
        <div className="mx-auto flex w-[min(1150px,92vw)] flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Left: Brand, Mascot & Philosophy */}
          <div className="flex items-center gap-5">
            <div className="shrink-0">
              <CypherMascot emotion="thankful" size={88} interactive={true} />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-ink">
                  “{profile.motto}”
                </p>
                <span className="micro hidden sm:inline-block rounded-full bg-mint/20 px-2.5 py-0.5 text-[0.65rem] font-bold text-teal border border-teal/30">
                  {profile.status}
                </span>
              </div>
              <p className="micro mt-1 text-inksoft text-xs">
                built by Haziq (IRSPlays) & Cypher · {new Date().getFullYear()} · Singapore · no foxes were harmed
              </p>
            </div>
          </div>

          {/* Right: Quick Links & Teleport Button */}
          <div className="flex flex-wrap items-center gap-4 md:justify-end">
            <ul className="flex items-center gap-2">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-mono text-xs font-bold uppercase tracking-wider text-inksoft hover:text-ink px-2.5 py-1 rounded-full hover:bg-bg2/60 transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <button
              onClick={scrollToTop}
              className="btn-squish btn-solid px-4 py-2 font-mono text-xs font-bold shrink-0"
              aria-label="Scroll back to top"
            >
              teleport top ↑
            </button>
          </div>
        </div>
      </footer>
    </section>
  );
}
