"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import PhotoFrame from "@/components/PhotoFrame";
import Reveal from "@/components/Reveal";
import Band from "@/components/motion/Band";
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

const posterTints = ["--teal", "--coral", "--amber", "--navy", "--mint"];

/** Typographic poster for a project — no placeholder photos needed. */
function Poster({ p, i, onOpen, dim, flat }: { p: Project; i: number; onOpen: () => void; dim?: boolean; flat?: boolean }) {
  const tint = posterTints[i % posterTints.length];
  return (
    <button
      onClick={onOpen}
      aria-label={`Open ${p.name}`}
      className="sticker-card group relative flex h-full w-full flex-col overflow-hidden p-5 text-left"
      style={{
        background: `color-mix(in srgb, var(${tint}) 22%, var(--card))`,
        filter: dim ? "brightness(0.78) saturate(0.85)" : undefined,
        transform: flat ? undefined : "none",
      }}
    >
      <span
        className="pointer-events-none absolute -right-3 -top-6 select-none font-display text-[9rem] font-extrabold leading-none opacity-[0.16]"
        style={{ color: `var(${tint})` }}
        aria-hidden
      >
        {String(i + 1).padStart(2, "0")}
      </span>
      <div className="relative flex flex-wrap items-center gap-1.5">
        <StatusPills project={p} />
      </div>
      <h3 className="relative mt-auto font-display text-[1.9rem] font-extrabold leading-[1.02]">{p.name}</h3>
      <p className="relative mt-2 line-clamp-3 text-[0.92rem] leading-snug text-inksoft">{p.tagline}</p>
      <div className="relative mt-4 flex flex-wrap gap-1.5">
        {p.stack.slice(0, 3).map((s) => (
          <span key={s} className="micro rounded-full border-2 border-line bg-card px-2.5 py-1 text-[0.58rem]">
            {s}
          </span>
        ))}
      </div>
      <span className="micro relative mt-4 text-[0.62rem] text-inksoft transition-transform group-hover:translate-x-1">
        open the case study →
      </span>
    </button>
  );
}

const CARD_W = 300;

/** A 3D carousel: the projects sit on a ring and spin as you scroll. */
function Ring({ onOpen }: { onOpen: (p: Project) => void }) {
  const pin = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: pin, offset: ["start start", "end end"] });
  const n = projects.length;
  const step = 360 / n;
  const radius = Math.round(CARD_W / 2 / Math.tan(Math.PI / n)) + 70;
  const angle = useTransform(scrollYProgress, [0.04, 0.96], [0, -(n - 1) * step]);
  const smooth = useSpring(angle, { stiffness: 70, damping: 18 });
  const [front, setFront] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const k = Math.round(Math.min(1, Math.max(0, (v - 0.04) / 0.92)) * (n - 1));
    setFront(k);
  });

  return (
    <div ref={pin} className="relative hidden lg:block" style={{ height: `${n * 55 + 80}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <div className="relative h-[430px] w-full" style={{ perspective: 1700 }}>
          <motion.div
            className="absolute left-1/2 top-1/2"
            style={{ transformStyle: "preserve-3d", rotateY: smooth, x: "-50%", y: "-50%", width: CARD_W, height: 400, translateZ: -radius }}
          >
            {projects.map((p, i) => (
              <div
                key={p.id}
                className="absolute inset-0"
                style={{ transform: `rotateY(${i * step}deg) translateZ(${radius}px)`, backfaceVisibility: "hidden" }}
              >
                <Poster p={p} i={i} onOpen={() => onOpen(p)} dim={i !== front} />
              </div>
            ))}
          </motion.div>
          <div
            className="pointer-events-none absolute inset-x-[10%] bottom-0 h-16 rounded-[100%] bg-black/30 blur-2xl"
            aria-hidden
          />
        </div>

        <div className="mt-8 text-center">
          <p className="micro text-inksoft">
            {String(front + 1).padStart(2, "0")} / {String(n).padStart(2, "0")} · scroll to spin · click to open
          </p>
          <p className="mt-1 font-display text-3xl font-extrabold">{projects[front].name}</p>
        </div>
      </div>
    </div>
  );
}

export default function ProjectGrid() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <Band id="projects" tint="coral" strength={9} className="mt-8 pb-16 pt-20">
      <div className="mx-auto w-[min(1150px,92vw)]">
        <SectionHead
          kicker="06 · the build pile"
          parts={[{ t: "Projects, experiments &" }, { t: "controlled chaos.", c: "shimmer-teal" }]}
          sub="Ten things on a carousel. Keep scrolling and it spins; click a card for the full story."
        />
      </div>

      <div className="mt-6">
        <Ring onOpen={setOpen} />
        <div className="mx-auto mt-10 grid w-[min(1150px,92vw)] grid-cols-1 gap-6 sm:grid-cols-2 lg:hidden">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.08} variant="tilt">
              <div className="h-[330px]">
                <Poster p={p} i={i} onOpen={() => setOpen(p)} flat />
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open ? <ProjectModal key={open.id} project={open} onClose={() => setOpen(null)} /> : null}
      </AnimatePresence>
    </Band>
  );
}
