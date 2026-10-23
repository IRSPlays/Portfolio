"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Eyebrow from "@/components/eae/Eyebrow";
import Handoff from "@/components/eae/Handoff";
import SplitText from "@/components/motion/SplitText";
import { projects, type Project } from "@/data/content";
import { workIds } from "@/data/eae";

const items = workIds.map((id) => projects.find((p) => p.id === id)!).filter(Boolean);

function Sheet({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const numY = useTransform(scrollYProgress, [0, 1], [120, -160]);
  const numOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <article ref={ref} data-sheet={i} className="relative flex min-h-[92vh] flex-col justify-center border-t border-ink py-16">
      <motion.span
        style={{ y: numY, opacity: numOpacity, WebkitTextStroke: "1.5px var(--ink)" }}
        className="serif-i pointer-events-none absolute right-0 top-8 select-none text-[clamp(10rem,22vw,22rem)] leading-none text-transparent"
        aria-hidden
      >
        {String(i + 1).padStart(2, "0")}
      </motion.span>

      <div className="relative">
        <p className="micro text-coral">{p.stack.slice(0, 3).join(" · ")}</p>
        <h3 className="serif mt-3 max-w-[14ch] text-[clamp(2.6rem,6.2vw,5.8rem)] leading-[0.96]">{p.name}</h3>
        <p className="serif-i mt-4 max-w-[30ch] text-[clamp(1.3rem,2.2vw,2rem)] leading-snug text-inksoft">{p.tagline}</p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="max-w-[56ch] text-[1.05rem] leading-relaxed">{p.mission}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {p.highlights.slice(0, 4).map((h) => (
                <li key={h} className="micro rounded-full bg-ink px-3.5 py-1.5 text-[0.65rem] text-bg">
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="micro text-coral">what I built</p>
            <ul className="mt-3 space-y-2.5 text-[0.95rem] leading-snug">
              {p.built.slice(0, 3).map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="text-coral">→</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            {p.links.length ? (
              <div className="mt-6 flex flex-wrap gap-5">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-hover
                    className="micro border-b border-ink pb-0.5 transition-colors hover:border-coral hover:text-coral"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-sheet]");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.sheet))),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="work" className="relative">
      <div className="mx-auto w-[min(1400px,92vw)] pb-10 pt-28 md:pt-40">
        <Eyebrow n="04" label="Selected work" />
        <SplitText
          as="h2"
          parts={[{ t: "Six more things" }, { t: "I shipped.", c: "serif-i text-coral" }]}
          className="serif mt-10 max-w-[14ch] text-[clamp(2.8rem,8vw,7.5rem)] leading-[0.95]"
        />
      </div>

      <div className="mx-auto grid w-[min(1400px,92vw)] gap-12 lg:grid-cols-[0.55fr_1.45fr]">
        {/* sticky index: follows the sheet you're reading */}
        <aside className="hidden lg:block">
          <div className="sticky top-0 flex h-screen flex-col justify-center">
            <p className="micro text-inksoft">index</p>
            <ol className="mt-5">
              {items.map((p, i) => (
                <li key={p.id} className="relative">
                  {active === i ? (
                    <motion.span
                      layoutId="work-marker"
                      className="absolute -left-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-coral"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  ) : null}
                  <a
                    href="#work"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.querySelector<HTMLElement>(`[data-sheet="${i}"]`);
                      if (el && window.__lenis) window.__lenis.scrollTo(el, { offset: -20, duration: 1.4 });
                      else el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    data-hover
                    className={`serif block py-1 text-[clamp(1.4rem,2.2vw,2.1rem)] leading-[1.1] transition-all duration-500 ${
                      active === i ? "translate-x-2 text-ink" : "text-ink/30 hover:text-ink/70"
                    }`}
                  >
                    {p.name}
                  </a>
                </li>
              ))}
            </ol>
            <p className="micro mt-8 text-inksoft">
              {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </p>
          </div>
        </aside>

        <div>
          {items.map((p, i) => (
            <Sheet key={p.id} p={p} i={i} />
          ))}
        </div>
      </div>

      <Handoff parts={[{ t: "Here's how I" }, { t: "actually work.", c: "serif-i text-coral" }]} />
    </section>
  );
}
