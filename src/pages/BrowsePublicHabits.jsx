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
    const [sortBy, setSortBy] = useState('newest'); // newest, oldest, title
    const [creatorFilter, setCreatorFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
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
        const matchesCreator = !creatorFilter || (habit.userName && habit.userName.toLowerCase().includes(creatorFilter.toLowerCase()));
        return matchesCategory && matchesSearch && matchesCreator;
    });

    // Sort habits
    const sortedHabits = [...filteredHabits].sort((a, b) => {
        if (sortBy === 'newest') {
            return new Date(b.createdAt) - new Date(a.createdAt);
        } else if (sortBy === 'oldest') {
            return new Date(a.createdAt) - new Date(b.createdAt);
        } else if (sortBy === 'title') {
            return a.title.localeCompare(b.title);
        }
        return 0;
    });

    // Pagination
    const totalPages = Math.ceil(sortedHabits.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedHabits = sortedHabits.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
        <div style={{ padding: 'clamp(1.5rem, 4vw, 2rem) clamp(1rem, 3vw, 1.25rem)', background: bgColor, minHeight: '80vh' }}> 
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
                    <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 1.75rem)', fontWeight: 700, color: mainTitleColor, margin: 0 }}>Browse Public Habits</h1> 
                    <p style={{ fontSize: 'clamp(0.875rem, 2vw, 0.875rem)', color: subTextColor, marginTop: '0.5rem' }}>Discover habits shared by the community</p> 
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
                    <span style={{ fontSize: '14px', fontWeight: 600, color: mainTitleColor }}>Category:</span> 
                    {categories.map(cat => (
                        <button 
                            key={cat}
                            onClick={() => {
                                setSelectedCategory(cat);
                                setCurrentPage(1);
                            }}
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

                {/* Creator Filter & Sorting */}
                <div style={{ marginBottom: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: mainTitleColor, marginBottom: '8px' }}>
                            Filter by Creator
                        </label>
                        <input
                            type="text"
                            placeholder="Enter creator name..."
                            value={creatorFilter}
                            onChange={(e) => {
                                setCreatorFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            style={{
                                width: '100%',
                                padding: '10px 14px',
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
                    <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: mainTitleColor, marginBottom: '8px' }}>
                            Sort By
                        </label>
                        <select
                            value={sortBy}
                            onChange={(e) => {
                                setSortBy(e.target.value);
                                setCurrentPage(1);
                            }}
                            style={{
                                width: '100%',
                                padding: '10px 14px',
                                fontSize: '14px',
                                border: `1px solid ${inputBorder}`,
                                borderRadius: '8px',
                                background: inputBg,
                                color: inputTextColor,
                                outline: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="title">Title (A-Z)</option>
                        </select>
                    </div>
                </div>

                {/* Results Count */}
                <div style={{ marginBottom: '16px', fontSize: '14px', color: subTextColor }}>
                    Showing {paginatedHabits.length} of {sortedHabits.length} habits
                </div>

                {/* Habits Grid or Empty State */}
                {sortedHabits.length === 0 ? (
                    <div style={{ 
                        border: `1px solid ${emptyStateBorder}`, 
                        borderRadius: '12px', 
                        padding: '60px 20px', 
                        textAlign: 'center', 
                        background: emptyStateBg 
                    }}>
                        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
                        <p style={{ fontSize: '16px', color: mainTitleColor, fontWeight: 600, margin: 0 }}>No habits found</p> 
                        <p style={{ fontSize: '14px', color: primaryColor, marginTop: '8px' }}>Try adjusting your filters or search terms.</p>
                    </div>
                ) : (
                    <>
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', 
                            gap: 'clamp(1rem, 2vw, 1.5rem)',
                            marginBottom: '2rem'
                        }}>
                            {paginatedHabits.map((habit) => (
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

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            gap: '8px',
                            marginTop: '32px'
                        }}>
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '6px',
                                    border: `1px solid ${inputBorder}`,
                                    background: cardBg,
                                    color: currentPage === 1 ? subTextColor : mainTitleColor,
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                    opacity: currentPage === 1 ? 0.5 : 1,
                                    transition: 'all 0.2s'
                                }}
                            >
                                Previous
                            </button>

                            {[...Array(totalPages)].map((_, idx) => {
                                const page = idx + 1;
                                return (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        style={{
                                            padding: '8px 12px',
                                            borderRadius: '6px',
                                            border: currentPage === page ? 'none' : `1px solid ${inputBorder}`,
                                            background: currentPage === page ? primaryColor : cardBg,
                                            color: currentPage === page ? '#fff' : mainTitleColor,
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            minWidth: '40px'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (currentPage !== page) {
                                                e.target.style.background = isDark ? '#374151' : '#f3f4f6';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (currentPage !== page) {
                                                e.target.style.background = cardBg;
                                            }
                                        }}
                                    >
                                        {page}
                                    </button>
                                );
                            })}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '6px',
                                    border: `1px solid ${inputBorder}`,
                                    background: cardBg,
                                    color: currentPage === totalPages ? subTextColor : mainTitleColor,
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                    opacity: currentPage === totalPages ? 0.5 : 1,
                                    transition: 'all 0.2s'
                                }}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
                )}
            </div>
        </div>
    );
};

export default BrowsePublicHabits;