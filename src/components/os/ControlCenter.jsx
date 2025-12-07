import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOS } from '../../context/OSContext';
import { FaWifi, FaBluetooth, FaMoon, FaVolumeUp, FaSun, FaMusic } from 'react-icons/fa';

const ToggleButton = ({ active, onClick, icon: Icon, label, color = '#007bff' }) => (
    <div
        onClick={onClick}
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100px',
            height: '100px',
            background: active ? color : 'rgba(255,255,255,0.1)',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            color: active ? '#fff' : '#ccc'
        }}
    >
        <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Icon size={20} />
        </div>
        <span style={{ fontSize: '12px', fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: '10px', opacity: 0.7 }}>{active ? 'On' : 'Off'}</span>
    </div>
);

const Slider = ({ icon: Icon, value, onChange, max = 100 }) => (
    <div style={{
        width: '100%',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '12px',
        padding: '15px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
    }}>
        <div style={{ width: '30px', display: 'flex', justifyContent: 'center', color: '#ccc' }}>
            <Icon size={18} />
        </div>
        <div style={{ flex: 1, position: 'relative', height: '24px', display: 'flex', alignItems: 'center' }}>
            <div style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                height: '6px',
                width: '100%',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '3px',
                overflow: 'hidden'
            }}>
                <div style={{
                    width: `${(value / max) * 100}%`,
                    height: '100%',
                    background: '#fff'
                }} />
            </div>
            <input
                type="range"
                min="0"
                max={max}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer'
                }}
            />
        </div>
    </div>
);

const ControlCenter = ({ isOpen, onClose, triggerRef }) => {
    const {
        wifi, setWifi,
        bluetooth, setBluetooth,
        volume, setVolume,
        brightness, setBrightness,
        themeColor
    } = useOS();

    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                triggerRef.current &&
                !triggerRef.current.contains(event.target)
            ) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose, triggerRef]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={menuRef}
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    style={{
                        position: 'absolute',
                        top: '40px',
                        right: '10px',
                        width: '320px',
                        background: 'rgba(30,30,30,0.7)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        borderRadius: '16px',
                        padding: '15px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                        zIndex: 5001,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px'
                    }}
                >
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <ToggleButton
                                    active={wifi}
                                    onClick={() => setWifi(!wifi)}
                                    icon={FaWifi}
                                    label="Wi-Fi"
                                />
                                <ToggleButton
                                    active={bluetooth}
                                    onClick={() => setBluetooth(!bluetooth)}
                                    icon={FaBluetooth}
                                    label="Bluetooth"
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <Slider
                            icon={FaSun}
                            value={brightness}
                            onChange={setBrightness}
                        />
                        <Slider
                            icon={FaVolumeUp}
                            value={volume}
                            onChange={setVolume}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ControlCenter;
