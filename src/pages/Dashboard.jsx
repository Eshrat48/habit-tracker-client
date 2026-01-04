// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFire, FaCheckCircle, FaCalendarAlt, FaTrophy } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';
import { fetchMyHabits } from '../api/habitApi';
import { calculateStreak } from '../utils/streakUtils';

const Dashboard = () => {
    const { user } = useAuth();
    const { theme } = useTheme();
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    const isDark = theme === 'dark';
    const primaryColor = '#8b5cf6';
    const bgColor = isDark ? '#111827' : '#f9fafb';
    const cardBg = isDark ? '#1f2937' : '#ffffff';
    const titleColor = isDark ? '#f9fafb' : '#111827';
    const textColor = isDark ? '#d1d5db' : '#6b7280';
    const borderColor = isDark ? '#374151' : '#e5e7eb';

    useEffect(() => {
        const loadData = async () => {
            try {
                const token = await user.getIdToken();
                const data = await fetchMyHabits(token);
                setHabits(data || []);
            } catch (error) {
                console.error('Error loading habits:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            loadData();
        }
    }, [user]);

    // Calculate stats
    const totalHabits = habits.length;
    const totalCompletions = habits.reduce((sum, habit) => sum + (habit.completionHistory?.length || 0), 0);
    const activeStreaks = habits.filter(h => calculateStreak(h.completionHistory || []) > 0).length;
    const longestStreak = Math.max(0, ...habits.map(h => calculateStreak(h.completionHistory || [])));

    // Category distribution
    const categoryData = habits.reduce((acc, habit) => {
        acc[habit.category] = (acc[habit.category] || 0) + 1;
        return acc;
    }, {});

    const categories = Object.keys(categoryData);
    const maxCategoryCount = Math.max(...Object.values(categoryData), 1);

    // Recent habits
    const recentHabits = [...habits].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
                <div
                    style={{
                        width: '40px',
                        height: '40px',
                        border: `4px solid ${borderColor}`,
                        borderTop: `4px solid ${primaryColor}`,
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto',
                    }}
                />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    return (
        <div>
            {/* Page Title */}
            <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: '700', color: titleColor, marginBottom: '0.5rem' }}>
                Dashboard Overview
            </h1>
            <p style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', color: textColor, marginBottom: '2rem' }}>
                Welcome back, {user?.displayName || 'User'}! Here's your habit tracking summary.
            </p>

            {/* Stats Cards */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 'clamp(1rem, 2vw, 1.5rem)',
                    marginBottom: '2rem',
                }}
            >
                {[
                    { icon: FaCalendarAlt, label: 'Total Habits', value: totalHabits, color: '#3b82f6' },
                    { icon: FaCheckCircle, label: 'Completions', value: totalCompletions, color: '#10b981' },
                    { icon: FaFire, label: 'Active Streaks', value: activeStreaks, color: '#f59e0b' },
                    { icon: FaTrophy, label: 'Longest Streak', value: `${longestStreak} days`, color: '#8b5cf6' },
                ].map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={idx}
                            style={{
                                backgroundColor: cardBg,
                                borderRadius: '12px',
                                border: `1px solid ${borderColor}`,
                                padding: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                            }}
                        >
                            <div
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '12px',
                                    backgroundColor: isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Icon style={{ fontSize: '1.5rem', color: stat.color }} />
                            </div>
                            <div>
                                <p style={{ fontSize: '0.875rem', color: textColor, margin: 0 }}>{stat.label}</p>
                                <p style={{ fontSize: '1.75rem', fontWeight: '700', color: titleColor, margin: 0 }}>
                                    {stat.value}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(1rem, 2vw, 2rem)', marginBottom: '2rem' }}>
                {/* Category Distribution Chart */}
                <div
                    style={{
                        backgroundColor: cardBg,
                        borderRadius: '12px',
                        border: `1px solid ${borderColor}`,
                        padding: '1.5rem',
                    }}
                >
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: titleColor, marginBottom: '1.5rem' }}>
                        Habits by Category
                    </h2>
                    {categories.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {categories.map((category) => {
                                const count = categoryData[category];
                                const percentage = (count / totalHabits) * 100;
                                return (
                                    <div key={category}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginBottom: '0.5rem',
                                            }}
                                        >
                                            <span style={{ fontSize: '0.875rem', color: titleColor, fontWeight: '500' }}>
                                                {category}
                                            </span>
                                            <span style={{ fontSize: '0.875rem', color: textColor }}>
                                                {count} ({percentage.toFixed(0)}%)
                                            </span>
                                        </div>
                                        <div
                                            style={{
                                                width: '100%',
                                                height: '8px',
                                                backgroundColor: isDark ? '#374151' : '#e5e7eb',
                                                borderRadius: '4px',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: `${percentage}%`,
                                                    height: '100%',
                                                    backgroundColor: primaryColor,
                                                    transition: 'width 0.3s',
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p style={{ color: textColor, textAlign: 'center', padding: '2rem 0' }}>
                            No habits yet. Create your first habit to see stats!
                        </p>
                    )}
                </div>

                {/* Completion Trend (Simple Bar Chart) */}
                <div
                    style={{
                        backgroundColor: cardBg,
                        borderRadius: '12px',
                        border: `1px solid ${borderColor}`,
                        padding: '1.5rem',
                    }}
                >
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: titleColor, marginBottom: '1.5rem' }}>
                        Weekly Activity
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem', height: '200px' }}>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                            const height = Math.random() * 100; // Mock data
                            return (
                                <div key={day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                    <div
                                        style={{
                                            width: '100%',
                                            height: `${height}%`,
                                            backgroundColor: primaryColor,
                                            borderRadius: '4px 4px 0 0',
                                            transition: 'height 0.3s',
                                        }}
                                    />
                                    <span style={{ fontSize: '0.75rem', color: textColor }}>{day}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Recent Habits Table */}
            <div
                style={{
                    backgroundColor: cardBg,
                    borderRadius: '12px',
                    border: `1px solid ${borderColor}`,
                    padding: '1.5rem',
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: titleColor, margin: 0 }}>
                        Recent Habits
                    </h2>
                    <Link
                        to="/dashboard/my-habits"
                        style={{
                            fontSize: '0.875rem',
                            color: primaryColor,
                            textDecoration: 'none',
                            fontWeight: '600',
                        }}
                    >
                        View All →
                    </Link>
                </div>

                {recentHabits.length > 0 ? (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                                    <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: textColor }}>
                                        Title
                                    </th>
                                    <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: textColor }}>
                                        Category
                                    </th>
                                    <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: textColor }}>
                                        Streak
                                    </th>
                                    <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: textColor }}>
                                        Created
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentHabits.map((habit) => (
                                    <tr key={habit._id} style={{ borderBottom: `1px solid ${borderColor}` }}>
                                        <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: titleColor }}>{habit.title}</td>
                                        <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: textColor }}>
                                            <span
                                                style={{
                                                    padding: '4px 8px',
                                                    backgroundColor: isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.1)',
                                                    color: primaryColor,
                                                    borderRadius: '4px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '600',
                                                }}
                                            >
                                                {habit.category}
                                            </span>
                                        </td>
                                        <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: textColor }}>
                                            {calculateStreak(habit.completionHistory || [])} days
                                        </td>
                                        <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: textColor }}>
                                            {new Date(habit.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p style={{ color: textColor, textAlign: 'center', padding: '2rem 0' }}>
                        No habits yet.{' '}
                        <Link to="/dashboard/add-habit" style={{ color: primaryColor, textDecoration: 'none' }}>
                            Create your first habit
                        </Link>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
