"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { stackSuffixes, stackVerdicts } from "@/data/content";

const pills = ["Electron", "C++", "Python", "Rust", "Docker", "WordPress", "React", "Next.js", "Three.js", "TypeScript", "Java", "Go", "CSS", "MATLAB"];

type Verdict = { score: string; line: string; query: string };

function judge(raw: string): Verdict {
  const key = raw.trim().toLowerCase().replace(/\s+/g, " ");
  const hit =
    stackVerdicts[key] ??
    stackVerdicts[key.replace(/[.\s]/g, "")] ??
    Object.entries(stackVerdicts).find(([k]) => key.includes(k))?.[1];
  const base = hit ?? {
    score: "??/10",
    line: "If it can't run on an embedded chip during a brownout, Cypher remains unimpressed.",
  };
  return {
    ...base,
    line: `${base.line} ${stackSuffixes[Math.floor(Math.random() * stackSuffixes.length)]}`,
    query: raw.trim() || "mystery tech",
  };
}

export default function StackJudge() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  const submit = (raw: string) => {
    if (!raw.trim()) return;
    setValue(raw);
    setVerdict(judge(raw));
  };

  return (
    <div className="max-w-[420px]">
      <motion.button
        className="sticker-card px-4 py-3 text-left"
        data-boing
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.03, rotate: -1 }}
        whileTap={{ scale: 0.95, rotate: 1.5 }}
        aria-expanded={open}
      >
        <span className="micro font-bold">THAT&apos;S CYPHER. HE JUDGES YOUR STACK. (tap)</span>
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="sticker-card mt-3 p-4"
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <p className="micro text-inksoft">stack judge v0.fox — type or tap a tech</p>
            <form
              className="mt-2 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                submit(value);
              }}
            >
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="e.g. Electron"
                aria-label="Technology to judge"
                className="min-w-0 flex-1 rounded-full border-[3px] border-line bg-bg px-4 py-2 font-mono text-sm outline-none focus:border-teal"
              />
              <button type="submit" className="btn-squish btn-solid px-4 py-2">
                judge
              </button>
            </form>
            <div className="mt-3 flex flex-wrap gap-2">
              {pills.map((p) => (
                <button
                  key={p}
                  onClick={() => submit(p)}
                  className="micro rounded-full border-2 border-line px-3 py-1 transition-transform hover:scale-105"
                >
                  {p}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              {verdict ? (
                <motion.div
                  key={verdict.query + verdict.score}
                  className="mt-4 rounded-2xl border-[3px] border-line bg-bg p-4"
                  initial={{ opacity: 0, scale: 0.9, rotate: -1.5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-display text-lg font-extrabold">{verdict.query}</p>
                    <p className="font-display text-2xl font-extrabold text-coral">{verdict.score}</p>
                  </div>
                  <p className="mt-1 text-sm text-inksoft">{verdict.line}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
