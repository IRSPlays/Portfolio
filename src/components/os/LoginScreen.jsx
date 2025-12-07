import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const LoginScreen = ({ onLogin }) => {
    const [time, setTime] = useState(new Date());
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleLogin = () => {
        onLogin();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100, transition: { duration: 0.5 } }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 2000,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                backdropFilter: 'blur(10px)',
                background: 'rgba(0,0,0,0.2)'
            }}
            onClick={() => setShowPassword(true)}
        >
            {!showPassword ? (
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    style={{ textAlign: 'center', cursor: 'pointer' }}
                >
                    <h1 style={{ fontSize: '6rem', fontWeight: 200, margin: 0 }}>
                        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                    </h1>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 400, marginTop: '10px' }}>
                        {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                    </h2>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#ccc', overflow: 'hidden', border: '3px solid rgba(255,255,255,0.5)' }}>
                        {/* Placeholder for user avatar */}
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #007bff, #00ff99)' }} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem' }}>Guest User</h2>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            onClick={handleLogin}
                            style={{
                                padding: '10px 30px',
                                borderRadius: '20px',
                                border: 'none',
                                background: 'rgba(255,255,255,0.2)',
                                color: '#fff',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                backdropFilter: 'blur(10px)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                transition: 'background 0.2s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                        >
                            Sign In <FaArrowRight />
                        </button>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default LoginScreen;
