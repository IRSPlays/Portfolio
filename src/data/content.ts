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

export const arsenal = [
  {
    domain: "AI & Edge Computing",
    items: ["Gemini 3.1 Flash", "PyTorch", "Python", "YOLO11n-NCNN", "OpenCV", "Custom Edge LLMs", "ROCm / HIP"],
  },
  {
    domain: "Hardware & Systems",
    items: ["Raspberry Pi 5", "Hailo-8L (13 TOPS)", "AMD DirectML", "SwiftUI / Core ML", "Linux", "GPIO haptics"],
  },
  {
    domain: "Full-Stack & Web",
    items: ["TypeScript", "React", "Next.js", "Node.js", "Rust / Tauri", "Vite"],
  },
  {
    domain: "Cloud & Real-Time",
    items: ["Supabase", "SQLite", "DigitalOcean", "Railway", "MCP Protocol", "WebRTC"],
  },
  {
    domain: "Interactive UI & Audio",
    items: ["Three.js", "Framer Motion", "Web-Audio Synthesizer", "Spatial Audio", "Cartesia TTS", "Supertonic"],
  },
];

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
