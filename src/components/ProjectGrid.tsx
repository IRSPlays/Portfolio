"use client";

import { AnimatePresence, motion, useDragControls, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
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
  const controls = useDragControls();

  // freeze the page behind the sheet (Lenis + native) while it is open
  useEffect(() => {
    window.__lenis?.stop();
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.__lenis?.start();
      document.documentElement.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[85] flex items-end justify-center md:items-center md:p-8"
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
        data-lenis-prevent
        className="sticker-card sheet relative z-10 max-h-[92dvh] w-full overflow-y-auto overscroll-contain rounded-b-none px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-3 md:max-h-[88vh] md:w-[min(880px,95vw)] md:rounded-b-[24px] md:p-10"
        initial={{ y: "100%", opacity: 0.6 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        drag="y"
        dragControls={controls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.6 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 120 || info.velocity.y > 600) onClose();
        }}
      >
        <div
          className="-mx-5 mb-3 flex touch-none justify-center pb-2 pt-1 md:hidden"
          onPointerDown={(e) => controls.start(e)}
          aria-hidden
        >
          <span className="h-1.5 w-12 rounded-full bg-line/40" />
        </div>
        <button
          ref={closeRef}
          className="btn-squish absolute right-3 top-3 z-10 h-11 w-11 justify-center !p-0 md:right-4 md:top-4"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <StatusPills project={project} />
        </div>
        <h3 className="mt-3 pr-12 text-[clamp(2rem,5vw,3.2rem)] font-extrabold leading-none">{project.name}</h3>
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

/** Touch-first carousel for phones/tablets: native scroll-snap, live counter + dots. */
function SwipeDeck({ onOpen }: { onOpen: (p: Project) => void }) {
  const track = useRef<HTMLUListElement>(null);
  const [cur, setCur] = useState(0);

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const card = el.children[0] as HTMLElement | undefined;
    if (!card) return;
    const gap = 16;
    setCur(Math.min(projects.length - 1, Math.max(0, Math.round(el.scrollLeft / (card.offsetWidth + gap)))));
  };

  const go = (i: number) => {
    const el = track.current;
    const card = el?.children[0] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({ left: i * (card.offsetWidth + 16), behavior: "smooth" });
  };

  return (
    <div className="lg:hidden">
      <ul
        ref={track}
        onScroll={onScroll}
        data-lenis-prevent-touch
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-[8vw] pb-8 pt-3 [scroll-padding-inline:8vw]"
        aria-label="Projects carousel"
      >
        {projects.map((p, i) => (
          <li key={p.id} className="h-[360px] w-[84vw] max-w-[380px] shrink-0 snap-center">
            <Poster p={p} i={i} onOpen={() => onOpen(p)} dim={i !== cur} flat />
          </li>
        ))}
      </ul>
      <div className="flex flex-col items-center gap-3">
        <p className="micro text-inksoft">
          {String(cur + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} · swipe · tap to open
        </p>
        <div className="flex items-center gap-1" role="tablist" aria-label="Choose project">
          {projects.map((p, i) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={i === cur}
              aria-label={p.name}
              onClick={() => go(i)}
              className="flex h-6 w-5 items-center justify-center"
            >
              <span
                className={`block h-2.5 rounded-full border-2 border-line transition-all duration-300 ${
                  i === cur ? "w-6 bg-coral" : "w-2.5 bg-card"
                }`}
              />
            </button>
          ))}
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
        <SwipeDeck onOpen={setOpen} />
      </div>

      <AnimatePresence>
        {open ? <ProjectModal key={open.id} project={open} onClose={() => setOpen(null)} /> : null}
      </AnimatePresence>
    </Band>
  );
}
