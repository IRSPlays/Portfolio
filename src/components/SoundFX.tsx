"use client";

import { useEffect } from "react";
import { blip, boing, initSoundPref } from "@/lib/sound";

export default function SoundFX() {
  useEffect(() => {
    initSoundPref();
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest("[data-boing], .btn-squish, .sticker-card button") as HTMLElement | null;
      if (!el) return;
      if (el.hasAttribute("data-boing")) boing();
      else blip(el.tagName === "A" ? 760 : 640);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return null;
}
