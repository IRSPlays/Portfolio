"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import SiteFooter from "@/components/SiteFooter";
import Magnetic from "@/components/motion/Magnetic";
import SectionHead from "@/components/motion/SectionHead";
import PhotoFrame from "@/components/PhotoFrame";
import { profile, resume, socials } from "@/data/content";

export default function Contact() {
  return (
    <section id="contact" className="relative pt-14 md:pt-20">
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

      <SiteFooter />
    </section>
  );
}
