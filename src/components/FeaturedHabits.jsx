// src/components/FeaturedHabits.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchFeaturedHabits } from '../api/habitApi';
import useTheme from '../hooks/useTheme.js'; 

const FeaturedHabits = () => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { theme } = useTheme(); 
    const isDark = theme === 'dark';
    const sectionBg = isDark ? '#1f2937' : '#f9fafb';
    const cardBg = isDark ? '#374151' : '#fff';
    const titleColor = isDark ? '#e5e7eb' : '#111827';
    const textColor = isDark ? '#d1d5db' : '#6b7280';
    const borderColor = isDark ? '#4b5563' : '#eef2f7';
    const primaryColor = '#6366f1'; 

    useEffect(() => {
        const loadHabits = async () => {
            setLoading(true);
            try {
                const data = await fetchFeaturedHabits();
                setHabits(Array.isArray(data) ? data : []);
                setError(null);
            } catch (err) {
                console.error('Featured habits fetch error:', err);
                setError(null);
                setHabits([]);
            } finally {
                setLoading(false);
            }
        };

        loadHabits();
    }, []);

    const loaderStyle = {
        display: 'inline-block', 
        width: '40px', 
        height: '40px', 
        borderRadius: '50%', 
        animation: 'spin 1s linear infinite',
        border: `4px solid ${isDark ? '#4b5563' : '#e5e7eb'}`, 
        borderTop: `4px solid ${primaryColor}`, 
    };
    
    if (loading) {
        return (
            <section style={{ padding: '48px 16px', background: sectionBg, minHeight: '300px' }}> 
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                        <div style={loaderStyle} /> 
                        <p style={{ marginTop: '16px', fontSize: '16px', color: textColor }}>Loading featured habits...</p> 
                    </div>
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
            </section>
        );
    }

    return (
        <section style={{ padding: '48px 16px', background: sectionBg }}> 
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 700, color: titleColor, margin: 0 }}>Featured Habits</h2> 
                    <p style={{ fontSize: '14px', color: primaryColor, marginTop: '8px', margin: 0 }}>Discover popular habits from our community</p>
                </div>

                {/* Empty State */}
                {habits.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 20px', background: cardBg, borderRadius: '12px' }}> 
                        <p style={{ fontSize: '16px', color: textColor, marginBottom: '24px' }}>No public habits yet. Be the first to create one!</p> 
                        <Link to="/add-habit" style={{ display: 'inline-block', padding: '10px 24px', background: 'linear-gradient(90deg,#6366f1,#a855f7)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>Get Started</Link>
                    </div>
                ) : (
                    <div 
                        style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(1, 1fr)', 
                            gap: '24px',
                        }} 
                        className="responsive-grid" 
                    >
                        <style>{`
                            @media (min-width: 640px) {
                                .responsive-grid {
                                    grid-template-columns: repeat(2, 1fr) !important;
                                }
                            }
                            @media (min-width: 1024px) {
                                .responsive-grid {
                                    grid-template-columns: repeat(4, 1fr) !important;
                                }
                            }
                        `}</style>
                        {habits.map((habit) => (
                            <div 
                                key={habit._id} 
                                style={{ 
                                    background: cardBg, 
                                    borderRadius: '12px', 
                                    border: `1px solid ${borderColor}`, 
                                    overflow: 'hidden', 
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)', 
                                    transition: 'all 0.3s ease', 
                                    cursor: 'pointer' 
                                }} 
                                className="habit-card" 
                                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)'; e.currentTarget.style.transform = 'translateY(-2px)'; }} 
                                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                {/* Image */}
                                <div style={{ height: '160px', background: habit.image ? `url(${habit.image})` : (isDark ? '#4b5563' : '#f3f4f6'), backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', color: primaryColor, fontSize: '32px' }}>
                                    {!habit.image && '✨'}
                                </div>

                                {/* Content */}
                                <div style={{ padding: '20px' }}>
                                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: titleColor, margin: '0 0 8px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{habit.title}</h3>
                                    <p style={{ fontSize: '13px', color: textColor, margin: '0 0 12px 0', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{habit.description}</p>
                                    
                                    {/* Category Badge */}
                                    <span style={{ display: 'inline-block', padding: '4px 10px', background: isDark ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.1)', color: primaryColor, fontSize: '12px', fontWeight: 600, borderRadius: '4px', marginBottom: '12px' }}>{habit.category}</span>
                                    
                                    <div style={{ borderTop: `1px solid ${borderColor}`, paddingTop: '12px' }}>
                                        <p style={{ fontSize: '12px', color: textColor, margin: '0 0 12px 0' }}>Creator: <span style={{ fontWeight: 600, color: titleColor }}>{habit.userName || 'Anonymous'}</span></p>
                                        <Link 
                                            to={`/habit-detail/${habit._id}`} 
                                            style={{ 
                                                display: 'block', 
                                                textAlign: 'center', 
                                                padding: '10px', 
                                                background: primaryColor, 
                                                color: '#fff', 
                                                borderRadius: '6px', 
                                                textDecoration: 'none', 
                                                fontSize: '13px', 
                                                fontWeight: 600, 
                                                transition: 'background 0.2s',
                                            }} 
                                            onMouseEnter={(e) => { e.target.style.background = '#4f46e5';}} 
                                            onMouseLeave={(e) => { e.target.style.background = primaryColor;}}
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedHabits;
