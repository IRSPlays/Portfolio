export type PhotoSlotId =
  | "haziq-portrait"
  | "cypher-portrait"
  | "cortex-hero"
  | "cortex-field"
  | "cortex-savh"
  | "copartner-ui"
  | "aether-diagram"
  | "nrpc-floor"
  | "swag-stage"
  | "echo-ui"
  | "sg60-app"
  | "kopitalk"
  | "webblox"
  | "fnafcam"
  | "workspace";

export type PhotoSlot = {
  want: string;
  aspect: string;
};

export const photoSlots: Record<PhotoSlotId, PhotoSlot> = {
  "haziq-portrait": {
    want: "Auto-filled with the official Haziq portrait from asirive.com/team.",
    aspect: "3 / 4",
  },
  "cypher-portrait": {
    want: "Clean Cypher art (bust or full-body, ideally transparent/clean background) — About section main frame. (temporarily filled with the sticker art)",
    aspect: "3 / 4",
  },
  "cortex-hero": {
    want: "Auto-filled with the official Cortex standalone product shot from asirive.com/cortex.",
    aspect: "4 / 3",
  },
  "cortex-field": {
    want: "Auto-filled with 'Irfan Wearing Cortex V3' from asirive.com/cortex.",
    aspect: "3 / 2",
  },
  "cortex-savh": {
    want: "Auto-filled with a SAVH co-design session photo (swap freely between Session 1/2/3 in public/).",
    aspect: "16 / 9",
  },
  "copartner-ui": {
    want: "Deprecated project — screenshot of Asirive Copartner running (semantic bus / computer-use view).",
    aspect: "16 / 9",
  },
  "aether-diagram": {
    want: "Aether block-stack diagram or training dashboard screenshot (PolyMamba2 / CC-FSA / MOD router).",
    aspect: "4 / 3",
  },
  "nrpc-floor": {
    want: "NRPC 2026 competition floor or the live leaderboard screen.",
    aspect: "16 / 9",
  },
  "swag-stage": {
    want: "SWAG Day stage with the FCS visuals on the big screen.",
    aspect: "16 / 9",
  },
  "echo-ui": {
    want: "Project Echo dashboard screenshot.",
    aspect: "16 / 9",
  },
  "sg60-app": {
    want: "SG60 Heritage Lens app screenshot on an iPhone.",
    aspect: "3 / 4",
  },
  kopitalk: {
    want: "KopiTalk family playing the board game with the ESP32-CAM watching the board.",
    aspect: "4 / 3",
  },
  webblox: {
    want: "WebBlox editor screenshot.",
    aspect: "16 / 9",
  },
  fnafcam: {
    want: "FnafCam gameplay screenshot.",
    aspect: "16 / 9",
  },
  workspace: {
    want: "Your real workspace/desk photo (the real Cypher room) — Secret Lab & footer backdrop.",
    aspect: "16 / 9",
  },
};

export const profile = {
  name: "Haziq",
  handle: "IRSPlays",
  fursona: "Cypher",
  role: "Systems Architect & Founder @ Asirive",
  location: "Singapore",
  motto: "Failing with Honour.",
  mottoAlt: "Pain first, rest later.",
  status: "Status: INNOVATING.",
  bio: [
    "I'm Haziq (IRSPlays) — Systems Architect, AI/IoT Engineer and Founder of Asirive, based in Singapore. I bridge high-level multimodal AI reasoning with low-level edge hardware and ambient OS-level execution.",
    "I build accessible, high-performance systems: open-source assistive wearables co-designed with the Singapore Association for the Visually Handicapped, in-house edge language models, decentralized triage engines, on-device vision apps, and mission-critical competition infrastructure.",
    "And yes — the fox is canon. Cypher lives here rent-free.",
  ],
  philosophy:
    "I view bugs not as failures, but as necessary renovations for character.",
  email: "hello@hazcreates.dev",
};

export const roles = [
  "Systems Architect",
  "Founder @ Asirive",
  "AI / IoT Engineer",
  "Edge Vision Nerd",
  "Building assistive hardware",
  "Failing with Honour",
  "Professional fox (self-declared)",
];

export const arsenalTiers = [
  {
    tier: "Layer 1 · Silicon & Rapid Prototyping",
    subtitle: "the physical world fights back",
    items: [
      "Elegoo Neptune 4 Pro — high-speed FDM mechanical iteration",
      "Parametric CAD & tolerancing — optical mounts, snap-fit chassis, sensor brackets",
      "Hardware telemetry — logic sniffing, bench power analysis, I2C/SPI/UART debugging",
    ],
  },
  {
    tier: "Layer 2 · Firmware, Edge & OS",
    subtitle: "the bare metal",
    items: [
      "Embedded POSIX & minimal Linux (Xubuntu) — low-overhead environments",
      "Embedded C/C++ & Python — device drivers and sensor loop timing",
      "Autonomous terminal agents — OpenCode, Claude Code for rapid iteration",
    ],
  },
  {
    tier: "Layer 3 · Spatial & Cognitive Engine",
    subtitle: "multimodal brains, on the edge",
    items: [
      "Quantized on-device neural models — low-latency edge vision inference",
      "Spatial tracking pipelines — SteamVR ecosystem integration",
      "Dual-voice interrupt TTS — <100ms hardware-switched preemption",
    ],
  },
];

export const arsenalMarquee = [
  "Python", "C/C++", "PyTorch", "ROCm", "Rust", "TypeScript", "Next.js", "React", "Three.js",
  "Raspberry Pi 5", "Hailo-8L", "Elegoo Neptune 4 Pro", "YOLO11n", "OpenCV", "Gemini API",
  "WebRTC", "Web-Audio", "Supabase", "SQLite", "SwiftUI", "Core ML", "Linux", "SteamVR", "MCP",
];

export type TimelineEntry = {
  date: string;
  title: string;
  tag: string;
  story: string;
  accent?: boolean;
};

export const timeline: TimelineEntry[] = [
  {
    date: "V1 · First Light",
    title: "The ESP32-CAM relay",
    tag: "prototype",
    story:
      "A button, a camera, and a laptop across the room doing the thinking. Slow and not standalone — but it proved camera-plus-AI guidance could work.",
  },
  {
    date: "V2 · The Upgrade",
    title: "The shoulder-strap brick",
    tag: "prototype",
    story:
      "RPi Compute Module 5 + AI accelerator: the first real edge computer, on-device models, commodity parts. Serious hardware — but the strap never stopped fighting the user's shoulder.",
  },
  {
    date: "V3 · Pocket Unit",
    title: "It disappears into a pocket",
    tag: "current build",
    story:
      "RPi 5 + Hailo-8L, dual camera on the glasses, one USB-C cable to the pocket. You stop thinking about the computer entirely. This is the build that won TKKYIA 2026.",
    accent: true,
  },
  {
    date: "12 Sep 2026",
    title: "Introducing Aether",
    tag: "aether",
    story:
      "The in-house edge model enters the journal: ≈187M parameters, trained and run on a single AMD RX 7600 — the reason Cortex navigation can leave the cloud.",
  },
  {
    date: "19 Sep 2026",
    title: "TKKYIA 2026 · Merit Award",
    tag: "recognition",
    story:
      "Tan Kah Kee Young Inventors' Award 2026 — the highest award presented in the Student Category this year. Three students, age 15, and a year of field sessions with SAVH.",
    accent: true,
  },
  {
    date: "27 Sep 2026",
    title: "V4: from prototype to an ecosystem",
    tag: "next",
    story:
      "Refactored software, Aether-local navigation, managed cloud infrastructure, a companion app — and glasses rebuilt from scratch in CAD. The road continues.",
  },
];

export const awards = [
  {
    name: "TKKYIA 2026 · Merit Award",
    detail:
      "Highest award presented in the Student Category this year. Tan Kah Kee Foundation with MOE & Science Centre Singapore.",
    date: "19 Sep 2026",
  },
  {
    name: "A year of SAVH field sessions",
    detail: "Co-designed and user-tested with the Singapore Association for the Visually Handicapped.",
    date: "2025–2026",
  },
  {
    name: "Team of three, age 15",
    detail: "Admiralty Secondary: Haziq (system), Irfan (form), Eryna (people). Three roles, one device.",
    date: "2026",
  },
  {
    name: "Build with Gemini XPRIZE",
    detail: "Asirive Copartner entered the Build with Gemini XPRIZE before its retirement.",
    date: "2026",
  },
];

export const testimonials = [
  {
    quote:
      "[PLACEHOLDER — quote from a SAVH tester about walking with Cortex. Real words go here.]",
    who: "SAVH field tester",
    role: "user trial participant",
  },
  {
    quote: "[PLACEHOLDER — quote from a teacher/mentor about TKKYIA or the build journey.]",
    who: "Teacher / mentor",
    role: "Admiralty Secondary",
  },
  {
    quote: "[PLACEHOLDER — quote from Irfan or Eryna about building together.]",
    who: "Teammate",
    role: "Asirive co-founder",
  },
];

export const nowItems = [
  {
    title: "Cortex V4 — prototype → ecosystem",
    detail: "Refactored software, Aether-local navigation, companion app, glasses rebuilt from scratch in CAD.",
    status: "IN PROGRESS",
    date: "since 27 Sep 2026",
  },
  {
    title: "Aether REV 0.1",
    detail: "Training toward the 6.55B token target on one RX 7600. Publishing failures as we go.",
    status: "IN DEVELOPMENT",
    date: "updated weekly",
  },
  {
    title: "NRPC 2026 Platform",
    detail: "Holding steady for 500+ teams with real-time leaderboards.",
    status: "LIVE",
    date: "2026 season",
  },
  {
    title: "Fursuit Cortex — biomechatronics R&D",
    detail: "Responsive animatronics research. The fox is becoming hardware.",
    status: "EARLY R&D",
    date: "whenever sleep permits",
  },
];

export const graveyard = [
  {
    title: "V1 optical frame mount",
    died: "Sheared along layer lines under 1.2 Nm torque.",
    fix: "Reoriented print layers 45° and thickened the perimeter to 4 shells.",
  },
  {
    title: "Edge vision SoC thermals",
    died: "Hit 82°C inside an unvented enclosure during continuous inference.",
    fix: "Integrated an aluminum passive heat spreader with channeled perimeter venting.",
  },
  {
    title: "V2 shoulder-strap mount",
    died: "Ergonomics defeat: the strap fought the user's shoulder on every walk.",
    fix: "Killed the strap. Compute moved to a pocket unit on one USB-C cable (V3).",
  },
];

export const fursuitRnd = {
  status: "STATUS: EARLY R&D · MASCOT-INTEGRATED HARDWARE",
  blurb:
    "Designing assistive biomechatronics and responsive animatronics — because if Cortex gives humans new senses, Cypher deserves some too.",
  points: [
    "Dynamic load-balancing tail assemblies",
    "Active jaw linkages",
    "Integrated micro-climate cooling",
  ],
};

export const stackVerdicts: Record<string, { score: string; line: string }> = {
  electron: { score: "3/10", line: "RIP system memory. We run bare-metal edge hardware here." },
  "c++": { score: "9.5/10", line: "Direct memory control. Zero runtime bloat. Respect." },
  c: { score: "9.5/10", line: "Direct memory control. Zero runtime bloat. Respect." },
  cpp: { score: "9.5/10", line: "Direct memory control. Zero runtime bloat. Respect." },
  assembly: { score: "9.5/10", line: "You talk to the silicon directly. Cypher bows." },
  python: { score: "7/10", line: "Great for model prototyping, but keep it away from real-time blocking loops." },
  rust: { score: "9/10", line: "Memory safety without the garbage collector overhead. Acceptable." },
  docker: { score: "5/10", line: "Boxes inside boxes. Fine for the cloud, useless during a brownout." },
  wordpress: { score: "1/10", line: "*stares in embedded C* Try again." },
  react: { score: "8/10", line: "Websites pretending to be apps. I allow it — this portfolio runs on it." },
  "next.js": { score: "8.5/10", line: "React with a spine. Deployed on Vercel like a civilized being." },
  nextjs: { score: "8.5/10", line: "React with a spine. Deployed on Vercel like a civilized being." },
  typescript: { score: "8/10", line: "Types are just armor for your future self. Wear them." },
  "three.js": { score: "9/10", line: "Pixels in the third dimension. Cypher approves of this geometry." },
  threejs: { score: "9/10", line: "Pixels in the third dimension. Cypher approves of this geometry." },
  pytorch: { score: "9/10", line: "Where Aether's ancestors were born. Tender memories." },
  java: { score: "4/10", line: "Write once, run out of heap everywhere." },
  go: { score: "7/10", line: "Fast, boring, reliable. Like a good soldering iron." },
  html: { score: "6/10", line: "Not a language. Still essential. Like oxygen." },
  css: { score: "7.5/10", line: "The true boss battle. Centering a div is a personality test." },
  matlab: { score: "3/10", line: "Expensive sadness with a matrix fetish." },
};

export const stackSuffixes = [
  "Judged with love.",
  "This verdict is final (until tomorrow).",
  "Cypher's tail remains unimpressed.",
  "Benchmarked against vibes, not FLOPS.",
  "Next question. The fox is busy.",
];

export const fortunes = [
  "Today's forecast: 90% chance of thermal throttling. Vent your enclosures.",
  "A bug renamed is a feature half-solved.",
  "Somewhere, a shoulder strap is failing its user. Be better than V2.",
  "If it works on the first try, you've learned nothing. Break something.",
  "Hydrate. Your brain is also an embedded system.",
  "Honour scales better than perfection.",
];

export const resume = {
  cvHref: "/assets/haziq-cv.pdf",
  label: "CV ↓",
};

export type Project = {
  id: string;
  name: string;
  formerly?: string;
  status?: "deprecated";
  tagline: string;
  mission: string;
  built: string[];
  highlights: string[];
  stack: string[];
  badges?: string[];
  links: { label: string; href: string }[];
  coverSlot: PhotoSlotId;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "asirive-cortex",
    name: "Asirive Cortex",
    tagline: "Go anywhere. On your own.",
    mission:
      "Audio-first spoken navigation for blind and partially sighted cane users. The cane stays in the hand — Cortex fills in what it can't feel. No screen, no hands, open-ear audio so you still hear the world. Co-designed with SAVH, $186 BOM measured, built in Singapore.",
    built: [
      "V1 'First Light' — ESP32-CAM relay: frames routed wirelessly to a laptop that did the thinking. Slow and not standalone, but it proved camera-plus-AI guidance could work.",
      "V2 'The Upgrade' — Raspberry Pi Compute Module 5 + AI accelerator: the first real edge computer, on-device models, commodity parts. Serious hardware, but the shoulder-strap mount fought the user.",
      "V3 'Pocket Unit' (current, TKKYIA 2026) — Raspberry Pi 5 + Hailo-8L, dual camera on the glasses, one USB-C cable to a compute unit that disappears into a pocket. You stop thinking about the computer entirely.",
      "Cane-aware safety: warn only for cane-invisible overhead hazards, fast-approaching objects and visual info — never for ground clutter the cane already catches.",
      "Dual-voice priority TTS: Katie for conversational chat, Troy for critical safety warnings, switched inside a <100ms window.",
    ],
    highlights: [
      "Audio-first navigation (no screen, no hands)",
      "LTA DataMall × YOLO vision",
      "Guardian safety <100ms",
      "Co-designed with SAVH",
      "$186 BOM measured",
      "Built in Singapore",
      "TKKYIA 2026 Merit Award (Tan Kah Kee Young Inventors')",
    ],
    stack: ["Python", "Gemini 3.1", "YOLO11n-NCNN", "Hailo-8L", "Raspberry Pi 5", "TTS"],
    badges: ["User Trials: SAVH", "TKKYIA 2026 Merit"],
    links: [
      { label: "asirive.com/cortex", href: "https://www.asirive.com/cortex" },
      { label: "Demo V2 ▶", href: "https://www.youtube.com/watch?v=vgvTApfXBPM" },
      { label: "Repo", href: "https://github.com/Asirive/Asirive-Cortex" },
    ],
    coverSlot: "cortex-hero",
    featured: true,
  },
  {
    id: "asirive-aether",
    name: "Asirive Aether",
    formerly: "SNAP-C1",
    tagline: "In-house edge language model. Small by design, not small by compromise.",
    mission:
      "A ≈187M-parameter language model built from the ground up — not a stock transformer with new labels — so it can train and run on a single consumer GPU, on-prem, close to the user. REV 0.1, in development. We publish failures.",
    built: [
      "Two custom mixers alternating through the block stack: PolyMamba2 (state-space mixer, two transition orders, 16-dim state, spectral radius clamped ≤0.95) and CC-FSA (Chunk-Compressed Frequency Attention — 32-token chunks DCT-transformed, 8 of 32 frequency bins kept per head, strictly causal).",
      "MOD Router: Mixture-of-Depths routing over 5 routing points with one shared router — easy positions skip computation entirely.",
      "Measured on our own hardware: AMD RX 7600 (8 GB), ROCm/HIP on Windows 11, 26.30 BF16 TFLOPS sustained, 3,900–4,200 training tokens/s.",
      "Llama-3 tokenizer (vocab 128,256), 6.55B token training target, 116 automated tests passing.",
    ],
    highlights: [
      "≈187M parameters",
      "Trains on ONE consumer GPU (RX 7600)",
      "116 tests passing",
      "PolyMamba2 + CC-FSA + MoD router",
      "We publish failures",
    ],
    stack: ["PyTorch", "ROCm / HIP", "AMD RX 7600", "Custom Kernels", "Python"],
    badges: ["Built in public", "Sister project to Cortex"],
    links: [
      { label: "asirive.com/aether", href: "https://www.asirive.com/aether" },
      { label: "Lineage repo (SNAP-C1)", href: "https://github.com/IRSPlays/SNAP-C1" },
    ],
    coverSlot: "aether-diagram",
    featured: true,
  },
  {
    id: "nrpc-platform",
    name: "Competition Management Platform",
    tagline: "Mission-critical infrastructure for NRPC 2026. 500+ teams.",
    mission:
      "Robotics tournaments break when scoring is sloppy. This platform runs the whole competition with strict score calculation, poster submissions and real-time live leaderboards.",
    built: [
      "Strict, auditable score calculation engine.",
      "Poster submission pipeline with review flow.",
      "Real-time leaderboards that survive a venue full of refresh-happy teenagers.",
    ],
    highlights: ["500+ teams", "Strict score calculation", "Real-time live leaderboards"],
    stack: ["React", "TypeScript", "Node.js", "Express", "SQLite"],
    badges: ["Institutional: NRPC 2026"],
    links: [
      { label: "Live", href: "https://www.nrpc-platform.app" },
      { label: "Repo", href: "https://github.com/IRSPlays/Competition-Management-Platform" },
    ],
    coverSlot: "nrpc-floor",
    featured: true,
  },
  {
    id: "swag-day-fcs",
    name: "SWAG Day FCS",
    tagline: "Full custom stage AV & broadcast system. Zero audio files.",
    mission:
      "A whole stage production system: the controller drives the stage screen in real time, every sound is synthesized live, and the audience's phones become stage cameras.",
    built: [
      "Real-time controller/stage sync via BroadcastChannel (local) and Supabase Realtime (cross-device).",
      "Procedural Web-Audio synthesizer — audio beds, SFX pads, ducking and crossfades built programmatically in browser memory. Zero static MP3s.",
      "WebRTC live stage cam: audience phones stream straight onto the big screen.",
    ],
    highlights: [
      "Procedural Web-Audio (no audio files shipped)",
      "WebRTC audience → stage broadcast",
      "Cross-device stage sync",
    ],
    stack: ["Next.js", "TypeScript", "Web-Audio API", "WebRTC", "Supabase"],
    links: [
      { label: "Live", href: "https://swag-day-fcs.vercel.app" },
      { label: "Repo", href: "https://github.com/IRSPlays/SWAG-Day-FCS" },
    ],
    coverSlot: "swag-stage",
    featured: true,
  },
  {
    id: "project-echo",
    name: "Project Echo",
    tagline: "Decentralized triage. Zero identity tracking.",
    mission:
      "Legacy school feedback pipelines are slow and leaky. Echo replaces them with AI-driven triage, automated root-cause analysis and zero identity tracking.",
    built: [
      "Decentralized intake with privacy-first design (no identity tracking).",
      "Automated root-cause analysis and triage routing.",
    ],
    highlights: ["Zero identity tracking", "Automated root-cause analysis"],
    stack: ["Next.js", "TypeScript", "Python", "Tailwind CSS"],
    links: [
      { label: "Live", href: "https://project-echo-beta.vercel.app" },
      { label: "Repo", href: "https://github.com/IRSPlays/Project-Echo" },
    ],
    coverSlot: "echo-ui",
  },
  {
    id: "sg60-heritage-lens",
    name: "SG60 Heritage Lens",
    tagline: "Point your camera at Singapore. Learn its stories.",
    mission:
      "On-device heritage recognition for SG60: landmarks, food, transport and cultural icons with bite-sized historical context — fully on-device, privacy preserved.",
    built: [
      "Custom Core ML model for heritage classification running fully on-device via SwiftUI + Vision.",
      "Interactive bite-sized historical context cards.",
    ],
    highlights: ["On-device Core ML (no cloud round-trip)", "Custom trained model"],
    stack: ["SwiftUI", "Core ML", "iOS", "Vision"],
    links: [],
    coverSlot: "sg60-app",
  },
  {
    id: "kopitalk",
    name: "KopiTalk",
    tagline: "A family board game with an AI game-master.",
    mission:
      "Intergenerational board game nights, amplified: the ecosystem watches the board with an ESP32-CAM, analyzes conversation with Gemini and keeps the whole family in the game.",
    built: [
      "React web app + FastAPI server for ESP32-CAM computer-vision board-state detection.",
      "Gemini-powered conversation analysis and game mastering.",
      "KopitalkSlides: custom presentation system in React + Three.js because PowerPoint wasn't pretty enough.",
    ],
    highlights: ["ESP32-CAM board-state vision", "AI conversation analysis", "Custom Three.js slides"],
    stack: ["TypeScript", "React", "FastAPI", "ESP32-CAM", "Gemini API"],
    links: [
      { label: "Slides", href: "https://kopitalk-slides.vercel.app" },
      { label: "Repo", href: "https://github.com/IRSPlays/KopiTalk-FamilyBoardGame-Ecosystem" },
    ],
    coverSlot: "kopitalk",
  },
  {
    id: "webblox",
    name: "WebBlox",
    tagline: "Roblox-style game creation & play — all in the browser.",
    mission:
      "Build blocks, script behaviors, hit play. A browser-native game creation and play sandbox.",
    built: ["Browser-based scene editor with instant play mode."],
    highlights: ["Create & play in one tab"],
    stack: ["TypeScript", "Three.js", "Web"],
    links: [{ label: "Repo", href: "https://github.com/IRSPlays/WebBlox" }],
    coverSlot: "webblox",
  },
  {
    id: "fnafcam",
    name: "FnafCam",
    tagline: "Five Nights-style horror, built in Next.js.",
    mission:
      "A FNAF-inspired security-camera horror game — because portfolios should contain at least one thing that jump-scares recruiters.",
    built: ["Full game loop with camera system and animatronic AI tension."],
    highlights: ["Jump-scare-driven emotional damage"],
    stack: ["Next.js", "TypeScript"],
    links: [{ label: "Repo", href: "https://github.com/IRSPlays/FnafCam" }],
    coverSlot: "fnafcam",
  },
  {
    id: "asirive-copartner",
    name: "Asirive Copartner",
    status: "deprecated",
    tagline: "Not a chatbot. A colleague that watches, learns and acts.",
    mission:
      "Built for the Build with Gemini XPRIZE: an ambient OS-level AI harness that killed mechanical execution friction. Now deprecated — the ideas live on in newer Asirive work.",
    built: [
      "Universal Semantic Bus with a 3-layer interaction engine: MCP protocol actions, direct API connectors (Stripe, Vercel, Cloud Run) and screenshot-driven Computer Use via Gemini Vision + PyAutoGUI.",
      "Cognitive Hippocampus: 4-tier ChromaDB vector memory (semantic facts, episodic task logs, skill workflows, preference profiles).",
    ],
    highlights: ["Build with Gemini XPRIZE", "Universal Semantic Bus", "Deprecated — kept for history"],
    stack: ["Python", "Rust / Tauri", "Gemini 2.5", "ChromaDB", "MCP"],
    links: [{ label: "Repo", href: "https://github.com/Asirive/Copartner" }],
    coverSlot: "copartner-ui",
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/IRSPlays", handle: "@IRSPlays" },
  { label: "Asirive", href: "https://www.asirive.com", handle: "asirive.com" },
  { label: "Website", href: "https://hazcreates.dev", handle: "hazcreates.dev" },
  { label: "TikTok", href: "https://www.tiktok.com/@hazq.aep", handle: "@hazq.aep" },
  { label: "YouTube", href: "https://www.youtube.com/@TheIRSGuy_editz", handle: "@TheIRSGuy_editz" },
  { label: "HackerOne", href: "https://hackerone.com/irsplays", handle: "irsplays" },
];

export const asirive = {
  name: "Asirive",
  tagline: "Ambient Intelligence & Hardware",
  belief:
    "Human agency should not be swallowed by artificial intelligence; it should be amplified by it.",
  mission: "We build ambient software and assistive hardware to double human throughput.",
  href: "https://www.asirive.com",
  flagship: "asirive-cortex",
};

export const foxLines = {
  poke: [
    "Hey! I'm working on the render loop here.",
    "That's my ear. Ears are for listening, not poking.",
    "*wags tail aggressively*",
    "Poke registered. Honour intact.",
    "You found the fox. Gold star for you.",
  ],
  konami: "KONAMI DETECTED. Party protocol engaged. Pain first, dance later.",
};
