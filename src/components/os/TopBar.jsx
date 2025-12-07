import React, { useState, useEffect, useRef } from 'react';
import { FaWifi, FaBatteryFull, FaSearch, FaApple, FaVolumeUp, FaBluetooth } from 'react-icons/fa';
import { useOS } from '../../context/OSContext';
import { motion, AnimatePresence } from 'framer-motion';
import About from '../apps/About';
import Terminal from '../apps/Terminal';
import Settings from '../apps/Settings';
import ControlCenter from './ControlCenter';
import '../../styles/visualizer.css';

const TopBar = () => {
    const [time, setTime] = useState(new Date());
    const {
        getFocusedWindow,
        wifi, setWifi,
        bluetooth, setBluetooth,
        volume, setVolume,
        launchApp,
        closeWindow,
        minimizeWindow,
        focusedWindowId,
        toggleSpotlight,
        isPlaying, setIsPlaying
    } = useOS();

    const focusedWindow = getFocusedWindow();
    const appName = focusedWindow ? focusedWindow.title : 'Finder';

    const [activeMenu, setActiveMenu] = useState(null);
    const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
    const menuRef = useRef(null);
    const controlCenterRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveMenu(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMenuAction = (action) => {
        setActiveMenu(null);
        switch (action) {
            case 'new_window':
                launchApp('terminal', Terminal, 'Terminal', '💻');
                break;
            case 'close_window':
                if (focusedWindowId) closeWindow(focusedWindowId);
                break;
            case 'minimize':
                if (focusedWindowId) minimizeWindow(focusedWindowId);
                break;
            case 'about':
                launchApp('about', About, 'About Me', '👤');
                break;
            case 'settings':
                launchApp('settings', Settings, 'Settings', '⚙️');
                break;
            case 'reload':
                window.location.reload();
                break;
            default:
                console.log('Unknown action:', action);
        }
    };

    const menuStructure = {
        File: [
            { label: 'New Window', action: 'new_window' },
            { label: 'Close Window', action: 'close_window' },
        ],
        Edit: [
            { label: 'Undo', action: 'undo' },
            { label: 'Redo', action: 'redo' },
            { label: 'Cut', action: 'cut' },
            { label: 'Copy', action: 'copy' },
            { label: 'Paste', action: 'paste' },
        ],
        View: [
            { label: 'Enter Full Screen', action: 'fullscreen' },
        ],
        Window: [
            { label: 'Minimize', action: 'minimize' },
            { label: 'Bring All to Front', action: 'front' },
        ],
        Help: [
            { label: 'HaziqOS Help', action: 'about' },
        ]
    };

    const handleMenuClick = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '30px',
            background: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            zIndex: 5000,
            color: '#fff',
            fontSize: '14px',
            fontWeight: 500,
            userSelect: 'none'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }} ref={menuRef}>
                <div
                    onClick={() => handleMenuAction('about')}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                    <FaApple size={16} />
                </div>
                <span style={{ fontWeight: 700 }}>{appName}</span>

                {Object.keys(menuStructure).map((menu) => (
                    <div key={menu} style={{ position: 'relative' }}>
                        <span
                            onClick={() => handleMenuClick(menu)}
                            style={{
                                cursor: 'pointer',
                                opacity: activeMenu === menu ? 1 : 0.8,
                                background: activeMenu === menu ? 'rgba(255,255,255,0.1)' : 'transparent',
                                padding: '2px 8px',
                                borderRadius: '4px'
                            }}
                        >
                            {menu}
                        </span>

                        <AnimatePresence>
                            {activeMenu === menu && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.1 }}
                                    style={{
                                        position: 'absolute',
                                        top: '25px',
                                        left: 0,
                                        background: 'rgba(30, 30, 30, 0.9)',
                                        backdropFilter: 'blur(10px)',
                                        borderRadius: '5px',
                                        padding: '5px 0',
                                        minWidth: '150px',
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}
                                >
                                    {menuStructure[menu].map((item, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                padding: '5px 15px',
                                                cursor: 'pointer',
                                                fontSize: '13px',
                                                color: '#eee',
                                                transition: 'background 0.2s'
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.background = '#007bff'}
                                            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                                            onClick={() => handleMenuAction(item.action)}
                                        >
                                            {item.label}
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            <div
                style={{ display: 'flex', alignItems: 'center', gap: '15px' }}
                ref={controlCenterRef}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div
                        onClick={() => setIsControlCenterOpen(!isControlCenterOpen)}
                        style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }}
                    >
                        <div
                            style={{ opacity: bluetooth ? 1 : 0.5 }}
                            title="Toggle Bluetooth"
                        >
                            <FaBluetooth size={14} />
                        </div>
                        <div
                            style={{ opacity: wifi ? 1 : 0.5 }}
                            title="Toggle Wi-Fi"
                        >
                            <FaWifi size={14} />
                        </div>
                        <div
                            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                            title="Volume"
                        >
                            <FaVolumeUp size={14} />
                            <span style={{ fontSize: '10px' }}>{volume}%</span>
                        </div>
                        <FaBatteryFull size={14} />

                        {/* Top Bar Visualizer */}
                        <div
                            style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '14px', cursor: 'pointer' }}
                            onClick={() => setIsPlaying(!isPlaying)}
                        >
                            {[1, 2, 3, 4].map(i => (
                                <div
                                    key={i}
                                    className={`visualizer-bar v-bar-${i}`}
                                    style={{
                                        width: '2px',
                                        height: '100%',
                                        background: isPlaying ? '#00ff00' : '#555',
                                        animationPlayState: isPlaying ? 'running' : 'paused'
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <div onClick={toggleSpotlight} style={{ cursor: 'pointer' }} title="Spotlight Search">
                        <FaSearch size={14} />
                    </div>
                    <div
                        onClick={() => setIsControlCenterOpen(!isControlCenterOpen)}
                        style={{ display: 'flex', gap: '10px', cursor: 'pointer' }}
                    >
                        <span>{time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                        <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                </div>

                <ControlCenter
                    isOpen={isControlCenterOpen}
                    onClose={() => setIsControlCenterOpen(false)}
                    triggerRef={controlCenterRef}
                />
            </div>
        </div>
    );
};

export default TopBar;
