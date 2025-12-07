import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useOS } from '../../context/OSContext';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaHome, FaSearch, FaBook, FaHeart, FaPlus } from 'react-icons/fa';

const SidebarItem = ({ icon: Icon, label, isActive, onClick }) => (
    <div
        onClick={onClick}
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            padding: '10px 0',
            color: isActive ? '#fff' : '#b3b3b3',
            cursor: 'pointer',
            fontWeight: isActive ? 700 : 500,
            transition: 'color 0.2s'
        }}>
        <Icon size={20} />
        <span style={{ fontSize: '0.9rem' }}>{label}</span>
    </div>
);

const PlaylistItem = ({ title, artist, cover }) => (
    <div style={{
        background: '#181818',
        padding: '15px',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background 0.2s',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    }}
        onMouseOver={(e) => e.currentTarget.style.background = '#282828'}
        onMouseOut={(e) => e.currentTarget.style.background = '#181818'}
    >
        <div style={{
            width: '100%',
            aspectRatio: '1/1',
            background: `url(${cover}) center/cover no-repeat, linear-gradient(45deg, #1db954, #191414)`,
            borderRadius: '4px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
        }} />
        <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem', marginBottom: '5px' }}>{title}</div>
            <div style={{ color: '#b3b3b3', fontSize: '0.8rem' }}>{artist}</div>
        </div>
    </div>
);

const MusicPlayer = () => {
    const {
        isPlaying, setIsPlaying,
        currentTrack, playlist,
        progress, formatTime,
        nextTrack, prevTrack, playTrack
    } = useOS();

    const [activeTab, setActiveTab] = useState('home');

    // Views
    const HomeView = () => (
        <>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '20px' }}>Good Evening</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px', marginBottom: '40px' }}>
                <div style={{
                    gridColumn: '1 / -1',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    paddingRight: '20px',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                    onClick={() => setIsPlaying(!isPlaying)}
                >
                    <div style={{ width: '150px', height: '150px', background: `url(${currentTrack.cover}) center/cover`, boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }} />
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', color: '#ccc' }}>NOW PLAYING</div>
                        <h1 style={{ fontSize: '3rem', fontWeight: 900, margin: '5px 0' }}>{currentTrack.title}</h1>
                        <p style={{ fontSize: '1rem', color: '#ddd' }}>{currentTrack.artist}</p>
                    </div>
                </div>
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '20px' }}>Made For You</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
                <PlaylistItem title="Daily Mix 1" artist="M83, Kavinsky, Daft Punk" cover="https://upload.wikimedia.org/wikipedia/en/a/a7/Random_Access_Memories.jpg" />
                <PlaylistItem title="Focus Flow" artist="Instrumental, Lo-Fi" cover="https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png" />
            </div>
        </>
    );

    const SearchView = () => (
        <>
            <div style={{ marginBottom: '20px', position: 'relative' }}>
                <FaSearch style={{ position: 'absolute', left: '15px', top: '12px', color: '#333' }} />
                <input
                    type="text"
                    placeholder="What do you want to listen to?"
                    style={{
                        width: '100%',
                        padding: '10px 10px 10px 40px',
                        borderRadius: '20px',
                        border: 'none',
                        outline: 'none',
                        fontSize: '1rem'
                    }}
                />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '20px' }}>Browse All</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
                {['Pop', 'Hip-Hop', 'Indie', 'Rock', 'Electronic', 'Jazz'].map(genre => (
                    <div key={genre} style={{
                        height: '180px',
                        background: `linear-gradient(135deg, ${['#e1306c', '#5352ed', '#ff9f43', '#10ac84'][Math.floor(Math.random() * 4)]}, #000)`,
                        borderRadius: '8px',
                        padding: '20px',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                    }}>
                        {genre}
                    </div>
                ))}
            </div>
        </>
    );

    const LibraryView = () => (
        <>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '20px' }}>Your Library</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', color: '#b3b3b3' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid #282828', textAlign: 'left' }}>
                        <th style={{ padding: '10px' }}>#</th>
                        <th style={{ padding: '10px' }}>Title</th>
                        <th style={{ padding: '10px' }}>Album</th>
                        <th style={{ padding: '10px' }}><FaStepForward /></th> // Duration icon placeholder
                    </tr>
                </thead>
                <tbody>
                    {playlist.map((track, i) => (
                        <tr
                            key={i}
                            style={{ cursor: 'pointer', background: currentTrack.title === track.title ? 'rgba(255,255,255,0.1)' : 'transparent' }}
                            onClick={() => playTrack(i)}
                            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                            onMouseOut={(e) => e.currentTarget.style.background = currentTrack.title === track.title ? 'rgba(255,255,255,0.1)' : 'transparent'}
                        >
                            <td style={{ padding: '10px' }}>{i + 1}</td>
                            <td style={{ padding: '10px', color: '#fff' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <img src={track.cover} style={{ width: '40px', height: '40px', borderRadius: '4px' }} alt="" />
                                    <div>
                                        <div>{track.title}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#b3b3b3' }}>{track.artist}</div>
                                    </div>
                                </div>
                            </td>
                            <td style={{ padding: '10px' }}>Unknown Album</td>
                            <td style={{ padding: '10px' }}>{formatTime(track.duration)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );

    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: '#121212',
            color: '#fff',
            fontFamily: "'Inter', sans-serif"
        }}>
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                {/* Sidebar */}
                <div style={{
                    width: '200px',
                    background: '#000',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#fff', marginBottom: '10px' }}>
                        <div style={{ width: '24px', height: '24px', background: '#1db954', borderRadius: '50%' }} />
                        <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>Spotify</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <SidebarItem icon={FaHome} label="Home" isActive={activeTab === 'home'} onClick={() => setActiveTab('home')} />
                        <SidebarItem icon={FaSearch} label="Search" isActive={activeTab === 'search'} onClick={() => setActiveTab('search')} />
                        <SidebarItem icon={FaBook} label="Your Library" isActive={activeTab === 'library'} onClick={() => setActiveTab('library')} />
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <SidebarItem icon={FaPlus} label="Create Playlist" />
                        <SidebarItem icon={FaHeart} label="Liked Songs" />
                    </div>

                    <div style={{ borderTop: '1px solid #282828', marginTop: '10px', paddingTop: '10px', overflowY: 'auto', flex: 1 }}>
                        <p style={{ fontSize: '0.85rem', color: '#b3b3b3', margin: '5px 0' }}>Chill Vibes</p>
                        <p style={{ fontSize: '0.85rem', color: '#b3b3b3', margin: '5px 0' }}>Coding Focus</p>
                        <p style={{ fontSize: '0.85rem', color: '#b3b3b3', margin: '5px 0' }}>Synthwave Mix</p>
                    </div>
                </div>

                {/* Main Content Area */}
                <div style={{ flex: 1, padding: '20px', overflowY: 'auto', background: 'linear-gradient(180deg, #2c3e50 0%, #121212 40%)' }}>
                    {activeTab === 'home' && <HomeView />}
                    {activeTab === 'search' && <SearchView />}
                    {activeTab === 'library' && <LibraryView />}
                </div>
            </div>

            {/* Player Bar */}
            <div style={{
                height: '90px',
                background: '#181818',
                borderTop: '1px solid #282828',
                padding: '0 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                zIndex: 10
            }}>
                {/* Track Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '30%' }}>
                    <div style={{ width: '56px', height: '56px', background: `url(${currentTrack.cover}) center/cover`, borderRadius: '4px' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{currentTrack.title}</span>
                        <span style={{ fontSize: '0.75rem', color: '#b3b3b3' }}>{currentTrack.artist}</span>
                    </div>
                    <FaHeart size={16} color="#1db954" style={{ marginLeft: '10px' }} />
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40%', gap: '5px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <FaStepBackward size={16} color="#b3b3b3" onClick={prevTrack} style={{ cursor: 'pointer' }} />
                        <div
                            onClick={() => setIsPlaying(!isPlaying)}
                            style={{
                                width: '32px', height: '32px', borderRadius: '50%', background: '#fff',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                transition: 'transform 0.1s'
                            }}
                            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
                            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            {isPlaying ? <FaPause size={14} color="#000" /> : <FaPlay size={14} color="#000" style={{ marginLeft: '2px' }} />}
                        </div>
                        <FaStepForward size={16} color="#b3b3b3" onClick={nextTrack} style={{ cursor: 'pointer' }} />
                    </div>
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.7rem', color: '#b3b3b3' }}>
                        <span>{formatTime(progress)}</span>
                        <div style={{ flex: 1, height: '4px', background: '#5e5e5e', borderRadius: '2px', position: 'relative' }}>
                            <div style={{
                                width: `${(progress / currentTrack.duration) * 100}%`,
                                height: '100%',
                                background: '#fff',
                                borderRadius: '2px',
                                transition: 'width 1s linear'
                            }} />
                        </div>
                        <span>{formatTime(currentTrack.duration)}</span>
                    </div>
                </div>

                {/* Volume / Extra */}
                <div style={{ width: '30%', display: 'flex', justifyContent: 'flex-end' }}>
                    {/* Volume controls could go here, for now just a spacer */}
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
