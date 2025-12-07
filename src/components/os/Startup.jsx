import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Startup = ({ onComplete }) => {
    const [lines, setLines] = useState([]);
    const [showLogo, setShowLogo] = useState(false);

    useEffect(() => {
        const bootSequence = [
            'Initializing HaziqOS Kernel v1.0.0...',
            'Loading modules: [GPU] [AUDIO] [NET]...',
            'Mounting file system...',
            'Verifying integrity... OK',
            'Starting user interface service...',
            'Welcome, User.'
        ];

        let delay = 0;
        bootSequence.forEach((line, index) => {
            delay += Math.random() * 500 + 200;
            setTimeout(() => {
                setLines(prev => [...prev, line]);
                if (index === bootSequence.length - 1) {
                    setTimeout(() => setShowLogo(true), 800);
                }
            }, delay);
        });
    }, []);

    useEffect(() => {
        if (showLogo) {
            const timer = setTimeout(onComplete, 2500);
            return () => clearTimeout(timer);
        }
    }, [showLogo, onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: '#000',
                color: '#0f0',
                fontFamily: 'monospace',
                padding: '40px',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {!showLogo ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {lines.map((line, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            {`> ${line}`}
                        </motion.div>
                    ))}
                    <motion.div
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        style={{ width: '10px', height: '20px', background: '#0f0' }}
                    />
                </div>
            ) : (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, type: "spring" }}
                    style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff'
                    }}
                >
                    <img src="/src/assets/logo.png" alt="Haz.os Logo" style={{ width: '120px', height: '120px', marginBottom: '30px', filter: 'drop-shadow(0 0 20px rgba(0,242,255,0.5))' }} />
                    <h1 style={{ fontSize: '3rem', letterSpacing: '2px', background: 'linear-gradient(to right, #fff, #aaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Haz.os</h1>
                </motion.div>
            )}
        </motion.div>
    );
};

export default Startup;
