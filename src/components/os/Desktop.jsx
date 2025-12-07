import React from 'react';
import { useOS } from '../../context/OSContext';
import Window from './Window';
import Dock from './Dock';

const Desktop = () => {
    const { windows } = useOS();

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative', pointerEvents: 'none', overflow: 'hidden' }}>
            {/* Windows Container */}
            <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
                {windows.map((window) => (
                    <Window key={window.id} window={window} />
                ))}
            </div>

            {/* Dock Container */}
            <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'auto', zIndex: 1000 }}>
                <Dock />
            </div>
        </div>
    );
};

export default Desktop;
