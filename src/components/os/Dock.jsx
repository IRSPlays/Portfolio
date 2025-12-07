import React from 'react';
import { motion } from 'framer-motion';
import { useOS } from '../../context/OSContext';
import { FaUser, FaCode, FaEnvelope, FaTerminal, FaCog, FaMusic } from 'react-icons/fa';
import About from '../apps/About';
import Projects from '../apps/Projects';
import Contact from '../apps/Contact';
import Terminal from '../apps/Terminal';
import Settings from '../apps/Settings';
import MusicPlayer from '../apps/MusicPlayer';

const DockItem = ({ icon: Icon, label, onClick }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.2, y: -10 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                margin: '0 5px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                position: 'relative',
            }}
        >
            <Icon size={24} color="#fff" />
            <span style={{
                position: 'absolute',
                bottom: '-30px',
                background: 'rgba(0,0,0,0.7)',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '10px',
                opacity: 0,
                pointerEvents: 'none',
                transition: 'opacity 0.2s',
            }} className="dock-tooltip">
                {label}
            </span>
        </motion.div>
    );
};

const Dock = () => {
    const { launchApp } = useOS();

    const apps = [
        { id: 'about', title: 'About Me', icon: FaUser, component: About },
        { id: 'projects', title: 'Projects', icon: FaCode, component: Projects },
        { id: 'contact', title: 'Contact', icon: FaEnvelope, component: Contact },
        { id: 'terminal', title: 'Terminal', icon: FaTerminal, component: Terminal },
        { id: 'settings', title: 'Settings', icon: FaCog, component: Settings },
        { id: 'music', title: 'Music', icon: FaMusic, component: MusicPlayer },
    ];

    return (
        <div
            style={{
                display: 'flex',
                padding: '12px 15px',
                background: 'rgba(200, 200, 200, 0.1)',
                backdropFilter: 'blur(25px) saturate(120%)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
                gap: '8px'
            }}
        >
            {apps.map((app) => (
                <DockItem
                    key={app.id}
                    icon={app.icon}
                    label={app.title}
                    onClick={() => launchApp(app.id, app.component, app.title, app.icon)}
                />
            ))}
        </div>
    );
};

export default Dock;
