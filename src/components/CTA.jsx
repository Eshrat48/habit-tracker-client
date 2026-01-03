// src/components/CTA.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRocket, FaArrowRight } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';

const CTA = () => {
    const { theme } = useTheme();
    const { user } = useAuth();
    const navigate = useNavigate();
    const isDark = theme === 'dark';

    const containerBg = isDark ? '#111827' : '#f9fafb';
    const boxBg = 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 50%, #a78bfa 100%)';
    const textColor = '#ffffff';
    const buttonBg = '#ffffff';
    const buttonTextColor = '#6d28d9';

    const handleCTAClick = () => {
        if (user) {
            navigate('/add-habit');
        } else {
            navigate('/register');
        }
    };

    return (
        <section style={{
            padding: '6rem 1rem',
            backgroundColor: containerBg,
        }}>
            <div style={{
                maxWidth: '1000px',
                margin: '0 auto',
                backgroundImage: boxBg,
                borderRadius: '1.5rem',
                padding: '4rem 2rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 20px 40px -10px rgba(109, 40, 217, 0.3)',
            }}>
                {/* Decorative Elements */}
                <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    filter: 'blur(60px)',
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '-30px',
                    left: '-30px',
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    filter: 'blur(40px)',
                }} />

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* Icon */}
                    <div style={{
                        width: '80px',
                        height: '80px',
                        margin: '0 auto 2rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(10px)',
                    }}>
                        <FaRocket style={{ fontSize: '36px', color: textColor }} />
                    </div>

                    {/* Heading */}
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        color: textColor,
                        marginBottom: '1rem',
                        lineHeight: '1.2',
                    }}>
                        Ready to Transform Your Life?
                    </h2>

                    {/* Subheading */}
                    <p style={{
                        fontSize: '1.125rem',
                        color: 'rgba(255, 255, 255, 0.9)',
                        marginBottom: '2.5rem',
                        maxWidth: '700px',
                        margin: '0 auto 2.5rem',
                        lineHeight: '1.6',
                    }}>
                        Join thousands of users who are building better habits and achieving their goals. 
                        Start your journey today—it only takes a minute to get started!
                    </p>

                    {/* CTA Buttons */}
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}>
                        <button
                            onClick={handleCTAClick}
                            style={{
                                padding: '14px 40px',
                                backgroundColor: buttonBg,
                                color: buttonTextColor,
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                transition: 'all 0.3s',
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                            }}
                        >
                            {user ? 'Create Your First Habit' : 'Get Started for Free'}
                            <FaArrowRight />
                        </button>

                        <button
                            onClick={() => navigate('/browse')}
                            style={{
                                padding: '14px 40px',
                                backgroundColor: 'transparent',
                                color: textColor,
                                border: `2px solid ${textColor}`,
                                borderRadius: '8px',
                                fontSize: '1rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                e.target.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.transform = 'translateY(0)';
                            }}
                        >
                            Explore Public Habits
                        </button>
                    </div>

                    {/* Trust Indicators */}
                    <div style={{
                        marginTop: '3rem',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '3rem',
                        flexWrap: 'wrap',
                        fontSize: '0.9rem',
                        color: 'rgba(255, 255, 255, 0.8)',
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: textColor }}>10,000+</div>
                            <div>Active Users</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: textColor }}>50,000+</div>
                            <div>Habits Completed</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: textColor }}>5,000+</div>
                            <div>Active Streaks</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
