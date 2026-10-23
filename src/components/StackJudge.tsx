"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  stackSuffixes,
  stackVerdicts,
  type CypherEmotionId,
} from "@/data/content";

const pills = [
  "Electron",
  "C++",
  "Python",
  "Rust",
  "Docker",
  "WordPress",
  "React",
  "Next.js",
  "Three.js",
  "TypeScript",
  "Java",
  "Go",
  "CSS",
  "MATLAB",
];

export type Verdict = {
  score: string;
  line: string;
  query: string;
  emotion: CypherEmotionId;
};

function judge(raw: string): Verdict {
  const key = raw.trim().toLowerCase().replace(/\s+/g, " ");
  const hit =
    stackVerdicts[key] ??
    stackVerdicts[key.replace(/[.\s]/g, "")] ??
    Object.entries(stackVerdicts).find(([k]) => key.includes(k))?.[1];
  const base = hit ?? {
    score: "??/10",
    line: "If it can't run on an embedded chip during a brownout, Cypher remains unimpressed.",
    emotion: "puzzled" as CypherEmotionId,
  };
  return {
    ...base,
    line: `${base.line} ${stackSuffixes[Math.floor(Math.random() * stackSuffixes.length)]}`,
    query: raw.trim() || "mystery tech",
    emotion: base.emotion ?? "puzzled",
  };
}

export default function StackJudge({
  onJudge,
}: {
  onJudge?: (emotion: CypherEmotionId, verdict: Verdict) => void;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  const submit = (raw: string) => {
    if (!raw.trim()) return;
    setValue(raw);
    const result = judge(raw);
    setVerdict(result);
    onJudge?.(result.emotion, result);
  };

  return (
    <div className="w-full max-w-[420px]">
      <motion.button
        className="sticker-card flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left"
        data-boing
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.97 }}
        aria-expanded={open}
      >
        <span className="micro font-bold text-ink">That&apos;s Cypher. He judges your stack.</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="font-mono text-sm font-bold text-coral" aria-hidden>
          ▾
        </motion.span>
      </motion.button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mt-2.5 rounded-2xl border-[3px] border-line bg-card p-3 shadow-[4px_5px_0_var(--shadowc)]">
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  submit(value);
                }}
              >
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="type a tech… e.g. Electron"
                  aria-label="Technology to judge"
                  className="min-w-0 flex-1 rounded-full border-2 border-line bg-bg px-3.5 py-1.5 font-mono text-sm outline-none focus:border-teal"
                />
                <button type="submit" className="rounded-full border-2 border-line bg-teal px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-bg transition-transform hover:-translate-y-0.5 active:scale-95">
                  judge
                </button>
              </form>

              <div className="no-scrollbar -mx-1 mt-2.5 flex gap-1.5 overflow-x-auto px-1 pb-1">
                {pills.map((p) => (
                  <button
                    key={p}
                    onClick={() => submit(p)}
                    className="shrink-0 rounded-full border-2 border-line bg-bg px-2.5 py-0.5 font-mono text-xs transition-transform hover:-translate-y-0.5 active:scale-95"
                  >
                    {p}
                  </button>
                ))}
              </div>

              <div className="mt-2 flex h-10 items-center justify-between gap-3 rounded-xl border-2 border-dashed border-line/40 px-3">
                <AnimatePresence mode="wait" initial={false}>
                  {verdict ? (
                    <motion.div
                      key={verdict.query + verdict.score}
                      className="flex w-full items-baseline justify-between gap-3"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18 }}
                    >
                      <p className="min-w-0 truncate font-display text-base font-extrabold">{verdict.query}</p>
                      <p className="shrink-0 font-display text-xl font-extrabold text-coral">{verdict.score}</p>
                    </motion.div>
                  ) : (
                    <motion.p key="idle" className="micro text-inksoft" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      pick a tech — Cypher answers up top
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
