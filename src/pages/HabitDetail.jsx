// src/pages/HabitDetail.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth'; 
import useTheme from '../hooks/useTheme'; 
import { fetchHabitDetail, completeHabit } from '../api/habitApi';

const isToday = (date) => {
    const today = new Date();
    date = new Date(date);
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
};

const calculateProgress = (completionHistory) => {
    const daysInLast30 = 30;
    const historyDates = completionHistory.map(d => new Date(d));
    
    const uniqueDays = new Set();
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    for (let i = 0; i < daysInLast30; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(today.getDate() - i);
        
        const isCompleted = historyDates.some(historyDate => {
            const historyDay = new Date(historyDate);
            historyDay.setHours(0, 0, 0, 0); 
            return historyDay.getTime() === checkDate.getTime();
        });

        if (isCompleted) {
            uniqueDays.add(checkDate.toDateString());
        }
    }
    
    const totalCompletions = new Set(historyDates.map(d => d.toDateString())).size;
    const percentage = Math.round((uniqueDays.size / daysInLast30) * 100);

    // 2. Streak
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const sortedNormalizedTimestamps = Array.from(new Set(
        completionHistory.map(d => new Date(d).setHours(0, 0, 0, 0))
    )).sort((a, b) => b - a);
    
    const completedDays = sortedNormalizedTimestamps.map(ts => new Date(ts));
    
    let isTodayCompleted = completedDays.length > 0 && completedDays[0].getTime() === currentDate.getTime();

    let checkIndex = 0;
    if (isTodayCompleted) {
        streak = 1; 
        checkIndex = 1;
    } else {
        const yesterday = new Date(currentDate);
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (completedDays.length > 0 && completedDays[0].getTime() === yesterday.getTime()) {
            streak = 1;
            checkIndex = 1;
            currentDate = yesterday;
        } else {
            return { percentage, streak: 0, totalCompletions }; 
        }
    }
    
    for (let i = checkIndex; i < completedDays.length; i++) {
        const completedDay = completedDays[i];
        
        const expectedPreviousDay = new Date(currentDate);
        expectedPreviousDay.setDate(expectedPreviousDay.getDate() - 1);
        
        if (completedDay.getTime() === expectedPreviousDay.getTime()) {
            streak++; 
            currentDate = expectedPreviousDay;
        } else if (completedDay.getTime() < expectedPreviousDay.getTime()) {
            break;
        }
    }
    
    return { percentage, streak, totalCompletions };
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}

const HabitDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();
    const { theme } = useTheme(); 
    const isDark = theme === 'dark';

    const [habit, setHabit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isCompleting, setIsCompleting] = useState(false);

    const primaryColor = '#6366f1'; 
    const cardBg = isDark ? '#1f2937' : '#ffffff';
    const mainBg = isDark ? '#111827' : '#f3f4f6';
    const mainTitleColor = isDark ? '#f9fafb' : '#1f2937';
    const subTextColor = isDark ? '#9ca3af' : '#6b7280';
    const descriptionColor = isDark ? '#e5e7eb' : '#1f2937';
    const dividerColor = isDark ? '#374151' : '#e5e7eb';
    const backButtonColor = isDark ? '#9ca3af' : '#6b7280';
    const creatorInfoColor = isDark ? '#e5e7eb' : '#1f2937';
    const progressTrackBg = isDark ? '#374151' : '#e5e7eb';

    // Memoize progress calculation
    const { percentage, streak, totalCompletions } = useMemo(() => 
        habit ? calculateProgress(habit.completionHistory) : { percentage: 0, streak: 0, totalCompletions: 0 }, 
        [habit]
    );

    // Check if habit was already completed today
    const completedToday = useMemo(() => {
        if (!habit) return false;
        return habit.completionHistory.some(isToday);
    }, [habit]);

    // --- Data Fetching ---
    useEffect(() => {
        if (!user || authLoading) return;
        
        const loadHabit = async () => {
            setLoading(true);
            try {
                const token = await user.getIdToken();
                const data = await fetchHabitDetail(id, token);
                
                const mockHabitData = {
                    ...data,
                    description: data.description || 'To be fit.', 
                    userName: data.userName || 'Nova', 
                    createdDate: data.createdAt ? new Date(data.createdAt) : new Date(), 
                }
                setHabit(mockHabitData);
            } catch (err) {
                console.error("Fetch Habit Detail Error:", err);
                toast.error('Failed to load habit details or access denied.');
                setHabit(null);
            } finally {
                setLoading(false);
            }
        };

        loadHabit();
    }, [id, user, authLoading]);


    // --- Mark Complete Handler  ---
const handleMarkComplete = async () => {
    if (!user || isCompleting || completedToday) return;

    setIsCompleting(true);
    const completeToastId = toast.loading('Marking habit complete...');

    try {
        const token = await user.getIdToken();
        const result = await completeHabit(id, token);
        
        if (result.success) {
            setHabit(prev => ({
                ...prev,
                completionHistory: [...prev.completionHistory, new Date().toISOString()],
            }));
            toast.success(result.message || 'Habit marked complete!', { id: completeToastId });
        } else if (result.message && result.message.includes('already marked complete')) {
             toast.success('Habit already marked complete for today.', { id: completeToastId });
        } else {
             toast.error(result.message || 'Failed to complete habit.', { id: completeToastId });
        }

    } catch (error) {
        console.error('Mark Complete failed:', error);
        
        let errorMessage = 'Failed to complete habit.';
        if (error.response) {
            errorMessage = error.response.data.message || error.response.statusText || errorMessage;
        } else if (error.request) {
            errorMessage = 'Network error: Cannot connect to the server.';
        }
        
        toast.error(errorMessage, { id: completeToastId });
    } finally {
        setIsCompleting(false);
    }
};


    // --- RENDER BLOCK  ---
    if (authLoading || loading) {
        return <div style={{ textAlign: 'center', padding: '5rem 0', fontSize: '1.25rem', color: subTextColor }}>Loading Habit Details...</div>; 
    }

    if (!habit) {
        return <Navigate to="/my-habits" replace />;
    }

    return (
        <div style={{ 
            margin: '0 auto', 
            padding: '1rem', 
            display: 'flex', 
            justifyContent: 'center', 
            minHeight: '100vh', 
            backgroundColor: mainBg  
        }}>
            <div style={{ 
                width: '100%', 
                maxWidth: '448px', 
                backgroundColor: cardBg,
                borderRadius: '0.75rem', 
                boxShadow: isDark 
                    ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)' 
                    : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                margin: '1rem 0', 
                overflow: 'hidden'
            }}>
                
                {/* Back Button Section */}
                <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', borderBottom: `1px solid ${dividerColor}` }}> 
                    <button 
                        onClick={() => navigate(-1)} 
                        style={{ color: backButtonColor, display: 'flex', alignItems: 'center', border: 'none', background: 'none', cursor: 'pointer', transition: 'color 0.15s' }} 
                        aria-label="Go back"
                    >
                        <svg style={{ width: '20px', height: '20px', marginRight: '8px', stroke: backButtonColor }} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        <span style={{ fontSize: '0.875rem', fontWeight: '600', color: backButtonColor }}>Back</span>
                    </button>
                </div>
                
                {/* Content Padding */}
                <div style={{ padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    
                    {/* Title Section */}
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                        <h1 style={{ 
                            fontSize: '2.5rem', 
                            fontWeight: '900', 
                            color: mainTitleColor, 
                            letterSpacing: '0.025em', 
                            textTransform: 'uppercase', 
                        }}>
                            {habit.title || 'Morning walk'}
                        </h1>
                    </div>

                    {/* Run / Evening Tags & Labels */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ fontSize: '0.875rem', color: subTextColor, fontWeight: '500' }}>{habit.category || 'Run'}</div> 
                        <span style={{ 
                            display: 'inline-block', 
                            padding: '4px 12px', 
                            fontSize: '0.75rem', 
                            fontWeight: '600', 
                            borderRadius: '9999px', 
                            backgroundColor: isDark ? '#312e81' : '#eef2ff', 
                            color: isDark ? '#c7d2fe' : '#3730a3' 
                        }}>
                            {habit.reminderTime || 'Evening'}
                        </span>
                    </div>

                    {/* Description */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ fontSize: '0.875rem', color: subTextColor, fontWeight: '500' }}>Description</div> 
                        <p style={{ color: descriptionColor, lineHeight: '1.625' }}>{habit.description}</p> 
                    </div>

                    <div style={{ borderBottom: `1px solid ${dividerColor}`, margin: '1.5rem 0' }}></div> 

                    {/* Statistics Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '0.75rem', textAlign: 'center' }}>
                        
                        {/* Current Streak */}
                        <div style={{ 
                            padding: '1rem', 
                            borderRadius: '0.5rem', 
                            border: isDark ? '2px solid #b45309' : '2px solid #fbd38d', 
                            backgroundColor: isDark ? '#431407' : '#fff7ed', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            minHeight: '90px'
                        }}>
                            <div style={{ fontSize: '0.875rem', color: isDark ? '#fcd34d' : '#f97316', fontWeight: '600', marginBottom: '4px' }}> 🔥 Current Streak </div>
                            <div style={{ fontSize: '2.25rem', fontWeight: '800', color: isDark ? '#f59e0b' : '#ea580c' }}>{streak}</div>
                            <div style={{ fontSize: '0.75rem', color: isDark ? '#fcd34d' : '#f97316' }}>days</div>
                        </div>

                        {/* 30-Day Progress */}
                        <div style={{ 
                            padding: '1rem', 
                            borderRadius: '0.5rem', 
                            border: isDark ? '2px solid #065f46' : '2px solid #a7f3d0', 
                            backgroundColor: isDark ? '#064e3b' : '#ecfdf5', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            minHeight: '90px'
                        }}>
                            <div style={{ fontSize: '0.875rem', color: isDark ? '#34d399' : '#059669', fontWeight: '600', marginBottom: '4px' }}> 📈 30-Day Progress </div>
                            <div style={{ fontSize: '2.25rem', fontWeight: '800', color: isDark ? '#10b981' : '#047857' }}>{percentage}</div>
                            <div style={{ fontSize: '0.75rem', color: isDark ? '#34d399' : '#059669' }}>%</div>
                        </div>

                        {/* Total Completions */}
                        <div style={{ 
                            padding: '1rem', 
                            borderRadius: '0.5rem', 
                            border: isDark ? '2px solid #3b82f6' : '2px solid #93c5fd', 
                            backgroundColor: isDark ? '#1e3a8a' : '#eff6ff', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            minHeight: '90px'
                        }}>
                            <div style={{ fontSize: '0.875rem', color: isDark ? '#93c5fd' : '#3b82f6', fontWeight: '600', marginBottom: '4px' }}> ✔️ Total Completions </div>
                            <div style={{ fontSize: '2.25rem', fontWeight: '800', color: isDark ? '#60a5fa' : '#2563eb' }}>{totalCompletions}</div>
                            <div style={{ fontSize: '0.75rem', color: isDark ? '#93c5fd' : '#3b82f6' }}>count</div>
                        </div>
                    </div>
                    
                    {/* Progress Bar Label */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem', color: subTextColor, marginTop: '1rem' }}> 
                        <span>Last 30 Days</span>
                        <span>{percentage}% complete</span>
                    </div>

                    <div style={{ width: '100%', backgroundColor: progressTrackBg, borderRadius: '9999px', height: '10px' }}> 
                        <div 
                            style={{ 
                                height: '10px', 
                                borderRadius: '9999px', 
                                transition: 'width 0.5s',
                                width: `${percentage}%`, 
                                background: 'linear-gradient(to right, #6366f1, #a855f7)' 
                            }}
                        ></div>
                    </div>

                    <div style={{ borderBottom: `1px solid ${dividerColor}`, margin: '1.5rem 0' }}></div> 

                    {/* Creator Info */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.875rem', color: subTextColor }}> 
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ color: primaryColor }}>
                                <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </span>
                            <span style={{ fontWeight: '600', color: creatorInfoColor }}>Created by {habit.userName || 'Nova'}</span> 
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ color: primaryColor }}>
                                <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            </span>
                            <span style={{ fontWeight: '500', color: creatorInfoColor }}>{formatDate(habit.createdDate)}</span>
                        </div>
                    </div>

                    {/* Mark as Complete Button */}
                    <button 
                        onClick={handleMarkComplete} 
                        disabled={completedToday || isCompleting} 
                        style={{
                            width: '100%',
                            padding: '16px 0',
                            borderRadius: '0.75rem',
                            color: '#ffffff',
                            fontSize: '1.125rem',
                            fontWeight: '700',
                            transition: 'background 0.3s',
                            border: 'none',
                            cursor: completedToday || isCompleting ? 'not-allowed' : 'pointer',
                            marginTop: '2rem',
                            background: completedToday 
                                ? '#34d399' 
                                : (isCompleting 
                                    ? '#9ca3af' 
                                    : 'linear-gradient(to right, #6366f1, #a855f7)'), 
                            boxShadow: completedToday 
                                ? '0 10px 15px -3px rgba(52, 211, 153, 0.5), 0 4px 6px -2px rgba(52, 211, 153, 0.25)'
                                : (isCompleting 
                                    ? 'none'
                                    : (isDark 
                                        ? '0 10px 15px -3px rgba(99, 102, 241, 0.2), 0 4px 6px -2px rgba(99, 102, 241, 0.1)' 
                                        : '0 10px 15px -3px rgba(99, 102, 241, 0.5), 0 4px 6px -2px rgba(99, 102, 241, 0.25)')), 
                        }}
                    >
                        {isCompleting 
                            ? 'Processing...' 
                            : (completedToday ? 'Completed Today! ✔️' : 'Mark as Complete')}
                    </button>
                    {completedToday && 
                        <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#10b981', fontWeight: '500', marginTop: '0.5rem' }}>
                            Great Job! Come back tomorrow to continue your streak.
                        </p>
                    }
                </div>
            </div>
        </div>
    );
};

export default HabitDetail;