"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import PhotoFrame from "@/components/PhotoFrame";
import Reveal from "@/components/Reveal";
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

export default function ProjectGrid() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <section id="projects" className="mx-auto w-[min(1150px,92vw)] py-28">
      <Reveal>
        <p className="micro text-inksoft">06 · the build pile</p>
        <h2 className="mt-2 text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold leading-[0.95]">
          Projects, experiments & <span className="text-teal">controlled chaos.</span>
        </h2>
        <p className="mt-3 text-inksoft">Tap a card for the full story. Yes, the cards are stickers too.</p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={(i % 3) * 0.08}>
            <button
              onClick={() => setOpen(p)}
              className="sticker-card group flex h-full w-full flex-col p-5 text-left"
            >
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
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {open ? <ProjectModal key={open.id} project={open} onClose={() => setOpen(null)} /> : null}
      </AnimatePresence>
    </section>
  );
}
