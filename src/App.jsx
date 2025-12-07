import React, { useState, useEffect, useMemo } from 'react';
import { OSProvider, useOS } from './context/OSContext';
import Scene from './components/3d/Scene';
import Desktop from './components/os/Desktop';
import Startup from './components/os/Startup';
import LoginScreen from './components/os/LoginScreen';
import TopBar from './components/os/TopBar';
import ContextMenu from './components/os/ContextMenu';
import Widgets from './components/os/Widgets';
import Spotlight from './components/os/Spotlight';
import { AnimatePresence } from 'framer-motion';
import './styles/visualizer.css';

// App Components
import About from './components/apps/About';
import Projects from './components/apps/Projects';
import Contact from './components/apps/Contact';
import Settings from './components/apps/Settings';
import MusicPlayer from './components/apps/MusicPlayer';
import Terminal from './components/apps/Terminal';
import { apps as appMetadata } from './config/apps';

const BrightnessOverlay = () => {
  const { brightness } = useOS();
  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        background: '#000', opacity: (100 - brightness) / 100,
        pointerEvents: 'none', zIndex: 99999
      }}
    />
  );
};

import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  // Create the full registry by combining metadata with components
  const installedApps = useMemo(() => ({
    about: { ...appMetadata.about, component: About },
    projects: { ...appMetadata.projects, component: Projects },
    contact: { ...appMetadata.contact, component: Contact },
    settings: { ...appMetadata.settings, component: Settings },
    music: { ...appMetadata.music, component: MusicPlayer },
    terminal: { ...appMetadata.terminal, component: Terminal },
  }), []);

  return (
    <ErrorBoundary>
      <OSProvider installedApps={installedApps}>
        <AppContent />
      </OSProvider>
    </ErrorBoundary>
  );
}

function AppContent() {
  const [bootState, setBootState] = useState('startup'); // startup, login, desktop
  const [contextMenu, setContextMenu] = useState(null);
  const { launchApp, installedApps, volume, currentTrack, isPlaying, setIsPlaying } = useOS();
  const [hasAutoLaunched, setHasAutoLaunched] = useState(false);
  const audioRef = React.useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Autoplay blocked usually:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [volume, isPlaying]);

  useEffect(() => {
    if (bootState === 'desktop' && !hasAutoLaunched) {
      // Start Music
      setIsPlaying(true);
      // Auto-launch About app
      setTimeout(() => {
        const aboutApp = installedApps.about;
        if (aboutApp) {
          launchApp(aboutApp.id, aboutApp.component, aboutApp.title, aboutApp.icon);
        }
        setHasAutoLaunched(true);
      }, 500);
    }
  }, [bootState, hasAutoLaunched, launchApp, installedApps]);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleClick = () => {
    if (contextMenu) setContextMenu(null);
  };

  return (
    <div
      style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
      onContextMenu={handleContextMenu}
      onClick={handleClick}
    >
      <BrightnessOverlay />
      <audio ref={audioRef} src={currentTrack.src} loop crossOrigin="anonymous" />
      <Scene />

      <AnimatePresence>
        {bootState === 'startup' && (
          <Startup onComplete={() => setBootState('login')} />
        )}

        {bootState === 'login' && (
          <LoginScreen onLogin={() => setBootState('desktop')} />
        )}
      </AnimatePresence>

      {bootState === 'desktop' && (
        <>
          <TopBar />
          <Widgets />
          <Desktop />
          <Spotlight />
          <AnimatePresence>
            {contextMenu && (
              <ContextMenu
                x={contextMenu.x}
                y={contextMenu.y}
                onClose={() => setContextMenu(null)}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

export default App;
