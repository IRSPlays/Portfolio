"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import PhotoFrame from "@/components/PhotoFrame";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/motion/SectionHead";
import { projects, type Project } from "@/data/content";

function StatusPills({ project }: { project: Project }) {
  return (
    <>
      {project.featured ? (
        <span className="micro rounded-full bg-coral/20 px-2 py-0.5 text-coral">featured</span>
      ) : null}
      {project.status === "deprecated" ? (
        <span className="micro rounded-full bg-inksoft/20 px-2 py-0.5 text-inksoft">deprecated</span>
      ) : null}
      {project.formerly ? (
        <span className="micro rounded-full bg-navy/15 px-2 py-0.5 text-navy">ex-{project.formerly}</span>
      ) : null}
      {project.badges?.map((b) => (
        <span key={b} className="micro rounded-full bg-amber/20 px-2 py-0.5 text-amber">
          {b}
        </span>
      ))}
    </>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[85] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.button
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        aria-label="Close project"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.article
        role="dialog"
        aria-modal="true"
        aria-label={project.name}
        className="sticker-card relative z-10 max-h-[88vh] w-[min(880px,95vw)] overflow-y-auto p-6 md:p-10"
        initial={{ scale: 0.9, y: 30, rotate: -1, opacity: 0 }}
        animate={{ scale: 1, y: 0, rotate: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
      >
        <button
          ref={closeRef}
          className="btn-squish absolute right-4 top-4 px-3 py-1"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <StatusPills project={project} />
        </div>
        <h3 className="mt-3 text-[clamp(2rem,5vw,3.2rem)] font-extrabold leading-none">{project.name}</h3>
        <p className="mt-2 text-xl text-teal">{project.tagline}</p>

        <PhotoFrame slot={project.coverSlot} className="mt-6" />

        <h4 className="micro mt-8 text-inksoft">the mission</h4>
        <p className="mt-2 leading-relaxed text-inksoft">{project.mission}</p>

        <h4 className="micro mt-6 text-inksoft">what I built</h4>
        <ul className="mt-2 space-y-2 text-inksoft">
          {project.built.map((b) => (
            <li key={b} className="flex gap-3">
              <span className="text-teal">▸</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <h4 className="micro mt-6 text-inksoft">highlights</h4>
        <ul className="mt-2 flex flex-wrap gap-2">
          {project.highlights.map((h) => (
            <li key={h} className="rounded-full border-2 border-line px-3 py-1 text-sm">
              {h}
            </li>
          ))}
        </ul>

        <h4 className="micro mt-6 text-inksoft">stack</h4>
        <ul className="mt-2 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <li key={s} className="micro rounded-full bg-teal/15 px-3 py-1 text-teal">
              {s}
            </li>
          ))}
        </ul>

        {project.links.length > 0 ? (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn-squish btn-solid">
                {l.label} ↗
              </a>
            ))}
          </div>
        ) : null}
      </motion.article>
    </motion.div>
  );
}

function ProjectCard({ p, i, onOpen, wide }: { p: Project; i: number; onOpen: () => void; wide?: boolean }) {
  return (
    <button
      onClick={onOpen}
      className={`sticker-card group flex h-full flex-col p-5 text-left ${wide ? "w-[min(430px,82vw)] shrink-0" : "w-full"}`}
      style={wide ? { rotate: `${i % 2 ? 1.2 : -1.2}deg` } : undefined}
    >
      <span className="micro mb-3 text-amber">
        {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
      </span>
      <PhotoFrame slot={p.coverSlot} aspect="16 / 9" className="w-full" />
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <h3 className="font-display text-2xl font-extrabold">{p.name}</h3>
        <StatusPills project={p} />
      </div>
      <p className="mt-1 text-inksoft">{p.tagline}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {p.stack.slice(0, 3).map((s) => (
          <span key={s} className="micro rounded-full bg-teal/15 px-2.5 py-1 text-teal">
            {s}
          </span>
        ))}
      </div>
      <span className="micro mt-auto pt-4 text-inksoft transition-transform group-hover:translate-x-1">
        open the case study →
      </span>
    </button>
  );
}

export default function ProjectGrid() {
  const [open, setOpen] = useState<Project | null>(null);
  const [desktop, setDesktop] = useState(false);
  const [dist, setDist] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const measure = () => {
      setDesktop(mq.matches);
      if (track.current) setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    const t = window.setTimeout(measure, 300);
    const t2 = window.setTimeout(measure, 1200);
    return () => {
      mq.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
      window.clearTimeout(t2);
    };
  }, [desktop]);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);

  return (
    <section id="projects" className="py-28">
      <div className="mx-auto w-[min(1150px,92vw)]">
        <SectionHead
          kicker="06 · the build pile"
          parts={[{ t: "Projects, experiments &" }, { t: "controlled chaos.", c: "shimmer-teal" }]}
          sub={
            desktop
              ? "Keep scrolling — the pile slides sideways. Click a card for the full story."
              : "Tap a card for the full story. Yes, the cards are stickers too."
          }
        />
      </div>

      <div ref={wrap} className="relative mt-10" style={desktop ? { height: `calc(100vh + ${dist}px)` } : undefined}>
      {desktop ? (
        <div className="h-full">
          <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
            <motion.div ref={track} style={{ x }} className="flex w-max items-stretch gap-8 px-[4vw] py-10">
              {projects.map((p, i) => (
                <ProjectCard key={p.id} p={p} i={i} wide onOpen={() => setOpen(p)} />
              ))}
            </motion.div>
            <div className="mx-auto mt-6 h-2.5 w-[min(520px,70vw)] overflow-hidden rounded-full border-2 border-line bg-card">
              <motion.div className="h-full origin-left bg-coral" style={{ scaleX: scrollYProgress }} />
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-12 grid w-[min(1150px,92vw)] grid-cols-1 gap-7 sm:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.08} variant="tilt">
              <ProjectCard p={p} i={i} onOpen={() => setOpen(p)} />
            </Reveal>
          ))}
        </div>
      )}
      </div>

      <AnimatePresence>
        {open ? <ProjectModal key={open.id} project={open} onClose={() => setOpen(null)} /> : null}
      </AnimatePresence>
    </section>
  );
}
