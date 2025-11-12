// src/pages/MyHabits.jsx

import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth'; 
import { fetchMyHabits, deleteHabit, completeHabit } from '../api/habitApi';
import { calculateStreak } from '../utils/streakUtils'; // You'll need to create this utility
import { Link } from 'react-router-dom';
import UpdateHabitModal from '../components/UpdateHabitModal'; // We'll create this next

const MyHabits = () => {
    const { user, loading: authLoading } = useAuth();
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedHabit, setSelectedHabit] = useState(null);
    const errorShownRef = useRef(false);

    // --- Data Fetching ---
    const loadHabits = async () => {
        if (!user) return; // Wait for user object to be available

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
            // Avoid spamming toasts if user repeatedly opens the page
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
        // Load habits when the user object is ready and not loading
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
            
            // UI Update: Filter out the deleted habit instantly
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
                // UI Update: Reload the habits to refresh the streak/completion history
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
        // Close modal and refresh the habit list
        setShowModal(false);
        setSelectedHabit(null);
        loadHabits();
    };

    if (loading || authLoading) {
        return <div className="text-center py-10">Loading your habits...</div>;
    }

    if (!user) {
        return <div className="text-center py-10 text-red-500">Please sign in to view your habits.</div>;
    }
    
    // --- Render ---
    return (
        <div className="container mx-auto p-4">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 700 }}>My Habits ({habits.length})</h1>
                <Link to="/add-habit" style={{ background: 'linear-gradient(90deg,#6366f1,#a855f7)', color: '#fff', padding: '8px 12px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>+ Add Habit</Link>
            </div>
            
            {habits.length === 0 ? (
                <div style={{ padding: '28px', border: '1px solid #e6e6f2', borderRadius: '12px', background: '#ffffff' }}>
                        <div style={{ height: '260px', border: '1px solid #eef2f7', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ width: '68px', height: '68px', borderRadius: '9999px', background: 'rgba(99,102,241,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '28px', color: '#6366f1' }}>+</span>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontWeight: 600, marginBottom: '6px' }}>No habits yet.</p>
                            <p style={{ color: '#6b7280', fontSize: '13px' }}>Create your first habit to start building better routines</p>
                        </div>
                        <Link to="/add-habit" style={{ marginTop: '6px', background: 'linear-gradient(90deg,#6366f1,#a855f7)', color: '#fff', padding: '8px 14px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>+ Create Habit</Link>
                    </div>
                </div>
            ) : (
                <div className="overflow-x-auto shadow-xl rounded-lg">
                    <table className="table w-full bg-white">
                        {/* Table Head */}
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th>Title</th>
                                <th>Category</th>
                                <th>Current Streak</th>
                                <th>Created On</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        
                        {/* Table Body */}
                        <tbody>
                            {habits.map(habit => (
                                <tr key={habit._id}>
                                    <td className="font-semibold">{habit.title}</td>
                                    <td>{habit.category}</td>
                                    <td>
                                        <div className="badge badge-lg badge-accent text-white">
                                            {calculateStreak(habit.completionHistory)} Days
                                        </div>
                                    </td>
                                    <td>{new Date(habit.createdAt).toLocaleDateString()}</td>
                                    <td className="flex space-x-2">
                                        <button 
                                            className="btn btn-sm btn-info text-white"
                                            onClick={() => handleOpenModal(habit)}
                                        >
                                            Update
                                        </button>
                                        <button 
                                            className="btn btn-sm btn-success text-white"
                                            onClick={() => handleComplete(habit._id)}
                                        >
                                            Complete
                                        </button>
                                        <button 
                                            className="btn btn-sm btn-error text-white"
                                            onClick={() => handleDelete(habit._id)}
                                        >
                                            Delete
                                        </button>
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