import React, { useRef, useState, useEffect } from 'react';
import { motion, useDragControls, useAnimation } from 'framer-motion';
import { useOS } from '../../context/OSContext';

const Window = ({ window: winData }) => {
    // Safety check for window data
    if (!winData || !winData.size) return null;

    const { closeWindow, minimizeWindow, focusWindow, resizeWindow } = useOS();
    const dragControls = useDragControls();
    const [isResizing, setIsResizing] = useState(false);
    const ghostRef = useRef(null);
    const windowRef = useRef(null);
    const controls = useAnimation();

    // Effect to trigger blur animation when window size changes (resize commit)
    useEffect(() => {
        controls.start({
            width: winData.size.width,
            height: winData.size.height,
            scale: 1,   // Ensure window is visible
            opacity: 1, // Ensure window is visible
            filter: ["blur(10px)", "blur(0px)"], // Blur flash on resize
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                filter: { duration: 0.4 }
            }
        });
    }, [winData.size.width, winData.size.height, controls]);


    const handleResizeStart = (e) => {
        e.stopPropagation();
        e.preventDefault();

        // Start resizing state
        setIsResizing(true);

        // Initial setup for drag math
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = winData.size.width;
        const startHeight = winData.size.height;

        // Immediately set ghost dimensions to current window
        if (ghostRef.current) {
            ghostRef.current.style.width = `${startWidth}px`;
            ghostRef.current.style.height = `${startHeight}px`;
        }

        const handleMouseMove = (moveEvent) => {
            if (!ghostRef.current) return;

            // Direct DOM update on the GHOST element (super fast)
            const newWidth = Math.max(300, startWidth + (moveEvent.clientX - startX));
            const newHeight = Math.max(200, startHeight + (moveEvent.clientY - startY));

            ghostRef.current.style.width = `${newWidth}px`;
            ghostRef.current.style.height = `${newHeight}px`;
        };

        const handleMouseUp = (upEvent) => {
            // Commit the change
            const finalWidth = Math.max(300, startWidth + (upEvent.clientX - startX));
            const finalHeight = Math.max(200, startHeight + (upEvent.clientY - startY));

            resizeWindow(winData.id, finalWidth, finalHeight);
            setIsResizing(false);

            document.removeEventListener('pointermove', handleMouseMove);
            document.removeEventListener('pointerup', handleMouseUp);
        };

        document.addEventListener('pointermove', handleMouseMove);
        document.addEventListener('pointerup', handleMouseUp);
    };

    if (winData.isMinimized) return null;

    return (
        <>
            {/* The Actual Window */}
            <motion.div
                ref={windowRef}
                drag={!isResizing} // Disable dragging while resizing
                dragListener={false}
                dragControls={dragControls}
                dragConstraints={{
                    left: 0,
                    right: window.innerWidth,
                    top: 0,
                    bottom: window.innerHeight
                }}
                dragMomentum={false}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={controls} // Controlled animation for size & blur
                exit={{ scale: 0.8, opacity: 0 }}
                onPointerDown={() => focusWindow(winData.id)}
                style={{
                    position: 'absolute',
                    top: winData.position.y,
                    left: winData.position.x,
                    width: winData.size.width,
                    height: winData.size.height,
                    zIndex: winData.zIndex,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    pointerEvents: 'auto'
                }}
            >
                {/* Window Header */}
                <div
                    className="window-header"
                    onPointerDown={(e) => {
                        if (!isResizing) dragControls.start(e);
                    }}
                    style={{
                        height: '30px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 10px',
                        cursor: 'grab',
                        justifyContent: 'space-between',
                    }}
                >
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <div
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => { e.stopPropagation(); closeWindow(winData.id); }}
                            style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56', cursor: 'pointer' }}
                        />
                        <div
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => { e.stopPropagation(); minimizeWindow(winData.id); }}
                            style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e', cursor: 'pointer' }}
                        />
                        <div
                            onPointerDown={(e) => e.stopPropagation()}
                            style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f', cursor: 'pointer' }}
                        />
                    </div>
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{winData.title}</span>
                    <div style={{ width: '40px' }}></div> {/* Spacer for centering */}
                </div>

                {/* Window Content */}
                <div style={{ flex: 1, overflow: 'auto', padding: '0', color: '#fff', position: 'relative' }}>
                    {winData.component ? <winData.component /> : <div>Content for {winData.title}</div>}
                </div>

                {/* Visible Resize Handle Trigger Area */}
                <div
                    onPointerDown={handleResizeStart}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: '20px',
                        height: '20px',
                        cursor: 'nwse-resize',
                        zIndex: 20
                    }}
                >
                    {/* Triangle visual */}
                    <svg viewBox="0 0 10 10" style={{ width: '100%', height: '100%', fill: 'rgba(255,255,255,0.4)' }}>
                        <path d="M10 10 L10 4 L4 10 Z" />
                    </svg>
                </div>
            </motion.div>

            {/* Ghost Overlay - Displayed only during resize */}
            <div
                ref={ghostRef}
                style={{
                    display: isResizing ? 'block' : 'none',
                    position: 'absolute',
                    top: winData.position.y,
                    left: winData.position.x,
                    zIndex: winData.zIndex + 1, // On top of actual window
                    backgroundColor: 'rgba(0, 123, 255, 0.2)', // Light blue solid
                    border: '2px solid #007bff', // Blue outline
                    borderRadius: '12px',
                    pointerEvents: 'none', // Let mouse clicks tickle the drag handle underneath if needed (though handle captures pointer)
                }}
            />
        </>
    );
};

export default Window;
