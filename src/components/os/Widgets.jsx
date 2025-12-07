import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCloudSun, FaCalendarAlt, FaMapMarkerAlt, FaWind, FaTint } from 'react-icons/fa';
import { useOS } from '../../context/OSContext';
import '../../styles/visualizer.css';

const WidgetContainer = ({ children, details }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, x: -10 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '15px',
                color: '#fff',
                width: '160px',
                height: '160px', // Fixed height for consistency
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'default',
                position: 'relative',
                overflow: 'visible', // Allow popping out
                pointerEvents: 'auto'
            }}
        >
            {children}

            <AnimatePresence>
                {isHovered && details && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: '170px', // Popped out to the left
                            width: '180px',
                            background: 'rgba(30, 30, 30, 0.9)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '16px',
                            padding: '15px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                            zIndex: 10
                        }}
                    >
                        {details}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const ClockWidget = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const details = (
        <div>
            <div style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: '5px' }}>World Time</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>New York</span>
                <span>{new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>London</span>
                <span>{new Date().toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' })}</span>
            </div>
        </div>
    );

    return (
        <WidgetContainer details={details}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <div style={{
                    width: '100px', height: '100px', border: '4px solid #fff', borderRadius: '50%', position: 'relative',
                    background: 'rgba(0,0,0,0.2)'
                }}>
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%', width: '4px', height: '30px', background: '#fff',
                        transformOrigin: 'bottom center', transform: `translate(-50%, -100%) rotate(${(time.getHours() % 12) * 30 + time.getMinutes() * 0.5}deg)`,
                        borderRadius: '2px'
                    }} />
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%', width: '3px', height: '40px', background: '#ccc',
                        transformOrigin: 'bottom center', transform: `translate(-50%, -100%) rotate(${time.getMinutes() * 6}deg)`,
                        borderRadius: '2px'
                    }} />
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%', width: '2px', height: '45px', background: '#ff3b30',
                        transformOrigin: 'bottom center', transform: `translate(-50%, -100%) rotate(${time.getSeconds() * 6}deg)`,
                        borderRadius: '1px'
                    }} />
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%', width: '8px', height: '8px', background: '#fff', borderRadius: '50%',
                        transform: 'translate(-50%, -50%)'
                    }} />
                </div>
            </div>
        </WidgetContainer>
    );
};

const WeatherWidget = () => {
    // Mock Data for Singapore
    const details = (
        <div>
            <div style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FaMapMarkerAlt /> Singapore, SG
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <FaTint size={12} color="#00ccff" />
                <span>Humidity: 82%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaWind size={12} color="#ddd" />
                <span>Wind: 12 km/h</span>
            </div>
        </div>
    );

    return (
        <WidgetContainer details={details}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <FaMapMarkerAlt size={10} /> Singapore
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: '300', margin: '5px 0' }}>31°</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: 'auto' }}>
                    <FaCloudSun size={20} color="#ffbd2e" />
                    <span style={{ fontSize: '0.9rem' }}>Partly Cloudy</span>
                </div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>H:33° L:26°</div>
            </div>
        </WidgetContainer>
    );
};

const CalendarWidget = () => {
    const date = new Date();

    const details = (
        <div>
            <div style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: '10px' }}>Up Next</div>
            <div style={{ borderLeft: '2px solid #ff3b30', paddingLeft: '10px', marginBottom: '10px' }}>
                <div style={{ fontWeight: 'bold' }}>Team Sync</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>14:00 - 15:00</div>
            </div>
            <div style={{ borderLeft: '2px solid #007bff', paddingLeft: '10px' }}>
                <div style={{ fontWeight: 'bold' }}>Deep Work</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>15:30 - 17:30</div>
            </div>
        </div>
    );

    return (
        <WidgetContainer details={details}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <div style={{ fontSize: '1rem', color: '#ff3b30', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div style={{ fontSize: '3.5rem', fontWeight: '300', lineHeight: 1 }}>
                    {date.getDate()}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '5px' }}>
                    No events today
                </div>
            </div>
        </WidgetContainer>
    );
};


const MusicWidget = () => {
    const { isPlaying, setIsPlaying, currentTrack, formatTime, progress } = useOS();

    // Mock bar heights for static look, animation handled by CSS
    const bars = [1, 2, 3, 4, 5, 6, 7, 8];

    const details = (
        <div style={{ padding: '5px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ width: '40px', height: '40px', background: `url(${currentTrack.cover}) center/cover`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                <div>
                    <div style={{ fontWeight: 'bold', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }}>{currentTrack.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#aaa' }}>{currentTrack.artist}</div>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ fontSize: '0.7rem', color: '#888' }}>
                    {formatTime ? `${formatTime(progress)} / ${formatTime(currentTrack.duration)}` : '0:00 / 0:00'}
                </div>
            </div>
        </div>
    );

    return (
        <WidgetContainer details={details}>
            <div
                onClick={() => setIsPlaying(!isPlaying)}
                style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '15px', cursor: 'pointer' }}
            >
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', height: '60px' }}>
                    {bars.map((i) => (
                        <div
                            key={i}
                            className={`visualizer-bar v-bar-${(i % 6) + 1}`}
                            style={{
                                animationPlayState: isPlaying ? 'running' : 'paused',
                                background: '#fff',
                                width: '6px'
                            }}
                        />
                    ))}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, opacity: 0.8 }}>
                    {isPlaying ? 'Now Playing' : 'Paused'}
                </div>
            </div>
        </WidgetContainer>
    );
};

const WidgetsWrapper = ({ children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', pointerEvents: 'auto' }}>
        {children}
    </div>
);

const Widgets = () => {
    // We need to import useOS here if it's not available in the scope, assuming it is imported at top
    // Wait, the file doesn't import useOS. I need to add it.
    return (
        <div style={{
            position: 'absolute',
            top: '50px',
            right: '25px', // Fixed placement
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            zIndex: 0,
            pointerEvents: 'none'
        }}>
            <WidgetsWrapper>
                <ClockWidget />
                <MusicWidget />
                <WeatherWidget />
                <CalendarWidget />
            </WidgetsWrapper>
        </div>
    );
};

export default Widgets;
