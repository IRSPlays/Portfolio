import React, { useState, useEffect, useRef } from 'react';
import { useOS } from '../../context/OSContext';

const Terminal = () => {
    const { launchApp, windows, installedApps } = useOS();
    const [history, setHistory] = useState([
        { type: 'output', content: 'Welcome to HaziqOS v1.0.0' },
        { type: 'output', content: 'Type "help" for a list of commands.' },
    ]);
    const [input, setInput] = useState('');
    const inputRef = useRef(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
        if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = (cmd) => {
        const args = cmd.trim().split(' ');
        const command = args[0].toLowerCase();

        let output = '';

        switch (command) {
            case 'help':
                output = 'Available commands:\n  help     - Show this help message\n  clear    - Clear terminal history\n  ls       - List available apps\n  open <app> - Open an application (e.g., "open about")\n  whoami   - Display current user\n  date     - Show current date and time';
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'ls':
                output = 'about\nprojects\ncontact\nsettings\nmusic';
                break;
            case 'whoami':
                output = 'guest@haziq-portfolio';
                break;
            case 'date':
                output = new Date().toString();
                break;
            case 'open':
                if (args[1]) {
                    const appName = args[1].toLowerCase();
                    const app = installedApps[appName];

                    if (app) {
                        launchApp(app.id, app.component, app.title, app.icon);
                        output = `Launching ${app.title}...`;
                    } else {
                        output = `App "${appName}" not found. Available apps: ${Object.keys(installedApps).join(', ')}`;
                    }
                } else {
                    output = 'Usage: open <app_name>';
                }
                break;
            case '':
                break;
            default:
                output = `Command not found: ${command}`;
        }

        if (output) {
            setHistory(prev => [...prev, { type: 'input', content: cmd }, { type: 'output', content: output }]);
        } else if (cmd) {
            setHistory(prev => [...prev, { type: 'input', content: cmd }]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        }
    };

    return (
        <div
            onClick={() => inputRef.current && inputRef.current.focus()}
            style={{
                height: '100%',
                background: '#1e1e1e',
                color: '#00ff00',
                fontFamily: 'monospace',
                padding: '10px',
                overflowY: 'auto',
                fontSize: '14px'
            }}
        >
            {history.map((line, i) => (
                <div key={i} style={{ marginBottom: '5px', whiteSpace: 'pre-wrap' }}>
                    {line.type === 'input' ? (
                        <span><span style={{ color: '#00bfff' }}>guest@haziq-portfolio:~$</span> {line.content}</span>
                    ) : (
                        <span style={{ color: '#ccc' }}>{line.content}</span>
                    )}
                </div>
            ))}
            <div style={{ display: 'flex' }}>
                <span style={{ color: '#00bfff', marginRight: '8px' }}>guest@haziq-portfolio:~$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#fff',
                        outline: 'none',
                        flex: 1,
                        fontFamily: 'monospace',
                        fontSize: '14px'
                    }}
                    autoFocus
                />
            </div>
            <div ref={bottomRef} />
        </div>
    );
};

export default Terminal;
