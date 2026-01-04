// src/pages/MyHabits.jsx
import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth'; 
import useTheme from '../hooks/useTheme'; 
import { fetchMyHabits, deleteHabit, completeHabit } from '../api/habitApi';
import { calculateStreak } from '../utils/streakUtils'; 
import { Link } from 'react-router-dom';
import UpdateHabitModal from '../components/UpdateHabitModal'; 
import LoadingSpinner from '../components/LoadingSpinner';

const MyHabits = () => {
    const { user, loading: authLoading } = useAuth();
    const { theme } = useTheme();
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedHabit, setSelectedHabit] = useState(null);
    const errorShownRef = useRef(false);

    const isDark = theme === 'dark';
    
    const colors = {
        primaryText: isDark ? '#f9fafb' : '#111827',
        secondaryText: isDark ? '#9ca3af' : '#6b7280',
        pageBg: isDark ? '#1f2937' : '#ffffff',
        surfaceBg: isDark ? '#374151' : '#ffffff',
        tableHeadBg: isDark ? '#4b5563' : '#f3f4f6',
        tableHeadText: isDark ? '#d1d5db' : '#374151',
        tableBorder: isDark ? '#4f5f70' : '#e5e7eb',
        hoverBg: isDark ? '#4b5563' : '#f9fafb',
        emptyStateBg: isDark ? '#374151' : '#ffffff',
        emptyStateInnerBg: isDark ? '#4b5563' : '#eef2f7',
    };
    
    // --- Data Fetching ---
    const loadHabits = async () => {
        if (!user) return; 
        setLoading(true);
    try {
            if (typeof user.getIdToken !== 'function') {
                console.warn('User object does not expose getIdToken(), skipping habit load.');
                setHabits([]);
                return;
            }

            const token = await user.getIdToken();
            const data = await fetchMyHabits(token);
            setHabits(data || []);
        } catch (error) {
            // Better error messaging
            const serverMessage = error?.response?.data?.message || error.message;
            console.error('Load habits error:', error);
            if (!errorShownRef.current) {
                if (error?.response?.status === 401) {
                    toast.error('Session expired — please sign in again.');
                } else {
                    toast.error(serverMessage || 'Failed to load habits. Please try again later.');
                }
                errorShownRef.current = true;
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!authLoading && user) {
            loadHabits();
        }
    }, [user, authLoading]); 

    // --- Action Handlers ---

    // 1. Delete Habit
    const handleDelete = async (habitId) => {
        if (!window.confirm('Are you sure you want to delete this habit? This action cannot be undone.')) {
            return;
        }

        const deleteToast = toast.loading('Deleting habit...');
        try {
            const token = await user.getIdToken();
            await deleteHabit(habitId, token);
            
            setHabits(prevHabits => prevHabits.filter(h => h._id !== habitId));
            
            toast.success('Habit deleted successfully!', { id: deleteToast });
        } catch (error) {
            toast.error('Failed to delete habit.', { id: deleteToast });
            console.error('Delete error:', error);
        }
    };

    // 2. Mark Complete
    const handleComplete = async (habitId) => {
        const completeToast = toast.loading('Marking habit complete...');
        try {
            const token = await user.getIdToken();
            const result = await completeHabit(habitId, token);
            
            if (result.message.includes('already')) {
                 toast('You already completed this habit today!', { id: completeToast });
            } else {
                await loadHabits(); 
                toast.success('Habit marked complete! Well done!', { id: completeToast });
            }
        } catch (error) {
            toast.error('Failed to complete habit.', { id: completeToast });
            console.error('Complete error:', error);
        }
    };

    // 3. Update Modal
    const handleOpenModal = (habit) => {
        setSelectedHabit(habit);
        setShowModal(true);
    };

    const handleUpdateSuccess = () => {
        setShowModal(false);
        setSelectedHabit(null);
        loadHabits();
    };

    if (loading || authLoading) {
        return (
            <div style={{ padding: '60px 20px', textAlign: 'center', background: colors.pageBg }}>
                <div 
                    style={{ 
                        display: 'inline-block', 
                        width: '40px', 
                        height: '40px', 
                        border: `4px solid ${isDark ? '#4b5563' : '#e5e7eb'}`, 
                        borderTop: '4px solid #6366f1', 
                        borderRadius: '50%', 
                        animation: 'spin 1s linear infinite' 
                    }} 
                />
                <p style={{ marginTop: '16px', fontSize: '16px', color: colors.secondaryText }}>Loading your habits...</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    if (!user) {
        return <div style={{ textAlign: 'center', padding: '40px 20px', color: '#dc2626', background: colors.pageBg }}>Please sign in to view your habits.</div>;
    }
    
    // --- Render ---
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(1rem, 3vw, 1.25rem)', minHeight: '100vh', background: colors.pageBg }}>
            <div style={{ display: 'flex', flexDirection: window.innerWidth < 640 ? 'column' : 'row', justifyContent: 'space-between', alignItems: window.innerWidth < 640 ? 'stretch' : 'center', marginBottom: 'clamp(1rem, 3vw, 1.5rem)', gap: '1rem' }}>
                <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 1.75rem)', fontWeight: 700, color: colors.primaryText, margin: 0 }}>My Habits ({habits.length})</h1>
                <Link to="/add-habit" style={{ background: 'linear-gradient(90deg,#6366f1,#a855f7)', color: '#fff', padding: '10px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '14px', textAlign: 'center', whiteSpace: 'nowrap' }}>+ Add Habit</Link>
            </div>
            
            {habits.length === 0 ? (
                <div style={{ padding: '28px', border: `1px solid ${colors.tableBorder}`, borderRadius: '12px', background: colors.emptyStateBg }}>
                    <div style={{ height: '260px', border: `1px solid ${colors.emptyStateInnerBg}`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px', background: colors.emptyStateInnerBg }}>
                        <div style={{ width: '68px', height: '68px', borderRadius: '9999px', background: 'rgba(99,102,241,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '28px', color: '#6366f1' }}>+</span>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontWeight: 600, marginBottom: '6px', margin: 0, color: colors.primaryText }}>No habits yet.</p>
                            <p style={{ color: colors.secondaryText, fontSize: '13px', margin: 0 }}>Create your first habit to start building better routines</p>
                        </div>
                        <Link to="/add-habit" style={{ marginTop: '6px', background: 'linear-gradient(90deg,#6366f1,#a855f7)', color: '#fff', padding: '8px 14px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '13px' }}>+ Create Habit</Link>
                    </div>
                </div>
            ) : (
                <div style={{ overflowX: 'auto', boxShadow: '0 20px 25px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', background: colors.surfaceBg }}>
                        {/* Table Head */}
                        <thead>
                            <tr style={{ background: colors.tableHeadBg, borderBottom: `1px solid ${colors.tableBorder}` }}>
                                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600, color: colors.tableHeadText, fontSize: '13px' }}>Title</th>
                                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600, color: colors.tableHeadText, fontSize: '13px' }}>Category</th>
                                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600, color: colors.tableHeadText, fontSize: '13px' }}>Current Streak</th>
                                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600, color: colors.tableHeadText, fontSize: '13px' }}>Created On</th>
                                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600, color: colors.tableHeadText, fontSize: '13px' }}>Actions</th>
                            </tr>
                        </thead>
                        
                        {/* Table Body */}
                        <tbody>
                            {habits.map((habit) => (
                                <tr 
                                    key={habit._id} 
                                    style={{ borderBottom: `1px solid ${colors.tableBorder}`, transition: 'background 0.3s' }} 
                                    onMouseEnter={(e) => e.currentTarget.style.background = colors.hoverBg} 
                                    onMouseLeave={(e) => e.currentTarget.style.background = colors.surfaceBg}
                                >
                                    <td style={{ padding: '16px', fontWeight: 600, color: colors.primaryText, fontSize: '14px' }}>{habit.title}</td>
                                    <td style={{ padding: '16px', color: colors.secondaryText, fontSize: '14px' }}>
                                        <span style={{ display: 'inline-block', padding: '4px 10px', background: 'rgba(99,102,241,0.1)', color: '#6366f1', fontSize: '12px', fontWeight: 600, borderRadius: '4px' }}>{habit.category}</span>
                                    </td>
                                    <td style={{ padding: '16px', fontSize: '14px' }}>
                                        <span style={{ display: 'inline-block', padding: '6px 12px', background: '#fef08a', color: '#854d0e', fontSize: '13px', fontWeight: 600, borderRadius: '4px' }}>
                                            {calculateStreak(habit.completionHistory)} Days
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px', color: colors.secondaryText, fontSize: '14px' }}>{new Date(habit.createdAt).toLocaleDateString()}</td>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button 
                                                onClick={() => handleOpenModal(habit)}
                                                style={{ padding: '6px 12px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, transition: 'background 0.2s' }}
                                                onMouseEnter={(e) => e.target.style.background = '#2563eb'}
                                                onMouseLeave={(e) => e.target.style.background = '#3b82f6'}
                                            >
                                                Update
                                            </button>
                                            <button 
                                                onClick={() => handleComplete(habit._id)}
                                                style={{ padding: '6px 12px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, transition: 'background 0.2s' }}
                                                onMouseEnter={(e) => e.target.style.background = '#059669'}
                                                onMouseLeave={(e) => e.target.style.background = '#10b981'}
                                            >
                                                Complete
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(habit._id)}
                                                style={{ padding: '6px 12px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, transition: 'background 0.2s' }}
                                                onMouseEnter={(e) => e.target.style.background = '#dc2626'}
                                                onMouseLeave={(e) => e.target.style.background = '#ef4444'}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            
            {/* Update Modal */}
            {showModal && selectedHabit && (
                <UpdateHabitModal 
                    habit={selectedHabit}
                    onClose={() => setShowModal(false)}
                    onUpdateSuccess={handleUpdateSuccess}
                />
            )}
        </div>
    );
};

export default MyHabits;