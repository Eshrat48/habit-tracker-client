// src/components/shared/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; 
import { FaInstagram } from 'react-icons/fa'; 
import defaultUserPhoto from '../../assets/habit_icon.jpg'; 
import useTheme from '../../hooks/useTheme';

const Footer = () => {
    const { theme } = useTheme(); 
    const websiteName = "HabitTracker";
    const currentYear = new Date().getFullYear();

    // Dark mode colors
    const darkBg = '#1f2937'; 
    const darkText = '#d1d5db'; 
    const darkHeading = '#f9fafb';
    const darkBorder = '#374151';
    const darkSocialBg = '#374151'; 

    // Light mode colors (Originals)
    const lightBg = '#f9fafb'; 
    const lightText = '#6b7280'; 
    const lightHeading = '#111827'; 
    const lightBorder = '#e5e7eb'; 
    const lightSocialBg = '#f3f4f6';

    // Determine current colors based on theme
    const footerBg = theme === 'light' ? lightBg : darkBg;
    const footerBorder = theme === 'light' ? lightBorder : darkBorder;
    const baseTextColor = theme === 'light' ? lightText : darkText;
    const headingColor = theme === 'light' ? lightHeading : darkHeading;
    const socialIconBaseColor = theme === 'light' ? lightText : darkText;
    const socialBgColor = theme === 'light' ? lightSocialBg : darkSocialBg;
    
    const hoverLinkColor = '#8b5cf6'; 

    const transitionStyle = { transition: 'color 0.3s ease-in-out' };
    
    // function for link styles
    const getLinkStyle = (color) => ({
        color: color,
        fontSize: '0.875rem',
        textDecoration: 'none',
        ...transitionStyle,
    });

    // function for social icon styles
    const socialIconStyle = (color, bgColor) => ({
        width: '40px', 
        height: '40px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: '50%', 
        backgroundColor: bgColor, 
        color: color, 
        textDecoration: 'none',
        transition: 'all 0.3s ease-in-out', 
    });

    return (
        <footer style={{ 
            backgroundColor: footerBg, 
            borderTop: `1px solid ${footerBorder}`, 
            paddingTop: '3rem', 
            paddingBottom: '3rem' 
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '1rem', paddingRight: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '3rem' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                            <img
                            src={defaultUserPhoto}
                            alt="HabitTracker Logo" 
                            style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: headingColor, margin: 0 }}>{websiteName}</h3>
                            </div>
                            <p style={{ color: baseTextColor, fontSize: '0.875rem', lineHeight: '1.6', margin: 0 }}>
                                Build streaks & boost productivity through consistent daily habits.
                            </p>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: headingColor, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', margin: 0 }}>Quick Links</h4>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <Link 
                                to="/" 
                                style={getLinkStyle(baseTextColor)}
                                onMouseEnter={e => e.currentTarget.style.color = hoverLinkColor}
                                onMouseLeave={e => e.currentTarget.style.color = baseTextColor}
                            >Home</Link>
                            <Link 
                                to="/browse" 
                                style={getLinkStyle(baseTextColor)}
                                onMouseEnter={e => e.currentTarget.style.color = hoverLinkColor}
                                onMouseLeave={e => e.currentTarget.style.color = baseTextColor}
                            >Browse Habits</Link>
                            <Link 
                                to="/login" 
                                style={getLinkStyle(baseTextColor)}
                                onMouseEnter={e => e.currentTarget.style.color = hoverLinkColor}
                                onMouseLeave={e => e.currentTarget.style.color = baseTextColor}
                            >Login</Link>
                            <Link 
                                to="/register" 
                                style={getLinkStyle(baseTextColor)}
                                onMouseEnter={e => e.currentTarget.style.color = hoverLinkColor}
                                onMouseLeave={e => e.currentTarget.style.color = baseTextColor}
                            >Sign Up</Link>
                        </nav>
                    </div>
                    
                    <div>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: headingColor, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', margin: 0 }}>Contact</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div 
                                style={{ display: 'flex', alignItems: 'center', color: baseTextColor, fontSize: '0.875rem', ...transitionStyle }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.color = hoverLinkColor;
                                    e.currentTarget.querySelector('svg').style.color = hoverLinkColor; 
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.color = baseTextColor;
                                    e.currentTarget.querySelector('svg').style.color = baseTextColor; 
                                }}
                            >
                                <FaEnvelope style={{ marginRight: '0.5rem', color: baseTextColor, transition: 'color 0.3s ease-in-out' }} />
                                <span>support@habittracker.com</span>
                            </div>
                            <Link 
                                to="/about" 
                                style={getLinkStyle(baseTextColor)}
                                onMouseEnter={e => e.currentTarget.style.color = hoverLinkColor}
                                onMouseLeave={e => e.currentTarget.style.color = baseTextColor}
                            >About Us</Link>
                            <Link 
                                to="/contact" 
                                style={getLinkStyle(baseTextColor)}
                                onMouseEnter={e => e.currentTarget.style.color = hoverLinkColor}
                                onMouseLeave={e => e.currentTarget.style.color = baseTextColor}
                            >Contact Us</Link>
                            <Link 
                                to="/privacy-terms" 
                                style={getLinkStyle(baseTextColor)}
                                onMouseEnter={e => e.currentTarget.style.color = hoverLinkColor}
                                onMouseLeave={e => e.currentTarget.style.color = baseTextColor}
                            >Privacy & Terms</Link>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: headingColor, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', margin: 0 }}>Follow Us</h4>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            
                            <a 
                                href="#" 
                                aria-label="Facebook" 
                                style={socialIconStyle(socialIconBaseColor, socialBgColor)}
                                onMouseEnter={e => { e.currentTarget.style.backgroundColor = hoverLinkColor; e.currentTarget.style.color = '#ffffff'; }}
                                onMouseLeave={e => { e.currentTarget.style.backgroundColor = socialBgColor; e.currentTarget.style.color = socialIconBaseColor; }}
                            >
                                <FaFacebookF size={16} />
                            </a>
                            <a 
                                href="#" 
                                aria-label="X (Twitter)" 
                                style={socialIconStyle(socialIconBaseColor, socialBgColor)}
                                onMouseEnter={e => { e.currentTarget.style.backgroundColor = hoverLinkColor; e.currentTarget.style.color = '#ffffff'; }}
                                onMouseLeave={e => { e.currentTarget.style.backgroundColor = socialBgColor; e.currentTarget.style.color = socialIconBaseColor; }}
                            >
                                <FaXTwitter size={16} />
                            </a>
                            <a 
                                href="#" 
                                aria-label="Instagram" 
                                style={socialIconStyle(socialIconBaseColor, socialBgColor)}
                                onMouseEnter={e => { e.currentTarget.style.backgroundColor = hoverLinkColor; e.currentTarget.style.color = '#ffffff'; }}
                                onMouseLeave={e => { e.currentTarget.style.backgroundColor = socialBgColor; e.currentTarget.style.color = socialIconBaseColor; }}
                            >
                                <FaInstagram size={16} />
                            </a>
                        </div>
                    </div>
                </div>
                
                {/* Copyright Section */}
                <div style={{ textAlign: 'center', borderTop: `1px solid ${footerBorder}`, marginTop: '2.5rem', paddingTop: '2rem' }}>
                    <p style={{ fontSize: '0.875rem', color: baseTextColor, margin: 0 }}>&copy; {currentYear} {websiteName}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;