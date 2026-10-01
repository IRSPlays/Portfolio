"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [beam, setBeam] = useState(false);

  useEffect(() => setMounted(true), []);

  const dark = mounted ? resolvedTheme === "dark" : true;

  return (
    <>
      <button
        className="btn-squish px-3 py-1.5"
        aria-label={dark ? "Switch to daylight mode" : "Switch to sunset mode"}
        onClick={() => {
          setTheme(dark ? "light" : "dark");
          setBeam(true);
          window.setTimeout(() => setBeam(false), 950);
        }}
      >
        <svg width="18" height="18" viewBox="0 0 64 64" aria-hidden>
          {dark ? (
            <g stroke="#0B110D" strokeWidth="4" strokeLinecap="round">
              <circle cx="32" cy="32" r="12" fill="var(--amber)" />
              <path d="M32 6v8M32 50v8M6 32h8M50 32h8M13 13l6 6M45 45l6 6M51 13l-6 6M19 45l-6 6" />
            </g>
          ) : (
            <path
              d="M42 8a24 24 0 1 0 14 38A20 20 0 0 1 42 8z"
              fill="var(--navy)"
              stroke="#0B110D"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          )}
        </svg>
        <span className="micro">{dark ? "daylight" : "sunset"}</span>
      </button>
      {beam ? <div className="sunbeam" /> : null}
    </>
  );
}
