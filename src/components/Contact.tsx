"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import SectionHead from "@/components/motion/SectionHead";
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
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.8 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="contact" className="relative pt-28">
      <div className="mx-auto w-[min(1150px,92vw)]">
        <SectionHead
          kicker="09 · transmissions open"
          parts={[{ t: "Let's build something" }, { t: "loud.", c: "shimmer-coral" }]}
          sub="Assistive tech, ambient AI, stage AV, or gloriously silly web experiments — my inbox is open and Cypher reads over my shoulder."
        />

        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic strength={0.4}>
              <a href={`mailto:${profile.email}`} className="btn-squish btn-coral px-7 py-4 text-lg">
                {profile.email}
              </a>
            </Magnetic>
            <Magnetic strength={0.4}>
              <a href={resume.cvHref} className="btn-squish px-7 py-4 text-lg">
                CV ↓ · spec sheet
              </a>
            </Magnetic>
            {socials.map((s) => (
              <Magnetic key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="btn-squish">
                  {s.label} <span className="micro text-inksoft">{s.handle}</span>
                </a>
              </Magnetic>
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
