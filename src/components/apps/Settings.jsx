import React from 'react';
import { motion } from 'framer-motion';
import { useOS } from '../../context/OSContext';
import { FaWifi, FaBluetooth, FaVolumeUp, FaSun, FaPalette, FaDesktop } from 'react-icons/fa';

const Settings = () => {
    const {
        volume, setVolume,
        brightness, setBrightness,
        wifi, setWifi,
        bluetooth, setBluetooth,
        themeColor, setThemeColor
    } = useOS();

    const Section = ({ title, icon, children }) => (
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px', marginBottom: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                {icon}
                <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>{title}</h3>
            </div>
            {children}
        </div>
    );

    const Toggle = ({ label, value, onChange }) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span>{label}</span>
            <div
                onClick={() => onChange(!value)}
                style={{
                    width: '44px', height: '24px', background: value ? '#007bff' : '#3a3a3a',
                    borderRadius: '12px', position: 'relative', cursor: 'pointer', transition: 'background 0.3s'
                }}
            >
                <motion.div
                    animate={{ x: value ? 20 : 2 }}
                    style={{
                        width: '20px', height: '20px',
                        background: '#fff', borderRadius: '50%',
                        position: 'absolute', top: '2px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                    }}
                />
            </div>
        </div>
    );

    return (
        <div style={{ padding: '20px', height: '100%', color: '#fff', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: '25px', fontSize: '1.5rem' }}>System Preferences</h2>

            <Section title="Connectivity" icon={<FaWifi />}>
                <Toggle label="Wi-Fi" value={wifi} onChange={setWifi} />
                <Toggle label="Bluetooth" value={bluetooth} onChange={setBluetooth} />
            </Section>

            <Section title="Display & Sound" icon={<FaSun />}>
                <div style={{ marginBottom: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><FaVolumeUp size={12} /> Volume</span>
                        <span>{volume}%</span>
                    </div>
                    <input
                        type="range"
                        min="0" max="100"
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        style={{ width: '100%', accentColor: '#007bff', height: '4px', borderRadius: '2px' }}
                    />
                </div>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><FaSun size={12} /> Brightness</span>
                        <span>{brightness}%</span>
                    </div>
                    <input
                        type="range"
                        min="20" max="100"
                        value={brightness}
                        onChange={(e) => setBrightness(e.target.value)}
                        style={{ width: '100%', accentColor: '#007bff', height: '4px', borderRadius: '2px' }}
                    />
                </div>
            </Section>

            <Section title="Personalization" icon={<FaPalette />}>
                <div style={{ marginBottom: '10px' }}>Accent Color</div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {['#007bff', '#ff0055', '#00ccff', '#00ff99', '#ffcc00', '#9900ff', '#ff5722', '#795548'].map(color => (
                        <motion.div
                            key={color}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setThemeColor(color)}
                            style={{
                                width: '32px', height: '32px', borderRadius: '50%', background: color,
                                cursor: 'pointer', border: themeColor === color ? '3px solid white' : '1px solid rgba(255,255,255,0.2)',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                            }}
                        />
                    ))}
                </div>
            </Section>

            <Section title="About" icon={<FaDesktop />}>
                <div style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#ccc' }}>
                    <strong>HaziqOS</strong><br />
                    Version 1.2.0 (Ultimate Edition)<br />
                    Built with React, Three.js, & Framer Motion
                </div>
            </Section>
        </div>
    );
};

export default Settings;
