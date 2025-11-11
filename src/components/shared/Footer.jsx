// src/components/shared/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; 
import { FaInstagram } from 'react-icons/fa'; 
import defaultUserPhoto from '../../assets/habit_icon.jpg'; 

const Footer = () => {
    const websiteName = "HabitTracker";
    const currentYear = new Date().getFullYear();

    // Define a common transition style for reuse
    const transitionStyle = { transition: 'color 0.3s ease-in-out' };
    const hoverLinkStyle = { color: '#8b5cf6' }; // Tailwind's purple-500 equivalent

    // Helper function for link styles
    const getLinkStyle = (baseColor) => ({
        color: baseColor,
        fontSize: '0.875rem',
        textDecoration: 'none',
        ...transitionStyle,
    });

    // Helper function for social icon styles (MOVED HERE TO FIX SYNTAX ERROR)
    const socialIconStyle = (color) => ({
        width: '40px', 
        height: '40px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: '50%', 
        backgroundColor: '#f3f4f6', 
        color: color, 
        textDecoration: 'none',
        transition: 'all 0.3s ease-in-out', // Transition for both color and background
    });

    return (
        <footer style={{ backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb', paddingTop: '3rem', paddingBottom: '3rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '1rem', paddingRight: '1rem' }}>
                
                {/* Main Footer Grid - 4 columns */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '3rem' }}>

                    {/* Column 1: Logo, Name, and Description */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                            <img 
                                src={defaultUserPhoto} 
                                alt="HabitTracker Logo" 
                                style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} 
                            />
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', margin: 0 }}>{websiteName}</h3>
                        </div>
                        <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.6', margin: 0 }}>
                            Build streaks & boost productivity through consistent daily habits.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', margin: 0 }}>Quick Links</h4>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <Link to="/" 
                                style={getLinkStyle('#4b5563')}
                                onMouseEnter={e => e.currentTarget.style.color = hoverLinkStyle.color}
                                onMouseLeave={e => e.currentTarget.style.color = getLinkStyle('#4b5563').color}
                            >Home</Link>
                            <Link to="/browse" 
                                style={getLinkStyle('#4b5563')}
                                onMouseEnter={e => e.currentTarget.style.color = hoverLinkStyle.color}
                                onMouseLeave={e => e.currentTarget.style.color = getLinkStyle('#4b5563').color}
                            >Browse Habits</Link>
                            <Link to="/login" 
                                style={getLinkStyle('#4b5563')}
                                onMouseEnter={e => e.currentTarget.style.color = hoverLinkStyle.color}
                                onMouseLeave={e => e.currentTarget.style.color = getLinkStyle('#4b5563').color}
                            >Login</Link>
                            <Link to="/register" 
                                style={getLinkStyle('#4b5563')}
                                onMouseEnter={e => e.currentTarget.style.color = hoverLinkStyle.color}
                                onMouseLeave={e => e.currentTarget.style.color = getLinkStyle('#4b5563').color}
                            >Sign Up</Link>
                        </nav>
                    </div>
                    
                    {/* Column 3: Contact */}
                    <div>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', margin: 0 }}>Contact</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div 
                                style={{ display: 'flex', alignItems: 'center', color: '#4b5563', fontSize: '0.875rem', ...transitionStyle }}
                                onMouseEnter={e => e.currentTarget.style.color = hoverLinkStyle.color}
                                onMouseLeave={e => e.currentTarget.style.color = '#4b5563'}
                            >
                                <FaEnvelope style={{ marginRight: '0.5rem', color: '#6b7280' }} />
                                <span>support@habittracker.com</span>
                            </div>
                            <Link to="/terms" 
                                style={getLinkStyle('#4b5563')}
                                onMouseEnter={e => e.currentTarget.style.color = hoverLinkStyle.color}
                                onMouseLeave={e => e.currentTarget.style.color = getLinkStyle('#4b5563').color}
                            >Terms & Conditions</Link>
                            <Link to="/privacy" 
                                style={getLinkStyle('#4b5563')}
                                onMouseEnter={e => e.currentTarget.style.color = hoverLinkStyle.color}
                                onMouseLeave={e => e.currentTarget.style.color = getLinkStyle('#4b5563').color}
                            >Privacy Policy</Link>
                        </div>
                    </div>

                    {/* Column 4: Follow Us (Social) */}
                    <div className="space-y-4">
                        <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', margin: 0 }}>Follow Us</h4>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            
                            <a 
                                href="#" 
                                aria-label="Facebook" 
                                style={socialIconStyle('#4b5563')}
                                onMouseEnter={e => { e.currentTarget.style.backgroundColor = hoverLinkStyle.color; e.currentTarget.style.color = '#ffffff'; }}
                                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#f3f4f6'; e.currentTarget.style.color = '#4b5563'; }}
                            >
                                <FaFacebookF size={16} />
                            </a>
                            <a 
                                href="#" 
                                aria-label="X (Twitter)" 
                                style={socialIconStyle('#4b5563')}
                                onMouseEnter={e => { e.currentTarget.style.backgroundColor = hoverLinkStyle.color; e.currentTarget.style.color = '#ffffff'; }}
                                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#f3f4f6'; e.currentTarget.style.color = '#4b5563'; }}
                            >
                                <FaXTwitter size={16} />
                            </a>
                            <a 
                                href="#" 
                                aria-label="Instagram" 
                                style={socialIconStyle('#4b5563')}
                                onMouseEnter={e => { e.currentTarget.style.backgroundColor = hoverLinkStyle.color; e.currentTarget.style.color = '#ffffff'; }}
                                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#f3f4f6'; e.currentTarget.style.color = '#4b5563'; }}
                            >
                                <FaInstagram size={16} />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Copyright Section */}
                <div style={{ textAlign: 'center', borderTop: '1px solid #e5e7eb', marginTop: '2.5rem', paddingTop: '2rem' }}>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                        &copy; {currentYear} {websiteName}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;