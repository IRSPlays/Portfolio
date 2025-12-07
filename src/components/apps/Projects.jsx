import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOS } from '../../context/OSContext';
import { FaGithub, FaExternalLinkAlt, FaRobot, FaBrain, FaCoffee } from 'react-icons/fa';

const projects = [
    {
        id: 'project-cortex',
        title: 'PROJECT-CORTEX',
        role: 'Lead Systems Architect',
        status: 'Active Development',
        description: 'Engineering an AI-powered wearable device to assist the visually impaired. Moving beyond basic accessibility, Cortex is designed to solve real-world navigation challenges.',
        tech: ['Python', 'Hardware', 'AI Models'],
        link: 'https://github.com/haziq/project-cortex',
        icon: FaBrain,
        color: '#00ff99',
        type: 'Flagship'
    },
    {
        id: 'kopitalk',
        title: 'KopiTalk',
        role: 'Founder',
        status: 'Archived',
        description: 'A project that served as a crucible for my development. While the outcome wasn\'t the original target, the data gathered here was critical for upgrading my approach to product management and team dynamics.',
        tech: ['Product Management', 'Team Dynamics'],
        link: 'https://github.com/haziq/kopitalk',
        icon: FaCoffee,
        color: '#ffbd2e',
        type: 'Renovation'
    },
    {
        id: 'robotics-cca',
        title: 'Robotics CCA',
        role: 'Robotics Engineer',
        status: 'Completed',
        description: 'A grueling engaging in competitive robotics. This experience taught me the difference between "winning" and "building correctly." It reinforced my philosophy of failing with honour rather than succeeding without substance.',
        tech: ['Robotics', 'Engineering', 'Strategy'],
        link: null,
        icon: FaRobot,
        color: '#ff5f56',
        type: 'Competition'
    }
];

const ProjectViewer = ({ project }) => (
    <div style={{
        padding: '30px',
        height: '100%',
        overflowY: 'auto',
        color: '#eee',
        background: `linear-gradient(180deg, ${project.color}11 0%, rgba(0,0,0,0) 100%)`
    }}>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '20px',
                    background: `${project.color}33`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${project.color}66`
                }}>
                    <project.icon size={40} color={project.color} />
                </div>
                <div>
                    <h1 style={{ margin: 0, fontSize: '2.5rem' }}>{project.title}</h1>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px', opacity: 0.8 }}>
                        <span style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem' }}>{project.role}</span>
                        <span style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem' }}>{project.status}</span>
                    </div>
                </div>
            </div>

            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '30px', maxWidth: '800px' }}>
                {project.description}
            </p>

            <div style={{ marginBottom: '40px' }}>
                <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '20px', color: '#aaa', fontSize: '0.9rem', textTransform: 'uppercase' }}>Tech Stack</h3>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {project.tech.map(t => (
                        <span key={t} style={{
                            padding: '8px 15px',
                            background: `${project.color}22`,
                            color: project.color,
                            borderRadius: '8px',
                            border: `1px solid ${project.color}44`
                        }}>
                            {t}
                        </span>
                    ))}
                </div>
            </div>

            {project.link && (
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: '#fff',
                        color: '#000',
                        padding: '12px 25px',
                        borderRadius: '30px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        fontSize: '1rem'
                    }}
                >
                    <FaGithub /> View Source <FaExternalLinkAlt size={12} />
                </a>
            )}
        </motion.div>
    </div>
);

const ProjectCard = ({ project, index }) => {
    const { launchApp } = useOS();

    const openProject = () => {
        launchApp(
            `project-${project.id}`,
            () => <ProjectViewer project={project} />,
            project.title,
            '🚀'
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.08)' }}
            onClick={openProject}
            style={{
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid rgba(255,255,255,0.05)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '4px',
                background: project.color
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{
                    padding: '10px',
                    background: `${project.color}22`,
                    borderRadius: '10px',
                    color: project.color
                }}>
                    <project.icon size={24} />
                </div>
                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.5, letterSpacing: '1px' }}>{project.type}</span>
            </div>

            <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '5px' }}>{project.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#aaa', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {project.description}
                </p>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                {project.tech.slice(0, 3).map(tag => (
                    <span key={tag} style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: '#ccc' }}>
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div >
    );
};

const Projects = () => {
    return (
        <div style={{ padding: '30px', height: '100%', overflowY: 'auto' }}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ marginBottom: '30px' }}
            >
                <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '10px' }}>Project Registry</h2>
                <p style={{ color: '#aaa', maxWidth: '600px' }}>
                    A collection of systems, renovations, and experiments. Click on any module to load full diagnostics.
                </p>
            </motion.div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '20px'
            }}>
                {projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
            </div>
        </div>
    );
};

export default Projects;
