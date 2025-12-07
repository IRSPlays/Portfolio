import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ title, children, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        style={{ marginBottom: '30px' }}
    >
        <h2 style={{
            fontSize: '1rem',
            color: '#888',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '15px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            paddingBottom: '5px'
        }}>
            [{title}]
        </h2>
        {children}
    </motion.div>
);

const About = () => {
    return (
        <div style={{
            padding: '40px',
            height: '100%',
            overflowY: 'auto',
            color: '#eee',
            fontFamily: "'Inter', sans-serif",
            lineHeight: '1.6'
        }}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ marginBottom: '40px', borderLeft: '4px solid #007bff', paddingLeft: '20px' }}
            >
                <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 700 }}>SYSTEM IDENTITY: HAZIQ</h1>
                <div style={{ display: 'flex', gap: '15px', marginTop: '10px', fontSize: '0.9rem', color: '#aaa' }}>
                    <span>&gt; ROLE: Student Founder | Systems Architect</span>
                    <span>&gt; STATUS: <span style={{ color: '#00ff00' }}>Online</span></span>
                </div>
            </motion.div>

            {/* Who Am I */}
            <Section title="WHO_AM_I" delay={0.2}>
                <p>
                    I am not just a coder; I am an architect of systems. In a world that often prioritizes "glazing" and ego-protection,
                    I operate on real data and radical transparency. I function as a "wise man" in the room—looking past surface-level
                    symptoms to identify the root causes of technical and character flaws.
                </p>
            </Section>

            {/* Core Kernel Philosophy */}
            <Section title="CORE_KERNEL_PHILOSOPHY" delay={0.3}>
                <p style={{ marginBottom: '15px' }}>
                    My operating system is built on a deep Growth Mindset. I do not believe in failure; I believe in "renovations."
                    Every setback is simply data I use to patch the system and improve the next iteration.
                </p>
                <blockquote style={{
                    borderLeft: '4px solid #ffbd2e',
                    margin: '20px 0',
                    paddingLeft: '20px',
                    fontStyle: 'italic',
                    color: '#fff',
                    background: 'rgba(255, 189, 46, 0.1)',
                    padding: '10px 20px',
                    borderRadius: '0 8px 8px 0'
                }}>
                    "Pain first, rest later."
                </blockquote>
                <p>
                    I don't build to win trophies. I build to solve genuine problems for real people. Whether it's dissecting complex
                    social dynamics or engineering hardware, I seek the honourable path—even if it's the hardest one.
                </p>
            </Section>

            {/* Skill Stack */}
            <Section title="SKILL_STACK" delay={0.4}>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {[
                        { name: 'Emotional Intelligence', desc: 'High-level pattern recognition in human behavior.' },
                        { name: 'Resilience', desc: 'Converting stress into structural integrity.' },
                        { name: 'Systems Thinking', desc: 'Viewing problems as interconnected loops, not isolated incidents.' }
                    ].map((skill, i) => (
                        <li key={i} style={{ marginBottom: '10px', display: 'flex', alignItems: 'baseline' }}>
                            <span style={{ color: '#007bff', fontWeight: 'bold', marginRight: '10px' }}>•</span>
                            <span><strong>{skill.name}:</strong> {skill.desc}</span>
                        </li>
                    ))}
                </ul>
            </Section>


            <div style={{ marginTop: '40px', fontSize: '0.8rem', color: '#555', textAlign: 'center' }}>
                SYSTEM IDENTITY VERIFIED • HAZIQ OS v1.0
            </div>
        </div>
    );
};

export default About;
