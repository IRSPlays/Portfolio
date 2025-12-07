import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaPaperPlane, FaDiscord } from 'react-icons/fa';

const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSent(true);
        setTimeout(() => setIsSent(false), 3000);
    };

    return (
        <div style={{ padding: '30px', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Get in Touch</h2>
                    <p style={{ color: '#aaa' }}>Have a project in mind or just want to say hi?</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }}
                    />
                    <textarea
                        placeholder="Message"
                        rows={4}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none', resize: 'none' }}
                    />
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: 'none',
                            background: isSent ? '#27c93f' : '#007bff',
                            color: 'white',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}
                    >
                        {isSent ? 'Sent!' : <><FaPaperPlane /> Send Message</>}
                    </motion.button>
                </form>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                    <motion.a
                        href="https://github.com/IRSPlays"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -3, color: '#fff' }}
                        style={{ color: '#aaa', fontSize: '1.5rem', transition: 'color 0.2s' }}
                        title="GitHub"
                    >
                        <FaGithub />
                    </motion.a>
                    <motion.a
                        href="#"
                        whileHover={{ y: -3, color: '#fff' }}
                        style={{ color: '#aaa', fontSize: '1.5rem', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '5px' }}
                        title="Discord: IRS.Tech"
                        onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText("IRS.Tech"); alert("Discord Username copied!"); }}
                    >
                        <FaDiscord />
                    </motion.a>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;
