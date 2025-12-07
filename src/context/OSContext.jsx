import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const OSContext = createContext();

export const useOS = () => useContext(OSContext);

export const OSProvider = ({ children, installedApps = {} }) => {
    const [windows, setWindows] = useState([]);
    const [focusedWindowId, setFocusedWindowId] = useState(null);

    // Global Settings
    const [volume, setVolume] = useState(10);
    const [brightness, setBrightness] = useState(100);
    const [wifi, setWifi] = useState(true);
    const [bluetooth, setBluetooth] = useState(true);
    const [themeColor, setThemeColor] = useState('#007bff'); // Default blue

    // Audio State
    const [isPlaying, setIsPlaying] = useState(false);
    // Note: Ensure these files exist in public/music/ or use external URLs for testing
    const [playlist, setPlaylist] = useState([
        {
            title: "Midnight City",
            artist: "M83",
            cover: "https://upload.wikimedia.org/wikipedia/en/7/74/M83_-_Midnight_City.jpg",
            src: "/music/midnight-city.mp3",
            duration: 243
        },
        {
            title: "Starboy",
            artist: "The Weeknd",
            cover: "https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Demo URL
            duration: 230
        },
        {
            title: "Get Lucky",
            artist: "Daft Punk",
            cover: "https://upload.wikimedia.org/wikipedia/en/a/a7/Random_Access_Memories.jpg",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", // Demo URL
            duration: 368
        },
        {
            title: "Nightcall",
            artist: "Kavinsky",
            cover: "https://upload.wikimedia.org/wikipedia/en/b/b6/Kavinsky_Nightcall_2010.png",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", // Demo URL
            duration: 258
        },
    ]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [progress, setProgress] = useState(0); // in seconds

    const currentTrack = playlist[currentTrackIndex];

    // Helper to format time (e.g. 243 -> 4:03)
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const nextTrack = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
        setProgress(0);
        setIsPlaying(true);
    };

    const prevTrack = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
        setProgress(0);
        setIsPlaying(true);
    };

    const playTrack = (index) => {
        setCurrentTrackIndex(index);
        setProgress(0);
        setIsPlaying(true);
    };

    // Simulate Progress
    React.useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= currentTrack.duration) {
                        nextTrack();
                        return 0;
                    }
                    return prev + 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentTrack]);

    const launchApp = (appId, component, title, icon) => {
        const existingWindow = windows.find((w) => w.appId === appId);
        if (existingWindow) {
            setFocusedWindowId(existingWindow.id);
            // Bring to front
            setWindows((prev) => {
                const others = prev.filter(win => win.id !== existingWindow.id);
                return [...others, existingWindow];
            });
            return;
        }

        const newWindow = {
            id: uuidv4(),
            appId,
            component,
            title,
            icon,
            isMinimized: false,
            isMaximized: false,
            zIndex: windows.length + 1,
            position: { x: 100 + windows.length * 20, y: 50 + windows.length * 20 },
            size: { width: 800, height: 600 },
        };

        setWindows([...windows, newWindow]);
        setFocusedWindowId(newWindow.id);
    };

    const closeWindow = (id) => {
        setWindows(windows.filter((w) => w.id !== id));
        if (focusedWindowId === id) {
            setFocusedWindowId(null);
        }
    };

    const minimizeWindow = (id) => {
        setWindows(
            windows.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
        );
    };

    const restoreWindow = (id) => {
        setWindows(
            windows.map((w) => (w.id === id ? { ...w, isMinimized: false } : w))
        );
        setFocusedWindowId(id);
    };

    const focusWindow = (id) => {
        setFocusedWindowId(id);
        setWindows((prev) => {
            const w = prev.find(win => win.id === id);
            if (!w) return prev;
            const others = prev.filter(win => win.id !== id);
            return [...others, w];
        });
    };

    const resizeWindow = (id, width, height) => {
        setWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, size: { width, height } } : w))
        );
    };

    const getFocusedWindow = () => {
        return windows.find(w => w.id === focusedWindowId);
    };

    // Spotlight State
    const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
    const toggleSpotlight = () => setIsSpotlightOpen(!isSpotlightOpen);

    return (
        <OSContext.Provider
            value={{
                windows,
                focusedWindowId,
                launchApp,
                closeWindow,
                minimizeWindow,
                restoreWindow,
                focusWindow,
                resizeWindow,
                getFocusedWindow,
                volume, setVolume,
                brightness, setBrightness,
                wifi, setWifi,
                bluetooth, setBluetooth,
                themeColor, setThemeColor,
                isSpotlightOpen, toggleSpotlight, setIsSpotlightOpen,
                isPlaying, setIsPlaying,
                currentTrack, playlist,
                progress, setProgress, formatTime,
                nextTrack, prevTrack, playTrack,

                installedApps
            }}
        >
            {children}
        </OSContext.Provider>
    );
};
