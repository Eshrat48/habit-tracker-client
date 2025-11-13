// src/components/FeaturedHabits.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchFeaturedHabits } from '../api/habitApi';

const FeaturedHabits = () => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadHabits = async () => {
            setLoading(true);
            try {
                const data = await fetchFeaturedHabits();
                setHabits(Array.isArray(data) ? data : []);
                setError(null);
            } catch (err) {
                console.error('Featured habits fetch error:', err);
                setError(null); // Don't show error state, just empty
                setHabits([]);
            } finally {
                setLoading(false);
            }
        };

        loadHabits();
    }, []);

    if (loading) {
        return (
            <section style={{ padding: '48px 16px', background: '#f9fafb' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                        <div style={{ display: 'inline-block', width: '40px', height: '40px', border: '4px solid #e5e7eb', borderTop: '4px solid #6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                        <p style={{ marginTop: '16px', fontSize: '16px', color: '#6b7280' }}>Loading featured habits...</p>
                    </div>
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
            </section>
        );
    }

    return (
        <section style={{ padding: '48px 16px', background: '#f9fafb' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', margin: 0 }}>Featured Habits</h2>
                    <p style={{ fontSize: '14px', color: '#6366f1', marginTop: '8px', margin: 0 }}>Discover popular habits from our community</p>
                </div>

                {/* Empty State */}
                {habits.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '24px' }}>No public habits yet. Be the first to create one!</p>
                        <Link to="/add-habit" style={{ display: 'inline-block', padding: '10px 24px', background: 'linear-gradient(90deg,#6366f1,#a855f7)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>Get Started</Link>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                        {habits.map((habit) => (
                            <div key={habit._id} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #eef2f7', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', transition: 'all 0.3s ease', cursor: 'pointer' }} className="habit-card" onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                                {/* Image */}
                                <div style={{ height: '160px', background: habit.image ? `url(${habit.image})` : '#f3f4f6', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1', fontSize: '32px' }}>
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
        </section>
    );
};

export default FeaturedHabits;