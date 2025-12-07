# HaziqOS - Interactive Web Portfolio 🚀

A deeply immersive, macOS-inspired web operating system serving as a creative developer portfolio. Built with **React**, **Vite**, and **Framer Motion**, this project features a fully functional window management system, 3D environments, and simulated applications.

![HaziqOS Preview](public/preview-image-placeholder.png) *<!-- Add a screenshot here later if available -->*

## ✨ Features

### 🖥️ Desktop Environment
- **Window Management:** Drag, resize (ghost resizing), minimize, maximize, and close windows.
- **Global State:** Centralized `OSContext` managing windows, focus, Z-index, and system settings (volume, brightness).
- **Control Center:** Quick access to Wi-Fi, Bluetooth, and audio controls.
- **Dynamic Spotlight Search:** `Cmd/Ctrl + K` to search and launch apps.

### 📱 Applications
- **🎵 Music (Spotify Clone):** Fully functional visualizer, playlist management, tab navigation, and audio state integration.
- **💻 Terminal:** Interactive command-line interface with custom commands (`help`, `ls`, `cat`, `whoami`).
- **👤 About Me:** Interactive profile viewer.
- **📂 Projects:** Gallery of works.
- **✉️ Contact:** Direct communication interface.

### 🎨 UI/UX Design
- **Glassmorphism:** Heavy use of backdrop filters and translucency for a premium feel.
- **Animations:** Smooth transitions powered by `Framer Motion`.
- **3D Integration:** R3F (React Three Fiber) scene background.

## 🛠️ Tech Stack

- **Core:** React 18, Vite
- **Styling:** CSS Modules, Framer Motion (Animations)
- **State Management:** React Context API
- **Icons:** React Icons (Fa, Vsc)
- **3D:** React Three Fiber (Drei)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm / yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/IRSPlays/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## 📂 Project Structure

```
src/
├── components/
│   ├── apps/        # Individual Applications (Music, Terminal, etc.)
│   ├── os/          # OS UI (Desktop, Dock, Window, TopBar)
│   └── 3d/          # Three.js Scenes
├── context/         # OSContext (Global State)
├── styles/          # Global & keyframe styles
└── config/          # App metadata and configuration
```

## 🤝 Contributing

This is a personal portfolio project, but feel free to fork and experiment with your own "OS" creations!

---

**Developed by Haziq** | *Creative Developer & UI/UX Enthusiast*
