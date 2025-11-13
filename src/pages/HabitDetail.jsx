// src/pages/HabitDetail.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth'; 
import { fetchHabitDetail, completeHabit } from '../api/habitApi';

// Helper function to check if a date is today (ignores time)
const isToday = (date) => {
    const today = new Date();
    date = new Date(date);
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
};

// Helper function to calculate completion percentage and streak
const calculateProgress = (completionHistory) => {
    const daysInLast30 = 30;
    const history = completionHistory.map(d => new Date(d).toDateString());
    
    // 1. Completion Percentage (Days completed in the last 30 days)
    const uniqueDays = new Set(history.filter(dateStr => {
        const date = new Date(dateStr);
        const diffTime = Math.abs(new Date() - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays <= daysInLast30;
    }));
    const percentage = Math.round((uniqueDays.size / daysInLast30) * 100);

    // 2. Streak
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Sort the history and convert to day start time for easy comparison
    const sortedTimestamps = completionHistory
        .map(d => new Date(d).setHours(0, 0, 0, 0))
        .sort((a, b) => b - a); // Newest first
    
    // Check if habit was done today
    if (sortedTimestamps.length > 0 && sortedTimestamps[0] === currentDate.getTime()) {
        streak = 1; // Start streak with 1 if done today
    }
    
    // Check preceding days
    for (let i = 0; i < sortedTimestamps.length; i++) {
        const completedDay = sortedTimestamps[i];
        
        // Calculate yesterday's timestamp
        const yesterday = new Date(currentDate);
        yesterday.setDate(yesterday.getDate() - 1);
        
        // Check if the current completed day is yesterday
        if (completedDay === yesterday.getTime()) {
            streak++; // Increment streak
            currentDate = yesterday; // Move the current date back
        } else if (completedDay < yesterday.getTime()) {
            // Gap found, break the streak check
            break;
        }
    }
    
    return { percentage, streak };
};


const HabitDetail = () => {
    const { id } = useParams();
    const { user, loading: authLoading } = useAuth();
    
    const [habit, setHabit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isCompleting, setIsCompleting] = useState(false);

    // Memoize progress calculation
    const { percentage, streak } = useMemo(() => 
        habit ? calculateProgress(habit.completionHistory) : { percentage: 0, streak: 0 }, 
        [habit]
    );

    // Check if habit was already completed today
    const completedToday = useMemo(() => {
        if (!habit) return false;
        return habit.completionHistory.some(isToday);
    }, [habit]);

    // --- Data Fetching ---
    useEffect(() => {
        if (!user || authLoading) return; // Wait for user/auth to load
        
        const loadHabit = async () => {
            setLoading(true);
            try {
                const token = await user.getIdToken();
                const data = await fetchHabitDetail(id, token);
                setHabit(data);
            } catch (err) {
                console.error("Fetch Habit Detail Error:", err);
                // User may not own the habit, or habit doesn't exist.
                toast.error('Failed to load habit details or you do not have permission.');
                setHabit(null); // Explicitly set to null to handle rendering
            } finally {
                setLoading(false);
            }
        };

        loadHabit();
    }, [id, user, authLoading]);


    // --- Mark Complete Handler ---
    const handleMarkComplete = async () => {
        if (!user || isCompleting) return;

        setIsCompleting(true);
        const completeToastId = toast.loading('Marking habit complete...');

        try {
            const token = await user.getIdToken();
            const result = await completeHabit(id, token);
            
            // Success: Update UI by refetching or manually updating state
            if (result.success) {
                // Optimistic UI update: Manually add today's date to history
                setHabit(prev => ({
                    ...prev,
                    completionHistory: [...prev.completionHistory, new Date().toISOString()],
                }));
                toast.success(result.message || 'Habit marked complete!', { id: completeToastId });
            } else {
                 // Prevent duplicate same-day entry message
                 toast.success(result.message || 'Habit already marked complete for today.', { id: completeToastId });
            }

        } catch (error) {
            console.error('Mark Complete failed:', error);
            const errorMessage = error?.response?.data?.message || 'Failed to complete habit.';
            toast.error(errorMessage, { id: completeToastId });
        } finally {
            setIsCompleting(false);
        }
    };


    // --- Render Logic ---
    if (authLoading || loading) {
        return <div className="text-center py-20 text-xl">Loading Habit Details...</div>;
    }

    // This handles cases where the fetch failed (e.g., user tried to access a habit they don't own)
    if (!habit) {
        // Redirect to My Habits if the habit failed to load (assuming it was a private error)
        return <Navigate to="/my-habits" replace />;
    }

    return (
        <div className="container mx-auto p-4 max-w-4xl py-10">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                
                {/* Image and Header Section */}
                {habit.image && (
                    <div className="h-64 w-full bg-gray-200 overflow-hidden">
                        <img src={habit.image} alt={habit.title} className="w-full h-full object-cover" />
                    </div>
                )}
                
                <div className="p-8 md:p-10 space-y-8">
                    
                    {/* Title and Action */}
                    <div className="flex justify-between items-start border-b pb-6">
                        <div>
                            <span className="badge badge-lg bg-indigo-100 text-indigo-700 font-semibold">{habit.category}</span>
                            <h1 className="text-4xl font-extrabold text-gray-900 mt-2">{habit.title}</h1>
                            <p className="text-sm text-gray-500 mt-1">Reminder: {habit.reminderTime}</p>
                        </div>
                        
                        {/* Mark Complete Button */}
                        <button 
                            onClick={handleMarkComplete} 
                            disabled={completedToday || isCompleting} 
                            className="btn btn-lg text-white font-bold whitespace-nowrap"
                            style={{ 
                                background: completedToday ? '#4b5563' : 'linear-gradient(90deg, #6366f1, #a855f7)' 
                            }}
                        >
                            {isCompleting ? 'Processing...' : (completedToday ? 'Completed Today!' : 'Mark Complete')}
                        </button>
                    </div>

                    {/* Progress and Streak */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b pb-8">
                        
                        {/* Progress Bar (% of days completed in last 30) */}
                        <div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-3">30-Day Completion</h3>
                            <div className="flex justify-between mb-1 text-sm font-medium">
                                <span>Progress</span>
                                <span>{percentage}%</span>
                            </div>
                            <progress 
                                className="progress progress-primary w-full" 
                                value={percentage} 
                                max="100"
                            ></progress>
                        </div>

                        {/* Streak Badge */}
                        <div className="flex flex-col items-center justify-center bg-yellow-50 p-4 rounded-lg border-2 border-yellow-300">
                            <span className="text-4xl" role="img" aria-label="fire">🔥</span>
                            <p className="text-xl font-bold text-yellow-800 mt-2">{streak} Day Streak</p>
                            <p className="text-xs text-yellow-700">Keep the momentum going!</p>
                        </div>
                    </div>

                    {/* Description and Creator Info */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-3">Habit Description</h3>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{habit.description}</p>
                        </div>
                        
                        {/* Creator Info */}
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <h4 className="text-base font-semibold text-gray-700 mb-1">Creator Information</h4>
                            <p className="text-sm text-gray-600">
                                **Name:** {habit.userName}
                            </p>
                            <p className="text-sm text-gray-600">
                                **Email:** {habit.userEmail}
                            </p>
                            <p className="text-sm text-gray-600">
                                **Status:** {habit.isPublic ? 'Public' : 'Private'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HabitDetail;