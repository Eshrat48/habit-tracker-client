// src/pages/BrowsePublicHabits.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import useTheme from '../hooks/useTheme'; 

const API_URL = 'https://habit-tracker-server-pi.vercel.app/api/v1/habits';

const BrowsePublicHabits = () => {
    const { theme } = useTheme(); 
    const isDark = theme === 'dark';

    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const categories = ['All', 'Morning', 'Work', 'Fitness', 'Evening', 'Study'];

    const primaryColor = '#6366f1'; 
    const bgColor = isDark ? '#111827' : '#fff';
    const mainTitleColor = isDark ? '#f9fafb' : '#111827';
    const subTextColor = isDark ? '#9ca3af' : '#6b7280';
    const cardBg = isDark ? '#1f2937' : '#fff';
    const cardBorder = isDark ? '#374151' : '#eef2f7';
    const cardTitleColor = isDark ? '#f9fafb' : '#111827';
    const cardCreatorColor = isDark ? '#e5e7eb' : '#111827';
    const dividerColor = isDark ? '#374151' : '#eef2f7';
    const inputBg = isDark ? '#1f2937' : '#fff';
    const inputBorder = isDark ? '#4b5563' : '#d1d5db';
    const inputTextColor = isDark ? '#e5e7eb' : '#111827';
    const emptyStateBg = isDark ? '#1f2937' : '#f9fafb';
    const emptyStateBorder = isDark ? '#374151' : '#e5e7eb';
    const loaderBorderColor = isDark ? '#374151' : '#e5e7eb';


    useEffect(() => {
        const loadPublicHabits = async () => {
            setLoading(true);
            try {
                // Fetch all public habits 
                const response = await axios.get(`${API_URL}/public`);
                setHabits(Array.isArray(response.data.data) ? response.data.data : []);
            } catch (err) {
                console.error('Error fetching public habits:', err);
                setHabits([]);
            } finally {
                setLoading(false);
            }
        };

        loadPublicHabits();
    }, []);

    const filteredHabits = habits.filter(habit => {
        const matchesCategory = selectedCategory === 'All' || habit.category === selectedCategory;
        const matchesSearch = habit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             habit.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             (habit.userName && habit.userName.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    if (loading) {
        return (
            <div style={{ padding: '60px 20px', textAlign: 'center' }}>
                <div style={{ display: 'inline-block', width: '40px', height: '40px', border: `4px solid ${loaderBorderColor}`, borderTop: `4px solid ${primaryColor}`, borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <p style={{ marginTop: '16px', fontSize: '16px', color: subTextColor }}>Loading habits...</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    return (
        <div style={{ padding: '32px 20px', background: bgColor, minHeight: '80vh' }}> 
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '28px', fontWeight: 700, color: mainTitleColor, margin: 0 }}>Browse Public Habits</h1> 
                    <p style={{ fontSize: '14px', color: subTextColor, marginTop: '8px' }}>Discover habits shared by the community</p> 
                </div>

                {/* Search Bar */}
                <div style={{ marginBottom: '24px' }}>
                    <input
                        type="text"
                        placeholder="Search habits by title, description, or creator..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            fontSize: '14px',
                            border: `1px solid ${inputBorder}`, 
                            borderRadius: '8px',
                            background: inputBg, 
                            color: inputTextColor, 
                            outline: 'none',
                            transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = primaryColor}
                        onBlur={(e) => e.target.style.borderColor = inputBorder}
                    />
                </div>

                {/* Category Filter */}
                <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: mainTitleColor }}>Filter:</span> 
                    {categories.map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{ 
                                padding: '8px 16px', 
                                borderRadius: '24px', 
                                border: selectedCategory === cat ? 'none' : `1px solid ${inputBorder}`,
                                background: selectedCategory === cat ? primaryColor : cardBg, 
                                color: selectedCategory === cat ? '#fff' : inputTextColor, 
                                fontSize: '13px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                if (selectedCategory !== cat) {
                                    e.target.style.borderColor = isDark ? '#9ca3af' : '#9ca3af';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (selectedCategory !== cat) {
                                    e.target.style.borderColor = inputBorder;
                                }
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Habits Grid or Empty State */}
                {filteredHabits.length === 0 ? (
                    <div style={{ 
                        border: `1px solid ${emptyStateBorder}`, 
                        borderRadius: '12px', 
                        padding: '60px 20px', 
                        textAlign: 'center', 
                        background: emptyStateBg 
                    }}>
                        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
                        <p style={{ fontSize: '16px', color: mainTitleColor, fontWeight: 600, margin: 0 }}>No habits found</p> 
                        <p style={{ fontSize: '14px', color: primaryColor, marginTop: '8px' }}>Be the first to share a public habit!</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                        {filteredHabits.map((habit) => (
                            <div 
                                key={habit._id} 
                                style={{ 
                                    background: cardBg, 
                                    borderRadius: '12px', 
                                    border: `1px solid ${cardBorder}`, 
                                    overflow: 'hidden', 
                                    boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.08)',
                                    transition: 'all 0.3s ease' 
                                }}
                                onMouseEnter={(e) => { 
                                    e.currentTarget.style.boxShadow = isDark ? '0 8px 20px rgba(0,0,0,0.4)' : '0 8px 20px rgba(0,0,0,0.12)'; 
                                    e.currentTarget.style.transform = 'translateY(-2px)'; 
                                }}
                                onMouseLeave={(e) => { 
                                    e.currentTarget.style.boxShadow = isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.08)'; 
                                    e.currentTarget.style.transform = 'translateY(0)'; 
                                }}
                            >
                                {/* Image */}
                                <div style={{ 
                                    height: '160px', 
                                    background: habit.image ? `url(${habit.image})` : (isDark ? '#374151' : '#f3f4f6'), 
                                    backgroundSize: 'cover', 
                                    backgroundPosition: 'center', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    color: primaryColor, 
                                    fontSize: '32px' 
                                }}>
                                    {!habit.image && '✨'}
                                </div>

                                {/* Content */}
                                <div style={{ padding: '20px' }}>
                                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: cardTitleColor, margin: '0 0 8px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{habit.title}</h3> 
                                    <p style={{ fontSize: '13px', color: subTextColor, margin: '0 0 12px 0', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{habit.description}</p> 
                                    
                                    {/* Category Badge */}
                                    <span style={{ display: 'inline-block', padding: '4px 10px', background: 'rgba(99,102,241,0.1)', color: primaryColor, fontSize: '12px', fontWeight: 600, borderRadius: '4px', marginBottom: '12px' }}>{habit.category}</span>
                                    
                                    <div style={{ borderTop: `1px solid ${dividerColor}`, paddingTop: '12px' }}> 
                                        <p style={{ fontSize: '12px', color: subTextColor, margin: '0 0 12px 0' }}>Creator: <span style={{ fontWeight: 600, color: cardCreatorColor }}>{habit.userName || 'Anonymous'}</span></p> 
                                        <Link to={`/habit-detail/${habit._id}`} style={{ display: 'block', textAlign: 'center', padding: '10px', background: primaryColor, color: '#fff', borderRadius: '6px', textDecoration: 'none', fontSize: '13px', fontWeight: 600, transition: 'background 0.2s' }} onMouseEnter={(e) => e.target.style.background = '#4f46e5'} onMouseLeave={(e) => e.target.style.background = primaryColor}>View Details</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrowsePublicHabits;