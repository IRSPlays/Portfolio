import React from 'react';
import { motion } from 'framer-motion';

const ContextMenu = ({ x, y, onClose }) => {
    const menuItems = [
        { label: 'Change Wallpaper', action: () => alert('Wallpaper settings coming soon!') },
        { label: 'Refresh', action: () => window.location.reload() },
        { label: 'New Folder', action: () => console.log('New Folder') },
        { label: 'Properties', action: () => console.log('Properties') },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
                position: 'absolute',
                top: y,
                left: x,
                width: '200px',
                background: 'rgba(30, 30, 30, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: '8px',
                padding: '5px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                zIndex: 9999,
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px'
            }}
            onClick={(e) => e.stopPropagation()}
        >
            {menuItems.map((item, index) => (
                <div
                    key={index}
                    onClick={() => { item.action(); onClose(); }}
                    style={{
                        padding: '8px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        color: '#fff',
                        fontSize: '14px',
                        transition: 'background 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#007bff'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                    {item.label}
                </div>
            ))}
        </motion.div>
    );
};

export default ContextMenu;
