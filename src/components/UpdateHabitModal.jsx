// src/components/UpdateHabitModal.jsx

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import { updateHabit } from '../api/habitApi';

const categories = ['Morning', 'Work', 'Fitness', 'Evening', 'Study']; // Match your Habit.js model

const UpdateHabitModal = ({ habit, onClose, onUpdateSuccess }) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: habit.title,
        description: habit.description,
        category: habit.category,
        reminderTime: habit.reminderTime,
        image: habit.image, // Current image URL
        isPublic: habit.isPublic,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const updateToast = toast.loading('Updating habit...');

        try {
            const token = await user.getIdToken();
            
            // Only send the fields that can be updated
            const habitData = {
                title: formData.title,
                description: formData.description,
                category: formData.category,
                reminderTime: formData.reminderTime,
                image: formData.image,
                isPublic: formData.isPublic,
            };
            
            await updateHabit(habit._id, habitData, token);
            
            toast.success('Habit updated successfully!', { id: updateToast });
            onUpdateSuccess(); // Close modal and trigger data refresh

        } catch (error) {
            toast.error('Update failed. Try again.', { id: updateToast });
            console.error('Update Habit Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        // Modal Backdrop
        <div style={{ position: 'fixed', inset: '0', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '50' }} onClick={onClose}>
            {/* Modal Content */}
            <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 20px 25px rgba(0,0,0,0.15)', padding: '24px', width: '100%', maxWidth: '500px', margin: '16px' }} onClick={(e) => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px', marginBottom: '16px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>Update Habit: {habit.title}</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#6b7280' }}>
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    
                    {/* Title */}
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e9eef6', background: '#f3f4f6' }} maxLength="100" />
                    </div>

                    {/* Category */}
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} required style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e9eef6', background: '#f3f4f6' }}>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required style={{ width: '100%', minHeight: '96px', padding: '12px', borderRadius: '8px', border: '1px solid #e9eef6', background: '#f3f4f6' }} maxLength="500"></textarea>
                    </div>

                    {/* Reminder Time */}
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>Reminder Time</label>
                        <input type="time" name="reminderTime" value={formData.reminderTime} onChange={handleChange} required style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e9eef6', background: '#f3f4f6' }} />
                    </div>
                    
                    {/* Image URL */}
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>Image URL (Optional)</label>
                        <input type="url" name="image" value={formData.image || ''} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e9eef6', background: '#f3f4f6' }} placeholder="Enter new image URL" />
                        {formData.image && <p style={{ fontSize: '12px', marginTop: '8px', color: '#6b7280' }}>Current Image: <a href={formData.image} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'underline' }}>{formData.image.substring(0, 50)}...</a></p>}
                    </div>
                    
                    {/* Is Public Checkbox */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input type="checkbox" name="isPublic" checked={formData.isPublic} onChange={handleChange} id="isPublicCheck" style={{ width: '18px', height: '18px' }} />
                        <label htmlFor="isPublicCheck" style={{ fontSize: '13px', color: '#111827', cursor: 'pointer', margin: 0 }}>Make Public (Allow others to browse)</label>
                    </div>

                    {/* Non-editable User Info (Display only) */}
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                        <strong>Created By:</strong> {habit.userName} ({habit.userEmail})
                    </p>

                    {/* Submit Button */}
                    <button type="submit" disabled={isSubmitting} style={{ padding: '12px 16px', marginTop: '12px', background: 'linear-gradient(90deg,#6366f1,#a855f7)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}>
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateHabitModal;