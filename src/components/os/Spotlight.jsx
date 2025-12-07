import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import { useOS } from '../../context/OSContext';

const Spotlight = () => {
    const { isSpotlightOpen, setIsSpotlightOpen, launchApp, installedApps } = useOS();
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);

    const filteredApps = Object.values(installedApps).filter(app =>
        app.title.toLowerCase().includes(query.toLowerCase())
    );

    const handleLaunch = (app) => {
        launchApp(app.id);
        setIsSpotlightOpen(false);
        setQuery('');
        if (e.key === 'Escape') {
            setIsSpotlightOpen(false);
        }
    };

    if (!isSpotlightOpen) return null;

    return (
        <div
            style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                zIndex: 9999,
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '20vh',
                background: 'rgba(0,0,0,0.2)',
                backdropFilter: 'blur(2px)'
            }}
            onClick={() => setIsSpotlightOpen(false)}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                style={{
                    width: '600px',
                    maxWidth: '90%',
                    background: 'rgba(30, 30, 30, 0.85)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '15px 20px',
                    borderBottom: query ? '1px solid rgba(255,255,255,0.1)' : 'none'
                }}>
                    <FaSearch size={20} color="#aaa" style={{ marginRight: '15px' }} />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Spotlight Search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: '#fff',
                            fontSize: '1.5rem',
                            width: '100%',
                            fontWeight: 300
                        }}
                    />
                </div>

                {query && (
                    <div style={{ padding: '10px', maxHeight: '300px', overflowY: 'auto' }}>
                        {filteredApps.length > 0 ? (
                            filteredApps.map((app, index) => (
                                <div
                                    key={app.id}
                                    onClick={() => handleLaunch(app)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '10px 15px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        background: index === 0 ? 'rgba(0, 123, 255, 0.2)' : 'transparent',
                                        marginBottom: '5px'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                    onMouseOut={(e) => e.currentTarget.style.background = index === 0 ? 'rgba(0, 123, 255, 0.2)' : 'transparent'}
                                >
                                    <span style={{ fontSize: '1.5rem', marginRight: '15px' }}>{app.icon}</span>
                                    <span style={{ fontSize: '1.1rem', color: '#fff' }}>{app.title}</span>
                                    {index === 0 && <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#aaa' }}>Enter to open</span>}
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                                No results found
                            </div>
                        )}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Spotlight;
