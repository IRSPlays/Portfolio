// Content for /eae — the application portfolio. Every claim here is drawn from the main site's data.

export const eaeMeta = {
  name: "Haziq Shah",
  short: "Haziq",
  school: "Admiralty Secondary School",
  location: "Singapore",
  focus: "Assistive technology · Edge AI · Embedded systems",
  email: "hello@hazcreates.dev",
};

export const eaeStats = [
  { v: "1", unit: "year", label: "of co-design sessions with the Singapore Association for the Visually Handicapped" },
  { v: "3", unit: "versions", label: "of one wearable built, broken and rebuilt — a fourth is underway" },
  { v: "500+", unit: "teams", label: "run on the competition platform I built for NRPC 2026" },
  { v: "$186", unit: "BOM", label: "measured cost of materials for one Cortex unit" },
  { v: "<100", unit: "ms", label: "to switch to the critical-safety voice when a hazard appears" },
  { v: "116", unit: "tests", label: "passing on Aether, a language model I train on one consumer GPU" },
];

export type CortexStep = {
  k: string;
  title: string;
  body: string;
  img: string;
  alt: string;
  chips: string[];
};

export const cortexSteps: CortexStep[] = [
  {
    k: "The brief",
    title: "The cane stays in the hand. Cortex fills in what it can't feel.",
    body: "Spoken navigation for blind and partially sighted cane users — no screen, no hands, open-ear audio so you still hear the world. Designed with the people who walk with it, in sessions at the Singapore Association for the Visually Handicapped.",
    img: "/cortex-savh-1.png",
    alt: "A co-design session with SAVH",
    chips: ["Audio-first", "Co-designed with SAVH"],
  },
  {
    k: "V1 → V2",
    title: "Proving it, then making it real.",
    body: "V1 was an ESP32-CAM streaming frames to a laptop that did the thinking — slow, but it proved camera-plus-AI guidance could work. V2 moved to a Raspberry Pi Compute Module 5 with an AI accelerator: real on-device models. But the shoulder strap fought the user on every walk.",
    img: "/cortex-demo-thumb.jpg",
    alt: "Field recording of the V2 demo",
    chips: ["ESP32-CAM", "RPi CM5", "Field-tested"],
  },
  {
    k: "V3",
    title: "A computer you forget you're carrying.",
    body: "Raspberry Pi 5 with a Hailo-8L accelerator, a dual camera on the glasses, and one USB-C cable to a unit that disappears into a pocket. The strap was killed; the device became something people actually wanted to wear.",
    img: "/cortex-standalone.png",
    alt: "The Cortex V3 pocket unit",
    chips: ["Raspberry Pi 5", "Hailo-8L", "YOLO11n"],
  },
  {
    k: "Safety",
    title: "Speak only when the cane can't.",
    body: "Cortex warns about overhead hazards and fast-approaching objects the cane can't catch — never ground clutter it already finds. Conversation and critical warnings use two different voices, switched inside a 100-millisecond window.",
    img: "/cortex-worn.png",
    alt: "Cortex V3 worn with the glasses-mounted dual camera",
    chips: ["<100 ms preemption", "Dual-voice TTS"],
  },
  {
    k: "Result",
    title: "Merit Award, Tan Kah Kee Young Inventors' Award 2026.",
    body: "The highest award presented in the Student Category this year, awarded to a team of three 15-year-olds after a year of field sessions. Cortex V4 — a refactored stack, local navigation with our own model, a companion app and glasses rebuilt in CAD — is in progress.",
    img: "/cortex-savh-2.png",
    alt: "A second SAVH co-design session",
    chips: ["TKKYIA 2026", "$186 BOM", "V4 in progress"],
  },
];

export const eaeRecord = [
  {
    n: "01",
    title: "Tan Kah Kee Young Inventors' Award 2026 — Merit Award",
    detail: "Highest award presented in the Student Category this year. Tan Kah Kee Foundation, with MOE and Science Centre Singapore.",
    when: "19 Sep 2026",
  },
  {
    n: "02",
    title: "Co-design with the Singapore Association for the Visually Handicapped",
    detail: "A year of user sessions and field trials shaping what Cortex says, when it says it, and what it never says.",
    when: "2025 – 2026",
  },
  {
    n: "03",
    title: "NRPC 2026 — Competition Management Platform",
    detail: "Built and ran the scoring, poster submission and live leaderboard system for a national robotics tournament of 500+ teams.",
    when: "2026 season",
  },
  {
    n: "04",
    title: "Build with Gemini XPRIZE",
    detail: "Entered Asirive Copartner — an ambient, OS-level AI assistant — before retiring it in favour of newer work.",
    when: "2026",
  },
  {
    n: "05",
    title: "HackerOne — security researcher",
    detail: "Active researcher profile: irsplays.",
    when: "ongoing",
    href: "https://hackerone.com/irsplays",
  },
];

export const workIds = [
  "asirive-aether",
  "nrpc-platform",
  "swag-day-fcs",
  "project-echo",
  "sg60-heritage-lens",
  "kopitalk",
];

export const team = [
  { name: "Haziq", role: "System", line: "The electronics, software and models that make it work." },
  { name: "Irfan", role: "Form", line: "How it looks, fits and is worn — the part people actually touch." },
  { name: "Eryna", role: "People", line: "The people it is built with and for." },
];

export const eaeNow = [
  { title: "Cortex V4", detail: "From prototype to ecosystem: refactored software, local navigation, a companion app, glasses rebuilt in CAD.", tag: "in progress" },
  { title: "Aether REV 0.1", detail: "Training toward a 6.55B-token target on a single AMD RX 7600, publishing failures as we go.", tag: "in development" },
  { title: "NRPC platform", detail: "Holding steady for 500+ teams with real-time leaderboards.", tag: "live" },
];

export const eaeLinks = [
  { label: "GitHub", href: "https://github.com/IRSPlays", handle: "@IRSPlays" },
  { label: "Asirive", href: "https://www.asirive.com", handle: "asirive.com" },
  { label: "Cortex", href: "https://www.asirive.com/cortex", handle: "asirive.com/cortex" },
  { label: "HackerOne", href: "https://hackerone.com/irsplays", handle: "irsplays" },
];
