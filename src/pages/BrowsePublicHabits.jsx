// src/pages/BrowsePublicHabits.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/habits';

const BrowsePublicHabits = () => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const categories = ['All', 'Morning', 'Work', 'Fitness', 'Evening', 'Study'];

    useEffect(() => {
        const loadPublicHabits = async () => {
            setLoading(true);
            try {
                // Fetch all public habits (no auth required)
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
                <div style={{ display: 'inline-block', width: '40px', height: '40px', border: '4px solid #e5e7eb', borderTop: '4px solid #6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <p style={{ marginTop: '16px', fontSize: '16px', color: '#6b7280' }}>Loading habits...</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    return (
        <div style={{ padding: '32px 20px', background: '#fff', minHeight: '80vh' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', margin: 0 }}>Browse Public Habits</h1>
                    <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>Discover habits shared by the community</p>
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
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            background: '#fff',
                            color: '#111827',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                </div>

                {/* Category Filter */}
                <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>Filter:</span>
                    {categories.map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{ 
                                padding: '8px 16px', 
                                borderRadius: '24px', 
                                border: selectedCategory === cat ? 'none' : '1px solid #d1d5db',
                                background: selectedCategory === cat ? '#6366f1' : '#fff',
                                color: selectedCategory === cat ? '#fff' : '#374151',
                                fontSize: '13px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                if (selectedCategory !== cat) {
                                    e.target.style.borderColor = '#9ca3af';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (selectedCategory !== cat) {
                                    e.target.style.borderColor = '#d1d5db';
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
                        border: '1px solid #e5e7eb', 
                        borderRadius: '12px', 
                        padding: '60px 20px', 
                        textAlign: 'center', 
                        background: '#f9fafb' 
                    }}>
                        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
                        <p style={{ fontSize: '16px', color: '#111827', fontWeight: 600, margin: 0 }}>No habits found</p>
                        <p style={{ fontSize: '14px', color: '#6366f1', marginTop: '8px' }}>Be the first to share a public habit!</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                        {filteredHabits.map((habit) => (
                            <div 
                                key={habit._id} 
                                style={{ 
                                    background: '#fff', 
                                    borderRadius: '12px', 
                                    border: '1px solid #eef2f7', 
                                    overflow: 'hidden', 
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)', 
                                    transition: 'all 0.3s ease' 
                                }}
                                onMouseEnter={(e) => { 
                                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)'; 
                                    e.currentTarget.style.transform = 'translateY(-2px)'; 
                                }}
                                onMouseLeave={(e) => { 
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; 
                                    e.currentTarget.style.transform = 'translateY(0)'; 
                                }}
                            >
                                {/* Image */}
                                <div style={{ 
                                    height: '160px', 
                                    background: habit.image ? `url(${habit.image})` : '#f3f4f6', 
                                    backgroundSize: 'cover', 
                                    backgroundPosition: 'center', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    color: '#6366f1', 
                                    fontSize: '32px' 
                                }}>
                                    {!habit.image && '✨'}
                                </div>

                                {/* Content */}
                                <div style={{ padding: '20px' }}>
                                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', margin: '0 0 8px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{habit.title}</h3>
                                    <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 12px 0', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{habit.description}</p>
                                    
                                    {/* Category Badge */}
                                    <span style={{ display: 'inline-block', padding: '4px 10px', background: 'rgba(99,102,241,0.1)', color: '#6366f1', fontSize: '12px', fontWeight: 600, borderRadius: '4px', marginBottom: '12px' }}>{habit.category}</span>
                                    
                                    <div style={{ borderTop: '1px solid #eef2f7', paddingTop: '12px' }}>
                                        <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 12px 0' }}>Creator: <span style={{ fontWeight: 600, color: '#111827' }}>{habit.userName || 'Anonymous'}</span></p>
                                        <Link to={`/habit-detail/${habit._id}`} style={{ display: 'block', textAlign: 'center', padding: '10px', background: '#6366f1', color: '#fff', borderRadius: '6px', textDecoration: 'none', fontSize: '13px', fontWeight: 600, transition: 'background 0.2s' }} onMouseEnter={(e) => e.target.style.background = '#4f46e5'} onMouseLeave={(e) => e.target.style.background = '#6366f1'}>View Details</Link>
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