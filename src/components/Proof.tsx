"use client";

import Reveal from "@/components/Reveal";
import SectionHead from "@/components/motion/SectionHead";
import { awards, testimonials } from "@/data/content";

export default function Proof() {
  return (
    <section id="proof" className="mx-auto w-[min(1150px,92vw)] py-28">
      <SectionHead
        kicker="04 · receipts"
        parts={[{ t: "Awards, field trials &" }, { t: "kind words.", c: "shimmer-teal" }]}
      />

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {awards.map((a, i) => (
          <Reveal key={a.name} delay={(i % 2) * 0.1} variant="pop">
            <article className="sticker-card h-full px-6 py-5">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-xl font-extrabold">{a.name}</h3>
                <span className="micro rounded-full bg-amber/20 px-2.5 py-1 text-amber">{a.date}</span>
              </div>
              <p className="mt-2 text-inksoft">{a.detail}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="micro mt-14 text-inksoft">testimonials · temporary quotes, real words pending</p>
      </Reveal>
      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.who} delay={i * 0.1} variant="tilt">
            <figure className="h-full rounded-2xl border-[3px] border-dashed border-inksoft/50 bg-card/60 px-6 py-5">
              <blockquote className="text-inksoft italic">“{t.quote}”</blockquote>
              <figcaption className="micro mt-4">
                {t.who} · <span className="text-inksoft">{t.role}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
