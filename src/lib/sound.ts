let ctx: AudioContext | null = null;
let enabled = true;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    ctx ??= new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    return ctx;
  } catch {
    return null;
  }
}

export function initSoundPref() {
  enabled = localStorage.getItem("fox-sound") !== "off";
}

export function toggleSound(): boolean {
  enabled = !enabled;
  localStorage.setItem("fox-sound", enabled ? "on" : "off");
  return enabled;
}

export function soundEnabled() {
  return enabled;
}

export function blip(freq = 720) {
  if (!enabled) return;
  const c = getCtx();
  if (!c) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = "square";
  o.frequency.setValueAtTime(freq, c.currentTime);
  o.frequency.exponentialRampToValueAtTime(freq * 1.5, c.currentTime + 0.06);
  g.gain.setValueAtTime(0.04, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.12);
  o.connect(g).connect(c.destination);
  o.start();
  o.stop(c.currentTime + 0.13);
}

export function boing() {
  if (!enabled) return;
  const c = getCtx();
  if (!c) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = "sine";
  o.frequency.setValueAtTime(420, c.currentTime);
  o.frequency.exponentialRampToValueAtTime(120, c.currentTime + 0.28);
  g.gain.setValueAtTime(0.07, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.34);
  o.connect(g).connect(c.destination);
  o.start();
  o.stop(c.currentTime + 0.36);
}
